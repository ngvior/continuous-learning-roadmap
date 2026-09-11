# BASWE project guides: extraction and merge analysis

Research for issue #7 (part of #1). Extracted from the three local BASWE PDFs in `ai-projects/`.
Every claim below traces to a page range listed in the Sources section. Where a field is not
stated by the guides (notably "prerequisite knowledge"), it is marked **inferred**.

## Summary

- The three PDFs are three different lists from the same author (BASWE / Ai Engineer Accelerator).
  Two are "six project" specs with **different** project sets; the third is the 15-project guide.
  The six categories are stable across all three (RAG, Agents, LLMOps, Evals, Fine-tuning,
  Guardrails/Safety); the concrete project under each category changes per PDF.
- The six core Projects named in the issue (RAG hybrid search, Agent orchestration, Semantic
  caching, Eval generator from logs, LoRA pipeline, Text-to-SQL guardrails) are all in the
  **15-project guide** (Projects 6, 15, 7, 13, 10, 8). The other nine are also in that guide.
- Effort baseline: every 15-guide Project is scoped at **12-14 days at 2-3 h/day** (roughly
  30-40 h). The 21-page build guide uses **2-5 weeks part time at 10-12 h/week**. The 9-page
  spec uses **1-2 weekends**.
- The author's own rule: a Project counts only when it has an eval, a number, and a written
  tradeoff. README opens with the result, then a 90-second demo, then failure notes.
- All three owner backend Projects have a natural AI merge. Strongest pairs: Video Processing
  Pipeline + RAG (multimodal ingestion); Distributed Job Queue + Agents/LLMOps (deferrable-work
  substrate); Load Testing Platform + Semantic Cache / Gateway / Red-team (traffic generator and
  replay harness). Detail in the merge section.

## How the three PDFs relate

| PDF | Pages | Framing | Effort unit | Project set |
|---|---|---|---|---|
| `baswe-six-project-build-guide.pdf` | 9 | "Six projects that prove you can do the job"; use-case-first, each with a **ship gate** and a **trap** | weekends, with level tag | Fieldnote, Casefile, Warmstart, Groundtruth, Slotfill, Doorman |
| `BASWE_Build_These_Six_Projects.pdf` | 21 | "Build These Six Projects"; five phases each, **Done when**, resume line, "where it goes wrong", stretch goals | 2-5 weeks part time | KG RAG, Multi-Agent Research Assistant, Self-Healing LLM Gateway, LLM-as-Judge, Model Distillation, Red-Team Harness |
| `BASWE_15_AI_Engineering_Projects_Guide.pdf` | 61 | "15 AI Engineering Projects That Actually Land Jobs"; six phases each with day ranges, tech-stack table, interview framing | 12-14 days at 2-3 h/day | 15 Projects, listed below |

Category mapping across the three lists:

| Category | 9-page spec | 21-page build guide | 15-guide (issue's "core six") |
|---|---|---|---|
| RAG | 01 Fieldnote (multimodal RAG) | P1 Knowledge Graph RAG | **P6 RAG with Hybrid Search** |
| Agents | 02 Casefile (multi-agent claims triage) | P2 Multi-Agent Research Assistant | **P15 Agent Orchestration w/ Tools, Memory, HITL** |
| LLMOps | 03 Warmstart (LLM caching) | P3 Self-Healing LLM Gateway | **P7 Semantic Caching Layer** |
| Evals | 04 Groundtruth (retrieval eval) | P4 LLM-as-Judge w/ Human Calibration | **P13 Eval Dataset Generator from Production Logs** |
| Fine-tuning | 05 Slotfill (LoRA finetune) | P5 Model Distillation Pipeline | **P10 Fine-Tuning Pipeline with LoRA** |
| Guardrails / Safety | 06 Doorman (prompt-injection guardrails) | P6 Automated Red-Team Harness | **P8 Text-to-SQL with Guardrails** |

Sequencing advice from the guides:

- 9-page spec: "Pick one. Six half finished repos read worse than one finished repo." New to
  this? Start with 04 Groundtruth (shortest, makes everything else measurable).
- 21-page guide: build in order (RAG -> Evals evaluates it -> Safety attacks it -> Fine-tuning
  makes it cheaper). "If you only have time for two, build Project 1 and Project 3. Retrieval plus
  infrastructure is the most common shape of a real AI engineering job."
- 15-guide: "You don't need to build all fifteen. Pick the two or three that best align with the
  roles you're targeting." Designed to leverage existing production skills (Docker, CI/CD, APIs,
  databases) as a structural advantage.

## The six core Projects (15-guide)

Field conventions: **Effort** is the guide's stated scope; **Prereqs** is inferred from the
stack and phases unless quoted; **Signal** quotes or paraphrases the guide's "Why this project
lands interviews" box.

### P6. RAG Pipeline with Hybrid Search Over Internal Docs (pp. 20-23)

- **Goal**: production RAG over internal docs with dense + BM25 hybrid retrieval, reranking,
  grounded answers with verified inline citations.
- **Stack**: Python 3.11+, OpenAI `text-embedding-3-small`, ChromaDB or Qdrant, BM25 via
  `rank_bm25`, GPT-4o or Claude Sonnet, LangChain text splitters, FastAPI, Docker.
