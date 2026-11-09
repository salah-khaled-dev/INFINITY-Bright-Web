"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, ShieldCheck, Sparkles, Check, X, Minus } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

type PackageKey = "front" | "half" | "full";

interface ComparisonRow {
  name: { ar: string; en: string };
  isWarranty?: boolean;
  front: { status: "full" | "partial" | "none"; label: { ar: string; en: string } };
  half: { status: "full" | "partial" | "none"; label: { ar: string; en: string } };
  full: { status: "full" | "partial" | "none"; label: { ar: string; en: string } };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    name: { ar: "الصدام الأمامي والأنوار والكشافات", en: "Front Bumper & Headlights" },
    front: { status: "full", label: { ar: "مشمول بالكامل", en: "Full Coverage" } },
    half: { status: "full", label: { ar: "مشمول بالكامل", en: "Full Coverage" } },
    full: { status: "full", label: { ar: "مشمول بالكامل", en: "Full Coverage" } },
  },
  {
    name: { ar: "الكبوت الأمامي", en: "Front Hood" },
    front: { status: "partial", label: { ar: "40 سم أمامي", en: "Front 40cm" } },
    half: { status: "full", label: { ar: "كامل الكبوت", en: "Full Hood" } },
    full: { status: "full", label: { ar: "كامل الكبوت", en: "Full Hood" } },
  },
  {
    name: { ar: "الرفارف الأمامية", en: "Front Fenders" },
    front: { status: "partial", label: { ar: "40 سم أمامي", en: "Front 40cm" } },
    half: { status: "full", label: { ar: "كاملة", en: "Full Fenders" } },
    full: { status: "full", label: { ar: "كاملة", en: "Full Fenders" } },
  },
  {
    name: { ar: "مرايا السيارة وقوائم الزجاج (الأكتاف)", en: "Side Mirrors & A-Pillars" },
    front: { status: "full", label: { ar: "مشمولة", en: "Included" } },
    half: { status: "full", label: { ar: "مشمولة", en: "Included" } },
    full: { status: "full", label: { ar: "مشمولة", en: "Included" } },
  },
  {
    name: { ar: "مساكات الأبواب وأطراف الأبواب", en: "Door Cups & Door Edges" },
    front: { status: "full", label: { ar: "مشمولة", en: "Included" } },
    half: { status: "full", label: { ar: "مشمولة", en: "Included" } },
    full: { status: "full", label: { ar: "مشمولة", en: "Included" } },
  },
  {
    name: { ar: "غطاء تانك البنزين", en: "Fuel Tank Flap" },
    front: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    half: { status: "full", label: { ar: "مشمول", en: "Included" } },
    full: { status: "full", label: { ar: "مشمول", en: "Included" } },
  },
  {
    name: { ar: "الأبواب الجانبية بالكامل (4 أبواب)", en: "Full Side Doors (4 Doors)" },
    front: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    half: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    full: { status: "full", label: { ar: "مشمولة بالكامل", en: "Full Coverage" } },
  },
  {
    name: { ar: "الرفارف الخلفية وأكتاف السقف", en: "Rear Quarters & Pillars" },
    front: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    half: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    full: { status: "full", label: { ar: "مشمولة بالكامل", en: "Full Coverage" } },
  },
  {
    name: { ar: "سقف السيارة والشنطة الخلفية", en: "Roof & Trunk Lid" },
    front: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    half: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    full: { status: "full", label: { ar: "مشمولة بالكامل", en: "Full Coverage" } },
  },
  {
    name: { ar: "الصدام الخلفي وحافة التحميل", en: "Rear Bumper & Trunk Lip" },
    front: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    half: { status: "none", label: { ar: "غير مشمول", en: "Not Included" } },
    full: { status: "full", label: { ar: "مشمول بالكامل", en: "Full Coverage" } },
  },
  {
    name: { ar: "الضمان المفتوح مدى الحياة", en: "Open Lifetime PPF Warranty" },
    isWarranty: true,
    front: { status: "full", label: { ar: "معتمد رسمياً", en: "Official Lifetime" } },
    half: { status: "full", label: { ar: "معتمد رسمياً", en: "Official Lifetime" } },
    full: { status: "full", label: { ar: "معتمد رسمياً", en: "Official Lifetime" } },
  },
  {
    name: { ar: "ضمان سلامة بوية الوكالة 100% عند الفك", en: "Safe OEM Paint Removal Guarantee" },
    isWarranty: true,
    front: { status: "full", label: { ar: "مضمون 100%", en: "100% Guaranteed" } },
    half: { status: "full", label: { ar: "مضمون 100%", en: "100% Guaranteed" } },
    full: { status: "full", label: { ar: "مضمون 100%", en: "100% Guaranteed" } },
  },
  {
    name: { ar: "ميزة ضمان الحوادث 50% (تحمل نصف تكلفة التغيير للقطعة المتضررة كالصدام أو الرفرف أو الباب)", en: "50% Accident Replacement (Pay 50% on damaged panels)" },
    isWarranty: true,
    front: { status: "full", label: { ar: "50% فقط للقطعة المتضررة", en: "50% Only on Damaged Part" } },
    half: { status: "full", label: { ar: "50% فقط للقطعة المتضررة", en: "50% Only on Damaged Part" } },
    full: { status: "full", label: { ar: "50% فقط للقطعة المتضررة", en: "50% Only on Damaged Part" } },
  },
];

