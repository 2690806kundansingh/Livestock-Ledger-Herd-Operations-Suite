// File: frontend/src/components/farm2acre/HousingPhotoModal.tsx

import React from 'react';
import { X, Volume2, VolumeX, ShieldCheck, PhoneCall } from 'lucide-react';
import { useFarmVoice } from '../../utils/speechVoice';

interface HousingPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  imageUrl: string;
  description: string;
  badge?: string;
  specs?: string[];
  contactPhone?: string;
  dockerNumber?: string;
  earTagId?: string;
  price?: number;
}

export const HousingPhotoModal: React.FC<HousingPhotoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  imageUrl,
  description,
  badge,
  specs,
  contactPhone,
  dockerNumber,
  earTagId,
  price,
}) => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  if (!isOpen) return null;

  const audioContent = `${title}. ${subtitle ? subtitle + '.' : ''} ${description} ${
    price ? 'Price is ' + price.toLocaleString() + ' Rupees.' : ''
  }`;

  const handleAudio = () => {
    if (isSpeaking && currentText === audioContent) {
      stop();
    } else {
      speak(audioContent);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            {badge && (
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {badge}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAudio}
              className={`p-2 rounded-xl border transition-all flex items-center space-x-1.5 ${
                isSpeaking && currentText === audioContent
                  ? 'bg-emerald-500 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-emerald-600 text-slate-200 border-slate-700'
              }`}
              title="Read description aloud"
            >
              {isSpeaking && currentText === audioContent ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span className="text-xs font-semibold">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-emerald-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">🔊 Read</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Large Real Photo */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
            {price && (
              <div className="absolute bottom-3 right-3 bg-emerald-600/95 backdrop-blur-md px-4 py-2 rounded-xl text-white font-black text-lg border border-emerald-400/50 shadow-lg">
                ₹{price.toLocaleString()}
              </div>
            )}
            {earTagId && (
              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-emerald-400 font-mono font-bold text-xs border border-slate-800">
                RFID: {earTagId}
              </div>
            )}
          </div>

          <div>
            {subtitle && <p className="text-sm font-semibold text-emerald-400">{subtitle}</p>}
            <p className="text-sm text-slate-300 leading-relaxed mt-1">{description}</p>
          </div>

          {dockerNumber && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Government Docker Docket Registry:</span>
              <span className="text-emerald-400 font-bold">{dockerNumber}</span>
            </div>
          )}

          {specs && specs.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Specifications:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {specs.map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contactPhone && (
            <div className="pt-2">
              <a
                href={`tel:${contactPhone}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call to Inquire / Buy: {contactPhone}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
