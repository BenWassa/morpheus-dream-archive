# Workflow Guide

This document outlines the step-by-step process for capturing, processing, and archiving dreams using Project Morpheus.

## 1. Morning Capture Process (Mobile)

- Immediately upon waking, use ChatGPT mobile app for voice transcription
- Speak your dream recollection in detail, capturing as much as possible
- Save the transcribed text for later processing

## 2. Desktop Processing Steps

- Transfer the transcribed dream text to your desktop
- Use the AI structuring prompt (from `docs/dream-structuring-prompt.md`) to organize the dream into coherent scenes
- Generate visual representations using Sora or Gemini for key scenes
- Prepare the structured dream data in JSON format

## 3. Adding Entries to Archive

- Run the dev server with `npm run dev` and open the local URL
- Use the Add Entry form to input the processed dream data
- Upload generated images to the `/public/images/` folder
- Save the dream entry as a JSON file in `/public/entries/`
- Update `public/index.json` with the new entry's date and reference

## 4. Committing and Deploying

- Commit all changes to the Git repository
- Push to the main branch on GitHub
- The site automatically deploys via GitHub Pages

## 5. Exporting Context for Designers

- Run `./export-designer-package.sh` to generate a minimal package for UX/UI review
- The package lands in `~/Downloads/morpheus-dream-archive-designer-minimal`
