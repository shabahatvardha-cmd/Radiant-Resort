import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createFloatingFoodUniverse } from './FloatingFoodUniverseScene.js';

/**
 * FloatingFoodUniverseDiningBackground
 * 
 * Scroll-Driven Floating Food Universe specifically integrated into
 * Stage 4 (The Seven Scentric Fine Dining) of The Radiant Hotel & Resort.
 * 
 * - Stylized 3D animated food models (strawberries, cakes, ice creams, citrus, nuts, pasta, pastries).
 * - Smooth forms, tactile PBR materials, soft lighting, appealing colors, and subtle shadows.
 * - Deep plum / muted purple background (#220F26) with soft studio lighting.
 * - Strict Food Separation: Every object occupies its own spatial cell; ZERO overlapping or collisions.
 * - 100% Scroll-Driven Scrubbing: Scrolling down advances, scrolling up reverses, stopping freezes.
 * - Sits behind website content (z-0, pointer-events: none), preserving 100% of website interactivity.
 */
export default function FloatingFoodUniverseDiningBackground({ globalProgress = 7.0 }) {
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

    // Scene with luxurious Deep Plum background (#220F26)
    const scene = new THREE.Scene();
    const deepPlumColor = new THREE.Color(0x220F26);
    scene.background = deepPlumColor;

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    // Responsive camera position: balances framing across screen sizes
    const updateCameraPos = (w) => {
      if (w < 768) {
        camera.position.set(0.0, 0.0, 8.8); // mobile: expanded view
      } else if (w < 1200) {
        camera.position.set(0.0, 0.0, 7.6); // tablet
      } else {
        camera.position.set(0.0, 0.0, 6.8); // desktop: perfectly framed around content
      }
    };
    updateCameraPos(width);

    // Soft Studio Lighting Rig Calibrated for Food Models & Deep Plum Backdrop
    const ambientLight = new THREE.AmbientLight(0xFFE8D6, 1.25);
    scene.add(ambientLight);

    // Key Light: Warm golden studio light from top-left
    const keyLight = new THREE.DirectionalLight(0xFFF1D0, 2.2);
    keyLight.position.set(-4.5, 6.0, 5.5);
    scene.add(keyLight);

    // Fill Light: Soft pastel lavender from right
    const fillLight = new THREE.DirectionalLight(0xD1C4E9, 1.3);
    fillLight.position.set(5.0, -2.5, 4.0);
    scene.add(fillLight);

    // Rim Backlight: Crisp champagne highlight from behind
    const rimLight = new THREE.DirectionalLight(0xFFFDE7, 2.0);
    rimLight.position.set(0.0, 4.0, -4.5);
    scene.add(rimLight);

    // Ground Bounce Light: Warm violet bounce
    const bounceLight = new THREE.DirectionalLight(0x7B1FA2, 0.7);
    bounceLight.position.set(0.0, -5.0, 3.0);
    scene.add(bounceLight);

    // The Floating Food Universe Scene (16 stylized items)
    const foodUniverse = createFloatingFoodUniverse();
    scene.add(foodUniverse.group);

    sceneElementsRef.current = {
      renderer,
      scene,
      camera,
      ambientLight,
      keyLight,
      fillLight,
      rimLight,
      bounceLight,
      foodUniverse,
    };

    // Animation Loop with smooth bidirectional scrub
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth bidirectional scrub interpolation
      const lerpSpeed = prefersReducedMotion ? 1.0 : 0.12;
      currentURef.current += (targetURef.current - currentURef.current) * lerpSpeed;

      // Update food universe scroll animation & gentle micro-idle float
      foodUniverse.updateScroll(currentURef.current, elapsedTime);

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
        sceneElementsRef.current.foodUniverse.dispose();
        sceneElementsRef.current.ambientLight.dispose();
        sceneElementsRef.current.keyLight.dispose();
        sceneElementsRef.current.fillLight.dispose();
        sceneElementsRef.current.rimLight.dispose();
        sceneElementsRef.current.bounceLight.dispose();
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
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#220F26]"
      style={{ backgroundColor: '#220F26' }}
    />
  );
}

