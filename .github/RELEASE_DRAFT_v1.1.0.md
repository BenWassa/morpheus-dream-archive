# Release v1.1.0 — Night City glassmorphism

Release date: 2026-01-17

Highlights
- High-fidelity glassmorphism: `GlassSurface` + `GlassSurfaceReactBits` (SVG refraction, optional polish layers)
- Demo playground (dev-only behind `VITE_SHOW_DEMO` / `SHOW_DEMO`)
- Production-safe defaults and graceful fallbacks for non-supporting browsers

Upgrade notes
- No breaking API changes for existing consumers of `GlassSurface`.
- To enable the demo locally: set `VITE_SHOW_DEMO=true` or toggle `SHOW_DEMO` in `App.jsx`.

Changelog: see `CHANGELOG.md` for full details.

Suggested release assets
- before/after screenshots (Night City comparison)
- short GIF showing chromatic fringe + sheen
