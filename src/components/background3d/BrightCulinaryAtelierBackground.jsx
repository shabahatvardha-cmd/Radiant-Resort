import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createBrightCulinaryAtelierScene } from './BrightCulinaryAtelierScene.js';

/**
 * BrightCulinaryAtelierBackground
 * 
 * Floating Culinary Atelier 3D Environment for The Seven Scentric Fine Dining
 * in The Radiant Hotel & Resort.
 * 
 * - Aesthetics: Warm ivory (#FBF8F3), cream, champagne, pale sandstone, soft natural wood.
 * - Natural daylight illumination with realistic soft ambient fill.
 * - 9 genuinely separate 3D visual layers:
 *   1. Architectural sandstone arches & wall colonnade.
 *   2. Sculptural pedestal dining table & bentwood chair.
 *   3. Artisan porcelain plates & ceramic bowls.
 *   4. Brushed champagne gold cutlery (forks, knives, spoons).
 *   5. Draped natural flax linen napkin & wooden grinders.
 *   6. Transparent crystalline glassware & carafe with physical refractions.
 *   7. Floating culinary botanicals & spices (rosemary, star anise, citrus, olive leaves).
 *   8. Fluted brass pendant lamp & architectural accents.
 *   9. Editorial culinary photography hero visual.
 * - 100% scroll-driven bidirectional assembly & choreography.
 */
export default function BrightCulinaryAtelierBackground({ globalProgress = 7.0, progress }) {
  // Strict Stage Isolation Guard:
  // BrightCulinaryAtelierBackground belongs exclusively to The Seven Scentric Fine Dining.
  // When inside SpatialScrollStage on the Home Page, it must ONLY mount when globalProgress is around milestone 7.0 (6.30 to 7.70).
  // If globalProgress is outside this range (e.g. at Stage 0 Overview ~0.0), return null so it can NEVER render in the Overview section.
  const isDiningActive = typeof progress !== 'undefined' || (typeof globalProgress === 'number' && globalProgress >= 6.3 && globalProgress <= 7.7);

  if (!isDiningActive) {
    return null;
  }

  const containerRef = useRef(null);
  const targetURef = useRef(0.5);
  const currentURef = useRef(0.5);
  const animFrameRef = useRef(null);
  const sceneElementsRef = useRef(null);

  // Map global continuous scroll progress into Dining-local [0, 1] range
  // Stage 4 is centered at 7.00, entry around 6.35, dwell ~7.00, exit ~7.65
  useEffect(() => {
    const diningStart = 6.35;
    const diningEnd = 7.65;
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
      return; // Graceful fallback
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

    // Scene with bright, warm ivory atelier background (#FAF6F0)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFAF6F0);

    // Perspective Camera calibrated for editorial depth
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    const updateCameraPos = (w) => {
      if (w < 768) {
        camera.position.set(0.0, 0.0, 8.8); // mobile: expanded framing
      } else if (w < 1200) {
        camera.position.set(0.0, 0.0, 7.8); // tablet
      } else {
        camera.position.set(0.0, 0.0, 6.8); // desktop: perfectly framed around content
      }
    };
    updateCameraPos(width);

    // =========================================================================
    // NATURAL DAYLIGHT STUDIO LIGHTING RIG
    // =========================================================================

    // 1. Soft Warm Sky Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xFBF7EE, 1.45);
    scene.add(ambientLight);

    // 2. Main Sunbeam: Warm natural morning sunlight from top-left
    const sunLight = new THREE.DirectionalLight(0xFFFBF0, 2.4);
    sunLight.position.set(-5.0, 7.5, 6.0);
    scene.add(sunLight);

    // 3. Soft Sky Bounce Fill from right
    const skyBounce = new THREE.DirectionalLight(0xEBF2F6, 1.15);
    skyBounce.position.set(6.0, 2.5, 4.0);
    scene.add(skyBounce);

    // 4. Warm Sandstone Floor Bounce
    const floorBounce = new THREE.DirectionalLight(0xE6D9C8, 0.75);
    floorBounce.position.set(0.0, -5.5, 2.5);
    scene.add(floorBounce);

    // 5. Specular Rim Highlight for Glassware & Gold Cutlery Edges
    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.9);
    rimLight.position.set(1.0, 5.0, -4.5);
    scene.add(rimLight);

    // Build the 9-Layer Floating Culinary Atelier 3D Scene
    const atelierScene = createBrightCulinaryAtelierScene();
    scene.add(atelierScene.group);

    sceneElementsRef.current = {
      renderer,
      scene,
      camera,
      ambientLight,
      sunLight,
      skyBounce,
      floorBounce,
      rimLight,
      atelierScene,
    };

    // Animation Loop with smooth bidirectional scrub
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth bidirectional scrub interpolation
      const lerpSpeed = prefersReducedMotion ? 1.0 : 0.07;
      currentURef.current += (targetURef.current - currentURef.current) * lerpSpeed;

      // Update 3D scene assembly choreography & micro-idle drift
      atelierScene.updateScroll(currentURef.current, elapsedTime);

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
        sceneElementsRef.current.atelierScene.dispose();
        sceneElementsRef.current.ambientLight.dispose();
        sceneElementsRef.current.sunLight.dispose();
        sceneElementsRef.current.skyBounce.dispose();
        sceneElementsRef.current.floorBounce.dispose();
        sceneElementsRef.current.rimLight.dispose();
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
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FAF6F0]"
      style={{ backgroundColor: '#FAF6F0' }}
    />
  );
}

