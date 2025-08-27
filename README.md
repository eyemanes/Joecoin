# Joe Solana - Windows 98 Style React Application

Joe Solana, Hey my name is joe. A nostalgic Windows 98-style desktop experience built with Next.js 14, React, and TypeScript.

## Features

- **Authentic Windows 98 UI**: Complete with window chrome, taskbar, start menu, and desktop icons
- **Boot Sequence**: Classic boot screen with loading bar and "Press any key to continue"
- **Direct Boot to Desktop**: Seamless transition from boot to desktop environment
- **Desktop Environment**: 
  - Draggable and resizable windows
  - Desktop icons with single-click selection and double-click to open
  - Right-click context menus
  - Start menu with programs and shutdown
  - Taskbar with running applications and system clock
- **Applications**:
  - **Lore**: Internal window displaying markdown content
  - **Gallery**: Image gallery with lightbox functionality
  - **Dexscreener**: Configurable iframe or external link
  - **Twitter & Telegram**: External social media links
- **Themes**: Switch between Teal and Clouds desktop backgrounds
- **State Persistence**: Window positions and theme preferences saved to localStorage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: 98.css for authentic Windows 98 look
- **State Management**: Jotai for desktop and window state
- **Draggable Windows**: react-rnd for window management
- **Markdown Rendering**: react-markdown
- **Utilities**: clsx for conditional classes

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
# or  
yarn install
```

3. Copy the environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_TWITTER_URL=https://x.com/ogjoeonsolana
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_channel
NEXT_PUBLIC_DEXSCREENER_URL=https://dexscreener.com/solana/your_pair
```

### Dexscreener Configuration

To change the Dexscreener pair URL:

1. Update `NEXT_PUBLIC_DEXSCREENER_URL` in your `.env.local`
2. The URL should point to your specific trading pair
3. Example: `https://dexscreener.com/solana/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`

## Project Structure

```
/app
  /boot/page.tsx          # Boot screen

  /desktop/page.tsx       # Main desktop environment  
  /lore/page.tsx         # Standalone lore page
  /gallery/page.tsx      # Standalone gallery page
  layout.tsx             # Root layout with providers
  globals.css            # Global styles and 98.css imports

/components
  Desktop.tsx            # Main desktop component
  Taskbar.tsx           # Bottom taskbar
  StartMenu.tsx         # Start menu popup
  Icon.tsx              # Desktop icons
  Win98Window.tsx       # Draggable window wrapper
  BootScreen.tsx        # Boot sequence

  GalleryGrid.tsx       # Image gallery grid
  MarkdownPane.tsx      # Markdown content renderer

/lib
  desktopState.ts       # Jotai state management
  constants.ts          # App configuration and content

/public
  /icons/*              # Application icons (32x32 PNG)
  /cursors/win98.cur    # Windows 98 cursor
  /wallpapers/clouds.jpg # Desktop wallpaper
  /gallery/*            # Gallery placeholder images
```

## Customization

### Adding New Desktop Icons

1. Add a 32x32 PNG icon to `/public/icons/`
2. Update the `desktopIcons` array in `/lib/constants.ts`:

```typescript
{
  id: 'myapp',
  title: 'My App', 
  src: '/icons/myapp.png',
  appType: 'external', // 'internal', 'iframe', or 'external'
  url: 'https://myapp.com' // for external/iframe types
}
```

### Modifying Lore Content

Edit the `loreMarkdown` constant in `/lib/constants.ts` to change the lore content.

### Adding Gallery Images

Place images in `/public/gallery/` and update the `galleryImages` array in `/lib/constants.ts`.

## Building for Production

```bash
pnpm build
pnpm start
```

## Browser Support

- Modern browsers with ES2015+ support
- Best experienced in desktop browsers at 1024x768 or higher resolution
- Mobile browsers supported but may have limited functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all TypeScript checks pass: `pnpm lint`
5. Submit a pull request

## License

This project is for educational and nostalgic purposes. Windows 98 is a trademark of Microsoft Corporation.

## Credits

- Built with [98.css](https://jdan.github.io/98.css/) for authentic Windows 98 styling
- Icons and assets are placeholder pixel art
- Inspired by the golden age of personal computing (1995-2001)
