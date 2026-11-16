import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Utensils,
  Wine,
  Coffee,
  Clock,
  Phone,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  Flame,
  Wheat,
  Leaf,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';
import BrightCulinaryAtelierBackground from '../components/background3d/BrightCulinaryAtelierBackground';

// =============================================================================
// 1. DATA DEFINITIONS — EXACT CONTENT PRESERVATION
// =============================================================================

export const DINING_IMAGES = [
  '/images/dining/dining-1.webp', // Grand interior, brass geometric ceiling
  '/images/dining/dining-2.webp', // Private dining room, blonde wood slats
  '/images/dining/dining-3.webp', // Opulent restaurant banquet & table setting
];

export const MENU_CATEGORIES = [
  'All Courses',
  'Royal Starters',
  'Awadhi & North Indian',
  'Pan-Asian & Dim Sum',
  'Artisanal Pasta & Grills',
  'Desserts & Patisserie',
];

export const SIGNATURE_DISHES = [
  {
    id: 'm1',
    dishNumber: '01',
    category: 'Royal Starters',
    name: 'Galouti Kebab Awadhi',
    image: '/images/dining/dishes/dish-1.webp',
    type: 'Non-Veg',
    chefSpecial: true,
    price: '₹599',
    motionStyle: 'Layered Smoky Reveal',
    motionDesc: 'Smoked spice vapor mask reveals saffron sheermal & lamb essence',
    desc: 'Melt-in-mouth smoked lamb patties infused with 32 rare Awadhi spices, served on saffron sheermal with mint chutney.',
    notes: 'Smoked with clove & charcoal in sealed brass handi',
    accentColor: '#B5743D',
  },
  {
    id: 'm2',
    dishNumber: '02',
    category: 'Royal Starters',
    name: 'Bhatti Da Paneer Tikka',
    image: '/images/dining/dishes/dish-2.webp',
    type: 'Veg',
    chefSpecial: false,
    price: '₹479',
    motionStyle: 'Ingredient Assembly',
    motionDesc: 'Mustard seeds & roasted gram flour assemble into clay-oven char',
    desc: 'Thick cubes of fresh malai paneer marinated in stone-ground yellow mustard, roasted gram flour, and clay-oven charred.',
    notes: 'Charred at 400°C over natural hardwood embers',
    accentColor: '#D6A84A',
  },
  {
    id: 'm3',
    dishNumber: '03',
    category: 'Awadhi & North Indian',
    name: 'Dum Pukht Gosht Biryani',
    image: '/images/dining/dishes/dish-3.webp',
    type: 'Non-Veg',
    chefSpecial: true,
    price: '₹699',
    motionStyle: 'Handi Reveal',
    motionDesc: 'Dough-sealed handi contour lifts to reveal aged basmati & rose water',
    desc: 'Fragrant aged long-grain basmati rice and spring lamb slow-cooked in a sealed dough handi with saffron and rose water.',
    notes: 'Slow-dum simmered for 6 hours under dough seal',
    accentColor: '#9C6235',
  },
  {
    id: 'm4',
    dishNumber: '04',
    category: 'Awadhi & North Indian',
    name: 'Dal Radiant Maharani',
    image: '/images/dining/dishes/dish-4.webp',
    type: 'Veg',
    chefSpecial: true,
    price: '₹449',
    motionStyle: 'Orbital Depth',
    motionDesc: 'Axial 3D revolution reveals overnight charcoal simmer & white butter',
    desc: 'Slow-simmered whole black lentils cooked overnight on charcoal embers with fresh churned white butter and vine tomatoes.',
    notes: 'Simmered 18 hours with hand-churned dairy butter',
    accentColor: '#8C5638',
  },
  {
    id: 'm5',
    dishNumber: '05',
    category: 'Awadhi & North Indian',
    name: 'Paneer Lababdar Shahjahani',
    image: '/images/dining/dishes/dish-5.webp',
    type: 'Veg',
    chefSpecial: false,
    price: '₹489',
    motionStyle: 'Progressive Mask Reveal',
    motionDesc: 'Expanding diagonal reveal of kasoori methi & velvet onion-tomato gravy',
    desc: 'Soft cottage cheese simmered in onion-tomato gravy with crushed kasoori methi and ginger juliennes.',
    notes: 'Infused with royal Shahjahani whole garam masala',
    accentColor: '#C47743',
  },
  {
    id: 'm6',
    dishNumber: '06',
    category: 'Pan-Asian & Dim Sum',
    name: 'Crystal Truffle Edamame Dim Sum',
    image: '/images/dining/dishes/dish-6.webp',
    type: 'Veg',
    chefSpecial: true,
    price: '₹529',
    motionStyle: 'Formation Assembly',
    motionDesc: 'Three translucent parcels balance into formation with black summer truffle',
    desc: 'Translucent steamed parcels with crushed edamame, water chestnuts, and black summer truffle oil drizzle.',
    notes: 'Hand-pleated crystal skin with Italian black truffle oil',
    accentColor: '#6B8E5E',
  },
  {
    id: 'm7',
    dishNumber: '07',
    category: 'Pan-Asian & Dim Sum',
    name: 'Crispy Silken Chilli Garlic Prawns',
    image: '/images/dining/dishes/dish-7.webp',
    type: 'Non-Veg',
    chefSpecial: false,
    price: '₹749',
    motionStyle: 'Horizontal Split Entrance',
    motionDesc: 'Wok-fired scallion oil and fermented chilli panels lock into place',
    desc: 'Wok-tossed jumbo prawns in scallion oil, fermented chilli paste, garlic flakes, and micro coriander.',
    notes: 'Flash-seared in 900°C master carbon steel wok',
    accentColor: '#C04E35',
  },
  {
    id: 'm8',
    dishNumber: '08',
    category: 'Artisanal Pasta & Grills',
    name: 'Handcrafted Wild Mushroom Fettuccine',
    image: '/images/dining/dishes/dish-8.webp',
    type: 'Veg',
    chefSpecial: false,
    price: '₹549',
    motionStyle: 'Curved Motion Path',
    motionDesc: 'Pasta ribbons sweep along parabolic curve with porcini & sage butter',
    desc: 'Fresh handmade pasta ribbons tossed with porcini mushrooms, Parmigiano-Reggiano, sage butter, and roasted garlic.',
    notes: 'Extruded daily using Italian durum semolina',
    accentColor: '#8E7356',
  },
  {
    id: 'm9',
    dishNumber: '09',
    category: 'Desserts & Patisserie',
    name: 'Shahi Tukda Brioche Flan',
    image: '/images/dining/dishes/dish-9.webp',
    type: 'Veg',
    chefSpecial: true,
    price: '₹349',
    motionStyle: 'Elegant Layered Reveal',
    motionDesc: 'Vertical cascade of saffron rabri reduction, silver leaf & pistachio',
    desc: 'Cardamom brioche drenched in saffron rabri reduction, silver leaf, crushed pistachio, and rose caviar.',
    notes: 'Topped with 24-karat edible silver leaf & Iranian saffron',
    accentColor: '#D4A034',
  },
  {
    id: 'm10',
    dishNumber: '10',
    category: 'Desserts & Patisserie',
    name: 'Belgium Dark Chocolate Fondant',
    image: '/images/dining/dishes/dish-10.webp',
    type: 'Veg',
    chefSpecial: false,
    price: '₹399',
    motionStyle: 'Cinematic Depth Zoom',
    motionDesc: 'Expands from deep background into camera with warm molten Callebaut core',
    desc: 'Warm molten 70% Callebaut chocolate lava cake with Madagascar vanilla bean ice cream.',
    notes: 'Baked à la minute with 70% Belgian single-origin cacao',
    accentColor: '#5C382A',
  },
];

