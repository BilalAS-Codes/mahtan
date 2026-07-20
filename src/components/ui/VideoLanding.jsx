import React, { useRef, useState } from 'react';
import { audioEngine } from '../../utils/audioEngine';

export function VideoLanding({ onOpenComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
      // Start background music immediately on user interaction click
      audioEngine.start();
    }
  };

  const handleEnded = () => {
    // When video ends, vanish and show the website
    onOpenComplete();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#EDE3D4] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[960/2106] h-full max-w-full bg-[#EDE3D4] flex items-center justify-center border-x border-[#d6c3a1]">
        <video
          ref={videoRef}
          src="./opening-animation-1777287974328.mp4"
          className="w-full h-full object-cover"
          playsInline
          onEnded={handleEnded}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/10">
            <span className="font-serif text-sm tracking-[0.3em] uppercase text-champagne-600 font-bold animate-pulse">
              Tap to Open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
