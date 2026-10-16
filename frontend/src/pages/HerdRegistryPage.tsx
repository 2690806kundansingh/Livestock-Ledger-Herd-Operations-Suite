// File: frontend/src/pages/HerdRegistryPage.tsx

import React from 'react';
import { AnimalDataGrid } from '../components/AnimalDataGrid';
import { CensusRibbon } from '../components/CensusRibbon';
import { Animal } from '../types';
import { ClipboardList, PlusCircle, Database } from 'lucide-react';

interface HerdRegistryPageProps {
  animals: Animal[];
  loading: boolean;
  onOpenRegister: () => void;
  onSelectAnimalForEvent: (animal: Animal) => void;
}

export const HerdRegistryPage: React.FC<HerdRegistryPageProps> = ({
  animals,
  loading,
  onOpenRegister,
  onSelectAnimalForEvent,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Herd Master Registry & Database
            </h1>
            <p className="text-xs text-slate-400">
              Live PostgreSQL database synchronization for ear-tagged domestic livestock, pen locations, and life events.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
            <Database className="h-3.5 w-3.5 text-cyan-400" />
            <span>{animals.length} Animals Registered</span>
          </div>
          <button
            onClick={onOpenRegister}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/60 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Animal</span>
          </button>
        </div>
      </div>

      {/* Real-Time Census Ribbon */}
      <CensusRibbon />

      {/* Animal Data Grid Table */}
      <AnimalDataGrid
        animals={animals}
        loading={loading}
        onSelectAnimalForEvent={onSelectAnimalForEvent}
      />
    </div>
  );
};
