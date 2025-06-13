@echo off
echo ========================================
echo   Enrique's Portfolio - Local Server
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python detected! Starting server...
    echo.
    echo Server will start at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    :: Start the server and open browser
    start http://localhost:8000
    python -m http.server 8000
    goto end
)

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js detected! Checking for http-server...
    
    :: Check if http-server is installed
    where http-server >nul 2>&1
    if %errorlevel% == 0 (
        echo http-server found! Starting server...
        echo.
        echo Server will start at: http://localhost:8000
        echo Press Ctrl+C to stop the server
        echo.
        start http://localhost:8000
        http-server -p 8000
        goto end
    ) else (
        echo http-server not found. Installing...
        call npm install -g http-server
        echo.
        echo Starting server...
        echo Server will start at: http://localhost:8000
        echo Press Ctrl+C to stop the server
        echo.
        start http://localhost:8000
        http-server -p 8000
        goto end
    )
)

:: If neither Python nor Node.js is installed
echo ERROR: Neither Python nor Node.js detected!
echo.
echo Please install one of the following:
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo.
echo Or use VS Code with Live Server extension
echo.
pause
goto end

:end
echo.
echo Server stopped.
pause