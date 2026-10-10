import type { Bi, Lang } from '../lib/types';

export { S } from './strings';

/** 未指定语言时：浏览器读 html[data-lang]，构建期默认中文 */
function resolveLang(lang?: Lang): Lang {
  if (lang) return lang;
  if (typeof document !== 'undefined') return document.documentElement.dataset.lang === 'en' ? 'en' : 'zh';
  return 'zh';
}

export function t(bi: Bi, lang?: Lang): string {
  return bi[resolveLang(lang)];
}

/** {x} 插值；未提供的变量保持原样 */
export function fmt(bi: Bi, vars: Record<string, string | number>, lang?: Lang): string {
  return t(bi, lang).replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** 同时插值两种语言，便于交给 <T> 渲染 */
export function fmtBi(bi: Bi, vars: Record<string, string | number>): Bi {
  return { zh: fmt(bi, vars, 'zh'), en: fmt(bi, vars, 'en') };
}
