import * as THREE from 'three';

/**
 * StylizedFoodMeshFactory.js
 * 
 * Procedural 3D Stylized Animated Food Models for Radiant Resort Dining Universe.
 * - Crafted using Three.js procedural geometries and PBR materials.
 * - Stylized 3D aesthetic: smooth forms, warm appetizing palettes, soft sheen, velvety surfaces.
 * - 21 distinct items spanning fruits, berries, patisserie, desserts, nuts, pasta, and savories.
 * - Completely self-contained: zero external network assets or heavy GLTF downloads.
 */

// Shared reusable materials cache for top rendering performance
const MAT_CACHE = {
  strawberryRed: new THREE.MeshStandardMaterial({
    color: 0xE62A45,
    roughness: 0.35,
    metalness: 0.05,
    emissive: 0x330008,
    emissiveIntensity: 0.15,
  }),
  leafGreen: new THREE.MeshStandardMaterial({
    color: 0x2E7D32,
    roughness: 0.45,
    metalness: 0.0,
    side: THREE.DoubleSide,
  }),
  seedYellow: new THREE.MeshStandardMaterial({
    color: 0xFDD835,
    roughness: 0.3,
    metalness: 0.1,
  }),
  orangePulp: new THREE.MeshStandardMaterial({
    color: 0xFF9100,
    roughness: 0.35,
    metalness: 0.05,
  }),
  orangePith: new THREE.MeshStandardMaterial({
    color: 0xFFF9E6,
    roughness: 0.6,
    metalness: 0.0,
  }),
  orangeRind: new THREE.MeshStandardMaterial({
    color: 0xF57C00,
    roughness: 0.4,
    metalness: 0.05,
  }),
  kiwiFlesh: new THREE.MeshStandardMaterial({
    color: 0x7CB342,
    roughness: 0.35,
    metalness: 0.05,
  }),
  kiwiCore: new THREE.MeshStandardMaterial({
    color: 0xDCEDC8,
    roughness: 0.5,
    metalness: 0.0,
  }),
  kiwiSkin: new THREE.MeshStandardMaterial({
    color: 0x6D4C41,
    roughness: 0.7,
    metalness: 0.0,
  }),
  kiwiSeed: new THREE.MeshStandardMaterial({
    color: 0x1A1A1A,
    roughness: 0.4,
    metalness: 0.2,
  }),
  appleSkin: new THREE.MeshStandardMaterial({
    color: 0xC62828,
    roughness: 0.25,
    metalness: 0.08,
  }),
  appleFlesh: new THREE.MeshStandardMaterial({
    color: 0xFFFDE7,
    roughness: 0.45,
    metalness: 0.0,
  }),
  cherryRed: new THREE.MeshStandardMaterial({
    color: 0x880E4F,
    roughness: 0.18,
    metalness: 0.1,
    emissive: 0x2A0012,
    emissiveIntensity: 0.1,
  }),
  cherryStem: new THREE.MeshStandardMaterial({
    color: 0x558B2F,
    roughness: 0.5,
    metalness: 0.0,
  }),
  raspberryVelvet: new THREE.MeshStandardMaterial({
    color: 0xC2185B,
    roughness: 0.5,
    metalness: 0.05,
  }),
  cakeSponge: new THREE.MeshStandardMaterial({
    color: 0xF5DEB3,
    roughness: 0.65,
    metalness: 0.0,
  }),
  cakeCream: new THREE.MeshStandardMaterial({
    color: 0xFFFFF0,
    roughness: 0.25,
    metalness: 0.02,
  }),
  cakeGlaze: new THREE.MeshStandardMaterial({
    color: 0xAD1457,
    roughness: 0.2,
    metalness: 0.08,
  }),
  chocolateGlaze: new THREE.MeshStandardMaterial({
    color: 0x3E2723,
    roughness: 0.22,
    metalness: 0.08,
  }),
  donutDough: new THREE.MeshStandardMaterial({
    color: 0xE0A96D,
    roughness: 0.55,
    metalness: 0.0,
  }),
  cupcakeCup: new THREE.MeshStandardMaterial({
    color: 0xD7CCC8,
    roughness: 0.6,
    metalness: 0.05,
  }),
  frostingPink: new THREE.MeshStandardMaterial({
    color: 0xF48FB1,
    roughness: 0.3,
    metalness: 0.02,
  }),
  iceCreamMint: new THREE.MeshStandardMaterial({
    color: 0x80CBC4,
    roughness: 0.35,
    metalness: 0.02,
  }),
  iceCreamBerry: new THREE.MeshStandardMaterial({
    color: 0xCE93D8,
    roughness: 0.35,
    metalness: 0.02,
  }),
  waffleCone: new THREE.MeshStandardMaterial({
    color: 0xD7A15C,
    roughness: 0.55,
    metalness: 0.05,
  }),
  macaronShell: new THREE.MeshStandardMaterial({
    color: 0xF8BBD0,
    roughness: 0.35,
    metalness: 0.02,
  }),
  macaronCream: new THREE.MeshStandardMaterial({
    color: 0xFFF3E0,
    roughness: 0.3,
    metalness: 0.0,
  }),
  nutShell: new THREE.MeshStandardMaterial({
    color: 0x8D6E63,
    roughness: 0.6,
    metalness: 0.05,
  }),
  cashewGolden: new THREE.MeshStandardMaterial({
    color: 0xDEB887,
    roughness: 0.5,
    metalness: 0.02,
  }),
  almondBrown: new THREE.MeshStandardMaterial({
    color: 0x795548,
    roughness: 0.55,
    metalness: 0.02,
  }),
  pistachioGreen: new THREE.MeshStandardMaterial({
    color: 0x8BC34A,
    roughness: 0.45,
    metalness: 0.05,
  }),
  pistachioShell: new THREE.MeshStandardMaterial({
    color: 0xD7CCC8,
    roughness: 0.65,
    metalness: 0.0,
  }),
  blueberryIndigo: new THREE.MeshStandardMaterial({
    color: 0x283593,
    roughness: 0.35,
    metalness: 0.08,
  }),
  cheeseGolden: new THREE.MeshStandardMaterial({
    color: 0xFFB300,
    roughness: 0.4,
    metalness: 0.05,
  }),
  pastaDough: new THREE.MeshStandardMaterial({
    color: 0xFFD54F,
    roughness: 0.45,
    metalness: 0.02,
  }),
  dumplingSkin: new THREE.MeshStandardMaterial({
    color: 0xFFF8E1,
    roughness: 0.45,
    metalness: 0.02,
  }),
  dumplingSear: new THREE.MeshStandardMaterial({
    color: 0xBF360C,
    roughness: 0.6,
    metalness: 0.05,
  }),
};

