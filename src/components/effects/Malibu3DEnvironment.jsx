import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Malibu3DEnvironment — Bright Luxury Sunset Edition
 *
 * Transformed from dark nighttime into a bright, luminous, cinematic golden-hour environment:
 * - Palette: Warm ivory (#F5EBDD), Soft champagne (#EAD5AE), Pale peach (#F1C6A3),
 *   Sunset orange (#E89A62), Warm amber (#D99A4E), Muted terracotta (#BD7053),
 *   Champagne gold (#D6B477), Soft bronze (#A98155).
 * - Layer 01: Giant luminous golden-hour sun disc with radiant multi-ring corona glow.
 * - Layer 02: 3-tier panoramic skyline in warm sandstone, terracotta & bronze with sunlight roof reflections.
 * - Layer 03: Foreground 3D metallic arcs in champagne gold, brushed brass & polished bronze.
 * - Layer 04: Volumetric golden sunbeams & 3D floating warm dust particles with Z-depth.
 * - Layer 05: Rooftop terrace glass balustrade with champagne-gold handrail & warm reflections.
 *
 * ALL existing geometries, depths, 3D structures, and independent scroll-linked
 * animation behaviors are 100% PRESERVED.
 */
export default function Malibu3DEnvironment({ progress = 0.0, activeStage = 'hero' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);
  const stageRef = useRef(activeStage);

  // Keep refs updated without triggering re-renders
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup with soft champagne-peach atmospheric haze
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xead5ae, 0.0035);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 600);
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // =========================================================================
    // LIGHTING SYSTEM — BRIGHT NATURAL GOLDEN-HOUR ILLUMINATION
    // =========================================================================
    // Warm natural ambient sky illumination (warm ivory)
    const ambientLight = new THREE.AmbientLight(0xf5ebdd, 2.6);
    scene.add(ambientLight);

    // Primary Setting Sun Key Light (rich sunset orange & champagne gold)
    const sunLight = new THREE.DirectionalLight(0xe89a62, 4.2);
    sunLight.position.set(0, 10, -80);
    scene.add(sunLight);

    // Pale Peach Overhead Sky Dome Fill
    const skyFillLight = new THREE.DirectionalLight(0xf1c6a3, 1.8);
    skyFillLight.position.set(0, 30, 20);
    scene.add(skyFillLight);

    // Warm Amber Horizon Radiance
    const amberHorizonLight = new THREE.PointLight(0xd99a4e, 3.6, 140);
    amberHorizonLight.position.set(0, -2, -35);
    scene.add(amberHorizonLight);

    // Champagne Gold Specular Glint for Foreground Metallic Arcs
    const goldAccentLight = new THREE.PointLight(0xd6b477, 2.8, 70);
    goldAccentLight.position.set(-15, 12, 10);
    scene.add(goldAccentLight);

    // =========================================================================
    // LAYER 01: GIANT LUMINOUS SUNSET HALO (THE GOLDEN-HOUR SUN)
    // Enormous luminous 3D disc with warm peach, champagne & amber gradients
    // =========================================================================
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, -3, -95);
    scene.add(haloGroup);

    // Generate high-resolution procedural golden-hour sun texture
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 1024;
    haloCanvas.height = 1024;
    const haloCtx = haloCanvas.getContext('2d');

    const haloGrad = haloCtx.createRadialGradient(512, 512, 35, 512, 512, 500);
    haloGrad.addColorStop(0.0, '#FFFFFF');                          // Ultra-brilliant luminous core
    haloGrad.addColorStop(0.12, 'rgba(245, 235, 221, 0.98)');       // Warm ivory (#F5EBDD)
    haloGrad.addColorStop(0.28, 'rgba(234, 213, 174, 0.95)');       // Soft champagne (#EAD5AE)
    haloGrad.addColorStop(0.48, 'rgba(241, 198, 163, 0.90)');       // Pale peach (#F1C6A3)
    haloGrad.addColorStop(0.70, 'rgba(232, 154, 98, 0.82)');        // Sunset orange (#E89A62)
    haloGrad.addColorStop(0.86, 'rgba(217, 154, 78, 0.55)');        // Warm amber (#D99A4E)
    haloGrad.addColorStop(1.0, 'rgba(234, 213, 174, 0.0)');         // Soft golden halo falloff

    haloCtx.fillStyle = haloGrad;
    haloCtx.fillRect(0, 0, 1024, 1024);

    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    haloTexture.colorSpace = THREE.SRGBColorSpace;

    // Primary Sunset Disc Mesh
    const haloDiscGeo = new THREE.PlaneGeometry(88, 88);
    const haloDiscMat = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const haloDiscMesh = new THREE.Mesh(haloDiscGeo, haloDiscMat);
    haloGroup.add(haloDiscMesh);

    // Outer Volumetric Golden Corona Glow Ring
    const coronaGeo = new THREE.RingGeometry(38, 54, 64);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xe89a62,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.z = -0.5;
    haloGroup.add(coronaMesh);

    // Secondary Delicate Champagne Gold Accent Ring
    const goldRingGeo = new THREE.RingGeometry(43.5, 44.5, 64);
    const goldRingMat = new THREE.MeshBasicMaterial({
      color: 0xd6b477,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const goldRingMesh = new THREE.Mesh(goldRingGeo, goldRingMat);
    goldRingMesh.position.z = 0.2;
    haloGroup.add(goldRingMesh);

    // =========================================================================
    // LAYER 02: PANORAMIC CITY SKYLINE (3 DISTINCT DEPTH PARALLAX LAYERS)
    // Transformed to naturally illuminated golden-hour architecture:
    // Warm sandstone, bronze, terracotta facades with specular roof edge sun glints
    // =========================================================================
    const generateSkylineTexture = (type) => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 2048;
      sCanvas.height = 512;
      const sCtx = sCanvas.getContext('2d');
      sCtx.clearRect(0, 0, 2048, 512);

      const buildingCount = type === 'distant' ? 58 : type === 'midground' ? 36 : 22;
      const baseHeight = type === 'distant' ? 140 : type === 'midground' ? 220 : 310;

      // Architectural facade palettes in golden hour
      const buildingColors =
        type === 'distant'
          ? ['#BD7053', '#A98155', '#C66B37', '#9A6242', '#B57A58'] // Sandstone & muted terracotta
          : type === 'midground'
          ? ['#A98155', '#D99A4E', '#BD7053', '#8C5B3D', '#B58757'] // Bronze, amber & sandstone
          : ['#6B432E', '#8C5A3C', '#A98155', '#5C3826', '#7B4E35']; // Near rich architectural bronze

      let currentX = 0;
      while (currentX < 2048) {
        const bWidth =
          type === 'distant'
            ? 25 + Math.random() * 45
            : type === 'midground'
            ? 40 + Math.random() * 65
            : 60 + Math.random() * 95;
        const bHeight = baseHeight + (Math.random() - 0.45) * 160;
        const topY = 512 - bHeight;

        // Random building facade tone from golden-hour palette
        const facadeColor = buildingColors[Math.floor(Math.random() * buildingColors.length)];
        sCtx.fillStyle = facadeColor;
        sCtx.fillRect(currentX, topY, bWidth, bHeight);

        // Sunlight specular reflection highlight along the sunward rooftop edge
        sCtx.fillStyle = type === 'near' ? '#FFFFFF' : '#F5EBDD';
        sCtx.fillRect(currentX, topY, bWidth, type === 'near' ? 2.5 : 1.5);

        // Architectural details: spires, stepped penthouses, antennas
        if (Math.random() > 0.4) {
          const spireW = bWidth * 0.4;
          const spireH = 20 + Math.random() * 45;
          sCtx.fillStyle = facadeColor;
          sCtx.fillRect(currentX + (bWidth - spireW) * 0.5, topY - spireH, spireW, spireH);

          // Sunlight edge on spire
          sCtx.fillStyle = '#D6B477';
          sCtx.fillRect(currentX + (bWidth - spireW) * 0.5, topY - spireH, spireW, 1.5);

          if (Math.random() > 0.5) {
            const needleH = 15 + Math.random() * 30;
            sCtx.fillStyle = '#D6B477';
            sCtx.fillRect(currentX + bWidth * 0.5 - 1, topY - spireH - needleH, 2, needleH);
          }
        }

        // Stepped penthouse design
        if (Math.random() > 0.5) {
          const stepW = bWidth * 0.7;
          const stepH = 15 + Math.random() * 25;
          sCtx.fillStyle = facadeColor;
          sCtx.fillRect(currentX + (bWidth - stepW) * 0.5, topY - stepH, stepW, stepH);
          sCtx.fillStyle = '#F5EBDD';
          sCtx.fillRect(currentX + (bWidth - stepW) * 0.5, topY - stepH, stepW, 1.5);
        }

        // Golden Hour Glass Window Reflections
        const windowColorChoices = [
          'rgba(255, 255, 255, 0.95)', // Brilliant specular sun glint (#FFFFFF)
          'rgba(245, 235, 221, 0.88)', // Warm ivory reflection (#F5EBDD)
          'rgba(214, 180, 119, 0.85)', // Champagne gold reflection (#D6B477)
          'rgba(241, 198, 163, 0.75)', // Pale peach glass (#F1C6A3)
          'rgba(232, 154, 98, 0.70)',  // Sunset orange reflection (#E89A62)
        ];

        const rows = Math.floor(bHeight / 14);
        const cols = Math.floor(bWidth / 9);

        for (let r = 2; r < rows - 1; r++) {
          for (let c = 1; c < cols - 1; c++) {
            if (Math.random() > (type === 'distant' ? 0.65 : 0.52)) {
              sCtx.fillStyle =
                windowColorChoices[Math.floor(Math.random() * windowColorChoices.length)];
              const winW = type === 'distant' ? 2 : 3;
              const winH = type === 'distant' ? 3 : 5;
              sCtx.fillRect(
                currentX + c * (bWidth / cols) + 1,
                topY + r * 14 + 1,
                winW,
                winH
              );
            }
          }
        }

        currentX += bWidth + (type === 'distant' ? 3 : 6);
      }

      const tex = new THREE.CanvasTexture(sCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // 1. Distant Horizon Layer (Z = -78)
    const distantTex = generateSkylineTexture('distant');
    const distantGeo = new THREE.PlaneGeometry(160, 24);
    const distantMat = new THREE.MeshBasicMaterial({
      map: distantTex,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    });
    const distantMesh = new THREE.Mesh(distantGeo, distantMat);
    distantMesh.position.set(0, -9.5, -78);
    scene.add(distantMesh);

    // 2. Midground Skyline Layer (Z = -60)
    const midgroundTex = generateSkylineTexture('midground');
    const midgroundGeo = new THREE.PlaneGeometry(140, 26);
    const midgroundMat = new THREE.MeshBasicMaterial({
      map: midgroundTex,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
    });
    const midgroundMesh = new THREE.Mesh(midgroundGeo, midgroundMat);
    midgroundMesh.position.set(0, -9.0, -60);
    scene.add(midgroundMesh);

    // 3. Near Rooftop Skyline Layer (Z = -44)
    const nearTex = generateSkylineTexture('near');
    const nearGeo = new THREE.PlaneGeometry(120, 28);
    const nearMat = new THREE.MeshBasicMaterial({
      map: nearTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });
    const nearMesh = new THREE.Mesh(nearGeo, nearMat);
    nearMesh.position.set(0, -8.5, -44);
    scene.add(nearMesh);

    // =========================================================================
    // LAYER 03: FOREGROUND 3D METALLIC HALO STRUCTURES & ARCS
    // Transformed to Champagne Gold, Brushed Brass & Polished Bronze finishes
    // =========================================================================
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // Champagne Gold Metallic PBR Material
    const goldMetallicMat = new THREE.MeshStandardMaterial({
      color: 0xd6b477,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x5a3e1b,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
    });

    // Warm Polished Bronze Metallic Material
    const bronzeMetallicMat = new THREE.MeshStandardMaterial({
      color: 0xa98155,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x4d2e18,
      emissiveIntensity: 0.32,
      side: THREE.DoubleSide,
    });

    // Brushed Brass Horizon Material
    const brassMetallicMat = new THREE.MeshStandardMaterial({
      color: 0xd99a4e,
      metalness: 0.85,
      roughness: 0.24,
      emissive: 0x3d2512,
      emissiveIntensity: 0.28,
      side: THREE.DoubleSide,
    });

    // Arc A: Large Upper-Left Curved Torus Ring Segment (Z = -22)
    const arcAGeo = new THREE.TorusGeometry(17, 0.42, 16, 64, Math.PI * 0.95);
    const arcAMesh = new THREE.Mesh(arcAGeo, goldMetallicMat);
    arcAMesh.position.set(-17, 8, -22);
    arcAMesh.rotation.set(0.35, 0.2, 0.4);
    ringsGroup.add(arcAMesh);

    // Arc B: Mid-Right Floating Slender Ring Segment (Z = -16)
    const arcBGeo = new THREE.TorusGeometry(13, 0.32, 16, 64, Math.PI * 0.8);
    const arcBMesh = new THREE.Mesh(arcBGeo, bronzeMetallicMat);
    arcBMesh.position.set(19, 2, -16);
    arcBMesh.rotation.set(-0.25, -0.4, -0.6);
    ringsGroup.add(arcBMesh);

    // Arc C: Lower Architectural Horizon Framing Arc (Z = -28)
    const arcCGeo = new THREE.TorusGeometry(26, 0.26, 16, 64, Math.PI * 0.58);
    const arcCMesh = new THREE.Mesh(arcCGeo, brassMetallicMat);
    arcCMesh.position.set(0, -9, -28);
    arcCMesh.rotation.set(1.45, 0.0, 0.0);
    ringsGroup.add(arcCMesh);

    // =========================================================================
    // LAYER 04: VOLUMETRIC SUNLIGHT BEAMS & 3D GOLDEN DUST PARTICLES
    // =========================================================================
    // Volumetric Sunlight Fan Planes sweeping from the sun
    const lightBeamGroup = new THREE.Group();
    lightBeamGroup.position.set(0, 0, -50);
    scene.add(lightBeamGroup);

    const beamGeo = new THREE.ConeGeometry(38, 75, 4, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xf1c6a3,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const beamMesh1 = new THREE.Mesh(beamGeo, beamMat);
    beamMesh1.rotation.set(0, 0, 0.65);
    beamMesh1.position.set(-8, -4, 0);
    lightBeamGroup.add(beamMesh1);

    const beamMesh2 = new THREE.Mesh(beamGeo, beamMat);
    beamMesh2.rotation.set(0, 0, -0.55);
    beamMesh2.position.set(8, -4, 0);
    lightBeamGroup.add(beamMesh2);

    // 3D Multi-Tier Golden Atmospheric Dust Particle Cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const px = (Math.random() - 0.5) * 80;
      const py = (Math.random() - 0.5) * 45;
      const pz = -60 + Math.random() * 65;

      particlePositions[i3] = px;
      particlePositions[i3 + 1] = py;
      particlePositions[i3 + 2] = pz;

      const depthRatio = (pz + 60) / 65;
      particleScales[i] = 1.0 + depthRatio * 2.5;

      particleData.push({
        baseX: px,
        baseY: py,
        baseZ: pz,
        depthRatio,
        speedX: (Math.random() - 0.48) * 0.15,
        speedY: 0.05 + Math.random() * 0.1,
        wobblePhase: Math.random() * Math.PI * 2,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Particle Texture: Warm Ivory and Champagne Gold
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0.0, '#FFFFFF');
    pGrad.addColorStop(0.3, 'rgba(245, 235, 221, 0.95)'); // #F5EBDD
    pGrad.addColorStop(0.65, 'rgba(214, 180, 119, 0.75)'); // #D6B477
    pGrad.addColorStop(1.0, 'rgba(232, 154, 98, 0.0)');   // #E89A62
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      map: pTex,
      size: 1.5,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // LAYER 05: ROOFTOP ARCHITECTURAL GLASS BALUSTRADE (Z = -5)
    // Transformed to Champagne Gold handrail & sun-reflective glass panels
    // =========================================================================
    const railingGroup = new THREE.Group();
    railingGroup.position.set(0, -13.5, 0);
    scene.add(railingGroup);

    // Champagne-Gold Top Handrail
    const handrailGeo = new THREE.CylinderGeometry(0.09, 0.09, 90, 8);
    const handrailMat = new THREE.MeshStandardMaterial({
      color: 0xd6b477,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x4a3418,
      emissiveIntensity: 0.32,
    });
    const handrailMesh = new THREE.Mesh(handrailGeo, handrailMat);
    handrailMesh.rotation.z = Math.PI / 2;
    handrailMesh.position.y = 1.6;
    railingGroup.add(handrailMesh);

    // Glass Balustrade Panels with Soft Champagne Reflection
    const glassGeo = new THREE.PlaneGeometry(90, 3.2);
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0xf5ebdd,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 0;
    railingGroup.add(glassMesh);

    // Vertical Champagne-Gold Baluster Stanchions
    const stanchionGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8);
    for (let sx = -42; sx <= 42; sx += 6) {
      const stanchion = new THREE.Mesh(stanchionGeo, handrailMat);
      stanchion.position.set(sx, 0, 0.02);
      railingGroup.add(stanchion);
    }

    // =========================================================================
    // RESIZE LISTENER
    // =========================================================================
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // ANIMATION & SCROLL-LINKED MOTION RENDER LOOP
    // EXACT SAME INDEPENDENT SCROLL MOTION PRESERVED
    // =========================================================================
    let animId = null;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);

      const delta = clock.getDelta();
      const p = progressRef.current; // Current scroll progress (0.0 to 12.0)
      const stage = stageRef.current;

      // -----------------------------------------------------------------------
      // 1. LAYER 01: SUNSET HALO MOTION (PRESERVED)
      // -----------------------------------------------------------------------
      haloGroup.rotation.z = p * 0.075;
      haloGroup.position.x = Math.sin(p * 0.38) * 9.5;
      haloGroup.position.y = -3 + Math.cos(p * 0.32) * 3.5;
      const haloScale = 1.0 + Math.sin(p * 0.28) * 0.07;
      haloGroup.scale.set(haloScale, haloScale, 1.0);

      // Stage-specific halo color temperature in the bright palette
      if (p >= 9.5 && p <= 10.5) {
        // Cabanas: deep sunset orange (#E89A62)
        coronaMat.color.setHex(0xe89a62);
        coronaMat.opacity = 0.54;
      } else if (p > 10.5) {
        // Concierge: soft champagne gold (#D6B477)
        coronaMat.color.setHex(0xd6b477);
        coronaMat.opacity = 0.44;
      } else {
        // Hero & Celebrations: radiant pale peach & sunset orange
        coronaMat.color.setHex(0xe89a62);
        coronaMat.opacity = 0.52;
      }

      // -----------------------------------------------------------------------
      // 2. LAYER 02: MULTI-TIER SKYLINE PARALLAX (PRESERVED)
      // -----------------------------------------------------------------------
      distantMesh.position.x = -p * 1.6;
      midgroundMesh.position.x = -p * 3.4;
      nearMesh.position.x = -p * 5.6;

      nearMesh.position.y = -8.5 + Math.sin(p * 0.25) * 0.8;
      midgroundMesh.position.y = -9.0 + Math.sin(p * 0.25) * 0.4;

      // -----------------------------------------------------------------------
      // 3. LAYER 03: FOREGROUND 3D METALLIC ARCS (PRESERVED)
      // -----------------------------------------------------------------------
      arcAMesh.rotation.z = 0.4 - p * 0.14;
      arcAMesh.rotation.x = 0.35 + Math.sin(p * 0.4) * 0.08;
      arcAMesh.position.x = -17 + p * 0.95;
      arcAMesh.position.z = -22 + Math.sin(p * 0.5) * 2.8;

      arcBMesh.rotation.z = -0.6 + p * 0.18;
      arcBMesh.rotation.y = -0.4 - Math.cos(p * 0.35) * 0.12;
      arcBMesh.position.x = 19 - p * 1.15;
      arcBMesh.position.z = -16 + Math.cos(p * 0.42) * 3.5;

      arcCMesh.rotation.z = Math.sin(p * 0.3) * 0.12;
      arcCMesh.position.y = -9 + Math.sin(p * 0.25) * 0.6;

      // -----------------------------------------------------------------------
      // 4. LAYER 04: VOLUMETRIC LIGHT & 3D PARTICLES (PRESERVED)
      // -----------------------------------------------------------------------
      lightBeamGroup.rotation.z = -0.15 + Math.sin(p * 0.35) * 0.25;
      lightBeamGroup.position.x = Math.sin(p * 0.4) * 6;

      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const pInfo = particleData[i];

        const scrollShiftX = -p * (1.2 + pInfo.depthRatio * 3.2);
        const microFloat = Math.sin(clock.getElapsedTime() * 0.6 + pInfo.wobblePhase) * 0.4;

        positions[i3] = pInfo.baseX + scrollShiftX;
        positions[i3 + 1] = pInfo.baseY + microFloat;

        if (positions[i3] < -42) {
          positions[i3] += 84;
        } else if (positions[i3] > 42) {
          positions[i3] -= 84;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // -----------------------------------------------------------------------
      // 5. LAYER 05: ROOFTOP ARCHITECTURE & GLASS RAILING PARALLAX (PRESERVED)
      // -----------------------------------------------------------------------
      railingGroup.position.x = Math.sin(p * 0.2) * 1.2;

      // Render the scene
      renderer.render(scene, camera);
    };

    render();

    // =========================================================================
    // CLEANUP & MEMORY MANAGEMENT
    // =========================================================================
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      scene.clear();
      haloTexture.dispose();
      distantTex.dispose();
      midgroundTex.dispose();
      nearTex.dispose();
      pTex.dispose();

      haloDiscGeo.dispose();
      haloDiscMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      goldRingGeo.dispose();
      goldRingMat.dispose();

      distantGeo.dispose();
      distantMat.dispose();
      midgroundGeo.dispose();
      midgroundMat.dispose();
      nearGeo.dispose();
      nearMat.dispose();

      arcAGeo.dispose();
      arcBGeo.dispose();
      arcCGeo.dispose();
      goldMetallicMat.dispose();
      bronzeMetallicMat.dispose();
      brassMetallicMat.dispose();

      beamGeo.dispose();
      beamMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      handrailGeo.dispose();
      handrailMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      stanchionGeo.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
