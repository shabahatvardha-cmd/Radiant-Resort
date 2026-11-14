import * as THREE from 'three';

/**
 * FitnessGym3DScene.js
 * 
 * Procedural 3D Cinematic Gym Environment for Radiant Hotel & Resort.
 * 
 * Layered Composition:
 * 1. Distant Gym Equipment Silhouettes (Power rack, cable crossover, bench)
 * 2. Floating 3D Olympic Weight Plates (Realistic rubber bumpers with embossed text)
 * 3. 3D Dumbbells (Knurled steel handle, dark graphite weights, bronze collars)
 * 4. Barbell Assembly Signature Effect (Plates & collars assemble onto barbell)
 * 5. Athletic Movement Trajectories & Performance Metrics
 * 
 * 100% Scroll-driven kinematics linked to local progress u in [0, 1].
 */

// Procedural Canvas Texture Generator for Olympic Bumper Plates
function createPlateTexture(kg = 25, label = 'THE RADIANT ATHLETICS') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const cx = 512;
  const cy = 512;

  // Base Dark Matte Rubber Background
  ctx.fillStyle = '#111514';
  ctx.fillRect(0, 0, 1024, 1024);

  // Concentric Radial Grooves & Bevels
  ctx.strokeStyle = '#1D2220';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, 470, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#0B0E0D';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, 450, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle Metallic Ring Accent
  ctx.strokeStyle = 'rgba(214, 184, 120, 0.45)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 390, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Stepped Lip
  ctx.strokeStyle = '#1F2523';
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, 370, 0, Math.PI * 2);
  ctx.stroke();

  // Circular Text: "THE RADIANT ATHLETICS" on Top Arc
  ctx.save();
  ctx.translate(cx, cy);
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#C8CCD0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '12px';

  const topText = label;
  const topRadius = 310;
  const topAngleSpan = Math.PI * 0.75;
  const topStartAngle = -Math.PI / 2 - topAngleSpan / 2;
  const topStep = topAngleSpan / (topText.length - 1);

  for (let i = 0; i < topText.length; i++) {
    const angle = topStartAngle + i * topStep;
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(0, -topRadius);
    ctx.fillText(topText[i], 0, 0);
    ctx.restore();
  }

  // Circular Text: "OLYMPIC COMPETITION" on Bottom Arc
  const botText = 'OLYMPIC COMPETITION';
  const botRadius = 310;
  const botAngleSpan = Math.PI * 0.70;
  const botStartAngle = Math.PI / 2 + botAngleSpan / 2;
  const botStep = -botAngleSpan / (botText.length - 1);

  ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8C9298';

  for (let i = 0; i < botText.length; i++) {
    const angle = botStartAngle + i * botStep;
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(0, botRadius);
    ctx.fillText(botText[i], 0, 0);
    ctx.restore();
  }

  // Large Bold Weight Markings: "25 KG"
  ctx.font = '900 120px "Cinzel", "Playfair Display", serif';
  ctx.fillStyle = '#FAF6F0';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 4;
  ctx.fillText(`${kg}`, 0, -40);

  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#D6B878'; // Champagne Gold Unit
  ctx.shadowBlur = 0;
  ctx.fillText('KG', 0, 50);

  const lb = Math.round(kg * 2.20462);
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8C9298';
  ctx.fillText(`${lb} LB`, 0, 90);

  // Center Stainless Steel Bushing Ring
  ctx.strokeStyle = '#D8DCDE';
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.arc(0, 0, 110, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#8A9094';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 122, 0, Math.PI * 2);
  ctx.stroke();

  // Central 50mm Bore Hole (Dark inner hub)
  ctx.fillStyle = '#050707';
  ctx.beginPath();
  ctx.arc(0, 0, 95, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// Procedural Knurling Texture for Dumbbell and Barbell Grips
function createKnurlingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#777777';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;

  const step = 8;
  for (let x = -256; x < 512; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 256, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, 256);
    ctx.lineTo(x + 256, 0);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 2);
  return texture;
}

