// File: frontend/src/pages/FarmMapPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmMasterMap } from '../components/farm2acre/FarmMasterMap';
import { SpeciesType } from '../types/farm2Acre';
import { MapPin, Compass } from 'lucide-react';

interface FarmMapPageProps {
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
}

export const FarmMapPage: React.FC<FarmMapPageProps> = ({
  selectedSpecies,
  onSelectSpecies,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              2-Acre Master Blueprint & Spatial Zones
            </h1>
            <p className="text-xs text-slate-400">
              Interactive architectural layout across 87,120 Sq Ft: Zones A, B, C, D, and E with bio-fencing.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-xl">
          <MapPin className="h-4 w-4" />
          <span>87,120 Sq. Ft. • 2.00 Acres</span>
        </div>
      </div>

      {/* 2-Acre Master Map Module */}
      <FarmMasterMap
        selectedSpecies={selectedSpecies}
        onSelectSpecies={(species) => {
          onSelectSpecies(species);
          navigate(`/animals?species=${species}`);
        }}
      />
    </div>
  );
};
