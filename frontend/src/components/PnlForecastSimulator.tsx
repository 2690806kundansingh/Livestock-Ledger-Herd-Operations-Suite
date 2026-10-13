// File: frontend/src/components/PnlForecastSimulator.tsx

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sliders,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import { WaterfallForecast } from '../types';
import { api } from '../services/api';

export const PnlForecastSimulator: React.FC = () => {
  // Simulator input state
  const [herdSize, setHerdSize] = useState<number>(180);
  const [feedCostPerHead, setFeedCostPerHead] = useState<number>(140);
  const [mortalityRate, setMortalityRate] = useState<number>(4.5);
  const [targetSalePrice, setTargetSalePrice] = useState<number>(420);
  const [feedInflationRate, setFeedInflationRate] = useState<number>(3.0);
  const [vetCostPerHead, setVetCostPerHead] = useState<number>(35);

  const [forecast, setForecast] = useState<WaterfallForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Trigger simulation query to backend forecasting-pnl-service
  const runSimulation = async () => {
    setLoading(true);
    try {
      const result = await api.simulateForecast({
        startingHerdSize: herdSize,
        projectedMortalityRate: mortalityRate,
        feedCostPerHead,
        feedInflationRate,
        vetCostPerHead,
        targetSalePrice,
        simulationName: `Forecast-${herdSize}Head`,
      });
      setForecast(result);
    } catch (err) {
      console.error('Failed to run forecast simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce recalculation
    const timer = setTimeout(() => {
      runSimulation();
    }, 250);
    return () => clearTimeout(timer);
  }, [herdSize, feedCostPerHead, mortalityRate, targetSalePrice, feedInflationRate, vetCostPerHead]);

  // Transform waterfall items for Recharts display
  const chartData = forecast
    ? [
        {
          name: 'Gross Revenue',
          amount: forecast.grossRevenue,
          fill: '#10b981', // green
        },
        {
          name: 'Feed Expense',
          amount: -Math.abs(forecast.annualFeedExpense),
          fill: '#ef4444', // red
        },
        {
          name: 'Vet Care',
          amount: -Math.abs(forecast.veterinaryCare),
          fill: '#f97316', // orange
        },
        {
          name: 'Mortality Loss',
          amount: -Math.abs(forecast.mortalityDepreciation),
          fill: '#dc2626', // dark red
        },
        {
          name: 'Overhead',
          amount: -Math.abs(forecast.operationalOverhead),
          fill: '#e11d48', // rose
        },
        {
          name: 'Net Profit',
          amount: forecast.netProfit,
          fill: forecast.isProfitable ? '#059669' : '#b91c1c', // bold emerald or crimson
        },
      ]
    : [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Herd P&L Waterfall Financial Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Parametric stress-testing: Headcount × Feed Burn × Mortality Depreciation
            </p>
          </div>
        </div>

        {forecast && (
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${
              forecast.isProfitable
                ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                : 'bg-rose-950/60 border-rose-600/50 text-rose-300'
            }`}>
              {forecast.isProfitable ? (
                <>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Profitable Model ({forecast.profitMarginPercentage}%)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-rose-400" />
                  <span>Deficit Warning ({forecast.profitMarginPercentage}%)</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Dynamic Levers / Sliders */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Simulation Levers</span>
            {loading && <span className="text-emerald-400 animate-pulse text-[11px]">Computing...</span>}
          </h4>

          {/* Herd Size Slider */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Herd Starting Size</span>
              <span className="text-emerald-400 font-bold">{herdSize} Head</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={herdSize}
              onChange={(e) => setHerdSize(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>20</span>
              <span>250</span>
              <span>500</span>
            </div>
          </div>

          {/* Feed Cost per Head */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Annual Feed Cost / Head</span>
              <span className="text-emerald-400 font-bold">${feedCostPerHead}</span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              step="5"
              value={feedCostPerHead}
              onChange={(e) => setFeedCostPerHead(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>$50</span>
              <span>$225</span>
              <span>$400</span>
            </div>
          </div>

          {/* Projected Mortality Rate */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Projected Mortality Rate</span>
              <span className={`font-bold ${mortalityRate > 5 ? 'text-rose-400' : 'text-amber-400'}`}>
                {mortalityRate}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={mortalityRate}
              onChange={(e) => setMortalityRate(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>1.0%</span>
              <span>7.5%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Target Sale Price */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Market Target Sale Price</span>
              <span className="text-cyan-400 font-bold">${targetSalePrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              step="10"
              value={targetSalePrice}
              onChange={(e) => setTargetSalePrice(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>$150</span>
              <span>$375</span>
              <span>$600</span>
            </div>
          </div>

          {/* Fine-Tuning Multipliers */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">Feed Inflation</span>
              <div className="flex items-center space-x-1.5">
                <input
                  type="number"
                  step="0.5"
                  value={feedInflationRate}
                  onChange={(e) => setFeedInflationRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                />
                <span className="text-xs text-slate-500">%</span>
              </div>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">Vet Cost / Head</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-slate-500">$</span>
                <input
                  type="number"
                  step="1"
                  value={vetCostPerHead}
                  onChange={(e) => setVetCostPerHead(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Waterfall Chart and Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Top KPI Cards */}
          {forecast && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Gross Revenue</span>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  ${forecast.grossRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {forecast.survivingHeadcount} survivors @ ${targetSalePrice}
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Total OPEX</span>
                <div className="text-lg font-bold text-rose-400 mt-1">
                  ${forecast.totalExpenses.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Feed, Vet, Overhead & Losses
                </div>
              </div>

              <div className={`p-3 rounded-xl border ${
                forecast.isProfitable
                  ? 'bg-emerald-950/40 border-emerald-800/40'
                  : 'bg-rose-950/40 border-rose-800/40'
              }`}>
                <span className="text-[11px] text-slate-300 uppercase font-semibold">Projected Net P&L</span>
                <div className={`text-lg font-bold mt-1 flex items-center space-x-1 ${
                  forecast.isProfitable ? 'text-emerald-300' : 'text-rose-400'
                }`}>
                  {forecast.isProfitable ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>${forecast.netProfit.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Margin: {forecast.profitMarginPercentage}%
                </div>
              </div>
            </div>
          )}

          {/* Synchronized Recharts Bar Chart */}
          <div className="h-64 w-full bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(val: number) => [`$${Math.abs(val).toLocaleString()}`, 'Amount']}
                />
                <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
