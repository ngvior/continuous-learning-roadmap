import { execFileSync } from "node:child_process";
import {
  ROADMAP_COMMANDS,
  RoadmapCommandError,
  applyRoadmapCommand,
  type RoadmapCommand,
} from "../src/content/edit";

const USAGE = `usage: pnpm roadmap <${ROADMAP_COMMANDS.join("|")}> <node-id> ["text"]`;

function git(...args: string[]): string {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (cause) {
    const stderr = (cause as { stderr?: string }).stderr?.trim();
    throw new Error(`git ${args.join(" ")} failed${stderr ? `: ${stderr}` : ""}`);
  }
}

function lines(output: string): string[] {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * A Content Commit must touch nothing but its own Node, so the command refuses
 * to run while the index holds anything or the working tree is dirty outside
 * `content/`. Dirty Node files are allowed: only the edited one gets staged.
 */
function requireCommittableTree(): void {
  const staged = lines(
    git("-c", "core.quotePath=false", "diff", "--cached", "--name-only"),
  );
  if (staged.length > 0) {
    throw new Error(
      `the index already holds staged changes, commit or reset them first:\n${staged.map((file) => `  ${file}`).join("\n")}`,
    );
  }

  const dirty = [
    ...lines(git("-c", "core.quotePath=false", "diff", "--name-only")),
    ...lines(
      git("-c", "core.quotePath=false", "ls-files", "--others", "--exclude-standard"),
    ),
  ].filter((file) => !file.startsWith("content/"));

  if (dirty.length > 0) {
    throw new Error(
      `the working tree is dirty outside content/, commit or stash it first:\n${dirty.map((file) => `  ${file}`).join("\n")}`,
    );
  }
}

/** The local calendar date, never a timestamp and never UTC. */
function today(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function isRoadmapCommand(value: string | undefined): value is RoadmapCommand {
  return ROADMAP_COMMANDS.includes(value as RoadmapCommand);
}

async function main(): Promise<void> {
  const [command, id, ...rest] = process.argv.slice(2);

  if (!isRoadmapCommand(command) || !id) {
    throw new RoadmapCommandError(USAGE);
  }

  requireCommittableTree();

  const { file, message } = await applyRoadmapCommand({
    command,
    id,
    text: rest.join(" "),
    today: today(),
  });

  git("add", "--", file);
  try {
    git("commit", "-m", message);
  } catch (cause) {
    // The edit itself is valid; unstage it so the next run is not blocked.
    git("reset", "--quiet", "--", file);
    throw new Error(
      `${cause instanceof Error ? cause.message : String(cause)}\nthe edit is left uncommitted in ${file}`,
    );
  }

  console.log(`${message}\n  ${file}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
