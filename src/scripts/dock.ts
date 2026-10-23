/**
 * 胶囊 Dock：悬停邻近放大、Tooltip 的「邻近立即打开」、滚到页脚时降低不透明度。
 * 放大用 transform: scale()，命中区固定 40px（单元格不变，只放大里面的圆钮）；
 * 触屏与减少动效不放大。宽度 = 40 + clamp(60 − 距离, 0, 40)，两侧邻居按总增量对称让位。
 */
const BASE = 40;
const REACH = 60;
const MAX_EXTRA = 12;

export function initDock(): void {
  const dock = document.querySelector<HTMLElement>('[data-dock]');
  if (!dock) return;
  const list = dock.querySelector<HTMLElement>('[data-dock-list]');
  const cells = [...dock.querySelectorAll<HTMLElement>('[data-dock-cell]')];
  if (!list) return;

  // Tooltip：离开后 200ms 才算「关闭」，期间进入邻近项时立即显示、不播放过渡
  let closeTimer = 0;
  const openTips = () => {
    window.clearTimeout(closeTimer);
    list.classList.add('is-tips');
  };
  const closeTips = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => list.classList.remove('is-tips'), 200);
  };
  for (const c of cells) {
    c.addEventListener('pointerenter', openTips);
    c.addEventListener('focusin', openTips);
    c.addEventListener('pointerleave', closeTips);
    c.addEventListener('focusout', closeTips);
  }

  // 放大：只在有悬停能力的精确指针上
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const items = cells.map((c) => c.querySelector<HTMLElement>('[data-dock-item]')!);
  const reset = () => items.forEach((i) => (i.style.transform = ''));
  const onMove = (e: PointerEvent) => {
    if (!fine.matches || reduce.matches || e.pointerType !== 'mouse') return;
    const extras = cells.map((c) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      return Math.min(Math.max(REACH - d, 0), MAX_EXTRA);
    });
    const total = extras.reduce((a, b) => a + b, 0);
    let left = 0;
    items.forEach((el, i) => {
      const shift = left + extras[i] / 2 - total / 2;
      el.style.transform = `translateX(${shift}px) scale(${(BASE + extras[i]) / BASE})`;
      left += extras[i];
    });
  };
  list.addEventListener('pointermove', onMove);
  list.addEventListener('pointerleave', reset);

  // 滚到页脚时降低不透明度，避免与页脚链接重叠
  const footer = document.querySelector('.site-footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => dock.classList.toggle('is-low', e.isIntersecting), { threshold: 0.1 }).observe(footer);
  }
}
