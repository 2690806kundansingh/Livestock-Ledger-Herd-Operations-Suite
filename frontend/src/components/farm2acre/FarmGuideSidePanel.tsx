// File: frontend/src/components/farm2acre/FarmGuideSidePanel.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../../utils/speechVoice';
import { SpeciesType } from '../../types/farm2Acre';
import {
  X,
  Volume2,
  VolumeX,
  BookOpen,
  MapPin,
  Tag,
  Apple,
  HeartPulse,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FarmGuideSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecies: (species: SpeciesType) => void;
  onScrollToSection: (id: string) => void;
}

export const FarmGuideSidePanel: React.FC<FarmGuideSidePanelProps> = ({
  isOpen,
  onClose,
  onSelectSpecies,
  onScrollToSection,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [guideLang, setGuideLang] = useState<'EN' | 'HI'>('EN');

  if (!isOpen) return null;

  const fullGuideAudioEn =
    'Welcome to the 2-Acre Farm Management Guide. Step 1: Tap any loudspeaker icon to hear diets, prices, and doctor details spoken aloud. Step 2: In the top banner, tap any running animal to jump straight to its dashboard. Step 3: Touch any zone on the 2-acre map blueprint to see building layouts and pond specs. Step 4: Follow daily feeding schedules for green fodder, dry straw, and pellets. Step 5: Call the licensed veterinary surgeon with one tap on the green phone button. Step 6: Buy certified livestock verified with government Docker Docket numbers and RFID ear-tags. Step 7: For emergencies, tap the red SOS button to dispatch the mobile veterinary ambulance.';

  const fullGuideAudioHi =
    'दो एकड़ मिश्रित फार्म गाइड में आपका स्वागत है। चरण 1: किसी भी लाउडस्पीकर बटन को दबाकर आहार, कीमत और डॉक्टर की जानकारी बोलकर सुनें। चरण 2: ऊपर बैनर में किसी भी दौड़ते हुए पशु को छूकर सीधे उसके डैशबोर्ड पर जाएं। चरण 3: दो एकड़ के मास्टर नक्शे में किसी भी ज़ोन को छूकर शेड और तालाब की बनावट देखें। चरण 4: हरा चारा और दाने का सही अनुपात और समय देखें। चरण 5: बड़े हरे फोन बटन को दबाकर तुरंत डॉक्टर को कॉल करें। चरण 6: सरकारी डॉकर नंबर और कान के टैग वाले प्रमाणित पशु खरीदें। चरण 7: आपातकाल में लाल एस ओ एस बटन दबाएं।';

  const handleToggleFullAudio = () => {
    const textToSpeak = guideLang === 'HI' ? fullGuideAudioHi : fullGuideAudioEn;
    if (isSpeaking && currentText === textToSpeak) {
      stop();
    } else {
      speak(textToSpeak);
    }
  };

  const handleStepAudio = (audioText: string) => {
    if (isSpeaking && currentText === audioText) {
      stop();
    } else {
      speak(audioText);
    }
  };

  const steps = [
    {
      step: 1,
      title: 'Listen with Audio Speaker (🔊)',
      hindiTitle: 'बोलकर सुनें (लाउडस्पीकर)',
      icon: <Volume2 className="h-5 w-5 text-emerald-400" />,
      color: 'border-emerald-500/50 bg-emerald-950/20',
      tag: 'Accessibility / सुगम्यता',
      summary:
        'You do not need to read small text. Tap any 🔊 loudspeaker icon next to feeds, animal prices, or doctor profiles to hear the exact instructions spoken clearly.',
      hindiSummary:
        'आपको बारीक अक्षर पढ़ने की आवश्यकता नहीं है। आहार, कीमत या डॉक्टर कार्ड के पास लगे 🔊 लाउडस्पीकर बटन को दबाएं, मोबाइल खुद बोलकर बताएगा।',
      actionText: 'Test Audio Speaker',
      audioText:
        'Step 1: Audio readout. Tap any speaker icon on any card to hear feeding rations, animal prices, or doctor credentials in clear speech.',
      onAction: () =>
        speak(
          guideLang === 'HI'
            ? 'लाउडस्पीकर परीक्षण सफल। यह सुविधा ग्रामीण किसान भाइयों के लिए बिना पढ़े सभी जानकारी सुनने हेतु बनाई गई है।'
            : 'Audio synthesis test successful. Tap any speaker icon across the farm portal to listen without reading.'
        ),
    },
    {
      step: 2,
      title: 'Dynamic Running Animals Banner',
      hindiTitle: 'दौड़ते पशुओं का लाइव बैनर',
      icon: <Sparkles className="h-5 w-5 text-amber-400" />,
      color: 'border-amber-500/50 bg-amber-950/20',
      tag: 'Live Telemetry / लाइव स्थिति',
      summary:
        'The scrolling banner at the top shows active cows, goats, fish, hens, and pigs. Tap any running animal card to automatically select that species and open its operations module.',
      hindiSummary:
        'स्क्रीन पर ऊपर चल रहे बैनर में गाय, बकरी, मछली, मुर्गी और सूअर दिखाई दे रहे हैं। किसी भी पशु कार्ड को छूते ही आप सीधे उसके प्रबंधन पेज पर पहुंच जाएंगे।',
      actionText: 'Go to Running Banner',
      audioText:
        'Step 2: Running animal marquee. Tapping any livestock card in the top banner will immediately jump to its management portal.',
      onAction: () => {
        onClose();
        onScrollToSection('farm-master-map');
      },
    },
    {
      step: 3,
      title: '2-Acre Master Map Blueprint',
      hindiTitle: '2-एकड़ मास्टर नक्शा (SVG)',
      icon: <MapPin className="h-5 w-5 text-cyan-400" />,
      color: 'border-cyan-500/50 bg-cyan-950/20',
      tag: 'Land Blueprint / ज़मीन का नक्शा',
      summary:
        'Touch any of the 5 zones (Zone A Cattle 25,000 sq ft, Zone B Goat 16,000 sq ft, Zone C Fish Pond 22,000 sq ft, Zone D Hen Coop 12,000 sq ft, Zone E Piggery 12,000 sq ft) to view dimensions, airflow design, and silage pits.',
      hindiSummary:
        'नक्शे में किसी भी क्षेत्र को छुएं — ज़ोन ए गौशाला, ज़ोन बी बकरी शेड, ज़ोन सी मछली तालाब, ज़ोन डी मुर्गी घर, या ज़ोन ई सूअर बाड़ा। शेड की ऊंचाई, हवा और नाली की पूरी जानकारी मिलेगी।',
      actionText: 'Inspect Master Map',
      audioText:
        'Step 3: Farm master map. Tap any of the five zones on the blueprint to view housing specs, square footage, and paddock details.',
      onAction: () => {
        onClose();
        onScrollToSection('farm-master-map');
      },
    },
    {
      step: 4,
      title: 'Daily Feeding & Nutrition Ratios',
      hindiTitle: 'दैनिक संतुलित आहार अनुपात',
      icon: <Apple className="h-5 w-5 text-emerald-400" />,
      color: 'border-emerald-500/50 bg-emerald-950/20',
      tag: 'Nutrition / पोषण आहार',
      summary:
        'Check exact daily rations: green hybrid Napier fodder, dry legume hay, concentrate dairy mash, or floating fish pellets. Click 🔊 "Read Daily Diet Aloud" to hear the morning and evening feeding schedule.',
      hindiSummary:
        'पशु के लिए हरा चारा, सूखा भूसा, दाना और मिनरल मिक्चर का सही वजन देखें। "Read Daily Diet Aloud" बटन दबाकर सुबह-शाम के खिलाने का समय सुनें।',
      actionText: 'View Cow Feeding Plan',
      audioText:
        'Step 4: Feeding guides. Check the exact ration percentages for green fodder, dry straw, and concentrate mash with time-stamped schedules.',
      onAction: () => {
        onSelectSpecies('cow');
        onClose();
        onScrollToSection('species-management-module');
      },
    },
    {
      step: 5,
      title: 'Veterinary Doctor On Call (1-Tap Dial)',
      hindiTitle: 'ऑन-कॉल पशु चिकित्सक (1-टैप कॉल)',
      icon: <HeartPulse className="h-5 w-5 text-rose-400" />,
      color: 'border-rose-500/50 bg-rose-950/20',
      tag: 'Veterinary Care / चिकित्सा',
      summary:
        'Each animal has an assigned licensed surgeon with their official VCI registration number. Simply tap the large green phone button to call the doctor directly from your mobile or desktop.',
      hindiSummary:
        'प्रत्येक पशु के लिए सरकारी पंजीकृत पशु चिकित्सक नियुक्त हैं। डॉक्टर के कार्ड पर लगे बड़े हरे फोन बटन को दबाते ही सीधे डॉक्टर को फोन लग जाएगा।',
      actionText: 'View On-Call Vet',
      audioText:
        'Step 5: Veterinary doctor on call. Tap the large green phone button to dial the registered veterinarian immediately.',
      onAction: () => {
        onSelectSpecies('cow');
        onClose();
        onScrollToSection('species-management-module');
      },
    },
    {
      step: 6,
      title: 'Marketplace & Ear-Tag Tracking',
      hindiTitle: 'पशु हाट, कान टैग व डॉकर नंबर',
      icon: <Tag className="h-5 w-5 text-purple-400" />,
      color: 'border-purple-500/50 bg-purple-950/20',
      tag: 'Certified Trade / सत्यापित खरीद-बिक्री',
      summary:
        'Browse verified domestic livestock with official RFID Ear-Tag IDs (e.g. #GIR-402) and government-style Docker Docket tracking numbers. Tap "Call to Buy" to directly speak to the seller.',
      hindiSummary:
        'कान के आर.एफ.आई.डी. टैग और सरकारी डॉकर ट्रैकिंग नंबर वाले शुद्ध नस्ल के पशु देखें। दूध उत्पादन, वजन और कीमत देखकर सीधे "Call to Buy" दबाएं।',
      actionText: 'Browse Marketplace',
      audioText:
        'Step 6: Certified livestock marketplace. Inspect verified RFID ear-tags and government Docker docket tracking numbers with direct purchase calling.',
      onAction: () => {
        onSelectSpecies('cow');
        onClose();
        onScrollToSection('species-management-module');
      },
    },
    {
      step: 7,
      title: '24/7 Farm Emergency Helpline (SOS)',
      hindiTitle: '24/7 आपातकालीन किसान हेल्पलाइन',
      icon: <PhoneCall className="h-5 w-5 text-red-400" />,
      color: 'border-red-500/50 bg-red-950/20',
      tag: 'Emergency SOS / आपातकालीन सहायता',
      summary:
        'If an animal is injured, showing signs of severe bloat, or sudden infection, tap the pulsing red "🚨 1-Tap Vet Emergency SOS" button at any time to dispatch the nearest mobile clinical unit.',
      hindiSummary:
        'यदि कोई पशु बीमार हो, पेट फूल जाए या अचानक आपातकाल आए, तो तुरंत स्क्रीन पर दिख रहे लाल "🚨 Emergency SOS" बटन को दबाएं। मोबाइल एम्बुलेंस तुरंत पहुंचेगी।',
      actionText: 'Open Emergency SOS Helpline',
      audioText:
        'Step 7: Emergency helpline. In case of acute animal distress, tap the red SOS button to dispatch mobile veterinary units.',
      onAction: () => {
        onClose();
        onScrollToSection('emergency-helpline');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fadeIn flex justify-end">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-out Side Drawer */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-slate-900 border-l border-slate-800 h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/90 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {guideLang === 'HI' ? 'उपयोग निर्देश व यूजर गाइड' : "Farmer's Interactive Guide"}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Step-by-Step
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {guideLang === 'HI'
                  ? 'किसी भी किसान या नए उपयोगकर्ता के लिए संपूर्ण गाइड'
                  : 'How anyone can effortlessly navigate and manage this 2-Acre farm'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setGuideLang('EN')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  guideLang === 'EN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setGuideLang('HI')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  guideLang === 'HI' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              aria-label="Close Guide"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Master Voice Readout Banner */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/60 via-slate-950 to-slate-950 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {guideLang === 'HI'
                ? 'क्या आप पूरी गाइड बोलकर सुनना चाहते हैं?'
                : 'Prefer listening instead of reading?'}
            </span>
          </div>

          <button
            onClick={handleToggleFullAudio}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-2 transition ${
              isSpeaking &&
              (currentText === fullGuideAudioEn || currentText === fullGuideAudioHi)
                ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-md shadow-emerald-500/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
            }`}
          >
            {isSpeaking &&
            (currentText === fullGuideAudioEn || currentText === fullGuideAudioHi) ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>🔊 {guideLang === 'HI' ? 'पूरी गाइड सुनें' : 'Read Guide Aloud'}</span>
              </>
            )}
          </button>
        </div>

        {/* Drawer Scrollable Content: 7 Steps */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400 mb-2">
            {guideLang === 'HI'
              ? 'पोर्टल का अधिकतम लाभ लेने के लिए नीचे दिए गए 7 चरणों का पालन करें:'
              : 'Follow these 7 simple steps to master every feature of the domestic livestock platform:'}
          </div>

          {steps.map((st) => {
            const isCardActive = activeStep === st.step;
            const isThisSpeaking = isSpeaking && currentText === st.audioText;

            return (
              <div
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
                  st.color
                } ${
                  isCardActive
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-black text-sm flex items-center justify-center shrink-0">
                      {st.step}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm sm:text-base font-extrabold text-white">
                          {guideLang === 'HI' ? st.hindiTitle : st.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                        {st.tag}
                      </span>
                    </div>
                  </div>

                  {/* Audio Button for this step */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepAudio(st.audioText);
                    }}
                    className={`p-2 rounded-xl border transition-all shrink-0 ${
                      isThisSpeaking
                        ? 'bg-emerald-500 text-white animate-pulse border-emerald-400'
                        : 'bg-slate-900/90 hover:bg-emerald-600 text-slate-300 hover:text-white border-slate-700'
                    }`}
                    title="Read this step aloud"
                  >
                    {isThisSpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-emerald-400" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {guideLang === 'HI' ? st.hindiSummary : st.summary}
                </p>

                {/* Quick Interactive Action Trigger */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{guideLang === 'HI' ? 'तत्काल परीक्षण:' : 'Quick Action:'}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      st.onAction();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
                  >
                    <span>{st.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Help Hotline inside drawer */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs font-bold text-white block">
              {guideLang === 'HI' ? 'क्या आपको अभी भी सहायता चाहिए?' : 'Need Live Human Assistance?'}
            </span>
            <p className="text-xs text-slate-400">
              {guideLang === 'HI'
                ? 'किसान कॉल सेंटर के विशेषज्ञ 24 घंटे मार्गदर्शन के लिए उपलब्ध हैं।'
                : 'National Farmer Helpline operates 24/7 in 22 regional languages.'}
            </p>
            <a
              href="tel:+9118001801551"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Call Kisan Helpline: 1800-180-1551 (Toll-Free)</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-xs text-slate-500 shrink-0">
          Livestock Ledger 2-Acre Mixed Farm System • Designed for Rural Accessibility
        </div>
      </div>
    </div>
  );
};
