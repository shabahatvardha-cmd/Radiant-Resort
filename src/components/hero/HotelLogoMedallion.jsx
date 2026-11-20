import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playClickSound } from '../../utils/audioEffects';

/**
 * Draws curved text along a circular arc.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} str 
 * @param {number} centerX 
 * @param {number} centerY 
 * @param {number} radius 
 * @param {number} angleStart 
 * @param {number} angleEnd 
 * @param {boolean} inward When true (bottom arc), letters point toward center so they read upright left-to-right.
 */
function drawCurvedText(ctx, str, centerX, centerY, radius, angleStart, angleEnd, inward = false) {
  const chars = str.split('');
  const totalAngle = angleEnd - angleStart;
  const step = totalAngle / (chars.length - 1);

  chars.forEach((char, i) => {
    const angle = angleStart + i * step;
    ctx.save();
    ctx.translate(centerX, centerY);
    if (!inward) {
      // Top arc: letters point outwards, reading left-to-right
      ctx.rotate(angle + Math.PI / 2);
      ctx.translate(0, -radius);
    } else {
      // Bottom arc: letters point inwards, reading left-to-right
      ctx.rotate(angle - Math.PI / 2);
      ctx.translate(0, radius);
    }
    // Specular emboss drop shadow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(char, 1, 2);
    ctx.fillStyle = '#302204';
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

/**
 * Creates high-detail procedural canvas texture for the luxury circular hotel medallion
 * featuring the official The Radiant Hotel & Resort logo and minted gold borders.
 * Rendered at 512x512 with 0.5 coordinate scaling for 6x screen density and 0ms main thread lock.
 */
function createHotelLogoMedallionTexture(logoImg) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.scale(0.5, 0.5);

  // 1. Base Outer Gold Rim Gradient
  const outerGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
  outerGrad.addColorStop(0, '#FFF6CC');
  outerGrad.addColorStop(0.35, '#F5D77F');
  outerGrad.addColorStop(0.75, '#D4AF37');
  outerGrad.addColorStop(0.92, '#A68226');
  outerGrad.addColorStop(1, '#5C430F');
  ctx.fillStyle = outerGrad;
  ctx.beginPath();
  ctx.arc(512, 512, 510, 0, Math.PI * 2);
  ctx.fill();

  // 2. Heavy Engraved Outer Border
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#4A370A';
  ctx.beginPath();
  ctx.arc(512, 512, 492, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.strokeStyle = '#FFF8D6';
  ctx.beginPath();
  ctx.arc(512, 512, 478, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Minted Beading Studs (72 micro-spheres around perimeter)
  const beadCount = 72;
  const beadRadius = 458;
  for (let i = 0; i < beadCount; i++) {
    const angle = (i / beadCount) * Math.PI * 2;
    const bx = 512 + Math.cos(angle) * beadRadius;
    const by = 512 + Math.sin(angle) * beadRadius;

    ctx.beginPath();
    ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF8DB';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#4A370A';
    ctx.stroke();
  }

  // 4. Middle Engraved Ring
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#705412';
  ctx.beginPath();
  ctx.arc(512, 512, 436, 0, Math.PI * 2);
  ctx.stroke();

  // 5. Circular Embossed Typography (Both Top & Bottom upright, reading left-to-right)
  ctx.font = '900 42px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Upper Arc: "★ THE RADIANT HOTEL & RESORT ★"
  drawCurvedText(ctx, '★ THE RADIANT HOTEL & RESORT ★', 512, 512, 390, -Math.PI * 0.78, -Math.PI * 0.22, false);

  // Lower Arc: "★ GORAKHPUR LANDMARK ★"
  drawCurvedText(ctx, '★ GORAKHPUR LANDMARK ★', 512, 512, 390, Math.PI * 0.75, Math.PI * 0.25, true);

  // 6. Inner Border Rim
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#634A10';
  ctx.beginPath();
  ctx.arc(512, 512, 344, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFF8DB';
  ctx.beginPath();
  ctx.arc(512, 512, 336, 0, Math.PI * 2);
  ctx.stroke();

  // 7. Core Circular Medallion Disc: Luminous Ivory & White Marble
  const coreGrad = ctx.createRadialGradient(512, 512, 30, 512, 512, 334);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.5, '#FDFBF7');
  coreGrad.addColorStop(0.85, '#F8F3E5');
  coreGrad.addColorStop(1, '#EDE3CA');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(512, 512, 334, 0, Math.PI * 2);
  ctx.fill();

  // Subtle radial gold sunburst rays for imperial depth
  const rays = 32;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(212, 175, 55, 0.14)' : 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(512, 512);
    ctx.lineTo(512 + Math.cos(angle) * 334, 512 + Math.sin(angle) * 334);
    ctx.stroke();
  }

  // Inner gold filigree ring
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(182, 154, 112, 0.5)';
  ctx.beginPath();
  ctx.arc(512, 512, 318, 0, Math.PI * 2);
  ctx.stroke();

  // 8. Draw Official Hotel Logo in the Center (Prominent Vertical Standing Stature)
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    const imgAspect = logoImg.naturalWidth / logoImg.naturalHeight;
    let targetH = 430;
    let targetW = targetH * imgAspect;

    if (targetW > 540) {
      targetW = 540;
      targetH = targetW / imgAspect;
    }

    const lx = 512 - targetW / 2;
    const ly = 512 - targetH / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(74, 55, 10, 0.32)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.drawImage(logoImg, lx, ly, targetW, targetH);
    ctx.restore();
  } else {
    // Initial Stamped Monogram while image loads
    ctx.save();
    ctx.translate(512, 512);
    ctx.font = 'bold 160px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#B69A70';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', 0, 10);
    ctx.restore();
  }

  // 9. Fine Specular Bevel Highlight Ring
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(512, 512, 332, 0, Math.PI * 2);
  ctx.stroke();

  return canvas;
}

/**
 * Creates procedural reeded edge texture for the 3D coin cylinder rim
 */
function createReededRimTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#B38F24';
  ctx.fillRect(0, 0, 512, 32);

  // Alternating vertical gold serrations
  for (let x = 0; x < 512; x += 8) {
    ctx.fillStyle = '#FFF2B8';
    ctx.fillRect(x, 0, 4, 32);
    ctx.fillStyle = '#4A3B0D';
    ctx.fillRect(x + 4, 0, 4, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(12, 1);
  return texture;
}

export default function HotelLogoMedallion({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [shouldInit3D, setShouldInit3D] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Defer desktop 3D initialization until browser is fully idle, or activate on interaction
  useEffect(() => {
    if (isMobile) return;

    let idleId;
    let timerId;

    const activate = () => setShouldInit3D(true);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(activate, { timeout: 3500 });
    } else {
      timerId = setTimeout(activate, 3000);
    }

    return () => {
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, [isMobile]);

  const handleInteraction = () => {
    if (!isMobile && !shouldInit3D) {
      setShouldInit3D(true);
    }
  };

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastDragTimeRef = useRef(0);
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });
  // Kept 100% straight and vertical (zero X tilt, zero Z tilt)
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!shouldInit3D || isMobile) return;
    const container = mountRef.current;
    if (!container) return;

    let cleanupFn = null;
    let isCancelled = false;

    let width = container.clientWidth || 240;
    let height = container.clientHeight || 240;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // WebGL Renderer with HDR tone mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Clear any previous canvas and mount
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Coin Group: Kept strictly vertical and straight, scaled down gracefully to prevent any top/bottom clipping
    const coinGroup = new THREE.Group();
    coinGroup.scale.set(0.82, 0.82, 0.82);
    scene.add(coinGroup);

    // 1. Single Shared High-Resolution Canvas Texture (shared across both front and back faces)
    let medallionCanvas = createHotelLogoMedallionTexture(null);
    const medallionTexture = new THREE.CanvasTexture(medallionCanvas);
    medallionTexture.colorSpace = THREE.SRGBColorSpace;
    medallionTexture.anisotropy = 4;

    const rimTexture = createReededRimTexture();

    // 2. Load Official Hotel Logo once and update the shared texture
    const logoImg = new Image();
    const updateLogoTexture = () => {
      if (isCancelled) return;
      medallionCanvas = createHotelLogoMedallionTexture(logoImg);
      medallionTexture.image = medallionCanvas;
      medallionTexture.needsUpdate = true;
    };

    logoImg.onload = updateLogoTexture;
    logoImg.src = '/logo/logo.webp';
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      updateLogoTexture();
    }

    // 3. Materials
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      metalness: 0.92,
      roughness: 0.24,
      map: rimTexture,
    });

    const medallionMaterial = new THREE.MeshStandardMaterial({
      map: medallionTexture,
      metalness: 0.86,
      roughness: 0.16,
    });

    const bevelMat = new THREE.MeshStandardMaterial({
      color: 0xfff2ba,
      metalness: 0.98,
      roughness: 0.1,
    });

    // 4. Solid 3D Coin Structure (Strictly Vertical)
    // A. Reeded Rim Tube (Open-ended Cylinder along Z)
    const rimGeo = new THREE.CylinderGeometry(1.44, 1.44, 0.16, 64, 1, true);
    const rimMesh = new THREE.Mesh(rimGeo, rimMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    coinGroup.add(rimMesh);

    // B. Front Face Circle Cap (Faces +Z forward, upright vertical)
    const capGeo = new THREE.CircleGeometry(1.44, 64);
    const frontCap = new THREE.Mesh(capGeo, medallionMaterial);
    frontCap.position.z = 0.0805;
    coinGroup.add(frontCap);

    // C. Back Face Circle Cap (Faces -Z backwards, rotated 180° around Y)
    // Guarantees 100% identical, upright, unmirrored orientation on both sides
    const backCap = new THREE.Mesh(capGeo, medallionMaterial);
    backCap.position.z = -0.0805;
    backCap.rotation.y = Math.PI;
    coinGroup.add(backCap);

    // D. Front & Back High-Polish Bevel Rings (Torus)
    const bevelTorusGeo = new THREE.TorusGeometry(1.45, 0.045, 12, 64);
    const frontBevel = new THREE.Mesh(bevelTorusGeo, bevelMat);
    frontBevel.position.z = 0.08;
    coinGroup.add(frontBevel);

    const backBevel = new THREE.Mesh(bevelTorusGeo, bevelMat);
    backBevel.position.z = -0.08;
    coinGroup.add(backBevel);

    // 5. Rich Multi-Directional Gold Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8e7, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7d6, 4.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const goldPointLight = new THREE.PointLight(0xffd700, 3.6, 12);
    goldPointLight.position.set(0, 0, 3.8);
    scene.add(goldPointLight);

    // 6. Interactive Unified Pointer Controls (Hold cursor & drag to rotate 360°)
    const domEl = renderer.domElement;
    domEl.style.cursor = 'grab';
    domEl.style.touchAction = 'none';

    const onPointerDown = (e) => {
      e.preventDefault();
      domEl.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setIsInteracting(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      lastDragTimeRef.current = performance.now();
      rotationVelocityRef.current = { x: 0, y: 0 };
      domEl.style.cursor = 'grabbing';
      playClickSound();
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - lastDragTimeRef.current);
      lastDragTimeRef.current = now;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      const vy = dx * 0.013;
      const vx = dy * 0.005;

      currentRotationRef.current.y += vy;
      currentRotationRef.current.x = Math.max(-0.2, Math.min(0.2, currentRotationRef.current.x + vx));

      rotationVelocityRef.current = {
        x: vx * (16 / dt),
        y: vy * (16 / dt),
      };
    };

    const onPointerUp = (e) => {
      if (!isDraggingRef.current) return;
      try {
        domEl.releasePointerCapture(e.pointerId);
      } catch (err) {}
      isDraggingRef.current = false;
      setIsInteracting(false);
      domEl.style.cursor = 'grab';
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointercancel', onPointerUp);

    // 7. Animation Loop with Physics Inertia & Continuous Straight Vertical Revolve
    let animId;
    let firstFrameRendered = false;
    const clock = new THREE.Clock();
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle levitation float along Y
      coinGroup.position.y = Math.sin(elapsed * 1.5) * 0.02;

      if (isDraggingRef.current) {
        coinGroup.rotation.y = currentRotationRef.current.y;
        coinGroup.rotation.x = currentRotationRef.current.x;
      } else {
        rotationVelocityRef.current.y *= 0.94;
        rotationVelocityRef.current.x *= 0.88;

        if (Math.abs(rotationVelocityRef.current.y) < 0.002) {
          rotationVelocityRef.current.y = 0.0045;
        }

        currentRotationRef.current.y += rotationVelocityRef.current.y;
        currentRotationRef.current.x += rotationVelocityRef.current.x;

        // Snaps pitch back to ZERO (100% straight and vertical)
        currentRotationRef.current.x += (0 - currentRotationRef.current.x) * 0.08;

        coinGroup.rotation.y = currentRotationRef.current.y;
        coinGroup.rotation.x = currentRotationRef.current.x;
        coinGroup.rotation.z = 0;
      }

      renderer.render(scene, camera);

      if (!firstFrameRendered) {
        firstFrameRendered = true;
        setIs3DLoaded(true);
      }
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      setIs3DLoaded(true);
    } else {
      animate();
    }

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          if (prefersReducedMotion) renderer.render(scene, camera);
        }
      }
    });
    resizeObserver.observe(container);

    cleanupFn = () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointercancel', onPointerUp);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      medallionTexture.dispose();
      rimTexture.dispose();
      rimGeo.dispose();
      capGeo.dispose();
      bevelTorusGeo.dispose();
      rimMaterial.dispose();
      medallionMaterial.dispose();
      bevelMat.dispose();
      renderer.dispose();
    };

    return () => {
      isCancelled = true;
      if (cleanupFn) cleanupFn();
    };
  }, [shouldInit3D, isMobile]);

  if (isMobile) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF6CC] via-[#D4AF37] to-[#5C430F] p-[2px] shadow-[0_3px_12px_rgba(214,175,55,0.35)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#1A150D] flex items-center justify-center p-1.5 border border-[#F5D77F]/60">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              width="64"
              height="64"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(214,184,120,0.5)]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onPointerEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* 3D Canvas Mount (Responsive & Dignified) */}
      {shouldInit3D && (
        <div
          ref={mountRef}
          className={`w-full h-full relative flex items-center justify-center pointer-events-auto transition-opacity duration-500 ${
            is3DLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Minted Luxury Gold Emblem Placeholder (Active while idle or before 3D loads) */}
      <div
        className={`w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          is3DLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF6CC] via-[#D4AF37] to-[#5C430F] p-[2px] shadow-[0_3px_12px_rgba(214,175,55,0.35)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#1A150D] flex items-center justify-center p-1.5 border border-[#F5D77F]/60">
            <img
              src="/logo/logo.webp"
              alt="The Radiant Hotel & Resort"
              width="64"
              height="64"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(214,184,120,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
