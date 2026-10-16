// File: frontend/src/pages/SymptomDiagnosticPage.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../utils/speechVoice';
import {
  SPECIES_DIAGNOSTIC_DATABASE,
  SymptomCondition,
  TriageSeverity,
} from '../data/diagnosticData';
import { SpeciesType } from '../types/farm2Acre';
import {
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Volume2,
  VolumeX,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  X,
  Send,
} from 'lucide-react';

interface SymptomDiagnosticPageProps {
  onOpenCallVet?: () => void;
  onSOSDispatched?: (details: any) => void;
}

export const SymptomDiagnosticPage: React.FC<SymptomDiagnosticPageProps> = ({
  onOpenCallVet,
  onSOSDispatched,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType>('cow');
  const [severityFilter, setSeverityFilter] = useState<TriageSeverity | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedConditionId, setExpandedConditionId] = useState<string | null>('cow-frothy-bloat');

  // Emergency SOS Modal
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [activeSOSCondition, setActiveSOSCondition] = useState<SymptomCondition | null>(null);
  const [sosEarTag, setSosEarTag] = useState<string>('IND-COW-104');
  const [sosPen, setSosPen] = useState<string>('Pen B-2 (North)');
  const [sosDispatchedSuccess, setSosDispatchedSuccess] = useState<boolean>(false);

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const filteredConditions = SPECIES_DIAGNOSTIC_DATABASE.filter((cond) => {
    if (cond.species !== selectedSpecies) return false;
    if (severityFilter !== 'ALL' && cond.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cond.conditionName.toLowerCase().includes(q);
      const matchHindi = cond.hindiName.toLowerCase().includes(q);
      const matchSymptoms = cond.recognizedSymptoms.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchHindi && !matchSymptoms) return false;
    }
    return true;
  });

  const handleOpenSOS = (cond: SymptomCondition) => {
    setActiveSOSCondition(cond);
    setIsSOSModalOpen(true);
    setSosDispatchedSuccess(false);
  };

  const handleConfirmSOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSOSCondition) return;

    if (onSOSDispatched) {
      onSOSDispatched({
        condition: activeSOSCondition.conditionName,
        species: activeSOSCondition.species,
        earTag: sosEarTag,
        pen: sosPen,
        timestamp: new Date().toISOString(),
      });
    }

    setSosDispatchedSuccess(true);
    setTimeout(() => {
      setIsSOSModalOpen(false);
      setSosDispatchedSuccess(false);
    }, 3500);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn text-slate-100">
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/70 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <HeartPulse className="h-3.5 w-3.5" />
              <span>Veterinary Clinical Triage & First-Aid Assistant</span>
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              Golden-Hour Protocol
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            AI Animal Health & Emergency Diagnostic Guide
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Detect early clinical symptoms, identify critical emergencies (bloat, hypoxia, enterotoxemia, Ranikhet), execute verified life-saving first-aid in the first 30 minutes, and dispatch on-call veterinary specialists with pre-filled symptom dossiers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onOpenCallVet) onOpenCallVet();
                else window.open('tel:1962', '_self');
              }}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/60 transition flex items-center gap-2 animate-pulse"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Emergency 1962 Kisan Animal Helpline (24/7 Toll-Free)</span>
            </button>

            <button
              onClick={() =>
                handleSpeech(
                  'Emergency Health Diagnostic Guide. Select species and symptoms to receive immediate triage instructions. For acute emergencies like bloat or fish gasping, execute immediate first-aid before the doctor arrives.'
                )
              }
              className="px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition flex items-center gap-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-rose-400" />}
              <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen Triage Rules'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 5-ANIMAL SWITCHER BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 'cow' as SpeciesType, label: 'Cattle Cow', icon: '🐄', sub: 'Bloat, Mastitis, Milk Fever' },
          { id: 'goat' as SpeciesType, label: 'Goats', icon: '🐐', sub: 'Enterotoxemia, Sore Mouth' },
          { id: 'fish' as SpeciesType, label: 'Fish Pond', icon: '🐟', sub: 'Oxygen Depletion, White Spot' },
          { id: 'hen' as SpeciesType, label: 'Country Poultry', icon: '🐔', sub: 'Ranikhet, Coccidiosis' },
          { id: 'pig' as SpeciesType, label: 'Piggery', icon: '🐖', sub: 'Anemia, Swine Fever' },
        ].map((tab) => {
          const isSelected = selectedSpecies === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedSpecies(tab.id);
                setExpandedConditionId(null);
              }}
              className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-400 shadow-xl font-bold scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs font-bold">{tab.label}</span>
              <span className="text-[10px] text-rose-200/90 font-mono hidden sm:inline">{tab.sub}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SEARCH & TRIAGE SEVERITY FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms (e.g. bloat, fever, blisters, oxygen)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Severity Badges Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Severity:</span>
          {(['ALL', 'CRITICAL', 'MODERATE'] as const).map((sev) => {
            const isSelected = severityFilter === sev;
            return (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? sev === 'CRITICAL'
                      ? 'bg-rose-600 text-white shadow-md'
                      : sev === 'MODERATE'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-800 text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
                }`}
              >
                {sev === 'ALL' && 'All Triage'}
                {sev === 'CRITICAL' && '🔴 Critical (Emergency)'}
                {sev === 'MODERATE' && '🟡 Moderate'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CLINICAL DIAGNOSTIC CONDITIONS LIST */}
      <div className="space-y-4">
        {filteredConditions.length === 0 ? (
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/70 text-center text-slate-400 text-sm">
            No conditions match your search query for this species. Try searching for symptoms like "bloat", "fever", or "oxygen".
          </div>
        ) : (
          filteredConditions.map((cond) => {
            const isExpanded = expandedConditionId === cond.id;
            return (
              <div
                key={cond.id}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  cond.severity === 'CRITICAL'
                    ? 'border-rose-800/80 bg-slate-900/95 shadow-xl shadow-rose-950/20'
                    : 'border-slate-800 bg-slate-900/90 shadow-lg'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedConditionId(isExpanded ? null : cond.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-700 shrink-0 relative">
                      <img src={cond.photoUrl} alt={cond.conditionName} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            cond.severity === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}
                        >
                          {cond.severity === 'CRITICAL' ? '🔴 Critical Emergency' : '🟡 Moderate Concern'}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{cond.hindiName}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {cond.conditionName}
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-1">
                        Primary Indicators: {cond.recognizedSymptoms.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeech(cond.audioSpeechText);
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="Listen audio instructions"
                    >
                      {isSpeaking && currentText === cond.audioSpeechText ? (
                        <VolumeX className="h-4 w-4 text-rose-400" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSOS(cond);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-950/50 transition flex items-center gap-1.5"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>SOS Dispatch</span>
                    </button>

                    <div className="p-2 rounded-xl bg-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Diagnostic & First-Aid Body */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                      {/* Left: Recognized Symptoms Checklist */}
                      <div className="lg:col-span-5 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Recognized Clinical Symptoms</span>
                        </h4>
                        <div className="space-y-2 text-xs">
                          {cond.recognizedSymptoms.map((symp, i) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-2.5">
                              <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                              <span className="text-slate-200 leading-relaxed">{symp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Golden Hour Immediate First Aid */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>Golden-Hour Immediate First-Aid (Before Doctor Arrives)</span>
                        </h4>
                        <div className="space-y-2 text-xs">
                          {cond.immediateFirstAid.map((step, i) => (
                            <div key={i} className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start space-x-2.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-emerald-100 leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Do Not Do & Medical Treatment Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-200 space-y-1">
                        <strong className="text-rose-400 font-bold uppercase text-[10px] tracking-wider block">
                          ⚠️ Critical Warning (What NOT To Do):
                        </strong>
                        <p className="leading-relaxed">{cond.doNotDoWarning}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 space-y-1">
                        <strong className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider block">
                          🩺 Licensed Veterinary Protocol Required:
                        </strong>
                        <p className="leading-relaxed">{cond.veterinaryActionRequired}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* SOS EMERGENCY DISPATCH MODAL */}
      {isSOSModalOpen && activeSOSCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-rose-600/60 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsSOSModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                Emergency Vet Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Dispatch Veterinary Doctor SOS
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Condition: <strong className="text-rose-300">{activeSOSCondition.conditionName}</strong> ({activeSOSCondition.hindiName})
              </p>
            </div>

            {sosDispatchedSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-400 animate-bounce" />
                <h4 className="font-black text-base text-white">Emergency Alert Dispatched!</h4>
                <p>
                  Dr. Rajesh Sharma (Government Mobile Vet Unit) notified. Estimated arrival: 25 minutes. Follow the Golden-Hour first-aid protocol while awaiting arrival.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSOS} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Affected Animal RFID / Ear-Tag ID</label>
                  <input
                    type="text"
                    required
                    value={sosEarTag}
                    onChange={(e) => setSosEarTag(e.target.value)}
                    placeholder="e.g. IND-COW-104"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Barn / Pen Location</label>
                  <input
                    type="text"
                    required
                    value={sosPen}
                    onChange={(e) => setSosPen(e.target.value)}
                    placeholder="e.g. Pen B-2 (North Shed)"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-200">
                  <span className="font-bold block">First-Aid Checklist Transmitted:</span>
                  <span className="text-[11px] text-slate-300">
                    Symptom dossier, animal age, and quarantine status are automatically relayed to the on-call veterinary vehicle.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/60 transition flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Confirm Emergency Doctor Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
