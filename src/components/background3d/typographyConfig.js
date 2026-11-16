/**
 * Central configuration file for the Editorial Kinetic Typography background.
 * All words, palettes, scales, color roles, and 6-stage 3D spatial keyframes
 * are defined here.
 * 
 * DESIGN PRINCIPLES:
 * 1. Clear Hierarchy: MALIBU is the ONE primary medium-large anchor.
 *    PARTY is a secondary accent anchor. Supporting words are smaller (35-45% reduction).
 * 2. Visual Isolation: Every word occupies its own dedicated spatial cell in both compositions.
 *    Zero stacking, zero collisions, generous horizontal & vertical negative space.
 * 3. Controlled Motion: Radial corridor motion prevents crossing collisions throughout the timeline.
 */

// =============================================================================
// 1. EDITORIAL COLOR PALETTES
// =============================================================================
export const EDITORIAL_PALETTES = {
  // Deep coral red with pale peach typography (High-impact editorial look)
  coralPeach: {
    id: 'coralPeach',
    name: 'Deep Coral Red & Pale Peach',
    background: '#A32920', // Rich, deep crimson coral red
    textPrimary: '#FEEAE2', // Pale creamy peach
    textSecondary: '#F7D0C2', // Soft warm peach
    textAccent: '#FFFFFF', // Pure crisp stark white
    isDarkBg: true,
    opacityPrimary: 0.65,
    opacitySecondary: 0.50,
    opacityAccent: 0.75,
  },

  // Warm cream with dark charcoal typography (Classic Swiss / fashion luxury look)
  warmCreamCharcoal: {
    id: 'warmCreamCharcoal',
    name: 'Warm Cream & Dark Charcoal',
    background: '#F4EFE6', // Warm luxury cream
    textPrimary: '#161616', // Deep dark ink charcoal
    textSecondary: '#3A3A3A', // Rich charcoal grey
    textAccent: '#A32920', // Editorial coral red accent
    isDarkBg: false,
  },

  // Deep navy with soft white typography (Sophisticated rooftop nightlife)
  deepNavyWhite: {
    id: 'deepNavyWhite',
    name: 'Deep Navy & Soft White',
    background: '#091122', // Deep midnight navy
    textPrimary: '#FFFFFF', // Crisp white
    textSecondary: '#D2DAE7', // Soft off-white
    textAccent: '#E0B548', // Refined gold
    isDarkBg: true,
  },

  // Cobalt blue with ivory typography (Vibrant European editorial)
  cobaltIvory: {
    id: 'cobaltIvory',
    name: 'Cobalt Blue & Ivory',
    background: '#122D68', // Punchy cobalt blue
    textPrimary: '#FAF6EE', // Ivory
    textSecondary: '#DDE2E8', // Soft linen
    textAccent: '#F3B730', // Goldenrod accent
    isDarkBg: true,
  },

  // Burnt orange with pale cream typography (Warm sunset aesthetic)
  burntOrangeCream: {
    id: 'burntOrangeCream',
    name: 'Burnt Orange & Pale Cream',
    background: '#AC3E1B', // Rich burnt terracotta orange
    textPrimary: '#FDF6EC', // Pale cream
    textSecondary: '#EED9C1', // Warm sand
    textAccent: '#FFFFFF', // Crisp white
    isDarkBg: true,
  },
};

/**
 * ACTIVE PALETTE SELECTOR:
 * Switch active palette key:
 * 'coralPeach' | 'warmCreamCharcoal' | 'deepNavyWhite' | 'cobaltIvory' | 'burntOrangeCream'
 */
export const ACTIVE_PALETTE_ID = 'coralPeach';

export const activePaletteConfig = EDITORIAL_PALETTES[ACTIVE_PALETTE_ID] || EDITORIAL_PALETTES.coralPeach;

