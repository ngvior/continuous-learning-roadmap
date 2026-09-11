# Claude Certified Architect: current state (2026-09-10)

Research for issue #6 (part of #1). Primary sources only: anthropic.com, claude.com, Claude Academy (academy.claude.com), Anthropic Academy / Partner Academy on Skilljar (anthropic.skilljar.com, anthropic-partners.skilljar.com), the official exam guide, terms and policy PDFs linked from those pages, and the Pearson VUE program page (the exam delivery vendor named by Anthropic). All sources accessed 2026-09-10. Where a fact is not stated by any of these sources it is marked **not published**.

## TL;DR

- "Claude Certified Architect" is now two separate credentials: **Architect – Foundations (CCAR-F, $125)** and **Architect – Professional (CCAR-P, $175)**. They sit inside a four-certification program launched in full on 2026-07-23 (Associate – Foundations $99, Developer – Foundations $125, plus the two Architect tiers). [S3][S5][S6]
- **Hard gate: exams are only open to people at Claude Partner Network organisations.** Registration requires a partner-company email; personal addresses are rejected and "Certification is currently available only to organizations in the Claude Partner Network." An individual learner cannot sit the exam today. [S6]
- Exam: 60 items, multiple-choice / multiple-response, 4 scenarios drawn from a bank of 6, 120 minutes (~135 min seat time), scaled 100–1,000, pass at 720, proctored by Pearson VUE (online or test centre), English only. [S7][S6]
- Prerequisites: none formal. Foundations is not required for Professional. Exam guide describes the "typical" candidate as having 6+ months hands-on with the Claude API, Agent SDK, Claude Code and MCP. [S6][S7]
- Validity: **12 months**; on-time renewal is a free, non-proctored assessment; a lapsed credential means retaking the full exam at full fee. [S6][S7][S10]
- The prep courses are free and public on Claude Academy / anthropic.skilljar.com; the exam itself is the only paid, partner-gated piece. The courses total roughly 20 hours for the Foundations track. [S4][S9][S12]
- **Recommendation for the Roadmap:** model the free courses as Resource Nodes; do not model the exam as a Node unless/until the user's employer is in the Claude Partner Network (or Anthropic opens the exam to individuals). Details in the last section.

## 1. Program structure and timeline

| Date | Event | Source |
|---|---|---|
| 2026-03-12 | Anthropic announces the Claude Partner Network ($100M) and "Claude Certified Architect, Foundations", "a technical exam for solution architects building production applications with Claude", available immediately to partners. Membership in the network is free. | [S1] |
| 2026-06-25 | Anthropic Certification Exam Policy last updated. | [S11] |
| 2026-06-30 | Exam delivery moves to Pearson VUE, badging to Credly. CCAR-F price rises from $99 to $125. Validity extended from 6 to 12 months for all existing holders. Old practice exam retired. | [S6] |
| 2026-07 | CCAR-F Exam Guide v1.0 "Effective July 2026". | [S7] |
| 2026-07-23 | claude.com blog: "Four role-based certifications" — Associate: Foundations, Developer: Foundations, Architect: Foundations, Architect: Professional. | [S3] |

The two Architect tiers, quoting the 2026-07-23 announcement [S3]:

- **Architect: Foundations** — "for solution architects who design and build agent systems with Claude".
- **Architect: Professional** — "the advanced credential, covering integration architecture, governance, and evaluation, built for the scale of large enterprises".

Partner FAQ on the relationship between them [S6]: "They're separate certifications with separate exams. Foundations proves an architect can build with Claude. Professional proves they can design and govern Claude solutions at enterprise scale. Foundations is the natural place to start and there's no formal prerequisite, so you can take Professional without holding Foundations. Foundations does not convert or upgrade to Professional automatically."

## 2. Eligibility (the blocker)

Quoted from the Partner Academy certification FAQ [S6]:

- "Do I need to work at a partner organization to take an exam? Yes. Certification is available to people at Claude Partner Network organizations. Registration requires a partner email address on a recognized company domain — personal email addresses will not work."
- "Can customers or non-partners get certified? Certification is currently available only to organizations in the Claude Partner Network."
- Minimum age 18, government photo ID at check-in.

The 2026-07-23 announcement says the same: "Exams are available to members of the Claude Partner Network", with a link to claude.com/partners to apply. The partner application is for organisations ("any organization that is bringing Claude to market" [S1]); the partners page publishes no individual-membership route [S2]. Certification itself is "granted only to individuals, not Partners" [S10], but access to sit it flows through the employer.

Anthropic has published no date for opening the exams to the general public: **not published**.

## 3. Exam format (Architect – Foundations, CCAR-F)

From the official exam guide v1.0 [S7] unless noted:

