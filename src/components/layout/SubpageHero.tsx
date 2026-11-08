"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SubpageHeroProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Editorial Subpage Hero Header
 * Replaces plain white/empty headers with an ultra-luxurious cinematic showroom backdrop
 * featuring iconic vehicles (Land Cruiser, Range Rover, Maybach, Porsche) inside Infinite Bright's studio.
 * Uses smart directional scrims to ensure AAA text contrast in both light and dark modes.
 */
export function SubpageHero({
  eyebrow,
  headline,
  description,
  imageSrc,
  imageAlt,
  badge,
  children,
  className,
}: SubpageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[460px] w-full overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] pt-32 pb-16 sm:min-h-[500px] sm:pt-40 sm:pb-20 lg:min-h-[540px] lg:pt-44 lg:pb-24",
        className
      )}
    >
      {/* Background Luxury Showroom Car Stage */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] transition-transform duration-1000 ease-out hover:scale-105 sm:object-[68%_center] lg:object-[60%_center]"
        />

        {/* Directional Editorial Scrims */}
        {/* Mobile: Vertical Gradient (Car visible at top, text clean and readable below) */}
        <div
          className={cn(
            "absolute inset-0 sm:hidden",
            "bg-gradient-to-t from-[var(--bg-canvas)] via-[var(--bg-canvas)]/92 via-60% to-[var(--bg-canvas)]/35"
          )}
        />

        {/* Desktop / Tablet: Directional Horizontal Scrim */}
        {/* Arabic (RTL): Text on right -> Solid on right, transparent on left to reveal the car */}
        {/* English (LTR): Text on left -> Solid on left, transparent on right to reveal the car */}
        <div
          className={cn(
            "hidden sm:block absolute inset-0",
            "ltr:bg-gradient-to-r ltr:from-[var(--bg-canvas)] ltr:via-[var(--bg-canvas)]/95 ltr:via-45% ltr:to-transparent",
            "rtl:bg-gradient-to-l rtl:from-[var(--bg-canvas)] rtl:via-[var(--bg-canvas)]/95 rtl:via-45% rtl:to-transparent"
          )}
        />

        {/* Bottom Grounding Blend (seamlessly merges with the next section) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-canvas)] via-[var(--bg-canvas)]/80 to-transparent" />

        {/* Top Vignette (enhances navbar contrast) */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 via-black/10 to-transparent dark:from-black/60" />
      </div>

      {/* Foreground Editorial Stage */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Eyebrow & Showroom Badge */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {eyebrow && (
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                {eyebrow}
              </p>
            )}
            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FBE90A]/35 bg-[var(--bg-surface)]/85 px-3 py-0.5 text-[11px] font-bold text-[var(--text-primary)] shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A] shadow-[0_0_8px_#FBE90A]" />
                <span>{badge}</span>
              </span>
            )}
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl leading-[1.14] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl rtl:leading-[1.24]">
            {headline}
          </h1>

          {/* Description */}
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:text-lg">
              {description}
            </p>
          )}

          {/* Extra Interactive Children (e.g. Quick navigation pills) */}
          {children && <div className="pt-2 sm:pt-4">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

