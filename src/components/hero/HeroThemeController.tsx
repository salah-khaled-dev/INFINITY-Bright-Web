"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { STUDIO_LIGHTING_CONFIGS } from "@/lib/three/lighting";
import {
  VEHICLE_THEME_PALETTES,
  type VehicleMaterialRig,
} from "@/lib/three/materials";
import type { ThemeMode } from "@/types";
import type { StudioArchitectureRefs } from "./HeroEnvironment";
import type { HeroLightRefs } from "./HeroLighting";

interface HeroThemeControllerProps {
  theme: ThemeMode;
  reducedMotion: boolean;
  materialRig: VehicleMaterialRig | null;
  lightRefs: HeroLightRefs;
  archRefs: StudioArchitectureRefs;
  aoShadowMatRef: React.RefObject<THREE.MeshBasicMaterial | null>;
}

/**
 * Orchestrates smooth GSAP transitions when switching between Dark Mode and Light Mode
 * (studio cyclorama, lighting rig, turntable halo, AO ground shadow, and factory vehicle palette)
 * WITHOUT destroying or remounting the WebGL scene.
 */
export function HeroThemeController({
  theme,
  reducedMotion,
  materialRig,
  lightRefs,
  archRefs,
  aoShadowMatRef,
}: HeroThemeControllerProps) {
  const { scene, gl } = useThree();
  const initializedRef = useRef(false);

  // Initialize scene background, fog, and filmic tone mapping once on mount
  useEffect(() => {
    const cfg = STUDIO_LIGHTING_CONFIGS[theme];
    if (!scene.background || !(scene.background as THREE.Color).isColor) {
      scene.background = new THREE.Color(cfg.bgHex);
    }
    if (!scene.fog) {
      scene.fog = new THREE.Fog(cfg.fogHex, cfg.fogNear, cfg.fogFar);
    }
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = cfg.exposure;
  }, [gl, scene, theme]);

  useEffect(() => {
    const cfg = STUDIO_LIGHTING_CONFIGS[theme];
    const pal = VEHICLE_THEME_PALETTES[theme];
    const dur = !initializedRef.current || reducedMotion ? 0.01 : 0.75;
    initializedRef.current = true;

    const tweens: gsap.core.Tween[] = [];

    const bg = scene.background as THREE.Color | null;
    if (bg && bg.isColor) {
      const targetBg = new THREE.Color(cfg.bgHex);
      tweens.push(
        gsap.to(bg, {
          r: targetBg.r,
          g: targetBg.g,
          b: targetBg.b,
          duration: dur,
          ease: "power2.out",
        })
      );
    }

    const fog = scene.fog as THREE.Fog | null;
    if (fog && fog.isFog) {
      const targetFog = new THREE.Color(cfg.fogHex);
      tweens.push(
        gsap.to(fog.color, {
          r: targetFog.r,
          g: targetFog.g,
          b: targetFog.b,
          duration: dur,
          ease: "power2.out",
        }),
        gsap.to(fog, {
          near: cfg.fogNear,
          far: cfg.fogFar,
          duration: dur,
          ease: "power2.out",
        })
      );
    }

    tweens.push(
      gsap.to(gl, {
        toneMappingExposure: cfg.exposure,
        duration: dur,
        ease: "power2.out",
      })
    );

    if (lightRefs.ambient.current) {
      const c = new THREE.Color(cfg.ambientHex);
      tweens.push(
        gsap.to(lightRefs.ambient.current, {
          intensity: cfg.ambientIntensity,
          duration: dur,
        }),
        gsap.to(lightRefs.ambient.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (lightRefs.keySpot.current) {
      const c = new THREE.Color(cfg.keyLightHex);
      tweens.push(
        gsap.to(lightRefs.keySpot.current, {
          intensity: cfg.keyLightIntensity,
          duration: dur,
        }),
        gsap.to(lightRefs.keySpot.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (lightRefs.fillLight.current) {
      const c = new THREE.Color(cfg.fillLightHex);
      tweens.push(
        gsap.to(lightRefs.fillLight.current, {
          intensity: cfg.fillLightIntensity,
          duration: dur,
        }),
        gsap.to(lightRefs.fillLight.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (lightRefs.rimLight.current) {
      const c = new THREE.Color(cfg.rimLightHex);
      tweens.push(
        gsap.to(lightRefs.rimLight.current, {
          intensity: cfg.rimLightIntensity,
          duration: dur,
        }),
        gsap.to(lightRefs.rimLight.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (lightRefs.yellowAccentLeft.current) {
      tweens.push(
        gsap.to(lightRefs.yellowAccentLeft.current, {
          intensity: cfg.yellowAccentIntensity * 0.55,
          duration: dur,
        })
      );
    }

    if (lightRefs.yellowAccentRight.current) {
      tweens.push(
        gsap.to(lightRefs.yellowAccentRight.current, {
          intensity: cfg.yellowAccentIntensity,
          duration: dur,
        })
      );
    }

    if (archRefs.cycloramaMat.current) {
      const c = new THREE.Color(cfg.cycloramaHex);
      tweens.push(
        gsap.to(archRefs.cycloramaMat.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (archRefs.platformMat.current) {
      const c = new THREE.Color(cfg.platformHex);
      tweens.push(
        gsap.to(archRefs.platformMat.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        })
      );
    }

    if (archRefs.simpleFloorMat.current) {
      const c = new THREE.Color(cfg.floorHex);
      tweens.push(
        gsap.to(archRefs.simpleFloorMat.current.color, {
          r: c.r,
          g: c.g,
          b: c.b,
          duration: dur,
        }),
        gsap.to(archRefs.simpleFloorMat.current, {
          roughness: cfg.floorRoughness,
          metalness: cfg.floorMetalness,
          duration: dur,
        })
      );
    }

    if (archRefs.haloRingMat.current) {
      tweens.push(
        gsap.to(archRefs.haloRingMat.current, {
          emissiveIntensity: cfg.haloEmissiveIntensity,
          duration: dur,
        })
      );
    }

    if (archRefs.outerRingMat.current) {
      tweens.push(
        gsap.to(archRefs.outerRingMat.current, {
          emissiveIntensity: cfg.haloEmissiveIntensity * 0.42,
          duration: dur,
        })
      );
    }

    if (aoShadowMatRef.current) {
      tweens.push(
        gsap.to(aoShadowMatRef.current, {
          opacity: cfg.aoShadowOpacity,
          duration: dur,
        })
      );
    }

    if (materialRig) {
      const bodyC = new THREE.Color(pal.bodyHex);
      const rimC = new THREE.Color(pal.rimHex);
      tweens.push(
        gsap.to(materialRig.bodyMaterial.color, {
          r: bodyC.r,
          g: bodyC.g,
          b: bodyC.b,
          duration: dur,
        }),
        gsap.to(materialRig.bodyMaterial, {
          metalness: pal.bodyMetalness,
          roughness: pal.bodyRoughness,
          envMapIntensity: pal.envMapIntensity,
          duration: dur,
        }),
        gsap.to(materialRig.rimMaterial.color, {
          r: rimC.r,
          g: rimC.g,
          b: rimC.b,
          duration: dur,
        })
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [
    archRefs,
    aoShadowMatRef,
    gl,
    lightRefs,
    materialRig,
    reducedMotion,
    scene,
    theme,
  ]);

  return null;
}
