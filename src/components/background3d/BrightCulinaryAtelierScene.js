import * as THREE from 'three';

/**
 * BrightCulinaryAtelierScene.js
 * 
 * Elegant, Light-Themed, Scroll-Reactive 3D Background for the Dining Section
 * The Radiant Hotel & Resort — The Seven Scentric Fine Dining
 * 
 * PALETTE:
 * - Warm Ivory (#FAF7F2, 0xFAF7F2) & Off-White (#FDFDFD, 0xFDFDFD)
 * - Champagne Gold (#D6B878, 0xD6B878) with soft brushed metallic reflections
 * - Soft Sandstone Beige (#EFE6D8, 0xEFE6D8)
 * - Subtle Pearl & Translucent Cream (#F8F3EA, 0xF8F3EA) with physical clearcoat
 * - Translucent Frosted Alabaster (#FFFFFF) with high transmission
 * 
 * 3 MULTI-ELEMENT CATEGORIES (30 Independent 3D Elements):
 * A. Flowing Sculptural Ribbons (6 independent silk-like twisting ribbons of varying profiles & depths)
 * B. Soft Sculptural Forms (4 abstract tableware-inspired forms: cloche dome, dual interlocking rings, shallow basin, fluted disc)
 * C. Floating Geometric Fragments (20 independent elements: thin rings, open arcs, curved shards, pearl pebbles, faceted prisms)
 * 
 * 5-STAGE CONTINUOUS SCROLL-LINKED CHOREOGRAPHY:
 * - Stage 1 (0.00 - 0.20): Scattered Formation (Framing Hero, wide spatial spread, open center)
 * - Stage 2 (0.20 - 0.40): Gathering (Ribbons curve inward, fragments migrate toward focal nodes)
 * - Stage 3 (0.40 - 0.60): Formation (Unified abstract sculpture with outer orbiting rings, open center for dishes)
 * - Stage 4 (0.60 - 0.80): Breaking Apart (Splitting outward, ribbons stretch to margins, fragments plunge into depth)
 * - Stage 5 (0.80 - 1.00): Reassembly (Re-converging into a serene architectural crescent crown)
 * 
 * Reversible, frame-rate independent, lightweight, zero runtime allocations in render loop.
 */

// =============================================================================
// 1. PROCEDURAL 3D SILK RIBBON GEOMETRY GENERATOR
// =============================================================================
function createRibbonGeometry(points, width = 0.5, segments = 56, twistFactor = 0.8) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geom = new THREE.BufferGeometry();
  const vertices = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();

    let binormal = new THREE.Vector3().crossVectors(tangent, up).normalize();
    if (binormal.lengthSq() < 0.001) {
      binormal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(1, 0, 0)).normalize();
    }
    const normal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();

    // Natural sinusoidal taper at both ends
    const taper = Math.sin(t * Math.PI);
    const currentWidth = width * (0.25 + 0.75 * taper);

    // Subtle continuous twist along curve
    const twistAngle = t * Math.PI * twistFactor;
    const rotatedBinormal = binormal.clone().applyAxisAngle(tangent, twistAngle);

    const pLeft = pt.clone().addScaledVector(rotatedBinormal, currentWidth * 0.5);
    const pRight = pt.clone().addScaledVector(rotatedBinormal, -currentWidth * 0.5);

    vertices.push(pLeft.x, pLeft.y, pLeft.z);
    vertices.push(pRight.x, pRight.y, pRight.z);

    const normalRot = normal.clone().applyAxisAngle(tangent, twistAngle);
    normals.push(normalRot.x, normalRot.y, normalRot.z);
    normals.push(normalRot.x, normalRot.y, normalRot.z);

    uvs.push(0, t);
    uvs.push(1, t);

    if (i < segments) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// =============================================================================
// 2. PIECEWISE HERMITE INTERPOLATOR ACROSS 5 STAGES
// =============================================================================
function evaluateWaypoints(waypoints, u) {
  const clampedU = Math.max(0, Math.min(1, u));
  const segments = waypoints.length - 1; // 4 segments between 5 waypoints
  const scaled = clampedU * segments;
  const segIdx = Math.min(segments - 1, Math.floor(scaled));
  const localT = scaled - segIdx;

  // Hermite S-Curve Ease (3t^2 - 2t^3)
  const easeT = localT * localT * (3 - 2 * localT);

  const wA = waypoints[segIdx];
  const wB = waypoints[segIdx + 1];

  return {
    x: wA.pos[0] + (wB.pos[0] - wA.pos[0]) * easeT,
    y: wA.pos[1] + (wB.pos[1] - wA.pos[1]) * easeT,
    z: wA.pos[2] + (wB.pos[2] - wA.pos[2]) * easeT,
    rx: wA.rot[0] + (wB.rot[0] - wA.rot[0]) * easeT,
    ry: wA.rot[1] + (wB.rot[1] - wA.rot[1]) * easeT,
    rz: wA.rot[2] + (wB.rot[2] - wA.rot[2]) * easeT,
    scale: wA.scale + (wB.scale - wA.scale) * easeT,
  };
}