- **Build steps**: (1) multi-format loader + three switchable chunking strategies (fixed,
  recursive by header, semantic) + embed + BM25 in sync + near-dup dedup at cosine > 0.95;
  (2) dense top-k, sparse top-k, Reciprocal Rank Fusion with configurable weights, cross-encoder
  or LLM-judge reranker top-20 -> top-5; (3) grounded prompt with `[n]` citations, per-citation
  verification via LLM-judge, composite confidence score, explicit "I don't know" path;
  (4) 50+ hand-written golden Q&A incl. multi-hop and unanswerable, metrics: correctness,
  faithfulness, retrieval relevance, citation accuracy; chunking-strategy comparison report;
  (5) FastAPI `POST /v1/ask`, `GET /v1/documents`, `POST /v1/ingest`, dashboard with hybrid vs
  dense toggle, docker-compose with seed script; (6) demo under 4 min, case study
  "X% faithfulness and Y% citation accuracy on a 50-question eval suite".
- **Effort**: 12-14 days at 2-3 h/day.
- **Prereqs (inferred)**: embeddings and vector similarity, BM25 basics, async Python/FastAPI,
  Docker Compose. No ML training required.
- **Signal**: "RAG is the single most requested skill in AI engineering job descriptions"; hybrid
  retrieval + chunking decisions + citation verification separate a RAG engineer from a LangChain
  quickstart.

### P15. Agent Orchestration System with Tool Use, Memory, and Human-in-the-Loop (pp. 56-59)

- **Goal**: supervisor decomposes tasks, delegates to tool-using specialists, keeps short- and
  long-term memory, escalates to a human on low confidence or sensitive actions, full trace.
- **Stack**: Python 3.11+, LangGraph, OpenAI + Anthropic, custom tools + MCP, PostgreSQL +
  ChromaDB (memory), Redis + Celery (async), React or Streamlit review UI, Docker Compose.
- **Build steps**: (1) three-layer hierarchy (supervisor / specialists / reviewer), structured
  task decomposition with dependencies, tool registry with schemas and rate limits, LangGraph
  state machine with conditional edges; (2) Redis working memory scoped per task, ChromaDB
  long-term semantic memory, memory retrieval injected into planning, importance scoring,
  consolidation, expiry, delete endpoint; (3) escalation triggers, approval queue that pauses
  execution, granular levels (Notify / Approve action / Approve plan / Take over), review UI with
  chat panel; (4) OpenTelemetry trace tree, trace explorer UI, cost/perf per task, replay system;
  (5) demo scenario, docker-compose (API, Redis, Postgres, ChromaDB, Celery workers, two UIs),
  end-to-end tests; (6) demo under 5 min, narrative "production infrastructure for autonomous
  AI workflows".
- **Effort**: 12-14 days at 2-3 h/day (the heaviest of the six; six services).
- **Prereqs (inferred)**: state machines, message queues and workers, tool/function calling,
  OpenTelemetry, structured outputs (Pydantic). P6 (RAG) helps for the memory store.
- **Signal**: "most candidate projects are single-agent toy demos"; real tool use + persistent
  memory + HITL escalation proves you can architect autonomous systems companies are hiring for.

### P7. Semantic Caching Layer for LLM APIs (pp. 24-26)

- **Goal**: drop-in proxy that detects semantically similar prior requests and serves cached
  responses, cutting latency to near zero and cost 30-60%.
- **Stack**: Python 3.11+, OpenAI `text-embedding-3-small`, Redis + RedisVL or Qdrant, FastAPI,
  custom TTL + similarity threshold, Prometheus + Grafana, Docker Compose.
- **Build steps**: (1) embed every prompt, nearest-neighbour lookup at threshold ~0.95, store
  full response + metadata, cache key includes system-prompt hash and generation params;
  (2) mirror the OpenAI chat-completions contract (base-URL swap), provider routing, streaming
  with buffered cache write of complete responses only; (3) TTL tiers auto-assigned by prompt
  content, invalidation by system-prompt hash / model upgrade / manual prefix, threshold tuner
  endpoint over historical data, adaptive thresholds per request type; (4) Prometheus metrics
  (hit rate, latency hit vs miss, savings, similarity distribution), Grafana panels, near-miss
  analyzer; (5) docker-compose full stack, load test 2,000+ mixed requests, README as an internal
  proposal; (6) demo + headline "reduced LLM API costs by X% and P95 latency by Y%".
- **Effort**: 12-14 days at 2-3 h/day.
- **Prereqs (inferred)**: Redis, HTTP proxying and streaming, embeddings, Prometheus/Grafana.
  The 9-page Warmstart spec adds the trap to avoid: keying on the user question alone leaks data
  across customers; key must include model, temperature, tool set, customer tier, prompt version.
- **Signal**: "proves you think about infrastructure efficiency, not just model accuracy"; the
  ROI is immediately legible to engineering managers.

### P13. Automated Eval Dataset Generator from Production Logs (pp. 48-51)

- **Goal**: continuously mine production LLM logs, find interesting / edge / failure
  interactions, auto-label them into a growing production-representative eval dataset.
- **Stack**: Python 3.11+, PostgreSQL or ClickHouse (log warehouse), scikit-learn + HDBSCAN,
  GPT-4o or Claude Sonnet, custom eval runner, Streamlit, Cron or Celery, Docker Compose.
