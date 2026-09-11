# Steve Brunton playlists mapped to the owner's gaps

Research for issue #4 (part of #1). Accessed 2026-09-10.

Owner profile assumed by the ticket: beginner in linear algebra, no statistics or
probability background, target is AI engineering (not physics, not control theory).

Method: every playlist on the "Steve Brunton" YouTube channel (`@Eigensteve`) was
enumerated with `yt-dlp 2026.07.04` (`--flat-playlist --print`). Video counts and
durations below come from that output, not from secondary write-ups. Durations are
rounded to the nearest 0.1 h. Where a playlist entry is a private video, yt-dlp
returns `NA`; those entries are counted separately and excluded from the hours.

## 1. Intro to Data Science playlist

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNQV7wi9r7Kut8liLFMWQOXn
- Channel: Steve Brunton. Playlist last modified 2022-12-23 (yt-dlp `modified_date`).
- 20 videos, 9,660 s = **2 h 41 min**. All public.
- Uploaded 2019-06-06 (videos 1-16) and 2019-06-13 (videos 17-20).
- Videos 17-20 (Data Visualization) are presented by Bing Brunton; their descriptions
  point to bingbrunton.com rather than eigensteve.com.
- Playlist description: "This lecture series will cover several introductory concepts
  in data science and machine learning." Video descriptions link to databookuw.com,
  but no video ties itself to a specific book chapter (unlike the SVD/Fourier/Sparsity
  playlists below).

| # | Title | Length | Topic |
|---|-------|--------|-------|
| 1 | Intro to Data Science: Overview | 6:12 | What data science is; series goals |
| 2 | Intro to Data Science: Historical Context | 8:07 | History of data-driven science |
| 3 | Intro to Data Science: What is Data Science? | 8:15 | Definitions, scope |
| 4 | Intro to Data Science: Answering Questions with Data | 6:46 | Framing questions as data problems |
| 5 | Intro to Data Science: The Nature of Data | 12:27 | Data types, structure, quality |
| 6 | Machine Learning Overview | 7:59 | ML as "modeling with data" |
| 7 | Machine Learning Goals | 7:45 | Prediction vs understanding |
| 8 | Machine Learning and Cross-Validation | 7:40 | Train/test split, overfitting |
| 9 | Types of Machine Learning 1 | 6:50 | Supervised / unsupervised |
| 10 | Types of Machine Learning 2 | 6:49 | Semi-supervised, reinforcement |
| 11 | Artificial Intelligence | 6:33 | AI vs ML framing |
| 12 | Neural Network Overview | 7:16 | Perceptron, layers |
| 13 | Neural Network Architectures & Deep Learning | 9:09 | CNN, RNN, autoencoders (survey) |
| 14 | Neural Networks and Deep Learning | 7:01 | Why deep learning works now |
| 15 | Neural Networks: Caveats | 8:18 | Data hunger, interpretability, generalisation |
| 16 | Digital Twins | 8:07 | Models coupled to physical assets |
| 17 | Data Visualization: Overview | 4:56 | Visualization as exploration/communication |
| 18 | Data Visualization: Types of Data | 15:13 | Encodings per data type |
| 19 | Data Visualization: Storytelling with Data | 5:52 | Narrative in plots |
| 20 | Data Visualization: Buyer Beware | 9:45 | Misleading visualizations |

Assessment: whiteboard-only, no code, no math beyond notation. Prerequisites: none.
It is a vocabulary and mental-model Resource, not a skills Resource. Good as the first
Node of a Data Science Lane; it does not by itself unlock any hands-on work.

## 2. Full inventory of Steve Brunton channel playlists

25 playlists as of 2026-09-10. Hours exclude private entries.