// ============================================================================
// 1. Glossy Strawberry
// ============================================================================
export function createStrawberry() {
  const group = new THREE.Group();
  group.name = 'strawberry';

  // Strawberry body: modified sphere squashed into berry taper
  const geo = new THREE.SphereGeometry(0.55, 24, 20);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let y = pos.getY(i);
    let x = pos.getX(i);
    let z = pos.getZ(i);
    // Taper toward bottom
    const factor = (y + 0.55) / 1.1;
    const taper = 0.45 + 0.65 * factor;
    pos.setX(i, x * taper);
    pos.setZ(i, z * taper);
  }
  geo.computeVertexNormals();

  const berry = new THREE.Mesh(geo, MAT_CACHE.strawberryRed);
  berry.castShadow = true;
  group.add(berry);

  // Calyx (leaves at top)
  const leafCount = 5;
  for (let i = 0; i < leafCount; i++) {
    const angle = (i / leafCount) * Math.PI * 2;
    const leafGeo = new THREE.ConeGeometry(0.16, 0.42, 4);
    const leaf = new THREE.Mesh(leafGeo, MAT_CACHE.leafGreen);
    leaf.position.set(Math.cos(angle) * 0.22, 0.52, Math.sin(angle) * 0.22);
    leaf.rotation.x = Math.sin(angle) * 0.65;
    leaf.rotation.z = -Math.cos(angle) * 0.65;
    group.add(leaf);
  }

  // Small stem
  const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.25, 8);
  const stem = new THREE.Mesh(stemGeo, MAT_CACHE.leafGreen);
  stem.position.set(0, 0.68, 0);
  stem.rotation.z = 0.15;
  group.add(stem);

  return group;
}