- **Build steps**: (1) unified log schema, adapters (JSON logs, OTel traces, DB reads), PII
  redaction, three sampling modes (uniform, stratified, signal-boosted); (2) embed + HDBSCAN
  clustering, outlier detection, LLM-judge quality score, difficulty estimator; (3) golden answer
  or rubric per case, multi-dimensional labels incl. hallucination traps, confidence-based routing
  to auto-add vs human review, dedup at cosine > 0.92, coverage tracking; (4) eval harness against
  any endpoint, regression detection vs previous run, dataset growth dashboard; (5) dataset
  explorer, review queue with inter-annotator agreement, nightly cron; (6) demo + narrative
  "in two weeks of traffic it generated X cases across Y categories with Z% auto-label accuracy".
- **Effort**: 12-14 days at 2-3 h/day.
- **Prereqs (inferred)**: SQL and log pipelines, basic clustering, LLM-as-judge pattern, cron /
  workers. Needs a source of logs; the guide assumes simulated production traffic (from P6 / P7 /
  P11 is a natural choice).
- **Signal**: "the hardest part of AI evaluation isn't the harness, it's the dataset"; solving
  data supply from production traffic is "a force multiplier that AI teams dream about".

### P10. Fine-Tuning Pipeline with LoRA on a Domain-Specific Dataset (pp. 35-38)

- **Goal**: end-to-end reproducible LoRA fine-tune of an open model, evaluated against the base
  on task benchmarks, with experiment tracking and a served adapter.
- **Stack**: Python 3.11+, Llama 3 8B or Mistral 7B, Hugging Face PEFT + TRL, Unsloth or QLoRA,
  custom dataset, custom eval + `lm-eval-harness`, Weights & Biases or MLflow, vLLM or Ollama.
- **Build steps**: (1) pick a narrow measurable task, 500-2,000 instruction-format examples,
  80/10/10 split with no leakage, 30-50 handcrafted benchmark cases; (2) LoRA on attention
  layers (rank 16, alpha 2x, dropout 0.05; QLoRA on small GPU), W&B-logged training script,
  early stopping + checkpoints, sweep over rank (8/16/32), LR, epochs; (3) base vs fine-tuned
  head-to-head, LLM-judge blind comparison, catastrophic-forgetting check on general benchmarks;
  (4) export adapter (<100 MB), serve with vLLM/Ollama, A/B comparison endpoint; (5) one-command
  reproducible pipeline, experiment report incl. "why fine-tuning vs prompting/RAG";
  (6) demo + headline "improved from X% to Y% while keeping Z% of general capability".
- **Effort**: 12-14 days at 2-3 h/day, plus GPU rental. The 21-page guide's distillation
  variant is 4-5 weeks part time, the longest in that set.
- **Prereqs (inferred)**: Python ML tooling (transformers, PEFT), GPU basics, train/val/test
  discipline. This is the one Project that cannot be done in TypeScript.
- **Signal**: "where AI engineering meets ML engineering"; a reproducible pipeline with eval and
  tracking proves you can own the model customization lifecycle. The 21-page guide adds the
  senior framing: the deliverable is a **break-even request volume**, not a model.

### P8. Text-to-SQL Interface with Guardrails and Hallucination Detection (pp. 27-30)

- **Goal**: NL to SQL against a real database, executed safely behind guardrails that block
  destructive operations, with back-translation hallucination detection and confidence score.
- **Stack**: Python 3.11+, GPT-4o or Claude Sonnet, PostgreSQL or DuckDB, SQLAlchemy
  introspection, custom guardrail middleware, LLM-judge + result checks, FastAPI, Docker Compose.
- **Build steps**: (1) schema auto-extraction, dynamic prompt with relevant tables + FK + sample
  values + few-shots, embedding-based schema filtering, explicit ambiguity clarification;
  (2) structured SQL output (instructor / function calling), `sqlparse` validation, guardrail
  middleware blocking all DDL and DML writes, LIMIT enforcement, subquery depth cap, EXPLAIN-based
  scan cap, read-only rollback transaction on a SELECT-only DB user, logged blocks; (3) SQL ->
  question back-translation alignment, result sanity checks, multi-query agreement, combined
  confidence score; (4) `POST /v1/query`, `GET /v1/schema`, `GET /v1/history`, frontend with
  editable SQL, feedback loop feeding evals and few-shots; (5) 50+ golden NL/SQL pairs, metrics:
  exact match, execution match, hallucination detection rate, guardrail effectiveness;
  (6) demo + narrative "blocks 100% of destructive operations and detects Y% of hallucinated
  queries".
- **Effort**: 12-14 days at 2-3 h/day.
- **Prereqs (inferred)**: solid SQL and Postgres permissions model, middleware design, structured
  LLM output. Very close to the owner's existing Postgres/Prisma background.
- **Signal**: "proves you can ship AI features that a compliance team would actually approve";
  "lead with safety, companies care more about not breaking things than accuracy percentages".

## The other nine Projects (15-guide)

