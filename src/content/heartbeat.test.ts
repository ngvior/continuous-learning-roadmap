import { describe, expect, it } from "vitest";
import {
  CONTENT_COMMITS_URL,
  daysSince,
  fetchHeartbeat,
  heartbeatAge,
  heartbeatGrade,
  parseLastContentCommitDate,
} from "./heartbeat";

const NOW = new Date("2026-09-12T12:00:00Z");

function commitsBody(date: string) {
  return [{ sha: "abc", commit: { committer: { date } } }];
}

function fakeFetch(respond: () => Response | Promise<Response>) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    return respond();
  }) as typeof globalThis.fetch;
  return { fetch, calls };
}

describe("parseLastContentCommitDate", () => {
  it("reads the committer date of the newest commit", () => {
    expect(parseLastContentCommitDate(commitsBody("2026-09-10T08:00:00Z"))).toEqual(
      new Date("2026-09-10T08:00:00Z"),
    );
  });

  it("returns null for an empty list or an unexpected body", () => {
    expect(parseLastContentCommitDate([])).toBeNull();
    expect(parseLastContentCommitDate({ message: "API rate limit exceeded" })).toBeNull();
    expect(parseLastContentCommitDate(commitsBody("not a date"))).toBeNull();
  });
});

describe("daysSince", () => {
  it("counts whole days and never goes negative", () => {
    expect(daysSince(new Date("2026-09-12T01:00:00Z"), NOW)).toBe(0);
    expect(daysSince(new Date("2026-09-11T11:59:59Z"), NOW)).toBe(1);
    expect(daysSince(new Date("2026-08-13T12:00:00Z"), NOW)).toBe(30);
    expect(daysSince(new Date("2026-09-13T00:00:00Z"), NOW)).toBe(0);
  });
});

describe("fetchHeartbeat", () => {
  it("asks GitHub for the last Content Commit under hourly revalidation", async () => {
    const { fetch, calls } = fakeFetch(() => Response.json(commitsBody("2026-09-07T12:00:00Z")));

    expect(await fetchHeartbeat({ fetch, now: NOW })).toBe(5);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(CONTENT_COMMITS_URL);
    expect(calls[0].init?.next).toEqual({ revalidate: 3600 });
  });

  it("resolves to null on a network failure, a non-OK status or an unexpected body", async () => {
    const network = fakeFetch(() => Promise.reject(new TypeError("fetch failed")));
    const rateLimited = fakeFetch(() => Response.json({ message: "API rate limit exceeded" }, { status: 403 }));
    const unexpected = fakeFetch(() => new Response("<html>", { status: 200 }));

    expect(await fetchHeartbeat({ fetch: network.fetch, now: NOW })).toBeNull();
    expect(await fetchHeartbeat({ fetch: rateLimited.fetch, now: NOW })).toBeNull();
    expect(await fetchHeartbeat({ fetch: unexpected.fetch, now: NOW })).toBeNull();
  });
});

describe("heartbeatGrade", () => {
  it("is fresh up to 3 days, steady up to 10, aging up to 20 and stale beyond", () => {
    expect([0, 3, 4, 10, 11, 20, 21].map(heartbeatGrade)).toEqual([
      "fresh",
      "fresh",
      "steady",
      "steady",
      "aging",
      "aging",
      "stale",
    ]);
    expect(heartbeatGrade(null)).toBe("unavailable");
  });
});

describe("heartbeatAge", () => {
  it("reads as days ago", () => {
    expect(heartbeatAge(0)).toBe("today");
    expect(heartbeatAge(1)).toBe("1 day ago");
    expect(heartbeatAge(12)).toBe("12 days ago");
  });
});
