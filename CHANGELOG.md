# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-17

### Added

- High-fidelity glassmorphism components (`GlassSurface`, `GlassSurfaceReactBits`) with SVG-based refraction and optional polish layers (sheen, grain, chromatic fringe).
- In-app demo page for visual comparison (guarded by `VITE_SHOW_DEMO` / `SHOW_DEMO`).
- `FragmentCard` and PARSE JSON button updated to use the Night City glass style (opt-in in production).
- Documentation: README updated with Glassmorphism usage and demo instructions.

### Fixed

- Fallbacks for browsers without `backdrop-filter` or SVG filter support.
- Removed obsolete ESLint disables and cleaned up lint warnings.

### Release

- Bumped version to `1.1.0` and created release tag.