| Playlist | Videos | Hours | Fit for owner |
|----------|--------|-------|---------------|
| Intro to Data Science | 20 | 2.7 | **Recommended** |
| Probability Bootcamp | 44 | 10.6 | **Recommended** |
| Introduction to Statistics and Data Analysis | 35 | 9.9 | **Recommended** |
| Singular Value Decomposition [Data-Driven Science and Engineering] | 43 | 6.8 | **Recommended** |
| Optimization Bootcamp | 44 (29 public, 15 private) | 7.1 (public only) | **Recommended, in progress** |
| Reinforcement Learning | 8 | 3.2 | Optional |
| Sparsity and Compression [Data-Driven Science and Engineering] | 23 (22 public, 1 private) | 5.0 | Optional, cherry-pick |
| Fourier Analysis [Data-Driven Science and Engineering] | 39 | 7.5 | Optional, later |
| Introduction to Data Intensive Engineering | 21 | 4.1 | Skip (overlaps Intro to DS; Boeing case studies) |
| Physics Informed Machine Learning | 24 | 9.9 | Skip for now (physics; assumes ML + ODEs) |
| Dynamical Systems (with Machine Learning) | 24 | 7.1 | Skip (dynamics/control) |
| Data-Driven Control with Machine Learning | 37 | 7.8 | Skip (control) |
| Control Bootcamp | 39 | 8.7 | Skip (control) |
| Koopman Analysis | 13 | 4.0 | Skip (dynamics) |
| Machine Learning for Fluid Dynamics | 13 | 6.2 | Skip (physics) |
| Control Theory and COVID-19 | 9 | 2.3 | Skip (control) |
| Control for Societal Scale Challenges: Road Map 2030 | 8 | 1.5 | Skip (control policy) |
| Engineering Math: Differential Equations and Dynamical Systems | 49 | 22.1 | Skip (physics math) |
| Engineering Math: Vector Calculus and Partial Differential Equations | 23 | 9.3 | Skip (physics math) |
| Engineering Math: Crash Course in Complex Analysis | 13 | 6.5 | Skip (physics math) |
| Engineering Mathematics (UW ME564 and ME565) | 58 | 46.6 | Skip (physics math, older course) |
| Research Abstracts from Brunton Lab | 39 | 11.1 | Skip (research talks) |
| Finite-time Lyapunov exponents | 29 | 0.1 | Skip (fluid-flow visual clips, 14-27 s each) |
| Beginning Scientific Computing | 36 (30 public, 6 private) | 19.1 | Skip (not Brunton: uploaded by channel "AMATH 301"; Matlab-based numerics) |
| Data Science for Biologists | 80 | 16.4 | Skip (not Brunton: uploaded by channel "Data4Bio"; Matlab-based) |

Note on the last two rows: they are playlists curated on Steve Brunton's channel, but
the videos belong to other channels (verified via yt-dlp `channel` field on the first
video of each). They are Matlab-first and target scientific computing, so they do not
fit an AI-engineering Lane.

## 3. Recommended playlists, ranked

Ranking criterion: how directly the Resource closes one of the owner's three stated
gaps (linear algebra, probability/statistics, AI-engineering relevance) versus how much
physics/control baggage it carries.

### Rank 1. Intro to Data Science

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNQV7wi9r7Kut8liLFMWQOXn
- 20 videos, 2.7 h.
- Prerequisites: none.
- Unlocks: shared vocabulary (supervised/unsupervised, cross-validation, overfitting,
  architectures, digital twins) needed before the heavier Resources below. Also frames
  data visualization hygiene. Finish in one or two sittings.
- Roadmap placement: first Node of the Data Science Lane; prerequisite for every other
  Node in this list.

### Rank 2. Probability Bootcamp

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V
- 44 videos, 10.6 h. Series began 2024-10-04. All public.
- Content (from titles): counting and combinatorics, sample spaces, conditional
  probability, law of total probability, Bayes' theorem, independence, random
  variables, Bernoulli/binomial/normal/Poisson/geometric/exponential/gamma/chi-squared
  distributions, joint/marginal/conditional densities, expectation, variance,
  Markov and Chebyshev inequalities, law of large numbers, central limit theorem,
  moment generating functions, covariance and correlation, proof of the CLT.
- Prerequisites: high-school algebra; single-variable calculus (integrals) from
  video 13 onward for continuous distributions. No linear algebra required.
