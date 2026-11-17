import React, { useEffect, useRef, useMemo } from 'react';

// Generates an ornate, authentic Vedic Sacred Geometry Lotus Mandala SVG string
function generateMandalaVectorData() {
  // 1. Inner Lotus Petals (8 petals)
  const innerPetals = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const rInner = 28;
    const rOuter = 72;
    const widthAngle = Math.PI / 14;

    const tipX = rOuter * Math.cos(angle);
    const tipY = rOuter * Math.sin(angle);
    const leftX = rInner * Math.cos(angle - widthAngle);
    const leftY = rInner * Math.sin(angle - widthAngle);
    const rightX = rInner * Math.cos(angle + widthAngle);
    const rightY = rInner * Math.sin(angle + widthAngle);

    const ctrlR = (rInner + rOuter) * 0.58;
    const ctrl1X = ctrlR * Math.cos(angle - widthAngle * 1.35);
    const ctrl1Y = ctrlR * Math.sin(angle - widthAngle * 1.35);
    const ctrl2X = ctrlR * Math.cos(angle + widthAngle * 1.35);
    const ctrl2Y = ctrlR * Math.sin(angle + widthAngle * 1.35);

    const path = `M ${leftX.toFixed(2)} ${leftY.toFixed(2)} Q ${ctrl1X.toFixed(2)} ${ctrl1Y.toFixed(2)} ${tipX.toFixed(2)} ${tipY.toFixed(2)} Q ${ctrl2X.toFixed(2)} ${ctrl2Y.toFixed(2)} ${rightX.toFixed(2)} ${rightY.toFixed(2)} Z`;
    innerPetals.push({ path, angle, tipX, tipY });
  }

  // 2. Outer Lotus Petals (16 petals)
  const outerPetals = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + (Math.PI / 16);
    const rInner = 112;
    const rOuter = 168;
    const widthAngle = Math.PI / 26;

    const tipX = rOuter * Math.cos(angle);
    const tipY = rOuter * Math.sin(angle);
    const leftX = rInner * Math.cos(angle - widthAngle);
    const leftY = rInner * Math.sin(angle - widthAngle);
    const rightX = rInner * Math.cos(angle + widthAngle);
    const rightY = rInner * Math.sin(angle + widthAngle);

    const ctrlR = (rInner + rOuter) * 0.58;
    const ctrl1X = ctrlR * Math.cos(angle - widthAngle * 1.35);
    const ctrl1Y = ctrlR * Math.sin(angle - widthAngle * 1.35);
    const ctrl2X = ctrlR * Math.cos(angle + widthAngle * 1.35);
    const ctrl2Y = ctrlR * Math.sin(angle + widthAngle * 1.35);

    const path = `M ${leftX.toFixed(2)} ${leftY.toFixed(2)} Q ${ctrl1X.toFixed(2)} ${ctrl1Y.toFixed(2)} ${tipX.toFixed(2)} ${tipY.toFixed(2)} Q ${ctrl2X.toFixed(2)} ${ctrl2Y.toFixed(2)} ${rightX.toFixed(2)} ${rightY.toFixed(2)} Z`;
    outerPetals.push({ path, angle, tipX, tipY });
  }

  // 3. Middle 16 Radial Spokes
  const spokes = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const x1 = 74 * Math.cos(angle);
    const y1 = 74 * Math.sin(angle);
    const x2 = 108 * Math.cos(angle);
    const y2 = 108 * Math.sin(angle);
    spokes.push({ x1, y1, x2, y2 });
  }

  // 4. Perimeter 32 Celestial Golden Beads
  const beads = [];
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const x = 194 * Math.cos(angle);
    const y = 194 * Math.sin(angle);
    beads.push({ x, y });
  }

  // 5. Eight-pointed Ashtalakshmi Sacred Yantra Star
  const starPoints = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const r = i % 2 === 0 ? 110 : 88;
    starPoints.push(`${(r * Math.cos(angle)).toFixed(1)},${(r * Math.sin(angle)).toFixed(1)}`);
  }

  // 6. Gold Dust Dispersal Particles (24 particles per mandala)
  const dustParticles = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
    const r = 40 + Math.random() * 120;
    const speed = 180 + Math.random() * 140;
    dustParticles.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
      targetX: Math.cos(angle) * speed,
      targetY: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 2.2,
    });
  }

  return { innerPetals, outerPetals, spokes, beads, starPolygon: starPoints.join(' '), dustParticles };
}

