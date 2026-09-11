---
status: accepted
---

# Heartbeat is read from the GitHub commits API, not from git at build time

The Heartbeat is the date of the last Content Commit (a commit touching `content/`). The obvious source is `git log -1 -- content/` during the Vercel build, but Vercel builds run on a shallow clone of ten commits with no remote configured, so the query returns nothing whenever the last Content Commit is older than ten commits. We read it instead from `GET /repos/ngvior/continuous-learning-roadmap/commits?path=content&per_page=1` in a server component under hourly ISR (`revalidate = 3600`), unauthenticated, which is enough for a public repo at 60 requests per hour and keeps serving the last good page if a regeneration fails.

## Considered options

- `git log` at build time behind `VERCEL_DEEP_CLONE=true`: works, but the variable is undocumented and unsupported.
- The Roadmap CLI writing a `content/heartbeat.json` on every commit: lies as soon as a Content Commit is made by hand.
- Any commit on `main` as the Heartbeat: rejected on domain grounds; a style tweak on the site is not learning activity.
