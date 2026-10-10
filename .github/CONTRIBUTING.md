# 贡献指南 / Contributing

开发环境、目录约定与检查命令见 [AGENTS.md](../AGENTS.md) 与 [开发指南](../docs/guides/development.md)。

For the development setup, conventions and check commands, see [AGENTS.md](../AGENTS.md) and the [development guide](../docs/guides/development.md).

## 提交 issue / Opening issues

- 先搜索已有 issue，一个 issue 只写一个问题。 / Search existing issues first; one problem per issue.
- 使用对应的表单：缺陷报告、功能建议、内容与文档问题。 / Use the matching form: bug report, feature request, or content or docs issue.
- Armadra 软件本身的问题请到 [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra/issues)。 / Issues with the Armadra app itself belong in [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra/issues).
- 安全问题按 [SECURITY.md](SECURITY.md) 私下报告。 / Report security problems privately as described in [SECURITY.md](SECURITY.md).

## 需求流程 / From request to merge

所有需求与缺陷都走同一条线：issue → 设计 → PR → 合并。 / Every request and bug follows one path: issue → design → PR → merge.

1. **建 issue / Open an issue**：用对应表单（中英双语），一个 issue 只写一件事；大需求拆成多个 issue，用一个跟踪 issue 列出子项。标签 `needs-triage`。 / One issue per item using the matching form; split large requests into child issues under a tracking issue. Label `needs-triage`.
2. **补全与设计 / Refine and design**：在 issue 里补充现状（文件位置）、目标、范围、验收标准与设计（页面结构、组件、文案来源）。设计中标 `needs-design`，定稿后改为 `ready`。 / Add the current state (file locations), goal, scope, acceptance criteria and the design. Label `needs-design` while designing and `ready` once settled.
3. **PR 实现 / Implement in a PR**：每个包一个分支、一个 PR，正文按模板填写并写 `Closes #N`（前几批写 `Refs #N`）；按模块细分提交。 / One branch and one PR per package, with `Closes #N` (earlier batches use `Refs #N`); commit per module.
4. **合并 / Merge**：CI 全绿、检查清单满足后用 merge commit 合并，issue 随之关闭并留一句结果；后续项新开 issue 并互相链接。 / Merge with a merge commit once CI is green and the checklist holds; close the issue with a short result and link follow-ups.

## 提交信息 / Commit messages

格式为 `类型(范围): 描述`，描述用中文，说清行为变化而不只是改了哪个文件：

The format is `type(scope): description`. Descriptions are written in Chinese and state the behavior change:

```text
feat(home): 滚动到哪一步，软件模型高亮对应区域
fix(docs): 窄屏下目录不再遮住正文
docs(guides): 部署指南补 armadra.com 绑定步骤
```

- 类型 / Types：`feat`、`fix`、`docs`、`test`、`refactor`、`perf`、`build`、`chore`、`ci`、`release`、`revert`。
- 范围 / Scopes：`home`、`model`、`docs`、`changelog`、`layout`、`design`、`i18n`、`deploy`、`guides` 等模块或目录名；跨两处用逗号。 / A module or directory name; join two with a comma.
- 不要在提交信息里加生成说明或自动署名。 / No generated notes or automatic trailers.

## 提交 PR / Opening pull requests

- 从 `main` 拉出按用途命名的分支，例如 `feat/home-model`、`docs/deploy-guide`。 / Branch from `main` with a purpose-based name.
- PR 标题沿用提交信息格式；正文按模板填写，不适用的小节写「无 / None」。 / The PR title follows the commit format; fill in the template.
- 合并前 `pnpm check` 与 `pnpm build` 通过，界面改动附桌面与手机截图。 / `pnpm check` and `pnpm build` pass before merging; UI changes include desktop and mobile screenshots.
- 产品介绍与文档以 [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra) 的 README 与 `docs/guides/` 为准，不编造数字或功能。 / Product copy and docs follow the Armadra README and `docs/guides/`; never invent numbers or features.

## 仓库自动化 / Repository automation

- **CI**：`ci.yml` 在 PR 与 `main` 上跑 `pnpm check` 与 `pnpm build`。 / Runs `pnpm check` and `pnpm build` on PRs and `main`.
- **部署 / Deploy**：`deploy.yml` 在 `main` 推送后发布到 Cloudflare，需要仓库变量与密钥，见 [部署指南](../docs/guides/deployment.md)。 / Publishes to Cloudflare after pushes to `main`; see the deployment guide.
- **路径标签 / Path labels**：`labeler.yml` 按 [labeler.yml](labeler.yml) 的映射给 PR 打标签。 / Labels PRs by the paths they touch.
- **过期 issue / Stale issues**：60 天无活动标 `stale`，再 14 天关闭；`security`、`ready`、`needs-design` 与 PR 不处理。 / Idle issues are marked `stale` after 60 days and closed 14 days later; `security`, `ready`, `needs-design` and PRs are exempt.
