// File: frontend/src/components/FeedInventoryWidget.tsx

import React, { useState } from 'react';
import { Package, AlertTriangle, Truck, Utensils, RefreshCw, CheckCircle2 } from 'lucide-react';
import { FeedStock } from '../types';
import { api } from '../services/api';

interface FeedInventoryWidgetProps {
  feedStocks: FeedStock[];
  onRefresh: () => void;
}

export const FeedInventoryWidget: React.FC<FeedInventoryWidgetProps> = ({
  feedStocks,
  onRefresh,
}) => {
  const [selectedStock, setSelectedStock] = useState<FeedStock | null>(null);
  const [modalMode, setModalMode] = useState<'DELIVERY' | 'CONSUMPTION' | null>(null);
  const [quantityInput, setQuantityInput] = useState<number>(100);
  const [penInput, setPenInput] = useState<string>('Enclosure 1');
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock) return;

    setLoading(true);
    setNotification(null);

    try {
      if (modalMode === 'DELIVERY') {
        await api.recordFeedDelivery({
          feedStockId: selectedStock.id,
          quantityKg: Number(quantityInput),
        });
        setNotification(`Recorded delivery of ${quantityInput} kg of ${selectedStock.feedName}!`);
      } else if (modalMode === 'CONSUMPTION') {
        await api.recordFeedConsumption({
          feedStockId: selectedStock.id,
          penLocation: penInput,
          quantityConsumedKg: Number(quantityInput),
        });
        setNotification(`Logged consumption of ${quantityInput} kg in ${penInput}!`);
      }
      onRefresh();
      setTimeout(() => {
        setModalMode(null);
        setNotification(null);
      }, 1200);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const getFeedImage = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('silage') || lower.includes('napier') || lower.includes('green')) {
      return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80';
    }
    if (lower.includes('straw') || lower.includes('hay') || lower.includes('chaff')) {
      return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80';
    }
    if (lower.includes('fish') || lower.includes('pellet') || lower.includes('fingerling')) {
      return 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80';
    }
    if (lower.includes('poultry') || lower.includes('grain') || lower.includes('mash')) {
      return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80';
    }
    return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Feed Inventory & Runway Telemetry
            </h3>
            <p className="text-xs text-slate-400">
              Live consumption burn rates & Kafka low stock triggers
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="Refresh Feed Stocks"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {feedStocks.map((stock) => (
          <div
            key={stock.id}
            className={`rounded-xl p-4 border transition overflow-hidden ${
              stock.isLowStock
                ? 'bg-rose-950/20 border-rose-800/40'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <img
                  src={getFeedImage(stock.feedName)}
                  alt={stock.feedName}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-700 shadow-sm shrink-0"
                />
                <div>
                  <span className="text-xs font-bold text-white block">{stock.feedName}</span>
                  <span className="text-[10px] text-slate-400">ID: #{stock.id}</span>
                </div>
              </div>

              {stock.isLowStock ? (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Reorder Alert</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  Stock Healthy
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">On Hand</span>
                <span className="text-base font-bold text-slate-200">
                  {stock.quantityKg.toLocaleString()} kg
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Est. Runway</span>
                <span className={`text-base font-bold ${stock.isLowStock ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {stock.estimatedRunwayDays} Days
                </span>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-800/80 pt-2">
              <span>Threshold: {stock.reorderThresholdKg} kg</span>
              <span>Cost: ${Number(stock.costPerKg).toFixed(2)}/kg</span>
            </div>

            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => {
                  setSelectedStock(stock);
                  setQuantityInput(250);
                  setModalMode('DELIVERY');
                }}
                className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Truck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Delivery</span>
              </button>

              <button
                onClick={() => {
                  setSelectedStock(stock);
                  setQuantityInput(45);
                  setModalMode('CONSUMPTION');
                }}
                className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Utensils className="h-3.5 w-3.5 text-amber-400" />
                <span>Log Feed</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Delivery / Consumption */}
      {modalMode && selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-white mb-1">
              {modalMode === 'DELIVERY' ? 'Record Feed Delivery' : 'Log Daily Pen Feeding'}
            </h4>
            <p className="text-xs text-slate-400 mb-4">{selectedStock.feedName}</p>

            {notification && (
              <div className="mb-3 p-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 rounded-lg text-xs flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{notification}</span>
              </div>
            )}

            <form onSubmit={handleAction} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={quantityInput}
                  onChange={(e) => setQuantityInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {modalMode === 'CONSUMPTION' && (
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Target Pen Location</label>
                  <input
                    type="text"
                    value={penInput}
                    onChange={(e) => setPenInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Pasture 1"
                    required
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Submit Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
