import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarmVoice } from '../utils/speechVoice';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  PhoneCall,
  Zap,
  TrendingUp,
  Layers,
  Store,
  CheckCircle2,
  Apple,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { SpeciesType } from '../types/farm2Acre';

interface HomePageProps {
  onSelectSpecies: (species: SpeciesType) => void;
  onOpenRegister: () => void;
  onOpenCallVet: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSpecies,
  onOpenRegister,
  onOpenCallVet,
}) => {
  const navigate = useNavigate();
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  const [activeInstructionStep, setActiveInstructionStep] = useState<number>(1);

  const homeIntroSpeech =
    'Welcome to the 2-Acre Integrated Domestic Livestock and Mixed Farm Operations Suite. This standardized system optimizes 87,120 square feet for dairy cattle, elevated goats, aquaculture fish, free-range poultry, and pigs with a 100 percent zero-waste circular bio-economy. Tap Enter Dashboard to begin managing your herd.';

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const speciesShowcase: {
    species: SpeciesType;
    name: string;
    hindiName: string;
    zone: string;
    area: string;
    headcount: string;
    photo: string;
    feature: string;
  }[] = [
    {
      species: 'cow',
      name: 'Gir & Sahiwal Dairy Cattle',
      hindiName: 'गाय / गौशाला',
      zone: 'Zone A',
      area: '25,000 Sq Ft (28.7%)',
      headcount: '14 Head (19.5 L/day)',
      photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=700&q=80',
      feature: 'Open-ridge ventilated shed with ceramic feed mangers & 60-tonne silage pit.',
    },
    {
      species: 'goat',
      name: 'Sirohi & Barbari Goats',
      hindiName: 'बकरी / अजा घर',
      zone: 'Zone B',
      area: '16,000 Sq Ft (18.4%)',
      headcount: '28 Head',
      photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=700&q=80',
      feature: 'Elevated wooden slatted floor (1.5m) preventing hoof rot, surrounded by Moringa trees.',
    },
    {
      species: 'fish',
      name: 'Freshwater Rohu & Catla Fish',
      hindiName: 'मछली पालन तालाब',
      zone: 'Zone C',
      area: '22,000 Sq Ft (25.3%)',
      headcount: '3,200 Fingerlings',
      photo: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=700&q=80',
      feature: '1.8m earthen pond with solar paddlewheel aerator and Super Napier bund stabilization.',
    },
    {
      species: 'hen',
      name: 'Kadaknath & Country Poultry',
      hindiName: 'मुक्त-चारा मुर्गी शेड',
      zone: 'Zone D',
      area: '12,000 Sq Ft (13.8%)',
      headcount: '145 Birds (112 Eggs/day)',
      photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=700&q=80',
      feature: 'Deep-litter rice husk bedding, 4-tier dark laying boxes, and predator-proof grazing run.',
    },
    {
      species: 'pig',
      name: 'Large White Yorkshire Piggery',
      hindiName: 'सूअर पालन बाड़ा',
      zone: 'Zone E',
      area: '12,000 Sq Ft (13.8%)',
      headcount: '18 Head',
      photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=700&q=80',
      feature: 'Sloped concrete self-cleaning pens linked directly to the 25 m³ anaerobic biogas digester.',
    },
  ];

  const coreFeatures = [
    {
      title: 'Calibrated Housing Engineering',
      desc: 'Architectural blueprints engineered for natural air circulation, optimal ceiling heights, and biosecurity buffers to eliminate herd heat stress.',
      icon: <Layers className="h-6 w-6 text-emerald-400" />,
      badge: 'Zone Blueprints',
      photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Precision Nutrition Rations',
      desc: 'Formulated daily feed ratios: fresh succulent green Napier fodder, chopped wheat straw fiber, and balanced concentrate dairy mash.',
      icon: <Apple className="h-6 w-6 text-amber-400" />,
      badge: 'Daily Diets',
      photo: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Zero-Waste Circular Bio-Economy',
      desc: 'Cattle & pig dung feeds a 25 m³ biogas digester supplying clean methane. Digested bio-slurry fertilizes Super Napier fodder grass.',
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
      badge: '100% Closed Loop',
      photo: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'On-Demand Veterinary Care & 24/7 SOS',
      desc: 'Instant 1-tap phone dialer to licensed veterinary surgeons and emergency mobile animal ambulance dispatch triage.',
      icon: <PhoneCall className="h-6 w-6 text-rose-400" />,
      badge: '24/7 Emergency',
      photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Microservices Telemetry & STOMP Sync',
      desc: 'Real-time WebSocket delta updates for herd headcount, Kafka low-stock feed triggers, and persistent PostgreSQL ear-tag registries.',
      icon: <Activity className="h-6 w-6 text-indigo-400" />,
      badge: 'Spring Boot 3',
      photo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Parametric Financial P&L Simulator',
      desc: 'Parametric cash-flow waterfall projections: gross milk, meat, and egg revenue minus annual feed expenses, vet care, and overhead.',
      icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
      badge: 'Profit Projections',
      photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Certified RFID Livestock Marketplace',
      desc: 'Peer-to-peer verified domestic livestock trading with official government ear-tags, vetted breeder profiles, and health scorecards.',
      icon: <Store className="h-6 w-6 text-teal-400" />,
      badge: 'Verified Trading',
      photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Rural Web Speech Voice Accessibility',
      desc: 'Full bilingual text-to-speech audio narration in English & Hindi. Designed so rural farmers and herd handlers can operate without reading text.',
      icon: <Volume2 className="h-6 w-6 text-cyan-400" />,
      badge: 'Zero-Literacy Audio',
      photo: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=500&q=80',
    },
  ];

  const operatingInstructions = [
    {
      step: 1,
      title: 'Select Any Animal or Enter Dashboard',
      desc: 'Tap on any of the 5 domestic livestock species cards to inspect housing blueprints, daily feeding schedules, and veterinary guidelines.',
      audioText: 'Step 1: Open the Dashboard or choose an animal species from the menu.',
    },
    {
      step: 2,
      title: 'Follow Calibrated Feeding Schedules',
      desc: 'Provide exact daily kg rations: 25 kg green Napier fodder, 7 kg dry wheat straw, and balanced concentrate dairy mash for high yield.',
      audioText: 'Step 2: Follow calibrated feeding schedules for green fodder, dry straw, and concentrate mash.',
    },
    {
      step: 3,
      title: 'Inspect the 2-Acre Master Map',
      desc: 'View Zone A through E spatial allocation (87,120 sq ft) to understand airflow, manure drain slopes, and perimeter bio-fencing.',
      audioText: 'Step 3: Inspect the 2-acre master map to see zone boundaries and building layouts.',
    },
    {
      step: 4,
      title: 'Record Health & Care Events in Registry',
      desc: 'Use "+ Add Livestock" and "Log Activity Event" to record vaccinations, weight gains, calving, and milk production in PostgreSQL.',
      audioText: 'Step 4: Record health and feeding events in the digital master registry.',
    },
    {
      step: 5,
      title: '1-Tap Dial Veterinary Doctor or Trigger SOS',
      desc: 'For regular checkups, call on-duty vets directly. For life-threatening emergencies, submit the 1-tap SOS form to dispatch the mobile unit.',
      audioText: 'Step 5: Dial the licensed veterinary doctor with one tap or trigger 24/7 SOS.',
    },
  ];

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* 1. INSTRUCTION NAVBAR (Dedicated Home Navigation Bar) */}
      <nav className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-md sticky top-20 z-20">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            🌾
          </div>
          <span className="text-sm font-black text-white tracking-tight">
            2-Acre Farm Navigation:
          </span>
        </div>

        {/* Quick Jump Links */}
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-bold overflow-x-auto no-scrollbar">
          <a href="#about-model" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition whitespace-nowrap">
            2-Acre Model
          </a>
          <a href="#species-breakdown" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition whitespace-nowrap">
            5 Species
          </a>
          <a href="#system-features" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition whitespace-nowrap">
            Features
          </a>
          <a href="#operating-instructions" className="px-3 py-1.5 rounded-lg text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/80 transition whitespace-nowrap flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Instructions</span>
          </a>
          <button
            onClick={() => navigate('/start-farming')}
            className="px-3 py-1.5 rounded-lg text-teal-300 bg-teal-950/60 border border-teal-800/60 hover:bg-teal-900/80 transition whitespace-nowrap flex items-center gap-1 font-bold text-xs"
            title="Step-by-Step New Farm Setup Service"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Start Farm</span>
          </button>
          <button
            onClick={() => navigate('/shed-engineering')}
            className="px-3 py-1.5 rounded-lg text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/80 transition whitespace-nowrap flex items-center gap-1 font-bold text-xs"
            title="Shed Architecture & Mat Guidance Service"
          >
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>Shed & Mats</span>
          </button>
          <button
            onClick={onOpenCallVet}
            className="px-3 py-1.5 rounded-lg text-rose-300 hover:bg-rose-950/60 transition whitespace-nowrap flex items-center gap-1 font-bold text-xs"
            title="1-Tap Emergency Vet Call"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Vet SOS</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenRegister}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center space-x-1.5 active:scale-95"
            title="Add Livestock to Registry"
          >
            <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Add Animal</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition flex items-center space-x-1.5 active:scale-95"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH MAIN IMAGES */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission & Detailing */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                🌾 Integrated Farm Blueprint
              </span>
              <span className="text-xs text-emerald-300 font-bold bg-slate-950 px-2.5 py-1 rounded-full border border-emerald-800">
                87,120 Sq. Ft. • 5 Domestic Species
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Integrated Domestic Livestock & Herd Operations Suite
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              A complete agricultural operating system for 2-acre mixed holdings. Harmonizes dairy cattle, elevated goats, freshwater aquaculture, free-range poultry, and swine into a calibrated, zero-waste bio-economic loop.
            </p>

            {/* Quick 3 Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">100% Zero-Waste Biogas Loop</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-slate-200">Real-Time STOMP Telemetry</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-rose-400 shrink-0" />
                <span className="text-slate-200">24/7 Mobile Vet SOS Dispatch</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/60 transition flex items-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>🚀 Enter Operations App</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleSpeech(homeIntroSpeech)}
                className={`px-5 py-3.5 rounded-2xl border font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-lg ${
                  isSpeaking && currentText === homeIntroSpeech
                    ? 'bg-emerald-500 text-slate-950 animate-pulse border-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title="Listen to audio overview"
              >
                {isSpeaking && currentText === homeIntroSpeech ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>🔊 Listen Overview</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/start-farming')}
                className="px-5 py-3.5 rounded-2xl bg-teal-600/30 hover:bg-teal-600/40 text-teal-300 font-bold text-xs sm:text-sm border border-teal-500/40 transition flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span>🌱 Start Your Own Farm Guide</span>
              </button>

              <a
                href="#operating-instructions"
                className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm border border-slate-800 transition"
              >
                📖 User Instructions
              </a>
            </div>
          </div>

          {/* Right Column: Main Hero Image Showcase ("home mainimages") */}
          <div className="lg:col-span-5 space-y-3">
            {/* Primary Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl group">
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80"
                  alt="2-Acre Farm Pasture at Sunrise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Floating Badges on Main Image */}
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-[10px] font-black text-emerald-400 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Zone A • North Paddock Cam</span>
              </div>

              <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Live Cattle Census</span>
                  <span className="text-sm font-black text-white">14 Gir & Sahiwal Cows</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Daily Average Milk</span>
                  <span className="text-sm font-black text-emerald-400">19.5 L/head</span>
                </div>
              </div>
            </div>

            {/* Secondary 2-Image Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-28 rounded-2xl overflow-hidden border border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=500&q=80"
                  alt="Sirohi Goats"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-2 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white">Zone B: Goat House</span>
                </div>
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden border border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=500&q=80"
                  alt="Freshwater Fish Pond"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-2 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white">Zone C: Fish Pond</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FARMER INCUBATION SERVICE SPOTLIGHT */}
      <section className="rounded-3xl border border-teal-500/40 bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xl shrink-0 border border-teal-500/30">
            🌱
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-500/40">
                New Farmer Setup Service
              </span>
              <span className="text-xs text-slate-400 font-medium">Step-by-Step Incubation</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Planning to Start Your Own Livestock Farm from Scratch?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Explore our comprehensive 6-step roadmap, 5 domestic species blueprints, shed construction guides, feed budgeting calculators, and government subsidy application support.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/start-farming')}
          className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-950/60 transition whitespace-nowrap flex items-center space-x-2 shrink-0 group active:scale-95"
        >
          <span>Open Farm Starter Guide</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* 3. ABOUT THE 2-ACRE MODEL SECTION ("detailing here") */}
      <section id="about-model" className="space-y-6 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Architectural Blueprint & Allocation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            The 2-Acre (87,120 Sq. Ft.) Domestic Farm Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            2 acres is the scientifically proven sweet spot for smallholder livestock profitability in India and developing regions. By combining 5 complementary domestic enterprises, the land yields ₹1.2 Lakh monthly net profit while eliminating commercial chemical fertilizer costs.
          </p>
        </div>

        {/* 5 Species Zone Breakdown Cards */}
        <div id="species-breakdown" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {speciesShowcase.map((item) => (
            <div
              key={item.species}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg flex flex-col group hover:border-slate-700 transition"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-emerald-400">
                  {item.zone}
                </span>
                <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded">
                  {item.headcount}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <span className="text-[11px] text-emerald-400 font-medium block">{item.hindiName}</span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{item.area}</span>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.feature}</p>
                </div>

                <button
                  onClick={() => {
                    onSelectSpecies(item.species);
                    navigate(`/animals?species=${item.species}`);
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center justify-center space-x-1"
                >
                  <span>Manage {item.species}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE SYSTEM FEATURES SECTION ("add about fetures") */}
      <section id="system-features" className="space-y-6 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Everything You Need
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Integrated Suite Capabilities & Features
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Enterprise microservices, precision feeding, 24/7 veterinary triage, and zero-waste bio-energy combined in one intuitive portal.
          </p>
        </div>

        {/* 8 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg flex flex-col group hover:border-slate-700 transition"
            >
              {/* Feature Photo Header */}
              <div className="h-28 w-full overflow-hidden relative">
                <img
                  src={feat.photo}
                  alt={feat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700">
                  {feat.icon}
                </div>
                <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/40">
                  {feat.badge}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OPERATING INSTRUCTIONS SECTION ("instruction navbar & detailing here") */}
      <section id="operating-instructions" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-6 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Step-by-Step Operating Instructions</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              How to Operate the 2-Acre Livestock System
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Follow these 5 daily field procedures for feeding, health management, and veterinary communications.
            </p>
          </div>

          <button
            onClick={() => handleSpeech('Step by step guide. Tap any numbered step below to listen aloud.')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center space-x-2 shrink-0"
          >
            <Volume2 className="h-4 w-4 text-emerald-400" />
            <span>🔊 Listen All Steps</span>
          </button>
        </div>

        {/* 5 Instructions Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {operatingInstructions.map((item) => {
            const isSelected = activeInstructionStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => {
                  setActiveInstructionStep(item.step);
                  handleSpeech(item.audioText);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      0{item.step}
                    </span>
                    <Volume2 className={`h-4 w-4 ${isSelected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[10px] text-emerald-400 font-bold mt-2">
                  Tap to hear audio 🔊
                </div>
              </button>
            );
          })}
        </div>

        {/* Enter App Callout Card */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              🚀
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ready to operate your livestock farm?</h3>
              <p className="text-xs text-slate-400">Launch the Operations Dashboard to check herd census, feed runways, and daily production.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenRegister}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <PlusCircle className="h-4 w-4 text-emerald-400" />
              <span>Register Animal</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition whitespace-nowrap flex items-center gap-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
