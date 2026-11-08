"use client";

import React from "react";
import * as THREE from "three";
import { STUDIO_LIGHTING_CONFIGS } from "@/lib/three/lighting";
import type { ThemeMode } from "@/types";

export interface HeroLightRefs {
  ambient: React.RefObject<THREE.AmbientLight | null>;
  keySpot: React.RefObject<THREE.DirectionalLight | null>;
  fillLight: React.RefObject<THREE.DirectionalLight | null>;
  rimLight: React.RefObject<THREE.DirectionalLight | null>;
  yellowAccentLeft: React.RefObject<THREE.PointLight | null>;
  yellowAccentRight: React.RefObject<THREE.PointLight | null>;
}

interface HeroLightingProps {
  theme: ThemeMode;
  shadowMapSize: number;
  enableShadows: boolean;
  lightRefs: HeroLightRefs;
}

/**
 * Cinema-grade four-point automotive commercial lighting rig + #FBE90A stage accents.
 * Calibrated for our exact 45° front-3/4 stance so hood creases, side intakes,
 * forged alloy spokes, and #FBE90A calipers read with razor-sharp depth.
 */
export function HeroLighting({
  theme,
  shadowMapSize,
  enableShadows,
  lightRefs,
}: HeroLightingProps) {
  const initial = STUDIO_LIGHTING_CONFIGS[theme];

  return (
    <group name="IB_Studio_Lighting">
      <ambientLight
        ref={lightRefs.ambient}
        color={initial.ambientHex}
        intensity={initial.ambientIntensity}
      />

      {/* Primary Overhead-Front Architectural Softbox Key Light */}
      <directionalLight
        ref={lightRefs.keySpot}
        position={[-2.2, 6.2, 4.4]}
        color={initial.keyLightHex}
        intensity={initial.keyLightIntensity}
        castShadow={enableShadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={18}
        shadow-camera-left={-4.2}
        shadow-camera-right={4.2}
        shadow-camera-top={4.2}
        shadow-camera-bottom={-4.2}
        shadow-bias={-0.0003}
      />

      {/* Camera-Side Sculpting Fill Light (reveals forged alloy spokes, #FBE90A calipers & side scallop) */}
      <directionalLight
        ref={lightRefs.fillLight}
        position={[-4.8, 1.85, 3.6]}
        color={initial.fillLightHex}
        intensity={initial.fillLightIntensity}
      />

      {/* Back-Right Contour Rim Light (traces liquid highlight along hood edge, roof arch & rear fender) */}
      <directionalLight
        ref={lightRefs.rimLight}
        position={[4.6, 3.5, -3.8]}
        color={initial.rimLightHex}
        intensity={initial.rimLightIntensity}
      />

      {/* Signature INFINITE BRIGHT #FBE90A Yellow Grazing Accents */}
      <pointLight
        ref={lightRefs.yellowAccentLeft}
        position={[-3.4, 0.95, 1.8]}
        color="#FBE90A"
        intensity={initial.yellowAccentIntensity * 0.55}
        distance={8.5}
        decay={2.0}
      />

      <pointLight
        ref={lightRefs.yellowAccentRight}
        position={[3.6, 1.25, -2.2]}
        color="#FBE90A"
        intensity={initial.yellowAccentIntensity}
        distance={11}
        decay={1.8}
      />
    </group>
  );
}