// =============================================================================
// 3. MASTER SCENE BUILDER
// =============================================================================
export function createBrightCulinaryAtelierScene() {
  const group = new THREE.Group();

  // Track all disposable resources for clean memory management
  const disposables = [];

  // Shared Light-Themed Luxury Materials
  const materials = {
    ivorySilk: new THREE.MeshStandardMaterial({
      color: 0xFAF7F2,
      roughness: 0.38,
      metalness: 0.05,
      side: THREE.DoubleSide,
    }),
    champagneGold: new THREE.MeshStandardMaterial({
      color: 0xD6B878,
      roughness: 0.24,
      metalness: 0.85,
      side: THREE.DoubleSide,
    }),
    champagneGoldSoft: new THREE.MeshStandardMaterial({
      color: 0xE2C896,
      roughness: 0.32,
      metalness: 0.75,
      side: THREE.DoubleSide,
    }),
    pearlCeramic: new THREE.MeshPhysicalMaterial({
      color: 0xF8F3EA,
      roughness: 0.22,
      metalness: 0.06,
      clearcoat: 0.70,
      clearcoatRoughness: 0.15,
      side: THREE.DoubleSide,
    }),
    translucentAlabaster: new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.85,
      roughness: 0.20,
      ior: 1.45,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    }),
    warmSandstone: new THREE.MeshStandardMaterial({
      color: 0xEFE6D8,
      roughness: 0.72,
      metalness: 0.03,
      side: THREE.DoubleSide,
    }),
  };

  Object.values(materials).forEach((m) => disposables.push(m));

  // Registry of animated elements
  const elements = [];

  function registerElement(mesh, waypoints, driftParams = {}) {
    group.add(mesh);
    elements.push({
      mesh,
      waypoints,
      driftX: driftParams.driftX || 0.035,
      driftY: driftParams.driftY || 0.035,
      driftR: driftParams.driftR || 0.025,
      freq: driftParams.freq || 0.45,
      phaseX: driftParams.phaseX || Math.random() * Math.PI * 2,
      phaseY: driftParams.phaseY || Math.random() * Math.PI * 2,
      phaseR: driftParams.phaseR || Math.random() * Math.PI * 2,
    });
  }

  // =========================================================================
  // A. FLOWING SCULPTURAL RIBBONS (6 INDEPENDENT RIBBONS)
  // =========================================================================

  // Ribbon 1: Grand Ivory Silk Arc (Upper-Left to Center-Right)
  const r1Geom = createRibbonGeometry([
    new THREE.Vector3(-4.8, 2.8, -3.5),
    new THREE.Vector3(-2.2, 3.2, -2.5),
    new THREE.Vector3(0.5, 1.8, -2.0),
    new THREE.Vector3(3.2, -0.2, -2.8),
    new THREE.Vector3(4.6, -1.8, -3.8),
  ], 0.52, 56, 0.9);
  disposables.push(r1Geom);
  const ribbon1 = new THREE.Mesh(r1Geom, materials.ivorySilk);
  registerElement(ribbon1, [
    // W0 (Scattered): Wide peripheral arch, keeping center open
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    // W1 (Gathering): Curves gently inward toward upper center
    { pos: [0.6, -0.4, 0.4], rot: [0.08, 0.12, -0.06], scale: 1.02 },
    // W2 (Formation): Forms core sweeping arch of abstract sculpture
    { pos: [0.3, -0.2, 0.6], rot: [0.12, 0.20, -0.08], scale: 1.05 },
    // W3 (Breaking): Splits outward toward top-left margin
    { pos: [-1.8, 1.2, -2.2], rot: [-0.15, -0.25, 0.18], scale: 0.94 },
    // W4 (Reassembly): Re-converges into majestic upper crescent crown
    { pos: [0.2, 0.6, -0.8], rot: [0.05, 0.08, -0.04], scale: 0.98 },
  ], { freq: 0.38 });

  // Ribbon 2: Champagne Gold Helical Contour (Midground Sweep)
  const r2Geom = createRibbonGeometry([
    new THREE.Vector3(3.8, 2.6, -3.0),
    new THREE.Vector3(1.8, 0.8, -1.8),
    new THREE.Vector3(-0.8, -0.6, -2.2),
    new THREE.Vector3(-3.2, -2.2, -3.2),
  ], 0.40, 48, 1.1);
  disposables.push(r2Geom);
  const ribbon2 = new THREE.Mesh(r2Geom, materials.champagneGold);
  registerElement(ribbon2, [
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    { pos: [-0.5, 0.3, 0.3], rot: [-0.08, -0.15, 0.10], scale: 1.04 },
    { pos: [-0.2, 0.1, 0.5], rot: [-0.14, -0.22, 0.12], scale: 1.08 },
    { pos: [1.6, -1.0, -2.0], rot: [0.18, 0.28, -0.15], scale: 0.92 },
    { pos: [-0.3, -0.4, -0.6], rot: [-0.06, -0.10, 0.05], scale: 0.98 },
  ], { freq: 0.42 });

  // Ribbon 3: Deep Pearl S-Filament (Background Undulation, Z ~ -5.0)
  const r3Geom = createRibbonGeometry([
    new THREE.Vector3(-5.2, -1.6, -5.5),
    new THREE.Vector3(-2.0, -0.2, -4.8),
    new THREE.Vector3(1.6, -2.2, -5.0),
    new THREE.Vector3(4.8, -0.6, -5.8),
  ], 0.32, 44, 0.7);
  disposables.push(r3Geom);
  const ribbon3 = new THREE.Mesh(r3Geom, materials.pearlCeramic);
  registerElement(ribbon3, [
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    { pos: [0.4, 0.5, 0.6], rot: [0.06, 0.10, 0.04], scale: 1.05 },
    { pos: [0.2, 0.3, 0.8], rot: [0.10, 0.14, 0.08], scale: 1.06 },
    { pos: [-1.2, -1.2, -3.0], rot: [-0.12, -0.18, -0.06], scale: 0.88 },
    { pos: [0.1, 0.2, -1.2], rot: [0.04, 0.06, 0.02], scale: 0.96 },
  ], { freq: 0.32 });

  // Ribbon 4: Ascending Alabaster Spiral (Curling Toward Top-Right)
  const r4Geom = createRibbonGeometry([
    new THREE.Vector3(1.2, -3.2, -3.2),
    new THREE.Vector3(2.8, -1.4, -2.4),
    new THREE.Vector3(3.6, 1.2, -2.2),
    new THREE.Vector3(2.2, 3.2, -3.0),
  ], 0.36, 44, 1.2);
  disposables.push(r4Geom);
  const ribbon4 = new THREE.Mesh(r4Geom, materials.translucentAlabaster);
  registerElement(ribbon4, [
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    { pos: [-0.6, -0.3, 0.3], rot: [-0.10, -0.08, 0.12], scale: 1.03 },
    { pos: [-0.4, -0.1, 0.4], rot: [-0.15, -0.12, 0.16], scale: 1.06 },
    { pos: [1.8, 1.4, -2.4], rot: [0.20, 0.18, -0.22], scale: 0.90 },
    { pos: [0.4, 0.5, -0.7], rot: [0.08, 0.06, -0.08], scale: 0.98 },
  ], { freq: 0.46 });

  // Ribbon 5: Foreground Silk Filament (Lower-Left Foreground Accent, Z ~ -1.6)
  const r5Geom = createRibbonGeometry([
    new THREE.Vector3(-4.2, -2.8, -1.8),
    new THREE.Vector3(-2.4, -1.6, -1.4),
    new THREE.Vector3(-1.0, -2.4, -1.6),
  ], 0.28, 36, 0.6);
  disposables.push(r5Geom);
  const ribbon5 = new THREE.Mesh(r5Geom, materials.ivorySilk);
  registerElement(ribbon5, [
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    { pos: [0.5, 0.4, 0.2], rot: [0.08, 0.06, -0.08], scale: 1.02 },
    { pos: [0.3, 0.2, 0.3], rot: [0.12, 0.10, -0.12], scale: 1.04 },
    { pos: [-1.4, -1.4, -1.8], rot: [-0.16, -0.12, 0.14], scale: 0.92 },
    { pos: [-0.2, -0.3, -0.4], rot: [-0.05, -0.04, 0.05], scale: 0.97 },
  ], { freq: 0.50 });

  // Ribbon 6: Floating Champagne Crescent Ribbon (Lower-Right Accent)
  const r6Geom = createRibbonGeometry([
    new THREE.Vector3(1.6, -2.6, -2.6),
    new THREE.Vector3(3.4, -2.8, -2.4),
    new THREE.Vector3(4.5, -1.8, -2.8),
  ], 0.28, 32, 0.7);
  disposables.push(r6Geom);
  const ribbon6 = new THREE.Mesh(r6Geom, materials.champagneGoldSoft);
  registerElement(ribbon6, [
    { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.0 },
    { pos: [-0.4, 0.3, 0.2], rot: [-0.06, -0.08, 0.06], scale: 1.02 },
    { pos: [-0.2, 0.2, 0.3], rot: [-0.10, -0.12, 0.08], scale: 1.05 },
    { pos: [1.2, -1.0, -2.0], rot: [0.15, 0.16, -0.12], scale: 0.90 },
    { pos: [0.2, -0.2, -0.5], rot: [0.04, 0.05, -0.03], scale: 0.98 },
  ], { freq: 0.44 });

  // =========================================================================
  // B. SOFT SCULPTURAL FORMS (4 ABSTRACT CULINARY TABLEWARE FORMS)
  // =========================================================================

  // Form 1: Sculptural Inverted Cloche / Pedestal Dome (Smooth Lathe Geometry)
  const clochePoints = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const r = Math.sin(t * Math.PI * 0.5) * 1.05 + 0.05;
    const y = (1.0 - t) * 0.75;
    clochePoints.push(new THREE.Vector2(r, y));
  }
  const clocheGeom = new THREE.LatheGeometry(clochePoints, 36);
  disposables.push(clocheGeom);
  const clocheMesh = new THREE.Mesh(clocheGeom, materials.pearlCeramic);

  // Delicate gold rim accent on cloche lip
  const clocheRimGeom = new THREE.TorusGeometry(1.05, 0.02, 16, 48);
  disposables.push(clocheRimGeom);
  const clocheRim = new THREE.Mesh(clocheRimGeom, materials.champagneGold);
  clocheRim.rotation.x = Math.PI * 0.5;
  clocheMesh.add(clocheRim);

  registerElement(clocheMesh, [
    // W0 (Scattered): Lower-left periphery, subtle architectural stance
    { pos: [-3.4, -1.6, -2.8], rot: [0.35, 0.40, -0.25], scale: 0.90 },
    // W1 (Gathering): Glides inward toward focal cluster
    { pos: [-2.0, -0.9, -2.0], rot: [0.20, 0.25, -0.15], scale: 0.96 },
    // W2 (Formation): Anchors lower-left base of abstract sculpture
    { pos: [-1.4, -0.5, -1.6], rot: [0.15, 0.18, -0.10], scale: 1.00 },
    // W3 (Breaking): Disperses outward to clear space for dishes/private dining
    { pos: [-4.2, -2.4, -4.2], rot: [0.55, 0.60, -0.38], scale: 0.82 },
    // W4 (Reassembly): Aligns with left wing of crescent crown
    { pos: [-2.6, -0.8, -2.4], rot: [0.25, 0.30, -0.18], scale: 0.92 },
  ], { freq: 0.36 });

  // Form 2: Interlocking Dual Elliptic Arcs (Brushed Champagne Gold)
  const dualArcsGroup = new THREE.Group();
  const ellipseGeom1 = new THREE.TorusGeometry(1.15, 0.03, 16, 64);
  const ellipseGeom2 = new THREE.TorusGeometry(0.85, 0.025, 16, 64);
  disposables.push(ellipseGeom1, ellipseGeom2);

  const ring1 = new THREE.Mesh(ellipseGeom1, materials.champagneGold);
  ring1.scale.set(1.0, 1.4, 1.0);
  dualArcsGroup.add(ring1);

  const ring2 = new THREE.Mesh(ellipseGeom2, materials.champagneGoldSoft);
  ring2.scale.set(1.2, 0.9, 1.0);
  ring2.rotation.x = Math.PI * 0.45;
  ring2.rotation.y = Math.PI * 0.25;
  dualArcsGroup.add(ring2);

  registerElement(dualArcsGroup, [
    { pos: [3.5, 1.5, -2.6], rot: [-0.25, 0.35, 0.20], scale: 0.88 },
    { pos: [2.2, 0.8, -1.8], rot: [-0.15, 0.22, 0.12], scale: 0.96 },
    { pos: [1.6, 0.4, -1.4], rot: [-0.08, 0.15, 0.08], scale: 1.02 },
    { pos: [4.4, 2.2, -4.0], rot: [-0.40, 0.55, 0.32], scale: 0.80 },
    { pos: [2.5, 0.6, -2.2], rot: [-0.18, 0.25, 0.15], scale: 0.92 },
  ], { freq: 0.40 });

  // Form 3: Shallow Sculptural Basin / Abstract Concave Platter
  const basinPoints = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const r = t * 1.35;
    const y = Math.sin(t * Math.PI * 0.5) * 0.22;
    basinPoints.push(new THREE.Vector2(r, y));
  }
  const basinGeom = new THREE.LatheGeometry(basinPoints, 32);
  disposables.push(basinGeom);
  const basinMesh = new THREE.Mesh(basinGeom, materials.warmSandstone);
  registerElement(basinMesh, [
    { pos: [3.2, -1.8, -3.2], rot: [0.65, -0.30, 0.25], scale: 0.85 },
    { pos: [1.8, -1.0, -2.2], rot: [0.45, -0.20, 0.18], scale: 0.94 },
    { pos: [1.1, -0.6, -1.8], rot: [0.35, -0.15, 0.12], scale: 0.98 },
    { pos: [3.8, -2.5, -4.6], rot: [0.85, -0.42, 0.38], scale: 0.78 },
    { pos: [2.2, -1.2, -2.6], rot: [0.50, -0.22, 0.20], scale: 0.90 },
  ], { freq: 0.34 });

  // Form 4: Architectural Fluted Disc (Low Pedestal in Pearl Ceramic)
  const discGeom = new THREE.CylinderGeometry(0.9, 0.95, 0.12, 32);
  disposables.push(discGeom);
  const discMesh = new THREE.Mesh(discGeom, materials.pearlCeramic);
  registerElement(discMesh, [
    { pos: [-2.8, 2.2, -3.4], rot: [0.75, 0.25, -0.35], scale: 0.85 },
    { pos: [-1.6, 1.4, -2.4], rot: [0.55, 0.18, -0.22], scale: 0.94 },
    { pos: [-0.9, 0.9, -1.9], rot: [0.42, 0.12, -0.16], scale: 0.98 },
    { pos: [-3.6, 3.0, -4.8], rot: [0.95, 0.38, -0.48], scale: 0.76 },
    { pos: [-1.8, 1.6, -2.8], rot: [0.60, 0.20, -0.26], scale: 0.90 },
  ], { freq: 0.44 });

  // =========================================================================
  // C. FLOATING GEOMETRIC FRAGMENTS (20 INDEPENDENT ELEMENTS)
  // Distributes thin rings, open arcs, curved shards, pearl pebbles, prisms
  // =========================================================================

  // 1. Thin Champagne Gold Rings (4 items)
  const ringGeoms = [
    new THREE.TorusGeometry(0.55, 0.018, 16, 48),
    new THREE.TorusGeometry(0.75, 0.020, 16, 48),
    new THREE.TorusGeometry(0.95, 0.022, 16, 48),
    new THREE.TorusGeometry(0.42, 0.016, 16, 48),
  ];
  ringGeoms.forEach((g) => disposables.push(g));

  const ringConfigs = [
    {
      mat: materials.champagneGold,
      waypoints: [
        { pos: [-3.8, 0.8, -2.2], rot: [0.4, 0.8, 0.2], scale: 0.9 },
        { pos: [-1.8, 0.4, -1.6], rot: [0.2, 0.5, 0.1], scale: 1.0 },
        { pos: [-1.1, 0.2, -1.2], rot: [0.1, 0.3, 0.05], scale: 1.05 },
        { pos: [-4.5, 1.5, -4.0], rot: [0.6, 1.2, 0.3], scale: 0.8 },
        { pos: [-2.2, 0.6, -2.0], rot: [0.3, 0.6, 0.15], scale: 0.95 },
      ],
    },
    {
      mat: materials.champagneGoldSoft,
      waypoints: [
        { pos: [3.6, -0.6, -2.5], rot: [-0.5, 0.6, -0.3], scale: 0.85 },
        { pos: [1.9, -0.3, -1.8], rot: [-0.3, 0.4, -0.2], scale: 0.98 },
        { pos: [1.2, -0.1, -1.4], rot: [-0.15, 0.25, -0.1], scale: 1.04 },
        { pos: [4.6, -1.2, -4.2], rot: [-0.7, 0.9, -0.4], scale: 0.78 },
        { pos: [2.2, -0.4, -2.2], rot: [-0.35, 0.45, -0.2], scale: 0.92 },
      ],
    },
    {
      mat: materials.champagneGold,
      waypoints: [
        { pos: [-1.8, -2.8, -3.2], rot: [0.8, -0.4, 0.6], scale: 0.9 },
        { pos: [-1.0, -1.6, -2.2], rot: [0.5, -0.2, 0.4], scale: 1.0 },
        { pos: [-0.6, -1.0, -1.8], rot: [0.3, -0.1, 0.2], scale: 1.06 },
        { pos: [-2.8, -3.6, -5.0], rot: [1.1, -0.6, 0.8], scale: 0.82 },
        { pos: [-1.2, -2.0, -2.8], rot: [0.6, -0.3, 0.45], scale: 0.94 },
      ],
    },
    {
      mat: materials.champagneGoldSoft,
      waypoints: [
        { pos: [2.2, 2.6, -2.0], rot: [0.3, -0.6, 0.4], scale: 0.9 },
        { pos: [1.2, 1.5, -1.5], rot: [0.2, -0.35, 0.25], scale: 1.0 },
        { pos: [0.7, 0.9, -1.2], rot: [0.1, -0.2, 0.15], scale: 1.05 },
        { pos: [3.2, 3.5, -3.8], rot: [0.5, -0.9, 0.6], scale: 0.8 },
        { pos: [1.5, 1.8, -2.0], rot: [0.25, -0.45, 0.3], scale: 0.95 },
      ],
    },
  ];

  ringConfigs.forEach((cfg, idx) => {
    const mesh = new THREE.Mesh(ringGeoms[idx], cfg.mat);
    registerElement(mesh, cfg.waypoints, { freq: 0.48 + idx * 0.05 });
  });

  // 2. Open Sculptural Arcs (4 crescent toroids with partial arc angle)
  const arcGeoms = [
    new THREE.TorusGeometry(0.85, 0.024, 16, 48, Math.PI * 1.35),
    new THREE.TorusGeometry(0.65, 0.022, 16, 48, Math.PI * 1.45),
    new THREE.TorusGeometry(1.05, 0.026, 16, 48, Math.PI * 1.25),
    new THREE.TorusGeometry(0.50, 0.020, 16, 48, Math.PI * 1.40),
  ];
  arcGeoms.forEach((g) => disposables.push(g));

  const arcConfigs = [
    {
      mat: materials.ivorySilk,
      waypoints: [
        { pos: [-2.6, 1.8, -2.8], rot: [0.5, 0.2, -0.4], scale: 0.9 },
        { pos: [-1.4, 1.0, -2.0], rot: [0.3, 0.1, -0.25], scale: 1.0 },
        { pos: [-0.8, 0.6, -1.5], rot: [0.2, 0.05, -0.15], scale: 1.05 },
        { pos: [-3.8, 2.5, -4.5], rot: [0.7, 0.3, -0.6], scale: 0.8 },
        { pos: [-1.8, 1.2, -2.4], rot: [0.35, 0.15, -0.3], scale: 0.95 },
      ],
    },
    {
      mat: materials.pearlCeramic,
      waypoints: [
        { pos: [2.8, -1.2, -2.4], rot: [-0.4, 0.6, 0.3], scale: 0.88 },
        { pos: [1.6, -0.7, -1.7], rot: [-0.25, 0.4, 0.2], scale: 0.98 },
        { pos: [0.9, -0.4, -1.3], rot: [-0.15, 0.25, 0.12], scale: 1.04 },
        { pos: [4.0, -1.8, -4.2], rot: [-0.6, 0.8, 0.45], scale: 0.8 },
        { pos: [1.9, -0.8, -2.2], rot: [-0.3, 0.45, 0.22], scale: 0.92 },
      ],
    },
    {
      mat: materials.translucentAlabaster,
      waypoints: [
        { pos: [-4.2, -0.8, -3.5], rot: [0.6, -0.5, 0.2], scale: 0.85 },
        { pos: [-2.4, -0.4, -2.4], rot: [0.4, -0.3, 0.12], scale: 0.96 },
        { pos: [-1.5, -0.2, -1.8], rot: [0.25, -0.2, 0.08], scale: 1.02 },
        { pos: [-5.2, -1.4, -5.2], rot: [0.85, -0.7, 0.3], scale: 0.78 },
        { pos: [-2.8, -0.5, -2.8], rot: [0.45, -0.35, 0.15], scale: 0.90 },
      ],
    },
    {
      mat: materials.champagneGold,
      waypoints: [
        { pos: [1.5, 2.2, -2.6], rot: [-0.3, -0.4, -0.5], scale: 0.9 },
        { pos: [0.8, 1.2, -1.8], rot: [-0.18, -0.25, -0.3], scale: 1.0 },
        { pos: [0.4, 0.7, -1.4], rot: [-0.1, -0.15, -0.18], scale: 1.05 },
        { pos: [2.6, 3.2, -4.2], rot: [-0.45, -0.6, -0.7], scale: 0.82 },
        { pos: [1.0, 1.6, -2.2], rot: [-0.22, -0.3, -0.35], scale: 0.94 },
      ],
    },
  ];

  arcConfigs.forEach((cfg, idx) => {
    const mesh = new THREE.Mesh(arcGeoms[idx], cfg.mat);
    registerElement(mesh, cfg.waypoints, { freq: 0.52 + idx * 0.04 });
  });

  // 3. Curved Sculptural Shards & Petals (4 items)
  const shardGeoms = [
    new THREE.RingGeometry(0.35, 0.75, 24, 1, 0, Math.PI * 0.75),
    new THREE.RingGeometry(0.40, 0.85, 24, 1, 0, Math.PI * 0.65),
    new THREE.RingGeometry(0.30, 0.65, 24, 1, 0, Math.PI * 0.85),
    new THREE.RingGeometry(0.45, 0.90, 24, 1, 0, Math.PI * 0.70),
  ];
  shardGeoms.forEach((g) => disposables.push(g));

  const shardConfigs = [
    {
      mat: materials.pearlCeramic,
      waypoints: [
        { pos: [-3.0, -2.2, -2.5], rot: [0.4, 0.6, 0.3], scale: 0.9 },
        { pos: [-1.6, -1.2, -1.8], rot: [0.25, 0.4, 0.2], scale: 1.0 },
        { pos: [-1.0, -0.7, -1.3], rot: [0.15, 0.25, 0.1], scale: 1.06 },
        { pos: [-4.0, -3.2, -4.0], rot: [0.6, 0.85, 0.45], scale: 0.82 },
        { pos: [-2.0, -1.5, -2.2], rot: [0.3, 0.48, 0.24], scale: 0.94 },
      ],
    },
    {
      mat: materials.ivorySilk,
      waypoints: [
        { pos: [3.4, 1.8, -2.2], rot: [-0.5, -0.3, 0.4], scale: 0.88 },
        { pos: [1.8, 1.0, -1.6], rot: [-0.3, -0.18, 0.25], scale: 0.98 },
        { pos: [1.1, 0.5, -1.2], rot: [-0.18, -0.1, 0.15], scale: 1.04 },
        { pos: [4.4, 2.8, -3.8], rot: [-0.7, -0.45, 0.6], scale: 0.78 },
        { pos: [2.2, 1.2, -2.0], rot: [-0.35, -0.22, 0.3], scale: 0.92 },
      ],
    },
    {
      mat: materials.translucentAlabaster,
      waypoints: [
        { pos: [-1.5, 2.5, -2.0], rot: [0.3, 0.5, -0.4], scale: 0.9 },
        { pos: [-0.8, 1.4, -1.5], rot: [0.18, 0.3, -0.25], scale: 1.0 },
        { pos: [-0.4, 0.8, -1.1], rot: [0.1, 0.18, -0.15], scale: 1.05 },
        { pos: [-2.5, 3.6, -3.6], rot: [0.45, 0.75, -0.6], scale: 0.8 },
        { pos: [-1.0, 1.8, -1.8], rot: [0.22, 0.38, -0.3], scale: 0.95 },
      ],
    },
    {
      mat: materials.champagneGoldSoft,
      waypoints: [
        { pos: [2.0, -2.4, -2.2], rot: [0.6, -0.4, -0.3], scale: 0.9 },
        { pos: [1.1, -1.3, -1.6], rot: [0.35, -0.25, -0.18], scale: 1.0 },
        { pos: [0.6, -0.7, -1.2], rot: [0.2, -0.15, -0.1], scale: 1.05 },
        { pos: [3.0, -3.4, -3.8], rot: [0.85, -0.6, -0.45], scale: 0.8 },
        { pos: [1.4, -1.6, -2.0], rot: [0.42, -0.3, -0.22], scale: 0.94 },
      ],
    },
  ];

  shardConfigs.forEach((cfg, idx) => {
    const mesh = new THREE.Mesh(shardGeoms[idx], cfg.mat);
    registerElement(mesh, cfg.waypoints, { freq: 0.46 + idx * 0.05 });
  });

  // 4. Polished Floating Pearl Stones (4 smooth flattened ellipsoids)
  const pebbleGeom = new THREE.SphereGeometry(0.28, 24, 16);
  disposables.push(pebbleGeom);

  const pebbleConfigs = [
    {
      scaleVec: [1.0, 0.40, 0.85],
      mat: materials.pearlCeramic,
      waypoints: [
        { pos: [-3.2, 0.0, -2.2], rot: [0.4, 0.3, 0.2], scale: 1.0 },
        { pos: [-1.7, 0.0, -1.5], rot: [0.25, 0.18, 0.12], scale: 1.04 },
        { pos: [-1.0, 0.0, -1.1], rot: [0.15, 0.1, 0.06], scale: 1.08 },
        { pos: [-4.2, 0.2, -3.8], rot: [0.6, 0.45, 0.3], scale: 0.84 },
        { pos: [-2.1, 0.0, -2.0], rot: [0.3, 0.22, 0.15], scale: 0.96 },
      ],
    },
    {
      scaleVec: [0.85, 0.35, 1.1],
      mat: materials.ivorySilk,
      waypoints: [
        { pos: [3.0, 0.2, -2.0], rot: [-0.3, 0.4, -0.2], scale: 0.95 },
        { pos: [1.6, 0.1, -1.4], rot: [-0.18, 0.25, -0.12], scale: 1.02 },
        { pos: [1.0, 0.0, -1.0], rot: [-0.1, 0.15, -0.06], scale: 1.06 },
        { pos: [4.0, 0.4, -3.6], rot: [-0.45, 0.6, -0.3], scale: 0.82 },
        { pos: [2.0, 0.15, -1.8], rot: [-0.22, 0.3, -0.15], scale: 0.94 },
      ],
    },
    {
      scaleVec: [1.1, 0.45, 0.9],
      mat: materials.champagneGold,
      waypoints: [
        { pos: [-1.2, -1.8, -1.8], rot: [0.5, -0.2, 0.3], scale: 0.9 },
        { pos: [-0.6, -1.0, -1.3], rot: [0.3, -0.12, 0.18], scale: 1.0 },
        { pos: [-0.3, -0.5, -0.9], rot: [0.18, -0.06, 0.1], scale: 1.06 },
        { pos: [-2.0, -2.8, -3.4], rot: [0.75, -0.3, 0.45], scale: 0.8 },
        { pos: [-0.8, -1.3, -1.6], rot: [0.38, -0.15, 0.22], scale: 0.95 },
      ],
    },
    {
      scaleVec: [0.95, 0.38, 1.0],
      mat: materials.warmSandstone,
      waypoints: [
        { pos: [1.4, 1.6, -1.8], rot: [-0.4, -0.3, 0.4], scale: 0.9 },
        { pos: [0.8, 0.9, -1.3], rot: [-0.22, -0.18, 0.22], scale: 1.0 },
        { pos: [0.4, 0.5, -0.9], rot: [-0.12, -0.1, 0.12], scale: 1.05 },
        { pos: [2.4, 2.6, -3.4], rot: [-0.6, -0.45, 0.6], scale: 0.8 },
        { pos: [1.0, 1.2, -1.6], rot: [-0.28, -0.22, 0.28], scale: 0.95 },
      ],
    },
  ];

  pebbleConfigs.forEach((cfg, idx) => {
    const mesh = new THREE.Mesh(pebbleGeom, cfg.mat);
    mesh.scale.set(...cfg.scaleVec);
    registerElement(mesh, cfg.waypoints, { freq: 0.55 + idx * 0.04 });
  });

  // 5. Slender Alabaster Prisms (4 delicate multifaceted crystals)
  const prismGeom = new THREE.CylinderGeometry(0.04, 0.15, 0.85, 5);
  disposables.push(prismGeom);

  const prismConfigs = [
    {
      mat: materials.translucentAlabaster,
      waypoints: [
        { pos: [-2.2, -1.4, -2.6], rot: [0.6, 0.4, 0.8], scale: 0.9 },
        { pos: [-1.2, -0.7, -1.8], rot: [0.35, 0.25, 0.5], scale: 1.0 },
        { pos: [-0.7, -0.3, -1.3], rot: [0.2, 0.15, 0.3], scale: 1.05 },
        { pos: [-3.2, -2.4, -4.2], rot: [0.9, 0.6, 1.2], scale: 0.8 },
        { pos: [-1.5, -0.9, -2.2], rot: [0.45, 0.3, 0.6], scale: 0.94 },
      ],
    },
    {
      mat: materials.champagneGoldSoft,
      waypoints: [
        { pos: [2.5, 1.2, -2.4], rot: [-0.5, 0.7, -0.4], scale: 0.85 },
        { pos: [1.4, 0.6, -1.7], rot: [-0.3, 0.45, -0.25], scale: 0.98 },
        { pos: [0.8, 0.3, -1.2], rot: [-0.18, 0.28, -0.15], scale: 1.04 },
        { pos: [3.6, 2.0, -4.0], rot: [-0.75, 1.0, -0.6], scale: 0.78 },
        { pos: [1.8, 0.8, -2.0], rot: [-0.38, 0.55, -0.3], scale: 0.92 },
      ],
    },
    {
      mat: materials.ivorySilk,
      waypoints: [
        { pos: [-3.6, 1.6, -3.0], rot: [0.4, -0.5, -0.6], scale: 0.9 },
        { pos: [-2.0, 0.9, -2.0], rot: [0.25, -0.3, -0.38], scale: 1.0 },
        { pos: [-1.2, 0.5, -1.5], rot: [0.15, -0.18, -0.22], scale: 1.06 },
        { pos: [-4.6, 2.5, -4.6], rot: [0.6, -0.75, -0.9], scale: 0.8 },
        { pos: [-2.4, 1.1, -2.6], rot: [0.3, -0.38, -0.45], scale: 0.95 },
      ],
    },
    {
      mat: materials.pearlCeramic,
      waypoints: [
        { pos: [1.8, -2.0, -2.0], rot: [0.7, 0.3, -0.5], scale: 0.9 },
        { pos: [1.0, -1.1, -1.5], rot: [0.42, 0.18, -0.3], scale: 1.0 },
        { pos: [0.5, -0.6, -1.1], rot: [0.25, 0.1, -0.18], scale: 1.05 },
        { pos: [2.8, -3.0, -3.6], rot: [1.0, 0.45, -0.75], scale: 0.8 },
        { pos: [1.3, -1.4, -1.8], rot: [0.5, 0.22, -0.38], scale: 0.94 },
      ],
    },
  ];

  prismConfigs.forEach((cfg, idx) => {
    const mesh = new THREE.Mesh(prismGeom, cfg.mat);
    registerElement(mesh, cfg.waypoints, { freq: 0.58 + idx * 0.04 });
  });

  // =========================================================================
  // 4. ANIMATION UPDATE LOOP (Strict Scroll Progress Binding + Micro Drift)
  // =========================================================================
  function updateScroll(u, time = 0) {
    const clampedU = Math.max(0, Math.min(1, u));

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const target = evaluateWaypoints(el.waypoints, clampedU);

      // Organic micro-breathing drift (never static, but completely subordinated to scroll)
      const driftX = Math.sin(time * el.freq + el.phaseX) * el.driftX;
      const driftY = Math.cos(time * el.freq * 0.85 + el.phaseY) * el.driftY;
      const driftR = Math.sin(time * el.freq * 0.7 + el.phaseR) * el.driftR;

      el.mesh.position.set(
        target.x + driftX,
        target.y + driftY,
        target.z
      );

      el.mesh.rotation.set(
        target.rx + driftR,
        target.ry + driftR * 0.8,
        target.rz + driftR * 0.5
      );

      el.mesh.scale.setScalar(target.scale);
    }
  }

  // =========================================================================
  // 5. CLEAN DISPOSAL
  // =========================================================================
  function dispose() {
    elements.forEach((el) => {
      group.remove(el.mesh);
    });

    disposables.forEach((item) => {
      if (item && typeof item.dispose === 'function') {
        item.dispose();
      }
    });
  }

  return {
    group,
    updateScroll,
    dispose,
  };
}
