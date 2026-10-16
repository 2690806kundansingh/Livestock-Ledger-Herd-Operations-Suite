// File: frontend/src/components/FooterWithRunningImages.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Radio
} from 'lucide-react';

export const FooterWithRunningImages: React.FC = () => {
  // Running images of livestock, farms, paddocks, feed, and operations
  const runningImages = [
    {
      url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=500&q=80',
      label: 'Gir Dairy Cattle Grazing',
      zone: 'Zone A',
    },
    {
      url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=500&q=80',
      label: 'Sirohi Elevated Goats',
      zone: 'Zone B',
    },
    {
      url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=500&q=80',
      label: 'Freshwater Fish Pond',
      zone: 'Zone C',
    },
    {
      url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=500&q=80',
      label: 'Kadaknath Free-Range Run',
      zone: 'Zone D',
    },
    {
      url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=500&q=80',
      label: 'Yorkshire Piggery Shelter',
      zone: 'Zone E',
    },
    {
      url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80',
      label: 'Sunrise Cattle Paddock',
      zone: 'North Run',
    },
    {
      url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80',
      label: 'Super Napier Green Fodder',
      zone: 'Fodder Bund',
    },
    {
      url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=500&q=80',
      label: 'Open-Ridge Ventilated Shed',
      zone: 'Dairy Parlor',
    },
    {
      url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=500&q=80',
      label: '25 m³ Biogas Digester',
      zone: 'Bio-Energy',
    },
    {
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=500&q=80',
      label: 'Organic Slurry Irrigation',
      zone: 'Napier Beds',
    },
  ];

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto overflow-hidden">
      {/* 1. FOOTER RUNNING IMAGES MARQUEE */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-2 flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span>2-Acre Live Operations Panorama (5 Integrated Zones)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Hover to pause • 87,120 Sq Ft Mixed Plot
          </span>
        </div>

        {/* Continuous Infinite Running Images Ribbon */}
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-flex space-x-4 animate-marquee py-1">
            {runningImages.concat(runningImages).map((img, idx) => (
              <div
                key={idx}
                className="inline-block relative w-56 h-32 rounded-2xl overflow-hidden border border-slate-800/90 shadow-md group shrink-0"
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-2.5 flex flex-col justify-end">
                  <span className="text-[9px] font-black uppercase text-emerald-400 bg-slate-950/80 px-1.5 py-0.5 rounded w-max">
                    {img.zone}
                  </span>
                  <span className="text-xs font-bold text-white truncate mt-0.5">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT & LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md font-bold">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">Livestock Ledger</h3>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase">2-Acre Herd Operations Suit Pro</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Standardized domestic livestock management suite designed for 2-acre mixed agricultural holdings. Integrates calibrated housing engineering, daily nutrition ration formulas, zero-waste bio-energy synergy, and 24/7 tele-veterinary dispatch.
            </p>

            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Optimized for Rural & Low-Literacy Operations with Web Speech</span>
            </div>
          </div>

          {/* Column 2: Quick Multi-Page Links */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Farm Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/start-farming" className="hover:text-teal-300 transition text-teal-300 font-bold flex items-center gap-1">
                  <span>Start Your Farm Guide</span>
                  <span className="text-[9px] bg-teal-950 px-1 py-0.2 rounded border border-teal-800 text-teal-300">New</span>
                </Link>
              </li>
              <li>
                <Link to="/shed-engineering" className="hover:text-emerald-400 transition text-emerald-300 font-bold flex items-center gap-1">
                  <span>Shed & Mat Engineering</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800 text-emerald-300">Design</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition">
                  Operations Dashboard
                </Link>
              </li>
              <li>
                <Link to="/animals" className="hover:text-emerald-400 transition">
                  Livestock Species Hub
                </Link>
              </li>
              <li>
                <Link to="/farm-map" className="hover:text-emerald-400 transition">
                  2-Acre Master Map
                </Link>
              </li>
              <li>
                <Link to="/registry" className="hover:text-emerald-400 transition">
                  Herd Master Registry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry & Production */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Operations & Trade</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/feed-inventory" className="hover:text-emerald-400 transition">
                  Feed Inventory & Runway
                </Link>
              </li>
              <li>
                <Link to="/financials" className="hover:text-emerald-400 transition">
                  Parametric P&L Simulator
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-emerald-400 transition">
                  Certified Livestock Market
                </Link>
              </li>
              <li>
                <Link to="/veterinary" className="hover:text-emerald-400 transition text-rose-300">
                  Veterinary & 24/7 SOS
                </Link>
              </li>
              <li>
                <Link to="/bio-economy" className="hover:text-emerald-400 transition">
                  Circular Bio-Economy
                </Link>
              </li>
              <li>
                <Link to="/nearby-farms" className="hover:text-emerald-400 transition">
                  Nearby Farms Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts & Specifications */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Emergency Hotline</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Kisan Vet Call Center:</span>
              <a href="tel:18001801551" className="text-sm font-black text-rose-400 hover:underline flex items-center gap-1.5">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>1800-180-1551 (Toll-Free)</span>
              </a>
              <span className="text-[10px] text-emerald-400 block pt-1">● 24/7 Mobile Vet Unit Active</span>
            </div>

            <div className="text-[11px] text-slate-400">
              <span className="text-slate-300 font-bold block">Model Plot Dimensions:</span>
              <span>87,120 Sq. Ft. (2.00 Acres) • 5 Calibrated Zones</span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM COPYRIGHT & ACCESSIBILITY BADGE */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 Livestock Ledger and Herd Operation Suit • Integrated Domestic Farm Model</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full Web Speech Audio Synthesis</span>
            </span>
            <span>•</span>
            <span className="font-mono text-emerald-400">STOMP Telemetry v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
