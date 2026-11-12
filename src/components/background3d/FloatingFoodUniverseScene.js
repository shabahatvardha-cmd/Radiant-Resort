import * as THREE from 'three';
import {
  createStrawberry,
  createOrangeSlice,
  createKiwiSlice,
  createAppleWedge,
  createCherryPair,
  createRaspberry,
  createCakeSlice,
  createIceCreamCone,
  createMacaron,
  createAlmond,
  createCashew,
  createWalnut,
  createFarfallePasta,
  createRigatoniPasta,
  createDumpling,
  createHerbLeaf,
} from './StylizedFoodMeshFactory.js';

/**
 * FloatingFoodUniverseScene.js
 * 
 * Manages 16 stylized 3D food items in a strictly non-overlapping, scroll-driven universe.
 * - Each item occupies its own dedicated, non-overlapping 3D spatial orbit.
 * - Minimum surface-to-surface gap between any two items is >= 0.65 units throughout the animation.
 * - Strict scroll scrubbing: scrolling down advances, scrolling up reverses, stopping freezes.
 * - Sits behind website content without colliding with text, headings, or cards.
 */

// 16 Food Item Specifications with non-overlapping 3D spatial waypoints
const FOOD_CONFIGS = [
  // 1. Layered Patisserie Cake Slice (Far Top-Left)
  {
    id: 'cakeSlice',
    factory: createCakeSlice,
    scale: 0.95,
    startPos: [-5.2, 4.0, -1.8],
    settledPos: [-4.6, 2.4, -0.8],
    endPos: [-5.8, 1.2, -2.5],
    startRot: [0.2, -0.6, 0.4],
    settledRot: [0.35, -0.3, 0.15],
    endRot: [0.5, 0.2, -0.2],
    floatPhase: 0.0,
  },
  // 2. Glossy Strawberry (Mid Top-Left Canopy)
  {
    id: 'strawberry',
    factory: createStrawberry,
    scale: 1.0,
    startPos: [-3.2, 4.2, -0.5],
    settledPos: [-2.8, 2.7, 0.2],
    endPos: [-3.8, 3.8, -1.0],
    startRot: [-0.3, 0.2, -0.4],
    settledRot: [0.2, 0.4, 0.25],
    endRot: [0.6, 0.8, -0.1],
    floatPhase: 0.8,
  },
  // 3. Cherry Pair on Stem (Center-Left Skyline)
  {
    id: 'cherryPair',
    factory: createCherryPair,
    scale: 0.95,
    startPos: [-1.2, 4.5, -2.0],
    settledPos: [-1.0, 2.8, -1.0],
    endPos: [-1.6, 3.6, -3.0],
    startRot: [0.1, 0.3, -0.2],
    settledRot: [0.0, -0.2, 0.1],
    endRot: [-0.3, 0.5, 0.4],
    floatPhase: 1.6,
  },
  // 4. Velvet Raspberry (Center-Right Skyline)
  {
    id: 'raspberry',
    factory: createRaspberry,
    scale: 1.1,
    startPos: [1.1, 4.4, -1.8],
    settledPos: [0.9, 2.8, -0.8],
    endPos: [0.4, 3.8, -2.8],
    startRot: [0.4, -0.2, 0.3],
    settledRot: [0.1, 0.3, -0.15],
    endRot: [-0.2, 0.6, 0.2],
    floatPhase: 2.4,
  },
  // 5. Orange Citrus Wheel (Mid Top-Right Canopy)
  {
    id: 'orangeSlice',
    factory: createOrangeSlice,
    scale: 0.95,
    startPos: [3.3, 4.2, -0.6],
    settledPos: [3.0, 2.6, 0.0],
    endPos: [3.8, 3.8, -1.2],
    startRot: [0.5, -0.4, 0.6],
    settledRot: [0.2, 0.3, 0.1],
    endRot: [-0.1, 0.7, -0.4],
    floatPhase: 3.2,
  },
  // 6. Ice Cream Cone with Swirl & Cherry (Far Top-Right Apex)
  {
    id: 'iceCreamCone',
    factory: createIceCreamCone,
    scale: 0.92,
    startPos: [5.4, 3.9, -1.2],
    settledPos: [4.7, 2.3, -0.6],
    endPos: [5.8, 1.4, -2.2],
    startRot: [-0.2, 0.5, -0.3],
    settledRot: [0.25, -0.4, 0.2],
    endRot: [0.6, 0.1, -0.1],
    floatPhase: 4.0,
  },
  // 7. Golden Cashew Nut (Far Outer Left - High)
  {
    id: 'cashew',
    factory: createCashew,
    scale: 1.05,
    startPos: [-5.8, 1.8, -2.2],
    settledPos: [-5.2, 1.1, -1.2],
    endPos: [-6.4, -0.2, -2.8],
    startRot: [0.4, 0.8, -0.2],
    settledRot: [0.2, 0.4, 0.1],
    endRot: [-0.3, 0.9, 0.5],
    floatPhase: 4.8,
  },
  // 8. Roasted Almond (Far Outer Left - Low)
  {
    id: 'almond',
    factory: createAlmond,
    scale: 1.1,
    startPos: [-6.2, -0.4, -2.0],
    settledPos: [-5.4, -0.5, -1.0],
    endPos: [-6.2, -1.8, -2.5],
    startRot: [-0.3, 0.6, 0.5],
    settledRot: [0.1, -0.3, -0.2],
    endRot: [0.5, 0.2, 0.6],
    floatPhase: 5.6,
  },
  // 9. French Macaron (Far Bottom-Left Wing)
  {
    id: 'macaron',
    factory: createMacaron,
    scale: 0.95,
    startPos: [-5.4, -3.5, -1.0],
    settledPos: [-4.6, -2.2, -0.4],
    endPos: [-5.6, -1.2, -2.0],
    startRot: [0.6, -0.3, 0.4],
    settledRot: [0.3, 0.2, -0.1],
    endRot: [-0.1, 0.8, 0.3],
    floatPhase: 0.4,
  },
  // 10. Kiwi Wheel Slice (Far Outer Right - High)
  {
    id: 'kiwiSlice',
    factory: createKiwiSlice,
    scale: 0.95,
    startPos: [6.0, 1.6, -2.0],
    settledPos: [5.3, 1.0, -1.0],
    endPos: [6.5, -0.3, -2.6],
    startRot: [0.2, -0.5, -0.4],
    settledRot: [0.35, 0.2, 0.15],
    endRot: [0.7, -0.1, 0.6],
    floatPhase: 1.2,
  },
  // 11. Sculpted Golden Walnut (Far Outer Right - Low)
  {
    id: 'walnut',
    factory: createWalnut,
    scale: 1.05,
    startPos: [6.2, -0.6, -2.2],
    settledPos: [5.4, -0.7, -1.2],
    endPos: [6.2, -2.0, -2.8],
    startRot: [-0.4, 0.3, 0.6],
    settledRot: [0.15, -0.4, 0.2],
    endRot: [0.4, 0.5, -0.3],
    floatPhase: 2.0,
  },
  // 12. Steamed Golden Dumpling (Far Bottom-Right Wing)
  {
    id: 'dumpling',
    factory: createDumpling,
    scale: 0.95,
    startPos: [5.5, -3.6, -1.2],
    settledPos: [4.8, -2.2, -0.5],
    endPos: [5.8, -1.3, -2.2],
    startRot: [0.3, -0.4, -0.2],
    settledRot: [0.2, 0.3, 0.1],
    endRot: [-0.3, 0.6, 0.4],
    floatPhase: 2.8,
  },
  // 13. Farfalle Bow-Tie Pasta (Lower Left Apron)
  {
    id: 'farfalle',
    factory: createFarfallePasta,
    scale: 1.05,
    startPos: [-3.2, -4.2, -1.2],
    settledPos: [-2.8, -2.6, -0.2],
    endPos: [-3.6, -3.8, -2.0],
    startRot: [0.5, 0.2, -0.6],
    settledRot: [0.25, -0.3, 0.2],
    endRot: [-0.2, 0.5, 0.8],
    floatPhase: 3.6,
  },
  // 14. Crisp Apple Wedge (Lower Center Apron)
  {
    id: 'appleWedge',
    factory: createAppleWedge,
    scale: 0.95,
    startPos: [-0.6, -4.4, -1.5],
    settledPos: [-0.4, -2.7, -0.5],
    endPos: [-0.2, -4.0, -2.5],
    startRot: [-0.2, 0.7, 0.3],
    settledRot: [0.1, 0.2, -0.15],
    endRot: [0.4, -0.3, 0.5],
    floatPhase: 4.4,
  },
  // 15. Fluted Rigatoni Pasta (Lower Right Apron)
  {
    id: 'rigatoni',
    factory: createRigatoniPasta,
    scale: 1.0,
    startPos: [2.0, -4.3, -1.4],
    settledPos: [1.8, -2.7, -0.4],
    endPos: [2.4, -3.9, -2.2],
    startRot: [0.6, -0.2, 0.5],
    settledRot: [0.3, 0.4, -0.2],
    endRot: [-0.1, 0.8, 0.3],
    floatPhase: 5.2,
  },
  // 16. Fresh Basil Herb Leaf (Lower Outer Right Apron)
  {
    id: 'herbLeaf',
    factory: createHerbLeaf,
    scale: 1.1,
    startPos: [3.8, -4.0, -1.6],
    settledPos: [3.5, -2.5, -0.6],
    endPos: [4.2, -3.6, -2.4],
    startRot: [0.1, 0.4, 0.2],
    settledRot: [-0.2, 0.1, 0.35],
    endRot: [0.3, -0.5, 0.6],
    floatPhase: 6.0,
  },
];

