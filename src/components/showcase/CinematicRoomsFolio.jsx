import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

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
  const numTransitions = Math.max(1, totalRooms - 1);

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

  // Jump smoothly to a specific room
  const jumpToRoom = (idx) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalDistance = trackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = scrollTop + (idx / numTransitions) * totalDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    playClickSound();
  };

  // Robust, real-time scroll tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalDistance = trackRef.current.offsetHeight - window.innerHeight;
      if (totalDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
      targetStageRef.current = progress * numTransitions;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    let isRunning = true;
    const updateLoop = () => {
      if (!isRunning) return;

      // Sample on RAF for sub-pixel sync with scroll
      updateScrollProgress();

      // Exponential smoothing for fluid cinematic inertia
      const diff = targetStageRef.current - currentStageRef.current;
      currentStageRef.current += diff * 0.22;

      const smoothed = currentStageRef.current;
      setSmoothStage(smoothed);

      const rounded = Math.round(smoothed);
      setActiveStage(Math.max(0, Math.min(totalRooms - 1, rounded)));

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalRooms, numTransitions]);

  // ---------------------------------------------------------------------------
  // 3D FLIP KINEMATICS CALCULATION:
  // Continuous monotonic rotation across all 6 rooms
  // ---------------------------------------------------------------------------
  const k = Math.min(numTransitions - 1, Math.floor(smoothStage));
  const r = Math.max(0, Math.min(1, smoothStage - k));

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

  return (
    <>
      {/* =======================================================================
          PINNED OPPOSITE-DIRECTION 3D FLIP EXPERIENCE (DESKTOP & TABLET)
          Locked at sticky top-0, sized and centered to prevent any bottom clipping
         ======================================================================= */}
      <div
        ref={trackRef}
        className="hidden md:block relative w-full"
        style={{ height: `${numTransitions * 70 + 100}vh` }}
      >
        {/* Sticky Full-Viewport Container: Vertically centered with generous margins */}
        <div className="sticky top-0 h-screen w-full bg-[#FAF5EE] text-forest-950 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 select-none pt-16 pb-8">
          {/* Main Stage: Fixed Split-Screen Composition with Opposite 3D Flips */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-center">
            <div className="w-full relative h-[68vh] max-h-[600px] min-h-[460px] grid grid-cols-12 gap-8 lg:gap-10 items-center">
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
                  {/* FRONT FACE (Room frontRoomIdx) */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
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

                  {/* BACK FACE (Room backRoomIdx) */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
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
                  {/* FRONT FACE (Room frontRoomIdx) */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white border border-stone-200/90 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
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

                  {/* BACK FACE (Room backRoomIdx, oriented for opposite -180deg flip) */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-white border border-stone-200/90 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
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
        </div>
      </div>

      {/* =======================================================================
          MOBILE: DEDICATED COMPACT FOLIO PRESENTATION (md:hidden)
         ======================================================================= */}
      <div className="md:hidden w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Mobile Folio Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveStage(i);
                playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                activeStage === i
                  ? 'bg-forest-950 text-gold shadow-md ring-2 ring-gold'
                  : 'bg-white text-stone-700 border border-stone-300'
              }`}
            >
              0{i + 1} {r.name}
            </button>
          ))}
        </div>

        {/* Selected Room Card */}
        {(() => {
          const room = rooms[activeStage] || rooms[0];
          const price = ROOM_PRICES[room.id] || '₹3,499';
          const meta = FOLIO_METADATA[activeStage] || { folio: `FOLIO 0${activeStage + 1}`, category: room.category };
          const activeImgIdx = getActivePhotoIdx(room.id);
          const currentImg = room.images[activeImgIdx] || room.images[0];

          return (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden space-y-4 p-5 sm:p-6">
              {/* Image Frame */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/10 border border-stone-200 shadow-inner">
                <img
                  src={currentImg.src}
                  alt={currentImg.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-forest-950/85 backdrop-blur-md px-2.5 py-1 rounded-full text-gold font-sans font-black text-[9px] uppercase tracking-wider border border-gold/40">
                  {meta.category}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-sans text-xs flex items-center justify-between">
                  <span className="truncate">{currentImg.caption}</span>
                  <span className="text-[10px] text-gold shrink-0 ml-2">
                    0{activeImgIdx + 1} / 0{room.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              <div className="flex items-center gap-2">
                {room.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => handleSelectPhoto(room.id, idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIdx === idx
                        ? 'border-gold ring-2 ring-gold/40 scale-105'
                        : 'border-stone-300 opacity-70'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.25em] text-gold-dark block">
                  {meta.folio} • {meta.category}
                </span>
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

              {/* Privileges */}
              <div className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-stone-200/80 space-y-1.5">
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

              {/* Action Bar */}
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
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve</span>
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}

// =============================================================================
// SUB-COMPONENT: REUSABLE ROOM TEXT FACE (LEFT PANEL)
// =============================================================================
function RoomTextFaceContent({ room, roomIdx, price, meta, onOpenBooking }) {
  if (!room) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Header Group */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF5EE] border border-gold/40 shadow-sm text-gold-dark font-sans font-black text-[10px] uppercase tracking-[0.22em]">
          <Sparkles className="w-3 h-3 text-gold-dark" />
          <span>
            {meta?.folio || `FOLIO 0${roomIdx + 1}`} • {meta?.category || room.category}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl xl:text-4xl font-serif font-black uppercase text-forest-950 tracking-tight leading-tight">
          {room.name}
        </h2>

        <p className="text-xs sm:text-sm font-serif italic text-gold-dark font-bold">
          "{room.tagline}"
        </p>
      </div>

      {/* Middle Details Group */}
      <div className="space-y-2.5 my-auto py-1">
        <p className="text-xs sm:text-sm font-sans text-stone-600 font-medium leading-relaxed line-clamp-2">
          {room.description}
        </p>

        {/* Verified Suite Privileges Box */}
        <div className="bg-[#FAF5EE] p-2.5 sm:p-3 rounded-2xl border border-stone-200/90 shadow-sm space-y-1">
          <p className="text-[10px] font-sans font-black uppercase tracking-wider text-forest-950">
            Verified Suite Privileges:
          </p>
          <ul className="grid grid-cols-2 gap-1">
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

        {/* Suite Features & Technology Chips */}
        <div className="space-y-1">
          <p className="text-[10px] font-sans font-black uppercase tracking-wider text-stone-500">
            Suite Features & Technology:
          </p>
          <div className="flex flex-wrap gap-1">
            {room.verifiedAmenities.slice(0, 5).map((amenity, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-[#FAF5EE] border border-stone-200 text-stone-600 text-[9px] font-sans font-bold"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200/90">
        <div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone-500 block">
            Direct Reservation Privilege
          </span>
          <span className="text-xl sm:text-2xl font-serif font-black text-forest-950">
            From {price}{' '}
            <span className="text-xs font-sans font-normal text-stone-500">/ Night</span>
          </span>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenBooking && onOpenBooking({ name: room.name, price });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-950 hover:bg-gold text-gold hover:text-forest-950 font-sans font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 cursor-pointer shrink-0"
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
    <div className="w-full h-full flex flex-col justify-between">
      {/* Master Architectural Showcase Frame */}
      <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden bg-black/10 border border-stone-200 shadow-inner group">
        <img
          src={currentImg.src}
          alt={currentImg.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient Shadow Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Top-Left Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-forest-950/85 backdrop-blur-md text-gold text-[10px] font-sans font-black tracking-wider uppercase border border-gold/40">
            {meta?.category || room.category}
          </span>
        </div>

        {/* Top-Right Gallery Counter */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-sans font-black tracking-widest uppercase border border-white/20">
            0{activeImgIdx + 1} / 0{room.images.length}
          </span>
        </div>

        {/* Floating Prev / Next Controls */}
        <div className="absolute inset-y-0 left-2.5 flex items-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevPhoto();
            }}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-gold text-white hover:text-forest-950 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/20"
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
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-gold text-white hover:text-forest-950 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Perspective Label */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white">
          <div>
            <p className="text-[9px] font-sans font-black text-gold tracking-widest uppercase">
              Architectural Perspective
            </p>
            <p className="text-xs sm:text-sm font-serif font-black text-white">
              {currentImg.caption}
            </p>
          </div>
          <span className="text-[9px] font-sans font-medium text-stone-300">
            Photo {activeImgIdx + 1} of {room.images.length}
          </span>
        </div>
      </div>

      {/* Interactive Gallery Thumbnail Selector Strip */}
      <div className="pt-2.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          {room.images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => onSelectPhoto(idx)}
              className={`relative w-14 sm:w-16 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                activeImgIdx === idx
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

        {/* Perspective Indicator Note */}
        <span className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-wider hidden sm:inline">
          Select Perspective
        </span>
      </div>
    </div>
  );
}
