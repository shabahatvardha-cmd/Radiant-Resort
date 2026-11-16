import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createFitnessGym3DScene } from './FitnessGym3DScene.js';

/**
 * FitnessArchitecturalBackground (3D Gym Experience)
 * 
 * Cinematic Scroll-Driven 3D Gym Environment for Radiant Hotel & Resort.
 * 
 * 5 Depth Layers:
 * - Layer 1: Distant Equipment Silhouettes (Power rack, cable crossover tower)
 * - Layer 2: Floating 3D Olympic Weight Plates (Rotating around Z-axis linked to scroll)
 * - Layer 3: 3D Dumbbells (Knurled handles, graphite heads travelling in perspective)
 * - Layer 4: Barbell Assembly Signature Sequence (Plates & collars lock onto sleeve)
 * - Layer 5: Athletic Movement Trajectories & Performance Metrics (SVG overlay)
 */
export default function FitnessArchitecturalBackground({ globalProgress = 8.0 }) {
  // Strict Stage Isolation Guard: active throughout milestone 8.0 range (7.25 to 8.95)
  const isVisible = globalProgress >= 7.25 && globalProgress <= 8.95;

  const containerRef = useRef(null);
  const targetURef = useRef(0.5);
  const currentURef = useRef(0.5);
  const animFrameRef = useRef(null);
  const sceneElementsRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Map global continuous scroll progress into Fitness-local [0, 1] range:
  // Stage 5 active range: 7.25 (entry) -> 8.00 (resting dwell) -> 8.95 (exit)
  useEffect(() => {
    const fitStart = 7.25;
    const fitEnd = 8.95;
    const normalized = (globalProgress - fitStart) / (fitEnd - fitStart);
    targetURef.current = Math.max(0, Math.min(1, normalized));
  }, [globalProgress]);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Scene with Deep Luxury Hotel Background (#07100F)
    const scene = new THREE.Scene();

    // Perspective Camera calibrated for cinematic depth
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    const updateCameraPos = (w) => {
      if (w < 768) {
        camera.position.set(0.0, 0.0, 10.2); // Mobile: broader framing
      } else if (w < 1200) {
        camera.position.set(0.0, 0.0, 9.0);  // Tablet
      } else {
        camera.position.set(0.0, 0.0, 8.0);  // Desktop
      }
    };
    updateCameraPos(width);

    // =========================================================================
    // CINEMATIC STRENGTH CLUB LIGHTING RIG
    // =========================================================================
    // 1. Soft Forest-Green Ambient Light (Preserves deep shadows)
    const ambientLight = new THREE.AmbientLight(0x0B1614, 1.4);
    scene.add(ambientLight);

    // 2. Crisp Overhead Linear Key Light (Gives knurled steel and bumper bevels bright sheen)
    const keyLight = new THREE.DirectionalLight(0xEDF2F6, 2.6);
    keyLight.position.set(2.5, 6.0, 4.5);
    scene.add(keyLight);

    // 3. Warm Champagne Gold Rim Light (Strikes plate rims and barbell sleeves from back/side)
    const rimLight = new THREE.DirectionalLight(0xD6B878, 3.2);
    rimLight.position.set(-5.0, 3.5, -3.0);
    scene.add(rimLight);

    // 4. Secondary Forest-Green Fill Light from Right
    const fillLight = new THREE.DirectionalLight(0x172D29, 1.2);
    fillLight.position.set(4.5, -2.5, 2.0);
    scene.add(fillLight);

    // 5. Floor Warm Bronze Specular Bounce
    const floorBounce = new THREE.DirectionalLight(0x8C6D37, 0.7);
    floorBounce.position.set(0.0, -4.5, 2.0);
    scene.add(floorBounce);

    // Instantiate 3D Gym Scene
    const gymScene = createFitnessGym3DScene();
    scene.add(gymScene.group);

    sceneElementsRef.current = {
      renderer,
      scene,
      camera,
      ambientLight,
      keyLight,
      rimLight,
      fillLight,
      floorBounce,
      gymScene,
    };

    // Animation Render Loop with smooth lerp
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth bidirectional scrub lerp
      const lerpSpeed = reducedMotion ? 1.0 : 0.08;
      currentURef.current += (targetURef.current - currentURef.current) * lerpSpeed;

      // Update 3D Gym choreography (plates, dumbbells, barbell assembly)
      gymScene.updateScroll(currentURef.current, elapsedTime);

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      updateCameraPos(w);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);

      if (sceneElementsRef.current) {
        sceneElementsRef.current.gymScene.dispose();
        sceneElementsRef.current.ambientLight.dispose();
        sceneElementsRef.current.keyLight.dispose();
        sceneElementsRef.current.rimLight.dispose();
        sceneElementsRef.current.fillLight.dispose();
        sceneElementsRef.current.floorBounce.dispose();
      }

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [isVisible, reducedMotion]);

  if (!isVisible) return null;

  // Local delta relative to resting center (8.00)
  const delta = globalProgress - 8.0;
  const absDelta = Math.abs(delta);

  // Background atmosphere timeline:
  // 7.25–7.38: Background atmosphere enters
  // 7.38–8.80: Full solid atmosphere
  // 8.80–8.95: Background clears for Guest Chronicles
  let bgOpacity = 1;
  if (globalProgress < 7.38) {
    const t = Math.max(0, Math.min(1, (globalProgress - 7.25) / 0.13));
    bgOpacity = t * t * (3 - 2 * t);
  } else if (globalProgress > 8.80) {
    const t = Math.max(0, Math.min(1, (globalProgress - 8.80) / 0.15));
    bgOpacity = 1.0 - t * t * (3 - 2 * t);
  } else {
    bgOpacity = 1.0;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform z-0"
      style={{ opacity: bgOpacity }}
      aria-hidden="true"
    >
      {/* Deep luxury hotel background: #07100F */}
      <div className="absolute inset-0 bg-[#07100F]" />

      {/* Atmospheric Radial Gradient Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 35% 45%, rgba(11, 22, 20, 0.9) 0%, rgba(7, 16, 15, 0.98) 75%)',
        }}
      />

      {/* Radiant Champagne/Gold Key Ambient Bloom behind Plate Action */}
      <div
        className="absolute top-1/2 left-[28%] -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(214, 184, 120, 0.25) 0%, transparent 70%)',
          transform: `scale(${1 - absDelta * 0.1})`,
        }}
      />

      {/* Pure 3D WebGL Canvas Container: Olympic Plates, Dumbbells & Assembling Barbell */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />
    </div>
  );
}
