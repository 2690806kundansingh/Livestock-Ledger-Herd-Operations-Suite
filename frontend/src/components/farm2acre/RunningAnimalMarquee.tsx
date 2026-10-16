// File: frontend/src/components/farm2acre/RunningAnimalMarquee.tsx

import React, { useRef, useState } from 'react';
import { MARQUEE_ANIMALS } from '../../data/farm2AcreData';
import { SpeciesType } from '../../types/farm2Acre';
import { useFarmVoice } from '../../utils/speechVoice';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';

interface RunningAnimalMarqueeProps {
  onSelectSpecies: (species: SpeciesType) => void;
  selectedSpecies: SpeciesType;
}

export const RunningAnimalMarquee: React.FC<RunningAnimalMarqueeProps> = ({
  onSelectSpecies,
  selectedSpecies,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleCardClick = (species: SpeciesType) => {
    onSelectSpecies(species);
    const element = document.getElementById('species-management-module');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAudioClick = (e: React.MouseEvent, announcement: string) => {
    e.stopPropagation();
    if (isSpeaking && currentText === announcement) {
      stop();
    } else {
      speak(announcement);
    }
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getSpeciesBadgeColor = (species: SpeciesType) => {
    switch (species) {
      case 'cow':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'goat':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'fish':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'hen':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'pig':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <section className="relative w-full py-4 bg-slate-900/80 border-y border-slate-800/80 backdrop-blur-md overflow-hidden">
      {/* Top Banner Control Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-2">
              <span>Live 2-Acre Herd Activity Banner</span>
              <span className="text-[10px] font-normal normal-case text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                Tap card to open portal
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Continuous sensor feed of active livestock in all 5 farm zones • Tap 🔊 for rural audio readout
            </p>
          </div>
        </div>

        {/* Carousel Scroll Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-[11px] font-medium text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
          >
            {isPaused ? '▶ Play' : '⏸ Pause'}
          </button>
          <button
            onClick={() => handleManualScroll('left')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div
        ref={scrollContainerRef}
        className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex space-x-4 px-4 sm:px-6 py-2 select-none ${
          !isPaused ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* We duplicate the array to give a continuous rich stream */}
        {[...MARQUEE_ANIMALS, ...MARQUEE_ANIMALS].map((animal, idx) => {
          const isSelected = selectedSpecies === animal.species;
          const isCardSpeaking = isSpeaking && currentText === animal.audioAnnouncement;

          return (
            <div
              key={`${animal.species}-${idx}`}
              onClick={() => handleCardClick(animal.species)}
              className={`shrink-0 w-80 sm:w-96 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group shadow-lg ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/50 shadow-emerald-950/50 scale-[1.02]'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 hover:scale-[1.01]'
              }`}
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${getSpeciesBadgeColor(
                      animal.species
                    )}`}
                  >
                    {animal.species.toUpperCase()}
                  </span>

                  {/* 🔊 Audio Voice Speaker Button */}
                  <button
                    onClick={(e) => handleAudioClick(e, animal.audioAnnouncement)}
                    className={`p-2 rounded-xl transition-all shadow-md flex items-center space-x-1.5 backdrop-blur-md ${
                      isCardSpeaking
                        ? 'bg-emerald-500 text-white animate-pulse shadow-emerald-500/50'
                        : 'bg-slate-900/80 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700/80'
                    }`}
                    title="Tap to hear pasture status in speech"
                    aria-label={`Listen to ${animal.name} status`}
                  >
                    {isCardSpeaking ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        <span className="text-[10px] font-bold hidden sm:inline">Playing</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 text-emerald-400 group-hover:text-white" />
                        <span className="text-[10px] font-bold text-slate-300">🔊 Listen</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                      {animal.name}
                    </h4>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <Activity className="h-3 w-3 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-slate-300 font-medium truncate max-w-[220px]">
                        {animal.actionText}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Census</span>
                    <span className="text-sm font-black text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-lg">
                      {animal.headcount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Tap Action bar */}
              <div className="px-3.5 py-2.5 bg-slate-900 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
                  <span>Go to Management Hub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {isSelected ? 'CURRENTLY ACTIVE' : 'TAP TO SELECT'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
