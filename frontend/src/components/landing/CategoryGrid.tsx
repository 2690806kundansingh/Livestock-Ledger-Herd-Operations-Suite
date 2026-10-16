// File: frontend/src/components/landing/CategoryGrid.tsx

import React, { useState } from 'react';
import { Volume2, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CATEGORIES_DATA, CategoryInfo } from '../../data/landingData';
import { LivestockCategory } from '../../types/landing';
import { livestockAudio } from '../../utils/audioSynthesizer';

interface CategoryGridProps {
  selectedCategory: LivestockCategory | 'ALL';
  onSelectCategory: (category: LivestockCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [playingCategory, setPlayingCategory] = useState<LivestockCategory | null>(null);

  const handlePlayAudio = (e: React.MouseEvent, cat: CategoryInfo) => {
    e.stopPropagation();
    setPlayingCategory(cat.id);

    switch (cat.soundType) {
      case 'cattle':
        livestockAudio.playCattleSound();
        break;
      case 'buffalo':
        livestockAudio.playBuffaloSound();
        break;
      case 'goat':
        livestockAudio.playGoatSound();
        break;
      case 'poultry':
        livestockAudio.playPoultrySound();
        break;
    }

    setTimeout(() => {
      setPlayingCategory((curr) => (curr === cat.id ? null : curr));
    }, 2200);
  };

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Species & Breeds Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Livestock Categories with Audio Calls
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 sm:mt-0">
          Tap the <Volume2 className="h-3.5 w-3.5 inline text-emerald-400 mx-0.5" /> audio icon to hear realistic vocalizations & acoustic signatures
        </p>
      </div>

      {/* 4-Column Grid for Cattle, Buffalo, Goat, Poultry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const isAudioPlaying = playingCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl ${
                isSelected
                  ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
              }`}
            >
              {/* Image Container with high-res photography */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badge: Headcount */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200">
                  {cat.count.toLocaleString()} Headcount
                </div>

                {/* Audio Icon Button with interactive feedback */}
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(e, cat)}
                  title={cat.audioPrompt}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg ${
                    isAudioPlaying
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-110 shadow-emerald-500/50'
                      : 'bg-slate-950/80 border-slate-600 hover:border-emerald-400 text-emerald-400 hover:scale-105'
                  }`}
                >
                  {isAudioPlaying ? (
                    <div className="flex items-center space-x-1 px-1">
                      <Volume2 className="h-4 w-4 animate-bounce" />
                      {/* Animated audio equalizer waveform */}
                      <span className="flex space-x-0.5 items-end h-3">
                        <span className="w-0.5 h-3 bg-slate-950 animate-pulse" />
                        <span className="w-0.5 h-2 bg-slate-950 animate-ping" />
                        <span className="w-0.5 h-3 bg-slate-950 animate-pulse" />
                      </span>
                    </div>
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>

                {/* Bottom Overlay inside Image */}
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-medium">
                        {cat.hindiName} • <span className="italic text-slate-400">{cat.scientificName}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Breeds & Selection indicator */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800/80 space-y-3">
                {/* Popular breeds preview */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.featuredBreeds.slice(0, 3).map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/60"
                    >
                      {b}
                    </span>
                  ))}
                  {cat.featuredBreeds.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-800/60 text-[10px] text-slate-400">
                      +{cat.featuredBreeds.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className={`font-semibold flex items-center space-x-1 ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Filter Active</span>
                      </>
                    ) : (
                      <>
                        <Filter className="h-3.5 w-3.5" />
                        <span>View Listings</span>
                      </>
                    )}
                  </span>
                  <span className="text-[11px] text-emerald-400/90 font-mono">
                    Audio Sample 🔊
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
