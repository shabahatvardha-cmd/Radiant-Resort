import React, { useMemo } from 'react';

/**
 * Helper: Smooth S-curve Hermite interpolation (3t^2 - 2t^3)
 * Ensures silky-smooth deceleration at both ends of each sub-timeline.
 */
function getSubProgress(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/**
 * FitnessSectionContent
 * 
 * Dark Impact: The Strength Reveal
 * - Text Panel: Deep Forest-Black editorial card with a 45° Diagonal Curtain Reveal.
 * - Split Typography: "FITNESS" enters first, followed by "CENTER" from vertical overflow masks.
 * - Eyebrow Gold Signal: Animated gold line + "MODERN" mask reveal with glint.
 * - Gold Divider: Progressively draws from 0px to 64px.
 * - Paragraph: 4 editorial line-by-line staggered reveals.
 * - Photograph: Dual Diagonal Shutter that parts from center outward to opposite corners.
 * - Reversible: 100% scroll-driven forward and backward.
 */
export default function FitnessSectionContent({ globalProgress = 8.0, prefersReducedMotion = false }) {
  // ---------------------------------------------------------------------------
  // TIMELINE CALCULATIONS (STAGGERED SEPARATE IDENTITIES)
  // ---------------------------------------------------------------------------
  const {
    panelProgress,
    eyebrowProgress,
    fitnessProgress,
    centerProgress,
    dividerProgress,
    pLine1Progress,
    pLine2Progress,
    pLine3Progress,
    pLine4Progress,
    shutterProgress,
    borderProgress,
    sweepProgress,
    dwellBreath,
  } = useMemo(() => {
    if (prefersReducedMotion) {
      const active = globalProgress >= 7.35;
      return {
        panelProgress: active ? 1 : 0,
        eyebrowProgress: active ? 1 : 0,
        fitnessProgress: active ? 1 : 0,
        centerProgress: active ? 1 : 0,
        dividerProgress: active ? 1 : 0,
        pLine1Progress: active ? 1 : 0,
        pLine2Progress: active ? 1 : 0,
        pLine3Progress: active ? 1 : 0,
        pLine4Progress: active ? 1 : 0,
        shutterProgress: active ? 1 : 0,
        borderProgress: active ? 1 : 0,
        sweepProgress: 0,
        dwellBreath: 0,
      };
    }

    // 1. Text Panel Diagonal Curtain: 7.35 -> 7.52
    const panelProgress = getSubProgress(globalProgress, 7.35, 7.52);

    // 2. Eyebrow "MODERN" & Gold Signal: 7.45 -> 7.58
    const eyebrowProgress = getSubProgress(globalProgress, 7.45, 7.58);

    // 3. Heading: "FITNESS" enters: 7.48 -> 7.62
    const fitnessProgress = getSubProgress(globalProgress, 7.48, 7.62);

    // 4. Heading: "CENTER" enters: 7.58 -> 7.72
    const centerProgress = getSubProgress(globalProgress, 7.58, 7.72);

    // 5. Photograph Dual Diagonal Shutter: 7.58 -> 7.82 (Opens SECOND!)
    const shutterProgress = getSubProgress(globalProgress, 7.58, 7.82);

    // 6. Photograph Frame Border Draw: 7.68 -> 7.88
    const borderProgress = getSubProgress(globalProgress, 7.68, 7.88);

    // 7. Photograph Light Sweep: 7.74 -> 7.92
    const sweepProgress = getSubProgress(globalProgress, 7.74, 7.92);

    // 8. Gold Divider progressive draw: 7.82 -> 7.96
    const dividerProgress = getSubProgress(globalProgress, 7.82, 7.96);

    // 9. Paragraph lines (Staggered line by line): 7.88 -> 8.08
    const pLine1Progress = getSubProgress(globalProgress, 7.88, 7.98);
    const pLine2Progress = getSubProgress(globalProgress, 7.92, 8.02);
    const pLine3Progress = getSubProgress(globalProgress, 7.96, 8.05);
    const pLine4Progress = getSubProgress(globalProgress, 8.00, 8.08);

    // Resting dwell breath on photo (scale ~1.028)
    const dwellProximity = Math.max(0, 1 - Math.abs(globalProgress - 8.0) / 0.7);
    const dwellBreath = dwellProximity * 0.028;

    return {
      panelProgress,
      eyebrowProgress,
      fitnessProgress,
      centerProgress,
      dividerProgress,
      pLine1Progress,
      pLine2Progress,
      pLine3Progress,
      pLine4Progress,
      shutterProgress,
      borderProgress,
      sweepProgress,
      dwellBreath,
    };
  }, [globalProgress, prefersReducedMotion]);

  // Overall exit fade if past 8.35
  const exitDelta = globalProgress - 8.0;
  let exitOpacity = 1;
  if (globalProgress > 8.35) {
    const t = Math.min(1, (globalProgress - 8.35) / 0.50);
    exitOpacity = 1 - t * t * (3 - 2 * t);
  }

  // Diagonal curtain mask on text panel (lower-left to upper-right 45° angle)
  const maskPercent = panelProgress * 115;
  const panelMaskStyle = {
    WebkitMaskImage: `linear-gradient(45deg, #000 0%, #000 ${maskPercent}%, transparent ${maskPercent + 12}%)`,
    maskImage: `linear-gradient(45deg, #000 0%, #000 ${maskPercent}%, transparent ${maskPercent + 12}%)`,
  };

  // Image scale and 3D perspective during entrance
  const imageScale = 1.10 - shutterProgress * 0.10 + dwellBreath;
  const imageRotY = (1 - shutterProgress) * 5;
  const imageRotZ = (1 - shutterProgress) * -2;

  return (
    <div
      className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto pt-16 pb-10 select-none will-change-transform"
      style={{ opacity: exitOpacity }}
    >
      {/* =======================================================================
          LEFT COLUMN (5/12): DARK IMPACT EDITORIAL TEXT PANEL
         ======================================================================= */}
      <div className="lg:col-span-5 w-full">
        <div
          className="relative w-full rounded-3xl p-6 sm:p-8 lg:p-9 overflow-hidden will-change-transform"
          style={{
            ...panelMaskStyle,
            background: 'linear-gradient(150deg, #0B1614 0%, #07100F 100%)',
            border: '1px solid rgba(214, 184, 120, 0.28)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(214, 184, 120, 0.15)',
            transform: `translate3d(0, ${(1 - panelProgress) * 16}px, 0)`,
            opacity: Math.min(1, panelProgress * 1.4),
          }}
        >
          {/* Subtle Ambient Radial Backlight Glow */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none blur-[60px]"
            style={{
              background: 'radial-gradient(circle, rgba(214, 184, 120, 0.10) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 space-y-5 text-left">
            {/* 1. EYEBROW: GOLD SIGNAL + "MODERN" */}
            <div className="flex items-center gap-3">
              {/* Dynamic progressive gold signal line */}
              <div
                className="h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B878] to-[#FFF5DF] rounded-full will-change-transform"
                style={{ width: `${eyebrowProgress * 28}px` }}
              />

              {/* Overflow-hidden mask for "MODERN" text */}
              <div className="overflow-hidden">
                <span
                  className="text-xs sm:text-sm font-sans font-bold tracking-[0.25em] text-[#D6B878] uppercase block will-change-transform"
                  style={{
                    transform: `translate3d(${(1 - eyebrowProgress) * -24}px, 0, 0)`,
                    opacity: eyebrowProgress,
                  }}
                >
                  Modern
                </span>
              </div>

              {/* Tiny travelling gold glint */}
              {eyebrowProgress > 0 && eyebrowProgress < 1 && (
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#FFF5DF] shadow-[0_0_8px_#D6B878] pointer-events-none"
                  style={{
                    opacity: Math.sin(eyebrowProgress * Math.PI),
                  }}
                />
              )}
            </div>

            {/* 2. SPLIT TYPOGRAPHY HEADING: "FITNESS" THEN "CENTER" */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FAF6F0] uppercase tracking-tight leading-[1.08] flex flex-wrap gap-x-3">
              {/* Word 1: FITNESS (Enters First) */}
              <span className="overflow-hidden inline-block py-0.5">
                <span
                  className="inline-block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - fitnessProgress) * 32}px, 0)`,
                    opacity: fitnessProgress,
                  }}
                >
                  Fitness
                </span>
              </span>

              {/* Word 2: CENTER (Enters Second) */}
              <span className="overflow-hidden inline-block py-0.5">
                <span
                  className="inline-block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - centerProgress) * 32}px, 0)`,
                    opacity: centerProgress,
                  }}
                >
                  Center
                </span>
              </span>
            </h2>

            {/* 3. GOLD DIVIDER: PROGRESSIVE DRAW (0px -> 64px) */}
            <div className="h-0.5 w-16 overflow-hidden">
              <div
                className="h-full rounded-full will-change-transform"
                style={{
                  width: `${dividerProgress * 64}px`,
                  background: 'linear-gradient(90deg, #D6B878 0%, #FFF5DF 70%, #D6B878 100%)',
                  boxShadow: '0 0 10px rgba(214, 184, 120, 0.4)',
                }}
              />
            </div>

            {/* 4. EDITORIAL PARAGRAPH: LINE BY LINE REVEAL */}
            <div className="text-sm sm:text-base font-sans text-[rgba(250,246,240,0.82)] leading-relaxed font-normal space-y-1">
              {/* Line 1 */}
              <div className="overflow-hidden block">
                <span
                  className="block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - pLine1Progress) * 16}px, 0)`,
                    opacity: pLine1Progress,
                  }}
                >
                  Welcome to Fitness Center, where fitness becomes a lavish experience.
                </span>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden block">
                <span
                  className="block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - pLine2Progress) * 16}px, 0)`,
                    opacity: pLine2Progress,
                  }}
                >
                  Our state-of-the-art facility is not just a gym; it's a haven of wellness
                </span>
              </div>

              {/* Line 3 */}
              <div className="overflow-hidden block">
                <span
                  className="block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - pLine3Progress) * 16}px, 0)`,
                    opacity: pLine3Progress,
                  }}
                >
                  and transformation, where every moment is a step closer
                </span>
              </div>

              {/* Line 4 */}
              <div className="overflow-hidden block">
                <span
                  className="block will-change-transform"
                  style={{
                    transform: `translate3d(0, ${(1 - pLine4Progress) * 16}px, 0)`,
                    opacity: pLine4Progress,
                  }}
                >
                  to a healthier, more opulent you.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          RIGHT COLUMN (7/12): PHOTOGRAPH — DUAL DIAGONAL SHUTTER REVEAL
         ======================================================================= */}
      <div className="lg:col-span-7 flex justify-center w-full">
        <div
          className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] max-h-[460px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] bg-stone-900 will-change-transform"
          style={{
            border: `2px solid rgba(214, 197, 173, ${0.15 + borderProgress * 0.65})`,
            transform: `perspective(1000px) rotateY(${imageRotY}deg) rotateZ(${imageRotZ}deg)`,
          }}
        >
          {/* The High-Resolution Fitness Photo with Depth Scale */}
          <img
            src="/images/facilities/fitness-1.webp"
            alt="Modern Fitness Center"
            className="w-full h-full object-cover select-none will-change-transform"
            style={{
              transform: `scale(${imageScale})`,
              transition: 'transform 0.12s ease-out',
            }}
          />

          {/* DUAL DIAGONAL SHUTTER PANEL 1: Top-Right Diagonal Shutter */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform z-10"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
              background: 'linear-gradient(135deg, #07100F 0%, #0B1614 100%)',
              borderBottom: '1.5px solid rgba(214, 184, 120, 0.45)',
              transform: `translate3d(${shutterProgress * 105}%, ${-shutterProgress * 105}%, 0)`,
            }}
          />

          {/* DUAL DIAGONAL SHUTTER PANEL 2: Bottom-Left Diagonal Shutter */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform z-10"
            style={{
              clipPath: 'polygon(0 0, 100% 100%, 0 100%, 0 0)',
              background: 'linear-gradient(135deg, #0B1614 0%, #07100F 100%)',
              borderTop: '1.5px solid rgba(214, 184, 120, 0.45)',
              transform: `translate3d(${-shutterProgress * 105}%, ${shutterProgress * 105}%, 0)`,
            }}
          />

          {/* OPTIONAL LIGHT SWEEP: Diagonal Sheen highlight across the image */}
          {sweepProgress > 0 && sweepProgress < 1 && (
            <div
              className="absolute inset-y-0 w-36 pointer-events-none z-20"
              style={{
                left: `${(sweepProgress - 0.2) * 140}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 248, 235, 0.22) 50%, transparent 100%)',
                transform: 'skewX(-25deg)',
                opacity: Math.sin(sweepProgress * Math.PI) * 0.75,
              }}
            />
          )}

          {/* Subtle champagne gold accent highlight line on left edge */}
          <div
            className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D6B878] to-transparent pointer-events-none z-20"
            style={{ opacity: borderProgress * 0.7 }}
          />
        </div>
      </div>
    </div>
  );
}

