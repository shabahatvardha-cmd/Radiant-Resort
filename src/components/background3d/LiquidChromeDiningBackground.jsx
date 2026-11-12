import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './StudioLightingEnvironment.js';
import { createLiquidSculpture } from './LiquidSculptureMesh.js';

/**
 * LiquidChromeDiningBackground
 * 
 * Persistent 3D liquid gold sculpture background specifically integrated into
 * Stage 4 (The Seven Scentric Fine Dining) of The Radiant Hotel & Resort.
 * 
 * - Polished solid metallic gold sculpture with realistic PBR champagne-gold reflections.
 * - Deep, clean, consistent black background (#050505) with zero washed-out gradients.
 * - Pure WebGL / Three.js implementation (zero React-reconciliation overhead).
 * - Bi-directional scrub-controlled animation mapped to scroll progress.
 * - Organic deformation, 4-piece fragmentation, 3D depth movement, and seamless reassembly.
 * - Fully isolated z-0 layer with pointer-events: none, preserving 100% of website interactivity.
 */
export default function LiquidChromeDiningBackground({ globalProgress = 7.0 }) {
  const containerRef = useRef(null);
  const targetURef = useRef(0.5);
  const currentURef = useRef(0.5);
  const animFrameRef = useRef(null);
  const sceneElementsRef = useRef(null);

  // Map global continuous timeline progress into Dining-local [0, 1] range
  // Stage 4 is centered at 7.00 with dwell plateau [6.72, 7.28] and visibility [6.42, 7.58]
  useEffect(() => {
    const diningStart = 6.42;
    const diningEnd = 7.58;
    const normalized = (globalProgress - diningStart) / (diningEnd - diningStart);
    targetURef.current = Math.max(0, Math.min(1, normalized));
  }, [globalProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback for browsers without WebGL
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Scene with pure deep black background (#050505)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    // Responsive camera position: balance framing across mobile, tablet, and desktop
    const updateCameraPos = (w) => {
      if (w < 768) {
        camera.position.set(0.0, 0.1, 8.5); // centered on mobile
      } else if (w < 1200) {
        camera.position.set(0.3, 0.0, 7.2); // tablet view
      } else {
        camera.position.set(0.5, 0.0, 6.4); // desktop: elegant balance behind content
      }
    };
    updateCameraPos(width);

    // Studio Environment & Calibrated Gold Lighting Rig
    const lighting = setupStudioLighting(scene, renderer);

    // The Unified Liquid Metallic Gold Sculpture
    const sculpture = createLiquidSculpture();
    scene.add(sculpture.group);

    sceneElementsRef.current = {
      renderer,
      scene,
      camera,
      lighting,
      sculpture,
    };

    // Animation loop with smooth scrub interpolation
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth bidirectional scrub interpolation (eliminates sudden scroll jitter)
      const lerpSpeed = prefersReducedMotion ? 1.0 : 0.12;
      currentURef.current += (targetURef.current - currentURef.current) * lerpSpeed;

      // Update the 6-phase deformation, fragmentation and reassembly
      sculpture.updateScrollAnimation(currentURef.current, elapsedTime);

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Resize Observer for responsive canvas sizing
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
        sceneElementsRef.current.lighting.dispose();
        sceneElementsRef.current.sculpture.dispose();
      }

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#050505]"
      style={{ backgroundColor: '#050505' }}
    />
  );
}
