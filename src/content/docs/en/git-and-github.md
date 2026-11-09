---
title: Git and GitHub
description: Use the Git tool window for history, commits and branches, isolate work with worktrees, and connect GitHub to browse Issues and Pull requests.
group: guides
order: 5
---

Armadra puts Git in a tool window docked at the bottom: a "Log" tab for history and branches, and a "Commit" tab for choosing changes and committing. It handles every Git repository found in the workspace at once. Issues and Pull requests on GitHub and other hosting platforms are viewed in a separate "Code hosting" panel.

## Open the Git tool window

Click "Source control" in the right sidebar, or press ⇧⌘G (Ctrl+Shift+G on Windows / Linux). The top of the window has the "Log" and "Commit" tabs, with refresh, maximise and close on the right; drag the top edge to change its height. On a phone the same content opens level by level: "Branches → Commits → Details → Diff".

If the workspace has no repository, the window says "No Git repository was found in this workspace."

## Log: history and branches

The "Log" tab has three columns: the branch tree on the left, the commit graph in the middle and the selected commit's details on the right.

- **Branch tree**: one root per repository, with "Local", "Remote", "Tags" and "Worktrees" below it, plus "Stash" when stashes exist. "HEAD (all repositories)" shows every repository's current branch together; use "Filter branches" to search and "Add to favourites" to mark branches you use often.
- **Commit graph**: message, author, date and hash. With several repositories, all commits are interleaved by time in one graph, and a coloured bar at the left of each row shows the repository. When the working tree has uncommitted changes, the top row is "Uncommitted changes".
- **Toolbar**: search message or hash (with "Regex" and "Match case"), "Branch", "User" (including "Mine"), "Date" (today / 7 days / 30 days / custom), "Paths" (narrow to some repositories or directories), and "View settings" (show all branches, highlight my commits, compact rows, show the hash column). "Clear filters" resets everything.
- **Details**: author, committer, the full message and "Changed files", switchable between "Flat" and "Grouped by folder"; click a file to see its diff in the same column; "Copy hash" copies the commit id.

### Context menus

Right-click a commit row or an item in the branch tree; the available actions depend on the object:

| Object | Actions |
| --- | --- |
| Commit | "Check out this commit (detached HEAD)", "New branch from here…", "New tag here…", "Cherry-pick…", "Revert this commit", "Reset the current branch here" (soft / mixed / hard), "Rebase the current branch onto this", "Interactive rebase from here…", "Compare with local", "Compare with branch", "Copy OID", "Copy commit message", "Reference on the canvas" |
| Local branch | "Switch branch", "New branch from here…", "Rename…", "Merge into the current branch", "Rebase the current branch onto this", "Push current branch", "Set upstream", "Pull (fast-forward only)", "Fetch", "Compare with branch", "Show the diff against the worktree", "Add to favourites", "Delete branch" |
| Repository / HEAD | "Fetch", "New branch…", "Reference log…" |
| Remote | "Fetch", "Fetch and prune deleted remote branches", "Change the remote URL…", "Rename the remote…", "Remove remote"; on the "Remote" group, "Add remote" |
| Tag | "Check out this commit (detached HEAD)", "Push this tag", "Add to favourites", "Delete local tag" |
| Worktree | "Open in a Frame", "Remove worktree"; on the "Worktrees" group, "New worktree…" |
| Stash | "Apply this stash", "Pop this stash", "Drop this stash", "Show this stash's diff" |

While a merge, rebase, cherry-pick or revert is half done, a status banner appears at the top of the "Commit" tab with "Continue", "Skip" and "Abort". Conflicted files are listed in their own "Conflicts" group; resolve and save them in the editor, then stage them back in the "Commit" tab — saving a file does not mark it resolved by itself. Interactive rebase offers pick, reword, edit, squash, fixup and drop, and lets you reorder commits. "Reference log…" (right-click the repository or HEAD item) shows the history of where branches pointed, which helps recover commits you dropped.

