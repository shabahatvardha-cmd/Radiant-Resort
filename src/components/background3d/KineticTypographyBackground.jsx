import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { activePaletteConfig } from './typographyConfig.js';
import { createKineticTypographyScene } from './KineticTypographyScene.js';

/**
 * KineticTypographyBackground
 * 
 * Persistent editorial kinetic typography background for the Malibu Rooftop section.
 * - Bold, flat 2D vector typography (zero extrusion, zero bevels).
 * - Clear hierarchy (MALIBU as primary anchor, other words 35-45% smaller).
 * - Generous spacing: zero collisions, every word has dedicated visual space.
 * - Solid-colour background with high optical contrast (zero gradients, zero textures).
 * - 6-stage deterministic scroll choreography scrubbed by GSAP.
 * - Stops and freezes immediately when scrolling stops; reverses when scrolling backwards.
 * - Zero idle autoplay drift.
 * - Responsive camera and group scaling across all screen sizes.
 */
export default function KineticTypographyBackground({ globalProgress = 6.0 }) {
  const containerRef = useRef(null);
  const targetURef = useRef(0.5);
  const currentURef = useRef(0.5);
  const animFrameRef = useRef(null);
  const sceneElementsRef = useRef(null);

  // Map global continuous timeline progress into Malibu-local [0, 1] range
  // Stage 3 is centered at 6.00 with dwell plateau [5.72, 6.28] and visibility [5.42, 6.58]
  useEffect(() => {
    const malibuStart = 5.42;
    const malibuEnd = 6.58;
    const normalized = (globalProgress - malibuStart) / (malibuEnd - malibuStart);
    targetURef.current = Math.max(0, Math.min(1, normalized));
  }, [globalProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
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
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(activePaletteConfig.background);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

    // Editorial Kinetic Typography System
    const kineticTypography = createKineticTypographyScene(scene);

    const updateCameraAndScale = (w, h) => {
      const aspect = w / (h || 1);
      let camZ = 7.5;
      let groupScale = 1.0;

      if (aspect < 0.75) {
        // Mobile portrait: scale group and step camera back so all words breathe
        camZ = 10.5;
        groupScale = 0.70;
      } else if (aspect < 1.1) {
        // Tablet portrait or square
        camZ = 9.2;
        groupScale = 0.82;
      } else if (w < 1280) {
        // Compact desktop / laptop
        camZ = 8.0;
        groupScale = 0.90;
      } else {
        // Large desktop widescreen
        camZ = 7.5;
        groupScale = 1.0;
      }

      camera.position.set(0.0, 0.0, camZ);
      kineticTypography.setResponsiveScale(groupScale);
    };

    updateCameraAndScale(width, height);

    sceneElementsRef.current = {
      renderer,
      scene,
      camera,
      kineticTypography,
    };

    const render = () => {
      // Smooth scrub interpolation (gentle, stately pace)
      const lerpSpeed = prefersReducedMotion ? 1.0 : 0.06;
      currentURef.current += (targetURef.current - currentURef.current) * lerpSpeed;

      // Update 6-stage typography positions and rotations strictly based on scroll progress
      kineticTypography.updateScroll(currentURef.current);

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      updateCameraAndScale(w, h);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);

      if (sceneElementsRef.current) {
        sceneElementsRef.current.kineticTypography.dispose();
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
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{ backgroundColor: activePaletteConfig.background }}
    />
  );
}
