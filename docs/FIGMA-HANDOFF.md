# Figma handoff (read before Step 6)

Trimmed from the old `PAPER-MCP.md`. Paper is no longer used: its free MCP limit ran out on 2026-11-06 (D-12). The untrimmed Paper-era notes are in `archive/paper-era/PAPER-MCP.md` (git-ignored). Do not use Paper tools.

Step 6 of `REORGANIZATION-PLAN.md` (D-19) regenerates the design HTML from the finished site and re-captures it into Figma. This file holds what that step needs.

## 1. What is stale

The Figma frames and everything in `design-source/` were built from earlier reference numbers. Compared with the site (D-10, D-11) they differ in:
- palette: they use paper `#F3F1EA`, primary `#2D3FA6`, ink `#12130F`; the site uses `#F5F1E8`, `#213F89`, `#111`
- container: they use 1180 px with gutters 20 / 32 / 48; the site uses a 1084 px column with gutters 20 / 32
- type scale: fixed per-breakpoint sizes (h1 123, h2 64, 1180 container); the site is fluid
- reel tiles: fixed heights; the site uses 9:14 tiles

`design-source/tokens.css` and `tokens.json` (42 tokens) carry the old values. The generator `design-source/scripts/gen-responsive.mjs` still has the old palette hard-coded.

## 2. Figma file and frames

- File: "Lumen & Co. - Portfolio", key `RRm7sOaYLwqevFsApSrMcZ` (https://www.figma.com/design/RRm7sOaYLwqevFsApSrMcZ). Plan: Starter, full seat.
- Current page frames (captured 2026-11-06 from the then-current generator):

| Frame | Node id | Size |
|---|---|---|
| Desktop 1280 v2 | `19:2` | 1280 x 8566 |
| Tablet 768 v2 | `20:2` | 768 x 9360 |
| Mobile 375 v2 | `22:2` | 375 x 11555 |
| Mobile 375 menu open v2 | `21:2` | 375 x 11920 |
| States and motion 1280 | `17:2` | 1280 x 4912 |

- Older frames, kept: Desktop 1280 (v1) `1:2`, Tablet 768 (v1) `3:2`, Mobile 375 (v1) `4:2`. Ids `8:2`, `9:2`, `10:2`, `11:2` no longer exist.
- All frames have 0 image fills (placeholder shapes only). Fonts: Bricolage Grotesque, Inter, Instrument Serif (italic accent).
- Not verified: the Figma frames were checked by node counts and a few screenshots, not by a pixel diff against the page. Live-motion states are not wired as Figma prototype interactions. Closed FAQ answers exist in the frames as 0-height clipped nodes.
- The Figma MCP can write: `use_figma` (Plugin API JS), `generate_figma_design` (HTML page to editable layers), `create_new_file`. Load the skill `figma-use` before `use_figma`. Starter-plan reads may be quota-limited; writes were not.

## 3. Capture pipeline (code to Figma)

1. Regenerate the design HTML: `cd design-source/scripts; node gen-responsive.mjs` (it writes to `../`, so run it from that folder). It writes `design-source/responsive.html`, `responsive-menu-open.html` and `states.html`. (Planned change for Step 6: build these from the site's real output instead of a second hand-written generator.)
2. Preview PNGs: `cd design-source/scripts; node render-responsive.mjs [widths]` (run it from that folder, the output path is relative) writes `design-source/responsive-<w>.png`. It checks horizontal overflow at 375 / 768 / 1280.
3. Serve `design-source/` on a local port (earlier runs used `python -m http.server 8765`; a Range-capable server is not needed here).
4. Call the Figma tool `generate_figma_design {fileKey}`. It returns a `captureId` (and a `promptId`).
5. Run `node design-source/scripts/figma-capture.mjs http://localhost:8765/responsive.html <captureId> <promptId> <viewportWidth>`. It drives installed Chrome with Playwright (through `dev-tools/browser.mjs`) and injects Figma's `capture.js`.
6. Poll `generate_figma_design {fileKey, captureId}` until it reports done. Each capture adds a new frame to the file; rename it and delete the old one.

Rules learned:
- Captures run with reduced motion by default (static, fully visible layers) and wait for `document.fonts.ready`. The states sheet needs `MOTION=on` (its frames are frozen with `.freeze` and negative animation delays).
- The importer drops CSS `outline`; focus rings in the states sheet are drawn as box-shadow (`.is-focus`). The live page keeps real `:focus-visible`.
- Batch Figma calls and render locally first; do not spend MCP calls on trial and error.

## 4. Sections (13, in order)

header, hero, marquee, statement, work, deliverables, process, plans, band (commitment), about, faq, cta (final call to action), footer.

One HTML + PNG per section (`NN-name`) is in `design-source/sections/`. Breakpoints in the generated page: 768 and 1024, hamburger below 1024.

## 5. Design rules (kept from the Paper era, still valid for any design tool)

1. Short design brief (mood, palette, type, direction) before changing anything.
2. Small steps: one visual group per write. After each section, look at a screenshot and write one line on spacing, type, contrast, alignment, repetition. Fix targeted; never delete and restart.
3. Font sizes in px, letter-spacing in em, line-height in px. Check that fonts exist before using them.
4. Use tokens (`var(--color-primary)` style) instead of raw hex. Opacity mixes with `color-mix(in srgb, var(--color-paper) 90%, transparent)`.
5. Repeated rows use fixed-width slots so columns align.
6. Placeholder brand "Lumen & Co." with realistic invented copy and shapes instead of photos. Never use the reference's name, copy, logo or photos, and never mention other design tools in placeholder copy.
7. Accent words in headings: same size as the heading, italic serif, primary colour.

## 6. Measured states and motion (for the states sheet)

Hover, focus and animation numbers are in `REFERENCE-NOTES.md`, section 4 (Motion). The 17 motion checks that passed on the generator output were run by `verify-motion.mjs`, now replaced for the site by `site/tests/e2e/motion.spec.ts`.

## 7. Related files

- `design-source/README.md` (stale file list), `design-source/design-spec.md` (written design spec)
- `design-source/screenshots/figma/` (local renders of the Figma result; git-ignored)
- `design-source/older/desktop-1280.html` (source of the v1 desktop frame, fixed width)
