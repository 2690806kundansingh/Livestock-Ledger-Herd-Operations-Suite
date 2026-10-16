// File: frontend/src/pages/MarketplacePage.tsx

import React, { useState } from 'react';
import { SHOWCASE_ITEMS, CATEGORIES_DATA } from '../data/landingData';
import { Store, PlusCircle, PhoneCall, Search } from 'lucide-react';

interface MarketplacePageProps {
  onOpenBuySell: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onOpenBuySell }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = SHOWCASE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Certified Livestock Marketplace
            </h1>
            <p className="text-xs text-slate-400">
              Direct farmer-to-farmer trading for ear-tagged cattle, buffalo, goats, and poultry with verified health scorecards.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenBuySell}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/60 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post New Listing</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories ({SHOWCASE_ITEMS.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.name} ({cat.count.toLocaleString()})
            </button>
          ))}
        </div>

        <div className="relative shrink-0">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search breed, tag, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl hover:border-slate-700 transition flex flex-col group"
          >
            {/* Photo Header */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                {item.healthStatus} • Score {item.healthScore}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-slate-300">
                {item.tagNumber}
              </span>
              <div className="absolute bottom-2.5 left-3 text-xs font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded">
                {item.yieldMetric}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{item.breed}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Verified Price</span>
                  <span className="text-lg font-black text-white">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>

                <a
                  href={`tel:${item.sellerPhone}`}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Call Seller</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
