'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import clsx from 'clsx';
import Icon from './Icon';
import Win98Window from './Win98Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import MarkdownPane from './MarkdownPane';
import GalleryGrid from './GalleryGrid';
import ReverseFolder from './ReverseFolder';
import PrivateFolder from './PrivateFolder';
import {
  desktopStateAtom,
  setThemeAtom,
  closeStartMenuAtom,
  openWindowAtom,
} from '@/lib/desktopState';
import { desktopIcons, loreMarkdown } from '@/lib/constants';

export default function Desktop() {
  const [desktopState] = useAtom(desktopStateAtom);
  const [, setTheme] = useAtom(setThemeAtom);
  const [, closeStartMenu] = useAtom(closeStartMenuAtom);
  const [, openWindow] = useAtom(openWindowAtom);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('joe98-theme') as 'teal' | 'clouds' | 'wallpaper' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Set wallpaper as default theme if no saved theme
        setTheme('wallpaper');
      }
    }
  }, [setTheme]);

  const handleDesktopClick = () => {
    closeStartMenu();
    setContextMenu(null);
  };

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeStartMenu();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleThemeChange = (newTheme: 'teal' | 'clouds' | 'wallpaper') => {
    setTheme(newTheme);
    setContextMenu(null);
  };

  const handlePropertiesClick = () => {
    openWindow({
      id: 'properties',
      title: 'Desktop Properties',
      appType: 'internal' as const,
    });
    setContextMenu(null);
  };

  const openWindows = Object.values(desktopState.windows).filter(w => w.open);

  return (
    <div
      className={clsx('desktop', `theme-${desktopState.theme}`)}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      <div className="desktop-grid">
        {desktopIcons.map(icon => (
          <Icon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            src={icon.src}
            appType={icon.appType}
            url={icon.url}
          />
        ))}
        <ReverseFolder />
      </div>

      {/* Windows */}
      {openWindows.map(window => (
        <Win98Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => {}}
        >
          {window.id === 'lore' && (
            <MarkdownPane content={loreMarkdown} />
          )}
          {window.id === 'gallery' && (
            <GalleryGrid />
          )}
          {window.id === 'private' && (
            <PrivateFolder />
          )}
          {window.id === 'dexscreener' && window.url && (
            <iframe
              src={window.url}
              width="100%"
              height="100%"
              style={{ 
                border: 'none',
                width: '100%',
                height: '100%',
                minHeight: '600px'
              }}
              title="Dexscreener"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
          {window.id === 'properties' && (
            <div style={{ padding: '16px' }}>
              <h3>Desktop Theme</h3>
              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <input
                    type="radio"
                    name="theme"
                    value="teal"
                    checked={desktopState.theme === 'teal'}
                    onChange={() => handleThemeChange('teal')}
                    style={{ marginRight: '8px' }}
                  />
                  Teal
                </label>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <input
                    type="radio"
                    name="theme"
                    value="clouds"
                    checked={desktopState.theme === 'clouds'}
                    onChange={() => handleThemeChange('clouds')}
                    style={{ marginRight: '8px' }}
                  />
                  Clouds
                </label>
                <label style={{ display: 'block' }}>
                  <input
                    type="radio"
                    name="theme"
                    value="wallpaper"
                    checked={desktopState.theme === 'wallpaper'}
                    onChange={() => handleThemeChange('wallpaper')}
                    style={{ marginRight: '8px' }}
                  />
                  Joe&apos;s Wallpaper
                </label>
              </div>
            </div>
          )}
        </Win98Window>
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1001,
            }}
            onClick={() => setContextMenu(null)}
          />
          <div
            className="context-menu"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              zIndex: 1002,
            }}
          >
            <div className="context-menu-item" onClick={() => setContextMenu(null)}>
              Arrange Icons
            </div>
            <div className="context-menu-item" onClick={handlePropertiesClick}>
              Properties
            </div>
          </div>
        </>
      )}

      <StartMenu />
      <Taskbar />
    </div>
  );
}
