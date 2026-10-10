---
title: Server shell and devices
description: Keep Armadra running on a server, reach it from browsers and phones, and share workspaces.
group: guides
order: 3
---

## Desktop gateway or server shell

| | Desktop gateway | Server shell |
| --- | --- | --- |
| Runs on | Your desktop, only while the app is open | A server or NAS, always on |
| Certificates | Local CA, installed once on the phone | Self-signed; ACME or your own certificate for the public internet |
| Good for | Your own phone, a quick look for someone on the LAN | Long-term sharing, use away from your desk, public access |
| Agents run on | The desktop | The server; CLIs must be installed and signed in there |

## Desktop gateway

Turn it on in Settings → Remote access → LAN direct. A pairing card appears with a QR code, a link and a two-minute countdown. Scan it with the phone's browser, install the certificate as guided, then tap Connect.

## Server shell

A container is recommended:

```sh
mkdir -p /srv/armadra && cd /srv/armadra
curl -fsSLO https://raw.githubusercontent.com/AMA-Link/Armadra/main/apps/server/docker/compose.yml
# set ARMADRA_PUBLIC_ORIGIN and ARMADRA_ACME_EMAIL in compose.yml
docker compose up -d
docker compose logs armadra | grep "armadra-server pairing"
```

`ARMADRA_PUBLIC_ORIGIN` must match the browser's address bar exactly. The pairing link in the startup log is valid for two minutes and the first person to redeem it becomes the admin; after that, invite members, create groups and share per workspace in Settings → Accounts and sharing.

The desktop installer also contains the server shell: `Armadra serve` starts it directly, with no Node or source checkout needed.

## Reaching it from outside

If you'd rather not open a public port, use Tailscale, WireGuard, Cloudflare Tunnel or similar, or register with a personal relay. `--public-origin` is always the address users actually visit.

## Account security

The server shell supports passwords, passkeys, TOTP with recovery codes and GitHub / OIDC sign-in, with rate limiting and lockout. Revoking a share disconnects the other person immediately.

## Phones

Phone browsers open the same pages, with bottom navigation, a single-node focus view and a soft-keyboard toolbar. The phone is only a client; terminals, Git and agents still run on the computer or server. Native iOS and Android apps are on the roadmap and currently verified in simulators.

For the full procedure (certificates, reverse proxies, backups, upgrades and rollback), see the [server deployment guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md) in the Armadra repository.