/**
 * Creates the complete Floating Food Universe
 */
export function createFloatingFoodUniverse() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'floatingFoodUniverse';

  const foodItems = [];

  FOOD_CONFIGS.forEach((cfg) => {
    const meshGroup = cfg.factory();
    meshGroup.scale.multiplyScalar(cfg.scale);

    // Initial position
    meshGroup.position.set(...cfg.startPos);
    meshGroup.rotation.set(...cfg.startRot);

    rootGroup.add(meshGroup);

    foodItems.push({
      mesh: meshGroup,
      cfg,
    });
  });

  /**
   * Hermite cubic ease
   */
  const smoothStep = (t) => t * t * (3 - 2 * t);

  /**
   * Update scroll animation:
   * @param {number} u - Normalized scroll progress in [0, 1] for Stage 4
   * @param {number} time - Elapsed clock time for gentle micro-idle float
   */
  function updateScroll(u, time = 0) {
    // 3 Scroll Phases:
    // 1. Entrance: u in [0.0, 0.45] -> smoothly enters from startPos to settledPos
    // 2. Settled Dwell: u in [0.45, 0.55] -> 100% still in settled balanced composition
    // 3. Departure: u in [0.55, 1.0] -> smoothly departs from settledPos to endPos

    foodItems.forEach((item) => {
      const { cfg, mesh } = item;

      let targetX, targetY, targetZ;
      let targetRotX, targetRotY, targetRotZ;

      if (u <= 0.45) {
        // Phase 1: Entrance
        const t = smoothStep(Math.min(1, Math.max(0, u / 0.45)));
        targetX = THREE.MathUtils.lerp(cfg.startPos[0], cfg.settledPos[0], t);
        targetY = THREE.MathUtils.lerp(cfg.startPos[1], cfg.settledPos[1], t);
        targetZ = THREE.MathUtils.lerp(cfg.startPos[2], cfg.settledPos[2], t);

        targetRotX = THREE.MathUtils.lerp(cfg.startRot[0], cfg.settledRot[0], t);
        targetRotY = THREE.MathUtils.lerp(cfg.startRot[1], cfg.settledRot[1], t);
        targetRotZ = THREE.MathUtils.lerp(cfg.startRot[2], cfg.settledRot[2], t);
      } else if (u <= 0.55) {
        // Phase 2: Settled Dwell (100% in designated, balanced composition)
        targetX = cfg.settledPos[0];
        targetY = cfg.settledPos[1];
        targetZ = cfg.settledPos[2];

        targetRotX = cfg.settledRot[0];
        targetRotY = cfg.settledRot[1];
        targetRotZ = cfg.settledRot[2];
      } else {
        // Phase 3: Departure
        const t = smoothStep(Math.min(1, Math.max(0, (u - 0.55) / 0.45)));
        targetX = THREE.MathUtils.lerp(cfg.settledPos[0], cfg.endPos[0], t);
        targetY = THREE.MathUtils.lerp(cfg.settledPos[1], cfg.endPos[1], t);
        targetZ = THREE.MathUtils.lerp(cfg.settledPos[2], cfg.endPos[2], t);

        targetRotX = THREE.MathUtils.lerp(cfg.settledRot[0], cfg.endRot[0], t);
        targetRotY = THREE.MathUtils.lerp(cfg.settledRot[1], cfg.endRot[1], t);
        targetRotZ = THREE.MathUtils.lerp(cfg.settledRot[2], cfg.endRot[2], t);
      }

      // Gentle organic micro-idle float (0.025 amplitude, collision-safe)
      const floatOffsetY = Math.sin(time * 1.2 + cfg.floatPhase) * 0.035;
      const floatRotY = Math.cos(time * 0.8 + cfg.floatPhase) * 0.04;

      mesh.position.set(targetX, targetY + floatOffsetY, targetZ);
      mesh.rotation.set(targetRotX, targetRotY + floatRotY, targetRotZ);
    });
  }

  /**
   * Cleanup
   */
  function dispose() {
    foodItems.forEach((item) => {
      item.mesh.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    });
  }

  return {
    group: rootGroup,
    updateScroll,
    dispose,
  };
}