| # | Name | One-line goal | Stack | Build-steps summary | Effort | Prereqs (inferred) | Signal |
|---|---|---|---|---|---|---|---|
| P1 | Model Regression Detection System (pp. 3-5) | CI pipeline that evals any LLM feature against a golden set on prompt/model change and alerts Slack | Python, OpenAI, RAGAS/DeepEval, SQLite + JSON, Slack webhooks, GitHub Actions, Streamlit, Docker | versioned YAML prompts -> 50-100 hand-labelled golden cases with difficulty tags -> async runner with multi-dimensional scoring + diff vs previous run + 3%/8% thresholds -> HTML diff report, Slack, slow-drift detection -> GitHub Action blocking merge -> Loom | 12 days | CI/CD, pytest-style harnesses | "proves you think about what happens after deployment" |
| P2 | LLM Cost Autopilot (pp. 6-8) | Router that classifies request complexity and sends it to the cheapest capable model, verified async | Python, OpenAI/Anthropic/Ollama, FastAPI, scikit-learn classifier, SQLite, Streamlit/Grafana, Compose | model registry + unified `send_request` -> 3 tiers, 200+ labelled prompts, sklearn classifier, YAML routing map -> async verifier vs top model, auto-escalation, weekly retrain -> cost dashboard with "you saved $X" -> `POST /v1/completions` -> load test 500-1,000 prompts | 14 days | basic ML classification, async workers | "AI engineering as a business problem" |
| P3 | Failure Forensics Tool for AI Pipelines (pp. 9-11) | Observability layer tracing every step of a multi-step pipeline and localizing root cause | Python, custom chain/LangChain, OpenAI, OpenTelemetry, SQLite + JSON, React/Streamlit, Docker | 4-step typed pipeline with injected failures -> Trace/Span objects via decorator, per-step confidence -> backward LLM-judge analysis, failure taxonomy, evidence chain -> visual trace explorer + diff view + flag button -> flagged traces become eval cases, regression tracking, failure analytics -> demo on 50 docs | 14 days | OTel, typed pipelines | "a mini LangSmith/Braintrust"; senior-level observability signal |
| P4 | Self-Healing Technical Documentation (pp. 12-14) | GitHub Action detecting doc staleness from code diffs and opening fix PRs | **Python or TypeScript**, OpenAI embeddings, ChromaDB, GPT-4o/Claude, PyGithub, GitHub Actions, Docker | code and docs chunked and linked by heuristics + embeddings -> diff parsing, meaningful-change filter, LLM staleness verification -> targeted rewrite + second-pass validation + confidence modes -> action.yml, PR workflow, PR comments -> fork a real OSS repo, measure TP/FP/FN -> publish to marketplace | 14 days | GitHub Actions, AST/parsing | "lives inside a CI/CD pipeline, not a Streamlit demo"; installable |
| P5 | LLM Output Arbitration System (pp. 15-18) | Three critic agents on different models evaluate an output; an adjudicator resolves disagreements into a verdict | Python, LangGraph, OpenAI + Anthropic + Ollama, Pydantic + instructor, SQLite, FastAPI, React/Streamlit | accuracy/logic/completeness critics with structured critique, one model per critic -> LangGraph parallel fan-out, disagreement detector, degradation -> adjudicator with evidence-based resolution -> verdict UI, critic comparison, batch mode -> `POST /v1/arbitrate`, critic analytics, Compose incl. Ollama -> four demo cases | 14 days | structured outputs, LangGraph | "building the one that catches bad answers" |
| P9 | Prompt Versioning and A/B Testing Platform (pp. 31-34) | Prompts as versioned artifacts with traffic splits, metrics and statistically significant winners | Python, OpenAI/Anthropic, PostgreSQL, scipy.stats, FastAPI, React/Streamlit, Compose | registry with versions, diff, rollback, templates -> experiment schema, consistent-hash splitter, serving endpoint, auto-stop guardrails -> pluggable async metrics, t-test / Mann-Whitney, dashboard, auto-promotion with 24 h hold -> management UI, comparison tool, audit log -> demo with 500+ requests, integration tests | 14 days | Postgres, basic statistics, feature-flag patterns | "operational maturity that distinguishes senior AI engineers" |
| P11 | LLM Gateway with Rate Limiting, Fallback Routing, and Observability (pp. 40-43) | API gateway in front of all LLM calls: per-team limits and budgets, provider fallback, unified observability | **Python or Go**, FastAPI or net/http, Redis token bucket, YAML hot reload, OTel + Prometheus, Grafana, OpenAI/Anthropic/Ollama, Compose | provider abstraction, team API keys, streaming passthrough, request enrichment -> atomic Redis token buckets returning 429 + Retry-After, dollar budgets, priority tiers, admin API -> health checks every 30 s, fallback chains per tier, retry with backoff distinguishing retryable errors, circuit breakers with half-open -> OTel spans, Prometheus, three Grafana boards, alerting -> integration + 5,000-request load test, <10 ms overhead -> demo | 14 days | HTTP proxying, Redis, resilience patterns | "pure infrastructure engineering applied to AI, exactly the skill set mid-level SWEs already have" |
| P12 | AI Feature Flag System with Gradual Rollout and Quality Monitoring (pp. 44-47) | Feature flags for AI features: percentage rollouts, quality monitoring, auto-rollback on quality drop | Python, PostgreSQL + Redis, custom + LLM-judge, Python SDK, React/Streamlit, Slack, Compose | flag schema with quality threshold + rollback trigger, SDK with hashing and graceful degradation, targeting rules, management API -> per-flag quality metrics, async evaluator via background worker + queue, rolling windows (last 100 / 1 h / 24 h), auto-rollback with cooldown -> staged schedules, canary statistics, shadow mode -> UI, analytics, SDK docs -> demo app + integration tests -> demo | 14 days | feature-flag systems, background workers | "AI features fail on a gradient, not a binary" |
| P14 | Multi-Modal Document Processor with OCR, LLM Extraction, and Validation (pp. 52-55) | Any document format -> OCR -> structured LLM extraction -> business-rule validation -> HITL review | Python, Tesseract + EasyOCR, GPT-4o/Claude vision, GPT-4o + instructor, Pydantic, **Celery + Redis queue**, React/Streamlit, Compose | multi-format loader with native-text-vs-OCR detection, dual-engine OCR ensemble, vision fallback, preprocessing -> per-type Pydantic schemas, classify-then-extract, chunk-and-merge with conflict flags, per-field confidence -> type + business-rule validation, anomaly detector, confidence routing -> review dashboard with source highlighting, inline edits logged, batch workflows -> corrections feed few-shots and thresholds, analytics, Compose with OCR + extraction workers -> demo | 14 days | queues/workers, Pydantic, some CV preprocessing | "touches every layer of the AI engineering stack"; large enterprise category |

