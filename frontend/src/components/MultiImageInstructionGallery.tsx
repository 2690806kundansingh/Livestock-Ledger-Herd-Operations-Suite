// File: frontend/src/components/MultiImageInstructionGallery.tsx

import React, { useState, useEffect } from 'react';
import { SPECIES_MULTI_IMAGE_GALLERY, GalleryStepItem } from '../data/speciesGalleryData';
import { SpeciesType } from '../types/farm2Acre';
import { useFarmVoice } from '../utils/speechVoice';
import {
  Volume2,
  VolumeX,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

interface MultiImageInstructionGalleryProps {
  initialSpecies?: SpeciesType;
  showSpeciesSelector?: boolean;
  onSpeciesChange?: (species: SpeciesType) => void;
  title?: string;
  subtitle?: string;
}

export const MultiImageInstructionGallery: React.FC<MultiImageInstructionGalleryProps> = ({
  initialSpecies = 'fish',
  showSpeciesSelector = true,
  onSpeciesChange,
  title,
  subtitle,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType>(initialSpecies);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialSpecies) {
      setSelectedSpecies(initialSpecies);
      setActiveStepIndex(0);
    }
  }, [initialSpecies]);

  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  const currentSpeciesData = SPECIES_MULTI_IMAGE_GALLERY[selectedSpecies];
  const activeStep: GalleryStepItem = currentSpeciesData.gallery[activeStepIndex] || currentSpeciesData.gallery[0];

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : currentSpeciesData.gallery.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev < currentSpeciesData.gallery.length - 1 ? prev + 1 : 0));
  };

  const handleSelectAnimal = (sp: SpeciesType) => {
    setSelectedSpecies(sp);
    setActiveStepIndex(0);
    if (onSpeciesChange) onSpeciesChange(sp);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Housing':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40';
      case 'Mat / Bedding':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40';
      case 'Water & Aeration':
        return 'bg-blue-950/80 text-blue-400 border-blue-500/40';
      case 'Feeding':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/40';
      case 'Health':
        return 'bg-rose-950/80 text-rose-400 border-rose-500/40';
      default:
        return 'bg-purple-950/80 text-purple-400 border-purple-500/40';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>{currentSpeciesData.zone} • Step-by-Step Visual Field Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title || `${currentSpeciesData.commonName} Multi-Image & Instruction Guide`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {subtitle || currentSpeciesData.summary}
          </p>
        </div>

        {/* Listen Step Audio Button */}
        <button
          onClick={() => handleSpeech(activeStep.speechText)}
          className={`px-4 py-2.5 rounded-2xl border font-bold text-xs transition flex items-center space-x-2 shadow-lg self-start sm:self-auto shrink-0 ${
            isSpeaking && currentText === activeStep.speechText
              ? 'bg-emerald-500 text-slate-950 animate-pulse border-emerald-400'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
          title="Listen to current step instructions"
        >
          {isSpeaking && currentText === activeStep.speechText ? (
            <>
              <VolumeX className="h-4 w-4" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 text-emerald-400" />
              <span>🔊 Listen Step {activeStep.stepNumber}</span>
            </>
          )}
        </button>
      </div>

      {/* Optional Species Switcher Bar */}
      {showSpeciesSelector && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: 'fish' as SpeciesType, label: 'Ponds & Fish', icon: '🐟' },
            { id: 'cow' as SpeciesType, label: 'Cattle & Dairy', icon: '🐄' },
            { id: 'goat' as SpeciesType, label: 'Elevated Goats', icon: '🐐' },
            { id: 'hen' as SpeciesType, label: 'Poultry & Coops', icon: '🐔' },
            { id: 'pig' as SpeciesType, label: 'Piggery & Slopes', icon: '🐖' },
          ].map((tab) => {
            const isSelected = selectedSpecies === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectAnimal(tab.id)}
                className={`py-2.5 px-3 rounded-2xl border text-center transition-all flex items-center justify-center space-x-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg font-bold scale-[1.02]'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Multi-Image Stage & Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Big Interactive Hero Image */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl group">
            <div className="h-80 sm:h-96 w-full overflow-hidden">
              <img
                src={activeStep.imageUrl}
                alt={activeStep.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            {/* Badges on Top */}
            <div className="absolute top-3 left-3 flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-xs font-black text-emerald-400 shadow-md">
                STEP 0{activeStep.stepNumber} OF 0{currentSpeciesData.gallery.length}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getCategoryColor(activeStep.category)}`}>
                {activeStep.category}
              </span>
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition shadow-md"
              title="Enlarge high-resolution photo"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            {/* Carousel Navigation Arrow Overlays */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 backdrop-blur-sm transition"
              title="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 backdrop-blur-sm transition"
              title="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Title Overlay at Bottom of Image */}
            <div className="absolute bottom-3 inset-x-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
              <h3 className="text-base font-black text-white leading-tight">
                {activeStep.title}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">
                {activeStep.subtitle}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip (All 6 Images Clickable) */}
          <div className="grid grid-cols-6 gap-2 pt-1">
            {currentSpeciesData.gallery.map((item, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-square group ${
                    isSelected
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105 shadow-lg'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                  title={`Step ${item.stepNumber}: ${item.title}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-slate-950/90 text-[9px] font-bold text-white">
                    0{item.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step-by-Step Instructions & Pro-Tip */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase">
                  Instruction Phase 0{activeStep.stepNumber} of 0{currentSpeciesData.gallery.length}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Standard Operating Procedures:
                </h4>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Checklist */}
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeStep.instructions.map((ins, i) => (
                <li key={i} className="flex items-start space-x-2.5 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Golden Pro-Tip Callout Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 space-y-1.5 shadow-md">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase text-[10px] tracking-wider">
              <Lightbulb className="h-4 w-4" />
              <span>Expert Field Pro-Tip:</span>
            </div>
            <p className="leading-relaxed">
              {activeStep.proTip}
            </p>
          </div>

          {/* Audio Quick Play Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Rural Audio Voice Guidance</span>
            <button
              onClick={() => handleSpeech(activeStep.speechText)}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Play Audio Voice 🔊</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">
                  {currentSpeciesData.commonName} • Step {activeStep.stepNumber}
                </span>
                <h3 className="text-base font-bold text-white">{activeStep.title}</h3>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative w-full h-80 sm:h-[450px] rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={activeStep.imageUrl}
                alt={activeStep.title}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStep.subtitle} — {activeStep.instructions.join(' ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageInstructionGallery;
