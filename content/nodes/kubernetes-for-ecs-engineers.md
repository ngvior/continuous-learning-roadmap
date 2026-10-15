---
title: Kubernetes for ECS Engineers
type: resource
lane: backend
order: 5
status: pending
hours: 25
prerequisites: []
links:
  - label: Kubernetes Basics tutorial (kubernetes.io)
    url: https://kubernetes.io/docs/tutorials/kubernetes-basics/
  - label: Kubernetes Crash Course labs (KodeKloud, free)
    url: https://kodekloud.com/courses/labs-kubernetes-crash-course/
  - label: Killercoda playgrounds
    url: https://killercoda.com/playgrounds
---

The official Kubernetes Basics tutorial plus free browser-based labs (KodeKloud's Kubernetes Crash Course labs and Killercoda playgrounds), so no local cluster is needed to practise. Docker, Docker Compose and ECS Fargate are already on the profile, so the containers-and-images half of any course is skipped. The delta is the control plane and the networking model, in this order: Pods and the scheduler, Deployments and ReplicaSets, Services and Ingress, ConfigMaps and Secrets, resource requests and limits, then probes and Jobs. The mapping that makes it fast: an ECS task definition is roughly a Pod spec, an ECS service a Deployment, an ALB target group a Service plus Ingress. Get fluent with `kubectl` and hand-written manifests before touching Helm; the CKAD certificate is optional, the labs are not. Twenty-seven postings in the 2026-10-15 upskill report name Kubernetes and several mark it mandatory. It is a Prerequisite of the gym-routines-app production Project, which runs on the cluster.
