# Design System: Armadra 官网

设计语言沿用 Owlbay 个人站（同一作者、同一套 token），品牌换成 Armadra 的犰狳标志。

## Overview

**北极星：「一张安静的工作台」**。官网像 Armadra 画布本身：暖近黑底、米白文字、一种陶土色强调；结构靠 1px 线与 4px/4px 虚线栅格，分区四角挂等宽角标；层级靠字号、颜色阶与 400–600 字重，不靠色块、阴影或圆角。浅色主题是同一套关系的反相。

- 默认跟随系统深浅；深色 `#141413` 底 / `#faf9f5` 字。
- 单一强调色陶土 `#d97757`：当前位置、焦点与光标。
- 零圆角、零阴影；界面与标题用 Geist Mono，文档长文用 Geist 无衬线。
- **产品画面用录屏**：首页的软件画面是真实录屏，不在官网里用 CSS 复刻软件界面；官网自身只用本文的 token。

## Colors

所有颜色只经由 `src/styles/tokens.css` 的变量引用。

| Token | 深色 | 浅色 | 用途 |
| --- | --- | --- | --- |
| `--bg` / `--bg-raised` / `--bg-panel` | `#141413` / `#1a1a18` / `#1e1d1b` | `#faf9f5` / `#f3f1ea` / `#ecebe3` | 页面 / 代码块 / 浮层 |
| `--ink` … `--ink-4` | `#faf9f5` `#b0aea5` `#87867f` `#5e5d59` | `#141413` `#5e5d59` `#6e6d67` `#a3a199` | 正文到装饰；`--ink-4` 不承载可读文字 |
| `--accent-ui` / `--accent-text` | `#d97757` | `#c15f3c` / `#b0522f` | 当前位置、焦点、强调 |
| `--line` / `--line-soft` / `--line-strong` | ink 16% / 9% / 28% | 同 | 框架边、行分隔、描边 |

**The One Ember Rule**：陶土色不做按钮底、不做正文链接色、不做标题色；一屏里的陶土色应当一眼能数清。

**The Inverted Selection Rule**：「选中」用反白（Ink 底 + Ground 字），「当前位置」用陶土色 2px 细线。

## Typography

- Display（首页标题）`--fs-display`，Headline（页面标题）`--fs-h1`，Title（分区标题）`--fs-h2`，Body 16/24，Prose 17 / 1.8（文档正文）。
- Label / Stamp：等宽 13px / 11px，`tabular-nums`，只用于数据。
- 字重：正文 400，强调与标题 500–600，不用 700 以上。

## Layout

- 内容容器最大 1200px，gutter 20 / 40 / 48（≤640 / ≤1024 / 更宽）。间距阶梯 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128。
- 控件高 44px，行高 52px，顶栏 64px（≤640 为 52px）。
- 两种外壳：**顶栏外壳**（首页、404）与 **文档外壳**（吸顶顶栏 + ≥1025 左侧 232px 目录 + 主栏 + ≥1280 右侧本页目录）。

## Shells & Primitives

新页面先选外壳，再用组件组合，不新写一次性的标题、分区、行或按钮样式。

- `components/home/TopNav`：标志 + 首页 / 文档（`[H] [C]`）+ 中 / EN、主题、GitHub、下载。
- `components/ui/PageHeader`：页面标题区（Headline + 一句简介 + 可选操作）。
- `components/common/SectionFrame`：分区，虚线框 + 四角角标；`plain` 去框。
- `.list-row`：一切「一行一条」的列表行骨架。
- `components/ui/Kbd`、`CodeBlock`、`Segmented`；按钮 `.btn-primary`（反白）与 `.btn-ghost`（1px 描边）。

`pnpm check` 运行 `scripts/check-design.mjs`：组件样式里写死字号、行高、间距、字面颜色、`transition: all` 或非零圆角即报错；确需例外在同一行写 `design-ok` 与原因。

## Motion

状态过渡 120ms，面板 200ms，视图切换 260–340ms，缓动 `cubic-bezier(0.16, 1, 0.3, 1)`；跨页走 View Transitions。`prefers-reduced-motion` 下保留透明度与颜色变化，去掉位移与缩放。

## 首页

- **字体**：界面与标题用 Geist Mono（`--font-sans` 指向等宽栈）；文档正文 `.prose` 用 Geist 无衬线（`--font-prose`），长文更好读。标题与条目强调可用 600 字重。
- **一列**：全站内容宽 1080（`--content-max` / `--page-col`），内容左右缩进即 `--gutter`（20 / 40 / 64）。首页这一列带左右 1px 边框，顶栏也在列内；分区之间一条 1px 横线。文档页三栏另用 `--docs-max`（1320）。
- **首页分区**：首屏（`--fs-h1` 标题 + 一段灰色说明 + 「下载 Armadra」「快速上手」两个按钮 + 一行辅助说明 + 获取方式标签框：下载 / 源码 / 服务器）→ 软件录屏 → 协作示例 → 核心能力（`[*]` 条目）→ 支持的工具 → 部署与数据（`[*]` 条目）→ 常见问题（折叠）→ 开始使用 → 联系。分区标题一律 16px 600，不用大号分区标题、编号带头或插图。
- **软件画面**：一段真实 Armadra 的录屏（WebM，循环、静音、自动播放），整列宽、不加边框和说明；减少动效时停在 poster 上并显示播放控件。录制方法见 `docs/guides/recording.md`。

## Do's and Don'ts

- **Do** 只通过 `tokens.css` 取色、取字号、取间距；所有交互控件保留 44px 触控高度，焦点环 2px 陶土色外偏 2px。
- **Do** 每条事实都能在 Armadra 主仓库找到出处；计划中的能力明确标注。
- **Don't** 使用圆角（品牌图标图片除外）、`box-shadow`、700 以上字重、渐变大色块或营销式插画。
- **Don't** 把等宽字用于标题、正文或导航。
