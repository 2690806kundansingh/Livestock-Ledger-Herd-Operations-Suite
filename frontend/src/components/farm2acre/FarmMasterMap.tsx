// File: frontend/src/components/farm2acre/FarmMasterMap.tsx

import React, { useState } from 'react';
import { FARM_ZONES_CONFIG } from '../../data/farm2AcreData';
import { FarmZone, SpeciesType, ZoneId } from '../../types/farm2Acre';
import { useFarmVoice } from '../../utils/speechVoice';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  Layers,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface FarmMasterMapProps {
  selectedSpecies: SpeciesType;
  onSelectSpecies: (species: SpeciesType) => void;
  onSelectZone?: (zoneId: ZoneId) => void;
}

export const FarmMasterMap: React.FC<FarmMasterMapProps> = ({
  selectedSpecies,
  onSelectSpecies,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);

  // Find the currently selected zone
  const activeZone =
    FARM_ZONES_CONFIG.find((z) => z.species === selectedSpecies) || FARM_ZONES_CONFIG[0];

  const handleZoneClick = (zone: FarmZone) => {
    onSelectSpecies(zone.species);
  };

  const handleAudioReadout = (zone: FarmZone) => {
    const textToSpeak = `${zone.name}. Area: ${zone.areaSqFt.toLocaleString()} square feet, which is ${
      zone.areaPercentage
    }. Key installations include: ${zone.keyFeatures.join(', ')}. ${zone.summary}`;

    if (isSpeaking && currentText === textToSpeak) {
      stop();
    } else {
      speak(textToSpeak);
    }
  };

  // Map zone species to visual coordinates
  const isCowActive = selectedSpecies === 'cow';
  const isGoatActive = selectedSpecies === 'goat';
  const isFishActive = selectedSpecies === 'fish';
  const isHenActive = selectedSpecies === 'hen';
  const isPigActive = selectedSpecies === 'pig';

  return (
    <section id="farm-master-map" className="w-full py-8 space-y-6">
      {/* Blueprint Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            <span>Top-Down Land-Use Vector Blueprint • 87,120 Sq Ft (2.00 Acres)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>2-Acre Mixed Farm Master Layout</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Interactive Architectural Schematic
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Designed for maximum bio-resource circular synergy. Tap any zone on the blueprint below to
            inspect physical infrastructure specs, housing dimensions, and jump into species management.
          </p>
        </div>

        {/* 2-Acre Master Statistics Badge */}
        <div className="flex items-center space-x-3 shrink-0 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Plot Area</span>
            <span className="text-base font-black text-emerald-400">87,120 Sq.Ft</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Active Zones</span>
            <span className="text-base font-black text-white">5 Integrated Units</span>
          </div>
        </div>
      </div>

      {/* Main Map + Zone Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Vector SVG Blueprint Display (8 Columns on desktop) */}
        <div className="lg:col-span-8 bg-slate-950/90 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
          {/* Subtle Grid Watermark Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #34d399 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          ></div>

          {/* Map Compass & Scale Badge */}
          <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <span className="font-bold text-emerald-400">N ↑</span>
            <span>Plot Dimensions: ~295 ft × 295 ft (2 Acres)</span>
          </div>

          <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{hoveredZone ? `Inspecting: ${hoveredZone.toUpperCase()}` : 'Click any sector to inspect'}</span>
          </div>

          {/* High-Resolution SVG Blueprint */}
          <div className="w-full aspect-[16/10] sm:aspect-[16/10.5] mt-6 sm:mt-8 relative">
            <svg
              viewBox="0 0 1000 640"
              className="w-full h-full drop-shadow-2xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Zone Gradients */}
                <linearGradient id="grad-zone-a" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="grad-zone-b" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="grad-zone-c" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#164e63" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#083344" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="grad-zone-d" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#881337" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#4c0519" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="grad-zone-e" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#581c87" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3b0764" stopOpacity="0.95" />
                </linearGradient>

                {/* Road / Boundary Patterns */}
                <pattern id="roadPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                </pattern>

                {/* Water Pattern for Pond */}
                <pattern id="waterWave" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 Q 10 5, 20 10 T 40 10" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>

              {/* Master Farm Outer Perimeter Fence */}
              <rect
                x="15"
                y="15"
                width="970"
                height="610"
                rx="20"
                fill="#090d16"
                stroke="#334155"
                strokeWidth="4"
              />

              {/* Central Tractor Access Roadways (Circulation corridors) */}
              <path
                d="M 520 20 L 520 620 M 20 330 L 980 330"
                stroke="#1e293b"
                strokeWidth="24"
                fill="none"
              />
              <path
                d="M 520 20 L 520 620 M 20 330 L 980 330"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
              />

              {/* ========================================================
                  ZONE A: CATTLE DAIRY & VENTILATED COW SHED (~25,000 SQ FT)
                  Top-Left Sector (x: 30, y: 30, w: 470, h: 285)
              ======================================================== */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleZoneClick(FARM_ZONES_CONFIG[0])}
                onMouseEnter={() => setHoveredZone('zone-a')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="30"
                  y="30"
                  width="470"
                  height="285"
                  rx="14"
                  fill="url(#grad-zone-a)"
                  stroke={isCowActive ? '#10b981' : '#059669'}
                  strokeWidth={isCowActive ? 5 : 2}
                  className="transition-all"
                  filter={isCowActive ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.45))' : undefined}
                />

                {/* Zone A Internal Blueprint Elements */}
                {/* 1. Ventilated Open Ridge Shed Building */}
                <rect x="50" y="50" width="220" height="150" rx="8" fill="#047857" opacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                <line x1="50" y1="125" x2="270" y2="125" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
                <text x="60" y="70" fill="#a7f3d0" fontSize="11" fontWeight="bold">VENTILATED COW SHED (14ft Ridge)</text>
                
                {/* Feeding Mangers */}
                <rect x="60" y="85" width="200" height="22" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                <text x="70" y="100" fill="#ecfdf5" fontSize="9">Continuous Feeding Manger & Yokes</text>

                {/* Milking Parlor */}
                <rect x="60" y="145" width="95" height="42" rx="4" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />
                <text x="68" y="162" fill="#ccfbf1" fontSize="9" fontWeight="bold">Milking Stall</text>
                <text x="68" y="176" fill="#99f6e4" fontSize="8">Herringbone 4-Cow</text>

                {/* Silage Bunker Pit (60 Tonnes) */}
                <rect x="170" y="145" width="90" height="42" rx="4" fill="#14532d" stroke="#86efac" strokeWidth="1" />
                <text x="178" y="162" fill="#dcfce7" fontSize="9" fontWeight="bold">Silage Bunker</text>
                <text x="178" y="176" fill="#bbf7d0" fontSize="8">60 Tonnes Pit</text>

                {/* 2. Sand Exercise Paddock */}
                <rect x="285" y="50" width="200" height="245" rx="8" fill="#115e59" opacity="0.25" stroke="#14b8a6" strokeWidth="1" strokeDasharray="4 4" />
                <text x="295" y="75" fill="#5eead4" fontSize="11" fontWeight="bold">OPEN EXERCISE PADDOCK</text>
                <text x="295" y="95" fill="#99f6e4" fontSize="9">Loose sandy soil bed</text>
                <text x="295" y="112" fill="#99f6e4" fontSize="9">6 hrs Daily Sunlight</text>
                
                {/* Cow icons representations */}
                <circle cx="340" cy="160" r="12" fill="#059669" stroke="#34d399" strokeWidth="2" />
                <text x="335" y="164" fill="#ffffff" fontSize="11">🐄</text>
                <circle cx="390" cy="190" r="12" fill="#059669" stroke="#34d399" strokeWidth="2" />
                <text x="385" y="194" fill="#ffffff" fontSize="11">🐄</text>
                <circle cx="430" cy="140" r="12" fill="#059669" stroke="#34d399" strokeWidth="2" />
                <text x="425" y="144" fill="#ffffff" fontSize="11">🐄</text>

                {/* Zone Label Badge */}
                <rect x="45" y="270" width="230" height="32" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                <text x="55" y="291" fill="#34d399" fontSize="12" fontWeight="bold">ZONE A: Cattle Dairy (25,000 sq ft)</text>
              </g>

              {/* ========================================================
                  ZONE B: ELEVATED STILTED GOAT HOUSE (~16,000 SQ FT)
                  Top-Right Sector (x: 540, y: 30, w: 440, h: 285)
              ======================================================== */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleZoneClick(FARM_ZONES_CONFIG[1])}
                onMouseEnter={() => setHoveredZone('zone-b')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="540"
                  y="30"
                  width="440"
                  height="285"
                  rx="14"
                  fill="url(#grad-zone-b)"
                  stroke={isGoatActive ? '#f59e0b' : '#d97706'}
                  strokeWidth={isGoatActive ? 5 : 2}
                  className="transition-all"
                  filter={isGoatActive ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.45))' : undefined}
                />

                {/* Perimeter Moringa / Subabul Bio-Fence Trees */}
                <rect x="555" y="45" width="410" height="25" rx="6" fill="#713f12" opacity="0.6" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
                <text x="565" y="62" fill="#fef08a" fontSize="10" fontWeight="bold">🌳 PERIMETER MORINGA & SUBABUL FODDER ORCHARD</text>

                {/* Elevated Slatted Goat House Building */}
                <rect x="560" y="85" width="220" height="150" rx="8" fill="#92400e" opacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="575" y="110" fill="#fde68a" fontSize="11" fontWeight="bold">STILTED GOAT SHED (1.5m High)</text>
                <text x="575" y="126" fill="#fcd34d" fontSize="9">Slatted Wood Floor (Self-cleaning)</text>

                {/* Kid Creep Feeding Pen */}
                <rect x="575" y="145" width="90" height="50" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                <text x="583" y="165" fill="#fef3c7" fontSize="9" fontWeight="bold">Kid Nursery</text>
                <text x="583" y="180" fill="#fde68a" fontSize="8">Infrared Heat Lamps</text>

                {/* Hay Feeder Racks */}
                <rect x="680" y="145" width="85" height="50" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                <text x="690" y="165" fill="#fef3c7" fontSize="9" fontWeight="bold">Hay Racks</text>
                <text x="690" y="180" fill="#fde68a" fontSize="8">Dry Legume Feed</text>

                {/* Browsing Ground with Trees */}
                <rect x="795" y="85" width="170" height="150" rx="8" fill="#451a03" opacity="0.4" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
                <text x="805" y="110" fill="#fde047" fontSize="10" fontWeight="bold">OUTDOOR BROWSE</text>
                <circle cx="840" cy="150" r="12" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                <text x="835" y="154" fill="#ffffff" fontSize="11">🐐</text>
                <circle cx="910" cy="170" r="12" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                <text x="905" y="174" fill="#ffffff" fontSize="11">🐐</text>
                <circle cx="870" cy="205" r="12" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                <text x="865" y="209" fill="#ffffff" fontSize="11">🐐</text>

                {/* Zone Label Badge */}
                <rect x="555" y="260" width="220" height="32" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="565" y="281" fill="#fbbf24" fontSize="12" fontWeight="bold">ZONE B: Goat House (16,000 sq ft)</text>
              </g>

              {/* ========================================================
                  ZONE C: AQUACULTURE EARTHEN FISH POND (~22,000 SQ FT)
                  Center-Right/Bottom Sector (x: 480, y: 350, w: 500, h: 260)
              ======================================================== */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleZoneClick(FARM_ZONES_CONFIG[2])}
                onMouseEnter={() => setHoveredZone('zone-c')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="480"
                  y="350"
                  width="500"
                  height="260"
                  rx="14"
                  fill="url(#grad-zone-c)"
                  stroke={isFishActive ? '#06b6d4' : '#0891b2'}
                  strokeWidth={isFishActive ? 5 : 2}
                  className="transition-all"
                  filter={isFishActive ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.45))' : undefined}
                />

                {/* Earthen Water Body with Water Waves */}
                <rect x="500" y="370" width="460" height="190" rx="12" fill="#0e7490" opacity="0.5" stroke="#22d3ee" strokeWidth="2" />
                <rect x="500" y="370" width="460" height="190" rx="12" fill="url(#waterWave)" />

                {/* Napier Grass Bund Border */}
                <rect x="500" y="370" width="460" height="190" rx="12" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="10 6" opacity="0.8" />
                <text x="520" y="395" fill="#a5f3fc" fontSize="12" fontWeight="bold">AQUACULTURE EARTHEN POND (1.8m Depth)</text>
                <text x="520" y="412" fill="#67e8f9" fontSize="9">Napier Grass Stabilized Dykes • Plankton Manure Net</text>

                {/* Solar Floating Paddlewheel Aerator with Rotation Graphic */}
                <g transform="translate(730, 450)">
                  <circle cx="0" cy="0" r="26" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                  <line x1="-20" y1="0" x2="20" y2="0" stroke="#38bdf8" strokeWidth="4" />
                  <line x1="0" y1="-20" x2="0" y2="20" stroke="#38bdf8" strokeWidth="4" />
                  <circle cx="0" cy="0" r="8" fill="#38bdf8" />
                  <text x="-40" y="-32" fill="#e0f2fe" fontSize="9" fontWeight="bold">Solar Paddle Aerator</text>
                  <text x="-40" y="-22" fill="#bae6fd" fontSize="8">DO: 6.8 mg/L</text>
                </g>

                {/* Fish swimming graphics */}
                <text x="570" y="460" fill="#ffffff" fontSize="14">🐟</text>
                <text x="610" y="480" fill="#ffffff" fontSize="14">🐟</text>
                <text x="640" y="445" fill="#ffffff" fontSize="14">🐟</text>
                <text x="840" y="460" fill="#ffffff" fontSize="14">🐟</text>
                <text x="890" y="490" fill="#ffffff" fontSize="14">🐟</text>

                {/* Monks Sluice Gate / Silt Trap */}
                <rect x="910" y="420" width="35" height="35" rx="4" fill="#083344" stroke="#38bdf8" strokeWidth="1" />
                <text x="914" y="442" fill="#bae6fd" fontSize="8" fontWeight="bold">SLUICE</text>

                {/* Zone Label Badge */}
                <rect x="500" y="570" width="220" height="30" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="510" y="590" fill="#22d3ee" fontSize="12" fontWeight="bold">ZONE C: Fish Pond (22,000 sq ft)</text>
              </g>

              {/* ========================================================
                  ZONE D: FREE-RANGE POULTRY & HEN COOP (~12,000 SQ FT)
                  Bottom-Left (Sector A: x: 30, y: 350, w: 230, h: 260)
              ======================================================== */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleZoneClick(FARM_ZONES_CONFIG[3])}
                onMouseEnter={() => setHoveredZone('zone-d')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="30"
                  y="350"
                  width="220"
                  height="260"
                  rx="14"
                  fill="url(#grad-zone-d)"
                  stroke={isHenActive ? '#f43f5e' : '#e11d48'}
                  strokeWidth={isHenActive ? 5 : 2}
                  className="transition-all"
                  filter={isHenActive ? 'drop-shadow(0 0 12px rgba(244, 63, 94, 0.45))' : undefined}
                />

                {/* Deep Litter Coop Shed Building */}
                <rect x="45" y="370" width="190" height="95" rx="8" fill="#be123c" opacity="0.4" stroke="#fb7185" strokeWidth="1.5" />
                <text x="55" y="390" fill="#ffe4e6" fontSize="10" fontWeight="bold">DEEP-LITTER HEN COOP</text>
                <text x="55" y="405" fill="#fecdd3" fontSize="8">Rice Husk Bedding • Dark Laying Tier</text>

                {/* Multi-Tier Laying Boxes */}
                <rect x="55" y="415" width="80" height="35" rx="3" fill="#9f1239" stroke="#f43f5e" strokeWidth="1" />
                <text x="60" y="430" fill="#ffffff" fontSize="8" fontWeight="bold">Laying Boxes</text>
                <text x="60" y="442" fill="#ffe4e6" fontSize="7">112 Eggs/Day</text>

                {/* Nipple Drinkers */}
                <rect x="145" y="415" width="80" height="35" rx="3" fill="#9f1239" stroke="#f43f5e" strokeWidth="1" />
                <text x="150" y="430" fill="#ffffff" fontSize="8" fontWeight="bold">Automatic Water</text>
                <text x="150" y="442" fill="#ffe4e6" fontSize="7">Nipple Lines</text>

                {/* Outdoor Netting Scratch Run */}
                <rect x="45" y="475" width="190" height="85" rx="6" fill="#881337" opacity="0.3" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
                <text x="55" y="495" fill="#fecdd3" fontSize="9" fontWeight="bold">SUN PASTURE RUN</text>
                
                {/* Hens Representations */}
                <circle cx="80" cy="525" r="10" fill="#e11d48" stroke="#fb7185" strokeWidth="1.5" />
                <text x="75" y="529" fill="#ffffff" fontSize="10">🐔</text>
                <circle cx="120" cy="535" r="10" fill="#e11d48" stroke="#fb7185" strokeWidth="1.5" />
                <text x="115" y="539" fill="#ffffff" fontSize="10">🐔</text>
                <circle cx="160" cy="515" r="10" fill="#e11d48" stroke="#fb7185" strokeWidth="1.5" />
                <text x="155" y="519" fill="#ffffff" fontSize="10">🐔</text>

                {/* Zone Label Badge */}
                <rect x="45" y="570" width="190" height="30" rx="6" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="53" y="590" fill="#fb7185" fontSize="11" fontWeight="bold">ZONE D: Poultry (12,000 sq ft)</text>
              </g>

              {/* ========================================================
                  ZONE E: PIGGERY CONCRETE SHELTER (~12,000 SQ FT)
                  Bottom-Left (Sector B: x: 265, y: 350, w: 200, h: 260)
              ======================================================== */}
              <g
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleZoneClick(FARM_ZONES_CONFIG[4])}
                onMouseEnter={() => setHoveredZone('zone-e')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="265"
                  y="350"
                  width="200"
                  height="260"
                  rx="14"
                  fill="url(#grad-zone-e)"
                  stroke={isPigActive ? '#a855f7' : '#9333ea'}
                  strokeWidth={isPigActive ? 5 : 2}
                  className="transition-all"
                  filter={isPigActive ? 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.45))' : undefined}
                />

                {/* Concrete Sloped Floor Pens */}
                <rect x="280" y="370" width="170" height="95" rx="8" fill="#7e22ce" opacity="0.4" stroke="#c084fc" strokeWidth="1.5" />
                <text x="290" y="390" fill="#f3e8ff" fontSize="10" fontWeight="bold">PIGGERY CONCRETE PEN</text>
                <text x="290" y="405" fill="#e9d5ff" fontSize="8">1:25 Slope Flume Drainage</text>

                {/* Biogas Sluice Canal Connection */}
                <line x1="290" y1="420" x2="435" y2="420" stroke="#d8b4fe" strokeWidth="3" strokeDasharray="4 2" />
                <text x="290" y="435" fill="#c084fc" fontSize="8">Drain Sluice → Biogas Digester</text>

                {/* Shaded Cooling Wallowing Pool */}
                <rect x="280" y="475" width="170" height="85" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
                <text x="290" y="495" fill="#f3e8ff" fontSize="9" fontWeight="bold">SHADED WALLOW POOL</text>
                
                {/* Pigs Representations */}
                <circle cx="320" cy="525" r="11" fill="#7e22ce" stroke="#c084fc" strokeWidth="1.5" />
                <text x="314" y="530" fill="#ffffff" fontSize="11">🐖</text>
                <circle cx="380" cy="530" r="11" fill="#7e22ce" stroke="#c084fc" strokeWidth="1.5" />
                <text x="374" y="535" fill="#ffffff" fontSize="11">🐖</text>

                {/* Zone Label Badge */}
                <rect x="280" y="570" width="170" height="30" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <text x="288" y="590" fill="#c084fc" fontSize="11" fontWeight="bold">ZONE E: Piggery (12,000 sq ft)</text>
              </g>

              {/* Central Biogas Digester & Solar Hub Node */}
              <g transform="translate(500, 315)">
                <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="3" />
                <text x="-9" y="5" fill="#22c55e" fontSize="14">⚡</text>
              </g>
            </svg>
          </div>

          {/* Quick Zone Legend Strip */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-semibold">2-Acre Master Zones:</span>
            <div className="flex flex-wrap gap-2">
              {FARM_ZONES_CONFIG.map((zone) => {
                const isSelected = selectedSpecies === zone.species;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleZoneClick(zone)}
                    className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition flex items-center space-x-1.5 ${
                      isSelected
                        ? `${zone.color.bg} ${zone.color.border} ${zone.color.text} shadow-md`
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color.fill }}></span>
                    <span>Zone {zone.zoneLetter}: {zone.species.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Zone Inspection Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 bg-slate-900/95 rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-5">
          {/* Top Zone Card Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full border uppercase tracking-wider ${activeZone.color.bg} ${activeZone.color.border} ${activeZone.color.text}`}
              >
                Zone {activeZone.zoneLetter} Blueprint Details
              </span>

              {/* 🔊 Audio Readout Button */}
              <button
                onClick={() => handleAudioReadout(activeZone)}
                className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 ${
                  isSpeaking && currentText.includes(activeZone.name)
                    ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-lg shadow-emerald-500/40'
                    : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white border-slate-700'
                }`}
                title="Tap to hear zone details read out in clear speech"
                aria-label={`Listen to ${activeZone.name} details`}
              >
                {isSpeaking && currentText.includes(activeZone.name) ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span className="text-xs font-bold">Mute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400 group-hover:text-white" />
                    <span className="text-xs font-bold">🔊 Audio Readout</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-xl font-black text-white">{activeZone.name}</h3>
            <p className="text-sm font-semibold text-emerald-400 mt-0.5">{activeZone.hindiName}</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeZone.summary}</p>

            {/* Area & Blueprint Metric Pills */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Zone Area</span>
                <span className="text-lg font-black text-white">
                  {activeZone.areaSqFt.toLocaleString()}{' '}
                  <span className="text-xs text-slate-400 font-normal">sq ft</span>
                </span>
                <span className="text-[11px] text-emerald-400 block mt-0.5 font-medium">
                  {activeZone.areaPercentage}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Orientation</span>
                <span className="text-sm font-bold text-slate-200 mt-1 block">
                  {activeZone.gridCoords}
                </span>
                <span className="text-[10px] text-slate-500 block">Optimized ventilation</span>
              </div>
            </div>

            {/* Key Infrastructure Checklist */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Key Architectural Installations:
              </span>
              <div className="space-y-1.5">
                {activeZone.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jump to Species Module Action */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onSelectSpecies(activeZone.species);
                const el = document.getElementById('species-management-module');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center space-x-2 transition group"
            >
              <span>Manage {activeZone.species.toUpperCase()} Operations Hub</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Acre Land Allocation Progress Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
          <span className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-emerald-400" />
            <span>Full 2-Acre Master Land Apportionment (87,120 Sq. Ft.)</span>
          </span>
          <span className="text-emerald-400 font-bold">100% Utilized (Zero Idle Space)</span>
        </div>
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
          <div
            style={{ width: '28.7%' }}
            className="bg-emerald-500 hover:opacity-90 transition cursor-pointer"
            title="Zone A: Cattle Dairy (25,000 sq ft - 28.7%)"
            onClick={() => onSelectSpecies('cow')}
          />
          <div
            style={{ width: '18.4%' }}
            className="bg-amber-500 hover:opacity-90 transition cursor-pointer"
            title="Zone B: Goat House (16,000 sq ft - 18.4%)"
            onClick={() => onSelectSpecies('goat')}
          />
          <div
            style={{ width: '25.3%' }}
            className="bg-cyan-500 hover:opacity-90 transition cursor-pointer"
            title="Zone C: Aquaculture Pond (22,000 sq ft - 25.3%)"
            onClick={() => onSelectSpecies('fish')}
          />
          <div
            style={{ width: '13.8%' }}
            className="bg-rose-500 hover:opacity-90 transition cursor-pointer"
            title="Zone D: Poultry Deep Litter (12,000 sq ft - 13.8%)"
            onClick={() => onSelectSpecies('hen')}
          />
          <div
            style={{ width: '13.8%' }}
            className="bg-purple-500 hover:opacity-90 transition cursor-pointer"
            title="Zone E: Piggery Shelter (12,000 sq ft - 13.8%)"
            onClick={() => onSelectSpecies('pig')}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            A: Cow (28.7%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            B: Goat (18.4%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
            C: Fish (25.3%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            D: Poultry (13.8%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
            E: Piggery (13.8%)
          </span>
        </div>
      </div>
    </section>
  );
};
