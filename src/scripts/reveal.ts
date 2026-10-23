/**
 * 滚动揭示：带 [data-reveal] 的元素进入视口时加上 .is-in，由 motion.css 淡入并上移 12px。
 * 只播一次（IntersectionObserver once，margin -100px）；只在首页使用；
 * 不支持 IntersectionObserver 时直接显示。
 */
export function initReveal(root: ParentNode = document): void {
  const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')];
  if (!els.length) return;
  document.documentElement.classList.add('reveal-ready');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -100px 0px', threshold: 0 },
  );
  els.forEach((el) => io.observe(el));
}