// ============================================================================
// 2. Fresh Orange Citrus Slice
// ============================================================================
export function createOrangeSlice() {
  const group = new THREE.Group();
  group.name = 'orangeSlice';

  // Rind wheel
  const rindGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.16, 32);
  const rind = new THREE.Mesh(rindGeo, MAT_CACHE.orangeRind);
  rind.rotation.x = Math.PI / 2;
  group.add(rind);

  // Pith ring
  const pithGeo = new THREE.CylinderGeometry(0.61, 0.61, 0.17, 32);
  const pith = new THREE.Mesh(pithGeo, MAT_CACHE.orangePith);
  pith.rotation.x = Math.PI / 2;
  group.add(pith);

  // Translucent Pulp Core
  const pulpGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.18, 32);
  const pulp = new THREE.Mesh(pulpGeo, MAT_CACHE.orangePulp);
  pulp.rotation.x = Math.PI / 2;
  group.add(pulp);

  // Wedge dividers
  const wedgeCount = 8;
  for (let i = 0; i < wedgeCount; i++) {
    const angle = (i / wedgeCount) * Math.PI * 2;
    const lineGeo = new THREE.BoxGeometry(0.52, 0.19, 0.035);
    const line = new THREE.Mesh(lineGeo, MAT_CACHE.orangePith);
    line.rotation.y = angle;
    line.position.set((Math.cos(angle) * 0.26), 0, (Math.sin(angle) * 0.26));
    line.rotation.z = Math.PI / 2;
    group.add(line);
  }

  return group;
}

// ============================================================================
// 3. Kiwi Wheel Slice
// ============================================================================
export function createKiwiSlice() {
  const group = new THREE.Group();
  group.name = 'kiwiSlice';

  // Outer fuzzy skin
  const skinGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.14, 32);
  const skin = new THREE.Mesh(skinGeo, MAT_CACHE.kiwiSkin);
  skin.rotation.x = Math.PI / 2;
  group.add(skin);

  // Green flesh
  const fleshGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.15, 32);
  const flesh = new THREE.Mesh(fleshGeo, MAT_CACHE.kiwiFlesh);
  flesh.rotation.x = Math.PI / 2;
  group.add(flesh);

  // Creamy core
  const coreGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 20);
  const core = new THREE.Mesh(coreGeo, MAT_CACHE.kiwiCore);
  core.rotation.x = Math.PI / 2;
  group.add(core);

  // Black seeds ring
  const seedCount = 14;
  for (let i = 0; i < seedCount; i++) {
    const angle = (i / seedCount) * Math.PI * 2 + (Math.random() * 0.1);
    const dist = 0.28 + (Math.random() * 0.08);
    const seedGeo = new THREE.SphereGeometry(0.022, 6, 6);
    const seed = new THREE.Mesh(seedGeo, MAT_CACHE.kiwiSeed);
    seed.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, 0.08);
    group.add(seed);

    // Back side seeds
    const seedBack = seed.clone();
    seedBack.position.z = -0.08;
    group.add(seedBack);
  }

  return group;
}