// Curated Cuisine Collections: 3 Royal Signatures in 3D horizontal scroll, 7 in Extended Collection
export const FIRST_THREE_DISHES = SIGNATURE_DISHES.slice(0, 3);
export const FIRST_FIVE_DISHES = FIRST_THREE_DISHES; // Backward-compatibility alias
export const EXTENDED_CUISINES = SIGNATURE_DISHES.slice(3, 10);

const MEAL_SERVICES = [
  {
    id: 'morning',
    period: 'Morning Service',
    title: 'Daily Breakfast Buffet',
    timing: '7:00 AM – 10:30 AM',
    offerings: 'Continental viennoiseries, freshly pressed fruit elixirs, live egg & waffle stations, South Indian tiffin spreads, and artisanal coffees.',
    vibe: 'Sun-drenched morning light • Fresh baked viennoiseries • Cold-pressed botanicals',
    icon: Coffee,
  },
  {
    id: 'afternoon',
    period: 'Afternoon Repast',
    title: 'Executive Luncheon',
    timing: '12:00 PM – 2:00 PM',
    offerings: 'Curated business platters, wok-fired dim sums, aromatic Awadhi curries, handcrafted flatbreads, and cooling mocktails.',
    vibe: 'Midday architectural glow • Business repasts • Wok-fired dim sum platters',
    icon: Utensils,
  },
  {
    id: 'evening',
    period: 'Evening Soiree',
    title: 'Grand Fine Dinner',
    timing: 'From 6:30 PM (Last Order 11:00 PM)',
    offerings: 'Candlelit dining room, clay-oven tandoori kebabs, slow-simmered dum pukht biryanis, open terrace drinks, and table-side sommelier service.',
    vibe: 'Warm champagne candlelight • Crystal glassware • Open terrace drinks privilege',
    icon: Wine,
  },
];

