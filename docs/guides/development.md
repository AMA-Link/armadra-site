# 开发指南

## 环境

- Node.js ≥ 22，pnpm 12（`packageManager` 字段锁定版本）。
- 不需要其他工具链；站点是纯静态输出。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 本地开发，默认 <http://localhost:4321> |
| `pnpm check` | `astro check` 类型检查 + 设计约束检查 |
| `pnpm build` | 构建到 `dist/`，并生成带 CSP 哈希的 `dist/_headers` |
| `pnpm check:links` | 构建后检查站内死链与锚点 |
| `pnpm sync:release` | 从 GitHub 更新 `src/data/release.json`（最新版本与安装包） |
| `pnpm deploy:dry` | 构建并让 wrangler 预检，不发布 |
| `pnpm preview` | 预览构建产物 |

## 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `SITE_URL` | `https://armadra.com` | canonical 与 og:url 的站点地址 |

## 目录

| 路径 | 内容 |
| --- | --- |
| `src/pages/` | 首页、`/docs/`、`/changelog/`、404 |
| `src/components/` | `common/` 与 `ui/` 通用组件，`home/` 顶栏，`docs/` 文档目录 |
| `src/scripts/` | 主题、语言、快捷键、复制 |
| `src/content/docs/{zh,en}/` | 文档正文，两种语言同名文件一一对应 |
| `src/i18n/` | 界面文案（`strings.ts`）与首页文案（`home.ts`） |
| `src/data/` | 支持的 Agent 表、最新发布快照、更新日志 |
| `scripts/` | 设计约束、站内链接、响应头生成、发布快照同步 |
