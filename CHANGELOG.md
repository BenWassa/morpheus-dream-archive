# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2026-01-18

### Added

- Cache-busting for `index.json` fetch (prevents stale listings in some browsers).

### Changed

- Improve favicon handling: added multi-size `favicon.ico` and updated HTML links for broader browser support.

### Fixed

- Ensure newly added dream entries are included in `public/index.json` and appear on the live site.

## [1.3.0] - 2026-01-18

### Added

- **App Icons & PWA Support**:
  - High-resolution source icon added to `src/assets/`.
  - Production icon set (16px to 512px) generated in `public/icons/`.
  - Web manifest (`manifest.webmanifest`) for PWA installation support.
  - Configurable icon regeneration script: `npm run icons:generate`.
- **GitHub Pages Optimization**:
  - Manifest and icon paths updated to be relative, ensuring correct resolution on GitHub Pages subpaths.

### Fixed

- **UI/UX**:
  - Ensured full parsed dream summaries and scenes are displayed in the review stage without truncation.

## [1.2.0] - 2026-01-18

### Changed

- Infrastructure and project structure refinements.

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
