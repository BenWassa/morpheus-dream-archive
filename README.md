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

- React (via CDN)
- Tailwind CSS
- JSZip + FileSaver.js
- GitHub Pages hosting

## Project Structure

- `/entries/` - JSON files for each dream entry
- `/images/` - Dream scene images
- `/docs/` - Documentation and prompt templates
- `/scripts/` - Optional helper scripts
- `index.json` - Master index of all entries

## Getting Started

Brief instructions:

1. Clone repository to local machine
2. Open `index.html` in browser
3. Use Add Entry form to create dream entries
4. Manually update `index.json` with new entry dates
5. Commit and push to deploy to GitHub Pages

## Workflow

1. Capture dreams via ChatGPT mobile (voice transcription)
2. Process with AI structuring prompt
3. Generate scene images with Sora/Gemini
4. Add to archive via web form
5. Commit to repository

## License

MIT

## GitHub Pages Setup

Include instructions in README for enabling GitHub Pages:

- Settings → Pages
- Source: Deploy from branch
- Branch: main
- Folder: / (root)
