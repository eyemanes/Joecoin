'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileSelect() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/desktop');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleEnter]);

  return (
    <div className="profile-screen">
      <div className="profile-welcome">Welcome Joe</div>
      <div className="profile-tile" onClick={handleEnter}>
        <img 
          src="/profile.jpg" 
          alt="User Profile" 
          className="profile-image"
        />
        <div className="profile-name">Hey I&apos;m Joe</div>
        <div className="profile-enter">Right here Joe</div>
      </div>
    </div>
  );
}