// ============================================================================
// 4. Crisp Apple Wedge
// ============================================================================
export function createAppleWedge() {
  const group = new THREE.Group();
  group.name = 'appleWedge';

  // Wedge geometry using cylinder segment
  const wedgeGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.35, 16, 1, false, 0, Math.PI / 3);
  const flesh = new THREE.Mesh(wedgeGeo, MAT_CACHE.appleFlesh);
  flesh.rotation.z = Math.PI / 2;
  group.add(flesh);

  // Red skin outer curved mantle
  const skinGeo = new THREE.CylinderGeometry(0.61, 0.61, 0.35, 16, 1, true, 0, Math.PI / 3);
  const skin = new THREE.Mesh(skinGeo, MAT_CACHE.appleSkin);
  skin.rotation.z = Math.PI / 2;
  group.add(skin);

  return group;
}

// ============================================================================
// 5. Glossy Cherry Pair on Stem
// ============================================================================
export function createCherryPair() {
  const group = new THREE.Group();
  group.name = 'cherryPair';

  // Cherry 1
  const cherryGeo = new THREE.SphereGeometry(0.32, 20, 18);
  const cherry1 = new THREE.Mesh(cherryGeo, MAT_CACHE.cherryRed);
  cherry1.position.set(-0.35, -0.25, 0);
  group.add(cherry1);

  // Cherry 2
  const cherry2 = new THREE.Mesh(cherryGeo, MAT_CACHE.cherryRed);
  cherry2.position.set(0.35, -0.35, 0.1);
  group.add(cherry2);

  // Stem curve 1
  const stemCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0.05, 0),
    new THREE.Vector3(-0.25, 0.45, 0.05),
    new THREE.Vector3(0.0, 0.65, 0),
  ]);
  const stemGeo1 = new THREE.TubeGeometry(stemCurve1, 16, 0.03, 8, false);
  const stem1 = new THREE.Mesh(stemGeo1, MAT_CACHE.cherryStem);
  group.add(stem1);

  // Stem curve 2
  const stemCurve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, -0.05, 0.1),
    new THREE.Vector3(0.2, 0.45, 0.05),
    new THREE.Vector3(0.0, 0.65, 0),
  ]);
  const stemGeo2 = new THREE.TubeGeometry(stemCurve2, 16, 0.03, 8, false);
  const stem2 = new THREE.Mesh(stemGeo2, MAT_CACHE.cherryStem);
  group.add(stem2);

  // Small leaf on stem junction
  const leafGeo = new THREE.ConeGeometry(0.12, 0.35, 5);
  const leaf = new THREE.Mesh(leafGeo, MAT_CACHE.leafGreen);
  leaf.position.set(0.08, 0.65, 0);
  leaf.rotation.z = -1.1;
  group.add(leaf);

  return group;
}

// ============================================================================
// 6. Velvet Clustered Raspberry
// ============================================================================
export function createRaspberry() {
  const group = new THREE.Group();
  group.name = 'raspberry';

  // Clustered drupelets
  const drupeletGeo = new THREE.SphereGeometry(0.11, 10, 10);
  const layers = 5;
  for (let l = 0; l < layers; l++) {
    const y = -0.3 + l * 0.14;
    const ringRadius = 0.35 * Math.sin((l / (layers - 1)) * Math.PI * 0.85 + 0.3);
    const count = 7 + l * 2;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (l * 0.4);
      const drupe = new THREE.Mesh(drupeletGeo, MAT_CACHE.raspberryVelvet);
      drupe.position.set(
        Math.cos(angle) * ringRadius,
        y,
        Math.sin(angle) * ringRadius
      );
      group.add(drupe);
    }
  }

  return group;
}