// Configuration for exactly 5 distinct mandalas across the viewport
const MANDALAS_CONFIG = [
  // 1. Hero Large (Center-Right): Subtly behind the photo card area
  {
    id: 'hero-large',
    className: 'right-[2%] sm:right-[6%] top-[12%] sm:top-[16%] w-[320px] h-[320px] sm:w-[620px] sm:h-[620px]',
    baseOpacity: 0.22,
    speed: 0.035, // Clockwise slow
    stageFactor: 24, // Degrees increment per scroll stage
    scatterDir: { x: 1.2, y: -0.4 },
  },
  // 2. Medium Top-Left: Upper-left corner periphery
  {
    id: 'med-top-left',
    className: '-left-[10%] sm:-left-[5%] -top-[10%] sm:-top-[6%] w-[260px] h-[260px] sm:w-[440px] sm:h-[440px]',
    baseOpacity: 0.18,
    speed: -0.045, // Counter-clockwise
    stageFactor: -32,
    scatterDir: { x: -1.0, y: -1.0 },
  },
  // 3. Small Floating Accent (Center): Drifting near the gap between cards (desktop only for performance)
  {
    id: 'small-center',
    className: 'hidden md:block left-[46%] sm:left-[48%] top-[42%] sm:top-[44%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] -translate-x-1/2 -translate-y-1/2',
    baseOpacity: 0.25,
    speed: 0.07, // Clockwise
    stageFactor: 42,
    scatterDir: { x: 0.2, y: 1.2 },
  },
  // 4. Medium Bottom-Right: Anchoring the lower right corner
  {
    id: 'med-bottom-right',
    className: '-right-[12%] sm:-right-[6%] -bottom-[12%] sm:-bottom-[8%] w-[280px] h-[280px] sm:w-[460px] sm:h-[460px]',
    baseOpacity: 0.18,
    speed: -0.04, // Counter-clockwise
    stageFactor: -28,
    scatterDir: { x: 1.1, y: 1.1 },
  },
  // 5. Large Background Halo (Far Left): Large faint watermark (desktop only for performance)
  {
    id: 'large-halo-left',
    className: 'hidden md:block -left-[20%] sm:-left-[14%] top-[24%] sm:top-[30%] w-[480px] h-[480px] sm:w-[700px] sm:h-[700px]',
    baseOpacity: 0.15,
    speed: 0.022, // Clockwise slow
    stageFactor: 18,
    scatterDir: { x: -1.3, y: 0.3 },
  },
];

