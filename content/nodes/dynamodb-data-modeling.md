---
title: DynamoDB Data Modeling
type: resource
lane: backend
order: 19
status: pending
hours: 12
prerequisites: []
links:
  - label: The DynamoDB Guide (Alex DeBrie)
    url: https://www.dynamodbguide.com/
  - label: The What, Why, and When of Single-Table Design (Alex DeBrie)
    url: https://www.alexdebrie.com/posts/dynamodb-single-table/
---

Alex DeBrie's free DynamoDB Guide plus his essay on single-table design. The hard part is unlearning: strong relational instincts (row-level security, `ON CONFLICT DO UPDATE`, normalized schemas) are exactly what produce bad DynamoDB schemas. Read for the access-pattern-first inversion: enumerate queries before designing keys, then partition and sort keys, then GSIs and sparse indexes, then one-to-many and many-to-many strategies. Capacity planning and operations are skipped. Finish by modelling one real entity set in AWS NoSQL Workbench, the Flota event store being the natural candidate. The paid DynamoDB Book is the deeper follow-up and is not part of this Node. Eleven postings in the 2026-10-15 upskill report name DynamoDB or NoSQL at modelling depth.
