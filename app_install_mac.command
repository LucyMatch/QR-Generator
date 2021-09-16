@echo OFF
REM Check if node is installed
node -v 2> Nul
if "%errorlevel%" == "9009" (
    echo node could not be found
) else (
    npm install
)