import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { playClickSound } from '../../utils/audioEffects';

/**
 * Mathematical Hermite S-Curve Interpolation (3t^2 - 2t^3)
 */
function getSubProgress(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/**
 * BanquetSpatialCanvas
 *
 * HOMEPAGE STAGE 5 — BANQUET & CELEBRATIONS (Progress: 8.0)
 * Replicates the signature Vedic Spa spatial motion:
 * - Diagonal triangular image assembly that glides into place on scroll.
 * - Staggered editorial typography and small introduction.
 * - Giant watermark scaling with depth.
 * - 100% cleared below the fixed top navbar.
 */
export default function BanquetSpatialCanvas({
  globalProgress = 8.0,
  onOpenBooking,
  mousePos = { x: 0, y: 0 },
  imageSrc = '/images/banquet/banquet-1.webp',
}) {
  // ---------------------------------------------------------------------------
  // 1. CHOREOGRAPHED SCROLL TIMELINES (Centered at 8.0)
  // Entry: 7.22 -> 7.86 | Dwell: 7.86 -> 8.14 | Exit: 8.14 -> 8.80
  // ---------------------------------------------------------------------------
  const delta = globalProgress - 8.0;
  const absDelta = Math.abs(delta);

  // Overall Stage Opacity Envelope
  const stageOpacity = useMemo(() => {
    if (globalProgress < 7.18 || globalProgress > 8.82) return 0;
    if (globalProgress < 7.45) {
      return getSubProgress(globalProgress, 7.18, 7.45);
    }
    if (globalProgress > 8.55) {
      return 1.0 - getSubProgress(globalProgress, 8.55, 8.82);
    }
    return 1.0;
  }, [globalProgress]);

  // Interactivity Guard
  const isInteractive = absDelta <= 0.40;

  // Staggered Sub-Intervals for Individual Elements
  const {
    assemblyImage,
    assemblyHeading,
    assemblyDesc,
    assemblyHighlights,
    assemblyActions,
  } = useMemo(() => {
    const isEntering = globalProgress < 8.0;

    if (isEntering) {
      return {
        // Image triangles assemble over deliberate window (7.22 -> 7.82)
        assemblyImage: getSubProgress(globalProgress, 7.22, 7.82),
        // Heading enters from left (7.28 -> 7.80)
        assemblyHeading: getSubProgress(globalProgress, 7.28, 7.80),
        // Subtitle & small description enter (7.34 -> 7.83)
        assemblyDesc: getSubProgress(globalProgress, 7.34, 7.83),
        // 3 Highlights stagger in (7.40 -> 7.85)
        assemblyHighlights: getSubProgress(globalProgress, 7.40, 7.85),
        // Actions glide in and settle (7.46 -> 7.86)
        assemblyActions: getSubProgress(globalProgress, 7.46, 7.86),
      };
    } else {
      // Exiting towards Fitness Center: smoothly disassembles from 8.14 to 8.80
      const exitT = (start, end) => 1.0 - getSubProgress(globalProgress, start, end);
      return {
        assemblyActions: exitT(8.14, 8.50),
        assemblyHighlights: exitT(8.16, 8.55),
        assemblyDesc: exitT(8.18, 8.62),
        assemblyHeading: exitT(8.20, 8.70),
        assemblyImage: exitT(8.20, 8.78),
      };
    }
  }, [globalProgress]);

  // Dispersion multipliers (1 = scattered, 0 = assembled)
  const disperseImage = 1.0 - assemblyImage;
  const disperseHeading = 1.0 - assemblyHeading;
  const disperseDesc = 1.0 - assemblyDesc;
  const disperseHighlights = 1.0 - assemblyHighlights;
  const disperseActions = 1.0 - assemblyActions;

  // Giant background typography scale & depth
  const bigTextScale = Math.max(0.6, 1.0 - absDelta * 0.35);
  const bigTextZ = -absDelta * 400;

  // ---------------------------------------------------------------------------
  // 2. ERGONOMIC SPATIAL TRANSFORMS (MATCHING VEDIC SIGNATURE MOTION)
  // ---------------------------------------------------------------------------
  const eyebrowTransform = `translate3d(${-disperseHeading * 25}px, 0px, 0px)`;
  const eyebrowOpacity = Math.max(0, 1.0 - disperseHeading * 1.3);

  const scheduleTransform = `translate3d(${disperseHeading * 25}px, 0px, 0px)`;
  const scheduleOpacity = Math.max(0, 1.0 - disperseHeading * 1.3);

  const headingTransform = `translate3d(${-disperseHeading * 60}px, 0px, 0px)`;
  const headingOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  const subtitleTransform = `translate3d(${disperseHeading * 35}px, 0px, 0px)`;
  const subtitleOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  const descTransform = `translate3d(${-disperseDesc * 25}px, ${disperseDesc * 10}px, 0px)`;
  const descOpacity = Math.max(0, 1.0 - disperseDesc * 1.4);

  // 3 Highlights (Gentle vertical rise)
  const h1Transform = `translate3d(${-disperseHighlights * 25}px, ${disperseHighlights * 10}px, 0px)`;
  const h1Opacity = Math.max(0, 1.0 - disperseHighlights * 1.5);

  const h2Transform = `translate3d(0px, ${disperseHighlights * 12}px, 0px)`;
  const h2Opacity = Math.max(0, 1.0 - disperseHighlights * 1.5);

  const h3Transform = `translate3d(${disperseHighlights * 25}px, ${disperseHighlights * 10}px, 0px)`;
  const h3Opacity = Math.max(0, 1.0 - disperseHighlights * 1.5);

  // Action Buttons: gentle rise
  const actionsTransform = `translate3d(0px, ${disperseActions * 12}px, 0px)`;
  const actionsOpacity = Math.max(0, 1.0 - disperseActions * 1.4);

  // ---------------------------------------------------------------------------
  // 3. DIAGONAL TRIANGULAR IMAGE ASSEMBLY
  // Piece A (Top-Left) and Piece B (Bottom-Right) of the Imperial Ballroom photo
  // ---------------------------------------------------------------------------
  const pieceATransform = `translate3d(${-disperseImage * 180}px, ${-disperseImage * 100}px, 0px) rotate(${-disperseImage * 8}deg) scale(${1.0 + disperseImage * 0.10})`;
  const pieceAOpacity = Math.max(0, 1.0 - disperseImage * 1.25);

  const pieceBTransform = `translate3d(${disperseImage * 190}px, ${disperseImage * 110}px, 0px) rotate(${disperseImage * 9}deg) scale(${1.0 + disperseImage * 0.10})`;
  const pieceBOpacity = Math.max(0, 1.0 - disperseImage * 1.25);

  const handleBooking = () => {
    playClickSound();
    if (onOpenBooking) {
      onOpenBooking({ name: 'The Imperial Grand Ballroom & Lawns', price: 'Inquire for Custom Celebration Package' });
    }
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between px-3 sm:px-6 lg:px-12 pt-[82px] sm:pt-[90px] lg:pt-[96px] pb-3 sm:pb-4 text-forest-950 bg-gradient-to-br from-[#FAF5EE] via-[#F5ECE0] to-[#EFE1CD] overflow-hidden will-change-transform ${
        isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
      }`}
      style={{ opacity: stageOpacity }}
    >
      {/* 1. GIANT WATERMARK TYPOGRAPHY (SCALE WITH DEPTH) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 will-change-transform"
        style={{
          transform: `scale(${bigTextScale}) translateZ(${bigTextZ}px)`,
        }}
      >
        <span className="font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[21vw] leading-none select-none text-[#8C6D37]/[0.11]">
          BANQUET
        </span>
      </div>

      {/* 2. TOP EDITORIAL STATUS BAR (100% CLEAR OF FIXED NAVBAR) */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto flex items-center justify-between border-b border-[#D6B878]/30 pb-1.5 sm:pb-2 shrink-0">
        <div
          className="flex items-center gap-2 will-change-transform"
          style={{
            transform: eyebrowTransform,
            opacity: eyebrowOpacity,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#8C6D37] animate-pulse shadow-[0_0_8px_#D6B878]" />
          <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[0.22em] text-forest-950">
            IMPERIAL BANQUETS & GRAND CELEBRATIONS
          </span>
        </div>

        <div
          className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-sans font-black tracking-widest uppercase text-[#8C6D37] will-change-transform"
          style={{
            transform: scheduleTransform,
            opacity: scheduleOpacity,
          }}
        >
          <span>Up to 800 Guests</span>
          <span className="text-[#D6B878]">•</span>
          <span>Pillarless Architecture</span>
        </div>
      </div>

      {/* 3. MAIN SPATIAL ARENA */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto flex-1 flex items-center my-auto py-1 sm:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          {/* =====================================================================
              LEFT COLUMN (7 COLS): SCATTERED EDITORIAL TYPOGRAPHY & INTRO
             ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-2.5 lg:space-y-3 text-left">
            {/* Small Eyebrow Signal */}
            <div
              className="flex items-center gap-2 will-change-transform"
              style={{
                transform: subtitleTransform,
                opacity: subtitleOpacity,
              }}
            >
              <Crown className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-[#8C6D37]">
                Grand Weddings & Gala Gatherings
              </span>
            </div>

            {/* Main Heading */}
            <div
              className="will-change-transform"
              style={{
                transform: headingTransform,
                opacity: headingOpacity,
              }}
            >
              <h2 className="text-xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-serif font-black uppercase tracking-tight text-forest-950 leading-[1.08]">
                Imperial Banquets & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-950 via-[#8C6D37] to-forest-950">
                  Starlit Celebration Lawns
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <div
              className="will-change-transform"
              style={{
                transform: subtitleTransform,
                opacity: subtitleOpacity,
              }}
            >
              <h3 className="text-xs sm:text-sm lg:text-[15px] font-serif italic text-[#8C6D37] font-bold">
                Gorakhpur's Premier Pillarless Ballroom & Open-Air Grounds
              </h3>
            </div>

            {/* Small Introduction */}
            <div
              className="will-change-transform"
              style={{
                transform: descTransform,
                opacity: descOpacity,
              }}
            >
              <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#332A1C] font-medium font-sans leading-relaxed max-w-xl">
                Host unforgettable weddings, high-level corporate summits, and grand celebratory feasts under majestic
                crystal chandeliers. Accompanied by expansive manicured open-air starlit lawns and bespoke Awadhi catering.
              </p>
            </div>

            {/* 3 Highlights: Compact, Editorial Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 border-t border-[#D6B878]/30 max-w-xl">
              {/* Highlight 1 */}
              <div
                className="will-change-transform space-y-0.5"
                style={{
                  transform: h1Transform,
                  opacity: h1Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Architecture
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Pillarless Ballroom
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Chandeliers & regal acoustics
                </p>
              </div>

              {/* Highlight 2 */}
              <div
                className="will-change-transform space-y-0.5 sm:border-l sm:border-[#D6B878]/30 sm:pl-3"
                style={{
                  transform: h2Transform,
                  opacity: h2Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Capacity
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Up to 800 Guests
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Flexible grand configurations
                </p>
              </div>

              {/* Highlight 3 */}
              <div
                className="will-change-transform space-y-0.5 sm:border-l sm:border-[#D6B878]/30 sm:pl-3"
                style={{
                  transform: h3Transform,
                  opacity: h3Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Open-Air Lawns
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Starlit Grounds
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Evening cocktails & receptions
                </p>
              </div>
            </div>

            {/* Action Row: Direct Editorial Text Links */}
            <div
              className="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-6 sm:gap-7 will-change-transform"
              style={{
                transform: actionsTransform,
                opacity: actionsOpacity,
              }}
            >
              <button
                type="button"
                onClick={handleBooking}
                className="inline-flex items-center gap-2 text-forest-950 hover:text-[#8C6D37] font-sans font-black text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-200 hover:translate-x-1 group select-none cursor-pointer"
              >
                <span className="border-b-2 border-forest-950/40 group-hover:border-[#8C6D37] pb-0.5 transition-colors">
                  Plan An Event
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-forest-950 group-hover:text-[#8C6D37] transition-all duration-200 group-hover:translate-x-1" />
              </button>

              <Link
                to="/banquet"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 text-[#8C6D37] hover:text-forest-950 font-sans font-black text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-200 hover:translate-x-1 group select-none cursor-pointer"
              >
                <span className="border-b-2 border-[#8C6D37]/40 group-hover:border-forest-950 pb-0.5 transition-colors">
                  Explore Banquets
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6D37] group-hover:text-forest-950 transition-all duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN (5 COLS): DIAGONAL TRIANGULAR IMAGE ASSEMBLY
             ===================================================================== */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Link
              to="/banquet"
              onClick={playClickSound}
              className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] aspect-[16/10] max-h-[36vh] select-none cursor-pointer group block"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -5}deg)`,
              }}
            >
              {/* PIECE A: UPPER-LEFT TRIANGLE */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                  WebkitClipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                  transform: pieceATransform,
                  opacity: pieceAOpacity,
                }}
              >
                <img
                  src={imageSrc}
                  alt="The Imperial Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </div>

              {/* PIECE B: LOWER-RIGHT TRIANGLE */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                style={{
                  clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                  WebkitClipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                  transform: pieceBTransform,
                  opacity: pieceBOpacity,
                }}
              >
                <img
                  src={imageSrc}
                  alt="The Imperial Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACCENT LINE */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto border-t border-[#D6B878]/25 pt-1 flex items-center justify-between text-[9px] sm:text-[10px] font-sans text-[#8C6D37]/80 shrink-0">
        <span className="tracking-widest uppercase">The Radiant Grand Ballrooms & Lawns</span>
        <span className="font-serif italic hidden sm:inline">Unmatched Dignity & Celebratory Feasts</span>
      </div>
    </div>
  );
}
