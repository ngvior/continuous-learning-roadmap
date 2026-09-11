---
title: P6 RAG Pipeline with Hybrid Search
type: project
lane: ai-engineering
order: 5
status: pending
hours: 35
prerequisites:
  - building-with-the-claude-api
  - ai-for-beginners-nlp-block
  - rag-from-scratch-langchain
links: []
language: python
phases:
  - Ingestion and chunking strategies
  - Hybrid retrieval and reranking
  - Grounded generation with verified citations
  - Golden eval suite and chunking report
  - FastAPI service and dashboard
  - Demo and case study
attached:
  - title: "Dave Ebbelaar: FastAPI for AI Projects - Getting Started in 15 Minutes"
    url: https://www.youtube.com/watch?v=-IaCV5-mlSk
    hours: 0.3
  - title: "ArjanCodes: Software Design in Python (six cherry-picked videos)"
    url: https://www.youtube.com/playlist?list=PLC0nd42SBTaNuP4iB4L6SJlMaHE71FG6N
    hours: 2.5
  - title: PyRIT (Azure) README and repository
    url: https://github.com/Azure/PyRIT
    hours: 0.5
---

Production RAG over a set of internal documents: a multi-format loader with three switchable chunking strategies, dense plus BM25 hybrid retrieval fused with Reciprocal Rank Fusion, a reranker, and grounded answers whose inline citations are verified by an LLM judge, all behind a FastAPI service with Docker Compose. It ships with a 50-question golden eval suite (correctness, faithfulness, retrieval relevance, citation accuracy) and a written chunking-strategy comparison, because a BASWE Project only counts when it has an eval, a number and a tradeoff. It is the first AI Project on the Roadmap since the guides agree on the order: build a system, then evaluate it, then attack it, then make it cheaper. Its query logs become the input of the P13 Eval Dataset Generator. The ArjanCodes Attached Reading is limited to six videos from the playlist: "Protocol or ABC", "Do We Still Need Dataclasses? Pydantic", "Python Decorators", "Most Python Projects Fail Because of This Structure", "Stop Mixing FastAPI with Business Logic: Ports & Adapters" and "Design Patterns for AI Agents in Python".