## Commit

1. Switch to the "Commit" tab. Changes are grouped as "Conflicts", "Staged", "Changes" and "Untracked", and can be shown as "Tree" or "Flat".
2. Tick the files to commit; ticking stages a file and unticking unstages it. A directory row ticks its whole group. Click a file to see its diff on the right.
3. Write the "Commit message". "Recent messages" next to the box reuses an earlier message.
4. Click "Commit", or "Commit and push". Push is unavailable when there is no upstream branch; set an upstream first.

Also:

- When files from several repositories are ticked, each repository gets its own commit with the same message, and progress is shown one by one.
- "Amend the previous commit" rewrites the last commit; if it already exists on a remote-tracking branch you must confirm that you want to rewrite published history.
- "Stash…" saves the current changes (optionally "Include untracked files"), "Unstash…" lists saved stashes to apply, pop or drop; "Discard the selected change" asks for confirmation first.
- "Generate with AI" drafts a commit message from the staged changes; you preview it, then "Fill the commit box". It needs the Claude CLI on the machine and `ANTHROPIC_API_KEY` set for the running service, and is unavailable with a custom endpoint; when unavailable it states the reason. Lines detected as sensitive are hidden and not sent. If you edit the box by hand, the draft will not overwrite your text.

## Worktrees

A worktree checks out several branches of one repository into different directories, which suits giving every agent its own working copy so they do not overwrite each other.

1. In the branch tree, right-click the "Worktrees" group and choose "New worktree…".
2. Fill in "Worktree path (inside the workspace)"; tick "Also create a new branch" if needed.
3. Optionally tick "Also create a Frame bound to this worktree" and write an "Init script" — it runs once in the new worktree.
4. Later, right-click the worktree entry and choose "Open in a Frame" to get a Frame bound to it. The Frame header shows the branch, the number of uncommitted changes and the init script state; if the bound worktree is missing or its branch was switched you are told, and can "Recreate" or "Unbind".

To remove one, right-click the worktree entry in the branch tree and choose "Remove worktree".

## Connect GitHub

GitHub credentials are kept by the machine that runs Armadra's core service.

1. Open "Settings → Code hosting".
2. Under "Credential source" choose one:
   - "Reuse the local gh login": use the account the `gh` command line is already signed in with on that machine;
   - "Paste a token": enter a "Personal access token" and click "Save". The token is stored in the Keychain on macOS and in a restricted-permission file elsewhere, and the page says honestly when the storage is the degraded one;
   - "None".
3. For GitHub Enterprise, enter your address under "API address".
4. To stop, click "Revoke credential".

Gitea, GitLab and other platforms are added per host or repository under "Other platforms" on the same page: fill in "Host or repository", "Platform", "URL" and "Token", and pick a "Scope" of the whole machine or one workspace.

## Issues and Pull requests

Open the command palette (⌘K) and type "Code hosting panel"; it is also in the toolbar cluster at the top right. The panel recognises the platform from the current repository's remote URL, then shows two tabs:

- "Issues";
- "Pull requests" (called "Merge requests" on GitLab).

Lists can be filtered by "State": "Open", "Closed", "All", and for pull requests also "Merged". Click an item for details: state, author and update time, plus branches and a "Draft" marker for pull requests. "Open in browser" goes to the original page on the hosting platform, and "Load more" fetches the next page.

The panel is read-only for now: creating, commenting and merging happen on the hosting platform.

If the panel says it cannot be used, the usual causes are: open a workspace first; for "This device has no GitHub permission for this workspace" ask whoever shared it; for "The Host cannot produce a usable GitHub credential", use the button to go to "Settings → Code hosting" and set one up; when rate-limited, wait for the quota to recover; on "The remote already changed; reload and retry", reload and try again.

Next: members in [Coordinator and workflows](/docs/coordinator-and-workflows/) can each use their own worktree; shortcuts are in [Keyboard shortcuts](/docs/keyboard-shortcuts/).
