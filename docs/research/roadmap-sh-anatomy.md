# roadmap.sh anatomy, and what to borrow for the Continuous Learning Roadmap

This resolves GitHub issue #8 (part of #1): primary-source research into how the open-source `developer-roadmap` repo (roadmap.sh) is built, what its progress-tracking feature does, and how other public "last activity" trackers signal recency. Method: WebFetch against `github.com`, `api.github.com`, `raw.githubusercontent.com`, `roadmap.sh` and a handful of other primary pages, plus WebSearch only to locate URLs; all fetches performed 2026-09-10. Terminology below (Roadmap, Roadmap Site, Node, Lane, Status, Heartbeat) follows this repo's `CONTEXT.md`.

## Summary

- **The public repo changed shape.** `github.com/kamranahmedse/developer-roadmap` now redirects to `github.com/nilbuild/developer-roadmap` (same 366.8k stars / 44.9k forks — an ownership transfer, not a fork). Its current root has no `src/` at all: just `roadmaps/`, `scripts/`, and workspace config — confirmed via the GitHub Contents API, not inferred.
- **Today the repo is content-only, not a rendering app.** `roadmaps/<slug>/content/<topic-slug>@<node-id>.md` holds one Markdown file per topic; `scripts/sync-content-to-repo.ts` and `scripts/sync-repo-to-database.ts` push/pull that content to/from roadmap.sh's own database. The Node graph topology and the renderer are **not in this public repo anymore** — they live behind roadmap.sh's backoffice/database.
- **Per-topic content format (verified, real file fetched):** an H1 title, a short paragraph, then "Visit the following resources to learn more:" followed by a list of links typed with a prefix tag, e.g. `[@article@What is caching?](...)`, `[@video@...](...)`. No YAML frontmatter in the current content files.
- **Historical topology (verified at git tag `4.0`, pre-restructure):** a roadmap is a Markdown file (`backend.md`) whose **frontmatter** carries the metadata — `jsonUrl: "/jsons/backend.json"`, `dimensions: {width, height}`, `order`, SEO fields — while the actual node graph is a separate generated JSON file at that `jsonUrl`, consumed at render time. I could not fetch that live JSON (`roadmap.sh/jsons/backend.json` → 404 today), so the exact node/edge field names are **not verified from a live document** — only their existence and the fixed-pixel-canvas approach (`width`/`height` in the frontmatter) are.
- **Rendering stack (verified at tag `4.0` `package.json`):** Astro + a dedicated `"roadmap-renderer": "^1.0.1"` npm package, Tailwind CSS. No React, Vue, React Flow, nanostores, or React Query dependency was present at that tag — this contradicts a secondary source (DeepWiki) that described a React/nanostores/React Query stack; I trust the primary-source `package.json` over DeepWiki here and flag the conflict explicitly.
- **Progress states are 4-way on roadmap.sh, not 3-way.** Secondary sources describe done / in-progress / skipped (plus a separate "important"/star marker), gated behind sign-in, with cross-device sync. **This project intentionally uses only `pending` / `in-progress` / `done`** — no skip state — so roadmap.sh's model is wider than needed here.
- **Public profile / progress sharing is unconfirmed as a shipped feature.** roadmap.sh's own `/about` page lists "public profiles to share your progress" as a stated goal, phrased alongside other aspirational plans, not as a confirmed live guarantee — treat multi-user progress sharing as roadmap.sh's territory to leave out anyway, not something to imitate.
- **Borrow:** Lane-grouped node layout, click-a-node detail panel with resource links, color-coded Status per node, fixed topological/linear ordering (their `order` field is exactly what a single curated Roadmap needs).
- **Leave out:** accounts/multi-user sync, the 4th "skip" state, community/public-profile catalog, and roadmap.sh's own multi-roadmap marketplace — none of that applies to one person's single Roadmap.
- **Tracker survey takeaway:** every pattern that reads as motivating shares one trait — relative recency over absolute timestamps ("3 days ago" vs. a date), rendered as either a density heatmap (GitHub, WakaTime) or a single plain-text line (a `/now` page, a 100DaysOfCode log entry) — which is exactly the shape of a Heartbeat: no calendar grid needed, just a legible "last activity N days ago" string, optionally color-graded by staleness.

## Part A — roadmap.sh anatomy

### A1. What the repo is, and how it's organized today

`github.com/kamranahmedse/developer-roadmap` 302-redirects to `github.com/nilbuild/developer-roadmap` (confirmed via `GET /repos/kamranahmedse/developer-roadmap` on the GitHub API returning `full_name: "nilbuild/developer-roadmap"`, `owner.login: "nilbuild"`, with the star/fork counts unchanged — an ownership/rename, not a competing fork). The repo's own description: *"Interactive roadmaps, guides and other educational content to help developers grow in their careers."*