## The two "six project" PDFs, per Project

These are alternative concretizations of the same six categories. They are useful as **ship
gates** and **traps** to bolt onto the 15-guide Projects, or as smaller weekend Nodes.

### 9-page spec (`baswe-six-project-build-guide.pdf`)

| # | Name | Category / use case | Level, effort | Build (4 bullets) | Stack | Ship gate (the eval) | Signal / trap |
|---|---|---|---|---|---|---|---|
| 01 | Fieldnote (p. 3) | Multimodal RAG; HVAC field-service assistant over manuals, photos, call recordings | intermediate, two weekends | ingest mixed corpus; index each modality with its own encoder + modality tag; parallel searches fused and reranked with a cross-encoder; return source page image with answer | SigLIP/CLIP, Whisper, text embedder, pgvector or Qdrant with modality filters, vision-capable model | 40-question eval with 15 unanswerable from text alone; beat caption-only baseline; citation with page + cropped image; p95 < 6 s at k=20 | early vs late fusion; **trap**: captioning images and calling it multimodal |
| 02 | Casefile (p. 4) | Multi-agent orchestration; claims triage for a regional insurer | advanced, two weekends | supervisor + extractor/investigator/reviewer with typed handoffs; shared state in external store, resumable from snapshot; token and dollar budget + max steps; human approval before payout | LangGraph or hand-rolled state machine, Redis or Postgres, JSON schema tool contracts, OpenTelemetry | 30 recorded runs with traces; one run replayed from snapshot to same terminal state; reviewer sends back at least once and graph still terminates; cost per claim charted, ceiling enforced by code | termination conditions before personas; **trap**: agents handing off in a circle |
| 03 | Warmstart (p. 5) | LLM caching; ecommerce support assistant at 400k questions/month | intermediate, one weekend | three layers (exact, semantic above tuned floor, provider prefix caching); cache key includes model, temperature, tools, customer tier, prompt version; TTL + explicit invalidation; hit-rate and savings dashboard | Redis, embedding model, provider prompt caching, replay harness over logged traffic | replay 1,000 production-shaped queries: hit rate, cost delta, p50/p95; false-hit rate < 1% by judge model; precision curve over threshold; prove prompt change busts cache | "a semantic cache is a retrieval system with a precision problem"; **trap**: keying on the question alone = data leak |
| 04 | Groundtruth (p. 6) | Retrieval evaluation; legal research assistant over 20 years of filings | foundational, one weekend | 100 human-reviewed query/passage pairs; recall@k, MRR, nDCG per category; separate generation layer (faithfulness, relevance); CI harness failing PR when recall@10 drops > 1 point | Ragas or custom scorers, pytest, versioned dataset, comparison report | three configs compared (chunk size, hybrid vs dense, reranker on/off); results table + written recommendation; CI gate demonstrated failing; error analysis of five failing queries | separate retrieval failure from generation failure; **trap**: eyeballing five queries |
| 05 | Slotfill (p. 7) | LoRA finetuning; freight invoice extraction at 40k docs/month | advanced, two weekends | lock task to strict schema; 1,000+ real labelled examples, 200 held out; LoRA on small open model with logged rank/alpha/LR and one ablation; serve adapter vs prompted frontier baseline | PEFT + transformers or Axolotl/Unsloth, one rented GPU, vLLM with adapter loading | schema validity and field accuracy for both; cost per 1,000 invoices and p95 for both; honest recommendation incl. "the prompt wins"; eval numbers, never training loss, as headline | finetuning as cost/latency/control tradeoff; **trap**: 200 synthetic examples and a falling loss curve |
| 06 | Doorman (p. 8) | Prompt-injection guardrails; recruiting agent reading candidate uploads | intermediate, one to two weekends | agent with real tools (email, scoring, ATS writes); layered defence (input classification, isolation of untrusted content, per-context tool allowlist, output scanning, confirmation on irreversible actions); 60-attack red team suite; structured logs naming the rule fired | small classifier or guard model, policy layer in front of the tool router, self-maintained attack corpus | attack success rate before/after by family; false positive rate on 100 benign resumes; one documented bypass found and closed; every block traceable to a rule | "the real control is limiting what the agent is allowed to do once it is fooled"; **trap**: a polite system prompt as a security control |

### 21-page build guide (`BASWE_Build_These_Six_Projects.pdf`)

