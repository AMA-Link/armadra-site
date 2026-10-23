/**
 * 文档正文的渐进增强（没有脚本时正文照常可读）：
 * 1. 代码块外包一层 .code[data-code]，右上放复制按钮（「复制」与「已复制」叠放，由 scripts/copy.ts 切换）；
 * 2. h2–h4 末尾加锚点 #（悬停出现，键盘不进入；标题自身带 id，可直接复制地址）。
 */
import { S } from '../i18n';

function bi(tag: string, cls: string, zh: string, en: string): HTMLElement {
  const wrap = document.createElement(tag);
  wrap.className = cls;
  for (const [lang, text] of [['zh', zh], ['en', en]] as const) {
    const s = document.createElement('span');
    s.dataset.l = lang;
    s.lang = lang === 'zh' ? 'zh-CN' : 'en';
    s.textContent = text;
    wrap.append(s);
  }
  return wrap;
}

export function enhanceProse(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('.prose pre').forEach((pre) => {
    if (pre.closest('[data-code]')) return;
    const box = document.createElement('div');
    box.className = 'code code--prose';
    box.dataset.code = '';
    pre.classList.add('code__pre');
    pre.replaceWith(box);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code__copy';
    btn.dataset.copy = '';
    btn.setAttribute('aria-label', S.copy.aria.zh);
    btn.dataset.ariaZh = S.copy.aria.zh;
    btn.dataset.ariaEn = S.copy.aria.en;
    const swap = document.createElement('span');
    swap.className = 'code__swap';
    swap.append(bi('span', 'code__idle', S.copy.idle.zh, S.copy.idle.en), bi('span', 'code__done', S.copy.done.zh, S.copy.done.en));
    btn.append(swap);
    box.append(pre, btn);
  });
  root.querySelectorAll<HTMLElement>('.prose :is(h2, h3, h4)[id]').forEach((h) => {
    if (h.querySelector('.heading-anchor')) return;
    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = `#${h.id}`;
    a.textContent = '#';
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    h.append(a);
  });
}
