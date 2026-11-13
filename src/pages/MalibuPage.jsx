import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Clock,
  Calendar,
  Phone,
  ArrowRight,
  ArrowUp,
  MapPin,
  Check,
  Star,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';
import Malibu3DEnvironment from '../components/effects/Malibu3DEnvironment';

// =============================================================================
// 1. DATA DEFINITIONS — EXACT CONTENT PRESERVATION
// =============================================================================

// All 9 Weekly Celebration Nights & Concerts
const MALIBU_EVENTS = [
  {
    id: 'filmy-sun',
    eventNumber: '01',
    dayTime: 'Sunday • 7:00 PM',
    title: 'Filmy Sunday',
    tagline: 'High-Octane Bollywood Anthems & Live Dhol',
    badge: 'MALIBU NIGHT',
    desc: 'Blockbuster Bollywood dance anthems, live percussion dhol beats, and rooftop cocktail drama under the open stars overlooking Gorakhpur.',
    image: '/images/malibu/malibu-1.webp',
    perks: ['Global Club Hits', 'Live Dhol', 'VIP Cabana Bottle Service'],
  },
  {
    id: 'filmy-sat',
    eventNumber: '02',
    dayTime: 'Saturday • 7:00 PM',
    title: 'Filmy Shanivar',
    tagline: "Gorakhpur's Biggest Weekend Rooftop Bash",
    badge: 'MALIBU NIGHT',
    desc: 'Blockbuster weekend celebration with trending film mixes, signature mixology, and vibrant rooftop energy overlooking the illuminated skyline.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Bollywood Hits', 'Smoked Mixology', 'VIP Cabana Service'],
  },
  {
    id: 'golden-fri',
    eventNumber: '03',
    dayTime: 'Friday • 7:00 PM',
    title: 'Golden Era Friday',
    tagline: 'Timeless Retro Melodies & Bourbon Flights',
    badge: 'RETRO NIGHT',
    desc: 'Nostalgic retro melodies, timeless Bollywood classics, and craft smoked bourbon flights at 84 meters elevation.',
    image: '/images/malibu/malibu-3.webp',
    perks: ['Vinyl Classics', 'Bourbon Flights', 'Gourmet Tapas'],
  },
  {
    id: 'chill-thu',
    eventNumber: '04',
    dayTime: 'Thursday • 6:30 PM',
    title: 'Chill Out Thursday',
    tagline: 'Acoustic Sunset Sessions & Truffle Pizzas',
    badge: 'SUNSET LOUNGE',
    desc: 'Acoustic golden hour sessions, deep ambient lounge beats, and woodfired gourmet bites in private draped cabanas.',
    image: '/images/malibu/malibu-1.webp',
    perks: ['Live Acoustic Guitarist', 'Sunset Happy Hour', 'Woodfired Truffle Pizza'],
  },
  {
    id: 'ladies-night',
    eventNumber: '05',
    dayTime: 'Wednesday • 7:00 PM',
    title: 'Ladies Night',
    tagline: 'Artisanal Sangria & Commercial Dance Beats',
    badge: 'EXCLUSIVE',
    desc: 'Complimentary artisanal cocktails for the ladies, neon glam aesthetics, and commercial dance grooves.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Complimentary Craft Sangria', 'Glam Photo Studio', 'Commercial Anthems'],
  },
  {
    id: 'throwback-tue',
    eventNumber: '06',
    dayTime: 'Tuesday • 6:30 PM',
    title: 'Throwback Tuesday',
    tagline: 'Old-School RnB & Skyline Conversations',
    badge: 'RNB CLASSICS',
    desc: "Old-school jams, RnB beats, and relaxed evening conversations overlooking Gorakhpur's twinkling skyline.",
    image: '/images/malibu/malibu-3.webp',
    perks: ['90s/2000s Tracks', 'Craft Beer Buckets', 'Comfort Bar Food'],
  },
  {
    id: 'garba-groove',
    eventNumber: '07',
    dayTime: 'Festive Event',
    title: 'Garba Groove',
    tagline: 'Rhythmic Folk Dhol & Festive Spreads',
    badge: 'RADIANT DAY',
    desc: 'Vibrant cultural celebration, rhythmic folk dhol beats, festive attire, and signature culinary spreads on our expansive rooftop lawn.',
    image: '/images/hotel/hotel-1.webp',
    perks: ['Live Folk Percussion', 'Traditional Cuisine', 'VIP Lawn Seating'],
  },
  {
    id: 'prince-jordan',
    eventNumber: '08',
    dayTime: 'Live Concert',
    title: 'Prince Jordan Showcase',
    tagline: 'Celebrity Live Vocals & Degustation',
    badge: 'RADIANT DAY',
    desc: 'Exclusive celebrity live vocal showcase, soulful acoustic melodies, and VIP outdoor lawn experience under open skies.',
    image: '/images/malibu/malibu-1.webp',
    perks: ['Celebrity Vocals', 'Front Row Tables', 'Chef Degustation'],
  },
  {
    id: 'aerial-act',
    eventNumber: '09',
    dayTime: 'Night Spectacle',
    title: 'Aerial Silk Spectacle',
    tagline: 'Gravity-Defying Silk Choreography',
    badge: 'RADIANT DAY',
    desc: 'Breathtaking aerial acrobatics, gravity-defying silk choreography, and awe-inspiring resort entertainment under starry skies.',
    image: '/images/malibu/malibu-2.webp',
    perks: ['Acrobatic Silk Performers', 'Champagne Welcome', 'Gourmet Buffet'],
  },
];

