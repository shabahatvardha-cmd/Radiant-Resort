import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Procedural texture generator for high-detail 24K Sovereign Medallion
 */
function createCoinFaceTexture(isFront = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base background radial gradient for rich gold depth
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
  grad.addColorStop(0, '#FFF2B2');
  grad.addColorStop(0.35, '#F5D77F');
  grad.addColorStop(0.7, '#D4AF37');
  grad.addColorStop(0.92, '#997D26');
  grad.addColorStop(1, '#5C4A11');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(512, 512, 510, 0, Math.PI * 2);
  ctx.fill();

  // Concentric decorative minted rings
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#5C4A11';
  ctx.beginPath();
  ctx.arc(512, 512, 490, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 6;
  ctx.strokeStyle = '#FFF3D1';
  ctx.beginPath();
  ctx.arc(512, 512, 475, 0, Math.PI * 2);
  ctx.stroke();

  // Minted beading dots around outer perimeter
  const beadCount = 72;
  const beadRadius = 455;
  for (let i = 0; i < beadCount; i++) {
    const angle = (i / beadCount) * Math.PI * 2;
    const bx = 512 + Math.cos(angle) * beadRadius;
    const by = 512 + Math.sin(angle) * beadRadius;
    ctx.beginPath();
    ctx.arc(bx, by, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF8D6';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#5C4A11';
    ctx.stroke();
  }

  // Inner ring border
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#7A6218';
  ctx.beginPath();
  ctx.arc(512, 512, 430, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFF3D1';
  ctx.beginPath();
  ctx.arc(512, 512, 340, 0, Math.PI * 2);
  ctx.stroke();

  // Circular Embossed Text
  const text = isFront
    ? '★ THE RADIANT RESORT ★ GORAKHPUR'
    : '★ SOVEREIGN LUXURY SANCTUARY ★ EST. 1999';
  ctx.font = '900 48px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#4A3B0D';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const textRadius = 385;
  const chars = text.split('');
  const totalAngle = Math.PI * 1.6;
  const startAngle = -Math.PI / 2 - totalAngle / 2;
  const charStep = totalAngle / (chars.length - 1);

  chars.forEach((char, idx) => {
    const charAngle = startAngle + idx * charStep;
    ctx.save();
    ctx.translate(512, 512);
    ctx.rotate(charAngle + Math.PI / 2);
    ctx.translate(0, -textRadius);

    // Drop shadow for stamped effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(char, 1, 2);
    ctx.fillStyle = '#382B06';
    ctx.fillText(char, 0, 0);

    ctx.restore();
  });

  // Central Emblem
  ctx.save();
  ctx.translate(512, 512);

  // Inner sunburst texture
  const rays = 24;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(92, 74, 17, 0.2)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 330, Math.sin(angle) * 330);
    ctx.stroke();
  }

  // Core medallion disc
  const centerGrad = ctx.createRadialGradient(0, 0, 20, 0, 0, 220);
  centerGrad.addColorStop(0, '#FFECA8');
  centerGrad.addColorStop(0.7, '#D4AF37');
  centerGrad.addColorStop(1, '#8C6F19');
  ctx.fillStyle = centerGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#FFF8D6';
  ctx.stroke();

  if (isFront) {
    // Imperial Crown Icon
    ctx.fillStyle = '#2E2204';
    ctx.beginPath();
    // Crown base
    ctx.rect(-80, 50, 160, 20);
    ctx.fill();
    // Crown peaks
    ctx.beginPath();
    ctx.moveTo(-80, 50);
    ctx.lineTo(-90, -40);
    ctx.lineTo(-40, 10);
    ctx.lineTo(0, -70);
    ctx.lineTo(40, 10);
    ctx.lineTo(90, -40);
    ctx.lineTo(80, 50);
    ctx.closePath();
    ctx.fill();

    // Gold highlight on crown
    ctx.fillStyle = '#FFF8D6';
    ctx.beginPath();
    ctx.arc(0, -75, 12, 0, Math.PI * 2);
    ctx.arc(-90, -45, 9, 0, Math.PI * 2);
    ctx.arc(90, -45, 9, 0, Math.PI * 2);
    ctx.fill();

    // Five Stars below crown
    for (let s = -2; s <= 2; s++) {
      ctx.save();
      ctx.translate(s * 32, 95);
      ctx.fillStyle = '#2E2204';
      ctx.beginPath();
      for (let p = 0; p < 5; p++) {
        const starAngle = (p * 4 * Math.PI) / 5 - Math.PI / 2;
        const sx = Math.cos(starAngle) * 11;
        const sy = Math.sin(starAngle) * 11;
        if (p === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  } else {
    // Back Crest: Sovereign Monogram 'R'
    ctx.font = 'bold 180px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#2E2204';
    ctx.fillText('R', 0, 15);
    ctx.fillStyle = '#FFF8D6';
    ctx.fillText('R', -2, 12);

    ctx.font = 'bold 22px "Cinzel", sans-serif';
    ctx.fillStyle = '#382B06';
    ctx.fillText('FIVE STAR', 0, 100);
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/**
 * Creates procedural reeded edge texture for coin rim
 */
function createReededRimTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#B38F24';
  ctx.fillRect(0, 0, 1024, 64);

  // Alternating vertical serrations
  for (let x = 0; x < 1024; x += 8) {
    ctx.fillStyle = '#FFECA8';
    ctx.fillRect(x, 0, 4, 64);
    ctx.fillStyle = '#4A3B0D';
    ctx.fillRect(x + 4, 0, 4, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(12, 1);
  return texture;
}

export default function ThreeGoldMedallion({ mousePos }) {
  const mountRef = useRef(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.015 });
  const currentRotationRef = useRef({ x: 0.15, y: 0 });

  useEffect(() => {
    mouseTargetRef.current = mousePos || { x: 0, y: 0 };
  }, [mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 220;
    let height = container.clientHeight || 220;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 4.3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Procedural Studio Environment for rich golden reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const envLight1 = new THREE.DirectionalLight(0xfff5d1, 4.0);
    envLight1.position.set(2, 4, 2);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xd4af37, 3.0);
    envLight2.position.set(-3, -2, -2);
    envScene.add(envLight2);
    const envLight3 = new THREE.AmbientLight(0xffffff, 1.5);
    envScene.add(envLight3);

    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // Coin Group
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    // Create Textures
    const frontTexture = createCoinFaceTexture(true);
    const backTexture = createCoinFaceTexture(false);
    const rimTexture = createReededRimTexture();

    // Materials
    // CylinderGeometry material array: [0: side rim, 1: top face, 2: bottom face]
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      metalness: 0.92,
      roughness: 0.25,
      map: rimTexture,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      metalness: 0.85,
      roughness: 0.18,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.85,
      roughness: 0.18,
    });

    // Coin Mesh (Radius: 1.45, Thickness: 0.16)
    // Cylinder faces Y-axis by default. Top cap is +Y, bottom cap is -Y.
    const cylinderGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.16, 80);
    const coinMesh = new THREE.Mesh(cylinderGeo, [rimMaterial, frontMaterial, backMaterial]);
    // Rotate 90 deg around X so front face (+Y) points forward along +Z!
    coinMesh.rotation.x = Math.PI / 2;
    coinGroup.add(coinMesh);

    // Exterior Polished Gold Bevel Rings
    const bevelTorusGeo = new THREE.TorusGeometry(1.43, 0.045, 16, 80);
    const bevelMat = new THREE.MeshStandardMaterial({
      color: 0xfff0ad,
      metalness: 0.98,
      roughness: 0.12,
    });
    const frontBevel = new THREE.Mesh(bevelTorusGeo, bevelMat);
    frontBevel.position.z = 0.08;
    coinGroup.add(frontBevel);

    const backBevel = new THREE.Mesh(bevelTorusGeo, bevelMat);
    backBevel.position.z = -0.08;
    coinGroup.add(backBevel);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8e7, 3.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    const goldPointLight = new THREE.PointLight(0xffd700, 4.0, 12);
    goldPointLight.position.set(0, 0, 3.5);
    scene.add(goldPointLight);

    // Direct Drag Interactions
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      const vy = dx * 0.012;
      const vx = dy * 0.008;

      currentRotationRef.current.y += vy;
      currentRotationRef.current.x += vx;
      rotationVelocityRef.current = { x: vx, y: vy };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        rotationVelocityRef.current = { x: 0, y: 0 };
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const vy = dx * 0.012;
      const vx = dy * 0.008;

      currentRotationRef.current.y += vy;
      currentRotationRef.current.x += vx;
      rotationVelocityRef.current = { x: vx, y: vy };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.style.cursor = 'grab';
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation loop with physics momentum
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle floating levitation
      coinGroup.position.y = Math.sin(elapsed * 1.8) * 0.06;

      if (isDraggingRef.current) {
        coinGroup.rotation.y = currentRotationRef.current.y;
        coinGroup.rotation.x = currentRotationRef.current.x;
        domEl.style.cursor = 'grabbing';
      } else {
        domEl.style.cursor = 'grab';
        // Apply inertia friction damping
        rotationVelocityRef.current.y *= 0.94;
        rotationVelocityRef.current.x *= 0.94;

        // Base continuous gentle spin when resting
        if (Math.abs(rotationVelocityRef.current.y) < 0.003) {
          rotationVelocityRef.current.y = 0.008;
        }

        currentRotationRef.current.y += rotationVelocityRef.current.y;
        currentRotationRef.current.x += rotationVelocityRef.current.x;

        // Natural spring back to level pitch
        currentRotationRef.current.x += (0.1 - currentRotationRef.current.x) * 0.04;

        // Subtle interactive mouse tilt
        const mouseTiltX = -mouseTargetRef.current.y * 0.25;
        const mouseTiltY = mouseTargetRef.current.x * 0.35;

        coinGroup.rotation.y = currentRotationRef.current.y + mouseTiltY;
        coinGroup.rotation.x = currentRotationRef.current.x + mouseTiltX;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      frontTexture.dispose();
      backTexture.dispose();
      rimTexture.dispose();
      cylinderGeo.dispose();
      bevelTorusGeo.dispose();
      rimMaterial.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      bevelMat.dispose();
      pmremGenerator.dispose();
      envRenderTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative flex items-center justify-center select-none"
      title="Drag to spin 24K Sovereign Medallion 360°"
    />
  );
}
