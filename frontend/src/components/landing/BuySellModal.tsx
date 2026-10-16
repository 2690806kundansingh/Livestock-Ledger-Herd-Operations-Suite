// File: frontend/src/components/landing/BuySellModal.tsx

import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { LivestockCategory, LivestockShowcaseItem } from '../../types/landing';

interface BuySellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategoryFilter: (category: LivestockCategory) => void;
  onAddNewListing: (item: LivestockShowcaseItem) => void;
}

export const BuySellModal: React.FC<BuySellModalProps> = ({
  isOpen,
  onClose,
  onSelectCategoryFilter,
  onAddNewListing,
}) => {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sell form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<LivestockCategory>('Cattle');
  const [breed, setBreed] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [price, setPrice] = useState('');
  const [age, setAge] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [yieldMetric, setYieldMetric] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: LivestockShowcaseItem = {
      id: `SHOW-${Date.now().toString().slice(-4)}`,
      title: title || `${breed || 'Purebred'} ${category}`,
      category,
      breed: breed || `${category} Prime Line`,
      tagNumber: tagNumber || `IN-${category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      price: parseFloat(price) || 65000,
      originalPrice: (parseFloat(price) || 65000) * 1.08,
      negotiable: true,
      age: age || '3.0 Years',
      weightKg: parseFloat(weightKg) || 410,
      yieldMetric: yieldMetric || 'Certified Milk & Health Record',
      healthStatus: 'CERTIFIED',
      healthScore: 98,
      vaccines: ['FMD Bi-Annual', 'HS/BQ Shielded', 'Dewormed Verified'],
      dewormedDate: 'Recent (This Month)',
      vetCertified: true,
      vetName: 'Assigned Local Veterinary Officer',
      location: location || 'Direct Farm Gate',
      mediaUrl: category === 'Cattle' 
        ? 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=85'
        : category === 'Buffalo'
        ? 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=85'
        : category === 'Goat'
        ? 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=85'
        : 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=85',
      reelBadge: 'NEW LISTING',
      reelViews: 1,
      likes: 1,
      sellerName: sellerName || 'Registered Farm Owner',
      sellerRating: 5.0,
      sellerPhone: sellerPhone || '+91 98000 00000',
      isVerifiedSeller: true,
      description: `Newly verified ${category} listing on the livestock ledger. Health status checked and ready for immediate delivery.`,
    };

    onAddNewListing(newItem);
    setSuccessMessage('Listing successfully created and published to Live Showcase!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Buy & Sell Marketplace</h3>
              <p className="text-xs text-slate-400">Direct farm trading with verified pedigrees & zero brokerage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('BUY')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'BUY'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            I Want to Buy Livestock
          </button>
          <button
            onClick={() => setActiveTab('SELL')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'SELL'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            I Want to Sell / Post Listing
          </button>
        </div>

        {activeTab === 'BUY' ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Select a category to jump directly to verified listings in the Live Animal Showcase:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {(['Cattle', 'Buffalo', 'Goat', 'Poultry'] as LivestockCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategoryFilter(cat);
                    onClose();
                  }}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-left transition group"
                >
                  <span className="text-xs font-bold text-white group-hover:text-indigo-400 block mb-1">
                    {cat}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Explore available breeds & reels →
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-300 space-y-1">
              <span className="font-bold block flex items-center space-x-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Buyer Protection Guarantee</span>
              </span>
              <span>All animals listed have veterinary health certificates and documented milk/yield records.</span>
            </div>
          </div>
        ) : (
          <div>
            {successMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-white font-bold text-sm">{successMessage}</h4>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Species Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as LivestockCategory)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    >
                      <option value="Cattle">Cattle</option>
                      <option value="Buffalo">Buffalo</option>
                      <option value="Goat">Goat</option>
                      <option value="Poultry">Poultry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Breed Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pure Gir / Murrah"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Purebred Gir Cow • 2nd Calving Peak Lactation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="75000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Age / Maturity
                    </label>
                    <input
                      type="text"
                      placeholder="3.5 Yrs"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Live Weight (kg)
                    </label>
                    <input
                      type="number"
                      placeholder="420"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Milk Yield / Metric
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 18 L/day (4.5% Fat)"
                      value={yieldMetric}
                      onChange={(e) => setYieldMetric(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Official Ear Tag ID
                    </label>
                    <input
                      type="text"
                      placeholder="IN-GJ-4491"
                      value={tagNumber}
                      onChange={(e) => setTagNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Farm / Breeder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Dairy Farm"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Contact Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Farm Location / District
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand, Gujarat"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
                >
                  Publish Livestock Listing to Live Showcase
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
