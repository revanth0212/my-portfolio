# Design Principles

This document outlines the core design principles and architectural decisions that guide this personal portfolio project. Understanding these principles will help developers and AI agents maintain consistency when extending or modifying the codebase.

## Table of Contents

- [Core Philosophy](#core-philosophy)
- [Architecture](#architecture)
- [Component Organization](#component-organization)
- [Styling Strategy](#styling-strategy)
- [Content Management](#content-management)
- [Routing & Navigation](#routing--navigation)
- [Theming System](#theming-system)
- [View Modes](#view-modes)
- [Blog System](#blog-system)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Code Conventions](#code-conventions)

## Core Philosophy

### Simplicity Over Complexity
- Prefer straightforward solutions over clever abstractions
- Avoid premature optimization
- Keep dependencies minimal
- Each component should have a single, clear responsibility

### Developer Experience
- Code should be self-documenting with clear naming
- Prefer explicit over implicit
- Maintain consistent patterns across the codebase
- Design for both human developers and AI agents

### User Experience
- Content should be easily accessible via multiple interfaces (Terminal, Classic)
- Fast page loads and responsive interactions
- Mobile-first responsive design
- Respect user preferences (dark/light theme, terminal/classic view)

## Architecture

### Single Page Application (SPA)
- Built with React and React Router (HashRouter for GitHub Pages compatibility)
- Client-side routing for fast navigation
- No backend required - fully static deployment

### Tech Stack
- **Framework**: React 18 with Vite for fast development
- **Routing**: React Router v6 (HashRouter)
- **Styling**: Styled-components for component-level styles
- **Markdown**: ReactMarkdown for blog content rendering
- **Code Highlighting**: react-syntax-highlighter
- **Deployment**: GitHub Pages via gh-pages

### Build Tool
- **Vite** for development server and production builds
- Fast HMR (Hot Module Replacement) during development
- Optimized production bundle

## Component Organization

### Directory Structure
```
src/
├── components/
│   ├── sections/        # Terminal view components (About, Blog, Contact, etc.)
│   ├── classic/         # Classic view components
│   ├── common/          # Shared components (Header, Footer, Navigation, etc.)
│   └── layout/          # Layout components (Header, Footer, etc.)
├── context/             # React Context providers (Theme, View)
├── data/                # Data re-exports (blogPosts)
├── content/             # Markdown content (blog posts)
├── config/              # Configuration files (site settings)
├── utils/               # Utility functions (keyboard navigation, etc.)
└── App.jsx              # Main application component with routing
```

### Component Naming
- **Terminal View**: `components/sections/` - Minimalist, terminal-style UI
- **Classic View**: `components/classic/` - Modern, card-based UI
- **Shared**: `components/common/` - Used by both views

### Component Patterns
- Functional components with hooks
- Styled-components co-located with components
- Props include `theme` object for styled-components
- Avoid prop drilling when possible - use Context for global state

## Styling Strategy

### Styled-Components
- All component-level styling uses styled-components
- Theme object passed to all styled components via props
- Dynamic styling based on theme values

### Theme Object Structure
```javascript
{
  name: 'terminal-dark',
  background: '#000000',
  foreground: '#e0e0e0',
  accent: '#FFD700',      // Gold
  secondary: '#1a1a1a',
  border: '#333333',
  muted: '#888888'
}
```

### Responsive Design
- Mobile-first approach with `@media (max-width: 768px)` breakpoints
- Test on both desktop and mobile views
- Touch-friendly button sizes (min 44x44px)

### Typography
- **Monospace**: 'Fira Code', 'JetBrains Mono' for terminal aesthetic
- **Sans-serif**: System fonts for body text in Classic view
- Consistent font sizing across components

## Content Management

### Blog System
- Blog posts stored as Markdown files in `src/content/blog/`
- Frontmatter for metadata (id, title, date, readTime, excerpt, tags)
- Custom frontmatter parser (browser-compatible, no build-time dependency)

### Blog Post Structure
```yaml
---
id: "unique-identifier"
title: "Post Title"
date: "YYYY-MM-DD"
readTime: "X min read"
excerpt: "Brief description"
tags: ["AI", "Performance", "Technology"]
---
```

### ID Convention
- Use descriptive, unique IDs (not numbers)
- Format: `topic-purpose` (e.g., `moe-scaling`, `mlx-finetuning`)
- Must be URL-friendly (lowercase, hyphen-separated)
- Enables easy identification and future scalability

### Tag System
- Maximum 3 tags per article
- Maximum 6 unique tags across all articles
- Tag structure:
  1. **Category**: AI, Web, DevOps, etc.
  2. **Purpose**: Performance, Scalability, Fine-tuning, etc.
  3. **Technology**: MoE, MLX, React, etc.

## Routing & Navigation

### HashRouter
- Uses `HashRouter` instead of `BrowserRouter` for GitHub Pages compatibility
- Routes defined once in `App.jsx`, rendered twice (Terminal/Classic)

### Route Patterns
- `/` - Home page
- `/about` - About section
- `/blog` - Blog listing
- `/blog/:id` - Individual blog post (uses string ID, not numeric)
- `/contact` - Contact section

### Terminal Commands
- Commands are case-insensitive
- Support multi-word commands (e.g., "list blogs")
- Tab completion via keyboard navigation hook
- Commands: `about`, `blog`, `blogs`, `contact`, `help`, `clear`, `theme`, `home`, `list`

## Theming System

### Available Themes
- **terminal-dark**: Black background, gold accent (default terminal)
- **terminal-light**: Light gray background, dark accent
- **classic-dark**: Dark theme for Classic view
- **classic-light**: Light theme for Classic view

### Theme Switching
- Theme state stored in ThemeContext
- Toggled via ThemeToggle component
- Persists across navigation (but not page reloads - could add localStorage)

### View Modes
- **Terminal**: Minimalist, command-line inspired interface
- **Classic**: Modern, card-based interface
- View state stored in ViewContext
- Toggled via ViewToggle component

## View Modes

### Terminal View
- Located in `components/sections/`
- Characteristics:
  - Monospace fonts
  - Minimal borders and decoration
  - Command-line interface for navigation
  - Terminal prompt in header
  - Compact layout

### Classic View
- Located in `components/classic/`
- Characteristics:
  - Rounded corners
  - Card-based layout
  - Modern typography
  - Traditional navigation links
  - More visual hierarchy

### Shared Components
- Located in `components/common/`
- Used by both views (Navigation, Footer, Modals, etc.)
- Adapt styling based on current view mode

## Blog System

### Tag Filtering
- Filter buttons in both Terminal and Classic views
- Active tag highlighted with accent color and white text
- Tags displayed on each blog card
- Filtering uses `useMemo` for performance

### Terminal Blog Commands
```bash
blogs              # List all blog posts
blog <id>          # Open specific post by ID
blog               # Navigate to blog page
```

### Blog Post Display
- Markdown content rendered with ReactMarkdown
- Code blocks syntax-highlighted
- Responsive layout
- Back button to return to listing

## Accessibility

### Keyboard Navigation
- Full keyboard support for all interactive elements
- Tab through filters, links, and buttons
- Enter/Space to activate
- Escape to close modals
- Arrow keys for command history in terminal

### ARIA Labels
- All interactive elements have appropriate ARIA labels
- Screen reader friendly text
- Semantic HTML elements
- Focus indicators on all focusable elements

### Focus Management
- Visible focus outlines (using theme accent color)
- Logical tab order
- Focus trapped in modals
- Skip links could be added for better navigation

### Color Contrast
- WCAG AA compliant color combinations
- High contrast for text (foreground vs background)
- Accent color (gold) used sparingly for emphasis
- Muted color for secondary information

## Performance

### Code Splitting
- Currently single bundle (could improve with dynamic imports)
- Blog markdown imported with `?raw` suffix
- Syntax highlighting styles are large (consider lazy loading)

### Image Optimization
- Images not currently used (could add next-gen formats)
- Consider adding responsive images with srcset

### Bundle Size
- Current: ~1000 kB (could be optimized)
- Consider:
  - Dynamic imports for routes
  - Lazy loading heavy components (syntax highlighter)
  - Tree shaking for unused dependencies

### Build Optimization
- Vite's default optimizations
- Production builds minified
- Source maps generated for debugging

## Code Conventions

### File Naming
- Components: PascalCase (e.g., `BlogPost.jsx`)
- Utilities: camelCase (e.g., `keyboardNavigation.js`)
- Styles: N/A (styled-components co-located)
- Content: kebab-case (e.g., `moe-scaling.md`)

### Import Order
```javascript
// 1. React imports
import React, { useState } from 'react';

// 2. Third-party libraries
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 3. Local imports (context, components, data)
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';
```

### Component Structure
```javascript
// 1. Imports
import React from 'react';
import styled from 'styled-components';

// 2. Styled components
const Container = styled.div`...`;

// 3. Component definition
const Component = () => {
  // Hooks
  // Event handlers
  // Render logic
};

// 4. Export
export default Component;
```

### State Management
- Use Context for global state (theme, view mode)
- Use useState for local component state
- Use useMemo for expensive computations
- Avoid unnecessary re-renders

### Error Handling
- BlogPost redirects to /blog if post not found
- Terminal commands show error messages for invalid input
- Could add error boundaries for better error handling

## Future Considerations

### Potential Improvements
1. **Search**: Add full-text search for blog posts
2. **RSS Feed**: Generate RSS feed for blog subscriptions
3. **Analytics**: Add privacy-friendly analytics (Plausible, Fathom)
4. **Comments**: Consider comment system (giscus, utterances)
5. **Performance**: Implement code splitting and lazy loading
6. **Testing**: Add unit tests (Vitest) and E2E tests (Playwright)
7. **CI/CD**: GitHub Actions for automated testing and deployment
8. **PWA**: Add service worker for offline support
9. **SEO**: Add meta tags, sitemap, robots.txt
10. **i18n**: Multi-language support if needed

### Extending the Blog
When adding new blog posts:
1. Create markdown file in `src/content/blog/`
2. Add frontmatter with unique, descriptive ID
3. Import in `src/content/blog/index.js`
4. Add to `blogPosts` array
5. Follow tag system guidelines (max 3 tags, meaningful categories)

### Adding New Sections
When adding new sections (e.g., Projects, Speaking):
1. Create Terminal view component in `components/sections/`
2. Create Classic view component in `components/classic/`
3. Add routes in `App.jsx` (both Terminal and Classic sections)
4. Add navigation links to both views
5. Add terminal command handling in `App.jsx`
6. Update `AVAILABLE_COMMANDS` in `utils/keyboardNavigation.js`
7. Update HelpModal with new command

## Contributing

When contributing to this project:
1. Read these design principles first
2. Maintain consistency with existing patterns
3. Test on both mobile and desktop
4. Verify in both Terminal and Classic views
5. Check accessibility (keyboard navigation, screen readers)
6. Test all themes (dark/light for both views)
7. Keep bundle size in mind

---

**Last Updated**: December 29, 2025

**Version**: 1.0.0
