"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { STUDIO_LIGHTING_CONFIGS } from "@/lib/three/lighting";
import {
  setupVehicleMaterialRig,
  type VehicleMaterialRig,
} from "@/lib/three/materials";
import type { ThemeMode } from "@/types";

interface HeroVehicleProps {
  theme: ThemeMode;
  enableShadows: boolean;
  reducedMotion: boolean;
  scrollProgressRef: React.RefObject<number>;
  aoShadowMatRef: React.RefObject<THREE.MeshBasicMaterial | null>;
  onMaterialRigReady: (rig: VehicleMaterialRig) => void;
  onSceneReady: () => void;
}

// 45° luxury front-three-quarter showcase stance (faces camera + reveals full sculpted side flank)
const BASE_CAR_YAW = Math.PI + 0.19; // ~190.9°

export function HeroVehicle({
  theme,
  enableShadows,
  reducedMotion,
  scrollProgressRef,
  aoShadowMatRef,
  onMaterialRigReady,
  onSceneReady,
}: HeroVehicleProps) {
  const gltf = useGLTF("/models/hero/vehicle.glb", "/draco/");
  const aoAlphaTex = useTexture("/models/hero/vehicle-ao-alpha.png");

  const turntableGroupRef = useRef<THREE.Group | null>(null);
  const rollInGroupRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Object3D[]>([]);
  const baseWheelXRef = useRef<number[]>([]);
  const materialRigRef = useRef<VehicleMaterialRig | null>(null);

  const readyFiredRef = useRef<boolean>(false);
  const frameCountRef = useRef<number>(0);
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Clone scene safely so React StrictMode / HMR never mutates shared glTF cache
  const carScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Configure AO ground shadow texture
  useEffect(() => {
    aoAlphaTex.colorSpace = THREE.NoColorSpace;
    aoAlphaTex.needsUpdate = true;
  }, [aoAlphaTex]);

  // Setup physically based automotive materials & cache articulated wheel pivot nodes
  useEffect(() => {
    const rig = setupVehicleMaterialRig(carScene, theme, enableShadows);
    materialRigRef.current = rig;
    onMaterialRigReady(rig);

    const wheelNames = ["wheel_fl", "wheel_fr", "wheel_rl", "wheel_rr"];
    const foundWheels: THREE.Object3D[] = [];
    const baseRotX: number[] = [];

    for (const name of wheelNames) {
      const w = carScene.getObjectByName(name);
      if (w) {
        foundWheels.push(w);
        baseRotX.push(w.rotation.x);
      }
    }
    wheelsRef.current = foundWheels;
    baseWheelXRef.current = baseRotX;

    return () => {
      rig.dispose();
    };
  }, [carScene, enableShadows, onMaterialRigReady, theme]);

  // Cinematic Showroom Drive-In Entrance ("وسياره تخش اول ما افتح الموقع")
  // Supercar drives in from deep studio space (5.8m back) onto the turntable stage,
  // 4 wheels physically rotate, chassis pitches subtly on braking, and Xenon LED DRLs ignite!
  const triggerCinematicEntrance = () => {
    if (entranceTimelineRef.current) return;
    const rollGroup = rollInGroupRef.current;
    if (!rollGroup) return;

    if (reducedMotion) {
      rollGroup.position.z = 0;
      rollGroup.rotation.x = 0;
      if (materialRigRef.current) {
        materialRigRef.current.headlightMaterial.emissiveIntensity = 2.4;
        materialRigRef.current.taillightMaterial.emissiveIntensity = 1.6;
      }
      return;
    }

    // In car local space, front faces -Z, so deep entrance position is +Z (+5.8 meters back!)
    const driveState = {
      zOffset: 5.8,
      pitchX: 0,
      headlightGlow: 0.25,
      taillightGlow: 0.35,
    };

    rollGroup.position.z = driveState.zOffset;

    const tl = gsap.timeline({
      delay: 0.05,
      onUpdate: () => {
        if (rollInGroupRef.current) {
          rollInGroupRef.current.position.z = driveState.zOffset;
          rollInGroupRef.current.rotation.x = driveState.pitchX;
        }

        // Wheel physical rolling rotation: wheel radius = 0.358m
        // Distance traveled = 5.8 - driveState.zOffset
        const rollAngle = (5.8 - driveState.zOffset) / 0.358;
        wheelsRef.current.forEach((wheel, idx) => {
          const base = baseWheelXRef.current[idx] ?? -Math.PI / 2;
          wheel.rotation.x = base - rollAngle;
        });

        // Dynamic Xenon DRL & ruby taillight glow
        if (materialRigRef.current) {
          materialRigRef.current.headlightMaterial.emissiveIntensity =
            driveState.headlightGlow;
          materialRigRef.current.taillightMaterial.emissiveIntensity =
            driveState.taillightGlow;
        }
      },
    });

    // 1. Smooth, authoritative deceleration curve onto the turntable plinth
    tl.to(
      driveState,
      {
        zOffset: 0,
        duration: 2.2,
        ease: "power3.out",
      },
      0
    );

    // 2. Subtle luxury suspension pitch (gentle nose compression on braking, settles at 0)
    tl.to(
      driveState,
      {
        pitchX: 0.014, // Subtle forward nose dip
        duration: 0.8,
        ease: "power2.out",
      },
      0.3
    ).to(
      driveState,
      {
        pitchX: 0, // Natural suspension rebound settle
        duration: 0.9,
        ease: "power2.out",
      },
      1.1
    );

    // 3. Xenon Projector & LED DRL ignition as the supercar enters the spotlight
    tl.to(
      driveState,
      {
        headlightGlow: 3.6,
        taillightGlow: 2.4,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0.8
    ).to(
      driveState,
      {
        headlightGlow: 2.2,
        taillightGlow: 1.5,
        duration: 0.7,
        ease: "power2.out",
      },
      1.3
    );

    entranceTimelineRef.current = tl;
  };

  // Signal scene ready on first rendered frame and trigger drive-in immediately
  useFrame(({ pointer }) => {
    if (!readyFiredRef.current) {
      frameCountRef.current += 1;
      if (frameCountRef.current >= 2) {
        readyFiredRef.current = true;
        onSceneReady();
        triggerCinematicEntrance();
      }
    }

    // Natural, smooth scroll & cursor turntable interaction (never jumps)
    const scrollP = scrollProgressRef.current ?? 0;
    if (turntableGroupRef.current) {
      const mouseYaw = reducedMotion ? 0 : pointer.x * 0.32;
      const targetYaw = BASE_CAR_YAW + mouseYaw + (reducedMotion ? 0 : scrollP * 0.26);
      turntableGroupRef.current.rotation.y +=
        (targetYaw - turntableGroupRef.current.rotation.y) * 0.08;
    }
  });

  const initialCfg = STUDIO_LIGHTING_CONFIGS[theme];

  return (
    <group ref={turntableGroupRef} rotation={[0, BASE_CAR_YAW, 0]}>
      <group ref={rollInGroupRef}>
        <primitive object={carScene} />

        {/* Real-world calibrated ground contact shadow (moves naturally with vehicle) */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.005, 0]}
          renderOrder={2}
        >
          <planeGeometry args={[2.64, 5.24]} />
          <meshBasicMaterial
            ref={aoShadowMatRef}
            map={aoAlphaTex}
            transparent
            depthWrite={false}
            opacity={initialCfg.aoShadowOpacity}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/hero/vehicle.glb", "/draco/");
