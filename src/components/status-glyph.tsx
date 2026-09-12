import type { NodeStatus } from "@/content/schema";
import styles from "./status-glyph.module.css";

export const STATUS_LABEL: Record<NodeStatus, string> = {
  pending: "pending",
  "in-progress": "in progress",
  done: "done",
};

/** Decorative: callers always put the Status in text next to it. */
export function StatusGlyph({ status, className }: { status: NodeStatus; className?: string }) {
  return (
    <span
      className={className ? `${styles.glyph} ${className}` : styles.glyph}
      data-status={status}
      aria-hidden="true"
    />
  );
}
