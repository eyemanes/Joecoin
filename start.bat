@echo off
echo 🚀 Starting Joe 98 Development Server...

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    pnpm install
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ⚙️  Creating environment file...
    copy .env.example .env.local
    echo ✅ Environment file created. Please edit .env.local with your URLs.
)

echo 🖥️  Starting development server...
pnpm dev
