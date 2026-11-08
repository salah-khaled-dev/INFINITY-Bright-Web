"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

type PackageKey = "front" | "half" | "full";

interface PpfPackagesShowcaseProps {
  locale: Locale;
  dict: Dictionary["ppfPackages"];
  compactTop?: boolean;
}

export function PpfPackagesShowcase({
  locale,
  dict,
  compactTop = false,
}: PpfPackagesShowcaseProps) {
  const [selected, setSelected] = useState<PackageKey>("half");

  const isFrontCovered = true; // All 3 cover front bumper, headlights, 40cm, A-pillars, door cups & edges
  const isFullHoodAndFenders = selected === "half" || selected === "full";
  const isFuelFlapCovered = selected === "half" || selected === "full";
  const isFullBody = selected === "full";

  const packageOrder: PackageKey[] = ["half", "front", "full"];

  const activeFill = "rgba(251, 233, 10, 0.34)";
  const activeStroke = "#FBE90A";
  const inactiveFill = "rgba(255, 255, 255, 0.03)";
  const inactiveStroke = "rgba(255, 255, 255, 0.16)";

  return (
    <div className={cn("w-full", compactTop ? "pt-16 sm:pt-20" : "py-20 sm:py-28")}>
      {/* Header */}
      <Reveal className="mb-10 max-w-3xl space-y-3.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/40 bg-[#FBE90A]/10 px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{dict.eyebrow}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight font-extrabold text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
          {dict.headline}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          {dict.description}
        </p>
      </Reveal>

      {/* Interactive Top-View GT Coverage Blueprint Stage */}
      <Reveal delay={0.08}>
        <div className="mb-8 overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[#07080c] p-5 text-white shadow-[var(--shadow-elevated)] sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#FBE90A] uppercase">
                {dict.blueprintTitle}
              </p>
              <p className="mt-1 text-xs text-white/65">{dict.blueprintHint}</p>
            </div>

            {/* Quick Package Pills inside Blueprint Header */}
            <div className="flex flex-wrap gap-2">
              {packageOrder.map((key) => {
                const pkg = dict.packages[key];
                const active = selected === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelected(key)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-300",
                      active
                        ? "bg-[#FBE90A] text-[#060608] shadow-[0_0_24px_rgba(251,233,10,0.38)]"
                        : "border border-white/15 bg-white/5 text-white/80 hover:border-[#FBE90A]/60 hover:text-white"
                    )}
                  >
                    {pkg.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural CAD SVG Vehicle Diagram */}
          <div
            dir="ltr"
            className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(251,233,10,0.07),rgba(5,6,9,0.96)_72%)] px-3 py-6 sm:px-8 sm:py-8"
          >
            {/* Subtle CAD Grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <svg
              viewBox="0 0 680 280"
              className="relative z-10 h-auto w-full max-w-3xl drop-shadow-[0_12px_32px_rgba(0,0,0,0.75)]"
              role="img"
              aria-label={dict.packages[selected].title}
            >
              <defs>
                <filter id="ppfGlow" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="4"
                    floodColor="#FBE90A"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              {/* Four Forged Wheels (Structural Reference) */}
              <rect x="148" y="28" width="66" height="22" rx="7" fill="#14161d" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <rect x="148" y="230" width="66" height="22" rx="7" fill="#14161d" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <rect x="468" y="26" width="70" height="24" rx="7" fill="#14161d" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <rect x="468" y="230" width="70" height="24" rx="7" fill="#14161d" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

              {/* Outer Car Silhouette Base */}
              <path
                d="M 52,140 Q 52,72 114,54 L 258,46 L 445,46 L 566,54 Q 624,68 626,140 Q 624,212 566,226 L 445,234 L 258,234 L 114,226 Q 52,208 52,140 Z"
                fill="#0d0f15"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
              />

              {/* 1. FULL FRONT BUMPER (Covered in Front 40cm, Half, Full) */}
              <path
                d="M 52,140 Q 52,74 108,56 L 112,224 Q 52,206 52,140 Z"
                fill={isFrontCovered ? activeFill : inactiveFill}
                stroke={isFrontCovered ? activeStroke : inactiveStroke}
                strokeWidth="2"
                filter={isFrontCovered ? "url(#ppfGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* 2. FRONT 40CM OF HOOD & FENDERS (Covered in Front 40cm, Half, Full) */}
              <path
                d="M 112,56 L 176,50 L 176,230 L 112,224 Z"
                fill={isFrontCovered ? activeFill : inactiveFill}
                stroke={isFrontCovered ? activeStroke : inactiveStroke}
                strokeWidth="1.8"
                className="transition-all duration-300"
              />

              {/* 3. REMAINING FULL HOOD & FULL FRONT FENDERS (Covered in Half & Full) */}
              <path
                d="M 176,50 L 266,47 L 266,84 L 246,92 L 246,188 L 266,196 L 266,233 L 176,230 Z"
                fill={isFullHoodAndFenders ? activeFill : inactiveFill}
                stroke={isFullHoodAndFenders ? activeStroke : inactiveStroke}
                strokeWidth="1.8"
                className="transition-all duration-300"
              />
              {/* Center Hood Sculpted Panel (x=176..256) */}
              <path
                d="M 176,84 L 254,88 Q 242,140 254,192 L 176,196 Z"
                fill={isFullHoodAndFenders ? activeFill : inactiveFill}
                stroke={isFullHoodAndFenders ? activeStroke : inactiveStroke}
                strokeWidth="1.6"
                className="transition-all duration-300"
              />

              {/* Dashed 40cm Indicator Line when Front-End 40cm is selected */}
              {selected === "front" && (
                <g>
                  <line
                    x1="176"
                    y1="38"
                    x2="176"
                    y2="242"
                    stroke="#FBE90A"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                  <rect x="150" y="13" width="52" height="19" rx="9" fill="#FBE90A" />
                  <text
                    x="176"
                    y="26"
                    textAnchor="middle"
                    fill="#060608"
                    fontSize="10"
                    fontWeight="800"
                  >
                    40 CM
                  </text>
                </g>
              )}

              {/* 4. HEADLIGHTS (Covered in Front, Half, Full) */}
              <path
                d="M 78,78 Q 104,66 132,72 Q 124,88 94,92 Z"
                fill="#FBE90A"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <path
                d="M 78,202 Q 104,214 132,208 Q 124,192 94,188 Z"
                fill="#FBE90A"
                stroke="#ffffff"
                strokeWidth="1.2"
              />

              {/* Front Windshield Glass */}
              <path
                d="M 256,90 L 326,82 L 326,198 L 256,190 Q 244,140 256,90 Z"
                fill="#121822"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />

              {/* 5. A-PILLARS / أكتاف السيارة (Covered in Front, Half, Full) */}
              <path
                d="M 256,84 L 332,74 L 332,83 L 256,91 Z"
                fill={isFrontCovered ? "#FBE90A" : inactiveFill}
                className="transition-all duration-300"
              />
              <path
                d="M 256,196 L 332,206 L 332,197 L 256,189 Z"
                fill={isFrontCovered ? "#FBE90A" : inactiveFill}
                className="transition-all duration-300"
              />

              {/* Side Mirrors */}
              <path
                d="M 278,48 Q 292,30 304,38 L 298,54 Z"
                fill={isFullHoodAndFenders ? activeFill : "rgba(251,233,10,0.22)"}
                stroke={activeStroke}
                strokeWidth="1.5"
              />
              <path
                d="M 278,232 Q 292,250 304,242 L 298,226 Z"
                fill={isFullHoodAndFenders ? activeFill : "rgba(251,233,10,0.22)"}
                stroke={activeStroke}
                strokeWidth="1.5"
              />

              {/* 6. DOORS, ROOF, REAR QUARTERS, TRUNK & REAR BUMPER (Full Body) */}
              {/* Left & Right Doors */}
              <rect
                x="268"
                y="48"
                width="164"
                height="26"
                rx="3"
                fill={isFullBody ? activeFill : inactiveFill}
                stroke={isFullBody ? activeStroke : inactiveStroke}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <rect
                x="268"
                y="206"
                width="164"
                height="26"
                rx="3"
                fill={isFullBody ? activeFill : inactiveFill}
                stroke={isFullBody ? activeStroke : inactiveStroke}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Roof Panel */}
              <rect
                x="328"
                y="84"
                width="124"
                height="112"
                rx="8"
                fill={isFullBody ? activeFill : "#10141c"}
                stroke={isFullBody ? activeStroke : "rgba(255,255,255,0.2)"}
                strokeWidth="1.6"
                className="transition-all duration-300"
              />

              {/* Rear Quarters, Trunk & Rear Bumper */}
              <path
                d="M 434,48 L 566,55 Q 622,70 624,140 Q 622,210 566,225 L 434,232 L 434,204 L 456,196 L 456,84 L 434,76 Z"
                fill={isFullBody ? activeFill : inactiveFill}
                stroke={isFullBody ? activeStroke : inactiveStroke}
                strokeWidth="1.6"
                className="transition-all duration-300"
              />

              {/* 7. DOOR HANDLE CUPS (مساكات الأبواب) — Covered in ALL 3 Packages */}
              <rect x="374" y="54" width="22" height="7" rx="3.5" fill="#FBE90A" />
              <rect x="374" y="219" width="22" height="7" rx="3.5" fill="#FBE90A" />

              {/* 8. DOOR EDGES (أطراف الأبواب) — Covered in ALL 3 Packages */}
              <line x1="432" y1="48" x2="432" y2="75" stroke="#FBE90A" strokeWidth="3" />
              <line x1="432" y1="205" x2="432" y2="232" stroke="#FBE90A" strokeWidth="3" />

              {/* 9. FUEL TANK FLAP (تانك البنزين) — Covered in Half-Front & Full-Body */}
              <circle
                cx="512"
                cy="62"
                r="8"
                fill={isFuelFlapCovered ? "#FBE90A" : "rgba(255,255,255,0.06)"}
                stroke={isFuelFlapCovered ? "#ffffff" : "rgba(255,255,255,0.2)"}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Bottom Warranty Strip inside Blueprint */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/75">
            <span className="inline-flex items-center gap-2 font-semibold text-[#FBE90A]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{dict.warrantyStrip}</span>
            </span>
            <span className="font-mono text-[11px] text-white/55 uppercase">
              XPEL & 3M ACCREDITED STUDIO
            </span>
          </div>
        </div>
      </Reveal>

      {/* Three Detailed Coverage Package Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {(["front", "half", "full"] as const).map((key, idx) => {
          const pkg = dict.packages[key];
          const isSelected = selected === key;
          const isPopular = key === "half";

          const waMessage =
            locale === "ar"
              ? `مرحباً إنفينيتي برايت، أود الاستفسار وحجز باقة (${pkg.title}) مع الضمان المفتوح مدى الحياة وضمان البوية.`
              : `Hello INFINITE BRIGHT, I would like to inquire about booking the (${pkg.title}) PPF package with Open Lifetime Warranty.`;

          return (
            <Reveal key={key} delay={0.06 * (idx + 1)}>
              <div
                onClick={() => setSelected(key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(key);
                  }
                }}
                className={cn(
                  "flex h-full cursor-pointer flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-7",
                  isSelected
                    ? "border-2 border-[#FBE90A] bg-[var(--bg-surface)] shadow-[0_18px_48px_rgba(251,233,10,0.14)]"
                    : "border border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 hover:border-[#FBE90A]/55"
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <LuxuryIconBadge
                        icon={([Shield, ShieldCheck, Sparkles] as const)[idx % 3]}
                        size="sm"
                      />
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold",
                          isPopular || isSelected
                            ? "bg-[#FBE90A] text-[#060608]"
                            : "border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                        )}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--brand-accent-label)]">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-extrabold text-[var(--text-primary)] sm:text-2xl">
                      {pkg.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="border-t border-[var(--border-subtle)] pt-4">
                    <p className="mb-3 text-xs font-bold text-[var(--text-primary)]">
                      {dict.protectedZonesLabel}
                    </p>
                    <ul className="space-y-2">
                      {pkg.zones.map((zone, zIdx) => (
                        <li
                          key={zIdx}
                          className="flex items-start gap-2 text-xs font-medium text-[var(--text-primary)]/90 sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                          <span>{zone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 pt-2">
                  <a
                    href={buildWhatsAppUrl(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-xs font-bold transition-all duration-300 sm:text-sm",
                      isSelected || isPopular
                        ? "bg-[#FBE90A] text-[#060608] shadow-[0_8px_24px_rgba(251,233,10,0.22)] hover:bg-[#fff033]"
                        : "border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
                    )}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>{pkg.cta}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
