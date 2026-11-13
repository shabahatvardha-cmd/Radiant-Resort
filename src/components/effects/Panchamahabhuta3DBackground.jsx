import React, { useEffect, useRef } from 'react';

const STAGE_PALETTES = [
  { bg: '#0c0a09', deepGlow: 'rgba(217, 119, 6, 0.18)', midGlow: 'rgba(245, 230, 211, 0.1)', particle: 'rgba(251, 191, 36, 0.5)' },
  { bg: '#090d12', deepGlow: 'rgba(30, 58, 138, 0.22)', midGlow: 'rgba(180, 83, 9, 0.14)', particle: 'rgba(147, 197, 253, 0.4)' },
  { bg: '#120c08', deepGlow: 'rgba(194, 65, 12, 0.2)', midGlow: 'rgba(234, 179, 8, 0.12)', particle: 'rgba(253, 186, 116, 0.5)' },
  { bg: '#080c10', deepGlow: 'rgba(14, 116, 144, 0.2)', midGlow: 'rgba(79, 70, 229, 0.15)', particle: 'rgba(125, 211, 252, 0.5)' },
  { bg: '#0f0e0d', deepGlow: 'rgba(120, 53, 15, 0.22)', midGlow: 'rgba(68, 64, 60, 0.18)', particle: 'rgba(214, 211, 209, 0.4)' },
  { bg: '#0a0a0b', deepGlow: 'rgba(87, 83, 78, 0.22)', midGlow: 'rgba(202, 138, 4, 0.14)', particle: 'rgba(234, 179, 8, 0.4)' },
  { bg: '#0d0c0a', deepGlow: 'rgba(202, 138, 4, 0.18)', midGlow: 'rgba(244, 244, 245, 0.1)', particle: 'rgba(253, 230, 138, 0.5)' },
  { bg: '#140a08', deepGlow: 'rgba(220, 38, 38, 0.18)', midGlow: 'rgba(245, 158, 11, 0.22)', particle: 'rgba(252, 211, 77, 0.6)' },
  { bg: '#0c0a09', deepGlow: 'rgba(180, 83, 9, 0.15)', midGlow: 'rgba(217, 119, 6, 0.1)', particle: 'rgba(251, 191, 36, 0.4)' }
];

export default function Panchamahabhuta3DBackground({ currentStage = 0 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const stageRef = useRef(currentStage);

  // Keep stageRef updated smoothly without re-initializing particles on every stage change
  useEffect(() => {
    stageRef.current = currentStage;
  }, [currentStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial 45 Prana dust particles with 3D Z-depth values
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1.3 + 0.2,
      radius: Math.random() * 2.2 + 0.5,
      speedY: -Math.random() * 0.25 - 0.05,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI
    }));

    let time = 0;
    const render = () => {
      time += 0.012;
      const stageIdx = Math.max(0, Math.min(STAGE_PALETTES.length - 1, Math.round(stageRef.current)));
      const palette = STAGE_PALETTES[stageIdx] || STAGE_PALETTES[0];

      // Smooth mouse parallax easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Base background fill
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      // Layer 1: Deep background glow orb (moves opposite to mouse)
      const deepX = width * 0.5 - mx * 40 + Math.sin(time * 0.4) * 80;
      const deepY = height * 0.5 - my * 40 + Math.cos(time * 0.3) * 60;
      const gradDeep = ctx.createRadialGradient(deepX, deepY, 50, width * 0.5, height * 0.5, width * 0.8);
      gradDeep.addColorStop(0, palette.deepGlow);
      gradDeep.addColorStop(1, 'transparent');
      ctx.fillStyle = gradDeep;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Mid-ground light field (moves moderately with mouse)
      const midX = width * 0.7 + mx * 60 + Math.cos(time * 0.5) * 100;
      const midY = height * 0.3 + my * 60 + Math.sin(time * 0.6) * 80;
      const gradMid = ctx.createRadialGradient(midX, midY, 20, width * 0.7, height * 0.3, width * 0.6);
      gradMid.addColorStop(0, palette.midGlow);
      gradMid.addColorStop(1, 'transparent');
      ctx.fillStyle = gradMid;
      ctx.fillRect(0, 0, width, height);

      // Layer 3: Foreground 3D Prana dust particles with Z-depth scaling
      particles.forEach((p) => {
        p.y += p.speedY * p.z;
        if (p.y < -20) p.y = height + 20;

        const renderX = p.x + mx * 25 * p.z;
        const renderY = p.y + my * 25 * p.z;

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = palette.particle;
        ctx.globalAlpha = p.opacity * p.z * (0.6 + Math.sin(time * 2 + p.pulse) * 0.4);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Permanent Cinematic Vignette (rgba(0,0,0,0) to rgba(0,0,0,0.65))
      const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.3, width / 2, height / 2, width * 0.85);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

