// File: frontend/src/components/farm2acre/SpeciesManagementModule.tsx

import React, { useState } from 'react';
import { SPECIES_MODULES, FARM_ZONES_CONFIG } from '../../data/farm2AcreData';
import { SpeciesType, HousingItem, MarketplaceAnimal } from '../../types/farm2Acre';
import { useFarmVoice } from '../../utils/speechVoice';
import { HousingPhotoModal } from './HousingPhotoModal';
import { MultiImageInstructionGallery } from '../MultiImageInstructionGallery';
import {
  Volume2,
  VolumeX,
  PhoneCall,
  ShieldCheck,
  Calendar,
  Sparkles,
  Tag,
  FileText,
  Clock,
  Apple,
  Wheat,
  Trees,
  Layers,
  HeartPulse,
  ShoppingBag,
  Home,
  CheckCircle,
  ZoomIn,
} from 'lucide-react';

interface SpeciesManagementModuleProps {
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
}

export const SpeciesManagementModule: React.FC<SpeciesManagementModuleProps> = ({
  selectedSpecies,
  onSelectSpecies,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  const [activeTab, setActiveTab] = useState<'HOUSING' | 'FEEDING' | 'VET' | 'MARKET' | 'MULTI_GALLERY'>('HOUSING');
  const [modalItem, setModalItem] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    imageUrl: string;
    description: string;
    badge?: string;
    specs?: string[];
    contactPhone?: string;
    dockerNumber?: string;
    earTagId?: string;
    price?: number;
  }>({
    isOpen: false,
    title: '',
    imageUrl: '',
    description: '',
  });

  const moduleData = SPECIES_MODULES[selectedSpecies];
  const zoneConfig = FARM_ZONES_CONFIG.find((z) => z.species === selectedSpecies);

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const getFeedIcon = (type: string) => {
    switch (type) {
      case 'green':
      case 'leaves':
        return <Trees className="h-4 w-4 text-emerald-400" />;
      case 'dry':
        return <Wheat className="h-4 w-4 text-amber-400" />;
      case 'concentrate':
      case 'pellet':
        return <Layers className="h-4 w-4 text-cyan-400" />;
      default:
        return <Apple className="h-4 w-4 text-purple-400" />;
    }
  };

  const openHousingModal = (item: HousingItem) => {
    setModalItem({
      isOpen: true,
      title: item.title,
      subtitle: item.subtitle,
      imageUrl: item.imageUrl,
      description: item.description,
      badge: item.keyFeature,
      specs: [
        `Part of ${moduleData.commonName} housing setup`,
        item.keyFeature,
        `Zone: ${moduleData.zoneName}`,
      ],
    });
  };

  const openMarketModal = (animal: MarketplaceAnimal) => {
    setModalItem({
      isOpen: true,
      title: animal.breedName,
      subtitle: `Official RFID: ${animal.earTagId} • Docket: ${animal.dockerNumber}`,
      imageUrl: animal.imageUrl,
      description: `${animal.notes} Located at ${animal.location}. Age: ${animal.age}, Performance metric: ${animal.metric}.`,
      badge: animal.status.replace('_', ' '),
      dockerNumber: animal.dockerNumber,
      earTagId: animal.earTagId,
      price: animal.price,
      contactPhone: animal.contactPhone,
      specs: [
        `Age: ${animal.age}`,
        `Yield / Metric: ${animal.metric}`,
        `Verified Health Status: ${animal.status}`,
        `Housing Location: ${animal.location}`,
      ],
    });
  };

  return (
    <section id="species-management-module" className="w-full py-8 space-y-6">
      {/* Species Selector Tabs with Big Touch Targets */}
      <div className="bg-slate-900/95 p-3 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Select Domestic Species Portal (5 Integrated Modules)</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
            Touch to switch animal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {Object.values(SPECIES_MODULES).map((item) => {
            const isSelected = selectedSpecies === item.species;
            return (
              <button
                key={item.species}
                onClick={() => onSelectSpecies(item.species)}
                className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl mb-1">
                    {item.species === 'cow' && '🐄'}
                    {item.species === 'goat' && '🐐'}
                    {item.species === 'fish' && '🐟'}
                    {item.species === 'hen' && '🐔'}
                    {item.species === 'pig' && '🐖'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    {item.headcount.toLocaleString()} Head
                  </span>
                </div>
                <div>
                  <h4 className={`text-sm font-black capitalize ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.commonName.split('(')[0].trim()}
                  </h4>
                  <p className="text-xs font-medium text-emerald-400">{item.vernacularName}</p>
                </div>
                {isSelected && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-emerald-500 shadow-emerald-500 shadow-md"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Species Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {zoneConfig?.name || moduleData.zoneName}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {moduleData.scientificName}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{moduleData.commonName}</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400">({moduleData.vernacularName})</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              Official 2-Acre Domestic Livestock Hub • Census: <strong className="text-white">{moduleData.headcount.toLocaleString()} registered head</strong>. Complete housing structures, veterinary protocols, daily feed formulations, and ear-tagged marketplace inventory.
            </p>
          </div>

          {/* Quick Voice Tour Button for the Animal */}
          <div className="shrink-0">
            <button
              onClick={() =>
                handleSpeech(
                  `${moduleData.commonName}, known locally as ${moduleData.vernacularName}. Current farm census is ${moduleData.headcount} head stationed in ${moduleData.zoneName}.`
                )
              }
              className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 flex items-center space-x-2 transition"
              title="Hear Species Summary in Speech"
            >
              <Volume2 className="h-4 w-4" />
              <span>🔊 Hear Species Overview</span>
            </button>
          </div>
        </div>

        {/* Sub-Portal Navigation Tabs */}
        <div className="border-t border-slate-800 bg-slate-950/60 px-4 sm:px-6 flex overflow-x-auto no-scrollbar space-x-2 py-2">
          <button
            onClick={() => setActiveTab('HOUSING')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'HOUSING'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>🏠 1. कैसा शेड बनाएं (Housing & Shed)</span>
          </button>
          <button
            onClick={() => setActiveTab('FEEDING')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'FEEDING'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Apple className="h-4 w-4" />
            <span>🥗 2. रोजाना क्या खिलाएं (Feeding Rations)</span>
          </button>
          <button
            onClick={() => setActiveTab('VET')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'VET'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HeartPulse className="h-4 w-4" />
            <span>🩺 3. डॉक्टर का नंबर (Doctor On Call)</span>
          </button>
          <button
            onClick={() => setActiveTab('MARKET')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'MARKET'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>🏷️ 4. पशु खरीद-बिक्री (Marketplace & Tags)</span>
          </button>
          <button
            onClick={() => setActiveTab('MULTI_GALLERY')}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'MULTI_GALLERY'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>📸 5. मल्टी-फोटो गाइड (Ponds & Housing Multi-Image Walkthrough)</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          SUB-SECTION 1: VISUAL HABITAT & HOUSING GALLERY
      ======================================================== */}
      {activeTab === 'HOUSING' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Home className="h-5 w-5 text-emerald-400" />
                <span>Visual Habitat & Housing Gallery</span>
              </h3>
              <p className="text-xs text-slate-400">
                3 photographic models of calibrated farm housing structures for {moduleData.commonName}. Tap photo to enlarge.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
              3 Photographic Structural Cards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moduleData.housingGallery.map((housing) => {
              const audioText = `${housing.title}. ${housing.subtitle}. ${housing.description}. Key structural innovation: ${housing.keyFeature}.`;
              const isCardSpeaking = isSpeaking && currentText === audioText;

              return (
                <div
                  key={housing.id}
                  className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-600 transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Real Housing Photo */}
                    <div
                      className="relative h-56 w-full overflow-hidden bg-slate-950 cursor-pointer"
                      onClick={() => openHousingModal(housing)}
                    >
                      <img
                        src={housing.imageUrl}
                        alt={housing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>

                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        {housing.keyFeature}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-emerald-600 text-white p-2 rounded-xl backdrop-blur-md border border-slate-700/80 transition flex items-center gap-1 text-[11px] font-semibold">
                        <ZoomIn className="h-3.5 w-3.5" />
                        <span>Enlarge Photo</span>
                      </div>
                    </div>

                    {/* Housing Details */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                            {housing.title}
                          </h4>
                          <p className="text-xs font-semibold text-emerald-400">{housing.subtitle}</p>
                        </div>

                        {/* Audio Readout for Housing Structure */}
                        <button
                          onClick={() => handleSpeech(audioText)}
                          className={`p-2 rounded-xl border transition-all shrink-0 ${
                            isCardSpeaking
                              ? 'bg-emerald-500 text-white animate-pulse border-emerald-400'
                              : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white border-slate-700'
                          }`}
                          title="Read housing engineering specs"
                          aria-label={`Read ${housing.title} specs`}
                        >
                          {isCardSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{housing.description}</p>
                    </div>
                  </div>

                  {/* Bottom Feature Pill */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>{housing.keyFeature}</span>
                    </span>
                    <button
                      onClick={() => openHousingModal(housing)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px]"
                    >
                      View Specs →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('MULTI_GALLERY')}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>📸 Explore Full 6-Image Step-by-Step Ponds & Housing Blueprint for {moduleData.commonName}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-SECTION 2: FEEDING & NUTRITION GUIDE (AUDIO READOUT)
      ======================================================== */}
      {activeTab === 'FEEDING' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Audio Master Readout Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Apple className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block">
                  Calibrated Ration Formulations
                </span>
                <h3 className="text-lg font-bold text-white">Daily Feeding & Intake Protocol</h3>
                <p className="text-xs text-slate-300 mt-0.5">{moduleData.feedingGuide.dailyIntake}</p>
              </div>
            </div>

            {/* Prominent Speaker Button */}
            <button
              onClick={() => handleSpeech(moduleData.feedingGuide.speechText)}
              className={`py-3.5 px-6 rounded-2xl border font-bold text-sm shadow-xl flex items-center space-x-2.5 transition whitespace-nowrap ${
                isSpeaking && currentText === moduleData.feedingGuide.speechText
                  ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-emerald-500/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              }`}
              title="Click to hear exact feeding ratio read aloud"
            >
              {isSpeaking && currentText === moduleData.feedingGuide.speechText ? (
                <>
                  <VolumeX className="h-5 w-5" />
                  <span>Stop Voice Assistant</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" />
                  <span>🔊 Read Daily Diet Aloud</span>
                </>
              )}
            </button>
          </div>

          {/* Feed Ratio Grid Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleData.feedingGuide.feeds.map((feed, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {getFeedIcon(feed.iconType)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{feed.name}</h4>
                      <p className="text-xs text-emerald-400 font-semibold">{feed.ratio}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                    {feed.percentage}% of Ration
                  </span>
                </div>

                {/* Percentage Bar */}
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{ width: `${feed.percentage}%` }}
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{feed.details}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Feeding Timing:</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{feed.recommendedTime}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center space-x-3">
            <span className="text-xl">💧</span>
            <span>
              <strong>Crucial Hydration Notice:</strong> Clean borehole water must be accessible 24 hours a day
              alongside feeding troughs to sustain maximum metabolism and lactation.
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-SECTION 3: VETERINARY DOCTOR ON CALL
      ======================================================== */}
      {activeTab === 'VET' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-rose-400" />
                <span>Veterinary Doctor On Call & Health Shield</span>
              </h3>
              <p className="text-xs text-slate-400">
                Assigned licensed veterinary surgeon, scheduled immunizations, and single-tap emergency dialer.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Verified License
            </span>
          </div>

          {/* Large Doctor Profile Card */}
          <div className="bg-slate-900/95 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Doctor Portrait + Direct Call */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl">
                  <img
                    src={moduleData.doctorOnCall.portraitUrl}
                    alt={moduleData.doctorOnCall.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-white">{moduleData.doctorOnCall.name}</h4>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">{moduleData.doctorOnCall.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    Reg: {moduleData.doctorOnCall.regNumber}
                  </p>
                </div>

                {/* 1-Tap Big Dialer Button */}
                <a
                  href={`tel:${moduleData.doctorOnCall.phone}`}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm shadow-xl shadow-emerald-950/80 flex items-center justify-center space-x-3 transition transform hover:scale-[1.02] active:scale-95"
                >
                  <PhoneCall className="h-5 w-5 animate-bounce" />
                  <span>1-Tap Direct Call ({moduleData.doctorOnCall.phone})</span>
                </a>
              </div>

              {/* Doctor Credentials & Schedule */}
              <div className="lg:col-span-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Vaccination Status</span>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-sm font-bold text-emerald-300">
                        {moduleData.doctorOnCall.vaccineStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">All registered animals protected under protocol</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Next Scheduled Visit</span>
                    <div className="flex items-center space-x-2 text-white font-bold text-sm">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span>{moduleData.doctorOnCall.nextCheckup}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Quarterly herd biosecurity check</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    Specialist Clinical Focus:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {moduleData.doctorOnCall.specialty}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900">
                    <span>Affiliated Clinic:</span>
                    <span className="text-slate-200 font-semibold">{moduleData.doctorOnCall.clinicName}</span>
                  </div>
                </div>

                {/* Doctor Voice Readout */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs text-slate-300">
                    <span>Need audio instructions for preparing the animals before doctor arrival?</span>
                  </div>
                  <button
                    onClick={() =>
                      handleSpeech(
                        `Doctor on call is ${moduleData.doctorOnCall.name}, Registration ${moduleData.doctorOnCall.regNumber}. Emergency phone number is ${moduleData.doctorOnCall.phone}. Next herd checkup is scheduled for ${moduleData.doctorOnCall.nextCheckup}. Current vaccination status is up to date.`
                      )
                    }
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700 transition flex items-center space-x-2 text-xs font-bold shrink-0 ml-3"
                  >
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>🔊 Read Doctor Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-SECTION 4: MARKETPLACE WITH DOCKER REGISTRY & EAR-TAGS
      ======================================================== */}
      {activeTab === 'MARKET' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-emerald-400" />
                <span>Official Certified Livestock Marketplace</span>
              </h3>
              <p className="text-xs text-slate-400">
                Government-format Docker Docket Numbers & RFID Ear-Tags with verified health status and 1-tap purchase hotline.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
              {moduleData.marketplace.length} Certified Listings
            </span>
          </div>

          {/* Marketplace Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleData.marketplace.map((animal) => {
              const audioDesc = `${animal.breedName}. Ear-Tag ID: ${animal.earTagId}. Docker number: ${
                animal.dockerNumber
              }. Age: ${animal.age}. Performance metric: ${animal.metric}. Price: ${animal.price.toLocaleString()} Rupees. Call ${
                animal.contactPhone
              } to purchase.`;
              const isCardSpeaking = isSpeaking && currentText === audioDesc;

              return (
                <div
                  key={animal.id}
                  className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-600 transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Animal Photograph with Price & Ear Tag */}
                    <div
                      className="relative h-56 w-full overflow-hidden bg-slate-950 cursor-pointer"
                      onClick={() => openMarketModal(animal)}
                    >
                      <img
                        src={animal.imageUrl}
                        alt={animal.breedName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>

                      {/* Official RFID Ear Tag Badge */}
                      <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-emerald-500/50 text-emerald-400 font-mono font-bold text-xs flex items-center space-x-1.5 shadow-md">
                        <Tag className="h-3.5 w-3.5" />
                        <span>RFID: {animal.earTagId}</span>
                      </div>

                      {/* Audio Readout Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeech(audioDesc);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                          isCardSpeaking
                            ? 'bg-emerald-500 text-white animate-pulse border-emerald-400'
                            : 'bg-slate-900/80 hover:bg-emerald-600 text-slate-200 border-slate-700/80'
                        }`}
                        title="Read out animal price and pedigree"
                        aria-label={`Listen to ${animal.breedName} details`}
                      >
                        {isCardSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                      </button>

                      {/* Verified Price Tag */}
                      <div className="absolute bottom-3 right-3 bg-emerald-600/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white font-black text-base border border-emerald-400/50 shadow-lg">
                        ₹{animal.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Animal Data Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {animal.status}
                          </span>
                          <span className="text-xs text-slate-400">{animal.location}</span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                          {animal.breedName}
                        </h4>
                      </div>

                      {/* Government Docker Tracking Registry */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-slate-500" />
                          <span>Docker No:</span>
                        </span>
                        <span className="text-emerald-400 font-bold tracking-wider">{animal.dockerNumber}</span>
                      </div>

                      {/* Key Metric & Age */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-[10px] text-slate-500 block uppercase">Age</span>
                          <span className="font-bold text-slate-200">{animal.age}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-[10px] text-slate-500 block uppercase">Yield / Weight</span>
                          <span className="font-bold text-emerald-400 truncate block">{animal.metric}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{animal.notes}</p>
                    </div>
                  </div>

                  {/* 1-Tap Green "Call to Buy" Button */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800/80">
                    <a
                      href={`tel:${animal.contactPhone}`}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Call to Buy: ₹{animal.price.toLocaleString()}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-SECTION 5: MULTI-IMAGE STEP-BY-STEP OPERATIONAL TOUR
      ======================================================== */}
      {activeTab === 'MULTI_GALLERY' && (
        <div className="space-y-4 animate-fadeIn">
          <MultiImageInstructionGallery
            initialSpecies={selectedSpecies}
            showSpeciesSelector={false}
            onSpeciesChange={(sp) => onSelectSpecies(sp)}
            title={`${moduleData.commonName} (${moduleData.vernacularName}) — Complete Photographic Walkthrough`}
            subtitle="Explore high-definition photography covering earthen pond engineering, paddlewheel aerators, slatted floors, rubber mats, precision feeding, and herd health."
          />
        </div>
      )}

      {/* Shared Housing / Animal Inspection Modal */}
      <HousingPhotoModal
        isOpen={modalItem.isOpen}
        onClose={() => setModalItem({ ...modalItem, isOpen: false })}
        title={modalItem.title}
        subtitle={modalItem.subtitle}
        imageUrl={modalItem.imageUrl}
        description={modalItem.description}
        badge={modalItem.badge}
        specs={modalItem.specs}
        contactPhone={modalItem.contactPhone}
        dockerNumber={modalItem.dockerNumber}
        earTagId={modalItem.earTagId}
        price={modalItem.price}
      />
    </section>
  );
};