| # | Name | Goal | Stack | Phases (5) | Effort | Done when | Signal / where it goes wrong |
|---|---|---|---|---|---|---|---|
| P1 | Knowledge Graph RAG for Enterprise Data (pp. 4-6) | hybrid graph + vector RAG that answers multi-hop questions | Python, Neo4j, LangChain, Claude API, pgvector, FastAPI | constrained ontology (5-10 entity, 8-15 relation types), schema-validated extraction, entity resolution, idempotent MERGE with source chunk ids, cost budget -> pgvector over same chunk ids, HNSW tuned on measured recall -> cheap router to graph vs vector, **parameterized Cypher templates only** -> paths to prose, dedup, citation validation -> 50-100 question set stratified by hop count, accuracy by hop, latency and cost | 3-4 weeks part time | FastAPI endpoint with validated citations; README opens with benchmark vs vector-only by hop count | proves you know where embeddings fail; wrong: open ontology, skipped entity resolution, model writing raw Cypher, corpus with no relationships |
| P2 | Multi-Agent Research Assistant (pp. 7-9) | supervisor/worker research agent with durable state, budgets, step traces | Python, LangGraph, Claude API, Tavily, Redis, FastAPI | planner/researcher/writer as prompt + tools + Pydantic schema, tested alone -> LangGraph supervisor, budgets enforced in graph, reviewer sends back exactly once -> live search with provenance records, explicit failure states -> state in Redis after every node, resume not replay, idempotency -> `POST /research`, streamed progress, validated citations, `GET /research/{id}/trace` | 3-4 weeks part time | cited report under 5 min; killed process resumes; every run has a step trace | "durable state, budgets, and step level tracing"; wrong: personality prompts, no budget, exceptions instead of states, no trace |
| P3 | Self-Healing LLM Gateway (pp. 10-11) | one service routing every model call with health tracking, circuit breakers, failover, deferrable queue | Python, LiteLLM, FastAPI, Redis, Prometheus, Grafana | OpenAI-compatible FastAPI + LiteLLM with 3+ providers, required tenant/feature/request-id metadata -> rolling health window per provider in Redis, error taxonomy, `/metrics` -> circuit breaker (closed/open/half-open), per-request-class preference lists, half-open probes, hedged requests -> **interactive vs deferrable classification, Redis queue with backoff + jitter, idempotency keys** -> Grafana board, chaos endpoint, 90-second capture | 2-3 weeks part time | degrade a provider live while traffic flows; dashboard shows trip, reroute, recovery | "reads as infrastructure rather than experimentation"; wrong: no cost attribution, retrying non-idempotent calls, no half-open, no chaos test |
| P4 | LLM-as-Judge with Human Calibration (pp. 12-13) | judge calibrated against human labels, bias-tested, gating CI | Python, DeepEval, Claude API, Postgres, Streamlit | 3-5 criteria on 3- or 5-point ordinal scales, reasoning before score -> 200 stratified hand labels via Streamlit, self-agreement on 20 relabels -> weighted Cohen kappa + Spearman, read 20 largest disagreements, iterate rubric -> position, length, self-preference bias measured -> DeepEval CI job with thresholds, trend in Streamlit | 2-3 weeks part time | quality-degrading PR fails CI; README reports kappa + three bias numbers | "almost nobody has quantified whether their judge agrees with a human"; wrong: no human baseline, 1-10 scales, same model judging itself, tuning on the reporting set |
| P5 | Model Distillation Pipeline (pp. 14-15) | distil a frontier task into an 8B student, benchmark on quality/cost/latency, publish break-even | Python, Hugging Face, PyTorch, Claude API, W&B, vLLM | narrow task the teacher does well, teacher accuracy on held-out set -> 5-10k teacher outputs over real inputs, schema-filtered, deduped, cost estimated -> LoRA/QLoRA on 7-8B, W&B, two configs (rank 8 vs 32) -> quality, cost per 1k requests incl. idle GPU, p50/p95 at comparable concurrency -> vLLM serving, break-even volume, router with escalation to teacher | 4-5 weeks part time | three-axis table, break-even volume, served endpoint with escalation | "unit economics is the fastest way to sound senior"; wrong: weak teacher, contaminated test set, ignoring idle GPU, no fallback |
| P6 | Automated Red-Team Harness (pp. 17-19) | scheduled attack suite against your own AI apps, auto-filed findings, zero regressions | Python, garak, PyRIT, Claude API, FastAPI, Postgres | attack battery (jailbreaks, indirect injection, prompt extraction, PII, tool abuse, encoding tricks) seeded from garak/PyRIT plus domain cases, stored as rows -> target adapter interface, aimed at own P1/P2, scheduled + CI hook, **parallelized with concurrency cap and rate-limit handling** -> deterministic checks then classifier, three outcomes incl. needs-review -> severity, minimal repro, GitHub issue via API, dedup -> every finding a permanent regression case, dashboard | 3-4 weeks part time | scheduled runs, auto-filed findings with repro, pass-rate trend with zero regressions | "ties the portfolio together"; scope note: only against systems you own; wrong: run once, binary pass/fail, no dedup |

Cross-cutting packaging rules (pp. 3 and 20): one-line result at top, benchmark table or demo
video second, one architecture diagram, short design-decisions section, a "what did not work"
section. Interview: "lead with the problem and the number, not the stack".

