// File: frontend/src/components/AnimalRegisterModal.tsx

import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface AnimalRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnimalRegistered: () => void;
}

export const AnimalRegisterModal: React.FC<AnimalRegisterModalProps> = ({
  isOpen,
  onClose,
  onAnimalRegistered,
}) => {
  const [tagNumber, setTagNumber] = useState<string>('TAG-' + Math.floor(1000 + Math.random() * 9000));
  const [species, setSpecies] = useState<string>('Black Angus');
  const [penLocation, setPenLocation] = useState<string>('Barn 1 - Pen A');
  const [weightKg, setWeightKg] = useState<number>(320.5);
  const [birthDate, setBirthDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [acquisitionCost, setAcquisitionCost] = useState<number>(180.0);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await api.registerAnimal({
        tagNumber,
        species,
        penLocation,
        weightKg: Number(weightKg),
        birthDate,
        acquisitionCost: Number(acquisitionCost),
      });

      setSuccessMsg(`Animal ${tagNumber} enrolled successfully!`);
      onAnimalRegistered();

      setTimeout(() => {
        setSuccessMsg(null);
        // generate next tag number
        setTagNumber('TAG-' + Math.floor(1000 + Math.random() * 9000));
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to register animal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Enroll Livestock</h3>
              <p className="text-xs text-slate-400">Adds animal to ledger & broadcasts headcount</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {errorMsg && (
            <div className="p-2.5 text-xs bg-rose-950/60 border border-rose-800/50 text-rose-300 rounded-lg">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-2.5 text-xs bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tag Number</label>
            <input
              type="text"
              value={tagNumber}
              onChange={(e) => setTagNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Species / Breed</label>
              <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pen Location</label>
              <input
                type="text"
                value={penLocation}
                onChange={(e) => setPenLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Acquisition Basis ($)</label>
              <input
                type="number"
                step="0.01"
                value={acquisitionCost}
                onChange={(e) => setAcquisitionCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Register Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
