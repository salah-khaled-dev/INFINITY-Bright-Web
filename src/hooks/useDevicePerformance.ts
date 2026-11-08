"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "high" | "medium" | "low" | "fallback";

export interface DevicePerformanceProfile {
  ready: boolean;
  webglSupported: boolean;
  tier: PerformanceTier;
  isMobile: boolean;
  isTablet: boolean;
  isCoarsePointer: boolean;
  dpr: [number, number];
  shadowMapSize: number;
  envResolution: number;
  enableFloorReflector: boolean;
  reflectorResolution: number;
  enableMouseParallax: boolean;
  enableScrollScrub: boolean;
  antialias: boolean;
}

const DEFAULT_SSR_PROFILE: DevicePerformanceProfile = {
  ready: false,
  webglSupported: true,
  tier: "medium",
  isMobile: false,
  isTablet: false,
  isCoarsePointer: false,
  dpr: [1, 1.5],
  shadowMapSize: 1024,
  envResolution: 256,
  enableFloorReflector: false,
  reflectorResolution: 256,
  enableMouseParallax: false,
  enableScrollScrub: true,
  antialias: true,
};

function probeWebGLCapability(): {
  supported: boolean;
  isSoftwareRenderer: boolean;
  maxTextureSize: number;
} {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { powerPreference: "high-performance" }) ||
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return { supported: false, isSoftwareRenderer: false, maxTextureSize: 0 };
    }

    const maxTextureSize = Number(gl.getParameter(gl.MAX_TEXTURE_SIZE)) || 2048;
    let isSoftwareRenderer = false;

    const debugExt = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugExt) {
      const renderer = String(
        gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL) || ""
      ).toLowerCase();
      if (
        renderer.includes("llvmpipe") ||
        renderer.includes("basic render driver")
      ) {
        isSoftwareRenderer = true;
      }
    }

    const loseExt = gl.getExtension("WEBGL_lose_context");
    if (loseExt) {
      loseExt.loseContext();
    }

    return {
      supported: maxTextureSize >= 2048,
      isSoftwareRenderer,
      maxTextureSize,
    };
  } catch {
    return { supported: false, isSoftwareRenderer: false, maxTextureSize: 0 };
  }
}

export function useDevicePerformance(): DevicePerformanceProfile {
  const [profile, setProfile] =
    useState<DevicePerformanceProfile>(DEFAULT_SSR_PROFILE);

  useEffect(() => {
    const computeProfile = (): DevicePerformanceProfile => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };
      const cores = nav.hardwareConcurrency || 4;
      const memory = nav.deviceMemory ?? 4;
      const saveData = Boolean(nav.connection?.saveData);

      const webgl = probeWebGLCapability();
      if (!webgl.supported || saveData) {
        return {
          ready: true,
          webglSupported: false,
          tier: "fallback",
          isMobile,
          isTablet,
          isCoarsePointer,
          dpr: [1, 1],
          shadowMapSize: 512,
          envResolution: 128,
          enableFloorReflector: false,
          reflectorResolution: 128,
          enableMouseParallax: false,
          enableScrollScrub: false,
          antialias: false,
        };
      }

      // Mobile phones or software rasterizers -> dedicated smooth low-GPU mobile profile
      if (isMobile || webgl.isSoftwareRenderer || cores <= 4 || memory <= 3) {
        return {
          ready: true,
          webglSupported: true,
          tier: "low",
          isMobile,
          isTablet,
          isCoarsePointer,
          dpr: [1, 1.35],
          shadowMapSize: 512,
          envResolution: 256,
          enableFloorReflector: false,
          reflectorResolution: 256,
          enableMouseParallax: false,
          enableScrollScrub: !reducedMotion && !isMobile,
          antialias: !webgl.isSoftwareRenderer,
        };
      }

      // Tablets & standard laptops
      if (isTablet || isCoarsePointer || cores < 8 || memory < 8) {
        return {
          ready: true,
          webglSupported: true,
          tier: "medium",
          isMobile,
          isTablet,
          isCoarsePointer,
          dpr: [1, 1.6],
          shadowMapSize: 1024,
          envResolution: 256,
          enableFloorReflector: true,
          reflectorResolution: 384,
          enableMouseParallax: !isCoarsePointer && !reducedMotion,
          enableScrollScrub: !reducedMotion,
          antialias: true,
        };
      }

      // High-end desktop & workstation
      return {
        ready: true,
        webglSupported: true,
        tier: "high",
        isMobile: false,
        isTablet: false,
        isCoarsePointer: false,
        dpr: [1, 2],
        shadowMapSize: 2048,
        envResolution: 512,
        enableFloorReflector: true,
        reflectorResolution: 512,
        enableMouseParallax: !reducedMotion,
        enableScrollScrub: !reducedMotion,
        antialias: true,
      };
    };

    setProfile(computeProfile());

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setProfile(computeProfile());
      }, 180);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return profile;
}

