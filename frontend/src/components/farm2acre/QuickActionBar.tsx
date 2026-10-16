// File: frontend/src/components/farm2acre/QuickActionBar.tsx

import React, { useState } from 'react';
import { SpeciesType } from '../../types/farm2Acre';
import { useFarmVoice } from '../../utils/speechVoice';
import {
  Volume2,
  VolumeX,
  PhoneCall,
  Globe,
  BookOpen,
} from 'lucide-react';

interface QuickActionBarProps {
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
  onOpenEmergencySOS: () => void;
  onOpenGuide: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({
  selectedSpecies,
  onSelectSpecies,
  onOpenEmergencySOS,
  onOpenGuide,
}) => {
  const { isSpeaking, speak, stop } = useFarmVoice();
  const [selectedLang, setSelectedLang] = useState<'EN' | 'HI' | 'HINGLISH'>('EN');

  const zoneShortcuts: { species: SpeciesType; label: string; zoneLetter: string; icon: string; color: string }[] = [
    { species: 'cow', label: 'Cattle Dairy', zoneLetter: 'A', icon: '🐄', color: 'border-emerald-500/60 text-emerald-400' },
    { species: 'goat', label: 'Goat House', zoneLetter: 'B', icon: '🐐', color: 'border-amber-500/60 text-amber-400' },
    { species: 'fish', label: 'Fish Pond', zoneLetter: 'C', icon: '🐟', color: 'border-cyan-500/60 text-cyan-400' },
    { species: 'hen', label: 'Poultry Coop', zoneLetter: 'D', icon: '🐔', color: 'border-rose-500/60 text-rose-400' },
    { species: 'pig', label: 'Piggery Pen', zoneLetter: 'E', icon: '🐖', color: 'border-purple-500/60 text-purple-400' },
  ];

  const handleZoneClick = (species: SpeciesType) => {
    onSelectSpecies(species);
    const el = document.getElementById('species-management-module');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVoiceTest = () => {
    if (isSpeaking) {
      stop();
    } else {
      if (selectedLang === 'HI') {
        speak('नमस्ते किसान साथी। दो एकड़ मिश्रित फार्म प्रबंधन पोर्टल में आपका स्वागत है। किसी भी पशु या शेड की जानकारी सुनने के लिए लाउडस्पीकर बटन दबाएं।');
      } else {
        speak('Welcome to the 2-Acre Domestic Livestock and Mixed Farm Operations Portal. Tap any speaker icon on any card to hear feeding instructions, veterinary schedules, or livestock prices.');
      }
    }
  };

  return (
    <div className="sticky top-16 z-30 w-full bg-slate-950/95 border-b border-slate-800/90 backdrop-blur-lg shadow-xl px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left Side: Voice Assistant & Language Indicators */}
        <div className="flex items-center space-x-2.5 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
          {/* Audio Voice Assistant Toggle Button */}
          <button
            onClick={handleVoiceTest}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center space-x-2 shrink-0 transition-all ${
              isSpeaking
                ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-md shadow-emerald-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border-emerald-500/40'
            }`}
            title="Toggle Voice Speech Assistant"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 animate-bounce" />
                <span>🔊 Voice Assistant</span>
              </>
            )}
          </button>

          {/* Language Selector Pill */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
            <Globe className="h-3.5 w-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setSelectedLang('EN')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                selectedLang === 'EN'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setSelectedLang('HI')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                selectedLang === 'HI'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setSelectedLang('HINGLISH')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                selectedLang === 'HINGLISH'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Guide & Instructions Side Panel Button */}
          <button
            onClick={onOpenGuide}
            className="px-3 py-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 font-bold text-xs flex items-center space-x-1.5 shrink-0 shadow-sm transition"
            title="Open Farmer's Step-by-Step Instructions Manual"
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>📖 Instructions / निर्देश</span>
          </button>

          <span className="text-[11px] text-slate-400 hidden lg:inline font-mono">
            Plot: 87,120 Sq Ft (2.00 Acres)
          </span>
        </div>

        {/* Center: Zone Jump Shortcuts */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full md:w-auto justify-start md:justify-center py-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0 hidden sm:inline mr-1">
            Zone Shortcuts:
          </span>
          {zoneShortcuts.map((zone) => {
            const isSelected = selectedSpecies === zone.species;
            return (
              <button
                key={zone.species}
                onClick={() => handleZoneClick(zone.species)}
                className={`px-2.5 py-1 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-emerald-400 ring-1 ring-emerald-400/50'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{zone.icon}</span>
                <span className="font-mono text-emerald-400">{zone.zoneLetter}</span>
                <span className="hidden sm:inline">{zone.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: 1-Tap Farm Emergency Helpline Call Button */}
        <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-end py-1">
          <button
            onClick={onOpenEmergencySOS}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30 text-xs font-bold transition items-center space-x-1.5"
          >
            <span>Triage Form</span>
          </button>
          <a
            href="tel:+9118001801551"
            className="w-full md:w-auto px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs shadow-lg shadow-rose-950/60 flex items-center justify-center space-x-2 transition transform active:scale-95 border border-rose-400/40"
            title="Direct 1-Tap Emergency Vet Call: 1800-180-1551"
          >
            <PhoneCall className="h-3.5 w-3.5 animate-ping" />
            <span className="whitespace-nowrap">🚨 1-Tap Vet Emergency SOS</span>
          </a>
        </div>
      </div>
    </div>
  );
};
