"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";

interface HeroMobileProps {
  locale: Locale;
  theme: ThemeMode;
  dict: Dictionary["hero"];
  reducedMotion: boolean;
}

/**
 * Dedicated Mobile Composition (`< 768px` — 360px, 375px, 390px, 430px):
 * - Unobstructed upper view leaves the luxury Mercedes vehicle 100% visible and uncropped
 * - Refined headline typography calibrated for Arabic with zero side clipping
 * - Lighter, 2-line description with softer secondary contrast
 * - Single primary CTA visible above the fold without excessive scrolling
 * - ZERO crowded info strips or competing elements
 */
export function HeroMobile({
  locale,
  theme,
  dict,
  reducedMotion,
}: HeroMobileProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isLight = theme === "light";

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mobile-reveal]",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none relative z-10 flex min-h-[100svh] w-full flex-col justify-end overflow-x-hidden md:hidden"
    >
      {/* Soft grounding gradient — ensures sharp typography while keeping the vehicle above 100% visible */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[52%] transition-colors duration-500",
          isLight
            ? "bg-gradient-to-t from-[#f2f2ed] via-[#f2f2ed]/80 to-transparent"
            : "bg-gradient-to-t from-[#050608] via-[#050608]/85 to-transparent"
        )}
      />

      {/* Upper Showcase Clear Window — Leaves the Mercedes in HeroFallback clear & impactful */}
      <div aria-hidden="true" className="relative z-10 min-h-[46svh] w-full shrink-0" />

      {/* Mobile Editorial Content */}
      <div className="pointer-events-auto relative z-10 w-full px-5 pt-2 pb-12 sm:px-6">
        {/* Minimal Brand Badge */}
        <div data-mobile-reveal className="mb-2.5">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md",
              isLight
                ? "border-black/10 bg-white/75 text-[#09090b]"
                : "border-white/10 bg-black/50 text-[#FBE90A]"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
            <span className="tracking-[0.16em] uppercase rtl:tracking-normal">
              {dict.brand}
            </span>
          </div>
        </div>

        {/* Mobile Headline — Refined, bold, unclipped (Semantic H1 is canonically declared on Desktop HeroContent to prevent duplicate DOM announcements) */}
        <p
          data-mobile-reveal
          aria-hidden="true"
          className={cn(
            "font-display text-[1.65rem] font-extrabold leading-[1.22] tracking-tight sm:text-3xl",
            isLight ? "text-[#09090b]" : "text-white"
          )}
        >
          {dict.headline}
        </p>

        {/* Mobile Description — Shorter readable lines, softer secondary tone */}
        <p
          data-mobile-reveal
          className={cn(
            "mt-2 text-xs leading-relaxed font-normal sm:text-sm line-clamp-2 max-w-sm",
            isLight ? "text-zinc-600" : "text-zinc-300/85"
          )}
        >
          {dict.description}
        </p>

        {/* Single Primary CTA — Balanced Luxury Pill */}
        <div data-mobile-reveal className="mt-4">
          <Link
            href={localizedHref(locale, "services")}
            className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-between sm:justify-center gap-4 rounded-full bg-[#FBE90A] px-6 py-3 text-xs font-extrabold tracking-[0.08em] text-[#060608] uppercase shadow-[0_8px_22px_rgba(251,233,10,0.25)] transition-all active:scale-[0.98] hover:bg-[#fff033] rtl:text-xs rtl:tracking-normal"
          >
            <span>{dict.primaryCta}</span>
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
