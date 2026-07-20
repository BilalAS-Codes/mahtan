import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Make sure we stop audio if the component unmounts
    return () => {
      audioEngine.stop();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      audioEngine.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Soft Text Hint (fades out after clicked once) */}
      {!isPlaying && (
        <div className="hidden md:block glass-panel px-4 py-2 rounded-full text-xs font-serif font-medium text-rosepink-500 tracking-wider animate-float-slow">
          Listen to the Garden
        </div>
      )}

      {/* Floating Audio Button */}
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute ambient sounds" : "Unmute ambient sounds"}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg pointer-events-auto border border-white/60 ${
          isPlaying 
            ? 'bg-amber-500 text-white shadow-amber-500/20 rotate-6 scale-105' 
            : 'bg-[#FAF6EE]/80 text-rosepink-500 hover:text-amber-500 hover:scale-105 hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
            {/* Soft wave pulses when active */}
            <span className="absolute -inset-2 rounded-full border border-amber-400/40 animate-ping opacity-60"></span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
