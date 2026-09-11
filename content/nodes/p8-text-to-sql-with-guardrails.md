---
title: P8 Text-to-SQL with Guardrails
type: project
lane: backend
order: 11
status: pending
hours: 35
prerequisites:
  - building-with-the-claude-api
links: []
language: typescript
phases:
  - Schema extraction and dynamic prompt construction
  - Structured SQL output and guardrail middleware
  - Back-translation hallucination detection and confidence score
  - Query API, history and editable-SQL frontend
  - Golden NL/SQL eval suite
  - Demo and narrative
attached:
  - title: Guardrails and cross-prompt injection (XPIA) protection (Microsoft Foundry)
    url: https://learn.microsoft.com/azure/foundry/guardrails/guardrails-overview
    hours: 0.5
---

A natural-language interface over a real PostgreSQL database: schema auto-extraction with embedding-based table filtering, structured SQL generation, and a guardrail middleware that blocks all DDL and DML writes, enforces LIMIT and scan caps, runs every query in a read-only rollback transaction on a SELECT-only user, and logs every block. A back-translation step (SQL to question) and multi-query agreement produce a hallucination-detection rate and a confidence score, measured against 50 golden NL/SQL pairs. The guide's own framing is that this proves you can ship an AI feature a compliance team would approve. It sits on the Backend Lane and in TypeScript because the substance is middleware design and the Postgres permissions model, the owner's strongest ground; the Attached Reading supplies the prompt-injection vocabulary the guardrail layer defends against.
