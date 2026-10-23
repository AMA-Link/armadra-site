/**
 * 站点代码高亮主题，色值与 tokens.css 的 --code-* 一致。
 * 由 astro.config.mjs 以 themes: { dark, light } + defaultColor: false 接入，输出 --shiki-dark / --shiki-light。
 */

interface Palette {
  bg: string; plain: string; comment: string; keyword: string; string: string; number: string;
  type: string; fn: string; punct: string; tag: string; attr: string; inserted: string; deleted: string;
}

interface ShikiTheme {
  name: string;
  type: 'dark' | 'light';
  colors: Record<string, string>;
  fg: string;
  bg: string;
  settings: { scope?: string[]; settings: { foreground?: string; fontStyle?: string } }[];
}

function build(name: string, type: 'dark' | 'light', c: Palette): ShikiTheme {
  return {
    name,
    type,
    fg: c.plain,
    bg: c.bg,
    colors: { 'editor.background': c.bg, 'editor.foreground': c.plain },
    settings: [
      { settings: { foreground: c.plain } },
      // 斜体只对 Latin 生效：中文注释由 prose.css 处理，此处只给颜色
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
      { scope: ['keyword', 'storage', 'keyword.operator.new'], settings: { foreground: c.keyword } },
      { scope: ['string', 'string.template', 'constant.other.symbol'], settings: { foreground: c.string } },
      { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: c.number } },
      { scope: ['entity.name.type', 'support.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: c.type } },
      { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: c.fn } },
      { scope: ['variable', 'variable.parameter', 'meta.object-literal.key'], settings: { foreground: c.plain } },
      { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: c.punct } },
      { scope: ['entity.name.tag'], settings: { foreground: c.tag } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: c.attr } },
      { scope: ['markup.inserted'], settings: { foreground: c.inserted } },
      { scope: ['markup.deleted'], settings: { foreground: c.deleted } },
      { scope: ['markup.heading'], settings: { foreground: c.fn, fontStyle: 'bold' } },
      { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    ],
  };
}

export const siteDark = build('site-dark', 'dark', {
  bg: '#262626', plain: '#b0aea5', comment: '#9a9992', keyword: '#6cb0ff', string: '#c9b98a', number: '#e0a66b',
  type: '#9fb3a8', fn: '#faf9f5', punct: '#9a9992', tag: '#6cb0ff', attr: '#c9b98a', inserted: '#32d74b', deleted: '#6cb0ff',
});

export const siteLight = build('site-light', 'light', {
  bg: '#f5f5f5', plain: '#5e5d59', comment: '#6e6d67', keyword: '#0a5fc4', string: '#6b6a2e', number: '#8a5a1c',
  type: '#3f6b5a', fn: '#141413', punct: '#6e6d67', tag: '#0a5fc4', attr: '#6b6a2e', inserted: '#15702a', deleted: '#0a5fc4',
});
