import { describe, expect, it } from "vitest";
import { toGraphModel } from "./graph";
import type { Roadmap, RoadmapNode } from "./load";

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

describe("toGraphModel", () => {
  const nodes = [
    node({ id: "alpha", order: 1, status: "done", hours: 3, started: "2026-01-01", finished: "2026-01-02", unlocks: ["gamma"] }),
    node({ id: "beta", order: 2, lane: "backend", hours: 10, type: "project", language: "typescript", phases: [], attached: [] }),
    node({ id: "gamma", order: 3, hours: 4.5, prerequisites: ["alpha"], ort: "Estadistica" }),
  ];

  it("sums done/total and hours per Lane, in Lane order", () => {
    const model = toGraphModel(roadmap(nodes, "beta"));

    expect(model.lanes).toEqual([
      { id: "foundations", title: "Foundations", column: 1, done: 1, total: 2, hours: 7.5 },
      { id: "backend", title: "Backend", column: 2, done: 0, total: 1, hours: 10 },
    ]);
  });

  it("places each Node at its Lane column and Suggested Order row and marks Next", () => {
    const model = toGraphModel(roadmap(nodes, "beta"));

    expect(model.nodes.map(({ id, column, row, isNext }) => ({ id, column, row, isNext }))).toEqual([
      { id: "alpha", column: 1, row: 1, isNext: false },
      { id: "beta", column: 2, row: 2, isNext: true },
      { id: "gamma", column: 1, row: 3, isNext: false },
    ]);
  });

  it("keeps the language for Projects only and the ORT Overlap mark", () => {
    const [alpha, beta, gamma] = toGraphModel(roadmap(nodes, null)).nodes;

    expect(alpha.language).toBeUndefined();
    expect(beta.language).toBe("typescript");
    expect(gamma.ort).toBe("Estadistica");
  });

  it("derives one edge per Prerequisite and the related set of each Node", () => {
    const model = toGraphModel(roadmap(nodes, null));

    expect(model.edges).toEqual([{ from: "alpha", to: "gamma" }]);
    expect(model.nodes[0].related).toEqual(["alpha", "gamma"]);
    expect(model.nodes[2].related).toEqual(["gamma", "alpha"]);
  });
});
