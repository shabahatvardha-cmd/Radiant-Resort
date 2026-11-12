import * as THREE from 'three';
import {
  createStrawberry,
  createOrangeSlice,
  createKiwiSlice,
  createAppleWedge,
  createCherryPair,
  createRaspberry,
  createCakeSlice,
  createChocolateDonut,
  createCupcake,
  createIceCreamCone,
  createMacaron,
  createWalnut,
  createAlmond,
  createCashew,
  createPistachioNut,
  createBlueberryCluster,
  createCheeseWedge,
  createFarfallePasta,
  createRigatoniPasta,
  createDumpling,
  createHerbLeaf,
} from './StylizedFoodMeshFactory.js';

/**
 * FloatingFoodUniverseScene.js
 * 
 * Manages 21 stylized 3D food items in a full-screen, scroll-driven universe:
 * 1. Full-Screen Distribution: Viewport is fully balanced across Left, Center-Left,
 *    Center, Center-Right, Right, and Upper, Middle, Lower regions.
 *    The central area is rich, dynamic, and populated at all scroll stages.
 * 2. 3 Depth Planes: Foreground (Z > 0.4), Midground (-0.8 <= Z <= 0.4),
 *    and Background (Z < -1.2) prevent visual congestion and ensure natural 3D depth.
 * 3. 5-Stage Continuous Scroll Timeline:
 *    - Stage 1 (u: 0.00 -> 0.20): Initial appearance, center populated immediately.
 *    - Stage 2 (u: 0.20 -> 0.40): Active travel, rotating fruits, gliding cakes.
 *    - Stage 3 (u: 0.40 -> 0.65): Dynamic rearrangement across central area.
 *    - Stage 4 (u: 0.65 -> 0.85): Fresh secondary balanced composition.
 *    - Stage 5 (u: 0.85 -> 1.00): Graceful multi-directional dispersion exit.
 * 4. Strict Non-Overlapping Guarantee: Surface clearance is maintained across all u in [0, 1].
 * 5. Reversible Scroll Scrubbing: 100% bound to scroll progress.
 */

