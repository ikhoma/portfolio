# 001 — Colour module is built last

- **Status:** Accepted
- **Date:** 2026-11-27
- **Decided by:** Ivan

## Context
The toolkit is growing towards the four areas of Obys' Design Education Series:
typography, colour, grids, motion. Grids (v1) and motion (batch 2) exist; typography and colour do not.

The toolkit is piloted on the portfolio, and the portfolio does not need colour work:
each case already has a fixed palette (Emagine, Chelsea — see the repo's `CLAUDE.md`).
Colour tooling becomes useful later, in product development (apps, client sites).

## Decision
Build the colour module **after all other modules**. Typography goes next.

## Already gathered for when it starts
- **Theory — Johannes Itten, *The Art of Color*.** Ivan has the Ukrainian edition; take terms from it
  (photos of the key pages). Use: the seven colour contrasts as the vocabulary for describing a palette,
  the 12-part colour wheel and its harmonies (two-, three-, four-colour chords) for generating palettes,
  Goethe's light values for proportions of colour area.
  Only the Ukrainian print edition is used; no unlicensed PDFs.
- **Method — Obys, [Colors Combinations](https://colors.combinations.obys.agency/)** and the
  [season 02 course](https://des.obys.agency/colors-combinations/): palettes taken from photographs
  (a base tone + three supporting colours), each colour given a function in the project.
- **Planned scope** (proposal, to be confirmed when the module starts):
  1. `COLOR.md` — Itten's contrasts and harmonies, the Obys method, WCAG rules;
  2. role tokens (background, text, muted, accent, panel), seeded from the Emagine and Chelsea palettes;
  3. dev-panel checks: WCAG text contrast, share of screen area taken by the accent;
  4. palette tool: photo or base colour → candidates from Itten's harmonies → scored against the contrasts.

## Consequences
- Contrast checks stay out of the portfolio work for now; the `quality/` module keeps the a11y basics.
- Revisit when the toolkit is first used for an app or client product.
