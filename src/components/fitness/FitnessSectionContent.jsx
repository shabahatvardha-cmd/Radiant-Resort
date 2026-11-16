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
 * Strict Timeline Mapping (Milestone 8.0, Range: 7.25 – 8.95):
 * - 7.25–7.38: Background atmosphere & typography ("STRENGTH") enter
 * - 7.38–7.53: Text panel expands from vertical strip reveal
 * - 7.48–7.65: Eyebrow ("MODERN") & Main Heading ("FITNESS" / "CENTER") reveal
 * - 7.55–7.78: Photograph vertical shutter opens (scale 1.08 -> 1.00)
 * - 7.72–7.92: Photograph settles & champagne-gold border draws
 * - 7.82–8.05: Paragraph appears line by line with staggered vertical reveal
 * - 8.05–8.25: Foreground composition transforms (spatial shift & connecting gold axis)
 * - 8.25–8.45: Signature gym background movement ("DISCIPLINE" / "MOVEMENT" glide)
 * - 8.45–8.65: Text panel and heading begin exiting (contracting left)
 * - 8.55–8.80: Photograph exits through diagonal clipping mask (zooming forward)
 * - 8.80–8.95: Background clears for Guest Chronicles
 */
export default function FitnessSectionContent({ globalProgress = 8.0 }) {
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
      const active = globalProgress >= 7.35 && globalProgress <= 8.85;
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

    // 1. Text Panel Entrance & Exit (7.38–7.53 enter, 8.05–8.25 shift, 8.45–8.65 exit)
    const textPanelExpand = getSubProgress(globalProgress, 7.38, 7.53);
    const textPanelShift = getSubProgress(globalProgress, 8.05, 8.25);
    const textPanelExit = getSubProgress(globalProgress, 8.45, 8.65);

    // 2. Eyebrow "MODERN" & Accent Line (7.46–7.58 enter, 8.45–8.60 exit)
    const eyebrowGoldLine = getSubProgress(globalProgress, 7.46, 7.56);
    const eyebrowIn = getSubProgress(globalProgress, 7.48, 7.58);
    const eyebrowExit = getSubProgress(globalProgress, 8.45, 8.60);

    // 3. Main Heading split lines (7.48–7.65 enter, 8.45–8.65 exit)
    const fitnessIn = getSubProgress(globalProgress, 7.48, 7.60);
    const centerIn = getSubProgress(globalProgress, 7.53, 7.65);
    const headingExit = getSubProgress(globalProgress, 8.45, 8.65);

    // 4. Gold Divider (7.56–7.70 draw, 8.45–8.60 retract)
    const dividerWidth = getSubProgress(globalProgress, 7.56, 7.70);
    const dividerExit = getSubProgress(globalProgress, 8.45, 8.60);

    // 5. Photograph Entrance, Settle, Active Shift & Diagonal Exit
    // Shutter opens: 7.55 -> 7.78
    const photoShutter = getSubProgress(globalProgress, 7.55, 7.78);
    // Border draws: 7.72 -> 7.92
    const photoBorderDraw = getSubProgress(globalProgress, 7.72, 7.92);
    // Active spatial transformation: 8.05 -> 8.35
    const photoActiveShift = getSubProgress(globalProgress, 8.05, 8.35);
    // Diagonal mask exit: 8.55 -> 8.80
    const photoExit = getSubProgress(globalProgress, 8.55, 8.80);

    // 6. Paragraph lines (Line-by-line stagger: 7.82–8.05 enter, 8.42–8.58 exit)
    const pLine1In = getSubProgress(globalProgress, 7.82, 7.94);
    const pLine2In = getSubProgress(globalProgress, 7.90, 8.04);
    const pLine1Out = getSubProgress(globalProgress, 8.42, 8.52);
    const pLine2Out = getSubProgress(globalProgress, 8.48, 8.58);

    // 7. Connecting Gold Line between Text Panel & Photograph (8.00–8.20 enter, 8.45–8.65 exit)
    const connectLineIn = getSubProgress(globalProgress, 8.00, 8.20);
    const connectLine = connectLineIn * (1 - textPanelExit);

    // 8. Background Typography Parallax Words
    // STRENGTH: 7.25–7.42 enter, 8.05–8.35 exit
    const wordStrengthIn = getSubProgress(globalProgress, 7.25, 7.42);
    const wordStrengthOut = getSubProgress(globalProgress, 8.05, 8.35);

    // DISCIPLINE: 7.75–8.10 enter, 8.45–8.75 exit
    const wordDisciplineIn = getSubProgress(globalProgress, 7.75, 8.10);
    const wordDisciplineOut = getSubProgress(globalProgress, 8.45, 8.75);

    // MOVEMENT: 8.10–8.40 enter, 8.55–8.85 exit
    const wordMovementIn = getSubProgress(globalProgress, 8.10, 8.40);
    const wordMovementOut = getSubProgress(globalProgress, 8.55, 8.85);

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
  }, [globalProgress, prefersReducedMotion]);

  // If outside active interval, unmount gracefully
  if (globalProgress < 7.25 || globalProgress > 8.95) return null;

  // ---------------------------------------------------------------------------
  // DERIVED DYNAMIC STYLES & TRANSFORMS
  // ---------------------------------------------------------------------------

  // A. Editorial Text Panel
  // Reveal from narrow vertical strip (expanding horizontally from center)
  const panelClipH = prefersReducedMotion ? 0 : (1 - anim.textPanelExpand) * 50;
  // Upward depth entry (28px -> 0px), spatial left shift (-26px), then contract/exit left
  const panelTranslateX = -anim.textPanelShift * 26 - anim.textPanelExit * 75;
  const panelTranslateY = (1 - anim.textPanelExpand) * 28;
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
  const p1TranslateY = (1 - anim.pLine1In) * 14 - anim.pLine1Out * 12;
  const p1Opacity = Math.max(0, anim.pLine1In * (1 - anim.pLine1Out));

  const p2TranslateY = (1 - anim.pLine2In) * 14 - anim.pLine2Out * 12;
  const p2Opacity = Math.max(0, anim.pLine2In * (1 - anim.pLine2Out));

  // F. Photograph Shutter Reveal, Active Shift, and Diagonal Exit Mask
  // Entrance: narrow vertical strip reveal expanding outward from center
  const photoStripInset = prefersReducedMotion ? 0 : (1 - anim.photoShutter) * 50;
  // Active shift: slightly moves toward foreground and left (-18px), subtle perspective
  const photoTranslateX = -anim.photoActiveShift * 18 - anim.photoExit * 45;
  const photoTranslateY = -anim.photoExit * 20;
  // Entrance scale settles from 1.08 -> 1.00; Active scale gently grows to 1.035; Exit zooms to 1.085
  const photoScale = 1.00 + (1 - anim.photoShutter) * 0.08 + anim.photoActiveShift * 0.035 + anim.photoExit * 0.05;
  const photoRotY = prefersReducedMotion ? 0 : -anim.photoActiveShift * 2.2;
  const photoRotX = prefersReducedMotion ? 0 : anim.photoActiveShift * 1.2;

  // Diagonal exit mask: starts fully open (100%), then parts diagonally
  const photoExitClip = anim.photoExit > 0.001
    ? `polygon(0 0, ${Math.max(0, 100 * (1 - anim.photoExit))}% 0, 100% ${Math.min(100, anim.photoExit * 100)}%, 0 100%)`
    : `inset(0 ${photoStripInset}% 0 ${photoStripInset}%)`;

  const photoOpacity = anim.photoExit > 0.85
    ? Math.max(0, 1.0 - (anim.photoExit - 0.85) / 0.15)
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* =====================================================================
            LEFT COLUMN (5/12): ARCHITECTURAL EDITORIAL PANEL
           ===================================================================== */}
        <div className="lg:col-span-5 w-full">
          <div
            className="relative w-full p-6 sm:p-8 lg:p-9 overflow-hidden will-change-transform shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
            style={{
              clipPath: `inset(0 ${panelClipH}% 0 ${panelClipH}%)`,
              transform: `translate3d(${panelTranslateX}px, ${panelTranslateY}px, 0)`,
              opacity: panelOpacity,
              background: 'linear-gradient(150deg, #0B1614 0%, #07100F 100%)',
              border: `1px solid rgba(214, 184, 120, ${0.15 + (1 - anim.textPanelExit) * 0.25})`,
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(214, 184, 120, 0.15)',
            }}
          >
            {/* Architectural Inset Corner Crosshairs (Top-Left & Bottom-Right) */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#D6B878]/50 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#D6B878]/50 pointer-events-none" />

            {/* Subtle Ambient Radial Backlight Glow (Preserved Blur) */}
            <div
              className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none blur-[60px]"
              style={{
                background: 'radial-gradient(circle, rgba(214, 184, 120, 0.12) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-5 text-left">
              
              {/* 1. EYEBROW: INDEPENDENT GOLD SIGNAL LINE + OVERFLOW MASKED "MODERN" */}
              <div className="flex items-center gap-3">
                <div
                  className="h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B878] to-[#FFF5DF] rounded-full will-change-transform"
                  style={{
                    width: `${anim.eyebrowGoldLine * 28}px`,
                    opacity: anim.eyebrowGoldLine,
                    transition: 'width 0.1s ease-out',
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FAF6F0] uppercase tracking-tight leading-[1.08] flex flex-wrap gap-x-3.5">
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

              {/* 3. GOLD DIVIDER LINE (DRAWS FROM 0 TO 64PX) */}
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
            RIGHT COLUMN (7/12): CINEMATIC EDITORIAL PHOTOGRAPH
           ===================================================================== */}
        <div className="lg:col-span-7 flex justify-center w-full relative">
          
          {/* Spatial Connecting Gold Axis Line (Visual bridge between Panel and Photo) */}
          {anim.connectLine > 0.01 && (
            <div
              className="hidden lg:block absolute left-[-2.5rem] top-1/2 -translate-y-1/2 h-[1px] pointer-events-none z-20 will-change-transform"
              style={{
                width: `${anim.connectLine * 2.5}rem`,
                background: 'linear-gradient(90deg, rgba(214, 184, 120, 0.45) 0%, rgba(250, 246, 240, 0.6) 50%, rgba(214, 184, 120, 0.2) 100%)',
                opacity: anim.connectLine,
              }}
            />
          )}

          {/* Cinematic Editorial Photograph Frame */}
          <div
            className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/10.5] max-h-[540px] xl:max-h-[580px] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.75)] bg-stone-900 will-change-transform"
            style={{
              clipPath: photoExitClip,
              transform: `perspective(1200px) translate3d(${photoTranslateX}px, ${photoTranslateY}px, 0) rotateY(${photoRotY}deg) rotateX(${photoRotX}deg)`,
              opacity: photoOpacity,
              border: `2px solid rgba(214, 197, 173, ${0.12 + anim.photoBorderDraw * 0.55})`,
            }}
          >
            {/* The High-Resolution Fitness Photo Asset with Depth Scale */}
            <img
              src="/images/facilities/fitness-1.webp"
              alt="Modern Fitness Center"
              className="w-full h-full object-cover select-none will-change-transform"
              style={{
                transform: `scale(${photoScale})`,
                transition: 'transform 0.15s ease-out',
              }}
            />

            {/* Inset Champagne Gold Corner Accents (Subtle Architectural Detail) */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D6B878]/60 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D6B878]/60 pointer-events-none z-20" />

            {/* Fine Champagne Gold Vertical Accent Line on Left Edge */}
            <div
              className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D6B878] to-transparent pointer-events-none z-20 will-change-transform"
              style={{
                opacity: anim.photoBorderDraw * 0.8,
                transform: `scaleY(${anim.photoBorderDraw})`,
                transformOrigin: 'top center',
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