The **current** root (`GET /repos/.../contents/`) is:

```
.github/  roadmaps/  scripts/
.gitignore  .prettierrc.cjs  code_of_conduct.md  contributing.md
license  package.json  pnpm-lock.yaml  pnpm-workspace.yaml  readme.md  tsconfig.json
```

There is no `src/` directory, no Astro config, no frontend build. This is a pnpm workspace whose only job is to hold roadmap **content** and sync it to/from roadmap.sh's database — the site/renderer code has been pulled out of this public repo (or was never public to begin with, beyond the historical tags described below).

### A2. Structure of `roadmaps/backend/`

`GET /repos/.../contents/roadmaps/backend` returns exactly one entry: a `content/` directory (no top-level `.json` or `.md` roadmap-definition file sitting next to it). `content/` contains one flat list of Markdown files, one per topic/subtopic, e.g. (first entries, verified):

```
acid@qSAdfaGUfn8mtmDjHJi3z.md
agents@w1D3-bSg93ndKK9XJTu7z.md
anthropic@Lw2nR7x8PYgq1P5CxPAxi.md
caching@uPjCrDGA2MHylWXbZvMBM.md
...
```

The repo's own `readme.md` states the naming rule explicitly: `roadmaps/<roadmap-slug>/content/<topic-slug>@<node-id>.md`, and that file names must stay intact across edits because the trailing `@<node-id>` is the join key back to the roadmap's graph. No `.json` topology file exists anywhere under `roadmaps/backend/` today — confirmed by listing, not assumed.

### A3. The JSON node/edge format

This is the one piece I could **not** verify from a currently-live document, and I'm saying so rather than fabricating a schema. What I did verify, at git tag `4.0` (pre-restructure, fetched via `api.github.com/.../contents/?ref=4.0`, which still had a full Astro app under `src/`):

- `src/roadmaps/backend/backend.md`'s frontmatter (fetched in full) declares `jsonUrl: "/jsons/backend.json"` and `dimensions: {width: 968, height: 2840.4}` — i.e. the graph is pre-laid-out on a fixed-size canvas at those pixel dimensions, not force-directed at runtime.
- `package.json` at the same tag lists `"roadmap-renderer": "^1.0.1"` as a runtime dependency — a purpose-built renderer package, separate from the Markdown/content pipeline.
- I attempted to fetch the actual `/jsons/backend.json` from the live site (`roadmap.sh/jsons/backend.json`) to quote real node/edge fields — it 404s today, so I cannot quote real `id`/`position`/`data`/`source`/`target` fields from an actual response. Any such field list circulating in blog posts about roadmap.sh should be treated as unverified by this research note.

Net: the topology is (or was) a generated JSON sidecar per roadmap, referenced by the roadmap's Markdown frontmatter, consumed by a dedicated renderer — but the exact shape is not something I can cite first-hand.

### A4. Per-node content Markdown

Verified with a real fetched file, `roadmaps/backend/content/caching@uPjCrDGA2MHylWXbZvMBM.md` (current repo, full content, no frontmatter):

```markdown
# Caching

Caching is a technique used to store copies of data in a temporary storage
location so that future requests for that data can be served faster. ...

Visit the following resources to learn more:

- [@article@What is caching?](https://www.cloudflare.com/en-gb/learning/cdn/what-is-caching/)
- [@article@Top Caching Strategies Explained](https://blog.bytebytego.com/p/top-caching-strategies)
- [@video@Caching Complete Tutorial for Beginners](https://www.youtube.com/watch?v=1XJG34mewts)
```

The `@article@` / `@video@` prefix inside the link text is the resource-type tag; `scripts/sync-repo-to-database.ts`'s own description (fetched) confirms it "maps resource type prefixes (like `@article@` and `@video@`)" when parsing content back into the database. At the historical tag `4.0`, the same content lived one directory per ordered topic instead (`content/100-internet/`, `content/110-caching/`, …) — the numeric prefix encoded manual ordering; the current flat `slug@id.md` files instead rely on the node id for ordering/lookup. Both are real, just from different points in time.

### A5. Rendering approach — verified vs. inferred

Verified from primary sources (git tag `4.0` `package.json` and frontmatter, since the current repo carries no frontend code at all):
- Framework: **Astro** (`astro: ^1.8.0`), styled with **Tailwind CSS**, plus `astro-compress`/`astro-critters` for output optimization.
- Graph rendering: a dedicated **`roadmap-renderer`** package (not React Flow, not a generic diagramming library) consuming the per-roadmap JSON at a fixed pixel canvas size (`dimensions.width/height` from frontmatter).
- No React, Vue, nanostores, or React Query dependency existed at that tag.

