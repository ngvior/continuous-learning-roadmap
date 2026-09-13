# Continuous Learning Roadmap

A public, self-taught learning roadmap for a backend engineer moving toward AI engineering, plus the Roadmap Site that renders it.

- Live: https://continuous-learning-roadmap.vercel.app
- Vocabulary: [`CONTEXT.md`](CONTEXT.md). Roadmap, Node, Lane, Status, Heartbeat and the rest mean exactly what the glossary says.
- Decisions: [`docs/adr/`](docs/adr/); research behind the Roadmap in [`docs/research/`](docs/research/)
- Site: Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel

## Working the Roadmap

Git is the source of truth. The Roadmap is plain files under `content/`, and a Status change is a commit.

### Content layout

```text
content/
  lanes.yaml          # the four Lanes: id, title, order, description
  nodes/<id>.md       # one Node per file; the filename is the Node id
```

A Node file is YAML frontmatter followed by a Markdown description and an optional `## Log` section:

```markdown
---
title: "Brunton: Probability Bootcamp"
type: resource            # resource | project
lane: foundations         # a Lane id from lanes.yaml
order: 7                  # position in the Suggested Order, 1..N
status: pending           # pending | in-progress | done
hours: 11
prerequisites:
  - brunton-intro-to-data-science
links:
  - label: Probability Bootcamp playlist (YouTube)
    url: https://www.youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V
---

What the Node covers and why it sits here.
```

Projects also carry `language` (`python` | `typescript`), and optionally `repo`, `demo`, `phases` and `attached` (Attached Reading: `title`, `url`, `hours`). A Resource may carry `ort`, the ORT Overlap mark. `started` and `finished` are local dates the Roadmap CLI writes for you. The schema lives in `src/content/schema.ts`.

### Rules the validator enforces

The same checks run before every build (`pnpm build`) and inside every Roadmap CLI command, so an invalid Roadmap never ships and never gets committed:

- **WIP limit**: at most one Node is `in-progress`.
- A Node may leave `pending` only when every Prerequisite is `done`.
- Prerequisites exist and form no cycle; every Node's Lane exists.
- The Suggested Order is contiguous (`1..N`), unique, and never puts a Node before one of its Prerequisites.
- Dates match the Status: `pending` has none, `in-progress` has `started`, `done` has both. A Project that has left `pending` needs a `repo`.

Run the checks on their own with `pnpm validate`.

### Status transitions

```text
pending --start--> in-progress --done--> done
   ^                    |
   +-------pause--------+

pending --done--> done    (ORT fast-forward, Resources with `ort` only)
```

The **ORT fast-forward**: when the ORT course named in a Resource's `ort` mark ends, that Resource may go straight from `pending` to `done` without being consumed. It is a shortcut through a transition, not a fourth Status.

### Roadmap CLI

Each command edits one Node file, validates the whole Roadmap, and makes the Content Commit `content(<id>): <command or note>` for you. It refuses to run while anything is staged or the working tree is dirty outside `content/`, and a refused command leaves no diff behind.

| Command | What it does | Example |
| --- | --- | --- |
| `start` | `pending` to `in-progress`, writes `started` | `pnpm roadmap start brunton-intro-to-data-science` |
| `note` | Appends a dated line to the Node's Log | `pnpm roadmap note build-the-roadmap-site "Heartbeat live"` |
| `pause` | `in-progress` back to `pending`, clears the dates | `pnpm roadmap pause brunton-intro-to-data-science` |
| `done` | `in-progress` to `done`, writes `finished` (or the ORT fast-forward from `pending`) | `pnpm roadmap done brunton-intro-to-data-science` |

The commands commit locally; push to publish.

### The Log

The Log is the `## Log` section at the end of a Node file: one `- YYYY-MM-DD: text` line per entry, shown on the site in the Node's detail sheet. It records what happened (a milestone, a finding, a doubt), never a plan. Write it with `pnpm roadmap note`, one line at a time.

### The Heartbeat

The masthead shows how long ago the last **Content Commit** landed: the newest commit touching `content/`. Only Content Commits move it; a change to the site's code does not. The site reads it from the GitHub commits API and regenerates hourly, so a pushed Content Commit shows up within the hour. Why not `git log` at build time: [ADR 0001](docs/adr/0001-heartbeat-from-github-commits-api.md).

### Worked example: add a Log entry and move the Heartbeat

```bash
pnpm roadmap note build-the-roadmap-site "Read the Next.js caching guide"
git push
```

The first command appends the entry and commits `content(build-the-roadmap-site): Read the Next.js caching guide`. After the push, Vercel deploys, the entry appears in the Node's detail sheet, and within an hour the Heartbeat reads `last commit today`.

## Development

```bash
pnpm install
pnpm dev          # local site on http://localhost:3000
pnpm test         # Vitest: schema, validator, CLI edits, Heartbeat, background field
pnpm lint
pnpm build        # runs the content validator first (prebuild), then next build
```

Deploys: every push to `main` deploys production on Vercel (project linked to this GitHub repo). There is no separate release step.
