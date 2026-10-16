// File: frontend/src/components/landing/LiveShowcaseFeed.tsx

import React, { useRef, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShieldCheck, 
  BadgeCheck, 
  MapPin, 
  Sparkles, 
  Play, 
  Eye, 
  Phone, 
  MessageCircle, 
  Check, 
  FileText,
  Activity,
  X
} from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/landingData';
import { LivestockCategory, LivestockShowcaseItem } from '../../types/landing';

interface LiveShowcaseFeedProps {
  selectedCategory: LivestockCategory | 'ALL';
  onSelectCategory: (category: LivestockCategory | 'ALL') => void;
}

export const LiveShowcaseFeed: React.FC<LiveShowcaseFeedProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [likesState, setLikesState] = useState<Record<string, { count: number; userLiked: boolean }>>(() => {
    const init: Record<string, { count: number; userLiked: boolean }> = {};
    SHOWCASE_ITEMS.forEach((item) => {
      init[item.id] = { count: item.likes, userLiked: false };
    });
    return init;
  });

  const [activeItemModal, setActiveItemModal] = useState<LivestockShowcaseItem | null>(null);

  const filterCategories: Array<LivestockCategory | 'ALL'> = ['ALL', 'Cattle', 'Buffalo', 'Goat', 'Poultry'];

  const filteredItems = selectedCategory === 'ALL'
    ? SHOWCASE_ITEMS
    : SHOWCASE_ITEMS.filter((item) => item.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikesState((prev: Record<string, { count: number; userLiked: boolean }>) => {
      const current = prev[id] || { count: 0, userLiked: false };
      const nextLiked = !current.userLiked;
      return {
        ...prev,
        [id]: {
          count: nextLiked ? current.count + 1 : current.count - 1,
          userLiked: nextLiked,
        },
      };
    });
  };

  const getHealthBadgeStyle = (status: LivestockShowcaseItem['healthStatus']) => {
    switch (status) {
      case 'TOP_PEDIGREE':
        return 'bg-purple-950/80 border-purple-500/50 text-purple-300';
      case 'CERTIFIED':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
      case 'VACCINATED':
        return 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300';
      case 'PREGNANT_VERIFIED':
        return 'bg-pink-950/80 border-pink-500/50 text-pink-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <section id="live-showcase" className="mb-14 scroll-mt-24">
      {/* Top Header & Filtering */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Real-Time Marketplace & Livestock Reels</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Live Animal Showcase & Feed
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Continuous stream of high-definition livestock reels, verified lactation metrics & vet health scores
          </p>
        </div>

        {/* Filter pills and Scroll buttons */}
        <div className="flex items-center space-x-3">
          {/* Category Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Breeds' : cat}
              </button>
            ))}
          </div>

          {/* Scroll Navigation */}
          <div className="hidden sm:flex items-center space-x-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll / Dynamic Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        {filteredItems.map((item) => {
          const liked = likesState[item.id]?.userLiked;
          const likeCount = likesState[item.id]?.count ?? item.likes;

          return (
            <div
              key={item.id}
              onClick={() => setActiveItemModal(item)}
              className="flex-none w-[320px] sm:w-[350px] snap-start rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 bg-slate-900/90 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Media Reel / Animated Preview */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Live Reel Badge with Pulse */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-[11px] font-bold text-white shadow-lg">
                  <Play className="h-3 w-3 fill-rose-500 text-rose-500 animate-pulse" />
                  <span>{item.reelBadge || 'LIVE REEL'}</span>
                </div>

                {/* Views Counter */}
                <div className="absolute top-3 right-12 px-2 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-medium text-slate-300 flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.reelViews.toLocaleString()}</span>
                </div>

                {/* Like Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, item.id)}
                  title={`${likeCount} farmers liked this`}
                  className="absolute top-3 right-3 px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-pink-400 transition flex items-center space-x-1"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                  <span className="text-[10px] font-bold">{likeCount}</span>
                </button>

                {/* Yield or Metric Pill */}
                {item.yieldMetric && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    <span>{item.yieldMetric}</span>
                  </div>
                )}

                {/* Health Score Circular Badge */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-950/85 border border-emerald-500/50 text-[11px] font-bold text-emerald-400">
                  <Activity className="h-3 w-3" />
                  <span>Score: {item.healthScore}%</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Category and Tag Number */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-400">{item.breed}</span>
                    <span className="font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                      {item.tagNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Location & Seller Info */}
                  <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                    <span>•</span>
                    <span className="truncate">{item.sellerName}</span>
                  </div>
                </div>

                {/* PRICE TAG BADGES & HEALTH STATUS INDICATORS */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  {/* Price Tag Badge */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-extrabold text-white tracking-tight">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {item.negotiable ? 'Fair Negotiable' : 'Fixed Breeder Price'}
                      </span>
                    </div>

                    {/* Health Status Indicator Badge */}
                    <div className={`px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 ${getHealthBadgeStyle(item.healthStatus)}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{item.healthStatus.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Quick specs pill row */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Age / Maturity</span>
                      <span className="font-semibold text-slate-200">{item.age}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Live Weight</span>
                      <span className="font-semibold text-slate-200">{item.weightKg} kg</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItemModal(item);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 transition flex items-center justify-center space-x-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Health Passport</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=Inquiry%20regarding%20${encodeURIComponent(item.title)}%20(Tag:%20${item.tagNumber})`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition"
                    title="Direct WhatsApp Inquiry"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>

                  <a
                    href={`tel:${item.sellerPhone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                    title="Call Seller"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ANIMAL REEL & DIGITAL HEALTH PASSPORT */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header Media */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
              <img
                src={activeItemModal.mediaUrl}
                alt={activeItemModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-950/60" />

              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-600 text-white inline-block mb-1">
                    {activeItemModal.category} • {activeItemModal.breed}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {activeItemModal.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">
                    ₹{activeItemModal.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Breeder Remarks & Telemetry Summary
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeItemModal.description}
                </p>
              </div>

              {/* Digital Health Passport Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="font-bold text-white text-sm">Digital Vet Health Passport</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Health Score: {activeItemModal.healthScore} / 100
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Attending Vet</span>
                    <span className="font-semibold text-slate-200">{activeItemModal.vetName}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Last Dewormed</span>
                    <span className="font-semibold text-slate-200">{activeItemModal.dewormedDate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Official Tag ID</span>
                    <span className="font-mono font-semibold text-emerald-400">{activeItemModal.tagNumber}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block mb-1.5 font-medium">Verified Immunizations:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeItemModal.vaccines.map((v: string, vIdx: number) => (
                      <span
                        key={vIdx}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs"
                      >
                        <Check className="h-3 w-3" />
                        <span>{v}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seller Contact & Direct Booking */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Verified Breeder / Farm</span>
                  <div className="flex items-center space-x-1.5 font-bold text-white text-base">
                    <span>{activeItemModal.sellerName}</span>
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">Rating: ★ {activeItemModal.sellerRating} • {activeItemModal.location}</span>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <a
                    href={`tel:${activeItemModal.sellerPhone}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition"
                  >
                    <Phone className="h-4 w-4 text-emerald-400" />
                    <span>Call Seller</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=Hello%20${encodeURIComponent(activeItemModal.sellerName)},%20I%20am%20interested%20in%20${encodeURIComponent(activeItemModal.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
