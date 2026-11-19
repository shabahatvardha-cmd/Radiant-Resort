import React, { useRef, useEffect } from 'react';

/**
 * SevenScentricCenterpieceEnvironment.jsx
 * 
 * THE SEVEN SCENTRIC
 * Clean, Light-Themed, Scroll-Reactive Centerpiece & Horizontal Typography Environment
 * 
 * CENTERPIECE SUBTLETY:
 * - The center logo & huge numeral 7 are made faint and softly translucent (less visible)
 *   so they sit gracefully in the background without dominating the frontend content.
 * - Straight horizontal typography with 0° rotation.
 * - Zero mouse tracking; 100% scroll-driven motion.
 */

// Piecewise Hermite S-curve interpolation
function evaluateWaypoint(waypoints, u) {
  const clampedU = Math.max(0, Math.min(1, u));
  const segments = waypoints.length - 1;
  const scaled = clampedU * segments;
  const segIdx = Math.min(segments - 1, Math.floor(scaled));
  const localT = scaled - segIdx;
  const easeT = localT * localT * (3 - 2 * localT);

  const wA = waypoints[segIdx];
  const wB = waypoints[segIdx + 1];

  return {
    x: wA.x + (wB.x - wA.x) * easeT,
    y: wA.y + (wB.y - wA.y) * easeT,
    scale: wA.scale + (wB.scale - wA.scale) * easeT,
    opacity: wA.opacity + (wB.opacity - wA.opacity) * easeT,
  };
}

// Straight, Horizontal Typographic Elements (0° rotation, subtle editorial elegance)
const TYPO_CONFIGS = [
  // 1. Upper-Left Refined Header (Straight)
  {
    id: 'typo-1',
    text: 'THE SEVEN SCENTRIC',
    className: 'font-serif font-black tracking-[0.32em] uppercase text-xs sm:text-sm lg:text-base text-[#9B7B43]/65 select-none',
    waypoints: [
      { x: -28, y: -22, scale: 1.0, opacity: 0.55 },
      { x: -32, y: -26, scale: 0.92, opacity: 0.30 },
      { x: -36, y: -20, scale: 0.85, opacity: 0.15 },
      { x: -26, y: -28, scale: 0.94, opacity: 0.40 },
      { x: -20, y: -22, scale: 1.0, opacity: 0.60 },
    ],
  },
  // 2. Upper-Right Roman Coordinate (Straight)
  {
    id: 'typo-2',
    text: 'THE SEVEN • VII',
    className: 'font-serif font-semibold tracking-[0.38em] uppercase text-[11px] sm:text-xs lg:text-sm text-[#A88448]/60 select-none',
    waypoints: [
      { x: 28, y: -24, scale: 1.0, opacity: 0.50 },
      { x: 34, y: -28, scale: 0.90, opacity: 0.25 },
      { x: 38, y: -22, scale: 0.82, opacity: 0.12 },
      { x: 28, y: -28, scale: 0.92, opacity: 0.35 },
      { x: 20, y: -24, scale: 0.98, opacity: 0.55 },
    ],
  },
  // 3. Left-Middle Wordmark Accent (Straight)
  {
    id: 'typo-3',
    text: 'SCENTRIC',
    className: 'font-serif font-black tracking-[0.28em] uppercase text-lg sm:text-xl lg:text-2xl text-[#D6B878]/35 select-none',
    waypoints: [
      { x: -32, y: 0, scale: 1.0, opacity: 0.35 },
      { x: -38, y: -4, scale: 0.90, opacity: 0.18 },
      { x: -42, y: 4, scale: 0.80, opacity: 0.08 },
      { x: -34, y: -6, scale: 0.92, opacity: 0.30 },
      { x: -24, y: 2, scale: 0.98, opacity: 0.45 },
    ],
  },
  // 4. Right-Middle Brand Signature (Straight)
  {
    id: 'typo-4',
    text: 'THE SEVEN SCENTRIC RESTAURANT',
    className: 'font-sans font-medium tracking-[0.32em] uppercase text-[10px] sm:text-xs text-[#9B7B43]/55 select-none',
    waypoints: [
      { x: 30, y: 2, scale: 1.0, opacity: 0.45 },
      { x: 36, y: 8, scale: 0.88, opacity: 0.20 },
      { x: 40, y: 12, scale: 0.78, opacity: 0.10 },
      { x: 30, y: 4, scale: 0.90, opacity: 0.30 },
      { x: 22, y: 4, scale: 0.96, opacity: 0.50 },
    ],
  },
  // 5. Lower-Left Culinary Monument (Straight)
  {
    id: 'typo-5',
    text: 'THE SEVEN',
    className: 'font-serif font-black tracking-[0.25em] uppercase text-2xl sm:text-3xl lg:text-4xl text-[#D6B878]/20 select-none',
    waypoints: [
      { x: -24, y: 24, scale: 1.0, opacity: 0.25 },
      { x: -30, y: 28, scale: 0.88, opacity: 0.12 },
      { x: -36, y: 32, scale: 0.76, opacity: 0.05 },
      { x: -26, y: 26, scale: 0.92, opacity: 0.20 },
      { x: -16, y: 22, scale: 0.96, opacity: 0.35 },
    ],
  },
  // 6. Lower-Right Repertoire Capsule (Straight)
  {
    id: 'typo-6',
    text: 'FINE DINING • REPERTOIRE',
    className: 'font-sans font-semibold tracking-[0.28em] uppercase text-[9px] sm:text-[10px] px-3 py-1 rounded-full border border-[#D6B878]/30 bg-[#FAF6F0]/60 text-[#9B7B43]/60 backdrop-blur-[2px] select-none',
    waypoints: [
      { x: 24, y: 26, scale: 1.0, opacity: 0.50 },
      { x: 30, y: 30, scale: 0.90, opacity: 0.22 },
      { x: 36, y: 34, scale: 0.80, opacity: 0.08 },
      { x: 26, y: 28, scale: 0.92, opacity: 0.35 },
      { x: 16, y: 24, scale: 0.98, opacity: 0.55 },
    ],
  },
  // 7. Top-Center Geographic Marker (Straight)
  {
    id: 'typo-7',
    text: 'FINE GASTRONOMY • GORAKHPUR',
    className: 'font-sans font-bold tracking-[0.40em] uppercase text-[9px] sm:text-[10px] text-[#A88448]/50 select-none',
    waypoints: [
      { x: 0, y: -32, scale: 1.0, opacity: 0.45 },
      { x: 0, y: -35, scale: 0.90, opacity: 0.20 },
      { x: 0, y: -38, scale: 0.80, opacity: 0.10 },
      { x: 0, y: -33, scale: 0.92, opacity: 0.30 },
      { x: 0, y: -30, scale: 0.98, opacity: 0.50 },
    ],
  },
  // 8. Lower-Center Subtitle (Straight)
  {
    id: 'typo-8',
    text: 'THE SEVEN SCENTRIC',
    className: 'font-serif font-bold tracking-[0.30em] uppercase text-xs sm:text-sm text-[#9B7B43]/40 select-none',
    waypoints: [
      { x: 0, y: 34, scale: 1.0, opacity: 0.35 },
      { x: 0, y: 37, scale: 0.88, opacity: 0.18 },
      { x: 0, y: 40, scale: 0.75, opacity: 0.06 },
      { x: 0, y: 35, scale: 0.90, opacity: 0.25 },
      { x: 0, y: 32, scale: 0.96, opacity: 0.45 },
    ],
  },
];

