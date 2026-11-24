import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Sparkles,
  ArrowRight,
  Crown
} from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

export default function GrandFooterSlide({ onOpenBooking, jumpToStage }) {
  const handleNav = (stageIdx) => {
    playClickSound();
    if (jumpToStage) jumpToStage(stageIdx);
  };

  return (
    <footer data-resort-footer="true" className="footer-scroll-container absolute top-[70px] sm:top-[76px] lg:top-[82px] inset-x-0 bottom-0 bg-gradient-to-b from-[#FAF6EE] via-[#F4ECE2] to-[#ECE1D2] text-forest-950 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden overscroll-contain touch-pan-y select-none">
      {/* Subtle Background Archival Watermark */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[14vw] font-serif font-black uppercase text-[#8C6D37]/[0.09] whitespace-nowrap pointer-events-none select-none">
        THE RADIANT
      </div>

      <div className="relative z-10 w-full max-w-[1540px] px-4 sm:px-8 lg:px-12 mx-auto min-h-full flex flex-col justify-between pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-10">
        {/* TOP BRAND BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#D6C5AD]/60">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-9 sm:h-12 w-auto object-contain drop-shadow-sm"
            />
            <div>
              <span className="block text-[8.5px] sm:text-[9.5px] font-sans font-black uppercase tracking-[0.25em] text-[#8C6D37]">
                Gorakhpur Landmark • Luxury Resort
              </span>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-forest-950 tracking-tight uppercase leading-tight">
                The Radiant Hotel & Resort
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              if (onOpenBooking) onOpenBooking();
            }}
            className="px-5 py-2.5 rounded-full bg-forest-950 text-gold hover:bg-[#8C6D37] hover:text-white border border-[#D6B878]/60 text-xs font-sans font-black uppercase tracking-widest shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>Reserve A Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* LIGHTWEIGHT 3-COLUMN ESSENTIAL MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 my-auto py-6 sm:py-8">
          {/* Column 1: Location & Contact */}
          <div className="md:col-span-5 space-y-3">
            <p className="text-xs font-sans tracking-[0.22em] uppercase text-[#8C6D37] font-black flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C6D37]" />
              Resort Location & Contact
            </p>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed font-medium max-w-sm">
              Medical College Road, Kanchanpur Chauraha,<br />
              Bangai, Gorakhpur, Uttar Pradesh — 273013
            </p>
            <div className="space-y-1.5 pt-1 text-xs sm:text-sm font-sans font-bold text-forest-950">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8C6D37] shrink-0" />
                <a href="tel:+917607603377" className="hover:text-[#8C6D37] transition-colors">
                  +91 760 760 3377
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8C6D37] shrink-0" />
                <a href="mailto:resv@theradiant.co.in" className="hover:text-[#8C6D37] transition-colors">
                  resv@theradiant.co.in
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-sans tracking-[0.22em] uppercase text-[#8C6D37] font-black flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6D37]" />
              Resort Folios
            </p>
            <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm font-sans font-semibold text-stone-700">
              <button
                onClick={() => handleNav(1)}
                className="text-left hover:text-forest-950 hover:translate-x-1 transition-all py-0.5 cursor-pointer flex items-center justify-between group"
              >
                <span>Rooms & Luxury Suites</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6D37]" />
              </button>
              <button
                onClick={() => handleNav(2)}
                className="text-left hover:text-forest-950 hover:translate-x-1 transition-all py-0.5 cursor-pointer flex items-center justify-between group"
              >
                <span>Vedic Spa & Royal Salon</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6D37]" />
              </button>
              <button
                onClick={() => handleNav(3)}
                className="text-left hover:text-forest-950 hover:translate-x-1 transition-all py-0.5 cursor-pointer flex items-center justify-between group"
              >
                <span>Malibu Rooftop Skyline Lounge</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6D37]" />
              </button>
              <button
                onClick={() => handleNav(4)}
                className="text-left hover:text-forest-950 hover:translate-x-1 transition-all py-0.5 cursor-pointer flex items-center justify-between group"
              >
                <span>The Seven Scentric Fine Dining</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6D37]" />
              </button>
              <button
                onClick={() => handleNav(5)}
                className="text-left hover:text-forest-950 hover:translate-x-1 transition-all py-0.5 cursor-pointer flex items-center justify-between group"
              >
                <span>Imperial Banquets & Lawns</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6D37]" />
              </button>
            </div>
          </div>

          {/* Column 3: Hospitality Desk & Direct Channels */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-sans tracking-[0.22em] uppercase text-[#8C6D37] font-black">
              Hospitality Desk
            </p>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              Front Desk & Concierge service available <span className="font-bold text-forest-950">24 Hours Daily</span>.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://theradiant.co.in"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/90 border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="tel:+917607603377"
                className="w-9 h-9 rounded-full bg-white/90 border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Call Resort"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:resv@theradiant.co.in"
                className="w-9 h-9 rounded-full bg-white/90 border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Email Reservations"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP: Clean Copyright */}
        <div className="pt-3 border-t border-[#D6C5AD]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-stone-600">
          <p>
            © {new Date().getFullYear()} The Radiant Hotel & Resort. Gorakhpur Landmark. All rights reserved.
          </p>
          <span className="text-[#8C6D37] text-[11px] font-serif italic">
            Where Regal Dignity Meets Untamed Luxury
          </span>
        </div>
      </div>
    </footer>
  );
}
