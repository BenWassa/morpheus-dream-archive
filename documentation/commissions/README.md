# Commissions

This folder contains the individual development commissions for Project Morpheus - Dream Archive System.

## Purpose

Each commission represents a modular component of the application, developed incrementally to build a complete dream archiving system. The commissions are designed to be independent but interdependent, allowing for iterative development and testing.

## Recommended Build Order

1. **Commission 1: Add Entry Form Component**
   - Core functionality for creating new dream entries
   - Handles form validation, file uploads, and ZIP generation
   - Dependencies: JSZip, FileSaver.js

2. **Commission 2: Gallery View Component**
   - Displays archived dreams in a searchable gallery
   - Handles data loading, filtering, and detail views
   - Dependencies: Commission 1 (shared data structures)

3. **Commission 3: App Shell**
   - Integrates all components into a complete HTML application
   - Provides navigation and layout
   - Dependencies: Commissions 1 & 2, React, Tailwind CSS

4. **Commission 4: Prompt Template**
   - AI structuring prompts for dream processing
   - Enhances dream organization and coherence
   - Dependencies: None (standalone documentation)

## Dependencies Between Components

- **Data Flow**: Commission 1 generates JSON/image files that Commission 2 consumes
- **Shared Libraries**: All commissions use JSZip and FileSaver.js for file operations
- **UI Framework**: Commissions 1-3 use React and Tailwind CSS for consistency
- **File Structure**: All components expect the project folder structure (`entries/`, `images/`, `index.json`)

## Integration Notes

- Replace the placeholder `index.html` with Commission 3's complete HTML
- Ensure all CDN links are current and compatible
- Test file generation and loading in a local server environment
- Validate cross-browser compatibility, especially for file operations

## Development Workflow

1. Implement each commission in order
2. Test individual components before integration
3. Update `index.json` manually after generating entries
4. Deploy to GitHub Pages for live testing
