import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    if (globalProgress > 8.48) {
      return 1.0 - getSubProgress(globalProgress, 8.48, 8.80);
    }
    return 1.0;
  }, [globalProgress]);

  // Interactivity Guard
  const isInteractive = absDelta <= 0.40;

  // Staggered Sub-Intervals for Individual Elements (Calm, gradual, unhurried)
  const {
    assemblyStrip1,
    assemblyStrip2,
    assemblyStrip3,
    assemblyHeading,
    assemblyDesc,
    assemblyActions,
  } = useMemo(() => {
    const isEntering = globalProgress < 8.0;

    if (isEntering) {
      return {
        // Triple strips arrive gently across a wide, gradual scroll window (not fast)
        assemblyStrip1: getSubProgress(globalProgress, 7.20, 7.88),
        assemblyStrip2: getSubProgress(globalProgress, 7.26, 7.92),
        assemblyStrip3: getSubProgress(globalProgress, 7.22, 7.90),
        // Heading enters from top
        assemblyHeading: getSubProgress(globalProgress, 7.28, 7.84),
        // Subtitle & narrative description enter
        assemblyDesc: getSubProgress(globalProgress, 7.34, 7.86),
        // Actions glide in and settle
        assemblyActions: getSubProgress(globalProgress, 7.42, 7.88),
      };
    } else {
      // Exiting towards Fitness Center: smoothly disassembles from 8.10 to 8.78
      const exitT = (start, end) => 1.0 - getSubProgress(globalProgress, start, end);
      return {
        assemblyActions: exitT(8.12, 8.46),
        assemblyDesc: exitT(8.14, 8.56),
        assemblyHeading: exitT(8.16, 8.64),
        assemblyStrip2: exitT(8.10, 8.72),
        assemblyStrip1: exitT(8.12, 8.76),
        assemblyStrip3: exitT(8.14, 8.78),
      };
    }
  }, [globalProgress]);

  // Dispersion multipliers (1 = scattered, 0 = assembled)
  const disperseStrip1 = 1.0 - assemblyStrip1;
  const disperseStrip2 = 1.0 - assemblyStrip2;
  const disperseStrip3 = 1.0 - assemblyStrip3;
  const disperseHeading = 1.0 - assemblyHeading;
  const disperseDesc = 1.0 - assemblyDesc;
  const disperseActions = 1.0 - assemblyActions;

  // Giant background typography scale & depth
  const bigTextScale = Math.max(0.6, 1.0 - absDelta * 0.35);
  const bigTextZ = -absDelta * 400;

  // ---------------------------------------------------------------------------
  // 2. ERGONOMIC SPATIAL TRANSFORMS (CENTERED ARCHITECTURAL CHOREOGRAPHY)
  // ---------------------------------------------------------------------------
  const headingTransform = `translate3d(0px, ${-disperseHeading * 30}px, 0px)`;
  const headingOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  const subtitleTransform = `translate3d(0px, ${-disperseHeading * 18}px, 0px)`;
  const subtitleOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  const descTransform = `translate3d(0px, ${disperseDesc * 18}px, 0px)`;
  const descOpacity = Math.max(0, 1.0 - disperseDesc * 1.4);

  // Action Buttons: gentle rise
  const actionsTransform = `translate3d(0px, ${disperseActions * 15}px, 0px)`;
  const actionsOpacity = Math.max(0, 1.0 - disperseActions * 1.4);

  // ---------------------------------------------------------------------------
  // 3. TRIPLE EDITORIAL STRIPS MOTION (OPTION 4 - GRADUAL, STATELY SLIDE)
  // Strip 1 (Left), Strip 2 (Center), Strip 3 (Right) glide softly into place
  // ---------------------------------------------------------------------------
  const strip1Transform = `translate3d(${-disperseStrip1 * 32}px, ${disperseStrip1 * 24}px, 0px)`;
  const strip1Opacity = Math.max(0, 1.0 - disperseStrip1 * 1.15);

  const strip2Transform = `translate3d(0px, ${-disperseStrip2 * 28}px, 0px)`;
  const strip2Opacity = Math.max(0, 1.0 - disperseStrip2 * 1.15);

  const strip3Transform = `translate3d(${disperseStrip3 * 32}px, ${disperseStrip3 * 24}px, 0px)`;
  const strip3Opacity = Math.max(0, 1.0 - disperseStrip3 * 1.15);

  const handleBooking = () => {
    playClickSound();
    if (onOpenBooking) {
      onOpenBooking({ name: 'The Imperial Grand Ballroom & Lawns', price: 'Inquire for Custom Celebration Package' });
    }
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between px-3 sm:px-6 lg:px-12 pt-[82px] sm:pt-[90px] lg:pt-[96px] pb-3 sm:pb-4 text-forest-950 bg-gradient-to-br from-[#FAF5EE] via-[#F5ECE0] to-[#EFE1CD] overflow-hidden will-change-transform ${isInteractive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
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

      {/* 2. MAIN SPATIAL ARENA (CENTERED IMAGE WITH ELEGANT SURROUNDING TEXT) */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto flex-1 flex flex-col justify-center items-center my-auto py-1 sm:py-2 text-center">

        {/* TOP CLUSTER: MONUMENTAL HEADING + SUBTITLE */}
        <div className="flex flex-col items-center space-y-1 sm:space-y-1.5 w-full">
          {/* Monumental Heading */}
          <div
            className="will-change-transform"
            style={{
              transform: headingTransform,
              opacity: headingOpacity,
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] font-serif font-black uppercase tracking-tight text-forest-950 leading-[1.1]">
              Imperial Banquets &{' '}
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
        </div>

        {/* CENTERPIECE: TRIPLE EDITORIAL STRIPS HERO IMAGE (OPTION 4 - CURVY NOT SHARP) */}
        <div className="w-full flex justify-center items-center my-2 sm:my-3 lg:my-3.5">
          <Link
            to="/banquet"
            onClick={playClickSound}
            className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[490px] lg:max-w-[550px] xl:max-w-[600px] aspect-[16/10] max-h-[33vh] sm:max-h-[36vh] select-none cursor-pointer group block will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -4}deg)`,
            }}
          >
            {/* OUTER CURVY WRAPPER (SOFT ROUNDED EDGES PREVENTING ANY SHARPNESS) */}
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.16)] ring-1 ring-[#D6B878]/35 bg-[#FAF5EE]">
              {/* STRIP 1: LEFT 1/3 EDITORIAL SLICE */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                style={{
                  clipPath: 'polygon(0% 0%, 33.4% 0%, 33.4% 100%, 0% 100%)',
                  WebkitClipPath: 'polygon(0% 0%, 33.4% 0%, 33.4% 100%, 0% 100%)',
                  transform: strip1Transform,
                  opacity: strip1Opacity,
                }}
              >
                <img
                  src={imageSrc}
                  alt="The Imperial Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
              </div>

              {/* STRIP 2: CENTER 1/3 EDITORIAL SLICE */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                style={{
                  clipPath: 'polygon(33.3% 0%, 66.7% 0%, 66.7% 100%, 33.3% 100%)',
                  WebkitClipPath: 'polygon(33.3% 0%, 66.7% 0%, 66.7% 100%, 33.3% 100%)',
                  transform: strip2Transform,
                  opacity: strip2Opacity,
                }}
              >
                <img
                  src={imageSrc}
                  alt="The Imperial Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
              </div>

              {/* STRIP 3: RIGHT 1/3 EDITORIAL SLICE */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                style={{
                  clipPath: 'polygon(66.6% 0%, 100% 0%, 100% 100%, 66.6% 100%)',
                  WebkitClipPath: 'polygon(66.6% 0%, 100% 0%, 100% 100%, 66.6% 100%)',
                  transform: strip3Transform,
                  opacity: strip3Opacity,
                }}
              >
                <img
                  src={imageSrc}
                  alt="The Imperial Grand Ballroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* BOTTOM CLUSTER: NARRATIVE INTRODUCTION + ACTIONS */}
        <div className="flex flex-col items-center space-y-2 sm:space-y-3 max-w-2xl w-full">
          {/* Narrative Introduction */}
          <div
            className="will-change-transform"
            style={{
              transform: descTransform,
              opacity: descOpacity,
            }}
          >
            <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#332A1C] font-medium font-sans leading-relaxed text-center px-2">
              Host unforgettable weddings, high-level corporate summits, and grand celebratory feasts under majestic
              crystal chandeliers. Accompanied by expansive manicured open-air starlit lawns and bespoke Awadhi catering.
            </p>
          </div>

          {/* Action Row: Direct Editorial Text Links */}
          <div
            className="pt-0.5 sm:pt-1 flex items-center justify-center gap-6 sm:gap-8 will-change-transform"
            style={{
              transform: actionsTransform,
              opacity: actionsOpacity,
            }}
          >
            <button
              type="button"
              onClick={handleBooking}
              className="inline-flex items-center gap-2 text-forest-950 hover:text-[#8C6D37] font-sans font-black text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-200 hover:translate-x-0.5 group select-none cursor-pointer"
            >
              <span className="border-b-2 border-forest-950/40 group-hover:border-[#8C6D37] pb-0.5 transition-colors">
                Plan An Event
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-forest-950 group-hover:text-[#8C6D37] transition-all duration-200 group-hover:translate-x-1" />
            </button>

            <Link
              to="/banquet"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 text-[#8C6D37] hover:text-forest-950 font-sans font-black text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-200 hover:translate-x-0.5 group select-none cursor-pointer"
            >
              <span className="border-b-2 border-[#8C6D37]/40 group-hover:border-forest-950 pb-0.5 transition-colors">
                Explore Banquets
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C6D37] group-hover:text-forest-950 transition-all duration-200 group-hover:translate-x-1" />
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
