'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';

import clsx from 'clsx';
import { openWindowAtom } from '@/lib/desktopState';

interface IconProps {
  id: string;
  title: string;
  src: string;
  appType: 'internal' | 'iframe' | 'external';
  url?: string;
  onDoubleClick?: () => void;
}

export default function Icon({ id, title, src, appType, url, onDoubleClick }: IconProps) {
  const [selected, setSelected] = useState(false);
  const [, openWindow] = useAtom(openWindowAtom);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setSelected(true);
    
    // Clear existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    // Set timeout to deselect after 2 seconds
    const timeout = setTimeout(() => {
      setSelected(false);
    }, 2000);
    
    setClickTimeout(timeout);
  };

  const handleDoubleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    
    setSelected(false);
    
    if (appType === 'external') {
      // Open external link in new tab
      console.log('Opening external URL:', url, 'for icon:', id);
      window.open(url, '_blank');
    } else {
      // Open internal window or iframe
      openWindow({ id, title, appType, url });
    }
    
    onDoubleClick?.();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (appType === 'iframe' && url) {
      // For iframe apps, show context menu with "Open in new tab" option
      const contextMenu = document.createElement('div');
      contextMenu.className = 'context-menu';
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      
      const openInTabItem = document.createElement('div');
      openInTabItem.className = 'context-menu-item';
      openInTabItem.textContent = 'Open in new tab';
      openInTabItem.onclick = () => {
        window.open(url, '_blank');
        document.body.removeChild(contextMenu);
      };
      
      contextMenu.appendChild(openInTabItem);
      document.body.appendChild(contextMenu);
      
      // Remove context menu when clicking elsewhere
      const removeMenu = () => {
        if (document.body.contains(contextMenu)) {
          document.body.removeChild(contextMenu);
        }
        document.removeEventListener('click', removeMenu);
      };
      
      setTimeout(() => {
        document.addEventListener('click', removeMenu);
      }, 0);
    }
  };

  return (
    <div
      className={clsx('desktop-icon', { selected })}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <img
        src={src}
        alt={title}
        width={48}
        height={48}
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="label">{title}</div>
    </div>
  );
}
