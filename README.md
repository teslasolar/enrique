# Enrique's Portfolio - Modular Structure

## Overview

This portfolio is built with a modular component structure where each section is a separate HTML file that can be loaded independently. This approach allows for:

- Easy maintenance and updates
- Component reusability
- Better organization
- Fallback to static content if JavaScript fails

## Structure

```
enrique/
├── index.html                 # Main file that loads all components
├── index-inline.html         # Alternative version with inline component loading
├── index-old.html            # Original dynamic JS version (backup)
├── html-components/          # Individual HTML components
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── experience.html
│   ├── education.html
│   ├── skills.html
│   ├── certifications.html
│   ├── contact.html
│   └── footer.html
├── js/                      # JavaScript files
│   ├── component-loader.js  # Utility for loading components
│   ├── navbar.js           # Navbar functionality
│   ├── hero.js             # Hero animations
│   ├── contact.js          # Contact form handling
│   └── ...                 # Other component scripts
└── css/                    # Stylesheets (unchanged)
```

## How It Works

1. **index.html** loads each component from the `html-components/` folder
2. Each component includes its own JavaScript file at the bottom
3. Components are loaded asynchronously but in order
4. The component loader handles GitHub Pages path issues automatically

## Component Structure

Each component follows this pattern:

```html
<!-- Component HTML -->
<section id="component-name">
    <!-- Content -->
</section>

<!-- Component-specific JavaScript -->
<script src="js/component-name.js"></script>
```

## Adding New Components

1. Create a new HTML file in `html-components/`
2. Create corresponding JS file in `js/` (optional)
3. Add the component to the loading sequence in index.html

## GitHub Pages Deployment

The component loader automatically detects GitHub Pages and adjusts paths accordingly. Just push to GitHub and enable Pages - no configuration needed!

## Testing Locally

1. **With a server** (recommended):
   - Run `python -m http.server 8000`
   - Open http://localhost:8000

2. **Without a server**:
   - Components may not load due to CORS
   - Use index-simple.html as fallback

## Customization

- Edit individual component HTML files in `html-components/`
- Modify component JavaScript in `js/`
- Styles remain in the `css/` folder

## Language Support

Components include `data-translate` attributes for future internationalization. Language switching is handled by the navbar component.

## Benefits

✅ **No ES6 module issues** - Uses standard fetch() API
✅ **GitHub Pages friendly** - Automatic path handling
✅ **Easy to debug** - Each component is separate
✅ **Graceful degradation** - Works even if JS partially fails
✅ **Fast loading** - Components load in parallel
✅ **SEO friendly** - Content is in HTML files
