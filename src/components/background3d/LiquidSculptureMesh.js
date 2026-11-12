import * as THREE from 'three';

/**
 * Procedural generation of the Unified Liquid Chrome Sculpture and its 4 complementary
 * interlocking fragments.
 * 
 * In Phase 1 & Phase 5 (unified state), the 4 fragments align at (0,0,0) to form ONE
 * continuous organic twisted loop with fluid liquid folds.
 * 
 * In Phase 3 & Phase 4, the 4 fragments separate into distinct substantial sculptural pieces
 * moving in independent 3D directions with their own rotations and depth offsets.
 */

// Parametric curve defining the continuous luxury organic loop
function getCurvePoint(t, scale = 1.9) {
  const x = scale * (Math.sin(t) + 0.38 * Math.sin(3 * t) + 0.16 * Math.cos(2 * t));
  const y = scale * (0.82 * Math.cos(t) + 0.32 * Math.cos(2 * t) - 0.22 * Math.sin(3 * t));
  const z = scale * (0.65 * Math.sin(2 * t) + 0.28 * Math.cos(4 * t));
  return new THREE.Vector3(x, y, z);
}

// Numerical tangent along the curve
function getCurveTangent(t) {
  const delta = 0.002;
  const p1 = getCurvePoint(t - delta);
  const p2 = getCurvePoint(t + delta);
  return p2.sub(p1).normalize();
}

/**
 * Builds a single substantial, solid organic fragment spanning t in [tStart, tEnd].
 * Each fragment is a closed manifold with smooth rounded end-caps so when apart it looks
 * like a complete piece of contemporary chrome sculpture, and when united at (0,0,0)
 * its junctions meet with seamless precision.
 */
function createFragmentGeometry(tStart, tEnd, rings = 40, radialSegments = 32) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const baseRadius = 0.44;

  // Precompute reference frames (parallel transport) along the segment
  const points = [];
  const tangents = [];
  const normalsVec = [];
  const binormals = [];

  let up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= rings; i++) {
    const fraction = i / rings;
    const t = tStart + fraction * (tEnd - tStart);
    const p = getCurvePoint(t);
    const T = getCurveTangent(t);

    if (Math.abs(T.dot(up)) > 0.95) {
      up = new THREE.Vector3(1, 0, 0);
    }
    const N = new THREE.Vector3().crossVectors(T, up).normalize();
    const B = new THREE.Vector3().crossVectors(T, N).normalize();
    up = B; // preserve frame continuity

    points.push(p);
    tangents.push(T);
    normalsVec.push(N);
    binormals.push(B);
  }

  // Generate vertices
  for (let i = 0; i <= rings; i++) {
    const fraction = i / rings;
    const t = tStart + fraction * (tEnd - tStart);
    const p = points[i];
    const N = normalsVec[i];
    const B = binormals[i];

    // Smooth cap factor at the boundaries so fragments have elegant rounded joint caps
    // capFactor is 1.0 in the body and smoothly rounds to 0.05 at the exact ends
    const endDist = Math.min(fraction, 1 - fraction);
    const capFactor = endDist < 0.06 ? Math.sin((endDist / 0.06) * (Math.PI / 2)) * 0.95 + 0.05 : 1.0;

    for (let j = 0; j <= radialSegments; j++) {
      const phi = (j / radialSegments) * Math.PI * 2;

      // Liquid undulation formula (fluid organic ripples and folds)
      const liquidWave = 1.0 + 
        0.28 * Math.cos(2 * phi + 3 * t) + 
        0.16 * Math.sin(3 * phi - t) + 
        0.10 * Math.cos(4 * t + phi);

      const r = baseRadius * liquidWave * capFactor;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const radialDir = new THREE.Vector3()
        .addScaledVector(N, cosP)
        .addScaledVector(B, sinP)
        .normalize();

      const vertex = new THREE.Vector3().copy(p).addScaledVector(radialDir, r);

      positions.push(vertex.x, vertex.y, vertex.z);

      // Normal vector approximation
      normals.push(radialDir.x, radialDir.y, radialDir.z);

      uvs.push(j / radialSegments, fraction);
    }
  }

  // Generate quad indices
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates the complete sculpture system consisting of 4 substantial fragments
 * assembled into a single master Group.
 */