| Attribute | Value |
|---|---|
| Exam code | CCAR-F |
| Items | 60 |
| Item format | Multiple-choice and multiple-response; each item states how many responses to select |
| Structure | 4 scenarios presented, drawn at random from a bank of 6 |
| Time | 120 minutes ("Plan for about 135 minutes of total seat time" [S6]) |
| Delivery | Proctored via Pearson VUE, online (OnVUE) or test centre; ID verified [S3][S8] |
| Scoring | Scaled 100–1,000; pass = 720; report shows pass/fail, scaled score and percent-correct per domain |
| Fee | $125 USD |
| Language | English only; browser translation tools not permitted [S6] |
| Validity | 12 months from award |

Blueprint (domain weights) [S7]:

| # | Domain | Weight |
|---|---|---|
| 1 | Agentic Architecture & Orchestration | 27% |
| 2 | Tool Design & MCP Integration | 18% |
| 3 | Claude Code Configuration & Workflows | 20% |
| 4 | Prompt Engineering & Structured Output | 20% |
| 5 | Context Management & Reliability | 15% |

The six scenarios [S7]: Customer Support Resolution Agent (Agent SDK + MCP tools); Code Generation with Claude Code (CLAUDE.md, slash commands, plan mode); Multi-Agent Research System (coordinator/subagents); Developer Productivity with Claude (Agent SDK, built-in tools, MCP servers); Claude Code for CI/CD (automated review, test generation); Structured Data Extraction (JSON schemas, validation). The guide contains task statements per domain, "How to Prepare" guidance, three hands-on preparation exercises and sample questions with explanations.

Intended audience [S7]: "a solution architect who designs and implements production applications with Claude", who "typically has 6+ months of practical experience building with Claude APIs, Agent SDK, Claude Code, and MCP".

### Architect – Professional (CCAR-P)

- Fee $175 USD; listed and purchasable on Partner Academy [S5][S12].
- Same generic mechanics as all four exams per the FAQ: multiple-choice / multiple-response, 120 minutes, pass at 720 on 100–1,000, 12-month validity [S6].
- Dedicated exam guide PDF: the Professional certification page's template has an `examGuideUrl` slot that is "null until uploaded"; only the Foundations guide is served. Item count, scenarios and domain weights for Professional: **not published**.
- Prep path exists (see section 4.2).

## 4. Preparation courses

### 4.1 Official prep list for Architect – Foundations

The Partner Academy page "Claude Certified Architect – Foundations Prep Courses" [S9] lists seven courses. All are free and all are also public: six are on the open Anthropic Academy catalog (anthropic.skilljar.com, no Anthropic account needed [S4]) and most mirror to Claude Academy (academy.claude.com), where durations are published [S12][S13]. Durations below are from academy.claude.com; where the course is not on Claude Academy the duration is **not published** by Anthropic.

| Course | Public URL | Est. hours | Price | Notes |
|---|---|---|---|---|
| Building with the Claude API | https://academy.claude.com/courses/building-with-the-claude-api (mirror: https://anthropic.skilljar.com/claude-with-the-anthropic-api) | 9 hr, 67 lessons, 8 quizzes | Free | Prereqs: Python, JSON, an API key. Covers prompting, tool use, RAG, agents, MCP, production patterns. Core of Domains 1, 2, 4. [S13] |
| Claude Code in Action | https://academy.claude.com/courses/claude-code-in-action (mirror: https://anthropic.skilljar.com/claude-code-in-action) | 1 hr, 9 lessons | Free | Long hands-off sessions, CLAUDE.md, permissions, scheduled runs, GitHub, plugins. Domain 3. [S14] |
| Introduction to Model Context Protocol | https://academy.claude.com/courses/introduction-to-model-context-protocol (mirror on anthropic.skilljar.com) | 1 hr, 10 lessons | Free | Build MCP servers/clients in Python; tools, resources, prompts. Domain 2. [S12][S15] |
| Claude 101 | https://academy.claude.com/courses/claude-101 (mirror on anthropic.skilljar.com) | 2.5 hr, 13 lessons | Free | Non-technical intro. [S12] |
| AI Fluency: Framework & Foundations | https://academy.claude.com/courses/ai-fluency-framework-foundations | 4 hr, 14 lessons | Free | 4D framework; non-technical. [S12] |
| Claude with Amazon Bedrock | https://anthropic.skilljar.com/claude-in-amazon-bedrock | not published | Free | Platform-specific. [S9] |
| Claude on Google Cloud | https://anthropic.skilljar.com/claude-with-google-vertex | not published | Free | Platform-specific. [S9] |

Total for the five courses with published durations: **17.5 hours**. Technical core only (API + Claude Code in Action + Intro MCP): **11 hours**.

Courses not on the official prep list but on the public catalog and squarely inside the blueprint (Domains 1, 3, 5) [S12]:

