---
title: Terraform on AWS
type: resource
lane: backend
order: 4
status: pending
hours: 15
prerequisites: []
links:
  - label: Get Started with Terraform on AWS (HashiCorp)
    url: https://developer.hashicorp.com/terraform/tutorials/aws-get-started
  - label: Modules tutorials (HashiCorp)
    url: https://developer.hashicorp.com/terraform/tutorials/modules
  - label: S3 backend reference (HashiCorp)
    url: https://developer.hashicorp.com/terraform/language/backend/s3
---

HashiCorp's official tutorials, read by someone who has written seven AWS CDK stacks: the AWS Get Started track (write, plan, apply, change, destroy), the Modules track, and the S3 backend reference for remote state with locking. The plan/apply cycle, providers, dependency graphs and drift already transfer from CDK, so every "what is infrastructure as code" section is skipped. Only three things are new: HCL instead of TypeScript, state that is explicit and remote rather than hidden inside CloudFormation, and modules instead of constructs. `cdktf` is deliberately out of scope. Fourteen postings in the 2026-10-15 upskill report name Terraform, and "I write Terraform, my production depth is CDK" is a defensible answer. It is a Prerequisite of the gym-routines-app production Project, whose cluster and database it provisions.
