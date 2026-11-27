// Motion presets — batch 2: page composition. Pairs with compose.css.
// Usage: import { initCompose } from '<path>/toolkit/motion/presets/compose'; initCompose();

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- index nav ---------- */

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

function initIndex(nav: HTMLElement) {
  if (nav.dataset.tkReady) return;
  nav.dataset.tkReady = '1';
  const scope = (nav.dataset.index && document.querySelector(nav.dataset.index)) || document;
  const sections = [...scope.querySelectorAll<HTMLElement>('[data-index-title]')];
  if (!sections.length) return;
  const roman = nav.dataset.numbers === 'roman';
  sections.forEach((s, i) => { if (!s.id) s.id = `tk-sec-${i + 1}`; });
  nav.innerHTML =
    sections.map((s, i) => `<a href="#${s.id}" style="--i:${i}"><span>${roman ? ROMAN[i] ?? i + 1 : String(i + 1).padStart(2, '0')}</span><span></span></a>`).join('') +
    '<div class="tk-index__bar"><i></i></div>';
  nav.querySelectorAll('a').forEach((a, i) => { (a.lastElementChild as HTMLElement).textContent = sections[i].dataset.indexTitle ?? ''; });
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];
  requestAnimationFrame(() => nav.classList.add('is-in'));

  const update = () => {
    const mid = window.innerHeight * 0.4;
    let active = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) active = i; });
    links.forEach((l, i) => l.classList.toggle('is-active', i === active));
    const first = sections[0].getBoundingClientRect().top + scrollY;
    const last = sections[sections.length - 1];
    const end = last.getBoundingClientRect().bottom + scrollY - window.innerHeight;
    const p = Math.min(1, Math.max(0, (scrollY - first + mid) / Math.max(1, end - first + mid)));
    nav.style.setProperty('--tk-progress', p.toFixed(3));
  };
  let raf = 0;
  addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', update);
  update();
}

/* ---------- project browser ---------- */

function initRows(list: HTMLElement) {
  list.querySelectorAll('.tk-project__strip').forEach((strip) =>
    strip.querySelectorAll<HTMLElement>('img').forEach((img, i) => img.style.setProperty('--i', String(i))));
}

function initLens(list: HTMLElement) {
  const col = list.querySelector<HTMLElement>('.tk-lens__col');
  const name = list.querySelector<HTMLElement>('.tk-lens__name');
  const meta = list.querySelector<HTMLElement>('.tk-lens__meta');
  if (!col) return;
  const items = [...col.querySelectorAll<HTMLElement>('.tk-project')];
  let current = -1;
  const pick = () => {
    const c = col.getBoundingClientRect();
    const mid = c.top + c.height / 2;
    let best = 0, dist = Infinity;
    items.forEach((it, i) => {
      const r = it.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    if (best === current) return;
    current = best;
    items.forEach((it, i) => it.classList.toggle('is-active', i === best));
    const it = items[best];
    if (name) name.innerHTML = '';
    if (name) { const b = document.createElement('b'); b.textContent = it.dataset.name ?? ''; name.append(b, document.createTextNode(it.dataset.tags ?? '')); }
    if (meta) meta.textContent = `${it.dataset.meta ?? ''}  ${String(best + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };
  let raf = 0;
  col.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pick); }, { passive: true });
  col.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = items[Math.min(items.length - 1, Math.max(0, current + (e.key === 'ArrowDown' ? 1 : -1)))];
    next?.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
  });
  pick();
}

/* ---------- entry ---------- */

export function showEntry(opts: { text?: string; force?: boolean } = {}) {
  const KEY = 'tk-entry-seen';
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* storage blocked */ }
  if ((seen && !opts.force) || reduced()) return;
  try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
  const text = opts.text ?? document.querySelector<HTMLElement>('[data-entry]')?.dataset.entry ?? '';
  const el = document.createElement('div');
  el.className = 'tk-entry';
  el.setAttribute('role', 'presentation');
  const cols = Number(getComputedStyle(document.documentElement).getPropertyValue('--grid-cols')) || 12;
  el.style.setProperty('--tk-entry-cols', String(cols));
  el.innerHTML = `<div class="tk-entry__lines">${Array.from({ length: cols }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
    <div class="tk-entry__mark"></div><button class="tk-entry__skip" type="button">Skip</button>`;
  const mark = el.querySelector('.tk-entry__mark')!;
  [...text].forEach((ch, i) => { const s = document.createElement('span'); s.textContent = ch === ' ' ? ' ' : ch; s.style.setProperty('--i', String(i)); mark.append(s); });
  document.body.append(el);
  const close = () => { el.classList.add('is-out'); setTimeout(() => el.remove(), 1000); removeEventListener('keydown', onKey); };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  addEventListener('keydown', onKey);
  el.querySelector('button')!.addEventListener('click', close);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
  setTimeout(close, Number(document.querySelector<HTMLElement>('[data-entry]')?.dataset.entryDuration ?? 1800));
}

/* ---------- cursor ---------- */

let cursor: HTMLElement | null = null;
function initCursor() {
  if (cursor || !finePointer() || !document.querySelector('[data-cursor]')) return;
  cursor = document.createElement('div');
  cursor.className = 'tk-cursor is-hidden';
  cursor.innerHTML = '<span></span>';
  document.body.append(cursor);
  let x = -100, y = -100, cx = x, cy = y;
  const follow = reduced() ? 1 : 0.22;
  // Label and lens state come from whatever is under the pointer. Re-check on scroll too:
  // the page moves under a still pointer and pointermove does not fire.
  const sync = () => {
    const under = document.elementFromPoint(x, y);
    const t = under?.closest('[data-cursor]') as HTMLElement | null;
    const label = t?.dataset.cursor ?? '';
    cursor!.classList.toggle('is-label', !!label);
    cursor!.classList.toggle('is-lens', !!under?.closest('[data-lens]'));
    cursor!.firstElementChild!.textContent = label;
  };
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    cursor!.classList.remove('is-hidden');
    sync();
  });
  addEventListener('scroll', () => { if (x >= 0) sync(); }, { passive: true });
  document.addEventListener('pointerleave', () => cursor!.classList.add('is-hidden'));
  const loop = () => {
    cx += (x - cx) * follow; cy += (y - cy) * follow;
    cursor!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
}

function initLensImage(el: HTMLElement) {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
}

/* ---------- init ---------- */

export function initCompose(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-index]').forEach(initIndex);
  root.querySelectorAll<HTMLElement>('.tk-projects[data-variant="rows"]').forEach(initRows);
  root.querySelectorAll<HTMLElement>('.tk-projects[data-variant="lens"]').forEach(initLens);
  root.querySelectorAll<HTMLElement>('[data-lens]').forEach(initLensImage);
  if (document.querySelector('[data-entry]')) showEntry();
  initCursor();
}
