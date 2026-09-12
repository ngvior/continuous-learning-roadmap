import { describe, expect, it } from "vitest";
import type { Roadmap, RoadmapNode } from "./load";
import { toSheetModel } from "./sheet";

/** Fixture Nodes are hand-built, so the discriminated union is asserted, not inferred. */
function node(overrides: Record<string, unknown> & { id: string; order: number }): RoadmapNode {
  return {
    title: overrides.id,
    type: "resource",
    lane: "foundations",
    status: "pending",
    hours: 1,
    prerequisites: [],
    links: [],
    file: `content/nodes/${overrides.id}.md`,
    description: "",
    log: [],
    unlocks: [],
    ...overrides,
  } as RoadmapNode;
}

function roadmap(nodes: RoadmapNode[], nextId: string | null): Roadmap {
  return {
    lanes: [
      { id: "foundations", title: "Foundations", order: 1, description: "f" },
      { id: "backend", title: "Backend", order: 2, description: "b" },
    ],
    nodes,
    next: nodes.find((candidate) => candidate.id === nextId) ?? null,
    lanesFile: "content/lanes.yaml",
  };
}

describe("toSheetModel", () => {
  const nodes = [
    node({
      id: "alpha",
      order: 1,
      status: "done",
      started: "2026-01-01",
      finished: "2026-01-02",
      ort: "Estadistica",
      unlocks: ["gamma"],
    }),
    node({
      id: "beta",
      order: 2,
      lane: "backend",
      type: "project",
      status: "in-progress",
      started: "2026-02-01",
      language: "typescript",
      repo: "https://github.com/example/beta",
      demo: "https://beta.example.com",
      links: [{ label: "Repository", url: "https://github.com/example/beta" }],
      phases: ["Schema", "Graph"],
      attached: [{ title: "Short read", url: "https://example.com/read", hours: 0.5 }],
      description: "A **bold** start.\n\nSecond paragraph.",
      log: [{ date: "2026-02-02", text: "Schema landed" }],
      unlocks: ["gamma"],
    }),
    node({ id: "gamma", order: 3, title: "Gamma", prerequisites: ["alpha", "beta"] }),
  ];

  it("keys every Node by id and resolves its Lane title", () => {
    const model = toSheetModel(roadmap(nodes, "gamma"));

    expect(Object.keys(model)).toEqual(["alpha", "beta", "gamma"]);
    expect(model.beta.lane).toEqual({ id: "backend", title: "Backend" });
    expect(model.gamma.isNext).toBe(true);
    expect(model.alpha.isNext).toBe(false);
  });

  it("resolves Prerequisites and unlocks to titled references with their Status", () => {
    const model = toSheetModel(roadmap(nodes, null));

    expect(model.gamma.prerequisites).toEqual([
      { id: "alpha", title: "alpha", order: 1, status: "done" },
      { id: "beta", title: "beta", order: 2, status: "in-progress" },
    ]);
    expect(model.alpha.unlocks).toEqual([{ id: "gamma", title: "Gamma", order: 3, status: "pending" }]);
  });

  it("carries Project-only fields for Projects and the ORT Overlap for Resources", () => {
    const { alpha, beta } = toSheetModel(roadmap(nodes, null));

    expect(beta).toMatchObject({
      language: "typescript",
      repo: "https://github.com/example/beta",
      demo: "https://beta.example.com",
      phases: ["Schema", "Graph"],
      attached: [{ title: "Short read", url: "https://example.com/read", hours: 0.5 }],
      log: [{ date: "2026-02-02", text: "Schema landed" }],
    });
    expect(alpha).toMatchObject({ ort: "Estadistica", phases: [], attached: [] });
    expect(alpha.language).toBeUndefined();
  });

  it("renders the Markdown description to HTML", () => {
    const { alpha, beta } = toSheetModel(roadmap(nodes, null));

    expect(beta.descriptionHtml).toBe("<p>A <strong>bold</strong> start.</p>\n<p>Second paragraph.</p>\n");
    expect(alpha.descriptionHtml).toBe("");
  });
});
