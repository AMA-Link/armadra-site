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
| `pnpm build` | 构建到 `dist/` |
| `pnpm preview` | 预览构建产物 |

## 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `SITE_URL` | `https://armadra.com` | canonical 与 og:url 的站点地址 |
