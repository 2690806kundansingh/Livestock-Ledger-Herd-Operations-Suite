// File: frontend/src/components/landing/FloatingEmergencyCallButton.tsx

import React from 'react';
import { PhoneCall } from 'lucide-react';

interface FloatingEmergencyCallButtonProps {
  onTapEmergency: () => void;
}

export const FloatingEmergencyCallButton: React.FC<FloatingEmergencyCallButtonProps> = ({
  onTapEmergency,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {/* Tooltip badge */}
      <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-rose-300 border border-rose-500/40 text-xs font-semibold shadow-xl backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
        <span>Single-Tap Emergency SOS</span>
      </span>

      {/* Floating Action Button */}
      <a
        href="tel:18005483786"
        onClick={(e) => {
          // If on desktop without tel handler or user wants to trigger modal
          if (window.innerWidth > 768) {
            e.preventDefault();
            onTapEmergency();
          }
        }}
        className="group relative flex items-center space-x-2.5 p-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white shadow-2xl shadow-rose-900/80 hover:shadow-rose-700/80 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-rose-400/50"
        title="Single-Tap Call Emergency Helpline"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <PhoneCall className="h-6 w-6 animate-pulse" />
        </div>
        <span className="font-extrabold text-sm pr-1 hidden sm:inline">
          Emergency: 1800-548-3786
        </span>
      </a>
    </div>
  );
};
