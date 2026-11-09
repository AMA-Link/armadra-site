---
title: Self-hosting and remote access
description: Reach Armadra over the local network or the internet, with desktop sharing, an always-on server shell, relays, pairing, browser access and shared workspaces.
group: guides
order: 7
---

Read this page when you want to use the Armadra on one machine from a phone, another computer or a browser, or share a workspace with other people. The windowless, always-on deployment is called the **server shell** below. Terminals, Git and agents always run on the machine that runs Armadra; the device you connect from is only a client.

## Choose a way first

| | Desktop "Allow other devices" | Server shell |
| --- | --- | --- |
| Where it runs | Your desktop, only while the app is open | A server or NAS, always on |
| Certificate | Local CA, installed once on the phone | Self-signed; ACME or your own certificate for the public internet |
| Good for | Your own phone, showing someone on the local network | Long-term sharing among several people, use away from the desktop, the public internet |
| Where agents run | On the desktop | On the server; the CLIs must be installed and signed in there |

For your own phone only, the desktop option is enough; for several people, always-on or the public internet, use the server shell.

## Desktop: allow other devices

1. Open Settings → Remote access and, under "This computer", turn on "Allow other devices to access this computer". While it is on, devices on the same local network can reach it.
2. Choose "Connect a phone". A pairing card appears with a QR code, "Copy link", a two-minute countdown and the certificate fingerprint; the local-network and internet routes are both in the same code.
3. Scan the code with the phone camera, follow the prompts in the browser to install the certificate, then choose "Connect". The native app scans inside the app; see [Mobile app](/docs/mobile/).
4. After the code expires choose "New pairing code". On the local network the card also shows an 8-character "Pairing code" (like `XXXX-XXXX`) that the phone can enter on its connect page; it is single-use and expires with the QR code.
5. Turning the switch off disconnects everything that came in through it.

Paired devices are listed under Settings → Account & devices with name, platform, when added, last access and role, and you can "Revoke" any of them.

"Advanced" in Settings → Remote access folds these options:

- "Listen on": "This computer only", "Local network" or "All networks"; the default is the local network.
- "Certificate": "Local CA" (default), "Certificate files" or "ACME". With the local CA the phone must install the CA once ("Download CA"; the iOS and Android steps are on the pairing page), and the certificate is reissued automatically when the address changes.
- "Remote access accounts", share links and traffic.

## Internet access

The "Internet access" row in Settings → Remote access uses Armadra Cloud by default: once registered it shows "Armadra Cloud" and the space, and you can "Change" it (grants and share links in the old space stop working); if you are not signed in or registered, follow the prompts to sign in and then register. The steps are in [Teams and console](/docs/teams-and-console/). If you only have a remote access account, you can turn it on with that in one step.

You can also skip Armadra Cloud and arrange it yourself:

- **Remote access account**: under "Advanced" choose "Add remote access account", enter the relay's address, account and password, and verify the certificate fingerprint before signing in. The computer connects out through the relay and opens no inbound port. Connections through a relay are end-to-end encrypted; the relay only forwards ciphertext.
- **Your own network setup**: Tailscale, WireGuard, Cloudflare Tunnel and the like; give the server shell the address people actually use as `--public-origin`.

To use another computer of yours from this one, choose "Pair another computer of mine" under "My other computers", enter its address or pairing link (or pairing code) and choose "Connect". In the sidebar, workspaces are grouped as "This computer", "My other computers" and "Shared with me"; choosing a workspace opens its canvas.

## Server shell

A container is recommended:

```sh
mkdir -p /srv/armadra && cd /srv/armadra
curl -fsSLO https://raw.githubusercontent.com/AMA-Link/Armadra/main/apps/server/docker/compose.yml
# edit ARMADRA_PUBLIC_ORIGIN and ARMADRA_ACME_EMAIL in compose.yml
docker compose up -d
docker compose logs armadra | grep "armadra-server pairing"
```

`ARMADRA_PUBLIC_ORIGIN` must match the address in the browser's address bar. The desktop installer also contains the server shell; start it directly with the `serve` subcommand, with no Node or source checkout needed:

```sh
# macOS
/Applications/Armadra.app/Contents/MacOS/Armadra serve --data-dir ~/.armadra-server --listen 127.0.0.1:8443
```

On a server shell the Remote access page is read-only; listening, certificates and the public origin are set on the command line and in environment variables. A browser node needs Chromium on the server; the default image does not include it, and without it the page does not offer "New browser".

### First administrator and members

1. The startup log has a pairing link, `armadra-server pairing …`, valid for two minutes and usable once. If it expires, run `docker compose kill -s SIGUSR2 armadra` for a new one.
2. Whoever redeems it first becomes the administrator.
3. Then, under Settings → Members & sharing, choose "Add member", or "Generate" an invitation link and create "Groups", then share by workspace. When sharing, pick the subject, the scope (whole host, workspace or session) and the role.

| Role | What they can do |
| --- | --- |
| Viewer | See the canvas and terminal output |
| Editor | Also edit the canvas |
| Operator | Also open their own terminals, launch agents, and read and write files and Git |
| Driver | Also type into other people's terminals and agents, and answer approvals |

Revoking a share disconnects that person at once. If a member forgets their password, an administrator can issue a one-time reset link from the member's menu, or "Reset two-step verification".

### Account security

The server shell supports passwords, passkeys, two-step verification (TOTP and recovery codes) and GitHub / OIDC sign-in, with rate limiting and lockout.

## Browser access

Open the server shell's address (`ARMADRA_PUBLIC_ORIGIN`) in any device's browser, or, once registered with Armadra Cloud, choose "Open" on the host in the console; you get the same canvas page. On a phone browser it has bottom navigation and a single-node focus page; see [Mobile app](/docs/mobile/). The first visit uses a pairing or invitation link, after which you sign in with your account. With no sign-in session, a full-page sign-in is shown.

## Sharing a workspace

To share a canvas with someone, who joins as a guest:

1. On the canvas, choose "Share" at the top right (or "Share" in the workspace menu), then pick the scope, "This workspace" or "Only this session", the role and the expiry. Roles are "View only" (default), "Can edit" and "Can run", the expiry defaults to 7 days with 1 or 30 days as options; "Full control" can only be granted in settings.
2. If the Internet route is not on yet, turn it on right in the popover; sign in first if you have no account.
3. Choose "Create link", then copy it or let them scan the QR code.
4. They open the link and choose "Join"; the canvas appears under "Shared with me" in their sidebar, labelled with the owner, role and expiry. "Leave" removes it.

In the link list in Settings → Remote access you can create a "New link", set a "Note" and "Uses", "Revoke", and see expired or used-up links in the history. Revoking a link also disconnects everyone who joined through it.

For the full steps (certificates, reverse proxies, backup, upgrade and rollback, push) see the [server deployment guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md) in the Armadra repository.
