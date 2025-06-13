# GitHub Pages Deployment Guide

## Problem: Blank Page on GitHub Pages

If your site shows a blank page when deployed to GitHub Pages, it's likely due to path issues with ES6 modules and resource loading.

## Solution

The site has been updated to automatically detect when it's running on GitHub Pages and adjust all paths accordingly.

### How it works:

1. **Automatic Base Path Detection**: The app.js file now detects if it's running on GitHub Pages and sets the correct base path:
   ```javascript
   getBasePath() {
       if (window.location.hostname.includes('github.io')) {
           const pathParts = window.location.pathname.split('/');
           return pathParts[1] ? `/${pathParts[1]}` : '';
       }
       return '';
   }
   ```

2. **Dynamic Path Resolution**: All fetch requests and module imports use this base path:
   - Component imports: `${this.basePath}/components/${module}.js`
   - JSON data: `${this.basePath}/lang/en.json`
   - Resources: `${this.basePath}/profile.json`

## Deployment Steps

1. **Update your GitHub repository name** in `_config.yml`:
   ```yaml
   baseurl: /your-repo-name
   url: https://yourusername.github.io
   ```

2. **Push all changes to GitHub**:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages paths"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Go to Settings → Pages in your repository
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
   - Click Save

4. **Wait for deployment** (usually 2-5 minutes)

5. **Access your site** at: `https://yourusername.github.io/your-repo-name/`

## Debugging

If the site still shows blank:

1. **Open Browser Console** (F12) and check for errors
2. **Look for 404 errors** - these indicate path issues
3. **Check the console logs** - the app now logs its initialization process
4. **Verify the base path** - it should show in the console as `/your-repo-name`

## Common Issues

1. **404 on component files**: Make sure all component files exist in the `/components` directory
2. **CORS errors**: These shouldn't occur on GitHub Pages, but if they do, ensure you're accessing via HTTPS
3. **Missing JSON files**: Verify all data files (profile.json, etc.) are committed to the repository

## Testing Locally

To test the GitHub Pages behavior locally:

1. Use the provided `quick-server.bat` file
2. Or run: `python -m http.server 8000`
3. Access at: `http://localhost:8000`

The site will automatically detect it's running locally and use correct paths.
