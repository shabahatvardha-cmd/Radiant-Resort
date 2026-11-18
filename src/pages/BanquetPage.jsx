import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  Globe,
  Crown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';
import { hotelInfo } from '../data/hotelInfo';

// BANQUET & CELEBRATIONS GALLERY DATA
// To use your own pictures, place them in public/images/banquet/ and update or rename them here!
const BANQUET_GALLERY = [
  {
    id: 1,
    src: '/images/banquet/banquet-1.webp',
    title: 'The Imperial Grand Ballroom',
    tag: 'Pillarless Architecture',
    desc: 'Grand banquet setting with crystal chandeliers, acoustic architecture, and regal stage decor.',
  },
  {
    id: 2,
    src: '/images/banquet/banquet-2.webp',
    title: 'Celebration Grand Foyer',
    tag: 'VIP Welcome Reception',
    desc: 'Spacious double-height foyer for welcoming distinguished guests and evening cocktail receptions.',
  },
  {
    id: 3,
    src: '/images/banquet/banquet-3.webp',
    title: 'Royal Celebration Lawns',
    tag: 'Open-Air Starlit Evenings',
    desc: 'Lush manicured open-air lawns accommodating grand weddings and large-scale gatherings.',
  },
  {
    id: 4,
    src: '/images/banquet/banquet-4.webp',
    title: 'Artisanal Banquet Catering',
    tag: 'Awadhi Lineage & Global Cuisines',
    desc: 'Curated multi-course royal feasts prepared by master chefs tailored to your celebratory menu.',
  },
];

