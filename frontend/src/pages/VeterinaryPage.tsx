// File: frontend/src/pages/VeterinaryPage.tsx

import React from 'react';
import { EmergencyHelpline } from '../components/landing/EmergencyHelpline';
import { LivestockHealthCare } from '../components/landing/LivestockHealthCare';
import { PhoneCall, Siren } from 'lucide-react';

interface VeterinaryPageProps {
  onSOSDispatched: (details: any) => void;
  onOpenCallVet: () => void;
}

export const VeterinaryPage: React.FC<VeterinaryPageProps> = ({
  onSOSDispatched,
  onOpenCallVet,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
            <Siren className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Veterinary Healthcare & 24/7 Emergency SOS
            </h1>
            <p className="text-xs text-slate-400">
              Immediate triage dispatch for critical livestock emergencies, licensed veterinary doctor directory, and health pictograms.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenCallVet}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold border border-slate-700 transition"
          >
            <PhoneCall className="h-4 w-4 text-teal-400" />
            <span>Doctor Directory</span>
          </button>
        </div>
      </div>

      {/* Emergency SOS Helpline Form */}
      <EmergencyHelpline onSOSDispatched={onSOSDispatched} />

      {/* Visual Healthcare Pictograms */}
      <LivestockHealthCare />
    </div>
  );
};