// 21 Food Item Configurations with 5 Waypoints (P0, P1, P2, P3, P4) and Rotations (R0..R4)
export const FOOD_CONFIGS = [
  // ==========================================================================
  // CENTRAL CORRIDOR (6 ITEMS: Upper, Middle, Lower across 3 Depth Planes)
  // ==========================================================================

  // 1. Layered Patisserie Cake Slice (Center Upper - Mid/Foreground)
  {
    id: 'cakeSlice',
    factory: createCakeSlice,
    scale: 0.95,
    radius: 0.42,
    p0: [0.0, 2.6, 0.4],
    p1: [0.1, 1.5, 0.5],
    p2: [-0.3, 1.3, 0.3],
    p3: [0.2, 1.6, 0.4],
    p4: [0.0, 3.2, 0.2],
    r0: [0.2, 0.0, 0.1],
    r1: [0.35, 0.4, -0.1],
    r2: [0.1, 1.1, -0.2],
    r3: [-0.2, 1.8, 0.15],
    r4: [-0.4, 2.6, 0.3],
    floatPhase: 0.0,
  },

  // 2. Blueberry Cluster (Center Upper - Background Accent)
  {
    id: 'blueberryCluster',
    factory: createBlueberryCluster,
    scale: 0.95,
    radius: 0.28,
    p0: [-0.6, 2.8, -2.4],
    p1: [-0.5, 1.8, -2.0],
    p2: [0.5, 1.7, -2.2],
    p3: [-0.4, 1.9, -2.1],
    p4: [-0.8, 3.5, -2.8],
    r0: [0.0, 0.2, 0.3],
    r1: [0.4, 0.8, 0.6],
    r2: [0.8, 1.6, 0.9],
    r3: [1.2, 2.4, 1.3],
    r4: [1.6, 3.2, 1.7],
    floatPhase: 1.4,
  },

  // 3. Glossy Strawberry (Center Middle - Foreground Hero)
  {
    id: 'strawberry',
    factory: createStrawberry,
    scale: 1.05,
    radius: 0.42,
    p0: [-0.8, -0.4, 1.2],
    p1: [-0.4, -0.1, 1.0],
    p2: [0.3, 0.3, 0.9],
    p3: [-0.2, 0.2, 1.1],
    p4: [-0.5, 0.8, 1.4],
    r0: [-0.2, 0.1, -0.3],
    r1: [0.2, 0.6, 0.2],
    r2: [0.5, 1.4, -0.1],
    r3: [0.8, 2.2, 0.3],
    r4: [1.2, 3.0, 0.5],
    floatPhase: 0.7,
  },

  // 4. Chocolate Glazed Donut (Center Middle - Midground Traveler)
  {
    id: 'chocolateDonut',
    factory: createChocolateDonut,
    scale: 0.92,
    radius: 0.45,
    p0: [0.9, 0.3, -0.3],
    p1: [0.4, 0.1, -0.2],
    p2: [-0.4, -0.2, -0.3],
    p3: [0.3, -0.1, -0.2],
    p4: [0.8, -0.5, -0.4],
    r0: [0.4, -0.2, 0.5],
    r1: [0.7, 0.3, 0.9],
    r2: [1.1, 1.0, 1.5],
    r3: [1.5, 1.8, 2.1],
    r4: [2.0, 2.6, 2.8],
    floatPhase: 2.1,
  },

  // 5. Frosted Cupcake (Center Lower - Foreground Hero)
  {
    id: 'cupcake',
    factory: createCupcake,
    scale: 0.95,
    radius: 0.44,
    p0: [0.0, -2.8, 0.8],
    p1: [-0.1, -1.6, 0.7],
    p2: [0.2, -1.4, 0.6],
    p3: [-0.1, -1.5, 0.7],
    p4: [0.0, -3.2, 0.5],
    r0: [-0.2, 0.0, 0.2],
    r1: [0.1, 0.4, -0.1],
    r2: [0.3, 1.0, 0.2],
    r3: [0.2, 1.6, -0.15],
    r4: [0.0, 2.4, 0.1],
    floatPhase: 3.5,
  },

  // 6. Farfalle Bow-Tie Pasta (Center Lower - Midground)
  {
    id: 'farfallePasta',
    factory: createFarfallePasta,
    scale: 1.0,
    radius: 0.35,
    p0: [0.8, -2.9, -0.6],
    p1: [0.6, -1.8, -0.5],
    p2: [-0.5, -1.9, -0.6],
    p3: [0.5, -1.7, -0.5],
    p4: [0.9, -3.4, -0.8],
    r0: [0.3, 0.2, -0.4],
    r1: [0.6, 0.8, 0.1],
    r2: [1.0, 1.5, 0.7],
    r3: [1.4, 2.2, 1.2],
    r4: [1.8, 3.0, 1.6],
    floatPhase: 4.2,
  },

  // ==========================================================================
  // CENTER-LEFT CORRIDOR (4 ITEMS)
  // ==========================================================================

  // 7. Cherry Pair on Stem (Center-Left Upper - Mid/Background)
  {
    id: 'cherryPair',
    factory: createCherryPair,
    scale: 0.95,
    radius: 0.38,
    p0: [-1.8, 2.7, -1.4],
    p1: [-1.6, 1.6, -1.1],
    p2: [-1.4, 1.8, -1.3],
    p3: [-1.7, 1.5, -1.1],
    p4: [-2.2, 3.2, -1.6],
    r0: [0.1, 0.3, -0.2],
    r1: [0.3, 0.7, 0.1],
    r2: [0.1, 1.3, 0.4],
    r3: [-0.2, 1.9, 0.6],
    r4: [-0.5, 2.6, 0.8],
    floatPhase: 1.8,
  },

  // 8. French Macaron (Center-Left Middle - Midground)
  {
    id: 'macaron',
    factory: createMacaron,
    scale: 0.95,
    radius: 0.38,
    p0: [-2.5, 0.6, 0.3],
    p1: [-1.8, 0.2, 0.2],
    p2: [-1.7, -0.4, 0.3],
    p3: [-1.9, 0.3, 0.2],
    p4: [-2.6, 0.8, 0.1],
    r0: [0.4, -0.3, 0.3],
    r1: [0.7, 0.2, 0.6],
    r2: [1.2, 0.8, 0.9],
    r3: [1.6, 1.4, 1.3],
    r4: [2.1, 2.0, 1.7],
    floatPhase: 2.8,
  },

  // 9. Crisp Apple Wedge (Center-Left Lower - Midground)
  {
    id: 'appleWedge',
    factory: createAppleWedge,
    scale: 0.95,
    radius: 0.36,
    p0: [-1.6, -2.8, -0.4],
    p1: [-1.5, -1.4, -0.3],
    p2: [-1.3, -1.1, -0.2],
    p3: [-1.6, -1.3, -0.4],
    p4: [-2.0, -3.1, -0.6],
    r0: [-0.2, 0.4, 0.3],
    r1: [0.1, 0.9, 0.6],
    r2: [0.4, 1.5, 0.8],
    r3: [0.7, 2.2, 1.1],
    r4: [1.0, 2.8, 1.4],
    floatPhase: 3.9,
  },

  // 10. Golden Cashew Nut (Center-Left Far Lower - Background)
  {
    id: 'cashew',
    factory: createCashew,
    scale: 1.05,
    radius: 0.32,
    p0: [-2.1, -3.1, -2.2],
    p1: [-1.9, -2.1, -2.0],
    p2: [-2.0, -1.8, -2.1],
    p3: [-1.8, -2.2, -1.9],
    p4: [-2.4, -3.6, -2.6],
    r0: [0.4, 0.6, -0.2],
    r1: [0.8, 1.2, 0.2],
    r2: [1.3, 1.8, 0.7],
    r3: [1.8, 2.5, 1.1],
    r4: [2.3, 3.2, 1.6],
    floatPhase: 5.1,
  },

  // ==========================================================================
  // CENTER-RIGHT CORRIDOR (4 ITEMS)
  // ==========================================================================

  // 11. Orange Citrus Wheel (Center-Right Upper - Foreground/Mid)
  {
    id: 'orangeSlice',
    factory: createOrangeSlice,
    scale: 0.95,
    radius: 0.42,
    p0: [1.8, 2.6, 0.6],
    p1: [1.6, 1.5, 0.5],
    p2: [1.4, 1.3, 0.4],
    p3: [1.7, 1.6, 0.5],
    p4: [2.2, 3.1, 0.4],
    r0: [0.5, -0.4, 0.6],
    r1: [0.9, 0.2, 1.1],
    r2: [1.4, 0.8, 1.7],
    r3: [1.8, 1.5, 2.3],
    r4: [2.3, 2.2, 2.9],
    floatPhase: 0.9,
  },

  // 12. Pistachio Nut (Center-Right Upper - Background)
  {
    id: 'pistachioNut',
    factory: createPistachioNut,
    scale: 1.0,
    radius: 0.32,
    p0: [2.1, 2.9, -2.0],
    p1: [1.9, 2.0, -1.8],
    p2: [1.8, 1.8, -1.9],
    p3: [2.0, 2.1, -1.8],
    p4: [2.5, 3.5, -2.5],
    r0: [0.2, 0.5, -0.3],
    r1: [0.6, 1.1, 0.1],
    r2: [1.1, 1.7, 0.6],
    r3: [1.6, 2.4, 1.0],
    r4: [2.1, 3.1, 1.5],
    floatPhase: 2.3,
  },

  // 13. Golden Cheese Wedge (Center-Right Middle - Midground)
  {
    id: 'cheeseWedge',
    factory: createCheeseWedge,
    scale: 0.95,
    radius: 0.38,
    p0: [2.4, 0.3, 0.2],
    p1: [1.7, -0.1, 0.1],
    p2: [1.6, 0.4, 0.2],
    p3: [1.8, -0.2, 0.1],
    p4: [2.5, -0.5, 0.0],
    r0: [0.3, 0.2, -0.2],
    r1: [0.6, 0.7, 0.2],
    r2: [1.0, 1.3, 0.6],
    r3: [1.4, 1.9, 1.1],
    r4: [1.9, 2.6, 1.5],
    floatPhase: 3.2,
  },

  // 14. Kiwi Wheel Slice (Center-Right Lower - Midground)
  {
    id: 'kiwiSlice',
    factory: createKiwiSlice,
    scale: 0.95,
    radius: 0.40,
    p0: [1.8, -2.7, -0.5],
    p1: [1.6, -1.5, -0.4],
    p2: [1.4, -1.2, -0.3],
    p3: [1.7, -1.4, -0.4],
    p4: [2.1, -2.9, -0.6],
    r0: [0.3, -0.5, -0.4],
    r1: [0.7, 0.1, 0.2],
    r2: [1.2, 0.7, 0.8],
    r3: [1.7, 1.4, 1.4],
    r4: [2.2, 2.0, 2.0],
    floatPhase: 4.5,
  },

  // ==========================================================================
  // FAR-LEFT CORRIDOR (3 ITEMS)
  // ==========================================================================

  // 15. Ice Cream Cone with Swirl (Far-Left Upper - Midground Hero)
  {
    id: 'iceCreamCone',
    factory: createIceCreamCone,
    scale: 0.92,
    radius: 0.45,
    p0: [-3.8, 2.8, -0.3],
    p1: [-3.2, 1.6, -0.2],
    p2: [-3.0, 1.3, -0.1],
    p3: [-3.3, 1.5, -0.2],
    p4: [-4.2, 2.6, -0.4],
    r0: [-0.2, 0.5, -0.3],
    r1: [0.1, 0.9, -0.1],
    r2: [0.4, 1.4, 0.2],
    r3: [0.7, 2.0, 0.4],
    r4: [1.0, 2.6, 0.7],
    floatPhase: 1.1,
  },

  // 16. Sculpted Walnut (Far-Left Middle - Background)
  {
    id: 'walnut',
    factory: createWalnut,
    scale: 1.05,
    radius: 0.35,
    p0: [-4.2, 0.1, -2.0],
    p1: [-3.5, -0.2, -1.8],
    p2: [-3.3, 0.3, -1.9],
    p3: [-3.6, -0.1, -1.8],
    p4: [-4.4, -0.5, -2.3],
    r0: [-0.4, 0.3, 0.6],
    r1: [0.1, 0.8, 1.0],
    r2: [0.6, 1.4, 1.5],
    r3: [1.1, 2.0, 2.0],
    r4: [1.7, 2.7, 2.5],
    floatPhase: 2.6,
  },

  // 17. Fluted Rigatoni Pasta (Far-Left Lower - Midground)
  {
    id: 'rigatoniPasta',
    factory: createRigatoniPasta,
    scale: 1.0,
    radius: 0.36,
    p0: [-3.7, -2.7, -0.7],
    p1: [-3.1, -1.6, -0.6],
    p2: [-3.3, -1.2, -0.5],
    p3: [-3.2, -1.5, -0.6],
    p4: [-4.0, -2.8, -0.9],
    r0: [0.6, -0.2, 0.5],
    r1: [1.0, 0.4, 0.9],
    r2: [1.5, 1.0, 1.4],
    r3: [2.0, 1.7, 1.9],
    r4: [2.5, 2.3, 2.4],
    floatPhase: 4.8,
  },

  // ==========================================================================
  // FAR-RIGHT CORRIDOR (4 ITEMS)
  // ==========================================================================

  // 18. Clustered Velvet Raspberry (Far-Right Upper - Midground)
  {
    id: 'raspberry',
    factory: createRaspberry,
    scale: 1.1,
    radius: 0.35,
    p0: [3.8, 2.7, -0.6],
    p1: [3.2, 1.7, -0.5],
    p2: [3.0, 1.4, -0.4],
    p3: [3.3, 1.6, -0.5],
    p4: [4.1, 2.8, -0.7],
    r0: [0.4, -0.2, 0.3],
    r1: [0.8, 0.4, 0.7],
    r2: [1.3, 1.0, 1.1],
    r3: [1.8, 1.7, 1.6],
    r4: [2.3, 2.4, 2.1],
    floatPhase: 1.6,
  },

  // 19. Steamed Golden Dumpling (Far-Right Middle - Mid/Foreground)
  {
    id: 'dumpling',
    factory: createDumpling,
    scale: 0.95,
    radius: 0.40,
    p0: [4.2, 0.3, 0.4],
    p1: [3.4, 0.1, 0.3],
    p2: [3.2, -0.3, 0.2],
    p3: [3.5, 0.2, 0.3],
    p4: [4.3, 0.5, 0.1],
    r0: [0.3, -0.4, -0.2],
    r1: [0.6, 0.2, 0.2],
    r2: [1.0, 0.8, 0.6],
    r3: [1.4, 1.5, 1.1],
    r4: [1.9, 2.2, 1.6],
    floatPhase: 3.0,
  },

  // 20. Fresh Basil Herb Leaf (Far-Right Lower - Foreground/Mid)
  {
    id: 'herbLeaf',
    factory: createHerbLeaf,
    scale: 1.1,
    radius: 0.32,
    p0: [3.7, -2.8, 0.9],
    p1: [3.1, -1.7, 0.8],
    p2: [2.9, -1.3, 0.7],
    p3: [3.2, -1.6, 0.8],
    p4: [4.0, -3.0, 0.6],
    r0: [0.1, 0.4, 0.2],
    r1: [0.4, 0.9, 0.6],
    r2: [0.8, 1.5, 1.1],
    r3: [1.2, 2.1, 1.6],
    r4: [1.7, 2.8, 2.2],
    floatPhase: 4.1,
  },

  // 21. Roasted Almond (Far-Right Far Lower - Background)
  {
    id: 'almond',
    factory: createAlmond,
    scale: 1.1,
    radius: 0.32,
    p0: [3.6, -3.2, -2.4],
    p1: [3.0, -2.2, -2.2],
    p2: [3.2, -1.9, -2.1],
    p3: [3.1, -2.3, -2.2],
    p4: [3.8, -3.6, -2.7],
    r0: [-0.3, 0.6, 0.5],
    r1: [0.2, 1.2, 0.9],
    r2: [0.7, 1.9, 1.4],
    r3: [1.2, 2.6, 1.9],
    r4: [1.8, 3.4, 2.5],
    floatPhase: 5.4,
  },
];