// =============================================================================
// 2. 8 WORDS CONFIGURATION — BALANCED HIERARCHY & SPACIOUS LAYOUT
// =============================================================================
export const TYPOGRAPHY_WORDS_CONFIG = [
  // ---------------------------------------------------------------------------
  // 1. PRIMARY HERO ANCHOR: MALIBU (Medium-large central focal point)
  // ---------------------------------------------------------------------------
  {
    id: 'malibu',
    text: 'MALIBU',
    isPrimaryHero: true,
    scale: 1.68, // Primary anchor (~40% reduced from earlier 2.80)
    colorRole: 'primary',
    // 6-Stage Deterministic Scroll Keyframes
    stage1Entrance:    { pos: [ 0.0,  6.50, -1.0], rot: [ 0.05,  0.00,  0.00] },
    stage2Independent: { pos: [ 0.0,  3.20, -0.3], rot: [ 0.03,  0.03, -0.01] },
    stage3Converge:    { pos: [ 0.0,  0.95,  0.1], rot: [-0.02,  0.03, -0.01] }, // Upper-center anchor
    stage4Transform:   { pos: [ 0.1,  1.00,  0.2], rot: [ 0.02, -0.03,  0.01] },
    stage5Separate:    { pos: [ 0.0,  5.20,  1.2], rot: [ 0.06,  0.02, -0.01] },
    stage6Recompose:   { pos: [-2.6,  1.15,  0.1], rot: [ 0.02,  0.04, -0.02] }, // Layout 2 upper-left
  },

  // ---------------------------------------------------------------------------
  // 2. SECONDARY ANCHOR: PARTY (Medium accent anchor in lower center)
  // ---------------------------------------------------------------------------
  {
    id: 'party',
    text: 'PARTY',
    isPrimaryHero: false,
    scale: 1.35, // Secondary anchor (~53% reduced from 2.90)
    colorRole: 'accent',
    stage1Entrance:    { pos: [ 0.0, -6.50, -1.0], rot: [-0.05,  0.00,  0.00] },
    stage2Independent: { pos: [ 0.0, -3.50, -0.3], rot: [-0.03, -0.03,  0.01] },
    stage3Converge:    { pos: [ 0.0, -1.35,  0.1], rot: [ 0.02, -0.03,  0.01] }, // Lower-center anchor
    stage4Transform:   { pos: [-0.1, -1.30,  0.2], rot: [-0.02,  0.03, -0.01] },
    stage5Separate:    { pos: [ 0.0, -5.20,  1.2], rot: [-0.06, -0.02,  0.01] },
    stage6Recompose:   { pos: [ 2.5, -1.15,  0.1], rot: [-0.02, -0.04,  0.02] }, // Layout 2 lower-right
  },

  // ---------------------------------------------------------------------------
  // 3. TOP-LEFT: LUXURY
  // ---------------------------------------------------------------------------
  {
    id: 'luxury',
    text: 'LUXURY',
    isPrimaryHero: false,
    scale: 1.05,
    colorRole: 'primary',
    stage1Entrance:    { pos: [-8.5,  6.00, -1.5], rot: [ 0.06, -0.08,  0.03] },
    stage2Independent: { pos: [-5.5,  3.80, -0.7], rot: [ 0.05, -0.06,  0.02] },
    stage3Converge:    { pos: [-3.3,  2.15, -0.2], rot: [ 0.04, -0.06,  0.02] }, // Top-left cell
    stage4Transform:   { pos: [-3.2,  2.20, -0.1], rot: [-0.03,  0.04, -0.02] },
    stage5Separate:    { pos: [-8.0,  5.50,  0.5], rot: [ 0.08, -0.10,  0.04] },
    stage6Recompose:   { pos: [ 2.8,  1.15, -0.2], rot: [ 0.03,  0.05, -0.02] }, // Layout 2 upper-right
  },

  // ---------------------------------------------------------------------------
  // 4. TOP-RIGHT: WEEKEND
  // ---------------------------------------------------------------------------
  {
    id: 'weekend',
    text: 'WEEKEND',
    isPrimaryHero: false,
    scale: 1.05,
    colorRole: 'primary',
    stage1Entrance:    { pos: [ 8.5,  6.00, -1.5], rot: [-0.06,  0.08, -0.03] },
    stage2Independent: { pos: [ 5.5,  3.80, -0.7], rot: [-0.05,  0.06, -0.02] },
    stage3Converge:    { pos: [ 3.1,  2.15, -0.2], rot: [-0.04,  0.06, -0.02] }, // Top-right cell
    stage4Transform:   { pos: [ 3.0,  2.20, -0.1], rot: [ 0.03, -0.04,  0.02] },
    stage5Separate:    { pos: [ 8.0,  5.50,  0.5], rot: [-0.08,  0.10, -0.04] },
    stage6Recompose:   { pos: [ 0.0,  2.25, -0.2], rot: [ 0.01, -0.02,  0.01] }, // Layout 2 top-center
  },

  // ---------------------------------------------------------------------------
  // 5. MID-LEFT: GOOD VIBES
  // ---------------------------------------------------------------------------
  {
    id: 'good-vibes',
    text: 'GOOD VIBES',
    isPrimaryHero: false,
    scale: 0.95,
    colorRole: 'secondary',
    stage1Entrance:    { pos: [-9.0, -0.35, -1.2], rot: [ 0.04, -0.07,  0.03] },
    stage2Independent: { pos: [-6.0, -0.35, -0.5], rot: [ 0.03, -0.05,  0.02] },
    stage3Converge:    { pos: [-3.6, -0.35, -0.1], rot: [ 0.03, -0.05,  0.02] }, // Mid-left cell
    stage4Transform:   { pos: [-3.5, -0.30,  0.0], rot: [-0.02,  0.03, -0.01] },
    stage5Separate:    { pos: [-8.8, -0.35,  0.4], rot: [ 0.06, -0.08,  0.03] },
    stage6Recompose:   { pos: [-3.0, -1.15, -0.2], rot: [-0.03,  0.04, -0.02] }, // Layout 2 lower-left
  },

  // ---------------------------------------------------------------------------
  // 6. MID-RIGHT: POOL PARTY
  // ---------------------------------------------------------------------------
  {
    id: 'pool-party',
    text: 'POOL PARTY',
    isPrimaryHero: false,
    scale: 0.95,
    colorRole: 'accent',
    stage1Entrance:    { pos: [ 9.0, -0.35, -1.2], rot: [-0.04,  0.07, -0.03] },
    stage2Independent: { pos: [ 6.0, -0.35, -0.5], rot: [-0.03,  0.05, -0.02] },
    stage3Converge:    { pos: [ 3.6, -0.35, -0.1], rot: [-0.03,  0.05, -0.02] }, // Mid-right cell
    stage4Transform:   { pos: [ 3.5, -0.30,  0.0], rot: [ 0.02, -0.03,  0.01] },
    stage5Separate:    { pos: [ 8.8, -0.35,  0.4], rot: [-0.06,  0.08, -0.03] },
    stage6Recompose:   { pos: [-2.6, -2.35, -0.2], rot: [-0.02, -0.03,  0.02] }, // Layout 2 bottom-left
  },

  // ---------------------------------------------------------------------------
  // 7. BOTTOM-LEFT: DJ NIGHT
  // ---------------------------------------------------------------------------
  {
    id: 'dj-night',
    text: 'DJ NIGHT',
    isPrimaryHero: false,
    scale: 1.10,
    colorRole: 'secondary',
    stage1Entrance:    { pos: [-8.0, -6.00, -1.5], rot: [-0.06, -0.06,  0.03] },
    stage2Independent: { pos: [-5.2, -4.00, -0.7], rot: [-0.04, -0.04,  0.02] },
    stage3Converge:    { pos: [-3.1, -2.40, -0.2], rot: [-0.03, -0.04,  0.02] }, // Bottom-left cell
    stage4Transform:   { pos: [-3.0, -2.35, -0.1], rot: [ 0.02,  0.03, -0.01] },
    stage5Separate:    { pos: [-7.8, -5.50,  0.5], rot: [-0.08, -0.08,  0.04] },
    stage6Recompose:   { pos: [ 0.0,  0.00,  0.1], rot: [ 0.01,  0.03, -0.01] }, // Layout 2 center
  },

  // ---------------------------------------------------------------------------
  // 8. BOTTOM-RIGHT: ESCAPE
  // ---------------------------------------------------------------------------
  {
    id: 'escape',
    text: 'ESCAPE',
    isPrimaryHero: false,
    scale: 1.00,
    colorRole: 'accent',
    stage1Entrance:    { pos: [ 8.0, -6.00, -1.5], rot: [ 0.06,  0.06, -0.03] },
    stage2Independent: { pos: [ 5.2, -4.00, -0.7], rot: [ 0.04,  0.04, -0.02] },
    stage3Converge:    { pos: [ 3.1, -2.40, -0.2], rot: [ 0.03,  0.04, -0.02] }, // Bottom-right cell
    stage4Transform:   { pos: [ 3.0, -2.35, -0.1], rot: [-0.02, -0.03,  0.01] },
    stage5Separate:    { pos: [ 7.8, -5.50,  0.5], rot: [ 0.08,  0.08, -0.04] },
    stage6Recompose:   { pos: [ 2.6, -2.35, -0.2], rot: [ 0.02,  0.03, -0.02] }, // Layout 2 bottom-right
  },
];
