// Motion presets — batch 1. Pairs with reveal.css; see the header there for the markup API.
// Usage: import { initMotion } from '<path>/toolkit/motion/presets/reveal'; initMotion();
// Safe to call again after content changes (already-prepared elements are skipped).

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- line splitting ---------- */

function splitLines(el: HTMLElement) {
  if (el.dataset.tkSplit) return;
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text.trim());
  // 1. wrap words to measure where lines break
  el.innerHTML = text
    .split(/(\s+)/)
    .map((w) => (/^\s+$/.test(w) ? w : `<span class="tk-w">${w.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)}</span>`))
    .join('');
  const words = [...el.querySelectorAll<HTMLElement>('.tk-w')];
  const lines: string[][] = [];
  let top: number | null = null;
  for (const w of words) {
    if (top === null || Math.abs(w.offsetTop - top) > 2) { lines.push([]); top = w.offsetTop; }
    lines[lines.length - 1].push(w.textContent ?? '');
  }
  // 2. rebuild as masked lines
  el.innerHTML = lines
    .map((ws, i) => `<span class="tk-line" aria-hidden="true"><span class="tk-line__in" style="--i:${i}">${ws.join(' ')}</span></span>`)
    .join('');
  el.dataset.tkSplit = '1';
}

/* ---------- scramble ---------- */

const GLYPHS = '#%&*+<>/=?@$01';

function scramble(el: HTMLElement) {
  const final = el.dataset.tkFinal ?? el.textContent ?? '';
  el.dataset.tkFinal = final;
  const dur = Number(el.dataset.duration ?? 800);
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const settled = Math.floor(p * final.length);
    el.textContent = [...final]
      .map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

/* ---------- blinds / marquee / svg prep ---------- */

function prepBlinds(el: HTMLElement) {
  if (el.querySelector('.tk-blinds')) return;
  const n = Number(el.dataset.stripes ?? 8);
  const box = document.createElement('div');
  box.className = 'tk-blinds';
  box.innerHTML = Array.from({ length: n }, (_, i) => `<span style="--i:${i}"></span>`).join('');
  el.append(box);
}

function prepMarquee(el: HTMLElement) {
  if (el.querySelector('.tk-marquee__track')) return;
  const track = document.createElement('div');
  track.className = 'tk-marquee__track';
  const items = [...el.childNodes];
  const group = document.createElement('div');
  group.style.display = 'flex';
  group.append(...items);
  const copy = group.cloneNode(true) as HTMLElement;
  copy.setAttribute('aria-hidden', 'true');
  track.append(group, copy);
  el.append(track);
  const speed = Number(el.dataset.speed ?? 60); // px per second
  requestAnimationFrame(() => el.style.setProperty('--tk-marquee-dur', `${group.offsetWidth / speed}s`));
}

function prepSvg(svg: SVGSVGElement) {
  svg.querySelectorAll('path, line, polyline, polygon, circle, rect, ellipse').forEach((s, i) => {
    s.setAttribute('pathLength', '1');
    (s as SVGElement).style.setProperty('--i', String(i));
  });
}

/* ---------- parallax fallback (no scroll-driven animations) ---------- */

let parallaxEls: HTMLElement[] = [];
let parallaxBound = false;
const pxShift = new WeakMap<HTMLElement, number>();
function parallaxFallback() {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const r = el.getBoundingClientRect();
    const top = r.top - (pxShift.get(el) ?? 0); // untransformed position, so the shift never feeds back
    const p = (top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1 across the viewport
    const k = Number(el.dataset.parallax || 0.15);
    const shift = Math.max(-1, Math.min(1, p)) * k * 0.6 * vh;
    pxShift.set(el, shift);
    el.style.transform = `translateY(${shift.toFixed(1)}px)`;
  }
}

/* ---------- init ---------- */

let io: IntersectionObserver | null = null;
const watched = new Map<Element, HTMLElement[]>();

export function initMotion(root: ParentNode = document) {
  const stagger = (sel: string) => {
    // auto-index siblings that share a parent so groups stagger without manual --i
    const byParent = new Map<Element, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      if (el.style.getPropertyValue('--i')) return;
      const list = byParent.get(el.parentElement!) ?? [];
      list.push(el);
      byParent.set(el.parentElement!, list);
    });
    byParent.forEach((list) => list.forEach((el, i) => el.style.setProperty('--i', String(i))));
  };

  root.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach(splitLines);
  root.querySelectorAll<HTMLElement>('[data-reveal="blinds"]').forEach(prepBlinds);
  root.querySelectorAll<HTMLElement>('[data-marquee]').forEach(prepMarquee);
  root.querySelectorAll<SVGSVGElement>('svg[data-draw]').forEach(prepSvg);
  stagger('[data-reveal="fade-up"], [data-reveal="clip"]');

  const targets = root.querySelectorAll<HTMLElement>('[data-reveal], [data-draw], [data-scramble]');
  if (reduced()) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    // Chrome counts a target's own clip-path in IntersectionObserver, so an element that starts
    // fully clipped (data-reveal="clip") never "intersects". Watch its parent instead.
    io ??= new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const els = watched.get(e.target) ?? [];
        for (const el of els) {
          el.classList.add('is-in');
          if (el.hasAttribute('data-scramble')) scramble(el);
        }
        if (els.every((el) => el.dataset.once !== 'false')) { io!.unobserve(e.target); watched.delete(e.target); }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
    targets.forEach((el) => {
      const cp = getComputedStyle(el).clipPath;
      const watch = cp && cp !== 'none' && el.parentElement ? el.parentElement : el;
      const list = watched.get(watch) ?? [];
      if (!list.includes(el)) list.push(el);
      watched.set(watch, list);
      io!.observe(watch);
    });
  }

  const px = [...root.querySelectorAll<HTMLElement>('[data-parallax]')];
  px.forEach((el) => el.style.setProperty('--tk-parallax', el.dataset.parallax || '0.15'));
  // view() binds to the nearest scroll container. An ancestor with overflow hidden/auto/scroll
  // is one even if it never scrolls, so the CSS timeline would freeze: drive those from JS.
  // (Use overflow: clip on wrappers to keep the CSS path.)
  const sda = CSS.supports('animation-timeline: view()');
  const inScroller = (el: HTMLElement) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const { overflowX, overflowY } = getComputedStyle(a);
      if (/(hidden|auto|scroll)/.test(overflowX + overflowY)) return true;
    }
    return false;
  };
  const jsPx = px.filter((el) => !sda || inScroller(el));
  jsPx.forEach((el) => el.setAttribute('data-parallax-js', ''));
  if (!reduced() && jsPx.length) {
    parallaxEls = [...new Set([...parallaxEls, ...jsPx])];
    if (!parallaxBound) {
      parallaxBound = true;
      let raf = 0;
      const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(parallaxFallback); };
      addEventListener('scroll', on, { passive: true });
      addEventListener('resize', on);
    }
    parallaxFallback();
  }
}
