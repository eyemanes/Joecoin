'use client';

import { useState } from 'react';
import { galleryImages } from '@/lib/constants';

export default function GalleryGrid() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openLightbox(image)}
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="gallery-thumbnail"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.setAttribute('style', 'display: flex');
              }}
            />
            <div className="gallery-fallback">
              Image {index + 1}
            </div>
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <img
              src={lightboxImage}
              alt="Gallery Preview"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