- Unlocks: the owner's "no probability" gap directly. Bayes' theorem, expectation,
  variance and the normal distribution are the minimum needed to read any ML loss
  function, softmax output, or evaluation metric with understanding. Also the stated
  prerequisite for Rank 3.
- The overview video (sQqniayndb4) describes a four-part plan: Introduction to
  Probability (5 h), Introduction to Statistics (5 h), Advanced Probability (5 h),
  Advanced Statistics (5 h). This playlist covers the probability parts; Rank 3 is the
  statistics part.

### Rank 3. Introduction to Statistics and Data Analysis

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNT14qn1c5qdL29A1UaHamjx
- 35 videos, 9.9 h. Series began 2025-08-11. All public.
- Content (from titles and the course-outline chapters in video 1): survey sampling,
  sample mean/variance, normal approximation, confidence intervals, hypothesis testing
  (type I/II errors, p-hacking, two-sided tests), parameter estimation (method of
  moments, bootstrapping, Monte Carlo), maximum likelihood estimation, MAP estimation,
  chi-squared and Student-t tests, Bayesian inference, conjugate priors, Gaussian
  mixture models, Bayesian linear regression (with Python examples).
- Prerequisites: Probability Bootcamp (Rank 2). Video 1 states "Statistics is the
  process of learning a probability distribution, given data". Light linear algebra
  appears in the Bayesian linear regression videos (33-35).
- Unlocks: MLE and MAP are literally what cross-entropy and regularized losses are;
  Bayesian updating underlies calibration and uncertainty estimation; hypothesis
  testing and bootstrapping are what you need to A/B-test a model change or judge an
  eval result. This is the most AI-engineering-relevant statistics Resource on the
  channel. Three videos include Python examples.

### Rank 4. Singular Value Decomposition [Data-Driven Science and Engineering]

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNSVjnsviglFoY2nXildDCcv
- 43 videos, 6.8 h. Follows Chapter 1 of Brunton & Kutz, *Data-Driven Science and
  Engineering* (stated in the description of video 1; chapter list confirmed on
  databookuw.com). All public.
- Content: SVD overview and math, matrix approximation, dominant correlations, image
  compression, Frobenius norm, method of snapshots, matrix completion / Netflix prize,
  unitary transformations, linear systems Ax=b, least squares, pseudoinverse, linear
  regression, PCA, eigenfaces, optimal truncation, alignment caveats, randomized SVD.
  Most concepts come with paired [Matlab] and [Python] code walkthroughs.
- Prerequisites: matrix-vector multiplication, transpose, what an eigenvalue is. This
  is applied linear algebra, not an introduction to it. A linear-algebra beginner
  should pair it with a short conceptual primer first (outside this channel; not
  evaluated here).
- Unlocks: dimensionality reduction and PCA (embedding visualisation), least squares
  (the closed-form ancestor of every regression), low-rank approximation (the idea
  behind LoRA and model compression), pseudoinverse. Provides the concrete "why" for
  matrices that a beginner otherwise memorises.
- Caveat: Chapters 4-6 of the same book (regression, clustering/classification,
  neural networks) have no matching playlist on the channel as of 2026-09-10.

### Rank 5. Optimization Bootcamp (in progress)

- URL: https://www.youtube.com/playlist?list=PLMrJAkhIeNNS3UT10txhV70ZwIeIjkMQp
- 44 entries: 29 public (7.1 h) and 15 private (yt-dlp reports "Private video";
  these are queued, unreleased uploads). Series began 2026-07-02. Companion book:
  *Optimization Bootcamp for Machine Learning, Inverse Problems, and Control*
  (Amazon link in video 1 description).