| Course | Public URL | Est. hours | Price |
|---|---|---|---|
| Model Context Protocol: Advanced Topics | https://academy.claude.com/courses/model-context-protocol-advanced-topics | 1.5 hr, 11 lessons | Free |
| Introduction to subagents | https://academy.claude.com/courses/introduction-to-subagents | 0.75 hr, 4 lessons | Free |
| Introduction to agent skills | https://academy.claude.com/courses/introduction-to-agent-skills | 1 hr, 6 lessons | Free |
| Claude Code 101 | https://academy.claude.com/courses/claude-code-101 | 1.5 hr, 12 lessons | Free |
| Claude Platform 101 | https://academy.claude.com/courses/claude-platform-101 | 1.5 hr, 13 lessons | Free |

Claude Academy completion badges: "free and are earned by passing a course's quizzes", "don't expire", "no required re-certification when new Claude versions ship"; "The Claude certification exams are a separate paid, proctored program." [S4]

The FAQ is explicit that the exam guide, not the courses, defines scope: "Start with the exam guide for your certification. It lists the domains and task statements the exam covers and is the authoritative source for exam scope. Anthropic Partner Academy also has prep courses — coverage varies by certification". The exam guide's own "How to Prepare" section is hands-on (build an Agent SDK agent, configure Claude Code for a real project, design MCP tools, build an extraction pipeline) rather than a course list. [S6][S7]

### 4.2 Prep path for Architect – Professional (partner-only)

Learning path "Claude Certified Architect – Professional Prep Course" on Partner Academy [S16]: five courses, all marked FREE, 733 minutes (~12.2 hr) total. Stated prerequisites: "Claude 101, Claude Code in Action, AI Fluency: Framework & Foundations, Building with the Claude API, Introduction to Model Context Protocol, and AI Capabilities and Limitations."

| Course | Minutes |
|---|---|
| Claude Platform & Solution Design | 238 |
| Enterprise Integration & Production | 158 |
| Stakeholder Engagement, Lifecycle & GTM | 178 |
| Responsible AI, Safety & Risk for Architects | 114 |
| Team Enablement & Operational Productivity | 45 |

Partner Academy is "partner exclusive" and requires validated login [S5]; these five courses are not on the public catalog as of the access date.

## 5. Cost

| Item | Cost | Source |
|---|---|---|
| Claude Academy / Anthropic Academy courses and completion badges | Free | [S4][S12] |
| Claude Partner Network membership (organisations) | Free | [S1] |
| CCAR-F exam | $125 USD (was $99 before 2026-06-30) | [S6][S7] |
| CCAR-P exam | $175 USD | [S5][S6] |
| Partner-tier discounts | Registered tier: full price. Select / Preferred / Global Premier: 50% off automatically. Global Premier: 100% off through 2026-12-31. | [S6] |
| Retake | Full exam fee (tier discount applies) | [S6] |
| On-time renewal | Free | [S6] |
| Renewal after lapse | Full exam at full fee | [S6][S11] |

## 6. Prerequisites

- No formal prerequisite for either Architect tier; Foundations is not required for Professional. [S6]
- Recommended background for CCAR-F: 6+ months hands-on with Claude API, Agent SDK, Claude Code and MCP. [S7]
- Practical gate: partner-company email, age 18+, government ID. [S6]

## 7. Validity, renewal and retakes

- Validity: "12 months from the date you earn it." Credentials earned under the earlier 6-month rule were auto-extended to 12 months. [S6][S7]
- Renewal: "You'll review what's changed since you certified and complete a free, non-proctored assessment on Anthropic Partner Academy. On-time renewal is free. If your certification lapses, you'll retake the full exam at the full fee". Full renewal mechanics: "Full details will be shared before the first certifications come up for renewal" — i.e. **not yet published** in detail. [S6]
- Exam Policy, section 6: "You need to renew your Certification before the Certification Term expiration date. Once the Certification expires, you will no longer be able to renew that Certification and will need to re-earn the Certification". Anthropic may also require recertification early "if there are material updates to the applicable Courses or Exams" and may retire certifications. [S10][S11]
- Retakes: waiting periods of 14 / 30 / 90 days after the 1st / 2nd / 3rd fail; max 4 attempts per rolling 12 months per exam. [S6][S8]
- Registration is valid for 5 years once purchased; reschedule/cancel window is 48 h per the FAQ and Pearson page, 24 h per the exam guide (sources disagree; the FAQ and Pearson are the more recent operational statements). [S6][S7][S8]
- Badge issued via Credly; recommended to attach a personal email to keep it across employers. [S6]

## 8. Are the courses worth a Resource Node without the exam?

Yes for the technical core, with a caveat about what the Node certifies.

Arguments for:

