#!/bin/zsh

# Export minimal files for UX/UI designer package
DEST="$HOME/Downloads/morpheus-dream-archive-designer-minimal"

# Create destination directory
mkdir -p "$DEST"

# Copy essential files only
cp README.md "$DEST/"
cp docs/workflow-guide.md "$DEST/"
cp docs/dream-structuring-prompt.md "$DEST/"
cp src/App.jsx "$DEST/"
cp src/index.css "$DEST/"
cp tailwind.config.js "$DEST/"
cp public/index.json "$DEST/"
cp public/entries/2026-01-16.json "$DEST/"
# Copy one sample image if available
# cp public/images/* "$DEST/" 2>/dev/null | head -1 || true

echo "Minimal designer package exported to: $DEST"