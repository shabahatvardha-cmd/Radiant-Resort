import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Flower2,
  Feather,
  Clock,
  Calendar,
  Phone,
  ArrowRight,
  ArrowUp,
  MapPin,
} from 'lucide-react';
import { hotelInfo } from '../data/hotelInfo';
import { playClickSound } from '../utils/audioEffects';
import Panchamahabhuta3DBackground from '../components/effects/Panchamahabhuta3DBackground';
import MandalaConstellationBackground from '../components/effects/MandalaConstellationBackground';

const TREATMENTS = [
  {
    id: 't1',
    category: 'Ayurvedic Rituals',
    name: 'Royal Abhyanga Herbal Therapy',
    duration: '60 Min / 90 Min',
    price: '₹2,999',
    oils: 'Warm Medicated Dhanwantari Sesame Oil',
    desc: 'Traditional full-body synchronized massage with warm dosha-specific medicated herbal oils. Promotes lymphatic drainage, melts arterial tension, and balances vital energies.',
    image: '/images/wellness/abhyanga.webp', // Specific authentic Abhyanga webp
    position: 'photo-left',
    motionType: 'from-top',
    cardBg: 'bg-[#18110b]/75 backdrop-blur-xl text-stone-100 border border-amber-600/35 shadow-[0_25px_70px_rgba(217,119,6,0.18)]',
    badgeStyle: 'bg-amber-950/80 backdrop-blur-sm text-amber-300 border-amber-600/40',
    priceColor: 'text-gold',
    oilBoxStyle: 'bg-white/10 backdrop-blur-md border-amber-500/30 text-stone-200',
    btnStyle: 'bg-gold hover:bg-white text-forest-950 font-black',
  },
  {
    id: 't2',
    category: 'Ayurvedic Rituals',
    name: 'Shirodhara Sensory Calm',
    duration: '60 Min',
    price: '₹3,499',
    oils: 'Warm Brahmi & Ksheerabala Botanical Infusion',
    desc: 'A continuous, soothing stream of warm herbal oil poured rhythmically over the forehead (ajna third-eye center). Dissolves mental stress, chronic fatigue, and induces deep meditative sleep.',
    image: '/images/wellness/shirodhara.webp', // Specific authentic Shirodhara webp
    position: 'photo-right',
    motionType: 'revolve-grow',
    cardBg: 'bg-[#080c14]/80 backdrop-blur-xl text-stone-100 border border-indigo-500/40 shadow-[0_25px_80px_rgba(30,27,75,0.45)] ring-1 ring-indigo-400/20',
    badgeStyle: 'bg-indigo-950/80 backdrop-blur-sm text-indigo-300 border-indigo-500/30',
    priceColor: 'text-gold',
    oilBoxStyle: 'bg-white/10 backdrop-blur-md border-indigo-500/30 text-stone-200',
    btnStyle: 'bg-gold hover:bg-white text-forest-950 font-black',
  },
  {
    id: 't3',
    category: 'Deep Tissue Massages',
    name: 'Vedic Deep Tissue Muscle Release',
    duration: '60 Min / 90 Min',
    price: '₹3,299',
    oils: 'Mahanarayan Camphorated Herbal Balm',
    desc: 'Targeted deep structural muscle therapy combining trigger-point releases with restorative Ayurvedic strokes. Ideal for recovering from long travel or intense physical training.',
    image: '/images/wellness/deep-tissue.webp', // Specific authentic Deep Tissue webp
    position: 'photo-left',
    motionType: 'diagonal-a',
    cardBg: 'bg-[#141210]/80 backdrop-blur-xl text-stone-100 border-2 border-amber-800/60 shadow-[0_25px_80px_rgba(28,25,23,0.5)] ring-1 ring-amber-700/30',
    badgeStyle: 'bg-amber-950/80 backdrop-blur-sm text-amber-300 border-amber-700/40',
    priceColor: 'text-amber-400',
    oilBoxStyle: 'bg-black/40 backdrop-blur-md border-amber-700/40 text-stone-200',
    btnStyle: 'bg-amber-500 hover:bg-white text-forest-950 font-black',
  },
  {
    id: 't4',
    category: 'Deep Tissue Massages',
    name: 'Hot Basalt Stone Harmony',
    duration: '75 Min',
    price: '₹3,699',
    oils: 'Organic Sandalwood & Cedarwood Extract',
    desc: 'Smooth volcanic basalt stones heated to therapeutic temperature, placed along meridian spinal points and used to glide deeply into stiff muscular layers.',
    image: '/images/wellness/basalt-stone.webp', // Specific authentic Basalt Stone webp
    position: 'photo-right',
    motionType: 'from-down',
    cardBg: 'bg-[#121214]/80 backdrop-blur-xl text-stone-100 border border-orange-500/50 shadow-[0_0_60px_rgba(234,88,12,0.3)] ring-1 ring-orange-500/30',
    badgeStyle: 'bg-orange-950/80 backdrop-blur-sm text-orange-300 border-orange-600/40',
    priceColor: 'text-orange-400',
    oilBoxStyle: 'bg-black/50 backdrop-blur-md border-orange-600/40 text-stone-200',
    btnStyle: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-white hover:to-white text-forest-950 font-black',
  },
  {
    id: 't5',
    category: 'Radiant Salon & Hair',
    name: 'Moroccan Argan Hair Spa & Scalp Detox',
    duration: '60 Min',
    price: '₹2,199',
    oils: 'Cold-Pressed Organic Argan & Tea Tree',
    desc: 'Intensive nourishing hair therapy including clarifying scalp massage, steam infusion, custom micro-protein mask, and professional botanical blow-dry styling.',
    image: '/images/wellness/argan-hair-spa.webp', // Specific authentic Salon Argan webp
    position: 'photo-left',
    motionType: 'diagonal-b',
    cardBg: 'bg-[#1a1712]/80 backdrop-blur-xl text-stone-100 border-2 border-amber-300/50 shadow-[0_25px_70px_rgba(217,119,6,0.2)]',
    badgeStyle: 'bg-amber-950/80 backdrop-blur-sm text-amber-200 border-amber-400/40',
    priceColor: 'text-gold',
    oilBoxStyle: 'bg-white/10 backdrop-blur-md border-amber-300/30 text-stone-200',
    btnStyle: 'bg-gold hover:bg-white text-forest-950 font-black',
  },
  {
    id: 't6',
    category: 'Bridal & Grooming',
    name: 'Royal Saffron Radiance Facial',
    duration: '75 Min',
    price: '₹2,799',
    oils: 'Pure Kashmiri Kumkumadi Tailam & Saffron Caviar',
    desc: 'Ancient bridal illumination facial utilizing pure saffron, turmeric extracts, and cooling sandalwood compress for luminous, glass-like facial radiance.',
    image: '/images/wellness/saffron-facial.webp', // Specific authentic Saffron Facial webp
    position: 'photo-right',
    motionType: 'spiral-bloom',
    cardBg: 'bg-[#1c1308]/80 backdrop-blur-xl text-stone-100 border-2 border-gold/70 ring-2 ring-gold/40 shadow-[0_30px_90px_rgba(234,179,8,0.35)]',
    badgeStyle: 'bg-gold/40 backdrop-blur-sm text-forest-950 border-gold/60 font-black',
    priceColor: 'text-gold',
    oilBoxStyle: 'bg-white/15 backdrop-blur-md border-gold/40 text-stone-100 font-medium',
    btnStyle: 'bg-gold hover:bg-white text-forest-950 font-black shadow-xl',
  },
];

