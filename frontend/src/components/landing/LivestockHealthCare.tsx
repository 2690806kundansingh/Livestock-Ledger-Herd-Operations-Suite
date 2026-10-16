// File: frontend/src/components/landing/LivestockHealthCare.tsx

import React, { useState } from 'react';
import { 
  HeartPulse, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  Syringe, 
  AlertOctagon, 
  Check, 
  X, 
  Printer, 
  Sparkles,
  Info
} from 'lucide-react';
import { HEALTH_STEP_PICTOGRAMS } from '../../data/landingData';

export const LivestockHealthCare: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const selectedPictogram = HEALTH_STEP_PICTOGRAMS.find((p) => p.stepNumber === activeStep) || HEALTH_STEP_PICTOGRAMS[0];

  const getStepIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Thermometer':
        return <Thermometer className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Syringe':
        return <Syringe className={className} />;
      case 'AlertOctagon':
        return <AlertOctagon className={className} />;
      default:
        return <HeartPulse className={className} />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="health-care" className="mb-14 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <HeartPulse className="h-4 w-4" />
            <span>Universal Herd Welfare Protocol</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Livestock Health & Care Pictograms
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Intuitive step-by-step visual pictograms designed for farmers, herd handlers, and veterinary staff
          </p>
        </div>

        <button
          onClick={() => setShowPrintModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition self-start sm:self-auto"
        >
          <Printer className="h-4 w-4 text-emerald-400" />
          <span>Printable SOP Checklist</span>
        </button>
      </div>

      {/* 5-STEP HORIZONTAL PICTOGRAM RIBBON */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
        {HEALTH_STEP_PICTOGRAMS.map((step) => {
          const isActive = activeStep === step.stepNumber;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(step.stepNumber)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Step Pill & Emoji Pictogram */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    0{step.stepNumber}
                  </span>
                  <span className="text-2xl" role="img" aria-label={step.title}>
                    {step.pictogramEmoji}
                  </span>
                </div>

                {/* Pictogram Visual Box */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-1.5 rounded-lg bg-slate-800 border border-slate-700 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {getStepIcon(step.iconName, 'h-4 w-4')}
                  </div>
                  <h3 className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 line-clamp-1">
                {step.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* DETAILED ACTIVE STEP SHOWCASE CARD */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Big Pictogram Card & Metric */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-2xl" />

              {/* Big Pictogram Emoji Display */}
              <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center text-5xl mb-4 shadow-inner group-hover:scale-105 transition-transform">
                {selectedPictogram.pictogramEmoji}
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Step {selectedPictogram.stepNumber} of 5
              </span>

              <h3 className="text-xl font-bold text-white mb-2">
                {selectedPictogram.title}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {selectedPictogram.summary}
              </p>

              {/* Target Benchmark Metric */}
              <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center space-x-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Benchmark: {selectedPictogram.keyMetric}</span>
              </div>
            </div>
          </div>

          {/* Right: Pictogram Instructions, Dos and Don'ts */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Explanation Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Info className="h-4 w-4 text-emerald-400" />
                <span>Field Operator Instructions & Protocol</span>
              </h4>
              <div className="space-y-2.5">
                {selectedPictogram.detailedPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-start space-x-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dos and Don'ts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* DOS */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  <Check className="h-4 w-4" />
                  <span>Mandatory Best Practices (DO)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedPictogram.dos.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DON'TS */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide">
                  <X className="h-4 w-4" />
                  <span>Strict Prohibitions (DON'T)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedPictogram.donts.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINTABLE SOP CHECKLIST MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Daily Farm Health & Care SOP Sheet</h3>
                <p className="text-xs text-slate-400">Printable pictogram reference for barn bulletin boards</p>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              {HEALTH_STEP_PICTOGRAMS.map((step) => (
                <div key={step.stepNumber} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                  <span className="text-2xl">{step.pictogramEmoji}</span>
                  <div className="flex-1">
                    <span className="font-bold text-white text-sm block">
                      Step {step.stepNumber}: {step.title}
                    </span>
                    <span className="text-emerald-400 font-medium">{step.keyMetric}</span>
                    <p className="text-slate-400 mt-1">{step.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md transition"
              >
                <Printer className="h-4 w-4" />
                <span>Print SOP Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
