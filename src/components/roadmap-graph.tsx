"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { GraphModel } from "@/content/graph";
import { NodeCard } from "./node-card";
import { openNodeInUrl } from "./node-url";
import styles from "./roadmap-graph.module.css";

type EdgePath = { from: string; to: string; d: string };

/** Bottom centre of the Prerequisite to top centre of the dependent Node. */
function measureEdges(
  container: HTMLElement,
  cards: Map<string, HTMLElement>,
  edges: GraphModel["edges"],
): EdgePath[] {
  const origin = container.getBoundingClientRect();
  return edges.flatMap(({ from, to }) => {
    const source = cards.get(from)?.getBoundingClientRect();
    const target = cards.get(to)?.getBoundingClientRect();
    if (!source || !target) {
      return [];
    }
    const x1 = source.left + source.width / 2 - origin.left;
    const y1 = source.bottom - origin.top;
    const x2 = target.left + target.width / 2 - origin.left;
    const y2 = target.top - origin.top;
    const dy = Math.max(24, (y2 - y1) / 2);
    return [{ from, to, d: `M${x1} ${y1} C${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}` }];
  });
}

export function RoadmapGraph({ lanes, nodes, edges }: GraphModel) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef(new Map<string, HTMLElement>());
  const [paths, setPaths] = useState<EdgePath[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const remeasure = () => setPaths(measureEdges(container, cardsRef.current, edges));

    const observer = new ResizeObserver(remeasure);
    observer.observe(container);
    let cancelled = false;
    // Web fonts shift card heights after first paint.
    document.fonts.ready.then(() => {
      if (!cancelled) remeasure();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [edges]);

  const related = new Set(nodes.find((node) => node.id === activeId)?.related ?? []);
  const columns: CSSProperties = {
    gridTemplateColumns: `repeat(${lanes.length}, minmax(232px, 1fr))`,
  };

  return (
    <section aria-label="Roadmap graph" className={styles.graph}>
      <div className={styles.laneHeads} style={columns}>
        {lanes.map((lane) => (
          <div key={lane.id}>
            <h2 className={styles.laneTitle}>{lane.title}</h2>
            <p className={styles.laneStats}>
              {lane.done}/{lane.total} done, {lane.hours} h
            </p>
          </div>
        ))}
      </div>

      <div ref={containerRef} className={styles.canvas}>
        <div className={styles.rails} style={columns} aria-hidden="true">
          {lanes.map((lane) => (
            <div key={lane.id} className={styles.rail} />
          ))}
        </div>

        <svg className={styles.edges} aria-hidden="true">
          {paths.map((path) => {
            const touches = activeId !== null && (path.from === activeId || path.to === activeId);
            const state = activeId === null ? undefined : touches ? "hi" : "lo";
            return (
              <path key={`${path.from}->${path.to}`} className={styles.edge} data-state={state} d={path.d} />
            );
          })}
        </svg>

        <ol className={styles.nodes} style={columns} aria-label="Nodes in Suggested Order">
          {nodes.map((node) => (
            <li
              key={node.id}
              ref={(element) => {
                if (element) cardsRef.current.set(node.id, element);
                return () => {
                  cardsRef.current.delete(node.id);
                };
              }}
              className={styles.slot}
              style={{ gridColumn: node.column, gridRow: node.row }}
              data-dimmed={activeId !== null && !related.has(node.id) ? "" : undefined}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
            >
              <NodeCard node={node} onOpen={() => openNodeInUrl(node.id)} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
