# AfterPython

## Project Overview

AfterPython transforms Python projects into beautiful, interactive web apps for blogs, tutorials, documentation, and community. It treats Python projects as first-class citizens, where each project deserves its own dedicated project website.

AfterPython extends existing documentation tools rather than replacing them. While tools like Sphinx and MyST handle documentation, AfterPython provides the complete project website structure around it - adding blogs, tutorials, API references, and more in a standardized way.

## Key Concepts

Users create an `afterpython/` folder at the top level of their Python project (currently supports GitHub-hosted projects). Inside this folder, they can organize content into standard categories:

- `blog/` - Project blog posts and updates
- `tutorials/` - Step-by-step tutorials
- `docs/` - Documentation (uses MyST Markdown by default)
- `api_reference/` - API documentation
- Other categories as needed

## Supported Content Formats

AfterPython supports multiple content formats for maximum flexibility:

- **Marimo notebooks** - Interactive Python notebooks
- **Jupyter notebooks** - Traditional computational notebooks
- **MyST Markdown** - Extended Markdown format

## Architecture & Technical Guidelines

### Tech Stack

- **Frontend**: Svelte 5 + SvelteKit
- **Styling**: Tailwind CSS v4
- **Documentation**: `mystmd` MyST Markdown (integrated)

### Build Flow

1. Scans the `afterpython/` folder for content across all categories (blogs, tutorials, docs, etc.)
2. Processes different content formats (Marimo notebooks, Jupyter notebooks, MyST Markdown)
3. Generates a static website with all content

### Output

The final output is a pure static website filled with content - optimized for deployment and SEO.

### Project Structure

AfterPython uses a monorepo structure:
- `frontend/` - SvelteKit application
- `afterpython/` - Dogfooding: AfterPython's own content (blog, tutorials, docs, etc.)
- Build system and CLI tools

### Component Repositories

AfterPython consists of two main repositories:

1. **`afterpython/afterpython`** (this repo) - The CLI tool
   - Python-based command-line interface
   - Content discovery and processing
   - Orchestrates the build process
   - Integrates with `mystmd` for documentation

2. **`afterpython/project-website-template`** - The frontend template
   - SvelteKit-based web application template
   - Cloned by the CLI during `afterpython init`
   - Renders blogs, tutorials, documentation, and API references
   - Built with Svelte 5 and Tailwind CSS v4
   - Processes content from the CLI and generates websites
   - Supports both static site generation and SSR
