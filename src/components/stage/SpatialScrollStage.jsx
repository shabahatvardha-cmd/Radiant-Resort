import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCw,
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  Key,
  Flame,
  Wine,
  Lock,
  Star,
  Quote,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  Check,
  Camera,
  ShieldAlert,
  Crown,
  EyeOff,
  Utensils,
  Music,
  Sun,
  Shirt,
  Coffee,
  Calendar,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCardFlipSound, playChimeSound, playClickSound } from '../../utils/audioEffects';
import HotelLogoMedallion from '../hero/HotelLogoMedallion';
import ScrollChroniclesSection from '../reviews/ScrollChroniclesSection';
import GrandFooterSlide from '../layout/GrandFooterSlide';
import LiquidChromeDiningBackground from '../background3d/LiquidChromeDiningBackground';
import FloatingFoodUniverseDiningBackground from '../background3d/FloatingFoodUniverseDiningBackground';
import KineticTypographyBackground from '../background3d/KineticTypographyBackground';

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
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite Room',
    watermark: 'DELUXE SUITE',
    tagline: 'Spacious Suite with Elegant Living Quarter',
    frontImages: [
      { label: 'Living Salon', src: '/images/rooms/deluxe-suite/deluxe-suite-1.webp' },
      { label: 'Deluxe Bed', src: '/images/rooms/deluxe-suite/deluxe-suite-2.webp' },
      { label: 'Ensuite Details', src: '/images/rooms/deluxe-suite/deluxe-suite-3.webp' },
    ],
    price: '₹6,499',
    period: 'per night',
    size: '300 sq. ft',
    capacity: '1–2 Persons',
    view: 'Resort Courtyard & Gardens',
    badge: 'PREMIUM SUITE',
    baseAngle: 1.8,
    accentGlow: 'from-rose-100/40 to-amber-200/30',
    frontHighlights: [
      'Separate Living Area & Spacious Bedroom',
      'Plush King-Size Bed with Stylish Interiors',
      'Work Desk, Wardrobe, Mini Fridge & Tea Maker',
      'Premium Bathroom Fittings & Essential Toiletries',
    ],
    backSpecs: [
      { label: 'Layout Architecture', val: 'Separate Living Area + Bedroom' },
      { label: 'Bedding', val: 'Plush King-Size Bed' },
      { label: 'Children Policy', val: 'Kids Stay Free using existing bedding' },
      { label: 'Extra Bedding', val: 'Rollaway Bed available @ ₹799/day' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Express Check-out 12:00 Noon' },
    ],
    secretNote: 'Where space, style, and convenience come together for a truly relaxing and memorable stay.',
  },
  {
    id: 'grandeur-room',
    name: 'Grandeur Room',
    watermark: 'GRANDEUR',
    tagline: 'Unmatched Elegance & Grandeur Interiors',
    frontImages: [
      { label: 'Grandeur Sanctuary', src: '/images/rooms/grandeur-room/grandeur-1.webp' },
      { label: 'Lavish King Bed', src: '/images/rooms/grandeur-room/grandeur-2.webp' },
      { label: 'Modern Ensuite Bath', src: '/images/rooms/grandeur-room/grandeur-3.webp' },
    ],
    price: '₹8,999',
    period: 'per night',
    size: '300 sq. ft',
    capacity: '1–2 Persons',
    view: 'Grand Resort Entrance & Lawns',
    badge: 'LUXURY REDEFINED',
    baseAngle: -2.2,
    accentGlow: 'from-amber-100/40 to-yellow-200/30',
    frontHighlights: [
      'Lavish King Bed with Refined Contemporary Decor',
      'Well-Appointed Seating Area & Dedicated Work Desk',
      'Mini Refrigerator, Tea/Coffee Maker & Ample Wardrobe',
      '24-Hour Room Service & Premium Toiletries',
    ],
    backSpecs: [
      { label: 'Dimensions', val: '300 sq. ft Room' },
      { label: 'Bedding', val: 'Lavish King-Size Bed' },
      { label: 'Children Policy', val: 'Kids up to 5 stay free!' },
      { label: 'Extra Bedding', val: 'Rollaway Bed available @ ₹999/day' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Before 12:00 PM' },
    ],
    secretNote: 'Step into unmatched elegance where luxury meets sophistication — crafted for a truly memorable stay.',
  },
  {
    id: 'standard-room',
    name: 'Standard Room',
    watermark: 'STANDARD',
    tagline: 'Cozy, Functional & Budget-Friendly Comfort',
    frontImages: [
      { label: 'Cozy Room Interior', src: '/images/rooms/standard-room/standard-1.webp' },
      { label: 'Work Desk & Bed', src: '/images/rooms/standard-room/standard-2.webp' },
      { label: 'Attached Bath', src: '/images/rooms/standard-room/standard-3.webp' },
    ],
    price: '₹3,499',
    period: 'per night',
    size: '200 sq. ft',
    capacity: '1–2 Persons',
    view: 'Serene Resort Grounds',
    badge: 'ESSENTIAL COMFORT',
    baseAngle: 1.2,
    accentGlow: 'from-stone-100/40 to-stone-200/30',
    frontHighlights: [
      'Comfortable Bed with Cozy & Functional Interiors',
      'Air Conditioning, Flat-Screen TV & Complimentary Wi-Fi',
      'Wardrobe, Work Desk & 24-Hour Room Service',
      'Attached Bathroom with Hot & Cold Water Facilities',
    ],
    backSpecs: [
      { label: 'Dimensions', val: '200 sq. ft Room' },
      { label: 'Bedding', val: 'Comfortable Bedding' },
      { label: 'Children Policy', val: 'Kids Stay Free using existing bedding' },
      { label: 'Extra Bedding', val: 'Rollaway Bed available @ ₹799/day' },
      { label: 'Check-In / Out', val: 'From 2:00 PM / Express Check-out 12:00 Noon' },
    ],
    secretNote: 'The perfect balance of comfort and affordability for short stays and business visits.',
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

// MALIBU PARTY & EVENT NIGHTS / DAYS
const MALIBU_EVENTS = [
  {
    id: 'bolly-sun',
    type: 'Malibu Night',
    title: 'Bollywood Sunday',
    timing: 'Sunday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'High-octane Bollywood dance anthems, live percussion beats, and rooftop cocktail drama under the stars.',
    image: '/images/malibu/malibu-1.webp',
  },
  {
    id: 'filmy-sat',
    type: 'Malibu Night',
    title: 'Filmy Shanivar',
    timing: 'Saturday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Blockbuster weekend celebration with trending film mixes, signature mixology, and vibrant rooftop energy.',
    image: '/images/malibu/malibu-2.webp',
  },
  {
    id: 'golden-fri',
    type: 'Malibu Night',
    title: 'Golden Era Friday',
    timing: 'Friday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Nostalgic retro melodies, timeless classics, and craft smoked bourbon flights at 84 meters elevation.',
    image: '/images/malibu/malibu-3.webp',
  },
  {
    id: 'chill-thu',
    type: 'Malibu Night',
    title: 'Chill Out Thursday',
    timing: 'Thursday • 6:30 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Acoustic golden hour sessions, deep ambient lounge beats, and woodfired gourmet bites in private cabanas.',
    image: '/images/malibu/malibu-1.webp',
  },
  {
    id: 'ladies-night',
    type: 'Malibu Night',
    title: 'Ladies Night',
    timing: 'Wednesday • 7:00 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Complimentary artisanal cocktails for the ladies, neon glam aesthetics, and commercial dance grooves.',
    image: '/images/malibu/malibu-2.webp',
  },
  {
    id: 'throwback-tue',
    type: 'Malibu Night',
    title: 'Throwback Tuesday',
    timing: 'Tuesday • 6:30 PM Onwards',
    badge: 'MALIBU NIGHT',
    desc: 'Old-school jams, RnB beats, and relaxed evening conversations overlooking Gorakhpur’s twinkling skyline.',
    image: '/images/malibu/malibu-3.webp',
  },
  {
    id: 'garba-groove',
    type: 'Radiant Day',
    title: 'Garba Groove',
    timing: 'Radiant Day Special • Festive Event',
    badge: 'RADIANT DAY',
    desc: 'Vibrant cultural celebration, rhythmic folk dhol beats, festive attire, and signature culinary spreads.',
    image: '/images/hotel/hotel-1.webp',
  },
  {
    id: 'prince-jordan',
    type: 'Radiant Day',
    title: 'Prince Jordan',
    timing: 'Radiant Day Special • Live Concert',
    badge: 'RADIANT DAY',
    desc: 'Exclusive celebrity live vocal showcase, soulful acoustic melodies, and VIP outdoor lawn experience.',
    image: '/images/malibu/malibu-1.webp',
  },
  {
    id: 'aerial-act',
    type: 'Radiant Day',
    title: 'Aerial Act',
    timing: 'Radiant Day Special • Spectacle',
    badge: 'RADIANT DAY',
    desc: 'Breathtaking aerial acrobatics, gravity-defying silk choreography, and awe-inspiring resort entertainment.',
    image: '/images/malibu/malibu-2.webp',
  },
];

const STAGE_TITLES = [
  '01 REGAL OPENING',
  '02 ROOMS & SUITES',
  '03 KINETIC REALMS',
  '04 MALIBU PARTY',
  '05 THE SEVEN SCENTRIC',
  '06 GUEST CHRONICLES',
  '07 GRAND FOOTER',
];

// Map 7 major navigation milestones to continuous timeline progress steps
const STAGE_TO_PROGRESS_MAP = [
  0.0,  // 0: Regal Opening
  1.0,  // 1: Rooms & Suites Deck (Room 1)
  5.0,  // 2: Kinetic Realms
  6.0,  // 3: Malibu Party Starts From Here
  7.0,  // 4: The Seven Scentric Dining
  8.0,  // 5: Guest Chronicles
  13.0, // 6: Grand Hotel Footer
];

// Distinct 3D exit and entrance trajectories across all 6 spatial directions (60° hex radial sectors)
// Each suite owns 1 distinct exit direction, and enters from a completely different direction!
const CARD_TRAJECTORIES = [
  // Room 0 (Deluxe Room): Exits to West (Pure Left), Enters from North (Pure Top)
  {
    exitX: -160,
    exitY: 0,
    exitRot: -20,
    enterX: 0,
    enterY: -150,
    enterRot: 0,
  },
  // Room 1 (Executive Room): Exits to North-East (Top-Right), Enters from East (Pure Right)
  {
    exitX: 140,
    exitY: -120,
    exitRot: 22,
    enterX: 160,
    enterY: 0,
    enterRot: 14,
  },
  // Room 2 (Executive Suite): Exits to South-East (Bottom-Right), Enters from South-West (Bottom-Left)
  {
    exitX: 140,
    exitY: 120,
    exitRot: 24,
    enterX: -140,
    enterY: 120,
    enterRot: -18,
  },
  // Room 3 (Deluxe Suite): Exits to South (Pure Bottom), Enters from North-West (Top-Left)
  {
    exitX: 0,
    exitY: 160,
    exitRot: -16,
    enterX: -140,
    enterY: -120,
    enterRot: -14,
  },
  // Room 4 (Grandeur Room): Exits to North-West (Top-Left), Enters from South-East (Bottom-Right)
  {
    exitX: -140,
    exitY: -120,
    exitRot: -26,
    enterX: 140,
    enterY: 120,
    enterRot: 18,
  },
  // Room 5 (Standard Room): Exits to South-West (Bottom-Left), Enters from West (Pure Left)
  {
    exitX: -140,
    exitY: 120,
    exitRot: 20,
    enterX: -160,
    enterY: 0,
    enterRot: -12,
  },
];

export default function SpatialScrollStage({ onOpenBooking }) {
  // UNIFIED CONTINUOUS SPATIAL TIMELINE (0.0 to 13.0)
  // Single continuous scroll journey: zero stops, zero dead-zones, seamless across all sections
  const [globalProgress, setGlobalProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const snapTimeoutRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const MAX_PROGRESS = 13.0;

  // Room Steps (1.0 to 4.0 across 6 suites: Deluxe, Executive, Exec Suite, Deluxe Suite, Grandeur, Standard)
  const ROOM_STEPS = [1.0, 1.6, 2.2, 2.8, 3.4, 4.0];
  const gestureAnchorRef = useRef(null);
  const gestureTimerRef = useRef(null);

  // Per-Card Angle & Flip State Maps (strictly isolated per room card)
  const [cardAngles, setCardAngles] = useState({});
  const [cardFlipped, setCardFlipped] = useState({});

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

  // Malibu Events State
  const [activeMalibuEventIdx, setActiveMalibuEventIdx] = useState(0);
  const [malibuFilter, setMalibuFilter] = useState('ALL');

  // Dining Image Selector State
  const [diningImgIdx, setDiningImgIdx] = useState(0);

  // Classified Vault State
  const [isVaultRevealed, setIsVaultRevealed] = useState(false);

  // Testimonial State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Track mouse coordinates globally for 3D parallax
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

  // Support direct stage link via ?stage= or ?progress= URL query parameter
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const progParam = params.get('progress');
      if (progParam !== null) {
        const p = parseFloat(progParam);
        if (!isNaN(p)) {
          targetProgressRef.current = p;
          setGlobalProgress(p);
          return;
        }
      }
      const stageParam = params.get('stage');
      if (stageParam !== null) {
        const idx = parseInt(stageParam, 10);
        if (!isNaN(idx)) {
          const target = STAGE_TO_PROGRESS_MAP[idx] ?? 0;
          targetProgressRef.current = target;
          setGlobalProgress(target);
        }
      }
    } catch (e) {}
  }, []);

  // Jump smoothly to a specific progress position
  const jumpToProgress = (pos) => {
    targetProgressRef.current = Math.max(0, Math.min(MAX_PROGRESS, pos));
    playClickSound();
  };

  const jumpToStage = (stageIdx) => {
    const target = STAGE_TO_PROGRESS_MAP[stageIdx] ?? 0;
    jumpToProgress(target);
  };

  // Jump to specific room inside the Sanctuary Deck
  const scrubToRoom = (roomIdx) => {
    const target = ROOM_STEPS[roomIdx] ?? 1.0;
    jumpToProgress(target);
  };

  // Silky Smooth Damped RAF Loop for Continuous Playback
  useEffect(() => {
    let animId;
    const loop = () => {
      setGlobalProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.0008) return target;
        // 0.09 factor provides calm, luxurious, video-like continuous gliding
        return prev + diff * 0.09;
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
    if (rounded !== lastActiveStepRef.current && Math.abs(globalProgress - rounded) < 0.06) {
      lastActiveStepRef.current = rounded;
      playClickSound();
    }
  }, [globalProgress]);

  // UNIFIED SCROLL LISTENER:
  // Every scroll moves the timeline smoothly and continuously at a calm, luxurious pace.
  // In Rooms & Suites (1.0 to 4.0), the cards move directly in proportion to scroll (scrubbed),
  // with a single scroll gesture strictly anchored to transition between current and adjacent card only.
  useEffect(() => {
    const handleWheel = (e) => {
      const cur = targetProgressRef.current;
      const inRoomSection = cur >= 0.88 && cur <= 4.12;

      if (inRoomSection) {
        if (gestureAnchorRef.current === null) {
          gestureAnchorRef.current = cur;
        }

        // Anchor the gesture to the room where this scroll gesture began
        const startIdx = Math.min(5, Math.max(0, Math.round((gestureAnchorRef.current - 1.0) / 0.60)));
        // Strictly prevent a single scroll gesture from blowing past the adjacent room
        const lowerBound = startIdx > 0 ? ROOM_STEPS[startIdx - 1] : 0.0;
        const upperBound = startIdx < 5 ? ROOM_STEPS[startIdx + 1] : 5.0;

        // Controlled, calm sensitivity so card does not rush
        const sensitivity = 0.0011;
        const step = e.deltaY * sensitivity;
        targetProgressRef.current = Math.max(lowerBound, Math.min(upperBound, cur + step));

        // When user pauses or finishes scrolling, gently settle onto the nearest room milestone
        clearTimeout(gestureTimerRef.current);
        gestureTimerRef.current = setTimeout(() => {
          const c = targetProgressRef.current;
          if (c >= 0.85 && c <= 4.15) {
            const nearestIdx = Math.min(5, Math.max(0, Math.round((c - 1.0) / 0.60)));
            targetProgressRef.current = ROOM_STEPS[nearestIdx];
          }
          gestureAnchorRef.current = null;
        }, 220);
        return;
      }

      // Outside Rooms & Suites: continuous smooth scrolling
      const sensitivity = 0.0013;
      const step = e.deltaY * sensitivity;
      let nextProgress = Math.max(0, Math.min(MAX_PROGRESS, cur + step));

      // If entering Room section from Hero (scrolling down past 0.88), land cleanly on Room 0 (1.0)
      if (cur < 0.88 && nextProgress >= 0.88 && e.deltaY > 0) {
        nextProgress = 1.0;
        gestureAnchorRef.current = null;
      }
      // If entering Room section from Realms (scrolling up below 4.12), land cleanly on Room 5 (4.0)
      else if (cur > 4.12 && nextProgress <= 4.12 && e.deltaY < 0) {
        nextProgress = 4.0;
        gestureAnchorRef.current = null;
      }

      targetProgressRef.current = nextProgress;
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const cur = targetProgressRef.current;
        const inRoomSection = cur >= 0.88 && cur <= 4.12;

        if (inRoomSection) {
          if (gestureAnchorRef.current === null) {
            gestureAnchorRef.current = cur;
          }
          const startIdx = Math.min(5, Math.max(0, Math.round((gestureAnchorRef.current - 1.0) / 0.60)));
          const lowerBound = startIdx > 0 ? ROOM_STEPS[startIdx - 1] : 0.0;
          const upperBound = startIdx < 5 ? ROOM_STEPS[startIdx + 1] : 5.0;

          const step = deltaY * 0.0016;
          targetProgressRef.current = Math.max(lowerBound, Math.min(upperBound, cur + step));

          clearTimeout(gestureTimerRef.current);
          gestureTimerRef.current = setTimeout(() => {
            const c = targetProgressRef.current;
            if (c >= 0.85 && c <= 4.15) {
              const nearestIdx = Math.min(5, Math.max(0, Math.round((c - 1.0) / 0.60)));
              targetProgressRef.current = ROOM_STEPS[nearestIdx];
            }
            gestureAnchorRef.current = null;
          }, 220);
          return;
        }

        const step = deltaY * 0.0020;
        targetProgressRef.current = Math.max(0, Math.min(MAX_PROGRESS, cur + step));
      }
    };

    const handleTouchEnd = () => {
      // Free touch scrolling without aggressive snapping
    };

    const handleKeyDown = (e) => {
      const cur = targetProgressRef.current;
      const inRoomSection = cur >= 0.85 && cur <= 4.15;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (inRoomSection) {
          const startIdx = Math.min(5, Math.max(0, Math.round((cur - 1.0) / 0.60)));
          const next = startIdx < 5 ? ROOM_STEPS[startIdx + 1] : 5.0;
          targetProgressRef.current = next;
        } else {
          targetProgressRef.current = Math.min(MAX_PROGRESS, Math.floor(targetProgressRef.current + 1));
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (inRoomSection) {
          const startIdx = Math.min(5, Math.max(0, Math.round((cur - 1.0) / 0.60)));
          const prev = startIdx > 0 ? ROOM_STEPS[startIdx - 1] : 0.0;
          targetProgressRef.current = prev;
        } else {
          targetProgressRef.current = Math.max(0, Math.ceil(targetProgressRef.current - 1));
        }
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
   * Features:
   * 1. Generous Dwell Plateau: Section is 100% stationary and opaque within absDelta <= 0.28
   *    (gives the user plenty of comfortable "time on screen" to view cards and text).
   * 2. Smooth Transition Zone: Smooth Hermite curve from 0.28 to 0.58.
   * 3. Zero-Collision Offsets: Small, gentle displacement (45px / 40%) prevents cards from crossing screens.
   * 4. Complete unmounting at absDelta >= 0.58 ensures adjacent stages never collide.
   */
  const getStageTransform = (targetProgressValue) => {
    const delta = globalProgress - targetProgressValue;
    const absDelta = Math.abs(delta);

    // Visible only within 0.58 of the target milestone (zero cross-stage collisions)
    const isVisible = absDelta < 0.58;

    const DWELL_RADIUS = 0.28;
    const TRANSITION_SPAN = 0.30;

    let opacity = 0;
    let easeOut = 0;

    if (absDelta <= DWELL_RADIUS) {
      // Solid dwell plateau: 100% still, 100% visible, fully interactive
      opacity = 1;
      easeOut = 0;
    } else if (absDelta < DWELL_RADIUS + TRANSITION_SPAN) {
      const transProgress = (absDelta - DWELL_RADIUS) / TRANSITION_SPAN;
      // Smooth Hermite cubic ease
      easeOut = transProgress * transProgress * (3 - 2 * transProgress);
      // Smooth cosine fade
      opacity = Math.max(0, 0.5 * (1 + Math.cos(Math.PI * transProgress)));
    } else {
      opacity = 0;
      easeOut = 1;
    }

    const isInteractive = absDelta <= DWELL_RADIUS + 0.05;

    // Displacement offsets: 0 during dwell; gentle, controlled slide on exit
    const topY = -easeOut * 45;
    const rightX = easeOut * 40;
    const leftX = -easeOut * 40;

    return {
      delta,
      absDelta,
      isVisible,
      opacity,
      isInteractive,
      topY,
      rightX,
      leftX,
      easeOut,
    };
  };

  // ROOM SECTION TIMELINE CALCULATIONS (1.0 to 4.0 across all 6 rooms)
  const roomT = Math.max(0, Math.min(1, (globalProgress - 1.0) / 3.0));
  const roomProgress = roomT * (SUITES.length - 1);
  const currentRoomFloor = Math.min(SUITES.length - 1, Math.max(0, Math.round(roomProgress)));
  const currentSuite = SUITES[currentRoomFloor] || SUITES[0];
  const currentAngle = currentSuite.frontImages[getCardAngle(currentSuite.id)] || currentSuite.frontImages[0];
  const currentRealm = REALMS[activeRealmIdx] || REALMS[0];

  // Room section visibility: enters smoothly from Hero (0.35 -> 1.0) and exits smoothly to Realms (4.0 -> 4.85)
  const roomSectionVisible = globalProgress > 0.35 && globalProgress < 4.85;
  let roomSectionOpacity = 1;
  if (globalProgress < 1.0) {
    const t = Math.max(0, (globalProgress - 0.35) / 0.65);
    roomSectionOpacity = 0.5 * (1 - Math.cos(Math.PI * t));
  } else if (globalProgress > 4.0) {
    const t = Math.min(1, (globalProgress - 4.0) / 0.85);
    roomSectionOpacity = 0.5 * (1 + Math.cos(Math.PI * t));
  }

  // Major stage dock indicator determination
  let currentMilestone = 0;
  if (globalProgress < 0.8) currentMilestone = 0;
  else if (globalProgress < 4.5) currentMilestone = 1;
  else if (globalProgress < 5.5) currentMilestone = 2;
  else if (globalProgress < 6.5) currentMilestone = 3;
  else if (globalProgress < 7.5) currentMilestone = 4;
  else if (globalProgress < 12.5) currentMilestone = 5;
  else currentMilestone = 6;

  // 3D Pack interaction handlers
  const handlePackMouseDown = (e) => {
    if (e.target.closest('button, select, input, a')) return;
    setIsDraggingPack(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    packRotateRef.current = { ...packTilt };
  };

  useEffect(() => {
    const handlePackMove = (e) => {
      if (!isDraggingPack) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white text-charcoal select-none z-10 perspective-2000">
      {/* =========================================================================
          STAGE 0: REGAL OPENING (BRIGHT DAYLIGHT LUXURY & OFFICIAL HOTEL LOGO)
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, leftX, rightX } = getStageTransform(0.0);
        if (!isVisible) return null;

        const centerScale = Math.max(0.7, 1 - absDelta * 0.4);
        const centerZ = -absDelta * 400;

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center pt-10 sm:pt-12 pb-2 ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
            style={{ opacity }}
          >
            {/* Luminous Sunlit Video Layer with Soft Daylight Veil */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105 filter brightness-[1.02] contrast-[1.02]"
                style={{
                  transform: `scale(1.06) translate(${mousePos.x * -14}px, ${mousePos.y * -14}px)`,
                }}
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
              </video>
              {/* Luminous Soft White Scrim for Vibrant Daylight Luxury */}
              <div className="absolute inset-0 bg-white/35 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-white/50" />
            </div>

            {/* Left Card: Flies in from LEFT (Bright White, Razor-Sharp Text) */}
            <div
              className="absolute top-20 sm:top-24 left-[3%] xl:left-[6%] z-30 hidden xl:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-stone-300 shadow-[0_15px_35px_rgba(0,0,0,0.08)] will-change-transform"
              style={{
                transform: `translate3d(${leftX}%, ${mousePos.y * 12}px, 0px) rotate(${mousePos.x * 3}deg)`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-forest-950 flex items-center justify-center text-gold font-bold shadow-md">
                <Shield className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[9px] tracking-widest text-gold-dark uppercase font-black font-sans">Official Resort</p>
                <p className="text-xs font-serif text-forest-950 font-black">Gorakhpur Landmark</p>
              </div>
            </div>

            {/* Right Card: Flies in from RIGHT (Bright White, Razor-Sharp Text) */}
            <div
              className="absolute top-20 sm:top-24 right-[3%] xl:right-[6%] z-30 hidden xl:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-stone-300 shadow-[0_15px_35px_rgba(0,0,0,0.08)] will-change-transform"
              style={{
                transform: `translate3d(${rightX}%, ${mousePos.y * -12}px, 0px) rotate(${mousePos.x * -3}deg)`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-forest-950 flex items-center justify-center text-gold font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[9px] tracking-widest text-gold-dark uppercase font-black font-sans">Malibu Rooftop</p>
                <p className="text-xs font-serif text-forest-950 font-black">Sky Lounge & Cabanas</p>
              </div>
            </div>

            {/* Center Content: Transparent Hero Header & Medallion Console */}
            <div
              className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 py-1 text-center flex flex-col items-center justify-center will-change-transform bg-transparent"
              style={{
                transform: `scale(${centerScale}) translateZ(${centerZ}px)`,
              }}
            >
              {/* High-Contrast Crisp Black & Gold Headlines */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tight text-forest-950 leading-[0.98] drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
                WHERE REGAL DIGNITY
              </h1>
              <h2 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-serif italic text-gold-dark font-black tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] mb-1">
                Meets Untamed Luxury
              </h2>

              {/* Circular 3D Sovereign Medallion: Strictly Vertical, Both Sides Same Logo */}
              <div className="relative my-1 flex items-center justify-center will-change-transform group">
                {/* Radiant Golden Glow */}
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-gold/25 via-amber-300/35 to-gold/15 blur-2xl -z-10 animate-pulse [animation-duration:4s]" />

                {/* Subtle Concentric Minted Gold Ring */}
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border border-gold/40 border-dashed animate-spin [animation-duration:36s] pointer-events-none" />

                {/* Circular 3D Hotel Logo Medallion with identical vertical design on both sides */}
                <HotelLogoMedallion />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                <button
                  onClick={() => onOpenBooking && onOpenBooking()}
                  className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-forest-950 hover:bg-forest-900 text-gold font-sans font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-all shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:scale-105"
                >
                  Reserve Room & Suite
                </button>
                <button
                  onClick={() => jumpToProgress(1.0)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-[11px] sm:text-xs tracking-[0.18em] uppercase transition-all shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:scale-105 border border-gold-dark"
                >
                  Explore Rooms & Suites
                </button>
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
          className={`absolute inset-0 flex items-center justify-center p-4 sm:p-8 bg-[#FAF9F5] text-forest-950 overflow-hidden ${
            globalProgress >= 0.8 && globalProgress <= 4.2 ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
          }`}
          style={{ opacity: roomSectionOpacity }}
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
              className="whitespace-nowrap font-serif font-black uppercase text-[17vw] tracking-tighter text-stone-900/[0.04] select-none will-change-transform transition-transform duration-300 ease-out"
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
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-2.5">
            {/* TOP BAR: Room Portfolio Navigation & Scrub Dots */}
            <div className="text-center will-change-transform">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-black uppercase tracking-tight text-forest-950">
                Rooms & Suites Portfolio <span className="text-gold-dark italic font-normal">& Blueprint Specs</span>
              </h2>
            </div>

            {/* THREE-COLUMN STAGED LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xl:gap-5 items-center my-auto">
              {/* LEFT PANEL: Pinned Architectural Metrics (Bright White Card, Dark Text) */}
              <div className="hidden lg:block lg:col-span-3 space-y-2 will-change-transform">
                <div className="p-3.5 xl:p-4 rounded-2xl bg-white border-2 border-stone-300 shadow-[0_15px_35px_rgba(0,0,0,0.06)] space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                    <span className="text-[9px] tracking-widest uppercase font-black text-gold-dark font-sans block">
                      Architectural Metrics
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950">0{currentRoomFloor + 1} of 0{SUITES.length}</span>
                  </div>

                  <h3 className="text-lg xl:text-xl font-serif font-black text-forest-950">{currentSuite.name}</h3>
                  <p className="text-[10px] xl:text-[11px] text-charcoal font-medium font-sans leading-snug line-clamp-2">{currentSuite.tagline}</p>

                  <div className="space-y-1 pt-1 border-t border-stone-200 text-[10px] xl:text-[11px] font-sans">
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">Scale</span>
                      <strong className="text-forest-950 font-black">{currentSuite.size}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">Capacity</span>
                      <strong className="text-forest-950 font-black">{currentSuite.capacity}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-stone-100">
                      <span className="text-charcoal font-semibold">View</span>
                      <strong className="text-forest-950 font-bold text-[10px] truncate max-w-[130px] text-right">
                        {currentSuite.view}
                      </strong>
                    </div>
                    <div className="flex justify-between py-0.5 pt-0.5">
                      <span className="text-charcoal font-semibold">Tariff</span>
                      <strong className="text-gold-dark font-serif font-black text-sm">{currentSuite.price}</strong>
                    </div>
                  </div>
                </div>

                {/* 3-Angle Camera Selector */}
                <div className="p-2.5 xl:p-3 rounded-xl bg-white border-2 border-stone-300 shadow-sm space-y-1">
                  <span className="text-[9px] tracking-widest uppercase font-black text-forest-950 font-sans block flex items-center gap-1">
                    <Camera className="w-3 h-3 text-gold-dark" /> Perspectives
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {currentSuite.frontImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCardAngle(currentSuite.id, i)}
                        className={`p-1 rounded-lg text-[9px] font-sans font-black uppercase transition-all ${
                          getCardAngle(currentSuite.id) === i
                            ? 'bg-forest-950 text-gold shadow-md ring-2 ring-gold'
                            : 'bg-stone-100 text-charcoal hover:bg-stone-200 border border-stone-300'
                        }`}
                      >
                        View 0{i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CENTER STAGE: THE 3D SCROLL-SCRUBBED ROOM PACK DECK (BRIGHT LUXURY CARDS) */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[370px] lg:min-h-[395px] will-change-transform">
                {SUITES.map((suiteItem, suiteIdx) => {
                  const delta = roomProgress - suiteIdx;
                  const absDelta = Math.abs(delta);

                  // Cull distant offscreen cards
                  if (absDelta > 1.35) return null;

                  const isTopCard = absDelta < 0.45;

                  // Generous Dwell Plateau: Card is 100% still, centered, and readable within DWELL_ZONE
                  const DWELL_ZONE = 0.28;
                  const isInDwell = absDelta <= DWELL_ZONE;
                  const isExiting = delta > DWELL_ZONE; // user scrolled down past dwell: sweeps away
                  const isEntering = delta < -DWELL_ZONE; // user scrolled up/approaching before dwell: arrives

                  // Smooth Hermite ease only outside dwell
                  let ease = 0;
                  if (!isInDwell) {
                    const transProgress = (absDelta - DWELL_ZONE) / (1.0 - DWELL_ZONE);
                    const normT = Math.min(1, Math.max(0, transProgress));
                    ease = normT * normT * (3 - 2 * normT);
                  }

                  const traj = CARD_TRAJECTORIES[suiteIdx] || CARD_TRAJECTORIES[0];

                  let flyX = 0;
                  let flyY = 0;
                  let flyRot = suiteItem.baseAngle;
                  let flyScale = 1;
                  let cardOpacity = 1;

                  if (isExiting) {
                    // Moves away cleanly along this card's unique 1-of-6 radial direction
                    flyX = traj.exitX * ease;
                    flyY = traj.exitY * ease;
                    flyRot = suiteItem.baseAngle + traj.exitRot * ease;
                    flyScale = 1 - ease * 0.08;
                    cardOpacity = Math.max(0, 1 - ease * 1.4);
                  } else if (isEntering) {
                    // Comes in cleanly from this card's unique entrance direction
                    flyX = traj.enterX * ease;
                    flyY = traj.enterY * ease;
                    flyRot = suiteItem.baseAngle + traj.enterRot * ease;
                    flyScale = 0.92 + (1 - ease) * 0.08;
                    cardOpacity = Math.max(0, 1 - ease * 1.4);
                  } else {
                    // Solid Dwell Plateau: 100% resting in center
                    flyX = 0;
                    flyY = 0;
                    flyRot = suiteItem.baseAngle;
                    flyScale = 1;
                    cardOpacity = 1;
                  }

                  // Top active card gets highest z-index
                  const zIndex = isTopCard ? 30 : Math.max(10, 25 - Math.round(absDelta * 10));

                  const currentTiltX = isTopCard ? packTilt.x : 0;
                  const currentTiltY = isTopCard ? packTilt.y : 0;
                  const flipRotY = isCardFlipped(suiteItem.id) ? 180 : 0;

                  const currentSuiteAngle = getCardAngle(suiteItem.id);
                  const activeImg =
                    suiteItem.frontImages[currentSuiteAngle] || suiteItem.frontImages[0];

                  return (
                    <div
                      key={suiteItem.id}
                      onMouseDown={isTopCard ? handlePackMouseDown : undefined}
                      className={`w-[270px] sm:w-[310px] md:w-[340px] lg:w-[355px] xl:w-[365px] h-[335px] sm:h-[365px] md:h-[385px] lg:h-[395px] max-h-[calc(100vh-190px)] absolute preserve-3d will-change-transform rounded-3xl ${
                        isTopCard ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
                      }`}
                      style={{
                        zIndex,
                        opacity: cardOpacity,
                        transform: `translate3d(${flyX}%, ${flyY}px, 0px) scale(${flyScale}) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) rotateZ(${flyRot}deg)`,
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
                        {/* FRONT SIDE (Crisp White Luxury Card) */}
                        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border-2 border-stone-300 text-forest-950 p-3 sm:p-4 lg:p-4.5 flex flex-col justify-between backface-hidden shadow-2xl">
                          {/* Top Specular Bar */}
                          <div className="flex items-center justify-between border-b border-stone-200 pb-1">
                            <span className="px-2 py-0.5 rounded-full bg-forest-950 text-gold text-[8px] sm:text-[9px] font-black uppercase font-sans tracking-widest shadow-sm">
                              {suiteItem.badge}
                            </span>
                            <span className="text-[10px] sm:text-xs font-serif font-black text-forest-950 flex items-center gap-1">
                              <Key className="w-3 h-3 text-gold-dark" /> Suite 0{suiteIdx + 1}
                            </span>
                          </div>

                          {/* Main Photo with Perspective Framing */}
                          <div className="my-auto rounded-xl sm:rounded-2xl overflow-hidden border-2 border-stone-300 h-28 sm:h-32 md:h-36 relative group shadow-md shrink-0">
                            <img
                              src={activeImg.src}
                              alt={activeImg.label}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between text-white">
                              <div>
                                <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-gold font-sans font-black">
                                  {activeImg.label}
                                </p>
                                <h4 className="text-sm sm:text-base font-serif font-black text-white">{suiteItem.name}</h4>
                              </div>
                              <div className="text-right">
                                <p className="text-sm sm:text-base font-serif font-black text-gold">{suiteItem.price}</p>
                                <p className="text-[8px] sm:text-[9px] text-white/80 font-sans font-bold">{suiteItem.period}</p>
                              </div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <ul className="space-y-0.5 text-[10px] sm:text-[11px] text-charcoal font-semibold font-sans my-0.5">
                            {suiteItem.frontHighlights.slice(0, 2).map((hl, i) => (
                              <li key={i} className="flex items-center gap-1.5 truncate">
                                <Check className="w-3 h-3 text-gold-dark shrink-0" />
                                <span className="truncate">{hl}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Flip Action */}
                          <div className="pt-1 border-t border-stone-200 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardFlip(suiteItem.id);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-forest-950 hover:bg-forest-900 text-gold text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider transition-colors shadow-sm"
                            >
                              <RotateCw className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin [animation-duration:10s]" />
                              Specs
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenBooking) onOpenBooking(suiteItem);
                              }}
                              className="px-3 py-1 rounded-lg bg-gold text-forest-950 font-sans font-black text-[9px] sm:text-[10px] uppercase tracking-wider shadow-sm hover:bg-gold-light"
                            >
                              Reserve
                            </button>
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

                {/* 3D Contact Shadow on Ground */}
                <div className="w-56 sm:w-64 h-5 sm:h-6 rounded-full bg-stone-900/15 blur-lg mt-auto z-10" />
              </div>

              {/* RIGHT PANEL: Dynamic VIP Privileges (Bright White Card, Dark Text) */}
              <div className="hidden lg:block lg:col-span-3 space-y-2 will-change-transform">
                <div className="p-3.5 xl:p-4 rounded-2xl bg-white border-2 border-stone-300 shadow-[0_15px_35px_rgba(0,0,0,0.06)] space-y-2">
                  <span className="text-[9px] tracking-widest uppercase font-black text-gold-dark font-sans block flex items-center gap-1">
                    <Crown className="w-3 h-3 text-gold-dark" /> Sovereign Privileges
                  </span>
                  <h4 className="font-serif font-black text-base xl:text-lg text-forest-950">Included With {currentSuite.name.split(' ')[0]}</h4>
                  <ul className="text-[10px] xl:text-[11px] space-y-1 font-sans text-charcoal font-semibold">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-gold-dark shrink-0" />
                      <span>Dedicated 24/7 Royal Butler care</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-gold-dark shrink-0" />
                      <span>Priority Cabana at Malibu Rooftop</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-gold-dark shrink-0" />
                      <span>Complimentary breakfast buffet</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-gold-dark shrink-0" />
                      <span>High-speed Wi-Fi 6 & EV valet</span>
                    </li>
                  </ul>

                  <div className="pt-1">
                    <button
                      onClick={() => onOpenBooking && onOpenBooking(currentSuite)}
                      className="w-full py-2 rounded-full bg-forest-950 hover:bg-forest-900 text-gold font-sans font-black text-[11px] uppercase tracking-wider transition-colors shadow-sm"
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
          Luxury Blurred Card for Text & 3D Floating Spa Card
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, leftX, rightX } = getStageTransform(5.0);
        if (!isVisible) return null;

        const bigTextScale = Math.max(0.4, 1 - absDelta * 0.5);
        const bigTextZ = -absDelta * 600;

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center p-6 sm:p-12 text-forest-950 bg-gradient-to-br from-[#FAF5EE] via-[#F4ECE0] to-[#EFE1CD] overflow-hidden ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
            style={{ opacity }}
          >
            {/* GIANT BACKGROUND TYPOGRAPHY IN CLEAN STONE/GOLD OVERLAY (ORIGINAL REGAL ELEGANCE) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 will-change-transform"
              style={{
                transform: `scale(${bigTextScale}) translateZ(${bigTextZ}px)`,
              }}
            >
              <span className="font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[26vw] leading-none select-none text-amber-950/[0.06]">
                VEDIC
              </span>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-3">
              {/* Top Vedic Spa Bar */}
              <div className="flex items-center justify-between border-b border-stone-300 pb-1.5 sm:pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-sans font-black uppercase tracking-[0.2em] text-forest-950">
                    VEDIC WELLNESS HAVEN & ROYAL SALON
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-sans font-black tracking-widest uppercase text-gold-dark">
                  <span>Daily 8:00 AM – 9:00 PM</span>
                  <span className="text-stone-400">•</span>
                  <span>Ayurvedic Lineage</span>
                </div>
              </div>

              {/* Main Stage: Left Blurred Card Text Area & Right 3D Floating Spa Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center my-auto">
                {/* Left Column: Vedic Spa & Salon Text wrapped in a luxury blurred frosted glass card */}
                <div
                  className="lg:col-span-7 will-change-transform"
                  style={{
                    transform: `translate3d(${leftX}px, 0px, 0px)`,
                  }}
                >
                  <div className="bg-white/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-amber-900/10 shadow-[0_20px_50px_rgba(0,0,0,0.07)] space-y-2 sm:space-y-2.5">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-black uppercase tracking-tight text-forest-950 leading-tight">
                      Vedic Spa & Salon Wellness
                    </h3>
                    <h4 className="text-xs sm:text-sm font-serif italic text-gold-dark font-bold -mt-0.5">
                      Ancient Ayurvedic Healing & Bespoke Royal Grooming
                    </h4>

                    <p className="text-[11px] sm:text-xs lg:text-sm text-charcoal font-medium font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                      Immerse yourself in centuries of Ayurvedic wisdom with authentic Dhanwantari warm herbal oils, therapeutic Abhyanga massages, and holistic soul restoration. Complete your experience at our full-service Royal Salon offering bespoke bridal couture, hair artistry, and luxury grooming.
                    </p>

                    {/* 3 Treatment Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-0.5">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm backdrop-blur-sm">
                        <p className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-wider text-gold-dark">Therapy 01</p>
                        <h5 className="font-serif font-black text-xs text-forest-950 mt-0.5">Abhyanga & Potli</h5>
                        <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-medium mt-0.5">Warm botanicals</p>
                      </div>

                      <div className="p-1.5 sm:p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm backdrop-blur-sm">
                        <p className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-wider text-gold-dark">Therapy 02</p>
                        <h5 className="font-serif font-black text-xs text-forest-950 mt-0.5">Royal Salon Grooming</h5>
                        <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-medium mt-0.5">Hair & bridal care</p>
                      </div>

                      <div className="p-1.5 sm:p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm backdrop-blur-sm">
                        <p className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-wider text-gold-dark">Therapy 03</p>
                        <h5 className="font-serif font-black text-xs text-forest-950 mt-0.5">Hammam & Aroma</h5>
                        <p className="text-[8px] sm:text-[9px] font-sans text-stone-600 font-medium mt-0.5">Herbal steam & detox</p>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-2.5">
                      <button
                        onClick={() =>
                          onOpenBooking &&
                          onOpenBooking({ name: 'Vedic Spa & Royal Salon Ritual', price: '₹4,499' })
                        }
                        className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-forest-950 hover:bg-forest-900 text-gold font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-md hover:scale-105"
                      >
                        <span>Reserve Spa & Salon Experience</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: 3D Floating Spa Card */}
                <div
                  className="lg:col-span-5 hidden lg:flex justify-center will-change-transform"
                  style={{
                    transform: `translate3d(${rightX}px, 0px, 0px)`,
                  }}
                >
                  <div
                    className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-2 border-stone-300 relative group bg-white transition-transform duration-200 ease-out will-change-transform"
                    style={{
                      transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -10}deg)`,
                    }}
                  >
                    <img
                      src="/images/wellness/wellness-card.webp"
                      alt="Vedic Spa & Salon Wellness"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span className="px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-sm text-gold text-[8px] sm:text-[9px] font-sans font-black tracking-wider uppercase border border-gold/40">
                        AUTHENTIC HEALING • 8 AM – 9 PM
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-white flex items-end justify-between">
                      <div>
                        <p className="text-[8px] sm:text-[9px] tracking-widest uppercase font-black text-gold font-sans">
                          HOLISTIC WELLNESS HAVEN
                        </p>
                        <h4 className="text-base sm:text-lg font-serif font-black text-white">VEDIC SPA & ROYAL SALON</h4>
                        <p className="text-[9px] sm:text-[10px] text-stone-200 font-sans font-medium line-clamp-1">
                          Abhyanga oils, bridal couture & timeless restoration.
                        </p>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-md shrink-0 ml-2">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 3: MALIBU PARTY STARTS FROM HERE (PROGRESS 6.0)
          Text area on Left drops from TOP; Picture card on Right slides from RIGHT
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, topY, rightX } = getStageTransform(6.0);
        if (!isVisible) return null;

        const filteredEvents = MALIBU_EVENTS.filter((e) => {
          if (malibuFilter === 'MALIBU NIGHT') return e.type === 'Malibu Night';
          if (malibuFilter === 'RADIANT DAY') return e.type === 'Radiant Day';
          return true;
        });

        const currentEvent = MALIBU_EVENTS[activeMalibuEventIdx] || MALIBU_EVENTS[0];

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center p-6 sm:p-12 text-forest-950 overflow-hidden ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
            style={{ opacity }}
          >
            {/* Scroll-Driven 3D Kinetic Typography Background Layer */}
            <KineticTypographyBackground globalProgress={globalProgress} />

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-3">
              {/* Main Stage: Left Text drops from TOP, Right Card slides from RIGHT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center my-auto">
                {/* Left Column: Transparent Text Area dropping from TOP */}
                <div
                  className="lg:col-span-6 space-y-2 sm:space-y-2.5 will-change-transform bg-transparent p-0"
                  style={{
                    transform: `translate3d(0px, ${topY}px, 0px)`,
                  }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black uppercase text-white tracking-tight leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                    Malibu Party Starts From Here
                  </h3>

                  <p className="text-[11px] sm:text-xs lg:text-sm text-white font-bold font-sans leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] line-clamp-2">
                    Perched atop The Radiant Hotel at 84 meters, Malibu is Gorakhpur's premier nightlife & celebration destination with craft smoked mixology and panoramic sunset skyline beats.
                  </p>

                  {/* Filter Tabs for Malibu Nights vs Radiant Days */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {['ALL', 'MALIBU NIGHT', 'RADIANT DAY'].map((filterKey) => (
                      <button
                        key={filterKey}
                        onClick={() => {
                          setMalibuFilter(filterKey);
                          playClickSound();
                        }}
                        className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider transition-all shadow-md ${
                          malibuFilter === filterKey
                            ? 'bg-gold text-forest-950 shadow-gold/30 border border-gold-light scale-105'
                            : 'bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20'
                        }`}
                      >
                        {filterKey === 'ALL' ? 'All (9)' : filterKey === 'MALIBU NIGHT' ? 'Malibu Nights (6)' : 'Radiant Days (3)'}
                      </button>
                    ))}
                  </div>

                  {/* The 9 Event Cards Pills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[85px] sm:max-h-[105px] lg:max-h-[125px] overflow-y-auto pr-1">
                    {filteredEvents.map((evt) => {
                      const isActive = currentEvent.id === evt.id;
                      return (
                        <button
                          key={evt.id}
                          onClick={() => {
                            const originalIdx = MALIBU_EVENTS.findIndex((e) => e.id === evt.id);
                            setActiveMalibuEventIdx(originalIdx);
                            playClickSound();
                          }}
                          className={`p-1.5 sm:p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                            isActive
                              ? 'bg-forest-950/95 text-gold border-2 border-gold shadow-xl scale-[1.03] backdrop-blur-md'
                              : 'bg-black/65 backdrop-blur-md text-white hover:bg-black/85 border-white/20 shadow-md'
                          }`}
                        >
                          <span className={`text-[8px] sm:text-[9px] font-sans font-black tracking-wider uppercase block truncate ${
                            isActive ? 'text-gold' : 'text-amber-300'
                          }`}>
                            {evt.badge}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-serif font-black truncate block mt-0.5 text-white">
                            {evt.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1 flex items-center gap-2.5">
                    <button
                      onClick={() =>
                        onOpenBooking &&
                        onOpenBooking({ name: `Malibu: ${currentEvent.title}`, price: '₹5,999' })
                      }
                      className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 border border-gold-dark"
                    >
                      <span>Reserve Cabana for {currentEvent.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Picture Card sliding from RIGHT */}
                <div
                  className="lg:col-span-6 hidden lg:flex justify-center will-change-transform"
                  style={{
                    transform: `translate3d(${rightX}%, 0px, 0px)`,
                  }}
                >
                  <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/40 relative group bg-black/50">
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span className="px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-sm text-gold text-[8px] sm:text-[9px] font-sans font-black tracking-wider uppercase border border-gold/40">
                        {currentEvent.badge} • {currentEvent.timing}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-white">
                      <p className="text-[8px] sm:text-[9px] tracking-widest uppercase font-black text-gold font-sans">
                        FEATURED CELEBRATION
                      </p>
                      <h4 className="text-lg sm:text-xl font-serif font-black text-white">{currentEvent.title}</h4>
                      <p className="text-[9px] sm:text-[10px] text-stone-200 font-sans font-medium line-clamp-1 mt-0.5">
                        {currentEvent.desc}
                      </p>
                      <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-white/20">
                        <span className="text-[8px] sm:text-[9px] font-sans font-bold text-gold uppercase tracking-wider">
                          Sunset Beats • Mixology • Private Cabana
                        </span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-md">
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 -rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 4: THE SEVEN SCENTRIC FINE DINING (PROGRESS 7.0)
          Text area on Left drops from TOP; Picture card on Right slides from RIGHT
         ========================================================================= */}
      {(() => {
        const { absDelta, isVisible, opacity, isInteractive, topY, rightX } = getStageTransform(7.0);
        if (!isVisible) return null;

        const DINING_IMAGES = [
          '/images/dining/dining-1.webp',
          '/images/dining/dining-2.webp',
          '/images/dining/dining-3.webp',
        ];

        return (
          <div
            className={`absolute inset-0 flex items-center justify-center p-6 sm:p-12 text-forest-950 overflow-hidden ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
            style={{ opacity }}
          >
            {/* Persistent 3D Floating Food Universe Background Layer */}
            <FloatingFoodUniverseDiningBackground globalProgress={globalProgress} />

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full pt-16 sm:pt-16 pb-2 sm:pb-3">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
                {/* Left Column: Transparent Text Area dropping from TOP */}
                <div
                  className="lg:col-span-6 space-y-1.5 sm:space-y-2 will-change-transform bg-transparent p-0"
                  style={{
                    transform: `translate3d(0px, ${topY}px, 0px)`,
                  }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black uppercase text-white tracking-tight leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                    An Experience for the Senses
                  </h3>
                  <h4 className="text-sm sm:text-base lg:text-lg font-serif italic text-gold font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] -mt-0.5">
                    The Seven Scentric Restaurant
                  </h4>

                  <p className="text-xs sm:text-sm text-white font-medium font-sans leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] line-clamp-2 sm:line-clamp-3">
                    Welcome to our exquisite fine dining restaurant within our 4-star hotel, where culinary artistry and opulent surroundings converge to create an unforgettable gastronomic experience.
                  </p>

                  {/* Operating Hours Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-0.5 sm:pt-1">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-black/65 backdrop-blur-md border border-gold/30 shadow-lg text-white">
                      <div className="flex items-center gap-1.5 text-gold mb-0.5">
                        <Coffee className="w-3.5 h-3.5 text-gold" />
                        <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gold-light">Breakfast</span>
                      </div>
                      <p className="text-xs font-sans font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">7.00 am – 10.30 am</p>
                      <p className="text-[9px] font-sans text-stone-300 font-bold">Daily Buffet</p>
                    </div>

                    <div className="p-1.5 sm:p-2 rounded-xl bg-black/65 backdrop-blur-md border border-gold/30 shadow-lg text-white">
                      <div className="flex items-center gap-1.5 text-gold mb-0.5">
                        <Utensils className="w-3.5 h-3.5 text-gold" />
                        <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gold-light">Lunch</span>
                      </div>
                      <p className="text-xs font-sans font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">12.00 – 2.00 pm</p>
                      <p className="text-[9px] font-sans text-stone-300 font-bold">Daily Service</p>
                    </div>

                    <div className="p-1.5 sm:p-2 rounded-xl bg-black/65 backdrop-blur-md border border-gold/30 shadow-lg text-white">
                      <div className="flex items-center gap-1.5 text-gold mb-0.5">
                        <Wine className="w-3.5 h-3.5 text-gold" />
                        <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gold-light">Dinner</span>
                      </div>
                      <p className="text-xs font-sans font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">From 6.30 pm</p>
                      <p className="text-[9px] font-sans text-stone-300 font-bold">Last order 11 pm</p>
                    </div>
                  </div>

                  {/* Terrace Privilege Alert */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-black/65 backdrop-blur-md border border-amber-500/40 flex items-center gap-2 text-white shadow-lg">
                    <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <p className="text-[11px] sm:text-xs font-sans font-bold text-stone-100">
                      <strong className="font-black uppercase text-gold">Open Terrace:</strong> Open for drinks only AT 7 SCENTRIC.
                    </p>
                  </div>

                  <div className="pt-0.5 sm:pt-1">
                    <button
                      onClick={() =>
                        onOpenBooking &&
                        onOpenBooking({ name: 'The Seven Scentric Fine Dining', price: '₹2,499' })
                      }
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 border border-gold-dark"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Reserve Dining Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Picture Card sliding from RIGHT with thumbnail perspective buttons */}
                <div
                  className="lg:col-span-6 hidden lg:flex flex-col items-center justify-center will-change-transform space-y-2 sm:space-y-2.5"
                  style={{
                    transform: `translate3d(${rightX}%, 0px, 0px)`,
                  }}
                >
                  <div className="w-full max-w-[380px] lg:max-w-[420px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/40 relative group bg-black/50">
                    <img
                      src={DINING_IMAGES[diningImgIdx]}
                      alt="The Seven Scentric Fine Dining"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] sm:text-[10px] tracking-widest uppercase font-black text-gold font-sans">
                          GASTRONOMIC OPULENCE
                        </p>
                        <p className="text-xl sm:text-2xl font-serif font-black text-white">THE SEVEN SCENTRIC</p>
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-lg">
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail perspective selector */}
                  <div className="flex items-center gap-2">
                    {DINING_IMAGES.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDiningImgIdx(idx);
                          playClickSound();
                        }}
                        className={`w-12 sm:w-14 h-8 sm:h-10 rounded-xl overflow-hidden border-2 transition-all ${
                          diningImgIdx === idx
                            ? 'border-gold ring-2 ring-gold/50 scale-105'
                            : 'border-white/30 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgSrc} alt="Perspective" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 5: GUEST CHRONICLES & RESORT PHOTOS (PROGRESS 8.0 TO 12.0)
         ========================================================================= */}
      {(() => {
        const isVisible = globalProgress >= 7.45 && globalProgress <= 12.75;
        if (!isVisible) return null;

        // Smooth entry opacity from Dining stage (7.45 -> 8.0) and exit to Grand Footer (12.0 -> 12.7)
        let opacity = 1;
        if (globalProgress < 8.0) {
          const t = Math.max(0, (globalProgress - 7.45) / 0.55);
          opacity = 0.5 * (1 - Math.cos(Math.PI * t));
        } else if (globalProgress > 12.0) {
          const t = Math.min(1, (globalProgress - 12.0) / 0.75);
          opacity = 0.5 * (1 + Math.cos(Math.PI * t));
        }

        const isInteractive = globalProgress >= 7.85 && globalProgress <= 12.25;

        return (
          <div
            className={`absolute inset-0 ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
            }`}
            style={{ opacity }}
          >
            <ScrollChroniclesSection
              globalProgress={globalProgress}
              onScrubProgress={jumpToProgress}
              onOpenBooking={onOpenBooking}
            />
          </div>
        );
      })()}

      {/* =========================================================================
          STAGE 6: GRAND HOTEL FOOTER SLIDE (PROGRESS 13.0)
         ========================================================================= */}
      {(() => {
        const isVisible = globalProgress >= 12.25;
        if (!isVisible) return null;

        // Smooth entry from Guest Chronicles (12.25 -> 13.0)
        let opacity = 1;
        if (globalProgress < 13.0) {
          const t = Math.max(0, (globalProgress - 12.25) / 0.75);
          opacity = 0.5 * (1 - Math.cos(Math.PI * t));
        }

        const isInteractive = globalProgress >= 12.75;

        // Subtle glide up from bottom as it enters
        const delta = globalProgress - 13.0;
        const translateY = delta < 0 ? -delta * 40 : 0;

        return (
          <div
            className={`absolute inset-0 will-change-transform ${
              isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
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

      {/* =========================================================================
          FIXED RIGHT-SIDE STAGE PROGRESS DOCK
         ========================================================================= */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3 select-none pointer-events-auto">
        {STAGE_TITLES.map((title, i) => {
          const isActive = currentMilestone === i;
          return (
            <button
              key={i}
              onClick={() => jumpToStage(i)}
              className="flex items-center gap-3 group text-right transition-all duration-300"
            >
              <span
                className={`text-[10px] font-sans font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'text-forest-950 opacity-100 translate-x-0 font-black'
                    : 'text-charcoal/50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {title}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3.5 h-8 bg-forest-950 shadow-md ring-2 ring-gold'
                    : 'w-2.5 h-2.5 bg-stone-400 group-hover:bg-gold group-hover:scale-150'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
