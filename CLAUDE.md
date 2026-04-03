# Portfolio — Claude Instructions

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (`@import "tailwindcss"` in index.css, no config file)
- React Router DOM 7
- Global font: **Manrope** (set via `* { font-family: 'Manrope', sans-serif }` in index.css)

## Project Structure

- `src/pages/` — page components (Home, About, cases/Chelsea, cases/Emagine, cases/Fiba, cases/Jack)
- `src/components/` — shared components (BackButton, Chip, FooterCTA, LeftRail)
- `src/assets/images.ts` — all image URL exports (Figma MCP asset URLs)

## Figma-to-Code Workflow

### Always fetch fresh before implementing

**Before implementing any Figma design, call `get_design_context` on the target node first.** Never implement from a saved plan, old notes, or previously extracted URLs — Figma asset URLs expire after 7 days and layout details from memory are unreliable.

```
get_design_context(nodeId, fileKey) → read the output → then implement
```

### If the node is too large

`get_design_context` may return metadata-only with a message about the node being too large. In that case, call it on individual section sub-nodes instead of the root frame.

### Image URL discipline

- All image URLs live in `src/assets/images.ts` as named exports
- When rebuilding a page, replace the old URL block with fresh URLs from the latest `get_design_context` call
- Add a comment with the fetch date: `// fetched YYYY-MM-DD, valid 7 days`
- Never guess or invent Figma asset URLs

### Reading the Figma output faithfully

When Figma outputs reference code, treat it as the source of truth:

- **Exact pixel values** — use the exact `px` values from Figma (`gap-[32px]`, `h-[848px]`, `text-[72px]`), not rounded approximations
- **Layout structure** — if two sections appear in the same column in Figma, keep them in the same column (don't split into separate `<section>` tags)
- **Absolute positioning** — if screenshots are positioned absolutely over a background panel in Figma, replicate that; don't simplify to `object-cover` in a plain container
- **Empty nodes** — if Figma has an empty div (e.g. a 744px blank rectangle), include it as an empty div to preserve spacing
- **Heading sizes** — each heading may have a different size (e.g. "Impact" at 80px vs other headings at 72px); always check the specific node
- **Element order** — chips may be below the title, not above; always verify from the Figma output

### Fonts

Figma designs use "Atyp Display" and "Chelsea Basis" — neither is available. The global fallback is **Manrope** (already set). Use it for display text. Inter is used for body text in Emagine designs; it's available as a system font.

### Colors (Emagine)

- Background: `#3b3c37`
- Accent / headings: `#d2ff50`
- Button accent: `#bdff00`
- Dark panel: `#494b44` / `#494a44`
- Muted text: `#a9a9a9`, `#a4a4a0`, `#cdcdc9`

### Colors (Chelsea)

- Background: `#101010`
- Accent: `#D2FF50`
- Cards: `#2C2A26`

## Do Not

- Don't modify `FooterCTA`, `Chip`, `BackButton` for one-off page needs — inline the styles instead
- Don't add sections, copy, or metrics that aren't in the Figma design
- Don't use `clamp()` for font sizes unless the Figma design is clearly responsive — most case study pages are fixed-width (1400px)
