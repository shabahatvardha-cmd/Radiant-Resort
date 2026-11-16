import React from 'react';
import { Flower2, Sparkles, HeartPulse, ShieldCheck, Sun } from 'lucide-react';

export default function VedicWellnessSection({ onOpenBooking }) {
  return (
    <section id="vedic-haven" className="py-24 px-4 bg-white text-charcoal relative select-none overflow-hidden border-b border-stone-200">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-sans font-bold tracking-[0.25em] uppercase">
              <Flower2 className="w-3.5 h-3.5 text-gold-dark" />
              Holistic Ayurvedic Centre
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight text-forest-950 leading-tight">
              Vedic Wellness <br />
              <span className="text-gold-dark italic font-normal">& Ancient Rejuvenation</span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal/80 font-sans font-light leading-relaxed">
              Rooted in centuries of classical Vedic knowledge, our holistic centre offers restorative therapies, herbal oil infusions, and traditional Shirodhara treatments conducted by certified Ayurvedic lineage therapists.
            </p>

            <div className="space-y-3 py-2 font-sans text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-sm">
                <Sun className="w-5 h-5 text-gold-dark shrink-0" />
                <span><strong className="text-forest-950">Abhyanga Body Therapy:</strong> Synchronized warm herbal oil massage to awaken cellular vitality.</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-sm">
                <Sparkles className="w-5 h-5 text-gold-dark shrink-0" />
                <span><strong className="text-forest-950">Shirodhara Stream:</strong> Continuous medicated warm oil cascade on the third-eye chakra for profound serenity.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking && onOpenBooking({ name: 'Vedic Spa Retreat', price: '₹3,499' })}
                className="px-8 py-3.5 rounded-full bg-forest-950 hover:bg-forest-900 text-gold font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg"
                data-cursor="VEDIC SPA"
                data-cursor-variant="hover"
              >
                Inquire Wellness Rituals
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl group">
              <img
                src="/images/wellness/wellness-2.png"
                alt="Vedic Wellness Spa"
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-forest-950/80 backdrop-blur-md border border-gold/30">
                <p className="text-[10px] tracking-widest uppercase font-bold text-gold font-sans">Vedic Sanctuary</p>
                <p className="text-base font-serif font-bold text-ivory">Organic Hand-Pressed Herbal Infusions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