## Merging the owner's three distributed-backend Projects with the AI Projects

The owner's three Projects (Distributed Job Queue; Video Processing Pipeline; Distributed Load
Testing Platform) are infrastructure-shaped. The 15-guide explicitly says these Projects are
"designed to leverage your existing production engineering skills (Docker, CI/CD, APIs,
databases) as a structural advantage" (p. 2), and P11 calls itself "pure infrastructure
engineering applied to AI, exactly the skill set mid-level SWEs already have" (p. 40). Every
merge below turns one backend Project into the substrate of one or more AI Projects so the
Roadmap carries fewer, deeper Nodes.

### Distributed Job Queue (queues, DLQ, retries, autoscaling)

Best merge: **Agents (P15)** and **LLMOps (P7 / P11 / Self-Healing Gateway)**.

- The Self-Healing Gateway's Phase 4 is literally a job queue: classify requests as interactive
  vs deferrable, push deferrable work to a Redis queue with exponential backoff and jitter when
  providers are degraded, attach idempotency keys so a retry cannot duplicate a side effect
  (21-page guide, p. 11). P11 adds retry with backoff distinguishing retryable from
  non-retryable errors, and circuit breakers (pp. 41-42). The Job Queue's retry policy, DLQ
  (exhausted retries, non-retryable errors), and autoscaling on queue depth become the gateway's
  resilience layer. The DLQ maps to the red-team harness's "needs review" outcome and the eval
  generator's human review queue.
- P15 Agents uses Redis + Celery for async specialist execution and a Redis working-memory store
  (pp. 56-57). The Casefile spec requires "shared claim state in an external store so any run can
  be resumed from a snapshot" and a budget ceiling that terminates the graph (9-page, p. 4).
  Replacing Celery with the owner's queue gives resumable agent runs, per-run budgets as queue
  metadata, and human-approval gates as parked jobs.
- Secondary: P13 nightly pipeline (sample, classify, label, dedup) and P12's async quality
  evaluator ("use a background worker with a message queue", p. 45) are both queue consumers.

How: keep the queue in NestJS/TypeScript (BullMQ-style semantics on Redis, or SQS + Lambda
autoscaling on AWS). Expose it as the execution substrate; write the LLM gateway or agent
supervisor as producers/consumers. The portfolio number becomes the gateway's availability under
simulated provider outages plus zero duplicated side effects across retries.

### Video Processing Pipeline (upload, object storage, chunking, queues)

Best merge: **RAG (P6)**, upgraded toward **Fieldnote multimodal RAG**, with **P14 Document
Processor** as the sibling pattern.

- P6 Phase 1 is an ingestion pipeline: multi-format loader, normalization with metadata, raw
  documents stored alongside processed versions "so you can re-index without re-uploading",
  configurable chunking, embed, dedup (pp. 20-21). The Video Pipeline already has upload, object
  storage, and chunking; swap the video chunk for a transcript segment / keyframe.
- Fieldnote (9-page, p. 3) specifies exactly this modality mix: Whisper for audio, SigLIP/CLIP
  for images, per-modality encoders with a modality tag on each chunk, late fusion with a
  cross-encoder reranker, and returning the source image with the answer. Its ship gate (40
  questions, 15 unanswerable from text alone, p95 < 6 s at k=20) is a ready-made eval.
- P14 (pp. 52-55) shows the queue-backed worker topology for heavy per-document processing
  (OCR workers, extraction workers, Celery + Redis, confidence routing to human review). A video
  pipeline's transcription and frame-extraction workers are the same shape.

How: S3 upload -> queue -> workers (ffmpeg segmenting, Whisper transcription, keyframe
embedding) -> pgvector/Qdrant with `modality` and `timestamp` metadata -> hybrid retrieval with
RRF + reranker -> answers cite `video_id@mm:ss` and a keyframe. NestJS owns the API, storage and
queue; Python is only needed if running Whisper/CLIP locally (hosted APIs avoid it). The
Groundtruth eval (recall@k, MRR, nDCG per category, CI gate on recall@10) is the natural eval
Node to pair with it.

### Distributed Load Testing Platform (containers, workers, autoscaling, metrics)

Best merge: **LLMOps (P7 Semantic Cache, P11 Gateway)** as the traffic generator and replay
harness; secondary **Guardrails / Red-Team (21-page P6)** and **Evals (P13 runner)**.

- Every LLMOps Project ends with a load test that produces the headline number: P7 "send 2,000+
  requests ... measure hit rate convergence over time, latency percentiles, total cost savings"
  (p. 26); P11 "5,000+ concurrent requests with mixed team keys, models, and priorities; gateway
  overhead < 10 ms; rate limiting accuracy under load; fallback behavior under simulated outages"
  (pp. 42-43); Warmstart's ship gate is "replay 1,000 production shaped queries and report hit
  rate, cost delta, p50 and p95" plus a precision curve over the similarity threshold (9-page,
  p. 5). The Load Testing Platform is that replay harness, with Prometheus/Grafana metrics
  already in scope on both sides.
- The Red-Team Harness needs to be "parallelized with a concurrency cap and proper rate limit
  handling, or your own harness will be the thing that takes the app down" (21-page, p. 17), run
  on a schedule and from CI. An attack battery is a load-test scenario with a scorer.
