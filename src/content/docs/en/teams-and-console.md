---
title: Teams and console
description: Sign up for Armadra Cloud, create a team, register hosts, grant and share by role, and open hosts in the browser.
group: guides
order: 4
---

Armadra Cloud is in an invite-only beta; apply on the [Cloud](/cloud/) page. The console is the management interface in the browser: accounts, teams, hosts, grants, links and device trust all live there. Terminals, Git and agents still run on your computer or server.

## Sign up

Choose "Sign up" in the console, enter your name, email and password, then follow the link in the verification email. You can register hosts and share only after your email is verified.

## Personal space and teams

Every account has a personal space that belongs to you alone. Switch spaces from the space menu in the top left; "Create team" at the bottom of the menu asks for a name and an address. Hosts, grants, links and the audit log each belong to one space.

## Invite members

In the team's "Members", choose "Invite members". Enter one or more emails (separated by commas or new lines), pick a role, then "Send invitations". The invitee opens the invitation, signs in or signs up, and accepts. Pending invitations can be resent or revoked.

| Role | What they can do |
| --- | --- |
| Owner | Everything |
| Admin | Manage members, hosts, grants, links and team settings; review the audit log |
| Member | Use the hosts granted to them; register hosts when team settings allow |
| Billing | See members, usage and plan |
| Guest | See only the hosts granted to them |

## Register a host

A host is a computer or server running Armadra. Once registered, it connects out through the relay with no inbound ports.

**Desktop**: open Settings → Remote access, choose "Add Armadra Cloud" → "Get device code" → "Open in browser". On the console's "Authorize a device" page, check the code and the device name, then choose "Authorize". Back on the desktop, pick your personal space or a team under "Register to" and choose "Register this computer".

**Server**: on the server, run

```sh
armadra-server cloud login --issuer <console address> --space <team address>
```

The terminal prints a device code and a verification address; check it in the browser and authorize. Without `--space`, the host goes to your personal space. You can also copy a registration token and command from Hosts → Register host → Server in the console and register with `cloud register --token-stdin`. The server shell on Windows does not support these commands.

## Grant access

In the team's "Grants", choose "Add access": pick a subject (everyone in the team or one member), a host, a role and an expiry (never, 7, 30 or 90 days).

| Role | Meaning |
| --- | --- |
| View only | See the canvas and terminal output |
| Can edit | Also edit the canvas |
| Can run | Also open their own terminals, launch agents, and read and write files and Git |
| Full control | Also type into other people's terminals and agents, and answer approvals |

The "Access" tab of a host lists each person's effective role; expand a row to see every source and revoke them one by one. Once a host belongs to a team, the share popover on the desktop can grant team members directly or invite by email.

## Device trust

The first time a device reaches a host through Armadra Cloud, a trusted device has to approve it. The new device shows a 6-digit code and waits; the host owner, a team admin or one of your own trusted devices chooses "Trust" in the console's "Device trust" or in the desktop banner and enters that code. The code is checked only inside the end-to-end channel; the cloud never sees it.

Who can approve is set by "New device approvers" in team settings; with "Members can approve from their trusted devices" on, members can approve their own devices too.

## Share links

In "Links", choose "New link": pick a host, a role (View only by default), an expiry (1, 7 or 30 days), a use limit and a note. The link is shown only once, when it is created; copy it and send it on. The recipient opens it, chooses "Join" and lands on the canvas as a guest; links that require sign-in ask them to sign in first. Revoking a link also cuts off everyone who joined through it.

You can create links on a server too:

```sh
armadra-server invite --cloud-link --issuer <console address> --host --role viewer
```

## Open a host in the browser

Choose "Open" in the host list to open `/h/<host id>` in a new tab; the canvas is the same as on the desktop. Signing out of the console disconnects these tabs as well.

For the full interface design, see the [console design](https://github.com/AMA-Link/Armadra/blob/main/docs/design/cloud-console.md) in the Armadra repository; for server commands, see the [server deployment guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md).
