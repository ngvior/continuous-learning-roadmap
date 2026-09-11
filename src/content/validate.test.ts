import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { loadRoadmap } from "./load";
import { VALIDATION_RULES, validateRoadmap } from "./validate";

const FIXTURES = fileURLToPath(new URL("./__fixtures__", import.meta.url));

async function issuesOf(fixture: string) {
  return validateRoadmap(await loadRoadmap(path.join(FIXTURES, fixture)));
}

describe("validateRoadmap", () => {
  it("passes on a valid Roadmap", async () => {
    expect(await issuesOf("valid")).toEqual([]);
  });

  it("passes on the real content directory", async () => {
    expect(validateRoadmap(await loadRoadmap())).toEqual([]);
  });

  // Every rule owns a fixture directory named after it, so a new rule without a
  // failing fixture fails this suite.
  it.each(VALIDATION_RULES)("catches %s", async (rule) => {
    const issues = await issuesOf(rule);

    expect(issues.map((issue) => issue.rule)).toContain(rule);
  });

  it("names the offending file and explains the rule", async () => {
    const [issue] = await issuesOf("prerequisite-exists");

    expect(issue.file).toMatch(/prerequisite-exists\/nodes\/alpha\.md$/);
    expect(issue.message).toBe('Prerequisite "ghost" has no Node file');
  });

  it("reports every Node sharing an in-progress Status", async () => {
    const issues = await issuesOf("single-in-progress");
    const offenders = issues
      .filter((issue) => issue.rule === "single-in-progress")
      .map((issue) => path.basename(issue.file));

    expect(offenders).toEqual(["alpha.md", "beta.md"]);
  });

  it("reports a Prerequisite that is not done", async () => {
    const issues = await issuesOf("prerequisites-done");

    expect(
      issues.find((issue) => issue.rule === "prerequisites-done")?.message,
    ).toBe(
      'an in-progress Node requires every Prerequisite to be done, but "alpha" is pending',
    );
  });

  it("reports a cycle once, as a path", async () => {
    const cycles = (await issuesOf("no-cycles")).filter(
      (issue) => issue.rule === "no-cycles",
    );

    expect(cycles).toHaveLength(1);
    expect(cycles[0].message).toMatch(/^Prerequisites form a cycle: /);
  });

  it("reports an undeclared Lane", async () => {
    const issues = await issuesOf("lane-exists");

    expect(issues.map((issue) => issue.message)).toEqual([
      'lane "nowhere" is not declared in lanes.yaml',
    ]);
  });

  it("reports a gap in Suggested Order", async () => {
    const issues = (await issuesOf("order-contiguous")).filter(
      (issue) => issue.rule === "order-contiguous",
    );

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toBe(
      "order must be contiguous 1..3 across the 3 Nodes, found 4",
    );
  });

  it("reports a Prerequisite placed later in Suggested Order", async () => {
    const issues = (await issuesOf("topological-order")).filter(
      (issue) => issue.rule === "topological-order",
    );

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toMatch(/Prerequisite "alpha" has order 2/);
  });
});