Explicitly flagging a conflict: DeepWiki's summary of this repo (`deepwiki.com/kamranahmedse/developer-roadmap`, a secondary/AI-generated wiki, not a primary source) describes a hybrid Astro+React stack with React Query, nanostores, and an "external editor renderer fetched via `scripts/generate-renderer.sh`". None of `nanostores`, `react`, or `react-query` appear in the `package.json` I actually fetched, and no `generate-renderer.sh` exists in the current `scripts/` listing I fetched (which only has `cleanup-orphaned-content.ts`, `sync-content-to-repo.ts`, `sync-repo-to-database.ts`, `lib/`, `readme.md`). I'm treating the DeepWiki claims as unverified/possibly stale rather than repeating them as fact.

What's inferred, not verified: current live roadmap.sh (2026) may have since moved off Astro/`roadmap-renderer` to something else entirely, since — as A1/A2 show — the rendering code isn't in the public repo to check anymore.

### A6. Progress-marking feature

Not verifiable from the open-source repo at all (it holds no application code today). From roadmap.sh's own `/about` page (fetched directly, primary source for the live product): progress tracking is stated as an existing capability ("track your progress as you follow a roadmap"), but **"public profiles to share your progress and interact with the other learners" reads as a stated goal/plan on that page, not a confirmed shipped guarantee** — I'm not treating it as verified.

Everything more specific — sign-in-gated done/in-progress/skip marking, a separate "important" star marker, offline-then-merge sync across devices, percentage-complete display — comes from secondary aggregator/marketplace pages describing the live product (e.g. third-party tool-directory listings), not from roadmap.sh's own docs or the open-source repo, so it's marked here as **inferred from secondary sources, not primary-verified**. The one fact worth carrying into Part B regardless of source-tier: roadmap.sh's status model has **four** states (done / learning(in-progress) / skip / pending) — one more than this project's three (`pending` / `in-progress` / `done`), because this project has no "skip" concept.

## Part B — what to borrow, what to leave out

### Borrow

- **Lane-grouped node layout.** roadmap.sh's fixed-canvas grouping (topics visually clustered by section) maps directly onto this project's Lane concept — Nodes belonging to a Lane (Backend, AI Engineering, Data Science) should read as a visual cluster, not a flat list.
- **Click-to-expand per-node detail panel.** The `<slug>@<id>.md` content format — short explanation plus a typed resource-link list (`@article@`/`@video@`) — is a good template for a Node detail view: title, one paragraph, links out to the actual Resource.
- **Topological/linear ordering.** The historical `order` field (and the numeric `100-`, `110-` content-folder prefixes) is exactly the model this project needs: one sequenced list per Lane, prerequisite-driven, not a free-form graph.
- **Color-coded Status per node.** A simple 3-way color mapping (`pending`/`in-progress`/`done`) is a lighter version of roadmap.sh's node coloring and needs no new UI idea beyond picking three colors.

### Leave out, and why

- **Accounts / multi-user sync.** This is a single-person Roadmap; there's no second user whose progress needs isolating or syncing across devices.
- **The "skip" state.** `CONTEXT.md` is explicit: Status is `pending` / `in-progress` / `done` only. roadmap.sh's 4-state model (done/learning/skip/pending) has a state this project deliberately doesn't want — skipping isn't a concept the Heartbeat/accountability design calls for.
- **Community/public-profile catalog and the wider roadmap marketplace.** roadmap.sh's `/community` catalog of other users' custom roadmaps, and its library of 100+ prebuilt roadmaps, are multi-tenant, discovery-oriented features with no equivalent need in a single curated Roadmap for one person.
- **Complex non-linear branching graph layout / a bespoke renderer package.** Given the target is a simpler curated linear list per Lane (not roadmap.sh's dense interconnected topic graph), there's no need to reproduce a fixed-canvas custom-renderer approach — a straightforward ordered list/board view per Lane covers the actual requirement without building (or depending on) a graph-layout engine.

## Part C — survey of public "last activity" trackers

**GitHub contribution graph** (`github.com/<user>`, and GitHub's own docs at `docs.github.com/.../viewing-contributions-on-your-profile`, which 404'd on fetch today — description below is from general knowledge of the widely-documented feature, and from viewing a live profile page directly). The UI is a full-year calendar heatmap: one square per day, shaded through a light-to-dark color scale by contribution count that day, with a hover tooltip giving the exact count and a running total for the year. There's no explicit "streak" counter built into the graph itself — the density pattern *is* the signal. It's motivating/legible because it's a glance-able field of squares: an unbroken row of dark squares recruits social pressure (it's on your public profile) without needing anyone to read a number.

