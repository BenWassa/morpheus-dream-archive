#!/bin/zsh

# Export minimal files for UX/UI designer package
DEST="$HOME/Downloads/morpheus-dream-archive-designer-minimal"

# Copy minimal files only (5 files total)
mkdir -p "$DEST/src" "$DEST/public"
cp README.md "$DEST/"
cp src/App.jsx "$DEST/src/"
cp src/index.css "$DEST/src/"
cp public/index.json "$DEST/public/"
cp public/entries/2026-01-16.json "$DEST/public/"

echo "Minimal designer package exported to: $DEST"