export function createLiquidSculpture() {
  const masterGroup = new THREE.Group();

  // Premium realistic polished solid metallic gold physical material
  const metallicGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf3c764), // Rich polished 24K / champagne gold
    emissive: new THREE.Color(0x1a1205), // Subtle warm gold radiance so dark angles never vanish into black
    metalness: 1.0, // 100% metallic PBR surface
    roughness: 0.22, // Smooth, lustrous satin-polished gold finish (recommended 0.18-0.28)
    clearcoat: 0.95, // High-end museum lacquer clearcoat
    clearcoatRoughness: 0.07,
    reflectivity: 1.0,
    envMapIntensity: 2.8, // Enhanced reflections from HDR studio environment
  });

  const fragments = [];

  // Define 4 quarters of the continuous organic loop
  const QUARTERS = [
    { start: 0, end: Math.PI / 2, name: 'frag_top_right', dir: new THREE.Vector3(1.7, 1.2, 0.9), rot: new THREE.Vector3(0.45, -0.6, 0.35) },
    { start: Math.PI / 2, end: Math.PI, name: 'frag_top_left', dir: new THREE.Vector3(-1.8, 1.0, -0.8), rot: new THREE.Vector3(-0.5, 0.55, -0.4) },
    { start: Math.PI, end: (3 * Math.PI) / 2, name: 'frag_bottom_left', dir: new THREE.Vector3(-1.5, -1.3, 1.0), rot: new THREE.Vector3(0.35, 0.45, -0.55) },
    { start: (3 * Math.PI) / 2, end: 2 * Math.PI, name: 'frag_bottom_right', dir: new THREE.Vector3(1.6, -1.1, -0.7), rot: new THREE.Vector3(-0.4, -0.5, 0.6) },
  ];

  QUARTERS.forEach((q, idx) => {
    const geo = createFragmentGeometry(q.start, q.end);
    const mesh = new THREE.Mesh(geo, metallicGoldMaterial);
    mesh.name = q.name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    masterGroup.add(mesh);

    fragments.push({
      mesh,
      targetDir: q.dir,
      targetRot: q.rot,
      basePos: new THREE.Vector3(0, 0, 0),
      baseRot: new THREE.Vector3(0, 0, 0),
    });
  });

  /**
   * Smooth cubic hermite ease function for organic, continuous motion
   */
  const smoothStep = (t) => {
    const c = Math.max(0, Math.min(1, t));
    return c * c * (3 - 2 * c);
  };

  /**
   * Deterministic scroll animation controller mapping scroll progress u in [0, 1]
   * across all 6 phases described in the specification:
   * 
   * Phase 1 (0.00 - 0.12): Original Form (complete unified sculpture)
   * Phase 2 (0.12 - 0.32): Gradual Deformation & Stretching
   * Phase 3 (0.32 - 0.58): Splitting Apart into 4 substantial fragments
   * Phase 4 (0.58 - 0.75): Full Artistic Separation on multiple depth planes
   * Phase 5 (0.75 - 0.90): Reassembly & Reconstruction back to (0,0,0)
   * Phase 6 (0.90 - 1.00): Final Transformation into a reconfigured unified silhouette
   */
  const updateScrollAnimation = (u, time = 0) => {
    const clampedU = Math.max(0, Math.min(1, u));

    // Master subtle organic floating tilt (non-distracting, preserves scroll position)
    const breathe = Math.sin(time * 0.8) * 0.04;
    masterGroup.rotation.y = clampedU * Math.PI * 0.45 + breathe;
    masterGroup.rotation.x = Math.sin(clampedU * Math.PI) * 0.18;

    let separationFactor = 0;
    let stretchScaleX = 1.0;
    let stretchScaleY = 1.0;
    let stretchScaleZ = 1.0;

    if (clampedU <= 0.12) {
      // PHASE 1 — ORIGINAL FORM: fully unified, locked at (0,0,0)
      separationFactor = 0;
      stretchScaleX = 1.0;
      stretchScaleY = 1.0;
      stretchScaleZ = 1.0;
    } else if (clampedU <= 0.32) {
      // PHASE 2 — GRADUAL DEFORMATION: stretches under metallic tension
      const p = smoothStep((clampedU - 0.12) / 0.20);
      separationFactor = p * 0.08; // very slight joint pull
      stretchScaleX = 1.0 + p * 0.22;
      stretchScaleY = 1.0 - p * 0.12;
      stretchScaleZ = 1.0 + p * 0.15;
    } else if (clampedU <= 0.58) {
      // PHASE 3 — SPLITTING APART: smooth departure into 4 independent directions
      const p = smoothStep((clampedU - 0.32) / 0.26);
      separationFactor = 0.08 + p * 0.72; // expands up to 0.80
      stretchScaleX = 1.22 - p * 0.18;
      stretchScaleY = 0.88 + p * 0.12;
      stretchScaleZ = 1.15 - p * 0.10;
    } else if (clampedU <= 0.75) {
      // PHASE 4 — FULL SEPARATION: maximum artistic distance on depth planes
      const p = smoothStep((clampedU - 0.58) / 0.17);
      separationFactor = 0.80 + p * 0.20; // reaches 1.0
      stretchScaleX = 1.04;
      stretchScaleY = 1.0;
      stretchScaleZ = 1.05;
    } else if (clampedU <= 0.90) {
      // PHASE 5 — REASSEMBLY: smooth return towards (0,0,0), seamless reconnection
      const p = smoothStep((clampedU - 0.75) / 0.15);
      separationFactor = 1.0 * (1 - p); // smoothly goes back to 0.0
      stretchScaleX = 1.04 - p * 0.04;
      stretchScaleY = 1.0;
      stretchScaleZ = 1.05 - p * 0.05;
    } else {
      // PHASE 6 — FINAL TRANSFORMATION: reconnected sculpture morphs silhouette
      const p = smoothStep((clampedU - 0.90) / 0.10);
      separationFactor = 0; // firmly united
      stretchScaleX = 1.0 - p * 0.15;
      stretchScaleY = 1.0 + p * 0.25;
      stretchScaleZ = 1.0 - p * 0.10;
    }

    // Apply master stretching deformation
    masterGroup.scale.set(stretchScaleX, stretchScaleY, stretchScaleZ);

    // Update each fragment's independent 3D translation, rotation, and depth
    fragments.forEach((frag) => {
      // Translation along its independent vector
      frag.mesh.position.x = frag.targetDir.x * separationFactor;
      frag.mesh.position.y = frag.targetDir.y * separationFactor;
      frag.mesh.position.z = frag.targetDir.z * separationFactor;

      // Independent rotation during flight
      frag.mesh.rotation.x = frag.targetRot.x * separationFactor;
      frag.mesh.rotation.y = frag.targetRot.y * separationFactor;
      frag.mesh.rotation.z = frag.targetRot.z * separationFactor;
    });
  };

  return {
    group: masterGroup,
    material: metallicGoldMaterial,
    fragments,
    updateScrollAnimation,
    dispose: () => {
      fragments.forEach((f) => {
        f.mesh.geometry.dispose();
      });
      metallicGoldMaterial.dispose();
    },
  };
}

