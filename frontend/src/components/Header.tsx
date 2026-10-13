// File: frontend/src/components/Header.tsx

import React from 'react';
import { Activity, Bell, PlusCircle, RefreshCw, Radio } from 'lucide-react';

interface HeaderProps {
  wsConnected: boolean;
  onOpenRegister: () => void;
  onOpenAudit: () => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  wsConnected,
  onOpenRegister,
  onOpenAudit,
  onRefreshAll,
  isRefreshing
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">Livestock Ledger</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Herd Operations Suite
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Distributed Telemetry & Financial Modeling Architecture
            </p>
          </div>
        </div>

        {/* Right: Actions & Live Indicator */}
        <div className="flex items-center space-x-3">
          {/* WebSocket Connection Pill */}
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            wsConnected
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
          }`}>
            <Radio className={`h-3.5 w-3.5 ${wsConnected ? 'animate-pulse' : ''}`} />
            <span>{wsConnected ? 'Live STOMP Stream' : 'Connecting Broker...'}</span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Refresh All Microservices"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Notification Logs */}
          <button
            onClick={onOpenAudit}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            <Bell className="h-4 w-4 text-slate-400" />
            <span className="hidden md:inline">Audit Logs</span>
          </button>

          {/* Register Livestock Button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Livestock</span>
          </button>
        </div>
      </div>
    </header>
  );
};
