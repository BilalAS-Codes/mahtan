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
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#EDE3D4] text-[#3E251C] p-6 text-center shadow-2xl">
            {/* Proper Luxury Circular SVG Spinner */}
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <svg className="w-full h-full animate-spin text-[#9B734B]" viewBox="0 0 50 50">
                <circle
                  className="opacity-20"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#3E251C"
                  strokeWidth="4"
                />
                <circle
                  className="opacity-90"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="80, 200"
                  strokeDashoffset="0"
                />
              </svg>
              {/* Inner Heart Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-[#9B734B]">
                <div className="w-2 h-2 rounded-full bg-[#9B734B] animate-ping" />
              </div>
            </div>

            <span className="font-serif text-xs tracking-[0.3em] uppercase text-[#9B734B] font-bold animate-pulse">
              Loading Invitation...
            </span>
            <span className="font-serif italic text-[11px] text-[#3E251C]/70 mt-1.5">
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
