import type { Roadmap } from "./load";
import type { NodeStatus, NodeType, ProjectLanguage } from "./schema";

export type GraphLane = {
  id: string;
  title: string;
  /** 1-based grid column. */
  column: number;
  done: number;
  total: number;
  hours: number;
};

export type GraphNode = {
  id: string;
  title: string;
  type: NodeType;
  status: NodeStatus;
  order: number;
  hours: number;
  language?: ProjectLanguage;
  ort?: string;
  isNext: boolean;
  /** 1-based grid column, the Lane position. */
  column: number;
  /** 1-based grid row, the Suggested Order position. */
  row: number;
  /** This Node, its Prerequisites and the Nodes it unlocks. */
  related: string[];
};

export type GraphEdge = {
  /** The Prerequisite. */
  from: string;
  to: string;
};

export type GraphModel = {
  lanes: GraphLane[];
  nodes: GraphNode[];
  edges: GraphEdge[];
};

/**
 * Projects a loaded Roadmap onto the swimlane graph: only serializable, view-ready
 * data crosses into the client component, never descriptions or Logs.
 */
export function toGraphModel({ lanes, nodes, next }: Roadmap): GraphModel {
  const columnOf = new Map(lanes.map((lane, index) => [lane.id, index + 1]));

  return {
    lanes: lanes.map((lane) => {
      const inLane = nodes.filter((node) => node.lane === lane.id);
      return {
        id: lane.id,
        title: lane.title,
        column: columnOf.get(lane.id) ?? 0,
        done: inLane.filter((node) => node.status === "done").length,
        total: inLane.length,
        hours: inLane.reduce((sum, node) => sum + node.hours, 0),
      };
    }),
    nodes: nodes.map((node) => ({
      id: node.id,
      title: node.title,
      type: node.type,
      status: node.status,
      order: node.order,
      hours: node.hours,
      language: node.type === "project" ? node.language : undefined,
      ort: node.type === "resource" ? node.ort : undefined,
      isNext: next?.id === node.id,
      column: columnOf.get(node.lane) ?? 0,
      row: node.order,
      related: [node.id, ...node.prerequisites, ...node.unlocks],
    })),
    edges: nodes.flatMap((node) =>
      node.prerequisites.map((prerequisite) => ({ from: prerequisite, to: node.id })),
    ),
  };
}
