import React, { useState, useRef, useEffect } from 'react';

interface Props {
  lang: string;
}

export default function SoundOfSleep({ lang }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouthBreathing, setIsMouthBreathing] = useState(false);
  const [progress, setProgress] = useState(0);

  const t = {
    en: {
      title: "The Sound of Sleep",
      subtitle: "Hear what the AI hears. Switch between healthy nasal breathing and mouth breathing.",
      nasal: "Nasal Breathing",
      mouth: "Mouth Breathing (Detected)",
      play: "Play Audio",
      pause: "Pause Audio"
    },
    de: {
      title: "Der Klang des Schlafs",
      subtitle: "Höre, was die KI hört. Wechsle zwischen gesunder Nasenatmung und Mundatmung.",
      nasal: "Nasenatmung",
      mouth: "Mundatmung (Erkannt)",
      play: "Audio abspielen",
      pause: "Audio pausieren"
    },
    pl: {
      title: "Dźwięk Snu",
      subtitle: "Usłysz to, co słyszy AI. Przełączaj między zdrowym oddychaniem przez nos a oddychaniem przez usta.",
      nasal: "Oddychanie Przez Nos",
      mouth: "Oddychanie Przez Usta (Wykryto)",
      play: "Odtwórz Dźwięk",
      pause: "Wstrzymaj Dźwięk"
    }
  }[lang as 'en' | 'de' | 'pl'] || {
    title: "The Sound of Sleep",
    subtitle: "Hear what the AI hears.",
    nasal: "Nasal Breathing",
    mouth: "Mouth Breathing (Detected)",
    play: "Play",
    pause: "Pause"
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-brand-dark rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-white/5">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-oddval font-bold text-white mb-3">{t.title}</h3>
        <p className="text-sm md:text-base font-montserrat text-white/50 max-w-lg mx-auto">{t.subtitle}</p>
      </div>

      <div className="relative max-w-xl mx-auto bg-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md border border-white/10">
        
        {/* Toggle */}
        <div className="flex bg-black/40 rounded-full p-1 mb-8 relative">
          <button 
            onClick={() => setIsMouthBreathing(false)}
            className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold font-montserrat transition-all z-10 ${!isMouthBreathing ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            {t.nasal}
          </button>
          <button 
            onClick={() => setIsMouthBreathing(true)}
            className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold font-montserrat transition-all z-10 ${isMouthBreathing ? 'text-brand-dark' : 'text-white/50 hover:text-white/80'}`}
          >
            {t.mouth}
          </button>
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ${!isMouthBreathing ? 'left-1 bg-white/10' : 'left-[calc(50%+2px)] bg-brand-yellow'}`}></div>
        </div>

        {/* Visualizer */}
        <div className="h-32 flex items-center justify-center gap-1 mb-8">
          {[...Array(30)].map((_, i) => {
            // Create different waveform patterns based on mode
            const baseHeight = isMouthBreathing ? 
              (Math.sin(i * 0.5) * 40 + 50) : // Spiky, irregular
              (Math.sin(i * 0.2) * 10 + 20);  // Smooth, calm
            
            const dynamicHeight = isPlaying ? baseHeight + (Math.random() * (isMouthBreathing ? 40 : 10)) : 4;
            
            return (
              <div 
                key={i}
                className={`w-2 rounded-full transition-all duration-150 ${isMouthBreathing ? 'bg-brand-yellow' : 'bg-brand-blue'}`}
                style={{ 
                  height: `${dynamicHeight}px`,
                  opacity: isPlaying ? (i < (progress / 100) * 30 ? 1 : 0.4) : 0.2
                }}
              ></div>
            );
          })}
        </div>

        {/* Play/Pause */}
        <div className="flex justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isMouthBreathing ? 'bg-brand-yellow text-brand-dark hover:bg-yellow-400 hover:scale-105' : 'bg-brand-blue text-white hover:bg-[#1a5cd4] hover:scale-105'} shadow-[0_0_30px_rgba(0,0,0,0.3)]`}
            aria-label={isPlaying ? t.pause : t.play}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

        {/* AI Detection Badge */}
        {isMouthBreathing && isPlaying && (
          <div className="absolute -top-4 -right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full animate-bounce shadow-[0_0_15px_rgba(239,68,68,0.5)] font-montserrat uppercase tracking-wider">
            Alert: Mouth Breathing
          </div>
        )}
      </div>
    </div>
  );
}
