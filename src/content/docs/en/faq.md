---
title: FAQ
description: Common questions about data, cost, privacy and compatibility.
group: reference
order: 1
---

## Are model services included?

No. Armadra works with the AI tools you configure. External CLIs use their own accounts and billing, and each CLI calls models under its provider's rules; model credentials for the `ama` coordinator are configured separately, kept in the local secret store and handed only to the ama process.

## Where is my data?

In desktop mode there is no separate server; workspace records live in local SQLite and the workspace's `.armadra/` folder.

- **Not persisted**: raw terminal output, secrets and `.env` files are not written into canvas data or logs. Node credentials and ama's model keys live only in the local secret store and are set only on the matching CLI process at launch; the database keeps just the entry names.
- **Read through links**: a linked agent can read another node's recent terminal screen, transcript and summary on demand, within the link's permissions. Before it is handed over, that text is redacted for common credential formats and counted against the link's read budget; Armadra records who read how much and when, not the text itself. Redaction is pattern-based and can miss home-grown token formats, so don't type secrets straight into an agent's terminal.
- **Model services**: when an agent calls a model, requests and related data are handled under the settings and policies of the CLI tools and model services you use.

## Will it change my global CLI configuration?

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

For help with installation or problems, email [support@armadra.com](mailto:support@armadra.com); for partnerships, [contact@armadra.com](mailto:contact@armadra.com); report vulnerabilities privately to [security@armadra.com](mailto:security@armadra.com).

App issues can also go to [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra/issues/new/choose); website and docs issues go to [AMA-Link/armadra-site](https://github.com/AMA-Link/armadra-site/issues/new/choose).
