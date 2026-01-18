# Project Morpheus - Dream Archive System

A personal subconscious archive for capturing, organizing, and visualizing dreams

## Overview

- Brief explanation: Voice-captured dreams organized into a visual gallery
- Not a dream interpretation tool - focuses on preservation and re-experience
- AI-assisted structuring preserves dream logic while creating coherent narratives
- Visual memory anchors make dreams revisitable

## Features

- Scene-based dream organization
- Image generation integration (Sora, Gemini)
- Static site hosting via GitHub Pages
- No backend required - fully client-side
- Privacy-first design

## Tech Stack

- React (Vite)
- Tailwind CSS
- JSZip + FileSaver.js
- Lucide icons
- Glassmorphism (High-fidelity SVGs + Backdrop filters)
- GitHub Pages hosting

## New Feature Highlights

### Glassmorphism System
A custom implementation of sophisticated glass effects inspired by ReactBits, featuring:
- **Refraction & Dispersion**: Real-time SVG filters for realistic lens distortion.
- **Polish Layers**: Optional grain, sheen, and chromatic fringe for added depth.
- **Fallbacks**: Graceful degradation for browsers without backdrop-filter or SVG filter support.
- **Components**: 
  - `GlassSurface`: Advanced component with polish features.
  - `GlassSurfaceReactBits`: Verbatim implementation for high-fidelity refraction.

## Developer Tools

### Demo Mode
To view the glassmorphism playground:
1. Set `VITE_SHOW_DEMO=true` in your `.env` or toggle the `SHOW_DEMO` flag in `App.jsx`.
2. A "DEMO" option will appear in the navigation.

## Project Structure

- `/public/entries/` - JSON files for each dream entry
- `/public/images/` - Dream scene images
- `/docs/` - Documentation and prompt templates
- `/scripts/` - Optional helper scripts
- `/public/index.json` - Master index of all entries
- `export-designer-package.sh` - Minimal export for UX/UI review

## Getting Started

Brief instructions:

1. Clone repository to local machine
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Use Add Entry form to create dream entries
5. Manually update `public/index.json` with new entry dates
6. Commit and push to deploy to GitHub Pages

## Workflow

1. Capture dreams via ChatGPT mobile (voice transcription)
2. Process with AI structuring prompt
3. Generate scene images with Sora/Gemini
4. Add to archive via web form
5. Commit to repository

## Designer Export

To share UI context with UX/UI designers, run:

`./export-designer-package.sh`

This exports a minimal package into `~/Downloads/morpheus-dream-archive-designer-minimal` with the core UI, styles, and a sample entry.

## License

MIT

## GitHub Pages Setup

Include instructions in README for enabling GitHub Pages:

- Settings → Pages
- Source: Deploy from branch
- Branch: main
- Folder: / (root)
