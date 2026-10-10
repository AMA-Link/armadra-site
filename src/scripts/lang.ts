import type { Lang } from '../lib/types';
import { transition } from './motion';

const KEY = 'armadra-site.lang';
const ATTRS = [
  ['ph', 'placeholder'],
  ['aria', 'aria-label'],
  ['title', 'title'],
] as const;

export function currentLang(): Lang {
  return document.documentElement.dataset.lang === 'en' ? 'en' : 'zh';
}

/** 把 data-ph-* / data-aria-* / data-title-* 写入对应属性；同步双语 document.title */
export function applyLang(root: ParentNode = document): void {
  const l = currentLang();
  for (const [key, attr] of ATTRS) {
    root.querySelectorAll<HTMLElement>(`[data-${key}-${l}]`).forEach((el) => {
      const v = el.getAttribute(`data-${key}-${l}`);
      if (v != null) el.setAttribute(attr, v);
    });
  }
  // 窄屏用短占位文案，避免被截断
  if (narrow?.matches) {
    root.querySelectorAll<HTMLElement>(`[data-phs-${l}]`).forEach((el) => {
      const v = el.getAttribute(`data-phs-${l}`);
      if (v) el.setAttribute('placeholder', v);
    });
  }
  const html = document.documentElement;
  const title = html.getAttribute(`data-title-${l}`);
  if (root === document && title) document.title = title;
}

const narrow = typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)') : null;
narrow?.addEventListener('change', () => applyLang());

/** 写 armadra-site.lang、设置 html[data-lang] 与 lang、applyLang()、派发 armadra:lang */
export function setLang(l: Lang | 'toggle'): void {
  const next: Lang = l === 'toggle' ? (currentLang() === 'zh' ? 'en' : 'zh') : l;
  try { localStorage.setItem(KEY, next); } catch { /* 忽略 */ }
  const html = document.documentElement;
  if (html.dataset.lang === next) {
    applyLang();
    return;
  }
  transition('lang', () => {
    html.dataset.lang = next;
    html.lang = next === 'zh' ? 'zh-CN' : 'en';
    applyLang();
    document.dispatchEvent(new CustomEvent('armadra:lang', { detail: { lang: next } }));
  });
}
