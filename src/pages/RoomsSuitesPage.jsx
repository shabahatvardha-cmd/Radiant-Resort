import React from 'react';
import { Sparkles } from 'lucide-react';
import { roomsData } from '../data/roomsData';
import { hotelInfo } from '../data/hotelInfo';
import CinematicRoomsFolio from '../components/showcase/CinematicRoomsFolio';

export default function RoomsSuitesPage({ onOpenBooking }) {
  return (
    <div className="min-h-screen bg-[#FAF5EE] text-forest-950 font-sans selection:bg-gold selection:text-forest-950 pt-14 sm:pt-16">
      {/* =========================================================================
          HERO BANNER (ARCHITECTURAL OPENING)
         ========================================================================= */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#F4ECE0] to-[#FAF5EE] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gold/40 shadow-sm text-gold-dark font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>THE SANCTUARY COLLECTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Rooms & Signature Suites
          </h1>

          <p className="text-sm sm:text-base font-sans text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            An ensemble of six distinct sanctuaries crafted with Statuario marble, natural daylight architecture, bespoke teak craftsmanship, and absolute sound-insulated acoustic calm in Gorakhpur.
          </p>

          {/* Quick Key Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-center">
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">06</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Sanctuary Tiers</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">100%</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Acoustic Silence</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">24/7</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Butler & Dining</span>
            </div>
            <div className="p-3 bg-white/80 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif font-black text-gold-dark block">100%</span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-600">Natural Daylight</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CINEMATIC PINNED SCROLL-DRIVEN 3D FLIP SHOWCASE (ALL 6 ROOMS)
         ========================================================================= */}
      <section className="relative w-full border-b border-stone-200">
        <CinematicRoomsFolio rooms={roomsData} onOpenBooking={onOpenBooking} />
      </section>

      {/* =========================================================================
          GRAND RESORT FOOTER
         ========================================================================= */}
      <footer className="bg-forest-950 text-stone-300 py-12 border-t border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-lg font-serif font-black text-gold uppercase tracking-wider">
              {hotelInfo.name}
            </p>
            <p className="text-xs font-sans text-stone-400">
              {hotelInfo.address.line2}, {hotelInfo.city}, Uttar Pradesh {hotelInfo.address.pincode}
            </p>
          </div>

          <div className="text-center md:text-right text-xs font-sans text-stone-400">
            <p className="text-stone-300 font-medium">Reservations & Concierge Available 24/7</p>
            <p className="text-[11px] text-stone-500 mt-1">© {new Date().getFullYear()} The Radiant Hotel & Resort. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
