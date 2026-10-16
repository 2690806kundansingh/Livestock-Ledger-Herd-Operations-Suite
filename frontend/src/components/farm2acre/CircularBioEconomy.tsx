// File: frontend/src/components/farm2acre/CircularBioEconomy.tsx

import React from 'react';
import { useFarmVoice } from '../../utils/speechVoice';
import { Volume2, VolumeX, RefreshCw, Zap, Droplets, Sun } from 'lucide-react';

export const CircularBioEconomy: React.FC = () => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  const synergyStory =
    'The 2-Acre Mixed Farm operates on zero waste circular bio-economy. Cattle and pig dung flows into the twenty-five cubic meter biogas digester, supplying cooking gas and organic liquid slurry. The bio-slurry fertilizes the Super Napier grass on the fish pond bunds and the Moringa fodder trees. Napier grass and tree loppings feed the dairy cows and goats. Nutrient-rich pond water is used for micro-irrigation, achieving ninety percent lower fertilizer costs and double farm profit.';

  const handleAudio = () => {
    if (isSpeaking && currentText === synergyStory) {
      stop();
    } else {
      speak(synergyStory);
    }
  };

  const loops = [
    {
      title: 'Biogas & Clean Energy',
      icon: <Zap className="h-4 w-4 text-amber-400" />,
      desc: 'Dung from 14 cows and 18 pigs gravity-feeds into 25 m³ anaerobic digester. Yields 6 m³/day methane gas for farm needs.',
      badge: 'Zero LPG Cost',
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Organic Slurry to Fodder',
      icon: <Droplets className="h-4 w-4 text-emerald-400" />,
      desc: 'Digested bio-slurry is pumped to Super Napier grass bunds and Moringa perimeter trees, producing 400 kg daily green forage.',
      badge: 'Zero Chemical Urea',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Fish Pond Plankton Synergy',
      icon: <RefreshCw className="h-4 w-4 text-cyan-400" />,
      desc: 'Goat droppings in compost baskets trigger natural rotifer and cladocera blooms, slashing commercial fish pellet demand by 30%.',
      badge: '30% Feed Savings',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Poultry Deep-Litter Gold',
      icon: <Sun className="h-4 w-4 text-rose-400" />,
      desc: 'Hen coop rice-husk bedding matures after 6 months into high-potassium organic fertilizer applied to vegetable beds.',
      badge: 'High Organic Nitrogen',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="w-full py-8 space-y-6">
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <RefreshCw className="h-4 w-4 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Closed-Loop Resource Synergy Blueprint</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>2-Acre Zero-Waste Bio-Resource Cycle</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              How Zone A, B, C, D, and E recycle nutrients, energy, and water so that one enterprise’s waste becomes another’s vital feed input.
            </p>
          </div>

          <button
            onClick={handleAudio}
            className={`py-3 px-5 rounded-2xl border font-bold text-xs sm:text-sm transition flex items-center space-x-2 shrink-0 ${
              isSpeaking && currentText === synergyStory
                ? 'bg-emerald-500 text-white animate-pulse border-emerald-400 shadow-lg shadow-emerald-500/40'
                : 'bg-slate-800 hover:bg-emerald-600 text-slate-200 border-slate-700'
            }`}
            title="Hear Circular Economy story"
          >
            {isSpeaking && currentText === synergyStory ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400" />
                <span>🔊 Hear Bio-Loop Synergy</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Synergy Pillar Cards with Rich Visual Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {loops.map((l, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden hover:border-slate-700 transition flex flex-col group shadow-lg"
            >
              {/* Image Banner */}
              <div className="relative h-28 w-full overflow-hidden border-b border-slate-800">
                <img
                  src={l.image}
                  alt={l.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80">
                  {l.icon}
                </div>
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/40">
                  {l.badge}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {l.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{l.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlights */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-xl font-black text-emerald-400">92%</span>
            <span className="text-xs text-slate-300 block font-medium">Recycled Organic Nutrients</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-xl font-black text-cyan-400">₹45,000 / mo</span>
            <span className="text-xs text-slate-300 block font-medium">Saved in Commercial Fertilizer & LPG</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <span className="text-xl font-black text-amber-400">Zero Runoff</span>
            <span className="text-xs text-slate-300 block font-medium">Groundwater & Soil Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
