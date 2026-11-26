import type { CanonSpec, ColumnsSpec, LayerId, Preset, RowsSpec, Viewport } from './presets';

export const layerColors: Record<LayerId, string> = {
  columns: '#ff3b30',
  rows: '#2f6bff',
  square: '#00c2ff',
  canon: '#4b4bff',
};

const r = (n: number) => Math.round(n * 100) / 100;

function columns(spec: ColumnsSpec, vp: Viewport) {
  const container = Math.min(vp.width, spec.maxWidth ?? Infinity);
  const left = (vp.width - container) / 2 + spec.margin;
  const inner = container - spec.margin * 2;
  const col = (inner - spec.gutter * (spec.count - 1)) / spec.count;
  if (col <= 0) return '';
  const c = layerColors.columns;
  let out = '';
  for (let i = 0; i < spec.count; i++) {
    const x = left + i * (col + spec.gutter);
    out += `<rect x="${r(x)}" y="0" width="${r(col)}" height="${vp.height}" fill="${c}" fill-opacity=".1"/>`;
    out += `<line x1="${r(x)}" y1="0" x2="${r(x)}" y2="${vp.height}" stroke="${c}" stroke-opacity=".5"/>`;
    out += `<line x1="${r(x + col)}" y1="0" x2="${r(x + col)}" y2="${vp.height}" stroke="${c}" stroke-opacity=".5"/>`;
  }
  return out;
}

function rows(spec: RowsSpec, vp: Viewport) {
  const size = spec.size ?? (vp.height - spec.margin * 2 - spec.gutter * (spec.count - 1)) / spec.count;
  if (size <= 0) return '';
  const c = layerColors.rows;
  let out = '';
  for (let i = 0; i < spec.count; i++) {
    const y = spec.margin + i * (size + spec.gutter);
    out += `<rect x="0" y="${r(y)}" width="${vp.width}" height="${r(size)}" fill="${c}" fill-opacity=".08"/>`;
    out += `<line x1="0" y1="${r(y)}" x2="${vp.width}" y2="${r(y)}" stroke="${c}" stroke-opacity=".5"/>`;
    out += `<line x1="0" y1="${r(y + size)}" x2="${vp.width}" y2="${r(y + size)}" stroke="${c}" stroke-opacity=".5"/>`;
  }
  return out;
}

function square(size: number) {
  const c = layerColors.square;
  return (
    `<defs><pattern id="go-sq" width="${size}" height="${size}" patternUnits="userSpaceOnUse">` +
    `<path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${c}" stroke-opacity=".18"/></pattern></defs>` +
    `<rect width="100%" height="100%" fill="url(#go-sq)"/>`
  );
}

type Seg = [number, number, number, number];

/** Construction lines (diagonals) of the canon, in 0..1 space. */
export function canonDiagonals(spread: boolean): Seg[] {
  const s: Seg[] = [
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];
  if (spread) {
    s.push(
      // diagonals of each page
      [0, 0, 0.5, 1], [0, 1, 0.5, 0],
      [0.5, 0, 1, 1], [0.5, 1, 1, 0],
      // diamond through the mid-points
      [0, 0.5, 0.5, 0], [0, 0.5, 0.5, 1],
      [0.5, 0, 1, 0.5], [0.5, 1, 1, 0.5],
    );
  }
  return s;
}

const EPS = 1e-6;

function intersect([x1, y1, x2, y2]: Seg, [x3, y3, x4, y4]: Seg): [number, number] | null {
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(d) < EPS) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;
  if (t < -EPS || t > 1 + EPS || u < -EPS || u > 1 + EPS) return null;
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
}

export interface CanonGeneration {
  xs: number[];
  ys: number[];
}

/**
 * Power lines by generation (fractions of width / height).
 * Gen 1: verticals + horizontals through the diagonals' own intersections.
 * Gen n+1: through the points where gen n lines cross the diagonals.
 * Lines closer than minMargin px to an edge are dropped (and not grown further).
 */
export function canonGenerations(spec: CanonSpec, vp: Viewport): CanonGeneration[] {
  const diag = canonDiagonals(spec.spread);
  const seenX: number[] = [];
  const seenY: number[] = [];
  const has = (list: number[], v: number) => list.some((x) => Math.abs(x - v) < EPS);
  const okX = (x: number) => Math.min(x, 1 - x) * vp.width >= spec.minMargin;
  const okY = (y: number) => Math.min(y, 1 - y) * vp.height >= spec.minMargin;

  const collect = (points: [number, number][]): CanonGeneration => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (const [x, y] of points) {
      if (okX(x) && !has(seenX, x) && !has(xs, x)) xs.push(x);
      if (okY(y) && !has(seenY, y) && !has(ys, y)) ys.push(y);
    }
    seenX.push(...xs);
    seenY.push(...ys);
    return { xs: xs.sort((a, b) => a - b), ys: ys.sort((a, b) => a - b) };
  };

  const pts: [number, number][] = [];
  for (let i = 0; i < diag.length; i++) {
    for (let j = i + 1; j < diag.length; j++) {
      const p = intersect(diag[i], diag[j]);
      if (p) pts.push(p);
    }
  }
  const gens = [collect(pts)];

  while (gens.length < spec.depth) {
    const prev = gens[gens.length - 1];
    const lines: Seg[] = [...prev.xs.map((x): Seg => [x, 0, x, 1]), ...prev.ys.map((y): Seg => [0, y, 1, y])];
    const next: [number, number][] = [];
    for (const l of lines) for (const d of diag) {
      const p = intersect(l, d);
      if (p) next.push(p);
    }
    const gen = collect(next);
    if (!gen.xs.length && !gen.ys.length) break;
    gens.push(gen);
  }
  return gens;
}

const GEN_STYLE = [
  'stroke-opacity="1"',
  'stroke-opacity=".5" stroke-dasharray="6 4"',
  'stroke-opacity=".3" stroke-dasharray="2 4"',
];

function canon(spec: CanonSpec, vp: Viewport) {
  const c = layerColors.canon;
  const W = vp.width;
  const H = vp.height;
  let out = canonDiagonals(spec.spread)
    .map(([x1, y1, x2, y2]) =>
      `<line x1="${r(x1 * W)}" y1="${r(y1 * H)}" x2="${r(x2 * W)}" y2="${r(y2 * H)}" stroke="${c}" stroke-opacity=".55"/>`)
    .join('');
  canonGenerations(spec, vp).forEach((g, i) => {
    const style = GEN_STYLE[Math.min(i, GEN_STYLE.length - 1)];
    for (const x of g.xs) out += `<line x1="${r(x * W)}" y1="0" x2="${r(x * W)}" y2="${H}" stroke="${c}" ${style}/>`;
    for (const y of g.ys) out += `<line x1="0" y1="${r(y * H)}" x2="${W}" y2="${r(y * H)}" stroke="${c}" ${style}/>`;
  });
  return out;
}

export function renderSvg(preset: Preset, layers: Record<LayerId, boolean>, vp: Viewport) {
  let body = '';
  if (layers.square && preset.square) body += square(preset.square.size);
  if (layers.columns && preset.columns) body += columns(preset.columns(vp), vp);
  if (layers.rows && preset.rows) body += rows(preset.rows(vp), vp);
  if (layers.canon && preset.canon) body += canon(preset.canon, vp);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${vp.width}" height="${vp.height}" viewBox="0 0 ${vp.width} ${vp.height}" shape-rendering="crispEdges">${body}</svg>`;
}
