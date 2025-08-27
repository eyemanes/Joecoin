# Joe Solana - Windows 98 Style React Application

🎉 **Project Successfully Created!** 

A complete Windows 98-style desktop experience built with Next.js 14, React, and TypeScript.

## ✅ Project Structure Complete

```
joe98/
├── app/                    # Next.js App Router pages
│   ├── boot/              # Boot screen page
│   ├── desktop/           # Main desktop environment

│   ├── lore/              # Standalone lore page
│   └── gallery/           # Standalone gallery page
├── components/            # React components
│   ├── Desktop.tsx        # Main desktop component
│   ├── Win98Window.tsx    # Draggable windows
│   ├── Taskbar.tsx        # Bottom taskbar
│   ├── StartMenu.tsx      # Start menu popup
│   └── Icon.tsx           # Desktop icons
├── lib/                   # Utilities and state
│   ├── desktopState.ts    # Jotai state management
│   └── constants.ts       # App configuration
├── public/                # Static assets
│   ├── icons/             # SVG application icons
│   ├── wallpapers/        # Desktop backgrounds
│   └── cursors/           # Win98 cursor
└── README.md              # Documentation
```

## 🚀 Getting Started

### Quick Start

**Windows:**
```bash
./start.bat
```

**Unix/Linux/Mac:**
```bash
./start.sh
```

### Manual Start

1. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install / yarn install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env.local
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🎮 Features Implemented

### ✅ Complete Boot → Desktop Flow
- **Boot Screen**: "Joe 98" logo with loading bar and automatic transition
- **Desktop Environment**: Full Windows 98 desktop experience

### ✅ Authentic Windows 98 UI
- **98.css** integration for authentic styling
- **Taskbar** with Start button, running apps, and system clock
- **Start Menu** with programs, links, and shutdown
- **Desktop Icons** with single-click selection and double-click to open
- **Draggable & Resizable Windows** using react-rnd
- **Context Menus** on desktop and icons

### ✅ Desktop Applications
- **Lore**: Internal window displaying markdown content
- **Gallery**: Image gallery with lightbox functionality  
- **Dexscreener**: Configurable iframe or external link
- **Twitter & Telegram**: External social media links

### ✅ Advanced Features
- **Window Management**: Multiple windows, z-index focus, minimize/restore
- **Theme Switching**: Teal vs Clouds desktop backgrounds
- **State Persistence**: Window positions and theme saved to localStorage
- **Keyboard Support**: Tab navigation, Enter to open, ESC to close

### ✅ Modern Development Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Jotai** for state management
- **react-rnd** for draggable windows
- **react-markdown** for content rendering

## ⚙️ Configuration

### Environment Variables

Edit `.env.local` to customize external links:

```env
NEXT_PUBLIC_TWITTER_URL=https://x.com/ogjoeonsolana
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_channel  
NEXT_PUBLIC_DEXSCREENER_URL=https://dexscreener.com/solana/your_pair
```

### Customizing Content

**Lore Content**: Edit `loreMarkdown` in `/lib/constants.ts`

**Desktop Icons**: Add to `desktopIcons` array in `/lib/constants.ts`

**Icon Graphics**: Replace SVG files in `/public/icons/`

## 🎨 Assets Included

### Icon Set
- 📖 **Lore** - Book icon (SVG)
- 🖼️ **Gallery** - Picture icon (SVG)  
- 📊 **Dexscreener** - Chart icon (SVG)
- 🐦 **Twitter** - Bird icon (SVG)
- 💬 **Telegram** - Paper plane icon (SVG)

### Wallpapers  
- **Teal**: Solid color background
- **Clouds**: SVG cloud pattern

### Cursors
- **Win98.cur**: Authentic Windows 98 pointer

## 🛠️ Development

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server  
pnpm lint       # Run ESLint
```

### Project Quality
- ✅ **TypeScript** - Fully typed codebase
- ✅ **ESLint** - Code quality enforcement  
- ✅ **Clean Architecture** - Well-organized components
- ✅ **Responsive Design** - Works on different screen sizes
- ✅ **Browser Compatibility** - Modern browser support

## 🎯 Ready for Production

The project is fully functional and includes:

- Complete boot flow (Boot → Desktop)
- All major Windows 98 desktop features  
- Working window management system
- Configurable applications and links
- Professional documentation
- Development and production scripts

## 🚢 Next Steps

1. **Customize Content**: Update lore, add real gallery images
2. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform
3. **Extend**: Add more applications or desktop features
4. **Theme**: Create additional desktop themes
5. **Mobile**: Enhance mobile experience

---

**Experience the nostalgia of Windows 98 in your browser!** 🖥️✨
