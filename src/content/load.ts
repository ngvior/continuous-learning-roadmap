import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import {
  lanesSchema,
  nodeFrontmatterSchema,
  type Lane,
  type NodeFrontmatter,
} from "./schema";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export type LogEntry = {
  date: string;
  text: string;
};

export type RoadmapNode = NodeFrontmatter & {
  /** The Node id, which is its filename without the extension. */
  id: string;
  /** Path of the source file, relative to the working directory. */
  file: string;
  description: string;
  log: LogEntry[];
  /** Inverse of Prerequisites: the Nodes this one unblocks, in Suggested Order. */
  unlocks: string[];
};

export type Roadmap = {
  lanes: Lane[];
  /** Every Node in Suggested Order. */
  nodes: RoadmapNode[];
  /** The first pending Node in Suggested Order whose Prerequisites are all done. */
  next: RoadmapNode | null;
  lanesFile: string;
};

/** A content file that cannot be read, parsed or validated on its own. */
export class ContentError extends Error {
  constructor(
    readonly file: string,
    message: string,
  ) {
    super(`${file}: ${message}`);
    this.name = "ContentError";
  }
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
/** The `## Log` heading that opens the dated Log section of a Node file. */
export const LOG_HEADING = /^##[ \t]+Log[ \t]*$/m;
const LOG_ENTRY = /^-[ \t]*(\d{4}-\d{2}-\d{2}):[ \t]*(.+)$/;

/** Splits a Node file into its raw YAML frontmatter and the Markdown body. */
export function splitFrontmatter(raw: string): {
  frontmatter: string;
  body: string;
} {
  const match = FRONTMATTER.exec(raw);
  if (!match) {
    throw new Error("missing YAML frontmatter delimited by ---");
  }
  return { frontmatter: match[1], body: raw.slice(match[0].length) };
}

function splitBody(body: string): { description: string; log: LogEntry[] } {
  const heading = LOG_HEADING.exec(body);
  if (!heading) {
    return { description: body.trim(), log: [] };
  }

  const log = body
    .slice(heading.index + heading[0].length)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const entry = LOG_ENTRY.exec(line);
      if (!entry) {
        throw new Error(
          `Log entry ${JSON.stringify(line)} must read "- YYYY-MM-DD: text"`,
        );
      }
      return { date: entry[1], text: entry[2].trim() };
    });

  return { description: body.slice(0, heading.index).trim(), log };
}

function toContentError(file: string, cause: unknown): ContentError {
  if (cause instanceof z.ZodError) {
    return new ContentError(file, `\n${z.prettifyError(cause)}`);
  }
  return new ContentError(file, cause instanceof Error ? cause.message : String(cause));
}

async function loadLanes(contentDir: string): Promise<Lane[]> {
  const file = path.relative(process.cwd(), path.join(contentDir, "lanes.yaml"));
  let lanes: Lane[];
  try {
    lanes = lanesSchema.parse(parseYaml(await readFile(file, "utf8")));
  } catch (cause) {
    throw toContentError(file, cause);
  }
  return [...lanes].sort((a, b) => a.order - b.order);
}

type ParsedNode = NodeFrontmatter & {
  id: string;
  file: string;
  description: string;
  log: LogEntry[];
};

async function loadNode(nodesDir: string, filename: string): Promise<ParsedNode> {
  const file = path.relative(process.cwd(), path.join(nodesDir, filename));
  try {
    const raw = await readFile(file, "utf8");
    const { frontmatter, body } = splitFrontmatter(raw);
    const parsed = nodeFrontmatterSchema.parse(parseYaml(frontmatter));
    return {
      ...parsed,
      id: path.basename(filename, ".md"),
      file,
      ...splitBody(body),
    };
  } catch (cause) {
    throw toContentError(file, cause);
  }
}

/**
 * Reads `content/` from the filesystem and returns the whole Roadmap with
 * Next and unlocks already derived, so nothing downstream recomputes them.
 * Per-file schema rules fail here; cross-file rules belong to `validateRoadmap`.
 */
export async function loadRoadmap(contentDir = CONTENT_DIR): Promise<Roadmap> {
  const nodesDir = path.join(contentDir, "nodes");
  const filenames = (await readdir(nodesDir))
    .filter((filename) => filename.endsWith(".md"))
    .sort();

  const [lanes, parsed] = await Promise.all([
    loadLanes(contentDir),
    Promise.all(filenames.map((filename) => loadNode(nodesDir, filename))),
  ]);

  const inSuggestedOrder = parsed.sort((a, b) => a.order - b.order);

  const unlocks = new Map<string, string[]>(
    inSuggestedOrder.map((node) => [node.id, []]),
  );
  for (const node of inSuggestedOrder) {
    for (const prerequisite of node.prerequisites) {
      unlocks.get(prerequisite)?.push(node.id);
    }
  }

  const nodes: RoadmapNode[] = inSuggestedOrder.map((node) => ({
    ...node,
    unlocks: unlocks.get(node.id) ?? [],
  }));

  const doneIds = new Set(
    nodes.filter((node) => node.status === "done").map((node) => node.id),
  );
  const next =
    nodes.find(
      (node) =>
        node.status === "pending" &&
        node.prerequisites.every((prerequisite) => doneIds.has(prerequisite)),
    ) ?? null;

  return {
    lanes,
    nodes,
    next,
    lanesFile: path.relative(process.cwd(), path.join(contentDir, "lanes.yaml")),
  };
}
