# Armadra 官网开发约定

> 只写项目知识与约定；个人语言、工作偏好、模型参数放用户级配置（`~/.claude/CLAUDE.md`、`~/.codex/AGENTS.md`）。
> 每条规则都应能被检查或被违反；写不出反例的口号删掉。

## 产品不变量

1. 产品事实以 [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra) 的 README、`docs/guides/` 与 `docs/status/` 为唯一来源；官网不编造功能、数字、用户评价或下载量。
2. 尚未实现或未验证的能力不写成已支持；路线图项明确标注为计划。
3. 界面与文档中英双语，两种语言内容一致；切换只换语言，不换信息量。
4. 纯静态站点：不加后端、表单、账号、统计或第三方脚本，字体本地打包。
5. 首页的软件画面是真实软件的录屏（`public/media/`，自托管）：在隔离数据目录里跑真实 Armadra 录制，不剪辑出软件做不到的行为；录制方法见 [录屏指南](docs/guides/recording.md)。

## 技术栈

- Astro 7 + TypeScript（strict），pnpm，纯静态输出；文档为 Astro content collection（Markdown）。
- 字体：`@fontsource-variable/geist`、`@fontsource-variable/geist-mono`。
- 部署：Cloudflare Workers 静态资源（`wrangler.jsonc`），域名 `armadra.com`。

## 代码边界

- 设计 token 只在 `src/styles/tokens.css` 定义，组件不写死颜色、字号、间距、圆角与阴影；`pnpm check` 含设计约束检查（`scripts/check-design.mjs`）与对比度检查（`scripts/check-contrast.mjs`）。
- 页面由 `components/ui/` 与 `SectionFrame`、`.list-row`、`.card`、`.btn-*` 组合，不新写一次性的标题、分区、行或按钮样式；导航快捷入口在 `components/common/Dock.astro`。
- 界面文案只放 `src/i18n/strings.ts`；文档正文放 `src/content/docs/{zh,en}/`，两种语言同名文件一一对应。
- 导航项只在 `src/lib/nav.ts` 定义。
- 首页录屏：资源在 `public/media/`，引用在 `src/pages/index.astro` 的 `DEMO`；录制与合成脚本在 `scripts/record/`。软件界面有明显变化时重录；首页圆形插画由 `scripts/record/circles.mjs` 从录屏抽帧生成，放在 `public/media/circles/`，不绘制营销插图。
- 版本号与下载链接只在 `src/data/release.json`（`pnpm sync:release` 更新）：组件读 `data/release.ts`，文档正文写 `{{version}}` / `{{tag}}` 占位，构建时由 `lib/release-plugin.ts` 替换；不手写版本号。
- 更新日志放 `src/data/changelog.ts`，取自 Armadra `CHANGELOG.md` 中用户可感知的改动，中英同步，不写契约号、迁移号与 PR 号。
- 引入第三方源码前先确认许可证，并登记到 `THIRD_PARTY_NOTICES.md`。

## 按需阅读与验证

- 提交信息、分支、PR 与 issue 规范见 [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md)。
- 启动与检查：[开发指南](docs/guides/development.md)；部署：[部署指南](docs/guides/deployment.md)；文档索引：[docs/README.md](docs/README.md)。
- 设计规范：[DESIGN.md](DESIGN.md)；产品事实：[PRODUCT.md](PRODUCT.md)。
- 检查命令：`pnpm check`、`pnpm build`。
- 改动 UI 后在浏览器预览中自查桌面（1440）与手机（390）宽度、深浅两种主题。

## 需求流程

- 新需求与缺陷先建 GitHub issue（中英双语表单），在 issue 中补全现状、目标、验收与设计后标 `ready`，再按包开 PR（`Closes #N`），CI 全绿后用 merge commit 合并；细则见 [贡献指南](.github/CONTRIBUTING.md)。

## Review guidelines

- 审查意见用简体中文，先给结论，每条写明文件与行号、会出什么错、怎么修。
- 只报会造成错误行为、错误信息、安全问题或违反下列约定的问题；不报纯风格与命名偏好。
- 引入外部脚本、统计、外部字体或把访客数据发往第三方，视为 P0。
- 写出 Armadra 主仓库里没有依据的功能、数字或评价，或把计划写成已支持，视为 P1。
- 中英内容不一致、文案没进 `src/i18n/` 或文档目录，视为 P2。
- 组件写死颜色、字号、间距或圆角而绕过 `tokens.css`，视为 P2。
- 新增交互没有键盘可达或减少动效的处理时指出缺口。
