<!--
标题沿用提交信息格式：`类型(范围): 中文描述`，例如 `feat(home): 滚动叙事分步高亮`。
Title follows the commit format: `type(scope): description`, for example `feat(home): …`.
规范见 .github/CONTRIBUTING.md。不需要的小节写「无 / None」，不要删掉。
See .github/CONTRIBUTING.md. Write "无 / None" for sections that do not apply instead of deleting them.
-->

## 变更摘要 / Summary

<!-- 做了什么、为什么。 / What changed and why. -->

## 关联 issue / Related issues

<!-- Closes #123 / Refs #456 -->

## 改动范围 / Scope

- [ ] 页面与组件 / Pages and components（`src/pages`、`src/components`）
- [ ] 首页录屏 / Demo recording（`public/media`、`scripts/record`）
- [ ] 文档内容 / Docs content（`src/content/docs`）
- [ ] 设计 token / Design tokens（`src/styles`）
- [ ] 部署与 CI / Deploy and CI

## 界面文案 / UI copy

- [ ] 不涉及 / Not applicable
- [ ] 文案都在 `src/i18n/strings.ts` 或内容文件里，中英同步 / All copy lives in `src/i18n/strings.ts` or content files, Chinese and English in sync
- [ ] 产品事实与 Armadra 主仓库一致，没有编造数字或功能 / Product facts match the Armadra repository; no invented numbers or features

## 测试 / Testing

- [ ] `pnpm check`
- [ ] `pnpm build`
- [ ] 桌面 1440 与手机 390 宽度、深浅两种主题的截图 / Screenshots at 1440 and 390, dark and light

## 检查清单 / Checklist

- [ ] 样式只引用 `src/styles/tokens.css` 的变量 / Styles only reference variables from `src/styles/tokens.css`
- [ ] 不引用外部字体、统计或第三方脚本 / No external fonts, analytics or third-party scripts
- [ ] 新文档已登记到 `docs/README.md` / New docs registered in `docs/README.md`

## 已知限制 / Known limitations
