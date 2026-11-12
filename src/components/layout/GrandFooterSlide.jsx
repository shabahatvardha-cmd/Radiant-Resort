import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Compass,
  ArrowUp,
  Globe,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../utils/audioEffects';

export default function GrandFooterSlide({ onOpenBooking, jumpToStage }) {
  const handleScrollToTop = () => {
    playChimeSound();
    if (jumpToStage) jumpToStage(0);
  };

  const handleNav = (stageIdx) => {
    playClickSound();
    if (jumpToStage) jumpToStage(stageIdx);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-gradient-to-b from-[#F7F4EE] via-[#F3ECE4] to-[#EAE0D4] text-forest-950 overflow-hidden select-none">
      {/* Subtle Background Giant Archival Watermark */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-black uppercase text-stone-900/[0.03] whitespace-nowrap pointer-events-none select-none">
        THE RADIANT
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto h-full flex flex-col justify-between pt-16 sm:pt-16 pb-2 sm:pb-3 overflow-y-auto no-scrollbar">
        {/* 
          =============================================================================
          HEADER: Hotel Crest, Brand Title & Elevation
          =============================================================================
        */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-4 pb-2 sm:pb-2.5 border-b-2 border-stone-300/80">
          <div className="flex items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-8 sm:h-11 w-auto object-contain drop-shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark">
                  Gorakhpur Landmark • Five-Star Hotel & Resort
                </span>
              </div>
              <h3 className="font-serif font-black text-lg sm:text-2xl lg:text-3xl text-forest-950 tracking-tight uppercase leading-tight">
                The Radiant Hotel & Resort
              </h3>
              <p className="text-[10px] sm:text-xs font-sans text-stone-600 font-medium">
                Where Regal Dignity Meets Untamed Luxury
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                if (onOpenBooking) onOpenBooking();
              }}
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-forest-950 text-gold hover:bg-forest-900 border-2 border-gold text-[10px] sm:text-xs font-sans font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Book Your Room & Suite</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </div>
        </div>

        {/* 
          =============================================================================
          MAIN 4-COLUMN FOOTER INFORMATION MATRIX
          =============================================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 lg:gap-6 my-auto py-1 sm:py-2">
          {/* Column 1: Resort Coordinates & Map */}
          <div className="lg:col-span-4 space-y-1.5 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-dark" />
              Resort Coordinates
            </p>
            <p className="text-[11px] sm:text-xs text-stone-700 font-sans leading-relaxed font-medium">
              Medical College Road, near Gularia Thana,<br />
              Kanchanpur Chauraha, Bangai,<br />
              Gorakhpur, Uttar Pradesh — 273013
            </p>
            <div className="space-y-0.5 pt-0.5 text-[11px] sm:text-xs text-stone-800 font-sans font-bold">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                <a href="tel:+917607603377" className="hover:text-gold-dark transition-colors">
                  +91 760 760 3377
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                <a href="mailto:resv@theradiant.co.in" className="hover:text-gold-dark transition-colors">
                  resv@theradiant.co.in
                </a>
              </p>
              <p className="flex items-center gap-2 text-[9px] sm:text-[10px] font-sans text-stone-500 font-semibold pt-0.5">
                <Compass className="w-3 h-3 text-gold-dark shrink-0" />
                <span>26.7606° N, 83.3732° E • Elevation 84m</span>
              </p>
            </div>
          </div>

          {/* Column 2: Concierge & Hospitality Timings */}
          <div className="lg:col-span-3 space-y-1.5 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              Concierge Hours
            </p>
            <ul className="text-[11px] sm:text-xs text-stone-700 space-y-1 font-sans font-medium">
              <li className="flex justify-between items-center border-b border-stone-300/60 pb-0.5">
                <span>Front Desk:</span>
                <span className="font-bold text-forest-950">24 Hours Daily</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-300/60 pb-0.5">
                <span>Malibu Sky Lounge:</span>
                <span className="font-bold text-forest-950">5:00 PM – Midnight</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-300/60 pb-0.5">
                <span>The Seven Scentric:</span>
                <span className="font-bold text-forest-950">7:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Vedic Wellness Centre:</span>
                <span className="font-bold text-forest-950">8:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Spatial Navigation Links */}
          <div className="lg:col-span-3 space-y-1.5 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Spatial Milestones
            </p>
            <div className="grid grid-cols-1 gap-0.5 text-[10px] sm:text-[11px] font-sans font-bold">
              <button
                onClick={() => handleNav(0)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>01 Regal Opening & Medallion</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleNav(1)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>02 Rooms & Suites (6 Categories)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleNav(2)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>03 Vedic Spa & Royal Salon</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleNav(3)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>04 Malibu Sky Lounge & Cabanas</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleNav(4)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>05 The Seven Scentric Dining</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => handleNav(5)}
                className="text-left text-stone-700 hover:text-gold-dark transition-colors py-0.5 flex items-center justify-between group"
              >
                <span>06 Guest Chronicles (Stories)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Column 4: Stay Privileges & Direct Action */}
          <div className="lg:col-span-2 space-y-1.5 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              Stay Policy
            </p>
            <div className="text-[11px] sm:text-xs text-stone-600 font-sans space-y-0.5">
              <p>Check-In: <span className="font-bold text-forest-950">2:00 PM</span></p>
              <p>Check-Out: <span className="font-bold text-forest-950">11:00 AM</span></p>
              <p className="pt-0.5 text-[9px] sm:text-[10px] leading-relaxed text-stone-500">
                Early check-in & airport chauffeur on request.
              </p>
            </div>

            <div className="pt-0.5 flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://theradiant.co.in"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-900 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Official Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:+917607603377"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-900 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Call Concierge"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:resv@theradiant.co.in"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-900 hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Email Desk"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 
          =============================================================================
          BOTTOM STRIP: Copyright & Return to Beginning Summit Button
          =============================================================================
        */}
        <div className="pt-1.5 sm:pt-2 border-t-2 border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-sans text-stone-600 font-medium">
          <p>
            © {new Date().getFullYear()} The Radiant Hotel & Resort. Gorakhpur Landmark. All rights reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 hover:bg-forest-950 hover:text-gold text-forest-950 font-bold border border-stone-300 shadow-sm transition-all group text-[10px] sm:text-xs"
          >
            <span>Return to Summit (Top)</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