- The courses are the substance; the exam is a partner-gated $125 proctored check on top of them. Anthropic itself says the exam guide is "the authoritative source for exam scope" and the courses are optional prep whose "coverage varies". The learning value is fully accessible without the exam. [S6]
- The three technical courses on the official prep list (Building with the Claude API 9 hr, Claude Code in Action 1 hr, Intro to MCP 1 hr) plus the four public courses that fill the blueprint gaps (MCP Advanced 1.5 hr, subagents 0.75 hr, agent skills 1 hr, Claude Code 101 1.5 hr) total about **15.75 hours** of free material that maps directly onto the five CCAR-F domains. That is a well-scoped Resource, comparable to other course Nodes on the Roadmap.
- Completion badges are free, verifiable and do not expire [S4], so the Node has a checkable `done` condition.
- Claude 101, AI Fluency, Bedrock and Vertex are on the prep list but add little for a backend engineer already using Claude Code; they can be skipped or folded in as optional.

Arguments against treating it as "the certification track":

- The exam cannot be sat as an individual today; naming the Node "Claude Certified Architect" would imply a credential the user cannot currently obtain. Name it after the content (e.g. "Claude Academy: Agent SDK, Claude Code and MCP track") and note the exam as a possible follow-on.
- The credential is only 12 months valid and tied to partner status, so its portfolio value outside a partner firm is limited compared with the Projects the Roadmap already builds.

Suggested shape: one Resource Node for the ~16 hr technical course bundle (`done` = all completion badges earned), and a Project Node that reproduces the exam guide's "How to Prepare" exercises (a multi-tool Agent SDK agent with escalation hooks, a team Claude Code configuration with `.claude/rules/`, skills and MCP, a structured-extraction pipeline with validation-retry) [S7], which yields a showable artifact and covers the blueprint better than the courses alone. Re-check the eligibility question (section 2) periodically; if Anthropic opens the exam to individuals, add the exam as a separate Resource Node with cost $125 and a 12-month validity note.

## Open items / not published

- Any date for opening exams to non-partners or individuals.
- CCAR-P exam guide (item count, scenarios, domain weights).
- Durations for "Claude with Amazon Bedrock" and "Claude on Google Cloud".
- Detailed renewal assessment mechanics.

## Sources

All accessed 2026-09-10.

- [S1] Anthropic, "$100 million for the Claude Partner Network", 2026-03-12. https://www.anthropic.com/news/claude-partner-network
- [S2] Claude Partner Network landing page. https://claude.com/partners
- [S3] Claude blog, "Four role-based certifications for the people who put Claude to work for customers", 2026-07-23. https://claude.com/blog/four-role-based-claude-certifications
- [S4] Claude Academy FAQ. https://academy.claude.com/help/faq
- [S5] Anthropic Partner Academy catalog (Skilljar; partner login for content, catalog visible). https://anthropic-partners.skilljar.com/
- [S6] Anthropic Partner Academy, "FAQ – Certifications". https://anthropic-partners.skilljar.com/page/faq-certifications
- [S7] Anthropic, "Claude Certified Architect – Foundations Exam Guide", Version 1.0, Effective July 2026, Exam code CCAR-F (PDF linked from the certification page). https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf — linked from https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification
- [S8] Pearson VUE, "Claude Certification Program by Anthropic" (exam codes CCAO-F, CCAR-F, CCAR-P, CCDV-F; retake policy; scheduling). https://www.pearsonvue.com/us/en/anthropic.html
- [S9] Anthropic Partner Academy, "Claude Certified Architect – Foundations Prep Courses". https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses
- [S10] Anthropic, "Certification Terms and Conditions" (PDF linked from the certification page). https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1782870634%2FCertification+Terms+and+Conditions.pdf
- [S11] Anthropic, "Anthropic Certification Exam Policy", last updated 2026-06-25 (PDF linked from the certification page). https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1782870704%2FAnthropic+Certification+Exam+Policy.pdf
- [S12] Claude Academy course catalog (durations and lesson counts). https://academy.claude.com/courses
- [S13] Claude Academy, "Building with the Claude API". https://academy.claude.com/courses/building-with-the-claude-api
- [S14] Claude Academy, "Claude Code in Action". https://academy.claude.com/courses/claude-code-in-action
- [S15] Anthropic Academy, "Introduction to Model Context Protocol". https://anthropic.skilljar.com/introduction-to-model-context-protocol
- [S16] Anthropic Partner Academy, learning path "Claude Certified Architect – Professional Prep Course". https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional
- Also consulted: Anthropic Partner Academy certification pages for Foundations ($125) and Professional ($175): https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification , https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification ; "Earn your Claude certification" overview: https://anthropic-partners.skilljar.com/page/partner-certifications ; open Anthropic Academy catalog: https://anthropic.skilljar.com/
