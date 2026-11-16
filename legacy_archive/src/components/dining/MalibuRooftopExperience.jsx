import React from 'react';
import { Wine, Utensils, Moon, Sparkles, Clock, Flame } from 'lucide-react';

export default function MalibuRooftopExperience({ onOpenBooking }) {
  return (
    <section id="malibu-sky" className="py-24 px-4 bg-stone-50 text-charcoal relative select-none overflow-hidden border-y border-stone-200">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-64 group">
                <img
                  src="/images/malibu/malibu-1.webp"
                  alt="Malibu Rooftop Cabana"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-md">
                <p className="text-[10px] tracking-widest text-gold-dark uppercase font-bold font-sans">Sunset Hour</p>
                <h4 className="text-xl font-serif font-bold text-forest-950 mt-1">5:30 PM Golden Twilight</h4>
                <p className="text-xs text-charcoal/70 font-sans mt-1">Acoustic soul sessions and panoramic sunset skyline views.</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 shadow-md">
                <p className="text-[10px] tracking-widest text-rose-700 uppercase font-bold font-sans">Craft Mixology</p>
                <h4 className="text-xl font-serif font-bold text-forest-950 mt-1">Smoked Bourbon & Botanicals</h4>
                <p className="text-xs text-charcoal/70 font-sans mt-1">Artisan cocktail flight prepared table-side by master mixologists.</p>
              </div>
              <div className="rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-64 group">
                <img
                  src="/images/malibu/malibu-3.webp"
                  alt="Malibu Rooftop Dining"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-sans font-bold tracking-[0.25em] uppercase">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              Signature Dining & Sky Lounge
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight text-forest-950 leading-tight">
              Malibu Rooftop <br />
              <span className="text-gold-dark italic font-normal">& Velvet Cabanas</span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal/80 font-sans font-light leading-relaxed">
              Perched above the city on the rooftop of The Radiant Hotel, Malibu merges seductive twilight beats with culinary innovation. From woodfired gourmet skewers to artisanal Dim Sum and bespoke cocktail flights, every evening is a theatrical celebration.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-3">
                <Wine className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-sans font-bold text-forest-950">Signature Bar</p>
                  <p className="text-[11px] text-charcoal/60 font-sans">Curated international cellar & craft cocktails</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-sans font-bold text-forest-950">Hours</p>
                  <p className="text-[11px] text-charcoal/60 font-sans">5:00 PM – Midnight daily</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking && onOpenBooking({ name: 'Malibu Sky Cabana', price: '₹5,999' })}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl"
                data-cursor="MALIBU"
                data-cursor-variant="hover"
              >
                Reserve A Cabana Booth
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

