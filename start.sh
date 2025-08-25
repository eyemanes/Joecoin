#!/bin/bash

echo "🚀 Starting Joe 98 Development Server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating environment file..."
    cp .env.example .env.local
    echo "✅ Environment file created. Please edit .env.local with your URLs."
fi

echo "🖥️  Starting development server..."
pnpm dev