export default function MandalaConstellationBackground({ currentStage = 0 }) {
  const containerRef = useRef(null);
  const mandalaRefs = useRef([]);
  const cachedChildrenRef = useRef([]);
  const animFrameRef = useRef(null);
  const currentStageRef = useRef(currentStage);

  useEffect(() => {
    currentStageRef.current = currentStage;
  }, [currentStage]);

  // Smooth interpolated stage and scatter progress state
  const stateRef = useRef({
    smoothStage: currentStage,
    scatterProgress: 0,
    startTime: performance.now(),
  });

  const mandalaData = useMemo(() => generateMandalaVectorData(), []);

  // Cache children elements once on mount to avoid querySelector in RAF
  useEffect(() => {
    cachedChildrenRef.current = mandalaRefs.current.map((domEl) => {
      if (!domEl) return null;
      return {
        domEl,
        outerPetals: domEl.querySelector('.mandala-outer-petals'),
        innerPetals: domEl.querySelector('.mandala-inner-petals'),
        rings: domEl.querySelector('.mandala-rings'),
        dust: domEl.querySelector('.mandala-dust'),
      };
    });
  }, []);

  useEffect(() => {
    let isRunning = true;

    const animateLoop = (now) => {
      if (!isRunning) return;

      const state = stateRef.current;
      const targetStage = currentStageRef.current;

      // 1. Smoothly lerp stage progression
      const stageDiff = targetStage - state.smoothStage;
      state.smoothStage += stageDiff * 0.12;

      // 2. Smoothly lerp Stage 8 scatter progress
      const targetScatter = targetStage === 8 ? 1.0 : 0.0;
      const scatterDiff = targetScatter - state.scatterProgress;
      state.scatterProgress += scatterDiff * (targetStage === 8 ? 0.09 : 0.14);

      const p = state.scatterProgress;
      const easeP = p * p; // Quadratic acceleration for explosive dispersal

      const elapsed = (now - state.startTime) * 0.001;

      // 3. Update all mandalas directly via GPU-accelerated transforms
      MANDALAS_CONFIG.forEach((config, idx) => {
        const cached = cachedChildrenRef.current[idx];
        const domEl = cached ? cached.domEl : mandalaRefs.current[idx];
        if (!domEl) return;

        // Calculate continuous rotational angle + scroll step increments
        const baseAngle = elapsed * config.speed * 60 + state.smoothStage * config.stageFactor;

        // Dispersal offsets when scattering in Stage 8
        const scatterTranslateX = config.scatterDir.x * easeP * 340;
        const scatterTranslateY = config.scatterDir.y * easeP * 340;
        const scatterScale = Math.max(0.01, 1 + easeP * 0.45);
        const scatterAngle = baseAngle + (config.speed > 0 ? 1 : -1) * easeP * 75;

        // Dynamic opacity: fades out to zero when reaching Stage 8
        const activeOpacity = Math.max(0, config.baseOpacity * (1 - p * 1.05));

        domEl.style.opacity = activeOpacity.toFixed(3);
        domEl.style.transform = `translate3d(${scatterTranslateX.toFixed(1)}px, ${scatterTranslateY.toFixed(1)}px, 0px) rotate(${scatterAngle.toFixed(2)}deg) scale(${scatterScale.toFixed(3)})`;

        // Deep breakdown of internal geometric segments (zero querySelector!)
        const outerPetalsEl = cached ? cached.outerPetals : null;
        const innerPetalsEl = cached ? cached.innerPetals : null;
        const ringsEl = cached ? cached.rings : null;
        const dustEl = cached ? cached.dust : null;

        if (outerPetalsEl) {
          outerPetalsEl.style.transform = `scale(${(1 + easeP * 0.7).toFixed(3)}) rotate(${(easeP * 40).toFixed(1)}deg)`;
          outerPetalsEl.style.opacity = Math.max(0, 1 - easeP * 1.1).toFixed(2);
        }
        if (innerPetalsEl) {
          innerPetalsEl.style.transform = `scale(${Math.max(0.01, 1 - easeP * 0.4).toFixed(3)}) rotate(${(-easeP * 60).toFixed(1)}deg)`;
          innerPetalsEl.style.opacity = Math.max(0, 1 - easeP * 1.2).toFixed(2);
        }
        if (ringsEl) {
          ringsEl.style.transform = `scale(${(1 + easeP * 1.1).toFixed(3)})`;
          ringsEl.style.opacity = Math.max(0, 1 - easeP * 1.25).toFixed(2);
        }
        if (dustEl) {
          const dustBloom = Math.sin(p * Math.PI);
          dustEl.style.opacity = Math.max(0, dustBloom * 0.95 * (1 - easeP * 0.5)).toFixed(2);
          dustEl.style.transform = `scale(${(1 + easeP * 2.2).toFixed(3)})`;
        }
      });

      animFrameRef.current = requestAnimationFrame(animateLoop);
    };

    animFrameRef.current = requestAnimationFrame(animateLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none transform-gpu"
      aria-hidden="true"
    >
      {MANDALAS_CONFIG.map((config, idx) => (
        <div
          key={config.id}
          ref={(el) => (mandalaRefs.current[idx] = el)}
          className={`absolute ${config.className} will-change-transform pointer-events-none`}
          style={{
            opacity: config.baseOpacity,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          <svg
            viewBox="-200 -200 400 400"
            className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(251,191,36,0.12)]"
          >
            <defs>
              {/* Luxury Gold & Amber Linear Gradient */}
              <linearGradient id={`goldGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id={`glowGrad-${idx}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Soft Golden Ambiance Glow */}
            <circle cx="0" cy="0" r="160" fill={`url(#glowGrad-${idx})`} opacity="0.35" />

            {/* A. Concentric Sacred Rings Group */}
            <g className="mandala-rings will-change-transform origin-center transition-transform duration-75">
              {/* Outer Perimeter Ring */}
              <circle cx="0" cy="0" r="195" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.8" />
              {/* Outer Dashed Orbit */}
              <circle cx="0" cy="0" r="185" stroke="#fde68a" strokeWidth="0.9" strokeDasharray="5 5" fill="none" opacity="0.6" />
              {/* Mid Concentric Ring */}
              <circle cx="0" cy="0" r="110" stroke="#f59e0b" strokeWidth="1.2" fill="none" opacity="0.75" />
              {/* Inner Sacred Ring */}
              <circle cx="0" cy="0" r="74" stroke="#d97706" strokeWidth="1.0" strokeDasharray="3 3" fill="none" opacity="0.7" />
              {/* Central Bindu Seed Ring */}
              <circle cx="0" cy="0" r="26" stroke="#fbbf24" strokeWidth="1.1" fill="none" opacity="0.85" />

              {/* 32 Celestial Golden Beads */}
              {mandalaData.beads.map((bead, bIdx) => (
                <circle key={`bead-${bIdx}`} cx={bead.x} cy={bead.y} r="2.0" fill="#fde68a" opacity="0.85" />
              ))}

              {/* 16 Radial Spokes */}
              {mandalaData.spokes.map((spoke, sIdx) => (
                <line
                  key={`spoke-${sIdx}`}
                  x1={spoke.x1}
                  y1={spoke.y1}
                  x2={spoke.x2}
                  y2={spoke.y2}
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  opacity="0.55"
                />
              ))}

              {/* Ashtalakshmi Sacred Octagram Star */}
              <polygon
                points={mandalaData.starPolygon}
                stroke="#fde68a"
                strokeWidth="0.9"
                fill="none"
                opacity="0.6"
              />
            </g>

            {/* B. Outer 16 Lotus Petals Group */}
            <g className="mandala-outer-petals will-change-transform origin-center">
              {mandalaData.outerPetals.map((petal, pIdx) => (
                <path
                  key={`outer-p-${pIdx}`}
                  d={petal.path}
                  stroke={`url(#goldGrad-${idx})`}
                  strokeWidth="1.1"
                  fill="#d97706"
                  fillOpacity="0.04"
                />
              ))}
            </g>

            {/* C. Inner 8 Blooming Lotus Petals Group */}
            <g className="mandala-inner-petals will-change-transform origin-center">
              {mandalaData.innerPetals.map((petal, pIdx) => (
                <path
                  key={`inner-p-${pIdx}`}
                  d={petal.path}
                  stroke={`url(#goldGrad-${idx})`}
                  strokeWidth="1.2"
                  fill="#fbbf24"
                  fillOpacity="0.06"
                />
              ))}
              {/* Center Bindu Jewel */}
              <circle cx="0" cy="0" r="6.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            </g>

            {/* D. Stage 8 Golden Dust Dispersal Particles */}
            <g className="mandala-dust will-change-transform origin-center opacity-0 pointer-events-none">
              {mandalaData.dustParticles.map((dust, dIdx) => (
                <circle
                  key={`dust-${dIdx}`}
                  cx={dust.x}
                  cy={dust.y}
                  r={dust.size}
                  fill="#fde68a"
                  className="filter drop-shadow-[0_0_4px_#fbbf24]"
                />
              ))}
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}

