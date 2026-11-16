import React from 'react';

/**
 * VedicSpaCursorBackgroundText
 *
 * Background typographic experience for the Vedic Spa & Salon section.
 * - Words are crisp, sharp, bold, darker on screen (no blur!).
 * - Rich word density filling the background canvas.
 * - Moves strictly and smoothly according to cursor motion (mousePos.x and mousePos.y).
 * - Multi-layer 3D depth parallax matching the reference video.
 */
export default function VedicSpaCursorBackgroundText({ mousePos = { x: 0, y: 0 } }) {
  const x = mousePos?.x || 0;
  const y = mousePos?.y || 0;

  // Layer 1: Top Ribbon
  const topX = x * -85;
  const topY = y * -15;

  // Layer 2: Giant Upper-Center Typography ("AYURVEDA")
  const bigX1 = x * 65;
  const bigY1 = y * 25;

  // Layer 3: Giant Lower-Center Typography ("VEDIC SPA & SALON")
  const bigX2 = x * -55;
  const bigY2 = y * -20;

  // Layer 4: Bottom Ribbon (Counter drift)
  const botX = x * 85;
  const botY = y * 15;

  // Side callouts (like reference video "Nashville Hot Chicken")
  const sideLeftX = x * -40;
  const sideLeftY = y * 20;

  const sideRightX = x * 40;
  const sideRightY = y * -20;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex flex-col justify-between"
      aria-hidden="true"
    >
      {/* -------------------------------------------------------------
          TOP DETAIL RIBBON (Moves horizontally with cursor)
         ------------------------------------------------------------- */}
      <div
        className="w-full pt-6 sm:pt-10 px-4 transition-transform duration-200 ease-out will-change-transform opacity-85"
        style={{
          transform: `translate3d(${topX}px, ${topY}px, 0px)`,
        }}
      >
        <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap font-serif font-black uppercase text-lg sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.25em] text-forest-950/35">
          <span>VEDIC SPA</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>AYURVEDIC LINEAGE</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>ABHYANGA MASSAGE</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>DHANWANTARI WARM OILS</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>ROYAL SALON & BRIDAL COUTURE</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>AROMATHERAPY RETREAT</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>HOLISTIC SOUL DETOX</span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          CENTER DUAL WATERMARKS (Massive, Crisp, Darker, No Blur)
         ------------------------------------------------------------- */}
      <div className="relative w-full h-full flex flex-col items-center justify-center -my-6 sm:-my-12">
        {/* Upper Big Word: AYURVEDA */}
        <div
          className="whitespace-nowrap font-serif font-black uppercase tracking-tighter text-[18vw] sm:text-[16vw] leading-none text-stone-900/22 select-none transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${bigX1}px, ${bigY1}px, 0px) scale(${1 + y * 0.04})`,
          }}
        >
          AYURVEDA
        </div>

        {/* Lower Big Word: VEDIC SPA & SALON */}
        <div
          className="whitespace-nowrap font-serif font-black uppercase tracking-tight text-[13vw] sm:text-[11vw] leading-none text-amber-950/20 select-none transition-transform duration-200 ease-out will-change-transform -mt-2 sm:-mt-6"
          style={{
            transform: `translate3d(${bigX2}px, ${bigY2}px, 0px) scale(${1 - y * 0.04})`,
          }}
        >
          VEDIC SPA & SALON
        </div>

        {/* Left Side Callout */}
        <div
          className="absolute left-4 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block text-forest-950/45 transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${sideLeftX}px, ${sideLeftY}px, 0px)`,
          }}
        >
          <p className="font-sans font-black text-xs uppercase tracking-[0.3em] text-gold-dark">Authentic Lineage</p>
          <h4 className="font-serif font-black text-xl lg:text-3xl uppercase text-forest-950/50 leading-none mt-0.5">
            DHANWANTARI<br />HERBAL OILS
          </h4>
          <p className="font-sans font-bold text-[10px] tracking-widest uppercase text-stone-600/70 mt-1.5">
            WARM MEDICATED BOTANICALS
          </p>
        </div>

        {/* Right Side Callout */}
        <div
          className="absolute right-4 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block text-right text-forest-950/45 transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${sideRightX}px, ${sideRightY}px, 0px)`,
          }}
        >
          <p className="font-sans font-black text-xs uppercase tracking-[0.3em] text-gold-dark">Bespoke Couture</p>
          <h4 className="font-serif font-black text-xl lg:text-3xl uppercase text-forest-950/50 leading-none mt-0.5">
            ROYAL SALON<br />& BRIDAL SUITE
          </h4>
          <p className="font-sans font-bold text-[10px] tracking-widest uppercase text-stone-600/70 mt-1.5">
            EXPERT STYLING & GROOMING
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------
          BOTTOM DETAIL RIBBON (Moves counter to top ribbon)
         ------------------------------------------------------------- */}
      <div
        className="w-full pb-6 sm:pb-10 px-4 transition-transform duration-200 ease-out will-change-transform opacity-85"
        style={{
          transform: `translate3d(${botX}px, ${botY}px, 0px)`,
        }}
      >
        <div className="flex items-center gap-4 sm:gap-8 whitespace-nowrap font-serif font-black uppercase text-lg sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.25em] text-forest-950/35">
          <span>POTLI THERAPY</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>ROYAL HAMMAM RITUALS</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>SHIRODHARA INFUSION</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>HERBAL STEAM BATHS</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>DEEP TISSUE RESTORATION</span>
          <span className="text-gold-dark text-base sm:text-lg">✦</span>
          <span>MEDITATIVE SERENITY</span>
        </div>
      </div>
    </div>
  );
}

