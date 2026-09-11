---
title: P15 Agent Orchestration System
type: project
lane: ai-engineering
order: 17
status: pending
hours: 45
prerequisites:
  - p6-rag-pipeline-hybrid-search
  - claude-code-mcp-subagents-and-skills
  - virtual-code-advanced-backend-ai-part-2
links: []
language: python
phases:
  - Supervisor, specialists and reviewer hierarchy with tool registry
  - Job Queue
  - Working and long-term memory
  - Human-in-the-loop escalation and approval queue
  - OpenTelemetry tracing, trace explorer and replay
  - Compose stack and end-to-end tests
  - Demo and narrative
attached: []
---

A three-layer agent system in LangGraph: a supervisor decomposes tasks into a dependency graph, delegates to tool-using specialists registered with schemas and rate limits (custom tools and MCP), and a reviewer checks the result; short-term working memory lives in Redis and long-term semantic memory in a vector store with importance scoring, consolidation and expiry. Low-confidence or sensitive actions pause execution into an approval queue with granular human-in-the-loop levels, and every run emits a full OpenTelemetry trace with cost per task and a replay system. The merged Job Queue phase absorbs the owner's distributed job-queue Project: retries with backoff, a dead-letter queue, idempotency keys and autoscaling on queue depth become the async execution substrate for specialists, resumable runs and parked approval gates, replacing the guide's Celery. The heaviest Project of the six (six services in Docker Compose), which is why it comes after the RAG, Claude Academy and LangGraph Nodes.
