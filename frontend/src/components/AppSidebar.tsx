// File: frontend/src/components/AppSidebar.tsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  HeartPulse,
  MapPin,
  ClipboardList,
  Package,
  TrendingUp,
  Store,
  PhoneCall,
  Zap,
  Compass,
  Sparkles,
  Layers,
  PlusCircle,
  BookOpen,
  Volume2,
  VolumeX,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
} from 'lucide-react';
import { SpeciesType } from '../types/farm2Acre';
import { useFarmVoice } from '../utils/speechVoice';

export interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
  onOpenRegister: () => void;
  onOpenActivityLog: () => void;
  onOpenCallVet: () => void;
  onOpenGuide: () => void;
  onOpenAudit: () => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
  animalsCount: number;
  lowStockCount: number;
  wsConnected: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  selectedSpecies,
  onSelectSpecies,
  onOpenRegister,
  onOpenActivityLog,
  onOpenCallVet,
  onOpenGuide,
  onOpenAudit,
  onRefreshAll,
  isRefreshing,
  animalsCount,
  lowStockCount,
  wsConnected,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSpeaking, speak, stop } = useFarmVoice();

  const handleVoiceIntro = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(
        'Welcome to the 2-Acre Domestic Livestock Hub. Navigate to the Dashboard, inspect cows, goats, fish, hens, and pigs, or check feed stocks and veterinary contacts.'
      );
    }
  };

  const navPages: {
    path: string;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      path: '/',
      label: 'Farm Home & Tour',
      sublabel: 'Full farm detailing & guide',
      icon: <Home className="h-4 w-4" />,
      badge: 'Main',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      path: '/start-farming',
      label: 'Start Your Farm',
      sublabel: 'Step-by-step setup guide',
      icon: <Sparkles className="h-4 w-4" />,
      badge: 'Guide',
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
    },
    {
      path: '/shed-engineering',
      label: 'Shed & Mat Architecture',
      sublabel: 'Structure & floor mat guide',
      icon: <Layers className="h-4 w-4" />,
      badge: 'Design',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      path: '/dashboard',
      label: 'Dashboard Overview',
      sublabel: 'Farm telemetry & census',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      path: '/animals',
      label: 'Livestock Care Hub',
      sublabel: 'Shed, feed & vet by species',
      icon: <HeartPulse className="h-4 w-4" />,
      badge: `${selectedSpecies.toUpperCase()}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      path: '/farm-map',
      label: '2-Acre Master Map',
      sublabel: 'Zone A to E spatial layout',
      icon: <MapPin className="h-4 w-4" />,
      badge: '5 Zones',
    },
    {
      path: '/registry',
      label: 'Herd Master Registry',
      sublabel: 'RFID database & records',
      icon: <ClipboardList className="h-4 w-4" />,
      badge: `${animalsCount} Head`,
    },
    {
      path: '/feed-inventory',
      label: 'Feed Inventory & Runway',
      sublabel: 'Daily ration & stock days',
      icon: <Package className="h-4 w-4" />,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : 'Normal',
      badgeColor: lowStockCount > 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : undefined,
    },
    {
      path: '/financials',
      label: 'Financials & P&L',
      sublabel: 'Waterfall forecast simulator',
      icon: <TrendingUp className="h-4 w-4" />,
      badge: 'Forecast',
    },
    {
      path: '/marketplace',
      label: 'Buy & Sell Market',
      sublabel: 'Certified livestock trading',
      icon: <Store className="h-4 w-4" />,
    },
    {
      path: '/veterinary',
      label: 'Veterinary & SOS',
      sublabel: 'Doctor directory & 24/7 helpline',
      icon: <PhoneCall className="h-4 w-4" />,
      badge: '24/7',
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
    {
      path: '/bio-economy',
      label: 'Circular Bio-Economy',
      sublabel: 'Zero-waste biogas & slurry loop',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      path: '/nearby-farms',
      label: 'Nearby Farms',
      sublabel: 'Leaflet local farm network',
      icon: <Compass className="h-4 w-4" />,
    },
  ];

  const speciesQuickSelect: { species: SpeciesType; label: string; icon: string; count: string }[] = [
    { species: 'cow', label: 'Cattle Dairy', icon: '🐄', count: '14 Head' },
    { species: 'goat', label: 'Goats', icon: '🐐', count: '28 Head' },
    { species: 'fish', label: 'Fish Pond', icon: '🐟', count: '3.2k' },
    { species: 'hen', label: 'Poultry', icon: '🐔', count: '145' },
    { species: 'pig', label: 'Piggery', icon: '🐖', count: '18 Head' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) onClose();
  };

  const handleSpeciesClick = (species: SpeciesType) => {
    onSelectSpecies(species);
    navigate(`/animals?species=${species}`);
    if (window.innerWidth < 1024) onClose();
  };

  const isCurrentPage = (path: string): boolean => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 z-40 h-screen lg:h-[calc(100vh-4rem)] bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col shadow-xl shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'w-72 sm:w-76'}`}
      >
        {/* Top Header inside Sidebar */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          {!isCollapsed ? (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-300">
                Farm Pages & Operations
              </h2>
              <p className="text-[10px] text-slate-500">Dedicated multi-page views</p>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              LL
            </div>
          )}

          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
              title="Close Menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2 Primary Action Buttons */}
        <div className="p-3 border-b border-slate-800 space-y-1.5 shrink-0">
          <button
            onClick={() => {
              onOpenRegister();
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/60 transition flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-2'
            }`}
            title="Register New Animal"
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Add Livestock</span>}
          </button>

          <button
            onClick={() => {
              onOpenActivityLog();
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-2'
            }`}
            title="Log Health or Feeding Activity"
          >
            <ClipboardList className="h-4 w-4 text-emerald-400 shrink-0" />
            {!isCollapsed && <span>Log Activity Event</span>}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <p className={`px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•••' : 'Pages'}
          </p>

          {navPages.map((item) => {
            const isActive = isCurrentPage(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full p-2 rounded-xl text-left transition flex items-center group ${
                  isActive
                    ? 'bg-emerald-950/70 border border-emerald-500/50 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                } ${isCollapsed ? 'justify-center' : 'space-x-2.5'}`}
                title={item.label}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400 group-hover:text-emerald-300'
                  }`}
                >
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                            item.badgeColor || 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{item.sublabel}</p>
                  </div>
                )}
              </button>
            );
          })}

          {/* Quick Species Picker under Livestock Hub */}
          {!isCollapsed && location.pathname === '/animals' && (
            <div className="mt-2 pt-2 border-t border-slate-800/80 px-1 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block px-1">
                Select Species:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {speciesQuickSelect.map((spec) => {
                  const isCur = selectedSpecies === spec.species;
                  return (
                    <button
                      key={spec.species}
                      onClick={() => handleSpeciesClick(spec.species)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                        isCur
                          ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="flex items-center space-x-1.5">
                        <span>{spec.icon}</span>
                        <span>{spec.label}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{spec.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Clean Support Links */}
          <div className="pt-3 border-t border-slate-800/80 space-y-1">
            <button
              onClick={() => {
                onOpenGuide();
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2 rounded-xl text-left text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition flex items-center ${
                isCollapsed ? 'justify-center' : 'space-x-2.5'
              }`}
              title="Farmer's User Manual"
            >
              <BookOpen className="h-4 w-4 text-emerald-400 shrink-0" />
              {!isCollapsed && <span>Farmer's User Guide</span>}
            </button>

            <button
              onClick={handleVoiceIntro}
              className={`w-full p-2 rounded-xl text-left text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition flex items-center ${
                isCollapsed ? 'justify-center' : 'space-x-2.5'
              }`}
              title="Audio Voice Reader"
            >
              {isSpeaking ? (
                <VolumeX className="h-4 w-4 text-emerald-400 shrink-0 animate-pulse" />
              ) : (
                <Volume2 className="h-4 w-4 text-emerald-400 shrink-0" />
              )}
              {!isCollapsed && <span>{isSpeaking ? 'Stop Audio Voice' : 'Listen Voice Intro'}</span>}
            </button>

            <button
              onClick={() => {
                onOpenAudit();
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2 rounded-xl text-left text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition flex items-center ${
                isCollapsed ? 'justify-center' : 'space-x-2.5'
              }`}
              title="Notification Audit Logs"
            >
              <Bell className="h-4 w-4 text-indigo-400 shrink-0" />
              {!isCollapsed && <span>Audit & Alerts</span>}
            </button>

            <button
              onClick={() => {
                onOpenCallVet();
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2 rounded-xl text-left text-xs font-semibold text-teal-300 hover:text-white hover:bg-slate-800/60 transition flex items-center ${
                isCollapsed ? 'justify-center' : 'space-x-2.5'
              }`}
              title="Call On-Duty Veterinary Doctor"
            >
              <PhoneCall className="h-4 w-4 text-teal-400 shrink-0" />
              {!isCollapsed && <span>Vet Directory</span>}
            </button>
          </div>
        </div>

        {/* Bottom Farm Spotlight Photo Card (when expanded) */}
        {!isCollapsed && (
          <div className="p-3 border-t border-slate-800 bg-slate-950/80 shrink-0">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&q=80"
                alt="Farm Paddock"
                className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2 flex flex-col justify-end">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-400">2-Acre Live Pasture</span>
                  <span className="text-slate-300 font-mono">87,120 Sq Ft</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className="text-[10px] font-mono">{wsConnected ? 'STOMP Live' : 'Offline'}</span>
              </span>
              <button
                onClick={onRefreshAll}
                disabled={isRefreshing}
                className="hover:text-emerald-400 flex items-center space-x-1 transition text-[10px] font-medium"
                title="Sync Telemetry"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
                <span>Sync</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
