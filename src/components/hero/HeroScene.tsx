"use client";

import React, {
  Component,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { DevicePerformanceProfile } from "@/hooks/useDevicePerformance";
import type { ThemeMode } from "@/types";
import type { VehicleMaterialRig } from "@/lib/three/materials";
import { HeroCamera } from "./HeroCamera";
import { HeroEnvironment, type StudioArchitectureRefs } from "./HeroEnvironment";
import { HeroLighting, type HeroLightRefs } from "./HeroLighting";
import { HeroThemeController } from "./HeroThemeController";
import { HeroVehicle } from "./HeroVehicle";

// Suppress transitive upstream deprecation warning between @react-three/fiber and three.js 0.187 (THREE.Clock -> THREE.Timer)
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn.apply(console, args as [unknown, ...unknown[]]);
  };
}

interface SceneErrorBoundaryProps {
  onError: () => void;
  children: React.ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export interface HeroSceneProps {
  theme: ThemeMode;
  perf: DevicePerformanceProfile;
  reducedMotion: boolean;
  scrollProgressRef: React.RefObject<number>;
  onReady: () => void;
  onFatalError: () => void;
}

export default function HeroScene({
  theme,
  perf,
  reducedMotion,
  scrollProgressRef,
  onReady,
  onFatalError,
}: HeroSceneProps) {
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const keySpotLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const yellowAccentLeftRef = useRef<THREE.PointLight | null>(null);
  const yellowAccentRightRef = useRef<THREE.PointLight | null>(null);

  const lightRefs: HeroLightRefs = useMemo(
    () => ({
      ambient: ambientLightRef,
      keySpot: keySpotLightRef,
      fillLight: fillLightRef,
      rimLight: rimLightRef,
      yellowAccentLeft: yellowAccentLeftRef,
      yellowAccentRight: yellowAccentRightRef,
    }),
    []
  );

  const cycloramaMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const platformMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const simpleFloorMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const haloRingMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const outerRingMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const archRefs: StudioArchitectureRefs = useMemo(
    () => ({
      cycloramaMat: cycloramaMatRef,
      platformMat: platformMatRef,
      simpleFloorMat: simpleFloorMatRef,
      haloRingMat: haloRingMatRef,
      outerRingMat: outerRingMatRef,
    }),
    []
  );

  const aoShadowMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const [materialRig, setMaterialRig] = useState<VehicleMaterialRig | null>(null);

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      const dom = gl.domElement;
      const onContextLost = (e: Event) => {
        e.preventDefault();
        onFatalError();
      };
      dom.addEventListener("webglcontextlost", onContextLost, false);
    },
    [onFatalError]
  );

  return (
    <SceneErrorBoundary onError={onFatalError}>
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <Canvas
          dpr={perf.dpr}
          gl={{
            antialias: perf.antialias,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
          }}
          camera={{ position: [0, 0.1, 4.35], fov: 28, near: 0.1, far: 40 }}
          shadows={perf.tier === "high" || perf.tier === "medium"}
          onCreated={handleCreated}
          className="h-full w-full"
        >
          <HeroCamera
            enableMouseParallax={perf.enableMouseParallax}
            enableScrollScrub={perf.enableScrollScrub}
            reducedMotion={reducedMotion}
            scrollProgressRef={scrollProgressRef}
          />

          <HeroLighting
            theme={theme}
            shadowMapSize={perf.shadowMapSize}
            enableShadows={perf.tier === "high" || perf.tier === "medium"}
            lightRefs={lightRefs}
          />

          <Suspense fallback={null}>
            <HeroEnvironment
              theme={theme}
              envResolution={perf.envResolution}
              enableFloorReflector={perf.enableFloorReflector}
              reflectorResolution={perf.reflectorResolution}
              scrollProgressRef={scrollProgressRef}
              archRefs={archRefs}
            />

            <HeroVehicle
              theme={theme}
              enableShadows={perf.tier === "high" || perf.tier === "medium"}
              reducedMotion={reducedMotion}
              scrollProgressRef={scrollProgressRef}
              aoShadowMatRef={aoShadowMatRef}
              onMaterialRigReady={setMaterialRig}
              onSceneReady={onReady}
            />

            <HeroThemeController
              theme={theme}
              reducedMotion={reducedMotion}
              materialRig={materialRig}
              lightRefs={lightRefs}
              archRefs={archRefs}
              aoShadowMatRef={aoShadowMatRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