export default function BanquetPage({ onOpenBooking }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const handlePrevImg = (e) => {
    if (e) e.stopPropagation();
    playClickSound();
    setActiveImgIdx((prev) => (prev - 1 + BANQUET_GALLERY.length) % BANQUET_GALLERY.length);
  };

  const handleNextImg = (e) => {
    if (e) e.stopPropagation();
    playClickSound();
    setActiveImgIdx((prev) => (prev + 1) % BANQUET_GALLERY.length);
  };

  // Reset to top (Imperial Grand Ballroom) on navbar re-click
  useEffect(() => {
    const handleReset = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setActiveImgIdx(0);
    };
    window.addEventListener('depth-page-reset', handleReset);
    return () => window.removeEventListener('depth-page-reset', handleReset);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-gradient-to-b from-[#FAF5EE] via-[#F6EFE3] to-[#EFE2D0] text-forest-950 font-sans pt-16 sm:pt-24 pb-12 px-3 sm:px-6 lg:px-12 select-none relative overflow-y-auto overscroll-y-contain touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black uppercase text-[#8C6D37]/[0.08] whitespace-nowrap pointer-events-none select-none">
        BANQUET
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-4 sm:space-y-5">
        {/* TOP: Header with Parallel Back Arrow on the left */}
        <div className="relative flex flex-col items-center justify-center text-center">
          {/* Back Arrow - Parallel with the Title on the left */}
          <div className="absolute left-0 top-0 sm:top-1 z-20">
            <Link
              to="/"
              onClick={() => playClickSound()}
              className="text-forest-950 hover:text-[#8C6D37] transition-colors p-1 -ml-1 inline-flex items-center cursor-pointer"
              aria-label="Back to resort overview"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
          </div>

          {/* Written Content: Title & The 2 General Lines */}
          <div className="space-y-1.5 max-w-3xl mx-auto px-8 sm:px-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
              The Imperial Banquets & Royal Lawns
            </h1>

            <div className="space-y-0.5">
              {/* The 2 General Lines */}
              <p className="text-xs sm:text-sm font-sans text-stone-700 font-medium leading-relaxed">
                An opulent address crafted for memorable weddings, prestigious galas, and landmark celebrations in Gorakhpur.
              </p>
              <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed">
                Featuring expansive pillarless halls, starlit celebration lawns, and bespoke banquet hospitality.
              </p>
            </div>
          </div>
        </div>

        {/* BELOW: The Picture Showcase Area */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-2.5 sm:space-y-3">
          {/* Main Featured Photo Card */}
          <div
            onTouchStart={(e) => {
              touchStartXRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartXRef.current === null) return;
              const diff = touchStartXRef.current - e.changedTouches[0].clientX;
              if (diff > 45) {
                handleNextImg();
              } else if (diff < -45) {
                handlePrevImg();
              }
              touchStartXRef.current = null;
            }}
            className="relative w-full aspect-[16/9] sm:aspect-[16/8.2] max-h-[380px] sm:max-h-[440px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(50,35,20,0.15)] border-2 border-[#D6C5AD]/80 bg-white/40 group"
          >
            <img
              src={BANQUET_GALLERY[activeImgIdx].src}
              alt={BANQUET_GALLERY[activeImgIdx].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Left / Right Quick Photo Switcher Arrows */}
            <button
              onClick={handlePrevImg}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-lg hover:scale-110 z-20 cursor-pointer"
              aria-label="Previous banquet photo"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={handleNextImg}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-lg hover:scale-110 z-20 cursor-pointer"
              aria-label="Next banquet photo"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Photo Info & Action */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 text-white z-10">
              <div className="space-y-0.5 sm:space-y-1 text-left">
                <span className="text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#D6B878] block">
                  {BANQUET_GALLERY[activeImgIdx].tag}
                </span>
                <h2 className="text-base sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug">
                  {BANQUET_GALLERY[activeImgIdx].title}
                </h2>
                <p className="text-xs sm:text-sm font-sans text-stone-300 font-medium max-w-xl hidden sm:block">
                  {BANQUET_GALLERY[activeImgIdx].desc}
                </p>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'Imperial Banquet & Celebrations', price: 'Custom Quote' });
                }}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <span>Enquire For Dates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Picture Slots / Thumbnail Row (No "Photo 1 / Photo 2", clean and clear) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
            {BANQUET_GALLERY.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  setActiveImgIdx(idx);
                }}
                className={`p-2 rounded-2xl text-left transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeImgIdx === idx
                    ? 'bg-white/95 border-2 border-[#B38738] ring-2 ring-[#B38738]/30 shadow-md scale-[1.02]'
                    : 'bg-white/60 hover:bg-white/90 border border-[#D6C5AD]/70 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-[#D6C5AD]">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-serif font-bold text-forest-950 truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] font-sans text-stone-500 font-medium truncate">
                    {item.tag}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Architectural Banquet Key Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-0">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#D6C5AD]/70 shadow-sm text-center space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#8C6D37] block leading-none">1,200+</span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block">
              Guest Capacity
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#D6C5AD]/70 shadow-sm text-center space-y-1">
            <span className="text-lg sm:text-xl font-serif font-bold text-[#8C6D37] block leading-none">Pillarless</span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block">
              Grand Ballroom Span
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#D6C5AD]/70 shadow-sm text-center space-y-1">
            <span className="text-lg sm:text-xl font-serif font-bold text-[#8C6D37] block leading-none">Open-Air</span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block">
              Starlit Royal Lawns
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#D6C5AD]/70 shadow-sm text-center space-y-1">
            <span className="text-lg sm:text-xl font-serif font-bold text-[#8C6D37] block leading-none">Bespoke</span>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block">
              Multi-Cuisine Feasts
            </span>
          </div>
        </div>

        {/* Full-Bleed Grand Luxury Light Footer Slide */}
        <div className="mt-8 sm:mt-10 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-8 lg:px-14 py-8 sm:py-12 bg-gradient-to-b from-[#FAF5EE] via-[#F4ECE0] to-[#E9DFD0] border-t-2 border-[#D6C5AD]/80 text-forest-950 relative overflow-hidden select-none shadow-[0_-15px_40px_rgba(0,0,0,0.03)]">
          {/* Subtle Background Giant Archival Watermark */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-black uppercase text-[#8C6D37]/[0.10] whitespace-nowrap pointer-events-none select-none">
            THE RADIANT
          </div>

          <div className="relative z-10 max-w-6xl mx-auto space-y-8">
            {/* Header: Hotel Crest, Brand Title & Booking CTA */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 border-b-2 border-stone-300/80">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <img
                  src="/logo/logo.webp"
                  alt="The Radiant Hotel & Resort"
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
                />
                <div>
                  <span className="text-[9px] font-sans font-black uppercase tracking-[0.25em] text-[#8C6D37] block">
                    Gorakhpur Landmark • Five-Star Hotel & Resort
                  </span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-forest-950 tracking-tight uppercase leading-tight">
                    {hotelInfo.name}
                  </h3>
                  <p className="text-xs font-sans text-stone-600 font-medium">
                    Where Regal Dignity Meets Untamed Luxury
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenBooking &&
                      onOpenBooking({ name: 'Imperial Banquet & Celebrations', price: 'Custom Quote' });
                  }}
                  className="px-5 py-2.5 rounded-none bg-forest-950 text-[#D6B878] hover:bg-[#8C6D37] hover:text-white border-2 border-[#D6B878] text-xs font-sans font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-[#D6B878]" />
                  <span>Enquire For Dates</span>
                  <ArrowRight className="w-4 h-4 text-[#D6B878]" />
                </button>
              </div>
            </div>

            {/* Main 4-Column Footer Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 py-2">
              {/* Column 1: Resort Coordinates */}
              <div className="lg:col-span-4 space-y-2">
                <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Resort Coordinates
                </p>
                <p className="text-xs text-stone-700 font-sans leading-relaxed font-medium">
                  {hotelInfo.address.line2}<br />
                  {hotelInfo.city}, {hotelInfo.address.state} — {hotelInfo.address.pincode}
                </p>
                <div className="space-y-1 pt-1 text-xs text-stone-800 font-sans font-bold">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                    <a href={`tel:${hotelInfo.contact.phone}`} className="hover:text-[#8C6D37] transition-colors">
                      {hotelInfo.contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                    <a href={`mailto:${hotelInfo.contact.email}`} className="hover:text-[#8C6D37] transition-colors">
                      {hotelInfo.contact.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-[10px] font-sans text-stone-500 font-semibold pt-0.5">
                    <Compass className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                    <span>26.7606° N, 83.3732° E • Elevation 84m</span>
                  </p>
                </div>
              </div>

              {/* Column 2: Event & Concierge Hours */}
              <div className="lg:col-span-3 space-y-2">
                <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Concierge & Event Hours
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 font-sans font-medium">
                  <li className="flex justify-between items-center border-b border-stone-300/60 pb-1">
                    <span>Imperial Banquet Desk:</span>
                    <span className="font-bold text-forest-950">9:00 AM – 9:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-stone-300/60 pb-1">
                    <span>Front Desk:</span>
                    <span className="font-bold text-forest-950">24 Hours Daily</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-stone-300/60 pb-1">
                    <span>The Seven Scentric:</span>
                    <span className="font-bold text-forest-950">7:00 AM – 11:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Malibu Sky Lounge:</span>
                    <span className="font-bold text-forest-950">5:00 PM – Midnight</span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Resort Destinations */}
              <div className="lg:col-span-3 space-y-2">
                <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Resort Destinations
                </p>
                <div className="grid grid-cols-1 gap-1 text-xs font-sans font-bold">
                  <Link
                    to="/rooms"
                    onClick={() => playClickSound()}
                    className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group"
                  >
                    <span>Rooms & Suites</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/dining"
                    onClick={() => playClickSound()}
                    className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group"
                  >
                    <span>The Seven Scentric Restaurant</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/malibu"
                    onClick={() => playClickSound()}
                    className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group"
                  >
                    <span>Malibu Rooftop Bar & Lounge</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/wellness"
                    onClick={() => playClickSound()}
                    className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group"
                  >
                    <span>Vedic Wellness Spa & Salon</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link
                    to="/"
                    onClick={() => playClickSound()}
                    className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group"
                  >
                    <span>Grand Resort Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </div>

              {/* Column 4: Celebration Privileges & Links */}
              <div className="lg:col-span-2 space-y-2">
                <p className="text-xs font-sans tracking-[0.25em] uppercase text-forest-950 font-black flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
                  Banquet Privileges
                </p>
                <div className="text-xs text-stone-600 font-sans space-y-1">
                  <p>Grand Capacity: <span className="font-bold text-forest-950">1,200+ Guests</span></p>
                  <p>Acoustic Design: <span className="font-bold text-forest-950">Pillarless Span</span></p>
                  <p className="pt-0.5 text-[10px] leading-relaxed text-stone-500">
                    Valet parking, VIP bridal green rooms & event concierge.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="https://theradiant.co.in"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-sm"
                    title="Official Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${hotelInfo.contact.phone}`}
                    className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-sm"
                    title="Call Concierge"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${hotelInfo.contact.email}`}
                    className="w-8 h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-sm"
                    title="Email Desk"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Strip: Copyright & Return to Top */}
            <div className="pt-4 border-t-2 border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-stone-600 font-medium">
              <p>© {new Date().getFullYear()} The Radiant Hotel & Resort. Gorakhpur Landmark. All rights reserved.</p>

              <button
                onClick={() => {
                  containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  playClickSound();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#8C6D37] hover:text-forest-950 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
