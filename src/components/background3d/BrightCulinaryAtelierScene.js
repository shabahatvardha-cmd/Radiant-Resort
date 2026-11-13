import * as THREE from 'three';

/**
 * BrightCulinaryAtelierScene.js
 * 
 * Procedural 3D Floating Culinary Atelier for The Radiant Hotel & Resort.
 * 
 * 9 INDEPENDENT 3D OBJECT LAYERS:
 * 1. Architectural Arches & Sandstone Colonnade
 * 2. Sculptural Pedestal Dining Table & Chairs
 * 3. Artisan Porcelain Plates & Ceramic Bowls
 * 4. Brushed Champagne Gold Cutlery (Forks, Knives, Spoons)
 * 5. Draped Natural Flax Linen Napkin & Oak Grinders
 * 6. High-Transmission Crystalline Glassware & Decanters
 * 7. Fresh Floating Culinary Botanicals & Spices (Rosemary, Star Anise, Orange Slices, Olive Leaves)
 * 8. Fluted Brass Pendant Light & Botanical Accent
 * 9. Editorial Culinary Photography Visual Card
 * 
 * All elements move with independent positions, rotations, scales and depth trajectories,
 * driven smoothly and reversibly by scroll progress u in [0, 1].
 */

export function createBrightCulinaryAtelierScene() {
  const group = new THREE.Group();

  // Master Palette Constants
  const PALETTE = {
    ivory: 0xFDFBF7,
    sandstone: 0xF0E8DC,
    warmSand: 0xE2D5C3,
    goldBrass: 0xD6B878,
    warmBronze: 0xB89352,
    blondeOak: 0xC8A882,
    darkHerbGreen: 0x3E633C,
    citrusOrange: 0xF2A138,
    cinnamonBrown: 0x7E3F1F,
    flaxLinen: 0xEDE5D8,
  };

  // Shared High-Quality Materials
  const materials = {
    sandstoneArch: new THREE.MeshStandardMaterial({
      color: PALETTE.sandstone,
      roughness: 0.88,
      metalness: 0.02,
    }),
    tableMarble: new THREE.MeshStandardMaterial({
      color: PALETTE.ivory,
      roughness: 0.32,
      metalness: 0.06,
    }),
    blondeWood: new THREE.MeshStandardMaterial({
      color: PALETTE.blondeOak,
      roughness: 0.65,
      metalness: 0.05,
    }),
    porcelainPlate: new THREE.MeshStandardMaterial({
      color: PALETTE.ivory,
      roughness: 0.18,
      metalness: 0.04,
    }),
    goldTrim: new THREE.MeshStandardMaterial({
      color: PALETTE.goldBrass,
      roughness: 0.22,
      metalness: 0.88,
    }),
    brushedCutlery: new THREE.MeshStandardMaterial({
      color: PALETTE.goldBrass,
      roughness: 0.20,
      metalness: 0.90,
    }),
    knifeSteel: new THREE.MeshStandardMaterial({
      color: 0xECE5D8,
      roughness: 0.15,
      metalness: 0.92,
    }),
    linenNapkin: new THREE.MeshStandardMaterial({
      color: PALETTE.flaxLinen,
      roughness: 0.95,
      metalness: 0.0,
      side: THREE.DoubleSide,
    }),
    crystalGlass: new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.92,
      opacity: 1.0,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      reflectivity: 0.55,
      thickness: 0.35,
    }),
    herbGreen: new THREE.MeshStandardMaterial({
      color: PALETTE.darkHerbGreen,
      roughness: 0.45,
      metalness: 0.05,
    }),
    citrusSlice: new THREE.MeshStandardMaterial({
      color: PALETTE.citrusOrange,
      roughness: 0.35,
      metalness: 0.02,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    }),
    citrusRind: new THREE.MeshStandardMaterial({
      color: 0xE0821B,
      roughness: 0.55,
      metalness: 0.05,
    }),
    starAnise: new THREE.MeshStandardMaterial({
      color: PALETTE.cinnamonBrown,
      roughness: 0.78,
      metalness: 0.05,
    }),
    blackPeppercorn: new THREE.MeshStandardMaterial({
      color: 0x2A2724,
      roughness: 0.85,
      metalness: 0.1,
    }),
  };

  // =========================================================================
  // LAYER 1: ARCHITECTURAL WALL & NEOCLASSICAL ARCHES (Depth: Z ~ -3.5)
  // =========================================================================
  const archGroup = new THREE.Group();

  // Left Arch Structure
  const leftArchTorus = new THREE.Mesh(
    new THREE.TorusGeometry(1.9, 0.16, 16, 32, Math.PI),
    materials.sandstoneArch
  );
  leftArchTorus.position.set(-2.2, 1.8, -3.2);
  archGroup.add(leftArchTorus);

  const leftPillarL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.18, 4.6, 16),
    materials.sandstoneArch
  );
  leftPillarL.position.set(-4.1, -0.5, -3.2);
  archGroup.add(leftPillarL);

  const leftPillarR = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.18, 4.6, 16),
    materials.sandstoneArch
  );
  leftPillarR.position.set(-0.3, -0.5, -3.2);
  archGroup.add(leftPillarR);

  // Right Soaring Arch Structure (Frames the dining composition)
  const rightArchTorus = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.18, 16, 32, Math.PI),
    materials.sandstoneArch
  );
  rightArchTorus.position.set(2.4, 2.1, -3.5);
  archGroup.add(rightArchTorus);

  const rightPillarL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.20, 4.8, 16),
    materials.sandstoneArch
  );
  rightPillarL.position.set(0.0, -0.3, -3.5);
  archGroup.add(rightPillarL);

  const rightPillarR = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.20, 4.8, 16),
    materials.sandstoneArch
  );
  rightPillarR.position.set(4.8, -0.3, -3.5);
  archGroup.add(rightPillarR);

  // Background Wall Niche Panel
  const backWallNiche = new THREE.Mesh(
    new THREE.BoxGeometry(11.0, 6.5, 0.2),
    new THREE.MeshStandardMaterial({
      color: 0xF5EFE6,
      roughness: 0.94,
      metalness: 0.01,
    })
  );
  backWallNiche.position.set(0.0, 0.5, -3.9);
  archGroup.add(backWallNiche);

  group.add(archGroup);

  // =========================================================================
  // LAYER 2: SCULPTURAL PEDESTAL DINING TABLE & CHAIR SILHOUETTE (Depth: Z ~ -1.5)
  // =========================================================================
  const tableGroup = new THREE.Group();

  // Circular Marble Tabletop
  const tabletop = new THREE.Mesh(
    new THREE.CylinderGeometry(2.1, 2.1, 0.07, 64),
    materials.tableMarble
  );
  tabletop.position.set(0.0, 0.0, 0.0);
  tableGroup.add(tabletop);

  // Brass Rim Edge on Tabletop
  const tableRim = new THREE.Mesh(
    new THREE.TorusGeometry(2.11, 0.02, 16, 64),
    materials.goldTrim
  );
  tableRim.rotation.x = Math.PI / 2;
  tableGroup.add(tableRim);

  // Fluted Central Pedestal
  const tablePedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.42, 2.2, 32),
    materials.tableMarble
  );
  tablePedestal.position.set(0.0, -1.1, 0.0);
  tableGroup.add(tablePedestal);

  // Stepped Plinth Base
  const tableBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.75, 0.95, 0.15, 32),
    materials.tableMarble
  );
  tableBase.position.set(0.0, -2.15, 0.0);
  tableGroup.add(tableBase);

  // Minimalist Bentwood Chair Silhouette (Right Background)
  const chairGroup = new THREE.Group();
  const chairBack = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.04, 16, 32, Math.PI * 0.85),
    materials.blondeWood
  );
  chairBack.rotation.z = Math.PI * 0.08;
  chairGroup.add(chairBack);

  const chairSeat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.48, 0.04, 32),
    materials.blondeWood
  );
  chairSeat.position.set(0.0, -0.45, 0.0);
  chairGroup.add(chairSeat);

  chairGroup.position.set(2.2, -0.4, -0.8);
  tableGroup.add(chairGroup);

  tableGroup.position.set(1.4, -1.5, -1.2);
  tableGroup.rotation.x = 0.28;
  group.add(tableGroup);

  // =========================================================================
  // LAYER 3: ARTISAN PORCELAIN PLATES & CERAMIC BOWLS (Depth: Z ~ -0.2 to 0.5)
  // =========================================================================
  const plateGroup = new THREE.Group();

  // Grand Porcelain Charger Plate
  const chargerPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 0.96, 0.045, 64),
    materials.porcelainPlate
  );
  chargerPlate.position.set(0.0, 0.0, 0.0);
  plateGroup.add(chargerPlate);

  // Gold Leaf Rim Trim
  const chargerGoldRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.015, 16, 64),
    materials.goldTrim
  );
  chargerGoldRim.rotation.x = Math.PI / 2;
  chargerGoldRim.position.y = 0.022;
  plateGroup.add(chargerGoldRim);

  // Inner Fine Dining Ceramic Dinner Bowl
  const ceramicBowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.45, 0.18, 48, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xFDFBF7,
      roughness: 0.25,
      side: THREE.DoubleSide,
    })
  );
  ceramicBowl.position.set(0.0, 0.08, 0.0);
  plateGroup.add(ceramicBowl);

  const bowlBottom = new THREE.Mesh(
    new THREE.CircleGeometry(0.45, 32),
    materials.porcelainPlate
  );
  bowlBottom.rotation.x = -Math.PI / 2;
  bowlBottom.position.y = -0.01;
  plateGroup.add(bowlBottom);

  plateGroup.position.set(1.4, -0.75, -0.25);
  plateGroup.rotation.x = 0.28;
  group.add(plateGroup);

  // =========================================================================
  // LAYER 4: BRUSHED CHAMPAGNE GOLD CUTLERY (Forks, Knives, Spoons)
  // =========================================================================
  const cutleryGroup = new THREE.Group();

  // 1. Dinner Fork (Left of plate)
  const forkGroup = new THREE.Group();
  const forkHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.03, 1.05, 16),
    materials.brushedCutlery
  );
  forkHandle.position.set(0.0, -0.3, 0.0);
  forkGroup.add(forkHandle);

  // Fork Tines
  for (let t = -0.045; t <= 0.045; t += 0.03) {
    const tine = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.32, 0.008),
      materials.brushedCutlery
    );
    tine.position.set(t, 0.35, 0.0);
    forkGroup.add(tine);
  }
  const forkBridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.06, 0.012),
    materials.brushedCutlery
  );
  forkBridge.position.set(0.0, 0.20, 0.0);
  forkGroup.add(forkBridge);

  forkGroup.position.set(0.1, -0.75, 0.1);
  forkGroup.rotation.set(0.28, 0.0, 0.02);
  cutleryGroup.add(forkGroup);

  // 2. Dinner Knife (Right of plate)
  const knifeGroup = new THREE.Group();
  const knifeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.03, 0.95, 16),
    materials.brushedCutlery
  );
  knifeHandle.position.set(0.0, -0.35, 0.0);
  knifeGroup.add(knifeHandle);

  const knifeBlade = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.45, 0.008),
    materials.knifeSteel
  );
  knifeBlade.position.set(-0.01, 0.32, 0.0);
  knifeGroup.add(knifeBlade);

  knifeGroup.position.set(2.7, -0.75, 0.1);
  knifeGroup.rotation.set(0.28, 0.0, -0.03);
  cutleryGroup.add(knifeGroup);

  // 3. Dessert Spoon (Top of plate)
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.024, 0.85, 16),
    materials.brushedCutlery
  );
  spoonHandle.position.set(-0.25, 0.0, 0.0);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 24, 16),
    materials.brushedCutlery
  );
  spoonBowl.scale.set(1.4, 0.9, 0.35);
  spoonBowl.position.set(0.28, 0.0, 0.0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(1.4, 0.45, -0.3);
  spoonGroup.rotation.set(0.28, 0.0, 0.0);
  cutleryGroup.add(spoonGroup);

  group.add(cutleryGroup);

  // =========================================================================
  // LAYER 5: DRAPED ORGANIC LINEN NAPKIN & OAK TABLE ACCESSORIES
  // =========================================================================
  const accessoryGroup = new THREE.Group();

  // Draped Natural Linen Napkin
  const napkinGeo = new THREE.PlaneGeometry(0.65, 1.1, 16, 16);
  // Apply sinusoidal gentle organic folds
  const pos = napkinGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const wave = Math.sin(x * 6.0) * 0.06 + Math.cos(y * 4.0) * 0.03;
    pos.setZ(i, wave);
  }
  napkinGeo.computeVertexNormals();

  const napkinMesh = new THREE.Mesh(napkinGeo, materials.linenNapkin);
  napkinMesh.position.set(-0.35, -0.78, 0.15);
  napkinMesh.rotation.set(-Math.PI / 2 + 0.28, 0.0, 0.12);
  accessoryGroup.add(napkinMesh);

  // Blonde Wood Salt & Pepper Grinders (Background Right)
  const pepperGrinder = new THREE.Group();
  const grinderBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.16, 0.65, 24),
    materials.blondeWood
  );
  pepperGrinder.add(grinderBody);
  const grinderCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    materials.blondeWood
  );
  grinderCap.position.y = 0.38;
  pepperGrinder.add(grinderCap);
  const grinderBrassNut = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16),
    materials.goldTrim
  );
  grinderBrassNut.position.y = 0.48;
  pepperGrinder.add(grinderBrassNut);

  pepperGrinder.position.set(2.9, -0.2, -0.7);
  accessoryGroup.add(pepperGrinder);

  group.add(accessoryGroup);

  // =========================================================================
  // LAYER 6: TRANSPARENT CRYSTALLINE GLASSWARE & DECANTER (Physical Refractions)
  // =========================================================================
  const glasswareGroup = new THREE.Group();

  // 1. Tall Bordeaux Wine Glass
  const wineGlass = new THREE.Group();
  const glassFoot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.015, 32),
    materials.crystalGlass
  );
  wineGlass.add(glassFoot);

  const glassStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.02, 0.95, 16),
    materials.crystalGlass
  );
  glassStem.position.y = 0.48;
  wineGlass.add(glassStem);

  const glassBowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.22, 0.75, 32, 1, true),
    materials.crystalGlass
  );
  glassBowl.position.y = 1.32;
  wineGlass.add(glassBowl);

  const glassBowlBottom = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    materials.crystalGlass
  );
  glassBowlBottom.position.y = 0.95;
  wineGlass.add(glassBowlBottom);

  wineGlass.position.set(2.4, -0.55, -0.15);
  wineGlass.scale.set(0.9, 0.9, 0.9);
  glasswareGroup.add(wineGlass);

  // 2. Sculptural Water Tumbler
  const waterTumbler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.22, 0.52, 12),
    materials.crystalGlass
  );
  waterTumbler.position.set(1.9, -0.65, 0.2);
  glasswareGroup.add(waterTumbler);

  // 3. Elegant Glass Wine Carafe / Decanter (Mid-Left Background)
  const decanterGroup = new THREE.Group();
  const carafeBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.55, 0.85, 32),
    materials.crystalGlass
  );
  decanterGroup.add(carafeBody);

  const carafeNeck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.18, 0.75, 32, 1, true),
    materials.crystalGlass
  );
  carafeNeck.position.y = 0.78;
  decanterGroup.add(carafeNeck);

  decanterGroup.position.set(-0.8, -0.4, -0.9);
  glasswareGroup.add(decanterGroup);

  group.add(glasswareGroup);

  // =========================================================================
  // LAYER 7: INDIVIDUAL CULINARY INGREDIENTS & BOTANICALS (Floating Across Depth)
  // =========================================================================
  const ingredientItems = [];

  // Helper: Create a fresh Rosemary Sprig
  function createRosemarySprig() {
    const sprig = new THREE.Group();
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.9, 12),
      materials.herbGreen
    );
    sprig.add(stem);

    for (let i = 0; i < 14; i++) {
      const t = (i / 14) * 0.75 - 0.35;
      const angle = (i * 1.6);
      const leaf = new THREE.Mesh(
        new THREE.ConeGeometry(0.022, 0.22, 8),
        materials.herbGreen
      );
      leaf.position.set(Math.cos(angle) * 0.06, t, Math.sin(angle) * 0.06);
      leaf.rotation.set(0.4, angle, 0.8);
      sprig.add(leaf);
    }
    return sprig;
  }

  // Helper: Create Whole Star Anise
  function createStarAniseMesh() {
    const star = new THREE.Group();
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      materials.starAnise
    );
    star.add(center);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const point = new THREE.Mesh(
        new THREE.ConeGeometry(0.065, 0.35, 8),
        materials.starAnise
      );
      point.position.set(Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0);
      point.rotation.z = angle - Math.PI / 2;
      point.scale.set(0.7, 1.0, 0.4);
      star.add(point);
    }
    return star;
  }

  // Helper: Create Sunlit Translucent Citrus Slice
  function createCitrusWheel() {
    const wheel = new THREE.Group();
    const pulp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.02, 32),
      materials.citrusSlice
    );
    wheel.add(pulp);

    const rind = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.035, 12, 32),
      materials.citrusRind
    );
    rind.rotation.x = Math.PI / 2;
    wheel.add(rind);

    return wheel;
  }

  // Helper: Create Olive / Bay Leaf
  function createOliveLeaf() {
    const leafGeo = new THREE.PlaneGeometry(0.22, 0.55, 8, 8);
    const p = leafGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      p.setZ(i, -x * x * 1.5);
    }
    leafGeo.computeVertexNormals();
    return new THREE.Mesh(leafGeo, materials.herbGreen);
  }

  // 1. Floating Rosemary Sprig (Foreground Right, Z: 0.8)
  const rosemary1 = createRosemarySprig();
  ingredientItems.push({
    mesh: rosemary1,
    p0: [2.8, 1.5, 0.6],
    p1: [2.5, 0.8, 0.7],
    p2: [2.2, 0.1, 0.8],
    rotSpeed: [0.3, 0.5, 0.2],
  });
  group.add(rosemary1);

  // 2. Second Rosemary Sprig (Mid-Left, Z: -0.2)
  const rosemary2 = createRosemarySprig();
  rosemary2.scale.set(0.75, 0.75, 0.75);
  ingredientItems.push({
    mesh: rosemary2,
    p0: [-1.8, 0.6, -0.4],
    p1: [-1.4, 0.2, -0.2],
    p2: [-1.1, -0.2, 0.0],
    rotSpeed: [-0.2, 0.4, 0.3],
  });
  group.add(rosemary2);

  // 3. Whole Star Anise (Center-Right Floating, Z: 0.4)
  const anise1 = createStarAniseMesh();
  ingredientItems.push({
    mesh: anise1,
    p0: [1.8, 1.9, 0.2],
    p1: [1.6, 1.1, 0.4],
    p2: [1.4, 0.4, 0.5],
    rotSpeed: [0.4, 0.6, 0.5],
  });
  group.add(anise1);

  // 4. Second Star Anise (Foreground Bokeh Left, Z: 1.1)
  const anise2 = createStarAniseMesh();
  anise2.scale.set(0.85, 0.85, 0.85);
  ingredientItems.push({
    mesh: anise2,
    p0: [-0.9, -0.9, 0.9],
    p1: [-0.7, -0.5, 1.1],
    p2: [-0.5, -0.2, 1.2],
    rotSpeed: [-0.3, 0.4, 0.6],
  });
  group.add(anise2);

  // 5. Sunlit Golden Citrus Slice (Upper Center-Right, Z: 0.1)
  const citrus1 = createCitrusWheel();
  citrus1.scale.set(0.8, 0.8, 0.8);
  ingredientItems.push({
    mesh: citrus1,
    p0: [2.2, 2.4, -0.2],
    p1: [2.0, 1.7, 0.1],
    p2: [1.8, 1.0, 0.3],
    rotSpeed: [0.2, 0.3, 0.4],
  });
  group.add(citrus1);

  // 6. Olive Leaves (Drifting naturally)
  const leaf1 = createOliveLeaf();
  ingredientItems.push({
    mesh: leaf1,
    p0: [0.6, 1.2, 0.3],
    p1: [0.8, 0.7, 0.5],
    p2: [1.0, 0.2, 0.6],
    rotSpeed: [0.5, 0.2, 0.7],
  });
  group.add(leaf1);

  // 7. Cluster of 5 Black Peppercorns (Foreground Bokeh Sparkle)
  const peppercornGroup = new THREE.Group();
  for (let k = 0; k < 6; k++) {
    const pepper = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 12, 12),
      materials.blackPeppercorn
    );
    pepper.position.set(
      (Math.random() - 0.5) * 0.45,
      (Math.random() - 0.5) * 0.45,
      (Math.random() - 0.5) * 0.3
    );
    peppercornGroup.add(pepper);
  }
  ingredientItems.push({
    mesh: peppercornGroup,
    p0: [0.2, 0.4, 0.9],
    p1: [0.4, 0.1, 1.2],
    p2: [0.6, -0.2, 1.4],
    rotSpeed: [0.2, 0.4, 0.1],
  });
  group.add(peppercornGroup);

  // =========================================================================
  // LAYER 8: FLUTED BRASS PENDANT LIGHT (Upper Framing)
  // =========================================================================
  const pendantGroup = new THREE.Group();

  const pendantWire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.006, 0.006, 3.5, 12),
    materials.goldTrim
  );
  pendantWire.position.y = 1.75;
  pendantGroup.add(pendantWire);

  const pendantShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.65, 0.42, 32, 1, true),
    materials.goldTrim
  );
  pendantShade.position.y = 0.0;
  pendantGroup.add(pendantShade);

  const pendantBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xFFFBE6 })
  );
  pendantBulb.position.y = -0.06;
  pendantGroup.add(pendantBulb);

  pendantGroup.position.set(1.4, 3.2, -0.5);
  group.add(pendantGroup);

  // =========================================================================
  // SCROLL-DRIVEN CHOREOGRAPHY CONTROLLER (Continuous Smooth Interpolation)
  // =========================================================================
  function updateScroll(u, time = 0) {
    // Clamped progress in [0, 1]
    const p = Math.max(0, Math.min(1, u));

    // 1. Architecture: Reveals & gently recedes into depth with parallax
    // When u: 0 -> 1, Z shifts from -3.4 to -4.1, scale breathes from 0.96 to 1.04
    archGroup.position.z = -3.4 - p * 0.7;
    archGroup.position.y = 0.2 + Math.sin(p * Math.PI) * 0.15;
    archGroup.scale.setScalar(0.96 + p * 0.08);

    // 2. Dining Table: Elevates from below, settling into horizontal assembly
    // p: 0.0 -> 0.5 raises table, stabilizes during 0.5 -> 0.8
    const tableProgress = Math.min(1.0, p * 1.5);
    tableGroup.position.y = -2.2 + tableProgress * 0.95;
    tableGroup.position.z = -1.6 + tableProgress * 0.5;
    tableGroup.rotation.x = 0.38 - tableProgress * 0.14;

    // 3. Charger Plate & Ceramic Bowl: Enters from top-right with soft tilt, converges on table
    const plateEase = Math.sin(Math.min(1.0, p * 1.4) * Math.PI * 0.5);
    plateGroup.position.x = 2.4 - plateEase * 0.95;
    plateGroup.position.y = 0.6 - plateEase * 1.35;
    plateGroup.position.z = 0.4 - plateEase * 0.65;
    plateGroup.rotation.x = 0.55 - plateEase * 0.28;
    plateGroup.rotation.y = -0.35 + plateEase * 0.35;

    // 4. Cutlery: Fork, Knife and Spoon gracefully spin and glide into place setting
    const cutleryEase = Math.sin(Math.min(1.0, Math.max(0, p - 0.1) * 1.6) * Math.PI * 0.5);
    forkGroup.position.x = -0.5 + cutleryEase * 0.65;
    forkGroup.position.y = -0.1 - cutleryEase * 0.65;
    forkGroup.rotation.z = 0.45 - cutleryEase * 0.42;

    knifeGroup.position.x = 3.4 - cutleryEase * 0.68;
    knifeGroup.position.y = -0.1 - cutleryEase * 0.65;
    knifeGroup.rotation.z = -0.45 + cutleryEase * 0.42;

    spoonGroup.position.y = 1.2 - cutleryEase * 0.75;
    spoonGroup.rotation.y = Math.sin((1.0 - cutleryEase) * 2.0) * 0.4;

    // 5. Linen Napkin: Soft undulating fold floats in and settles
    napkinMesh.position.y = -0.2 - plateEase * 0.58;
    napkinMesh.rotation.z = 0.35 - plateEase * 0.22;

    // 6. Glassware: Wine glass and decanter catch refractions as they settle
    wineGlass.position.y = 0.3 - plateEase * 0.85;
    wineGlass.rotation.z = 0.15 - plateEase * 0.15;
    decanterGroup.position.y = 0.2 - plateEase * 0.6;

    // 7. Ingredients: Individual botanical particles float and orbit across depth planes
    ingredientItems.forEach((item, idx) => {
      // Piecewise quadratic Bézier through p0 -> p1 -> p2
      const t = p;
      const oneMinusT = 1.0 - t;
      const x = oneMinusT * oneMinusT * item.p0[0] + 2 * oneMinusT * t * item.p1[0] + t * t * item.p2[0];
      const y = oneMinusT * oneMinusT * item.p0[1] + 2 * oneMinusT * t * item.p1[1] + t * t * item.p2[1];
      const z = oneMinusT * oneMinusT * item.p0[2] + 2 * oneMinusT * t * item.p1[2] + t * t * item.p2[2];

      // Subtle atmospheric micro-idle drift
      const idleY = Math.sin(time * 0.8 + idx) * 0.04;
      const idleRot = Math.cos(time * 0.6 + idx) * 0.05;

      item.mesh.position.set(x, y + idleY, z);
      item.mesh.rotation.x = t * item.rotSpeed[0] * Math.PI + idleRot;
      item.mesh.rotation.y = t * item.rotSpeed[1] * Math.PI + idleRot;
      item.mesh.rotation.z = t * item.rotSpeed[2] * Math.PI;
    });

    // 8. Pendant Light: Subtle gentle pendulum sway
    pendantGroup.rotation.z = Math.sin(time * 0.7) * 0.02 + Math.sin(p * 2.0) * 0.03;
  }

  // Cleanup Function
  function dispose() {
    Object.values(materials).forEach((mat) => mat.dispose());
  }

  return {
    group,
    updateScroll,
    dispose,
  };
}

