# Component-Based Portfolio Router

## Overview

This is a single-page application (SPA) router that loads different components based on the URL hash.

## How It Works

1. **Navigation**: Click any link in the navigation menu
2. **URL Updates**: The URL changes to `#about`, `#experience`, etc.
3. **Components Load**: The router loads the appropriate HTML components
4. **Smooth Transitions**: Content fades in smoothly

## File Structure

```
components/
├── index.html          # Main router file
├── router-config.js    # Route configuration
└── html/              # Component HTML files
    ├── navbar.html
    ├── hero.html
    ├── about.html
    ├── experience.html
    ├── education.html
    ├── skills.html
    ├── certifications.html
    ├── contact.html
    ├── footer.html
    └── 404.html
```

## Routes

- `#home` - Hero + About + Skills
- `#about` - About + Skills
- `#experience` - Experience section
- `#education` - Education + Certifications
- `#skills` - Skills section
- `#contact` - Contact form

## Features

1. **Clean URLs**: Uses hash-based routing (#home, #about)
2. **Dynamic Loading**: Components load on demand
3. **Mobile Responsive**: Hamburger menu on mobile
4. **Theme Toggle**: Dark/light mode support
5. **Smooth Animations**: Fade-in effects
6. **Back Button Support**: Browser history works
7. **404 Handling**: Shows error for invalid routes

## Usage

### Direct Access
Navigate to: `/components/index.html#home`

### From Root
Use the redirect file or navigate directly

### Adding New Routes

1. Create new HTML file in `components/html/`
2. Add route to the `routes` object in index.html:
```javascript
routes: {
    newroute: ['component1', 'component2', 'footer']
}
```
3. Add navigation link

## Benefits

- **No Server Required**: Works with file:// protocol
- **GitHub Pages Ready**: Paths work automatically
- **Easy to Extend**: Just add HTML files
- **Clean Organization**: Components are separate
- **Fast**: Only loads what's needed

## Customization

### Change Route Components
Edit the `routes` object in index.html

### Add New Components
1. Create HTML file in `components/html/`
2. Reference in route configuration

### Style Changes
All CSS files are loaded from parent directory

## Testing

1. Open `/components/index.html`
2. Click navigation links
3. Check browser console for errors
4. Test on mobile viewport

This approach gives you a modern SPA experience while keeping things simple and maintainable!
