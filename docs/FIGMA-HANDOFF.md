# Figma handoff

Paper is no longer used: its free MCP limit ran out on 2026-11-06 (D-12). The untrimmed Paper-era notes are in `archive/paper-era/PAPER-MCP.md` (git-ignored). Do not use Paper tools.

Step 6 (D-19, D-29) is done: the Figma frames below were captured from the finished site on 2026-11-19. There is no separate design generator any more; to refresh the frames, capture the site again.

## 1. Figma file and frames

File "Lumen & Co. - Portfolio", key `RRm7sOaYLwqevFsApSrMcZ` (https://www.figma.com/design/RRm7sOaYLwqevFsApSrMcZ), page "Page 1". Plan: Starter, full seat. Frames are placeholder layers only (0 image fills). Fonts: Bricolage Grotesque, Inter, Instrument Serif (italic accent).

| Frame | Node id | Size | Status |
|---|---|---|---|
| Desktop 1280 v3 (site) | `26:2` | 1280 x 8751 | current |
| Tablet 768 v3 (site) | `27:2` | 768 x 9467 | current |
| Mobile 375 v3 (site) | `28:2` | 375 x 11600 | current |
| Mobile 375 menu open v3 (site) | `29:2` | 375 x 11965 | current |
| Desktop 1280 v2, Tablet 768 v2, Mobile 375 v2, Mobile 375 menu open v2 | `19:2`, `20:2`, `22:2`, `21:2` | | stale (2026-11-06 generator) |
| States and motion 1280 | `17:2` | 1280 x 4912 | stale (old palette and type); not regenerated |
| Desktop 1280 (v1), Tablet 768 (v1), Mobile 375 (v1) | `1:2`, `3:2`, `4:2` | | stale |

The v3 sizes equal the golden baselines in `site/tests/baseline/` (8751 / 9467 / 11600). The old frames are kept: the owner decides when to delete them (nothing was deleted in Figma).

Not verified: the v3 frames were checked by size and by looking at the 1280 and menu-open captures at low resolution, not by a pixel diff against the page. Hover, focus and motion are not in Figma. Closed FAQ answers exist as 0-height clipped nodes. The capture drops CSS `outline`.

## 2. Re-capture the site into Figma

1. Build and serve: `cd site; pnpm build; pnpm exec vite preview --port 4173` (the build contains the finished page; the dev server also works).
2. Call `create_session`, then the Figma tool `generate_figma_design {fileKey}` once per frame. Each call returns a single-use `captureId`; the calls can run in parallel.
3. For each id run: `cd design-source/scripts; node figma-capture.mjs http://localhost:4173/ <captureId> <promptId> <viewportWidth>`. It drives the installed Chrome through `dev-tools/browser.mjs` with reduced motion and waits for fonts. For the menu-open frame set the environment variable `CLICK_BEFORE_CAPTURE` to `[data-menu-toggle]` (PowerShell: `$env:CLICK_BEFORE_CAPTURE = '[data-menu-toggle]'`) and use width 375.
4. Poll `generate_figma_design {fileKey, captureId}` until it says completed. The capture lands as a new frame on Page 1, named after the page title: rename it with `use_figma` (load the `figma-use` guide first).

Known quirks:
- The capture script's Node process does not exit after it has submitted (it hung until a 120 s timeout every time). The frame is already in Figma by then: check with the poll call, not the script's exit. Run it in the background with `timeout 120`.
- The menu-open run printed "Target crashed" after the capture had landed. The frame was complete (11965 px tall).
- Each frame is a raw capture (many nested frames), not Figma components or variables.

## 3. Design rules (kept from the Paper era)

1. Short design brief (mood, palette, type, direction) before changing anything.
2. Small steps: one visual group per write; check a screenshot after each section; never delete and restart.
3. Font sizes in px, letter-spacing in em, line-height in px. Check that fonts exist before using them.
4. Use tokens instead of raw hex. The tokens are in `site/src/styles/theme.css`.
5. Placeholder brand "Lumen & Co." with invented copy and shapes. Never use the reference's name, copy, logo or photos.
6. Accent words in headings: same size as the heading, italic serif, primary colour.

Measured hover, focus and animation numbers: `REFERENCE-NOTES.md`, section 4.
