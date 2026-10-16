// File: frontend/src/pages/DashboardPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  Package,
  TrendingUp,
  MapPin,
  ClipboardList,
  PhoneCall,
  Siren,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SpeciesType } from '../types/farm2Acre';

interface DashboardPageProps {
  onOpenRegister: () => void;
  onOpenCallVet: () => void;
  onSelectSpecies: (species: SpeciesType) => void;
  animalsCount: number;
  lowStockCount: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenRegister,
  onOpenCallVet,
  onSelectSpecies,
  animalsCount,
  lowStockCount,
}) => {
  const navigate = useNavigate();

  const speciesList: {
    species: SpeciesType;
    name: string;
    hindiName: string;
    count: string;
    zone: string;
    imageUrl: string;
    color: string;
  }[] = [
    {
      species: 'cow',
      name: 'Dairy Cattle (Gir / Sahiwal)',
      hindiName: 'गाय',
      count: '14 Head',
      zone: 'Zone A',
      imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      color: 'border-emerald-500/50 hover:border-emerald-400',
    },
    {
      species: 'goat',
      name: 'Sirohi & Barbari Goats',
      hindiName: 'बकरी',
      count: '28 Head',
      zone: 'Zone B',
      imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
      color: 'border-amber-500/50 hover:border-amber-400',
    },
    {
      species: 'fish',
      name: 'Freshwater Aquaculture Fish',
      hindiName: 'मछली',
      count: '3,200 Fish',
      zone: 'Zone C',
      imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
      color: 'border-cyan-500/50 hover:border-cyan-400',
    },
    {
      species: 'hen',
      name: 'Kadaknath Free-Range Poultry',
      hindiName: 'मुर्गी',
      count: '145 Birds',
      zone: 'Zone D',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      color: 'border-rose-500/50 hover:border-rose-400',
    },
    {
      species: 'pig',
      name: 'Yorkshire Piggery Shelter',
      hindiName: 'सूअर',
      count: '18 Head',
      zone: 'Zone E',
      imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
      color: 'border-purple-500/50 hover:border-purple-400',
    },
  ];

  const handleAnimalClick = (species: SpeciesType) => {
    onSelectSpecies(species);
    navigate(`/animals?species=${species}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Peaceful Farm Hero Photo Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
        <div className="h-48 sm:h-56 w-full overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
            alt="Lush 2-Acre Farm at Sunrise"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                2-Acre Mixed Farm
              </span>
              <span className="text-xs text-emerald-400 font-semibold bg-slate-900/80 px-2 py-0.5 rounded-md border border-emerald-800/80">
                87,120 Sq Ft • 5 Zones Operational
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Green Pastures Livestock & Herd Operations
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Clean daily management for dairy cows, goats, aquaculture, poultry, and pigs with real-time feeding telemetry and on-demand veterinary support.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition"
            >
              + Add Animal
            </button>
            <button
              onClick={() => navigate('/farm-map')}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition"
            >
              View Map
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Key Essential Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Herd Census</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">
            {animalsCount > 0 ? animalsCount : 3405}
          </span>
          <p className="text-[11px] text-emerald-400 mt-0.5">Across 5 Domestic Species</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Herd Health Score</span>
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-cyan-400">98.4%</span>
          <p className="text-[11px] text-slate-400 mt-0.5">Vitals, Vaccines & Paddock OK</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Feed Stock Runway</span>
            <Package className="h-4 w-4 text-amber-400" />
          </div>
          <span className={`text-2xl font-black ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            18 Days
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {lowStockCount > 0 ? `${lowStockCount} Feed Item Low` : 'Green Silage & Mash Optimal'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Daily Yield</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400">19.5 L</span>
          <p className="text-[11px] text-slate-400 mt-0.5">Avg / Cow • 112 Eggs</p>
        </div>
      </div>

      {/* 3. Five Domestic Species Direct Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Select Any Livestock Species to Manage</span>
          </h2>
          <span className="text-xs text-slate-400">Click to view shed, feed & vet</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {speciesList.map((item) => (
            <button
              key={item.species}
              onClick={() => handleAnimalClick(item.species)}
              className={`rounded-2xl border bg-slate-900/90 overflow-hidden text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col group ${item.color}`}
            >
              <div className="h-28 w-full overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-200">
                  {item.zone}
                </span>
                <span className="absolute bottom-2 left-2 text-xs font-black text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded">
                  {item.count}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {item.name.split('(')[0].trim()}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">({item.hindiName})</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                  <span>Manage Animal</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Quick Page Navigation Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => navigate('/farm-map')}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-white">Farm Map</span>
          <span className="text-[10px] text-slate-400">5 Master Zones</span>
        </button>

        <button
          onClick={() => navigate('/registry')}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <ClipboardList className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-white">Herd Registry</span>
          <span className="text-[10px] text-slate-400">RFID Tag Database</span>
        </button>

        <button
          onClick={() => navigate('/feed-inventory')}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Package className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-white">Feed Inventory</span>
          <span className="text-[10px] text-slate-400">Silage & Mash</span>
        </button>

        <button
          onClick={() => navigate('/financials')}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-white">Financials</span>
          <span className="text-[10px] text-slate-400">P&L Waterfall</span>
        </button>

        <button
          onClick={onOpenCallVet}
          className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
            <PhoneCall className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-white">Call Vet</span>
          <span className="text-[10px] text-slate-400">Doctor Directory</span>
        </button>

        <button
          onClick={() => navigate('/veterinary')}
          className="p-3.5 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 transition flex flex-col items-center text-center space-y-1.5 shadow-md"
        >
          <div className="p-2 rounded-xl bg-rose-500 text-white">
            <Siren className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-rose-300">Emergency SOS</span>
          <span className="text-[10px] text-rose-400">24/7 Mobile Vet</span>
        </button>
      </div>
    </div>
  );
};
