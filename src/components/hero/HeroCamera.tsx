"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

interface HeroCameraProps {
  enableMouseParallax: boolean;
  enableScrollScrub: boolean;
  reducedMotion: boolean;
  scrollProgressRef: React.RefObject<number>;
}

export function HeroCamera({
  enableMouseParallax,
  enableScrollScrub,
  reducedMotion,
  scrollProgressRef,
}: HeroCameraProps) {
  const { camera, size } = useThree();
  const hasIntroPlayedRef = useRef<boolean>(false);

  // Base camera parameters calibrated for telephoto automotive commercial lens
  const baseCamRef = useRef({
    x: 0,
    y: 0.1,
    z: 4.35,
    lookX: 0,
    lookY: 0.15,
    lookZ: 0,
  });

  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0.15, 0));

  // Cinematic Intro Push-In Dolly
  useEffect(() => {
    if (hasIntroPlayedRef.current) return;
    hasIntroPlayedRef.current = true;

    if (reducedMotion) {
      camera.position.set(0, 0.1, 4.35);
      camera.lookAt(0, 0.15, 0);
      return;
    }

    // Start slightly pulled back (z = 4.75) and push smoothly in to z = 4.35
    camera.position.set(0, 0.18, 4.75);

    gsap.to(camera.position, {
      x: 0,
      y: 0.1,
      z: 4.35,
      duration: 1.8,
      ease: "power2.out",
    });
  }, [camera, reducedMotion]);

  // Frame Loop: Smooth mouse parallax and scroll tracking
  useFrame(({ pointer }, delta) => {
    if (reducedMotion) {
      camera.lookAt(lookAtTargetRef.current);
      return;
    }

    // 1. Mouse Parallax (strictly bounded, subtle telephoto perspective shift)
    const parallaxFactorX = enableMouseParallax ? -pointer.x * 0.35 : 0;
    const parallaxFactorY = enableMouseParallax ? pointer.y * 0.2 : 0;

    // 2. Scroll Scrub tracking (gentle subtle approach on page scroll)
    const scrollFactor = enableScrollScrub && scrollProgressRef.current
      ? scrollProgressRef.current * 0.5
      : 0;

    const targetX = baseCamRef.current.x + parallaxFactorX;
    const targetY = baseCamRef.current.y + parallaxFactorY;
    const targetZ = baseCamRef.current.z + scrollFactor;

    // Smooth Lerp for fluid cinema feel
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);

    // Look at center of the vehicle
    lookAtTargetRef.current.set(
      parallaxFactorX * 0.1,
      0.15 + parallaxFactorY * 0.1,
      0
    );
    camera.lookAt(lookAtTargetRef.current);
  });

  return null;
}
