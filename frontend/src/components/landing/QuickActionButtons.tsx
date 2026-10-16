// File: frontend/src/components/landing/QuickActionButtons.tsx

import React from 'react';
import { 
  PhoneCall, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowRight, 
  Stethoscope, 
  Sparkles, 
  ShieldAlert,
  BadgeCheck,
  Siren
} from 'lucide-react';

interface QuickActionButtonsProps {
  onCallVet: () => void;
  onBuySell: () => void;
  onReportEmergency: () => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onCallVet,
  onBuySell,
  onReportEmergency,
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
            Immediate Response Center
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Quick Visual Actions
          </h2>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          One-touch triage, trade matching, and mobile ambulance support
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* BUTTON 1: CALL VET */}
        <button
          onClick={onCallVet}
          className="group relative text-left p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-900 border border-emerald-500/30 hover:border-emerald-400/60 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Subtle glow highlight */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-2xl group-hover:bg-emerald-500/20 transition-all" />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all">
              <Stethoscope className="h-7 w-7" />
            </div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>3 On-Duty Now</span>
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center space-x-1.5">
              <span>Call Vet</span>
              <PhoneCall className="h-4 w-4 text-emerald-400 opacity-80" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instant veterinary tele-consultation or request on-farm doctor visit for health certification, pregnancy testing & lactation advice.
            </p>
          </div>

          <div className="relative z-10 mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
            <span>Connect to Vet Helpline</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* BUTTON 2: BUY / SELL */}
        <button
          onClick={onBuySell}
          className="group relative text-left p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl group-hover:bg-indigo-500/20 transition-all" />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-[11px] font-semibold text-indigo-300">
              <BadgeCheck className="h-3 w-3 text-indigo-400" />
              <span>Direct Farm Trade</span>
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center space-x-1.5">
              <span>Buy / Sell</span>
              <Sparkles className="h-4 w-4 text-indigo-400 opacity-80" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore 100% verified livestock listings or list your animals in minutes with video reels, milk fat records, and guaranteed fair escrow.
            </p>
          </div>

          <div className="relative z-10 mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
            <span>Open Marketplace & Listings</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* BUTTON 3: REPORT EMERGENCY */}
        <button
          onClick={onReportEmergency}
          className="group relative text-left p-6 rounded-2xl bg-gradient-to-br from-rose-950/70 via-slate-900/90 to-slate-900 border border-rose-500/40 hover:border-rose-400/70 shadow-lg hover:shadow-rose-900/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Animated pulse ring */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/15 rounded-full filter blur-2xl group-hover:bg-rose-500/30 transition-all animate-pulse" />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/25 border border-rose-500/50 flex items-center justify-center text-rose-300 group-hover:scale-110 group-hover:bg-rose-500/35 transition-all">
              <Siren className="h-7 w-7 text-rose-400 animate-bounce" />
            </div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-[11px] font-bold text-rose-300">
              <ShieldAlert className="h-3 w-3 text-rose-400" />
              <span>SOS Rapid Unit</span>
            </span>
          </div>

          <div className="relative z-10 space-y-1.5">
            <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors flex items-center space-x-1.5">
              <span>Report Emergency</span>
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Acute tympany/bloat, calving complications, poisoning or severe trauma? Single tap triggers GPS mobile vet ambulance dispatch.
            </p>
          </div>

          <div className="relative z-10 mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:text-rose-300">
            <span>Instant Emergency SOS</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
