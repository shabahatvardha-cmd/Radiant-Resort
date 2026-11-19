import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Sound effect utility (shared with homepage sound architecture)
 */
function triggerClickSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08); // A5
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch {
    // AudioContext blocked or unsupported
  }
}

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
 * VedicSpaSpatialCanvas
 *
 * HOMEPAGE STAGE 2 — VEDIC SPA & SALON WELLNESS (Progress: 5.0)
 *
 * PERFECT CLEARANCE & VISIBILITY:
 * - Top padding cleared to pt-[84px] / pt-[96px] guaranteeing 100% visible
 *   clearance underneath the fixed top navbar.
 * - Zero upward translations on entrance so no elements drift under the nav.
 * - Perfectly balanced vertical proportions so treatments and buttons never
 *   get cut off at the bottom.
 * - Deliberate, relaxed scroll pacing (4.22 -> 4.86) for clear assembly perception.
 */
export default function VedicSpaSpatialCanvas({
  globalProgress = 5.0,
  onOpenBooking,
  mousePos = { x: 0, y: 0 },
  imageSrc = '/images/wellness/wellness-card.webp',
}) {
  // ---------------------------------------------------------------------------
  // 1. CHOREOGRAPHED SCROLL TIMELINES (Extended & Relaxed Pacing)
  // Entry: 4.22 -> 4.86 | Dwell: 4.86 -> 5.14 | Exit: 5.14 -> 5.80
  // ---------------------------------------------------------------------------
  const delta = globalProgress - 5.0;
  const absDelta = Math.abs(delta);

  // Overall Stage Opacity Envelope
  const stageOpacity = useMemo(() => {
    if (globalProgress < 4.18 || globalProgress > 5.82) return 0;
    if (globalProgress < 4.45) {
      return getSubProgress(globalProgress, 4.18, 4.45);
    }
    if (globalProgress > 5.55) {
      return 1.0 - getSubProgress(globalProgress, 5.55, 5.82);
    }
    return 1.0;
  }, [globalProgress]);

  // Interactivity Guard
  const isInteractive = absDelta <= 0.40;

  // Staggered Sub-Intervals for Individual Elements:
  const {
    assemblyImage,
    assemblyHeading,
    assemblyDesc,
    assemblyTreatments,
    assemblyActions,
  } = useMemo(() => {
    const isEntering = globalProgress < 5.0;

    if (isEntering) {
      return {
        // Image triangles travel over a wide, deliberate window (4.22 -> 4.82)
        assemblyImage: getSubProgress(globalProgress, 4.22, 4.82),
        // Heading enters from left (4.28 -> 4.80)
        assemblyHeading: getSubProgress(globalProgress, 4.28, 4.80),
        // Subtitle & description enter (4.34 -> 4.83)
        assemblyDesc: getSubProgress(globalProgress, 4.34, 4.83),
        // 3 Treatments stagger in (4.40 -> 4.85)
        assemblyTreatments: getSubProgress(globalProgress, 4.40, 4.85),
        // Actions glide in and settle (4.46 -> 4.86)
        assemblyActions: getSubProgress(globalProgress, 4.46, 4.86),
      };
    } else {
      // Exiting towards Stage 3 (Malibu): smoothly disassembles from 5.14 to 5.80
      const exitT = (start, end) => 1.0 - getSubProgress(globalProgress, start, end);
      return {
        assemblyActions: exitT(5.14, 5.50),
        assemblyTreatments: exitT(5.16, 5.55),
        assemblyDesc: exitT(5.18, 5.62),
        assemblyHeading: exitT(5.20, 5.70),
        assemblyImage: exitT(5.20, 5.78),
      };
    }
  }, [globalProgress]);

  // Dispersion multipliers (1 = scattered, 0 = assembled)
  const disperseImage = 1.0 - assemblyImage;
  const disperseHeading = 1.0 - assemblyHeading;
  const disperseDesc = 1.0 - assemblyDesc;
  const disperseTreatments = 1.0 - assemblyTreatments;
  const disperseActions = 1.0 - assemblyActions;

  // Giant background typography scale & depth
  const bigTextScale = Math.max(0.6, 1.0 - absDelta * 0.35);
  const bigTextZ = -absDelta * 400;

  // ---------------------------------------------------------------------------
  // 2. ERGONOMIC SPATIAL TRANSFORMS
  // Zero upward movements: ensures no text drifts up underneath the navbar!
  // Gentle vertical offsets: ensures no text overflows the bottom!
  // ---------------------------------------------------------------------------
  // Top Status Bar: purely horizontal gentle entry
  const eyebrowTransform = `translate3d(${-disperseHeading * 25}px, 0px, 0px)`;
  const eyebrowOpacity = Math.max(0, 1.0 - disperseHeading * 1.3);

  const scheduleTransform = `translate3d(${disperseHeading * 25}px, 0px, 0px)`;
  const scheduleOpacity = Math.max(0, 1.0 - disperseHeading * 1.3);

  // Main Heading: travels from left
  const headingTransform = `translate3d(${-disperseHeading * 60}px, 0px, 0px)`;
  const headingOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  // Subtitle: travels horizontally from right
  const subtitleTransform = `translate3d(${disperseHeading * 35}px, 0px, 0px)`;
  const subtitleOpacity = Math.max(0, 1.0 - disperseHeading * 1.4);

  // Description: gentle horizontal slide from left with minimal vertical lift
  const descTransform = `translate3d(${-disperseDesc * 25}px, ${disperseDesc * 10}px, 0px)`;
  const descOpacity = Math.max(0, 1.0 - disperseDesc * 1.4);

  // Treatment Highlights (Gentle vertical rise, max 12px)
  const t1Transform = `translate3d(${-disperseTreatments * 25}px, ${disperseTreatments * 10}px, 0px)`;
  const t1Opacity = Math.max(0, 1.0 - disperseTreatments * 1.5);

  const t2Transform = `translate3d(0px, ${disperseTreatments * 12}px, 0px)`;
  const t2Opacity = Math.max(0, 1.0 - disperseTreatments * 1.5);

  const t3Transform = `translate3d(${disperseTreatments * 25}px, ${disperseTreatments * 10}px, 0px)`;
  const t3Opacity = Math.max(0, 1.0 - disperseTreatments * 1.5);

  // Action Buttons: gentle rise (max 12px)
  const actionsTransform = `translate3d(0px, ${disperseActions * 12}px, 0px)`;
  const actionsOpacity = Math.max(0, 1.0 - disperseActions * 1.4);

  // ---------------------------------------------------------------------------
  // 3. DIAGONAL TRIANGULAR IMAGE ASSEMBLY
  // Piece A (Top-Left) and Piece B (Bottom-Right) of the SAME single photograph
  // ---------------------------------------------------------------------------
  const pieceATransform = `translate3d(${-disperseImage * 180}px, ${-disperseImage * 100}px, 0px) rotate(${-disperseImage * 8}deg) scale(${1.0 + disperseImage * 0.10})`;
  const pieceAOpacity = Math.max(0, 1.0 - disperseImage * 1.25);

  const pieceBTransform = `translate3d(${disperseImage * 190}px, ${disperseImage * 110}px, 0px) rotate(${disperseImage * 9}deg) scale(${1.0 + disperseImage * 0.10})`;
  const pieceBOpacity = Math.max(0, 1.0 - disperseImage * 1.25);

  const handleBooking = () => {
    triggerClickSound();
    if (onOpenBooking) {
      onOpenBooking({ name: 'Vedic Spa & Royal Salon Ritual', price: '₹4,499' });
    }
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between px-3 sm:px-6 lg:px-12 pt-[82px] sm:pt-[90px] lg:pt-[96px] pb-3 sm:pb-4 text-forest-950 bg-gradient-to-br from-[#FAF5EE] via-[#F4ECE0] to-[#EFE1CD] overflow-hidden will-change-transform ${
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
        <span className="font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[23vw] leading-none select-none text-[#8C6D37]/[0.13]">
          VEDIC
        </span>
      </div>

      {/* 2. TOP VEDIC EDITORIAL STATUS BAR (100% CLEAR OF FIXED NAVBAR) */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto flex items-center justify-between border-b border-[#D6B878]/30 pb-1.5 sm:pb-2 shrink-0">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-2 will-change-transform"
          style={{
            transform: eyebrowTransform,
            opacity: eyebrowOpacity,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#8C6D37] animate-pulse shadow-[0_0_8px_#D6B878]" />
          <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[0.22em] text-forest-950">
            VEDIC WELLNESS HAVEN & ROYAL SALON
          </span>
        </div>

        {/* Schedule */}
        <div
          className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-sans font-black tracking-widest uppercase text-[#8C6D37] will-change-transform"
          style={{
            transform: scheduleTransform,
            opacity: scheduleOpacity,
          }}
        >
          <span>Daily 8:00 AM – 9:00 PM</span>
          <span className="text-[#D6B878]">•</span>
          <span>Ayurvedic Lineage</span>
        </div>
      </div>

      {/* 3. MAIN SPATIAL ARENA (PERFECTLY CENTERED WITH TOP & BOTTOM BREATHING ROOM) */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto flex-1 flex items-center my-auto py-1 sm:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          {/* =====================================================================
              LEFT COLUMN (7 COLS): SCATTERED EDITORIAL TYPOGRAPHY (ZERO CARDS)
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
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-[#8C6D37]">
                Ancient Dhanwantari Rituals
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
                Vedic Spa & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-950 via-[#8C6D37] to-forest-950">
                  Salon Wellness
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
                Ancient Ayurvedic Healing & Bespoke Royal Grooming
              </h3>
            </div>

            {/* Description */}
            <div
              className="will-change-transform"
              style={{
                transform: descTransform,
                opacity: descOpacity,
              }}
            >
              <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#332A1C] font-medium font-sans leading-relaxed max-w-xl">
                Immerse yourself in centuries of Ayurvedic wisdom with authentic Dhanwantari warm herbal oils,
                therapeutic Abhyanga massages, and holistic soul restoration. Complete your experience at our
                full-service Royal Salon offering bespoke bridal couture, hair artistry, and luxury grooming.
              </p>
            </div>

            {/* 3 Treatment Highlights: Compact, Elegant Editorial Row (NO BOXES, NO CARDS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 border-t border-[#D6B878]/30 max-w-xl">
              {/* Treatment 1 */}
              <div
                className="will-change-transform space-y-0.5"
                style={{
                  transform: t1Transform,
                  opacity: t1Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Ayurvedic Therapy
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Abhyanga & Potli
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Warm botanicals & poultice
                </p>
              </div>

              {/* Treatment 2 */}
              <div
                className="will-change-transform space-y-0.5 sm:border-l sm:border-[#D6B878]/30 sm:pl-3"
                style={{
                  transform: t2Transform,
                  opacity: t2Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Salon Ritual
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Royal Salon Grooming
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Hair & bespoke bridal care
                </p>
              </div>

              {/* Treatment 3 */}
              <div
                className="will-change-transform space-y-0.5 sm:border-l sm:border-[#D6B878]/30 sm:pl-3"
                style={{
                  transform: t3Transform,
                  opacity: t3Opacity,
                }}
              >
                <span className="text-[8px] sm:text-[9px] font-sans font-black uppercase tracking-widest text-[#8C6D37]">
                  Holistic Wellness
                </span>
                <h4 className="font-serif font-black text-xs sm:text-[13px] text-forest-950 truncate">
                  Hammam & Aroma
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#5A4E3D] font-medium line-clamp-1">
                  Herbal steam & detox
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
                  Reserve Now
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-forest-950 group-hover:text-[#8C6D37] transition-all duration-200 group-hover:translate-x-1" />
              </button>

              <Link
                to="/wellness"
                onClick={triggerClickSound}
                className="inline-flex items-center gap-2 text-[#8C6D37] hover:text-forest-950 font-sans font-black text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-200 hover:translate-x-1 group select-none cursor-pointer"
              >
                <span className="border-b-2 border-[#8C6D37]/40 group-hover:border-forest-950 pb-0.5 transition-colors">
                  View Insights
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6D37] group-hover:text-forest-950 transition-all duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN (5 COLS): DIAGONAL TRIANGULAR IMAGE ASSEMBLY (CURVY EDGES)
             ===================================================================== */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              onClick={handleBooking}
              className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] aspect-[16/10] max-h-[36vh] select-none cursor-pointer group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -5}deg)`,
              }}
            >
              {/* CURVY LUXURY CONTAINER (ROUNDED CORNERS, NO SHARP RECTANGLE EDGES) */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.16)] ring-1 ring-[#D6B878]/35 bg-[#FAF5EE]">
                {/* PIECE A: UPPER-LEFT TRIANGLE */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden will-change-transform rounded-2xl sm:rounded-3xl lg:rounded-[32px]"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                    WebkitClipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                    transform: pieceATransform,
                    opacity: pieceAOpacity,
                  }}
                >
                  <img
                    src={imageSrc}
                    alt="Vedic Spa & Royal Salon Ritual"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                </div>

                {/* PIECE B: LOWER-RIGHT TRIANGLE */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden will-change-transform rounded-2xl sm:rounded-3xl lg:rounded-[32px]"
                  style={{
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                    WebkitClipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                    transform: pieceBTransform,
                    opacity: pieceBOpacity,
                  }}
                >
                  <img
                    src={imageSrc}
                    alt="Vedic Spa & Royal Salon Ritual"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACCENT LINE */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto border-t border-[#D6B878]/25 pt-1 flex items-center justify-between text-[9px] sm:text-[10px] font-sans text-[#8C6D37]/80 shrink-0">
        <span className="tracking-widest uppercase">The Radiant Wellness Sanctuary</span>
        <span className="font-serif italic hidden sm:inline">Restorative Ayurveda & Royal Elegance</span>
      </div>
    </div>
  );
}
