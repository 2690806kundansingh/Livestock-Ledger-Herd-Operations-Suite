// File: frontend/src/components/AnimalDataGrid.tsx

import React, { useState } from 'react';
import { Search, ClipboardList, MapPin, Scale, Calendar, Tag } from 'lucide-react';
import { Animal, AnimalStatus } from '../types';

interface AnimalDataGridProps {
  animals: Animal[];
  loading: boolean;
  onSelectAnimalForEvent: (animal: Animal) => void;
}

export const AnimalDataGrid: React.FC<AnimalDataGridProps> = ({
  animals,
  loading,
  onSelectAnimalForEvent,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.penLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' || animal.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AnimalStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active</span>;
      case 'QUARANTINE':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">Quarantine</span>;
      case 'SOLD':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">Sold</span>;
      case 'DECEASED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">Deceased</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">{status}</span>;
    }
  };

  const statusFilters = ['ALL', 'ACTIVE', 'QUARANTINE', 'SOLD', 'DECEASED'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-6">
      {/* Top Filter Bar */}
      <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Livestock Herd Master Registry</h3>
          <p className="text-xs text-slate-400">Database synchronization with livestock_db @ localhost:5432</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search Tag, Pen, Species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-56"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {statusFilters.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Tag Number</th>
              <th className="py-3 px-4">Species</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Pen Location</th>
              <th className="py-3 px-4">Weight (kg)</th>
              <th className="py-3 px-4">Birth Date</th>
              <th className="py-3 px-4">Acquisition ($)</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  Loading herd records from gateway...
                </td>
              </tr>
            ) : filteredAnimals.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No livestock records matching current filters.
                </td>
              </tr>
            ) : (
              filteredAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-3.5 w-3.5 text-slate-500" />
                      <span>{animal.tagNumber}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {animal.species}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(animal.status)}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      <span>{animal.penLocation}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    <div className="flex items-center space-x-1">
                      <Scale className="h-3.5 w-3.5 text-slate-500" />
                      <span>{animal.weightKg} kg</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span>{animal.birthDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-semibold">
                    ${Number(animal.acquisitionCost).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectAnimalForEvent(animal)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition"
                    >
                      <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Log Event</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