// ============================================================================
// 7. Layered Patisserie Cake Slice
// ============================================================================
export function createCakeSlice() {
  const group = new THREE.Group();
  group.name = 'cakeSlice';

  // Triangular prism wedge shape
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(1.1, 0.6);
  shape.lineTo(1.1, -0.6);
  shape.closePath();

  const extrudeSettings = { depth: 0.65, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
  const cakeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  cakeGeo.center();

  const sponge = new THREE.Mesh(cakeGeo, MAT_CACHE.cakeSponge);
  sponge.rotation.x = Math.PI / 2;
  group.add(sponge);

  // Top Berry Glaze layer
  const glazeGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 });
  glazeGeo.center();
  const glaze = new THREE.Mesh(glazeGeo, MAT_CACHE.cakeGlaze);
  glaze.rotation.x = Math.PI / 2;
  glaze.position.y = 0.35;
  group.add(glaze);

  // Cream dollop on top
  const creamGeo = new THREE.SphereGeometry(0.18, 12, 12);
  const cream = new THREE.Mesh(creamGeo, MAT_CACHE.cakeCream);
  cream.position.set(0.1, 0.52, 0);
  cream.scale.set(1, 0.7, 1);
  group.add(cream);

  return group;
}

// ============================================================================
// 8. Chocolate Glazed Donut with Sprinkles
// ============================================================================
export function createChocolateDonut() {
  const group = new THREE.Group();
  group.name = 'chocolateDonut';

  // Doughnut ring (torus)
  const donutGeo = new THREE.TorusGeometry(0.55, 0.28, 20, 36);
  const donut = new THREE.Mesh(donutGeo, MAT_CACHE.donutDough);
  group.add(donut);

  // Top chocolate glaze (slightly larger half torus)
  const glazeGeo = new THREE.TorusGeometry(0.56, 0.285, 16, 36, Math.PI * 2);
  const glaze = new THREE.Mesh(glazeGeo, MAT_CACHE.chocolateGlaze);
  glaze.position.z = 0.03;
  glaze.scale.set(1.01, 1.01, 0.75);
  group.add(glaze);

  // Colorful sprinkles
  const sprinkleColors = [0xFFD54F, 0xE91E63, 0x00E676, 0x00B0FF, 0xFFFFFF];
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.2;
    const rad = 0.45 + (Math.random() - 0.5) * 0.25;
    const color = sprinkleColors[i % sprinkleColors.length];
    const spGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.09, 5);
    const spMat = new THREE.MeshStandardMaterial({ color, roughness: 0.3 });
    const sprinkle = new THREE.Mesh(spGeo, spMat);
    sprinkle.position.set(Math.cos(angle) * rad, Math.sin(angle) * rad, 0.26);
    sprinkle.rotation.z = Math.random() * Math.PI;
    sprinkle.rotation.x = 0.2;
    group.add(sprinkle);
  }

  return group;
}

// ============================================================================
// 9. Frosted Cupcake with Swirled Cream
// ============================================================================
export function createCupcake() {
  const group = new THREE.Group();
  group.name = 'cupcake';

  // Base cup (tapered cylinder)
  const cupGeo = new THREE.CylinderGeometry(0.48, 0.36, 0.55, 24);
  const cup = new THREE.Mesh(cupGeo, MAT_CACHE.cupcakeCup);
  cup.position.y = -0.27;
  group.add(cup);

  // Swirled frosting layers
  const tiers = [
    { r: 0.52, h: 0.22, y: 0.08 },
    { r: 0.40, h: 0.20, y: 0.25 },
    { r: 0.26, h: 0.18, y: 0.40 },
    { r: 0.12, h: 0.14, y: 0.52 },
  ];

  tiers.forEach((t) => {
    const frostGeo = new THREE.TorusGeometry(t.r * 0.7, t.r * 0.32, 12, 24);
    const frost = new THREE.Mesh(frostGeo, MAT_CACHE.frostingPink);
    frost.rotation.x = Math.PI / 2;
    frost.position.y = t.y;
    group.add(frost);
  });

  // Cherry on top
  const cherryGeo = new THREE.SphereGeometry(0.14, 14, 14);
  const cherry = new THREE.Mesh(cherryGeo, MAT_CACHE.cherryRed);
  cherry.position.y = 0.65;
  group.add(cherry);

  return group;
}

