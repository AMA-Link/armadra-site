import { RELEASE } from '../data/release';

/**
 * 文档正文里的 `{{version}}` 与 `{{tag}}` 在构建时替换为 src/data/release.json 的值，
 * 版本号与下载链接只在 release.json 更新一次（pnpm sync:release），安装页不再手写。
 * 只处理文本、行内代码、代码块与链接地址；挂在 astro.config 的 Markdown 处理器上。
 */
const FIELDS: Record<string, string> = { version: RELEASE.version, tag: RELEASE.tag };
const PLACEHOLDER = /\{\{(version|tag)\}\}/g;

const fill = (s: string) => s.replace(PLACEHOLDER, (_, key: string) => FIELDS[key]);

interface Ctx {
  setProperty(node: any, key: any, value: any): void;
}
const value = (node: Readonly<{ value: string }>, ctx: Ctx) => {
  if (PLACEHOLDER.test(node.value)) ctx.setProperty(node, 'value', fill(node.value));
  PLACEHOLDER.lastIndex = 0;
};
const url = (node: Readonly<{ url: string }>, ctx: Ctx) => {
  if (PLACEHOLDER.test(node.url)) ctx.setProperty(node, 'url', fill(node.url));
  PLACEHOLDER.lastIndex = 0;
};

export const releasePlugin = {
  name: 'armadra-release',
  text: value,
  inlineCode: value,
  code: value,
  link: url,
  definition: url,
};
