// File: frontend/src/components/farm2acre/HowToUseSection.tsx

import React from 'react';
import { useFarmVoice } from '../../utils/speechVoice';
import { SpeciesType } from '../../types/farm2Acre';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Apple,
  HeartPulse,
  Tag,
} from 'lucide-react';

interface HowToUseSectionProps {
  onOpenSidePanel: () => void;
  onSelectSpecies: (species: SpeciesType) => void;
  onScrollToSection: (id: string) => void;
}

export const HowToUseSection: React.FC<HowToUseSectionProps> = ({
  onOpenSidePanel,
  onSelectSpecies,
  onScrollToSection,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  const introAudio =
    'How to use this farm portal. Step 1: Tap any loudspeaker icon to hear diets, prices, and doctor details spoken aloud. Step 2: In the top banner, tap any running animal to jump straight to its dashboard. Step 3: Touch any zone on the 2-acre map blueprint to see building layouts and pond specs. Step 4: Follow daily feeding schedules for green fodder, dry straw, and pellets. Step 5: Call the licensed veterinary surgeon with one tap on the green phone button. Step 6: Buy certified livestock verified with government Docker Docket numbers and RFID ear-tags. Step 7: For emergencies, tap the red SOS button to dispatch the mobile veterinary ambulance.';

  const handleMasterAudio = () => {
    if (isSpeaking && currentText === introAudio) {
      stop();
    } else {
      speak(introAudio);
    }
  };

  const steps = [
    {
      num: 1,
      title: 'Tap 🔊 Speaker to Listen',
      vernacular: 'बोलकर सुनें (लाउडस्पीकर)',
      icon: <Volume2 className="h-6 w-6 text-emerald-400" />,
      tag: 'Zero Reading Needed',
      desc: 'Rural farmers do not need to read text. Tap any 🔊 speaker icon next to feed ratios, livestock prices, or vet clinics to hear everything spoken clearly.',
      speech:
        'Step 1: Audio readout. Tap any speaker icon on any card to hear feeding rations, animal prices, or doctor credentials in clear speech.',
      color: 'from-emerald-950/60 to-slate-900 border-emerald-500/40 text-emerald-400',
      action: () => speak('Speaker test: Speech synthesis allows anyone to operate the farm portal without reading.'),
      actionLabel: '🔊 Test Voice',
    },
    {
      num: 2,
      title: 'Tap Any Running Animal',
      vernacular: 'दौड़ते पशु को छुएं',
      icon: <Sparkles className="h-6 w-6 text-amber-400" />,
      tag: 'Instant Navigation',
      desc: 'The top marquee displays live cows grazing, goats foraging, fish swimming, hens running, and pigs in wallow. Tapping any card opens its full hub.',
      speech:
        'Step 2: Running animal marquee. Tapping any livestock card in the top banner will immediately jump to its management portal.',
      color: 'from-amber-950/60 to-slate-900 border-amber-500/40 text-amber-400',
      action: () => onScrollToSection('species-management-module'),
      actionLabel: 'Go to Animals →',
    },
    {
      num: 3,
      title: 'Tap the 2-Acre Master Map',
      vernacular: '2-एकड़ नक्शा देखें',
      icon: <Compass className="h-6 w-6 text-cyan-400" />,
      tag: 'Vector Blueprint',
      desc: 'Tap Zone A (Cattle), Zone B (Goat), Zone C (Fish), Zone D (Hen), or Zone E (Pig) on the architectural blueprint to check square footage and airflow.',
      speech:
        'Step 3: Farm master map. Tap any of the five zones on the blueprint to view housing specs, square footage, and paddock details.',
      color: 'from-cyan-950/60 to-slate-900 border-cyan-500/40 text-cyan-400',
      action: () => onScrollToSection('farm-master-map'),
      actionLabel: 'View Blueprint →',
    },
    {
      num: 4,
      title: 'Check Daily Feed Rations',
      vernacular: 'संतुलित चारा व दाना',
      icon: <Apple className="h-6 w-6 text-emerald-400" />,
      tag: 'Precision Nutrition',
      desc: 'Inspect exact kg rations for green hybrid Napier fodder, dry straw, and concentrate mash. Tap "Read Daily Diet Aloud" for speech instructions.',
      speech:
        'Step 4: Feeding guides. Check the exact ration percentages for green fodder, dry straw, and concentrate mash with time-stamped schedules.',
      color: 'from-emerald-950/60 to-slate-900 border-emerald-500/40 text-emerald-400',
      action: () => {
        onSelectSpecies('cow');
        onScrollToSection('species-management-module');
      },
      actionLabel: 'View Cow Diets →',
    },
    {
      num: 5,
      title: '1-Tap Dial Veterinary Doctor',
      vernacular: 'डॉक्टर को सीधा फोन लगाएं',
      icon: <HeartPulse className="h-6 w-6 text-rose-400" />,
      tag: 'Licensed Surgeons',
      desc: 'Each species has an assigned veterinary officer. Simply tap the large green phone button with the animated icon to call the doctor directly.',
      speech:
        'Step 5: Veterinary doctor on call. Tap the large green phone button to dial the registered veterinarian immediately.',
      color: 'from-rose-950/60 to-slate-900 border-rose-500/40 text-rose-400',
      action: () => {
        onSelectSpecies('cow');
        onScrollToSection('species-management-module');
      },
      actionLabel: 'See Vet Card →',
    },
    {
      num: 6,
      title: 'Certified Livestock Market',
      vernacular: 'टैग व डॉकर नंबर से पशु खरीदें',
      icon: <Tag className="h-6 w-6 text-purple-400" />,
      tag: 'Government Tracked',
      desc: 'Browse animals with verified RFID Ear-Tag IDs and government Docker Docket tracking numbers. Check milk yields and tap "Call to Buy".',
      speech:
        'Step 6: Certified livestock marketplace. Inspect verified RFID ear-tags and government Docker docket tracking numbers with direct purchase calling.',
      color: 'from-purple-950/60 to-slate-900 border-purple-500/40 text-purple-400',
      action: () => {
        onSelectSpecies('cow');
        onScrollToSection('species-management-module');
      },
      actionLabel: 'Browse Market →',
    },
  ];

  return (
    <section id="how-to-use-guide" className="w-full py-8 space-y-6">
      {/* Header Container */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Universal Accessibility Manual • उपयोग निर्देश</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>How Anyone Can Use This Farm Portal</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Visual & Voice Guided
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed specifically so rural farmers, workers, and new visitors can navigate the 2-Acre mixed farm effortlessly.
              Follow the visual steps below, or tap the audio button to hear the entire guide read aloud in spoken voice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Master Audio Button */}
            <button
              onClick={handleMasterAudio}
              className={`py-3.5 px-5 rounded-2xl border font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-xl ${
                isSpeaking && currentText === introAudio
                  ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-emerald-500/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              }`}
            >
              {isSpeaking && currentText === introAudio ? (
                <>
                  <VolumeX className="h-5 w-5" />
                  <span>Stop Guide Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" />
                  <span>🔊 Listen to Complete Guide</span>
                </>
              )}
            </button>

            {/* Open Full Side Drawer */}
            <button
              onClick={onOpenSidePanel}
              className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-lg flex items-center space-x-2 transition"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>Open Side Guide Panel</span>
            </button>
          </div>
        </div>

        {/* 6 Core Visual Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {steps.map((st) => {
            const isSpeakingThis = isSpeaking && currentText === st.speech;

            return (
              <div
                key={st.num}
                className={`bg-gradient-to-br ${st.color} rounded-2xl border p-5 shadow-lg flex flex-col justify-between transition-all hover:scale-[1.01]`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-sm flex items-center justify-center">
                        {st.num}
                      </span>
                      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                        {st.icon}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isSpeakingThis) {
                          stop();
                        } else {
                          speak(st.speech);
                        }
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        isSpeakingThis
                          ? 'bg-emerald-500 text-white animate-pulse border-emerald-400'
                          : 'bg-slate-900/90 hover:bg-emerald-600 text-slate-300 hover:text-white border-slate-700'
                      }`}
                      title="Read this step aloud"
                    >
                      {isSpeakingThis ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {st.tag}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">{st.title}</h3>
                    <p className="text-xs font-semibold text-emerald-400">{st.vernacular}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{st.desc}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Step {st.num} of 6</span>
                  <button
                    onClick={st.action}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                  >
                    <span>{st.actionLabel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Summary Tip for Rural Users */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <span className="text-xs font-bold text-white block">
                Quick Farmer Tip / त्वरित किसान सुझाव:
              </span>
              <p className="text-xs text-slate-400">
                You can tap the floating green <strong>📖 Guide</strong> pill on the right side of the screen at any time to open instructions.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSidePanel}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md whitespace-nowrap transition"
          >
            Open Side Instruction Manual →
          </button>
        </div>
      </div>
    </section>
  );
};
