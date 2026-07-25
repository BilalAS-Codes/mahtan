import React, { useRef, useState } from 'react';
import { audioEngine } from '../../utils/audioEngine';

export function VideoLanding({ onOpenComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleClick = () => {
    if (videoRef.current && !isPlaying && isVideoLoaded) {
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
        {/* Initial Loader overlay until video is ready */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#EDE3D4] text-[#3E251C] p-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#CBB494] border-t-transparent animate-spin mb-4" />
            <span className="font-serif text-sm tracking-[0.25em] uppercase text-[#9B734B] font-bold animate-pulse">
              Loading Invitation...
            </span>
            <span className="font-serif italic text-xs text-[#3E251C]/70 mt-2">
              Doha & Mahtan
            </span>
          </div>
        )}

        <video
          ref={videoRef}
          src="./opening-animation-1777287974328.mp4"
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onEnded={handleEnded}
        />
        
        {isVideoLoaded && !isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/10">
            <span className="font-serif text-sm tracking-[0.3em] uppercase text-champagne-600 font-bold animate-pulse bg-black/20 px-6 py-2 rounded-full backdrop-blur-xs border border-white/20">
              Tap to Open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
