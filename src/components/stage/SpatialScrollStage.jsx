import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RotateCw,
  Sparkles,
  ArrowRight,
  Compass,
  Wine,
  ChevronRight,
  ChevronLeft,
  Check,
  Crown,
  Utensils,
  Coffee,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCardFlipSound, playChimeSound, playClickSound } from '../../utils/audioEffects';
import HotelLogoMedallion from '../hero/HotelLogoMedallion';
import ScrollChroniclesSection from '../reviews/ScrollChroniclesSection';
import GrandFooterSlide from '../layout/GrandFooterSlide';
import LiquidChromeDiningBackground from '../background3d/LiquidChromeDiningBackground';
import BrightCulinaryAtelierBackground from '../background3d/BrightCulinaryAtelierBackground';
import KineticTypographyBackground from '../background3d/KineticTypographyBackground';
import FitnessArchitecturalBackground from '../background3d/FitnessArchitecturalBackground';
import FitnessSectionContent from '../fitness/FitnessSectionContent';
import VedicSpaSpatialCanvas from '../wellness/VedicSpaSpatialCanvas';

// SUITES DATA FOR 3D PACK STAGE - AUTHENTIC THE RADIANT ROOMS & SUITES
const SUITES = [
  {
    id: 'deluxe-pool-view',
    name: 'Deluxe Room (Pool View & Balcony)',
    watermark: 'DELUXE',
    tagline: 'Private Balcony Overlooking the Pool',
    frontImages: [
      { label: 'Pool View Balcony', src: '/images/rooms/deluxe-room/deluxe-1.webp' },
      { label: 'King Bed Sanctuary', src: '/images/rooms/deluxe-room/deluxe-2.webp' },
      { label: 'Sofa Seating Lounge', src: '/images/rooms/deluxe-room/deluxe-3.webp' },
    ],
    price: '₹4,999',
    period: 'per night',
    size: '322 sq. ft',
    capacity: '1–2 Persons',
    view: 'Private Balcony Overlooking Pool',
    badge: 'POOL VIEW & BALCONY',
    baseAngle: -2.0,
    accentGlow: 'from-blue-100/40 to-cyan-200/30',
    frontHighlights: [
      'Private Balcony Overlooking Swimming Pool',
      'Comfortable King-Size Bed & Cosy Sofa Seating',
      'Ample Natural Light & Modern Furnished Interiors',
      'Complimentary Breakfast & High-Speed WiFi',
    ],
    backSpecs: [
      { label: 'Dimensions', val: '322 sq. ft with Private Balcony' },
      { label: 'Bedding', val: 'Plush King-Size Bed & Sofa Lounge' },
      { label: 'Guest Capacity', val: '1–2 Persons' },
      { label: 'Amenities', val: 'Pool, Spa, Bar & Restaurant, Free Parking' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Before 12:00 Noon' },
    ],
    secretNote: 'Enjoy a relaxing stay with a private balcony overlooking the swimming pool, perfect for unwinding in natural light.',
  },
  {
    id: 'executive-room',
    name: 'Executive Room',
    watermark: 'EXECUTIVE',
    tagline: 'Elevated Space for Business & Leisure',
    frontImages: [
      { label: 'Executive Workspace', src: '/images/rooms/executive-room/executive-1.webp' },
      { label: 'Plush King Bed', src: '/images/rooms/executive-room/executive-2.webp' },
      { label: 'Modern Bathroom', src: '/images/rooms/executive-room/executive-3.webp' },
    ],
    price: '₹5,499',
    period: 'per night',
    size: '300 sq. ft',
    capacity: '1–2 Persons',
    view: 'Gorakhpur Landmark Landscape',
    badge: 'EXECUTIVE CLASS',
    baseAngle: 2.0,
    accentGlow: 'from-amber-100/40 to-stone-200/30',
    frontHighlights: [
      'Luxurious King Bed & Dedicated Work Desk',
      'Comfortable Seating for Relaxation or Productivity',
      'Mini Refrigerator, Tea/Coffee Maker & AC',
      '24-Hour Room Service & Premium Toiletries',
    ],
    backSpecs: [
      { label: 'Dimensions', val: '300 sq. ft Room' },
      { label: 'Bedding', val: 'Luxurious King Bed' },
      { label: 'Kids & Family', val: 'Kids up to 5 years stay free!' },
      { label: 'Extra Bed', val: 'Rollaway Bed available @ ₹999/day' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Express Check-out 12:00 PM' },
    ],
    secretNote: 'Designed for guests who appreciate extra space, style, and productivity with modern fittings.',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite Room',
    watermark: 'EXEC SUITE',
    tagline: 'Separate Living Area & Master Bedroom',
    frontImages: [
      { label: 'Separate Living Suite', src: '/images/rooms/executive-suite/executive-suite-1.webp' },
      { label: 'Master Bedroom', src: '/images/rooms/executive-suite/executive-suite-2.webp' },
      { label: 'Modern Ensuite', src: '/images/rooms/executive-suite/executive-suite-3.webp' },
    ],
    price: '₹7,499',
    period: 'per night',
    size: '300 sq. ft',
    capacity: '1–2 Persons',
    view: 'Panoramic Resort Vista',
    badge: 'DUAL-ZONE SUITE',
    baseAngle: -1.5,
    accentGlow: 'from-emerald-100/40 to-emerald-200/30',
    frontHighlights: [
      'Separate Living Room & Private Bedroom',
      'Dedicated Seating Area for Informal Meetings',
      'Mini Refrigerator, Tea/Coffee Maker & Ample Storage',
      'Modern Fittings, Fresh Towels & 24h In-Room Dining',
    ],
    backSpecs: [
      { label: 'Layout Architecture', val: 'Separate Living Area + Spacious Bedroom' },
      { label: 'Bedding', val: 'Plush King-Size Bed & Stylish Furnishings' },
      { label: 'Children Privilege', val: 'Kids up to 5 stay free!' },
      { label: 'Extra Bedding', val: 'Rollaway Bed available @ ₹999/day' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Before 12:00 Noon' },
    ],
    secretNote: 'Experience superior comfort and sophistication — perfect for extended stays, business dignitaries, or extra luxury.',
  },
];

// REALMS DATA FOR STAGE 2 (BRIGHT LUXURY PALETTES WITH HIGH-CONTRAST TEXT)
const REALMS = [
  {
    id: 'malibu',
    bigText: 'MALIBU',
    subtitle: 'Malibu Party Starts From Here',
    accentColor: 'bg-gradient-to-br from-[#FFF6F3] via-[#FFF1EB] to-[#FFEBE3]',
    textColor: 'text-rose-950/[0.06]',
    tag: 'MALIBU PARTY STARTS FROM HERE',
    image: '/images/malibu/malibu-1.webp',
    description: 'Elevated rooftop culinary drama and nightlife at 84 meters. Themed nights like Bollywood Sunday, Filmy Shanivar, and Golden Era Friday with sunset cabanas and craft mixology.',
  },
  {
    id: 'seven-scentric',
    bigText: 'DINING',
    subtitle: 'The Seven Scentric Fine Dining',
    accentColor: 'bg-gradient-to-br from-[#FAF8F5] via-[#F5EFE6] to-[#EFE5D5]',
    textColor: 'text-amber-950/[0.06]',
    tag: 'AN EXPERIENCE FOR THE SENSES',
    image: '/images/dining/dining-1.webp',
    description: '4-star fine dining where culinary artistry and opulent surroundings converge. Serving daily breakfast, lunch, and dinner, with an open terrace strictly for drinks.',
  },
  {
    id: 'sanctuary',
    bigText: 'ROOMS',
    subtitle: '6 Curated Rooms & Suites',
    accentColor: 'bg-gradient-to-br from-[#F2F9F5] via-[#ECF6F0] to-[#E3F2E9]',
    textColor: 'text-emerald-950/[0.06]',
    tag: 'DELUXE POOL VIEW TO GRANDEUR',
    image: '/images/rooms/deluxe-room/deluxe-1.webp',
    description: 'Deluxe Room with Pool View Balcony, Executive, Deluxe Suites, Grandeur, and Standard rooms with king beds, 24-hr room service, and complimentary pool & breakfast access.',
  },
  {
    id: 'vedic',
    bigText: 'SPA & SALON',
    subtitle: 'Vedic Spa & Salon Wellness',
    accentColor: 'bg-gradient-to-br from-[#FAF6EE] via-[#F6EFE0] to-[#EFE4CF]',
    textColor: 'text-amber-950/[0.06]',
    tag: 'AYURVEDIC RESTORATION & SALON',
    image: '/images/wellness/wellness-card.webp',
    description: 'Authentic Ayurvedic lineage therapies, Dhanwantari warm herbal oils, and full-service salon grooming for relaxation, rejuvenating retreats, and celebrations.',
  },
];

const STAGE_TITLES = [
  '01 REGAL OPENING',
  '02 ROOMS & SUITES',
  '03 KINETIC REALMS',
  '04 MALIBU PARTY',
  '05 THE SEVEN SCENTRIC',
  '06 FITNESS CENTER',
  '07 GUEST CHRONICLES',
  '08 GRAND FOOTER',
];

// Map 8 major navigation milestones to continuous timeline progress steps
const STAGE_TO_PROGRESS_MAP = [
  0.0,  // 0: Regal Opening
  1.0,  // 1: Rooms & Suites Deck (Room 1)
  5.0,  // 2: Kinetic Realms
  6.0,  // 3: Malibu Party Starts From Here
  7.0,  // 4: The Seven Scentric Dining
  8.0,  // 5: Modern Fitness Center
  9.0,  // 6: Guest Chronicles
  14.0, // 7: Grand Hotel Footer
];

// Distinct 3D exit and entrance trajectories across all 6 spatial directions (60° hex radial sectors)
// Calibrated in smooth review-style pixel distances (360px-420px) with subtle rotation tilts
const CARD_TRAJECTORIES = [
  // Room 0 (Deluxe Room): Exits to West (-400px, 0px), Enters from North (0px, -360px)
  {
    exitX: -400,
    exitY: 0,
    exitRot: -18,
    enterX: 0,
    enterY: -360,
    enterRot: 6,
  },
  // Room 1 (Executive Room): Exits to North-East (+360px, -280px), Enters from East (+400px, 0px)
  {
    exitX: 360,
    exitY: -280,
    exitRot: 20,
    enterX: 400,
    enterY: 0,
    enterRot: 10,
  },
  // Room 2 (Executive Suite): Exits to South-East (+360px, +280px), Enters from South-West (-360px, +280px)
  {
    exitX: 360,
    exitY: 280,
    exitRot: 22,
    enterX: -360,
    enterY: 280,
    enterRot: -14,
  },
  // Room 3 (Deluxe Suite): Exits to South (0px, +380px), Enters from North-West (-360px, -280px)
  {
    exitX: 0,
    exitY: 380,
    exitRot: -16,
    enterX: -360,
    enterY: -280,
    enterRot: -12,
  },
  // Room 4 (Grandeur Room): Exits to North-West (-360px, -280px), Enters from South-East (+360px, +280px)
  {
    exitX: -360,
    exitY: -280,
    exitRot: -22,
    enterX: 360,
    enterY: 280,
    enterRot: 14,
  },
  // Room 5 (Standard Room): Exits to South-West (-360px, +280px), Enters from West (-400px, 0px)
  {
    exitX: -360,
    exitY: 280,
    exitRot: 18,
    enterX: -400,
    enterY: 0,
    enterRot: -10,
  },
];

/**
 * computeReviewCardMotion
 * 
 * Unified smooth card motion engine calibrated directly from the
 * user-acclaimed ScrollChroniclesSection (Guest Reviews).
 * - Generous central DWELL plateau (100% still, readable, zero jitter).
 * - S-curve cubic Hermite ease (t * t * (3 - 2 * t)) for both entrance & exit.
 * - Organic sweeping trajectory with rotational tilt and scale compression.
 * - Smooth opacity fade (Math.max(0, 1 - ease * 1.25)) preventing pop-in / collisions.
 */
function computeReviewCardMotion(delta, DWELL = 0.28, cfg = {}) {
  const absDelta = Math.abs(delta);
  const isCentered = absDelta <= DWELL;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Mobile optimization: smooth, visible vertical glide without extreme offscreen flinging
  const enterX = isMobile ? 0 : (cfg.enterX ?? -340);
  const enterY = isMobile ? (cfg.enterY ? Math.sign(cfg.enterY) * 110 : 110) : (cfg.enterY ?? 170);
  const enterRot = isMobile ? 3 : (cfg.enterRot ?? -12);
  const enterScale = cfg.enterScale ?? 0.16;

  const exitX = isMobile ? 0 : (cfg.exitX ?? -360);
  const exitY = isMobile ? (cfg.exitY ? Math.sign(cfg.exitY) * -130 : -130) : (cfg.exitY ?? -200);
  const exitRot = isMobile ? -3 : (cfg.exitRot ?? 15);
  const exitScale = cfg.exitScale ?? 0.18;

  let x = 0;
  let y = 0;
  let rot = cfg.baseRot ?? 0;
  let scale = 1.0;
  let opacity = 1.0;

  if (isCentered) {
    x = 0;
    y = 0;
    rot = cfg.baseRot ?? 0;
    scale = 1.0;
    opacity = 1.0;
  } else if (delta < -DWELL) {
    const t = Math.min(1.0, (-delta - DWELL) / (1.0 - DWELL));
    const easeT = t * t * (3 - 2 * t);
    x = enterX * easeT;
    y = enterY * easeT;
    rot = (cfg.baseRot ?? 0) + enterRot * easeT;
    scale = 1.0 - enterScale * easeT;
    // 100% Solid & Clear: Only soften at outer perimeter edge
    opacity = easeT > 0.75 ? Math.max(0, 1.0 - (easeT - 0.75) / 0.25) : 1.0;
  } else {
    const t = Math.min(1.0, (delta - DWELL) / (1.0 - DWELL));
    const easeT = t * t * (3 - 2 * t);
    x = exitX * easeT;
    y = exitY * easeT;
    rot = (cfg.baseRot ?? 0) + exitRot * easeT;
    scale = 1.0 - exitScale * easeT;
    // 100% Solid & Clear: Only soften at outer perimeter edge
    opacity = easeT > 0.75 ? Math.max(0, 1.0 - (easeT - 0.75) / 0.25) : 1.0;
  }

  return {
    x,
    y,
    rot,
    scale,
    opacity,
    isCentered,
    transform: `translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg) scale(${scale})`,
  };
}

export default function SpatialScrollStage({ onOpenBooking }) {
  const location = useLocation();
  // UNIFIED CONTINUOUS SPATIAL TIMELINE (0.0 to 13.0)
  // Single continuous scroll journey: zero stops, zero dead-zones, seamless across all sections
  const [globalProgress, setGlobalProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const snapTimeoutRef = useRef(null);
  const lastWheelDirRef = useRef(0);
  const wheelStrokeDeltaRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const hasSteppedInGestureRef = useRef(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const MAX_PROGRESS = 14.0;

  // Room Steps (1.0 to 4.0 across 3 rooms + 1 explore card)
  const ROOM_STEPS = [1.0, 2.0, 3.0, 4.0];

  // Discrete Story Milestones for the Entire Radiant Resort Experience:
  // Every single scroll gesture steps cleanly to the next milestone.
  // When resting at a milestone, progress locks with 0 delta, keeping the section
  // 100% visible, fully interactive, and solidly on screen until the next scroll.
  const ALL_MILESTONES = [
    0.0,  // 0: Regal Opening Hero
    1.0,  // 1: Rooms & Suites - Deluxe Room
    2.0,  // 2: Rooms & Suites - Executive Room
    3.0,  // 3: Rooms & Suites - Executive Suite
    4.0,  // 4: Rooms & Suites - Explore More Rooms
    5.0,  // 5: Vedic Spa & Salon Wellness
    6.0,  // 6: Malibu Rooftop Experience (Firm dwell on screen)
    7.0,  // 7: The Seven Scentric Fine Dining (Firm dwell on screen with 3D Food Universe)
    8.0,  // 8: Modern Fitness Center
    9.0,  // 9: Guest Review Folio 1
    10.0, // 10: Guest Review Folio 2
    11.0, // 11: Guest Review Folio 3
    12.0, // 12: Guest Review Folio 4
    13.0, // 13: Guest Review Folio 5
    14.0, // 14: Grand Hotel Footer
  ];

  // Mobile-Optimized Milestones:
  // Fluid progression through all rooms, amenities, individual review folios, and footer
  const MOBILE_MILESTONES = [
    0.0,  // 0: Regal Opening Hero
    1.0,  // 1: Rooms & Suites - Deluxe Room
    2.0,  // 2: Rooms & Suites - Executive Room
    3.0,  // 3: Rooms & Suites - Executive Suite
    4.0,  // 4: Rooms & Suites - Explore More Rooms
    5.0,  // 5: Vedic Spa & Salon Wellness
    6.0,  // 6: Malibu Rooftop Experience
    7.0,  // 7: The Seven Scentric Fine Dining
    8.0,  // 8: Modern Fitness Center
    9.0,  // 9: Guest Review Folio 1
    10.0, // 10: Guest Review Folio 2
    11.0, // 11: Guest Review Folio 3
    12.0, // 12: Guest Review Folio 4
    13.0, // 13: Guest Review Folio 5
    14.0, // 14: Grand Hotel Footer
  ];

  const lastGestureTimeRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimerRef = useRef(null);

  // Per-Card Angle & Flip State Maps (strictly isolated per room card)
  const [cardAngles, setCardAngles] = useState({});
  const [cardFlipped, setCardFlipped] = useState({});
  const [mobileRoomView, setMobileRoomView] = useState('deck'); // 'deck' | 'metrics' | 'privileges'

  const getCardAngle = (suiteId) => cardAngles[suiteId] ?? 0;
  const setCardAngle = (suiteId, angleIdx) => {
    setCardAngles((prev) => ({ ...prev, [suiteId]: angleIdx }));
  };

  const isCardFlipped = (suiteId) => Boolean(cardFlipped[suiteId]);
  const toggleCardFlip = (suiteId) => {
    playCardFlipSound();
    setCardFlipped((prev) => ({ ...prev, [suiteId]: !prev[suiteId] }));
  };

  const [packTilt, setPackTilt] = useState({ x: 0, y: 0 });
  const [isDraggingPack, setIsDraggingPack] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const packRotateRef = useRef({ x: 0, y: 0 });

  // Kinetic Realms State
  const [activeRealmIdx, setActiveRealmIdx] = useState(0);

  // Dining Image Selector State
  const [diningImgIdx, setDiningImgIdx] = useState(0);

  // Classified Vault State
  const [isVaultRevealed, setIsVaultRevealed] = useState(false);

  // Testimonial State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Mobile detection for responsive 3D parallax & layout
  const [isMobileScreen, setIsMobileScreen] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse coordinates globally for 3D parallax (desktop & laptop to prevent touch tremor jitter)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Support direct stage link via ?stage= or ?progress= URL query parameter
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const progParam = params.get('progress');
      if (progParam !== null) {
        const p = parseFloat(progParam);
        if (!isNaN(p)) {
          jumpToProgress(p, true);
          return;
        }
      }
      const stageParam = params.get('stage');
      if (stageParam !== null) {
        const idx = parseInt(stageParam, 10);
        if (!isNaN(idx)) {
          jumpToStage(idx);
        }
      }
    } catch (e) { }
  }, [location.search]);

  // Emit active stage index to navbar as visitor scrolls
  useEffect(() => {
    let stage = 0;
    if (globalProgress >= 7.6) stage = -1;                                // Past Dining (Gym/Chronicles/Footer)
    else if (globalProgress >= 6.6) stage = 4;                            // Dining
    else if (globalProgress >= 5.6) stage = 3;                            // Malibu
    else if (globalProgress >= 4.8) stage = 2;                            // Salon & Spa
    else if (globalProgress >= 0.8) stage = 1;                            // Rooms & Suites
    else stage = 0;                                                       // Overview
    window.dispatchEvent(new CustomEvent('spatial-stage-active', { detail: stage }));
  }, [Math.round(globalProgress * 2) / 2]);

  // Step milestone forward (+1) or backward (-1)
  const stepMilestone = (direction) => {
    const cur = targetProgressRef.current;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const milestones = isMobile ? MOBILE_MILESTONES : ALL_MILESTONES;
    let targetIdx = 0;
    if (direction > 0) {
      const foundIdx = milestones.findIndex((m) => m > cur + 0.15);
      targetIdx = foundIdx !== -1 ? foundIdx : milestones.length - 1;
    } else {
      let foundIdx = -1;
      for (let i = milestones.length - 1; i >= 0; i--) {
        if (milestones[i] < cur - 0.15) {
          foundIdx = i;
          break;
        }
      }
      targetIdx = foundIdx !== -1 ? foundIdx : 0;
    }
    targetProgressRef.current = milestones[targetIdx];
    playClickSound();
  };

  const globalProgressRef = useRef(0);

  // Jump smoothly or instantly to a specific progress position
  const jumpToProgress = (pos, instant = false) => {
    const target = Math.max(0, Math.min(MAX_PROGRESS, pos));
    targetProgressRef.current = target;
    if (instant) {
      setGlobalProgress(target);
      globalProgressRef.current = target;
    }
    lastGestureTimeRef.current = performance.now();
    playClickSound();
  };

  // Instant direct jump to major stage sections (eliminates reverse scrolling or intermediate card rewinding)
  const jumpToStage = (stageIdx) => {
    const target = STAGE_TO_PROGRESS_MAP[stageIdx] ?? 0;
    jumpToProgress(target, true);
  };

  // Jump directly to specific room inside the Sanctuary Deck
  const scrubToRoom = (roomIdx) => {
    const target = ROOM_STEPS[roomIdx] ?? 1.0;
    jumpToProgress(target, true);
  };

  // Silky Smooth Damped RAF Loop for Continuous Playback:
  // Glides smoothly to the target progress in ~240ms with frame-rate independent physics
  // Performs consistently across 30Hz budget phones up to 120Hz ProMotion screens
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(50, Math.max(8, now - lastTime));
      lastTime = now;

      setGlobalProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.0003) {
          if (prev === target) return prev;
          globalProgressRef.current = target;
          return target;
        }
        // Smooth exponential damping calibrated for 240ms settle time across all refresh rates
        const factor = 1 - Math.exp(-dt * 0.012);
        const next = prev + diff * factor;
        globalProgressRef.current = next;
        return next;
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Audio chime when landing on a new milestone
  const lastActiveStepRef = useRef(0);
  useEffect(() => {
    const rounded = Math.round(globalProgress);
    if (rounded !== lastActiveStepRef.current && Math.abs(globalProgress - rounded) < 0.04) {
      lastActiveStepRef.current = rounded;
      playClickSound();
    }
  }, [globalProgress]);

  // DIRECT SCROLL-DRIVEN LISTENER:
  // Moves directly with scroll speed ("according to scroll") and settles smoothly
  useEffect(() => {
    const snapToNearestMilestone = () => {
      const isMobile = window.innerWidth < 768;
      const milestones = isMobile ? MOBILE_MILESTONES : ALL_MILESTONES;
      const c = targetProgressRef.current;
      const dir = lastWheelDirRef.current;
      const strokeDelta = wheelStrokeDeltaRef.current;

      // Reset directional and stroke tracking on settle
      wheelStrokeDeltaRef.current = 0;
      lastWheelDirRef.current = 0;

      // Lock on if already within 0.04 of a milestone
      for (const m of milestones) {
        if (Math.abs(m - c) < 0.04) {
          targetProgressRef.current = m;
          return;
        }
      }

      // Find bounding milestones: prevM <= c <= nextM
      let prevM = milestones[0];
      let nextM = milestones[milestones.length - 1];

      for (let i = 0; i < milestones.length; i++) {
        if (milestones[i] <= c) {
          prevM = milestones[i];
        }
        if (milestones[i] >= c) {
          nextM = milestones[i];
          break;
        }
      }

      if (prevM === nextM) {
        targetProgressRef.current = prevM;
        return;
      }

      // Directional momentum intent with 0.16 threshold:
      if (dir > 0 && (c - prevM >= 0.16 || strokeDelta > 0.10)) {
        targetProgressRef.current = nextM;
        return;
      }

      if (dir < 0 && (nextM - c >= 0.16 || strokeDelta < -0.10)) {
        targetProgressRef.current = prevM;
        return;
      }

      // Settle to mathematically closest milestone
      targetProgressRef.current = (c - prevM < nextM - c) ? prevM : nextM;
    };

    const handleWheel = (e) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30;
      else if (e.deltaMode === 2) delta *= 300;

      const cur = targetProgressRef.current;
      const now = performance.now();
      const elapsedSinceWheel = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Detect end of previous gesture and start of new gesture:
      // If user paused for > 200ms, reset stroke accumulator and step flag
      if (elapsedSinceWheel > 200) {
        wheelStrokeDeltaRef.current = 0;
        hasSteppedInGestureRef.current = false;
      }

      // If currently at the Grand Hotel Footer (cur >= 13.70):
      if (cur >= 13.70) {
        const footerEl = e.target.closest('.footer-scroll-container');
        if (footerEl) {
          // Rolling down to read footer: allow native container scroll
          if (delta > 0) return;
          // Rolling up inside footer: allow native container scroll unless at top
          if (delta < 0 && footerEl.scrollTop > 5) return;
        }
      }

      // Track directional intent and reset step flag if user reverses direction
      const dir = delta > 0 ? 1 : (delta < 0 ? -1 : 0);
      if (dir !== 0) {
        if (lastWheelDirRef.current !== dir) {
          wheelStrokeDeltaRef.current = 0;
          hasSteppedInGestureRef.current = false;
        }
        lastWheelDirRef.current = dir;
      }

      // Enforce hard cooldown between milestone steps (450ms) to absorb all trailing trackpad inertia:
      if (now - lastStepTimeRef.current < 450) {
        wheelStrokeDeltaRef.current = 0;
        return;
      }

      // If this gesture has already stepped a milestone, absorb all remaining wheel events from same gesture:
      if (hasSteppedInGestureRef.current) {
        wheelStrokeDeltaRef.current = 0;
        return;
      }

      // Accumulate stroke delta
      wheelStrokeDeltaRef.current += delta * 0.0036;

      // When intentional scroll threshold is reached (trackpad flick or single mouse wheel notch):
      if (Math.abs(wheelStrokeDeltaRef.current) > 0.16) {
        const stepDir = delta > 0 ? 1 : -1;
        wheelStrokeDeltaRef.current = 0;
        hasSteppedInGestureRef.current = true;
        lastStepTimeRef.current = now;

        stepMilestone(stepDir);
        clearTimeout(snapTimeoutRef.current);
        return;
      }

      // Below threshold: return early to prevent micro-jitter
      return;
    };

    let touchStartY = 0;
    let touchStartInitialY = 0;
    let touchStartTime = 0;
    let touchStartProgress = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const y = e.touches[0].clientY;
        touchStartY = y;
        touchStartInitialY = y;
        touchStartTime = performance.now();
        touchStartProgress = targetProgressRef.current;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const y = e.touches[0].clientY;
        const deltaY = touchStartY - y; // positive = swiping up = scrolling forward
        touchStartY = y;

        const cur = targetProgressRef.current;
        const isMobile = window.innerWidth < 768;

        // If currently at or approaching the Grand Hotel Footer (cur >= 13.60):
        if (cur >= 13.60) {
          const footerEl = e.target.closest('.footer-scroll-container') || document.querySelector('.footer-scroll-container');
          if (footerEl) {
            // Swiping up (scrolling down to read footer content): lock progress at 14.0 and let container scroll naturally
            if (deltaY > 0) {
              targetProgressRef.current = 14.0;
              return;
            }
            // Swiping down (scrolling up inside footer): allow native scroll unless at the very top
            if (deltaY < 0 && footerEl.scrollTop > 5) {
              targetProgressRef.current = 14.0;
              return;
            }
          }
        }

        // Reviews Section Touch Handling (8.5 <= touchStartProgress <= 13.5):
        // Continuous, finger-scrubbed transition where 1 swipe moves at most 1 review card!
        if (touchStartProgress >= 8.5 && touchStartProgress <= 13.5) {
          const reviewSensitivity = 0.0028;
          const step = deltaY * reviewSensitivity;
          const proposed = cur + step;

          // Clamp so that a single touch gesture cannot advance more than 1 card forward or backward:
          targetProgressRef.current = Math.max(
            touchStartProgress - 1.05,
            Math.min(touchStartProgress + 1.05, proposed)
          );
          clearTimeout(snapTimeoutRef.current);
          return;
        }

        // Responsive mobile touch sensitivity: smooth, continuous finger-controlled progression
        const sensitivity = isMobile ? 0.0035 : 0.0036;
        const step = deltaY * sensitivity;
        let nextProgress = cur + step;

        // Coming from Fitness into Reviews: stop cleanly at Folio 1 (9.0)
        if (touchStartProgress < 8.5 && nextProgress > 9.0) {
          nextProgress = 9.0;
        }

        targetProgressRef.current = Math.max(0, Math.min(MAX_PROGRESS, nextProgress));

        // ZERO auto-snap on touch: Cancel any snap timer so progress remains exactly where finger controls it
        clearTimeout(snapTimeoutRef.current);
      }
    };

    const handleTouchEnd = (e) => {
      const isMobile = window.innerWidth < 768;
      const cur = targetProgressRef.current;

      const endY = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : touchStartY;
      const totalDeltaY = touchStartInitialY - endY; // positive = swiped up = advance forward
      const duration = Math.max(1, performance.now() - touchStartTime);
      const velocity = totalDeltaY / duration; // px/ms

      // Special robust guard for Grand Hotel Footer (Milestone 14.0):
      if (touchStartProgress >= 13.60 || cur >= 13.60) {
        const footerEl = e.target.closest('.footer-scroll-container') || document.querySelector('.footer-scroll-container');

        // If the footer is scrolled down, or if the user is swiping down into content, stay locked at 14.0
        if (footerEl && footerEl.scrollTop > 5) {
          targetProgressRef.current = 14.0;
          return;
        }
        if (totalDeltaY > 0) {
          targetProgressRef.current = 14.0;
          return;
        }

        // Only an intentional, deliberate strong pull-down (totalDeltaY < -60) while at scrollTop === 0 retreats:
        if (totalDeltaY < -60 || velocity < -0.6) {
          // Gracefully retreat to the immediately preceding review folio (13.0)
          targetProgressRef.current = 13.0;
          return;
        } else {
          targetProgressRef.current = 14.0;
          return;
        }
      }

      // Reviews Section Touch Release:
      if (touchStartProgress >= 8.5 && touchStartProgress <= 13.5) {
        const speed = Math.abs(velocity);
        if (speed > 0.20) {
          const momentum = Math.sign(velocity) * Math.min(0.20, speed * 0.08);
          const proposed = targetProgressRef.current + momentum;
          targetProgressRef.current = Math.max(
            touchStartProgress - 1.05,
            Math.min(touchStartProgress + 1.05, proposed)
          );
        }
        // ZERO auto-snap on touch: Keep visual composition exactly where finger released it
        clearTimeout(snapTimeoutRef.current);
        return;
      }

      // Natural finger glide on release (subtle physical momentum proportional to flick):
      // Allows smooth flicking without jumping milestones or skipping intermediate states.
      const speed = Math.abs(velocity);
      if (speed > 0.25) {
        const momentum = Math.sign(velocity) * Math.min(0.40, speed * 0.15);
        let nextTarget = targetProgressRef.current + momentum;
        if (touchStartProgress < 8.5 && nextTarget > 9.0) {
          nextTarget = 9.0;
        }
        targetProgressRef.current = Math.max(0, Math.min(MAX_PROGRESS, nextTarget));
      }

      // CRITICAL STAGE 4 REQUIREMENT: ZERO auto-snap on touch!
      // If the user stops swiping halfway through a transition (e.g. 1.5, 4.5, 5.5, 7.3):
      // The visual composition must stop and freeze stably at that exact scroll position.
      // Do NOT snap or finish independently!
      clearTimeout(snapTimeoutRef.current);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        stepMilestone(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        stepMilestone(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    const handleJumpEvent = (e) => {
      if (typeof e.detail === 'number') {
        jumpToStage(e.detail);
      } else if (e.detail && typeof e.detail === 'object') {
        if (typeof e.detail.stage === 'number') jumpToStage(e.detail.stage);
        if (typeof e.detail.realmIdx === 'number') setActiveRealmIdx(e.detail.realmIdx);
      }
    };
    window.addEventListener('spatial-stage-jump', handleJumpEvent);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('spatial-stage-jump', handleJumpEvent);
    };
  }, []);

  /**
   * Helper for major stage transitions (Hero at 0, Realms at 5, Malibu at 6, Dining at 7)
   * 
   * Continuous Scroll-Progress Transformation for Overlapping Spatial Stages:
   * 1. Overlapping Coexistence: Adjacent stages visually coexist simultaneously across transitions.
   * 2. Direct 1:1 Scroll Scrubbing: Progress and visual state strictly track user input.
   * 3. Cinematic 3D Depth: Gentle spatial elevation offset (42px), subtle perspective scale (0.95 -> 1.0),
   *    and continuous Hermite cubic opacity cross-fade. Eliminates artificial 100vh box sliding.
   * 4. Zero Sudden Disappearances: Wide visibility envelope (absDelta <= 1.05) guarantees intermediate states
   *    remain stable and smooth if the user halts their finger at any progress.
   */
  const getStageTransform = (targetProgressValue) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const delta = globalProgress - targetProgressValue;
    const absDelta = Math.abs(delta);

    // Continuous overlapping coexistence window: adjacent sections always coexist across transitions
    const isVisible = absDelta <= 1.05;

    const DWELL_RADIUS = isMobile ? 0.20 : 0.24;
    const TRANSITION_SPAN = isMobile ? 0.80 : 0.76;

    let opacity = 1.0;
    let easeOut = 0;
    let translateY = 0;
    let scale = 1.0;

    if (absDelta <= DWELL_RADIUS) {
      // Solid dwell plateau: 100% still, 100% visible, fully interactive
      opacity = 1.0;
      easeOut = 0;
      translateY = 0;
      scale = 1.0;
    } else if (absDelta < DWELL_RADIUS + TRANSITION_SPAN) {
      const transProgress = (absDelta - DWELL_RADIUS) / TRANSITION_SPAN;
      easeOut = transProgress * transProgress * (3 - 2 * transProgress);

      if (isMobile) {
        // Continuous Cinematic Overlap on Mobile:
        // Instead of sliding from +92vh below like an ordinary stacked page,
        // sections coexist spatially on the 3D stage with gentle elevation offset (42px),
        // subtle depth scale (0.95 -> 1.0), and continuous Hermite opacity cross-fade.
        const travelDistance = 42;
        translateY = (delta < 0 ? 1 : -1) * easeOut * travelDistance;
        scale = delta < 0 ? (0.95 + (1 - easeOut) * 0.05) : (1.0 - easeOut * 0.04);
        opacity = Math.max(0, 1.0 - easeOut * 0.95);
      } else {
        // Desktop: Subtle elevation offset preserving widescreen 3D depth
        translateY = (delta < 0 ? 1 : -1) * easeOut * 60;
        scale = delta < 0 ? (0.96 + (1 - easeOut) * 0.04) : (1.0 - easeOut * 0.03);
        opacity = transProgress > 0.70 ? Math.max(0, 1.0 - (transProgress - 0.70) / 0.30) : 1.0;
      }
    } else {
      easeOut = 1;
      translateY = (delta < 0 ? 1 : -1) * (isMobile ? 42 : 60);
      scale = delta < 0 ? 0.95 : 0.96;
      opacity = 0;
    }

    const isInteractive = absDelta <= DWELL_RADIUS + 0.12;

    return {
      delta,
      absDelta,
      isVisible,
      opacity,
      isInteractive,
      translateY,
      scale,
      easeOut,
    };
  };

  // ROOM SECTION TIMELINE CALCULATIONS (1.0 to 4.0: 3 rooms + 1 explore card)
  const roomT = Math.max(0, Math.min(1, (globalProgress - 1.0) / 3.0));
  const roomProgress = roomT * 3.0;
  const currentRoomFloor = Math.min(SUITES.length - 1, Math.max(0, Math.round(Math.min(2.0, roomProgress))));
  const currentSuite = SUITES[currentRoomFloor] || SUITES[0];
  const currentAngle = currentSuite.frontImages[getCardAngle(currentSuite.id)] || currentSuite.frontImages[0];
  const currentRealm = REALMS[activeRealmIdx] || REALMS[0];

  // Room section visibility: enters smoothly from Hero (0.0 -> 1.0) and exits smoothly to Vedic Spa (4.0 -> 5.0)
  const roomSectionVisible = globalProgress >= 0.0 && globalProgress <= 5.05;
  let roomSectionOpacity = 1;
  let roomSectionTranslateY = 0;
  let roomSectionScale = 1.0;

  if (globalProgress < 1.0) {
    // Entering from Hero: smooth cross-fade with spatial elevation & scale
    const t = Math.max(0, Math.min(1.0, (1.0 - globalProgress) / 1.0));
    const ease = t * t * (3 - 2 * t);
    roomSectionTranslateY = ease * (isMobileScreen ? 38 : 50);
    roomSectionScale = 0.95 + (1.0 - ease) * 0.05;
    roomSectionOpacity = Math.max(0, 1.0 - ease);
  } else if (globalProgress > 4.0) {
    // Exiting to Vedic Spa: smooth cross-fade with spatial lift & scale
    const t = Math.max(0, Math.min(1.0, (globalProgress - 4.0) / 1.0));
    const ease = t * t * (3 - 2 * t);
    roomSectionTranslateY = -ease * (isMobileScreen ? 40 : 55);
    roomSectionScale = 1.0 - ease * 0.04;
    roomSectionOpacity = Math.max(0, 1.0 - ease);
  }

  // Major stage dock indicator determination
  let currentMilestone = 0;
  if (globalProgress < 0.8) currentMilestone = 0;
  else if (globalProgress < 4.5) currentMilestone = 1;
  else if (globalProgress < 5.5) currentMilestone = 2;
  else if (globalProgress < 6.5) currentMilestone = 3;
  else if (globalProgress < 7.5) currentMilestone = 4;
  else if (globalProgress < 8.5) currentMilestone = 5;
  else if (globalProgress < 13.5) currentMilestone = 6;
  else currentMilestone = 7;

  // 3D Pack interaction handlers
  const hasDraggedRef = useRef(false);
  const handlePackMouseDown = (e) => {
    if (e.target.closest('button, select, input, a')) return;
    setIsDraggingPack(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    packRotateRef.current = { ...packTilt };
  };

  useEffect(() => {
    const handlePackMove = (e) => {
      if (!isDraggingPack) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        hasDraggedRef.current = true;
      }
      setPackTilt({
        x: Math.max(-30, Math.min(30, packRotateRef.current.x - dy * 0.2)),
        y: packRotateRef.current.y + dx * 0.35,
      });
    };
    const handlePackUp = () => setIsDraggingPack(false);

    window.addEventListener('mousemove', handlePackMove);
    window.addEventListener('mouseup', handlePackUp);
    return () => {
      window.removeEventListener('mousemove', handlePackMove);
      window.removeEventListener('mouseup', handlePackUp);
    };
  }, [isDraggingPack]);


  const handleClassifiedBreak = () => {
    if (!isVaultRevealed) {
      playChimeSound();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5D77F', '#FFFFFF', '#0B1614'],
      });
      setIsVaultRevealed(true);
    } else {
      setIsVaultRevealed(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full min-h-[100dvh] overflow-hidden bg-white text-charcoal select-none z-10 perspective-2000 overscroll-none touch-none">
      {/* =========================================================================
          STAGE 0: THE GRAND ARRIVAL (CINEMATIC TWILIGHT & LEFT EDITORIAL LUXURY)
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, easeOut, translateY, scale } = getStageTransform(0.0);
        if (!isVisible || globalProgress > 1.05) return null;

        // Cinematic scroll zoom and perspective shifts
        const bgScale = 1.0 + absDelta * 0.05; // 1.00 at dwell up to ~1.045
        const contentSlideX = -easeOut * 40; // Slide gracefully to the left on transition out
        const contentFade = opacity;

        return (
          <div
            className={`absolute inset-0 flex flex-col justify-between overflow-hidden will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity: contentFade,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
            }}
          >
            {/* 1. CINEMATIC AUTHENTIC HOTEL VIDEO */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#07100F]">
              {/* Authentic Hotel Cinematic Video Layer (Rock-solid WebM, zero mouse jitter) */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-[72%_center] sm:object-[68%_center] md:object-center select-none opacity-100 pointer-events-none"
                style={{
                  transform: `scale(${bgScale})`,
                }}
              >
                <source src="/videos/hero.webm" type="video/webm" />
              </video>

              {/* Atmospheric Dark Overlays:
                  - Left-to-right gradient to guarantee crystal clear editorial legibility on the left while keeping the building illuminated on the right.
                  - Bottom and top subtle gradients for depth and smooth edge integration.
              */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07100F]/90 via-[#07100F]/65 md:from-[#07100F]/80 md:via-[#07100F]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07100F]/85 via-transparent to-[#07100F]/30 pointer-events-none" />
            </div>

            {/* 2. HERO COMPOSITION — LEFT EDITORIAL CONTENT */}
            {/* Positioned vertically around center-left, preserving the illuminated hotel architecture on the right */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-16 xl:px-24 pt-16 sm:pt-24 pb-4 sm:pb-12 max-w-4xl lg:max-w-5xl">
              <div
                className="will-change-transform flex flex-col items-start text-left"
                style={{
                  transform: `translate3d(${contentSlideX}px, 0, 0)`,
                }}
              >
                {/* Brand Introduction: Official Hotel Logo Medallion as a small, elegant brand signature */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-4 group">
                  <div className="relative flex items-center justify-center">
                    {/* Soft, realistic ambient warmth */}
                    <div className="absolute inset-0 rounded-full bg-[#D6B878]/15 blur-md -z-10" />
                    <HotelLogoMedallion className="w-12 h-12 sm:w-20 sm:h-20 lg:w-22 lg:h-22" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-sans text-[9px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.28em] text-[#D6B878] uppercase">
                      AN ADDRESS OF DISTINCTION
                    </span>
                    <span className="font-serif text-[11px] sm:text-xs text-[#F4EFE5]/70 tracking-widest uppercase">
                      Gorakhpur Landmark
                    </span>
                  </div>
                </div>

                {/* Main Editorial Headlines */}
                <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.05] drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                  WHERE REGAL DIGNITY
                </h1>
                <h2 className="font-serif italic text-xl sm:text-4xl lg:text-5xl text-[#D6B878] font-normal leading-[1.1] drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] mt-0.5 sm:mt-1 mb-2.5 sm:mb-5">
                  Meets Untamed Luxury
                </h2>

                {/* Supporting Description */}
                <p className="font-sans text-xs sm:text-base text-[#F4EFE5]/90 font-normal leading-relaxed max-w-xl mb-3.5 sm:mb-8 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] line-clamp-3 sm:line-clamp-none">
                  Discover The Radiant Hotel & Resort — a distinctive destination for refined stays, dining and memorable experiences in Gorakhpur.
                </p>

                {/* Primary Exploration CTA + Subtle Scroll Instruction (Strictly NO Booking functionality) */}
                <div className="flex flex-row items-center gap-3 sm:gap-6 flex-wrap">
                  <button
                    onClick={() => jumpToStage(1)}
                    className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-[#D6B878] hover:bg-[#E5CB92] text-[#07100F] font-sans font-semibold text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_35px_rgba(214,184,120,0.25)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
                  >
                    <span>EXPLORE THE HOTEL</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => jumpToStage(1)}
                    className="group flex items-center gap-1.5 sm:gap-2 text-[#F4EFE5]/75 hover:text-[#D6B878] font-sans text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase transition-colors duration-300 py-1.5 sm:py-2 cursor-pointer"
                  >
                    <span>SCROLL TO DISCOVER</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 text-[#D6B878]">↓</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. UNDERSTATED EDITORIAL INFORMATION STRIP */}
            {/* Informational labels positioned near the lower portion of the hero */}
            <div
              className="relative z-10 px-4 sm:px-10 lg:px-16 xl:px-24 pb-3 sm:pb-6 will-change-transform"
              style={{
                transform: `translate3d(0, ${easeOut * 25}px, 0)`,
              }}
            >
              <div className="inline-flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-1 sm:gap-y-2 py-1.5 sm:py-2.5 px-3 sm:px-5 rounded-xl bg-[#07100F]/60 backdrop-blur-md border border-[#D6B878]/20 shadow-[0_10px_25px_rgba(0,0,0,0.25)] text-left">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6B878]">LOCATION:</span>
                  <span className="font-serif text-xs sm:text-sm text-[#F4EFE5]">Gorakhpur</span>
                </div>
                <span className="text-[#D6B878]/40 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6B878]">DISCOVER:</span>
                  <span className="font-serif text-xs sm:text-sm text-[#F4EFE5]">The Radiant</span>
                </div>
                <span className="text-[#D6B878]/40 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6B878]">EXPERIENCE:</span>
                  <span className="font-serif text-xs sm:text-sm text-[#F4EFE5]">Stay & Dine</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 1: ROOMS & SUITES DECK (BRIGHT LUXURY MARBLE PALETTE)
          Continuous progress 1.0 to 4.0: Stack rooms on scroll with bright, high-contrast clarity!
         ========================================================================= */}
      {roomSectionVisible && (
        <div
          className={`absolute inset-0 flex items-center justify-center px-3 sm:px-6 lg:px-10 py-1 sm:py-2.5 bg-[#FAF9F5] text-forest-950 overflow-hidden will-change-transform ${globalProgress >= 0.8 && globalProgress <= 4.2 ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
          style={{
            opacity: roomSectionOpacity,
            transform: `translate3d(0px, ${roomSectionTranslateY}px, 0px) scale(${roomSectionScale})`,
          }}
        >
          {/* -------------------------------------------------------------
              BRIGHT CINEMATIC BACKGROUND LAYERS (LIGHT LUXURY AESTHETIC)
             ------------------------------------------------------------- */}
          {/* Layer 1: Ambient Room Blurred Backdrops (Bright & Soft) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {SUITES.map((s, idx) => {
              const suiteDistance = Math.abs(roomProgress - idx);
              const bgOpacity = Math.max(0, 1 - suiteDistance * 1.2);
              return (
                <div
                  key={s.id}
                  className="absolute inset-0 transition-opacity duration-500 ease-out will-change-transform"
                  style={{ opacity: bgOpacity }}
                >
                  <img
                    src={s.frontImages[0].src}
                    alt={s.name}
                    className="w-full h-full object-cover filter blur-3xl scale-110 brightness-[1.05] opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/85 to-[#FAF9F5]/90" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${s.accentGlow} mix-blend-multiply opacity-50`} />
                </div>
              );
            })}
          </div>

          {/* Layer 2: Giant Typographic Parallax Watermark in Clean Stone Tone */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div
              className="whitespace-nowrap font-serif font-black uppercase text-[18vw] tracking-tighter text-[#8C6D37]/[0.18] select-none will-change-transform transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${(roomProgress - 1.5) * -110}px) scale(${1 + Math.sin(roomProgress) * 0.04})`,
              }}
            >
              {currentSuite.watermark}
            </div>
          </div>

          {/* Layer 3: Concentric Architectural Blueprint Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-25">
            <div
              className="w-[700px] h-[700px] rounded-full border border-gold/50 border-dashed will-change-transform"
              style={{
                transform: `rotate(${roomProgress * 45}deg) scale(${1 + mousePos.x * 0.05})`,
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full border border-gold/30 will-change-transform"
              style={{
                transform: `rotate(${roomProgress * -60}deg)`,
              }}
            />
          </div>

          {/* -------------------------------------------------------------
              FOREGROUND 3-COLUMN ANCHORED STAGE (HIGH CONTRAST)
             ------------------------------------------------------------- */}
          <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-2.5">
            {/* TOP BAR: Room Portfolio Navigation & Mobile View Selector */}
            <div className="text-center will-change-transform">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-black uppercase tracking-tight text-forest-950">
                Rooms & Suites Portfolio <span className="text-gold-dark italic font-normal">& Blueprint Specs</span>
              </h2>

              {/* Mobile View Toggle: Lets mobile users view full Specs, 3D Photo Deck, or VIP Privileges without ANY element hidden under the card */}
              <div className="flex md:hidden items-center justify-center gap-1.5 px-3 py-1 bg-stone-200/70 backdrop-blur-md rounded-full border border-stone-300/80 shadow-sm mx-auto mt-2 mb-1 w-fit z-30">
                <button
                  type="button"
                  onClick={() => setMobileRoomView('metrics')}
                  className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    mobileRoomView === 'metrics'
                      ? 'bg-forest-950 text-[#D6B878] shadow-sm'
                      : 'text-stone-700 hover:text-forest-950'
                  }`}
                >
                  📐 Specs
                </button>
                <button
                  type="button"
                  onClick={() => setMobileRoomView('deck')}
                  className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    mobileRoomView === 'deck'
                      ? 'bg-forest-950 text-[#D6B878] shadow-sm'
                      : 'text-stone-700 hover:text-forest-950'
                  }`}
                >
                  🛏️ Suite Card
                </button>
                <button
                  type="button"
                  onClick={() => setMobileRoomView('privileges')}
                  className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    mobileRoomView === 'privileges'
                      ? 'bg-forest-950 text-[#D6B878] shadow-sm'
                      : 'text-stone-700 hover:text-forest-950'
                  }`}
                >
                  👑 Privileges
                </button>
              </div>
            </div>

            {/* THREE-COLUMN STAGED LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 xl:gap-5 items-center my-auto">
              {/* LEFT PANEL: Pinned Architectural Metrics (Desktop: side-by-side, Mobile: clean full card when 'metrics' selected) */}
              <div
                className={`${
                  mobileRoomView === 'metrics' ? 'block' : 'hidden'
                } md:block md:col-span-3 lg:col-span-3 space-y-2 will-change-transform max-w-[340px] sm:max-w-[380px] mx-auto w-full`}
              >
                <div className="p-3.5 xl:p-4 rounded-2xl bg-white/95 lg:bg-white/70 backdrop-blur-md border border-[#D6C5AD]/90 shadow-[0_15px_35px_rgba(0,0,0,0.08)] space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8C6D37] font-sans block">
                      Architectural Metrics
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrubToRoom((currentRoomFloor - 1 + SUITES.length) % SUITES.length);
                        }}
                        className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                        title="Previous Suite"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-cinzel font-bold text-forest-950">
                        0{currentRoomFloor + 1} of 0{SUITES.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrubToRoom((currentRoomFloor + 1) % SUITES.length);
                        }}
                        className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                        title="Next Suite"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg xl:text-xl font-serif font-bold text-forest-950">{currentSuite.name}</h3>
                  <p className="text-[10px] xl:text-[11px] text-charcoal font-medium font-sans leading-snug line-clamp-2">
                    {currentSuite.tagline}
                  </p>

                  <div className="space-y-1 pt-1 border-t border-stone-200 text-[10px] xl:text-[11px] font-sans">
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">Scale</span>
                      <strong className="text-forest-950 font-bold">{currentSuite.size}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">Capacity</span>
                      <strong className="text-forest-950 font-bold">{currentSuite.capacity}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">View</span>
                      <strong className="text-forest-950 font-bold text-[10px] truncate max-w-[130px] text-right">
                        {currentSuite.view}
                      </strong>
                    </div>
                    <div className="flex justify-between py-0.5 pt-0.5">
                      <span className="text-charcoal font-semibold">Tariff</span>
                      <strong className="text-[#8C6D37] font-serif font-bold text-sm">{currentSuite.price}</strong>
                    </div>
                  </div>

                  {/* Reserve & Switch to Card Buttons on Mobile */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMobileRoomView('deck')}
                      className="md:hidden px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-forest-950 text-[10px] font-sans font-bold uppercase tracking-wider border border-stone-300"
                    >
                      View Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBooking && onOpenBooking(currentSuite)}
                      className="flex-1 py-2 rounded-xl bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Reserve {currentSuite.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>

              {/* CENTER STAGE: THE 3D SCROLL-SCRUBBED ROOM PACK DECK (BRIGHT LUXURY CARDS) */}
              <div
                className={`${
                  mobileRoomView === 'deck' ? 'flex' : 'hidden'
                } md:flex md:col-span-6 lg:col-span-6 flex-col items-center justify-center relative min-h-[350px] sm:min-h-[385px] lg:min-h-[410px] will-change-transform my-auto`}
              >
                {/* The 3D Photo Pack Deck (Always visible across both mobile and desktop) */}
                <div className="flex flex-col items-center justify-center relative w-full h-full">
                {SUITES.map((suiteItem, suiteIdx) => {
                  const delta = roomProgress - suiteIdx;
                  const absDelta = Math.abs(delta);

                  // Cull distant offscreen cards
                  if (absDelta > 1.35) return null;

                  const isTopCard = absDelta < 0.45;
                  const traj = CARD_TRAJECTORIES[suiteIdx] || CARD_TRAJECTORIES[0];

                  // Unified Review-Style Smooth Card Motion Engine
                  const motion = computeReviewCardMotion(delta, 0.28, {
                    enterX: traj.enterX,
                    enterY: traj.enterY,
                    enterRot: traj.enterRot,
                    enterScale: 0.16,
                    exitX: traj.exitX,
                    exitY: traj.exitY,
                    exitRot: traj.exitRot,
                    exitScale: 0.18,
                    baseRot: suiteItem.baseAngle,
                  });

                  const flyX = motion.x;
                  const flyY = motion.y;
                  const flyRot = motion.rot;
                  const flyScale = motion.scale;
                  const cardOpacity = motion.opacity;

                  // Top active card gets highest z-index
                  const zIndex = isTopCard ? 30 : Math.max(10, 25 - Math.round(absDelta * 10));

                  const mouseTiltX = isMobileScreen ? 0 : mousePos.y * -8;
                  const mouseTiltY = isMobileScreen ? 0 : mousePos.x * 10;
                  const currentTiltX = isTopCard ? (packTilt.x + mouseTiltX) : 0;
                  const currentTiltY = isTopCard ? (packTilt.y + mouseTiltY) : 0;
                  const flipRotY = isCardFlipped(suiteItem.id) ? 180 : 0;

                  const currentSuiteAngle = getCardAngle(suiteItem.id);
                  const activeImg =
                    suiteItem.frontImages[currentSuiteAngle] || suiteItem.frontImages[0];

                  return (
                    <div
                      key={suiteItem.id}
                      onMouseDown={isTopCard ? handlePackMouseDown : undefined}
                      onClick={(e) => {
                        if (e.target.closest('button, select, input, a')) return;
                        if (isTopCard && !hasDraggedRef.current) {
                          if (suiteIdx === 2) {
                            scrubToRoom(3);
                          } else {
                            const nextRoom = (suiteIdx + 1) % SUITES.length;
                            scrubToRoom(nextRoom);
                          }
                          playClickSound();
                        }
                      }}
                      className={`w-[270px] sm:w-[310px] md:w-[340px] lg:w-[355px] xl:w-[365px] h-[335px] sm:h-[365px] md:h-[385px] lg:h-[395px] max-h-[calc(100vh-190px)] absolute preserve-3d will-change-transform rounded-3xl ${isTopCard ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
                        }`}
                      style={{
                        zIndex,
                        opacity: cardOpacity,
                        transform: `translate3d(${flyX}px, ${flyY}px, 0px) scale(${flyScale}) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) rotateZ(${flyRot}deg)`,
                      }}
                    >
                      {/* Inner Card Flipper with smooth 3D flip animation */}
                      <div
                        className="w-full h-full relative preserve-3d rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)]"
                        style={{
                          transform: `rotateY(${flipRotY}deg)`,
                          transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                      >
                        {/* FRONT SIDE (Crisp Luxury Card with 70% Cinematic Photo & 30% Refined Details) */}
                        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border border-[#D6C5AD]/80 text-forest-950 flex flex-col justify-between backface-hidden shadow-2xl">
                          {/* TOP 70%: CINEMATIC ROOM PHOTOGRAPH WITH FLOATING GLASS BADGES */}
                          <div className="relative w-full h-[68%] sm:h-[70%] overflow-hidden group shrink-0">
                            <img
                              src={activeImg.src}
                              alt={activeImg.label}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                            />
                            {/* Subtle Ambient Vignettes for Contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/40 pointer-events-none" />

                            {/* Top Floating Glass Badges */}
                            <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 flex items-center justify-between z-10 pointer-events-auto">
                              <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-white/20 text-[#D6B878] text-[8.5px] sm:text-[9.5px] font-sans font-bold uppercase tracking-widest shadow-md">
                                {suiteItem.badge}
                              </span>

                              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-stone-200/80 shadow-md">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrubToRoom((suiteIdx - 1 + SUITES.length) % SUITES.length);
                                  }}
                                  className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                                  title="Previous Suite"
                                >
                                  <ChevronLeft className="w-3 h-3" />
                                </button>
                                <span className="text-[10px] sm:text-[11px] font-cinzel font-bold text-forest-950 px-0.5">
                                  0{suiteIdx + 1} / 0{SUITES.length}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (suiteIdx === 2) {
                                      scrubToRoom(3);
                                    } else {
                                      scrubToRoom((suiteIdx + 1) % SUITES.length);
                                    }
                                  }}
                                  className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                                  title="Next Suite"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Bottom Label on Photo */}
                            <div className="absolute bottom-2.5 left-3 z-10">
                              <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                                {activeImg.label}
                              </span>
                            </div>
                          </div>

                          {/* BOTTOM 30%: REFINED ROOM SPECIFICATIONS & ACTION CONTROLS */}
                          <div className="relative w-full h-[32%] sm:h-[30%] p-3 sm:p-3.5 flex flex-col justify-between bg-white text-left shrink-0">
                            {/* Row 1: Title & Price */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm sm:text-base font-serif font-bold text-forest-950 truncate leading-snug">
                                  {suiteItem.name}
                                </h4>
                                <p className="text-[10px] sm:text-[11px] font-sans text-stone-500 font-medium truncate mt-0.5">
                                  {suiteItem.size} • {suiteItem.capacity} • {suiteItem.view}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm sm:text-base font-serif font-bold text-[#8C6D37] leading-none">
                                  {suiteItem.price}
                                </p>
                                <span className="text-[9px] font-sans text-stone-500 font-medium block mt-0.5">
                                  {suiteItem.period}
                                </span>
                              </div>
                            </div>

                            {/* Row 2: Specs & Booking CTAs */}
                            <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCardFlip(suiteItem.id);
                                }}
                                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF6F0] hover:bg-[#EFEAE1] text-forest-950 border border-[#D6C5AD]/60 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                              >
                                <RotateCw className="w-3 h-3 text-[#8C6D37]" />
                                <span>Specs</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onOpenBooking) onOpenBooking(suiteItem);
                                }}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                              >
                                <span>Reserve Suite</span>
                                <ArrowRight className="w-3 h-3 text-[#D6B878]" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* BACK SIDE (Architectural Blueprint Codex) */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#FAF7F0] border-2 border-gold text-forest-950 p-3 sm:p-4 flex flex-col justify-between backface-hidden shadow-2xl"
                          style={{ transform: 'rotateY(180deg)' }}
                        >
                          <div className="flex items-center justify-between border-b border-gold/40 pb-1">
                            <span className="text-[8px] sm:text-[9px] font-sans tracking-widest text-gold-dark uppercase font-black">
                              BLUEPRINT SPECS
                            </span>
                            <Compass className="w-3 h-3 text-gold-dark" />
                          </div>

                          <div className="my-auto space-y-1 py-1.5 bg-white/90 rounded-xl p-2.5 border border-stone-300 shadow-sm">
                            {suiteItem.backSpecs.slice(0, 4).map((spec, i) => (
                              <div key={i} className="flex items-center justify-between text-[10px] font-sans py-0.5 border-b border-stone-200">
                                <span className="text-charcoal font-semibold">{spec.label}</span>
                                <span className="text-forest-950 font-black">{spec.val}</span>
                              </div>
                            ))}
                          </div>

                          <div className="p-1.5 rounded-lg bg-gold/15 border border-gold/30 my-0.5 text-[10px] font-serif italic text-forest-950 font-semibold truncate">
                            "{suiteItem.secretNote}"
                          </div>

                          <div className="pt-1 flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardFlip(suiteItem.id);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white text-forest-950 text-[10px] font-sans font-black uppercase tracking-wider border border-stone-300"
                            >
                              Front
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenBooking) onOpenBooking(suiteItem);
                              }}
                              className="flex-1 py-1 rounded-lg bg-gold text-forest-950 font-sans font-black text-[10px] uppercase tracking-wider shadow-sm hover:bg-gold-light flex items-center justify-center gap-1"
                            >
                              Reserve {suiteItem.name.split(' ')[0]}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* 4th Card: Explore Rooms Cue Card (Appears after 3rd room card) */}
                {roomProgress >= 1.6 && (
                  <div
                    className={`w-[270px] sm:w-[310px] md:w-[340px] lg:w-[355px] xl:w-[365px] h-[335px] sm:h-[365px] md:h-[385px] lg:h-[395px] max-h-[calc(100vh-190px)] absolute preserve-3d will-change-transform rounded-3xl transition-shadow duration-300 ${roomProgress >= 2.4 ? 'z-30 pointer-events-auto cursor-default' : 'z-10 pointer-events-none'
                      }`}
                    style={{
                      opacity: Math.min(1.0, Math.max(0, (roomProgress - 1.6) / 0.7)),
                      transform: `translate3d(0px, ${(1.0 - Math.min(1.0, Math.max(0, (roomProgress - 1.6) / 0.7))) * 30}px, 0px) scale(${0.94 + Math.min(1.0, Math.max(0, (roomProgress - 1.6) / 0.7)) * 0.06})`,
                    }}
                  >
                    <div className="w-full h-full rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-2xl border-2 border-[#D6C5AD] shadow-[0_20px_50px_rgba(60,40,25,0.12)] flex flex-col justify-between text-center relative overflow-hidden">
                      {/* Top Golden Illuminated Accent Line */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#D6B878] to-transparent absolute top-0 inset-x-0 z-20 shadow-[0_0_12px_#D6B878]" />

                      {/* Heading & Simple Description */}
                      <div className="space-y-1.5 my-auto">
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-forest-950 uppercase tracking-tight leading-tight">
                          Explore More Rooms & Suites
                        </h3>
                        <p className="text-xs sm:text-[13px] font-sans text-stone-600 font-medium leading-relaxed max-w-xs mx-auto">
                          Discover our complete collection of executive rooms, luxury suites, and presidential sanctuaries.
                        </p>
                      </div>

                      {/* 3 Quick Overview Badges */}
                      <div className="grid grid-cols-3 gap-1.5 py-1.5 border-y border-stone-200/80 max-w-xs mx-auto w-full">
                        <div className="p-1 rounded-lg bg-[#FAF7F0] text-center">
                          <span className="text-[9px] font-sans font-bold uppercase text-[#8C6D37] block">Balcony</span>
                          <span className="text-[10.5px] font-serif font-bold text-forest-950">Pool View</span>
                        </div>
                        <div className="p-1 rounded-lg bg-[#FAF7F0] text-center">
                          <span className="text-[9px] font-sans font-bold uppercase text-[#8C6D37] block">Living</span>
                          <span className="text-[10.5px] font-serif font-bold text-forest-950">Dual Zone</span>
                        </div>
                        <div className="p-1 rounded-lg bg-[#FAF7F0] text-center">
                          <span className="text-[9px] font-sans font-bold uppercase text-[#8C6D37] block">Service</span>
                          <span className="text-[10.5px] font-serif font-bold text-forest-950">24/7 Butler</span>
                        </div>
                      </div>

                      {/* Action Button that navigates to /rooms (Dedicated Rooms Folio) */}
                      <Link
                        to="/rooms"
                        onClick={() => playClickSound()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer group mt-2"
                      >
                        <span>EXPLORE ALL ROOMS</span>
                        <ArrowRight className="w-4 h-4 text-[#D6B878] transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                )}
                </div>

                {/* 3D Contact Shadow on Ground */}
                <div className="w-56 sm:w-64 h-5 sm:h-6 rounded-full bg-stone-900/15 blur-lg mt-2 sm:mt-3 z-10" />
              </div>

              {/* RIGHT PANEL: Dynamic VIP Privileges (Desktop: side-by-side, Mobile: clean full card when 'privileges' selected) */}
              <div
                className={`${
                  mobileRoomView === 'privileges' ? 'block' : 'hidden'
                } md:block md:col-span-3 lg:col-span-3 space-y-2 will-change-transform max-w-[340px] sm:max-w-[380px] mx-auto w-full`}
              >
                <div className="p-3.5 xl:p-4 rounded-2xl bg-white/95 lg:bg-white/70 backdrop-blur-md border border-[#D6C5AD]/90 shadow-[0_15px_35px_rgba(0,0,0,0.08)] space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8C6D37] font-sans block flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#B38738]" /> Sovereign Privileges
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrubToRoom((currentRoomFloor - 1 + SUITES.length) % SUITES.length);
                        }}
                        className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                        title="Previous Suite"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-cinzel font-bold text-forest-950">
                        0{currentRoomFloor + 1} of 0{SUITES.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrubToRoom((currentRoomFloor + 1) % SUITES.length);
                        }}
                        className="p-1 rounded-full hover:bg-stone-200 text-forest-950 transition-colors"
                        title="Next Suite"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-base xl:text-lg text-forest-950">
                    Included With {currentSuite.name.split(' ')[0]}
                  </h4>
                  <ul className="text-[10px] xl:text-[11px] space-y-1 font-sans text-charcoal font-medium">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#8C6D37] shrink-0" />
                      <span>Dedicated 24/7 Royal Butler care</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#8C6D37] shrink-0" />
                      <span>Priority Cabana at Malibu Rooftop</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#8C6D37] shrink-0" />
                      <span>Complimentary breakfast buffet</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#8C6D37] shrink-0" />
                      <span>High-speed Wi-Fi 6 & EV valet</span>
                    </li>
                  </ul>

                  {/* Reserve & Switch to Card Buttons on Mobile */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMobileRoomView('deck')}
                      className="md:hidden px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-forest-950 text-[10px] font-sans font-bold uppercase tracking-wider border border-stone-300"
                    >
                      View Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBooking && onOpenBooking(currentSuite)}
                      className="flex-1 py-2 rounded-xl bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Reserve {currentSuite.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 2: VEDIC SPA & SALON WELLNESS (PROGRESS 5.0)
          Radical Spatial Canvas: Diagonal Triangular Image Assembly + Scattered Editorial Typography
          Zero-card composition controlled continuously by globalProgress (4.30–5.70).
         ========================================================================= */}
      {(() => {
        const { isVisible, opacity, translateY, scale } = getStageTransform(5.0);
        if (!isVisible) return null;

        return (
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              opacity,
              transform: `translate3d(0px, ${translateY * 0.5}px, 0px) scale(${scale})`,
            }}
          >
            <VedicSpaSpatialCanvas
              globalProgress={globalProgress}
              onOpenBooking={onOpenBooking}
              mousePos={mousePos}
            />
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 3: MALIBU PARTY STARTS FROM HERE (PROGRESS 6.0)
          Review-Style Smooth Dual-Card Motion: Left Text & Right Featured Event Card
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, translateY, scale } = getStageTransform(6.0);
        if (!isVisible) return null;

        const delta = globalProgress - 6.0;
        // Review-Style Unified Card Motion
        const malibuLeft = computeReviewCardMotion(delta, 0.28, {
          enterX: -340,
          enterY: 170,
          enterRot: -2.5,
          enterScale: 0.14,
          exitX: -360,
          exitY: -200,
          exitRot: -3.0,
          exitScale: 0.16,
        });

        const malibuRight = computeReviewCardMotion(delta, 0.28, {
          enterX: 360,
          enterY: 190,
          enterRot: 3.5,
          enterScale: 0.16,
          exitX: 380,
          exitY: -200,
          exitRot: 4.5,
          exitScale: 0.18,
        });

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center px-3 sm:px-6 lg:px-10 py-1 sm:py-2.5 text-forest-950 overflow-hidden will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
            }}
          >
            {/* Scroll-Driven 3D Kinetic Typography Background Layer */}
            <KineticTypographyBackground globalProgress={globalProgress} />

            <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-3">
              {/* Main Stage: Left Featured Sky Cabana Card & Right Malibu Overview Text */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center my-auto">
                {/* Left Column: Picture Card (Grand Rooftop Showcase - order-1 so prominent & visible on mobile) */}
                <div
                  className="lg:col-span-6 flex justify-center will-change-transform order-1 lg:order-1 mt-1 sm:mt-2 lg:mt-0"
                  style={{
                    transform: malibuLeft.transform,
                    opacity: malibuLeft.opacity,
                  }}
                >
                  <Link
                    to="/malibu"
                    onClick={() => playClickSound()}
                    className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px] aspect-[16/9] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/40 relative group bg-black/50 transition-shadow duration-300 will-change-transform cursor-pointer hover:shadow-2xl hover:scale-[1.02] block"
                    style={{
                      transform: isMobileScreen
                        ? 'none'
                        : `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -10}deg)`,
                    }}
                  >
                    <img
                      src="/images/malibu/malibu-1.webp"
                      alt="Malibu Rooftop Lounge"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-gold text-[9px] font-sans font-black tracking-wider uppercase border border-gold/40">
                        ROOFTOP SKYLINE LOUNGE
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <p className="text-[9px] tracking-widest uppercase font-black text-gold font-sans">
                        84 METERS ABOVE GORAKHPUR
                      </p>
                      <h4 className="text-xl font-serif font-black text-white">The Sky Cabana Experience</h4>
                      <p className="text-[10px] text-stone-200 font-sans font-medium line-clamp-1 mt-0.5">
                        Panoramic skyline views, craft smoked mixology & open-air celebration beats
                      </p>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/20">
                        <span className="text-[9px] font-sans font-bold text-gold uppercase tracking-wider">
                          Explore All Celebration Nights
                        </span>
                        <div className="w-7 h-7 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-md">
                          <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Right Column: Pure Luxury Malibu Overview Text */}
                <div
                  className="lg:col-span-6 space-y-2 sm:space-y-3 will-change-transform bg-transparent p-0 order-2 lg:order-2"
                  style={{
                    transform: malibuRight.transform,
                    opacity: malibuRight.opacity,
                  }}
                >
                  <h3 className="text-xl sm:text-3xl lg:text-5xl font-serif font-black uppercase text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    Malibu Rooftop Bar & Lounge
                  </h3>

                  {/* Malibu Description with Ambient Sunset Red Halo */}
                  <div className="relative max-w-xl py-1 sm:py-2 px-2.5 sm:px-4 my-0.5 sm:my-1">
                    <div
                      className="absolute inset-0 -inset-x-4 -inset-y-1.5 bg-gradient-to-r from-red-600/35 via-red-600/80 to-red-600/30 blur-xl rounded-2xl pointer-events-none"
                      aria-hidden="true"
                    />
                    <p className="relative z-10 text-[11px] sm:text-sm lg:text-base text-white font-sans leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-medium line-clamp-2 sm:line-clamp-none">
                      Perched atop The Radiant Hotel at 84 meters, Malibu is Gorakhpur's premier open-air nightlife, woodfired gastronomy, and celebration hotspot — featuring private draped cabanas, artisanal smoked mixology, and panoramic sunset skyline beats.
                    </p>
                  </div>

                  {/* Architectural Spec Badges & Malibu Nights Button Side-by-Side */}
                  <div className="pt-1 sm:pt-2 flex items-center gap-2.5 sm:gap-4 flex-wrap">
                    <div className="p-1.5 sm:p-2.5 rounded-2xl bg-black/40 backdrop-blur-sm border border-gold/30 text-center shadow-lg min-w-[95px] sm:min-w-[105px]">
                      <span className="text-sm sm:text-lg font-serif font-black text-gold block drop-shadow-sm">84M</span>
                      <span className="text-[8.5px] sm:text-[9px] font-sans font-black uppercase tracking-wider text-stone-200">Skyline Elevation</span>
                    </div>
                    <div className="p-1.5 sm:p-2.5 rounded-2xl bg-black/40 backdrop-blur-sm border border-gold/30 text-center shadow-lg min-w-[95px] sm:min-w-[105px]">
                      <span className="text-sm sm:text-lg font-serif font-black text-gold block drop-shadow-sm">6 PM</span>
                      <span className="text-[8.5px] sm:text-[9px] font-sans font-black uppercase tracking-wider text-stone-200">Sunset Onwards</span>
                    </div>

                    <Link
                      to="/malibu"
                      onClick={() => playClickSound()}
                      className="inline-flex items-center gap-2 text-gold hover:text-white font-sans font-black text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-200 hover:translate-x-1.5 group select-none drop-shadow-[0_2px_8px_rgba(0,0,0,1)] ml-1 sm:ml-3"
                    >
                      <span className="border-b-2 border-gold/60 group-hover:border-white pb-0.5 transition-colors">
                        Malibu Nights
                      </span>
                      <ArrowRight className="w-4 h-4 text-gold group-hover:text-white transition-all duration-200 group-hover:translate-x-1 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 4: THE SEVEN SCENTRIC FINE DINING (PROGRESS 7.0)
          Review-Style Smooth Dual-Card Motion: Left Text/Hours Cards & Right Dining Card
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, translateY, scale } = getStageTransform(7.0);
        if (!isVisible) return null;

        const delta = globalProgress - 7.0;
        // Review-Style Unified Card Motion
        const diningLeft = computeReviewCardMotion(delta, 0.22, {
          enterX: -340,
          enterY: 170,
          enterRot: -2.5,
          enterScale: 0.14,
          exitX: -360,
          exitY: -200,
          exitRot: -3.0,
          exitScale: 0.16,
        });

        const diningRight = computeReviewCardMotion(delta, 0.22, {
          enterX: 360,
          enterY: 190,
          enterRot: 3.5,
          enterScale: 0.16,
          exitX: 380,
          exitY: -200,
          exitRot: 4.0,
          exitScale: 0.18,
        });

        const DINING_DWELL = 0.22;
        const isDiningExiting = delta > DINING_DWELL;

        // Clean, elegant perspective float on exit towards Fitness Center
        let diningRightTransform = diningRight.transform;
        let diningRightOpacity = diningRight.opacity;
        let diningRightZIndex = 10;
        let stageExitOpacity = opacity;

        if (isDiningExiting) {
          const exitT = Math.min(1.0, (delta - DINING_DWELL) / 0.38);
          const easeExit = exitT * exitT * (3 - 2 * exitT); // Hermite cubic ease

          // Gentle 1.35x perspective scale & upward float (no jarring 3.2x zoom collision)
          const zoomScale = 1.0 + easeExit * 0.35;
          const shiftCenterY = -easeExit * 40;

          diningRightOpacity = Math.max(0, 1.0 - easeExit);
          diningRightTransform = `translate3d(0px, ${shiftCenterY}px, 0px) scale(${zoomScale})`;
          diningRightZIndex = 25;
          stageExitOpacity = Math.max(0, 1.0 - easeExit);
        }

        const DINING_IMAGES = [
          '/images/dining/dining-1.webp',
          '/images/dining/dining-2.webp',
          '/images/dining/dining-3.webp',
        ];

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center px-3 sm:px-6 lg:px-10 py-1 sm:py-2.5 text-forest-950 overflow-hidden will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity: stageExitOpacity,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
            }}
          >
            {/* Persistent 3D Floating Culinary Atelier Background Layer */}
            <BrightCulinaryAtelierBackground globalProgress={globalProgress} />

            <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-3">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center my-auto">
                {/* Right Column (order-1 on mobile so Picture Card is prominent & visible at top) */}
                <div
                  className="lg:col-span-6 flex flex-col items-center justify-center will-change-transform space-y-1 sm:space-y-2 relative mt-0 sm:mt-2 lg:mt-0 order-1 lg:order-2"
                  style={{
                    transform: diningRightTransform,
                    opacity: diningRightOpacity,
                    zIndex: diningRightZIndex,
                    pointerEvents: isDiningExiting ? 'none' : 'auto',
                  }}
                >
                  <div
                    onClick={() => {
                      if (!isDiningExiting) {
                        setDiningImgIdx((prev) => (prev + 1) % DINING_IMAGES.length);
                        playClickSound();
                      }
                    }}
                    className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px] aspect-[16/9] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(40,30,20,0.18)] border border-[#D6C5AD]/60 relative group bg-white/20 transition-shadow duration-300 will-change-transform cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
                    style={{
                      transform: isMobileScreen
                        ? 'none'
                        : `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -10}deg)`,
                    }}
                  >
                    <img
                      src={DINING_IMAGES[diningImgIdx]}
                      alt="The Seven Scentric Fine Dining"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                      <div>
                        <p className="text-[8.5px] sm:text-[10px] tracking-widest uppercase font-black text-gold font-sans">
                          GASTRONOMIC OPULENCE
                        </p>
                        <p className="text-lg sm:text-2xl font-serif font-black text-white">THE SEVEN SCENTRIC</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-lg">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45" />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail perspective selector (Visible across mobile and desktop) */}
                  <div
                    className="flex items-center justify-center gap-1.5 sm:gap-2 transition-opacity duration-200 mt-1"
                    style={{
                      opacity: isDiningExiting ? Math.max(0, 1.0 - (delta - DINING_DWELL) * 8) : 1.0,
                    }}
                  >
                    {DINING_IMAGES.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDiningImgIdx(idx);
                          playClickSound();
                        }}
                        className={`w-10 sm:w-14 h-6 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          diningImgIdx === idx
                            ? 'border-gold ring-2 ring-gold/50 scale-105'
                            : 'border-[#D6C5AD]/50 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgSrc} alt="Perspective" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Left Column: Transparent Text & Hours Cards (order-2 on mobile) */}
                <div
                  className="lg:col-span-6 space-y-1 sm:space-y-2 will-change-transform bg-transparent p-0 order-2 lg:order-1"
                  style={{
                    transform: diningLeft.transform,
                    opacity: diningLeft.opacity,
                  }}
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#D6B878]/25 border border-[#B38738]/40 text-[#8C6D37] text-[9px] sm:text-xs font-bold font-sans uppercase tracking-[0.2em] mb-0.5 shadow-sm">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38738]" />
                    <span>FLOATING CULINARY ATELIER</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
                    An Experience for the Senses
                  </h3>
                  <h4 className="text-xs sm:text-base lg:text-lg font-serif italic text-[#B38738] font-bold tracking-wide -mt-0.5">
                    The Seven Scentric Restaurant
                  </h4>

                  <p className="text-[11px] sm:text-sm text-[#3B423D] font-medium font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                    Welcome to our exquisite fine dining restaurant within our 4-star hotel, where culinary artistry, sun-drenched architectural spaces, and artisanal gastronomy converge to create an unforgettable dining experience.
                  </p>

                  {/* Operating Hours Cards Grid (compact on mobile to preserve 100dvh viewport) */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                    <div className="p-1 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-sm text-forest-950">
                      <div className="flex items-center gap-1 text-[#8C6D37] mb-0.5">
                        <Coffee className="w-3 h-3 text-[#B38738]" />
                        <span className="text-[8.5px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-[#8C6D37]">Breakfast</span>
                      </div>
                      <p className="text-[9.5px] sm:text-xs font-sans font-black text-forest-950">7.00 – 10.30 am</p>
                      <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-bold hidden xs:block">Daily Buffet</p>
                    </div>

                    <div className="p-1 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-sm text-forest-950">
                      <div className="flex items-center gap-1 text-[#8C6D37] mb-0.5">
                        <Utensils className="w-3 h-3 text-[#B38738]" />
                        <span className="text-[8.5px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-[#8C6D37]">Lunch</span>
                      </div>
                      <p className="text-[9.5px] sm:text-xs font-sans font-black text-forest-950">12.00 – 2.00 pm</p>
                      <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-bold hidden xs:block">Daily Service</p>
                    </div>

                    <div className="p-1 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-sm text-forest-950">
                      <div className="flex items-center gap-1 text-[#8C6D37] mb-0.5">
                        <Wine className="w-3 h-3 text-[#B38738]" />
                        <span className="text-[8.5px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-[#8C6D37]">Dinner</span>
                      </div>
                      <p className="text-[9.5px] sm:text-xs font-sans font-black text-forest-950">From 6.30 pm</p>
                      <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-bold hidden xs:block">Last order 11 pm</p>
                    </div>
                  </div>

                  {/* Terrace Privilege Alert */}
                  <div className="p-1 sm:p-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#D6C5AD]/60 flex items-center gap-1.5 sm:gap-2 text-forest-950 shadow-sm">
                    <Wine className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38738] shrink-0" />
                    <p className="text-[10px] sm:text-xs font-sans font-bold text-stone-800">
                      <strong className="font-black uppercase text-[#8C6D37]">Open Terrace:</strong> Drinks only AT 7 SCENTRIC.
                    </p>
                  </div>

                  <div className="pt-1.5 sm:pt-3 flex flex-wrap items-center gap-4 sm:gap-8">
                    <button
                      onClick={() =>
                        onOpenBooking &&
                        onOpenBooking({ name: 'The Seven Scentric Fine Dining', price: '₹2,499' })
                      }
                      className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-sans font-black uppercase tracking-widest text-forest-950 hover:text-[#B38738] transition-colors py-0.5 sm:py-1 cursor-pointer"
                    >
                      <span className="border-b-2 border-forest-950/30 group-hover:border-[#B38738] transition-colors pb-0.5">
                        Reserve Table
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B38738] transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>

                    <span className="text-stone-300 font-serif select-none hidden sm:inline">•</span>

                    <Link
                      to="/dining"
                      onClick={() => playClickSound()}
                      className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-sans font-black uppercase tracking-widest text-forest-950/80 hover:text-[#B38738] transition-colors py-0.5 sm:py-1 cursor-pointer"
                    >
                      <span className="border-b-2 border-transparent group-hover:border-[#B38738] transition-colors pb-0.5">
                        Explore
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B38738] transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 5: MODERN FITNESS CENTER (PROGRESS 8.0)
          PURE EDITORIAL PHOTOGRAPHY & TEXT — CONTINUOUS SPATIAL TRANSITION
         ========================================================================= */}
      {(() => {
        const isVisible = globalProgress >= 6.95 && globalProgress <= 9.05;
        if (!isVisible) return null;

        const delta = globalProgress - 8.0;
        const absDelta = Math.abs(delta);
        const DWELL = isMobileScreen ? 0.20 : 0.22;

        let translateY = 0;
        let opacity = 1.0;
        let scale = 1.0;

        if (absDelta <= DWELL) {
          // Centered solid resting dwell: 100% still, 100% clear
          translateY = 0;
          opacity = 1.0;
          scale = 1.0;
        } else if (delta < -DWELL) {
          // Entering from below (Dining -> Fitness: 7.0 to 7.80): smoothly glides into view
          const t = Math.min(1.0, (-delta - DWELL) / (1.0 - DWELL));
          const easeT = t * t * (3 - 2 * t);
          const enterTravel = isMobileScreen ? 42 : 65;
          translateY = easeT * enterTravel;
          scale = 0.95 + (1.0 - easeT) * 0.05;
          opacity = Math.max(0, 1.0 - easeT * 0.90);
        } else {
          // Exiting upwards (Fitness -> Chronicles: 8.20 to 9.0): smoothly lifts into depth
          const t = Math.min(1.0, (delta - DWELL) / (1.0 - DWELL));
          const easeT = t * t * (3 - 2 * t);
          const exitTravel = isMobileScreen ? 42 : 65;
          translateY = -easeT * exitTravel;
          scale = 1.0 - easeT * 0.04;
          opacity = Math.max(0, 1.0 - easeT * 0.95);
        }

        const isInteractive = absDelta <= DWELL + 0.12;

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center px-3 sm:px-6 lg:px-10 pt-16 sm:pt-14 pb-4 sm:pb-6 will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
            }}
          >
            {/* Background 3D Gym Environment (Plates, Dumbbells, Barbell) */}
            <FitnessArchitecturalBackground globalProgress={globalProgress} />

            {/* Dark Impact: 100% Solid & Crystal Clear Fitness Sanctuary */}
            <FitnessSectionContent globalProgress={globalProgress} />
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 6: GUEST CHRONICLES & RESORT PHOTOS (PROGRESS 9.0 TO 13.0)
          CONTINUOUS SPATIAL TRANSITIONS
         ========================================================================= */}
      {(() => {
        const isVisible = globalProgress >= 7.95 && globalProgress <= 14.0;
        if (!isVisible) return null;

        let translateY = 0;
        let opacity = 1.0;
        let scale = 1.0;

        if (globalProgress < 8.95) {
          // Entering from Fitness: smoothly materializes from depth (7.95 -> 8.95)
          const t = Math.max(0, Math.min(1.0, (8.95 - globalProgress) / 1.0));
          const easeT = t * t * (3 - 2 * t);
          const enterTravel = isMobileScreen ? 42 : 70;
          translateY = easeT * enterTravel;
          scale = 0.95 + (1.0 - easeT) * 0.05;
          opacity = Math.max(0, 1.0 - easeT * 0.90);
        } else if (globalProgress > 13.0) {
          // Exiting to Footer: smoothly lifts upwards towards top
          const t = Math.min(1.0, (globalProgress - 13.0) / 1.0);
          const easeT = t * t * (3 - 2 * t);
          const exitTravel = isMobileScreen ? 45 : 80;
          translateY = -easeT * exitTravel;
          scale = 1.0 - easeT * 0.04;
          opacity = Math.max(0, 1.0 - easeT);
        } else {
          translateY = 0;
          opacity = 1.0;
          scale = 1.0;
        }

        const isInteractive = globalProgress >= 8.85 && globalProgress <= 13.40;

        return (
          <div
            className={`absolute inset-0 will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale})`,
            }}
          >
            <ScrollChroniclesSection
              globalProgress={globalProgress}
              onScrubProgress={jumpToProgress}
              onOpenBooking={onOpenBooking}
              baseProgress={9.0}
            />
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 7: GRAND HOTEL FOOTER SLIDE (PROGRESS 14.0)
         ========================================================================= */}
      {(() => {
        const isVisible = globalProgress >= 12.95;
        if (!isVisible) return null;

        const delta = globalProgress - 14.0;
        let translateY = 0;
        let opacity = 1.0;

        if (delta < 0) {
          const t = Math.min(1.0, -delta / 1.0);
          const easeT = t * t * (3 - 2 * t);
          // Glides up into view over 13.0 -> 14.0
          const enterTravel = isMobileScreen && typeof window !== 'undefined' ? Math.min(280, window.innerHeight * 0.40) : 90;
          translateY = easeT * enterTravel;
          opacity = Math.max(0, 1.0 - easeT * 0.85);
        }

        const isInteractive = globalProgress >= 13.60;

        return (
          <div
            className={`absolute inset-0 will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
              }`}
            style={{
              opacity,
              transform: `translate3d(0px, ${translateY}px, 0px)`,
            }}
          >
            <GrandFooterSlide
              onOpenBooking={onOpenBooking}
              jumpToStage={jumpToStage}
            />
          </div>
        );
      })()}
    </div>
  );
}
