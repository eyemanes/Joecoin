import MarkdownPane from '@/components/MarkdownPane';
import { loreMarkdown } from '@/lib/constants';

export default function LorePage() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '100vh',
      background: '#c0c0c0'
    }}>
      <div className="window" style={{ position: 'static' }}>
        <div className="title-bar">
          <div className="title-bar-text">Lore</div>
        </div>
        <div className="window-body">
          <MarkdownPane content={loreMarkdown} />
        </div>
      </div>
    </div>
  );
}
