# Design System: Armadra 官网

设计语言沿用 Owlbay 个人站（同一作者、同一套 token），品牌换成 Armadra 的犰狳标志。

## Overview

**北极星：「一张安静的工作台」**。官网像 Armadra 画布本身：暖近黑底、米白文字、一种陶土色强调；结构靠 1px 线与 4px/4px 虚线栅格，分区四角挂等宽角标；层级只靠字号与 400 / 500 两档字重，不靠色块、阴影或圆角。浅色主题是同一套关系的反相。

- 默认跟随系统深浅；深色 `#141413` 底 / `#faf9f5` 字。
- 单一强调色陶土 `#d97757`：当前位置、焦点与光标。
- 零圆角、零阴影；Geist 负责人读的文字，Geist Mono 只用于数据（版本、命令、快捷键、角标）。
- **例外：软件模型**。复刻 Armadra 软件界面的部分使用 `--app-*` token（节点卡片、状态标签、蓝色连线、终端底色）；其余仍是官网体系，访客能分清「官网」与「产品画面」。

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
- 字重只有 400 与 500。

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

## 首页：软件模型与滚动叙事

- **少字**：首页只有标题与每条一句话，不写眉题、平台列表或解释段落。分区：软件、出发点、工作方式、能力、运行方式、Agent、原则、最近更新、开始。首屏 ≥1025 右侧是装饰小画布（`home/HeroCanvas.astro`）；工作方式与运行方式用 SVG 线条小插图（`home/Illo.astro`），不用图片。层级靠特大字号（`--fs-hero`）与留白。
- **软件模型**（`components/model/AppModel.astro`）：用 HTML / CSS 画出的 Armadra 窗口（侧栏、画布节点与连线、节点头部、权限条、右上工具簇与抽屉、Dock、小地图、评论钉、他人光标），设计尺寸 1200×760，按容器等比缩放；不用截图。可点的小功能在 `scripts/model/interact.ts`。
- **滚动叙事**（`scripts/model/story.ts`）：模型 sticky，上方一排分段进度线（每步一段，滚动时填充，可点击跳转），下方是本步的一句话；本步区域高亮描边，其余压暗；访客动手点模型时取消压暗。窄屏放大模型并平移到本步区域。模型上的陶土色编号点对应步骤。
- **分区带**（`components/common/Band.astro`）：首页每段是满宽的带，顶部一条与顶栏底线同样的满宽横线，带头一行是陶土色编号 + 分区名与右侧角标；两条纵向导轨线与横线相交处画 9px 小十字。
- **线条**：首页两条纵向导轨线贯穿全页；三列与网格用格线分隔；设计原则行间满宽线；首屏底部一条向下生长的引导线。
- **渐进**：带 `data-reveal` 的元素进入视口时淡入上移（`scripts/reveal.ts`），减少动效时只淡入。
- 模型目录里的尺寸照软件取值（px），`check-design.mjs` 对 `src/components/model/` 只查颜色、圆角与 `transition: all`。

## Do's and Don'ts

- **Do** 只通过 `tokens.css` 取色、取字号、取间距；所有交互控件保留 44px 触控高度，焦点环 2px 陶土色外偏 2px。
- **Do** 每条事实都能在 Armadra 主仓库找到出处；计划中的能力明确标注。
- **Don't** 使用圆角（品牌图标图片除外）、`box-shadow`、600 以上字重、渐变大色块或营销式插画。
- **Don't** 把等宽字用于标题、正文或导航。
