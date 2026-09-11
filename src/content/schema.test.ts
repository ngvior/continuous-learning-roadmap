import { describe, expect, it } from "vitest";
import { lanesSchema, nodeFrontmatterSchema } from "./schema";

const resource = {
  title: "Alpha",
  type: "resource",
  lane: "foundations",
  order: 1,
  status: "pending",
  hours: 2,
};

const project = {
  ...resource,
  type: "project",
  language: "typescript",
};

function messagesOf(input: unknown): string[] {
  const result = nodeFrontmatterSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
}

describe("nodeFrontmatterSchema", () => {
  it("fills prerequisites and links with empty arrays", () => {
    const parsed = nodeFrontmatterSchema.parse(resource);

    expect(parsed).toMatchObject({ prerequisites: [], links: [] });
  });

  it("fills the Project-only arrays with empty arrays", () => {
    const parsed = nodeFrontmatterSchema.parse(project);

    expect(parsed).toMatchObject({ phases: [], attached: [] });
  });

  it("rejects an unknown frontmatter key", () => {
    expect(messagesOf({ ...resource, notes: "typo" })).not.toHaveLength(0);
  });

  it("rejects a Resource carrying Project-only fields", () => {
    expect(messagesOf({ ...resource, language: "typescript" })).not.toHaveLength(
      0,
    );
  });

  it("rejects an unknown type", () => {
    expect(messagesOf({ ...resource, type: "book" })).not.toHaveLength(0);
  });

  it("accepts the ORT Overlap mark on a Resource", () => {
    expect(messagesOf({ ...resource, ort: "Algebra II" })).toHaveLength(0);
  });

  it("rejects a non-kebab-case Prerequisite id", () => {
    expect(
      messagesOf({ ...resource, prerequisites: ["Not A Slug"] }),
    ).not.toHaveLength(0);
  });

  it("rejects a link without a URL", () => {
    expect(
      messagesOf({ ...resource, links: [{ label: "Playlist", url: "nope" }] }),
    ).not.toHaveLength(0);
  });

  describe("date rules", () => {
    it("forbids started on a pending Node", () => {
      expect(messagesOf({ ...resource, started: "2026-01-01" })).toContain(
        'a pending Node must not carry "started"',
      );
    });

    it("forbids finished on a pending Node", () => {
      expect(messagesOf({ ...resource, finished: "2026-01-01" })).toContain(
        'a pending Node must not carry "finished"',
      );
    });

    it("requires started on an in-progress Node", () => {
      expect(messagesOf({ ...resource, status: "in-progress" })).toContain(
        'an in-progress Node requires "started"',
      );
    });

    it("forbids finished on an in-progress Node", () => {
      const messages = messagesOf({
        ...resource,
        status: "in-progress",
        started: "2026-01-01",
        finished: "2026-01-02",
      });

      expect(messages).toContain(
        'an in-progress Node must not carry "finished"',
      );
    });

    it("requires started and finished on a done Node", () => {
      const messages = messagesOf({ ...resource, status: "done" });

      expect(messages).toContain('a done Node requires "started"');
      expect(messages).toContain('a done Node requires "finished"');
    });

    it("rejects a date that is not YYYY-MM-DD", () => {
      expect(
        messagesOf({ ...resource, status: "in-progress", started: "01/01/2026" }),
      ).toContain("must be a YYYY-MM-DD date");
    });

    it("accepts an in-progress Node with started", () => {
      expect(
        messagesOf({ ...resource, status: "in-progress", started: "2026-01-01" }),
      ).toHaveLength(0);
    });
  });

  describe("Project repo rule", () => {
    it("allows a pending Project without repo", () => {
      expect(messagesOf(project)).toHaveLength(0);
    });

    it("requires repo once a Project is in-progress", () => {
      expect(
        messagesOf({ ...project, status: "in-progress", started: "2026-01-01" }),
      ).toContain('"repo" is required once a Project is in-progress');
    });

    it("requires repo once a Project is done", () => {
      const messages = messagesOf({
        ...project,
        status: "done",
        started: "2026-01-01",
        finished: "2026-01-02",
      });

      expect(messages).toContain('"repo" is required once a Project is done');
    });
  });
});

describe("lanesSchema", () => {
  it("parses a Lane list", () => {
    const lanes = [
      { id: "foundations", title: "Foundations", order: 1, description: "Math." },
    ];

    expect(lanesSchema.parse(lanes)).toEqual(lanes);
  });

  it("rejects an empty Lane list", () => {
    expect(lanesSchema.safeParse([]).success).toBe(false);
  });

  it("rejects a Lane without a description", () => {
    expect(
      lanesSchema.safeParse([{ id: "foundations", title: "F", order: 1 }])
        .success,
    ).toBe(false);
  });
});
