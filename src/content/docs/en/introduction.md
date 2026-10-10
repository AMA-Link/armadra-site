---
title: Introduction
description: What Armadra is, the problems it addresses and the work it suits.
group: start
order: 1
---

Armadra is a local-first **AI coding canvas**. Claude Code, Codex, OpenCode, Pi, Oh My Pi and GitHub Copilot run as **real terminal nodes** on an infinite canvas, each keeping its own accounts, models and permission policy. You share the context that matters through links, split the work with messages and handoffs, and see the material, the process and the results on one canvas.

## From one agent to a team of agents

With a single agent, the whole context lives in one session. Once work spans several sessions or several agents, familiar problems appear:

- The agent picking up doesn't know what was decided, what already failed or where the results are;
- Every step uses the same model, so the budget isn't spent where judgment matters most;
- How the terminal windows relate exists only in your head.

Armadra turns those relationships into a workspace you can see and act on:

- **Work carries over**: linked agents read summaries, transcripts and related material within scope, exchange messages and hand off at milestones.
- **Models split the work**: pick a model per node so economical models take well-bounded tasks and stronger ones handle hard judgment calls. Today the split is arranged by you or the task instructions; automatic difficulty routing is not implemented.
- **The process stays visible**: agents, notes, editors, Git diffs, files, browsers and the whiteboard form one work surface.

## Each node runs a complete agent product

Armadra doesn't rewrite agents. Each agent node launches the CLI you already use and reuses its multi-turn execution, tool calls and sessions; Armadra only adds node identity, links, messages and readable context.

## What it is good for

- **Software engineering**: requirements analysis, implementation, testing, diagnosis and cross-review.
- **Algorithms and data science**: algorithm work, data processing, model training and evaluation, comparing experiments.
- **Research**: reproducing papers, computational experiments, data analysis and visualization, checking results.

## How it runs

- **Desktop app**: installers for macOS, Windows and Linux; data lives in local SQLite and the workspace's `.armadra/`.
- **Headless server shell**: always on, on a server or NAS; browsers and phones reach the same pages over HTTPS, with accounts and per-workspace sharing.

To see a collaboration first, open the [live demo](/demo/). When you're ready, head to [Install](/docs/install/).
