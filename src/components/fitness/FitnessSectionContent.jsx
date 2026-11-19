import React, { useMemo, useState, useEffect } from 'react';

/**
 * Mathematical S-Curve Hermite Interpolation (3t^2 - 2t^3)
 * Guarantees zero velocity at both ends of each sub-interval,
 * delivering perfectly smooth, organic scroll deceleration.
 */
function getSubProgress(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

function clamp(val, min = 0, max = 1) {
  return Math.min(max, Math.max(min, val));
}

/**
 * FitnessSectionContent — Complete Scroll-Driven Cinematic Experience
 * 
 * Strict Timeline Mapping (Milestone 8.0, Range: 7.40 – 8.60):
 * - 7.40–7.65: Crossfade entry from Dining & typography ("STRENGTH") enter
 * - 7.40–7.68: Text panel expands from vertical strip reveal
 * - 7.45–7.70: Eyebrow ("MODERN") & Main Heading ("FITNESS" / "CENTER") reveal
 * - 7.42–7.72: Photograph vertical shutter opens (scale 1.04 -> 1.00)
 * - 7.54–7.76: Photograph settles & champagne-gold border draws
 * - 7.56–7.78: Paragraph appears line by line with staggered vertical reveal
 * - 7.78–8.22: Solid resting dwell plateau (100% still, sharp, interactive)
 * - 8.22–8.56: Text panel and heading begin exiting (contracting left)
 * - 8.24–8.58: Photograph exits cleanly (fade & gentle depth)
 * - 8.58–8.62: Final crossfade completion into Guest Chronicles
 */
export default function FitnessSectionContent({ globalProgress = 9.0, baseProgress = 9.0 }) {
  const offset = baseProgress - 8.0;
  // Respect accessibility preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ---------------------------------------------------------------------------
  // TIMELINE SUB-PROGRESS CALCULATIONS
  // ---------------------------------------------------------------------------
  const anim = useMemo(() => {
    if (prefersReducedMotion) {
      const active = globalProgress >= (7.42 + offset) && globalProgress <= (8.58 + offset);
      return {
        // Reduced motion: stable opacity, no aggressive clip-paths or rotations
        textPanelExpand: active ? 1 : 0,
        textPanelShift: 0,
        textPanelExit: 0,
        eyebrowIn: active ? 1 : 0,
        eyebrowGoldLine: active ? 1 : 0,
        eyebrowExit: 0,
        fitnessIn: active ? 1 : 0,
        centerIn: active ? 1 : 0,
        headingExit: 0,
        dividerWidth: active ? 1 : 0,
        dividerExit: 0,
        pLine1In: active ? 1 : 0,
        pLine2In: active ? 1 : 0,
        pLine1Out: 0,
        pLine2Out: 0,
        photoShutter: active ? 1 : 0,
        photoBorderDraw: active ? 1 : 0,
        photoActiveShift: 0,
        photoExit: 0,
        connectLine: active ? 1 : 0,
        wordStrengthIn: active ? 1 : 0,
        wordStrengthOut: 0,
        wordDisciplineIn: active ? 1 : 0,
        wordDisciplineOut: 0,
        wordMovementIn: active ? 1 : 0,
        wordMovementOut: 0,
      };
    }

    // 1. Text Panel Entrance & Exit (Harmonized timeline with wide dwell plateau)
    const textPanelExpand = getSubProgress(globalProgress, 7.40 + offset, 7.68 + offset);
    const textPanelShift = getSubProgress(globalProgress, 8.22 + offset, 8.56 + offset);
    const textPanelExit = getSubProgress(globalProgress, 8.22 + offset, 8.58 + offset);

    // 2. Eyebrow "MODERN" & Accent Line
    const eyebrowGoldLine = getSubProgress(globalProgress, 7.44 + offset, 7.66 + offset);
    const eyebrowIn = getSubProgress(globalProgress, 7.45 + offset, 7.68 + offset);
    const eyebrowExit = getSubProgress(globalProgress, 8.22 + offset, 8.56 + offset);

    // 3. Main Heading split lines ("FITNESS" & "CENTER")
    const fitnessIn = getSubProgress(globalProgress, 7.46 + offset, 7.70 + offset);
    const centerIn = getSubProgress(globalProgress, 7.50 + offset, 7.72 + offset);
    const headingExit = getSubProgress(globalProgress, 8.22 + offset, 8.56 + offset);

    // 4. Gold Divider
    const dividerWidth = getSubProgress(globalProgress, 7.52 + offset, 7.74 + offset);
    const dividerExit = getSubProgress(globalProgress, 8.22 + offset, 8.56 + offset);

    // 5. Photograph Entrance Shutter, Peaceful Dwell, and Clean Architectural Exit
    const photoShutter = getSubProgress(globalProgress, 7.42 + offset, 7.72 + offset);
    const photoBorderDraw = getSubProgress(globalProgress, 7.54 + offset, 7.76 + offset);
    // Gentle subtle depth scale during the wide dwell plateau (zero sudden shifts)
    const photoActiveShift = getSubProgress(globalProgress, 7.78 + offset, 8.22 + offset);
    const photoExit = getSubProgress(globalProgress, 8.24 + offset, 8.58 + offset);

    // 6. Paragraph lines (Calm staggered reveal, long readable resting plateau)
    const pLine1In = getSubProgress(globalProgress, 7.56 + offset, 7.76 + offset);
    const pLine2In = getSubProgress(globalProgress, 7.58 + offset, 7.78 + offset);
    const pLine1Out = getSubProgress(globalProgress, 8.22 + offset, 8.54 + offset);
    const pLine2Out = getSubProgress(globalProgress, 8.24 + offset, 8.56 + offset);

    // 7. Connecting Gold Line between Text Panel & Photograph
    const connectLineIn = getSubProgress(globalProgress, 7.60 + offset, 7.78 + offset);
    const connectLine = connectLineIn * (1 - textPanelExit);

    // 8. Background Typography Parallax Words (Deep architectural watermarks)
    const wordStrengthIn = getSubProgress(globalProgress, 7.40 + offset, 7.65 + offset);
    const wordStrengthOut = getSubProgress(globalProgress, 8.24 + offset, 8.58 + offset);

    const wordDisciplineIn = getSubProgress(globalProgress, 7.46 + offset, 7.70 + offset);
    const wordDisciplineOut = getSubProgress(globalProgress, 8.24 + offset, 8.58 + offset);

    const wordMovementIn = getSubProgress(globalProgress, 7.52 + offset, 7.76 + offset);
    const wordMovementOut = getSubProgress(globalProgress, 8.24 + offset, 8.58 + offset);

    return {
      textPanelExpand,
      textPanelShift,
      textPanelExit,
      eyebrowIn,
      eyebrowGoldLine,
      eyebrowExit,
      fitnessIn,
      centerIn,
      headingExit,
      dividerWidth,
      dividerExit,
      pLine1In,
      pLine2In,
      pLine1Out,
      pLine2Out,
      photoShutter,
      photoBorderDraw,
      photoActiveShift,
      photoExit,
      connectLine,
      wordStrengthIn,
      wordStrengthOut,
      wordDisciplineIn,
      wordDisciplineOut,
      wordMovementIn,
      wordMovementOut,
    };
  }, [globalProgress, prefersReducedMotion, offset]);

  // If outside active interval, unmount gracefully
  if (globalProgress < (7.20 + offset) || globalProgress > (8.65 + offset)) return null;

  // ---------------------------------------------------------------------------
  // DERIVED DYNAMIC STYLES & TRANSFORMS
  // ---------------------------------------------------------------------------

  // A. Editorial Text Panel
  // Reveal from narrow vertical strip (expanding horizontally from center) with smooth curvy corners
  const panelClipH = prefersReducedMotion ? 0 : (1 - anim.textPanelExpand) * 50;
  // Upward depth entry (20px -> 0px), smooth resting dwell, then clean left exit
  const panelTranslateX = -anim.textPanelShift * 18 - anim.textPanelExit * 55;
  const panelTranslateY = (1 - anim.textPanelExpand) * 20;
  const panelOpacity = Math.max(0, anim.textPanelExpand * (1 - anim.textPanelExit));

  // B. Eyebrow "MODERN"
  const eyebrowTranslateY = prefersReducedMotion
    ? 0
    : (1 - anim.eyebrowIn) * 100 - anim.eyebrowExit * 100;
  const eyebrowOpacity = Math.max(0, anim.eyebrowIn * (1 - anim.eyebrowExit));

  // C. Main Heading Lines ("FITNESS" & "CENTER")
  const fitnessTranslateY = prefersReducedMotion
    ? 0
    : (1 - anim.fitnessIn) * 100 - anim.headingExit * 105;
  const fitnessOpacity = Math.max(0, anim.fitnessIn * (1 - anim.headingExit));

  const centerTranslateY = prefersReducedMotion
    ? 0
    : (1 - anim.centerIn) * 100 - anim.headingExit * 105;
  const centerOpacity = Math.max(0, anim.centerIn * (1 - anim.headingExit));

  // D. Gold Divider Width
  const currentDividerWidth = Math.max(0, anim.dividerWidth * (1 - anim.dividerExit)) * 64;

  // E. Paragraph Lines
  const p1TranslateY = (1 - anim.pLine1In) * 12 - anim.pLine1Out * 12;
  const p1Opacity = Math.max(0, anim.pLine1In * (1 - anim.pLine1Out));

  const p2TranslateY = (1 - anim.pLine2In) * 12 - anim.pLine2Out * 12;
  const p2Opacity = Math.max(0, anim.pLine2In * (1 - anim.pLine2Out));

  // F. Photograph Shutter Reveal & Clean Architectural Exit
  // Entrance: clean vertical strip reveal expanding outward from center with curvy corners
  const photoStripInset = prefersReducedMotion ? 0 : (1 - anim.photoShutter) * 50;
  // Subtle, calm depth scale without abrupt shifts
  const photoTranslateX = -anim.photoActiveShift * 10 - anim.photoExit * 35;
  const photoTranslateY = -anim.photoExit * 15;
  const photoScale = 1.00 + (1 - anim.photoShutter) * 0.04 + anim.photoActiveShift * 0.025;
  const photoRotY = prefersReducedMotion ? 0 : -anim.photoActiveShift * 1.5;
  const photoRotX = prefersReducedMotion ? 0 : anim.photoActiveShift * 0.8;

  // Curvy shutter clip: preserves smooth rounded corners throughout reveal
  const photoExitClip = `inset(0 ${photoStripInset}% 0 ${photoStripInset}% round 28px)`;

  const photoOpacity = anim.photoExit > 0
    ? Math.max(0, 1.0 - anim.photoExit * 1.25)
    : (anim.photoShutter > 0 ? 1.0 : 0);

  // G. Background Typography
  const strengthOpacity = Math.max(0, anim.wordStrengthIn * 0.08 * (1 - anim.wordStrengthOut));
  const disciplineOpacity = Math.max(0, anim.wordDisciplineIn * 0.065 * (1 - anim.wordDisciplineOut));
  const movementOpacity = Math.max(0, anim.wordMovementIn * 0.05 * (1 - anim.wordMovementOut));

  return (
    <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 items-center my-auto pt-10 pb-8 select-none will-change-transform">

      {/* =======================================================================
          BACKGROUND TYPOGRAPHY (OVERSIZED, LOW-OPACITY SPATIAL LAYERS)
         ======================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        {/* Word 1: "STRENGTH" — Enters early, upper-left parallax drift */}
        {strengthOpacity > 0.001 && (
          <div
            className="absolute top-[8%] left-[-2%] sm:left-[2%] font-serif font-black tracking-[0.25em] text-[#FAF6F0] leading-none will-change-transform"
            style={{
              fontSize: 'clamp(3.8rem, 9.5vw, 10.5rem)',
              opacity: strengthOpacity,
              transform: `translate3d(${-30 + anim.wordStrengthIn * 30 + anim.wordStrengthOut * 40}px, ${anim.wordStrengthIn * 10}px, 0)`,
            }}
          >
            STRENGTH
          </div>
        )}

        {/* Word 2: "DISCIPLINE" — Enters mid-scroll behind photo, lower-right */}
        {disciplineOpacity > 0.001 && (
          <div
            className="absolute bottom-[10%] right-[0%] sm:right-[4%] font-sans font-black tracking-[0.32em] text-[#D6B878] leading-none will-change-transform"
            style={{
              fontSize: 'clamp(3.2rem, 8.2vw, 9.2rem)',
              opacity: disciplineOpacity,
              transform: `translate3d(${40 - anim.wordDisciplineIn * 40}px, ${-anim.wordDisciplineIn * 15}px, 0)`,
            }}
          >
            DISCIPLINE
          </div>
        )}

        {/* Word 3: "MOVEMENT" — Sweeps diagonally during active transition */}
        {movementOpacity > 0.001 && (
          <div
            className="absolute top-[48%] left-[25%] -translate-y-1/2 font-serif font-bold italic tracking-[0.38em] text-[#C8CCD0] leading-none will-change-transform"
            style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 8.5rem)',
              opacity: movementOpacity,
              transform: `translate3d(${(anim.wordMovementIn - 0.5) * 60}px, ${(0.5 - anim.wordMovementIn) * 30}px, 0)`,
            }}
          >
            MOVEMENT
          </div>
        )}
      </div>

      {/* =======================================================================
          FOREGROUND ASYMMETRICAL EDITORIAL GRID (5 COLS TEXT / 7 COLS PHOTO)
         ======================================================================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-14 items-center">

        {/* =====================================================================
            LEFT COLUMN (5/12): CURVY EDITORIAL CARD (NO SHARP CORNERS)
           ===================================================================== */}
        <div className="lg:col-span-5 w-full">
          <div
            className="relative w-full p-4 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden will-change-transform shadow-[0_25px_60px_rgba(0,0,0,0.30)]"
            style={{
              clipPath: `inset(0 ${panelClipH}% 0 ${panelClipH}% round 28px)`,
              WebkitClipPath: `inset(0 ${panelClipH}% 0 ${panelClipH}% round 28px)`,
              transform: `translate3d(${panelTranslateX}px, ${panelTranslateY}px, 0)`,
              opacity: panelOpacity,
              background: 'linear-gradient(150deg, rgba(11, 22, 20, 0.92) 0%, rgba(7, 16, 15, 0.95) 100%)',
              border: `1px solid rgba(214, 184, 120, ${0.18 + (1 - anim.textPanelExit) * 0.22})`,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(214, 184, 120, 0.15)',
            }}
          >
            {/* Subtle Ambient Radial Backlight Glow */}
            <div
              className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none blur-[60px]"
              style={{
                background: 'radial-gradient(circle, rgba(214, 184, 120, 0.12) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-3 sm:space-y-4 text-left">

              {/* 1. EYEBROW: INDEPENDENT GOLD SIGNAL LINE + "MODERN" */}
              <div className="flex items-center gap-2.5">
                <div
                  className="h-[1.5px] bg-[#D6B878] rounded-full will-change-transform"
                  style={{
                    width: `${anim.eyebrowGoldLine * 26}px`,
                    opacity: anim.eyebrowGoldLine,
                  }}
                />
                <div className="overflow-hidden">
                  <span
                    className="text-xs sm:text-sm font-sans font-bold tracking-[0.25em] text-[#D6B878] uppercase block will-change-transform"
                    style={{
                      transform: `translate3d(0, ${eyebrowTranslateY}%, 0)`,
                      opacity: eyebrowOpacity,
                    }}
                  >
                    Modern
                  </span>
                </div>
              </div>

              {/* 2. MAIN HEADING: INDEPENDENT SPLIT LINES ("FITNESS" & "CENTER") */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FAF6F0] uppercase tracking-tight leading-[1.08] flex flex-wrap gap-x-3.5">
                <span className="overflow-hidden inline-block">
                  <span
                    className="inline-block will-change-transform"
                    style={{
                      transform: `translate3d(0, ${fitnessTranslateY}%, 0)`,
                      opacity: fitnessOpacity,
                    }}
                  >
                    Fitness
                  </span>
                </span>
                <span className="overflow-hidden inline-block">
                  <span
                    className="inline-block will-change-transform"
                    style={{
                      transform: `translate3d(0, ${centerTranslateY}%, 0)`,
                      opacity: centerOpacity,
                    }}
                  >
                    Center
                  </span>
                </span>
              </h2>

              {/* 3. GOLD DIVIDER LINE (DRAWS FROM 0 TO 56PX) */}
              <div
                className="h-[1.5px] bg-gradient-to-r from-[#D6B878] via-[#FAF6F0] to-transparent rounded-full will-change-transform"
                style={{
                  width: `${currentDividerWidth}px`,
                  opacity: anim.dividerWidth > 0 ? 0.85 : 0,
                }}
              />

              {/* 4. EDITORIAL PARAGRAPH (STAGGERED LINE-BY-LINE REVEAL) */}
              <div className="space-y-1.5 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed tracking-wide font-normal max-w-xl">
                <div className="overflow-hidden">
                  <p
                    className="block will-change-transform"
                    style={{
                      transform: `translate3d(0, ${p1TranslateY}px, 0)`,
                      opacity: p1Opacity,
                    }}
                  >
                    Step into our world-class fitness sanctuary, equipped with high-performance
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="block will-change-transform"
                    style={{
                      transform: `translate3d(0, ${p2TranslateY}px, 0)`,
                      opacity: p2Opacity,
                    }}
                  >
                    Our state-of-the-art facility is not just a gym; it's a haven of wellness
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT COLUMN (7/12): CURVY LUXURY EDITORIAL PHOTOGRAPH
           ===================================================================== */}
        <div className="lg:col-span-7 flex justify-center w-full relative">
          {/* Cinematic Editorial Photograph Frame with Soft Curvy Corners */}
          <div
            className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/10.5] max-h-[220px] sm:max-h-[440px] lg:max-h-[540px] xl:max-h-[580px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-[0_28px_65px_rgba(0,0,0,0.40)] bg-stone-900 will-change-transform ring-1 ring-[#D6B878]/35"
            style={{
              clipPath: photoExitClip,
              WebkitClipPath: photoExitClip,
              transform: `perspective(1200px) translate3d(${photoTranslateX}px, ${photoTranslateY}px, 0) rotateY(${photoRotY}deg) rotateX(${photoRotX}deg)`,
              opacity: photoOpacity,
              border: `1.5px solid rgba(214, 197, 173, ${0.15 + anim.photoBorderDraw * 0.45})`,
            }}
          >
            {/* The High-Resolution Fitness Photo Asset with Depth Scale */}
            <img
              src="/images/facilities/fitness-1.webp"
              alt="Modern Fitness Center"
              className="w-full h-full object-cover select-none will-change-transform rounded-2xl sm:rounded-3xl lg:rounded-[32px] group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              style={{
                transform: `scale(${photoScale})`,
                transition: 'transform 0.15s ease-out',
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
