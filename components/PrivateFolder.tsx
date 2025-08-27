'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface PrivateImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export default function PrivateFolder() {
  const [selectedImage, setSelectedImage] = useState<PrivateImage | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // This will be populated when you add images to the private folder
  const privateImages: PrivateImage[] = [
    // Add your private images here
    // Example structure:
    // { id: '1', src: '/private/image1.jpg', alt: 'Private Image 1', title: 'Image 1' },
  ];

  const handleImageClick = (image: PrivateImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (privateImages.length === 0) {
    return (
      <div className="private-folder-empty">
        <div className="empty-icon">📁</div>
        <div className="empty-text">Private Folder</div>
        <div className="empty-subtext">Add images to this folder to see them here</div>
        <div className="empty-instructions">
          <p>To add images:</p>
          <ol>
            <li>Place your images in the <code>public/private/</code> folder</li>
            <li>Update the <code>privateImages</code> array in this component</li>
            <li>Images will appear here automatically</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="private-folder">
      {/* Toolbar */}
      <div className="folder-toolbar">
        <div className="folder-title">Private Folder</div>
        <div className="folder-controls">
          <button
            className={clsx('view-button', { active: viewMode === 'grid' })}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            ⊞
          </button>
          <button
            className={clsx('view-button', { active: viewMode === 'list' })}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="folder-content">
        {viewMode === 'grid' ? (
          <div className="private-grid">
            {privateImages.map((image) => (
              <div
                key={image.id}
                className="private-image-item"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  className="private-thumbnail"
                />
                <div className="private-image-title">{image.title}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="private-list">
            {privateImages.map((image) => (
              <div
                key={image.id}
                className="private-list-item"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="private-list-thumbnail"
                />
                <div className="private-list-info">
                  <div className="private-list-title">{image.title}</div>
                  <div className="private-list-alt">{image.alt}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="private-lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-title">{selectedImage.title}</div>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
            </div>
            <div className="lightbox-image-container">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
