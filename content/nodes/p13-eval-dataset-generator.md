---
title: P13 Eval Dataset Generator
type: project
lane: ai-engineering
order: 9
status: pending
hours: 35
prerequisites:
  - p6-rag-pipeline-hybrid-search
  - brunton-statistics-and-data-analysis
links: []
language: python
phases:
  - Unified log schema, adapters and sampling
  - Clustering, outlier detection and difficulty scoring
  - Auto-labeling with confidence-based review routing
  - Eval harness and regression detection
  - Dataset explorer, review queue and nightly cron
  - Demo and narrative
attached:
  - title: Built-in evaluators reference (Microsoft Foundry) as an evals taxonomy
    url: https://learn.microsoft.com/azure/foundry/concepts/built-in-evaluators
    hours: 0.5
---

A pipeline that mines production LLM logs, finds interesting, edge and failure interactions with embeddings, HDBSCAN clustering and an LLM judge, auto-labels them into a growing production-representative eval dataset, and runs that dataset against any endpoint with regression detection between runs. The guides call the dataset, not the harness, the hardest part of AI evaluation. The P6 RAG Pipeline is the log source: its query traffic is what gets sampled, clustered and labeled here, which is why P6 is a Prerequisite. The statistics Prerequisite covers the sampling, agreement and significance reasoning the labeling and review-queue phases depend on. The Attached Reading is used only as a taxonomy of evaluator families (quality, RAG groundedness and relevance, safety, agent tool-call accuracy); the implementation is vendor-neutral.
