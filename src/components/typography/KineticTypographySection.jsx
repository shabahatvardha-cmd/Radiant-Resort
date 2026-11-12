import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, GlassWater, Flower2, Sparkles } from 'lucide-react';

const REALMS = [
  {
    id: 'malibu',
    bigText: 'MALIBU',
    subtitle: 'Rooftop Sky Lounge & Cabanas',
    accentColor: 'bg-gradient-to-r from-red-950 via-rose-900 to-amber-950',
    textColor: 'text-rose-200/20',
    tag: 'FLAME & SUNSET',
    icon: Flame,
    image: '/images/malibu/malibu-2.webp',
    description: 'Elevated culinary drama above Gorakhpur. Signature craft mixology, woodfired Mediterranean bites, and golden hour beats in private rooftop cabanas.',
    cta: 'Explore Malibu Lounge',
    highlight: 'Open Daily from 5:00 PM – Midnight',
  },
  {
    id: 'sanctuary',
    bigText: 'SANCTUARY',
    subtitle: 'Regal Suites & Quiet Dignity',
    accentColor: 'bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950',
    textColor: 'text-emerald-200/20',
    tag: 'SOVEREIGN SLEEP',
    icon: Sparkles,
    image: '/images/rooms/deluxe-1.webp',
    description: 'Six distinct architectural sanctuary categories designed with acoustic soundproofing, Statuario marble baths, and bespoke 24/7 royal butler service.',
    cta: 'Discover All Sanctuaries',
    highlight: '6 Curated Room Tiers with Private Verandahs',
  },
  {
    id: 'vedic',
    bigText: 'VEDIC',
    subtitle: 'Ancient Ayurvedic Centre & Spa',
    accentColor: 'bg-gradient-to-r from-amber-950 via-stone-900 to-yellow-950',
    textColor: 'text-amber-200/20',
    tag: 'HOLISTIC RESTORATION',
    icon: Flower2,
    image: '/images/wellness/wellness-1.png',
    description: 'Authentic Panchakarma therapies, herbal steam infusions, and traditional Indian massage treatments administered by master Ayurvedic practitioners.',
    cta: 'Enter Wellness Haven',
    highlight: '100% Organic Cold-Pressed Oils & Rituals',
  },
];

export default function KineticTypographySection({ onSelectRealm }) {
  const [activeTab, setActiveTab] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const realm = REALMS[activeTab];
  const IconComponent = realm.icon;

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className={`relative min-h-[750px] w-full py-24 px-4 overflow-hidden text-ivory transition-colors duration-700 select-none ${realm.accentColor}`}>
      {/* GIANT HENRIETTA-STYLE KINETIC RUNNING TEXT IN BACKGROUND */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        style={{
          transform: `translate3d(${mouseOffset.x * -1.2}px, ${mouseOffset.y * -0.6}px, 0px)`,
        }}
      >
        <span
          key={realm.bigText}
          className={`font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[26vw] sm:text-[22vw] md:text-[20vw] leading-none transition-all duration-700 animate-pulse ${realm.textColor}`}
        >
          {realm.bigText}
        </span>
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between h-full">
        {/* Navigation Selector at Top */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-gold font-bold">
              Kinetic Destination Realms
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {REALMS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActiveTab(i)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-ivory text-forest-950 font-extrabold shadow-2xl scale-105'
                    : 'bg-black/30 text-ivory/70 hover:text-ivory border border-white/15'
                }`}
                data-cursor={r.bigText}
                data-cursor-variant="hover"
              >
                {r.bigText}
              </button>
            ))}
          </div>
        </div>

        {/* Floating 3D Showcase Card in Front of Huge Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-sans font-bold tracking-widest text-gold uppercase">
              <IconComponent className="w-3.5 h-3.5" />
              {realm.tag}
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-white leading-tight">
              {realm.subtitle}
            </h3>

            <p className="text-base sm:text-lg text-ivory/80 font-sans font-light leading-relaxed max-w-xl">
              {realm.description}
            </p>

            <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-md">
              <p className="text-xs font-sans tracking-wider text-gold font-semibold uppercase">
                {realm.highlight}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectRealm && onSelectRealm(realm)}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:translate-x-1"
                data-cursor={realm.bigText}
                data-cursor-variant="hover"
              >
                {realm.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Floating 3D Artwork (with counter parallax) */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-2 border-gold/40 group transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0px) rotate(${mouseOffset.x * 0.08}deg)`,
              }}
              data-cursor="VIEW REALM"
              data-cursor-variant="hover"
            >
              <img
                src={realm.image}
                alt={realm.subtitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-gold font-sans">
                    Featured Destination
                  </span>
                  <p className="text-xl font-serif font-bold text-white">
                    {realm.bigText} EXPERIENCE
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold/90 text-forest-950 flex items-center justify-center font-bold shadow-lg">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Switcher Indicators */}
        <div className="flex items-center justify-between pt-12 border-t border-white/10 mt-12 text-xs font-sans text-ivory/60">
          <span>0{activeTab + 1} / 0{REALMS.length}</span>
          <span className="uppercase tracking-widest text-gold/80">Interactive 3D Horizon Realm</span>
          <div className="flex gap-1.5">
            {REALMS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeTab === i ? 'w-8 bg-gold' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

