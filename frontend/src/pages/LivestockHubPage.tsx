// File: frontend/src/pages/LivestockHubPage.tsx

import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpeciesManagementModule } from '../components/farm2acre/SpeciesManagementModule';
import { SpeciesType } from '../types/farm2Acre';
import { Sparkles, HeartPulse } from 'lucide-react';

interface LivestockHubPageProps {
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
}

export const LivestockHubPage: React.FC<LivestockHubPageProps> = ({
  selectedSpecies,
  onSelectSpecies,
}) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sp = searchParams.get('species') as SpeciesType;
    if (sp && ['cow', 'goat', 'fish', 'hen', 'pig'].includes(sp)) {
      onSelectSpecies(sp);
    }
  }, [searchParams, onSelectSpecies]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Domestic Livestock Care & Housing Hub
            </h1>
            <p className="text-xs text-slate-400">
              Calibrated shed engineering, daily feed nutrition rations, and certified veterinary protocols.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
          <Sparkles className="h-4 w-4" />
          <span className="uppercase">Managing {selectedSpecies}</span>
        </div>
      </div>

      {/* Main Species Care & Management Module */}
      <SpeciesManagementModule
        selectedSpecies={selectedSpecies}
        onSelectSpecies={onSelectSpecies}
      />
    </div>
  );
};
