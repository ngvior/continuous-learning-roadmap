import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ContentError, loadRoadmap } from "./load";

const FIXTURES = fileURLToPath(new URL("./__fixtures__", import.meta.url));
const VALID_FIXTURE = path.join(FIXTURES, "valid");

describe("loadRoadmap", () => {
  it("returns the Lanes and every Node in Suggested Order", async () => {
    const roadmap = await loadRoadmap(VALID_FIXTURE);

    expect(roadmap.lanes.map((lane) => lane.id)).toEqual(["foundations"]);
    expect(roadmap.nodes.map((node) => node.id)).toEqual([
      "alpha",
      "beta",
      "gamma",
      "delta",
    ]);
  });

  it("takes the Node id from the filename and keeps the source path", async () => {
    const roadmap = await loadRoadmap(VALID_FIXTURE);
    const [alpha] = roadmap.nodes;

    expect(alpha.id).toBe("alpha");
    expect(alpha.file).toMatch(/__fixtures__\/valid\/nodes\/alpha\.md$/);
  });

  it("splits the body into a description and dated Log entries", async () => {
    const roadmap = await loadRoadmap(VALID_FIXTURE);
    const [alpha, beta] = roadmap.nodes;

    expect(alpha.description).toBe("The first fixture Node.");
    expect(alpha.log).toEqual([
      { date: "2026-01-02", text: "Started reading." },
      { date: "2026-01-05", text: "Finished it." },
    ]);
    expect(beta.log).toEqual([]);
  });

  it("derives unlocks as the inverse of Prerequisites", async () => {
    const roadmap = await loadRoadmap(VALID_FIXTURE);
    const unlocks = Object.fromEntries(
      roadmap.nodes.map((node) => [node.id, node.unlocks]),
    );

    expect(unlocks).toEqual({
      alpha: ["beta"],
      beta: ["gamma"],
      gamma: [],
      delta: [],
    });
  });

  it("derives Next as the first pending Node whose Prerequisites are all done", async () => {
    const roadmap = await loadRoadmap(VALID_FIXTURE);

    expect(roadmap.next?.id).toBe("delta");
  });

  it("fails with the file name and the rule when a Node breaks the schema", async () => {
    const load = loadRoadmap(path.join(FIXTURES, "invalid-node"));

    await expect(load).rejects.toThrow(ContentError);
    await expect(load).rejects.toThrow(/invalid-node\/nodes\/alpha\.md/);
    await expect(load).rejects.toThrow(/a done Node requires "started"/);
  });

  it("fails with the file name when a Node has no frontmatter", async () => {
    const load = loadRoadmap(path.join(FIXTURES, "no-frontmatter"));

    await expect(load).rejects.toThrow(
      /no-frontmatter\/nodes\/alpha\.md: missing YAML frontmatter/,
    );
  });
});

describe("ContentError", () => {
  it("prefixes the message with the file", () => {
    const error = new ContentError("content/nodes/alpha.md", "boom");

    expect(error.message).toBe("content/nodes/alpha.md: boom");
    expect(error.file).toBe("content/nodes/alpha.md");
  });
});
