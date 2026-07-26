import React, { useRef, useState, useEffect } from 'react';
import { audioEngine } from '../../utils/audioEngine';

export function VideoLanding({ onOpenComplete }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Check if video is ready
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setIsVideoLoaded(true);
    }
  }, []);

  const handleClick = () => {
    // Start background music audio immediately on user click
    audioEngine.start();

    if (videoRef.current) {
      // Unmute video so its soundtrack or audio plays if present
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsVideoLoaded(true);
          })
          .catch((err) => {
            console.warn("Video play attempt failed, trying muted play:", err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().then(() => {
                setIsPlaying(true);
                setIsVideoLoaded(true);
              }).catch(() => {
                // If video fails completely, skip to site
                onOpenComplete();
              });
            }
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
        
        {/* Default Golden Embroidery Background Preloader */}
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
                Tap anywhere to start
              </span>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src="./opening-animation-1777287974328.mp4"
          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          playsInline
          muted
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}
