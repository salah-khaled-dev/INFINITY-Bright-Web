"use client";

import React, { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useReducedMotionPreference } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";
import { HeroContent } from "./HeroContent";
import { HeroMobile } from "./HeroMobile";
import { HeroVideoBackground } from "./HeroVideoBackground";

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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-500"
    >
      {/* Cinema-Grade Hero Video Experience */}
      <HeroVideoBackground
        theme={activeTheme}
        locale={locale}
        reducedMotion={reducedMotion}
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
