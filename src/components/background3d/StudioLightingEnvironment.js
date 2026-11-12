import * as THREE from 'three';

/**
 * Creates a high-end procedural studio environment map and lighting rig specifically
 * calibrated for polished solid metallic gold sculptures.
 * 
 * - Generates high dynamic range specular highlights and champagne-gold reflections.
 * - Multi-angle rim lights carve crisp luminous contours separating the gold from the deep black (#050505) background.
 * - Warm ambient and under-bounce lighting prevent shadows from turning into black voids.
 */
export function setupStudioLighting(scene, renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Virtual HDR environment scene
  const envScene = new THREE.Scene();

  // 1. Softbox 1: Overhead high-intensity specular key softbox
  const keySoftbox = new THREE.DirectionalLight(0xffffff, 5.5);
  keySoftbox.position.set(2, 6, 4);
  envScene.add(keySoftbox);

  // 2. Softbox 2: Rich champagne-gold strip reflection (adds luxury lustre to metallic gold)
  const champagneStrip = new THREE.DirectionalLight(0xffe8be, 4.8);
  champagneStrip.position.set(6, 1, 3);
  envScene.add(champagneStrip);

  // 3. Softbox 3: Pale gold rim reflection for razor-sharp edge definition
  const rimStrip = new THREE.DirectionalLight(0xfff5dd, 4.2);
  rimStrip.position.set(-6, 2, -3);
  envScene.add(rimStrip);

  // 4. Softbox 4: Warm amber bottom bounce (illuminates liquid folds from below)
  const bottomBounce = new THREE.DirectionalLight(0xffcc77, 3.2);
  bottomBounce.position.set(0, -5, 2);
  envScene.add(bottomBounce);

  // 5. Softbox 5: Subtle front specular catch-light
  const frontCatch = new THREE.DirectionalLight(0xffffff, 2.4);
  frontCatch.position.set(0, 0, 7);
  envScene.add(frontCatch);

  // 6. Deep warm ambient foundation in the environment (rich golden undertones)
  const envAmbient = new THREE.AmbientLight(0x22180a, 2.0);
  envScene.add(envAmbient);

  // Generate the PMREM environment texture
  const envRenderTarget = pmremGenerator.fromScene(envScene);
  scene.environment = envRenderTarget.texture;

  // =========================================================================
  // DIRECT SCENE LIGHTS (Sharp specular glints & contour rim lighting)
  // =========================================================================

  // Key light: Pure crisp champagne key
  const mainKey = new THREE.DirectionalLight(0xfffbf0, 3.8);
  mainKey.position.set(4, 5, 5);
  scene.add(mainKey);

  // Primary Rim Light: Sharp rear-left rim separating sculpture from deep black
  const primaryRim = new THREE.DirectionalLight(0xffe8b0, 3.6);
  primaryRim.position.set(-5, 4, -4);
  scene.add(primaryRim);

  // Secondary Rim Light: Sharp rear-right rim for full contour coverage during 360° rotation
  const secondaryRim = new THREE.DirectionalLight(0xfff2d0, 3.2);
  secondaryRim.position.set(5, -3, -4);
  scene.add(secondaryRim);

  // Low Warm Accent: Illuminates lower organic curves
  const warmUnderAccent = new THREE.DirectionalLight(0xffbe55, 2.5);
  warmUnderAccent.position.set(0, -4, 4);
  scene.add(warmUnderAccent);

  // Fill Light: Soft front-left fill
  const frontFill = new THREE.DirectionalLight(0xffeacc, 1.8);
  frontFill.position.set(-4, -1, 4);
  scene.add(frontFill);

  // Warm Ambient Light: Ensures the dark side of gold curves remains rich burnished gold
  const sceneAmbient = new THREE.AmbientLight(0x2a1e0f, 1.6);
  scene.add(sceneAmbient);

  return {
    dispose: () => {
      pmremGenerator.dispose();
      envRenderTarget.dispose();
    },
  };
}
