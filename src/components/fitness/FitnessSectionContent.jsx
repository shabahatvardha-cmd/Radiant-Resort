import React from 'react';

/**
 * FitnessSectionContent
 * 
 * Dark Impact: The Strength Sanctuary
 * - 100% Solid & Crystal Clear: No diagonal curtain masks, no slicing shutters.
 * - Text Panel: Deep Forest-Black editorial card with subtle ambient gold glow (preserved blur).
 * - Photograph: Razor-sharp high-resolution fitness photograph with subtle gold frame.
 * - Perfectly readable, calm, and solid throughout scroll.
 */
export default function FitnessSectionContent({ globalProgress = 8.0 }) {
  // Resting dwell proximity for subtle breathing scale on photo
  const dwellProximity = Math.max(0, 1 - Math.abs(globalProgress - 8.0) / 0.7);
  const dwellBreath = dwellProximity * 0.02;

  return (
    <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto pt-16 pb-10 select-none will-change-transform">
      {/* =======================================================================
          LEFT COLUMN (5/12): DARK IMPACT EDITORIAL TEXT PANEL (100% SOLID & CLEAR)
         ======================================================================= */}
      <div className="lg:col-span-5 w-full">
        <div
          className="relative w-full rounded-3xl p-6 sm:p-8 lg:p-9 overflow-hidden will-change-transform shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-[#D6B878]/30"
          style={{
            background: 'linear-gradient(150deg, #0B1614 0%, #07100F 100%)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(214, 184, 120, 0.15)',
          }}
        >
          {/* Subtle Ambient Radial Backlight Glow (Preserved Blur Effect) */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none blur-[60px]"
            style={{
              background: 'radial-gradient(circle, rgba(214, 184, 120, 0.12) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 space-y-5 text-left">
            {/* 1. EYEBROW: GOLD SIGNAL + "MODERN" */}
            <div className="flex items-center gap-3">
              <div className="h-[1.5px] w-7 bg-gradient-to-r from-transparent via-[#D6B878] to-[#FFF5DF] rounded-full" />
              <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.25em] text-[#D6B878] uppercase block">
                Modern
              </span>
            </div>

            {/* 2. TYPOGRAPHY HEADING: "FITNESS CENTER" */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FAF6F0] uppercase tracking-tight leading-[1.08] flex flex-wrap gap-x-3">
              <span>Fitness</span>
              <span>Center</span>
            </h2>

            {/* 3. GOLD DIVIDER LINE */}
            <div className="h-[1.5px] w-16 bg-gradient-to-r from-[#D6B878] via-[#FAF6F0] to-transparent rounded-full opacity-80" />

            {/* 4. STREAMLINED EDITORIAL PARAGRAPH (100% CRISP & READABLE) */}
            <div className="space-y-1.5 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed tracking-wide font-normal max-w-xl">
              <p className="block">
                Step into our world-class fitness sanctuary, equipped with high-performance
              </p>
              <p className="block">
                Our state-of-the-art facility is not just a gym; it's a haven of wellness
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          RIGHT COLUMN (7/12): PHOTOGRAPH (100% UNMASKED, CRISP & SOLID)
         ======================================================================= */}
      <div className="lg:col-span-7 flex justify-center w-full">
        <div
          className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/10.5] max-h-[540px] xl:max-h-[580px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] bg-stone-900 border-2 border-[#D6C5AD]/40 will-change-transform"
        >
          {/* The High-Resolution Fitness Photo with Depth Scale */}
          <img
            src="/images/facilities/fitness-1.webp"
            alt="Modern Fitness Center"
            className="w-full h-full object-cover select-none will-change-transform"
            style={{
              transform: `scale(${1.0 + dwellBreath})`,
              transition: 'transform 0.2s ease-out',
            }}
          />

          {/* Subtle champagne gold accent highlight line on left edge */}
          <div
            className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D6B878] to-transparent pointer-events-none z-20 opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
