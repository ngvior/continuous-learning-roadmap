---
title: Build the Roadmap Site
type: project
lane: backend
order: 1
status: done
hours: 30
prerequisites: []
links:
  - label: Repository
    url: https://github.com/ngvior/continuous-learning-roadmap
started: "2026-09-11"
finished: "2026-09-12"
language: typescript
repo: https://github.com/ngvior/continuous-learning-roadmap
demo: https://continuous-learning-roadmap.vercel.app
phases:
  - Content schema and validator
  - Roadmap CLI
  - Swimlane graph
  - Node detail sheet
  - Heartbeat
attached: []
---

The public Next.js application that renders this Roadmap: its Lanes, Nodes, Prerequisites and live Status, plus the Heartbeat that shows how long ago the last Content Commit landed. It is the first Project because everything else on the Roadmap becomes visible through it, and because the accountability mechanism (a public "last Content Commit N days ago" signal, no deadlines) only works once the site is live. Content lives as Markdown and YAML files validated by a schema, so a Content Commit is a plain git commit.

## Log

- 2026-09-11: Bootstrapped the Next.js skeleton and made the first Vercel deploy.
- 2026-09-11: Landed the content module: the Zod schema, the loader that derives Next and unlocks, and the cross-file validator wired as prebuild.
- 2026-09-12: Roadmap CLI landed
- 2026-09-12: Swimlane graph live
- 2026-09-12: Node detail sheet live
- 2026-09-12: Heartbeat live
- 2026-09-12: Visual polish landed
- 2026-09-12: README and MVP verification done
