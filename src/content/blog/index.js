// Blog posts index - imports all markdown blog posts
import post1Markdown from './moe-cheat-sheet.md?raw';
import post2Markdown from './mlx-finetuning.md?raw';

// Simple frontmatter parser (browser-compatible)
function parseMarkdown(markdownContent) {
  // Split on the first --- to separate frontmatter from content
  const parts = markdownContent.split('---');

  // Remove the first empty string before the first ---
  const frontmatterStr = parts[1];
  const content = parts.slice(2).join('---').trim();

  // Parse frontmatter
  const frontmatter = {};
  const lines = frontmatterStr.trim().split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  // Parse tags if they exist (handles YAML array format)
  let tags = [];
  if (frontmatter.tags) {
    const tagStr = frontmatter.tags.trim();
    // Remove brackets if present
    const cleanStr = tagStr.replace(/^\[|\]$/g, '');
    // Split by comma and clean up each tag
    tags = cleanStr.split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(t => t);
  }

  return {
    id: frontmatter.id,
    title: frontmatter.title,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    excerpt: frontmatter.excerpt,
    content: content,
    tags: tags
  };
}

// Parse all blog posts
export const blogPosts = [
  parseMarkdown(post1Markdown),
  parseMarkdown(post2Markdown)
];

// Get all unique tags from all posts
export const getAllTags = () => {
  const tags = new Set();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