/**
 * Catmull-Rom cubic spline interpolator for 5 points
 * t in [0, 1] mapped across segments [p0, p1, p2, p3, p4]
 */
function interpolateSpline(p0, p1, p2, p3, p4, t) {
  // 4 segments: [0..0.25], [0.25..0.5], [0.5..0.75], [0.75..1.0]
  const clampedT = Math.max(0, Math.min(1, t));
  const segment = Math.min(3, Math.floor(clampedT * 4));
  const localT = (clampedT - segment * 0.25) * 4;

  // Hermite smooth step within segment for buttery smooth transitions
  const smoothT = localT * localT * (3 - 2 * localT);

  const pts = [p0, p1, p2, p3, p4];
  const a = pts[segment];
  const b = pts[segment + 1];

  return [
    THREE.MathUtils.lerp(a[0], b[0], smoothT),
    THREE.MathUtils.lerp(a[1], b[1], smoothT),
    THREE.MathUtils.lerp(a[2], b[2], smoothT),
  ];
}

/**
 * Angle lerp for smooth continuous rotation
 */
function interpolateRotation(r0, r1, r2, r3, r4, t) {
  const clampedT = Math.max(0, Math.min(1, t));
  const segment = Math.min(3, Math.floor(clampedT * 4));
  const localT = (clampedT - segment * 0.25) * 4;
  const smoothT = localT * localT * (3 - 2 * localT);

  const rots = [r0, r1, r2, r3, r4];
  const a = rots[segment];
  const b = rots[segment + 1];

  return [
    THREE.MathUtils.lerp(a[0], b[0], smoothT),
    THREE.MathUtils.lerp(a[1], b[1], smoothT),
    THREE.MathUtils.lerp(a[2], b[2], smoothT),
  ];
}

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

    // Initial position & rotation at u = 0
    meshGroup.position.set(...cfg.p0);
    meshGroup.rotation.set(...cfg.r0);

    rootGroup.add(meshGroup);

    foodItems.push({
      mesh: meshGroup,
      cfg,
    });
  });

  /**
   * Update scroll animation:
   * @param {number} u - Normalized scroll progress in [0, 1] for Stage 4
   * @param {number} time - Elapsed clock time for gentle micro-idle float
   */
  function updateScroll(u, time = 0) {
    const clampedU = Math.max(0, Math.min(1, u));

    foodItems.forEach((item) => {
      const { cfg, mesh } = item;

      // Calculate 3D position along the 5-stage spline trajectory
      const [posX, posY, posZ] = interpolateSpline(
        cfg.p0,
        cfg.p1,
        cfg.p2,
        cfg.p3,
        cfg.p4,
        clampedU
      );

      // Calculate 3D orientation along the 5-stage rotation choreography
      const [rotX, rotY, rotZ] = interpolateRotation(
        cfg.r0,
        cfg.r1,
        cfg.r2,
        cfg.r3,
        cfg.r4,
        clampedU
      );

      // Micro-idle float: gentle secondary oscillation (amplitude <= 0.03 units)
      // Maintains organic life without violating spatial collision boundaries
      const microFloatY = Math.sin(time * 1.1 + cfg.floatPhase) * 0.025;
      const microFloatRotY = Math.cos(time * 0.7 + cfg.floatPhase) * 0.03;

      mesh.position.set(posX, posY + microFloatY, posZ);
      mesh.rotation.set(rotX, rotY + microFloatRotY, rotZ);
    });
  }

  /**
   * Memory Cleanup
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