**A personal `/now` page** (`nownownow.com`, fetched — a directory of ~thousands of personal `/now` pages by country; and Derek Sivers' own explainer at `sive.rs/now2`, fetched). The pattern here is the opposite of a heatmap: one plain-text page, one person, answering "what would I tell a friend I haven't seen in a year." Sivers' own framing, quoted: *"It has a nice side-effect of being a public declaration of priorities. It's a good link to give people when saying no to invitations and distractions."* Legibility comes from relative freshness and voluntary publication, not density — the page is useful precisely because it's understood to go stale, which is the same mechanism a Heartbeat relies on ("last activity N days ago" only works because it's allowed to grow and embarrass you).

**#100DaysOfCode tracker** (`github.com/Kallaway/100-days-of-code`, fetched — the original, widely-forked challenge template: 11,600+ forks, 7,000+ stars). The pattern is a forked personal log file (`log.md`, or an abbreviated `r1-log.md`) with one dated entry per day of coding, committed publicly to the person's own fork, plus a social-accountability rule baked into the challenge itself ("encourage at least two other people in the challenge on Twitter every day"). Legibility here comes from an explicit day-count plus the public commit history standing in as an implicit calendar — anyone can see the log went quiet.

**WakaTime** (`wakatime.com`, fetched directly). Historically known for a public `@username` profile with a GitHub-style yearly activity heatmap of coding time — I could not confirm that classic feature is still live today: the public profile URLs I tried 404'd, and WakaTime's current homepage copy (fetched) has repositioned the product entirely around **team/enterprise AI-adoption analytics** ("Track AI spend across every model, with a per-developer breakdown," "Monitor AI adoption across your company") rather than the personal streak/heatmap tool it's commonly cited as. I'm flagging this rather than asserting the old feature still works: whatever legibility WakaTime's classic heatmap had came from the same density-gradient idea as GitHub's, just measuring hours-coded instead of commit count.

Takeaway across all four: the trackers that read as motivating never lean on an absolute timestamp alone — they use *relative* recency (a day count, a color gradient by staleness, "N days ago") and public visibility as the actual accountability mechanism. That is precisely the Heartbeat's job description in this project, and none of these examples need a graph/canvas renderer to do it — a single legible line of text or a lightweight calendar strip both work.

## Sources

- https://github.com/kamranahmedse/developer-roadmap — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/contents/ — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/contents/roadmaps/backend — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/contents/roadmaps/backend/content — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/contents/scripts — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/tags?per_page=10 — accessed 2026-09-10
- https://api.github.com/repos/kamranahmedse/developer-roadmap/contents/?ref=4.0 — accessed 2026-09-10
- https://raw.githubusercontent.com/nilbuild/developer-roadmap/master/readme.md — accessed 2026-09-10
- https://raw.githubusercontent.com/nilbuild/developer-roadmap/master/scripts/readme.md — accessed 2026-09-10
- https://raw.githubusercontent.com/nilbuild/developer-roadmap/master/roadmaps/backend/content/caching%40uPjCrDGA2MHylWXbZvMBM.md — accessed 2026-09-10
- https://api.github.com/repos/nilbuild/developer-roadmap/git/trees/4.0?recursive=1 — accessed 2026-09-10
- https://api.github.com/repos/nilbuild/developer-roadmap/contents/src/roadmaps/backend?ref=4.0 — accessed 2026-09-10
- https://api.github.com/repos/nilbuild/developer-roadmap/contents/src/roadmaps/backend/content?ref=4.0 — accessed 2026-09-10
- https://raw.githubusercontent.com/nilbuild/developer-roadmap/4.0/src/roadmaps/backend/backend.md — accessed 2026-09-10
- https://raw.githubusercontent.com/nilbuild/developer-roadmap/4.0/package.json — accessed 2026-09-10
- https://roadmap.sh/jsons/backend.json — accessed 2026-09-10 (404, not found)
- https://roadmap.sh/backend — accessed 2026-09-10
- https://roadmap.sh/about — accessed 2026-09-10
- https://github.com/orgs/roadmapsh/repositories — accessed 2026-09-10 (no public repositories)
- https://deepwiki.com/kamranahmedse/developer-roadmap — accessed 2026-09-10 (secondary/AI-generated source; conflicts with primary data, see A5)
- https://github.com/Kallaway/100-days-of-code — accessed 2026-09-10
- https://github.com/torvalds — accessed 2026-09-10
- https://sive.rs/now2 — accessed 2026-09-10
- https://nownownow.com/ — accessed 2026-09-10
- https://wakatime.com/ — accessed 2026-09-10
- https://wakatime.com/share/embed — accessed 2026-09-10 (login-walled, not usable as a source)