// ============================================================================
// 10. Ice Cream Cone with Swirl & Cherry
// ============================================================================
export function createIceCreamCone() {
  const group = new THREE.Group();
  group.name = 'iceCreamCone';

  // Waffle cone
  const coneGeo = new THREE.ConeGeometry(0.45, 1.3, 16);
  const cone = new THREE.Mesh(coneGeo, MAT_CACHE.waffleCone);
  cone.rotation.x = Math.PI;
  cone.position.y = -0.45;
  group.add(cone);

  // Mint Scoop
  const scoopGeo1 = new THREE.SphereGeometry(0.46, 18, 18);
  const scoop1 = new THREE.Mesh(scoopGeo1, MAT_CACHE.iceCreamMint);
  scoop1.position.y = 0.35;
  group.add(scoop1);

  // Berry Swirl Scoop on top
  const scoopGeo2 = new THREE.SphereGeometry(0.36, 16, 16);
  const scoop2 = new THREE.Mesh(scoopGeo2, MAT_CACHE.iceCreamBerry);
  scoop2.position.set(0.06, 0.72, 0.04);
  group.add(scoop2);

  // Cherry on apex
  const cherryGeo = new THREE.SphereGeometry(0.13, 12, 12);
  const cherry = new THREE.Mesh(cherryGeo, MAT_CACHE.cherryRed);
  cherry.position.set(0.08, 1.05, 0.05);
  group.add(cherry);

  return group;
}

// ============================================================================
// 11. French Patisserie Macaron
// ============================================================================
export function createMacaron() {
  const group = new THREE.Group();
  group.name = 'macaron';

  // Top shell
  const topGeo = new THREE.SphereGeometry(0.55, 24, 16);
  const topShell = new THREE.Mesh(topGeo, MAT_CACHE.macaronShell);
  topShell.scale.set(1.0, 0.38, 1.0);
  topShell.position.y = 0.16;
  group.add(topShell);

  // Bottom shell
  const botShell = topShell.clone();
  botShell.position.y = -0.16;
  group.add(botShell);

  // Middle cream filling
  const creamGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.14, 24);
  const cream = new THREE.Mesh(creamGeo, MAT_CACHE.macaronCream);
  group.add(cream);

  return group;
}

// ============================================================================
// 12. Golden Walnut
// ============================================================================
export function createWalnut() {
  const group = new THREE.Group();
  group.name = 'walnut';

  // Twin lobes
  const lobeGeo = new THREE.SphereGeometry(0.36, 16, 14);
  const lobe1 = new THREE.Mesh(lobeGeo, MAT_CACHE.nutShell);
  lobe1.scale.set(1.0, 1.25, 0.75);
  lobe1.position.x = -0.16;
  group.add(lobe1);

  const lobe2 = new THREE.Mesh(lobeGeo, MAT_CACHE.nutShell);
  lobe2.scale.set(1.0, 1.25, 0.75);
  lobe2.position.x = 0.16;
  group.add(lobe2);

  // Center seam
  const seamGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 24);
  const seam = new THREE.Mesh(seamGeo, MAT_CACHE.nutShell);
  seam.rotation.y = Math.PI / 2;
  group.add(seam);

  return group;
}

// ============================================================================
// 13. Roasted Almond
// ============================================================================
export function createAlmond() {
  const group = new THREE.Group();
  group.name = 'almond';

  // Tear-drop sculpted almond
  const geo = new THREE.SphereGeometry(0.4, 18, 16);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let y = pos.getY(i);
    let x = pos.getX(i);
    let z = pos.getZ(i);
    if (y > 0) {
      const taper = 1.0 - (y / 0.4) * 0.65;
      pos.setX(i, x * taper);
      pos.setZ(i, z * taper);
    }
  }
  geo.computeVertexNormals();

  const almond = new THREE.Mesh(geo, MAT_CACHE.almondBrown);
  almond.scale.set(0.85, 1.45, 0.55);
  group.add(almond);

  return group;
}

