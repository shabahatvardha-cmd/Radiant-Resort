import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Panchamahabhuta3DBackground from '../effects/Panchamahabhuta3DBackground';

/**
 * Smooth Hermite S-Curve Interpolation (3t^2 - 2t^3)
 * Guarantees zero velocity at both ends of each sub-interval,
 * producing organic, silky-smooth kinetic deceleration.
 */
function getSubProgress(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/**
 * VedicSpaSectionContent — Full-Viewport Spatial Canvas
 * 
 * RADICAL STRUCTURAL REDESIGN:
 * - NO two-column grid (no left text card, no right image card).
 * - NO frosted glass card boxes or small sub-cards.
 * - Entire viewport is an open 3D editorial canvas.
 * - Single Photograph Only: `/images/wellness/wellness-card.webp`.
 * - Typography and photograph physically collide and layer across 3D Z-depth.
 * 
 * Six Connected Chapters (Milestone 5.0, Active: 4.30 - 5.70):
 * - Chapter 01: Vedic Arrival (4.30-4.48) — Deep bronze atmosphere, oversized VEDIC letters assemble.
 * - Chapter 02: Photo Emerges (4.48-4.68) — wellness-card.webp scales forward from deep Z-space.
 * - Chapter 03: Ayurvedic Identity (4.68-4.88) — Grand heading VEDIC SPA & SALON WELLNESS constructs over photo.
 * - Chapter 04: Wellness Description (4.88-5.04) — Description lines arrive and assemble into floating text.
 * - Chapter 05: Royal Salon Transformation (5.04-5.40) — Warm champagne shift, ROYAL SALON converging typography.
 * - Chapter 06: Final Identity & Departure (5.40-5.70) — Highlights ribbon & CTAs; complete graceful dispersal into Malibu.
 */
export default function VedicSpaSectionContent({
  globalProgress = 5.0,
  onOpenBooking,
  playClickSound,
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ---------------------------------------------------------------------------
  // TIMELINE CALCULATIONS (ACROSS 4.30 -> 5.70)
  // ---------------------------------------------------------------------------
  const anim = useMemo(() => {
    if (prefersReducedMotion) {
      const active = globalProgress >= 4.40 && globalProgress <= 5.60;
      return {
        chapter1Atmo: active ? 1 : 0,
        vedicBgScale: 1,
        vedicBgAlpha: active ? 0.12 : 0,
        photoZTravel: active ? 1 : 0,
        photoScale: 1,
        photoAlpha: active ? 1 : 0,
        headingAssemble: active ? 1 : 0,
        subtitleAssemble: active ? 1 : 0,
        descLine1: active ? 1 : 0,
        descLine2: active ? 1 : 0,
        descLine3: active ? 1 : 0,
        royalShift: active ? 1 : 0,
        finalRibbon: active ? 1 : 0,
        departureDisperse: 0,
      };
    }

    // Chapter 01: Vedic Arrival (4.30 - 4.48)
    const chapter1Atmo = getSubProgress(globalProgress, 4.30, 4.48);
    const vedicBgAlpha = getSubProgress(globalProgress, 4.30, 4.52) * (1 - getSubProgress(globalProgress, 5.50, 5.68));

    // Chapter 02: Photo Emergence along Z-axis (4.48 - 4.68)
    const photoZTravel = getSubProgress(globalProgress, 4.48, 4.68);

    // Chapter 03: Heading & Subtitle Construction (4.65 - 4.88)
    const headingAssemble = getSubProgress(globalProgress, 4.65, 4.84);
    const subtitleAssemble = getSubProgress(globalProgress, 4.70, 4.88);

    // Chapter 04: Description Lines Assemble (4.88 - 5.04)
    const descLine1 = getSubProgress(globalProgress, 4.86, 4.96);
    const descLine2 = getSubProgress(globalProgress, 4.90, 5.00);
    const descLine3 = getSubProgress(globalProgress, 4.94, 5.04);

    // Chapter 05: Royal Salon Transformation (5.04 - 5.40)
    const royalShift = getSubProgress(globalProgress, 5.04, 5.32);

    // Chapter 06: Final Identity, Highlights Ribbon & Departure (5.40 - 5.70)
    const finalRibbon = getSubProgress(globalProgress, 5.38, 5.50);
    const departureDisperse = getSubProgress(globalProgress, 5.55, 5.70);

    return {
      chapter1Atmo,
      vedicBgAlpha,
      photoZTravel,
      headingAssemble,
      subtitleAssemble,
      descLine1,
      descLine2,
      descLine3,
      royalShift,
      finalRibbon,
      departureDisperse,
    };
  }, [globalProgress, prefersReducedMotion]);

  if (globalProgress < 4.30 || globalProgress > 5.70) return null;

  // ---------------------------------------------------------------------------
  // KINETIC SPATIAL TRANSFORMS (NO FIXED COLUMNS)
  // ---------------------------------------------------------------------------
  const disp = anim.departureDisperse;

  // 1. Background Spatial VEDIC Typography (Drifting in deep Z-space)
  const vedicShiftX = (globalProgress - 5.0) * -85;
  const vedicShiftY = -15 + (globalProgress - 5.0) * 12;
  const vedicScale = 1.15 - (globalProgress - 4.30) * 0.10;
  const vedicAlpha = Math.max(0, anim.vedicBgAlpha * 0.14 * (1 - disp));

  // 2. Primary Photograph 3D Travel (wellness-card.webp ONLY)
  // Starts deep in Z-space (-240px, scale: 0.80), expands into dominant center projection, tilts slightly
  const photoZ = prefersReducedMotion ? 0 : -240 + anim.photoZTravel * 255 - disp * 180;
  const photoScale = prefersReducedMotion ? 1 : 0.82 + anim.photoZTravel * 0.18 + anim.royalShift * 0.04 - disp * 0.10;
  const photoTranslateY = prefersReducedMotion ? 0 : (1 - anim.photoZTravel) * 60 - disp * 80;
  const photoRotY = prefersReducedMotion ? 0 : (1 - anim.photoZTravel) * 6 - anim.royalShift * 4;
  const photoAlpha = Math.max(0, anim.photoZTravel * (1 - disp));

  // 3. Foreground Kinetic Heading Tokens (Assembling from outer screen edges across photo)
  // Token 1: "VEDIC" from top-left
  const tVedicX = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -280 - disp * 260;
  const tVedicY = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -140 - disp * 120;
  const tVedicRot = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -14 - disp * 15;
  const tVedicAlpha = Math.max(0, anim.headingAssemble * (1 - disp));

  // Token 2: "SPA" from bottom-left
  const tSpaX = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -160 - disp * 180;
  const tSpaY = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 150 + disp * 160;
  const tSpaRot = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 12 + disp * 15;
  const tSpaAlpha = Math.max(0, anim.headingAssemble * (1 - disp));

  // Token 3: "&" from top-center
  const tAmpX = prefersReducedMotion ? 0 : 0;
  const tAmpY = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -180 - disp * 190;
  const tAmpAlpha = Math.max(0, anim.headingAssemble * (1 - disp));

  // Token 4: "SALON" from bottom-right
  const tSalonX = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 180 + disp * 190;
  const tSalonY = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 140 + disp * 150;
  const tSalonRot = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -10 + disp * 12;
  const tSalonAlpha = Math.max(0, anim.headingAssemble * (1 - disp));

  // Token 5: "WELLNESS" from far-right
  const tWellnessX = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 280 + disp * 300;
  const tWellnessY = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * -110 - disp * 130;
  const tWellnessRot = prefersReducedMotion ? 0 : (1 - anim.headingAssemble) * 14 + disp * 18;
  const tWellnessAlpha = Math.max(0, anim.headingAssemble * (1 - disp));

  // 4. Subtitle Semantic Convergence
  const subX = prefersReducedMotion ? 0 : (1 - anim.subtitleAssemble) * -80 - disp * 140;
  const subAlpha = Math.max(0, anim.subtitleAssemble * (1 - disp));

  // 5. Floating Description Lines (Arrive from alternating sides, assemble directly on screen)
  const d1X = prefersReducedMotion ? 0 : (1 - anim.descLine1) * -60 - disp * 90;
  const d1Alpha = Math.max(0, anim.descLine1 * (1 - disp));

  const d2X = prefersReducedMotion ? 0 : (1 - anim.descLine2) * 60 + disp * 90;
  const d2Alpha = Math.max(0, anim.descLine2 * (1 - disp));

  const d3X = prefersReducedMotion ? 0 : (1 - anim.descLine3) * -40 - disp * 90;
  const d3Alpha = Math.max(0, anim.descLine3 * (1 - disp));

  // 6. Chapter 05: Royal Salon Atmosphere & Words
  const royalWordX = (1 - anim.royalShift) * 120 - disp * 150;
  const royalWordAlpha = Math.max(0, anim.royalShift * 0.16 * (1 - disp));

  // Background atmosphere transition: deep bronze (#120C08 / #1A120B) warming into champagne ivory (#FAF5EE / #EFE1CD)
  const bgInterp = anim.royalShift;

  return (
    <div
      className="relative z-10 w-full h-full min-h-screen overflow-hidden select-none will-change-transform"
      style={{
        background: `linear-gradient(135deg, 
          rgba(${Math.round(250 - bgInterp * 15)}, ${Math.round(245 - bgInterp * 20)}, ${Math.round(238 - bgInterp * 25)}, 1) 0%, 
          rgba(${Math.round(244 - bgInterp * 20)}, ${Math.round(236 - bgInterp * 25)}, ${Math.round(224 - bgInterp * 30)}, 1) 50%, 
          rgba(${Math.round(239 - bgInterp * 20)}, ${Math.round(225 - bgInterp * 25)}, ${Math.round(205 - bgInterp * 30)}, 1) 100%)`,
      }}
    >
      {/* =======================================================================
          1. ATMOSPHERIC PRANA DUST & RADIAL LIGHT ORBS (Full-Bleed Canvas)
         ======================================================================= */}
      <Panchamahabhuta3DBackground
        currentStage={2}
        transparent={true}
        globalProgress={globalProgress}
      />

      {/* Atmospheric Warm Amber & Bronze Radial Light Orbs */}
      <div
        className="absolute top-1/4 right-[15%] w-[580px] h-[580px] rounded-full pointer-events-none blur-[110px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(214, 184, 120, 0.4) 0%, transparent 70%)',
          transform: `scale(${1 + Math.sin((globalProgress - 5.0) * Math.PI) * 0.15})`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-[10%] w-[480px] h-[480px] rounded-full pointer-events-none blur-[100px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(140, 109, 55, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* =======================================================================
          2. LAYER 1: GIANT SPATIAL BACKGROUND TYPOGRAPHY (Behind the Photo)
         ======================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Giant 28vw "VEDIC" Watermark (Early to mid scroll) */}
        {vedicAlpha > 0.001 && (
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              opacity: vedicAlpha,
              transform: `translate3d(${vedicShiftX}px, ${vedicShiftY}px, 0) scale(${vedicScale})`,
            }}
          >
            <span className="font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[28vw] leading-none select-none text-[#8C6D37]">
              VEDIC
            </span>
          </div>
        )}

        {/* Chapter 05: Giant "ROYAL SALON" Atmospheric Watermark */}
        {royalWordAlpha > 0.001 && (
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              opacity: royalWordAlpha,
              transform: `translate3d(${royalWordX}px, 20px, 0)`,
            }}
          >
            <span className="font-serif font-black tracking-tighter uppercase whitespace-nowrap text-[22vw] leading-none select-none text-[#D6B878]">
              ROYAL SALON
            </span>
          </div>
        )}
      </div>

      {/* =======================================================================
          3. LAYER 2: CINEMATIC FULL-CANVAS PHOTOGRAPH (wellness-card.webp ONLY)
          Center-stage architectural visual occupying 75vw - 85vw across screen
         ======================================================================= */}
      {photoAlpha > 0.001 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 will-change-transform"
          style={{
            transform: `perspective(1200px) translate3d(0, ${photoTranslateY}px, ${photoZ}px) rotateY(${photoRotY}deg) scale(${photoScale})`,
            opacity: photoAlpha,
          }}
        >
          {/* Architectural Wide-Format Projection Frame */}
          <div
            className="w-[82vw] max-w-6xl aspect-[16/9] sm:aspect-[16/8.8] overflow-hidden shadow-[0_35px_90px_rgba(140,109,55,0.32)] border border-[#D6C5AD]/60 rounded-3xl relative will-change-transform"
          >
            {/* The Authentic Existing Photograph Asset (Exclusively Reused) */}
            <img
              src="/images/wellness/wellness-card.webp"
              alt="Vedic Spa & Royal Salon Sanctuary"
              className="w-full h-full object-cover select-none"
            />

            {/* Subtle Gradient Veil for Deep Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07100F]/75 via-[#07100F]/20 to-transparent" />

            {/* Fine Champagne Gold Frame Highlight Accents */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B878] to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B878] to-transparent opacity-70" />

            {/* Minimal Sanctuary Seal in Bottom Corner of Photo */}
            <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#D6B878] animate-pulse" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#D6B878]">
                Dhanwantari Lineage • 8 AM – 9 PM
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          4. LAYER 3: FOREGROUND FLOATING KINETIC TYPOGRAPHY (Overlapping Photo)
          Directly rendered on the canvas (NO cards, NO frosted boxes)
         ======================================================================= */}
      <div className="relative z-20 w-full h-full min-h-screen flex flex-col justify-between max-w-[1720px] mx-auto px-6 lg:px-16 pt-16 pb-6 pointer-events-none">

        {/* Top Minimal Lineage & Schedule Bar */}
        <div
          className="flex items-center justify-between border-b border-[#8C6D37]/20 pb-3 will-change-transform"
          style={{ opacity: Math.max(0, anim.headingAssemble * (1 - disp)) }}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8C6D37] animate-pulse shadow-[0_0_8px_rgba(214,184,120,0.8)]" />
            <span className="text-xs sm:text-sm font-sans font-black uppercase tracking-[0.25em] text-forest-950">
              VEDIC WELLNESS HAVEN & ROYAL SALON
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-sans font-bold tracking-widest uppercase text-[#8C6D37]">
            Daily 8:00 AM – 9:00 PM • Ayurvedic Lineage
          </span>
        </div>

        {/* Center Canvas Stage: Scattered Words Assembling Across the Screen */}
        <div className="my-auto space-y-4 py-8 pointer-events-auto text-left">

          {/* Accessible Title for Screen Readers */}
          <h2 className="sr-only">Vedic Spa & Salon Wellness</h2>

          {/* Grand Full-Viewport Assembling Heading (Tokens Physically Intersect Photo) */}
          <div
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-black uppercase tracking-tight text-forest-950 leading-[1.05] select-none flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2"
            aria-hidden="true"
          >
            {/* Token 1: VEDIC */}
            <span
              className="inline-block will-change-transform drop-shadow-sm"
              style={{
                transform: `translate3d(${tVedicX}px, ${tVedicY}px, 0) rotate(${tVedicRot}deg)`,
                opacity: tVedicAlpha,
              }}
            >
              Vedic
            </span>

            {/* Token 2: SPA */}
            <span
              className="inline-block will-change-transform drop-shadow-sm"
              style={{
                transform: `translate3d(${tSpaX}px, ${tSpaY}px, 0) rotate(${tSpaRot}deg)`,
                opacity: tSpaAlpha,
              }}
            >
              Spa
            </span>

            {/* Token 3: & */}
            <span
              className="inline-block text-[#8C6D37] will-change-transform drop-shadow-sm"
              style={{
                transform: `translate3d(${tAmpX}px, ${tAmpY}px, 0)`,
                opacity: tAmpAlpha,
              }}
            >
              &
            </span>

            {/* Token 4: SALON */}
            <span
              className="inline-block will-change-transform drop-shadow-sm"
              style={{
                transform: `translate3d(${tSalonX}px, ${tSalonY}px, 0) rotate(${tSalonRot}deg)`,
                opacity: tSalonAlpha,
              }}
            >
              Salon
            </span>

            {/* Token 5: WELLNESS */}
            <span
              className="inline-block will-change-transform drop-shadow-sm"
              style={{
                transform: `translate3d(${tWellnessX}px, ${tWellnessY}px, 0) rotate(${tWellnessRot}deg)`,
                opacity: tWellnessAlpha,
              }}
            >
              Wellness
            </span>
          </div>

          {/* Subtitle Semantic Convergence (Directly on canvas) */}
          <p
            className="text-base sm:text-xl lg:text-2xl font-serif italic font-bold text-[#8C6D37] will-change-transform max-w-2xl"
            style={{
              transform: `translate3d(${subX}px, 0, 0)`,
              opacity: subAlpha,
            }}
          >
            Ancient Ayurvedic Healing & Bespoke Royal Grooming
          </p>

          {/* Floating Description Lines (No card, assembles across the canvas) */}
          <div className="max-w-3xl text-xs sm:text-sm lg:text-base text-stone-800 font-sans leading-relaxed tracking-wide font-normal pt-1">
            <span
              className="inline will-change-transform mr-1.5"
              style={{
                transform: `translate3d(${d1X}px, 0, 0)`,
                opacity: d1Alpha,
              }}
            >
              Immerse yourself in centuries of Ayurvedic wisdom with authentic Dhanwantari warm herbal oils,&nbsp;
            </span>
            <span
              className="inline will-change-transform mr-1.5"
              style={{
                transform: `translate3d(${d2X}px, 0, 0)`,
                opacity: d2Alpha,
              }}
            >
              therapeutic Abhyanga massages, and holistic soul restoration.&nbsp;
            </span>
            <span
              className="inline will-change-transform"
              style={{
                transform: `translate3d(${d3X}px, 0, 0)`,
                opacity: d3Alpha,
              }}
            >
              Complete your experience at our full-service Royal Salon offering bespoke bridal couture, hair artistry, and luxury grooming.
            </span>
          </div>

        </div>

        {/* =====================================================================
            5. ARCHITECTURAL BOTTOM STATUS RIBBON (Open Line Style, No Card Boxes)
           ===================================================================== */}
        <div
          className="pt-4 border-t border-[#8C6D37]/20 flex flex-wrap items-center justify-between gap-6 pointer-events-auto will-change-transform"
          style={{ opacity: Math.max(0, anim.finalRibbon * (1 - disp)) }}
        >
          {/* 3 Treatment Highlights in a refined typography line */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-sans">
            <div className="border-l-2 border-[#8C6D37] pl-3">
              <span className="font-serif font-black text-forest-950 uppercase block tracking-wider">
                Abhyanga & Potli
              </span>
              <span className="text-stone-600 text-xs font-medium">Warm botanicals</span>
            </div>
            <div className="border-l-2 border-[#D6B878] pl-3">
              <span className="font-serif font-black text-forest-950 uppercase block tracking-wider">
                Royal Salon Grooming
              </span>
              <span className="text-stone-600 text-xs font-medium">Hair & bridal care</span>
            </div>
            <div className="border-l-2 border-[#8C6D37] pl-3">
              <span className="font-serif font-black text-forest-950 uppercase block tracking-wider">
                Hammam & Aroma
              </span>
              <span className="text-stone-600 text-xs font-medium">Herbal steam & detox</span>
            </div>
          </div>

          {/* Preserved CTAs: Reserve Now (₹4,499 Modal) & View Insights (/wellness) */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => {
                playClickSound && playClickSound();
                onOpenBooking &&
                  onOpenBooking({ name: 'Vedic Spa & Royal Salon Ritual', price: '₹4,499' });
              }}
              className="inline-flex items-center gap-2 text-forest-950 hover:text-[#8C6D37] font-sans font-black text-xs sm:text-sm uppercase tracking-[0.22em] border-b-2 border-forest-950/70 hover:border-[#8C6D37] pb-0.5 transition-all duration-200 hover:translate-x-1 cursor-pointer select-none"
            >
              <span>Reserve Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/wellness"
              onClick={() => playClickSound && playClickSound()}
              className="inline-flex items-center gap-2 text-[#8C6D37] hover:text-forest-950 font-sans font-black text-xs sm:text-sm uppercase tracking-[0.22em] border-b-2 border-[#8C6D37]/40 hover:border-forest-950 pb-0.5 transition-all duration-200 hover:translate-x-1 cursor-pointer select-none"
            >
              <span>View Insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