// VIP Privileges for Cabana Experience
const VIP_PRIVILEGES = [
  'Fast-track skyline elevator access',
  'Custom tasting menus',
  'Premium celebration decor',
  'Private ambient warming lamps for chilly skyline evenings',
  'Personal VIP butler & dedicated bottle service',
];

// The 4 Major Stages of the Cinematic Experience
const MAJOR_STAGES = [
  { id: 'hero', label: 'SKYLINE HERO', targetProgress: 0.0 },
  { id: 'celebrations', label: 'CELEBRATION CAROUSEL', targetProgress: 1.0 },
  { id: 'cabana', label: 'VIP CABANA EXPERIENCE', targetProgress: 10.0 },
  { id: 'concierge', label: 'CONCIERGE & FOOTER', targetProgress: 11.0 },
];

export default function MalibuPage({ onOpenBooking }) {
  // Navigation & Scroll State
  const targetProgressRef = useRef(0.0);
  const currentProgressRef = useRef(0.0);
  const animFrameRef = useRef(null);

  const [smoothProgress, setSmoothProgress] = useState(0.0);
  const [activeStageId, setActiveStageId] = useState('hero');

  // Total Progress Scale:
  // 0.0 = Hero
  // 1.0 to 9.0 = The 9 Events of the Hanging Carousel (1.0 = Event 0, 9.0 = Event 8)
  // 10.0 = VIP Cabana Experience
  // 11.0 = Grand Malibu Concierge Footer
  const MAX_PROGRESS = 11.0;

  // Jump to specific progress point
  const jumpToProgress = (val) => {
    targetProgressRef.current = Math.max(0.0, Math.min(MAX_PROGRESS, val));
    playClickSound();
  };

  // 2. SCROLL CONTROLLER
  useEffect(() => {
    const SENSITIVITY = 0.0022;

    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetProgressRef.current = Math.max(
        0.0,
        Math.min(MAX_PROGRESS, targetProgressRef.current + delta * SENSITIVITY)
      );
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaX = touchStartX - e.touches[0].clientX;
        const deltaY = touchStartY - e.touches[0].clientY;
        const dominant = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        targetProgressRef.current = Math.max(
          0.0,
          Math.min(MAX_PROGRESS, targetProgressRef.current + dominant * 0.005)
        );
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        targetProgressRef.current = Math.min(MAX_PROGRESS, Math.floor(targetProgressRef.current + 1.0));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        targetProgressRef.current = Math.max(0.0, Math.ceil(targetProgressRef.current - 1.0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    let isRunning = true;
    const updateLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.16;

      const smoothed = currentProgressRef.current;
      setSmoothProgress(smoothed);

      // Determine major active stage for navigation indicators
      if (smoothed < 0.6) {
        setActiveStageId('hero');
      } else if (smoothed <= 9.4) {
        setActiveStageId('celebrations');
      } else if (smoothed <= 10.4) {
        setActiveStageId('cabana');
      } else {
        setActiveStageId('concierge');
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Current active event index inside the carousel (0 to 8)
  const currentEventIdx = useMemo(() => {
    if (smoothProgress < 1.0) return 0;
    if (smoothProgress > 9.0) return 8;
    return Math.max(0, Math.min(8, Math.round(smoothProgress - 1.0)));
  }, [smoothProgress]);

  // Interpolated progress of carousel events (0.0 to 8.0)
  const carouselOffset = smoothProgress - 1.0;

  // 3. STAGE VISIBILITY HELPERS
  // Stage A: Skyline Hero
  const heroStyle = useMemo(() => {
    if (smoothProgress > 1.25) return { display: 'none' };
    const opacity = Math.max(0, 1 - smoothProgress * 1.35);
    const translateY = smoothProgress * -35;
    return {
      opacity,
      transform: `translate3d(0px, ${translateY}px, 0px) scale(${Math.max(0.9, 1 - smoothProgress * 0.08)})`,
      pointerEvents: smoothProgress < 0.4 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  // Stage B: Three-Card Hanging Carousel Container
  const carouselContainerStyle = useMemo(() => {
    if (smoothProgress < 0.25 || smoothProgress > 9.85) return { display: 'none' };
    let opacity = 1.0;
    let translateY = 0;
    if (smoothProgress < 1.0) {
      opacity = Math.max(0, (smoothProgress - 0.25) / 0.75);
      translateY = (1.0 - smoothProgress) * 30;
    } else if (smoothProgress > 9.0) {
      opacity = Math.max(0, 1 - (smoothProgress - 9.0) * 1.3);
      translateY = (smoothProgress - 9.0) * -30;
    }
    return {
      opacity,
      transform: `translate3d(0px, ${translateY}px, 0px)`,
      pointerEvents: smoothProgress >= 0.5 && smoothProgress <= 9.5 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  // Stage 3: Private VIP Cabana Experience (progress: 10.0)
  const cabanaStyle = useMemo(() => {
    const diff = smoothProgress - 10.0;
    const absDiff = Math.abs(diff);
    if (absDiff > 1.15) return { display: 'none' };
    const opacity = Math.max(0, Math.min(1, 1 - absDiff * 1.35));
    const translateY = diff * 30;
    return {
      opacity,
      transform: `translate3d(0px, ${translateY}px, 0px) scale(${Math.max(0.88, 1 - absDiff * 0.12)})`,
      pointerEvents: absDiff < 0.45 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  // Stage 4: Grand Malibu Concierge Footer — Slides Up from Down to Cover Whole Screen Below Navbar (progress: 11.0)
  const footerStyle = useMemo(() => {
    if (smoothProgress < 9.85) return { display: 'none' };
    // Progress between 10.0 (VIP Cabana) and 11.0 (Concierge Footer)
    const t = Math.max(0, Math.min(1, (smoothProgress - 10.0) / 1.0));
    // Slide up from bottom: when t = 0 (progress 10.0), translateY is 100% (off-screen below).
    // When t = 1 (progress 11.0), translateY is 0% (locked full screen below navbar).
    const translateYPercent = (1.0 - t) * 100;
    const opacity = Math.min(1, t * 1.5);
    return {
      opacity,
      transform: `translate3d(0px, ${translateYPercent.toFixed(2)}%, 0px)`,
      pointerEvents: t > 0.5 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  return (
    <div className="relative h-screen w-full bg-[#070D0B] text-white flex flex-col justify-between items-center select-none overflow-hidden">
      {/* =========================================================================
          BRIGHT CINEMATIC SUNSET 3D BACKGROUND (GOLDEN-HOUR HALO, SKYLINE & ARCS)
         ========================================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B17] via-[#4A2B22] to-[#1C120F] pointer-events-none z-0">
        {/* Interactive 3D Golden-Hour Environment */}
        <Malibu3DEnvironment progress={smoothProgress} activeStage={activeStageId} />

        {/* Ambient Golden-Hour Sunset Glow */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[450px] sm:h-[550px] bg-gradient-to-r from-[#E89A62]/20 via-[#F1C6A3]/28 to-[#E89A62]/20 blur-[140px] rounded-full pointer-events-none transform-gpu" />

        {/* Cinematic Stage Contrast Scrim: Preserves rich sunset depth while ensuring cards pop with crystal clarity */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#0A0706] via-[#0A0706]/75 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          STAGE 1: SKYLINE HERO & AMBIENT SUNSET HALO (progress: 0.0)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[76px] sm:top-[84px] bottom-3 sm:bottom-6 flex items-center justify-center px-3 sm:px-6 z-20 will-change-transform"
        style={heroStyle}
      >
        <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#07100D]/96 backdrop-blur-2xl border-2 border-[#D6B878]/50 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-4 sm:p-6 lg:p-7 text-center overflow-hidden flex flex-col justify-between h-auto max-h-[450px] min-h-[340px] my-auto ring-1 ring-[#E6A84A]/30">
          {/* Elevation Badge */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D6B878]/20 backdrop-blur-md border border-[#D6B878]/60 text-[#D6B878] font-sans font-black text-[10px] sm:text-xs uppercase tracking-[0.25em] shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E6A84A]" />
              <span>84 METERS ELEVATION • GORAKHPUR SKYLINE ROOFTOP</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-md">
              Malibu Rooftop Bar & Restaurant
            </h1>
          </div>

          {/* Signature Tagline with Sunset Halo */}
          <div className="relative max-w-2xl mx-auto py-2 px-4 my-1">
            <div
              className="absolute inset-0 -inset-x-4 -inset-y-1 bg-gradient-to-r from-[#C82E32]/30 via-[#C82E32]/70 to-[#C82E32]/30 blur-lg rounded-xl pointer-events-none"
              aria-hidden="true"
            />
            <p className="relative z-10 text-xs sm:text-sm lg:text-[14px] text-white font-sans font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)] line-clamp-3 sm:line-clamp-none">
              Perched atop The Radiant Hotel at 84 meters, Malibu is Gorakhpur's premier open-air nightlife, woodfired gastronomy, and celebration hotspot — featuring private draped cabanas, artisanal smoked mixology, and panoramic sunset skyline beats.
            </p>
          </div>

          {/* 4-Metric Quick Stat Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full pt-1">
            <div className="p-2.5 bg-black/75 rounded-xl border border-[#D6B878]/40 shadow-md backdrop-blur-md">
              <span className="text-lg sm:text-xl font-serif font-black text-[#D6B878] block">84M</span>
              <span className="text-[9.5px] sm:text-[10.5px] font-sans font-bold uppercase tracking-wider text-stone-200">Skyline Elevation</span>
            </div>
            <div className="p-2.5 bg-black/75 rounded-xl border border-[#D6B878]/40 shadow-md backdrop-blur-md">
              <span className="text-lg sm:text-xl font-serif font-black text-[#D6B878] block">09</span>
              <span className="text-[9.5px] sm:text-[10.5px] font-sans font-bold uppercase tracking-wider text-stone-200">Weekly Celebrations</span>
            </div>
            <div className="p-2.5 bg-black/75 rounded-xl border border-[#D6B878]/40 shadow-md backdrop-blur-md">
              <span className="text-lg sm:text-xl font-serif font-black text-[#D6B878] block">VIP</span>
              <span className="text-[9.5px] sm:text-[10.5px] font-sans font-bold uppercase tracking-wider text-stone-200">Private Cabanas</span>
            </div>
            <div className="p-2.5 bg-black/75 rounded-xl border border-[#D6B878]/40 shadow-md backdrop-blur-md">
              <span className="text-lg sm:text-xl font-serif font-black text-[#D6B878] block">6 PM</span>
              <span className="text-[9.5px] sm:text-[10.5px] font-sans font-bold uppercase tracking-wider text-stone-200">Sunset Onwards</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-1.5 flex items-center justify-center gap-3">
            <button
              onClick={() => jumpToProgress(1.0)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D6B878] via-[#E6A84A] to-[#D6B878] hover:from-white hover:to-white text-[#070D0B] font-sans font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(230,168,74,0.4)] hover:scale-105"
            >
              <span>Explore 9 Celebration Nights</span>
              <ArrowRight className="w-4 h-4 text-[#070D0B]" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 2: THREE-CARD HANGING CELEBRATION CAROUSEL (progress: 1.0 to 9.0)
          THE SIGNATURE ROOFTOP INSTALLATION — HIGH CONTRAST & FULL DETAILS
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[76px] sm:top-[84px] bottom-3 sm:bottom-6 flex flex-col items-center justify-center px-3 sm:px-6 z-20 will-change-transform"
        style={carouselContainerStyle}
      >
        {/* Section Heading & Active Event Title */}
        <div className="text-center mb-1.5 sm:mb-2 shrink-0">
          <span className="text-[10px] sm:text-[11px] font-sans font-black uppercase tracking-[0.25em] text-[#D6B878] flex items-center justify-center gap-1.5 drop-shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E6A84A]" />
            <span>WEEKLY CELEBRATION NIGHTS & CONCERTS</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {MALIBU_EVENTS[currentEventIdx]?.title}
          </h2>
        </div>

        {/* The Hanging Suspension Installation Area */}
        <div className="relative w-full max-w-5xl h-[52vh] max-h-[430px] min-h-[340px] flex items-center justify-center overflow-visible">
          {/* 5.1 THE GENTLY WAVY GOLDEN SUSPENSION WIRE (SVG PATH) */}
          <div className="absolute top-1 sm:top-2 inset-x-0 h-7 pointer-events-none z-30">
            <svg
              viewBox="0 0 1200 28"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(230,168,74,0.7)]"
            >
              <defs>
                <linearGradient id="wavyGoldWire" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D6B878" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#E6A84A" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1.0" />
                  <stop offset="75%" stopColor="#E6A84A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D6B878" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d="M 0 10 Q 300 18, 600 12 T 1200 14"
                stroke="url(#wavyGoldWire)"
                strokeWidth="2.0"
                fill="none"
              />
            </svg>

            {/* Warm Edison Light Bulbs with Soft Amber Halos */}
            {[120, 320, 520, 680, 880, 1080].map((xPos, idx) => (
              <div
                key={`edison-${idx}`}
                className="absolute top-2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                style={{ left: `${(xPos / 1200) * 100}%` }}
              >
                <div className="w-1.5 h-1.5 bg-[#D6B878] rounded-full" />
                <div className="w-2.5 h-3 rounded-full bg-gradient-to-b from-white via-[#E6A84A] to-[#D6B878] shadow-[0_0_14px_rgba(230,168,74,1)] border border-[#E6A84A]" />
              </div>
            ))}
          </div>

          {/* 5.2 & 5.3 THREE INDEPENDENT HANGING CARDS (LEFT, CENTER, RIGHT) */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {MALIBU_EVENTS.map((evt, idx) => {
              const offset = idx - carouselOffset;
              const absOffset = Math.abs(offset);

              if (absOffset > 1.55) return null;

              const CARD_SPREAD = 335;
              const translateX = offset * CARD_SPREAD;

              const centerFactor = Math.max(0, 1 - absOffset);
              const isCenter = absOffset < 0.45;

              // Center card: razor sharp, full opacity, full scale
              // Side cards: gently softened (blur 1.2px, opacity 0.70) so they remain clearly readable & identifiable!
              const scale = 0.88 + centerFactor * 0.14;
              const opacity = 0.70 + centerFactor * 0.30;
              const blur = (1 - centerFactor) * 1.2;
              const sway = offset * -2.5 + Math.sin(smoothProgress * 2.0 + idx) * 0.7;

              return (
                <div
                  key={evt.id}
                  onClick={() => !isCenter && jumpToProgress(1.0 + idx)}
                  className={`absolute w-[280px] sm:w-[320px] lg:w-[345px] h-[48vh] max-h-[405px] min-h-[335px] transition-all duration-100 ease-out will-change-transform ${
                    isCenter ? 'z-30 pointer-events-auto cursor-default' : 'z-10 pointer-events-auto cursor-pointer hover:opacity-100'
                  }`}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, 0px) scale(${scale.toFixed(3)}) rotateZ(${sway.toFixed(2)}deg)`,
                    filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
                    opacity: opacity.toFixed(3),
                  }}
                >
                  {/* TWO VERTICAL BRAIDED SUSPENSION CABLES */}
                  <div className="absolute -top-5 inset-x-6 flex justify-between pointer-events-none z-20">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full border-2 border-[#D6B878] bg-[#070D0B] shadow-[0_0_8px_#E6A84A]" />
                      <div className="w-[1.5px] h-5 bg-gradient-to-b from-[#D6B878] via-[#F4EFE5] to-[#E6A84A]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D6B878] border border-black -mt-0.5 shadow-sm" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full border-2 border-[#D6B878] bg-[#070D0B] shadow-[0_0_8px_#E6A84A]" />
                      <div className="w-[1.5px] h-5 bg-gradient-to-b from-[#D6B878] via-[#F4EFE5] to-[#E6A84A]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D6B878] border border-black -mt-0.5 shadow-sm" />
                    </div>
                  </div>

                  {/* THE EVENT CARD BODY — HIGH CONTRAST SOLID LUXURY GLASS */}
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                      isCenter
                        ? 'bg-[#07100D] border-2 border-[#D6B878] shadow-[0_25px_80px_rgba(0,0,0,0.95)] ring-2 ring-[#E6A84A]/40'
                        : 'bg-[#07100D]/90 backdrop-blur-xl border border-[#D6B878]/50 shadow-xl'
                    }`}
                  >
                    {/* Center Card Top Illuminated Accent Line */}
                    {isCenter && (
                      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#D6B878] to-transparent absolute top-0 inset-x-0 z-20 shadow-[0_0_15px_#E6A84A]" />
                    )}

                    {/* Card Top Image Banner */}
                    <div className="relative h-24 sm:h-28 w-full overflow-hidden shrink-0">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isCenter ? 'scale-105 brightness-100' : 'scale-100 brightness-[0.85]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07100D] via-black/50 to-transparent" />

                      {/* Event Number & Badge */}
                      <div className="absolute top-2 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-black/90 backdrop-blur-md text-[#D6B878] text-[9px] font-mono font-bold border border-[#D6B878]/50 shadow-sm">
                          EVENT {evt.eventNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md text-stone-200 text-[8.5px] font-sans font-bold tracking-wider uppercase border border-white/30 shadow-sm">
                          {evt.badge || 'MALIBU NIGHT'}
                        </span>
                      </div>

                      {/* Day & Title on Image */}
                      <div className="absolute bottom-1.5 left-3 right-3 text-white">
                        <div className="flex items-center gap-1 text-[#D6B878] text-[9px] sm:text-[10px] font-sans font-black tracking-wider uppercase drop-shadow-sm">
                          <Clock className="w-3 h-3 text-[#E6A84A]" />
                          <span>{evt.dayTime}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] leading-tight">
                          {evt.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Body — Crystal Clear, High-Contrast Typography */}
                    <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        <p className="text-xs sm:text-[13px] font-serif font-bold text-[#E6A84A] tracking-wide mb-1 drop-shadow-sm line-clamp-1">
                          {evt.tagline}
                        </p>
                        <p className="text-[11px] sm:text-xs font-sans text-stone-100 leading-relaxed font-normal line-clamp-2 drop-shadow-sm">
                          {evt.desc}
                        </p>
                      </div>

                      {/* Perks Chips with High Contrast */}
                      <div className="pt-1 border-t border-[#D6B878]/25 space-y-1">
                        <span className="text-[8.5px] sm:text-[9.5px] font-sans font-black uppercase tracking-[0.2em] text-[#D6B878] block">
                          Included VIP Perks:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {evt.perks.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 rounded-md bg-black/80 border border-[#D6B878]/40 text-stone-100 text-[8.5px] sm:text-[9.5px] font-sans font-semibold flex items-center gap-1 shadow-sm"
                            >
                              <span className="text-[#E6A84A] text-[7.5px]">✦</span>
                              <span>{p}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Action */}
                      <div className="pt-1">
                        {isCenter ? (
                          <button
                            onClick={() => {
                              playClickSound();
                              onOpenBooking &&
                                onOpenBooking({ name: `Malibu: ${evt.title}`, price: '₹5,999' });
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-[#D6B878] via-[#E6A84A] to-[#D6B878] hover:from-white hover:to-white text-[#070D0B] font-sans font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(230,168,74,0.4)] hover:scale-[1.02]"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Reserve VIP Table • {evt.title}</span>
                          </button>
                        ) : (
                          <div className="w-full py-1.5 text-center text-[#D6B878] text-[10px] font-sans font-black uppercase tracking-wider">
                            Click to View Event
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 3: PRIVATE VIP CABANA EXPERIENCE (progress: 10.0)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[76px] sm:top-[84px] bottom-3 sm:bottom-6 flex items-center justify-center px-3 sm:px-6 z-20 will-change-transform"
        style={cabanaStyle}
      >
        <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#07100D]/96 backdrop-blur-2xl border-2 border-[#D6B878]/50 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-4 sm:p-6 lg:p-7 overflow-hidden flex flex-col justify-between h-auto max-h-[450px] min-h-[340px] my-auto ring-1 ring-[#E6A84A]/30">
          {/* Header */}
          <div className="border-b border-[#D6B878]/30 pb-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-[#D6B878] flex items-center gap-1.5 justify-center sm:justify-start">
                <Star className="w-3.5 h-3.5 text-[#E6A84A]" />
                <span>EXCLUSIVE SKYLINE SANCTUARY</span>
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878]">
                Private Draped Cabana Experience
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6B878]/20 border border-[#D6B878]/50 text-[#D6B878] text-[10px] font-bold font-sans shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E6A84A]" />
              <span>Ambient Warming Lamps & Dedicated Butler</span>
            </div>
          </div>

          {/* 2-Column Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto py-1">
            {/* Left: Perks & Privileges */}
            <div className="md:col-span-7 space-y-2">
              <p className="text-xs sm:text-sm font-sans text-stone-100 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                Elevate your celebration in our signature draped cabanas perched right along the 84-meter rooftop edge. Fitted with ambient warming lamps for cool skyline evenings and discrete butler service.
              </p>

              <div className="space-y-1.5 pt-1">
                {VIP_PRIVILEGES.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-sans text-stone-100">
                    <Check className="w-4 h-4 text-[#D6B878] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Cabana Picture Card */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[220px] sm:max-w-[250px] aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#D6B878]/50 shadow-xl relative group">
                <img
                  src="/images/malibu/malibu-1.webp"
                  alt="Malibu Sky Cabana"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-center">
                  <span className="text-[10px] font-serif font-black text-[#D6B878] uppercase block">THE SKY CABANA EXPERIENCE</span>
                  <span className="text-[9px] font-sans text-stone-200 font-bold">Panoramic Gorakhpur City Lights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-2 border-t border-[#D6B878]/30 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs font-sans text-stone-200">
              Cabanas accommodate up to 8 guests. Advance reservation recommended.
            </span>
            <button
              onClick={() => {
                playClickSound();
                onOpenBooking &&
                  onOpenBooking({ name: 'Malibu VIP Draped Cabana', price: '₹5,999' });
              }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D6B878] via-[#E6A84A] to-[#D6B878] hover:from-white hover:to-white text-[#070D0B] font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Reserve VIP Cabana
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 5: GRAND MALIBU CONCIERGE AND FOOTER (progress: 12.0)
          FULL SCREEN BELOW NAVBAR — SLIDES UP FROM DOWN
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[72px] sm:top-[76px] bottom-0 z-40 bg-[#07100D]/98 backdrop-blur-3xl border-t-2 border-[#D6B878] shadow-[0_-30px_100px_rgba(0,0,0,0.95)] flex flex-col justify-between will-change-transform overflow-y-auto lg:overflow-hidden select-none px-4 sm:px-8 lg:px-14 py-4 sm:py-6 lg:py-8"
        style={footerStyle}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between h-full space-y-4 sm:space-y-6">
          {/* Top Header Section */}
          <div className="border-b border-[#D6B878]/30 pb-3 sm:pb-4 flex flex-col items-center sm:items-start text-center sm:text-left shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6B878]/20 border border-[#D6B878]/50 text-[#D6B878] text-[10px] sm:text-xs font-bold font-sans uppercase tracking-[0.2em] mb-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E6A84A]" />
              <span>84 METERS ELEVATION • GORAKHPUR SKYLINE ROOFTOP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EFE5] to-[#D6B878] tracking-tight">
              Malibu Rooftop Bar & Lounge
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-200 mt-1 flex items-center gap-2 justify-center sm:justify-start">
              <MapPin className="w-4 h-4 text-[#E6A84A] shrink-0" />
              <span>The Radiant Hotel & Resort • Medical College Road, Gorakhpur • Daily 6:00 PM – 12:00 Midnight</span>
            </p>
          </div>

          {/* Middle Showcase Section: 2 Expansive Concierge Glass Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full gap-4 sm:gap-6 my-auto py-2">
            {/* Direct Hotline Tile */}
            <div className="bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-[#D6B878]/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all shadow-lg group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E6A84A] to-amber-900 border border-[#D6B878]/50 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D6B878] block tracking-wider">Direct Concierge Hotline</span>
                  <a
                    href={`tel:${hotelInfo.contact.reservations}`}
                    className="text-lg sm:text-2xl font-serif font-black text-white hover:text-[#D6B878] transition-colors block"
                  >
                    {hotelInfo.contact.reservations}
                  </a>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-sans text-stone-200 leading-relaxed">
                Dedicated table reservations, VIP draped cabana booking, and celebration bottle service.
              </p>
            </div>

            {/* Operating Hours Tile */}
            <div className="bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-[#D6B878]/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all shadow-lg group">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E6A84A] to-amber-900 border border-[#D6B878]/50 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D6B878] block tracking-wider">Rooftop Timings</span>
                  <span className="text-lg sm:text-2xl font-serif font-black text-white block">Daily 6:00 PM – Midnight</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-sans text-stone-200 leading-relaxed">
                Sunset golden hour aperitivo from 6:00 PM. High-octane celebration beats until 12:00 Midnight.
              </p>
            </div>
          </div>

          {/* Bottom Navigation & Action Section */}
          <div className="pt-3 border-t border-[#D6B878]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            {/* Copyright */}
            <p className="text-[11px] sm:text-xs font-sans text-stone-200 text-center sm:text-left">
              © {new Date().getFullYear()} Malibu Rooftop Bar & Lounge • The Radiant Hotel & Resort, Gorakhpur
            </p>

            {/* CTAs: Return to Top & Reserve VIP Table */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => jumpToProgress(0.0)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-100 hover:text-white border border-[#D6B878]/40 text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#E6A84A]" />
                <span>Return to Top</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'Malibu VIP Skyline Reservation', price: '₹5,999' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D6B878] via-[#E6A84A] to-[#D6B878] hover:from-white hover:to-white text-[#070D0B] font-sans font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(230,168,74,0.45)] hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve VIP Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
