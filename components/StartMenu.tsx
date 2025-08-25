'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  desktopStateAtom,
  toggleStartMenuAtom,
  closeStartMenuAtom,
  openWindowAtom,
} from '@/lib/desktopState';
import { desktopIcons } from '@/lib/constants';

export default function StartMenu() {
  const [desktopState] = useAtom(desktopStateAtom);
  const [, toggleStartMenu] = useAtom(toggleStartMenuAtom);
  const [, closeStartMenu] = useAtom(closeStartMenuAtom);
  const [, openWindow] = useAtom(openWindowAtom);
  const [showJoeFuck, setShowJoeFuck] = useState(false);
  const router = useRouter();

  const handleStartButtonClick = () => {
    // Show joefuck.png animation
    setShowJoeFuck(true);
    
    // Hide it after 1.5 seconds
    setTimeout(() => {
      setShowJoeFuck(false);
    }, 1500);
  };

  if (!desktopState.startMenuOpen) return null;

  const handleProgramClick = (iconId: string) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    if (icon.appType === 'external') {
      window.open(icon.url, '_blank');
    } else {
      openWindow({
        id: icon.id,
        title: icon.title,
        appType: icon.appType,
        url: icon.url,
      });
    }
    closeStartMenu();
  };

  const handleShutDown = () => {
    router.push('/profile');
    closeStartMenu();
  };

  return (
    <>
      {/* JoeFuck Animation */}
      {showJoeFuck && (
        <div 
          className="joefuck-animation"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            animation: 'joefuckPop 1.5s ease-in-out forwards'
          }}
        >
          <img 
            src="/joefuck.png" 
            alt="JoeFuck" 
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))'
            }}
          />
        </div>
      )}
      
      <div 
        className="start-menu-overlay" 
        onClick={closeStartMenu}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
      />
      <div className="start-menu">
        <div className="start-menu-section">
          <div className="start-menu-item" onClick={() => handleProgramClick('lore')}>
            📖 Lore
          </div>
          <div className="start-menu-item" onClick={() => handleProgramClick('gallery')}>
            🖼️ Gallery
          </div>
          <div className="start-menu-item" onClick={() => handleProgramClick('community')}>
            👥 Community
          </div>
        </div>
        
        <div className="start-menu-separator" />
        
        <div className="start-menu-section">
          <div className="start-menu-item" onClick={() => handleProgramClick('dexscreener')}>
            📊 Dexscreener
          </div>
          <div className="start-menu-item" onClick={() => handleProgramClick('twitter')}>
            🐦 Twitter
          </div>
          <div className="start-menu-item" onClick={() => handleProgramClick('telegram')}>
            💬 Telegram
          </div>
        </div>
        
        <div className="start-menu-separator" />
        
        <div className="start-menu-section">
          <div className="start-menu-item" onClick={handleShutDown}>
            🔌 Shut Down
          </div>
        </div>
      </div>
    </>
  );
}
