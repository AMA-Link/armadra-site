/**
 * 代码块复制（ui/CodeBlock）。只复制当前可见的那一份（区域切换后隐藏的不复制），
 * 成功后按钮短暂显示「已复制」；剪贴板不可用时选中文本，便于手动复制。
 */
import { S, t } from '../i18n';

let installed = false;

function visibleCode(block: Element): HTMLElement | null {
  for (const pre of block.querySelectorAll<HTMLElement>('.code__pre')) {
    if (pre.offsetParent !== null || getComputedStyle(pre).display !== 'none') return pre;
  }
  return null;
}

function selectText(el: HTMLElement): void {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

export function initCopy(): void {
  if (installed) return;
  installed = true;
  const timers = new WeakMap<HTMLElement, number>();
  document.addEventListener('click', async (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
    const block = btn?.closest('[data-code]');
    if (!btn || !block) return;
    const pre = visibleCode(block);
    if (!pre) return;
    const text = pre.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('is-copied');
      btn.setAttribute('aria-label', t(S.copy.done));
      window.clearTimeout(timers.get(btn));
      timers.set(
        btn,
        window.setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.setAttribute('aria-label', t(S.copy.aria));
        }, 1600),
      );
    } catch {
      selectText(pre);
      btn.setAttribute('aria-label', t(S.copy.failed));
    }
  });
}
