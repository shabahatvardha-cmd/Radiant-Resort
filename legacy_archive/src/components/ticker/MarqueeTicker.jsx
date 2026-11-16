import React from 'react';
import { Star } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    '6 LUXURY ROOMS & SUITES',
    'MALIBU ROOFTOP SKY LOUNGE & CABANAS',
    'VEDIC AYURVEDIC WELLNESS HAVEN',
    '26.7606° N GORAKHPUR LANDMARK',
    '24/7 DEDICATED ROYAL BUTLER SERVICE',
    'STATUARIO MARBLE SOAKING BATHS',
    'THE SEVEN SCENTRIC FINE DINING',
    'PRIVATE AIRPORT & STATION TRANSFERS',
  ];

  return (
    <div className="relative py-4 bg-gold text-forest-950 overflow-hidden select-none border-y-2 border-forest-950 font-sans font-black tracking-[0.2em] text-xs sm:text-sm uppercase shadow-inner">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-4">
            <span>{text}</span>
            <Star className="w-3.5 h-3.5 fill-forest-950 text-forest-950" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