// Centerpiece Emblem 5-Stage Scroll Trajectory
// LOCKED to dead center (x = 0), with gentle, understated watermark opacities
// Significantly less visible (0.28 peak, fading to 0.10 during dish/content viewing)
const CENTERPIECE_WAYPOINTS = [
  // Stage 1 (Hero / Intro): Faint, refined watermark logo (opacity ~0.28)
  { x: 0, y: 0, scale: 0.92, opacity: 0.28 },
  // Stage 2 (Services): Floats up gently, softly fading (opacity ~0.16)
  { x: 0, y: -16, scale: 0.76, opacity: 0.16 },
  // Stage 3 (Dishes): Ultra-subtle so food photographs take complete center stage (opacity ~0.08)
  { x: 0, y: -22, scale: 0.68, opacity: 0.08 },
  // Stage 4 (Private Dining): Centered above description (opacity ~0.18)
  { x: 0, y: -8, scale: 0.80, opacity: 0.18 },
  // Stage 5 (Concierge / Closing): Faint brand crest (opacity ~0.24)
  { x: 0, y: -12, scale: 0.86, opacity: 0.24 },
];

export default function SevenScentricCenterpieceEnvironment({
  progress,
  globalProgress = 7.0,
}) {
  // Normalized scroll progress u in [0, 1]
  const currentURef = useRef(0.0);
  const targetURef = useRef(0.0);

  useEffect(() => {
    if (typeof progress === 'number') {
      targetURef.current = Math.max(0, Math.min(1, progress));
      return;
    }
    // Homepage Dining milestone: centered at 7.0
    // When arriving at and dwelling on 7.0, u = 0.0 (exact same hero presentation as dining depth page)
    // As visitor scrolls past 7.0 towards 7.45, smoothly glides through scroll stages (0.0 to 1.0)
    const delta = globalProgress - 7.0;
    const normalized = Math.max(0, Math.min(1, delta / 0.45));
    targetURef.current = normalized;
  }, [progress, globalProgress]);

  // DOM Refs for direct 120 FPS / 60 FPS transform updates (zero React re-render overhead)
  const emblemRef = useRef(null);
  const typoRefs = useRef([]);

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(50, Math.max(8, now - lastTime));
      lastTime = now;

      // Damped Scroll Progress Interpolation (strictly scroll-driven, zero cursor tracking)
      const scrollDiff = targetURef.current - currentURef.current;
      if (Math.abs(scrollDiff) > 0.0001) {
        currentURef.current += scrollDiff * (1 - Math.exp(-dt * 0.008));
      } else {
        currentURef.current = targetURef.current;
      }
      const u = currentURef.current;

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // 1. Update Central Emblem: LOCKED to dead center (x = 0, rot = 0), subtle low opacity
      if (emblemRef.current) {
        const wp = evaluateWaypoint(CENTERPIECE_WAYPOINTS, u);
        const sc = isMobile ? wp.scale * 0.72 : (isTablet ? wp.scale * 0.88 : wp.scale);

        // Vertical translate only, zero horizontal drift, zero rotation
        emblemRef.current.style.transform = `translate3d(0, ${wp.y}vh, 0) scale(${sc})`;
        emblemRef.current.style.opacity = wp.opacity.toFixed(3);
      }

      // 2. Update Straight Typography: ALL rot = 0 (strictly horizontal)
      for (let i = 0; i < TYPO_CONFIGS.length; i++) {
        const elDom = typoRefs.current[i];
        if (!elDom) continue;

        const cfg = TYPO_CONFIGS[i];
        const wp = evaluateWaypoint(cfg.waypoints, u);

        // Mobile responsiveness: keep screen uncluttered by showing primary markers only
        if (isMobile && i > 3) {
          elDom.style.opacity = '0';
          continue;
        }

        const sc = isMobile ? wp.scale * 0.68 : (isTablet ? wp.scale * 0.85 : wp.scale);

        // Translate horizontally & vertically on scroll — strictly straight, ZERO rotation
        elDom.style.transform = `translate3d(${wp.x}vw, ${wp.y}vh, 0) scale(${sc})`;
        elDom.style.opacity = wp.opacity.toFixed(3);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[2] flex items-center justify-center bg-transparent"
      aria-hidden="true"
    >
      {/* =======================================================================
          A. THE CENTRAL MONUMENTAL EMBLEM (Faint Watermark, Less Visible & Subtle)
         ======================================================================= */}
      <div
        ref={emblemRef}
        className="relative flex items-center justify-center will-change-transform"
      >
        {/* Layer 1: Monumental Translucent Numeral 7 Depth Watermark (Ultra-faint champagne) */}
        <div
          className="absolute -top-10 sm:-top-14 text-[26vw] sm:text-[20vw] lg:text-[16vw] font-serif font-black text-[#D6B878]/[0.05] select-none pointer-events-none"
        >
          7
        </div>

        {/* Ambient Soft Champagne Warmth (Ultra subtle, no glare) */}
        <div
          className="absolute inset-0 -inset-x-12 -inset-y-8 bg-radial from-[#D6B878]/8 via-[#D6B878]/2 to-transparent blur-3xl pointer-events-none rounded-full"
        />

        {/* Layer 2: Official Transparent "7 / scentric" Authentic Brand Logo (Subtle & soft) */}
        <div className="relative z-10 flex items-center justify-center">
          <img
            src="/images/dining/seven-scentric-logo.webp"
            alt="The Seven Scentric Emblem"
            className="w-auto h-20 sm:h-28 md:h-36 lg:h-44 xl:h-48 object-contain drop-shadow-[0_6px_16px_rgba(214,184,120,0.12)] filter brightness-[1.01] contrast-[1.01]"
            onError={(e) => {
              e.currentTarget.src = '/images/dining/seven-scentric-logo.png';
            }}
          />
        </div>
      </div>

      {/* =======================================================================
          B. SURROUNDING STRAIGHT TYPOGRAPHY FIELD (Zero Tilt, Straight Horizontal)
         ======================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {TYPO_CONFIGS.map((cfg, idx) => (
          <div
            key={cfg.id}
            ref={(el) => {
              typoRefs.current[idx] = el;
            }}
            className={`absolute whitespace-nowrap will-change-transform ${cfg.className}`}
          >
            {cfg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

