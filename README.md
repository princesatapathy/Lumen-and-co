# Lumen & Co. portfolio

A one-page marketing site for a personal-branding studio. "Lumen & Co." is a placeholder brand; the site is being built for the owner's friend's real business, whose facts will replace the placeholders (`docs/DECISIONS.md` D-22, `docs/CONTENT-INTAKE.md`). Layout and motion follow a live reference site, with our own copy and assets only.

Stack: TypeScript, Tailwind CSS v4, Vite. No UI framework. Package manager is **pnpm**. Dependencies come only from official publishers (D-03).

## Quick start

```
cd site
pnpm install
pnpm dev        # http://localhost:5173/
pnpm build      # tsc --noEmit, then vite build -> site/dist/
```

Checks (page heights, motion, menu, marquee, pixel diff) need the dev server running and live in `site/tests/`. They are being converted to one command, `pnpm test`. Until that lands, the scripts are in `site/tests/legacy-scripts/`.

The helper scripts in `dev-tools/`, `reference-analysis/scripts/` and `design-source/scripts/` use `dev-tools/browser.mjs`. Run `pnpm install` once inside `dev-tools/` first. They use the Chrome installed on this machine, so no browser is downloaded.

## Folder map

| Folder | What it holds |
|---|---|
| `site/` | The product. `src/` (target layout: `main.ts`, `styles/`, `content/`, `components/`, `sections/`, `behavior/`), `index.html`, config. `tests/` holds checks and golden screenshots |
| `dev-tools/` | `browser.mjs` (the one place Playwright is loaded from) and `range-server.mjs` (static server with Range support, needed for video seeking) |
| `reference-analysis/` | Measuring the live reference: `scripts/`, `data/`, `specs/` (older notes), `videos/`, `screenshots/` |
| `design-source/` | The old design HTML, tokens and the Figma capture scripts. **Stale** compared with the site; re-synced in the last step |
| `docs/` | Architecture, decisions, plan, notes. See below |
| `archive/` | Dead Paper-era files, scratch scripts, unused libraries, a pre-reorganisation zip. Kept until the owner decides. Nothing in it is used |

## What git ignores, and why

| Ignored | Why |
|---|---|
| `node_modules/`, `dist/`, `*.log` | Generated |
| `archive/` | Dead files the owner has not decided on (D-14, D-18) |
| `site/tests/` | Dev-only checks and golden screenshots stay on this machine (D-15, D-18). A fresh clone has no tests |
| `reference-analysis/videos/`, `*.mp4` | About 100 MB of reference recordings (D-16) |
| `reference-analysis/screenshots/`, `design-source/screenshots/` | 77 MB of captures, mostly regenerable (D-21) |

Git cannot restore anything in the ignored folders. Keep your own copy of what you need.

## Docs

- `docs/ARCHITECTURE.md`: how the site is built, motion, styling, checks, repo layout
- `docs/DECISIONS.md`: what was decided and why (D-01 onward), plus open questions
- `docs/REORGANIZATION-PLAN.md`: the cleanup steps and their status
- `docs/REFERENCE-NOTES.md`: measurements of the live reference (numbers and structure, no copied text)
- `docs/FIGMA-HANDOFF.md`: Figma file, frames and the capture pipeline (for the last step)
- `docs/SEO-AEO-GUIDE.md`: prerender, SEO and AI-search plan
- `docs/CONTENT-INTAKE.md`: the facts needed from the business owner
- `docs/FILE-MANIFEST.md`: historical record of the Step 1 file moves

