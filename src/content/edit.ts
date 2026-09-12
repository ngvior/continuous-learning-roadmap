import { readFile, writeFile } from "node:fs/promises";
import { Document, Scalar, isMap, isScalar, parseDocument } from "yaml";
import {
  CONTENT_DIR,
  LOG_HEADING,
  loadRoadmap,
  splitFrontmatter,
  type RoadmapNode,
} from "./load";
import { validateRoadmap, type ValidationIssue } from "./validate";

export const ROADMAP_COMMANDS = ["start", "done", "pause", "note"] as const;

export type RoadmapCommand = (typeof ROADMAP_COMMANDS)[number];

/** A refused command: the Roadmap is left exactly as it was. */
export class RoadmapCommandError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RoadmapCommandError";
  }
}

export type RoadmapEdit = {
  /** Path of the edited Node file, relative to the working directory. */
  file: string;
  /** Commit message the caller should use, `content(<id>): ...`. */
  message: string;
};

export type RoadmapCommandOptions = {
  command: RoadmapCommand;
  id: string;
  /** The Log text, required by `note` and ignored by every other command. */
  text?: string;
  /** Local date written into the frontmatter and the Log entry. */
  today: string;
  contentDir?: string;
};

/**
 * Frontmatter key order, so a key this module inserts lands where the
 * hand-written files already put it instead of at the end of the mapping.
 */
const KEY_ORDER = [
  "title",
  "type",
  "lane",
  "order",
  "status",
  "hours",
  "prerequisites",
  "links",
  "started",
  "finished",
  "ort",
  "language",
  "repo",
  "demo",
  "phases",
  "attached",
];

function keyRank(key: unknown): number {
  return KEY_ORDER.indexOf(String(key));
}

function setScalar(
  doc: Document,
  key: string,
  value: string,
  quoted = false,
): void {
  const scalar = new Scalar(value);
  if (quoted) {
    scalar.type = Scalar.QUOTE_DOUBLE;
  }

  if (doc.has(key)) {
    doc.set(key, scalar);
    return;
  }

  const map = doc.contents;
  if (!isMap(map)) {
    throw new RoadmapCommandError("frontmatter must be a YAML mapping");
  }

  const rank = keyRank(key);
  const at = map.items.findIndex(
    (item) => keyRank(isScalar(item.key) ? item.key.value : undefined) > rank,
  );
  const pair = doc.createPair(key, scalar);

  if (at === -1) {
    map.items.push(pair);
  } else {
    map.items.splice(at, 0, pair);
  }
}

function reassemble(frontmatter: string, body: string): string {
  return `---\n${frontmatter}\n---\n${body}`;
}

function withTransition(
  raw: string,
  node: RoadmapNode,
  command: Exclude<RoadmapCommand, "note">,
  today: string,
): string {
  const { frontmatter, body } = splitFrontmatter(raw);
  const doc = parseDocument(frontmatter);

  switch (command) {
    case "start": {
      if (node.status !== "pending") {
        throw new RoadmapCommandError(
          `cannot start a ${node.status} Node; start applies to a pending Node`,
        );
      }
      setScalar(doc, "status", "in-progress");
      setScalar(doc, "started", today, true);
      break;
    }

    case "done": {
      if (node.status === "done") {
        throw new RoadmapCommandError(`Node "${node.id}" is already done`);
      }
      // The ORT fast-forward: a Resource whose ground an ORT course covered
      // may go straight from pending to done, both dates written at once.
      if (node.status === "pending") {
        if (node.type !== "resource" || node.ort === undefined) {
          throw new RoadmapCommandError(
            `cannot finish a pending Node; only a Resource carrying "ort" fast-forwards from pending to done`,
          );
        }
        setScalar(doc, "started", today, true);
      }
      setScalar(doc, "status", "done");
      setScalar(doc, "finished", today, true);
      break;
    }

    case "pause": {
      if (node.status !== "in-progress") {
        throw new RoadmapCommandError(
          `cannot pause a ${node.status} Node; pause applies to an in-progress Node`,
        );
      }
      setScalar(doc, "status", "pending");
      doc.delete("started");
      doc.delete("finished");
      break;
    }
  }

  // `doc.toString()` already ends with a newline.
  return `---\n${doc.toString()}---\n${body}`;
}

function withLogEntry(raw: string, date: string, text: string): string {
  const { frontmatter, body } = splitFrontmatter(raw);
  const entry = `- ${date}: ${text}`;
  const written = LOG_HEADING.test(body)
    ? `${body.trimEnd()}\n${entry}\n`
    : `${body.trimEnd()}\n\n## Log\n\n${entry}\n`;

  return reassemble(frontmatter, written);
}

function requireText(text: string | undefined): string {
  const trimmed = text?.trim() ?? "";
  if (trimmed.length === 0) {
    throw new RoadmapCommandError(
      'note requires a text argument, as in: roadmap note <id> "what happened"',
    );
  }
  if (/[\r\n]/.test(trimmed)) {
    throw new RoadmapCommandError("a Log entry must be a single line");
  }
  return trimmed;
}

function describe(issues: ValidationIssue[]): string {
  return issues
    .map((issue) => `  ${issue.file} [${issue.rule}] ${issue.message}`)
    .join("\n");
}

/**
 * Applies one Roadmap command to a Node file and reports the commit message
 * the caller should use. The edit is written, then the whole Roadmap is loaded
 * and validated again: a Node file is only left changed when every schema and
 * cross-file rule still holds, so a refused command leaves no diff behind.
 * Committing is the caller's job — this module never touches git.
 */
export async function applyRoadmapCommand({
  command,
  id,
  text,
  today,
  contentDir = CONTENT_DIR,
}: RoadmapCommandOptions): Promise<RoadmapEdit> {
  const noteText = command === "note" ? requireText(text) : undefined;

  const roadmap = await loadRoadmap(contentDir);
  const known = validateRoadmap(roadmap);
  if (known.length > 0) {
    throw new RoadmapCommandError(
      `the Roadmap is already invalid, fix it before editing:\n${describe(known)}`,
    );
  }

  const node = roadmap.nodes.find((candidate) => candidate.id === id);
  if (!node) {
    throw new RoadmapCommandError(`no Node "${id}" under content/nodes`);
  }

  const original = await readFile(node.file, "utf8");
  const edited =
    noteText === undefined
      ? withTransition(original, node, command as Exclude<RoadmapCommand, "note">, today)
      : withLogEntry(original, today, noteText);

  await writeFile(node.file, edited, "utf8");

  try {
    const issues = validateRoadmap(await loadRoadmap(contentDir));
    if (issues.length > 0) {
      throw new RoadmapCommandError(
        `${command} ${id} would break the Roadmap:\n${describe(issues)}`,
      );
    }
  } catch (cause) {
    await writeFile(node.file, original, "utf8");
    throw cause instanceof RoadmapCommandError
      ? cause
      : new RoadmapCommandError(
          `${command} ${id} would break the Roadmap: ${cause instanceof Error ? cause.message : String(cause)}`,
        );
  }

  return {
    file: node.file,
    message: `content(${id}): ${noteText ?? command}`,
  };
}
