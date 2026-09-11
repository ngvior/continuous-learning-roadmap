# Backend playlists: inventory and de-duplication against the owner's baseline

Resolves issue #5 (part of #1). Inventories the five backend Resources proposed for the Backend Lane of the Roadmap, then judges which parts are redundant for the owner (4+ years of NestJS, PostgreSQL, AWS CDK, Redis, CI/CD) and which are genuinely new.

Method: all titles, durations, upload dates, chapters and descriptions were pulled with `yt-dlp 2026.07.04` (`--flat-playlist -J` for playlists, `-J --no-playlist` for single videos) on 2026-09-10. The companion GitHub repository of the VIRTUAL CODE course was inspected with `gh api` to confirm its stack. No video was watched end to end; "topics" below come from the authors' own chapter lists and descriptions, so depth claims are inferred from structure, not verified content.

## Summary

| Resource | Author | Items | Total length | Level | Verdict |
|---|---|---|---|---|---|
| Backend from first principles | Sriniously (79.4k subs) | 31 videos | 34.9 h | beginner to upper-intermediate; conceptual, language-agnostic | **Keep, curated** (~13 h subset) |
| Backend Engineering (playlist) | Caleb Curry (741k subs) | 7 videos | 3.9 h | beginner; Python/FastAPI | **Drop** |
| Complete Backend Software Engineer Mind Map | Caleb Curry | 1 video, 58 chapters | 1.8 h | beginner survey | **Drop** (keep the mind-map link as a checklist) |
| Advanced Backend + AI Full Course, Part 1 | VIRTUAL CODE (41.8k subs) | 1 video, 6 chapters | 9.6 h | beginner to intermediate; Express 5 + Mongoose, JavaScript | **Skim** (System Design segment only, ~3 h) or drop |
| Advanced Backend + AI Full Course, Part 2 | VIRTUAL CODE | 1 video, 8 chapters | 6.9 h | intermediate on AI, beginner on cloud | **Keep the AI half** (~4.5 h), drop the cloud half |

Total on the table: 57.1 h. Recommended to actually watch: roughly 20 h.

## 1. Backend from first principles (Sriniously)

- URL: https://youtube.com/playlist?list=PLui3EUkuMTPgZcV0QhQrOcwMPcBCcd_Q1
- Author: Sriniously. Playlist description: "A set of videos where we explore backend systems from the most fundamental concepts." Videos are tagged `#nodejs #golang`; the series is concept-first rather than a framework tutorial.
- Published 2024-09-23 (video 1) through 2026-09-10 (video 30); still being extended.
- Total: 125,468 s = 34.85 h across 31 videos.

### Video list

