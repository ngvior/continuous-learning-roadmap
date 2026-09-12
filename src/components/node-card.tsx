import type { GraphNode } from "@/content/graph";
import styles from "./roadmap-graph.module.css";
import { STATUS_LABEL, StatusGlyph } from "./status-glyph";

export function NodeCard({ node, onOpen }: { node: GraphNode; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={styles.card}
      data-status={node.status}
      data-node-id={node.id}
      onClick={onOpen}
    >
      <StatusGlyph status={node.status} className={styles.glyph} />
      <span className={styles.order}>{String(node.order).padStart(2, "0")}</span>
      <span className={styles.body}>
        <span className={styles.title}>{node.title}</span>
        <span className={styles.meta}>
          {node.type} {node.hours}h{node.language ? ` ${node.language}` : ""}
          <span className="sr-only">, {STATUS_LABEL[node.status]}</span>
        </span>
      </span>
      {node.isNext || node.ort ? (
        <span className={styles.chips}>
          {node.isNext ? <span className={`${styles.chip} ${styles.next}`}>next</span> : null}
          {node.ort ? (
            <span className={`${styles.chip} ${styles.ort}`} title={`ORT Overlap: ${node.ort}`}>
              ORT
            </span>
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
