import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-username' with your actual GitHub username
// and 'repository-name' with your repository name
export default defineConfig({
  plugins: [react()],
  // Use base path '/' for local dev, '/my-portfolio/' for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
