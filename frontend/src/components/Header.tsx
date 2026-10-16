// File: frontend/src/components/Header.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu,
  Activity, 
  PlusCircle, 
  Radio, 
  Home,
  LayoutDashboard,
  Sparkles,
  Layers,
} from 'lucide-react';

export interface HeaderProps {
  wsConnected: boolean;
  currentTitle: string;
  onOpenRegister: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  wsConnected,
  currentTitle,
  onOpenRegister,
  onToggleSidebar,
  isSidebarOpen = true,
}) => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/' || location.pathname === '/home';
  const isDashboardActive = location.pathname === '/dashboard';
  const isStarterActive = location.pathname === '/start-farming';
  const isShedActive = location.pathname === '/shed-engineering';

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Sidebar Toggle & Clear Brand */}
        <div className="flex items-center space-x-3.5 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition flex items-center gap-2 group ${
                isSidebarOpen
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
              }`}
              title="Toggle Navigation & Tasks Sidebar"
              aria-label="Toggle Tasks Sidebar"
            >
              <Menu className="h-5 w-5 text-emerald-400 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold">Menu</span>
            </button>
          )}

          {/* Logo & Title - Clickable to Home */}
          <Link to="/" className="flex items-center space-x-2.5 select-none group">
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/60 font-bold border border-emerald-400/30 group-hover:scale-105 transition-transform">
                <Activity className="h-5 w-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${wsConnected ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 border-2 border-slate-900 ${wsConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="text-base font-black text-white tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
                  Livestock Ledger
                </h1>
                <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  Suite
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                2-Acre Domestic Farm Management
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Shortcuts & Current Active View Breadcrumb */}
        <div className="hidden md:flex items-center space-x-2">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              isHomeActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Farm Home</span>
          </Link>

          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              isDashboardActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/start-farming"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              isStarterActive
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Start Farm</span>
          </Link>

          <Link
            to="/shed-engineering"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              isShedActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Shed & Mats</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <div className="flex items-center px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-bold text-slate-200">
            <span className="text-emerald-400 mr-2">●</span>
            <span>{currentTitle}</span>
          </div>
        </div>

        {/* Right Section: Telemetry, Primary Action & Profile */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* WebSocket Status Indicator */}
          <div 
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              wsConnected
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
            }`}
            title={wsConnected ? 'Real-Time Telemetry Live' : 'Reconnecting to Telemetry'}
          >
            <Radio className={`h-3 w-3 ${wsConnected ? 'animate-pulse' : ''}`} />
            <span className="text-[11px] font-mono hidden md:inline">{wsConnected ? 'Live' : 'Offline'}</span>
          </div>

          {/* Primary Action Button: Add Livestock */}
          <button
            onClick={onOpenRegister}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/60 transition active:scale-95"
            title="Register New Ear-Tagged Livestock"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Animal</span>
          </button>

          {/* Clean Farmer Profile Avatar */}
          <div 
            className="flex items-center space-x-2 pl-2 border-l border-slate-800"
            title="Green Pastures Farm • Active"
          >
            <img
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=120&q=80"
              alt="Farmer Profile"
              className="h-8 w-8 rounded-full object-cover border-2 border-emerald-500/50 shadow-sm"
            />
            <div className="hidden xl:block text-left leading-tight">
              <p className="text-xs font-bold text-white truncate max-w-[100px]">Green Pastures</p>
              <p className="text-[10px] text-emerald-400">2.0 Acres</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
