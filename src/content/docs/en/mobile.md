---
title: Mobile app
description: Install Armadra on a phone, connect to your computer or server by scanning a code, view and work with the canvas, and receive approval and completion notifications.
group: guides
order: 8
---

Armadra on a phone is a client: it connects to the Armadra running on your computer or server and uses the same canvas page to look at nodes, answer approvals and tap a few terminal keys. Terminals, Git and agents still run on the computer or server; no CLI is started on the phone.

## Install

- **Android**: download [`armadra-mobile_{{version}}_android.apk`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/armadra-mobile_{{version}}_android.apk) from the [release page](https://github.com/AMA-Link/Armadra/releases/tag/{{tag}}), allow installing apps from that source when the system asks, and install it manually.
- **iOS**: the iOS app is not published yet, so there is no download for now.
- **Without the app**: just open your computer's or server's address in the phone browser. You can still see the canvas and answer approvals, and receive web push; at phone width the page switches to a layout made for fingers.

## Connect to your computer

First, on the computer, open Settings → Remote access, turn on "Allow other devices to access this computer" and choose "Connect a phone" to show the QR code; see [Self-hosting and remote access](/docs/server-and-devices/).

1. Open the app; on first launch you land on the "Connect to Armadra" page.
2. Choose "Scan QR code" and scan the code on the computer, or paste the "Pairing link" and choose "Connect".
3. The native app checks and remembers this computer's certificate fingerprint and from then on trusts only that one, so there is no certificate to install by hand. A phone browser instead has you install the certificate once, as guided.
4. Once paired, you are in the canvas.

A pairing code normally expires after two minutes; choose "New pairing code" on the computer. Once the native app has remembered the certificate it can also use "Enter pairing code", with the 8-character code shown on the computer's pairing card.

If you are told the code is from an older or newer Armadra, update the computer and the app to the same version. If it cannot connect, put the phone and computer on the same network, or turn on "Internet access" on the computer.

## Add more connections

A phone can remember several connections, each one a computer or a server. On the connect page choose "Add connection"; the ways are:

- **QR code / pairing link / pairing code**: connect to a computer on the local network, as above.
- **Armadra Cloud**: choose "Sign in"; the app shows a device code and opens the browser, where you check the code in the console and choose "Authorize", then return to the app. Sign in with whatever the console supports; see [Teams and console](/docs/teams-and-console/). You can then pick the hosts in the cloud you have access to.
- **Remote access account**: enter the relay's "Address", "Account" and "Password"; for a self-signed relay, check the "Certificate fingerprint" and choose "Trust and continue", then tick the online hosts to connect under "Choose hosts".
- **Share link / QR code**: a link or QR code someone shared with you; scan it to join directly.

The connection in use is marked "Current", team hosts are grouped by team; choose a connection to switch to it, and "Remove" to forget it.

## What you can do on the phone

- **Bottom navigation**: "Canvas", "Files", "Git", "Settings". Only one panel is open at a time, and "Canvas" means all of them closed. Until a workspace is open everything except "Settings" is greyed out, because the phone is paired from there.
- **Single-node focus page**: terminal, editor and browser nodes open full screen ("Open full screen"), with "Back to canvas" and "Switch node" at the top. It is the same node as on the canvas, with its header buttons, approvals and status.
- **Terminal key bar**: Esc, Tab, the arrows and "Paste" stay above the soft keyboard; "Ctrl" expands `^C`, `^D`, `^Z`, `^L`, `^R`, `^A`, `^E`, `^U`, `^K`, and one tap sends one. Keys from the system keyboard do not go through the bar.
- **Git**: three levels of navigation, section list, section detail and single-file diff, each with "Back".
- **Approvals and answers**: when an agent is waiting for you, "Allow" and "Reject" are on the node header or the session card, as on the computer; whether you may answer depends on your role, see [Permission requests and approvals](/docs/approvals/). The session view reads more comfortably on a phone; see [Agents and CLIs](/docs/agents/).
- **Sidebar**: at phone width the sidebar is a drawer where you can switch projects, rename and search.
- Orientation: in settings, "Orientation" can be Follow system, Portrait or Landscape.

Every key you type carries a sequence number, and after a reconnect only input that has not been acknowledged is resent; input older than ten seconds is not resent automatically, because its outcome is unknown.

## Push notifications

After you sign in the phone asks once, "Get approval and completion alerts"; choose "Turn on". Tapping a notification opens that node.

- On the phone you can switch these kinds on or off individually: "Approval requests", "Waiting for an answer", "Stalled agents", "Agent errors", "Failed deliveries", "Resource thresholds", "Mentions in comments", "Results to review" and "Decisions needed". Registered devices are listed under "Push devices" in Settings → Notifications on the computer.
- A phone browser uses web push and needs no third-party account.
- Native push needs the operator to supply push credentials (or a push relay). The official installer currently has no push relay configured, so turning it on may fail; on Android with a UnifiedPush distributor installed it can receive through that. When push is not available you can still open the app and see what is pending under "Notifications" in the sidebar.
- Push content is end-to-end encrypted and carries no terminal text or file contents.

## Known limitation

The phone cannot start agents itself; everything runs on the computer or server it is connected to.
