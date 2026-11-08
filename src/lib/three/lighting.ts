import type { ThemeMode } from "@/types";

export interface StudioThemeLightingConfig {
  bgHex: string;
  fogHex: string;
  fogNear: number;
  fogFar: number;
  cycloramaHex: string;
  platformHex: string;
  floorHex: string;
  floorRoughness: number;
  floorMetalness: number;
  reflectorMixStrength: number;
  reflectorMirror: number;
  aoShadowOpacity: number;
  ambientIntensity: number;
  ambientHex: string;
  keyLightIntensity: number;
  keyLightHex: string;
  fillLightIntensity: number;
  fillLightHex: string;
  rimLightIntensity: number;
  rimLightHex: string;
  yellowAccentIntensity: number;
  haloEmissiveIntensity: number;
  exposure: number;
}

/**
 * Dedicated Luxury Automotive Commercial Studio Presets:
 * - Dark Mode: Deep Obsidian Infinity Cove (`#050608`), wet-look mirror-epoxy floor,
 *   sculpted overhead & camera-side softboxes, and flush `#FBE90A` showroom turntable halo.
 * - Light Mode: Clean Architectural Alabaster Cyclorama (`#f2f2ed`) with high-contrast
 *   daylight softboxes and warm `#FBE90A` architectural stage accents.
 */
export const STUDIO_LIGHTING_CONFIGS: Record<
  ThemeMode,
  StudioThemeLightingConfig
> = {
  dark: {
    bgHex: "#050608",
    fogHex: "#050608",
    fogNear: 13.5,
    fogFar: 30.0,
    cycloramaHex: "#090c12",
    platformHex: "#0c0f16",
    floorHex: "#06080c",
    floorRoughness: 0.18,
    floorMetalness: 0.76,
    reflectorMixStrength: 2.8,
    reflectorMirror: 0.78,
    aoShadowOpacity: 0.96,
    ambientIntensity: 0.48,
    ambientHex: "#d6e2ff",
    keyLightIntensity: 4.2,
    keyLightHex: "#f8faff",
    fillLightIntensity: 2.35,
    fillLightHex: "#dce8ff",
    rimLightIntensity: 3.1,
    rimLightHex: "#b5cdff",
    yellowAccentIntensity: 2.4,
    haloEmissiveIntensity: 2.6,
    exposure: 1.2,
  },
  light: {
    bgHex: "#f2f2ed",
    fogHex: "#f2f2ed",
    fogNear: 15.0,
    fogFar: 34.0,
    cycloramaHex: "#f7f7f2",
    platformHex: "#e6e6df",
    floorHex: "#eaeae3",
    floorRoughness: 0.36,
    floorMetalness: 0.16,
    reflectorMixStrength: 0.75,
    reflectorMirror: 0.26,
    aoShadowOpacity: 0.84,
    ambientIntensity: 1.05,
    ambientHex: "#ffffff",
    keyLightIntensity: 3.1,
    keyLightHex: "#fffef9",
    fillLightIntensity: 1.85,
    fillLightHex: "#f4f7ff",
    rimLightIntensity: 1.9,
    rimLightHex: "#d8e4fa",
    yellowAccentIntensity: 1.35,
    haloEmissiveIntensity: 1.45,
    exposure: 1.06,
  },
};
