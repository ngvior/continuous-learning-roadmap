# Resource inventory: microsoft/ai-for-beginners

Research note for issue #3 (part of #1). Inventories the Resource
[microsoft/ai-for-beginners](https://github.com/microsoft/ai-for-beginners) lesson by
lesson and marks which lessons are foundational for the six BASWE AI Projects (RAG, agents,
LLMOps, evals, fine-tuning, guardrails) and which are optional on an AI-engineering (not
ML-research) Lane. Written for a backend engineer who reads Python, is a beginner in linear
algebra and has no statistics background.

Snapshot: repository `main` at commit `392d0df1b2647cbee104942390551f1ed9e072c8`
(2026-09-04), accessed 2026-09-10.

## Summary

- The Resource is a **12-week, 24-lesson** course (plus lesson 0 setup and one "Extras" lesson,
  25 numbered lessons in total). It teaches symbolic AI, neural networks from scratch, computer
  vision, NLP up to Transformers/BERT/GPT-2-era LLMs, and a handful of "other" techniques
  (genetic algorithms, deep RL, multi-agent systems) plus a short Responsible AI lesson.
- It explicitly does **not** cover: classic ML, AI in business, Azure Cognitive Services, cloud
  ML frameworks, conversational AI/chatbots, or the deep mathematics of deep learning
  (README, "What we will not cover").
- Every lesson has a README, pre/post quiz, and most have executable Jupyter notebooks in
  PyTorch and/or TensorFlow/Keras; 12 lessons have a lab (assignment notebook). You are told to
  go through **one** framework's notebook, not both (README, "Each lesson contains").
- **The repository states no prerequisites** (no Python level, no math level) and gives **no
  per-lesson time estimates**. Prerequisites and hours below are inferred; the basis is stated.
- **Bottom line for the Roadmap**: 15 of 25 lessons matter for the six BASWE Projects. The
  core path is lessons 0, 2, 3, 4, 5, 8 (theory only), 13, 14, 15, 17 (sampling section), 18,
  19, 20, 24, roughly **45-65 hours**. The full course is roughly **95-140 hours**. The
  computer-vision block (6-12) and genetic algorithms / deep RL (21-22) are optional for this
  Lane.
- **Gap warning**: this Resource stops at GPT-2/GPT-3-era models. It has nothing on
  RAG pipelines, LLM agents (LangGraph), gateways/observability, LLM-as-judge, or prompt
  injection. It builds the mental model the Projects assume; it does not teach the Projects'
  stacks. The README itself points to sibling courses (Generative AI for Beginners, AI Agents for
  Beginners, MCP for Beginners) for that layer.

## How to read the tables

- **Topic area**: symbolic AI / neural nets / CV / NLP / other / ethics, as in the README section
  headings.
- **Est. hours**: my estimate, not the repository's. Basis: README word count at roughly
  150 words/min for technical prose with figures; one framework notebook at roughly 5-8 minutes
  per code cell (notebooks carry most of the theory, so markdown cells count too); labs sized
  from the lab README scope and whether they require dataset downloads or GPU training; quizzes
  at about 10 minutes. Ranges are "read + run one notebook" to "read + notebook + lab". Add
  20-30% when a lesson hits a math gap (see the Prerequisites column).
- **Python**: what the notebooks actually require of a reader who already reads Python.
- **Math**: what the lesson text and notebook lean on. "Stated" means the lesson names the
  concept; the repository never says "you must know X first".
- **BASWE**: which of the six Projects the lesson is foundational for. P1 RAG, P2 Agents,
  P3 LLMOps, P4 Evals, P5 Fine-tuning, P6 Guardrails (Automated Red-Team Harness). See the
  mapping rationale after the tables.
- **Lane verdict**: **Core** (do it), **Theory only** (read README + skim one notebook, skip
  lab), **Optional** (skip on the AI-engineering Lane; keep for a later CV or ML Lane).

## Lesson inventory

### Section I-III: Setup, Introduction, Symbolic AI, Neural Networks

| # | Lesson | Topic area | Est. hours | Python | Math | Notebooks / labs | BASWE | Lane verdict |
|---|---|---|---|---|---|---|---|---|
| 0 | Course Setup | setup | 1-2 | conda env from `.devcontainer/environment.yml`, VS Code or Jupyter, optional Codespaces/Binder | none | `setup.md`, `how-to-run.md`, `for-teachers.md` | all | Core |
| 01 | Introduction and History of AI | intro | 1.5-2.5 | none | none | No notebook. `assignment.md`: short paper on AI in a game (skippable) | none directly; frames weak vs strong AI, top-down (symbolic) vs bottom-up (neural) | Theory only (1 h skim) |
| 02 | Knowledge Representation and Expert Systems | symbolic AI | 4-6 | plain Python; a tiny rule engine written in the notebook; RDF/OWL libs (`rdflib`-style) in the ontology notebook | none (propositional logic, if-then rules) | `Animals.ipynb` (9 code cells, forward/backward inference expert system), `FamilyOntology.ipynb` (14, GEDCOM -> OWL ontology, reasoning), `MSConceptGraph.ipynb` (8, `is-a` concept graph to group news). `assignment.md`: build an ontology | **P1 RAG** (knowledge graphs, triplets, ontology design, SPARQL/WikiData); P2 Agents (forward/backward chaining as the classic planning/reasoning loop) | Core |
| 03 | Perceptron | neural nets | 4-6 (+2 math ramp) | numpy: arrays, `np.dot`, vectorized loops over MNIST | **first math wall**: vectors, dot product, "gradient descent" and "gradient of E" are stated and used; the notebook draws decision boundaries | `Perceptron.ipynb` (26 code cells). Lab `PerceptronMultiClass.ipynb` (7): one-vs-all MNIST, confusion matrix, weights-as-matrix trick | **P5 Fine-tuning** (what a weight vector, loss and gradient step are); P4 Evals (train vs test accuracy, confusion matrix in the lab) | Core |
| 04 | Multi-Layered Perceptron and Creating our own Framework | neural nets | 6-10 | numpy heavy: matrix multiply, `.T`, broadcasting, hand-written `forward`/`backward` classes | **hardest math in the course**: loss functions (0-1, logistic, MSE), softmax, gradient descent, minibatch SGD, chain rule, backpropagation, computational graph. Stated and derived in the notebook | `OwnFramework.ipynb` (27 code / 26 md). Lab `MyFW_MNIST.ipynb` (6): 1-, 2-, 3-layer MNIST with the hand-built framework | **P5 Fine-tuning** (backprop, loss, learning rate, minibatch: the vocabulary of every training run and W&B chart) | Core; read the derivation, do not try to re-derive it |
| 05 | Intro to Frameworks (PyTorch/TensorFlow) and Overfitting | neural nets | 5-7 | first PyTorch (`IntroPyTorch.ipynb`, 43 code cells) or Keras/TF; autograd, `nn.Module`, training loop, GPU tensors | tensors as multi-dim arrays; **bias-variance tradeoff** stated (the only classical statistics concept the course leans on, explained in words) | `IntroPyTorch.ipynb` (43), `IntroKerasTF.ipynb` (29), `IntroKeras.ipynb` (14). Lab `LabFrameworks.ipynb` (10): Iris + MNIST with dense nets | **P5 Fine-tuning** (PyTorch training loop is the substrate of the distillation pipeline); **P4 Evals** (overfitting, train/validation/test split, why you hold out a set) | Core; pick PyTorch (BASWE P5 stack is PyTorch) |

### Section IV: Computer Vision

| # | Lesson | Topic area | Est. hours | Python | Math | Notebooks / labs | BASWE | Lane verdict |
|---|---|---|---|---|---|---|---|---|
| 06 | Intro to Computer Vision. OpenCV | CV | 3-5 | `cv2`, image arrays, BGR/RGB, affine transforms, optical flow | 2D/3D arrays as images | `OpenCV.ipynb` (17). Lab `MovementDetection.ipynb` (4): detect palm movement via optical flow | none | Optional |
| 07 | Convolutional Neural Networks and CNN Architectures | CV / neural nets | 5-8 (2 for README only) | PyTorch/TF conv layers; helper `pytorchcv.py`/`tfcv.py` | convolution as a filter over a matrix; pooling; parameter counting | `ConvNetsPyTorch.ipynb` (11) / `ConvNetsTF.ipynb` (15); `CNN_Architectures.md` (VGG, ResNet, etc.). Lab `PetFaces.ipynb` (14): 37-breed classifier, Oxford-IIIT download (~800 MB), GPU-preferable | P5 (only as background: what "architecture" and "layers" mean before reading model cards) | Theory only (README + `CNN_Architectures.md`); skip lab |
| 08 | Pre-trained Networks and Transfer Learning; Training Tricks | CV / neural nets | 5-8 (3 for theory) | load torchvision/Keras pretrained models, freeze layers, replace the head | gradient descent on the *input* (adversarial cat); LR schedules, dropout, batch norm, augmentation described in `TrainingTricks.md` | `TransferLearningPyTorch.ipynb` (20) / `TransferLearningTF.ipynb` (22), `AdversarialCat_TF.ipynb` (17), `Dropout.ipynb` (3), `TrainingTricks.md`. Lab `OxfordPets.ipynb` (18) | **P5 Fine-tuning** (transfer learning = fine-tuning in the pre-LLM vocabulary; freezing, head replacement, training tricks); **P6 Guardrails** (adversarial examples section is the conceptual ancestor of adversarial inputs) | Core (theory + one notebook); skip lab |
| 09 | Autoencoders and VAEs | CV / generative | 3-5 | PyTorch/TF encoder-decoder | latent vectors, MSE reconstruction loss, **probability distributions, KL divergence** (VAE) | `AutoEncodersPyTorch.ipynb` (43) / `AutoencodersTF.ipynb` (24). No separate lab; "task" at end of the TF notebook | none directly (latent-space intuition is mildly useful for embeddings) | Optional |
| 10 | GANs and Artistic Style Transfer | CV / generative | 4-6 | PyTorch/TF two-network training loop | minimax training intuition; Gram matrices for style loss | `GANPyTorch.ipynb` (22) / `GANTF.ipynb` (12), `StyleTransfer.ipynb` (13), `StyleTransfer_Keras.ipynb` (20). No lab | none | Optional |
| 11 | Object Detection | CV | 3-4 (lab 8-15) | TF notebook; lab expects RetinaNet via Keras/torchvision or Azure Custom Vision, PASCAL VOC XML parsing | **metrics**: IoU, precision/recall, Average Precision, mAP (a good gentle metrics lesson) | `ObjectDetection.ipynb` (12). Lab (README only, no starter notebook): Hollywood Heads dataset, train a head detector | **P4 Evals** (only the "Object Detection Metrics" section: how a metric is defined, thresholded and averaged) | Optional; read the metrics section (30 min) |
| 12 | Semantic Segmentation. U-Net | CV | 3-5 | PyTorch/TF U-Net | pixel-wise cross-entropy, one-hot encoding | `SemanticSegmentationPytorch.ipynb` (15) / `SemanticSegmentationTF.ipynb` (16). Lab `BodySegmentation.ipynb` (4): Kaggle MADS dataset | none | Optional |

### Section V: Natural Language Processing

The section README warns that some NLP examples "train quite large models" and advises a
GPU-enabled machine; it also gives `requirements-pytorch.txt` / `requirements-tf.txt`.

| # | Lesson | Topic area | Est. hours | Python | Math | Notebooks / labs | BASWE | Lane verdict |
|---|---|---|---|---|---|---|---|---|
| 13 | Text Representation. BoW / TF-IDF | NLP | 3-4 | torchtext / TF text APIs, tokenization, vocab building, AG News classification | sparse vectors, n-grams, TF-IDF formula (counting and a log, no calculus) | `TextRepresentationPyTorch.ipynb` (16) / `TextRepresentationTF.ipynb` (15). `assignment.md`: rerun on your own dataset | **P1 RAG** (BM25/TF-IDF is the sparse half of hybrid retrieval; tokenization, vocabulary) | Core |
| 14 | Semantic Word Embeddings. Word2Vec and GloVe | NLP | 3-4 | `nn.Embedding`, gensim-style pretrained Word2Vec/GloVe lookup, vector arithmetic | dense vectors, cosine/dot-product similarity, "king - man + woman" | `EmbeddingsPyTorch.ipynb` (18) / `EmbeddingsTF.ipynb` (16). `assignment.md`: own dataset | **P1 RAG** (embedding similarity is the core of vector retrieval and of BASWE's entity-resolution step); P5 (embedding layer as trainable parameters) | Core |
| 15 | Language Modeling. Training your own embeddings | NLP | 3-5 | CBoW training loop | self-supervised objective (predict a word from context) | `CBoW-PyTorch.ipynb` (17) / `CBoW-TF.ipynb` (13). Lab (README only): train Skip-Gram on a Gutenberg book; optional PCA plot | **P1 RAG** (what an embedding model *learned* and therefore where it fails: the BASWE P1 pitch); P5 (self-supervised pretraining vs supervised fine-tuning distinction) | Core |
| 16 | Recurrent Neural Networks | NLP | 2.5-4 | `nn.LSTM`, packed sequences | weight matrices W and H, vanishing gradients (stated, not derived) | `RNNPyTorch.ipynb` (8) / `RNNTF.ipynb` (9). `assignment.md`: own dataset | none directly; historical context for "why attention" | Theory only (README, 45 min) |
| 17 | Generative Recurrent Networks | NLP | 3-5 | char-level RNN generator | **probability distribution over next token, sampling, temperature** | `GenerativePyTorch.ipynb` (8) / `GenerativeTF.ipynb` (11). Lab (README only): word-level generator on a book | **P4 Evals, P5 Fine-tuning, P3 LLMOps** (the "Soft text generation and temperature" section explains the `temperature` parameter you will tune and log in every Project) | Theory only: read the temperature section; skip lab |
| 18 | Transformers. BERT | NLP | 4-6 | Hugging Face `transformers`: `AutoTokenizer`, `BertForSequenceClassification.from_pretrained(..., num_labels=4)`, fine-tune the head | attention as weighted sums (softmax over scores), positional embeddings, multi-head self-attention (described, not derived) | `TransformersPyTorch.ipynb` (7, BERT fine-tune on AG News) / `TransformersTF.ipynb` (21, builds transformer layers). `assignment.md`: run Hugging Face example scripts | **P5 Fine-tuning** (first real Hugging Face fine-tune in the course), **P1 RAG** (BERT-family encoders are what embedding models are), P2/P3/P4/P6 (the model you operate/evaluate/attack is this architecture) | Core; do the PyTorch notebook |
| 19 | Named Entity Recognition | NLP | 3 (+6-10 lab) | token classification; lab: BIO encoding, `BertForTokenClassification` on `microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract` | token-level classification, no new math | `NER-TF.ipynb` (12). Lab (README only): BC5CDR medical NER with PubMedBERT via Hugging Face | **P5 Fine-tuning** (the lab is the closest analog in the course to BASWE P5 Phase 1 "structured extraction from one document type"); **P1 RAG** (entity extraction feeds the knowledge graph; BASWE does it with an LLM, but this is the classic form) | Core (README + notebook); lab recommended as P5 warm-up |
| 20 | Large Language Models, Prompt Programming and Few-Shot Tasks | NLP / LLM | 2-3 | Hugging Face `pipeline('text-generation', model=...)` with GPT-2 | **conditional probability** P(w_N given w_0..w_{N-1}), perplexity (links to Data Science for Beginners stats lesson for background) | `GPT-PyTorch.ipynb` (8). No lab | **all six**: zero/few-shot, prompt engineering, perplexity as an intrinsic metric (P4), GPT as a family of API-served models (P3) | Core; the only LLM lesson, and it is dated (GPT-2/3/4 table) |

### Sections VI-IX: Other techniques, Ethics, Extras

| # | Lesson | Topic area | Est. hours | Python | Math | Notebooks / labs | BASWE | Lane verdict |
|---|---|---|---|---|---|---|---|---|
| 21 | Genetic Algorithms | other | 2-4 | plain Python, numpy | none beyond fitness functions | `Genetic.ipynb` (16). `Diophantine.ipynb` (0 code cells, task statement only) | none | Optional |
| 22 | Deep Reinforcement Learning | other | 4-6 | OpenAI Gym / Gymnasium, policy network, policy gradients, actor-critic | expected cumulative reward, discounting, policy as a probability distribution | `CartPole-RL-PyTorch.ipynb` (15) / `CartPole-RL-TF.ipynb` (14); stray `notebook.ipynb` / `tmp.ipynb` (working files). Lab `MountainCar.ipynb` (4) | none directly (RLHF context only) | Optional |
| 23 | Multi-Agent Systems | other / agents | 2-3 (+3 assignment) | none; NetLogo (not Python) | none | No notebook. `assignment.md`: adapt a NetLogo library model (e.g. Virus) to a real situation, record a video demo | **P2 Agents** (conceptual only: reactive vs deliberative agents, BDI architecture, agent communication languages, negotiation protocols, shared ontology, capability discovery). Not LLM agents | Theory only (README, 1 h); skip NetLogo |
| 24 | AI Ethics and Responsible AI | ethics | 1-2 | none | precision/recall named as the reason models "can make mistakes" | No notebook. Links Microsoft Learn Responsible AI path and Responsible AI Toolbox (InterpretML, Fairlearn, Error Analysis, EconML, DiCE) | **P6 Guardrails** (Reliability and Safety, Privacy and Security, Transparency, Accountability: the rubric your red-team README should map to); **P4 Evals** (fairness/bias measurement) | Core (short) |
| 25 | Multi-Modal Networks, CLIP and VQGAN (Extras) | CV + NLP | 2-3 | `openai/clip` package, zero-shot classification and image search | contrastive loss on N image/text pairs (described) | `Clip.ipynb` (5). No lab | P1 RAG (only if multimodal retrieval becomes a stretch goal: CLIP gives joint image/text embeddings) | Optional (short and cheap) |

### Hours totals

| Path | Lessons | Est. hours |
|---|---|---|
| Full course, one framework, all labs | 0-25 | 95-140 |
| AI-engineering core (this Lane) | 0, 1 skim, 2, 3, 4, 5, 7 theory, 8 theory+notebook, 11 metrics section, 13, 14, 15, 16 skim, 17 section, 18, 19 (+lab), 20, 23 skim, 24 | 45-65 (55-75 with the lesson-19 lab) |
| Optional block, kept for a later CV/ML Lane | 6, 9, 10, 11 lab, 12, 21, 22, 25 | 35-55 |

Basis for totals: sum of the per-lesson ranges above. The 12-week framing in the README
implies about 2 lessons per week; at the estimates above that is 8-12 hours per week, which is
consistent with a part-time course.

## Prerequisites: what the Resource assumes vs what the owner has

The repository states no prerequisites anywhere (README, `setup.md`, `how-to-run.md`). What
the content actually assumes:

**Python.** Reading Python is enough for lessons 0-2, 20, 23-24. From lesson 3 the notebooks
assume numpy fluency (array shapes, `np.dot`, broadcasting, vectorized ops rather than loops);
from lesson 5 they assume you can follow a PyTorch (or Keras) training loop; lessons 18-20 use
Hugging Face `transformers`. For a backend engineer who reads Python the ramp is numpy idioms,
not syntax. Budget 2-3 hours of numpy practice around lesson 3.

**Linear algebra (owner: beginner).** The course never teaches it, it just uses it. Concepts
that appear, in order of first use:

- lesson 3: vector, dot product, weight vector, gradient (as "direction of steepest change");
- lesson 4: matrix multiplication, transpose, bias vector, softmax, chain rule, partial
  derivatives, backpropagation. This is the wall. The notebook derives backprop for a 2-layer
  net; a beginner should read it for shape-level understanding (what multiplies what) and not
  aim to reproduce the derivation;
- lesson 7: convolution as sliding a small matrix over a big one;
- lesson 14: cosine similarity, vector arithmetic on embeddings;
- lesson 18: attention as softmax-weighted sums of vectors, i.e. matrix multiplications.

A short primer on vectors, dot products, matrix multiplication and "what a derivative of a
multi-variable function means" before lesson 3 (2-4 hours) removes most of the friction. That
primer is a candidate Resource Node placed before this one on the Roadmap. The README itself
says deep math is out of scope and points to Goodfellow, Bengio and Courville's *Deep Learning*
for anyone who wants it.

**Statistics / probability (owner: none).** Light. What appears:

- lesson 5: bias-variance tradeoff (explained in words, with a Wikipedia link);
- lesson 9: normal distribution, KL divergence (optional lesson);
- lesson 11: precision, recall, IoU, average precision (optional lesson, but the metrics
  section is worth reading for P4);
- lessons 17 and 20: probability distribution over the next token, sampling, temperature,
  conditional probability, perplexity. Lesson 20 explicitly links to the Data Science for
  Beginners "stats and probability" lesson as background;
- lesson 24: precision/recall as the reason models err.

Nothing requires hypothesis testing, distributions beyond "normal", or inferential statistics.
BASWE P4 (Cohen's kappa, ordinal scales, bias measurement) needs more statistics than this
Resource provides; that gap belongs to a separate Node, not to this one.

**Hardware.** The NLP section README recommends a GPU. The CV labs (PetFaces, OxfordPets,
Hollywood Heads) and BERT fine-tuning (lesson 18) are slow on CPU. Codespaces/Binder links are
provided in the README. Everything on the core path except lesson 18 is CPU-tolerable if you
reduce epochs.

## Mapping to the six BASWE Projects

Project definitions are taken from `ai-projects/BASWE_Build_These_Six_Projects.pdf` (stack and
phase descriptions). "Foundational" means the lesson supplies a concept the Project's build
guide takes for granted; none of these lessons teaches the Project's actual stack.

| Project (BASWE) | Stack per the guide | Foundational lessons | What the lessons give you | What they do not |
|---|---|---|---|---|
| P1 Knowledge Graph RAG for Enterprise Data | Python, Neo4j, LangChain, Claude API, pgvector, FastAPI | **2**, **13**, **14**, **15**, 18, 19, 20 | Ontologies, triplets, entity/relationship types, SPARQL over WikiData (2); sparse retrieval and tokenization (13); dense embeddings and similarity thresholds, the mechanism behind BASWE's entity resolution (14-15); what an encoder model is (18); entity extraction as token classification (19); prompting (20) | Chunking strategies, vector databases, LangChain, graph databases, hybrid ranking, RAG evaluation |
| P2 Multi-Agent Research Assistant | Python, LangGraph, Claude API, Tavily, Redis, FastAPI | **20**, **23**, 2 | Prompting and few-shot (20); planner/worker decomposition, BDI beliefs-desires-intentions, agent communication, negotiation, shared ontology, capability discovery, "reviewer sends work back once" as a protocol (23); forward/backward chaining as the classic reasoning loop (2) | Tool calling, structured outputs, LangGraph state graphs, durable state, budgets, tracing. The course's agents are NetLogo turtles, not LLMs |
| P3 Self-Healing LLM Gateway | Python, LiteLLM, FastAPI, Redis, Prometheus, Grafana | **20**, 17, 5 | GPT as a family of API-served models (20); temperature and sampling as request parameters (17); what "a model" is so gateway metadata (tenant, feature, request id, tokens) means something (5) | Everything operational: routing, failover, cost attribution, health checks, dashboards. This Project is where the owner's backend background does the work, not this Resource |
| P4 LLM-as-Judge with Human Calibration | Python, DeepEval, Claude API, Postgres, Streamlit | **5**, **20**, 11 (metrics section), 3 lab, 24 | Overfitting, held-out sets, bias-variance (5); perplexity as an intrinsic metric and prompting (20); how a metric is defined, thresholded and averaged, precision/recall (11); confusion matrix (3 lab); fairness and bias as evaluation targets (24) | LLM-as-judge design, inter-rater agreement (kappa), ordinal rubrics, position/length/self-preference bias, DeepEval, CI wiring |
| P5 Model Distillation Pipeline | Python, Hugging Face, PyTorch, Claude API, W&B, vLLM | **3**, **4**, **5**, **8**, **18**, **19 (lab)**, 14, 15, 17, 20 | Loss, gradient descent, learning rate, minibatch, backprop (3-4); the PyTorch training loop and overfitting (5); transfer learning, freezing, head replacement, LR schedules, dropout, augmentation (8); Hugging Face `from_pretrained` fine-tune (18); token-classification fine-tune of a domain BERT with BIO labels (19 lab); embedding layers, self-supervised pretraining vs fine-tuning (14-15); temperature for synthetic-data generation (17); zero/few-shot teacher behaviour (20) | Instruction tuning, LoRA/PEFT, distillation loss, vLLM serving, W&B, break-even economics. The course fine-tunes encoders (BERT), never decoders |
| P6 Automated Red-Team Harness | Python, garak, PyRIT, Claude API, FastAPI, Postgres | **24**, **8** (adversarial section), 20 | Responsible AI principles as the taxonomy your findings map to: Reliability and Safety, Privacy and Security, Transparency, Accountability (24); adversarial examples, "make the network think a dog is a cat" via gradient steps on the input (8, `AdversarialCat_TF.ipynb`); prompting as an attack surface (20) | Prompt injection, jailbreaks, indirect injection through retrieved documents, OWASP LLM Top 10, garak, PyRIT. The course predates LLM prompt injection entirely |

Bold = do the lesson fully; regular = the named section or notebook is enough.

## Suggested Roadmap treatment

- Register the Resource as one Node in the AI Engineering Lane, scoped to the core path
  (lessons 0-5, 7-8 theory, 13-15, 17 section, 18-20, 23 skim, 24), and mark the optional
  block as out of scope for the Node rather than splitting the course into 25 Nodes.
- Place a short linear-algebra primer Node before it (owner is a beginner; lesson 4 is the wall).
- The Resource is a prerequisite for P5 Fine-tuning and a strong prerequisite for P1 RAG. For
  P2, P3, P4, P6 it is background only; those Projects need a newer LLM-focused Resource in
  between (the README names Microsoft's Generative AI for Beginners, AI Agents for Beginners
  and MCP for Beginners as siblings; they were not inventoried here).
- Sequence relative to the Projects: this Node, then a generative-AI Node, then P1 RAG. BASWE
  says to build P1 first and to evaluate it with P4 and attack it with P6, so P1 is the gate.

## Quirks found in the repository (as of the snapshot)

- README says "24 lessons" but the content table numbers 0-25 (lesson 25 is under "Extras",
  section numeral IX; there is no VIII).
- README row for lesson 08 links its TensorFlow notebook to
  `lessons/3-NeuralNetworks/05-Frameworks/IntroKerasTF.ipynb`; the actual file
  `lessons/4-ComputerVision/08-TransferLearning/TransferLearningTF.ipynb` exists and is
  linked correctly from the lesson README.
- Lesson 2 README links `FamilyOntology.ipynb` to a fork (`Ezana135/AI-For-Beginners`); the
  notebook exists in the main repository.
- Lesson 9 README has two post-lecture quiz links (quiz 18 and quiz 16).
- Lesson 24 quiz links point to an older host (`white-water-09ec41f0f.azurestaticapps.net`)
  while every other lesson uses `ff-quizzes.netlify.app`. `setup.md` says 50 quizzes of three
  questions each.
- Lessons 11, 15, 17, 19 labs are README-only (no starter notebook). Lesson 22 ships stray
  `notebook.ipynb` and `tmp.ipynb` working files.
- Lesson 20's model table (GPT-2 / GPT-3 / GPT-4) and the Hugging Face GPT-2 demo date the
  LLM coverage; nothing after GPT-4 is mentioned.
- Cloning with translations is large; the README gives a sparse-checkout recipe that excludes
  `translations/` and `translated_images/`.

## Sources

All accessed 2026-09-10. Repository state: `main` at
`392d0df1b2647cbee104942390551f1ed9e072c8` (committed 2026-09-04), per the GitHub commits API.

Primary (repository files, fetched raw):

- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/README.md (course framing, content table, "what we will not cover", "each lesson contains", quizzes note, sibling courses)
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/README.md (overview sketchnote only)
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/0-course-setup/setup.md (self-study flow, pedagogy, 50 quizzes, 12-week cycle)
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/0-course-setup/how-to-run.md (conda env, VS Code, Jupyter, Codespaces)
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/0-course-setup/for-teachers.md
- https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/3-NeuralNetworks/README.md, .../4-ComputerVision/README.md, .../5-NLP/README.md (section overviews; NLP GPU warning and requirements files)
- Lesson READMEs, one per lesson: https://raw.githubusercontent.com/microsoft/ai-for-beginners/main/lessons/{1-Intro, 2-Symbolic, 3-NeuralNetworks/03-Perceptron, 3-NeuralNetworks/04-OwnFramework, 3-NeuralNetworks/05-Frameworks, 4-ComputerVision/06-IntroCV, 4-ComputerVision/07-ConvNets, 4-ComputerVision/08-TransferLearning, 4-ComputerVision/09-Autoencoders, 4-ComputerVision/10-GANs, 4-ComputerVision/11-ObjectDetection, 4-ComputerVision/12-Segmentation, 5-NLP/13-TextRep, 5-NLP/14-Embeddings, 5-NLP/15-LanguageModeling, 5-NLP/16-RNN, 5-NLP/17-GenerativeNetworks, 5-NLP/18-Transformers, 5-NLP/19-NER, 5-NLP/20-LangModels, 6-Other/21-GeneticAlgorithms, 6-Other/22-DeepRL, 6-Other/23-MultiagentSystems, 7-Ethics, X-Extras/X1-MultiModal}/README.md
- Lab READMEs: .../lessons/{3-NeuralNetworks/03-Perceptron, 3-NeuralNetworks/04-OwnFramework, 3-NeuralNetworks/05-Frameworks, 4-ComputerVision/06-IntroCV, 4-ComputerVision/07-ConvNets, 4-ComputerVision/08-TransferLearning, 4-ComputerVision/11-ObjectDetection, 4-ComputerVision/12-Segmentation, 5-NLP/15-LanguageModeling, 5-NLP/17-GenerativeNetworks, 5-NLP/19-NER, 6-Other/22-DeepRL}/lab/README.md
- Assignments: .../lessons/{1-Intro, 2-Symbolic, 5-NLP/13-TextRep, 5-NLP/14-Embeddings, 5-NLP/16-RNN, 5-NLP/18-Transformers, 6-Other/23-MultiagentSystems}/assignment.md
- All 53 notebooks under `lessons/**/*.ipynb`, fetched raw and inspected for code/markdown cell counts and library usage (`from_pretrained`, `pipeline`, `transformers`, `openai`): file list from https://api.github.com/repos/microsoft/ai-for-beginners/git/trees/main?recursive=1
- https://api.github.com/repos/microsoft/ai-for-beginners/commits?per_page=1 (snapshot commit and date)

Local:

- `ai-projects/BASWE_Build_These_Six_Projects.pdf` (Project names, stacks, phases, build order; text extracted with `pdftotext`)
- `CONTEXT.md` (glossary: Roadmap, Lane, Node, Resource, Project)

Derived, not sourced: all hour estimates, all prerequisite levels, and the Core / Theory only /
Optional verdicts are this note's inference from the sources above, using the basis stated in
"How to read the tables".
