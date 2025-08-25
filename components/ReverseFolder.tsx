'use client';

import { useState } from 'react';

export default function ReverseFolder() {
  const [isReversed, setIsReversed] = useState(false);

  const handleClick = () => {
    if (isReversed) {
      // Restore normal orientation
      setIsReversed(false);
      document.body.style.transform = '';
      document.body.style.cursor = '';
      document.body.style.filter = '';
      document.body.classList.remove('chaos-mode');
      // Remove all the chaos
      document.querySelectorAll('.chaos-element').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
      // Remove fake cursor
      const fakeCursor = document.getElementById('fake-cursor');
      if (fakeCursor) fakeCursor.remove();
      // Restore normal mouse behavior
      document.removeEventListener('mousemove', reverseMouse);
      document.removeEventListener('click', reverseClick);
    } else {
      // Create maximum chaos!
      setIsReversed(true);
      
      // Flip screen horizontally AND vertically
      document.body.style.transform = 'scaleX(-1) scaleY(-1)';
      document.body.style.cursor = 'crosshair';
      document.body.classList.add('chaos-mode');
      
      // Add some crazy filters
      document.body.style.filter = 'hue-rotate(180deg) brightness(0.8) contrast(1.5)';
      
      // Reverse mouse movement and clicks
      startMouseChaos();
      
      // Create floating troll messages
      createTrollMessages();
      
      // Make the folder move around randomly
      startFolderChaos();
      
      // Add some random screen shaking
      startScreenShake();
    }
  };

  const startMouseChaos = () => {
    // Reverse mouse movement
    document.addEventListener('mousemove', reverseMouse);
    // Reverse click positions
    document.addEventListener('click', reverseClick);
  };

  const reverseMouse = (e: MouseEvent) => {
    if (!isReversed) return;
    
    // Create a fake cursor that moves in the opposite direction
    const fakeCursor = document.getElementById('fake-cursor') || createFakeCursor();
    const reversedX = window.innerWidth - e.clientX;
    const reversedY = window.innerHeight - e.clientY;
    
    fakeCursor.style.left = reversedX + 'px';
    fakeCursor.style.top = reversedY + 'px';
  };

  const reverseClick = (e: MouseEvent) => {
    if (!isReversed) return;
    
    // Prevent the original click
    e.preventDefault();
    e.stopPropagation();
    
    // Create a click at the reversed position
    const reversedX = window.innerWidth - e.clientX;
    const reversedY = window.innerHeight - e.clientY;
    
    // Simulate a click at the reversed position
    const elementAtReversedPos = document.elementFromPoint(reversedX, reversedY);
    if (elementAtReversedPos) {
      elementAtReversedPos.dispatchEvent(new MouseEvent('click', {
        clientX: reversedX,
        clientY: reversedY,
        bubbles: true
      }));
    }
  };

  const createFakeCursor = () => {
    const cursor = document.createElement('div');
    cursor.id = 'fake-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #ff0000 0%, #ff0000 70%, transparent 100%);
      border: 2px solid #ffff00;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    return cursor;
  };

  const createTrollMessages = () => {
    const messages = [
      "HAHA GOTCHA! 😈",
      "Try to click me now! 🎯",
      "Good luck finding me! 🕵️",
      "This is what you get! 😂",
      "Still trying? 🤪",
      "Give up yet? 😏"
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        const trollMsg = document.createElement('div');
        trollMsg.className = 'chaos-element troll-message';
        trollMsg.textContent = msg;
        trollMsg.style.cssText = `
          position: fixed;
          left: ${Math.random() * (window.innerWidth - 200)}px;
          top: ${Math.random() * (window.innerHeight - 100)}px;
          background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
          color: white;
          padding: 10px 20px;
          border: 3px solid #ffff00;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          z-index: 10000;
          animation: bounce 0.5s infinite alternate;
          pointer-events: none;
        `;
        document.body.appendChild(trollMsg);
      }, index * 1000);
    });
  };

  const startFolderChaos = () => {
    const folder = document.querySelector('.reverse-folder');
    if (folder instanceof HTMLElement) {
      let interval = setInterval(() => {
        if (!isReversed) {
          clearInterval(interval);
          return;
        }
        
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        
        folder.style.position = 'fixed';
        folder.style.left = x + 'px';
        folder.style.top = y + 'px';
        folder.style.zIndex = '10001';
      }, 2000);
    }
  };

  const startScreenShake = () => {
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      if (!isReversed || shakeCount > 50) {
        clearInterval(shakeInterval);
        document.body.style.transform = document.body.style.transform || '';
        return;
      }
      
      const shakeX = (Math.random() - 0.5) * 20;
      const shakeY = (Math.random() - 0.5) * 20;
      const currentTransform = document.body.style.transform;
      document.body.style.transform = `${currentTransform} translate(${shakeX}px, ${shakeY}px)`;
      
      shakeCount++;
    }, 100);
  };

  return (
    <div 
      className="desktop-icon reverse-folder"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        border: '2px outset #c0c0c0',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '1px 1px 0px #000'
      }}>
        📁
      </div>
      <div className="label" style={{
        fontSize: '11px',
        color: 'white',
        textShadow: '1px 1px 0px #000',
        textAlign: 'center',
        marginTop: '4px',
        maxWidth: '60px',
        wordWrap: 'break-word',
        lineHeight: '12px'
      }}>
        I'm not a virus
      </div>
      <div className="label" style={{
        fontSize: '11px',
        color: 'white',
        textShadow: '1px 1px 0px #000',
        textAlign: 'center',
        marginTop: '2px',
        maxWidth: '60px',
        wordWrap: 'break-word',
        lineHeight: '12px'
      }}>
        trust me
      </div>
    </div>
  );
}
