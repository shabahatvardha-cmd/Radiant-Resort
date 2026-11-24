import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
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
  const navigate = useNavigate();

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

  // Back button handler: Navigates directly to the Banquet section (Stage 5 / progress 8.0) on the homepage
  const handleBackToBanquetSection = (e) => {
    if (e) e.preventDefault();
    playClickSound();
    try {
      sessionStorage.setItem('radiant_last_stage', '5');
    } catch (err) { }
    window.dispatchEvent(new CustomEvent('spatial-stage-jump', { detail: 5 }));
    navigate('/?stage=5&progress=8');
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
      className="h-full w-full bg-gradient-to-b from-[#FAF5EE] via-[#F6EFE3] to-[#EFE2D0] text-forest-950 font-sans pt-20 sm:pt-24 lg:pt-[100px] pb-0 px-3 sm:px-6 lg:px-10 select-none relative overflow-y-auto overscroll-y-contain touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black uppercase text-[#8C6D37]/[0.08] whitespace-nowrap pointer-events-none select-none">
        BANQUET
      </div>

      {/* 1. FIRST SCREEN: THE BANQUET HERO SHOWCASE */}
      <div className="relative z-10 max-w-5xl mx-auto min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] lg:min-h-[calc(100dvh-100px)] flex flex-col justify-between pb-8 sm:pb-10">
        <div className="space-y-3 sm:space-y-3.5">
          {/* TOP: Header (Clean Centered Presentation) */}
          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Written Content: Title & The 2 General Lines */}
            <div className="space-y-1 max-w-2xl mx-auto px-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
                The Imperial Banquets & Royal Lawns
              </h1>

              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs lg:text-[13px] font-sans text-stone-700 font-medium leading-relaxed">
                  An opulent address crafted for memorable weddings, prestigious galas, and landmark celebrations in Gorakhpur.
                </p>
                <p className="text-[11px] sm:text-xs lg:text-[13px] font-sans text-stone-600 font-medium leading-relaxed">
                  Featuring expansive pillarless halls, starlit celebration lawns, and bespoke banquet hospitality.
                </p>
              </div>
            </div>
          </div>

          {/* BELOW: The Picture Showcase Area (Calibrated to fit cleanly on screen) */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-2 sm:space-y-2.5">
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
              className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[2.1/1] lg:aspect-[2.3/1] max-h-[220px] sm:max-h-[280px] md:max-h-[310px] lg:max-h-[34vh] xl:max-h-[36vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(50,35,20,0.14)] border border-[#D6C5AD]/80 bg-white/40 group"
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
                className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-md hover:scale-110 z-20 cursor-pointer"
                aria-label="Previous banquet photo"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleNextImg}
                className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-md hover:scale-110 z-20 cursor-pointer"
                aria-label="Next banquet photo"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Photo Info & Action */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-5 right-3 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3 text-white z-10">
                <div className="space-y-0.5 text-left">
                  <span className="text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#D6B878] block">
                    {BANQUET_GALLERY[activeImgIdx].tag}
                  </span>
                  <h2 className="text-sm sm:text-lg lg:text-xl font-serif font-bold text-white leading-snug">
                    {BANQUET_GALLERY[activeImgIdx].title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-sans text-stone-300 font-medium max-w-lg hidden sm:block">
                    {BANQUET_GALLERY[activeImgIdx].desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    onOpenBooking &&
                      onOpenBooking({ name: 'Imperial Banquet & Celebrations', price: 'Custom Quote' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>Enquire For Dates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Picture Slots / Thumbnail Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
              {BANQUET_GALLERY.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    setActiveImgIdx(idx);
                  }}
                  className={`p-1.5 rounded-xl text-left transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeImgIdx === idx
                    ? 'bg-white/95 border-2 border-[#B38738] ring-2 ring-[#B38738]/30 shadow-md scale-[1.01]'
                    : 'bg-white/60 hover:bg-white/90 border border-[#D6C5AD]/70 opacity-80 hover:opacity-100'
                    }`}
                >
                  <div className="w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden shrink-0 border border-[#D6C5AD]">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-serif font-bold text-forest-950 truncate">
                      {item.title}
                    </p>
                    <p className="text-[9px] font-sans text-stone-500 font-medium truncate">
                      {item.tag}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Architectural Banquet Key Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto pt-0">
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

        {/* Scroll Down Prompt (Clean Viewport Separator) */}
        <div className="pt-2 pb-2 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37]/75">
          <span>Scroll Down for Concierge & Coordinates</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>

      {/* 2. SECOND SCREEN: FULL-BLEED GRAND LUXURY FOOTER SLIDE */}
    <footer data-resort-footer="true" className="relative z-10 -mx-3 sm:-mx-6 lg:-mx-10 min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] px-3 sm:px-8 lg:px-14 py-4 sm:py-8 lg:py-12 bg-gradient-to-b from-[#FAF5EE] via-[#F4ECE0] to-[#E9DFD0] border-t-2 border-[#D6C5AD]/80 text-forest-950 select-none shadow-[0_-20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Subtle Background Giant Archival Watermark */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-black uppercase text-[#8C6D37]/[0.10] whitespace-nowrap pointer-events-none select-none">
        THE RADIANT
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-3 sm:space-y-6 lg:space-y-8 my-auto">
        {/* Header: Hotel Crest, Brand Title & Booking CTA */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-4 pb-2.5 sm:pb-4 border-b border-stone-300/80">
          <div className="flex items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              className="h-7 sm:h-12 w-auto object-contain drop-shadow-md"
            />
            <div>
              <span className="text-[7.5px] sm:text-[9px] font-sans font-black uppercase tracking-[0.22em] text-[#8C6D37] block">
                Gorakhpur Landmark • Five-Star Hotel & Resort
              </span>
              <h3 className="font-serif font-black text-base sm:text-2xl lg:text-3xl text-forest-950 tracking-tight uppercase leading-tight">
                {hotelInfo.name}
              </h3>
              <p className="text-[10px] sm:text-xs font-sans text-stone-600 font-medium hidden xs:block">
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
              className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-none bg-forest-950 text-[#D6B878] hover:bg-[#8C6D37] hover:text-white border-2 border-[#D6B878] text-[10px] sm:text-xs font-sans font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#D6B878]" />
              <span>Enquire For Dates</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6B878]" />
            </button>
          </div>
        </div>

        {/* Main 4-Column Footer Matrix (2x2 on Mobile, 4-Cols on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6 py-1 sm:py-2">
          {/* Column 1: Resort Coordinates */}
          <div className="col-span-1 lg:col-span-4 space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-forest-950 font-black flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D37] shrink-0" />
              <span className="truncate">Resort Coordinates</span>
            </p>
            <p className="text-[10px] sm:text-xs text-stone-700 font-sans leading-relaxed font-medium">
              {hotelInfo.address.line2}<br />
              {hotelInfo.city}, {hotelInfo.address.state} — {hotelInfo.address.pincode}
            </p>
            <div className="space-y-0.5 sm:space-y-1 pt-0.5 text-[10px] sm:text-xs text-stone-800 font-sans font-bold">
              <p className="flex items-center gap-1.5 truncate">
                <Phone className="w-3 h-3 text-[#8C6D37] shrink-0" />
                <a href={`tel:${hotelInfo.contact.phone}`} className="hover:text-[#8C6D37] transition-colors truncate">
                  {hotelInfo.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-1.5 truncate">
                <Mail className="w-3 h-3 text-[#8C6D37] shrink-0" />
                <a href={`mailto:${hotelInfo.contact.email}`} className="hover:text-[#8C6D37] transition-colors truncate">
                  {hotelInfo.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Event & Concierge Hours */}
          <div className="col-span-1 lg:col-span-3 space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-forest-950 font-black flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D37] shrink-0" />
              <span className="truncate">Concierge Hours</span>
            </p>
            <ul className="text-[10px] sm:text-xs text-stone-700 space-y-0.5 sm:space-y-1.5 font-sans font-medium">
              <li className="flex justify-between items-center border-b border-stone-300/50 pb-0.5">
                <span className="truncate">Banquet Desk:</span>
                <span className="font-bold text-forest-950 shrink-0 ml-1">9am – 9pm</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-300/50 pb-0.5">
                <span className="truncate">Front Desk:</span>
                <span className="font-bold text-forest-950 shrink-0 ml-1">24 Hours</span>
              </li>
              <li className="flex justify-between items-center border-b border-stone-300/50 pb-0.5">
                <span className="truncate">Dining:</span>
                <span className="font-bold text-forest-950 shrink-0 ml-1">7am – 11pm</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="truncate">Malibu Lounge:</span>
                <span className="font-bold text-forest-950 shrink-0 ml-1">5pm – Mid</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resort Destinations */}
          <div className="col-span-1 lg:col-span-3 space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-forest-950 font-black flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D37] shrink-0" />
              <span className="truncate">Destinations</span>
            </p>
            <div className="grid grid-cols-1 gap-0.5 text-[10px] sm:text-xs font-sans font-bold">
              <Link
                to="/rooms"
                onClick={() => playClickSound()}
                className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group truncate"
              >
                <span className="truncate">Rooms & Suites</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/dining"
                onClick={() => playClickSound()}
                className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group truncate"
              >
                <span className="truncate">7 Scentric Dining</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/malibu"
                onClick={() => playClickSound()}
                className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group truncate"
              >
                <span className="truncate">Malibu Lounge</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/wellness"
                onClick={() => playClickSound()}
                className="text-stone-700 hover:text-[#8C6D37] transition-colors py-0.5 flex items-center justify-between group truncate"
              >
                <span className="truncate">Vedic Spa & Salon</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Column 4: Celebration Privileges & Links */}
          <div className="col-span-1 lg:col-span-2 space-y-1 sm:space-y-2">
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-forest-950 font-black flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D37] shrink-0" />
              <span className="truncate">Privileges</span>
            </p>
            <div className="text-[9.5px] sm:text-xs text-stone-600 font-sans space-y-0.5 sm:space-y-1">
              <p>Capacity: <span className="font-bold text-forest-950">1,200+ Guests</span></p>
              <p>Acoustic: <span className="font-bold text-forest-950">Pillarless</span></p>
              <p className="text-[8.5px] sm:text-[10px] text-stone-500 truncate">
                Valet & VIP green rooms
              </p>
            </div>

            <div className="pt-1 flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://theradiant.co.in"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-xs"
                title="Official Website"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={`tel:${hotelInfo.contact.phone}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-xs"
                title="Call Concierge"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={`mailto:${hotelInfo.contact.email}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-300 text-forest-950 hover:bg-forest-950 hover:text-[#D6B878] flex items-center justify-center transition-all shadow-xs"
                title="Email Desk"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Return to Top */}
        <div className="pt-2 sm:pt-4 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-[9.5px] sm:text-xs font-sans text-stone-600 font-medium text-center sm:text-left">
          <p>© {new Date().getFullYear()} The Radiant Hotel & Resort. All rights reserved.</p>

          <button
            onClick={() => {
              containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              playClickSound();
            }}
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#8C6D37] hover:text-forest-950 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Return to Top</span>
          </button>
        </div>
      </div>
    </footer>
    </div>
  );
}