function StatusBadge({
  status,
  text,
  isHighlight = false,
}: {
  status: "full" | "partial" | "none";
  text: string;
  isHighlight?: boolean;
}) {
  if (status === "full") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
          isHighlight
            ? "bg-[var(--brand-yellow)] text-[#242522] shadow-xs"
            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        )}
      >
        <Check className="h-3.5 w-3.5 shrink-0" />
        <span>{text}</span>
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
        <Minus className="h-3.5 w-3.5 shrink-0" />
        <span>{text}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-canvas)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]">
      <X className="h-3.5 w-3.5 shrink-0 opacity-60" />
      <span>{text}</span>
    </span>
  );
}

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

  const activeFill = "rgba(232, 201, 0, 0.28)";
  const activeStroke = "#E8C900";
  const inactiveFill = "rgba(255, 255, 255, 0.03)";
  const inactiveStroke = "rgba(255, 255, 255, 0.16)";

  return (
    <div className={cn("w-full", compactTop ? "pt-16 sm:pt-20" : "py-20 sm:py-28")}>
      {/* Header */}
      <Reveal className="mb-10 max-w-3xl space-y-3.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-yellow)]/40 bg-[var(--brand-yellow)]/10 px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
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
        <div className="mb-8 overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[#151614] p-5 text-white shadow-[var(--shadow-elevated)] sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider text-[var(--brand-yellow)] uppercase">
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
                        ? "bg-[var(--brand-yellow)] text-[#242522] shadow-xs"
                        : "border border-white/15 bg-white/5 text-white/80 hover:border-[var(--brand-yellow)]/60 hover:text-white"
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
                    floodColor="#E8C900"
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
                    stroke="#E8C900"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                  <rect x="150" y="13" width="52" height="19" rx="9" fill="#E8C900" />
                  <text
                    x="176"
                    y="26"
                    textAnchor="middle"
                    fill="#242522"
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
                fill="#E8C900"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <path
                d="M 78,202 Q 104,214 132,208 Q 124,192 94,188 Z"
                fill="#E8C900"
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
                fill={isFrontCovered ? "#E8C900" : inactiveFill}
                className="transition-all duration-300"
              />
              <path
                d="M 256,196 L 332,206 L 332,197 L 256,189 Z"
                fill={isFrontCovered ? "#E8C900" : inactiveFill}
                className="transition-all duration-300"
              />

              {/* Side Mirrors */}
              <path
                d="M 278,48 Q 292,30 304,38 L 298,54 Z"
                fill={isFullHoodAndFenders ? activeFill : "rgba(232,201,0,0.22)"}
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
              <rect x="374" y="54" width="22" height="7" rx="3.5" fill="#E8C900" />
              <rect x="374" y="219" width="22" height="7" rx="3.5" fill="#E8C900" />

              {/* 8. DOOR EDGES (أطراف الأبواب) — Covered in ALL 3 Packages */}
              <line x1="432" y1="48" x2="432" y2="75" stroke="#E8C900" strokeWidth="3" />
              <line x1="432" y1="205" x2="432" y2="232" stroke="#E8C900" strokeWidth="3" />

              {/* 9. FUEL TANK FLAP (تانك البنزين) — Covered in Half-Front & Full-Body */}
              <circle
                cx="512"
                cy="62"
                r="8"
                fill={isFuelFlapCovered ? "#E8C900" : "rgba(255,255,255,0.06)"}
                stroke={isFuelFlapCovered ? "#ffffff" : "rgba(255,255,255,0.2)"}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Bottom Warranty Strip inside Blueprint */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/75">
            <span className="inline-flex items-center gap-2 font-semibold text-[var(--brand-yellow)]">
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
              : `Hello INFINITY BRIGHT, I would like to inquire about booking the (${pkg.title}) PPF package with Open Lifetime Warranty.`;

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
                    ? "border-2 border-[var(--brand-yellow)] bg-[var(--bg-surface)] shadow-[var(--shadow-elevated)]"
                    : "border border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 hover:border-[var(--brand-yellow)]/55"
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
                            ? "bg-[var(--brand-yellow)] text-[#242522]"
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
                        ? "bg-[var(--brand-yellow)] text-[#242522] shadow-xs hover:bg-[var(--brand-yellow-hover)]"
                        : "border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-yellow)] hover:bg-[var(--bg-surface)]"
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

      {/* Detailed Coverage Comparison Matrix (Inclusions vs Exclusions) */}
      <Reveal delay={0.12} className="mt-14 sm:mt-20">
        <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]">
          {/* Header */}
          <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/60 px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-yellow)]/40 bg-[var(--brand-yellow)]/10 px-3 py-0.5 text-[11px] font-bold text-[var(--brand-accent-label)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{locale === "ar" ? "مقارنة شفافة ومعتمدة" : "Verified Comparison"}</span>
                </span>
                <h4 className="mt-2 font-display text-xl font-extrabold text-[var(--text-primary)] sm:text-2xl">
                  {locale === "ar"
                    ? "جدول مقارنة باقات الحماية (ما تشمله وما لا تشمله كل باقة)"
                    : "Detailed Coverage Comparison Matrix (Inclusions vs Exclusions)"}
                </h4>
                <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
                  {locale === "ar"
                    ? "تحديد دقيق لأجزاء السيارة المشمولة في كل باقة، مع بيان مزايا الضمان الذهبي وضمان الحوادث 50% المشمولة في كافة الباقات."
                    : "Clear breakdown of covered vehicle zones across all packages, highlighting our open lifetime warranty and 50% accident care."}
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
                  <Check className="h-4 w-4" />
                  <span>{locale === "ar" ? "مشمول بالكامل" : "Full Coverage"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-amber-500">
                  <Minus className="h-4 w-4" />
                  <span>{locale === "ar" ? "مشمول جزئياً" : "Partial"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-muted)]">
                  <X className="h-4 w-4" />
                  <span>{locale === "ar" ? "غير مشمول" : "Not Included"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Responsive Scrollable Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-start text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/40 text-[var(--text-secondary)]">
                  <th scope="col" className="p-4 sm:p-5 text-start font-bold">
                    {locale === "ar" ? "القطعة / ميزة الضمان" : "Panel / Warranty Feature"}
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-center font-bold">
                    <span className="block text-[var(--text-primary)] font-extrabold">{dict.packages.front.title}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{dict.packages.front.badge}</span>
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-center font-bold bg-[var(--brand-yellow)]/5 border-x border-[var(--brand-yellow)]/20">
                    <span className="block text-[var(--brand-accent-label)] font-extrabold">{dict.packages.half.title}</span>
                    <span className="text-[11px] text-[var(--brand-accent-label)]">{dict.packages.half.badge}</span>
                  </th>
                  <th scope="col" className="p-4 sm:p-5 text-center font-bold">
                    <span className="block text-[var(--text-primary)] font-extrabold">{dict.packages.full.title}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{dict.packages.full.badge}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {COMPARISON_ROWS.map((row, rIdx) => {
                  const isWarrantyRow = row.isWarranty;
                  return (
                    <tr
                      key={rIdx}
                      className={cn(
                        "transition-colors hover:bg-[var(--bg-canvas)]/50",
                        isWarrantyRow && "bg-[var(--brand-accent)]/5 font-semibold"
                      )}
                    >
                      <td className="p-4 sm:p-5 font-medium text-[var(--text-primary)]">
                        <div className="flex items-center gap-2">
                          {isWarrantyRow ? (
                            <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                          )}
                          <span>{locale === "ar" ? row.name.ar : row.name.en}</span>
                        </div>
                      </td>

                      {/* Front Package */}
                      <td className="p-4 sm:p-5 text-center">
                        <StatusBadge status={row.front.status} text={locale === "ar" ? row.front.label.ar : row.front.label.en} />
                      </td>

                      {/* Half-Front Package (Popular - Highlighted) */}
                      <td className="p-4 sm:p-5 text-center bg-[var(--brand-yellow)]/5 border-x border-[var(--brand-yellow)]/20">
                        <StatusBadge status={row.half.status} text={locale === "ar" ? row.half.label.ar : row.half.label.en} isHighlight />
                      </td>

                      {/* Full Body Package */}
                      <td className="p-4 sm:p-5 text-center">
                        <StatusBadge status={row.full.status} text={locale === "ar" ? row.full.label.ar : row.full.label.en} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note on the 50% accident discount */}
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]/40 p-4 sm:p-5 text-xs text-[var(--text-secondary)]">
            <p className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
              <span>
                {locale === "ar"
                  ? "ملاحظة مهمة: ميزة ضمان الحوادث 50% تضمن لك في حال تضرر أي جزء من الحماية (كالصدام أو الرفرف أو الباب) بسبب صدمة أو حادث لا قدر الله، دفع 50% فقط من تكلفة إعادة تركيب وتغيير الفيلم للقطعة المتضررة دون تحميلك التكلفة كاملة."
                  : "Important: Our 50% Accident Care ensures that if any protected panel (such as a bumper, fender, or door) is damaged in a collision, you pay only 50% of the replacement installation fee for that specific panel."}
              </span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