| # | Title | Length | Baseline fit |
|---|---|---|---|
| 1 | Roadmap for backend from first principles | 0:31 | redundant |
| 2 | Walk the path of a true backend engineer | 0:04 | redundant |
| 3 | What is a Backend, how do they work and why do we need them? | 0:19 | redundant |
| 4 | Benefits of learning backend engineering from first principles | 0:10 | redundant |
| 5 | Understanding HTTP for backend engineers, where it all starts | 1:18 | redundant |
| 6 | What is Routing in Backend? | 0:24 | redundant |
| 7 | Serialization and Deserialization for backend engineers | 0:22 | redundant |
| 8 | Authentication and authorization for backend engineers | 1:36 | redundant |
| 9 | Validations and transformations for backend engineers | 0:43 | redundant |
| 10 | Controllers, services, repositories, middlewares and request context | 1:00 | redundant (this is NestJS's own layering) |
| 11 | Complete REST API Design | 2:04 | redundant |
| 12 | Mastering Databases with Postgres | 2:45 | redundant (4 years of PostgreSQL) |
| 13 | Caching, the secret behind it all | 1:04 | **new**: caching taxonomy (network, hardware, software), Redis internals |
| 14 | Task queues and background jobs | 0:56 | **new**: queue components, design parameters, best practices |
| 15 | Full text search using Elasticsearch | 0:32 | new only if no Elasticsearch exposure |
| 16 | Error Handling and Building Fault Tolerant Systems | 1:09 | **new**: fault-tolerance framing beyond exception filters |
| 17 | Production-grade Configuration Management | 0:36 | redundant |
| 18 | Logging, Monitoring and Observability | 0:40 | skim |
| 19 | Graceful Shutdown | 0:36 | skim |
| 20 | Backend Security: Everything You Need to Know | 2:50 | skim by chapter; long |
| 21.1 | Backend Scaling and Performance Engineering: Part 1 | 1:48 | **new**: latency percentiles, utilization/latency curve, profiling and distributed tracing, N+1, indexes, connection pooling, caching strategies and invalidation, cache hit ratio, vertical vs horizontal scaling |
| 21.2 | Backend Scaling and Performance Engineering: Part 2 | 2:18 | **new**: statelessness, load-balancer algorithms, read replicas and sharding, CDNs, edge, async processing, microservices vs monolith, serverless |
| 22 | Concurrency & Parallelism: IO Bound vs CPU Bound | 1:28 | **new**: threading vs event loop, async/await state machines, goroutines/virtual threads, race conditions, locks/mutexes/channels |
| 23 | Object Storage: Part 1 | 1:29 | skim (S3 is daily work on AWS) |
| 24 | Object Storage: Part 2 | 0:50 | skim |
| 25 | Real-Time Backends | 0:52 | **new**: polling/long polling/SSE/WebSocket internals, file descriptors and four-tuple limits, memory per connection, pub/sub across machines, at-most-once delivery, fan-out and reconnect storms |
| 26 | Testing for Backend Engineers: mocks, TDD and coverage | 1:25 | skim |
| 27 | The Twelve-Factor App | 1:33 | redundant |
| 28 | OpenAPI: The universal contract between clients and servers | 0:44 | redundant |
| 29 | Webhooks: how the server calls you | 0:56 | skim |
| 30 | DevOps for backend engineers | 1:48 | skim; new bits are DORA metrics, containers from scratch (namespaces, cgroups), Kubernetes control loop, rolling/blue-green/canary, GitOps and Argo CD, SLOs and incidents, supply chain (xz) |

### Judgement

Videos 1 to 12, 17, 27 and 28 (about 13.5 h) restate what a NestJS engineer already does daily: HTTP, routing, DTO validation, guards, controller/service/repository layering, REST conventions, Postgres, config, 12-factor, OpenAPI. Drop them.

Videos 13, 14, 16, 21.1, 21.2, 22 and 25 (about 9.5 h) are the genuinely new material and map directly to the gaps named in the issue: caching strategies and invalidation, queues, fault tolerance, horizontal scaling and load balancing, replicas and sharding, concurrency models, and real-time fan-out. This is the strongest conceptual coverage of the five Resources.

Videos 15, 18 to 20, 23, 24, 26, 29 and 30 (about 12 h) are worth a chapter-level skim; the DevOps video is the best of them because its second half (Kubernetes, GitOps, SLOs, supply chain) goes beyond CDK-plus-pipeline experience.

Level: the series starts at true beginner but the 2025 to 2026 videos (21.x onward) are upper-intermediate and chapter-rich enough to be used as reference.

Recommendation: **keep as a curated Node** in the Backend Lane. Suggested subset: 13, 14, 16, 21.1, 21.2, 22, 25 (must), plus 30 and 20 by chapter (optional). About 13 h.

## 2. Backend Engineering playlist (Caleb Curry)

- URL: https://youtube.com/playlist?list=PL_c9BZzLwBRIHUNeoywVJXViXGEsk6PDr
- Author: Caleb Curry. Playlist description: "Lessons and Tutorials on Backend software engineering and API development."
- Total: 14,085 s = 3.9 h across 7 videos (uploaded Aug to Sep 2025).

| Title | Length |
|---|---|
| API Design and Architecture - Backend Engineering Intro | 0:52 |
| API Status Codes and OpenAPI Documentation | 0:27 |
| FastAPI Intro - Full CRUD REST API Tutorial | 1:12 |
| API Pagination - Offset and Cursor Pagination Explained | 0:26 |
| Offset and Limit Pagination Tutorial (API Design) | 0:19 |
| API Cursor Pagination (Infinite Scroll) | 0:16 |
| Intro to Authentication - User and API Auth | 0:23 |

Topics: what an API is, SOAP/GraphQL/gRPC/WebSockets at a glance, JSON, REST verbs, query vs path vs body, status codes, OpenAPI, offset and cursor pagination, a FastAPI CRUD walkthrough, an auth intro.

Level: beginner. Stack: Python and FastAPI.

Judgement: every topic is baseline for the owner; the only slightly deeper item (cursor pagination) is something a 4-year PostgreSQL engineer has implemented. Nothing on distributed systems, queues, caching, consistency or scaling.

Recommendation: **drop**.

## 3. Complete Backend Software Engineer Mind Map (Caleb Curry)

- URL: https://www.youtube.com/watch?v=oVfw8Oj-uH8
- Author: Caleb Curry. Uploaded 2024-09-09; 400k views. Companion mind map: https://calcur.tech/mindmap
- Length: 6,523 s = 1 h 48 min, 58 chapters.

Chapter groups (from the author's timestamps): Backend frameworks and languages (JavaScript, C#, Java, Kotlin, PHP, Rust, Go, Elixir, Ruby, Swift, WebAssembly) 0:00 to 0:14; ORMs, CMS, SSG 0:14 to 0:23; Databases (SQL, data warehouses, transactional, NoSQL) 0:23 to 0:50; Hosting (shared, PaaS, IaaS) 0:50 to 1:00; Clients and servers, CDNs, ISPs 1:00 to 1:09; Communication protocols and APIs 1:09 to 1:25; App dev lifecycle (local dev, source control, containers, Kubernetes, CI/CD, testing, monitoring) 1:25 to 1:39; Cloud services catalogue (monitoring, managed DBs, storage, compute, serverless, identity, DNS, VPC, CDN, CI/CD, certificates, containers, Kubernetes, IaC, load balancing) 1:39 to 1:48.

Level: beginner orientation. Most leaf chapters are 10 to 60 seconds, so this is a vocabulary tour, not instruction.

Judgement: the owner has worked in every branch of this map. The only branches with possible novelty (data warehouses vs transactional stores, NoSQL families) are 25 minutes of survey.

Recommendation: **drop** the video. If a breadth checklist is wanted for the Roadmap, link the mind map itself as a reference, not as a Node to complete.

## 4. Advanced Backend + AI Full Course, Part 1 (VIRTUAL CODE)

- URL: https://youtu.be/_itqpLVS660
- Author: VIRTUAL CODE (41.8k subscribers). Uploaded 2026-06-07; 169k views. Companion repo: https://github.com/Virtualcode-yt/Advanced-Backend--Course (JavaScript, 12 stars, folders `level1` to `level5`).
- Length: 34,616 s = 9 h 37 min.
- Stack confirmed from the repo: Express 5, ioredis, BullMQ, Mongoose (MongoDB), Docker Compose. No TypeScript, no PostgreSQL.

| Chapter | Range | Length | Baseline fit |
|---|---|---|---|
| Level 0: Basic Backend Revision | 0:03:20 to 0:07:44 | 4 min | redundant |
| Level 1: Docker (images, containers, port mapping, Compose, networking, volumes) | 0:07:44 to 3:46:29 | 3 h 39 min | redundant for anyone shipping containers via CDK; skim networking/volumes only if weak |
| Level 2: Redis (API caching, rate limiting, BullMQ message queues) | 3:46:29 to 6:27:41 | 2 h 41 min | mostly redundant (owner uses Redis); rate limiting and BullMQ worker patterns are a 30 to 45 min skim |
| Level 3: System Design (scaling concepts, Nginx, microservices, DB replication, DB sharding) | 6:27:41 to 9:36:56 | 3 h 9 min | partially new: hands-on replication and sharding demos |

Note: the description also lists AWS, AI Engineering, CI/CD and a production project, but the chapter list ends at System Design; those topics are delivered in Part 2.

Level: beginner to intermediate; tutorial-driven (code along) rather than conceptual.

Judgement: the Docker and Redis levels (6 h 20 min) duplicate the owner's daily tooling. The System Design level overlaps Sriniously 21.2, which covers the same ground (load balancing, replicas, sharding, microservices vs monolith) more rigorously in less time; the added value here is watching replication and sharding configured live.

Recommendation: **skim** the System Design level only (about 3 h) after Sriniously 21.x, or drop entirely if time is scarce. Do not make Part 1 a Node of its own; fold the useful segment into the Part 2 Node.

## 5. Advanced Backend + AI Full Course, Part 2 (VIRTUAL CODE)

- URL: https://youtu.be/lweDf3_q-sk
- Author: VIRTUAL CODE. Uploaded 2026-06-17; 44k views. Same repo (`level4` = AI, `level5` = deployment).
- Length: 25,002 s = 6 h 57 min.
- Stack confirmed from `level4/*/package.json`: `@langchain/core` 1.x, `@langchain/langgraph` 1.4, `@langchain/google-genai`, `@langchain/groq`, `@langchain/tavily`, `@langchain/qdrant`, `@langchain/textsplitters`, `pdf-parse`, Express 5. `level5`: Dockerfile plus `.github` workflow for ECR/ECS.

| Chapter | Range | Length | Baseline fit |
|---|---|---|---|
| Level 4: AI Full Course (LLM fundamentals, LangChain, prompt engineering) | 0:02:21 to 1:21:00 | 1 h 19 min | **new** |
| LangGraph (agents, graph state) | 1:21:00 to 2:51:50 | 1 h 31 min | **new** |
| RAG, vector embeddings, vector DB (Qdrant), semantic search, chat with PDFs and websites | 2:51:50 to 4:32:32 | 1 h 41 min | **new** |
| Level 5: Cloud Deployment (AWS) | 4:32:32 to 5:40:32 | 1 h 8 min | redundant (CDK experience) |
| CI/CD Tutorial (GitHub Actions) | 5:40:32 to 6:21:00 | 40 min | redundant |
| ECR and ECS services | 6:21:00 to 6:56:42 | 36 min | redundant |

Level: intermediate on the AI side (assumes a working backend), beginner on the cloud side.

Judgement: the first 4 h 30 min is the only material across all five Resources that addresses backend-for-AI patterns (LLM calls from a server, agent graphs, document ingestion, embeddings, vector search, RAG). The cloud half re-teaches what the owner already automates with CDK and pipelines. Caveats: the channel is small and the course is three months old, so treat it as an on-ramp rather than an authority; it uses JavaScript and Gemini/Groq providers, so porting the patterns to NestJS and TypeScript is left to the owner, which is arguably good practice for a Project.

Recommendation: **keep the AI half** (chapters Level 4 through RAG, about 4.5 h) as a Node bridging the Backend Lane and the AI Engineering Lane; drop Level 5.

## Coverage of the topics the issue calls out

| Topic | Where it is covered | Gap remaining |
|---|---|---|
| Distributed systems and consistency | Sriniously 21.2 (statelessness, replicas, sharding), 25 (pub/sub across machines, at-most-once and catch-up); VC Part 1 Level 3 (replication, sharding demos) | No Resource covers consensus, transactions across services, CAP/PACELC, idempotency or exactly-once semantics in depth. A dedicated distributed-systems Resource is still needed. |
| Queues | Sriniously 14 (design parameters, components); VC Part 1 Level 2 (BullMQ on Redis) | No dead-letter, ordering, or broker comparison (SQS vs Kafka vs RabbitMQ). |
| Caching strategies | Sriniously 13 (taxonomy, Redis internals) and 21.1 (invalidation, hit ratio); VC Part 1 Level 2 (API caching) | Adequate for the Roadmap's purpose. |
| Autoscaling | Sriniously 21.1/21.2 (vertical vs horizontal, load balancers, serverless); VC Part 1 Level 3 (scaling concepts, Nginx) | Nothing on autoscaling policies, capacity planning or cost; the owner's CDK experience already covers the mechanics. |
| Backend-for-AI patterns | VC Part 2 Levels 4 (LangChain, LangGraph agents, RAG, Qdrant) | Nothing on evaluation, streaming responses, token/cost controls, guardrails or observability for LLM calls. Belongs to the AI Engineering Lane. |

## Recommended Nodes for the Backend Lane

1. **Sriniously: scaling, concurrency, queues, caching, fault tolerance, real-time** (videos 13, 14, 16, 21.1, 21.2, 22, 25; optional 20 and 30 by chapter). About 13 h. Prerequisite for the distributed-systems gap above.
2. **VIRTUAL CODE Part 2, AI half** (Level 4 through RAG). About 4.5 h. Optionally preceded by VC Part 1 Level 3 (3 h) if hands-on replication/sharding is wanted.
3. Dropped: Caleb Curry Backend Engineering playlist; Caleb Curry Mind Map (link as reference only); VC Part 1 Levels 0 to 2; VC Part 2 Level 5.

## Sources

All accessed 2026-09-10 via `yt-dlp 2026.07.04` JSON dumps (titles, durations, chapters, descriptions, upload dates, view and subscriber counts) unless noted.

- Backend from first principles (playlist): https://youtube.com/playlist?list=PLui3EUkuMTPgZcV0QhQrOcwMPcBCcd_Q1
  - Video 1 roadmap chapters: https://www.youtube.com/watch?v=0Rwb4Xmlcwc
  - Video 13 caching: https://www.youtube.com/watch?v=estH64OkwxU
  - Video 14 task queues: https://www.youtube.com/watch?v=r-nQsyguU1Y
  - Video 16 error handling: https://www.youtube.com/watch?v=8NaM_9aKS24
  - Video 21.1 scaling part 1: https://www.youtube.com/watch?v=z7kt_p44rjs
  - Video 21.2 scaling part 2: https://www.youtube.com/watch?v=sOhAopEwjH4
  - Video 22 concurrency: https://www.youtube.com/watch?v=bs9MEYRTA30
  - Video 25 real-time: https://www.youtube.com/watch?v=wUQryt697cs
  - Video 30 DevOps: https://www.youtube.com/watch?v=_E8X5RIJfQ4
- Caleb Curry, Backend Engineering (playlist): https://youtube.com/playlist?list=PL_c9BZzLwBRIHUNeoywVJXViXGEsk6PDr
  - API Design and Architecture chapters: https://www.youtube.com/watch?v=XvFmUE-36Kc
  - FastAPI Intro chapters: https://www.youtube.com/watch?v=k5abZLzsQc0
- Caleb Curry, Complete Backend Software Engineer Mind Map: https://www.youtube.com/watch?v=oVfw8Oj-uH8 (mind map link in description: https://calcur.tech/mindmap)
- VIRTUAL CODE, Advanced Backend + AI Full Course Part 1: https://youtu.be/_itqpLVS660
- VIRTUAL CODE, Advanced Backend + AI Full Course Part 2: https://youtu.be/lweDf3_q-sk
- VIRTUAL CODE course source (stack confirmation via `gh api`, folders `level1` to `level5`, `level2/phase1/package.json`, `level4/phase1/package.json`, `level4/phase2/package.json`): https://github.com/Virtualcode-yt/Advanced-Backend--Course
