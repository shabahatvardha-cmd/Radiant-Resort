import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  MapPin,
  Clock,
  ArrowUp,
} from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';
import { hotelInfo } from '../../data/hotelInfo';
import CinematicAtmosphericDust from '../effects/CinematicAtmosphericDust';

const ROOM_PRICES = {
  'deluxe-room': '₹3,499',
  'deluxe-suite-room': '₹5,499',
  'executive-room': '₹4,199',
  'executive-suite-room': '₹6,499',
  'grandeur-room': '₹8,999',
  'standard-room': '₹2,999',
};

const FOLIO_METADATA = [
  { folio: 'FOLIO 01', category: 'CLASSIC LUXURY' },
  { folio: 'FOLIO 02', category: 'SIGNATURE SUITE' },
  { folio: 'FOLIO 03', category: 'EXECUTIVE CLASS' },
  { folio: 'FOLIO 04', category: 'SIGNATURE SUITE' },
  { folio: 'FOLIO 05', category: 'PREMIER COLLECTION' },
  { folio: 'FOLIO 06', category: 'ESSENTIAL COMFORT' },
];

export default function CinematicRoomsFolio({ rooms = [], onOpenBooking }) {
  const trackRef = useRef(null);
  const targetStageRef = useRef(0);
  const currentStageRef = useRef(0);
  const animFrameRef = useRef(null);

  // Discrete integer stage for labels
  const [activeStage, setActiveStage] = useState(0);
  // Continuous smooth stage driven by scroll
  const [smoothStage, setSmoothStage] = useState(0);

  // Independent gallery photo index per room: { [roomId]: number }
  const [galleryIndices, setGalleryIndices] = useState({});

  const totalRooms = rooms.length;
  const numRoomTransitions = Math.max(1, totalRooms - 1); // 5 room flip transitions (Folio 01 -> 06)
  const maxStage = totalRooms; // 6 stages total: Stage 0-5 (Rooms), Stage 6 (Grand Resort Footer)

  const getActivePhotoIdx = (roomId) => galleryIndices[roomId] ?? 0;

  const handleSelectPhoto = (roomId, idx) => {
    setGalleryIndices((prev) => ({ ...prev, [roomId]: idx }));
    playClickSound();
  };

  const handleNextPhoto = (roomId, maxLen) => {
    setGalleryIndices((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] ?? 0) + 1) % maxLen,
    }));
    playClickSound();
  };

  const handlePrevPhoto = (roomId, maxLen) => {
    setGalleryIndices((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] ?? 0) - 1 + maxLen) % maxLen,
    }));
    playClickSound();
  };

  // Jump smoothly to a specific room or stage
  const jumpToRoom = (idx) => {
    targetStageRef.current = Math.max(0, Math.min(maxStage, idx));
    playClickSound();
  };

  // Direct wheel, touch & keyboard gesture handling (Home-page locked full-screen style)
  useEffect(() => {
    // Wheel scroll sensitivity: ~360px per stage transition for smooth, luxurious pacing
    const SENSITIVITY = 0.0024;

    const handleWheel = (e) => {
      // Accumulate directly into targetStageRef.current on the locked screen
      targetStageRef.current = Math.max(
        0,
        Math.min(maxStage, targetStageRef.current + e.deltaY * SENSITIVITY)
      );
    };

    let touchStartY = 0;
    let touchStartInitialY = 0;
    let touchStartTime = 0;
    let touchStartStage = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartInitialY = e.touches[0].clientY;
        touchStartTime = performance.now();
        touchStartStage = targetStageRef.current;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;

        // If at the Grand Resort Footer, allow natural container scrolling:
        if (targetStageRef.current >= maxStage - 0.3) {
          const footerCard = e.target.closest('.overflow-y-auto');
          if (footerCard) {
            if (deltaY > 0) return;
            if (deltaY < 0 && footerCard.scrollTop > 5) return;
          }
        }

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

      // If at footer, guard against fling:
      if (touchStartStage >= maxStage - 0.3) {
        const footerCard = e.target.closest('.overflow-y-auto');
        if (footerCard && footerCard.scrollTop > 5) {
          targetStageRef.current = maxStage;
          return;
        }
        if (totalDeltaY > 0) {
          targetStageRef.current = maxStage;
          return;
        }
        if (totalDeltaY < -50 || velocity < -0.5) {
          targetStageRef.current = maxStage - 1;
          return;
        } else {
          targetStageRef.current = maxStage;
          return;
        }
      }

      // Smooth continuous momentum glide (proportional to finger speed, no multi-stage jumps):
      if (Math.abs(velocity) > 0.25) {
        const momentum = Math.sign(velocity) * Math.min(0.35, Math.abs(velocity) * 0.15);
        targetStageRef.current = Math.max(0, Math.min(maxStage, targetStageRef.current + momentum));
      }
      // Zero auto-snap: animation stays stably at exact scroll progress
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
    const updateLoop = () => {
      if (!isRunning) return;

      // Exponential smoothing for fluid cinematic inertia
      const diff = targetStageRef.current - currentStageRef.current;
      currentStageRef.current += diff * 0.16;

      const smoothed = currentStageRef.current;
      setSmoothStage(smoothed);

      const rounded = Math.round(smoothed);
      setActiveStage(Math.max(0, Math.min(totalRooms - 1, rounded)));

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalRooms, maxStage]);

  // ---------------------------------------------------------------------------
  // 3D FLIP KINEMATICS CALCULATION (STAGES 0.0 -> 5.0):
  // Continuous monotonic rotation across all 6 rooms
  // ---------------------------------------------------------------------------
  const roomProg = Math.max(0, Math.min(numRoomTransitions, smoothStage));
  const k = Math.min(numRoomTransitions - 1, Math.floor(roomProg));
  const r = Math.max(0, Math.min(1, roomProg - k));

  // Dwell plateau: first 15% and last 15% of interval remain flat & settled
  const DWELL = 0.15;
  let flipFraction = 0;
  if (r < DWELL) {
    flipFraction = 0;
  } else if (r > 1 - DWELL) {
    flipFraction = 1;
  } else {
    const t = (r - DWELL) / (1 - 2 * DWELL);
    flipFraction = t * t * (3 - 2 * t);
  }

  // Cumulative flip progress across the whole timeline
  const cumulativeProgress = k + flipFraction;

  // Left panel rotates in positive X direction
  const angleLeft = cumulativeProgress * 180;
  // Right panel rotates in OPPOSITE direction (negative X direction)
  const angleRight = -cumulativeProgress * 180;

  // Dynamic 3D depth lift at midpoint (peaks at edge-on 90deg)
  const midPhase = Math.sin(flipFraction * Math.PI);
  const liftZ = midPhase * 24; // Subtle 24px depth lift to prevent vertical clipping

  // Room assignments for Front and Back faces
  const isIntervalEven = k % 2 === 0;
  const frontRoomIdx = isIntervalEven ? k : k + 1;
  const backRoomIdx = isIntervalEven ? k + 1 : k;

  const frontRoom = rooms[frontRoomIdx] || rooms[0];
  const backRoom = rooms[backRoomIdx] || rooms[1];

  // Active face detection for interactive elements (clicks/inputs)
  const isFrontFaceActive = flipFraction < 0.5;

  // ---------------------------------------------------------------------------
  // GRAND RESORT FOOTER TRANSITION (STAGE 5.0 -> 6.0):
  // When scrolling past Room 06, Room 06 smoothly dissolves and the Grand Footer
  // glides into the exact same screen.
  // ---------------------------------------------------------------------------
  const footerRaw = Math.max(0, Math.min(1.0, smoothStage - numRoomTransitions));
  const footerEase = footerRaw * footerRaw * (3 - 2 * footerRaw); // Hermite cubic ease

  // Room showcase scales down gently and dissolves as the footer appears
  const showcaseOpacity = Math.max(0, 1.0 - footerEase * 1.5);
  const showcaseScale = 1.0 - footerEase * 0.08;
  const isShowcaseActive = footerRaw < 0.45;

  // Footer slide fades in and glides up from bottom on the exact same screen
  const footerOpacity = Math.max(0, (footerRaw - 0.12) / 0.88);
  const footerTranslateY = (1.0 - footerEase) * 45;
  const isFooterActive = footerRaw > 0.45;

  return (
    <div className="relative h-screen min-h-[100dvh] h-[100dvh] w-full bg-[#FAF5EE] text-forest-950 flex flex-col justify-center items-center px-3 sm:px-8 lg:px-14 select-none pt-16 sm:pt-24 pb-4 sm:pb-6 overflow-hidden">
      {/* Atmospheric Floating Dust Particles & Window Sunlight Shaft */}
      <CinematicAtmosphericDust theme="champagneLight" density="low" hasSunlightRay={true} speed={0.85} />

      {/* =======================================================================
          MAIN DESKTOP ROOMS SHOWCASE (STAGES 0.0 -> 5.0)
         ======================================================================= */}
      <div
        className="hidden md:flex relative z-10 max-w-[1720px] px-4 sm:px-8 lg:px-12 mx-auto w-full items-center justify-center transition-all duration-150 ease-out will-change-transform"
        style={{
          opacity: showcaseOpacity,
          transform: `scale(${showcaseScale})`,
          pointerEvents: isShowcaseActive ? 'auto' : 'none',
        }}
      >
        <div className="w-full relative h-[68vh] max-h-[580px] min-h-[460px] grid grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ===============================================================
                  LEFT PANEL: ROOM INFORMATION (~45% width)
                  3D FLIP CONTAINER: Rotates in positive X direction (+angleLeft)
                 =============================================================== */}
          <div
            className="col-span-5 xl:col-span-5 h-full relative"
            style={{ perspective: '2000px' }}
          >
            {/* 3D Rotating Card Container */}
            <div
              className="w-full h-full relative will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                transform: `translateZ(${liftZ}px) rotateX(${angleLeft}deg)`,
                transition: 'box-shadow 0.2s ease-out',
              }}
            >
              {/* FRONT FACE (Room frontRoomIdx) - Sharp-Edged Architectural Card */}
              <div
                className="absolute inset-0 rounded-none bg-white border border-stone-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(0deg)',
                  pointerEvents: isFrontFaceActive ? 'auto' : 'none',
                }}
              >
                <RoomTextFaceContent
                  room={frontRoom}
                  roomIdx={frontRoomIdx}
                  price={ROOM_PRICES[frontRoom.id]}
                  meta={FOLIO_METADATA[frontRoomIdx]}
                  onOpenBooking={onOpenBooking}
                />
              </div>

              {/* BACK FACE (Room backRoomIdx) - Sharp-Edged Architectural Card */}
              <div
                className="absolute inset-0 rounded-none bg-white border border-stone-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)',
                  pointerEvents: !isFrontFaceActive ? 'auto' : 'none',
                }}
              >
                <RoomTextFaceContent
                  room={backRoom}
                  roomIdx={backRoomIdx}
                  price={ROOM_PRICES[backRoom.id]}
                  meta={FOLIO_METADATA[backRoomIdx]}
                  onOpenBooking={onOpenBooking}
                />
              </div>
            </div>
          </div>

          {/* ===============================================================
                  RIGHT PANEL: LARGE IMAGE GALLERY (~55% width)
                  3D FLIP CONTAINER: Rotates in OPPOSITE X direction (angleRight = -angleLeft)
                 =============================================================== */}
          <div
            className="col-span-7 xl:col-span-7 h-full relative"
            style={{ perspective: '2000px' }}
          >
            {/* 3D Rotating Card Container */}
            <div
              className="w-full h-full relative will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                transform: `translateZ(${liftZ}px) rotateX(${angleRight}deg)`,
                transition: 'box-shadow 0.2s ease-out',
              }}
            >
              {/* FRONT FACE (Room frontRoomIdx) - Sharp-Edged Architectural Card */}
              <div
                className="absolute inset-0 rounded-none bg-white border border-stone-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(0deg)',
                  pointerEvents: isFrontFaceActive ? 'auto' : 'none',
                }}
              >
                <RoomGalleryFaceContent
                  room={frontRoom}
                  meta={FOLIO_METADATA[frontRoomIdx]}
                  activeImgIdx={getActivePhotoIdx(frontRoom.id)}
                  onSelectPhoto={(idx) => handleSelectPhoto(frontRoom.id, idx)}
                  onNextPhoto={() => handleNextPhoto(frontRoom.id, frontRoom.images.length)}
                  onPrevPhoto={() => handlePrevPhoto(frontRoom.id, frontRoom.images.length)}
                />
              </div>

              {/* BACK FACE (Room backRoomIdx, oriented for opposite -180deg flip) - Sharp-Edged Architectural Card */}
              <div
                className="absolute inset-0 rounded-none bg-white border border-stone-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(-180deg)',
                  pointerEvents: !isFrontFaceActive ? 'auto' : 'none',
                }}
              >
                <RoomGalleryFaceContent
                  room={backRoom}
                  meta={FOLIO_METADATA[backRoomIdx]}
                  activeImgIdx={getActivePhotoIdx(backRoom.id)}
                  onSelectPhoto={(idx) => handleSelectPhoto(backRoom.id, idx)}
                  onNextPhoto={() => handleNextPhoto(backRoom.id, backRoom.images.length)}
                  onPrevPhoto={() => handlePrevPhoto(backRoom.id, backRoom.images.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
              MOBILE: DEDICATED COMPACT FOLIO PRESENTATION (md:hidden)
             ======================================================================= */}
      <div
        className="md:hidden relative z-10 w-full max-w-lg mx-auto py-2 overflow-hidden transition-all duration-150 ease-out"
        style={{
          opacity: showcaseOpacity,
          pointerEvents: isShowcaseActive ? 'auto' : 'none',
        }}
      >
        {/* Atmospheric Floating Dust Particles Layer */}
        <CinematicAtmosphericDust theme="champagneLight" density="low" hasSunlightRay={true} speed={0.8} />

        {/* Mobile Folio Tabs - Sharp-Edged */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveStage(i);
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-none text-xs font-sans font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeStage === i
                ? 'bg-forest-950 text-gold shadow-md ring-2 ring-gold'
                : 'bg-white text-stone-700 border border-stone-300'
                }`}
            >
              0{i + 1} {r.name}
            </button>
          ))}
        </div>

        {/* Selected Room Card - Sharp-Edged Architectural Panel */}
        {(() => {
          const room = rooms[activeStage] || rooms[0];
          const price = ROOM_PRICES[room.id] || '₹3,499';
          const meta = FOLIO_METADATA[activeStage] || { folio: `FOLIO 0${activeStage + 1}`, category: room.category };
          const activeImgIdx = getActivePhotoIdx(room.id);
          const currentImg = room.images[activeImgIdx] || room.images[0];

          return (
            <div className="relative z-10 bg-white rounded-none border border-stone-300 shadow-lg overflow-hidden space-y-4 p-5 sm:p-6">
              {/* Image Frame - Pure Photo Only, Sharp-Edged */}
              <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-black/10 border border-stone-200 shadow-inner">
                <img
                  src={currentImg.src}
                  alt={currentImg.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Selector - Pure 3 Photos Only, Sharp-Edged */}
              <div className="flex items-center gap-2">
                {room.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => handleSelectPhoto(room.id, idx)}
                    className={`w-16 h-12 rounded-none overflow-hidden border-2 transition-all ${activeImgIdx === idx
                      ? 'border-gold ring-2 ring-gold/40 scale-105'
                      : 'border-stone-300 opacity-70'
                      }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Title & Tagline - Cleaned Header */}
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-black uppercase text-forest-950">
                  {room.name}
                </h3>
                <p className="text-xs font-serif italic text-gold-dark font-bold">
                  "{room.tagline}"
                </p>
                <p className="text-xs font-sans text-stone-600 font-medium leading-relaxed pt-1">
                  {room.description}
                </p>
              </div>

              {/* Privileges - Sharp-Edged */}
              <div className="bg-[#FAF5EE] p-3.5 rounded-none border border-stone-200/80 space-y-1.5">
                <p className="text-[10px] font-sans font-black uppercase tracking-wider text-forest-950">
                  Verified Suite Privileges:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {room.verifiedHighlights.slice(0, 4).map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs font-sans text-stone-700">
                      <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Bar - Sharp-Edged */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200">
                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone-500 block">
                    Starting From
                  </span>
                  <span className="text-xl font-serif font-black text-forest-950">
                    {price}{' '}
                    <span className="text-xs font-sans font-normal text-stone-500">/ Night</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    onOpenBooking && onOpenBooking({ name: room.name, price });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-none bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve</span>
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* =======================================================================
          GRAND RESORT FOOTER SLIDE (STAGE 6 — ON THE SAME LOCKED SCREEN)
         ======================================================================= */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-30 transition-transform duration-150 ease-out will-change-transform"
        style={{
          opacity: footerOpacity,
          transform: `translate3d(0px, ${footerTranslateY}px, 0px)`,
          pointerEvents: isFooterActive ? 'auto' : 'none',
        }}
      >
        {/* Soft Evening Forest Backdrop Card - Sharp-Edged */}
        <div className="relative w-full max-w-5xl rounded-none bg-forest-950 text-white border border-gold/40 shadow-[0_30px_90px_rgba(0,0,0,0.5)] p-5 sm:p-8 lg:p-10 overflow-y-auto max-h-[85vh] max-h-[85dvh] flex flex-col justify-between">
          {/* Subtle Ambient Golden Dust Particles */}
          <CinematicAtmosphericDust theme="champagneDark" density="low" hasSunlightRay={false} speed={0.7} />

          {/* Top Brand Header */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/25 pb-4 sm:pb-6">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <img
                src="/logo/logo.webp"
                alt="The Radiant Hotel & Resort"
                className="h-9 sm:h-12 w-auto object-contain drop-shadow-md"
              />
              <div>
                <span className="text-[9px] font-sans font-black uppercase tracking-[0.25em] text-gold block">
                  Gorakhpur Luxury Landmark
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight uppercase">
                  {hotelInfo.name}
                </h3>
                <p className="text-xs font-serif italic text-gold-light">
                  {hotelInfo.tagline}
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenBooking && onOpenBooking({ name: 'The Sanctuary Collection', price: '₹3,499' });
                }}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-none bg-gold hover:bg-gold-light text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Sanctuary</span>
              </button>
            </div>
          </div>

          {/* Middle Grid: Contact & Address Information */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6">
            {/* Address */}
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-sans font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Resort Location</span>
              </div>
              <p className="text-xs font-sans text-stone-300 leading-relaxed">
                {hotelInfo.address.line2}
              </p>
              <p className="text-xs font-sans text-stone-400">
                {hotelInfo.city}, Uttar Pradesh {hotelInfo.address.pincode}, India
              </p>
            </div>

            {/* Reservations & Concierge */}
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-sans font-black uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Concierge & Reservations</span>
              </div>
              <p className="text-xs font-sans text-stone-200 font-bold">
                24 Hours Daily • 7 Days a Week
              </p>
              <p className="text-xs font-sans text-stone-300">
                Direct Line: <span className="text-gold font-bold">{hotelInfo.contact.phone}</span>
              </p>
              <p className="text-xs font-sans text-stone-400">
                Email: {hotelInfo.contact.email}
              </p>
            </div>

            {/* Return to Folio Navigation */}
            <div className="space-y-2 text-center md:text-right flex flex-col justify-center items-center md:items-end">

            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-stone-400 gap-2">
            <p>© {new Date().getFullYear()} The Radiant Hotel & Resort. All rights reserved.</p>
            <p className="text-stone-500">Statuario Marble & Teak Architecture Sanctuary</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: REUSABLE ROOM TEXT FACE (LEFT PANEL)
// =============================================================================
function RoomTextFaceContent({ room, roomIdx, price, meta, onOpenBooking }) {
  if (!room) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Top Header Group (Folio & Category badge completely removed as requested) */}
      <div className="shrink-0 space-y-1">
        <h2 className="text-xl sm:text-2xl xl:text-3xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
          {room.name}
        </h2>

        <p className="text-xs sm:text-sm font-serif italic text-gold-dark font-bold">
          "{room.tagline}"
        </p>
      </div>

      {/* Middle Details Group - strictly contained so nothing overflows up or down */}
      <div className="flex-1 min-h-0 flex flex-col justify-center space-y-2 py-1 overflow-hidden">
        <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed line-clamp-2 shrink-0">
          {room.description}
        </p>

        {/* Verified Suite Privileges Box - Sharp-Edged */}
        <div className="bg-[#FAF5EE] p-2.5 rounded-none border border-stone-200/90 shadow-sm space-y-1 shrink-0">
          <p className="text-[10px] font-sans font-black uppercase tracking-wider text-forest-950">
            Verified Suite Privileges:
          </p>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {room.verifiedHighlights.slice(0, 4).map((hl, i) => (
              <li
                key={i}
                className="flex items-start gap-1 text-[11px] font-sans text-stone-700 leading-tight"
              >
                <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suite Features & Technology Chips - Sharp-Edged */}
        <div className="space-y-1 shrink-0">
          <p className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-500">
            Suite Features & Technology:
          </p>
          <div className="flex flex-wrap gap-1">
            {room.verifiedAmenities.slice(0, 5).map((amenity, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-none bg-[#FAF5EE] border border-stone-200 text-stone-600 text-[9px] font-sans font-bold"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - Sharp-Edged */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200/90 shrink-0">
        <div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone-500 block">
            Direct Reservation Privilege
          </span>
          <span className="text-lg sm:text-xl xl:text-2xl font-serif font-black text-forest-950">
            From {price}{' '}
            <span className="text-xs font-sans font-normal text-stone-500">/ Night</span>
          </span>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenBooking && onOpenBooking({ name: room.name, price });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 cursor-pointer shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reserve Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: REUSABLE ROOM GALLERY FACE (RIGHT PANEL)
// =============================================================================
function RoomGalleryFaceContent({
  room,
  meta,
  activeImgIdx,
  onSelectPhoto,
  onNextPhoto,
  onPrevPhoto,
}) {
  if (!room) return null;
  const currentImg = room.images[activeImgIdx] || room.images[0];

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Master Architectural Showcase Frame - 100% pure photo only, no numbers, sharp-edged */}
      <div className="relative w-full flex-1 min-h-0 rounded-none overflow-hidden bg-black/10 border border-stone-200 shadow-inner group">
        <img
          src={currentImg.src}
          alt={currentImg.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Prev / Next Controls (arrow only, no numbers) */}
        <div className="absolute inset-y-0 left-2.5 flex items-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevPhoto();
            }}
            className="w-8 h-8 rounded-none bg-black/40 hover:bg-gold text-white hover:text-forest-950 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2.5 flex items-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextPhoto();
            }}
            className="w-8 h-8 rounded-none bg-black/40 hover:bg-gold text-white hover:text-forest-950 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Gallery Thumbnail Selector Strip - ONLY the 3 photo thumbnails, sharp-edged, no room name */}
      <div className="pt-2.5 flex items-center gap-2.5 shrink-0">
        {room.images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => onSelectPhoto(idx)}
            className={`relative w-16 sm:w-20 aspect-[16/10] rounded-none overflow-hidden border-2 transition-all duration-200 cursor-pointer ${activeImgIdx === idx
              ? 'border-gold ring-2 ring-gold/40 scale-105 shadow-md'
              : 'border-stone-300 opacity-70 hover:opacity-100 hover:border-stone-400'
              }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
            {activeImgIdx === idx && (
              <div className="absolute inset-0 bg-gold/15" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
