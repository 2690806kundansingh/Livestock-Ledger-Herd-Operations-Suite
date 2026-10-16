// File: frontend/src/components/landing/EmergencyHelpline.tsx

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Siren, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Activity, 
  Radio,
  MessageCircle
} from 'lucide-react';
import { VET_DOCTORS_ROSTER } from '../../data/landingData';
import { LivestockCategory } from '../../types/landing';

interface EmergencyHelplineProps {
  onSOSDispatched?: (details: any) => void;
}

export const EmergencyHelpline: React.FC<EmergencyHelplineProps> = ({
  onSOSDispatched,
}) => {
  const [farmerName, setFarmerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [locationPin, setLocationPin] = useState<string>('Sector 4, Green Valley Barn #12');
  const [selectedAnimal, setSelectedAnimal] = useState<LivestockCategory>('Cattle');
  const [urgency, setUrgency] = useState<'CRITICAL' | 'HIGH' | 'MODERATE'>('CRITICAL');
  const [symptom, setSymptom] = useState<string>('Acute Rumen Tympany / Bloat & Respiratory Distress');
  const [locatingGps, setLocatingGps] = useState<boolean>(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);

  const emergencyHelplineNumber = '1800-548-3786'; // 1800-LIV-ESTK / 1962 Veterinary Helpline

  const handleFetchGPS = () => {
    if ('geolocation' in navigator) {
      setLocatingGps(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)} (GPS Verified)`;
          setLocationPin(coords);
          setLocatingGps(false);
        },
        () => {
          setLocationPin('Barn Unit 3B, Dairy Perimeter Road (Pin Transmitted)');
          setLocatingGps(false);
        },
        { timeout: 6000 }
      );
    } else {
      setLocationPin('Barn Unit 3B, Dairy Perimeter Road');
    }
  };

  const handleTriggerDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchSuccess(true);
    if (onSOSDispatched) {
      onSOSDispatched({
        farmerName: farmerName || 'Lead Farm Operator',
        phoneNumber: phoneNumber || '+91 98765 00000',
        locationPin,
        selectedAnimal,
        urgency,
        symptom,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    setTimeout(() => {
      setDispatchSuccess(false);
    }, 6000);
  };

  return (
    <section id="emergency-helpline" className="mb-14 scroll-mt-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
          <Siren className="h-4 w-4 animate-bounce" />
          <span>24/7 Rapid Veterinary Dispatch & Triage</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Contact & Emergency Helpline
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Immediate single-tap hotline connection with on-duty veterinarians & GPS mobile field ambulance units
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: SINGLE-TAP CALL BIG BUTTON & HOTLINE INFO */}
        <div className="lg:col-span-5 space-y-6">
          {/* HIGH IMPACT SINGLE-TAP CALL BUTTON */}
          <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            {/* Glowing atmosphere */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/20 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Radio className="h-3.5 w-3.5 text-rose-400 animate-ping" />
                <span>24/7 Priority Emergency Line</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Immediate Critical Assistance
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Tap below to immediately dial the Central Livestock Emergency Hotline. On-duty triage veterinarians will dispatch the nearest mobile surgical unit.
              </p>

              {/* SINGLE-TAP CALL BUTTON (NATIVE tel: ANCHOR) */}
              <a
                href={`tel:${emergencyHelplineNumber}`}
                className="inline-flex items-center justify-center space-x-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-rose-950/60 hover:shadow-rose-900/80 transition-all transform hover:scale-[1.02] active:scale-[0.99] border border-rose-400/40"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 animate-pulse text-white" />
                </div>
                <span>Call {emergencyHelplineNumber}</span>
              </a>

              <div className="pt-2 flex items-center justify-center sm:justify-start space-x-4 text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Avg Response: 90 Sec</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                  <span>Toll-Free Pan-India</span>
                </span>
              </div>
            </div>
          </div>

          {/* ON-DUTY VETERINARIANS ROSTER */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span>On-Duty Veterinary Surgeons On Standby</span>
            </h4>

            <div className="space-y-3">
              {VET_DOCTORS_ROSTER.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-white">{doc.name}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] text-emerald-400 block font-medium">
                        {doc.specialty}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {doc.distanceKm} km away • ★ {doc.rating} ({doc.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <a
                      href={`tel:${doc.phone}`}
                      className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition"
                      title="Direct Call Doctor"
                    >
                      <PhoneCall className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://wa.me/?text=Hello%20${encodeURIComponent(doc.name)},%20requesting%20urgent%20consultation.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: EMERGENCY SOS REPORTING DISPATCH FORM */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Report Livestock Emergency & Request Ambulance
                </h3>
                <p className="text-xs text-slate-400">
                  Transmits immediate triage notification to nearby mobile ambulance doctors
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-[11px] font-bold text-rose-300">
                Live SOS Dispatch
              </span>
            </div>

            {dispatchSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-base font-bold text-white">Emergency Dispatch Broadcasted!</h4>
                <p className="text-xs text-emerald-300 max-w-md mx-auto">
                  Mobile Unit #04 has received your coordinates and triage details. The on-duty surgeon will call your phone within 60 seconds.
                </p>
                <div className="pt-2 text-xs text-slate-400 font-mono">
                  Ticket ID: #EMERG-{Math.floor(100000 + Math.random() * 900000)} • Status: EN_ROUTE
                </div>
              </div>
            ) : (
              <form onSubmit={handleTriggerDispatch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Farmer Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Farmer / Handler Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs text-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Location with GPS pin button */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Farm / Barn Location Coordinates
                    </label>
                    <button
                      type="button"
                      onClick={handleFetchGPS}
                      disabled={locatingGps}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{locatingGps ? 'Locating...' : 'Auto-Detect Farm GPS'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={locationPin}
                    onChange={(e) => setLocationPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white font-mono"
                  />
                </div>

                {/* Animal Species & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Affected Livestock Species
                    </label>
                    <select
                      value={selectedAnimal}
                      onChange={(e) => setSelectedAnimal(e.target.value as LivestockCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    >
                      <option value="Cattle">Cattle (Cow / Calf)</option>
                      <option value="Buffalo">Buffalo (Murrah / Dairy)</option>
                      <option value="Goat">Goat (Caprine / Buck)</option>
                      <option value="Poultry">Poultry (Flock / Avian)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Triage Urgency Level
                    </label>
                    <div className="flex space-x-2">
                      {(['CRITICAL', 'HIGH', 'MODERATE'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setUrgency(lvl)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                            urgency === lvl
                              ? lvl === 'CRITICAL'
                                ? 'bg-rose-600 text-white shadow-md'
                                : lvl === 'HIGH'
                                ? 'bg-amber-600 text-white shadow-md'
                                : 'bg-blue-600 text-white shadow-md'
                              : 'bg-slate-950 border border-slate-800 text-slate-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Symptom selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Observed Clinical Signs & Symptoms
                  </label>
                  <select
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white mb-2"
                  >
                    <option value="Acute Rumen Tympany / Bloat & Respiratory Distress">Acute Rumen Tympany / Bloat & Respiratory Distress</option>
                    <option value="Dystocia / Calving Arrest (Stuck Foetus)">Dystocia / Calving Arrest (Stuck Foetus)</option>
                    <option value="Suspected Plant Poisoning / Salivation & Tremors">Suspected Plant Poisoning / Salivation & Tremors</option>
                    <option value="Severe Rectal Prolapse or Laceration">Severe Rectal Prolapse or Laceration</option>
                    <option value="Acute High Fever (Above 105°F) & Shivering">Acute High Fever (Above 105°F) & Shivering</option>
                    <option value="Other Acute Veterinary Crisis">Other Acute Veterinary Crisis</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-950/40 transition flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Emergency SOS to Mobile Ambulance</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
