"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { STUDIO_LIGHTING_CONFIGS } from "@/lib/three/lighting";
import type { ThemeMode } from "@/types";

export interface StudioArchitectureRefs {
  cycloramaMat: React.RefObject<THREE.MeshStandardMaterial | null>;
  platformMat: React.RefObject<THREE.MeshStandardMaterial | null>;
  simpleFloorMat: React.RefObject<THREE.MeshStandardMaterial | null>;
  haloRingMat: React.RefObject<THREE.MeshStandardMaterial | null>;
  outerRingMat: React.RefObject<THREE.MeshStandardMaterial | null>;
}

interface HeroEnvironmentProps {
  theme: ThemeMode;
  envResolution: number;
  enableFloorReflector: boolean;
  reflectorResolution: number;
  scrollProgressRef: React.RefObject<number>;
  archRefs: StudioArchitectureRefs;
}

/**
 * Builds a seamless curved studio infinity cyclorama cove (sweep from floor z=0
 * through a 4.8m quarter-cylinder cove up to height 10.5m) with smooth vertex normals
 * so there are zero harsh wall-to-floor horizon lines behind the vehicle.
 */
function createInfinityCycloramaGeometry(): THREE.BufferGeometry {
  const width = 42;
  const radius = 4.8;
  const topHeight = 10.5;
  const curveSegments = 24;
  const profilePoints: Array<[number, number]> = [];

  // Flat lead-in tangent on the floor
  profilePoints.push([0, 2.2]);
  profilePoints.push([0, 0]);

  // Smooth quarter-circle cove sweeping from (y=0, z=0) to (y=radius, z=-radius)
  for (let i = 1; i <= curveSegments; i++) {
    const theta = (i / curveSegments) * (Math.PI / 2);
    const y = radius * (1 - Math.cos(theta));
    const z = -radius * Math.sin(theta);
    profilePoints.push([y, z]);
  }

  // Vertical upper studio wall
  profilePoints.push([topHeight, -radius]);

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const cols = 2;

  for (let r = 0; r < profilePoints.length; r++) {
    const [py, pz] = profilePoints[r];
    const v = r / (profilePoints.length - 1);
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const px = (u - 0.5) * width;
      positions.push(px, py, pz);
      uvs.push(u, v);
    }
  }

  for (let r = 0; r < profilePoints.length - 1; r++) {
    const a = r * cols;
    const b = a + 1;
    const c = (r + 1) * cols;
    const d = c + 1;
    indices.push(a, b, c);
    indices.push(b, d, c);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Cinema-Grade Luxury Automotive Photography Studio:
 * - Curved Infinity Cyclorama Cove (no boxy walls or horizon bars cutting the roofline).
 * - Precision Circular Showroom Turntable Stage (`r = 2.88m`) with flush recessed `#FBE90A` LED halo.
 * - Multi-bank GPU `<Lightformer>` studio softboxes calibrated to sculpt metallic bodywork,
 *   forged alloy spokes, and smoked privacy glass in both Dark & Light modes.
 */
export function HeroEnvironment({
  theme,
  envResolution,
  enableFloorReflector,
  reflectorResolution,
  scrollProgressRef,
  archRefs,
}: HeroEnvironmentProps) {
  const cfg = STUDIO_LIGHTING_CONFIGS[theme];
  const isLight = theme === "light";
  const stageGroupRef = useRef<THREE.Group | null>(null);

  const cycloramaGeo = useMemo(() => createInfinityCycloramaGeometry(), []);

  useFrame(() => {
    const p = scrollProgressRef.current ?? 0;
    if (stageGroupRef.current) {
      stageGroupRef.current.rotation.z = p * 0.18;
    }
  });

  return (
    <group name="IB_Showroom_Studio">
      {/* Procedural HDR Automotive Reflection Softboxes (zero external HDR network latency) */}
      <Environment key={theme} frames={1} resolution={envResolution}>
        <color attach="background" args={[isLight ? "#eeede7" : "#06080c"]} />

        {/* Main Overhead Commercial Softbox Bank (liquid highlight ribbon across hood, roof & deck) */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.8 : 4.2}
          color={isLight ? "#ffffff" : "#f6f9ff"}
          scale={[13, 1.9, 1]}
          position={[0, 5.1, 0.3]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Secondary Angled Overhead Hairline Softbox (double specular automotive commercial look) */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.0 : 3.1}
          color={isLight ? "#ffffff" : "#e2ecff"}
          scale={[12, 0.55, 1]}
          position={[-1.6, 4.6, 2.4]}
          rotation={[Math.PI / 2.35, 0.18, 0]}
        />

        {/* Camera-Side Beltline Softbox (illuminates sculpted side flank, door scallop & forged alloy spokes!) */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.2 : 2.85}
          color={isLight ? "#ffffff" : "#eef4ff"}
          scale={[11, 0.85, 1]}
          position={[-5.4, 1.45, 2.5]}
          rotation={[0, Math.PI / 2.6, 0]}
        />

        {/* Front Nose & Splitter Accent Softbox */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.1 : 2.5}
          color={isLight ? "#fffef8" : "#e8f0ff"}
          scale={[8.5, 1.2, 1]}
          position={[2.6, 1.9, 5.2]}
          rotation={[0, Math.PI + 0.45, 0]}
        />

        {/* Negative-Fill Charcoal Flags in Light Mode so metallic curves hold deep 3D contrast */}
        {isLight && (
          <>
            <Lightformer
              form="rect"
              intensity={0.08}
              color="#14171f"
              scale={[11, 2.0, 1]}
              position={[-3.6, 2.5, -1.8]}
              rotation={[0, Math.PI / 3, 0]}
            />
            <Lightformer
              form="rect"
              intensity={0.08}
              color="#14171f"
              scale={[11, 2.0, 1]}
              position={[3.8, 2.5, 1.2]}
              rotation={[0, -Math.PI / 3, 0]}
            />
          </>
        )}

        {/* Subtle Signature #FBE90A Golden Rim Kiss in Reflections */}
        <Lightformer
          form="rect"
          intensity={isLight ? 1.5 : 2.8}
          color="#FBE90A"
          scale={[7.5, 0.16, 1]}
          position={[4.8, 1.35, -3.4]}
          rotation={[0, -Math.PI / 1.6, 0]}
        />
        <Lightformer
          form="ring"
          intensity={isLight ? 1.1 : 2.2}
          color="#FBE90A"
          scale={[5.8, 5.8, 1]}
          position={[0, 0.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Environment>

      {/* Seamless Curved Infinity Cyclorama Cove (placed at 9.6m behind stage so full 6m drive-in stays clear) */}
      <mesh
        geometry={cycloramaGeo}
        position={[3.2, -0.003, -8.8]}
        rotation={[0, -0.52, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          ref={archRefs.cycloramaMat}
          color={cfg.cycloramaHex}
          roughness={0.86}
          metalness={0.06}
        />
      </mesh>

      {/* Main Studio Floor: Real-Time Planar Reflections on Desktop/Tablet, High-Efficiency PBR Floor on Mobile */}
      {enableFloorReflector ? (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.002, 0]}
          receiveShadow
        >
          <planeGeometry args={[38, 38]} />
          <MeshReflectorMaterial
            key={theme}
            blur={[320, 100]}
            resolution={reflectorResolution}
            mixBlur={0.88}
            mixStrength={cfg.reflectorMixStrength}
            roughness={cfg.floorRoughness}
            depthScale={1.0}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.4}
            color={cfg.floorHex}
            metalness={cfg.floorMetalness}
            mirror={cfg.reflectorMirror}
          />
        </mesh>
      ) : (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.002, 0]}
          receiveShadow
        >
          <planeGeometry args={[38, 38]} />
          <meshStandardMaterial
            ref={archRefs.simpleFloorMat}
            color={cfg.floorHex}
            roughness={cfg.floorRoughness}
            metalness={cfg.floorMetalness}
          />
        </mesh>
      )}

      {/* Precision Circular Showroom Turntable Stage + Recessed #FBE90A Floor Halo */}
      <group position={[0, 0, 0]}>
        {/* Low-profile machined circular turntable plinth (height 8mm, radius 2.86m) */}
        <mesh position={[0, 0.003, 0]} receiveShadow>
          <cylinderGeometry args={[2.86, 2.91, 0.008, 128]} />
          <meshStandardMaterial
            ref={archRefs.platformMat}
            color={cfg.platformHex}
            roughness={0.28}
            metalness={0.55}
          />
        </mesh>

        {/* Primary Flush #FBE90A Infinity Bright Floor Halo Ring */}
        <group ref={stageGroupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0075, 0]}>
          <mesh>
            <ringGeometry args={[2.865, 2.9, 160]} />
            <meshStandardMaterial
              ref={archRefs.haloRingMat}
              color="#FBE90A"
              emissive="#FBE90A"
              emissiveIntensity={cfg.haloEmissiveIntensity}
              roughness={0.15}
              toneMapped={false}
            />
          </mesh>

          {/* Subtle Outer Architectural Hairline Ring */}
          <mesh>
            <ringGeometry args={[3.24, 3.252, 160]} />
            <meshStandardMaterial
              ref={archRefs.outerRingMat}
              color="#FBE90A"
              emissive="#FBE90A"
              emissiveIntensity={cfg.haloEmissiveIntensity * 0.42}
              transparent
              opacity={0.65}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* Deep Perimeter Architectural Vertical Accent Blades (far outer edges, never crossing roofline) */}
      <mesh position={[-5.9, 2.4, -4.8]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.024, 4.8, 0.024]} />
        <meshStandardMaterial
          color="#FBE90A"
          emissive="#FBE90A"
          emissiveIntensity={cfg.haloEmissiveIntensity * 0.65}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[6.8, 2.4, -4.2]} rotation={[0, -0.45, 0]}>
        <boxGeometry args={[0.024, 4.8, 0.024]} />
        <meshStandardMaterial
          color="#FBE90A"
          emissive="#FBE90A"
          emissiveIntensity={cfg.haloEmissiveIntensity * 0.65}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
