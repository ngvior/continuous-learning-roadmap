# Continuous Learning Roadmap

A single, public learning plan for one person (backend-to-AI-engineer path) and the site that shows its progress. It exists so the plan is ordered, visible, and hard to abandon quietly.

## Language

**Roadmap**:
The ordered learning plan itself: every Node, grouped into Lanes, sequenced by prerequisite.
_Avoid_: Curriculum, syllabus, plan, path

**Roadmap Site**:
The public web application that renders the Roadmap and its live Status.
_Avoid_: The web, the app, the tracker, dashboard

**Node**:
One unit on the Roadmap: either a Resource to study or a Project to build.
_Avoid_: Item, step, task, card

**Resource**:
A Node that is consumed (course, playlist, repo, book, PDF, certification track).
_Avoid_: Material, content, link

**Project**:
A Node that is built and yields a showable artifact for the portfolio.
_Avoid_: Exercise, assignment, deliverable

**Lane**:
A thematic grouping of Nodes within the single Roadmap. Roadmap v1 has four: Foundations, Machine Learning, AI Engineering, Backend.
_Avoid_: Track, roadmap (plural), category, section

**Status**:
The state of one Node: `pending`, `in-progress`, or `done`.
_Avoid_: Progress, state, phase

**Heartbeat**:
The publicly visible "last Content Commit N days ago" signal for the whole Roadmap. No deadlines exist; the Heartbeat is the accountability mechanism.
_Avoid_: Streak, deadline, due date, last updated

**Content Commit**:
A commit that touches the Roadmap's content (a Node or the Lanes). Only Content Commits move the Heartbeat; a change to the Roadmap Site's code does not.
_Avoid_: Update, activity, progress commit

**Prerequisite**:
A Node that must be `done` before another Node may become `in-progress`. Prerequisites are the hard constraint of the Roadmap.
_Avoid_: Dependency, blocker, requirement

**Suggested Order**:
The single linearization of the Roadmap the owner intends to follow. It is one valid path through the Prerequisites, never a constraint stronger than them; the owner may deviate from it, never from a Prerequisite.
_Avoid_: Sequence, queue, plan, priority

**Next**:
The first `pending` Node in the Suggested Order whose Prerequisites are all `done`.
_Avoid_: Up next, current, todo, backlog

**ORT Overlap**:
A mark on a Resource whose ground is covered by a named course of the ORT tecnicatura. When that course ends, the Resource may be marked `done` without being consumed (a fast-forward). It is a mark on the Node, not a Status.
_Avoid_: Skip, exempt, waived, fourth status

**Log**:
The dated list of short entries the owner writes on one Node while working it (a milestone, a finding, a doubt). Public, shown with the Node. It records what happened, never a plan.
_Avoid_: Journal, diary, changelog, notes

**Attached Reading**:
A short Resource (under roughly three hours) that is not a Node of its own. It is listed inside the Project that consumes it and has no Status.
_Avoid_: Mini-node, sub-resource, link, extra
