# Local Development Server

To test the website locally with ES6 modules working properly, you need to run a local server.

## Option 1: Python (if you have Python installed)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

## Option 2: Node.js (if you have Node.js installed)

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: http://localhost:8000

## Option 3: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on index.html
3. Select "Open with Live Server"

## Option 4: Direct File Access (Limited Functionality)

If you must open the file directly:
1. Some features like ES6 modules won't work
2. The loading screen will stay visible
3. Components won't load properly

For the best experience, use one of the server options above.