# Design System: Armadra 官网

官网与 Armadra 桌面端共用一套令牌名与值，品牌是犰狳标志加一个蓝色。

## Overview

**北极星：「一张安静的工作台」**。近乎单色、克制、像印刷品：中性近黑 / 近白的底，文字三档，层级靠字号、字重与留白，分区之间是两端渐隐的 1px 发丝线。品牌蓝只在悬停、焦点、当前位置和主按钮出现。浅色主题是同一套关系的对称覆盖层。

- 默认跟随系统深浅，可手动切换；深色 `#1c1c1c` 底，浅色 `#f7f7f7` 底；全屏一层极淡的噪点（`pointer-events: none`）。
- 界面、标题与正文用 Geist；等宽（Geist Mono）只给元信息、日期、版本、角标、代码与 `Kbd`。
- 圆角与阴影对齐桌面端：官网实际只用 4 / 6 / 10 / 999 四档圆角与 `--shadow-node`、`--shadow-overlay` 两档阴影。
- **产品画面用真实素材**：软件画面是真实录屏，首页的圆形插画是同一份录屏里抽出的真实截图（灰度），官网自身不用 CSS 复刻软件界面，也不画营销插图。

## Colors

所有颜色只经由 `src/styles/tokens.css` 的变量引用。

| Token | 深色 | 浅色 | 用途 |
| --- | --- | --- | --- |
| `--bg` | `#1c1c1c` | `#f7f7f7` | 页面底 |
| `--panel` | `#262626` | `#f5f5f5` | 代码块底、胶囊 Dock 底（60% + 模糊） |
| `--card` | `#2c2c2c` | `#ffffff` | 录屏卡、更新日志条目、翻页卡 |
| `--surface-raised` | `#333333` | `#ebebeb` | 行内代码底、Kbd 底、表头 |
| `--surface-overlay` | `#3a3a3a` | `#ffffff` | Tooltip |
| `--text` | 白 85% | `#202020` 90% | 标题、正文 |
| `--muted-foreground` | 白 55% | `#202020` 70% | 摘要、元信息、页脚 |
| `--faint` | 白 38% | `#202020` 50% | 只用于装饰：分隔点、禁用态、占位 |
| `--border` / `--border-strong` | 白 8% / 16% | `#202020` 10% / 20% | 发丝线与卡片边 / 输入边、Dock 边、悬停边 |
| `--hover` / `--active` | 白 7% / 12% | `#202020` 6% / 11% | 行与钮的悬停 / 按下 |
| `--brand` / `--brand-text` | `#0a84ff` / `#6cb0ff` | `#007aff` / `#0a5fc4` | 当前位置线与圆点、焦点 / 悬停链接与当前导航文字 |
| `--brand-solid` / `--on-accent` | `#0a6fd6` / `#ffffff` | `#0066cc` / `#ffffff` | 主按钮实底与其文字 |
| `--brand-soft` | 品牌 16% | 品牌 12% | 选区、当前项底 |
| `--focus-ring` | `#b8dbff` | `#082340` | 焦点环：2px 实线，外偏 2px |
| `--success*` / `--danger*` | 同桌面端 | 同桌面端 | 更新日志「最新」、404 与错误 |

对比度由 `scripts/check-contrast.mjs` 守着（含在 `pnpm check` 里）：`--text` 对 `--bg` ≥ 11:1，`--muted-foreground` 与 `--brand-text` ≥ 5:1。`--faint` 不承载可读文字。

**The Quiet Brand Rule**：品牌蓝不做大色块、不做标题色、不做正文链接常态色；一屏里的蓝应当一眼能数清。

## Typography

- 字号阶梯（与桌面端同名）：`--text-caption` 11、`--text-meta` 12、`--text-body` 13（行高 19）、`--text-section` 15、`--text-title` 17、`--text-display` 22。官网专有：`--text-lede` 14 / 1.6（摘要）、`--text-prose` 16 / 1.7（文档正文）、`--text-prose-h1/h2/h3` 28 / 22 / 17、`--text-hero` `clamp(28px, 1.2rem + 2.4vw, 44px)`（首屏与收尾标题）。
- 字重：400 正文、500 强调与标签、600 标题；不用 700。标题 `text-wrap: balance`，摘要 `pretty`。
- 元信息（日期、版本、平台、角标、翻页标签）用 `--font-code`，数字 `tabular-nums`；导航标签是 Geist 13px 500，不用等宽。

## Layout

- 内容宽 `--content-max` 1088，gutter 16 / 40 / 64（≤640 / ≤1024 / 更宽）；文档页三栏另用 `--docs-max` 1320，侧栏 232，正文 ≤ 760，≥1280 出现右侧本页目录。
- 间距：`--space-item 4 / group 8 / inset 12 / block 16 / section 24 / page 16`，官网专有 `--space-loose 32 / gap 48 / wide 64 / foot 80 / band 96 / dock 144`。分区之间一条发丝线加 `--space-gap`；首屏上下 `--space-band`（≤640 为 64）；页脚上方 `--space-foot`，下方 `--space-dock` 让出胶囊。
- 控件高 32（触屏 44，首屏 CTA 44），列表行 36，顶栏 56（≤640 为 48）。
- 网格纸：40px 单元，线用 `--border`；圆形插画 1px `--border-strong` 描边。

## Shells & Primitives

