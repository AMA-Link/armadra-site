---
title: Introduction
description: What Armadra is, the problems it addresses, the work it suits and how to read these docs.
group: start
order: 1
---

Armadra is a local-first workspace for collaborative AI coding. Bring multiple coding agents onto one canvas to divide tasks, share context, and hand off work.

Claude Code, Codex, OpenCode, Pi, Oh My Pi and GitHub Copilot each sit on the canvas as a node that runs the CLI itself, keeping that tool's accounts, models and permission settings. You connect AI coding agents to share task context, use messages and handoffs to pass work along, and keep material, progress and results in one workspace.

## From one agent to a team of agents

With a single agent, the whole context lives in one session. Once work spans several sessions or several agents, familiar problems appear:

- The agent picking up doesn't know what was decided, what already failed or where the results are;
- Every step uses the same model, so the budget isn't spent where judgment matters most;
- How the terminal windows relate exists only in your head.

Armadra turns those relationships into a workspace you can see and act on:

- **Work carries over**: linked agents read summaries, transcripts and related material within scope, exchange messages and hand off at milestones.
- **Models split the work**: pick a model per node so economical models take well-bounded tasks and stronger ones handle hard judgment calls. Today the split is arranged by you or the task instructions; automatic difficulty routing is not implemented.
- **The process stays visible**: agents, notes, editors, Git diffs, files, browsers and the whiteboard form one work surface.
- **You stay in the loop**: when an agent needs approval or an answer, the request shows up in the node header and is collected in the sidebar's notifications for you to answer; Armadra never approves on your behalf.

## Each node runs a complete agent product

Armadra doesn't rewrite agents. Each agent node launches the CLI you already use and reuses its multi-turn execution, tool calls and sessions; Armadra only adds node identity, links, messages and readable context.

Claude Code, Codex, OpenCode, Pi, Oh My Pi and GitHub Copilot are supported out of the box, plus the coordinator `ama` that ships with Armadra and any custom CLI you configure. The same agent can switch between Terminal view (a real terminal) and Session view (a conversational interface that shows messages, tool calls and diffs as cards), provided the agent offers that entry point.

## What it is good for

- **Software engineering**: requirements analysis, implementation, testing, diagnosis and cross-review.
- **Algorithms and data science**: algorithm work, data processing, model training and evaluation, comparing experiments.
- **Research**: reproducing papers, computational experiments, data analysis and visualization, checking results.

## How it runs

- **Desktop app**: installers for macOS, Windows and Linux; workspace records live in local SQLite and the workspace's `.armadra/`, with no separate server to deploy.
- **Self-hosting and remote access**: deploy Armadra on your own server or NAS (the server shell: no window, always on); desktop and phone browsers reach the same pages over HTTPS, with member accounts and per-workspace sharing. See [Server and devices](/docs/server-and-devices/).
- **Phone**: the phone browser and the mobile app connect to your own Armadra to view canvases and answer approvals. See [Mobile app](/docs/mobile/).

Agents run on the computer or server hosting the workspace. Model requests and related data handling follow the settings and policies of the CLI tools and model services you use.

## How to read these docs

- **Start**: [Install](/docs/install/), then run a first collaboration with the [Quickstart](/docs/quickstart/); the [Interface tour](/docs/interface-tour/) explains every area of the window.
- **Concepts**: [Canvas and nodes](/docs/canvas-and-nodes/), [Links and context](/docs/links-and-context/) and [Messages and handoff](/docs/messages-and-handoff/) are the three foundations of Armadra.
- **Guides** and **Reference**: look things up by task, for example [Agents](/docs/agents/), [Approvals](/docs/approvals/), [Keyboard shortcuts](/docs/keyboard-shortcuts/) and the [FAQ](/docs/faq/).

When you're ready, head to [Install](/docs/install/).
