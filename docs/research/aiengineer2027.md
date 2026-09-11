# Inventory: moalsayed95/AIEngineer2027

Research ticket: [#2](https://github.com/ngvior/continuous-learning-roadmap/issues/2) (part of #1).
Accessed 2026-09-10. All durations were measured or read from primary sources on that date; see the basis column and the Sources section.

## Summary

- The repo is a **link list, not a course**: 20 Markdown files, 11 Resources in the Intermediate branch and ~30 linked pages in the Advanced branch. It proposes **zero explicit Projects**; the only hands-on work is embedded in a few tutorials ("build one image for a simple Python app", "add a scaling rule, fire traffic at it"). It cannot supply Project Nodes for the Roadmap on its own.
- The Intermediate branch is **~100 h of video watch time** (measured with `yt-dlp`); roughly 55 h of that is CS50P + ArjanCodes + ByteByteGo, which are redundant for the owner. The Advanced branch is **~4 h of reading** (word count / 200 wpm) plus 2 short hands-on tutorials, and it is 80% Azure/Microsoft Foundry documentation.
- Author states they built AI systems at Microsoft for 2 years; the Advanced branch is explicitly framed around Microsoft Foundry and pinned to "Microsoft Build 2026". Treat it as a vendor-flavoured view of five real production concerns (containers, identity, state, scaling, observability/evaluation), not as a neutral reading list.
- **Broken links**: both Microsoft Learn training modules in Advanced Stage 01 now 301-redirect to the Azure Container Registry docs landing page (modules retired). One video in the ArjanCodes playlist and one in RAG From Scratch are hidden/unavailable.
- **Gaps relative to the owner's targets**: no statistics/probability at all; no fine-tuning; no evals beyond Azure's built-in evaluator reference; no guardrails beyond one Azure overview page. Fine-tuning and evals are two of the six BASWE Projects.
- **Keep for the owner** (~60 h working time): Essence of Linear Algebra, first four chapters of Essence of Calculus, 3Blue1Brown Neural Networks, Karpathy Zero to Hero, RAG From Scratch, and a handful of vendor-neutral Advanced pages (OpenTelemetry GenAI semantic conventions, vector search/HNSW/hybrid, agentic retrieval, agent identity concept, KEDA, AI cost optimization, PyRIT). Skip CS50P, ByteByteGo, AZ-900, and most Azure how-to pages.

## Repo facts

| Fact | Value | Source |
|---|---|---|
| URL | https://github.com/moalsayed95/AIEngineer2027 | GitHub API |
| Default branch / last push | `main` / 2026-06-10 | `gh api repos/moalsayed95/AIEngineer2027` |
| Stars | 272 | same |
| License | none in tree | `git/trees/HEAD?recursive=1` |
| Files | `README.md`, `intermediate/` (README, `roadmap2027.md`, 8 stage READMEs), `advanced/` (README, `roadmap-advanced.md`, 5 stage READMEs) | same |
| Origin | Two short-video scripts (`roadmap2027.md`, `roadmap-advanced.md`) expanded into stage pages | file contents |
| Stated currency | "current as of Microsoft Build 2026" | `README.md`, `advanced/README.md` |

## Order the repo suggests

Strictly linear. The README says "Start at Intermediate Stage 01 and go in order. Don't skip ahead." The Advanced branch declares the whole Intermediate branch as its prerequisite ("Python, an LLM framework, RAG, an API, and a cloud basics cert (AZ-900)"). Explicit cross-references:

```
Intermediate 01 Python -> 02 Math -> 03 Neural Networks -> 04 AI Frameworks -> 05 RAG
             -> 06 FastAPI -> 07 System Design -> 08 Cloud (AZ-900)
Advanced     01 Containers (needs Int 08) -> 02 Security & Identity (needs Adv 01)
             -> 03 State & Memory (needs Int 05, Adv 02) -> 04 Scaling (needs Int 07, Adv 01, Adv 03)
             -> 05 Observability & Evaluation (needs Adv 01, Adv 02)
```

Within a stage that has two Resources (01, 02, 03) the repo says to watch them in the listed order or "in parallel" (Stage 02 and 03).

## Inventory: Intermediate branch

Hours basis for video playlists: sum of per-video durations reported by `yt-dlp --flat-playlist` on 2026-09-10 (watch time only). "Working" adds a multiplier only where the Resource requires coding along.

| # | Stage | Resource | URL | Type | Prerequisites | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|---|
| I-01 | 01 Python & Software Design | CS50P: Introduction to Programming with Python (Harvard) | https://www.youtube.com/playlist?list=PLhQjrBD2T3817j24-GogXmWqO5Q5vYy0V | Video (course, 11 lectures) | None | **15.9 h** watch (954 min measured); Harvard's problem sets would add ~30 h, not linked by the repo | **Redundant.** Owner reads Python and has 4+ years of typed-backend experience. Keep only as a lookup. |
| I-02 | 01 | ArjanCodes: Software Design in Python | https://www.youtube.com/playlist?list=PLC0nd42SBTaNuP4iB4L6SJlMaHE71FG6N | Video (playlist, 101 videos, 1 hidden) | Python basics | **34.3 h** watch (2,060 min measured) | **Mostly redundant** (Clean/Hexagonal, DI, SOLID already known). Cherry-pick the Python-idiom videos: "Protocol or ABC", "Do We Still Need Dataclasses? Pydantic", "Python Decorators", "Most Python Projects Fail Because of This Structure", "Stop Mixing FastAPI with Business Logic: Ports & Adapters", "Design Patterns for AI Agents in Python". ~2.5 h. |
| I-03 | 02 Math Foundations | 3Blue1Brown: Essence of Linear Algebra | https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab | Video (16 chapters) | High-school algebra | **3.0 h** watch (181 min measured) | **Keep.** Owner is a linear-algebra beginner; this is the cheapest intuition build. Pair with a numpy notebook to make it stick (~6 h working). |
| I-04 | 02 | 3Blue1Brown: Essence of Calculus | https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr | Video (12 chapters) | High-school algebra | **3.2 h** watch (191 min measured) | **Keep chapters 1-4 and 8** (derivative, chain rule, integration): ~1.5 h. Chapters on Euler's number, L'Hopital, Taylor series are not needed for backprop intuition. |
| I-05 | 03 Neural Networks | Andrej Karpathy: Neural Networks: Zero to Hero | https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ | Video (10 lectures, code-along) | Python, I-03, I-04 | **19.4 h** watch (1,161 min measured); **~40-50 h working** (repo says "watch every single video, take your time"; each lecture is a live Jupyter build) | **Keep; the anchor of the branch.** Note video 08 "State of GPT" is a 43 min Build talk, not a lecture, and video 10 "Let's reproduce GPT-2" is 4 h and needs a GPU (rentable). |
| I-06 | 03 | 3Blue1Brown: Neural Networks | https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi | Video (10 videos) | I-03, I-04 | **3.6 h** watch (218 min measured) | **Keep.** Chapters 1-4 before Karpathy lecture 1; chapters 5-7 (LLMs, transformers, attention) before Karpathy lecture 7. |
| I-07 | 04 AI Frameworks | DeepLearning.AI: LangChain for LLM Application Development | https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/ | Course (short, free) | Python, LLM API basics | **1 h 48 min** (course page: "Beginner, 1h48m, 8 Video Lessons, 6 Code Examples, 1 Graded Assignment") | **Optional.** Owner already has LLM API experience; the course covers models/prompts/parsers, memory, chains, QA over documents, agents. The repo itself allows swapping in LangGraph or Microsoft Agent Framework; BASWE Project 2 uses LangGraph, so a LangGraph tutorial is the better fit. |
| I-08 | 05 RAG | LangChain: RAG From Scratch | https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x | Video (15 videos, 1 hidden) | I-07 or equivalent, embeddings intuition (I-03) | **1.4 h** watch (86 min measured); ~5 h working with the companion notebooks | **Keep.** Indexing, retrieval, query translation (multi-query, RAG fusion, decomposition, step-back, HyDE), routing, query structuring, multi-representation indexing, RAPTOR, ColBERT. Direct preparation for BASWE Project 1 and for Advanced Stage 03. |
| I-09 | 06 FastAPI | Dave Ebbelaar: FastAPI for AI Projects - Getting Started in 15 Minutes | https://www.youtube.com/watch?v=-IaCV5-mlSk | Video (single) | Python, HTTP APIs | **17 min** (measured; uploaded 2025-05-22) | **Skim.** Conceptually redundant for a NestJS engineer (routing, DTO validation via Pydantic); useful only as a FastAPI idiom primer, since every BASWE Project ships behind FastAPI. |
| I-10 | 07 System Design | ByteByteGo: System Design Fundamentals | https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf | Video (playlist, 103 shorts) | None | **9.7 h** watch (581 min measured) | **Redundant.** Caching, queues, load balancers, Redis, Kafka, CI/CD, Docker, k8s explainers at a 5-minute-video depth; owner has 4+ years with Redis, AWS, CI/CD. |
| I-11 | 08 Cloud & Deployment | Adam Marczak: AZ-900 Microsoft Azure Fundamentals Full Course | https://www.youtube.com/playlist?list=PLGjZwEtPN7j-Q59JYso3L4_yoCjj2syrM | Video (40 episodes, certification prep) | None | **7.3 h** watch (435 min measured); AZ-900 exam is a paid extra not linked by the repo | **Redundant and off-cloud.** Owner works on AWS (CDK). The repo's own advice is "pick one cloud provider"; for the owner that is already AWS. Only relevant if a target employer is Azure-first. |

Intermediate totals: **99.9 h** of measured video; the owner-trimmed subset (I-03, I-04 partial, I-05, I-06, I-08, cherry-picked I-02, I-09, optional I-07) is **~31 h watch / ~60 h working**.

## Inventory: Advanced branch

Hours basis: words in the page's `<main>` element / 200 wpm, measured 2026-09-10 with `curl` + a tag stripper. Hands-on time is an estimate added where the page is a tutorial. All pages are free documentation (type "docs" = reading Resource).

### Advanced Stage 01: Containerization & Infrastructure

| # | Resource | URL | Type | Prereq | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|
| A-01 | Docker: Get Started | https://docs.docker.com/get-started/ | Docs (22 pages in the docs sitemap: overview, get Docker, the basics x4, building images x5, running containers x5, 3 tutorials) | None | ~4-6 h reading + doing (22 pages; landing page is JS-rendered so word count was not measurable) | **Partial.** Owner has basic Docker; do "building images" (layers, build cache, multi-stage, tag and publish) and "running containers" (persisting data, multi-container). ~2-3 h. |
| A-02 | Microsoft Learn: Introduction to Docker containers | https://learn.microsoft.com/training/modules/intro-to-docker-containers/ | Docs (module) | None | n/a | **Dead link.** 301 to https://learn.microsoft.com/en-us/azure/container-registry/ (module retired). Skip. |
| A-03 | Microsoft Learn: Build and store container images with ACR | https://learn.microsoft.com/training/modules/build-and-store-container-images/ | Docs (module) | A-01 | n/a | **Dead link.** Same 301. Skip. |
| A-04 | Tutorial: Create a registry and push a container image (ACR) | https://learn.microsoft.com/azure/container-instances/container-instances-tutorial-prepare-acr | Docs (tutorial) | A-01, Azure account | ~6 min read (1,136 words) + ~30 min hands-on | **Redundant on Azure; the AWS equivalent (ECR push) is owner-known.** |
| A-05 | Recommendations for tagging and versioning container images | https://learn.microsoft.com/azure/container-registry/container-registry-image-tag-version | Docs (concept) | A-01 | ~5 min (918 words) | **Keep (15 min).** Vendor-neutral idea: deploy by digest/unique tag, never `latest`; lock deployed tags. |
| A-06 | How hosted agents work in Foundry Agent Service | https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents | Docs (concept) | A-01 | ~17 min (3,434 words) | **Read once for the mental model**, it is the thesis of the whole branch (the "cross-cutting concerns" quote was verified on the page). Azure-specific mechanics are skippable. |

### Advanced Stage 02: Security & Identity

| # | Resource | URL | Type | Prereq | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|
| A-07 | Azure RBAC overview | https://learn.microsoft.com/azure/role-based-access-control/overview | Docs (concept) | Cloud basics | ~7 min (1,377 words) | **Redundant.** Same model as AWS IAM (principal, role, scope, least privilege). |
| A-08 | Managed identities best practices | https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/managed-identity-best-practice-recommendations | Docs (concept) | A-07 | ~10 min (2,068 words) | **Redundant.** AWS equivalent: IAM roles for tasks/instance profiles, which the owner uses via CDK. |
| A-09 | Agent identity concepts in Microsoft Foundry | https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity | Docs (concept) | A-08 | ~16 min (3,155 words) | **Keep.** The "agent is a first-class principal with a scoped, exchanged token per downstream tool" idea is new relative to the owner's baseline and cloud-agnostic in spirit. |
| A-10 | What is Microsoft Entra Agent ID | https://learn.microsoft.com/entra/agent-id/what-is-microsoft-entra-agent-id | Docs (concept) | A-09 | ~3 min (534 words) | Skim. Governance layer (Build 2026); Azure-only product. |
| A-11 | Guardrails and cross-prompt injection (XPIA) protection | https://learn.microsoft.com/azure/foundry/guardrails/guardrails-overview | Docs (concept) | LLM basics | ~8 min (1,578 words) | **Keep as vocabulary**, then go to BASWE Project 6 / Doorman for the real work. |
| A-12 | Set up a Key Vault connection for Foundry | https://learn.microsoft.com/azure/foundry/how-to/set-up-key-vault-connection | Docs (how-to) | Azure account | ~7 min (1,419 words) | **Redundant.** Secrets Manager equivalent. |
| A-13 | Standard agent setup (data isolation) | https://learn.microsoft.com/azure/foundry/agents/concepts/standard-agent-setup | Docs (concept) | A-09 | ~8 min (1,626 words) | Skim; Azure-specific. Also referenced by Stage 03. |

### Advanced Stage 03: State Persistence & Memory

| # | Resource | URL | Type | Prereq | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|
| (cross-ref) | RAG From Scratch (I-08), "re-watch with production in mind" | see I-08 | Video | | 0 (already counted) | Keep. |
| A-14 | Vector search in Azure AI Search | https://learn.microsoft.com/azure/search/vector-search-overview | Docs (concept) | I-03, I-08 | ~7 min (1,302 words) | **Keep (concepts only):** HNSW, hybrid search, semantic reranking. Then use pgvector, which fits the owner's PostgreSQL background. |
| A-15 | Open-source checkpoint: pgvector, Chroma, FAISS (named, not linked) + LangGraph persistence/checkpointers | https://langchain-ai.github.io/langgraph/concepts/persistence/ | Docs (concept) | I-07 | Page returns 200 but is JS-rendered; content not measurable via curl. Estimate ~20 min read | **Keep.** LangGraph checkpointers are exactly the state layer BASWE Project 2 needs (Redis/Postgres). |
| A-16 | Azure Cosmos DB integration with Foundry Agent Service (BYO thread storage) | https://learn.microsoft.com/azure/cosmos-db/gen-ai/azure-agent-service | Docs (concept) | A-13 | ~2 min (412 words) | Skip; Azure-only. |
| A-17 | What is Foundry IQ | https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq | Docs (concept) | A-14 | ~5 min (1,079 words) | Skim; product page. The permission-aware retrieval idea is worth one sentence of notes. |
| A-18 | Agentic retrieval in Azure AI Search | https://learn.microsoft.com/azure/search/agentic-retrieval-overview | Docs (concept) | I-08, A-14 | ~10 min (1,917 words) | **Keep.** Query planning/decomposition/parallel subqueries/rerank/iterate is the pattern behind BASWE Project 1 and Project 2; the page is the clearest short description in the repo. |

### Advanced Stage 04: Scaling

| # | Resource | URL | Type | Prereq | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|
| (cross-ref) | System Design Fundamentals (I-10) | see I-10 | Video | | 0 | Redundant. |
| A-19 | KEDA: Kubernetes Event-Driven Autoscaling | https://keda.sh | Docs (project site) | Container basics; k8s vocabulary | ~7 min (1,303 words on landing page) | **Keep as a 30 min concept read.** Owner has no Kubernetes; the "scale on queue depth / HTTP concurrency, not CPU" idea transfers to ECS/Lambda. |
| A-20 | Set scaling rules in Azure Container Apps | https://learn.microsoft.com/azure/container-apps/scale-app | Docs (how-to) | A-19 | ~22 min (4,429 words) | Redundant on Azure; concept (scale-to-zero only on HTTP/event triggers, min/max replicas) is owner-known from AWS. |
| A-21 | Tutorial: Scale a container app | https://learn.microsoft.com/azure/container-apps/tutorial-scaling | Docs (tutorial) | A-20, Azure account | ~12 min read (2,340 words) + ~30 min hands-on | Skip. |
| A-22 | Optimize cost for AI workloads on Azure | https://learn.microsoft.com/startups/build/ai/ai-cost-optimization | Docs (guide) | Cloud basics | ~15 min (3,009 words) | **Keep.** Mostly cloud-neutral: scale-to-zero vs cold start, warm replicas, right-size GPU SKU, spot for batch/eval. Feeds BASWE Project 3 (LLMOps gateway) and Warmstart (LLM caching). |
| (repeat) | How hosted agents scale (A-06, "isolation model" and "sandbox sizes" sections) | see A-06 | Docs | | 0 | Already counted. |

### Advanced Stage 05: Observability & Evaluation

| # | Resource | URL | Type | Prereq | Hours (basis) | Owner verdict |
|---|---|---|---|---|---|---|
| A-23 | OpenTelemetry GenAI semantic conventions | https://opentelemetry.io/docs/specs/semconv/gen-ai/ | Spec | Distributed tracing basics | Landing page is 114 words; the spec has ~8 sub-pages (spans, events, metrics, agent spans, per-provider). Estimate ~1.5 h to read | **Keep; highest-value vendor-neutral Resource in the branch.** Owner already knows tracing from backend work; this is the LLM-specific vocabulary every BASWE Project should emit. |
| A-24 | "The evaluation mindset" (prose, no link) | n/a | Text in the stage README | | 5 min | Keep the idea: dataset of representative inputs, metrics (correctness, groundedness, safety, latency, cost), run on every change. BASWE Project 4 / Groundtruth is the build. |
| A-25 | Observability in generative AI (Foundry) | https://learn.microsoft.com/azure/foundry/concepts/observability | Docs (concept) | A-23 | ~5 min (1,036 words) | Skim; the three-pillar framing (tracing, evaluation, monitoring) is useful, product details are not. |
| A-26 | Agent tracing overview | https://learn.microsoft.com/azure/foundry/observability/concepts/trace-agent-concept | Docs (concept) | A-23 | ~6 min (1,290 words) | Skim; note the PII/secret redaction guidance. |
| A-27 | Built-in evaluators reference | https://learn.microsoft.com/azure/foundry/concepts/built-in-evaluators | Docs (reference) | A-24 | ~6 min (1,129 words) | **Keep as a taxonomy** (quality, RAG groundedness/relevance, safety, agent tool-call accuracy/task completion). Implement with DeepEval/Ragas per BASWE, not Azure. |
| A-28 | AI red teaming agent (uses PyRIT) | https://learn.microsoft.com/azure/foundry/how-to/develop/run-ai-red-teaming-cloud and https://github.com/Azure/PyRIT | Docs (how-to) + OSS repo | A-11 | ~10 min (1,944 words) + PyRIT README | **Keep PyRIT, skip the Azure wrapper.** PyRIT is in the BASWE Project 6 stack list. |
| A-29 | Monitor agents dashboard | https://learn.microsoft.com/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard | Docs (how-to) | A-25 | ~13 min (2,596 words) | Skip; Azure-only. |

Advanced totals: **~4 h** of reading across 29 linked pages (word counts sum to ~52,000 words, about 4.3 h at 200 wpm) plus ~1 h of optional Azure hands-on. The owner-relevant subset (A-01 partial, A-05, A-06, A-09, A-11, A-14, A-15, A-18, A-19, A-22, A-23, A-27, A-28) is **~5-6 h working** including the OpenTelemetry spec and Docker exercises.

## Projects proposed by the repo

None. The repo contains no Project definitions, no repositories to build, no rubric, and no portfolio guidance. Implicit exercises found in the text:

1. "Build one image for a simple Python app and run it locally" (Advanced Stage 01, from A-01).
2. Tag and push an image to ACR (A-04).
3. "Add a rule, fire traffic at it, and watch replicas spin up" (A-21).
4. "Build your first AI API with FastAPI" (Intermediate Stage 06, from the video script).
5. "Build a small dataset of representative inputs ... run it on every change" (A-24).

For the Roadmap this means AIEngineer2027 can only feed Resource Nodes; Project Nodes must come from BASWE (or the owner's distributed-backend projects).

## Overlap with the owner's saved Resources

### microsoft/ai-for-beginners (25 lessons; README fetched 2026-09-10)

| AIEngineer2027 | ai-for-beginners | Overlap |
|---|---|---|
| I-05 Karpathy lectures 1-5 (micrograd, MLP, batchnorm, backprop) and I-06 3B1B chapters 1-4 | Lessons 03 Perceptron, 04 Multi-Layered Perceptron and own framework, 05 Intro to frameworks and overfitting | **High.** Same ground; Karpathy is deeper and code-first, ai-for-beginners adds PyTorch/TensorFlow framework usage. Pick one as primary. |
| I-05 Karpathy lectures 2-3, 7, 9, 10 (makemore, GPT, tokenizer, GPT-2) and I-06 chapters 5-7 | Lessons 13-20 (BoW/TF-IDF, Word2Vec, language modeling, RNNs, Transformers/BERT, LLMs and prompt programming) | **Medium.** ai-for-beginners covers the pre-transformer NLP lineage Karpathy skips; Karpathy covers modern decoder training ai-for-beginners does not. |
| I-03/I-04 math | none | ai-for-beginners assumes math; AIEngineer2027 teaches the minimum. Complementary. |
| Nothing | Lessons 02 (symbolic AI), 06-12 (computer vision), 21-25 (genetic algorithms, deep RL, multi-agent, ethics, CLIP) | No overlap; these are optional for an AI-engineering path (ticket #3 decides). |
| Advanced branch (production) | none | ai-for-beginners has no deployment/ops content. |

### Steve Brunton (channel playlists listed via yt-dlp 2026-09-10)

| AIEngineer2027 | Brunton | Overlap |
|---|---|---|
| I-06 3B1B Neural Networks | Intro to Data Science, videos 12-15 (Neural Network Overview, Architectures and Deep Learning, Caveats); 2.7 h playlist measured | **Low-medium.** Brunton's is a 7-9 min-per-topic survey; 3B1B goes into gradient descent and backprop. |
| I-03 Essence of Linear Algebra | Brunton has no introductory linear algebra playlist; "Singular Value Decomposition [Data-Driven Science and Engineering]" assumes it | **None; sequence matters.** 3B1B first, Brunton SVD later if the owner wants the data-science Lane. |
| I-04 Essence of Calculus | Engineering Math playlists (ODEs, vector calculus, complex analysis) | None; Brunton's are far beyond need. |
| Nothing | **Probability Bootcamp**, **Introduction to Statistics and Data Analysis** | **Gap filler.** AIEngineer2027 has zero probability/statistics; the owner has none. These two Brunton playlists (ticket #4 measures them) are the natural insert between Intermediate Stage 02 and 03, and are prerequisite for reasoning about evals (agreement scores, calibration) in BASWE Project 4. |
| Nothing | Reinforcement Learning, Control, Fluids, Koopman, Physics-Informed ML | Out of scope for AI engineering. |

### BASWE six AI Projects (two local PDFs; the "Build These Six Projects" guide and the "Six projects that prove you can do the job" spec)

| BASWE Project (stack per PDF) | AIEngineer2027 coverage | Assessment |
|---|---|---|
| 1 RAG: Knowledge Graph RAG (Python, Neo4j, LangChain, Claude API, pgvector, FastAPI); spec variant Fieldnote (multimodal RAG) | I-08 RAG From Scratch; A-14 vector search/HNSW/hybrid; A-18 agentic retrieval; I-09 FastAPI | **Good prerequisite coverage** for vector RAG and query translation. No coverage of graph RAG, entity resolution, or multimodal encoders. |
| 2 Agents: Multi-Agent Research Assistant (LangGraph, Claude API, Tavily, Redis, FastAPI); spec variant Casefile | I-07 LangChain short course (agents lesson); A-15 LangGraph persistence; A-09 agent identity | **Partial.** The repo teaches LangChain, BASWE uses LangGraph; A-15 is the bridge. |
| 3 LLMOps: Self-Healing LLM Gateway (LiteLLM, FastAPI, Redis, Prometheus, Grafana); spec variant Warmstart (LLM caching) | A-19 KEDA, A-20/21 scaling, A-22 cost optimization, A-23 OpenTelemetry | **Conceptual only.** No routing/fallback/caching content; the repo's answer is "let Foundry do it". |
| 4 Evals: LLM-as-Judge with Human Calibration (DeepEval, Claude API, Postgres, Streamlit); spec variant Groundtruth (retrieval evaluation, Ragas, pytest) | A-24 evaluation mindset, A-27 built-in evaluators taxonomy | **Thin.** Names the metrics; no method, no statistics (agreement, calibration). Brunton's statistics playlists are the missing prerequisite. |
| 5 Fine-tuning: Model Distillation Pipeline (Hugging Face, PyTorch, Claude API, W&B, vLLM); spec variant Slotfill (LoRA) | Only I-05 Karpathy (training from scratch, PyTorch fluency) | **Gap.** The repo never mentions fine-tuning, LoRA/PEFT, or distillation. Karpathy is still the right PyTorch on-ramp. |
| 6 Safety: Automated Red-Team Harness (garak, PyRIT, Claude API, FastAPI, Postgres); spec variant Doorman (prompt-injection guardrails) | A-11 guardrails overview, A-28 red teaming with **PyRIT** | **Direct tool overlap on PyRIT.** Guardrails page gives vocabulary only. |

The BASWE guide's own order (1 -> 4 -> 6 -> 5, with 3 as the second pick if time is short) is compatible with the repo's Intermediate 05 -> Advanced 05 -> Advanced 02 sequence.

### Claude Academy (catalog at https://anthropic.skilljar.com/ and https://academy.claude.com/, fetched 2026-09-10; anthropic.com/learn now 308-redirects to academy.claude.com)

| AIEngineer2027 | Claude Academy course | Overlap |
|---|---|---|
| I-07 LangChain short course (models, prompts, parsers, memory, chains, agents) | "Building with the Claude API", "Claude Platform 101" | **Medium: alternative on-ramp.** Same concepts (tool use, structured output, agent loop) without the LangChain abstraction; BASWE Projects call the Claude API directly, so the Academy path is the closer fit. Ticket #6 measures hours. |
| A-15 LangGraph persistence, agent tooling | "Introduction to Model Context Protocol", "Model Context Protocol: Advanced Topics" | Complementary: MCP is the tool-integration layer AIEngineer2027 never mentions. |
| A-09/A-10 agent identity | none in the Academy catalog | No overlap. |
| Everything Azure (A-04, A-07, A-08, A-12, A-13, A-16, A-17, A-20, A-21, A-25, A-26, A-29) | "Claude with Amazon Bedrock" exists in the catalog | No overlap; Bedrock course is the AWS-side analogue if a cloud-integration Resource is wanted. |
| Nothing | Claude Code 101 / in Action, Claude 101, Cowork, AI Fluency, agent skills | No overlap. |

## Redundancy verdict for the owner (4+ years TypeScript/NestJS/PostgreSQL/AWS; reads Python; linear algebra beginner; no statistics; basic LLM API)

**Skip entirely** (~70 h saved): I-01 CS50P, I-10 ByteByteGo, I-11 AZ-900, A-02/A-03 (dead), A-04, A-07, A-08, A-12, A-13, A-16, A-20, A-21, A-29, and the Azure-specific halves of A-06, A-25, A-26.

**Cherry-pick**: I-02 ArjanCodes (Python idioms only, ~2.5 h), I-04 Calculus (chapters 1-4, 8), A-01 Docker (images and running-containers sections), I-07 DLAI LangChain (only if the owner wants LangChain specifically; otherwise a LangGraph tutorial or Claude Academy "Building with the Claude API").

**Keep as Resource Nodes**: I-03 Essence of Linear Algebra, I-06 3B1B Neural Networks, I-05 Karpathy Zero to Hero, I-08 RAG From Scratch, I-09 FastAPI (17 min, attach to the first Project rather than a Node), and a single "Production AI concepts" reading bundle made of A-05, A-06 (thesis only), A-09, A-11, A-14, A-15, A-18, A-19, A-22, A-23, A-27, A-28/PyRIT.

**Missing for the owner's targets, must come from elsewhere**: probability and statistics (Brunton), fine-tuning/LoRA (BASWE Project 5 plus Hugging Face docs), evals method (BASWE Project 4, DeepEval/Ragas), MCP/tool integration (Claude Academy), AWS-side deployment of containers (owner-known; no Resource needed).

## Suggested placement in the Roadmap (for ticket #10)

- **AI Engineering Lane, foundations sub-sequence**: I-03 -> I-04 (partial) -> [Brunton probability/statistics, ticket #4] -> I-06 -> I-05. Alternate with a Project after I-08.
- **AI Engineering Lane, applied**: I-08 RAG From Scratch -> BASWE Project 1 -> A-23 + A-27 reading -> BASWE Project 4 -> A-11 + A-28 -> BASWE Project 6.
- **Backend / platform Lane**: A-01 Docker deepening + A-05 + A-19 + A-22 as one short Resource before BASWE Project 3.
- Karpathy lecture 10 (GPT-2 reproduction, 4 h + GPU) is a natural optional Node before BASWE Project 5.

## Sources

All accessed 2026-09-10.

Repo (primary):
- https://github.com/moalsayed95/AIEngineer2027 (metadata via GitHub API: `repos/moalsayed95/AIEngineer2027`, `git/trees/HEAD?recursive=1`)
- https://raw.githubusercontent.com/moalsayed95/AIEngineer2027/main/README.md
- https://raw.githubusercontent.com/moalsayed95/AIEngineer2027/main/intermediate/README.md and `intermediate/roadmap2027.md`, `intermediate/stage-01-python/README.md` through `stage-08-cloud/README.md`
- https://raw.githubusercontent.com/moalsayed95/AIEngineer2027/main/advanced/README.md and `advanced/roadmap-advanced.md`, `advanced/stage-01-containerization/README.md` through `stage-05-observability-evaluation/README.md`

Durations (measured with `yt-dlp 2026.07.04 --flat-playlist`, per-video durations summed):
- https://www.youtube.com/playlist?list=PLhQjrBD2T3817j24-GogXmWqO5Q5vYy0V (CS50P, 11 videos, 954 min)
- https://www.youtube.com/playlist?list=PLC0nd42SBTaNuP4iB4L6SJlMaHE71FG6N (ArjanCodes, 101 videos, 2,060 min, 1 hidden)
- https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab (Essence of Linear Algebra, 16 videos, 181 min)
- https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr (Essence of Calculus, 12 videos, 191 min)
- https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ (Zero to Hero, 10 videos, 1,161 min)
- https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi (3B1B Neural Networks, 10 videos, 218 min)
- https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x (RAG From Scratch, 15 videos, 86 min, 1 hidden)
- https://www.youtube.com/playlist?list=PLCRMIe5FDPsd0gVs500xeOewfySTsmEjf (ByteByteGo, 103 videos, 581 min)
- https://www.youtube.com/playlist?list=PLGjZwEtPN7j-Q59JYso3L4_yoCjj2syrM (AZ-900 Marczak, 40 videos, 435 min)
- https://www.youtube.com/watch?v=-IaCV5-mlSk (FastAPI for AI Projects, 17 min, uploaded 2025-05-22)
- https://www.youtube.com/playlist?list=PLMrJAkhIeNNQV7wi9r7Kut8liLFMWQOXn (Brunton Intro to Data Science, 20 videos, 161 min)
- https://www.youtube.com/@Eigensteve/playlists (Brunton playlist names)

Course and docs pages (word counts via `curl` on the `<main>` element; 200 wpm reading rate):
- https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/ (redirects to https://www.deeplearning.ai/courses/langchain; "Beginner, 1h48m, 8 Video Lessons, 6 Code Examples, 1 Graded Assignment")
- https://docs.docker.com/get-started/ and https://docs.docker.com/sitemap.xml (22 get-started pages)
- https://learn.microsoft.com/training/modules/intro-to-docker-containers/ and https://learn.microsoft.com/training/modules/build-and-store-container-images/ (both 301 to https://learn.microsoft.com/en-us/azure/container-registry/)
- All Advanced-branch `learn.microsoft.com`, `keda.sh`, `opentelemetry.io`, `langchain-ai.github.io`, and `github.com/Azure/PyRIT` URLs listed in the inventory tables above (each returned HTTP 200)

Overlap sources:
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/README.md (lesson table)
- `ai-projects/BASWE_Build_These_Six_Projects.pdf` and `ai-projects/baswe-six-project-build-guide.pdf` in this repo (text extracted with `pdftotext`)
- https://anthropic.skilljar.com/ and https://academy.claude.com/ (course catalog; https://www.anthropic.com/learn 308-redirects to the latter)
