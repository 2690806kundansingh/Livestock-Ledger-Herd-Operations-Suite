// File: frontend/src/pages/BioEconomyPage.tsx

import React from 'react';
import { CircularBioEconomy } from '../components/farm2acre/CircularBioEconomy';
import { Zap, RefreshCw } from 'lucide-react';

export const BioEconomyPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              2-Acre Circular Bio-Economy & Zero Waste
            </h1>
            <p className="text-xs text-slate-400">
              Closed-loop resource synergy: Dung to biogas methane, bio-slurry to Super Napier grass, and goat manure to fish pond plankton.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
          <RefreshCw className="h-4 w-4" />
          <span>Zero Waste Synergies</span>
        </div>
      </div>

      {/* Circular Bio-Economy Component */}
      <CircularBioEconomy />
    </div>
  );
};
