# File manifest (Step 0): where every file goes

Historical: Step 1 is done. Kept as the record of where each file came from.

Status: **approved and executed in Step 1 (2026-11-08)** with all recommendations on F-1 to F-5 accepted; F-5 (merge root specs into `docs/REFERENCE-NOTES.md`) was done in step 2c. Deviations from the plan: `PAPER-MCP.md` was trimmed into `docs/FIGMA-HANDOFF.md` in step 2c (original in `archive/paper-era/`); design scripts live in `design-source/scripts/`; scripts import Playwright via `dev-tools/browser.mjs`; screenshot output of site checks goes to `site/tests/output/`; an empty `tools/` folder is locked by a running process and is to be removed later.
Built from the files' own comments, dates and a search of which files mention which. "Evidence" says why a file is classed the way it is. The ones I am unsure about are listed in section 8.

Safety already in place: git snapshot (`2e4bc97`, site and docs only), a zip of `tools/`, `design-export/` and the root notes in `archive/pre-reorg-backup-2026-11-07.zip` (7.5 MB, 155 entries), and golden baselines in `site/tests/baseline/` (screenshots at 375 / 768 / 1280, section heights, results of all checks: 28 pass, 0 fail).

Destinations (see `REORGANIZATION-PLAN.md`):
`site/` product, `site/tests/` checks (git-ignored), `dev-tools/` shared scripts, `reference-analysis/` measuring the live reference, `design-source/` old design and Figma pipeline (stale), `archive/` dead (git-ignored, nothing deleted), `docs/`.

## 1. `tools/`: 88 files

### Keep: site checks, move to `site/tests/legacy-scripts/` until step 2b turns them into `@playwright/test` specs
| File | Evidence |
|---|---|
| `verify-motion.mjs`, `check-marquee.mjs`, `check-menu.mjs`, `measure-site.mjs`, `pixdiff.mjs`, `cmp-sections.mjs`, `capture-baseline.mjs` | Written this project for the site; mentioned in the plan; run during this work |

### Keep: shared dev tool, move to `dev-tools/`
| File | Evidence |
|---|---|
| `range-server.mjs` | Imported/needed by `site-timeline`, `verify-motion` (old), `video-frames` |
| `package.json` | Only dependency is `playwright-core`. Its `package-lock.json` is npm; the project uses pnpm (D-04), so step 1 replaces it with a pnpm lock |

### Keep: measure the live reference, move to `reference-analysis/scripts/`
| File | Evidence |
|---|---|
| `ref-color`, `ref-gutter`, `ref-hero-dump`, `ref-hover`, `ref-marq`, `ref-pair`, `ref-reel`, `ref-reel2`, `ref-reel3`, `ref-type`, `ref-vars` (.mjs) | Used on 2026-11-07 to match the site to the reference. **Merge candidates:** `ref-reel`, `ref-reel2`, `ref-reel3` are three iterations of one measurement |
| `site-timeline.mjs`, `measure-interactions.mjs`, `video-frames.mjs`, `hero-shots.mjs` | Reference sampling, interaction measuring, video frame extraction, hero screenshots |
| `capture.mjs`, `probe.mjs`, `tokens2.mjs` | Early reference captures and token probes; cited by `design-export/design-spec.md` and the root spec |
| `ref-metrics.json` (77 KB), `probe-output.json` (13 KB) | Data they produced. **Stale** vs the live site (palette and container changed on 2026-11-07); kept as history |

### Keep: design and Figma pipeline, move to `design-source/`
| File | Evidence |
|---|---|
| `gen-responsive.mjs`, `render-responsive.mjs`, `figma-capture.mjs` | Generate the design HTML, render it, push it into Figma. Needed for Step 6 (D-19) |

### Archive: Paper-era, to `archive/paper-era/`
| Files | Evidence |
|---|---|
| `paper/` (13 HTML), `paper.mjs`, `pp.mjs`, `pp_raw.mjs`, `ins.mjs`, `add.mjs`, `fix.mjs` | Drive Paper's MCP; Paper's free limit ended (D-12) |
| `gen.mjs`, `patch2.py`, `patch3.py`, `patch_gen.py` | Desktop-only Paper generator and one-off patches to it; superseded by `gen-responsive.mjs` |
| `c1..c8`, `c10..c14`, `c20..c23` (.json, 17 files), `_add.json`, `_call.json`, `_fix.json` | Paper call payloads; only `add/ins/fix.mjs` reference them |
| `tools.json` (67 KB), `guide.txt` (21 KB) | Paper's tool list and guide |
| `local-preview.html`, `local-metrics.json`, `measure.mjs`, `export-design.mjs` | Compare the reference with the Paper HTML. Not needed for the site. **Flag F-4** |

