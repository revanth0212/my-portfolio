# Deployment Guide

This guide covers deploying your personal portfolio website to GitHub Pages, the recommended hosting solution for this project.

## Table of Contents

- [Quick Start](#quick-start)
- [GitHub Pages Setup](#github-pages-setup)
- [Deployment Methods](#deployment-methods)
- [Custom Domain](#custom-domain)
- [Troubleshooting](#troubleshooting)
- [Alternative Hosting](#alternative-hosting)

## Quick Start

The fastest way to deploy:

```bash
# Install gh-pages package (first time only)
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

Your site will be available at: `https://yourusername.github.io/my-portfolio/`

## GitHub Pages Setup

### Initial Setup

1. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it `my-portfolio` (or your preferred name)
   - Initialize with a README (optional)

2. **Push Your Code**

```bash
# Initialize git if not already done
git init

# Add remote repository
git remote add origin https://github.com/yourusername/my-portfolio.git

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

3. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions** (if using workflow) or leave as default
   - **Note**: This project uses `gh-pages` package, so no GitHub Action configuration is needed

### Understanding gh-pages Deployment

This project uses the `gh-pages` npm package for deployment:

- **What it does**: Builds your project and pushes the `dist/` folder to the `gh-pages` branch
- **When to use it**: Simple, automated deployment without CI/CD configuration
- **How it works**: The `npm run deploy` command runs the build and deploys in one step

### Package Scripts

The deployment is configured in `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

- `predeploy`: Automatically runs before `deploy`, builds the project
- `deploy`: Publishes the `dist/` directory to GitHub Pages

## Deployment Methods

### Method 1: Using npm run deploy (Recommended)

**Best for**: Simple, quick deployments

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push

# Deploy to GitHub Pages
npm run deploy
```

**Pros**:
- One-command deployment
- No CI/CD configuration needed
- Fast and reliable

**Cons**:
- Must run manually from your machine
- Requires Node.js environment

### Method 2: GitHub Actions (Optional)

**Best for**: Automated deployments on push

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Pros**:
- Automatic deployment on push
- No local Node.js needed for deployment
- CI/CD benefits (testing, etc.)

**Cons**:
- Requires GitHub Actions configuration
- Slight delay in deployment

### Method 3: Manual Deployment

**Best for**: Testing, previewing

```bash
# Build the project
npm run build

# Preview locally
npm run preview

# Manually deploy dist/ folder
npx gh-pages -d dist
```

## Configuration

### vite.config.js

Vite is configured for GitHub Pages compatibility:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',  // Update to match your repository name
  server: {
    port: 3000,
    open: true
  }
});
```

**Important**: Update `base` to match your repository name:
- Repository `my-portfolio` → `base: '/my-portfolio/'`
- Repository `portfolio` → `base: '/portfolio/'`
- User/organization page → `base: '/'`

### HashRouter vs BrowserRouter

This project uses **HashRouter** instead of BrowserRouter:

**Why HashRouter?**
- Works with GitHub Pages without server configuration
- Uses URL hash for routing (e.g., `/#/blog`)
- No 404 errors on page refresh
- Zero configuration required

**Switching to BrowserRouter**:
Requires additional server configuration and is not recommended for GitHub Pages.

## Custom Domain

### Setting Up a Custom Domain

1. **Purchase a Domain**
   - Buy from any domain registrar (Namecheap, GoDaddy, etc.)

2. **Configure DNS**
   - Go to your domain registrar's DNS settings
   - Add one of the following:

   **Option A: Subdomain (portfolio.yourdomain.com)**
   ```
   Type: CNAME
   Name: portfolio
   Value: yourusername.github.io
   TTL: 3600
   ```

   **Option B: Apex Domain (yourdomain.com)**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   TTL: 3600

   Type: A
   Name: @
   Value: 185.199.109.153
   TTL: 3600

   Type: A
   Name: @
   Value: 185.199.110.153
   TTL: 3600

   Type: A
   Name: @
   Value: 185.199.111.153
   TTL: 3600
   ```

3. **Update GitHub Pages Settings**
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Wait for DNS check (may take up to 24 hours)
   - Enable "Enforce HTTPS" (recommended)

4. **Update vite.config.js**

```javascript
export default defineConfig({
  base: '/',  // Change to '/' for custom domain
  // ... rest of config
});
```

5. **Rebuild and Redeploy**

```bash
npm run deploy
```

### Troubleshooting Custom Domain

**DNS not propagating?**
- Use `dig` to check: `dig yourdomain.com`
- Can take up to 48 hours (usually faster)
- Verify DNS settings match above

**HTTPS not working?**
- Wait for DNS to propagate first
- Enable "Enforce HTTPS" in GitHub Pages settings
- May take up to 24 hours after DNS propagation

## Troubleshooting

### Common Issues

#### Issue 1: 404 Errors on Refresh

**Symptom**: Pages work when clicking links, but 404 on refresh

**Solution**: Already fixed by using HashRouter. If you switched to BrowserRouter:
- Switch back to HashRouter in `src/App.jsx`
- Or configure server-side redirects (not available on GitHub Pages)

#### Issue 2: Assets Not Loading

**Symptom**: Page loads but CSS/JS not working

**Solutions**:
1. Check `vite.config.js` base path matches repo name
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Verify `dist/` folder was deployed correctly

```bash
# Check gh-pages branch
git checkout gh-pages
ls -la  # Should see index.html and assets/
git checkout main
```

#### Issue 3: Deployment Command Fails

**Symptom**: `npm run deploy` fails with error

**Solutions**:
1. Ensure gh-pages is installed:
```bash
npm install --save-dev gh-pages
```

2. Check git remote is set:
```bash
git remote -v
# Should show origin URL
```

3. Verify build succeeds first:
```bash
npm run build
# If this fails, fix build errors before deploying
```

#### Issue 4: GitHub Pages Shows 404

**Symptom**: GitHub Pages URL shows 404 page

**Solutions**:
1. Verify gh-pages branch exists:
```bash
git branch -a | grep gh-pages
```

2. Check GitHub Pages settings:
- Settings → Pages
- Source should show: `gh-pages` branch
- Folder should be: `/ (root)`

3. Wait a few minutes for GitHub to update

#### Issue 5: White Screen After Deployment

**Symptom**: Page loads but is blank

**Solutions**:
1. Check browser console for errors (F12)
2. Verify all JavaScript files are present
3. Check for relative path issues in imports
4. Ensure `base` path in `vite.config.js` is correct

### Debug Mode

Enable more verbose logging:

```bash
# Run with verbose output
DEBUG=* npm run deploy
```

### Check Deployment Status

View the gh-pages branch:

```bash
# Checkout gh-pages branch
git checkout gh-pages

# View files
ls -la

# Return to main branch
git checkout main
```

## Performance Optimization

### Build Size

Current bundle size is approximately 1000 KB. To optimize:

1. **Code Splitting**
```javascript
// In App.jsx, lazy load routes
const BlogPost = React.lazy(() => import('./components/sections/BlogPost'));
```

2. **Analyze Bundle**
```bash
npm install --save-dev rollup-plugin-visualizer
```

Update `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

3. **Lazy Load Heavy Dependencies**
- Syntax highlighter (only load on blog pages)
- Markdown renderer (only load on blog pages)

### CDN Configuration

GitHub Pages doesn't support CDN configuration out of the box. For better performance:
- Consider Netlify or Vercel (both have free tiers)
- Use Cloudflare in front of GitHub Pages

## Alternative Hosting

### Netlify

**Pros**:
- Faster builds
- Preview deployments
- Form handling
- Redirects/rewrites

**Deploy**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

**Pros**:
- Automatic HTTPS
- Preview deployments
- Edge functions
- Faster than GitHub Pages

**Deploy**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Surge.sh

**Pros**:
- Simple CLI deployment
- Free SSL certificates
- Fast CDN

**Deploy**:
```bash
# Install Surge
npm install -g surge

# Build and deploy
npm run build
surge dist yourdomain.surge.sh
```

## Continuous Deployment

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Benefits**:
- Automatic deployment on push to main
- No local build required
- Works from any machine

## Maintenance

### Regular Updates

Keep dependencies updated:

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions
npx npm-check-updates -u
npm install
```

### Monitor Deployment

- Check GitHub Pages deployment status in Settings → Pages
- Monitor site uptime with UptimeRobot or similar
- Set up alerts for site failures

## Security

### HTTPS Enforcement

Always enable HTTPS in GitHub Pages settings:
- Settings → Pages
- Check "Enforce HTTPS"
- Free SSL certificates provided by GitHub

### No Secrets Needed

This static site requires no secrets or environment variables, which improves security.

## Summary

**Quick Deployment Commands**:
```bash
# Install gh-pages (first time only)
npm install --save-dev gh-pages

# Make changes
git add .
git commit -m "Your message"
git push

# Deploy
npm run deploy
```

**Your Site Will Be Available At**:
- GitHub Pages: `https://yourusername.github.io/my-portfolio/`
- Custom domain: `https://yourdomain.com` (if configured)

**Need Help?**
- Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Review [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) for architecture details
- Open an issue on GitHub

---

**Last Updated**: December 29, 2025
