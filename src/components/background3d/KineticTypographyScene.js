import * as THREE from 'three';
import { TYPOGRAPHY_WORDS_CONFIG, activePaletteConfig } from './typographyConfig.js';
import { createFlatWordGeometry } from './Geometric3DText.js';

/**
 * KineticTypographyScene
 * 
 * Manages the pure flat 2D editorial typography meshes and the deterministic
 * 6-stage scroll choreography.
 * - Flat 2D vector geometry (zero extrusion, zero bevels).
 * - Clear hierarchy with MALIBU as the primary medium-large anchor.
 * - Visual isolation: zero collisions, generous spacing between every word.
 * - Solid unlit colors (no metallic reflection or dark shading).
 * - 100% scroll-driven: freezes when scroll stops, reverses on backward scroll.
 * - Zero idle autoplay drift.
 */

// Smooth cubic hermite ease function for seamless, organic interpolation
function smoothHermite(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

// Linear vector interpolation helper
function lerpVec(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export function createKineticTypographyScene(scene, customPalette) {
  const palette = customPalette || activePaletteConfig;
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Pure editorial typography materials (translucent atmospheric watermark for high foreground contrast)
  const materials = {
    primary: new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.textPrimary),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: palette.opacityPrimary ?? 0.36,
      depthWrite: false,
    }),
    secondary: new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.textSecondary),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: palette.opacitySecondary ?? 0.28,
      depthWrite: false,
    }),
    accent: new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.textAccent),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: palette.opacityAccent ?? 0.44,
      depthWrite: false,
    }),
  };

  const wordEntries = [];

  TYPOGRAPHY_WORDS_CONFIG.forEach((cfg) => {
    // Generate pure 2D planar vector geometry (ZERO extrusion, ZERO bevels)
    const geo = createFlatWordGeometry(cfg.text, {
      letterSpacing: 0.08,
    });

    const mat = materials[cfg.colorRole] || materials.primary;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(cfg.scale);

    masterGroup.add(mesh);

    wordEntries.push({
      cfg,
      mesh,
    });
  });

  const setResponsiveScale = (scaleFactor) => {
    masterGroup.scale.setScalar(scaleFactor);
  };

  /**
   * Deterministic 6-stage scroll evaluation:
   * 
   * Stage 1: Individual Word Entrance (u: 0.00 - 0.18)
   * Stage 2: Independent 3D Movement (u: 0.18 - 0.38)
   * Stage 3: Words Converge into Balanced Editorial Layout (u: 0.38 - 0.55)
   * Stage 4: Composition Hold & 3D Perspective Tilt (u: 0.55 - 0.70)
   * Stage 5: Separation along Radial Corridors (u: 0.70 - 0.85)
   * Stage 6: Reassembly into Second Layout (u: 0.85 - 1.00)
   */
  const updateScroll = (u) => {
    const clampedU = Math.max(0, Math.min(1, u));

    wordEntries.forEach(({ cfg, mesh }) => {
      let targetPos;
      let targetRot;

      if (clampedU <= 0.18) {
        // STAGE 1 — INDIVIDUAL WORD ENTRANCE
        const t = smoothHermite(clampedU / 0.18);
        targetPos = lerpVec(cfg.stage1Entrance.pos, cfg.stage2Independent.pos, t);
        targetRot = lerpVec(cfg.stage1Entrance.rot, cfg.stage2Independent.rot, t);
      } else if (clampedU <= 0.38) {
        // STAGE 2 — INDEPENDENT 3D MOVEMENT
        const t = smoothHermite((clampedU - 0.18) / 0.20);
        targetPos = lerpVec(cfg.stage2Independent.pos, cfg.stage3Converge.pos, t);
        targetRot = lerpVec(cfg.stage2Independent.rot, cfg.stage3Converge.rot, t);
      } else if (clampedU <= 0.55) {
        // STAGE 3 — WORDS CONVERGE INTO BALANCED LAYOUT
        const t = smoothHermite((clampedU - 0.38) / 0.17);
        targetPos = lerpVec(cfg.stage2Independent.pos, cfg.stage3Converge.pos, 0.8 + 0.2 * t);
        targetRot = lerpVec(cfg.stage2Independent.rot, cfg.stage3Converge.rot, 0.8 + 0.2 * t);
      } else if (clampedU <= 0.70) {
        // STAGE 4 — COMPOSITION HOLD & SUBTLE 3D PERSPECTIVE TILT
        const t = smoothHermite((clampedU - 0.55) / 0.15);
        targetPos = lerpVec(cfg.stage3Converge.pos, cfg.stage4Transform.pos, t);
        targetRot = lerpVec(cfg.stage3Converge.rot, cfg.stage4Transform.rot, t);
      } else if (clampedU <= 0.85) {
        // STAGE 5 — SEPARATION ALONG RADIAL CORRIDORS (ZERO COLLISIONS)
        const t = smoothHermite((clampedU - 0.70) / 0.15);
        targetPos = lerpVec(cfg.stage4Transform.pos, cfg.stage5Separate.pos, t);
        targetRot = lerpVec(cfg.stage4Transform.rot, cfg.stage5Separate.rot, t);
      } else {
        // STAGE 6 — REASSEMBLY INTO SECOND EDITORIAL COMPOSITION
        const t = smoothHermite((clampedU - 0.85) / 0.15);
        targetPos = lerpVec(cfg.stage5Separate.pos, cfg.stage6Recompose.pos, t);
        targetRot = lerpVec(cfg.stage5Separate.rot, cfg.stage6Recompose.rot, t);
      }

      mesh.position.set(targetPos[0], targetPos[1], targetPos[2]);
      mesh.rotation.set(targetRot[0], targetRot[1], targetRot[2]);
    });
  };

  return {
    group: masterGroup,
    materials,
    wordEntries,
    updateScroll,
    setResponsiveScale,
    dispose: () => {
      wordEntries.forEach(({ mesh }) => {
        mesh.geometry.dispose();
      });
      Object.values(materials).forEach((mat) => {
        mat.dispose();
      });
    },
  };
}