- P13's eval harness "takes any model endpoint, runs the full eval dataset against it, scores each
  response, and produces a structured report" (p. 50). Same worker fan-out, different payload.

How: keep the platform generic (containers, autoscaled workers, scenario definitions, metrics
sink), then add LLM-aware scenario types: replay-from-logs with semantic-similarity scoring,
attack corpora with deterministic + judge scoring, eval datasets with rubric scoring. The number
the portfolio leads with comes from the target Project (hit rate, availability, attack success
rate), and the platform is the thing that produced it credibly.

### Recommended pairing (one AI Project per backend Project)

| Owner Project | Primary AI Project | Shared eval / number | Secondary fits |
|---|---|---|---|
| Distributed Job Queue | Agents (P15) with Casefile's budgets and snapshot resume; or Self-Healing Gateway Phase 4 | runs resumed after kill; cost ceiling enforced; zero duplicate side effects | P11 gateway, P12 async evaluator, P13 nightly pipeline |
| Video Processing Pipeline | RAG (P6) extended to Fieldnote multimodal | Groundtruth metrics (recall@k, MRR, nDCG) with CI gate; Fieldnote p95 < 6 s | P14 document processor |
| Distributed Load Testing Platform | Semantic Cache (P7) replay harness, then P11 gateway load test | hit rate, false-hit rate < 1%, p50/p95 delta, availability under chaos | Red-Team Harness runner, P13 eval runner |

## Notes for a TypeScript/NestJS/AWS engineer

- The guides are Python-first ("industry standard for ML tooling"). Two Projects explicitly
  allow another language: P4 (Python or TypeScript) and P11 (Python or Go). Infra-shaped
  Projects (P7 cache, P11 gateway, P8 guardrail middleware, P9, P12, the Job Queue and Load
  Testing merges) are language-agnostic in substance; NestJS is defensible there. Tradeoff: a
  Python repo matches what hiring managers expect for AI roles; a TypeScript repo matches the
  owner's strongest code. Reasonable split: TypeScript for the infra substrate, Python only where
  the ML libraries force it.
- Fine-tuning (P10 / Slotfill / Distillation) is Python-only (PEFT, TRL, vLLM) and needs a rented
  GPU; it is the one Project with a hard prerequisite outside the owner's stack.
- The guides converge on a small shared toolset worth learning once: Redis, Postgres/pgvector,
  FastAPI-style HTTP, OpenTelemetry + Prometheus + Grafana, Docker Compose, LangGraph (Agents),
  Pydantic/instructor for structured outputs, an LLM-as-judge pattern, and a golden-dataset
  discipline. These could be Resources on the AI Engineering Lane feeding the Project Nodes.
- Dependency order that all three PDFs agree on: build a system (RAG) -> build the eval
  (Groundtruth / LLM-as-Judge) -> attack it (Guardrails / Red-Team) -> make it cheaper
  (Caching, Fine-tuning). Agents can sit anywhere after RAG.

## Sources

All sources are local PDFs; page numbers are the PDF's own page numbers.

- `ai-projects/baswe-six-project-build-guide.pdf` (9 pages)
  - p. 1 rule ("eval, a number, and a tradeoff"); p. 2 how to use + the six table with levels and
    effort; pp. 3-8 one Project per page (Fieldnote, Casefile, Warmstart, Groundtruth, Slotfill,
    Doorman); p. 9 community CTA.
- `ai-projects/BASWE_Build_These_Six_Projects.pdf` (21 pages)
  - p. 1 cover and six-project list; p. 3 "Before you start" (sequencing, what makes a project
    count, layout, 10-12 h/week estimate); pp. 4-6 P1 KG RAG; pp. 7-9 P2 Multi-Agent Research
    Assistant; pp. 10-11 P3 Self-Healing LLM Gateway; pp. 12-13 P4 LLM-as-Judge; pp. 14-15 P5
    Model Distillation; pp. 17-19 P6 Red-Team Harness; p. 20 packaging and interview guidance;
    pp. 2, 16, 21 blank or CTA.
- `ai-projects/BASWE_15_AI_Engineering_Projects_Guide.pdf` (61 pages)
  - p. 2 how to use (12-14 days at 2-3 h/day, leverage production skills); pp. 3-5 P1 Model
    Regression Detection; pp. 6-8 P2 LLM Cost Autopilot; pp. 9-11 P3 Failure Forensics; pp. 12-14
    P4 Self-Healing Docs; pp. 15-18 P5 Output Arbitration; pp. 20-23 P6 RAG Hybrid Search;
    pp. 24-26 P7 Semantic Caching; pp. 27-30 P8 Text-to-SQL Guardrails; pp. 31-34 P9 Prompt
    Versioning and A/B; pp. 35-38 P10 LoRA Fine-Tuning; pp. 40-43 P11 LLM Gateway; pp. 44-47 P12
    AI Feature Flags; pp. 48-51 P13 Eval Dataset Generator; pp. 52-55 P14 Multi-Modal Document
    Processor; pp. 56-59 P15 Agent Orchestration; pp. 19, 39, 60, 61 CTA or blank.
- Owner's three backend Projects: described in the issue #7 task brief (Distributed Job Queue:
  queues, DLQ, retries, autoscaling; Video Processing Pipeline: upload, object storage, chunking,
  queues; Distributed Load Testing Platform: containers, workers, autoscaling, metrics). No
  further definition exists in the repo at the time of writing.
