// File: frontend/src/pages/FeedInventoryPage.tsx

import React from 'react';
import { FeedInventoryWidget } from '../components/FeedInventoryWidget';
import { FeedStock } from '../types';
import { Package, RefreshCw, AlertTriangle } from 'lucide-react';

interface FeedInventoryPageProps {
  feedStocks: FeedStock[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const FeedInventoryPage: React.FC<FeedInventoryPageProps> = ({
  feedStocks,
  onRefresh,
  isRefreshing,
}) => {
  const lowCount = feedStocks.filter((f) => f.isLowStock).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Clean Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Feed Inventory & Runway Telemetry
            </h1>
            <p className="text-xs text-slate-400">
              Live stock levels, daily herd consumption rates, Kafka low stock warnings, and delivery logging.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {lowCount > 0 ? (
            <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-bold">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{lowCount} Low Stock Alert</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-bold">
              All Stocks Healthy
            </span>
          )}

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Refresh Feed Stocks"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Feed Inventory Widget */}
      <FeedInventoryWidget
        feedStocks={feedStocks}
        onRefresh={onRefresh}
      />
    </div>
  );
};
