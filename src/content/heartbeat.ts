import { z } from "zod";

/** The last Content Commit: the newest commit touching `content/`. See ADR 0001. */
export const CONTENT_COMMITS_URL =
  "https://api.github.com/repos/ngvior/continuous-learning-roadmap/commits?path=content&per_page=1";

const DAY_MS = 86_400_000;

// A hung GitHub response must not stall the build or a regeneration.
const FETCH_TIMEOUT_MS = 5_000;

const commitsSchema = z
  .array(z.object({ commit: z.object({ committer: z.object({ date: z.iso.datetime() }) }) }))
  .min(1);

export type HeartbeatGrade = "fresh" | "steady" | "aging" | "stale" | "unavailable";

export function parseLastContentCommitDate(body: unknown): Date | null {
  const parsed = commitsSchema.safeParse(body);
  return parsed.success ? new Date(parsed.data[0].commit.committer.date) : null;
}

/** Whole days elapsed, so a commit made earlier today reads as 0. */
export function daysSince(date: Date, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / DAY_MS));
}

/**
 * Days since the last Content Commit, or `null` on any failure (network, rate
 * limit, unexpected body). The Heartbeat never fails the build or a regeneration.
 */
export async function fetchHeartbeat({
  fetch = globalThis.fetch,
  now = new Date(),
}: { fetch?: typeof globalThis.fetch; now?: Date } = {}): Promise<number | null> {
  try {
    const response = await fetch(CONTENT_COMMITS_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const date = parseLastContentCommitDate(await response.json());
    return date ? daysSince(date, now) : null;
  } catch {
    return null;
  }
}

export function heartbeatGrade(daysAgo: number | null): HeartbeatGrade {
  if (daysAgo === null) return "unavailable";
  if (daysAgo <= 3) return "fresh";
  if (daysAgo <= 10) return "steady";
  if (daysAgo <= 20) return "aging";
  return "stale";
}

export function heartbeatAge(daysAgo: number): string {
  if (daysAgo === 0) return "today";
  return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
}