// ============================================================================
// 14. Golden Cashew Nut
// ============================================================================
export function createCashew() {
  const group = new THREE.Group();
  group.name = 'cashew';

  // Crescent curve
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, -0.3, 0),
    new THREE.Vector3(-0.45, 0.1, 0),
    new THREE.Vector3(-0.2, 0.45, 0),
    new THREE.Vector3(0.25, 0.3, 0),
    new THREE.Vector3(0.4, -0.15, 0),
  ]);

  const geo = new THREE.TubeGeometry(curve, 24, 0.22, 14, false);
  const cashew = new THREE.Mesh(geo, MAT_CACHE.cashewGolden);
  group.add(cashew);

  return group;
}

// ============================================================================
// 15. Pistachio Nut with Peeking Emerald Kernel
// ============================================================================
export function createPistachioNut() {
  const group = new THREE.Group();
  group.name = 'pistachioNut';

  // Emerald kernel inside
  const kernelGeo = new THREE.SphereGeometry(0.32, 16, 14);
  const kernel = new THREE.Mesh(kernelGeo, MAT_CACHE.pistachioGreen);
  kernel.scale.set(0.9, 1.25, 0.85);
  group.add(kernel);

  // Shell half A (angled open)
  const shellGeo = new THREE.SphereGeometry(0.36, 16, 14, 0, Math.PI);
  const shellA = new THREE.Mesh(shellGeo, MAT_CACHE.pistachioShell);
  shellA.scale.set(0.95, 1.35, 0.9);
  shellA.rotation.y = 0.35;
  shellA.position.z = 0.05;
  group.add(shellA);

  // Shell half B (angled opposite)
  const shellB = new THREE.Mesh(shellGeo, MAT_CACHE.pistachioShell);
  shellB.scale.set(0.95, 1.35, 0.9);
  shellB.rotation.y = Math.PI - 0.35;
  shellB.position.z = -0.05;
  group.add(shellB);

  return group;
}

// ============================================================================
// 16. Blueberry Cluster (3 Plump Berries)
// ============================================================================
export function createBlueberryCluster() {
  const group = new THREE.Group();
  group.name = 'blueberryCluster';

  const berryGeo = new THREE.SphereGeometry(0.24, 16, 14);
  const offsets = [
    [-0.2, -0.1, 0.08],
    [0.18, -0.12, -0.05],
    [0.02, 0.18, 0.0],
  ];

  offsets.forEach((pos) => {
    const berry = new THREE.Mesh(berryGeo, MAT_CACHE.blueberryIndigo);
    berry.position.set(...pos);
    group.add(berry);

    // Star-shaped calyx dimple
    const dimpleGeo = new THREE.TorusGeometry(0.05, 0.015, 6, 8);
    const dimple = new THREE.Mesh(dimpleGeo, MAT_CACHE.leafGreen);
    dimple.position.set(pos[0], pos[1] + 0.22, pos[2]);
    dimple.rotation.x = Math.PI / 2;
    group.add(dimple);
  });

  return group;
}

// ============================================================================
// 17. Golden Cheese Wedge with Stylized Holes
// ============================================================================
export function createCheeseWedge() {
  const group = new THREE.Group();
  group.name = 'cheeseWedge';

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0.9, 0.5);
  shape.lineTo(0.9, -0.5);
  shape.closePath();

  const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();

  const cheese = new THREE.Mesh(geo, MAT_CACHE.cheeseGolden);
  group.add(cheese);

  // Stylized crater indentations
  const craterGeo = new THREE.SphereGeometry(0.09, 10, 8);
  const craterMat = new THREE.MeshStandardMaterial({ color: 0xF57F17, roughness: 0.5 });
  const crater1 = new THREE.Mesh(craterGeo, craterMat);
  crater1.position.set(0.15, 0.12, 0.26);
  crater1.scale.set(1, 1, 0.4);
  group.add(crater1);

  const crater2 = new THREE.Mesh(craterGeo, craterMat);
  crater2.position.set(-0.1, -0.1, 0.26);
  crater2.scale.set(0.7, 0.7, 0.4);
  group.add(crater2);

  return group;
}

