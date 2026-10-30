# 开发指南

## 环境

- Node.js ≥ 24，pnpm 12（`packageManager` 字段锁定版本）。
- 不需要其他工具链；站点是纯静态输出。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 本地开发，默认 <http://localhost:4321> |
| `pnpm check` | `astro check` 类型检查 + 设计约束检查（`check-design.mjs`）+ 对比度检查（`check-contrast.mjs`） |
| `pnpm check:contrast` | 只跑对比度检查：深浅两套 token 的文字对表面比值 |
| `pnpm build` | 构建到 `dist/`，并生成带 CSP 哈希的 `dist/_headers` |
| `pnpm check:links` | 构建后检查站内死链与锚点 |
| `pnpm sync:release` | 从 GitHub 更新 `src/data/release.json`（最新版本与安装包） |
| `pnpm changelog:draft <版本> [--source <路径或 URL>] [--write]` | 从 Armadra `CHANGELOG.md` 取该版本一节，打印 `src/data/changelog.ts` 的条目草稿（去掉 PR、迁移与契约编号，跳过工程类条目）；`--write` 才插到数据文件最前面。英文与标题留 `TODO`，人工改写后再提交 |
| `pnpm deploy:dry` | 构建并让 wrangler 预检，不发布 |
| `pnpm preview` | 预览构建产物 |

## 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `SITE_URL` | `https://armadra.com` | canonical 与 og:url 的站点地址 |

## 目录

| 路径 | 内容 |
| --- | --- |
| `src/pages/` | 首页、`/docs/`、`/cloud/`、`/changelog/`、404 |
| `src/components/` | `common/`（分区、页脚、Dock、开关）与 `ui/`（页面标题、代码卡、分段控件、Kbd）通用组件，`home/`（顶栏与首页分区）、`docs/` 文档目录 |
| `src/scripts/` | 主题、语言、快捷键、复制、滚动揭示、当前项指示器、Dock、文档正文增强 |
| `src/styles/` | `tokens.css`（与桌面端同名同值的令牌，唯一允许字面值的地方）、`base / utilities / motion / prose` |
| `src/content/docs/{zh,en}/` | 文档正文，两种语言同名文件一一对应 |
| `src/i18n/` | 界面文案（`strings.ts`）、首页文案（`home.ts`） |
| `src/data/` | 支持的 Agent 表、最新发布快照、更新日志 |
| `scripts/` | 设计约束、站内链接、响应头生成、发布快照同步、更新日志草稿 |

## 设计约束

- 令牌、字体角色、圆角与阴影见 [DESIGN.md](../../DESIGN.md)；组件样式只引用 `tokens.css` 的变量，`pnpm check` 会拦字面颜色、字号、间距，非 `var(--r-*)` 的圆角，非 `var(--shadow-*)` 的阴影，`transition: all`、`ease-in`、字面 `cubic-bezier(` 与不走 `--dur-*` 的时长。
- 改令牌后跑 `pnpm check:contrast`：`--text` 对 `--bg` ≥ 11:1，`--muted-foreground` 与 `--brand-text` ≥ 5:1。
- 改 UI 后在浏览器预览里看 1440 与 390 宽、深浅两种主题，并开 `prefers-reduced-motion` 看一遍（只应留淡入）。
