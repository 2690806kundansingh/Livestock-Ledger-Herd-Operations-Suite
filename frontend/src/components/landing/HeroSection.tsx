// File: frontend/src/components/landing/HeroSection.tsx

import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight,
  Radio,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { RUNNING_TICKER_ITEMS } from '../../data/landingData';

interface HeroSectionProps {
  onExploreShowcase: () => void;
  onCallVet: () => void;
  onReportEmergency: () => void;
  onSearchQuery?: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreShowcase,
  onCallVet,
  onReportEmergency,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 mb-10 shadow-2xl">
      {/* Background Graphic & Atmosphere Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[1px] transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* 1. TOP RUNNING TICKER / MARQUEE BANNER */}
      <div className="relative z-10 border-b border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md py-2.5 px-4 overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold whitespace-nowrap shadow-sm">
            <Radio className="h-3 w-3 animate-ping text-emerald-400" />
            <span className="tracking-wide uppercase text-[11px]">Live Herd Feed</span>
          </div>
          
          {/* Continuous scrolling ticker animation */}
          <div className="relative w-full overflow-hidden whitespace-nowrap">
            <div className="inline-flex space-x-8 animate-marquee text-xs text-slate-300 font-medium">
              {RUNNING_TICKER_ITEMS.concat(RUNNING_TICKER_ITEMS).map((item, idx) => (
                <div key={idx} className="inline-flex items-center space-x-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    item.type === 'ALERT' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    item.type === 'VET' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    item.type === 'WEATHER' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                    'bg-slate-800 text-emerald-300 border border-slate-700'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-slate-200">{item.text}</span>
                  <span className="text-slate-600">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-sm shadow-inner">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Next-Gen Livestock Trading & Telemetry Health Operations</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Empowering Livestock Farmers with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Verified Pedigree, Live Reels & 24/7 Rapid Care
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Explore authentic high-yield Cattle, champion Buffalo, prolific Goats & native Poultry directly from vetted breeders. Backed by digital health passports, on-call veterinary dispatch, and real-time census telemetry.
            </p>

            {/* Action buttons in Hero */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreShowcase}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Browse Live Animal Showcase</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={onCallVet}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
              >
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>On-Call Vet Assistance</span>
              </button>

              <button
                onClick={onReportEmergency}
                className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-semibold text-sm border border-rose-800/60 hover:border-rose-700 transition-all"
              >
                <Flame className="h-4 w-4 text-rose-400 animate-bounce" />
                <span>Emergency SOS</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% Vet-Inspected Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Digital Health Passports</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span>Pan-India GPS Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Card & Live Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-slate-700/70 bg-slate-900/80 shadow-2xl p-2 group">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=85"
                  alt="Champion Murrah Buffalo and Gir Cattle"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Verified Champion Herd</span>
                </div>

                {/* Floating Price overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Featured High-Yield Stock</span>
                    <span className="text-sm font-bold text-white">Murrah Black Gold • 22 L/day</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-extrabold text-base">₹1,15,000</span>
                    <span className="block text-[10px] text-emerald-300/80">Pedigree Certified</span>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-2 p-2 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                <div className="p-2">
                  <span className="text-lg font-black text-emerald-400 block">4,850+</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Herd</span>
                </div>
                <div className="p-2 border-x border-slate-800">
                  <span className="text-lg font-black text-cyan-400 block">&lt; 15m</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Vet Response</span>
                </div>
                <div className="p-2">
                  <span className="text-lg font-black text-amber-400 block">99.8%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