const SPA_IMAGES = [
  '/images/wellness/wellness-1.webp',
  '/images/wellness/wellness-2.webp',
  '/images/wellness/wellness-3.webp',
];

const STAGE_LABELS = [
  'Sanctuary',
  'Disciplines',
  'Abhyanga',
  'Shirodhara',
  'Deep Tissue',
  'Basalt Stone',
  'Argan Spa',
  'Saffron Facial',
  'Spa Footer',
];

export default function WellnessSpaPage({ onOpenBooking }) {
  useEffect(() => {
    try {
      sessionStorage.setItem('radiant_last_stage', '2');
    } catch (e) { }
  }, []);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const targetStageRef = useRef(0);
  const currentStageRef = useRef(0);
  const animFrameRef = useRef(null);

  const [smoothStage, setSmoothStage] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Total stages = 9 (0: Hero, 1: Pillars & Gallery, 2..7: The 6 Rituals, 8: Genuine Spa Footer)
  const maxStage = 8;

  const jumpToStage = (idx) => {
    targetStageRef.current = Math.max(0, Math.min(maxStage, idx));
    playClickSound();
  };

  // Reset to first section (Arrival Sanctuary) on navbar re-click
  useEffect(() => {
    const handleReset = () => {
      targetStageRef.current = 0;
      currentStageRef.current = 0;
      setSmoothStage(0);
      setActiveStage(0);
    };
    window.addEventListener('depth-page-reset', handleReset);
    return () => window.removeEventListener('depth-page-reset', handleReset);
  }, []);

  // Direct wheel, touch & keyboard event handling on locked viewport
  useEffect(() => {
    const SENSITIVITY = 0.0022;

    const handleWheel = (e) => {
      targetStageRef.current = Math.max(
        0,
        Math.min(maxStage, targetStageRef.current + e.deltaY * SENSITIVITY)
      );
    };

    let touchStartY = 0;
    let touchStartInitialY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartInitialY = e.touches[0].clientY;
        touchStartTime = performance.now();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        targetStageRef.current = Math.max(
          0,
          Math.min(maxStage, targetStageRef.current + deltaY * 0.0035)
        );
      }
    };

    const handleTouchEnd = (e) => {
      const endY = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : touchStartY;
      const totalDeltaY = touchStartInitialY - endY;
      const duration = Math.max(1, performance.now() - touchStartTime);
      const velocity = totalDeltaY / duration;

      if (Math.abs(velocity) > 0.22) {
        const momentum = Math.sign(velocity) * Math.min(0.45, Math.abs(velocity) * 0.22);
        targetStageRef.current = Math.max(0, Math.min(maxStage, targetStageRef.current + momentum));
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        targetStageRef.current = Math.min(maxStage, Math.floor(targetStageRef.current + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        targetStageRef.current = Math.max(0, Math.ceil(targetStageRef.current - 1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    let isRunning = true;
    let lastTime = performance.now();

    const updateLoop = (now) => {
      if (!isRunning) return;

      const dt = Math.min(50, Math.max(8, now - lastTime));
      lastTime = now;

      const target = targetStageRef.current;
      const cur = currentStageRef.current;
      const diff = target - cur;

      if (Math.abs(diff) < 0.0003) {
        if (cur !== target) {
          currentStageRef.current = target;
          setSmoothStage(target);
          setActiveStage(Math.max(0, Math.min(maxStage, Math.round(target))));
        }
      } else {
        const factor = 1 - Math.exp(-dt * 0.0075);
        const next = cur + diff * factor;
        currentStageRef.current = next;
        setSmoothStage(next);
        setActiveStage(Math.max(0, Math.min(maxStage, Math.round(next))));
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
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [maxStage]);

  // Overall stage container visibility & opacity
  const getStageContainerStyle = (stageIndex) => {
    const progress = smoothStage - stageIndex;
    const absProgress = Math.abs(progress);

    if (absProgress > 1.15) {
      return { display: 'none' };
    }

    const opacity = Math.max(0, Math.min(1, 1 - absProgress * 1.35));
    return {
      opacity,
      pointerEvents: absProgress < 0.45 ? 'auto' : 'none',
    };
  };

  return (
    <div className="relative h-screen min-h-[100dvh] h-[100dvh] w-full bg-[#0c0a09] text-stone-100 flex flex-col justify-center items-center select-none overflow-hidden pt-16">
      {/* 3D Parallax Panchamahabhuta Atmospheric Canvas (Exclusive to Salon & Spa page) */}
      <Panchamahabhuta3DBackground currentStage={activeStage} />

      {/* 5-Mandala Sacred Geometry Rotating Vector Constellation Background */}
      <MandalaConstellationBackground currentStage={activeStage} />

      {/* =======================================================================
          STAGE 0: SANCTUARY HERO & 4 HERITAGE PILLARS (TRANSPARENT GLASS)
         ======================================================================= */}
      <div
        className="absolute inset-x-0 top-16 sm:top-20 md:top-24 bottom-2 sm:bottom-3 flex items-center justify-center px-3 sm:px-6 lg:px-8 z-20 transition-opacity duration-200 ease-out will-change-transform"
        style={getStageContainerStyle(0)}
      >
        <div className="relative w-full max-w-5xl rounded-3xl bg-[#120e0a]/75 backdrop-blur-xl border border-gold/30 shadow-[0_25px_70px_rgba(0,0,0,0.5)] p-4 sm:p-7 md:p-9 lg:p-10 text-center overflow-hidden h-[74vh] sm:h-[70vh] md:h-[64vh] max-h-[640px] md:max-h-[560px] min-h-[440px] md:min-h-[430px] flex flex-col justify-between">
          <div className="space-y-1.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gold/15 backdrop-blur-md border border-gold/40 text-gold font-sans font-black text-[9px] sm:text-xs uppercase tracking-[0.25em] shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
              <span>AYURVEDIC SANCTUARY & SALON</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black uppercase text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
              Vedic Wellness Spa & Salon
            </h1>

            <p className="text-[11px] sm:text-sm md:text-base font-sans text-stone-300 max-w-3xl mx-auto font-medium leading-relaxed line-clamp-3 sm:line-clamp-none">
              Ancient Ayurvedic lineage meets contemporary restorative luxury. An oasis of sensory stillness, single-origin botanical oils, and bespoke personal grooming administered by certified wellness practitioners in Gorakhpur.
            </p>
          </div>

          {/* Quick Pillars Grid (Transparent Glass Tablets) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto w-full text-center">
            <div className="p-2.5 sm:p-3.5 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/15 shadow-sm hover:border-gold/40 transition-colors">
              <span className="text-lg sm:text-2xl font-serif font-black text-amber-400 block">100%</span>
              <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Herbal Dhanwantari Oils</span>
            </div>
            <div className="p-2.5 sm:p-3.5 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/15 shadow-sm hover:border-gold/40 transition-colors">
              <span className="text-lg sm:text-2xl font-serif font-black text-amber-400 block">Kerala</span>
              <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Authentic Lineage</span>
            </div>
            <div className="p-2.5 sm:p-3.5 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/15 shadow-sm hover:border-gold/40 transition-colors">
              <span className="text-lg sm:text-2xl font-serif font-black text-amber-400 block">Salon</span>
              <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">Bespoke Hair & Bridal</span>
            </div>
            <div className="p-2.5 sm:p-3.5 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/15 shadow-sm hover:border-gold/40 transition-colors">
              <span className="text-lg sm:text-2xl font-serif font-black text-amber-400 block">Daily</span>
              <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider text-stone-300">8 AM – 9 PM</span>
            </div>
          </div>

          {/* Actions & Scroll Indicator */}
          <div className="space-y-1.5 pt-1">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
              <button
                onClick={() => jumpToStage(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gold hover:bg-white text-forest-950 font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all shadow-md group"
              >
                <span>Explore Disciplines</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking && onOpenBooking({ name: 'Vedic Spa Consultation', price: 'Complimentary' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all shadow-sm backdrop-blur-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          STAGE 1: THE 3 CORE PILLARS & ATMOSPHERIC PHOTO GALLERY (TRANSPARENT GLASS)
         ======================================================================= */}
      <div
        className="absolute inset-x-0 top-16 sm:top-20 md:top-24 bottom-2 sm:bottom-3 flex items-center justify-center px-3 sm:px-6 lg:px-8 z-20 transition-opacity duration-200 ease-out will-change-transform"
        style={getStageContainerStyle(1)}
      >
        <div className="relative w-full max-w-[1720px] mx-auto rounded-3xl bg-[#120e0a]/75 backdrop-blur-xl border border-gold/30 shadow-[0_25px_70px_rgba(0,0,0,0.5)] p-4 sm:p-7 md:p-9 overflow-y-auto md:overflow-hidden h-[74vh] sm:h-[70vh] md:h-[64vh] max-h-[640px] md:max-h-[560px] min-h-[440px] md:min-h-[430px] flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center h-full">
            {/* Left: 3 Pillars */}
            <div className="md:col-span-6 space-y-2 sm:space-y-3.5">
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
                  Sacred Disciplines
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black uppercase text-white">
                  The 3 Sanctuary Pillars
                </h2>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm flex items-start gap-2.5 sm:gap-3 hover:border-gold/40 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm">
                  <Flower2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-serif font-black text-white">Ayurvedic Body Rituals</h4>
                  <p className="text-[11px] sm:text-xs font-sans text-stone-300 leading-relaxed mt-0.5">
                    Authentic therapeutic massages, herbal steam baths, and synchronized doshic therapies.
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm flex items-start gap-2.5 sm:gap-3 hover:border-gold/40 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-950/80 text-gold border border-gold/40 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-serif font-black text-white">Radiant Salon Studio</h4>
                  <p className="text-[11px] sm:text-xs font-sans text-stone-300 leading-relaxed mt-0.5">
                    Hair styling, Moroccan argan spas, precision grooming, and complete bridal makeup.
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm flex items-start gap-2.5 sm:gap-3 hover:border-gold/40 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-900/80 text-stone-300 border border-stone-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-serif font-black text-white">Sensory Courtyard</h4>
                  <p className="text-[11px] sm:text-xs font-sans text-stone-300 leading-relaxed mt-0.5">
                    Tranquil relaxation lounges with organic herbal tea infusions and ambient raga acoustics.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Gallery in WebP */}
            <div className="md:col-span-6 space-y-2 sm:space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-md group">
                <img
                  src={SPA_IMAGES[activePhotoIdx]}
                  alt="Vedic Spa Sanctuary"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <p className="text-[11px] sm:text-xs font-sans font-bold text-white tracking-wide">
                    Sanctuary Chambers • Serene Botanical Suite
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {SPA_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePhotoIdx(idx);
                      playClickSound();
                    }}
                    className={`w-14 h-10 sm:w-20 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${activePhotoIdx === idx
                      ? 'border-gold ring-2 ring-gold/40 scale-105 shadow-md'
                      : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400">
              Sanctuary Chambers
            </span>
            <button
              onClick={() => jumpToStage(2)}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-black uppercase tracking-wider text-gold hover:text-white transition-colors"
            >
              <span>Explore Rituals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =======================================================================
          STAGES 2 – 7: THE 6 RITUALS (TRANSPARENT GLASS CARDS + AUTHENTIC WEBP PICS)
         ======================================================================= */}
      {TREATMENTS.map((treatment, idx) => {
        const stageNum = idx + 2; // Stages 2, 3, 4, 5, 6, 7
        const progress = smoothStage - stageNum;
        const absProgress = Math.abs(progress);

        // Ken Burns live camera zoom inside the photo card (subtle on mobile for GPU efficiency)
        const imgZoom = isMobile
          ? 1.04
          : 1.08 + Math.max(-0.06, Math.min(0.06, -progress * 0.08));

        // Dynamic spatial entrance trajectories
        let photoTransform = '';
        let aboutTransform = '';

        if (isMobile) {
          // Silky, balanced vertical glide on mobile with zero horizontal drift or extreme 3D clipping
          const photoY = progress * -35;
          const aboutY = progress * 25;
          const mobileScale = Math.max(0.94, 1.0 - absProgress * 0.06);
          photoTransform = `translate3d(0px, ${photoY.toFixed(1)}px, 0px) scale(${mobileScale.toFixed(3)})`;
          aboutTransform = `translate3d(0px, ${aboutY.toFixed(1)}px, 0px) scale(${mobileScale.toFixed(3)})`;
        } else {
          switch (treatment.motionType) {
            case 'from-top':
              // Ritual 01: Photo from Left, About drops straight from TOP!
              photoTransform = `translate3d(${progress * -120}px, 0px, 0px) scale(${1.0 - absProgress * 0.05})`;
              aboutTransform = `translate3d(0px, ${progress * -110}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              break;

            case 'revolve-grow':
              // Ritual 02: Photo sweeps from Right, About REVOLVES 3D FROM SMALL TO BIG!
              photoTransform = `translate3d(${progress * 110}px, 0px, 0px) scale(${1.0 - absProgress * 0.05})`;
              aboutTransform = `translate3d(0px, ${progress * -25}px, 0px) rotateY(${progress * 38}deg) rotateZ(${progress * -10}deg) scale(${Math.max(0.62, 1.0 - absProgress * 0.38)})`;
              break;

            case 'diagonal-a':
              // Ritual 03: Photo from Top-Left, About from Bottom-Right (DIAGONAL STRIKE!)
              photoTransform = `translate3d(${progress * -85}px, ${progress * -65}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              aboutTransform = `translate3d(${progress * 85}px, ${progress * 65}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              break;

            case 'from-down':
              // Ritual 04: Photo drops from Top, About RISES DRAMATICALLY FROM DOWN / BOTTOM!
              photoTransform = `translate3d(0px, ${progress * -75}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              aboutTransform = `translate3d(0px, ${progress * 115}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              break;

            case 'diagonal-b':
              // Ritual 05: Photo from Bottom-Left, About from Top-Right (REVERSE DIAGONAL!)
              photoTransform = `translate3d(${progress * -85}px, ${progress * 65}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              aboutTransform = `translate3d(${progress * 85}px, ${progress * -65}px, 0px) scale(${1.0 - absProgress * 0.05})`;
              break;

            case 'spiral-bloom':
              // Ritual 06: Photo Center Push, About 3D SPIRAL BLOOM (SMALL TO BIG FINALE!)
              photoTransform = `translate3d(0px, ${progress * -20}px, 0px) scale(${Math.max(0.78, 1.0 - absProgress * 0.22)})`;
              aboutTransform = `translate3d(0px, ${progress * -30}px, 0px) rotateY(${progress * -42}deg) rotateX(${progress * 14}deg) scale(${Math.max(0.58, 1.0 - absProgress * 0.42)})`;
              break;

            default:
              photoTransform = `translate3d(${progress * -80}px, 0px, 0px)`;
              aboutTransform = `translate3d(${progress * 80}px, 0px, 0px)`;
          }
        }

        const isPhotoLeft = treatment.position === 'photo-left';

        // -------------------------------------------------------------------
        // COMPONENT A: STANDALONE INDEPENDENT PHOTO CARD (IN SPECIFIC WEBP)
        // -------------------------------------------------------------------
        const PhotoCard = (
          <div
            className="w-full md:w-[46%] h-[155px] sm:h-[190px] md:h-full rounded-2xl md:rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/30 backdrop-blur-sm group will-change-transform shrink-0 order-1 md:order-none"
            style={{
              transform: photoTransform,
            }}
          >
            <img
              src={treatment.image}
              alt={treatment.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `scale(${imgZoom})`,
              }}
            />
            {/* Cinematic Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-5">
              <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold block mb-0.5 sm:mb-1">
                {treatment.category}
              </span>
              <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide">
                Chamber Atmosphere
              </span>
            </div>
          </div>
        );

        // -------------------------------------------------------------------
        // COMPONENT B: STANDALONE INDEPENDENT ABOUT CARD (TRANSPARENT GLASS)
        // -------------------------------------------------------------------
        const AboutCard = (
          <div
            className={`w-full md:w-[51%] flex-1 md:h-full rounded-2xl md:rounded-3xl p-3.5 sm:p-5 md:p-7 lg:p-9 flex flex-col justify-between overflow-hidden will-change-transform shrink-0 order-2 md:order-none ${treatment.cardBg}`}
            style={{
              transform: aboutTransform,
            }}
          >
            <div className="space-y-2 sm:space-y-3.5">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-sans font-black uppercase tracking-wider ${treatment.badgeStyle}`}>
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{treatment.duration}</span>
                </div>
                <span className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-black ${treatment.priceColor}`}>
                  {treatment.price}
                </span>
              </div>

              {/* Title & Folio */}
              <div>
                <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 block mb-0.5 sm:mb-1">
                  Signature Ritual • {treatment.category}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black leading-tight drop-shadow-md text-white">
                  {treatment.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-sans text-stone-200 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                {treatment.desc}
              </p>

              {/* Botanical Liniment Formula Tag */}
              <div className={`p-2 sm:p-3.5 rounded-xl border ${treatment.oilBoxStyle}`}>
                <span className="text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider block mb-0.5 text-gold">
                  Botanical Liniment:
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm font-sans font-semibold text-stone-200 line-clamp-1 sm:line-clamp-none">
                  {treatment.oils}
                </span>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-2 sm:pt-4 border-t border-white/15 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-stone-400">
                {treatment.category}
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking && onOpenBooking({ name: treatment.name, price: treatment.price });
                }}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-sans uppercase tracking-widest transition-all shadow-md ${treatment.btnStyle}`}
              >
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        );

        return (
          <div
            key={treatment.id}
            className="absolute inset-x-0 top-16 sm:top-20 md:top-24 bottom-2 sm:bottom-3 flex items-center justify-center px-3 sm:px-6 lg:px-8 z-20 transition-opacity duration-200 ease-out will-change-transform"
            style={getStageContainerStyle(stageNum)}
          >
            {/* The Stage Container holds TWO SEPARATE STANDALONE CARDS with 3D Perspective! */}
            <div
              className="relative w-full max-w-[1720px] mx-auto h-[74vh] sm:h-[70vh] md:h-[64vh] max-h-[640px] md:max-h-[560px] min-h-[460px] md:min-h-[430px] flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              style={{ perspective: isMobile ? 'none' : '1600px' }}
            >
              {isPhotoLeft ? (
                <>
                  {PhotoCard}
                  {AboutCard}
                </>
              ) : (
                <>
                  {AboutCard}
                  {PhotoCard}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* =======================================================================
          STAGE 8: ROYAL OBSIDIAN & GOLD MANDALA SPA FOOTER (Style 1)
         ======================================================================= */}
      {(() => {
        const footerProgress = smoothStage - 8;
        const absFooterProgress = Math.abs(footerProgress);

        // Floating paper physics: weightless aerodynamic drift, paper flutter & tilt
        const paperTranslateY = footerProgress * 55;
        const paperRotateZ = footerProgress * -3.2;
        const paperRotateX = footerProgress * 5.5;
        const paperScale = Math.max(0.86, 1.0 - absFooterProgress * 0.14);

        const footerTransform = isMobile
          ? 'none'
          : `translate3d(0px, ${paperTranslateY}px, 0px) rotateZ(${paperRotateZ}deg) rotateX(${paperRotateX}deg) scale(${paperScale})`;

        return (
          <div
            className="absolute inset-x-0 top-16 sm:top-20 md:top-24 bottom-2 sm:bottom-3 flex items-center justify-center px-3 sm:px-6 lg:px-8 z-30 transition-opacity duration-200 ease-out will-change-transform"
            style={getStageContainerStyle(8)}
          >
            {/* Royal Obsidian Glass Card with Embedded Golden Mandalas */}
            <div
              className="relative w-full max-w-5xl rounded-3xl bg-[#0e0b08]/85 backdrop-blur-2xl text-stone-100 border-2 border-amber-600/40 shadow-[0_30px_90px_rgba(217,119,6,0.25)] ring-1 ring-gold/25 p-3.5 sm:p-6 lg:p-8 flex flex-col justify-between max-h-[85vh] sm:max-h-[88vh] overflow-hidden select-none"
              style={{
                transform: footerTransform,
              }}
            >
              {/* Corner Watermark Mandala 1 (Top-Right: Slowly rotating clockwise, desktop only) */}
              <div className="hidden md:block absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] pointer-events-none opacity-[0.22] animate-[spin_70s_linear_infinite] will-change-transform">
                <svg viewBox="-150 -150 300 300" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="footerMandalaGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <circle cx="0" cy="0" r="145" stroke="url(#footerMandalaGold1)" strokeWidth="1.2" fill="none" opacity="0.85" />
                  <circle cx="0" cy="0" r="135" stroke="#fde68a" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.65" />
                  <circle cx="0" cy="0" r="85" stroke="#f59e0b" strokeWidth="1.0" fill="none" opacity="0.75" />
                  <circle cx="0" cy="0" r="55" stroke="#d97706" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.6" />
                  <circle cx="0" cy="0" r="20" stroke="#fbbf24" strokeWidth="1.0" fill="none" opacity="0.85" />
                  {[...Array(12)].map((_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    const tipX = 135 * Math.cos(a);
                    const tipY = 135 * Math.sin(a);
                    const leftX = 85 * Math.cos(a - Math.PI / 20);
                    const leftY = 85 * Math.sin(a - Math.PI / 20);
                    const rightX = 85 * Math.cos(a + Math.PI / 20);
                    const rightY = 85 * Math.sin(a + Math.PI / 20);
                    return (
                      <path
                        key={`outer-${i}`}
                        d={`M ${leftX.toFixed(1)} ${leftY.toFixed(1)} Q ${(110 * Math.cos(a)).toFixed(1)} ${(110 * Math.sin(a)).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(110 * Math.cos(a)).toFixed(1)} ${(110 * Math.sin(a)).toFixed(1)} ${rightX.toFixed(1)} ${rightY.toFixed(1)} Z`}
                        stroke="url(#footerMandalaGold1)"
                        strokeWidth="1.0"
                        fill="#d97706"
                        fillOpacity="0.05"
                      />
                    );
                  })}
                  {[...Array(8)].map((_, i) => {
                    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
                    const tipX = 55 * Math.cos(a);
                    const tipY = 55 * Math.sin(a);
                    const leftX = 20 * Math.cos(a - Math.PI / 14);
                    const leftY = 20 * Math.sin(a - Math.PI / 14);
                    const rightX = 20 * Math.cos(a + Math.PI / 14);
                    const rightY = 20 * Math.sin(a + Math.PI / 14);
                    return (
                      <path
                        key={`inner-${i}`}
                        d={`M ${leftX.toFixed(1)} ${leftY.toFixed(1)} Q ${(38 * Math.cos(a)).toFixed(1)} ${(38 * Math.sin(a)).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(38 * Math.cos(a)).toFixed(1)} ${(38 * Math.sin(a)).toFixed(1)} ${rightX.toFixed(1)} ${rightY.toFixed(1)} Z`}
                        stroke="#fde68a"
                        strokeWidth="1.0"
                        fill="#fbbf24"
                        fillOpacity="0.08"
                      />
                    );
                  })}
                  {[...Array(24)].map((_, i) => {
                    const a = (i / 24) * Math.PI * 2;
                    return <circle key={`b-${i}`} cx={(145 * Math.cos(a)).toFixed(1)} cy={(145 * Math.sin(a)).toFixed(1)} r="2" fill="#fde68a" opacity="0.85" />;
                  })}
                  <circle cx="0" cy="0" r="5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                </svg>
              </div>

              {/* Corner Watermark Mandala 2 (Bottom-Left: Rotating counter-clockwise, desktop only) */}
              <div className="hidden md:block absolute -bottom-24 -left-24 sm:-bottom-32 sm:-left-32 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] pointer-events-none opacity-[0.18] animate-[spin_90s_linear_infinite_reverse] will-change-transform">
                <svg viewBox="-150 -150 300 300" className="w-full h-full overflow-visible">
                  <circle cx="0" cy="0" r="145" stroke="#f59e0b" strokeWidth="1.0" fill="none" opacity="0.7" />
                  <circle cx="0" cy="0" r="115" stroke="#fde68a" strokeWidth="0.8" strokeDasharray="5 5" fill="none" opacity="0.5" />
                  <circle cx="0" cy="0" r="75" stroke="#d97706" strokeWidth="1.0" fill="none" opacity="0.75" />
                  {[...Array(16)].map((_, i) => {
                    const a = (i / 16) * Math.PI * 2;
                    return (
                      <line
                        key={`spoke-${i}`}
                        x1={(75 * Math.cos(a)).toFixed(1)}
                        y1={(75 * Math.sin(a)).toFixed(1)}
                        x2={(115 * Math.cos(a)).toFixed(1)}
                        y2={(115 * Math.sin(a)).toFixed(1)}
                        stroke="#fbbf24"
                        strokeWidth="0.8"
                        opacity="0.6"
                      />
                    );
                  })}
                  {[...Array(8)].map((_, i) => {
                    const a = (i / 8) * Math.PI * 2;
                    const tipX = 75 * Math.cos(a);
                    const tipY = 75 * Math.sin(a);
                    const leftX = 25 * Math.cos(a - Math.PI / 12);
                    const leftY = 25 * Math.sin(a - Math.PI / 12);
                    const rightX = 25 * Math.cos(a + Math.PI / 12);
                    const rightY = 25 * Math.sin(a + Math.PI / 12);
                    return (
                      <path
                        key={`bl-inner-${i}`}
                        d={`M ${leftX.toFixed(1)} ${leftY.toFixed(1)} Q ${(50 * Math.cos(a)).toFixed(1)} ${(50 * Math.sin(a)).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${(50 * Math.cos(a)).toFixed(1)} ${(50 * Math.sin(a)).toFixed(1)} ${rightX.toFixed(1)} ${rightY.toFixed(1)} Z`}
                        stroke="#fbbf24"
                        strokeWidth="1.0"
                        fill="#d97706"
                        fillOpacity="0.06"
                      />
                    );
                  })}
                  <circle cx="0" cy="0" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                </svg>
              </div>

              {/* Center Faint Sacred Watermark Glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] pointer-events-none opacity-[0.06] rounded-full bg-gradient-to-tr from-gold to-amber-600 blur-2xl" />

              {/* 1. Header with Royal Seal & Gold Gradient Typography */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 border-b border-amber-600/25 pb-2 sm:pb-3 text-center sm:text-left">
                <div>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-amber-400 uppercase tracking-wider leading-tight">
                    Vedic Wellness Spa & Salon
                  </h2>
                  <p className="text-[10px] sm:text-xs font-sans text-stone-300 mt-0.5 flex items-center justify-center sm:justify-start gap-1 flex-wrap">
                    <MapPin className="w-3 h-3 text-gold inline-block shrink-0" />
                    <span>The Radiant Hotel & Resort • Gorakhpur • Daily 8 AM – 9 PM</span>
                  </p>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 backdrop-blur-md border border-gold/40 text-gold text-[10px] font-sans font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                  <Flower2 className="w-3.5 h-3.5 text-gold" />
                  <span>Royal Ayurvedic Seal</span>
                </div>
              </div>

              {/* 2. Interactive Concierge Glass Panels & Vedic Pillars */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 py-2 sm:py-2.5">
                {/* Direct Hotline Glass Card */}
                <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-amber-500/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all shadow-inner group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 border border-gold/40 text-stone-100 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-amber-400/90 block tracking-wider">Direct Concierge Hotline</span>
                    <a
                      href={`tel:${hotelInfo.contact.reservations}`}
                      className="text-xs sm:text-base font-serif font-black text-stone-100 hover:text-gold transition-colors block leading-tight"
                    >
                      {hotelInfo.contact.reservations}
                    </a>
                  </div>
                </div>

                {/* Email & Reservations Card */}
                <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-amber-500/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all shadow-inner group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 border border-gold/40 text-stone-100 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-amber-400/90 block tracking-wider">Reservations & Inquiries</span>
                    <span className="text-xs sm:text-sm font-sans text-stone-200 font-semibold block leading-tight">{hotelInfo.contact.email}</span>
                  </div>
                </div>

                {/* 3 Sacred Hallmark Badges */}
                <div className="bg-white/[0.03] backdrop-blur-md border border-amber-500/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col justify-center gap-1">
                  <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-gold tracking-widest block text-center md:text-left">
                    Sanctuary Guarantees
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center md:justify-start">
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/35 text-amber-300 text-[8.5px] sm:text-[9.5px] font-sans font-bold">
                      100% Herbal Doshas
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/35 text-amber-300 text-[8.5px] sm:text-[9.5px] font-sans font-bold">
                      Certified Vaidyas
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/35 text-amber-300 text-[8.5px] sm:text-[9.5px] font-sans font-bold">
                      Private Suites
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Actions & Copyright with Gold Accent Button */}
              <div className="relative z-10 pt-2 sm:pt-2.5 border-t border-amber-600/25 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                <p className="text-[10px] sm:text-xs font-sans text-stone-400 text-center sm:text-left">
                  © {new Date().getFullYear()} Vedic Spa & Royal Salon • The Radiant Hotel & Resort
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => jumpToStage(0)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white border border-amber-500/35 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <ArrowUp className="w-3 h-3 text-gold" />
                    <span>Return to Top</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenBooking && onOpenBooking({ name: 'Vedic Spa & Salon Appointment', price: '₹2,199+' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-gold via-amber-400 to-gold hover:from-white hover:to-white text-forest-950 font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(217,119,6,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] cursor-pointer hover:scale-105"
                  >
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
