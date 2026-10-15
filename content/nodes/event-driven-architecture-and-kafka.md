---
title: Event-Driven Architecture and Kafka
type: resource
lane: backend
order: 3
status: pending
hours: 25
prerequisites: []
links:
  - label: Kafka 101 (Confluent Developer)
    url: https://developer.confluent.io/courses/apache-kafka/events/
  - label: Kafka Internal Architecture (Confluent Developer)
    url: https://developer.confluent.io/courses/architecture/get-started/
  - label: Designing Events and Event Streams (Confluent Developer)
    url: https://developer.confluent.io/courses/event-design/intro/
  - label: Event Sourcing and Event Storage (Confluent Developer)
    url: https://developer.confluent.io/courses/event-sourcing/
  - label: Amazon SQS Developer Guide
    url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
  - label: Amazon EventBridge User Guide
    url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html
---

Confluent Developer's free courses, scoped to the log abstraction a working NestJS engineer has not yet operated: Kafka 101 (topics, partitions, producers, consumers, consumer groups), Kafka Internal Architecture (replication, offsets, rebalancing, delivery guarantees from at-most-once to exactly-once), Designing Events and Event Streams (event shape, keys, schema evolution) and Event Sourcing and Event Storage. Skip the producer and consumer hello-world and every Java or ksqlDB walkthrough; the concepts are language-agnostic. The two AWS guides cover the managed equivalents Argentine postings name most often (SQS with its visibility timeout and dead-letter queues, SNS fan-out, EventBridge routing), mapped against Kafka rather than learned as separate products. The owner already has idempotency engineering on Flota (a unique idempotency key plus a Redis `SET NX EX` hash for equivalent events) and CQRS over RPC in a previous project; what is new is offsets, partitioning strategy and replay. It is the most frequent screen-out in the 2026-10-15 upskill report (30 postings), and a Prerequisite of the gym-routines-app production Project, whose async worker puts it into practice.
