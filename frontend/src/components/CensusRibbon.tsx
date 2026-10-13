// File: frontend/src/components/CensusRibbon.tsx

import React, { useEffect, useState } from 'react';
import { Users, ShieldAlert, Sparkles, Skull, CheckCircle2 } from 'lucide-react';
import { HeadcountSummary } from '../types';
import { wsService } from '../services/websocket';
import { api } from '../services/api';

interface CensusRibbonProps {
  initialData?: HeadcountSummary | null;
}

export const CensusRibbon: React.FC<CensusRibbonProps> = ({ initialData }) => {
  const [census, setCensus] = useState<HeadcountSummary>({
    totalHeadcount: 0,
    activeCount: 0,
    quarantineCount: 0,
    soldCount: 0,
    deceasedCount: 0,
    juvenileCount: 0,
    mortalityRatePercentage: 0,
    calculatedAt: new Date().toISOString(),
  });

  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  // Load initial census via REST
  useEffect(() => {
    if (initialData) {
      setCensus(initialData);
    } else {
      api.getCensus()
        .then((data) => setCensus(data))
        .catch((err) => console.warn('Could not load initial census:', err));
    }
  }, [initialData]);

  // Subscribe to live STOMP /topic/headcount
  useEffect(() => {
    const unsubscribe = wsService.subscribeToHeadcount((incomingSummary) => {
      console.log('[CensusRibbon] Received live STOMP delta frame:', incomingSummary);
      setCensus(incomingSummary);
      setHasUpdated(true);

      // Flash pulse animation reset
      const timer = setTimeout(() => setHasUpdated(false), 2000);
      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      label: 'Total Herd Census',
      value: census.totalHeadcount,
      sub: 'All recorded animals',
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40',
      borderColor: 'border-indigo-800/40',
    },
    {
      label: 'Active Grazing',
      value: census.activeCount,
      sub: 'Healthy & productive',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-800/40',
    },
    {
      label: 'Quarantined / Sick',
      value: census.quarantineCount,
      sub: 'Under active treatment',
      icon: ShieldAlert,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-800/40',
    },
    {
      label: 'Juvenile Calves',
      value: census.juvenileCount,
      sub: 'Under 6 months',
      icon: Sparkles,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40',
      borderColor: 'border-cyan-800/40',
    },
    {
      label: 'Mortality Rate',
      value: `${census.mortalityRatePercentage}%`,
      sub: `${census.deceasedCount} deceased recorded`,
      icon: Skull,
      color: census.mortalityRatePercentage > 5 ? 'text-rose-400' : 'text-slate-400',
      bgColor: census.mortalityRatePercentage > 5 ? 'bg-rose-950/40' : 'bg-slate-900/60',
      borderColor: census.mortalityRatePercentage > 5 ? 'border-rose-800/40' : 'border-slate-800',
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Real-Time Census Ribbon
          </h2>
          {hasUpdated && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
              Live Frame Delta Updated
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">
          Last Synced: {new Date(census.calculatedAt).toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${c.bgColor} ${c.borderColor} ${
                hasUpdated ? 'ring-1 ring-emerald-500/40' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{c.label}</span>
                <Icon className={`h-4 w-4 ${c.color}`} />
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className={`text-2xl font-bold tracking-tight ${c.color}`}>
                  {c.value}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500 truncate">
                {c.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
