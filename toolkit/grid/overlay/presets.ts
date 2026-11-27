// Grid presets for the dev overlay.
// Each preset describes up to four independent layers, mirroring how layout grids
// stack in Figma: columns, rows, a square (8px) grid and the Van de Graaf canon.

export type LayerId = 'columns' | 'rows' | 'square' | 'canon';

export interface Viewport {
  width: number;
  height: number;
}

export interface ColumnsSpec {
  count: number;
  gutter: number;
  /** Outer margin (padding) inside the container. */
  margin: number;
  /** Optional max container width; the container is centred. */
  maxWidth?: number;
}

export interface RowsSpec {
  count: number;
  gutter: number;
  margin: number;
  /** Fixed row height. Omit to stretch rows to fill the viewport height. */
  size?: number;
}

export interface CanonSpec {
  /** Two-page spread construction (whole canvas + each half), as in Symvol Lab. */
  spread: boolean;
  /**
   * How many generations of power lines to draw. Generation 1 = lines through
   * the intersections of the diagonals (Ivan's Figma canon). Each next
   * generation runs lines through where the previous lines cross the diagonals.
   */
  depth: number;
  /** Stop at lines closer than this to an edge, in px (Obys: 40–100). */
  minMargin: number;
}

export interface Preset {
  id: string;
  label: string;
  /** Layers switched on when this preset is picked. */
  defaults: LayerId[];
  columns?: (vp: Viewport) => ColumnsSpec;
  rows?: (vp: Viewport) => RowsSpec;
  square?: { size: number };
  canon?: CanonSpec;
}

const px = (value: string, fallback: number) => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
};

/** Reads a CSS custom property from the first matching element (or :root). */
const cssVar = (name: string, selector: string, fallback: number) => {
  const el = document.querySelector(selector) ?? document.documentElement;
  return px(getComputedStyle(el).getPropertyValue(name), fallback);
};

// Generation 1 reproduces Ivan's GoldenCanonGrid: x 1/6…5/6, y 1/4…3/4.
const canonLines: CanonSpec = { spread: true, depth: 1, minMargin: 40 };

export const presets: Preset[] = [
  {
    // The portfolio's own case-study grid. Reads the live CSS tokens from
    // src/styles/case.css, so the overlay follows the 12 / 8 / 4 breakpoints.
    id: 'portfolio',
    label: 'Portfolio (12/8/4)',
    defaults: ['columns'],
    columns: () => ({
      count: cssVar('--grid-cols', '.case-page', 12),
      gutter: cssVar('--grid-gutter', '.case-page', 20),
      margin: cssVar('--grid-pad', '.case-page', 80),
      maxWidth: 1600,
    }),
    square: { size: 8 },
    canon: canonLines,
  },
  {
    // Symvol Lab (Figma): 4 columns / 60 gutter / 30 margin, 6 rows / 60 / 30,
    // an 8px square grid and the GoldenCanonGrid component.
    id: 'symvol',
    label: 'Symvol Lab',
    defaults: ['columns', 'rows', 'canon'],
    columns: () => ({ count: 4, gutter: 60, margin: 30 }),
    // In Figma the rows are 120px on a 1080px frame, which fills the height
    // exactly. Stretching keeps that fit on any viewport height.
    rows: () => ({ count: 6, gutter: 60, margin: 30 }),
    square: { size: 8 },
    canon: canonLines,
  },
];
