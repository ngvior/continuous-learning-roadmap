---
title: Ship gym-routines-app to Production
type: project
lane: backend
order: 6
status: pending
hours: 30
prerequisites:
  - event-driven-architecture-and-kafka
  - terraform-on-aws
  - kubernetes-for-ecs-engineers
links: []
language: typescript
repo: https://github.com/ngvior/gym-routines-app
phases:
  - Cluster and managed PostgreSQL provisioned with Terraform
  - Kubernetes manifests with probes, graceful shutdown and a migrations Job
  - Broker-backed async worker
  - OpenTelemetry traces, metrics and logs in Grafana, with one SLO and one alert
  - k6 load test with before and after numbers
  - Rollback drill and write-up
attached:
  - title: OpenTelemetry JavaScript getting started (opentelemetry.io)
    url: https://opentelemetry.io/docs/languages/js/
    hours: 1
  - title: grafana/otel-lgtm, local OpenTelemetry backend (GitHub)
    url: https://github.com/grafana/docker-otel-lgtm
    hours: 0.5
  - title: "Google SRE Workbook: Implementing SLOs"
    url: https://sre.google/workbook/implementing-slos/
    hours: 1
  - title: Grafana k6 documentation
    url: https://grafana.com/docs/k6/latest/
    hours: 1
---

The production spine of the Roadmap: take the existing gym-routines-app (NestJS 11, TypeORM, PostgreSQL, nine domain modules, JWT auth, Docker Compose, Swagger) from a local Compose stack to a real deployment on Kubernetes, provisioned with Terraform, with managed PostgreSQL and a real domain. Then do what makes it production rather than a demo: health and readiness probes, graceful shutdown, migrations as a separate Job, secrets outside the image, one synchronous call replaced by a broker-backed worker, OpenTelemetry instrumentation shipped to Grafana with a modest SLO and one alert on a user-visible symptom, a k6 load test that finds the breaking point and records the number before and after one bottleneck fix, and a rollback path exercised once. "Nothing reached production" is the structural gap behind several screen-outs recorded in the 2026-10-15 upskill report (Naranja X, Fever, WiTi, Xepelin and others); no certificate closes it, a live URL with a dashboard behind it does. The deliverable is the interview answer: what broke, what the dashboard showed, what the fix was. The Event-Driven, Terraform and Kubernetes Nodes are its Prerequisites; the Attached Reading covers the OpenTelemetry, SLO and k6 parts, which are too short to be Nodes of their own.
