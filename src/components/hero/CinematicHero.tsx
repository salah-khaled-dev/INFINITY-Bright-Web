"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";
import { HeroContent } from "./HeroContent";
import { HeroFallback } from "./HeroFallback";
import { HeroMobile } from "./HeroMobile";

// Dynamic client-only import so Three.js / R3F never blocks SSR or initial HTML stream
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

interface CinematicHeroProps {
  locale: Locale;
  dict: Dictionary["hero"];
}

export function CinematicHero({ locale, dict }: CinematicHeroProps) {
  const { theme, mounted } = useTheme();
  const activeTheme: ThemeMode = mounted ? theme : "light";
  const perf = useDevicePerformance();
  const reducedMotion = useReducedMotionPreference();

  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollProgressRef = useRef<number>(0);

  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const [fatal3DError, setFatal3DError] = useState<boolean>(false);

  // GSAP ScrollTrigger — natural, non-hijacking scroll scrub driving 3D camera & turntable
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      scrollProgressRef.current = 0;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.45,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  }, [reducedMotion]);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const handleFatal3DError = useCallback(() => {
    setFatal3DError(true);
  }, []);

  const shouldRender3D =
    perf.ready &&
    !perf.isMobile &&
    perf.webglSupported &&
    perf.tier !== "fallback" &&
    !fatal3DError;
  const showFallback = !shouldRender3D || !sceneReady;

  return (
    <section
      ref={sectionRef}
      aria-label={dict.brand}
      className={cn(
        "relative min-h-[100svh] w-full overflow-hidden transition-colors duration-500",
        activeTheme === "light"
          ? "bg-[#f2f2ed] text-[#09090b]"
          : "bg-[#050608] text-white"
      )}
    >
      {/* Instant Vehicle Stage & Studio Backdrop */}
      <HeroFallback
        theme={activeTheme}
        locale={locale}
        visible={showFallback}
      />

      {/* Real-Time Interactive 3D Luxury Supercar Showroom */}
      {shouldRender3D && (
        <HeroScene
          theme={activeTheme}
          perf={perf}
          reducedMotion={reducedMotion}
          scrollProgressRef={scrollProgressRef}
          onReady={handleSceneReady}
          onFatalError={handleFatal3DError}
        />
      )}

      {/* Subtle Frame Guides on Large Monitors */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 z-[4] hidden w-full max-w-7xl -translate-x-1/2 border-x lg:block",
          activeTheme === "light" ? "border-black/[0.05]" : "border-white/[0.05]"
        )}
      />

      {/* Desktop & Tablet Editorial Stage */}
      <HeroContent
        locale={locale}
        theme={activeTheme}
        dict={dict}
        reducedMotion={reducedMotion}
      />

      {/* Dedicated Mobile Composition */}
      <HeroMobile
        locale={locale}
        theme={activeTheme}
        dict={dict}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}
