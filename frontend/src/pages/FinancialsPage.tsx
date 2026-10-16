// File: frontend/src/pages/FinancialsPage.tsx

import React from 'react';
import { PnlForecastSimulator } from '../components/PnlForecastSimulator';
import { TrendingUp, DollarSign } from 'lucide-react';

export const FinancialsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Herd Financials & Parametric P&L Forecast
            </h1>
            <p className="text-xs text-slate-400">
              Parametric forecasting microservice with waterfall cash-flow breakdown, mortality depreciation, and feed costs.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
          <DollarSign className="h-4 w-4" />
          <span>Real-Time Projections</span>
        </div>
      </div>

      {/* P&L Forecast Simulator Component */}
      <PnlForecastSimulator />
    </div>
  );
};
