import React, { useEffect, useRef } from 'react';

/**
 * CinematicAtmosphericDust
 * 
 * High-performance HTML5 Canvas-based atmospheric dust particle system.
 * Simulates microscopic dust motes suspended in warm hotel room sunlight:
 * - Subtle Brownian drift with gentle thermal convection currents.
 * - Volumetric sunbeam illumination field: particles illuminate dynamically
 *   as they drift through soft window light rays.
 * - Multi-tier depth (foreground, midground, background).
 * - Automatic pause via IntersectionObserver when off-screen.
 * - Respects prefers-reduced-motion.
 * - Zero interference with scrolling or 3D flip kinematics (pointer-events: none).
 */
export default function CinematicAtmosphericDust({
  theme = 'champagneLight', // 'champagneLight' (for cream/ivory) or 'champagneDark' (for dark)
  density = 'low',          // 'low' (~42 particles) or 'medium' (~65 particles)
  hasSunlightRay = true,    // Soft volumetric light ray overlay
  speed = 1.0,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Determine particle count based on density and viewport size
    const particleCount = density === 'low' ? 44 : 68;

    // Color definitions based on theme
    const isLight = theme === 'champagneLight';

    // Particle pool
    const particles = [];

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width));
      height = Math.max(300, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const depthTier = Math.random(); // 0..1 (depth ratio)
      let radius;
      let baseAlpha;
      let speedFactor;

      if (depthTier < 0.5) {
        // Background tier (deep, fine, barely visible)
        radius = 0.6 + Math.random() * 0.45;
        baseAlpha = isLight ? 0.12 + Math.random() * 0.14 : 0.15 + Math.random() * 0.18;
        speedFactor = 0.2 + Math.random() * 0.2;
      } else if (depthTier < 0.85) {
        // Midground tier
        radius = 1.0 + Math.random() * 0.55;
        baseAlpha = isLight ? 0.22 + Math.random() * 0.18 : 0.28 + Math.random() * 0.22;
        speedFactor = 0.35 + Math.random() * 0.25;
      } else {
        // Foreground tier (illuminated dust motes)
        radius = 1.4 + Math.random() * 0.7;
        baseAlpha = isLight ? 0.35 + Math.random() * 0.22 : 0.45 + Math.random() * 0.25;
        speedFactor = 0.45 + Math.random() * 0.35;
      }

      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 600),
        radius,
        baseAlpha,
        speedFactor,
        depthTier,
        // Thermal upward & slight lateral convection drift
        vx: (Math.random() - 0.45) * 0.3 * speed,
        vy: -(0.18 + Math.random() * 0.32) * speed * speedFactor,
        wobbleSpeed: 0.008 + Math.random() * 0.015,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: 0.25 + Math.random() * 0.45,
        breathingSpeed: 0.01 + Math.random() * 0.02,
        breathingPhase: Math.random() * Math.PI * 2,
      });
    }

    // Scroll listener for subtle spatial parallax
    let lastScrollY = window.scrollY;
    let scrollParallaxOffset = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Gentle damping to prevent sudden particle jumping
      scrollParallaxOffset += scrollDelta * 0.08;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let lastTime = performance.now();

    // Render loop
    const render = (time) => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Parallax decay
      scrollParallaxOffset *= 0.92;

      // Sunbeam ray geometry (simulating light entering from top-left at ~38deg angle)
      // Centerline of beam: y - 0.7*x - height*0.1 = 0
      const beamSlope = 0.65;
      const beamCenterOffset = height * 0.15;
      const beamWidth = Math.max(260, width * 0.45);

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Brownian turbulence wobble
        p.wobblePhase += p.wobbleSpeed;
        const wobbleX = Math.sin(p.wobblePhase) * p.wobbleAmp;
        const wobbleY = Math.cos(p.wobblePhase * 0.8) * (p.wobbleAmp * 0.5);

        // Update positions
        p.x += (p.vx + wobbleX * 0.3) * (60 * dt);
        p.y += (p.vy + wobbleY * 0.2) * (60 * dt) - scrollParallaxOffset * (p.speedFactor * 0.4);

        // Wrap around boundaries with generous margin
        if (p.x < -30) p.x = width + 30;
        else if (p.x > width + 30) p.x = -30;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        } else if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        // Calculate illumination from window sunlight beam
        // Perpendicular distance to the sunbeam centerline
        const rayDist = Math.abs(p.y - (beamSlope * p.x + beamCenterOffset)) / Math.sqrt(1 + beamSlope * beamSlope);
        let illumination = 0;
        if (rayDist < beamWidth) {
          const normDist = rayDist / beamWidth;
          // Cosine falloff from center of sunbeam
          illumination = Math.max(0, 0.5 * (1 + Math.cos(Math.PI * normDist)));
        }

        // Opacity breathing
        p.breathingPhase += p.breathingSpeed;
        const breath = 1.0 + Math.sin(p.breathingPhase) * 0.22;

        // Final calculated particle alpha
        const finalAlpha = Math.min(
          0.85,
          p.baseAlpha * breath * (1.0 + illumination * 0.9)
        );

        // Render delicate dust mote
        ctx.beginPath();
        const drawRadius = p.radius * (1.0 + illumination * 0.2);
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);

        if (isLight) {
          // On light backgrounds (#FAF5EE / cream):
          // Unilluminated: warm muted bronze/gold
          // Illuminated by sunbeam: bright radiant champagne gold
          if (illumination > 0.35 && p.depthTier > 0.6) {
            ctx.fillStyle = `rgba(212, 160, 48, ${finalAlpha})`;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = `rgba(175, 135, 75, ${finalAlpha})`;
            ctx.shadowBlur = 0;
          }
        } else {
          // On dark backgrounds (#0E1513 / forest-950):
          if (illumination > 0.35 && p.depthTier > 0.5) {
            ctx.fillStyle = `rgba(255, 230, 160, ${finalAlpha})`;
            ctx.shadowColor = 'rgba(240, 205, 110, 0.45)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(235, 220, 195, ${finalAlpha})`;
            ctx.shadowBlur = 0;
          }
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [theme, density, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Soft Volumetric Sunlight Ray Atmosphere (Simulates daylight streaming through grand hotel suite windows) */}
      {hasSunlightRay && (
        <>
          {/* Subtle Ambient Sunlight Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_20%_15%,rgba(212,175,55,0.07),transparent_75%)] pointer-events-none" />
          {/* Soft Diagonal Sunlight Shaft */}
          <div className="absolute inset-0 bg-[linear-gradient(132deg,rgba(255,248,225,0.06)_0%,rgba(212,175,55,0.03)_35%,transparent_65%)] pointer-events-none" />
        </>
      )}

      {/* Floating Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

