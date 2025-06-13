@echo off
echo ========================================
echo   Enrique's Portfolio - Quick Server
echo ========================================
echo.
echo Starting local server using PowerShell...
echo Server will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

:: Open the browser
start http://localhost:8080

:: Start PowerShell web server
powershell -ExecutionPolicy Bypass -Command "& { $http = [System.Net.HttpListener]::new(); $http.Prefixes.Add('http://localhost:8080/'); $http.Start(); Write-Host 'Server started at http://localhost:8080'; Write-Host 'Press Ctrl+C to stop...'; try { while ($http.IsListening) { $context = $http.GetContext(); $request = $context.Request; $response = $context.Response; $path = $request.Url.LocalPath; if ($path -eq '/') { $path = '/index.html' }; $filename = Join-Path $pwd $path.TrimStart('/'); if (Test-Path $filename) { $content = [System.IO.File]::ReadAllBytes($filename); $response.ContentType = switch ([System.IO.Path]::GetExtension($filename)) { '.html' { 'text/html' } '.css' { 'text/css' } '.js' { 'application/javascript' } '.json' { 'application/json' } '.png' { 'image/png' } '.jpg' { 'image/jpeg' } '.jpeg' { 'image/jpeg' } '.gif' { 'image/gif' } '.svg' { 'image/svg+xml' } default { 'application/octet-stream' } }; $response.OutputStream.Write($content, 0, $content.Length) } else { $response.StatusCode = 404 }; $response.Close() } } finally { $http.Stop() } }"

pause