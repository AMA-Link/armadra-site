---
title: FAQ
description: Common questions about data, cost, privacy and compatibility.
group: reference
order: 1
---

## Does Armadra call models for me?

No. Armadra launches CLIs that are installed and signed in on your machine; each CLI calls models under its provider's rules, billed to your own provider accounts. The `ama` coordinator's model keys stay in the local secret store and are handed only to the ama process.

## Where is my data?

The desktop install has no server. Workspace records live in local SQLite and the workspace's `.armadra/` folder. Credentials and raw terminal output never go into the canvas, logs or API responses.

## Will it change my CLI configuration?

No. Hooks, skills and canvas notes are injected only when a CLI is launched from the canvas; the same CLI started outside is unaffected, and Armadra doesn't write the CLI's global configuration.

## Do agents keep running after I close the window?

Yes. Closing the window doesn't stop the background; with the tmux backend, terminal sessions also survive app restarts.

## What if the database is damaged?

Armadra refuses to start on an unknown or damaged database instead of wiping or rebuilding it, so nothing is lost silently. Restore from a consistent backup made in Settings.

## Why does my OS warn about the installer?

Packages are not code-signed or notarized yet; see [Install](/docs/install/) for how to proceed. Signed releases are on the roadmap.

## How is it different from workflow tools?

Workflow tools excel at turning well-defined steps into repeatable pipelines. Armadra's nodes run complete agent products, which suits open-ended tasks whose path changes as you learn. They combine: explore on the canvas first, then save the settled collaboration as a [workflow](/docs/coordinator-and-workflows/).

## Where do I report problems?

App issues go to [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra/issues/new/choose); website and docs issues go to [AMA-Link/armadra-site](https://github.com/AMA-Link/armadra-site/issues/new/choose).
