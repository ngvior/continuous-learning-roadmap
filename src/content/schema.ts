import { z } from "zod";

export const NODE_STATUSES = ["pending", "in-progress", "done"] as const;
export const NODE_TYPES = ["resource", "project"] as const;
export const PROJECT_LANGUAGES = ["python", "typescript"] as const;

export type NodeStatus = (typeof NODE_STATUSES)[number];
export type NodeType = (typeof NODE_TYPES)[number];
export type ProjectLanguage = (typeof PROJECT_LANGUAGES)[number];

/** Node and Lane ids are kebab-case slugs; a Node id is also its filename. */
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a kebab-case id");

/** Local calendar dates, never timestamps. Quote them in YAML. */
const localDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be a YYYY-MM-DD date");

export const linkSchema = z.strictObject({
  label: z.string().min(1),
  url: z.url(),
});

export const attachedReadingSchema = z.strictObject({
  title: z.string().min(1),
  url: z.url(),
  hours: z.number().positive(),
});

const commonNodeShape = {
  title: z.string().min(1),
  lane: slug,
  order: z.number().int().positive(),
  status: z.enum(NODE_STATUSES),
  hours: z.number().positive(),
  prerequisites: z.array(slug).default([]),
  links: z.array(linkSchema).default([]),
  started: localDate.optional(),
  finished: localDate.optional(),
};

export const resourceFrontmatterSchema = z.strictObject({
  ...commonNodeShape,
  type: z.literal("resource"),
  /** The ORT Overlap mark: the ORT course whose ground this Resource covers. */
  ort: z.string().min(1).optional(),
});

export const projectFrontmatterSchema = z.strictObject({
  ...commonNodeShape,
  type: z.literal("project"),
  language: z.enum(PROJECT_LANGUAGES),
  repo: z.url().optional(),
  demo: z.url().optional(),
  phases: z.array(z.string().min(1)).default([]),
  attached: z.array(attachedReadingSchema).default([]),
});

export const nodeFrontmatterSchema = z
  .discriminatedUnion("type", [
    resourceFrontmatterSchema,
    projectFrontmatterSchema,
  ])
  .superRefine((node, ctx) => {
    if (node.status === "pending") {
      if (node.started !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["started"],
          message: 'a pending Node must not carry "started"',
        });
      }
      if (node.finished !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["finished"],
          message: 'a pending Node must not carry "finished"',
        });
      }
    }

    if (node.status === "in-progress") {
      if (node.started === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["started"],
          message: 'an in-progress Node requires "started"',
        });
      }
      if (node.finished !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["finished"],
          message: 'an in-progress Node must not carry "finished"',
        });
      }
    }

    if (node.status === "done") {
      if (node.started === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["started"],
          message: 'a done Node requires "started"',
        });
      }
      if (node.finished === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["finished"],
          message: 'a done Node requires "finished"',
        });
      }
    }

    if (
      node.type === "project" &&
      node.status !== "pending" &&
      node.repo === undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["repo"],
        message: `"repo" is required once a Project is ${node.status}`,
      });
    }
  });

export const laneSchema = z.strictObject({
  id: slug,
  title: z.string().min(1),
  order: z.number().int().positive(),
  description: z.string().min(1),
});

export const lanesSchema = z.array(laneSchema).min(1);

export type Link = z.infer<typeof linkSchema>;
export type AttachedReading = z.infer<typeof attachedReadingSchema>;
export type ResourceFrontmatter = z.infer<typeof resourceFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type NodeFrontmatter = z.infer<typeof nodeFrontmatterSchema>;
export type Lane = z.infer<typeof laneSchema>;
