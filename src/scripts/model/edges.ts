/** 模型画布的连线：按两节点相对位置选左右或上下的端口，画三次贝塞尔曲线，标签放中点 */
export function layoutEdges(svg: SVGSVGElement, world: HTMLElement): void {
  const box = (id: string) => {
    const n = world.querySelector<HTMLElement>(`[data-node="${id}"]`)!;
    const x = parseFloat(n.style.left), y = parseFloat(n.style.top);
    return { x, y, w: n.offsetWidth, h: n.offsetHeight, cx: x + n.offsetWidth / 2, cy: y + n.offsetHeight / 2 };
  };
  for (const g of svg.querySelectorAll<SVGGElement>('[data-edge]')) {
    const a = box(g.dataset.from!), b = box(g.dataset.to!);
    const dx = b.cx - a.cx, dy = b.cy - a.cy;
    let d: string;
    if (Math.abs(dx) - (a.w + b.w) / 4 > Math.abs(dy) - (a.h + b.h) / 4) {
      const s = Math.sign(dx) || 1;
      const p0 = { x: s > 0 ? a.x + a.w : a.x, y: a.cy };
      const p1 = { x: s > 0 ? b.x : b.x + b.w, y: b.cy };
      const m = Math.max(30, Math.abs(p1.x - p0.x) / 2);
      d = `M${p0.x},${p0.y} C${p0.x + m * s},${p0.y} ${p1.x - m * s},${p1.y} ${p1.x},${p1.y}`;
    } else {
      const s = Math.sign(dy) || 1;
      const p0 = { x: a.cx, y: s > 0 ? a.y + a.h : a.y };
      const p1 = { x: b.cx, y: s > 0 ? b.y : b.y + b.h };
      const m = Math.max(24, Math.abs(p1.y - p0.y) / 2);
      d = `M${p0.x},${p0.y} C${p0.x},${p0.y + m * s} ${p1.x},${p1.y - m * s} ${p1.x},${p1.y}`;
    }
    const path = g.querySelector('path')!;
    path.setAttribute('d', d);
    const mid = path.getPointAtLength(path.getTotalLength() / 2);
    const text = g.querySelector('text')!;
    text.setAttribute('x', String(mid.x));
    text.setAttribute('y', String(mid.y + 3));
  }
}
