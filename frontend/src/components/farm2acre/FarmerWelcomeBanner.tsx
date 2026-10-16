// File: frontend/src/components/farm2acre/FarmerWelcomeBanner.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../../utils/speechVoice';
import { SpeciesType } from '../../types/farm2Acre';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  CheckCircle,
  Globe,
} from 'lucide-react';

interface FarmerWelcomeBannerProps {
  onOpenGuide: () => void;
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
  activeSectionTab: 'ANIMAL_HUB' | 'MAP' | 'NEARBY_FARMS' | 'BIO' | 'SOS' | 'ALL';
  onChangeSectionTab: (tab: 'ANIMAL_HUB' | 'MAP' | 'NEARBY_FARMS' | 'BIO' | 'SOS' | 'ALL') => void;
}

export const FarmerWelcomeBanner: React.FC<FarmerWelcomeBannerProps> = ({
  onOpenGuide,
  selectedSpecies,
  onSelectSpecies,
  activeSectionTab,
  onChangeSectionTab,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  // English by default as requested by user
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const welcomeTextEn =
    'Welcome to the 2-Acre Domestic Livestock and Mixed Farm Management Portal. Select any animal—Cattle, Goat, Fish, Hen, or Pig—to inspect calibrated housing sheds, daily feeding diets, call the registered veterinary doctor, or purchase ear-tagged livestock with direct calling.';

  const welcomeTextHi =
    'नमस्ते किसान साथी। यह आपका दो एकड़ घरेलू पशुपालन व फार्म प्रबंधन पोर्टल है। यहाँ आप गाय, बकरी, मछली, मुर्गी और सूअर का शेड, दैनिक संतुलित चारा, डॉक्टर का नंबर और पशु खरीद-बिक्री देख सकते हैं। किसी भी लाउडस्पीकर बटन को दबाकर पूरी जानकारी आवाज में सुनें।';

  const handleAudio = () => {
    const textToSpeak = lang === 'HI' ? welcomeTextHi : welcomeTextEn;
    if (isSpeaking && currentText === textToSpeak) {
      stop();
    } else {
      speak(textToSpeak);
    }
  };

  const animalOptions: {
    species: SpeciesType;
    engName: string;
    hindiName: string;
    icon: string;
    zone: string;
    count: string;
    color: string;
    imageUrl: string;
  }[] = [
    { 
      species: 'cow', 
      engName: 'Dairy Cow', 
      hindiName: 'गाय', 
      icon: '🐄', 
      zone: 'Zone A', 
      count: '14 Head', 
      color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
      imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80'
    },
    { 
      species: 'goat', 
      engName: 'Goat', 
      hindiName: 'बकरी', 
      icon: '🐐', 
      zone: 'Zone B', 
      count: '28 Head', 
      color: 'border-amber-500 bg-amber-950/40 text-amber-300',
      imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80'
    },
    { 
      species: 'fish', 
      engName: 'Aquaculture Fish', 
      hindiName: 'मछली', 
      icon: '🐟', 
      zone: 'Zone C', 
      count: '3,200 Fish', 
      color: 'border-cyan-500 bg-cyan-950/40 text-cyan-300',
      imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=400&q=80'
    },
    { 
      species: 'hen', 
      engName: 'Poultry Hen', 
      hindiName: 'मुर्गी', 
      icon: '🐔', 
      zone: 'Zone D', 
      count: '145 Birds', 
      color: 'border-rose-500 bg-rose-950/40 text-rose-300',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80'
    },
    { 
      species: 'pig', 
      engName: 'Piggery', 
      hindiName: 'सूअर', 
      icon: '🐖', 
      zone: 'Zone E', 
      count: '18 Head', 
      color: 'border-purple-500 bg-purple-950/40 text-purple-300',
      imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Clean, Friendly Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/50 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-md">
                <span>🌾 2-Acre Mixed Farm Hub</span>
                <span>• 87,120 Sq. Ft.</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                {lang === 'HI' ? 'सरल किसान पोर्टल' : 'Interactive Farmer Portal (English Default)'}
              </span>

              {/* Language Switcher Pill */}
              <div className="flex items-center bg-slate-950 border border-emerald-500/40 rounded-xl p-0.5 ml-auto sm:ml-2">
                <Globe className="h-3 w-3 text-emerald-400 ml-1.5 mr-1" />
                <button
                  onClick={() => setLang('EN')}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition ${
                    lang === 'EN' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English (Default)
                </button>
                <button
                  onClick={() => setLang('HI')}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition ${
                    lang === 'HI' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'HI'
                ? 'घरेलू पशुपालन व एकीकृत फार्म प्रबंधन केंद्र'
                : '2-Acre Domestic Livestock & Farm Operations Hub'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {lang === 'HI' ? (
                <>
                  <strong>यह पोर्टल क्या करता है:</strong> यहाँ आप 2 एकड़ ज़मीन पर 5 पशुओं (गाय, बकरी, मछली, मुर्गी, सूअर) की पूरी देखभाल कर सकते हैं — <span className="text-emerald-300 font-semibold">कैसा शेड बनाएं</span>, <span className="text-emerald-300 font-semibold">कितना चारा खिलाएं</span>, <span className="text-emerald-300 font-semibold">डॉक्टर को 1 बटन से फोन लगाएं</span> और <span className="text-emerald-300 font-semibold">प्रमाणित पशु खरीदें या बेचें</span>।
                </>
              ) : (
                <>
                  <strong>What This Portal Does:</strong> Complete operations management for 5 domestic species across a 2-Acre integrated farm. Inspect <span className="text-emerald-300 font-semibold">housing shed engineering</span>, calculate <span className="text-emerald-300 font-semibold">daily feed rations (green fodder, straw, mash)</span>, connect with <span className="text-emerald-300 font-semibold">on-call veterinary doctors via 1-tap dial</span>, and trade <span className="text-emerald-300 font-semibold">certified livestock with official RFID ear-tags</span>.
                </>
              )}
            </p>

            {/* Quick 3-point explanation for anyone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center space-x-2">
                <span className="text-base">1️⃣</span>
                <span>
                  {lang === 'HI' ? (
                    <><strong>पशु चुनें:</strong> नीचे किसी भी पशु पर क्लिक करें</>
                  ) : (
                    <><strong>Select Animal:</strong> Tap any animal card below</>
                  )}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center space-x-2">
                <span className="text-base">2️⃣</span>
                <span>
                  {lang === 'HI' ? (
                    <><strong>🔊 लाउडस्पीकर:</strong> बिना पढ़े सब कुछ बोलकर सुनें</>
                  ) : (
                    <><strong>🔊 Loudspeaker:</strong> Listen aloud without reading text</>
                  )}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center space-x-2">
                <span className="text-base">3️⃣</span>
                <span>
                  {lang === 'HI' ? (
                    <><strong>📞 सीधा फोन:</strong> डॉक्टर या सेलर को सीधा कॉल लगाएं</>
                  ) : (
                    <><strong>📞 1-Tap Call:</strong> Direct phone dialer for vet & market</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Audio & Guide Action Buttons + Mini Live Pasture Image */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
            <div className="hidden lg:block relative w-56 h-24 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80"
                alt="2-Acre Integrated Farm Pasture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-2 flex flex-col justify-end">
                <span className="text-[9px] font-black uppercase text-emerald-300">2-Acre Master Farm</span>
                <span className="text-[11px] font-bold text-white truncate">North Paddock & Mixed Sheds</span>
              </div>
            </div>

            <button
              onClick={handleAudio}
              className={`py-2.5 px-4 rounded-xl border font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-xl ${
                isSpeaking && (currentText === welcomeTextEn || currentText === welcomeTextHi)
                  ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-emerald-500/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
              }`}
              title="Click to hear welcome instructions in audio"
            >
              {isSpeaking && (currentText === welcomeTextEn || currentText === welcomeTextHi) ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>{lang === 'HI' ? 'आवाज बंद करें' : 'Stop Audio Voice'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>🔊 {lang === 'HI' ? 'बोलकर सुनो' : 'Listen in English'}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenGuide}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-lg flex items-center justify-center space-x-2 transition"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>{lang === 'HI' ? '📖 उपयोग निर्देश' : '📖 User Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Big, Clear Animal Selector: Cow, Goat, Fish, Hen, Pig */}
      <div className="bg-slate-900/90 p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>
              {lang === 'HI'
                ? 'पशु चुनें (Select Livestock to Manage):'
                : 'Select Livestock Animal (5 Domestic Species):'}
            </span>
          </span>
          <span className="text-[11px] font-bold text-emerald-400">
            Active: {selectedSpecies.toUpperCase()} ({animalOptions.find(a => a.species === selectedSpecies)?.engName})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {animalOptions.map((opt) => {
            const isSelected = selectedSpecies === opt.species;
            return (
              <button
                key={opt.species}
                onClick={() => {
                  onSelectSpecies(opt.species);
                  onChangeSectionTab('ANIMAL_HUB');
                }}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between text-left relative overflow-hidden group transform active:scale-95 ${
                  isSelected
                    ? `${opt.color} ring-4 ring-emerald-500/40 shadow-2xl scale-[1.03]`
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                }`}
              >
                {/* Animal Photo with Zone Badge */}
                <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2.5 border border-slate-700/80">
                  <img
                    src={opt.imageUrl}
                    alt={opt.engName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />
                  <span className="absolute top-1.5 left-1.5 text-base sm:text-lg drop-shadow-md">
                    {opt.icon}
                  </span>
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-slate-200">
                    {opt.zone}
                  </span>
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-emerald-300 bg-slate-950/80 px-1.5 py-0.5 rounded">
                    {opt.count}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline space-x-1">
                    <h3 className="text-sm sm:text-base font-black text-white truncate">{opt.engName}</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    ({opt.hindiName})
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-md z-10">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Clean View Switcher Tabs (English by default) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 bg-slate-950/60 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => onChangeSectionTab('ANIMAL_HUB')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'ANIMAL_HUB'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>🐾</span>
          <span>{lang === 'HI' ? 'पशु पोर्टल (Shed, Feed, Vet)' : 'Animal Hub (Shed, Feed, Vet & Market)'}</span>
        </button>

        <button
          onClick={() => onChangeSectionTab('MAP')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'MAP'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>🗺️</span>
          <span>{lang === 'HI' ? '2-एकड़ नक्शा (Master Map)' : '2-Acre Master Map Blueprint'}</span>
        </button>

        <button
          onClick={() => onChangeSectionTab('NEARBY_FARMS')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'NEARBY_FARMS'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>📍</span>
          <span>{lang === 'HI' ? 'आस-पास के फार्म (Nearby Farms)' : 'Nearby Farms Discovery'}</span>
        </button>

        <button
          onClick={() => onChangeSectionTab('BIO')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'BIO'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>🔄</span>
          <span>{lang === 'HI' ? 'जीरो-वेस्ट चक्र (Bio-Economy)' : 'Circular Bio-Economy Cycle'}</span>
        </button>

        <button
          onClick={() => onChangeSectionTab('SOS')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'SOS'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60'
              : 'text-rose-400 hover:text-white hover:bg-rose-950/40'
          }`}
        >
          <span>🚨</span>
          <span>{lang === 'HI' ? 'आपातकालीन हेल्पलाइन (Emergency)' : 'Emergency Vet Helpline (SOS)'}</span>
        </button>

        <button
          onClick={() => onChangeSectionTab('ALL')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 whitespace-nowrap ${
            activeSectionTab === 'ALL'
              ? 'bg-slate-800 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>📜</span>
          <span>{lang === 'HI' ? 'सब कुछ एक साथ देखें' : 'View All on Single Page'}</span>
        </button>
      </div>
    </div>
  );
};