// ============================================================================
// 18. Italian Farfalle Bow-Tie Pasta
// ============================================================================
export function createFarfallePasta() {
  const group = new THREE.Group();
  group.name = 'farfallePasta';

  // Left wing
  const wingGeo = new THREE.BoxGeometry(0.48, 0.55, 0.08);
  const wingL = new THREE.Mesh(wingGeo, MAT_CACHE.pastaDough);
  wingL.position.x = -0.32;
  wingL.rotation.y = 0.25;
  group.add(wingL);

  // Right wing
  const wingR = new THREE.Mesh(wingGeo, MAT_CACHE.pastaDough);
  wingR.position.x = 0.32;
  wingR.rotation.y = -0.25;
  group.add(wingR);

  // Central pinched knot
  const knotGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.5, 12);
  const knot = new THREE.Mesh(knotGeo, MAT_CACHE.pastaDough);
  knot.scale.set(0.65, 1.0, 1.2);
  group.add(knot);

  return group;
}

// ============================================================================
// 19. Fluted Rigatoni Pasta Tube
// ============================================================================
export function createRigatoniPasta() {
  const group = new THREE.Group();
  group.name = 'rigatoniPasta';

  const cylinderGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.85, 20, 1, true);
  const tube = new THREE.Mesh(cylinderGeo, MAT_CACHE.pastaDough);
  group.add(tube);

  // Fluted outer rings
  for (let i = -3; i <= 3; i++) {
    const ringGeo = new THREE.TorusGeometry(0.33, 0.02, 6, 20);
    const ring = new THREE.Mesh(ringGeo, MAT_CACHE.pastaDough);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 0.12;
    group.add(ring);
  }

  return group;
}

// ============================================================================
// 20. Steamed Golden Dumpling (Potsticker)
// ============================================================================
export function createDumpling() {
  const group = new THREE.Group();
  group.name = 'dumpling';

  // Crescent body
  const bodyGeo = new THREE.SphereGeometry(0.52, 20, 16);
  const body = new THREE.Mesh(bodyGeo, MAT_CACHE.dumplingSkin);
  body.scale.set(1.2, 0.65, 0.55);
  group.add(body);

  // Top pleated ridge
  const ridgeGeo = new THREE.TorusGeometry(0.55, 0.05, 8, 20, Math.PI);
  const ridge = new THREE.Mesh(ridgeGeo, MAT_CACHE.dumplingSkin);
  ridge.position.y = 0.15;
  ridge.rotation.z = Math.PI;
  group.add(ridge);

  // Seared golden bottom
  const searGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.06, 18);
  const sear = new THREE.Mesh(searGeo, MAT_CACHE.dumplingSear);
  sear.position.y = -0.32;
  sear.scale.set(1.2, 1.0, 0.6);
  group.add(sear);

  return group;
}

// ============================================================================
// 21. Fresh Basil Herb Leaf
// ============================================================================
export function createHerbLeaf() {
  const group = new THREE.Group();
  group.name = 'herbLeaf';

  const shape = new THREE.Shape();
  shape.moveTo(0, -0.4);
  shape.quadraticCurveTo(0.35, 0.0, 0, 0.55);
  shape.quadraticCurveTo(-0.35, 0.0, 0, -0.4);

  const extrudeSettings = { depth: 0.02, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
  const leafGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  leafGeo.center();

  const leaf = new THREE.Mesh(leafGeo, MAT_CACHE.leafGreen);
  leaf.rotation.x = 0.2;
  group.add(leaf);

  // Central vein
  const veinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.38, 0.02),
    new THREE.Vector3(0, 0.1, 0.03),
    new THREE.Vector3(0, 0.5, 0.02),
  ]);
  const veinGeo = new THREE.TubeGeometry(veinCurve, 12, 0.018, 6, false);
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x1B5E20, roughness: 0.4 });
  const vein = new THREE.Mesh(veinGeo, veinMat);
  group.add(vein);

  return group;
}
