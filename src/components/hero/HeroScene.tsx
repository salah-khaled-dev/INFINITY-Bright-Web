"use client";

import React, { Component, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { DevicePerformanceProfile } from "@/hooks/useDevicePerformance";
import type { ThemeMode } from "@/types";
import { HeroCamera } from "./HeroCamera";
import { HeroStage } from "./HeroStage";

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
          onCreated={handleCreated}
          className="h-full w-full"
        >
          <HeroCamera
            enableMouseParallax={perf.enableMouseParallax}
            enableScrollScrub={perf.enableScrollScrub}
            reducedMotion={reducedMotion}
            scrollProgressRef={scrollProgressRef}
          />

          <Suspense fallback={null}>
            <HeroStage
              theme={theme}
              reducedMotion={reducedMotion}
              onSceneReady={onReady}
            />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
