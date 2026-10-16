// File: frontend/src/pages/ProductionLedgerPage.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../utils/speechVoice';
import {
  Layers,
  PlusCircle,
  TrendingUp,
  Volume2,
  VolumeX,
  Printer,
  X,
  Check,
} from 'lucide-react';

interface MilkEntry {
  id: string;
  date: string;
  session: 'Morning' | 'Evening';
  species: 'Cow' | 'Goat';
  liters: number;
  fatPercent: number;
  snfPercent: number;
  calculatedRatePerLiter: number;
  totalEarnings: number;
  buyerName: string;
}

interface EggEntry {
  id: string;
  date: string;
  species: 'Country Poultry (Desi)';
  goodEggs: number;
  crackedEggs: number;
  totalTrays: number; // 30 eggs/tray
  ratePerEgg: number;
  totalEarnings: number;
}

interface FishSampleEntry {
  id: string;
  date: string;
  sampleCount: number;
  averageWeightGrams: number;
  estimatedTotalBiomassKg: number;
  fcrRatio: number;
  waterTempC: number;
}

export const ProductionLedgerPage: React.FC = () => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  // Active Tab: 'milk' | 'eggs' | 'fish'
  const [activeTab, setActiveTab] = useState<'milk' | 'eggs' | 'fish'>('milk');

  // Initial Mock Milk Records
  const [milkEntries, setMilkEntries] = useState<MilkEntry[]>([
    {
      id: 'm-1',
      date: '2026-10-16',
      session: 'Morning',
      species: 'Cow',
      liters: 142.5,
      fatPercent: 4.2,
      snfPercent: 8.6,
      calculatedRatePerLiter: 48.5,
      totalEarnings: 6911.25,
      buyerName: 'Mother Dairy Bulk Center',
    },
    {
      id: 'm-2',
      date: '2026-10-16',
      session: 'Evening',
      species: 'Cow',
      liters: 118.0,
      fatPercent: 4.4,
      snfPercent: 8.7,
      calculatedRatePerLiter: 50.2,
      totalEarnings: 5923.6,
      buyerName: 'Mother Dairy Bulk Center',
    },
    {
      id: 'm-3',
      date: '2026-10-15',
      session: 'Morning',
      species: 'Cow',
      liters: 140.0,
      fatPercent: 4.1,
      snfPercent: 8.5,
      calculatedRatePerLiter: 47.8,
      totalEarnings: 6692.0,
      buyerName: 'Local Sweet Vendor Union',
    },
    {
      id: 'm-4',
      date: '2026-10-15',
      session: 'Evening',
      species: 'Cow',
      liters: 115.5,
      fatPercent: 4.3,
      snfPercent: 8.6,
      calculatedRatePerLiter: 49.3,
      totalEarnings: 5694.15,
      buyerName: 'Local Sweet Vendor Union',
    },
    {
      id: 'm-5',
      date: '2026-10-16',
      session: 'Morning',
      species: 'Goat',
      liters: 22.0,
      fatPercent: 4.8,
      snfPercent: 9.1,
      calculatedRatePerLiter: 85.0,
      totalEarnings: 1870.0,
      buyerName: 'Direct A2 Goat Milk Retail',
    },
  ]);

  // Initial Mock Egg Records
  const [eggEntries] = useState<EggEntry[]>([
    {
      id: 'e-1',
      date: '2026-10-16',
      species: 'Country Poultry (Desi)',
      goodEggs: 215,
      crackedEggs: 4,
      totalTrays: 7,
      ratePerEgg: 14.0,
      totalEarnings: 3010.0,
    },
    {
      id: 'e-2',
      date: '2026-10-15',
      species: 'Country Poultry (Desi)',
      goodEggs: 208,
      crackedEggs: 6,
      totalTrays: 7,
      ratePerEgg: 14.0,
      totalEarnings: 2912.0,
    },
    {
      id: 'e-3',
      date: '2026-10-14',
      species: 'Country Poultry (Desi)',
      goodEggs: 220,
      crackedEggs: 3,
      totalTrays: 7,
      ratePerEgg: 14.0,
      totalEarnings: 3080.0,
    },
  ]);

  // Initial Mock Fish Sampling Records
  const [fishEntries] = useState<FishSampleEntry[]>([
    {
      id: 'f-1',
      date: '2026-10-10',
      sampleCount: 50,
      averageWeightGrams: 820,
      estimatedTotalBiomassKg: 2214,
      fcrRatio: 1.35,
      waterTempC: 28.5,
    },
    {
      id: 'f-2',
      date: '2026-09-10',
      sampleCount: 45,
      averageWeightGrams: 580,
      estimatedTotalBiomassKg: 1566,
      fcrRatio: 1.32,
      waterTempC: 30.0,
    },
    {
      id: 'f-3',
      date: '2026-08-10',
      sampleCount: 40,
      averageWeightGrams: 360,
      estimatedTotalBiomassKg: 972,
      fcrRatio: 1.28,
      waterTempC: 31.2,
    },
  ]);

  // Modal State for New Milk Entry
  const [isMilkModalOpen, setIsMilkModalOpen] = useState<boolean>(false);
  const [newSession, setNewSession] = useState<'Morning' | 'Evening'>('Morning');
  const [newSpecies, setNewSpecies] = useState<'Cow' | 'Goat'>('Cow');
  const [newLiters, setNewLiters] = useState<number>(125.0);
  const [newFat, setNewFat] = useState<number>(4.2);
  const [newSnf, setNewSnf] = useState<number>(8.6);
  const [newBuyer, setNewBuyer] = useState<string>('Mother Dairy Bulk Center');

  // Rate Formula: Rate = (Fat * 6.8) + (SNF * 4.2)
  const calculateRate = (fat: number, snf: number) => {
    return Math.round((fat * 6.8 + snf * 4.2) * 10) / 10;
  };

  const handleAddMilkRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = calculateRate(newFat, newSnf);
    const total = Math.round(newLiters * rate * 100) / 100;
    const newEntry: MilkEntry = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      session: newSession,
      species: newSpecies,
      liters: newLiters,
      fatPercent: newFat,
      snfPercent: newSnf,
      calculatedRatePerLiter: rate,
      totalEarnings: total,
      buyerName: newBuyer,
    };
    setMilkEntries([newEntry, ...milkEntries]);
    setIsMilkModalOpen(false);
  };

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  // Stats Calculations
  const totalMilkToday = milkEntries
    .filter((m) => m.date === '2026-10-16' && m.species === 'Cow')
    .reduce((acc, curr) => acc + curr.liters, 0);

  const totalEarningsToday = milkEntries
    .filter((m) => m.date === '2026-10-16')
    .reduce((acc, curr) => acc + curr.totalEarnings, 0);

  const avgFat =
    Math.round(
      (milkEntries.reduce((acc, curr) => acc + curr.fatPercent, 0) / (milkEntries.length || 1)) * 10
    ) / 10;

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn text-slate-100">
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>Commercial Harvest & Revenue Ledger</span>
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Fat & SNF Auto-Billing
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Daily Production & Billing Ledger
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Track daily milk collections (Morning & Evening sessions), compute real-time payouts using dairy cooperative Fat/SNF rate charts, monitor country egg crate yields, and record pond fish harvest weight sampling.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsMilkModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Record Morning / Evening Milk Collection</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Printer className="h-4 w-4 text-cyan-400" />
              <span>Print Daily Settlement Slips</span>
            </button>

            <button
              onClick={() =>
                handleSpeech(
                  `Today's dairy harvest is ${totalMilkToday} Liters yielding ₹${Math.round(
                    totalEarningsToday
                  )} in gross revenue. Average milk fat is ${avgFat} percent.`
                )
              }
              className="px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition flex items-center gap-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
              <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen Production Summary'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 4-METRICS STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            Today's Milk Collection
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            {totalMilkToday} L
          </span>
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Morning & Evening combined</span>
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            Today's Gross Milk Payout
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            ₹{Math.round(totalEarningsToday).toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 block font-mono">
            Direct bank transfer / cash
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            Average Herd Fat %
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
            {avgFat}%
          </span>
          <span className="text-xs text-amber-400/80 block">
            High quality A2 tier (+₹3/L bonus)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            Daily Desi Egg Count
          </span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
            215 Eggs
          </span>
          <span className="text-xs text-cyan-400/80 block">
            7 Crates @ ₹14/egg = ₹3,010
          </span>
        </div>
      </div>

      {/* 3. TABS: MILK vs EGGS vs FISH BIOMASS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        {[
          { id: 'milk', label: '🥛 Dairy Milk & Fat-SNF Ledger', count: `${milkEntries.length} Entries` },
          { id: 'eggs', label: '🥚 Poultry Egg Crates', count: `${eggEntries.length} Batches` },
          { id: 'fish', label: '🐟 Fish Net Sampling & Biomass', count: `${fishEntries.length} Samples` },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MILK LEDGER TABLE */}
      {activeTab === 'milk' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Morning & Evening Milk Collection Records</span>
              </h3>
              <p className="text-xs text-slate-400">
                Formula: Rate = (Fat × 6.8) + (SNF × 4.2). Auto-calculates earnings per collection.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMilkModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Entry</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Session</th>
                  <th className="p-3">Animal</th>
                  <th className="p-3 text-right">Volume (L)</th>
                  <th className="p-3 text-right">Fat %</th>
                  <th className="p-3 text-right">SNF %</th>
                  <th className="p-3 text-right">Rate (₹/L)</th>
                  <th className="p-3 text-right">Earnings</th>
                  <th className="p-3">Buyer / Dairy Union</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {milkEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-white">{entry.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          entry.session === 'Morning'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        }`}
                      >
                        {entry.session}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-200">{entry.species}</td>
                    <td className="p-3 text-right font-mono font-bold text-white">{entry.liters.toFixed(1)}</td>
                    <td className="p-3 text-right font-mono text-amber-400">{entry.fatPercent}%</td>
                    <td className="p-3 text-right font-mono text-cyan-400">{entry.snfPercent}%</td>
                    <td className="p-3 text-right font-mono text-slate-300">₹{entry.calculatedRatePerLiter}</td>
                    <td className="p-3 text-right font-mono font-black text-emerald-400 text-sm">
                      ₹{entry.totalEarnings.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-400">{entry.buyerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: EGG PRODUCTION TABLE */}
      {activeTab === 'eggs' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-lg font-black text-white">
              Daily Free-Range Brown Egg Harvest Log
            </h3>
            <p className="text-xs text-slate-400">
              Eggs categorized into marketable 30-egg trays and farm-gate direct retail sales.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Flock Type</th>
                  <th className="p-3 text-right">Good Eggs</th>
                  <th className="p-3 text-right">Cracked / Broken</th>
                  <th className="p-3 text-right">Full Trays (30 Eggs)</th>
                  <th className="p-3 text-right">Unit Rate (₹/Egg)</th>
                  <th className="p-3 text-right">Daily Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {eggEntries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-white">{e.date}</td>
                    <td className="p-3 font-medium text-slate-200">{e.species}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">{e.goodEggs}</td>
                    <td className="p-3 text-right font-mono text-rose-400">{e.crackedEggs}</td>
                    <td className="p-3 text-right font-mono font-bold text-cyan-300">{e.totalTrays} Trays</td>
                    <td className="p-3 text-right font-mono text-slate-300">₹{e.ratePerEgg}</td>
                    <td className="p-3 text-right font-mono font-black text-emerald-400 text-sm">
                      ₹{e.totalEarnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 3: FISH NET SAMPLING TABLE */}
      {activeTab === 'fish' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-lg font-black text-white">
              Freshwater Pond Cast-Net Growth Sampling
            </h3>
            <p className="text-xs text-slate-400">
              Monthly sampling tracks fingerling growth velocity, estimated pond biomass, and feed conversion efficiency (FCR).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="p-3">Sample Date</th>
                  <th className="p-3 text-right">Sample Sample Size</th>
                  <th className="p-3 text-right">Avg Weight (Grams)</th>
                  <th className="p-3 text-right">Projected Pond Biomass</th>
                  <th className="p-3 text-right">Feed FCR</th>
                  <th className="p-3 text-right">Water Temp (°C)</th>
                  <th className="p-3">Growth Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {fishEntries.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-white">{f.date}</td>
                    <td className="p-3 text-right font-mono text-slate-300">{f.sampleCount} Fish</td>
                    <td className="p-3 text-right font-mono font-black text-emerald-400">{f.averageWeightGrams} g</td>
                    <td className="p-3 text-right font-mono font-bold text-cyan-300">{f.estimatedTotalBiomassKg} kg</td>
                    <td className="p-3 text-right font-mono text-amber-300">{f.fcrRatio}:1</td>
                    <td className="p-3 text-right font-mono text-slate-300">{f.waterTempC}°C</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                        Target Ahead (+12%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODAL: ADD MILK COLLECTION RECORD */}
      {isMilkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsMilkModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Daily Harvest Entry
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Log Milk Collection Record
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter volume, fat, and SNF from your digital milk analyzer. Payout is automatically computed.
              </p>
            </div>

            <form onSubmit={handleAddMilkRecord} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Session</label>
                  <select
                    value={newSession}
                    onChange={(e) => setNewSession(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Morning">Morning (05:30 AM)</option>
                    <option value="Evening">Evening (05:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Animal Species</label>
                  <select
                    value={newSpecies}
                    onChange={(e) => setNewSpecies(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Cow">Cattle Cow</option>
                    <option value="Goat">Dairy Goat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Total Volume Collected (Liters)</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={newLiters}
                  onChange={(e) => setNewLiters(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-mono font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Fat % (e.g. 4.2)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newFat}
                    onChange={(e) => setNewFat(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 focus:outline-none focus:border-emerald-500 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">SNF % (e.g. 8.6)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newSnf}
                    onChange={(e) => setNewSnf(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 focus:outline-none focus:border-emerald-500 font-mono font-bold text-sm"
                  />
                </div>
              </div>

              {/* Live Price Preview */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Computed Rate</span>
                  <span className="text-sm font-bold text-white font-mono">₹{calculateRate(newFat, newSnf)} / L</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Estimated Collection Total</span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    ₹{Math.round(newLiters * calculateRate(newFat, newSnf)).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Buyer / Dairy Collection Center</label>
                <input
                  type="text"
                  value={newBuyer}
                  onChange={(e) => setNewBuyer(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center justify-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Save Milk Collection Entry</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
