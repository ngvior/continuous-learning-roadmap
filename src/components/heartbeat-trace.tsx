import { heartbeatAge, heartbeatGrade } from "@/content/heartbeat";
import styles from "./heartbeat-trace.module.css";

const WIDTH = 320;
const BASELINE = 30;

/** Four beats across the trace; the amplitude decays with age but never flattens out. */
function pulsePath(daysAgo: number): string {
  const amp = Math.max(0.12, 1 - daysAgo / 30);
  let d = `M0 ${BASELINE}`;
  for (let x = 0; x < WIDTH; x += 80) {
    d +=
      ` L${x + 22} ${BASELINE} L${x + 30} ${BASELINE - 6 * amp} L${x + 36} ${BASELINE}` +
      ` L${x + 42} ${BASELINE + 10 * amp} L${x + 48} ${BASELINE - 26 * amp}` +
      ` L${x + 54} ${BASELINE + 12 * amp} L${x + 60} ${BASELINE} L${x + 80} ${BASELINE}`;
  }
  return d;
}

/** The masthead Heartbeat. Pure presentation: the page fetches `daysAgo`. */
export function HeartbeatTrace({ daysAgo }: { daysAgo: number | null }) {
  const grade = heartbeatGrade(daysAgo);

  return (
    <div className={styles.heart} data-grade={grade}>
      <svg className={styles.svg} viewBox="0 0 320 56" aria-hidden="true">
        <path
          className={styles.trace}
          d={daysAgo === null ? `M0 ${BASELINE} L${WIDTH} ${BASELINE}` : pulsePath(daysAgo)}
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <p className={styles.line}>
        {daysAgo === null ? (
          "heartbeat unavailable"
        ) : (
          <>
            last commit <b className={styles.age}>{heartbeatAge(daysAgo)}</b>
          </>
        )}
      </p>
    </div>
  );
}
