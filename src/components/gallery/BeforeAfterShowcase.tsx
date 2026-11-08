"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export interface BeforeAfterCase {
  id: "polishing" | "tinting" | "protection";
  beforeSrc: string;
  afterSrc: string;
  title: string;
  subtitle: string;
  beforeBadge: string;
  afterBadge: string;
  specTag: string;
}

interface BeforeAfterShowcaseProps {
  locale: Locale;
  heading: string;
  subheading: string;
  dragHint: string;
  cases: BeforeAfterCase[];
}

export function BeforeAfterShowcase({
  heading,
  subheading,
  dragHint,
  cases,
}: BeforeAfterShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const current = cases[activeIndex] ?? cases[0];

  return (
    <div className="mb-16 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-elevated)] sm:p-8 lg:p-10">
      {/* Header & Case Switcher */}
      <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FBE90A]/15 px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
            <span className="h-2 w-2 rounded-full bg-[#FBE90A]" />
            <span>{dragHint}</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            {heading}
          </h3>
          <p className="max-w-2xl text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            {subheading}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {cases.map((c, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setSliderPos(50);
                }}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300",
                  active
                    ? "border-[#FBE90A] bg-[#FBE90A] text-[#060608] shadow-[0_6px_18px_rgba(251,233,10,0.25)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                )}
              >
                {c.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Split Comparison Viewport (LTR-normalized coordinates so left=Before & right=After consistently) */}
      <div
        dir="ltr"
        className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#060608]"
      >
        {/* Full AFTER Layer Underneath */}
        <Image
          src={current.afterSrc}
          alt={`${current.title} — ${current.afterBadge}`}
          fill
          sizes="(max-width: 1280px) 100vw, 1150px"
          priority
          className="pointer-events-none object-cover"
        />

        {/* Clipped BEFORE Layer On Top */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src={current.beforeSrc}
            alt={`${current.title} — ${current.beforeBadge}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1150px"
            priority
            className="object-cover"
          />
        </div>

        {/* Before / After Corner Studio Badges */}
        <div className="pointer-events-none absolute top-4 left-4 z-10 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white/90 uppercase backdrop-blur-md">
          {current.beforeBadge}
        </div>
        <div className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-[#FBE90A] px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-[#060608] uppercase shadow-lg">
          {current.afterBadge}
        </div>

        {/* Vertical Laser Divider Line & Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="pointer-events-none absolute inset-y-0 z-20 -translate-x-1/2"
        >
          <div className="h-full w-[3px] bg-[#FBE90A] shadow-[0_0_16px_rgba(251,233,10,0.8)]" />
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#060608] bg-[#FBE90A] text-[#060608] shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        {/* Invisible Accessible Full-Area Range Control */}
        <input
          type="range"
          min={4}
          max={96}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label={current.title}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {/* Active Case Caption Footer */}
      <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {current.subtitle}
        </p>
        <span className="shrink-0 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-1.5 font-mono text-xs font-bold text-[var(--brand-accent-label)]">
          {current.specTag}
        </span>
      </div>
    </div>
  );
}

