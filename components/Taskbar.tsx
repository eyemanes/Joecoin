'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  desktopStateAtom,
  toggleStartMenuAtom,
  minimizeWindowAtom,
  focusWindowAtom,
  closeWindowAtom,
} from '@/lib/desktopState';

export default function Taskbar() {
  const [desktopState] = useAtom(desktopStateAtom);
  const [, toggleStartMenu] = useAtom(toggleStartMenuAtom);
  const [, minimizeWindow] = useAtom(minimizeWindowAtom);
  const [, focusWindow] = useAtom(focusWindowAtom);
  const [, closeWindow] = useAtom(closeWindowAtom);
  const [currentTime, setCurrentTime] = useState('');
  const [showJoeFuck, setShowJoeFuck] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const openWindows = Object.values(desktopState.windows).filter(w => w.open);

  const handleTaskbarButtonClick = (windowId: string) => {
    const window = desktopState.windows[windowId];
    if (!window) return;

    if (window.minimized) {
      // Restore window
      minimizeWindow(windowId);
      focusWindow(windowId);
    } else if (window.zIndex === desktopState.highestZIndex) {
      // If window is already focused, minimize it
      minimizeWindow(windowId);
    } else {
      // Focus window
      focusWindow(windowId);
    }
  };

  const handleTaskbarButtonRightClick = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault();
    closeWindow(windowId);
  };

  const handleStartButtonClick = () => {
    // Show joefuck.png animation
    setShowJoeFuck(true);
    
    // Hide it after 4 seconds
    setTimeout(() => {
      setShowJoeFuck(false);
    }, 4000);
    
    // Toggle start menu
    toggleStartMenu();
  };

  const handleCopyCA = async () => {
    const contractAddress = '3UnujSYSAinhTJsGmqMKqXWjkyb2qMqezFQgD7HkseXW';
    try {
      await navigator.clipboard.writeText(contractAddress);
      // Show a brief success message
      const originalText = '📋 CA';
      const button = document.querySelector('.ca-button') as HTMLElement;
      if (button) {
        button.textContent = '✅ Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = contractAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      const originalText = '📋 CA';
      const button = document.querySelector('.ca-button') as HTMLElement;
      if (button) {
        button.textContent = '✅ Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    }
  };

  return (
    <div className="taskbar">
      {/* JoeFuck Animation */}
      {showJoeFuck && (
        <div 
          className="joefuck-animation"
          style={{
            position: 'fixed',
            left: '20%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            animation: 'joefuckSimple 4s ease-in-out forwards'
          }}
        >
          <img 
            src="/joefuck.png" 
            alt="JoeFuck" 
            style={{
              width: '300px',
              height: 'auto'
            }}
          />
        </div>
      )}
      
      <button 
        className="start-button button"
        onClick={handleStartButtonClick}
      >
        <img 
          src="/start.png" 
          alt="Start" 
          className="start-icon"
        />
        Start
      </button>

      <button 
        className="ca-button button"
        onClick={handleCopyCA}
        title="Copy Contract Address"
      >
        📋 CA
      </button>

      <div className="taskbar-buttons">
        {openWindows.map(window => (
          <button
            key={window.id}
            className={`taskbar-button button ${window.minimized ? 'button' : 'button pressed'}`}
            onClick={() => handleTaskbarButtonClick(window.id)}
            onContextMenu={(e) => handleTaskbarButtonRightClick(e, window.id)}
            title={window.title}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="taskbar-clock">
        {currentTime}
      </div>
    </div>
  );
}
