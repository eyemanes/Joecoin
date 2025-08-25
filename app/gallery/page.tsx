import GalleryGrid from '@/components/GalleryGrid';

export default function GalleryPage() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      minHeight: '100vh',
      background: '#c0c0c0'
    }}>
      <div className="window" style={{ position: 'static' }}>
        <div className="title-bar">
          <div className="title-bar-text">Gallery</div>
        </div>
        <div className="window-body">
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
}
