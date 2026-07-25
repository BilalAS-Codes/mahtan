import React, { useRef, useState, useEffect } from 'react';
import { audioEngine } from '../../utils/audioEngine';

export function VideoLanding({ onOpenComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // If video is already cached or readyState >= 3
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  const handleClick = () => {
    // If video is still loading when user clicks, mark as loaded so play can execute
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
    }

    // Immediately trigger background music on user touch/click interaction
    audioEngine.start();

    if (videoRef.current && !isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Video playback error:", err);
            setIsPlaying(true);
          });
      }
    }
  };

  const handleEnded = () => {
    onOpenComplete();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#EDE3D4] cursor-pointer selection:bg-transparent"
      onClick={handleClick}
    >
      <div className="relative aspect-[960/2106] h-full max-w-full bg-[#EDE3D4] flex items-center justify-center border-x border-[#d6c3a1]">
        
        {/* Default Golden Embroidery Background Preloader (visible before video loads) */}
        {!isVideoLoaded && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-[#3E251C] p-6 text-center bg-cover bg-center"
            style={{ backgroundImage: "url('./embroidery-beige-bg-DRgV_0KT.png')" }}
          >
            <div className="absolute inset-0 bg-[#F8F5F2]/40 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-3 border-[#CBB494] border-t-transparent animate-spin mb-5 shadow-sm" />
              <div className="font-serif text-sm tracking-[0.3em] uppercase text-[#9B734B] font-bold animate-pulse mb-1">
                ✦ Loading Invitation ✦
              </div>
              <h2 className="font-serif italic text-2xl text-[#3E251C] font-bold mt-2">
                Doha & Mahtan
              </h2>
              <span className="text-xs font-serif text-[#9B734B] uppercase tracking-widest mt-1">
                20th September 2026
              </span>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src="./opening-animation-1777287974328.mp4"
          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onEnded={handleEnded}
        />

        {isVideoLoaded && !isPlaying && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none bg-black/15">
            <span className="font-serif text-sm tracking-[0.3em] uppercase text-amber-200 font-bold animate-pulse bg-black/40 px-8 py-3 rounded-full backdrop-blur-md border border-amber-400/40 shadow-xl">
              Tap to Open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
