# Private Folder

This folder contains private images that will be displayed in the Joe 98 Private Folder application.

## How to Add Images

1. **Place your images** in this folder (`public/private/`)
2. **Update the component** in `components/PrivateFolder.tsx`
3. **Add image entries** to the `privateImages` array

## Image Format

Supported formats: JPG, PNG, GIF, WebP

## Example Usage

```typescript
const privateImages: PrivateImage[] = [
  {
    id: '1',
    src: '/private/my-image-1.jpg',
    alt: 'Description of image 1',
    title: 'Image 1'
  },
  {
    id: '2', 
    src: '/private/my-image-2.png',
    alt: 'Description of image 2',
    title: 'Image 2'
  }
];
```

## Features

- **Grid View**: Thumbnail grid layout
- **List View**: Detailed list with thumbnails
- **Lightbox**: Click images to view full size
- **Windows 98 Style**: Authentic retro interface

## Security Note

Images in this folder are publicly accessible. Only place images that are safe for public viewing.
