"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";

interface HeroContentProps {
  locale: Locale;
  theme: ThemeMode;
  dict: Dictionary["hero"];
  reducedMotion: boolean;
}

/**
 * Desktop & Tablet (`>= 768px`) Refined Luxury Hero Stage:
 * - Luxury minimalism: vehicle is the primary visual centerpiece.
 * - Refined headline typography with controlled max-width and comfortable breathing room.
 * - Lighter, softer secondary description (max 2 lines).
 * - Single, prominent primary CTA ("استكشف خدماتنا") with micro-hover physics.
 * - Crowded telemetry/information row removed in favor of generous whitespace.
 */
export function HeroContent({
  locale,
  theme,
  dict,
  reducedMotion,
}: HeroContentProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isLight = theme === "light";

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-brand]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      )
        .fromTo(
          "[data-hero-headline]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.42
        )
        .fromTo(
          "[data-hero-desc]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.56
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.68
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none relative z-10 hidden min-h-[100svh] w-full flex-col justify-end md:flex"
    >
      {/* Lower Grounding Gradient — gentle, non-intrusive fade that protects text readability while keeping the car 100% luminous */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[42%] transition-colors duration-500",
          isLight
            ? "bg-gradient-to-t from-[#f2f2ed] via-[#f2f2ed]/65 to-transparent"
            : "bg-gradient-to-t from-[#050608] via-[#050608]/75 to-transparent"
        )}
      />

      {/* Foreground Editorial Stage */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-12 lg:px-12 lg:pb-16">
        <div className="max-w-xl xl:max-w-2xl space-y-4">
          {/* Brand Eyebrow Tag */}
          <div
            data-hero-brand
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 backdrop-blur-md",
              isLight
                ? "border-black/10 bg-white/70 text-[#09090b] shadow-xs"
                : "border-white/10 bg-black/50 text-[#FBE90A]"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A] shadow-[0_0_8px_#FBE90A]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase rtl:text-xs rtl:tracking-normal">
              {dict.brand}
            </span>
          </div>

          {/* 1. Refined Headline — Premium Arabic typography, controlled max width, balanced line height */}
          <h1
            data-hero-headline
            className={cn(
              "font-display text-3xl font-black leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.45rem] lg:leading-[1.2] xl:text-[2.85rem] xl:leading-[1.18]",
              isLight ? "text-[#09090b]" : "text-white"
            )}
          >
            {dict.headline}
          </h1>

          {/* 2. Refined Description — Maximum 2 lines, softer secondary tone, increased breathing room */}
          <p
            data-hero-desc
            className={cn(
              "max-w-xl text-sm leading-relaxed font-normal lg:text-[15px] lg:leading-relaxed",
              isLight ? "text-zinc-600" : "text-zinc-300/85"
            )}
          >
            {dict.description}
          </p>

          {/* 3. Single Primary CTA — Yellow, comfortably padded, subtle hover micro-interaction */}
          <div data-hero-cta className="pointer-events-auto pt-2">
            <Link
              href={localizedHref(locale, "services")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#FBE90A] px-7 py-3.5 text-xs font-extrabold tracking-[0.12em] text-[#060608] uppercase shadow-[0_8px_24px_rgba(251,233,10,0.28)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#fff033] hover:shadow-[0_12px_32px_rgba(251,233,10,0.4)] rtl:text-xs rtl:tracking-normal"
            >
              <span>{dict.primaryCta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
