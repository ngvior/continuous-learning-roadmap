---
title: P10 Fine-Tuning Pipeline with LoRA
type: project
lane: ai-engineering
order: 21
status: pending
hours: 40
prerequisites:
  - p13-eval-dataset-generator
  - brunton-singular-value-decomposition
  - karpathy-neural-networks-zero-to-hero
  - brunton-optimization-bootcamp
links: []
language: python
phases:
  - Task selection, dataset and handcrafted benchmark
  - LoRA training with experiment tracking and sweeps
  - Base versus fine-tuned evaluation and forgetting check
  - Adapter export, serving and A/B endpoint
  - One-command reproducible pipeline and experiment report
  - Demo and headline
attached:
  - title: "Karpathy: Let's reproduce GPT-2 (Zero to Hero lecture 10)"
    url: https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
    hours: 4
---

An end-to-end, reproducible LoRA fine-tune of an open 7B to 8B model on a narrow, measurable task: 500 to 2,000 instruction-format examples with a leak-free split, LoRA on the attention layers (QLoRA on a small GPU) with Weights and Biases tracking, early stopping and sweeps over rank, learning rate and epochs, then a head-to-head against the base model with an LLM-judge blind comparison and a catastrophic-forgetting check, and finally an adapter served through vLLM or Ollama behind an A/B endpoint. The deliverable is a number and a tradeoff ("improved from X% to Y% while keeping Z% of general capability", and when prompting or RAG would have won), not a training-loss curve. It is Python-only (PEFT, TRL, vLLM) and needs a rented GPU, the one hard prerequisite outside the owner's stack. The P13 Eval Dataset Generator measures the result, and the SVD, Karpathy and Optimization Nodes supply the low-rank, training-loop and gradient-descent understanding the sweeps depend on; Karpathy's GPT-2 reproduction is attached here because the rented GPU is already in hand.
