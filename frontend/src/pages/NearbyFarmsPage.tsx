// File: frontend/src/pages/NearbyFarmsPage.tsx

import React from 'react';
import { NearbyFarmsView } from '../components/farm2acre/NearbyFarmsView';
import { Compass, MapPin } from 'lucide-react';

export const NearbyFarmsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Nearby Local Farms Discovery & Direct Contact
            </h1>
            <p className="text-xs text-slate-400">
              PostGIS spatial geolocation with Leaflet map: Locate neighboring dairy, goat, poultry, and aquaculture producers.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-1.5 rounded-xl">
          <MapPin className="h-4 w-4" />
          <span>Interactive Leaflet Map</span>
        </div>
      </div>

      {/* Nearby Farms Leaflet & PostGIS Component */}
      <NearbyFarmsView />
    </div>
  );
};