### Archive: scratch, to `archive/scratch/`
`dbg.mjs`, `dbg2.mjs`, `our-marquee.mjs`, `radii.mjs`, `radii2.mjs`, `probe-err.txt` (empty), `manifest-evidence.mjs` (this step's helper). No other file mentions them.

## 2. Root

| File | Destination | Evidence |
|---|---|---|
| `PAPER-MCP.md` (16 KB) | `docs/` after trimming to the Figma notes and node ids in step 2c; original to `archive/paper-era/` | Holds the Figma handoff, still needed for Step 6 |
| `phoneresolutionssrecording.md`, `reference-specs.md`, `specs-compare.md` | `reference-analysis/specs/`; merged into `docs/` in step 2c | Overlapping specs of the reference. **Stale in places** (old palette) |
| `phoneresolutionssrecording.mp4` (28 MB), `20261106-0847-05.2400363.mp4` (74 MB) | `reference-analysis/videos/` (git-ignored, D-16) | The two reference videos |
| `SSofdesktop/` (21 PNG, 6.8 MB) | `reference-analysis/screenshots/owner-manual-desktop/` (git-ignored) | **Your own** manual shots; `design-spec.md` says "untouched". Moved, never archived |
| `.libs/` (169 MB) | `archive/unused-python-libs/` | numpy and opencv, nothing mentions `cv2` or `numpy`. **Flag F-1** |

## 3. `design-export/` (57 files) becomes `design-source/` (stale vs the site)

| Item | Destination |
|---|---|
| `responsive.html`, `responsive-menu-open.html`, `states.html`, `tokens.css`, `tokens.json`, `README.md`, `design-spec.md`, `responsive-{375,768,1280}.png`, `states-1280.png`, `sections/` (26) | `design-source/`; marked stale (D-10, D-11); regenerated in Step 6 |
| `desktop-1280.html`, `desktop-1280-full.png` | `design-source/older/`. Source of the oldest Figma frames. **Flag F-3** |
| `reference-specs.md`, `specs-compare.md` | Duplicates of the root copies; archive |
| `screenshots-paper/` (16 files) | `archive/paper-era/screenshots/` |

## 4. `screenshots/` (439 files, 77 MB, git-ignored, D-21)

| Folder | Files | Destination |
|---|---|---|
| `reference/` | 47 | `reference-analysis/screenshots/reference/` |
| `phone/`, `video/`, 27 loose `t000s..t084s.jpg` | 53 / 129 / 27 | `reference-analysis/screenshots/` (video frames, early pass loose) |
| `site-timeline/` | 124 | `reference-analysis/screenshots/site-timeline/` |
| `compare/` | 11 | `reference-analysis/screenshots/compare/` |
| `figma/` | 20 | `design-source/screenshots/figma/` |
| `paper/` | 16 | `archive/paper-era/screenshots/` |
| `site/` | 10 | `archive/scratch/` (this session's measuring output, superseded by `site/tests/baseline/`) |
| `site-interactions.json`, `site-timeline.log` | 2 | `reference-analysis/data/` |

## 5. `site/`

Stays. Untracked clutter removed: `dev.log` (done). `dist/` and `node_modules/` are git-ignored. `site/src` is restructured in step 2a, not here.

## 6. `docs/`

Stays and grows in step 2c. `FILE-MANIFEST.md` (this file) is deleted from the final tree once the moves are done.

## 7. Totals

| Destination | Roughly |
|---|---|
| Stays or moves, tracked | site (11 files), docs (6), `dev-tools/` (2), `reference-analysis/scripts` + data (about 22), `design-source/` (about 40) |
| Moves, git-ignored | videos, screenshots, owner's desktop shots, `site/tests/` (7 scripts + baselines) |
| Archive, git-ignored | about 70 files in `tools/`, 16 + 2 in `design-export/`, `.libs/`, scratch |
| Deleted | none |

## 8. Flags needing your answer

| Flag | Question | My recommendation |
|---|---|---|
| F-1 | `.libs/` is 169 MB of Python (numpy, opencv) that nothing uses | Archive it |
| F-2 | `tools/package-lock.json` is npm, but the project uses pnpm | Replace with a pnpm lock in `dev-tools/` |
| F-3 | Keep `desktop-1280.html` (oldest fixed-width design, source of 1 Figma frame)? | Keep in `design-source/older/` until Figma is re-synced, then archive |
| F-4 | `export-design.mjs` and `measure.mjs` read Paper-era files, so I put them in the archive. If you still want them, they move to `design-source/` and `reference-analysis/` and need small fixes | Archive |
| F-5 | The root specs are partly stale. Merge into one `docs/REFERENCE-NOTES.md` in step 2c and drop the duplicates? | Yes |
