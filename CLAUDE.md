# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Build to docs/ (GitHub Pages output)
npm run lint         # ESLint with zero warnings tolerance
npm run format       # Prettier
npm run check        # lint + build
npm run icons:generate  # Regenerate icons from src/assets/app-icon-source.png (macOS only)
```

No test suite exists. `npm run check` is the closest equivalent to CI verification.

## Architecture

Single-page React app (no router) with view state managed in `App.jsx` via `currentView` (`'gallery'` | `'add'` | `'demo'`).

**Data model** — All dream data is static JSON served from `public/`:
- `public/index.json` — master list of entry IDs (dates as strings, e.g. `"2024-01-21"`)
- `public/entries/<date>.json` — one file per dream entry with fields: `date`, `summary`, `keywords`, `scenes[]`, `fragments[]`, `originalTranscription`
- `public/images/<date>-01.jpg` etc. — scene images referenced inside entry JSON

`GalleryView` fetches `index.json` then each entry JSON at runtime with cache-busting (`?v=Date.now()`). There is no backend.

**Entry creation workflow** — `AddEntryForm` in `App.jsx`:
1. User pastes AI-generated JSON (from the built-in prompt template)
2. App parses it and lets user attach scene images
3. "Download Entry Bundle" generates a `.zip` (via JSZip + FileSaver.js) containing the entry JSON and resized images
4. User extracts the zip to `public/`, then **manually** adds the date to `public/index.json`

**Glassmorphism components** in `src/component/`:
- `GlassSurfaceReactBits.jsx` — primary glass component; used throughout for cards and buttons; relies on SVG filters for refraction/dispersion
- `GlassSurface.jsx` — extended variant with grain, sheen, and chromatic fringe polish layers
- `GlassSurfaceDemo.jsx` — dev-only playground; only rendered when `VITE_SHOW_DEMO=true`
- `GooeyNav.jsx` — animated navigation used in the header

**Build output** goes to `docs/` (not `dist/`), served by GitHub Pages from the `main` branch `/docs` folder. Base URL is `/morpheus-dream-archive/`.

## Demo mode

Set `VITE_SHOW_DEMO=true` in `.env` (or hardcode in `App.jsx`) to expose the glassmorphism playground as a "DEMO" nav item.

## Adding a dream entry (manual steps)

1. Run `npm run dev`, open the New Entry form, paste structured JSON, attach images, download the zip
2. Extract zip contents into `public/`
3. Add the date string to the `entries` array in `public/index.json`
4. Commit and push → GitHub Pages deploys automatically

## Graphify knowledge graph

A graphify graph lives in `graphify-out/`. Before answering architecture or cross-module questions, check `graphify-out/GRAPH_REPORT.md`. After modifying source files, run `graphify update .` to keep it current.