export function createFitnessGym3DScene() {
  const group = new THREE.Group();

  // Master Palette
  const PALETTE = {
    deepBackground: 0x07100F,
    forestGreen: 0x0B1614,
    secondaryGreen: 0x172D29,
    champagneGold: 0xD6B878,
    antiqueBronze: 0x8C6D37,
    warmIvory: 0xFAF6F0,
    steelMetallic: 0xBDC3C7,
    darkGraphite: 0x1E2221,
    matteRubber: 0x121514,
  };

  // Shared Procedural Textures
  const knurlingTex = createKnurlingTexture();
  const plate25Tex = createPlateTexture(25, 'THE RADIANT ATHLETICS');
  const plate20Tex = createPlateTexture(20, 'PRECISION STRENGTH');
  const plate10Tex = createPlateTexture(10, 'CALIBRATED STEEL');

  // Materials
  const materials = {
    plate25Face: new THREE.MeshStandardMaterial({
      map: plate25Tex,
      roughness: 0.68,
      metalness: 0.22,
    }),
    plate20Face: new THREE.MeshStandardMaterial({
      map: plate20Tex,
      roughness: 0.68,
      metalness: 0.22,
    }),
    plate10Face: new THREE.MeshStandardMaterial({
      map: plate10Tex,
      roughness: 0.68,
      metalness: 0.22,
    }),
    plateRubberRim: new THREE.MeshStandardMaterial({
      color: PALETTE.matteRubber,
      roughness: 0.75,
      metalness: 0.15,
    }),
    brushedSteel: new THREE.MeshStandardMaterial({
      color: PALETTE.steelMetallic,
      roughness: 0.28,
      metalness: 0.94,
    }),
    knurledSteel: new THREE.MeshStandardMaterial({
      color: 0xCED4D8,
      bumpMap: knurlingTex,
      bumpScale: 0.04,
      roughness: 0.38,
      metalness: 0.88,
    }),
    champagneGoldMetal: new THREE.MeshStandardMaterial({
      color: PALETTE.champagneGold,
      roughness: 0.32,
      metalness: 0.85,
    }),
    darkGraphiteMetal: new THREE.MeshStandardMaterial({
      color: PALETTE.darkGraphite,
      roughness: 0.42,
      metalness: 0.78,
    }),
    distantSilhouette: new THREE.MeshBasicMaterial({
      color: PALETTE.secondaryGreen,
      transparent: true,
      opacity: 0.18,
    }),
  };

  // =========================================================================
  // HELPER: BUILD A 3D OLYMPIC WEIGHT PLATE
  // =========================================================================
  function buildOlympicPlate(radius, thickness, faceMat) {
    const plateGroup = new THREE.Group();

    // 1. Main cylindrical bumper body (multi-material: sides rubber, caps textured)
    const bodyGeo = new THREE.CylinderGeometry(radius, radius, thickness, 48);
    const bodyMesh = new THREE.Mesh(bodyGeo, [
      materials.plateRubberRim, // Side rim
      faceMat,                  // Top face
      faceMat,                  // Bottom face
    ]);
    bodyMesh.rotation.x = Math.PI / 2; // Flat facing camera
    plateGroup.add(bodyMesh);

    // 2. Beveled outer edge ring
    const bevelGeo = new THREE.TorusGeometry(radius * 0.96, thickness * 0.25, 12, 48);
    const bevelMesh = new THREE.Mesh(bevelGeo, materials.plateRubberRim);
    plateGroup.add(bevelMesh);

    // 3. Central Stainless Steel Hub Collar
    const hubGeo = new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, thickness * 1.05, 32);
    const hubMesh = new THREE.Mesh(hubGeo, materials.brushedSteel);
    hubMesh.rotation.x = Math.PI / 2;
    plateGroup.add(hubMesh);

    // 4. Central Bore Hole (Inner Core)
    const boreGeo = new THREE.CylinderGeometry(radius * 0.12, radius * 0.12, thickness * 1.15, 24);
    const boreMesh = new THREE.Mesh(boreGeo, new THREE.MeshBasicMaterial({ color: 0x020404 }));
    boreMesh.rotation.x = Math.PI / 2;
    plateGroup.add(boreMesh);

    return plateGroup;
  }

  // =========================================================================
  // HELPER: BUILD A 3D DUMBBELL
  // =========================================================================
  function buildDumbbell(handleLength = 1.3, headRadius = 0.52, headThickness = 0.42) {
    const dbGroup = new THREE.Group();

    // 1. Knurled steel central shaft
    const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, handleLength, 24);
    const shaftMesh = new THREE.Mesh(shaftGeo, materials.knurledSteel);
    shaftMesh.rotation.z = Math.PI / 2; // Horizontal
    dbGroup.add(shaftMesh);

    // 2. Champagne Gold Collar Rings on both sides
    const collarGeo = new THREE.TorusGeometry(0.10, 0.022, 12, 24);
    const leftCollar = new THREE.Mesh(collarGeo, materials.champagneGoldMetal);
    leftCollar.position.x = -handleLength * 0.38;
    leftCollar.rotation.y = Math.PI / 2;
    dbGroup.add(leftCollar);

    const rightCollar = new THREE.Mesh(collarGeo, materials.champagneGoldMetal);
    rightCollar.position.x = handleLength * 0.38;
    rightCollar.rotation.y = Math.PI / 2;
    dbGroup.add(rightCollar);

    // 3. Left and Right Heavy Heads (Multi-Tier Round Cast-Iron)
    [-1, 1].forEach((dir) => {
      const headGroup = new THREE.Group();
      headGroup.position.x = dir * (handleLength * 0.5 + headThickness * 0.5);

      // Base weight disc
      const discGeo = new THREE.CylinderGeometry(headRadius, headRadius, headThickness * 0.7, 32);
      const discMesh = new THREE.Mesh(discGeo, materials.darkGraphiteMetal);
      discMesh.rotation.z = Math.PI / 2;
      headGroup.add(discMesh);

      // Beveled outer tier
      const outerGeo = new THREE.CylinderGeometry(headRadius * 0.88, headRadius, headThickness * 0.3, 32);
      const outerMesh = new THREE.Mesh(outerGeo, materials.darkGraphiteMetal);
      outerMesh.position.x = dir * (headThickness * 0.35);
      outerMesh.rotation.z = Math.PI / 2;
      headGroup.add(outerMesh);

      // Outer End Cap Ring
      const capRingGeo = new THREE.TorusGeometry(headRadius * 0.75, 0.025, 12, 32);
      const capRing = new THREE.Mesh(capRingGeo, materials.champagneGoldMetal);
      capRing.position.x = dir * (headThickness * 0.51);
      capRing.rotation.y = Math.PI / 2;
      headGroup.add(capRing);

      dbGroup.add(headGroup);
    });

    return dbGroup;
  }

  // =========================================================================
  // LAYER 1: DISTANT GYM EQUIPMENT SILHOUETTES
  // =========================================================================
  const distantGroup = new THREE.Group();
  distantGroup.position.set(0, 0, -6.5);

  // Power Rack Uprights (4 vertical columns + crossbeams)
  const rackMat = materials.distantSilhouette;
  const postGeo = new THREE.BoxGeometry(0.12, 5.5, 0.12);
  [-2.2, 2.2].forEach((x) => {
    [-1.0, 1.0].forEach((z) => {
      const post = new THREE.Mesh(postGeo, rackMat);
      post.position.set(x - 2.5, 0, z);
      distantGroup.add(post);
    });
  });

  // Pullup bar & Top crossbars
  const crossbarGeo = new THREE.BoxGeometry(4.6, 0.12, 0.12);
  const crossbar = new THREE.Mesh(crossbarGeo, rackMat);
  crossbar.position.set(-2.5, 2.7, 0);
  distantGroup.add(crossbar);

  // Cable tower silhouette on the right
  const cableColGeo = new THREE.BoxGeometry(0.35, 6.0, 0.35);
  const cableCol = new THREE.Mesh(cableColGeo, rackMat);
  cableCol.position.set(4.5, 0, 0);
  distantGroup.add(cableCol);

  // Weight stack plates inside cable tower
  for (let i = 0; i < 12; i++) {
    const stackGeo = new THREE.BoxGeometry(0.65, 0.12, 0.35);
    const stack = new THREE.Mesh(stackGeo, rackMat);
    stack.position.set(4.5, -2.2 + i * 0.18, 0);
    distantGroup.add(stack);
  }

  group.add(distantGroup);

  // =========================================================================
  // LAYER 2: FLOATING 3D OLYMPIC WEIGHT PLATES
  // =========================================================================
  // Plate 1: Large 25kg Plate (Enters from Left Foreground)
  const plate1 = buildOlympicPlate(1.7, 0.30, materials.plate25Face);
  group.add(plate1);

  // Plate 2: Medium 20kg Plate (Upper-Right Background)
  const plate2 = buildOlympicPlate(1.4, 0.26, materials.plate20Face);
  group.add(plate2);

  // Plate 3: 10kg Plate (Deeper midground floating)
  const plate3 = buildOlympicPlate(1.1, 0.22, materials.plate10Face);
  group.add(plate3);

  // Plate 4: 25kg Plate (Lower right deep accent)
  const plate4 = buildOlympicPlate(1.5, 0.28, materials.plate25Face);
  group.add(plate4);

  // =========================================================================
  // LAYER 3: 3D DUMBBELLS
  // =========================================================================
  // Dumbbell A (Horizontal travel path)
  const dumbbellA = buildDumbbell(1.4, 0.54, 0.42);
  group.add(dumbbellA);

  // Dumbbell B (Perspective deep tumble)
  const dumbbellB = buildDumbbell(1.2, 0.46, 0.36);
  group.add(dumbbellB);

  // =========================================================================
  // LAYER 4: BARBELL ASSEMBLY SEQUENCE (SIGNATURE MOMENT)
  // =========================================================================
  const barbellAssemblyGroup = new THREE.Group();
  barbellAssemblyGroup.position.set(0, -1.2, -1.8);

  // 1. Olympic Barbell Shaft
  const barShaftGeo = new THREE.CylinderGeometry(0.065, 0.065, 5.4, 32);
  const barShaft = new THREE.Mesh(barShaftGeo, materials.knurledSteel);
  barShaft.rotation.z = Math.PI / 2;
  barbellAssemblyGroup.add(barShaft);

  // Inner Sleeve Collar Stops
  [-2.2, 2.2].forEach((x) => {
    const collarGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 32);
    const collar = new THREE.Mesh(collarGeo, materials.champagneGoldMetal);
    collar.position.x = x;
    collar.rotation.z = Math.PI / 2;
    barbellAssemblyGroup.add(collar);
  });

  // Outer Loading Sleeves
  [-1, 1].forEach((dir) => {
    const sleeveGeo = new THREE.CylinderGeometry(0.105, 0.105, 1.4, 32);
    const sleeve = new THREE.Mesh(sleeveGeo, materials.brushedSteel);
    sleeve.position.x = dir * 2.95;
    sleeve.rotation.z = Math.PI / 2;
    barbellAssemblyGroup.add(sleeve);
  });

  // Assembling Plates on Left Sleeve
  const barPlateLeft1 = buildOlympicPlate(1.3, 0.24, materials.plate25Face);
  barPlateLeft1.rotation.y = Math.PI / 2; // Aligned along sleeve
  barbellAssemblyGroup.add(barPlateLeft1);

  const barPlateLeft2 = buildOlympicPlate(1.0, 0.18, materials.plate10Face);
  barPlateLeft2.rotation.y = Math.PI / 2;
  barbellAssemblyGroup.add(barPlateLeft2);

  // Assembling Plates on Right Sleeve
  const barPlateRight1 = buildOlympicPlate(1.3, 0.24, materials.plate25Face);
  barPlateRight1.rotation.y = Math.PI / 2;
  barbellAssemblyGroup.add(barPlateRight1);

  const barPlateRight2 = buildOlympicPlate(1.0, 0.18, materials.plate10Face);
  barPlateRight2.rotation.y = Math.PI / 2;
  barbellAssemblyGroup.add(barPlateRight2);

  // Quick-Lock Clamp Collars
  const clampGeo = new THREE.TorusGeometry(0.13, 0.045, 12, 24);
  const clampLeft = new THREE.Mesh(clampGeo, materials.champagneGoldMetal);
  clampLeft.rotation.y = Math.PI / 2;
  barbellAssemblyGroup.add(clampLeft);

  const clampRight = new THREE.Mesh(clampGeo, materials.champagneGoldMetal);
  clampRight.rotation.y = Math.PI / 2;
  barbellAssemblyGroup.add(clampRight);

  group.add(barbellAssemblyGroup);

  // =========================================================================
  // SCROLL-DRIVEN CHOREOGRAPHY ENGINE
  // =========================================================================
  function updateScroll(u, time = 0) {
    const delta = u - 0.5; // -0.5 (entrance) -> 0.0 (center) -> +0.5 (exit)

    // -----------------------------------------------------------------------
    // LAYER 1: Distant Equipment Silhouettes (Subtle slow parallax)
    // -----------------------------------------------------------------------
    distantGroup.position.x = delta * -0.9;
    distantGroup.position.y = Math.sin(time * 0.4) * 0.05;

    // -----------------------------------------------------------------------
    // LAYER 2: Floating Olympic Weight Plates
    // -----------------------------------------------------------------------
    // Plate 1: Large 25kg Plate (Enters from Left, rotates around Z-axis)
    // Enters from X = -5.8 to resting X = -3.5, then exits to X = -6.2
    const p1In = Math.min(1, u / 0.45);
    const p1Out = Math.max(0, (u - 0.55) / 0.45);
    plate1.position.x = -5.8 + p1In * 2.3 - p1Out * 2.6;
    plate1.position.y = 0.5 + Math.sin(u * Math.PI) * 0.4;
    plate1.position.z = 0.4 + delta * -0.6;
    plate1.rotation.z = u * 4.6; // Scroll-linked rotation!
    plate1.rotation.y = 0.45 + delta * 0.25;
    plate1.rotation.x = -0.22 + Math.cos(time * 0.6) * 0.04;

    // Plate 2: Medium 20kg Plate (Upper-Right Background, counter-rotation)
    const p2In = Math.min(1, u / 0.48);
    const p2Out = Math.max(0, (u - 0.58) / 0.42);
    plate2.position.x = 5.6 - p2In * 2.1 + p2Out * 2.5;
    plate2.position.y = 1.6 - Math.sin(u * Math.PI) * 0.3;
    plate2.position.z = -1.2 + delta * 0.8;
    plate2.rotation.z = -u * 5.2; // Reverse scroll rotation
    plate2.rotation.y = -0.38 + delta * -0.2;
    plate2.rotation.x = 0.18;

    // Plate 3: 10kg Plate (Deeper midground floating)
    plate3.position.x = -1.6 + delta * -1.8;
    plate3.position.y = -2.0 + Math.cos(u * Math.PI * 1.5) * 0.5;
    plate3.position.z = -2.4 + delta * 1.2;
    plate3.rotation.z = u * 3.8;
    plate3.rotation.x = 0.35;
    plate3.rotation.y = -0.42;

    // Plate 4: 25kg Plate (Lower-right accent)
    plate4.position.x = 3.8 + delta * 2.2;
    plate4.position.y = -1.8 + Math.sin(u * Math.PI) * 0.3;
    plate4.position.z = -1.8;
    plate4.rotation.z = -u * 4.0;
    plate4.rotation.y = 0.5;

    // -----------------------------------------------------------------------
    // LAYER 3: 3D Dumbbells (Perspective paths)
    // -----------------------------------------------------------------------
    // Dumbbell A (Horizontal travel from left)
    const dbAIn = Math.min(1, u / 0.42);
    const dbAOut = Math.max(0, (u - 0.60) / 0.40);
    dumbbellA.position.x = -5.4 + dbAIn * 2.6 - dbAOut * 2.8;
    dumbbellA.position.y = -1.1 + Math.sin(u * Math.PI) * 0.35;
    dumbbellA.position.z = -0.2 + delta * -0.5;
    dumbbellA.rotation.x = u * 3.4;
    dumbbellA.rotation.y = 0.32 + delta * 0.4;
    dumbbellA.rotation.z = 0.2 + u * 2.2;

    // Dumbbell B (Perspective deep tumble: starts far, approaches camera)
    dumbbellB.position.x = 2.8 + delta * 1.6;
    dumbbellB.position.y = 2.2 - delta * 0.8;
    dumbbellB.position.z = -4.0 + Math.min(1, u / 0.5) * 2.4 - Math.max(0, (u - 0.5) / 0.5) * 1.5;
    dumbbellB.rotation.x = u * 5.0;
    dumbbellB.rotation.y = -u * 4.2;
    dumbbellB.rotation.z = delta * 2.0;

    // -----------------------------------------------------------------------
    // LAYER 4: BARBELL ASSEMBLY SEQUENCE (SIGNATURE MOMENT)
    // -----------------------------------------------------------------------
    // Entrance: Barbell moves into view from right: u in [0.15, 0.48]
    // Dwell: Plates lock into collar stops: u in [0.45, 0.60]
    // Exit: Barbell shifts away: u in [0.65, 1.0]
    const assembleProgress = Math.min(1, Math.max(0, (u - 0.18) / 0.30));
    // S-curve Hermite ease for assembly glide
    const assembleEase = assembleProgress * assembleProgress * (3 - 2 * assembleProgress);

    // Barbell group general position
    const barIn = Math.min(1, u / 0.45);
    const barOut = Math.max(0, (u - 0.62) / 0.38);
    barbellAssemblyGroup.position.x = 3.5 - barIn * 3.5 + barOut * 4.2;
    barbellAssemblyGroup.position.y = -0.9 + Math.sin(u * Math.PI) * 0.25;
    barbellAssemblyGroup.position.z = -1.6 + delta * 0.5;
    barbellAssemblyGroup.rotation.z = Math.sin(delta * Math.PI) * 0.08;
    barbellAssemblyGroup.rotation.y = Math.cos(delta * Math.PI) * 0.06;

    // Left Sleeve Plates Assembly:
    // Disassembled offset: -4.5 -> Locked position: -2.36 (Plate 1) and -2.62 (Plate 2)
    const leftPlate1Target = -2.36;
    const leftPlate1Start = -4.2;
    barPlateLeft1.position.x = leftPlate1Start + (leftPlate1Target - leftPlate1Start) * assembleEase;
    barPlateLeft1.rotation.x = (1 - assembleEase) * 0.8; // Tilts into vertical lock!

    const leftPlate2Target = -2.62;
    const leftPlate2Start = -5.0;
    barPlateLeft2.position.x = leftPlate2Start + (leftPlate2Target - leftPlate2Start) * assembleEase;
    barPlateLeft2.rotation.x = -(1 - assembleEase) * 0.6;

    // Right Sleeve Plates Assembly:
    // Disassembled offset: +4.5 -> Locked position: +2.36 (Plate 1) and +2.62 (Plate 2)
    const rightPlate1Target = 2.36;
    const rightPlate1Start = 4.2;
    barPlateRight1.position.x = rightPlate1Start + (rightPlate1Target - rightPlate1Start) * assembleEase;
    barPlateRight1.rotation.x = -(1 - assembleEase) * 0.8;

    const rightPlate2Target = 2.62;
    const rightPlate2Start = 5.0;
    barPlateRight2.position.x = rightPlate2Start + (rightPlate2Target - rightPlate2Start) * assembleEase;
    barPlateRight2.rotation.x = (1 - assembleEase) * 0.6;

    // Spring Collars slide on last (at assembleEase > 0.85)
    const collarSlide = Math.min(1, Math.max(0, (assembleProgress - 0.75) / 0.25));
    clampLeft.position.x = -3.8 + ( -2.82 - (-3.8) ) * collarSlide;
    clampRight.position.x = 3.8 + ( 2.82 - 3.8 ) * collarSlide;
  }

  // Cleanup
  function dispose() {
    Object.values(materials).forEach((m) => {
      if (m.map) m.map.dispose();
      if (m.bumpMap) m.bumpMap.dispose();
      m.dispose();
    });
    knurlingTex.dispose();
    plate25Tex.dispose();
    plate20Tex.dispose();
    plate10Tex.dispose();
  }

  return {
    group,
    updateScroll,
    dispose,
  };
}

