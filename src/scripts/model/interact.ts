/**
 * 软件模型里的小功能：菜单、权限请求、缩放、白板工具、抽屉、提交、侧栏切换、评论钉。
 * 只改模型自己的 DOM，不请求网络。文字都在 SSR 里以中英两份写好，这里只切换显隐。
 */
import { layoutEdges } from './edges';

const ZOOMS = [0.5, 0.67, 0.8, 1, 1.25, 1.5];

export function initModel(model: HTMLElement): void {
  if (model.dataset.ready) return;
  model.dataset.ready = '';
  const stage = model.querySelector<HTMLElement>('[data-model-stage]')!;
  const world = model.querySelector<HTMLElement>('[data-model-world]')!;
  const svg = model.querySelector<SVGSVGElement>('[data-model-edges]')!;
  const relayout = () =>
    requestAnimationFrame(() => {
      layoutEdges(svg, world);
      model.dispatchEvent(new CustomEvent('model:layout'));
    });

  // 等比缩放：设计尺寸 1200 宽，容器更窄时整体缩小
  const fit = () => {
    const w = model.clientWidth;
    if (!model.dataset.camera) model.style.setProperty('--model-k', String(Math.min(1, w / 1200)));
  };
  new ResizeObserver(fit).observe(model);
  fit();

  const closeMenus = (except?: Element) => {
    model.querySelectorAll<HTMLElement>('[data-model-menu][aria-expanded="true"]').forEach((b) => {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      (b.nextElementSibling as HTMLElement).hidden = true;
    });
    const pinPop = model.querySelector<HTMLElement>('[data-model-pin-pop]');
    if (pinPop && except !== pinPop) pinPop.hidden = true;
  };

  let zoom = 3;
  const setZoom = (i: number) => {
    zoom = Math.max(0, Math.min(ZOOMS.length - 1, i));
    world.style.setProperty('--world-k', String(ZOOMS[zoom]));
    model.querySelector('[data-model-zoom-label]')!.textContent = `${Math.round(ZOOMS[zoom] * 100)}%`;
  };

  model.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('button, label, input')) model.dataset.free = '';
    const btn = el.closest<HTMLElement>('button');

    const menuBtn = el.closest<HTMLElement>('[data-model-menu]');
    if (menuBtn) {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      closeMenus(menuBtn);
      menuBtn.setAttribute('aria-expanded', String(open));
      const pop = menuBtn.nextElementSibling as HTMLElement;
      pop.hidden = !open;
      if (open) pop.querySelector<HTMLElement>('[role="menuitem"]')?.focus({ preventScroll: true });
      return;
    }
    if (el.closest('[role="menuitem"]')) {
      closeMenus();
      return;
    }

    if (el.closest('[data-model-pin]')) {
      const pop = model.querySelector<HTMLElement>('[data-model-pin-pop]')!;
      const show = pop.hidden;
      closeMenus(pop);
      pop.hidden = !show;
      return;
    }

    if (el.closest('[data-model-allow]') || el.closest('[data-model-deny]')) {
      answer(model, !!el.closest('[data-model-allow]'), relayout);
      return;
    }

    if (btn?.matches('[data-model-canvas]')) {
      model.querySelectorAll('[data-model-canvas]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      return;
    }
    if (btn?.matches('[data-model-lock]')) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true'));
      return;
    }
    if (btn?.matches('[data-model-tool]')) {
      model.querySelectorAll('[data-model-tool]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      return;
    }
    if (btn?.matches('[data-model-zoom]')) {
      const d = Number(btn.dataset.modelZoom);
      setZoom(d === 0 ? 3 : zoom + d);
      return;
    }
    if (btn?.matches('[data-model-drawer]')) {
      const name = btn.dataset.modelDrawer!;
      const panel = model.querySelector<HTMLElement>(`[data-model-panel="${name}"]`)!;
      const open = panel.hidden;
      model.querySelectorAll<HTMLElement>('[data-model-panel]').forEach((p) => (p.hidden = true));
      model.querySelectorAll('[data-model-drawer]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      panel.hidden = !open;
      btn.setAttribute('aria-pressed', String(open));
      return;
    }
    if (el.closest('[data-model-close]')) {
      model.querySelectorAll<HTMLElement>('[data-model-panel]').forEach((p) => (p.hidden = true));
      model.querySelectorAll('[data-model-drawer]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      return;
    }
    if (el.closest('[data-model-commit]')) {
      commit(model);
      return;
    }
    if (el.closest('[data-model-reload]')) {
      const page = model.querySelector<HTMLElement>('[data-model-page]')!;
      page.dataset.loading = '';
      setTimeout(() => delete page.dataset.loading, 450);
      return;
    }
    closeMenus();
  });

  model.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenus();
  });
  document.addEventListener('click', (e) => {
    if (!model.contains(e.target as Node)) closeMenus();
  });

  document.fonts?.ready.then(relayout);
  document.addEventListener('armadra:lang', relayout);
  layoutEdges(svg, world);
  void stage;
}

/** 权限请求：允许后继续跑测试；拒绝后停下。几秒后恢复，方便再点一次 */
function answer(model: HTMLElement, allow: boolean, relayout: () => void): void {
  const node = model.querySelector<HTMLElement>('[data-node="claude"]')!;
  const ask = node.querySelector<HTMLElement>('[data-model-ask]')!;
  const term = node.querySelector<HTMLElement>('[data-model-term]')!;
  const caret = term.querySelector('.caret');
  ask.hidden = true;
  const line = (cls: string, src: string) => {
    const tpl = model.querySelector<HTMLTemplateElement>(`template[data-model-line="${src}"]`);
    const p = document.createElement('p');
    p.className = `tl ${cls}`;
    if (tpl) p.append(tpl.content.cloneNode(true));
    term.insertBefore(p, caret);
    const lines = term.querySelectorAll('.tl');
    if (lines.length > 4) lines[0].remove();
  };
  if (allow) {
    node.dataset.status = 'working';
    node.querySelector<HTMLElement>('[data-pill-waiting]')!.hidden = true;
    node.querySelector<HTMLElement>('[data-pill-working]')!.hidden = false;
    line('tl--cmd', 'cmd');
    setTimeout(() => line('tl--ok', 'passed'), 600);
  } else {
    line('tl--warn', 'denied');
  }
  relayout();
  setTimeout(() => {
    node.dataset.status = 'waiting';
    node.querySelector<HTMLElement>('[data-pill-waiting]')!.hidden = false;
    node.querySelector<HTMLElement>('[data-pill-working]')!.hidden = true;
    ask.hidden = false;
    relayout();
  }, 4500);
}

function commit(model: HTMLElement): void {
  const btn = model.querySelector<HTMLElement>('[data-model-commit]')!;
  btn.querySelector<HTMLElement>('[data-commit-idle]')!.hidden = true;
  btn.querySelector<HTMLElement>('[data-commit-done]')!.hidden = false;
  model.querySelector<HTMLElement>('[data-model-scm-files]')!.hidden = true;
  model.querySelector('[data-model-scm-count]')!.textContent = '0';
  model.querySelector('[data-model-scm-badge]')!.textContent = '';
  setTimeout(() => {
    btn.querySelector<HTMLElement>('[data-commit-idle]')!.hidden = false;
    btn.querySelector<HTMLElement>('[data-commit-done]')!.hidden = true;
    model.querySelector<HTMLElement>('[data-model-scm-files]')!.hidden = false;
    model.querySelector('[data-model-scm-count]')!.textContent = '2';
    model.querySelector('[data-model-scm-badge]')!.textContent = '2';
  }, 4000);
}
