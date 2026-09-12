import { marked } from "marked";
import type { LogEntry, Roadmap, RoadmapNode } from "./load";
import type { AttachedReading, Link, NodeStatus, NodeType, ProjectLanguage } from "./schema";

export type SheetNodeRef = {
  id: string;
  title: string;
  order: number;
  status: NodeStatus;
};

export type SheetNode = {
  id: string;
  title: string;
  type: NodeType;
  language?: ProjectLanguage;
  lane: { id: string; title: string };
  order: number;
  status: NodeStatus;
  isNext: boolean;
  hours: number;
  started?: string;
  finished?: string;
  ort?: string;
  repo?: string;
  demo?: string;
  links: Link[];
  /** The Markdown description, rendered to HTML at build time from owner-authored content. */
  descriptionHtml: string;
  phases: string[];
  attached: AttachedReading[];
  prerequisites: SheetNodeRef[];
  unlocks: SheetNodeRef[];
  log: LogEntry[];
};

export type SheetModel = Record<string, SheetNode>;

/**
 * Projects a loaded Roadmap onto the Node detail sheet, keyed by Node id. Unlike
 * the graph model it carries the description and the Log, so it is sent once to
 * the client and looked up by the `?node=` search param.
 */
export function toSheetModel({ lanes, nodes, next }: Roadmap): SheetModel {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const laneTitle = new Map(lanes.map((lane) => [lane.id, lane.title]));

  const refs = (ids: string[]): SheetNodeRef[] =>
    ids.flatMap((id) => {
      const node = byId.get(id);
      return node ? [{ id, title: node.title, order: node.order, status: node.status }] : [];
    });

  const toSheetNode = (node: RoadmapNode): SheetNode => ({
    id: node.id,
    title: node.title,
    type: node.type,
    language: node.type === "project" ? node.language : undefined,
    lane: { id: node.lane, title: laneTitle.get(node.lane) ?? node.lane },
    order: node.order,
    status: node.status,
    isNext: next?.id === node.id,
    hours: node.hours,
    started: node.started,
    finished: node.finished,
    ort: node.type === "resource" ? node.ort : undefined,
    repo: node.type === "project" ? node.repo : undefined,
    demo: node.type === "project" ? node.demo : undefined,
    links: node.links,
    descriptionHtml: node.description ? marked.parse(node.description, { async: false }) : "",
    phases: node.type === "project" ? node.phases : [],
    attached: node.type === "project" ? node.attached : [],
    prerequisites: refs(node.prerequisites),
    unlocks: refs(node.unlocks),
    log: node.log,
  });

  return Object.fromEntries(nodes.map((node) => [node.id, toSheetNode(node)]));
}
