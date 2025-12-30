# Personal Portfolio Website

A modern, dual-view personal portfolio website built with React. Features both a **Terminal view** (command-line aesthetic) and **Classic view** (modern card-based UI), with seamless switching between modes.

## Features

### Dual View Modes
- **Terminal View**: Command-line interface aesthetic with monospace fonts and terminal-style navigation
- **Classic View**: Modern, card-based interface with traditional navigation
- Seamless view switching via ViewToggle button

### Theme System
- **4 Theme Options**:
  - Terminal Dark (default): Black background with gold accent
  - Terminal Light: Light gray background with dark accent
  - Classic Dark: Dark theme for Classic view
  - Classic Light: Light theme for Classic view
- Smooth theme transitions
- Theme persists across navigation

### Keyboard Navigation
- `Ctrl+K` or `/`: Focus command input (Terminal view)
- `Ctrl+T`: Toggle theme
- `Escape`: Clear input / Close modal
- `↑/↓`: Navigate command history
- `Tab`: Auto-complete commands
- `?`: Show help modal

### Command System (Terminal View)
Navigate using terminal commands:
- `about` - Navigate to About section
- `blog` - Navigate to Blog section
- `blogs` or `list blogs` - List all blog posts
- `blog <id>` - Open specific blog post by ID (e.g., `blog moe-scaling`)
- `contact` - Navigate to Contact section
- `home` - Return to home
- `theme` - Toggle theme
- `clear` - Clear terminal output
- `help` - Show help modal

### Blog System
- **Markdown-based**: Blog posts written in Markdown with frontmatter
- **Syntax Highlighting**: Code blocks highlighted with Prism.js
- **Tag Filtering**: Filter posts by tags (max 3 tags per article)
- **Descriptive IDs**: Human-readable IDs like `moe-scaling`, `mlx-finetuning`
- **Terminal Commands**: List and open posts via terminal interface

### Design & Accessibility
- **Responsive Design**: Mobile-first approach, works on all devices
- **WCAG AA Compliant**: Proper focus management, ARIA labels, and color contrast
- **Screen Reader Friendly**: Semantic HTML and descriptive labels
- **Touch-Friendly**: Adequate button sizes for mobile interaction

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Styled Components
- **Routing**: React Router v6 (HashRouter for GitHub Pages compatibility)
- **Markdown**: React Markdown with syntax highlighting
- **Deployment**: GitHub Pages via gh-pages
- **Build Tool**: Vite for fast development and optimized builds

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/revanth0212/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run deploy    # Build and deploy to GitHub Pages
```

## Project Structure

```
personal-portfolio/
├── src/
│   ├── components/
│   │   ├── sections/         # Terminal view components
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   └── Contact.jsx
│   │   ├── classic/          # Classic view components
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   └── Home.jsx
│   │   ├── common/           # Shared components
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── ViewToggle.jsx
│   │   │   ├── HelpModal.jsx
│   │   │   └── TerminalInput.jsx
│   │   └── layout/           # Layout components
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx  # Theme state management
│   │   └── ViewContext.jsx   # View mode state management
│   ├── data/
│   │   └── blogPosts.js      # Blog posts re-exports
│   ├── content/
│   │   └── blog/             # Markdown blog posts
│   │       ├── moe-cheat-sheet.md
│   │       ├── mlx-finetuning.md
│   │       └── index.js      # Blog parser & aggregator
│   ├── config/
│   │   └── site.js           # Site configuration
│   ├── utils/
│   │   └── keyboardNavigation.js  # Keyboard shortcuts & commands
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # React entry point
├── public/
├── DESIGN_PRINCIPLES.md      # Architecture & design decisions
├── DEPLOYMENT.md             # Deployment guide
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Personal Information

Update these files with your information:

1. **Site Configuration**: `src/config/site.js`
   - Site title, description, author name
   - Terminal prompt format
   - Social media links

2. **About Section**:
   - Terminal: `src/components/sections/About.jsx`
   - Classic: `src/components/classic/About.jsx`

3. **Contact Section**:
   - Terminal: `src/components/sections/Contact.jsx`
   - Classic: `src/components/classic/Contact.jsx`

### Adding Blog Posts

1. Create a new Markdown file in `src/content/blog/`:

```markdown
---
id: "your-article-id"
title: "Your Article Title"
date: "2025-01-15"
readTime: "8 min read"
excerpt: "Brief description of your article..."
tags: ["Category", "Purpose", "Technology"]
---

# Your Article Content

Write your article in Markdown format...
```

2. **ID Guidelines**:
   - Use descriptive, unique IDs (not numbers)
   - Format: `topic-purpose` (e.g., `moe-scaling`, `mlx-finetuning`)
   - Must be URL-friendly (lowercase, hyphen-separated)

3. **Tag Guidelines**:
   - Maximum 3 tags per article
   - Maximum 6 unique tags across all articles
   - Structure: Category, Purpose, Technology
   - Examples: `["AI", "Performance", "MoE"]`

4. Add import to `src/content/blog/index.js`:

```javascript
import yourPostMarkdown from './your-article.md?raw';

export const blogPosts = [
  parseMarkdown(post1Markdown),
  parseMarkdown(post2Markdown),
  parseMarkdown(yourPostMarkdown),  // Add your post
];
```

### Theme Customization

Edit `src/context/ThemeContext.jsx` to customize or add themes:

```javascript
export const themes = {
  'terminal-dark': {
    name: 'terminal-dark',
    background: '#000000',
    foreground: '#e0e0e0',
    accent: '#FFD700',      // Gold
    secondary: '#1a1a1a',
    border: '#333333',
    muted: '#888888'
  },
  // Add more themes...
};
```

### Adding New Sections

To add a new section (e.g., Projects):

1. Create Terminal view component in `src/components/sections/Projects.jsx`
2. Create Classic view component in `src/components/classic/Projects.jsx`
3. Add routes in `src/App.jsx` (both Terminal and Classic sections)
4. Add navigation links to both views
5. Add terminal command handling in `src/App.jsx`
6. Update `AVAILABLE_COMMANDS` in `src/utils/keyboardNavigation.js`
7. Update `src/components/common/HelpModal.jsx` with new command

See `DESIGN_PRINCIPLES.md` for detailed guidelines.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions, including:

- GitHub Pages setup
- Custom domain configuration
- Troubleshooting deployment issues
- Manual deployment process

## Documentation

- **[DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)** - Architecture, design decisions, and contribution guidelines
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide and troubleshooting

## Performance

- Vite's optimized build process
- React Fast Refresh for development
- Efficient re-renders with proper state management
- Consider code splitting for large applications (see DESIGN_PRINCIPLES.md)

## Accessibility

- Full keyboard navigation support
- ARIA labels on all interactive elements
- Semantic HTML structure
- WCAG AA compliant color contrast
- Focus indicators on all focusable elements
- Screen reader compatible

## License

This project is open source and available under the MIT License.

## Credits

Built with:
- React
- Vite
- Styled Components
- React Router
- React Markdown

---

**Last Updated**: December 29, 2025
