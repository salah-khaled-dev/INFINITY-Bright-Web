"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import type { ThemeMode } from "@/types";

interface HeroStageProps {
  theme: ThemeMode;
  reducedMotion: boolean;
  onSceneReady: () => void;
}

export function HeroStage({
  theme,
  reducedMotion,
  onSceneReady,
}: HeroStageProps) {
  const { camera, size } = useThree();
  const isLight = theme === "light";

  // Pre-load both authentic high-res desktop studio textures
  const [darkTex, lightTex] = useTexture([
    "/images/hero/hero-desktop-dark.webp",
    "/images/hero/hero-desktop-light.webp",
  ]);

  useEffect(() => {
    darkTex.colorSpace = THREE.SRGBColorSpace;
    darkTex.minFilter = THREE.LinearFilter;
    darkTex.magFilter = THREE.LinearFilter;
    darkTex.generateMipmaps = false;

    lightTex.colorSpace = THREE.SRGBColorSpace;
    lightTex.minFilter = THREE.LinearFilter;
    lightTex.magFilter = THREE.LinearFilter;
    lightTex.generateMipmaps = false;
  }, [darkTex, lightTex]);

  const vehicleGroupRef = useRef<THREE.Group | null>(null);
  const darkPlaneRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const lightPlaneRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const mouseLightRef = useRef<THREE.PointLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const readyFiredRef = useRef<boolean>(false);
  const themeProgressRef = useRef<number>(isLight ? 1 : 0);

  // Exact 3D cover projection: guarantees the 16:9 image fills the viewport with 8% parallax bleed
  const stageScale = useMemo(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov || 28;
    const fovRad = (fov * Math.PI) / 180;
    const vHeight = 2 * Math.tan(fovRad / 2) * 4.35;
    const vWidth = vHeight * (size.width / Math.max(size.height, 1));
    const scaleFactor = Math.max(vWidth, vHeight * 1.777) * 1.08;
    return [scaleFactor, scaleFactor / 1.777, 1] as [number, number, number];
  }, [camera, size.width, size.height]);

  // Microscopic atmospheric light motes (180 particles floating in 3D volume)
  const [particlePositions] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;     // X: -6 to +6
      pos[i * 3 + 1] = Math.random() * 4.5 - 1.5;   // Y: -1.5 to +3.0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;  // Z: -2 to +2
    }
    return [pos];
  }, []);

  // GSAP Cinematic Entrance
  useEffect(() => {
    if (!readyFiredRef.current) {
      readyFiredRef.current = true;
      onSceneReady();
    }

    const group = vehicleGroupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.position.set(0, 0, 0);
      group.scale.set(1, 1, 1);
      return;
    }

    // Elegant entrance: subtle push-in from scale 1.025 to 1.0
    group.position.set(0, 0, 0.2);
    group.scale.set(1.025, 1.025, 1);

    gsap.to(group.position, {
      z: 0,
      duration: 1.6,
      ease: "power3.out",
    });

    gsap.to(group.scale, {
      x: 1,
      y: 1,
      duration: 1.6,
      ease: "power3.out",
    });
  }, [onSceneReady, reducedMotion]);

  // Frame Loop: Smooth theme cross-fade, cursor tracking light, and particle motion
  useFrame(({ pointer }, delta) => {
    // 1. Smooth theme transition (lerp over ~400ms)
    const targetThemeProgress = isLight ? 1 : 0;
    themeProgressRef.current = THREE.MathUtils.damp(
      themeProgressRef.current,
      targetThemeProgress,
      8,
      delta
    );

    const t = themeProgressRef.current;
    if (darkPlaneRef.current) {
      darkPlaneRef.current.opacity = 1 - t;
    }
    if (lightPlaneRef.current) {
      lightPlaneRef.current.opacity = t;
    }

    // 2. Interactive golden-yellow point light tracks cursor across car flank
    if (mouseLightRef.current) {
      const targetX = pointer.x * 3.5;
      const targetY = pointer.y * 1.5 + 0.5;
      mouseLightRef.current.position.x += (targetX - mouseLightRef.current.position.x) * 0.06;
      mouseLightRef.current.position.y += (targetY - mouseLightRef.current.position.y) * 0.06;
    }

    // 3. Gentle atmospheric particle drift
    if (particlesRef.current && !reducedMotion) {
      const time = (typeof performance !== "undefined" ? performance.now() * 0.001 : 0) * 0.12;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.0008;
        positions[i * 3] += pointer.x * 0.0004;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. 3D Architectural Lighting Rig */}
      <ambientLight intensity={isLight ? 1.0 : 0.55} color={isLight ? "#ffffff" : "#dbeafe"} />

      {/* Signature Golden-Yellow Overhead Accent Light */}
      <pointLight
        position={[0, 3.2, 0.8]}
        intensity={isLight ? 1.5 : 2.8}
        color="#FBE90A"
        distance={9}
        decay={2}
      />

      {/* Interactive Cursor-Tracking Accent Light */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 1.2, 1.8]}
        intensity={isLight ? 1.6 : 3.2}
        color="#FBE90A"
        distance={7.5}
        decay={2.2}
      />

      {/* 2. Luxury Vehicle Showcase Stage (z = 0) */}
      <group ref={vehicleGroupRef} position={[0, 0, 0]}>
        {/* Dark Mode Vehicle Billboard Mesh */}
        <mesh scale={stageScale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={darkPlaneRef}
            map={darkTex}
            transparent
            opacity={isLight ? 0 : 1}
            depthWrite={false}
          />
        </mesh>

        {/* Light Mode Vehicle Billboard Mesh (Smoothly Cross-Faded) */}
        <mesh scale={stageScale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={lightPlaneRef}
            map={lightTex}
            transparent
            opacity={isLight ? 1 : 0}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 3. Atmospheric Luxury Floating Particles (Motes in 3D depth) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isLight ? 0.035 : 0.045}
          color={isLight ? "#94a3b8" : "#FBE90A"}
          transparent
          opacity={isLight ? 0.45 : 0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
