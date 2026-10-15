---
title: Python Production Backend Patterns
type: resource
lane: backend
order: 9
status: pending
hours: 15
prerequisites: []
links:
  - label: asyncio documentation (Python)
    url: https://docs.python.org/3/library/asyncio.html
  - label: SQLAlchemy 2.0 Unified Tutorial
    url: https://docs.sqlalchemy.org/en/20/tutorial/index.html
  - label: "SQLAlchemy 2 in Practice, chapter 7: Asynchronous SQLAlchemy (Miguel Grinberg)"
    url: https://blog.miguelgrinberg.com/post/sqlalchemy-2-in-practice---chapter-7-asynchronous-sqlalchemy
  - label: Alembic tutorial
    url: https://alembic.sqlalchemy.org/en/latest/tutorial.html
  - label: FastAPI dependencies tutorial
    url: https://fastapi.tiangolo.com/tutorial/dependencies/
  - label: pytest getting started
    url: https://docs.pytest.org/en/stable/getting-started.html
---

Official documentation, read in order, for the production service patterns that separate "knows Python" from "runs a Python backend": `asyncio` and its event loop (which differs from Node's model), the SQLAlchemy 2.0 Unified Tutorial followed by Miguel Grinberg's chapter on `AsyncSession`, Alembic migrations, FastAPI dependency injection, and pytest. Syntax, pandas and data structures are out of scope; the ORT tecnicatura already supplies them. The NestJS mapping is close to one-to-one: a `class-validator` DTO is a Pydantic v2 model, a provider is a FastAPI dependency, a TypeORM migration is an Alembic one. Python as a production backend language is the top hard gap in the 2026-10-15 upskill report (43 postings). It is a Prerequisite of the P6 RAG Pipeline, the first Python Project, so the service patterns are in hand before the AI Engineering Projects are built on them.
