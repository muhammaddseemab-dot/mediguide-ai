@echo off
cd /d "%~dp0"
echo Installing dependencies...
call npm install
echo.
echo Starting development server on http://localhost:3000
echo.
call npm run dev
pause
