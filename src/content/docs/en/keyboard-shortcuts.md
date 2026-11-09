---
title: Keyboard shortcuts
description: Default shortcuts at a glance, split by macOS and Windows / Linux, and how they interact with the terminal, the system and the browser.
group: reference
order: 1
---

This page lists every shortcut in the default configuration. `Mod` in the tables is ⌘ on macOS and Ctrl on Windows / Linux.

In "Settings → Shortcuts" you can rebind each command, add alternates, set one to none, or turn everything off with "Enable shortcuts" at the top; you can also switch to the other built-in keymap profile.

## General rules

- **Terminal control keys belong to the shell**: while the terminal has focus, Ctrl (without Shift) or Alt plus a key (such as Ctrl+C, Ctrl+D, Ctrl+R, Alt+B) is never taken by Armadra, even if you bound it to a command. Ctrl+Shift+letter and combinations with ⌘ are not affected.
- The "Terminal" column says whether the key still belongs to Armadra while the terminal has focus; the "Input" column says whether it still works while an input box or editable area has focus.
- With "Enable shortcuts" off, the page takes none of the commands below and every key in a terminal goes to the shell; only the window's and the system's own keys (⌘W / Ctrl+W, ⌘Q, Alt+F4) and the "Keys inside components" below keep working.

## App

| Command | macOS | Windows / Linux | Terminal | Input |
| --- | --- | --- | --- | --- |
| Command palette | ⌘K | Ctrl+K / Ctrl+Shift+P | Yes | Yes |
| Settings | ⌘, | Ctrl+, | Yes | Yes |
| Sidebar | ⇧⌘L | Ctrl+Shift+L | Yes | Yes |
| Explorer | ⇧⌘E | Ctrl+Shift+E | Yes | Yes |
| Source control | ⇧⌘G | Ctrl+Shift+G | Yes | Yes |
| Resources panel | ⇧⌘U | Ctrl+Shift+U | Yes | Yes |
| Quick open | ⌘P | Ctrl+P | Yes | Yes |
| Search in project | ⇧⌘H | Ctrl+Shift+H | Yes | Yes |

The "Code hosting panel", "Problems" and "References" panels have no default shortcut; open them from the command palette or their own entry points.

## Canvas

| Command | macOS | Windows / Linux |
| --- | --- | --- |
| New terminal | ⌘T | Ctrl+T |
| New agent | ⇧⌘C | Ctrl+Shift+C |
| Focus mode | ⇧⌘F | Ctrl+Shift+F |
| Maximise node | ⇧⌘⏎ | Ctrl+Shift+Enter |
| Close node | ⌘W | Ctrl+W |
| Undo / Redo | ⌘Z / ⇧⌘Z | Ctrl+Z / Ctrl+Shift+Z |
| Tidy canvas | ⇧⌘A | Ctrl+Shift+A |
| Import Mermaid | ⇧⌘M | Ctrl+Shift+M |
| Zoom in / Zoom out | ⌘= / ⌘- | Ctrl+= / Ctrl+- |
| Actual size / Fit view | ⌘0 / ⌘1 | Ctrl+0 / Ctrl+1 |
| Move selection between nodes | ⌘←↑→↓ | Ctrl+←↑→↓ |
| Delete selection | ⌫ / ⌦ | Delete / Backspace |
| Select all / Copy / Cut / Paste | ⌘A / ⌘C / ⌘X / ⌘V | Ctrl+A / Ctrl+C / Ctrl+X / Ctrl+V |
| Show grid | ⌘' | Ctrl+' |
| Distraction-free | ⌘. | Ctrl+. |

These keys do not apply while a terminal or an input box has focus (copy and paste inside a terminal are described below). "Close node" with ⌘W / Ctrl+W is handled by the app window: it closes the selected or focused node, and otherwise closes the window (hides it on macOS); on Windows / Linux with the terminal focused, Ctrl+W goes to the shell.

### Whiteboard tools

Press a single letter to switch; the tool stays selected until you press Esc to return to the Select tool.

| Tool | Key |
| --- | --- |
| Select | V |
| Hand | H |
| Draw | D |
| Highlighter | ⇧D |
| Shape | R |
| Line | L |
| Arrow | A |
| Text | T |

## Terminal

| Command | macOS | Windows / Linux | Note |
| --- | --- | --- | --- |
| Find in terminal | ⌘F | Ctrl+F | On Windows / Linux, Ctrl+F in a terminal belongs to the shell; open the search from the node header or the command palette |
| Copy | ⌘C | Ctrl+Shift+C | Copies when there is a selection; without one ⌘C does nothing and Ctrl+C sends an interrupt as usual |
| Paste | ⌘V | Ctrl+Shift+V | Wrapped automatically when bracketed paste is on |

All other keys (arrows, F1–F12, Home / End, Alt combinations, and so on) go into the terminal unchanged.

## Editor

Active only while an editor node has focus, including inside its input areas.

| Command | macOS | Windows / Linux |
| --- | --- | --- |
| Save file | ⌘S | Ctrl+S |
| Rename symbol | F2 | F2 |
| Format file | ⇧⌥F | Shift+Alt+F |
| Go to definition | F12 | F12 |
| Find references | ⇧F12 | Shift+F12 |
| Code actions | ⌘. | Ctrl+. |
| Go to line | ⌃G | Ctrl+G |

## Browser node

Active only while a browser node has focus.

| Command | macOS | Windows / Linux |
| --- | --- | --- |
| Reload page | ⌘R | Ctrl+R |
| Back | ⌘[ | Alt+← |
| Forward | ⌘] | Alt+→ |
| Focus the address bar | ⌘L | Ctrl+L |

## Source control

| Command | macOS | Windows / Linux | Condition |
| --- | --- | --- | --- |
| Commit | ⌘⏎ | Ctrl+Enter | Focus is inside the "Commit" tab of the Git window |

## System and window

| Key | Platform | Behaviour |
| --- | --- | --- |
| ⌘Q | macOS | Quit the app and its background service |
| ⌘H / ⌥⌘H / ⌘M | macOS | Hide, hide others, minimise |
| Alt+F4 | Windows / Linux | Close the window |

The two system-wide hotkeys "Show / hide the main window" and "New terminal node" are unbound by default and are registered with the system only after you set them in "Settings → Shortcuts".

## Keys inside components

These work only while the relevant control has focus or the relevant state is open; they are not configurable and are not affected by "Enable shortcuts":

- Esc: return the canvas to the Select tool, close panels and menus, leave comment mode, cancel a file drag;
- hold Space to pan the canvas, Shift to add to the selection, Mod+scroll to zoom;
- Enter or F2 on a node title to rename it;
- session-view input: Enter sends, Shift+Enter inserts a new line;
- comment box: Mod+Enter sends, Enter / Tab picks an @ mention;
- command palette and quick open: arrows to choose, Enter to confirm.

## Known conflicts and limits

- In the web version opened in a browser, Ctrl / ⌘+T, Ctrl+W and similar are reserved by the browser and the page cannot intercept them; Ctrl+Shift+C, ⇧⌘A, Ctrl+Shift+M, Ctrl+Shift+E / H and others may be handled by the browser first. The desktop app is unaffected.
- Browser nodes: with "Enable shortcuts" off, the desktop app still forwards combinations with the main modifier from web pages to the canvas, so those keys do not work inside the page.
- Members on a server do not see the "Enable shortcuts" master switch and can only change the keymap of their own device.
- Phones and tablets have no native key handling; an attached keyboard uses the same web table, and `Mod` is ⌘ on iPad.
- The same combination conflicts when its conditions can hold at once; the settings page flags it.
