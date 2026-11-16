import React, { useState, useEffect } from 'react';
import ThreeGoldMedallion from './ThreeGoldMedallion';
import { ArrowDown, Sparkles, MapPin, Compass, ShieldCheck } from 'lucide-react';

export default function Parallax3DHero({ onOpenBooking }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToExplore = () => {
    const target = document.getElementById('interactive-3d-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-forest-950 text-ivory select-none pt-20">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.72] contrast-[1.08] transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.06) translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`,
          }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,22,20,0.85)_100%)]" />
      </div>

      {/* Floating 3D Parallax Badges (Henrietta-style floating elements) */}
      <div
        className="absolute top-28 left-[8%] z-10 hidden lg:flex items-center gap-3 bg-forest-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gold/30 shadow-2xl transition-transform duration-300 pointer-events-auto"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 0px) rotate(${mousePos.x * 4}deg)`,
        }}
        data-cursor="ROYAL SEAL"
        data-cursor-variant="hover"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-gold uppercase font-bold font-sans">Official Resort</p>
          <p className="text-xs font-serif text-ivory font-medium">Gorakhpur Landmark</p>
        </div>
      </div>

      <div
        className="absolute bottom-28 left-[10%] z-10 hidden lg:flex items-center gap-3 bg-forest-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gold/30 shadow-2xl transition-transform duration-300 pointer-events-auto"
        style={{
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0px) rotate(${mousePos.y * -4}deg)`,
        }}
        data-cursor="COORDINATES"
        data-cursor-variant="hover"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-gold uppercase font-bold font-sans">26.7606° N, 83.3732° E</p>
          <p className="text-xs font-serif text-ivory font-medium">Medical College Road</p>
        </div>
      </div>

      <div
        className="absolute top-36 right-[8%] z-10 hidden lg:flex items-center gap-3 bg-forest-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gold/30 shadow-2xl transition-transform duration-300 pointer-events-auto"
        style={{
          transform: `translate3d(${mousePos.x * -28}px, ${mousePos.y * -28}px, 0px) rotate(${mousePos.x * -5}deg)`,
        }}
        data-cursor="SKY LOUNGE"
        data-cursor-variant="hover"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-gold uppercase font-bold font-sans">Malibu Rooftop</p>
          <p className="text-xs font-serif text-ivory font-medium">Sky Lounge & Cabanas</p>
        </div>
      </div>

      {/* Center 3D Interactive Hero Canvas & Titles */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/35 mb-6 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-gold animate-spin [animation-duration:12s]" />
          <span className="text-xs tracking-[0.25em] text-gold uppercase font-semibold font-sans">
            The Sovereign Hospitality Experience
          </span>
        </div>

        {/* Massive Henrietta-Style Impact Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold uppercase tracking-tight text-ivory leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] mb-2">
          WHERE REGAL DIGNITY
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gold font-medium tracking-wide drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] mb-6">
          Meets Untamed Luxury
        </h2>

        {/* Center 3D Rotating Three.js Medallion */}
        <div
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 my-2 relative"
          data-cursor="DRAG 3D"
          data-cursor-variant="drag"
        >
          <ThreeGoldMedallion mousePos={mousePos} />
          <p className="text-[10px] tracking-[0.25em] text-gold/75 uppercase font-sans font-semibold mt-1">
            • Interactive 3D Royal Crest •
          </p>
        </div>

        {/* Narrative Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-ivory/80 font-sans font-light leading-relaxed my-4">
          Experience 6 curated suite sanctuaries, fine rooftop culinary at Malibu, and ancient Ayurvedic healing at the Vedic Centre.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_25px_rgba(182,154,112,0.4)] hover:shadow-[0_15px_35px_rgba(182,154,112,0.6)] transform hover:-translate-y-0.5 active:translate-y-0"
            data-cursor="BOOK VIP"
            data-cursor-variant="hover"
          >
            Reserve Sanctuary
          </button>

          <button
            onClick={scrollToExplore}
            className="px-8 py-3.5 rounded-full bg-forest-900/80 hover:bg-forest-800 text-ivory border border-gold/40 font-sans font-medium text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-md hover:border-gold"
            data-cursor="INSPECT"
            data-cursor-variant="flip"
          >
            3D Pack Flip Showcase
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToExplore}
          className="mt-14 inline-flex flex-col items-center gap-2 text-forest-950 bg-white/90 hover:bg-white backdrop-blur-md px-5 py-2 rounded-full border border-gold/40 shadow-xl transition-all duration-300 group hover:-translate-y-0.5"
          data-cursor="SCROLL"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold">Scroll to Inspect 3D</span>
          <ArrowDown className="w-4 h-4 text-gold-dark animate-bounce group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Luminous Fade to White at bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
    </section>
  );
}

