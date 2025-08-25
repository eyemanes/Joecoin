#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create simple 32x32 placeholder PNGs using base64 encoded data
// These are minimal 1x1 pixel PNGs that will be styled with CSS

const icons = {
  'lore.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77kQAAAABJRU5ErkJggg==',
  'gallery.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77kQAAAABJRU5ErkJggg==',
  'dexscreener.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77kQAAAABJRU5ErkJggg==',
  'twitter.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77kQAAAABJRU5ErkJggg==',
  'telegram.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77kQAAAABJRU5ErkJggg=='
};

const iconsDir = path.join(__dirname, 'public', 'icons');

// Create each icon file
Object.entries(icons).forEach(([filename, dataUrl]) => {
  const base64Data = dataUrl.replace('data:image/png;base64,', '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(iconsDir, filename), buffer);
  console.log(`Created ${filename}`);
});

console.log('All icon placeholders created!');