- Content so far: anatomy of an optimization problem, applications, convexity (sets,
  functions, norms, Jensen's inequality, local = global minima), convex vs non-convex
  activation functions, a 14-video gradient block (public titles are still placeholders
  "Optimization_Gradient_01..14", so content is inferred as gradient descent methods).
- Prerequisites: multivariable calculus (partial derivatives, gradients) and the
  linear algebra from Rank 4. Video 1 chapter list: convexity, linear and quadratic
  programming, non-convex optimization.
- Unlocks: the training loop. Gradient descent, convexity, and why neural-network
  losses are non-convex are the core of what an AI engineer tunes (learning rates,
  optimizers, loss landscapes). Rank 5 rather than higher only because the series is
  incomplete and the gradient videos lack final titles; revisit when the 15 private
  videos publish.

### Optional (not ranked as core)

- **Reinforcement Learning** — https://www.youtube.com/playlist?list=PLMrJAkhIeNNQe1JXNvaFvURxGY4gE9k74
  8 videos, 3.2 h. Prerequisites: probability, basic ML vocabulary. Framed as "machine
  learning meets control theory" and includes HJB/dynamic programming, so half the
  content is control-flavoured. Useful only if the Roadmap later includes RLHF or agent
  training; videos 4-7 (methods overview, policy/value iteration, Q-learning, deep RL
  overview) are the reusable part.
- **Sparsity and Compression** — https://www.youtube.com/playlist?list=PLMrJAkhIeNNRHP5UA-gIimsXLQyHXxRty
  22 public videos, 5.0 h (Chapter 3 of the book). Most of it is compressed sensing.
  Cherry-pick videos 12 (Sparsity and the L1 Norm), 14-16 (Robust Regression with L1)
  and 17 (LASSO) for L1 regularization intuition; skip the rest.
- **Fourier Analysis** — https://www.youtube.com/playlist?list=PLMrJAkhIeNNT_Xh3Oy0Y4LTj0Oxo8GqsC
  39 videos, 7.5 h (Chapter 2 of the book). Prerequisites: calculus, complex numbers.
  Relevant only if the Roadmap adds audio/signal or time-series ML; not a gap-closer.

## 4. Suggested sequence for the Roadmap

```
Intro to Data Science (2.7 h)
  -> Probability Bootcamp (10.6 h)
       -> Introduction to Statistics and Data Analysis (9.9 h)
  -> [external linear-algebra primer] -> SVD playlist (6.8 h)
       -> Optimization Bootcamp (7.1 h public, growing)
```

Core total: 37.1 h of public video. Probability/Statistics and LA/SVD branches are
independent and can run in parallel Lanes. A Project Node that reimplements the SVD
playlist's Python PCA/eigenfaces examples, and one that reproduces the statistics
playlist's Bayesian linear regression example, would turn these Resources into
portfolio artifacts.

## Sources

All accessed 2026-09-10.

- Steve Brunton channel playlists page: https://www.youtube.com/@Eigensteve/playlists
- Intro to Data Science playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNQV7wi9r7Kut8liLFMWQOXn
- Probability Bootcamp playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V
- Probability and Statistics: Overview (four-part plan statement): https://www.youtube.com/watch?v=sQqniayndb4
- Introduction to Statistics and Data Analysis playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNT14qn1c5qdL29A1UaHamjx
- Introduction to Statistics and Data Analysis (video 1, course outline): https://www.youtube.com/watch?v=QIXUTsdj_oA
- Singular Value Decomposition playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNSVjnsviglFoY2nXildDCcv
- SVD Overview (states "follow Chapter 1"): https://www.youtube.com/watch?v=gXbThCXjZFM
- Optimization Bootcamp playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNS3UT10txhV70ZwIeIjkMQp
- Optimization Bootcamp overview video: https://www.youtube.com/watch?v=lPBPbGmw1_4
- Reinforcement Learning playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNQe1JXNvaFvURxGY4gE9k74
- Sparsity and Compression playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNRHP5UA-gIimsXLQyHXxRty
- Fourier Analysis playlist: https://www.youtube.com/playlist?list=PLMrJAkhIeNNT_Xh3Oy0Y4LTj0Oxo8GqsC
- Introduction to Data Intensive Engineering overview video: https://www.youtube.com/watch?v=cP695Ixc5uA
- Book site with chapter list (Data-Driven Science and Engineering): https://databookuw.com/
- Tooling: yt-dlp 2026.07.04, `--flat-playlist --print "%(playlist_index)s|%(id)s|%(duration)s|%(title)s"`; per-video `--print "%(channel)s|%(upload_date)s|%(description)s"`.
