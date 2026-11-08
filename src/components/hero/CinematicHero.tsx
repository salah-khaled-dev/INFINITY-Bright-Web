"use client";

import React, { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";
import { HeroContent } from "./HeroContent";
import { HeroFallback } from "./HeroFallback";
import { HeroMobile } from "./HeroMobile";

interface CinematicHeroProps {
  locale: Locale;
  dict: Dictionary["hero"];
}

export function CinematicHero({ locale, dict }: CinematicHeroProps) {
  const { theme, mounted } = useTheme();
  const activeTheme: ThemeMode = mounted ? theme : "light";
  const reducedMotion = useReducedMotionPreference();
  const sectionRef = useRef<HTMLElement | null>(null);

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
      {/* Studio Visual Backdrop (Light Mode: Craftsmen Studio, Dark Mode: Obsidian Studio) */}
      <HeroFallback
        theme={activeTheme}
        locale={locale}
        visible={true}
      />

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
