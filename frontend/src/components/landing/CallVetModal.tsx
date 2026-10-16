// File: frontend/src/components/landing/CallVetModal.tsx

import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  PhoneCall, 
  Calendar, 
  Video
} from 'lucide-react';
import { VET_DOCTORS_ROSTER } from '../../data/landingData';

interface CallVetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallVetModal: React.FC<CallVetModalProps> = ({ isOpen, onClose }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('General Consultation');
  const [consultationMode, setConsultationMode] = useState<'AUDIO' | 'VIDEO' | 'FARM_VISIT'>('AUDIO');
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [activeVet, setActiveVet] = useState<typeof VET_DOCTORS_ROSTER[0] | null>(null);

  if (!isOpen) return null;

  const specialties = [
    'General Bovine & Small Ruminant Care',
    'Dystocia & Calving Complications',
    'Mastitis & Udder Health',
    'Infectious Disease & Vaccination',
    'Feed Formulation & TMR Nutrition',
  ];

  const handleStartCall = (vet: typeof VET_DOCTORS_ROSTER[0]) => {
    setActiveVet(vet);
    setIsCalling(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Call Veterinarian</h3>
              <p className="text-xs text-slate-400">On-demand licensed veterinary tele-triage & dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isCalling && activeVet ? (
          <div className="p-8 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={activeVet.imageUrl}
                alt={activeVet.name}
                className="w-full h-full object-cover rounded-full border-2 border-emerald-400"
              />
              <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-slate-950">
                <PhoneCall className="h-4 w-4 animate-bounce" />
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">{activeVet.name}</h4>
              <p className="text-xs text-emerald-400 font-medium">{activeVet.specialty}</p>
              <p className="text-[11px] text-slate-400 mt-1">Connecting encrypted audio channel...</p>
            </div>

            <div className="pt-2 flex justify-center space-x-3">
              <a
                href={`tel:${activeVet.phone}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-2"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Open Phone Dialer ({activeVet.phone})</span>
              </a>
              <button
                onClick={() => setIsCalling(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                End Call
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Consultation Mode Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Preferred Consultation Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'AUDIO', label: 'Audio Call', icon: PhoneCall },
                  { id: 'VIDEO', label: 'Video Call', icon: Video },
                  { id: 'FARM_VISIT', label: 'On-Farm Visit', icon: Calendar },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setConsultationMode(mode.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1.5 transition ${
                        consultationMode === mode.id
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specialty picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Consultation Topic
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                {specialties.map((spec, sIdx) => (
                  <option key={sIdx} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* On-Call Doctors List */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Available On-Duty Veterinarians ({VET_DOCTORS_ROSTER.length})
              </label>

              {VET_DOCTORS_ROSTER.map((vet) => (
                <div
                  key={vet.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-emerald-500/40 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={vet.imageUrl}
                      alt={vet.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-white">{vet.name}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] text-emerald-400 block font-medium">
                        {vet.qualification}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {vet.specialty} • {vet.experienceYears} Yrs Exp
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStartCall(vet)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>Call Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