新页面先选外壳，再用组件组合，不新写一次性的标题、分区、行或按钮样式。

- `components/home/TopNav`：56 高吸顶，`--bg` 85% + 模糊；标志 + 首页 / 文档 / 更新日志（当前项品牌文字 + 2px 平移指示器）+ 中 / EN、主题、GitHub、下载。≤640 只留标志、中 / EN 与主题。
- `components/common/Dock`：底部居中悬浮胶囊，4 个 40px 圆形图标钮（首页 / 文档 / 更新日志 / GitHub）；当前页钮下方 4px 品牌圆点；悬停邻近放大（`transform: scale()`，无回弹，`(hover: none)` 关闭）；底部模糊幕不拦指针；滚到页脚时降到 60% 不透明。
- `components/common/Footer`：顶部发丝线，三列（版权 / 链接 / 构建信息），≤640 一列。
- `components/home/{Hero,Entry,CircleFigure,ToolsTable,Faq}`：首页分区；`Entry` 两栏交替（左文右图、中线竖发丝线）。
- `components/ui/PageHeader`（页面标题区）、`CodeBlock`、`Kbd`、`Segmented`；按钮 `.btn-primary`（品牌蓝实底）与 `.btn-ghost`（1px 描边），行 `.list-row`，卡片 `.card`，发丝线 `.hairline-x / .hairline-y`。

`pnpm check` 运行 `scripts/check-design.mjs`：组件样式里写死字号、行高、间距、字面颜色，`transition: all`、`ease-in`、字面 `cubic-bezier(`、不走 `--dur-*` 的时长，非 `var(--r-*)` 的圆角，非 `var(--shadow-*)` 的阴影，非 `--font-ui / --font-code` 的字体即报错；确需例外在同一行写 `design-ok` 与原因。

## Motion

动效只做连接与层级。令牌与桌面端同名同值：时长 `--dur-instant 100 / fast 120 / base 160 / slow 200 / page 280 / hero 600`，曲线 `--ease-out`、`--ease-in-out`、`--ease-drawer`、`--ease-color`，没有回弹。

- 首屏错落入场：元信息、标题、摘要、按钮各 `--dur-slow`，间隔 `--intro-step`（100ms），只在一次会话里首次进入首页时播放。
- 滚动揭示：只在首页，插画与录屏进入视口时 `opacity 0→1 + translateY(12px→0)`，`--dur-page`，只播一次；文档与更新日志不揭示。
- 悬停：颜色 `--dur-instant` + 点状下划线（偏移 4px）；按钮 `:hover:active` 缩到 `--press-scale`；全部包在 `(hover: hover) and (pointer: fine)` 里。
- 指示器：顶部导航、文档侧栏、分段控件的当前项是同一个元素平移，`--dur-base` `--ease-in-out`。
- 跨页走 View Transitions：旧页 `--dur-fast` 淡出，新页 `--dur-page` 上浮淡入；`topnav`、`docs-nav`、`dock` 常驻。主题切换不做过渡：`data-theme-switching` 压住一帧内的全部过渡。语言切换文字原地交叉淡化。
- `prefers-reduced-motion`：位移、缩放、模糊、放大全部关闭，只留 `--dur-fast` 淡入；录屏停在 poster 并显示控件。
- 只动 `transform` 与 `opacity`；噪点层与模糊幕 `pointer-events: none`，不加 `will-change`。

## 首页

- **一列**：内容宽 1088，分区之间是 `.hairline-x` 与 `--space-gap` 留白，不再画左右边框与四角角标。
- **分区顺序**：首屏（元信息行 + `--text-hero` 标题 + 摘要 + 「下载 Armadra」「快速上手」+ 获取方式分段控件与命令）→ 软件录屏 → 协作示例 → 核心能力 → 支持的工具（一张表）→ 部署与数据 → 常见问题 → 开始使用 → 联系。
- **条目**：两栏交替，左文右图；文字栈是等宽元信息 → `--text-display` 标题 → `--text-lede` 摘要 → 「阅读文档」13px 500 链接。窄屏单列，插画 ≤ 300 居中在文字下方。
- **圆形插画**：正圆、`aspect-ratio: 1`、1px `--border-strong` 描边，底是 40px 网格纸；内容是录屏里抽出并裁切的真实截图（`public/media/circles/`，灰度；浅色主题用 CSS 反相），不画营销插图。
- **软件画面**：一段真实 Armadra 的录屏（WebM，循环、静音、自动播放），整列宽的 `.card`（`--shadow-node`）；减少动效时停在 poster 并显示播放控件。录制方法见 `docs/guides/recording.md`。

## Do's and Don'ts

- **Do** 只通过 `tokens.css` 取色、取字号、取间距、取圆角与阴影；触屏控件命中区 ≥ 44px，焦点环 2px `--focus-ring` 外偏 2px。
- **Do** 每条事实都能在 Armadra 主仓库找到出处；计划中的能力明确标注。
- **Do** 键盘可达：导航快捷键 `H / C / L`，在 Tooltip 里以 `Kbd` 显示；`Tab` 顺序是顶部导航、内容、Dock。
- **Don't** 把品牌蓝铺成色块，不用 700 以上字重，不用渐变大色块或营销式插画，不引入外部字体与脚本。
- **Don't** 把等宽字用于标题、正文或导航主文字。
