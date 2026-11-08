"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";

interface HeroFallbackProps {
  theme: ThemeMode;
  locale: Locale;
  visible: boolean;
  isLoading3D?: boolean;
  loadingLabel?: string;
}

/**
 * Instant High-Resolution Vehicle Stage & Graceful 3D Backdrop.
 * The Mercedes studio image is mounted immediately via SSR with priority,
 * guaranteeing ZERO loading delay and crisp automotive visual presence.
 */
export function HeroFallback({
  theme,
  locale,
  visible,
}: HeroFallbackProps) {
  const isLight = theme === "light";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Base Canvas Color */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          isLight ? "bg-[#f2f2ed]" : "bg-[#050608]"
        )}
      />

      {/* Immediate High-Res Dark Mode Mercedes Studio Image */}
      <Image
        src="/images/hero/hero-desktop-dark.webp"
        alt={
          locale === "ar"
            ? "سيارة مرسيدس رياضية فاخرة داخل استوديو إنفينيتي برايت"
            : "Luxury Mercedes sports car inside INFINITE BRIGHT architectural studio"
        }
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-500",
          "object-[50%_24%]",
          locale === "ar"
            ? "md:object-[32%_38%] lg:object-[30%_38%]"
            : "md:object-[68%_38%] lg:object-[70%_38%]",
          isLight ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Immediate High-Res Light Mode Mercedes Studio Image */}
      <Image
        src="/images/hero/hero-desktop-light.webp"
        alt={
          locale === "ar"
            ? "سيارة مرسيدس رياضية فضية داخل استوديو إنفينيتي برايت النهاري"
            : "Silver luxury Mercedes sports car inside INFINITE BRIGHT white studio"
        }
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-500",
          "object-[50%_24%]",
          locale === "ar"
            ? "md:object-[32%_38%] lg:object-[30%_38%]"
            : "md:object-[68%_38%] lg:object-[70%_38%]",
          isLight ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Very Soft Studio Grounding Veil — Avoids excessive overlays so the vehicle is crisp */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          isLight
            ? "bg-gradient-to-t from-[#f2f2ed]/60 via-transparent to-transparent"
            : "bg-gradient-to-t from-[#050608]/70 via-transparent to-transparent"
        )}
      />
    </div>
  );
}
