import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ArrowRight, ShieldCheck, Users, Calendar, MapPin, Sparkle } from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';

// BANQUET & CELEBRATIONS GALLERY DATA
// To use your own pictures, place them in public/images/banquet/ and update or rename them here!
const BANQUET_GALLERY = [
  {
    id: 1,
    src: '/images/dining/dining-3.webp',
    title: 'The Imperial Grand Ballroom',
    tag: 'Pillarless Architecture',
    desc: 'Grand banquet setting with crystal chandeliers, acoustic architecture, and regal stage decor.',
  },
  {
    id: 2,
    src: '/images/hotel/lobby-1.webp',
    title: 'Celebration Grand Foyer',
    tag: 'VIP Welcome Reception',
    desc: 'Spacious double-height foyer for welcoming distinguished guests and evening cocktail receptions.',
  },
  {
    id: 3,
    src: '/images/hotel/exterior-1.webp',
    title: 'Royal Celebration Lawns',
    tag: 'Open-Air Starlit Evenings',
    desc: 'Lush manicured open-air lawns accommodating grand weddings and large-scale gatherings.',
  },
  {
    id: 4,
    src: '/images/dining/dining-1.webp',
    title: 'Artisanal Banquet Catering',
    tag: 'Awadhi Lineage & Global Cuisines',
    desc: 'Curated multi-course royal feasts prepared by master chefs tailored to your celebratory menu.',
  },
];

export default function BanquetPage({ onOpenBooking }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FAF5EE] via-[#F6EFE3] to-[#EFE2D0] text-forest-950 font-sans pt-24 pb-16 px-4 sm:px-6 lg:px-12 select-none relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black uppercase text-[#8C6D37]/[0.08] whitespace-nowrap pointer-events-none select-none">
        BANQUET
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Navigation Row: Back Arrow to Home */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-[#D6C5AD] text-forest-950 text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#8C6D37] transition-transform group-hover:-translate-x-1" />
            <span>Back to Resort Overview</span>
          </Link>

          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37] hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
            <span>The Radiant Landmark Events</span>
          </span>
        </div>

        {/* TOP: Header & The 2 General Lines */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6B878]/25 border border-[#B38738]/40 text-[#8C6D37] text-[10px] sm:text-xs font-bold font-sans uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
            <span>GRAND BANQUET & CELEBRATIONS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
            The Imperial Banquets & Royal Lawns
          </h1>

          <div className="pt-1 space-y-1">
            {/* The 2 General Lines */}
            <p className="text-xs sm:text-sm lg:text-base font-sans text-stone-700 font-medium leading-relaxed">
              An opulent address crafted for memorable weddings, prestigious galas, and landmark celebrations in Gorakhpur.
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-sans text-stone-600 font-medium leading-relaxed">
              Featuring expansive pillarless halls, starlit celebration lawns, and bespoke banquet hospitality.
            </p>
          </div>
        </div>

        {/* BELOW: The Picture Showcase Area */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-3 sm:space-y-4">
          {/* Main Featured Photo Card */}
          <div className="relative w-full aspect-[16/8.5] max-h-[480px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(50,35,20,0.15)] border-2 border-[#D6C5AD]/80 bg-white/40 group">
            <img
              src={BANQUET_GALLERY[activeImgIdx].src}
              alt={BANQUET_GALLERY[activeImgIdx].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Photo Info & Action */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1 text-left">
                <span className="text-[9.5px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#D6B878] block">
                  {BANQUET_GALLERY[activeImgIdx].tag}
                </span>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <span>Enquire For Dates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Picture Slots / Thumbnail Row */}
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
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#8C6D37] block truncate">
                    Photo 0{idx + 1}
                  </span>
                  <p className="text-xs font-serif font-bold text-forest-950 truncate">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Architectural Banquet Key Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-2">
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
      </div>
    </div>
  );
}
