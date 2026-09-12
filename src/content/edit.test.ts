import { cp, mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import {
  RoadmapCommandError,
  applyRoadmapCommand,
  type RoadmapCommand,
} from "./edit";
import { loadRoadmap, type RoadmapNode } from "./load";

const FIXTURE = fileURLToPath(
  new URL("./__fixtures__/editable", import.meta.url),
);
const TODAY = "2026-03-04";

let contentDir: string;

beforeEach(async () => {
  const temp = await mkdtemp(path.join(tmpdir(), "roadmap-edit-"));
  contentDir = path.join(temp, "content");
  await cp(FIXTURE, contentDir, { recursive: true });
});

function run(command: RoadmapCommand, id: string, text?: string) {
  return applyRoadmapCommand({ command, id, text, today: TODAY, contentDir });
}

async function nodeOf(id: string): Promise<RoadmapNode> {
  const roadmap = await loadRoadmap(contentDir);
  const node = roadmap.nodes.find((candidate) => candidate.id === id);
  if (!node) {
    throw new Error(`fixture has no Node "${id}"`);
  }
  return node;
}

function rawOf(id: string): Promise<string> {
  return readFile(path.join(contentDir, "nodes", `${id}.md`), "utf8");
}

describe("start", () => {
  it("moves a pending Node to in-progress and writes the local date", async () => {
    await run("start", "beta");
    const beta = await nodeOf("beta");

    expect(beta.status).toBe("in-progress");
    expect(beta.started).toBe(TODAY);
    expect(beta.finished).toBeUndefined();
  });

  it("reports the edited file and the Content Commit message", async () => {
    const edit = await run("start", "beta");

    expect(edit.message).toBe("content(beta): start");
    expect(edit.file).toMatch(/nodes\/beta\.md$/);
  });

  it("writes the date quoted and in schema order", async () => {
    await run("start", "beta");

    expect(await rawOf("beta")).toContain(
      'status: in-progress\nhours: 3\nprerequisites:\n  - alpha\nstarted: "2026-03-04"\n',
    );
  });

  it("refuses a Node that is not pending", async () => {
    await expect(run("start", "alpha")).rejects.toThrow(
      "cannot start a done Node; start applies to a pending Node",
    );
  });

  it("refuses a Node whose Prerequisites are not done, leaving no change", async () => {
    const before = await rawOf("gamma");

    await expect(run("start", "gamma")).rejects.toThrow(/prerequisites-done/);
    expect(await rawOf("gamma")).toBe(before);
  });

  it("refuses a second in-progress Node, leaving no change", async () => {
    await run("start", "beta");
    const before = await rawOf("delta");

    await expect(run("start", "delta")).rejects.toThrow(/single-in-progress/);
    expect(await rawOf("delta")).toBe(before);
  });

  it("refuses a Project without a repo, leaving no change", async () => {
    const before = await rawOf("epsilon");

    await expect(run("start", "epsilon")).rejects.toThrow(/"repo" is required/);
    expect(await rawOf("epsilon")).toBe(before);
  });
});

describe("done", () => {
  it("moves an in-progress Node to done and keeps the start date", async () => {
    await run("start", "beta");
    await run("done", "beta");
    const beta = await nodeOf("beta");

    expect(beta.status).toBe("done");
    expect(beta.started).toBe(TODAY);
    expect(beta.finished).toBe(TODAY);
  });

  it("fast-forwards a pending Resource carrying ort, writing both dates", async () => {
    const edit = await run("done", "delta");
    const delta = await nodeOf("delta");

    expect(delta.status).toBe("done");
    expect(delta.started).toBe(TODAY);
    expect(delta.finished).toBe(TODAY);
    expect(edit.message).toBe("content(delta): done");
  });

  it("refuses a pending Node without the ORT Overlap mark", async () => {
    await expect(run("done", "beta")).rejects.toThrow(
      'only a Resource carrying "ort" fast-forwards from pending to done',
    );
  });

  it("refuses a Node that is already done", async () => {
    await expect(run("done", "alpha")).rejects.toThrow(
      'Node "alpha" is already done',
    );
  });
});

describe("pause", () => {
  it("moves an in-progress Node back to pending and clears both dates", async () => {
    await run("start", "beta");
    const edit = await run("pause", "beta");
    const beta = await nodeOf("beta");

    expect(beta.status).toBe("pending");
    expect(beta.started).toBeUndefined();
    expect(beta.finished).toBeUndefined();
    expect(edit.message).toBe("content(beta): pause");
  });

  it("restores the file to what it was before it was started", async () => {
    const before = await rawOf("beta");

    await run("start", "beta");
    await run("pause", "beta");

    expect(await rawOf("beta")).toBe(before);
  });

  it("refuses a Node that is not in-progress", async () => {
    await expect(run("pause", "delta")).rejects.toThrow(
      "cannot pause a pending Node; pause applies to an in-progress Node",
    );
  });
});

describe("note", () => {
  it("appends a dated entry to an existing Log", async () => {
    await run("note", "alpha", "Reviewed the notes.");

    expect((await nodeOf("alpha")).log).toEqual([
      { date: "2026-01-02", text: "Started reading." },
      { date: TODAY, text: "Reviewed the notes." },
    ]);
  });

  it("creates the Log section when the Node has none", async () => {
    await run("note", "beta", "Roadmap CLI landed");
    const beta = await nodeOf("beta");

    expect(beta.log).toEqual([{ date: TODAY, text: "Roadmap CLI landed" }]);
    expect(await rawOf("beta")).toContain(
      "\n\n## Log\n\n- 2026-03-04: Roadmap CLI landed\n",
    );
  });

  it("carries the text into the Content Commit message", async () => {
    const edit = await run("note", "beta", "Roadmap CLI landed");

    expect(edit.message).toBe("content(beta): Roadmap CLI landed");
  });

  it("leaves the frontmatter, the Status and the description untouched", async () => {
    const before = await rawOf("beta");

    await run("note", "beta", "Roadmap CLI landed");
    const after = await rawOf("beta");
    const beta = await nodeOf("beta");

    expect(after.startsWith(before.trimEnd())).toBe(true);
    expect(beta.status).toBe("pending");
    expect(beta.description).toBe(
      "The second fixture Node, startable and without a Log section.",
    );
  });

  it("refuses an empty text", async () => {
    await expect(run("note", "beta", "   ")).rejects.toThrow(
      "note requires a text argument",
    );
  });

  it("refuses a multi-line text", async () => {
    await expect(run("note", "beta", "first\nsecond")).rejects.toThrow(
      "a Log entry must be a single line",
    );
  });
});

describe("every command", () => {
  it("refuses an unknown Node id", async () => {
    await expect(run("start", "ghost")).rejects.toThrow(
      'no Node "ghost" under content/nodes',
    );
  });

  it("refuses with a RoadmapCommandError so the CLI can report it plainly", async () => {
    await expect(run("pause", "delta")).rejects.toBeInstanceOf(
      RoadmapCommandError,
    );
  });
});
