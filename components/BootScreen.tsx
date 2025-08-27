'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BootScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Automatically proceed to desktop after a short delay
          setTimeout(() => {
            router.push('/desktop');
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="boot-screen">
      {/* Windows 98 style loading screen with logo image */}
      <div className="boot-loading-container">
        <img 
          src="/loading.png" 
          alt="Joe 98 Loading" 
          className="loading-image"
        />
        
        <div className="loading-text">
          <div className="joe98-title">Joe Solana</div>
          <div className="loading-subtitle">Loading Joe...</div>
        </div>
        
        {/* Old-style progress bar */}
        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-segments">
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i} 
                  className={`progress-segment ${
                    i < Math.floor((progress / 100) * 20) ? 'filled' : ''
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="progress-text">{Math.floor(progress)}%</div>
        </div>
      </div>
    </div>
  );
}
