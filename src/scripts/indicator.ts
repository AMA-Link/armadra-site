/**
 * 当前项指示器：一个元素平移到当前项；鼠标悬停或键盘聚焦到别的项时平移过去预览，离开后回到当前项。
 * 容器标 data-indicator-root、data-axis="x|y"、data-item="选择器"，内含一个 [data-indicator]，
 * 容器需 position: relative（指示器按 offsetLeft / offsetTop 定位）。位置用 transform，尺寸直接设置。
 */
function init(root: HTMLElement): void {
  const ind = root.querySelector<HTMLElement>('[data-indicator]');
  const sel = root.dataset.item;
  if (!ind || !sel) return;
  const axis = root.dataset.axis === 'y' ? 'y' : 'x';
  const items = [...root.querySelectorAll<HTMLElement>(sel)];
  const current = () => items.find((i) => i.hasAttribute('aria-current')) ?? null;

  const place = (el: HTMLElement | null, animate: boolean) => {
    if (!el) {
      ind.style.opacity = '0';
      return;
    }
    if (!animate) ind.style.transition = 'none';
    if (axis === 'x') {
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
    } else {
      ind.style.height = `${el.offsetHeight}px`;
      ind.style.transform = `translateY(${el.offsetTop}px)`;
    }
    ind.style.opacity = '1';
    if (!animate) {
      void ind.offsetWidth;
      ind.style.transition = '';
    }
  };

  const rest = () => place(current(), true);
  place(current(), false);
  for (const it of items) {
    it.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') place(it, true);
    });
    it.addEventListener('focus', () => place(it, true));
    it.addEventListener('blur', rest);
  }
  root.addEventListener('pointerleave', rest);
  // 当前项由页面脚本改变时（如本页目录跟随滚动）派发此事件
  root.addEventListener('indicator:update', rest);
  // 字体加载、语言切换与窗口缩放会改变项的尺寸：直接重新定位
  const refresh = () => place(current(), false);
  new ResizeObserver(refresh).observe(root);
  document.addEventListener('armadra:lang', refresh);
  document.fonts?.ready.then(refresh);
}

export function initIndicators(): void {
  document.querySelectorAll<HTMLElement>('[data-indicator-root]').forEach(init);
}
