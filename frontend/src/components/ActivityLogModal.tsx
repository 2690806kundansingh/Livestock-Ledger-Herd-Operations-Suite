// File: frontend/src/components/ActivityLogModal.tsx

import React, { useState } from 'react';
import { X, AlertTriangle, ArrowRightLeft, Stethoscope, DollarSign, Baby, CheckCircle2 } from 'lucide-react';
import { Animal, LifeEventType } from '../types';
import { api } from '../services/api';

interface ActivityLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  animals: Animal[];
  selectedAnimal?: Animal | null;
  onEventLogged: () => void;
}

export const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  isOpen,
  onClose,
  animals,
  selectedAnimal,
  onEventLogged,
}) => {
  const [animalId, setAnimalId] = useState<number>(selectedAnimal ? selectedAnimal.id : (animals[0]?.id || 0));
  const [eventType, setEventType] = useState<LifeEventType>('MORTALITY');
  const [recordedBy, setRecordedBy] = useState<string>('Officer J. Martinez');
  const [details, setDetails] = useState<string>('');

  // Contextual attributes
  const [causeOfDeath, setCauseOfDeath] = useState<string>('Acute Bovine Respiratory Disease (BRD)');
  const [newPenLocation, setNewPenLocation] = useState<string>('Quarantine Pen Q-1');
  const [treatmentNotes, setTreatmentNotes] = useState<string>('Administered 15ml Florfenicol subcutaneous injection');
  const [salePrice, setSalePrice] = useState<number>(385.0);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSelectedAnimal = animals.find((a) => a.id === animalId) || selectedAnimal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalId) {
      setErrorMsg('Please select an animal.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await api.recordLifeEvent({
        animalId: Number(animalId),
        eventType,
        recordedBy,
        details: details || `Recorded ${eventType} event`,
        causeOfDeath: eventType === 'MORTALITY' ? causeOfDeath : undefined,
        newPenLocation: eventType === 'TRANSFER' ? newPenLocation : undefined,
        treatmentNotes: eventType === 'TREATMENT' ? treatmentNotes : undefined,
        salePrice: eventType === 'SALE' ? Number(salePrice) : undefined,
      });

      setSuccessMsg(`Successfully logged ${eventType} event for tag ${currentSelectedAnimal?.tagNumber || animalId}!`);
      onEventLogged();

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while logging event');
    } finally {
      setLoading(false);
    }
  };

  const eventTypes: { type: LifeEventType; label: string; icon: any; color: string }[] = [
    { type: 'MORTALITY', label: 'Mortality', icon: AlertTriangle, color: 'hover:border-rose-500 text-rose-400' },
    { type: 'TRANSFER', label: 'Pen Transfer', icon: ArrowRightLeft, color: 'hover:border-amber-500 text-amber-400' },
    { type: 'TREATMENT', label: 'Treatment', icon: Stethoscope, color: 'hover:border-blue-500 text-blue-400' },
    { type: 'SALE', label: 'Market Sale', icon: DollarSign, color: 'hover:border-emerald-500 text-emerald-400' },
    { type: 'BIRTH', label: 'Birth Registry', icon: Baby, color: 'hover:border-cyan-500 text-cyan-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Log Herd Life Event</h3>
              <p className="text-xs text-slate-400">Publishes telemetry to Kafka and STOMP broadcaster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs bg-rose-950/60 border border-rose-800/50 text-rose-300 rounded-lg">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 text-xs bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Animal Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Select Animal (Tag Number)
            </label>
            <select
              value={animalId}
              onChange={(e) => setAnimalId(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tagNumber} - {a.species} ({a.status}) [{a.penLocation}]
                </option>
              ))}
            </select>
          </div>

          {/* Event Type Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Event Classification
            </label>
            <div className="grid grid-cols-3 gap-2">
              {eventTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = eventType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setEventType(item.type)}
                    className={`flex items-center space-x-2 p-2.5 rounded-lg border text-xs font-medium transition ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Event-Specific Fields */}
          {eventType === 'MORTALITY' && (
            <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
                <span>Mortality Telemetry</span>
                <span className="text-[11px] text-rose-400/80">Threshold alert trigger</span>
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Primary Cause of Death</label>
                <input
                  type="text"
                  value={causeOfDeath}
                  onChange={(e) => setCauseOfDeath(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  placeholder="e.g. Acute Bovine Respiratory Disease"
                  required
                />
              </div>
            </div>
          )}

          {eventType === 'TRANSFER' && (
            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3.5 space-y-3">
              <span className="text-xs text-amber-300 font-semibold">Relocation Details</span>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Destination Enclosure / Pen</label>
                <input
                  type="text"
                  value={newPenLocation}
                  onChange={(e) => setNewPenLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Pasture 4 - North Enclosure"
                  required
                />
              </div>
            </div>
          )}

          {eventType === 'TREATMENT' && (
            <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-3.5 space-y-3">
              <span className="text-xs text-blue-300 font-semibold">Veterinary Protocol</span>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Dosage & Notes</label>
                <input
                  type="text"
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. 15ml Florfenicol subcutaneous injection"
                  required
                />
              </div>
            </div>
          )}

          {eventType === 'SALE' && (
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3.5 space-y-3">
              <span className="text-xs text-emerald-300 font-semibold">Market Liquidation</span>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Realized Sale Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Details / Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Incident Notes & Diagnostics
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Additional veterinary observations or logistical records..."
            />
          </div>

          {/* Recorded By */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Operating Officer Signature
            </label>
            <input
              type="text"
              value={recordedBy}
              onChange={(e) => setRecordedBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Dispatched to Kafka...' : 'Commit Event & Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