export default function DiningPage({ onOpenBooking }) {
  // Navigation & Scroll State
  const targetProgressRef = useRef(0.0);
  const currentProgressRef = useRef(0.0);
  const animFrameRef = useRef(null);

  const [smoothProgress, setSmoothProgress] = useState(0.0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Progressive Cuisine Showcase State
  const [showMoreCuisines, setShowMoreCuisines] = useState(false);
  const showMoreCuisinesRef = useRef(false);
  showMoreCuisinesRef.current = showMoreCuisines;

  // 8-Unit Continuous Depth Progression (Non-blocking):
  // 0.0 = Stage 01: Hero Atelier
  // 1.0 = Stage 02: The Art of Dining (Three Services)
  // 2.0 to 4.0 = Stage 03: The 3 Signature Royal Dishes in 3D Exhibition (cards at 2.0, 3.0, 4.0)
  // 4.1 to 5.0 = Continuation Cue: "More Cuisines & Signature Creations"
  // 6.0 = Stage 04: Private Dining Chambers (Wood-Slat PDR)
  // 7.0 = Stage 05: Restaurant Concierge & Closing
  const MAX_PROGRESS = 7.0;

  const jumpToProgress = (val) => {
    targetProgressRef.current = Math.max(0.0, Math.min(MAX_PROGRESS, val));
    playClickSound();
  };

  // Continuous Wheel, Touch, and Keyboard Scrub Engine
  useEffect(() => {
    const SENSITIVITY = 0.0022;

    const handleWheel = (e) => {
      // When more cuisines showcase is open, allow user to browse the collection without scrolling the page
      if (showMoreCuisinesRef.current) return;

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
      if (showMoreCuisinesRef.current) return;
      if (e.touches.length > 0) {
        const deltaX = touchStartX - e.touches[0].clientX;
        const deltaY = touchStartY - e.touches[0].clientY;
        const dominant = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        targetProgressRef.current = Math.max(
          0.0,
          Math.min(MAX_PROGRESS, targetProgressRef.current + dominant * 0.004)
        );
      }
    };

    const handleKeyDown = (e) => {
      if (showMoreCuisinesRef.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        targetProgressRef.current = Math.min(MAX_PROGRESS, Math.floor(targetProgressRef.current + 1.0));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        targetProgressRef.current = Math.max(0.0, Math.ceil(targetProgressRef.current - 1.0));
      }
    };

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isRunning = true;
    const updateLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.16;

      const smoothed = currentProgressRef.current;
      setSmoothProgress(smoothed);

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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Active Menu Dish Index (0 to 2) inside Stage 03 (Progress 2.0 to 4.0)
  const currentDishIdx = useMemo(() => {
    if (smoothProgress < 2.0) return 0;
    if (smoothProgress > 4.0) return 2;
    return Math.max(0, Math.min(2, Math.round(smoothProgress - 2.0)));
  }, [smoothProgress]);

  // Relative progress inside the 3-dish exhibition (0.0 to 2.0)
  const menuScrollOffset = smoothProgress - 2.0;

  // Stage Visibility Transitions
  const heroStyle = useMemo(() => {
    const diff = smoothProgress - 0.0;
    if (diff > 1.05) return { display: 'none' };
    const opacity = Math.max(0, 1.0 - diff * 1.35);
    const translateY = diff * -35;
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.92, 1 - diff * 0.08)})`,
      pointerEvents: diff < 0.45 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  const diningServicesStyle = useMemo(() => {
    const diff = smoothProgress - 1.0;
    const absDiff = Math.abs(diff);
    if (absDiff > 1.05) return { display: 'none' };
    const opacity = Math.max(0, 1.0 - absDiff * 1.35);
    const translateY = diff * -35;
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.92, 1 - absDiff * 0.08)})`,
      pointerEvents: absDiff < 0.45 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  const menuContainerStyle = useMemo(() => {
    if (smoothProgress < 1.25 || smoothProgress > 5.8) return { display: 'none' };
    let opacity = 1.0;
    let translateY = 0;
    if (smoothProgress < 2.0) {
      opacity = Math.max(0, (smoothProgress - 1.25) / 0.75);
      translateY = (2.0 - smoothProgress) * 35;
    } else if (smoothProgress > 5.0) {
      opacity = Math.max(0, 1.0 - (smoothProgress - 5.0) * 1.4);
      translateY = (smoothProgress - 5.0) * -35;
    }
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      pointerEvents: smoothProgress >= 1.5 && smoothProgress <= 5.5 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  const privateDiningStyle = useMemo(() => {
    const diff = smoothProgress - 6.0;
    const absDiff = Math.abs(diff);
    if (absDiff > 1.05) return { display: 'none' };
    const opacity = Math.max(0, 1.0 - absDiff * 1.35);
    const translateY = diff * -35;
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.92, 1 - absDiff * 0.08)})`,
      pointerEvents: absDiff < 0.45 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  const conciergeStyle = useMemo(() => {
    const diff = smoothProgress - 7.0;
    const absDiff = Math.abs(diff);
    if (absDiff > 1.05) return { display: 'none' };
    const opacity = Math.max(0, 1.0 - absDiff * 1.35);
    const translateY = diff * -35;
    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.92, 1 - absDiff * 0.08)})`,
      pointerEvents: absDiff < 0.45 ? 'auto' : 'none',
    };
  }, [smoothProgress]);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#FAF6F0] text-forest-950 font-sans">
      {/* =========================================================================
          PERSISTENT 3D BRIGHT CULINARY ATELIER BACKGROUND (9 PROCEDURAL LAYERS)
         ========================================================================= */}
      <BrightCulinaryAtelierBackground progress={smoothProgress / MAX_PROGRESS} />

      {/* Subtle Warm Atmospheric Daylight Gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-white/35 via-transparent to-[#F3EADB]/40"
        aria-hidden="true"
      />

      {/* =========================================================================
          STAGE 01: THE SEVEN SCENTRIC — RESTAURANT INTRODUCTION & HERO (Progress: 0.0)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[68px] sm:top-[74px] bottom-2 sm:bottom-4 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto pointer-events-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden will-change-transform"
        style={heroStyle}
      >
        <div className="w-full max-w-[1720px] mx-auto my-auto py-1 sm:py-2 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Left Column: Architectural Title & Flavour Metrics */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-[#D6B878]/25 border border-[#B38738]/40 text-[#8C6D37] text-[10px] sm:text-[11px] font-bold font-sans uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
              <span>FINE DINING • MULTI-CUISINE MASTERY</span>
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase text-forest-950 tracking-tight leading-[1.08]">
                The Seven Scentric <br />
                <span className="italic font-serif font-normal text-[#8C6D37]">Fine Dining</span>
              </h1>
              <p className="text-[11px] sm:text-xs font-sans font-bold text-stone-600 uppercase tracking-widest pt-0.5">
                The Radiant Hotel & Resort • Gorakhpur
              </p>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#3D3A37] font-medium leading-relaxed max-w-xl">
              The culinary jewel of The Radiant Hotel & Resort. An opulent symphony of Awadhi royal lineages, Pan-Asian master wok artistry, and refined Continental classics prepared with artisanal precision in Gorakhpur.
            </p>

            {/* 4 Architectural Metrics in Warm Sandstone Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-xl">
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-[0_8px_20px_rgba(50,35,20,0.05)] text-center">
                <span className="text-lg sm:text-xl font-cinzel font-bold text-[#8C6D37] block leading-none">07</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block mt-0.5">
                  Flavour Senses
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-[0_8px_20px_rgba(50,35,20,0.05)] text-center">
                <span className="text-base sm:text-lg font-serif font-bold text-[#8C6D37] block leading-none">Daily</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block mt-0.5">
                  3 Meal Services
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-[0_8px_20px_rgba(50,35,20,0.05)] text-center">
                <span className="text-base sm:text-lg font-cinzel font-bold text-[#8C6D37] block leading-none">PDR</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block mt-0.5">
                  Private Chambers
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 shadow-[0_8px_20px_rgba(50,35,20,0.05)] text-center">
                <span className="text-base sm:text-lg font-serif font-bold text-[#8C6D37] block leading-none">11 PM</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-600 block mt-0.5">
                  Last Order
                </span>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-5 sm:gap-7">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'The Seven Scentric Fine Dining', price: '₹2,499' });
                }}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-forest-950 hover:text-[#B38738] transition-colors py-1 cursor-pointer"
              >
                <span className="border-b-2 border-forest-950/40 group-hover:border-[#B38738] transition-colors pb-0.5">
                  Reserve Table
                </span>
                <ArrowRight className="w-4 h-4 text-[#B38738] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <span className="text-stone-300 font-serif select-none hidden sm:inline">•</span>

              <button
                onClick={() => jumpToProgress(1.0)}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-stone-600 hover:text-[#B38738] transition-colors py-1 cursor-pointer"
              >
                <span className="border-b-2 border-transparent group-hover:border-[#B38738] transition-colors pb-0.5">
                  Explore Dining Journey
                </span>
                <ArrowRight className="w-4 h-4 text-[#B38738] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Tilting Picture Card & Authentic Dining Ambience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-2">
            <div
              onClick={() => {
                setActivePhotoIdx((prev) => (prev + 1) % DINING_IMAGES.length);
                playClickSound();
              }}
              className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(40,30,20,0.15)] border border-[#D6C5AD]/70 relative group bg-white/30 transition-all duration-300 ease-out cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 7}deg) rotateX(${-mousePos.y * 6}deg)`,
              }}
            >
              <img
                src={DINING_IMAGES[activePhotoIdx]}
                alt="The Seven Scentric Fine Dining"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-semibold text-gold font-sans">
                    GASTRONOMIC OPULENCE
                  </p>
                  <p className="text-base sm:text-lg font-serif font-bold text-white">THE SEVEN SCENTRIC</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold text-forest-950 flex items-center justify-center font-bold shadow-md">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </div>
              </div>
            </div>

            {/* Perspective thumbnails */}
            <div className="flex items-center gap-1.5">
              {DINING_IMAGES.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx);
                    playClickSound();
                  }}
                  className={`w-11 sm:w-13 h-7 sm:h-9 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhotoIdx === idx
                      ? 'border-gold ring-2 ring-gold/50 scale-105'
                      : 'border-[#D6C5AD]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgSrc} alt="Perspective" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 02: THE ART OF DINING — THREE MEAL EXPERIENCES (Progress: 1.0)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[68px] sm:top-[74px] bottom-2 sm:bottom-4 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto pointer-events-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden will-change-transform"
        style={diningServicesStyle}
      >
        <div className="w-full max-w-[1720px] mx-auto my-auto py-1 sm:py-2 space-y-3 sm:space-y-4 text-center">
          <div className="space-y-1 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase text-forest-950 tracking-tight">
              Morning, Afternoon & Soirée
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed">
              Experience a continuous sequence of culinary artistry from dawn continental viennoiseries to candlelit Awadhi banquets under open skies.
            </p>
          </div>

          {/* Three Large Editorial Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 pt-1 text-left">
            {MEAL_SERVICES.map((serv, idx) => {
              const Icon = serv.icon;
              return (
                <div
                  key={serv.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#D6C5AD]/70 shadow-[0_15px_40px_rgba(50,35,20,0.06)] flex flex-col justify-between space-y-3 hover:shadow-xl hover:border-[#B38738]/60 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#8C6D37]">
                        <Icon className="w-4 h-4 text-[#B38738]" />
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider">
                          {serv.period}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#D6B878]/20 text-[#8C6D37] border border-[#B38738]/30">
                        {serv.timing}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950">
                      {serv.title}
                    </h3>

                    <p className="text-xs font-sans text-stone-700 leading-relaxed font-medium">
                      {serv.offerings}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D6C5AD]/40 text-[10px] font-sans text-stone-500 font-semibold flex items-center justify-between">
                    <span>{serv.vibe}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B38738]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terrace Privilege Rule Notice */}
          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-sans text-stone-600 font-medium">
            <Wine className="w-3.5 h-3.5 text-[#B38738]" />
            <span>
              <strong className="text-[#8C6D37] uppercase font-bold">Terrace Privilege:</strong> The open terrace at The Seven Scentric is reserved strictly for artisanal cocktails & drinks.
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 03: THE FLOATING CULINARY EXHIBITION
          Part 1: Cards 01–05 in 3D Horizontal Scroll
          Part 2: Continuation Section: "More Cuisines & Signature Creations"
          Part 3: Expanded Cuisine Showcase with Top-Left Back Arrow
         ========================================================================= */}
      <div
        className={`absolute inset-x-0 top-[68px] sm:top-[74px] bottom-2 sm:bottom-4 z-20 flex flex-col items-center px-4 sm:px-6 lg:px-8 pointer-events-none will-change-transform ${
          showMoreCuisines ? 'justify-start overflow-hidden' : 'justify-center'
        }`}
        style={menuContainerStyle}
      >
        <style>{`
          @keyframes staggerCuisineEntrance {
            0% {
              opacity: 0;
              transform: translate3d(0, 20px, 0) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }
        `}</style>

        {!showMoreCuisines ? (
          <>
            {/* Exhibition Header & Active Dish Counter */}
            <div
              className="text-center mb-1 sm:mb-2 shrink-0 transition-opacity duration-300"
              style={{ opacity: smoothProgress >= 4.25 ? 0 : 1 }}
            >
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37] flex items-center justify-center gap-1.5 drop-shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
                <span>THE CULINARY ATELIER • SIGNATURE REPERTOIRE</span>
              </span>
              <h2 className="text-xl sm:text-3xl font-serif font-bold uppercase text-forest-950">
                {FIRST_THREE_DISHES[currentDishIdx]?.name}
              </h2>
              <p className="text-[11px] sm:text-xs font-sans text-stone-600 font-medium">
                {FIRST_THREE_DISHES[currentDishIdx]?.motionStyle} • {FIRST_THREE_DISHES[currentDishIdx]?.category}
              </p>
            </div>

            {/* 3D Depth Stack Area (First Three Cards in 3D Scroll Flow with 440px Luxury Spacing) */}
            <div className="relative w-full max-w-[1720px] mx-auto h-[58vh] max-h-[490px] min-h-[390px] flex items-center justify-center overflow-visible">
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {FIRST_THREE_DISHES.map((dish, idx) => {
                  const offset = idx - menuScrollOffset;
                  const absOffset = Math.abs(offset);

                  // Only render immediate neighbours to ensure buttery 60 FPS
                  if (absOffset > 1.6) return null;

                  // Increased horizontal spacing between card centers to prevent crowding
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const CARD_SPREAD = isMobile ? 340 : 440;
                  const translateX = offset * CARD_SPREAD;
                  const centerFactor = Math.max(0, 1.0 - absOffset);
                  const isCenter = absOffset < 0.45;

                  // Scale & Depth Stacking
                  const scale = 0.88 + centerFactor * 0.14;
                  const opacity = 0.65 + centerFactor * 0.35;
                  const blur = (1.0 - centerFactor) * 1.2;
                  const sway = offset * -2.5 + Math.sin(smoothProgress * 1.5 + idx) * 0.6;

                  return (
                    <div
                      key={dish.id}
                      onClick={() => !isCenter && jumpToProgress(2.0 + idx)}
                      className={`absolute w-[290px] sm:w-[335px] lg:w-[365px] h-[52vh] max-h-[430px] min-h-[360px] transition-all duration-100 ease-out will-change-transform ${
                        isCenter
                          ? 'z-30 pointer-events-auto cursor-default'
                          : 'z-10 pointer-events-auto cursor-pointer hover:opacity-100'
                      }`}
                      style={{
                        transform: `translate3d(${translateX}px, 0px, 0px) scale(${scale.toFixed(3)}) rotateZ(${sway.toFixed(2)}deg)`,
                        filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
                        opacity: opacity.toFixed(3),
                      }}
                    >
                      {/* The Dish Exhibition Card Body (70% Photo Length / 30% Description Area) */}
                      <div
                        className={`relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 text-left bg-white ${
                          isCenter
                            ? 'border border-[#B38738]/80 shadow-[0_25px_60px_rgba(60,40,25,0.14)]'
                            : 'border border-[#D6C5AD]/60 shadow-md'
                        }`}
                      >
                        {/* TOP 70%: CINEMATIC CULINARY PHOTOGRAPH (ZERO CROPPING) */}
                        <div className="relative w-full h-[68%] sm:h-[70%] overflow-hidden shrink-0 group/img bg-[#181411] flex items-center justify-center">
                          {/* Ambient Blurred Culinary Glow */}
                          <img
                            src={dish.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-125 opacity-35 pointer-events-none select-none"
                          />

                          {/* Pristine Full Dish Photo - guaranteed 100% visible, ZERO cropping */}
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="relative z-10 w-full h-full object-contain select-none group-hover/img:scale-[1.02] transition-transform duration-500 drop-shadow-md"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30 pointer-events-none z-10" />

                          {/* Floating Badges Over Image */}
                          <div className="absolute top-2.5 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  dish.type === 'Veg' ? 'bg-emerald-400' : 'bg-rose-500'
                                }`}
                                title={dish.type}
                              />
                              <span className="text-[9.5px] font-sans font-semibold uppercase tracking-wider text-white">
                                {dish.category}
                              </span>
                            </div>

                            <span className="text-xs font-cinzel font-bold tracking-wider text-white px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20">
                              #{dish.dishNumber}
                            </span>
                          </div>

                          {dish.chefSpecial && (
                            <div className="absolute bottom-2.5 left-3 z-20 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B38738]/90 backdrop-blur-md text-white text-[9px] font-sans font-semibold uppercase tracking-wider shadow-sm">
                              <Sparkles className="w-2.5 h-2.5 text-[#D6B878]" />
                              <span>Chef's Special</span>
                            </div>
                          )}

                          <div className="absolute bottom-2.5 right-3 z-20">
                            <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider text-white/85 bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                              {dish.motionStyle}
                            </span>
                          </div>
                        </div>

                        {/* BOTTOM 30%: REFINED DESCRIPTION & ACTIONS */}
                        <div className="relative w-full h-[32%] sm:h-[30%] p-3 sm:p-3.5 flex flex-col justify-between bg-white text-left shrink-0">
                          <div className="space-y-0.5">
                            <h3 className="text-sm sm:text-base font-serif font-bold text-forest-950 truncate leading-snug">
                              {dish.name}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] font-sans text-stone-600 font-medium leading-relaxed line-clamp-2">
                              {dish.desc}
                            </p>
                          </div>

                          {/* Bottom Row: Culinary Craft Notes & Order Action */}
                          <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[9px] font-sans text-stone-500 font-bold line-clamp-1 max-w-[170px]">
                              {dish.notes}
                            </span>

                            <button
                              onClick={() => {
                                playClickSound();
                                onOpenBooking &&
                                  onOpenBooking({ name: `The Seven Scentric - ${dish.name}`, price: dish.price });
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-forest-950 hover:text-[#B38738] transition-colors cursor-pointer"
                            >
                              <span>Reserve</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#B38738]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Continuation Cue Card (Appears after 3rd dish exits; visitors can click to view or simply keep scrolling down) */}
                {smoothProgress >= 4.1 && (
                  <div
                    className="absolute z-40 flex items-center justify-center pointer-events-auto transition-all duration-300"
                    style={{
                      opacity: Math.min(1.0, (smoothProgress - 4.1) / 0.45),
                      transform: `translate3d(0px, ${(1.0 - Math.min(1.0, (smoothProgress - 4.1) / 0.45)) * 20}px, 0px) scale(${0.96 + Math.min(1.0, (smoothProgress - 4.1) / 0.45) * 0.04})`,
                    }}
                  >
                    <div className="w-[310px] sm:w-[360px] lg:w-[410px] rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border border-[#B38738]/80 shadow-[0_20px_50px_rgba(60,40,25,0.12)] text-center flex flex-col items-center justify-between space-y-4">
                      {/* Eyebrow Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6B878]/20 border border-[#B38738]/35 text-[#8C6D37] text-[10px] sm:text-[10.5px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
                        <span>THE CULINARY REPERTOIRE</span>
                      </div>

                      {/* Heading & Subtext */}
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 uppercase tracking-tight leading-tight">
                          More Cuisines & Signatures
                        </h3>
                        <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed max-w-xs mx-auto">
                          Discover our extended repertoire of Awadhi delicacies, Pan-Asian wok artistry, handcrafted pastas, and artisanal patisserie.
                        </p>
                      </div>

                      {/* Decorative Accent */}
                      <div className="flex items-center justify-center gap-2 w-full py-1">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B38738]/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B38738]" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B38738]/40" />
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => {
                          playClickSound();
                          setShowMoreCuisines(true);
                        }}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white text-xs font-sans font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
                      >
                        <span>EXPLORE MORE CUISINES</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Dots (Clean 3 indicators for the 3 scrolling cards) */}
            <div className="flex items-center justify-center pt-2 z-30 pointer-events-auto">
              <div className="flex items-center gap-1.5">
                {FIRST_THREE_DISHES.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => jumpToProgress(2.0 + i)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentDishIdx === i
                        ? 'w-7 h-2 bg-[#B38738]'
                        : 'w-2 h-2 bg-[#D6C5AD] hover:bg-[#B38738]/60'
                    }`}
                    title={d.name}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* =========================================================================
              EXPANDED CUISINE SHOWCASE (Simultaneous Grid with Top-Left Back Arrow)
             ========================================================================= */
          <div className="relative w-full max-w-[1720px] mx-auto h-full flex flex-col items-center overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 sm:px-6 pt-4 pb-12 pointer-events-auto">
            {/* Top-Left Back Arrow (Below Navbar, Minimalist Floating Icon) */}
            <div className="w-full flex items-center justify-between py-2 shrink-0">
              <button
                onClick={() => {
                  playClickSound();
                  setShowMoreCuisines(false);
                }}
                aria-label="Back"
                title="Back"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#D6C5AD] hover:border-[#8C6D37] text-[#8C6D37] hover:text-forest-950 transition-all duration-300 cursor-pointer shadow-sm group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="text-xs font-sans font-bold uppercase tracking-wider">Back to Repertoire</span>
              </button>

              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37] hidden sm:flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
                <span>7 Extended Masterpieces Available</span>
              </span>
            </div>

            {/* Showcase Editorial Header */}
            <div className="text-center my-2 shrink-0">
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37] flex items-center justify-center gap-1.5 drop-shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
                <span>THE EXTENDED ATELIER COLLECTION</span>
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold uppercase text-forest-950">
                More Cuisines & Signature Creations
              </h2>
              <p className="text-[11px] sm:text-xs font-sans text-stone-600 font-medium">
                Awadhi Masterpieces, Pan-Asian Wok Artistry, Handcrafted Pastas & Decadent Patisserie
              </p>
            </div>

            {/* Balanced Responsive Grid: 4 cards top row, 3 cards centered bottom row with generous spacing */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6 py-3 max-w-[1720px] mx-auto pb-8">
              {EXTENDED_CUISINES.map((dish, idx) => {
                return (
                  <div
                    key={dish.id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[285px] will-change-transform"
                    style={{
                      animation: 'staggerCuisineEntrance 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      animationDelay: `${idx * 60}ms`,
                      opacity: 0,
                    }}
                  >
                    {/* The Dish Card Body (70% Image Length / 30% Description Area) */}
                    <div className="h-[310px] sm:h-[330px] lg:h-[345px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/95 backdrop-blur-xl border border-[#D6C5AD]/80 hover:border-[#B38738] shadow-[0_12px_35px_rgba(60,40,25,0.08)] hover:shadow-[0_20px_50px_rgba(179,135,56,0.16)] flex flex-col justify-between text-left transition-all duration-300">
                      {/* TOP 70%: CINEMATIC CULINARY PHOTOGRAPH (ZERO CROPPING) */}
                      <div className="relative w-full h-[68%] sm:h-[70%] overflow-hidden shrink-0 group/img bg-[#181411] flex items-center justify-center">
                        {/* Ambient Blurred Culinary Glow */}
                        <img
                          src={dish.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-125 opacity-35 pointer-events-none select-none"
                        />

                        {/* Pristine Full Dish Photo - guaranteed 100% visible, ZERO cropping */}
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="relative z-10 w-full h-full object-contain select-none group-hover/img:scale-[1.02] transition-transform duration-500 drop-shadow-md"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30 pointer-events-none z-10" />

                        {/* Floating Category & Veg Badge Over Photo */}
                        <div className="absolute top-2 inset-x-2.5 flex items-center justify-between z-20 pointer-events-auto">
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                dish.type === 'Veg' ? 'bg-emerald-400' : 'bg-rose-500'
                              }`}
                              title={dish.type}
                            />
                            <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-white">
                              {dish.category}
                            </span>
                          </div>

                          <span className="text-[10.5px] font-cinzel font-bold tracking-wider text-white px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                            #{dish.dishNumber}
                          </span>
                        </div>

                        {dish.chefSpecial && (
                          <div className="absolute bottom-2 left-2.5 z-20 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#B38738]/90 backdrop-blur-md text-white text-[8.5px] font-sans font-semibold uppercase tracking-wider shadow-sm">
                            <Sparkles className="w-2.5 h-2.5 text-[#D6B878]" />
                            <span>Chef's Special</span>
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2.5 z-20">
                          <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-white/10">
                            {dish.motionStyle}
                          </span>
                        </div>
                      </div>

                      {/* BOTTOM 30%: REFINED DESCRIPTION & ACTIONS */}
                      <div className="relative w-full h-[32%] sm:h-[30%] p-2.5 sm:p-3 flex flex-col justify-between bg-white text-left shrink-0">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-serif font-bold text-forest-950 truncate leading-snug">
                            {dish.name}
                          </h3>
                          <p className="text-[10px] sm:text-[10.5px] font-sans text-stone-600 font-medium leading-relaxed line-clamp-1">
                            {dish.desc}
                          </p>
                        </div>

                        {/* Bottom Row: Craft Notes & Reserve */}
                        <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[8.5px] font-sans text-stone-500 font-bold line-clamp-1 max-w-[130px]">
                            {dish.notes}
                          </span>

                          <button
                            onClick={() => {
                              playClickSound();
                              onOpenBooking &&
                                onOpenBooking({ name: `The Seven Scentric - ${dish.name}`, price: dish.price });
                            }}
                            className="inline-flex items-center gap-1 text-[10.5px] font-sans font-bold uppercase tracking-wider text-forest-950 hover:text-[#B38738] transition-colors cursor-pointer"
                          >
                            <span>Reserve</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B38738]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          STAGE 04: PRIVATE DINING CHAMBERS (Progress: 6.0)
          FEATURING AUTHENTIC BLONDE WOOD SLAT ARCHITECTURE (/images/dining/dining-2.webp)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[68px] sm:top-[74px] bottom-2 sm:bottom-4 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto pointer-events-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden will-change-transform"
        style={privateDiningStyle}
      >
        <div className="w-full max-w-[1720px] mx-auto my-auto py-1 sm:py-2 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Left Column: Authentic Photograph with Architectural Frame */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-2">
            <div
              className="w-full max-w-[350px] sm:max-w-[400px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(40,30,20,0.15)] border border-[#D6C5AD]/70 relative group bg-white/30 transition-all duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 5}deg)`,
              }}
            >
              <img
                src="/images/dining/dining-2.webp"
                alt="Private Dining Chamber with Blonde Wood Slats"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] tracking-widest uppercase font-semibold text-gold font-sans">
                  SECLUDED SALON SANCTUARY
                </p>
                <p className="text-base sm:text-lg font-serif font-bold text-white">
                  PRIVATE DINING CHAMBER
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-12 h-8 rounded-lg overflow-hidden border-2 border-gold ring-2 ring-gold/40">
                <img src="/images/dining/dining-2.webp" alt="PDR" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-8 rounded-lg overflow-hidden border border-[#D6C5AD]/60 opacity-60">
                <img src="/images/dining/dining-1.webp" alt="Grand Hall" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-8 rounded-lg overflow-hidden border border-[#D6C5AD]/60 opacity-60">
                <img src="/images/dining/dining-3.webp" alt="Banquet" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Highlights & Private Booking Details */}
          <div className="lg:col-span-6 space-y-2.5 sm:space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D6B878]/25 border border-[#B38738]/40 text-[#8C6D37] text-[10px] sm:text-[11px] font-bold font-sans uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
              <span>BESPOKE INTIMACY • PRIVATE DINING</span>
            </div>

            <div className="space-y-0.5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold uppercase text-forest-950 tracking-tight leading-tight">
                Private Dining <br />
                <span className="italic font-serif font-normal text-[#8C6D37]">Chambers</span>
              </h2>
              <p className="text-[11px] sm:text-xs font-sans font-bold text-stone-600 uppercase tracking-widest">
                Acoustic Wood Slats • Intimate Lighting • Bespoke Sommelier
              </p>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#3D3A37] font-medium leading-relaxed max-w-lg">
              Framed in architectural blonde wood slats, sculpted ambient lighting, and bespoke table settings, our Private Dining Chambers offer an exclusive sanctuary for celebratory family gatherings, corporate summits, and intimate multi-course dinners.
            </p>

            {/* 3 Bespoke Features */}
            <div className="space-y-1.5 pt-0.5 max-w-lg">
              <div className="p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 flex items-center gap-2.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#B38738] shrink-0" />
                <span className="text-[11px] sm:text-xs font-sans font-bold text-stone-800">
                  Dedicated Private Butler & Personalized Sommelier Bottle Pairing
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 flex items-center gap-2.5 shadow-sm">
                <Utensils className="w-4 h-4 text-[#B38738] shrink-0" />
                <span className="text-[11px] sm:text-xs font-sans font-bold text-stone-800">
                  Curated Multi-Course Degustation Menus Tailored to Dietary Preferences
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#D6C5AD]/60 flex items-center gap-2.5 shadow-sm">
                <Calendar className="w-4 h-4 text-[#B38738] shrink-0" />
                <span className="text-[11px] sm:text-xs font-sans font-bold text-stone-800">
                  Exclusive Prior Reservation & Discrete VIP Arrival Protocol
                </span>
              </div>
            </div>

            {/* Booking Button */}
            <div className="pt-1">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'The Seven Scentric Fine Dining', price: '₹2,499' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
              >
                <span>Reserve Private Chamber</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 05: OFFICIAL RESTAURANT MENU FOLIO & HOSPITALITY CONCIERGE (Progress: 7.0)
         ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[68px] sm:top-[74px] bottom-2 sm:bottom-4 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto pointer-events-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden will-change-transform"
        style={conciergeStyle}
      >
        <div className="w-full max-w-5xl my-auto py-2 sm:py-3 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
          {/* Left Column: Physical Luxury Restaurant Menu Folio */}
          <div
            className="lg:col-span-6 pointer-events-auto transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 4}deg)`,
            }}
          >
            <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#FCF9F3] via-[#FAF5EC] to-[#F1E5D3] border-2 border-[#D6C5AD] shadow-[0_25px_60px_rgba(50,35,20,0.14)] ring-1 ring-[#D6B878]/50 overflow-hidden text-center group">
              {/* Embossed Paper Texture / Watermark Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#B38738_0.75px,transparent_0.75px)] [background-size:16px_16px]"
                aria-hidden="true"
              />

              {/* Decorative Luxury Inner Gold Border */}
              <div className="absolute inset-3 rounded-2xl border border-[#D6B878]/40 pointer-events-none" />

              {/* Top Folio Badge & Archive Number */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#D6C5AD]/60 pb-3 mb-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C6D37]">
                  Official Repertoire Folio
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D6B878]/20 border border-[#B38738]/35 text-[#8C6D37] text-[10px] font-sans font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#B38738]" />
                  <span>14 Pages PDF</span>
                </span>
              </div>

              {/* Monogram Crest & Official Cover Typography */}
              <div className="relative z-10 space-y-1.5 my-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#B38738]/50 flex items-center justify-center text-[#8C6D37] shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Utensils className="w-5 h-5 text-[#B38738]" />
                </div>

                <div className="pt-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wider text-forest-950 leading-tight">
                    THE SEVEN SCENTRIC
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic font-medium text-[#8C6D37] mt-0.5">
                    Fine Dining — Official Restaurant Menu
                  </p>
                </div>
              </div>

              {/* Menu Categories Digest */}
              <div className="relative z-10 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#D6C5AD]/60 text-left my-4 space-y-1 text-stone-700 shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                  <span>Culinary Catalog</span>
                  <span className="text-[#8C6D37]">Full À La Carte</span>
                </div>
                <p className="text-[11px] sm:text-xs font-sans font-medium text-stone-800 leading-snug">
                  Awadhi Royal Dum Pukht • North Indian Curries • Dim Sum & Pan-Asian • Handcrafted Pasta & Grills • Artisanal Desserts • Mocktails
                </p>
              </div>

              {/* The Two Primary Required Actions: View Complete Menu & Download Menu */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href="/documents/seven-scentric-menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group/btn cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D6B878] group-hover/btn:scale-110 transition-transform" />
                  <span>View Complete Menu</span>
                  <ExternalLink className="w-3 h-3 text-stone-400 group-hover/btn:text-white transition-colors" />
                </a>

                <a
                  href="/documents/seven-scentric-menu.pdf"
                  download="The-Seven-Scentric-Menu.pdf"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#B38738] text-forest-950 hover:text-white border border-[#D6C5AD] hover:border-[#B38738] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm group/btn cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#8C6D37] group-hover/btn:text-white group-hover/btn:translate-y-0.5 transition-all" />
                  <span>Download Menu</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Restaurant Concierge & Table Reservations */}
          <div className="lg:col-span-6 pointer-events-auto p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#D6C5AD]/70 shadow-[0_25px_70px_rgba(50,35,20,0.12)] text-center space-y-3 sm:space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D6B878]/25 border border-[#B38738]/40 text-[#8C6D37] text-[10px] sm:text-[11px] font-bold font-sans uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#B38738]" />
              <span>HOSPITALITY CONCIERGE & RESERVATIONS</span>
            </div>

            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold uppercase text-forest-950 tracking-tight">
                The Seven Scentric
              </h2>
              <p className="text-[11px] sm:text-xs font-sans font-bold text-[#8C6D37] uppercase tracking-widest">
                The Radiant Hotel & Resort • Gorakhpur
              </p>
            </div>

            <p className="text-xs sm:text-sm font-sans text-stone-700 max-w-md mx-auto font-medium leading-relaxed">
              Connect with our Dining Concierge to reserve your table, organize custom private degustation menus, or secure sunset terrace drinks privileges.
            </p>

            {/* Concierge Hotline Card */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF6F0] border border-[#D6C5AD]/60 max-w-sm mx-auto flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#B38738]/20 flex items-center justify-center text-[#8C6D37] shrink-0">
                  <Phone className="w-4 h-4 text-[#B38738]" />
                </div>
                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone-500 block">
                    Dining Reservations Hotline
                  </span>
                  <a
                    href={`tel:${hotelInfo.contact.reservations}`}
                    className="text-sm sm:text-base font-serif font-bold text-forest-950 hover:text-[#B38738] transition-colors"
                  >
                    {hotelInfo.contact.reservations}
                  </a>
                </div>
              </div>

              <a
                href={`tel:${hotelInfo.contact.reservations}`}
                className="px-3.5 py-1 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm shrink-0"
              >
                Call Now
              </a>
            </div>

            {/* Primary Dual Booking Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-0.5">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'The Seven Scentric Fine Dining', price: '₹2,499' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-forest-950 hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer"
              >
                Reserve Table (₹2,499)
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking &&
                    onOpenBooking({ name: 'Terrace Drinks at 7 Scentric', price: '₹1,999' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#B38738] hover:bg-[#8C6D37] text-white font-sans font-bold text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
              >
                Reserve Terrace Drinks (₹1,999)
              </button>
            </div>

            {/* Return to Top Journey Button */}
            <div className="pt-0.5">
              <button
                onClick={() => jumpToProgress(0.0)}
                className="inline-flex items-center gap-1 text-stone-500 hover:text-forest-950 font-sans text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#B38738]" />
                <span>Return to Atelier Entrance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
