"use client";

import React, { useMemo, useState } from "react";
import { Check, ShieldCheck, SunMedium } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import { SAUDI_POPULAR_MODELS } from "@/data/colorStudioPalette";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface TintShadeSimulatorProps {
  locale: Locale;
  dict: Dictionary["tintSimulator"];
}

export function TintShadeSimulator({ locale, dict }: TintShadeSimulatorProps) {
  const [selectedTier, setSelectedTier] = useState<"ultraCore" | "corePlus">(
    "ultraCore"
  );
  const [selectedShadeIndex, setSelectedShadeIndex] = useState<number>(3); // Default: 35% (02)
  const [vehicleModel, setVehicleModel] = useState<string>("");

  const activeShade =
    dict.shades[selectedShadeIndex] ?? dict.shades[0];

  const heatRejection = selectedTier === "ultraCore" ? "85%" : "65%";
  const tierName = selectedTier === "ultraCore" ? "Ultra Core" : "Core Plus";

  const waMessage = useMemo(() => {
    const carLine = vehicleModel.trim()
      ? locale === "ar"
        ? `\n• السيارة: ${vehicleModel.trim()}`
        : `\n• Vehicle: ${vehicleModel.trim()}`
      : "";

    return locale === "ar"
      ? `مرحباً إنفينيتي برايت، أود حجز باقة العزل الحراري والتظليل (بضمان 10 سنوات):${carLine}\n• الفئة: ${tierName} (عزل ${heatRejection})\n• الدرجة المختارة: ${activeShade.name}`
      : `Hello INFINITE BRIGHT, I would like to book 10-Year Warranted Window Tinting:${carLine}\n• Series: ${tierName} (${heatRejection} Heat Rejection)\n• Selected Shade: ${activeShade.name}`;
  }, [locale, vehicleModel, tierName, heatRejection, activeShade.name]);

  const popularModels = SAUDI_POPULAR_MODELS[locale].slice(0, 6);

  return (
    <div className="mb-16 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] p-5 shadow-[var(--shadow-elevated)] sm:p-8 lg:p-10">
      <Reveal className="mb-8 max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/10 px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
          <SunMedium className="h-3.5 w-3.5" />
          <span>{dict.eyebrow}</span>
        </div>
        <h3 className="font-display text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          {dict.headline}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          {dict.description}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Live Optical Window-Masked Showroom Preview */}
        <div className="space-y-4 lg:col-span-7">
          <div
            dir="ltr"
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#07080b] shadow-lg"
          >
            {/* Base Untinted Showroom Car */}
            <img
              src="/images/before-after/tinting-before.jpg"
              alt={activeShade.name}
              className="h-full w-full object-cover select-none"
            />

            {/* Optical Window-Only Tint Layer (Strictly Masked to Windshield & Side Glass) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-colors duration-350 ease-out"
              style={{
                backgroundColor: activeShade.tintColor,
                maskImage: "url('/images/studio/car-windows-mask.png')",
                WebkitMaskImage: "url('/images/studio/car-windows-mask.png')",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />

            {/* Preserved Glass Ceiling LED Reflections */}
            <img
              src="/images/studio/car-windows-highlights.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              style={{
                mixBlendMode: "screen",
                opacity: activeShade.highlightBoost,
              }}
            />

            {/* Live Telemetry Overlay */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2"
            >
              <span className="rounded-full bg-[#FBE90A] px-3.5 py-1 text-xs font-extrabold text-[#060608] shadow">
                {tierName} ({heatRejection}) · {activeShade.code}
              </span>
              {vehicleModel.trim() && (
                <span className="rounded-full border border-white/20 bg-black/75 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {vehicleModel.trim()}
                </span>
              )}
            </div>
          </div>

          {/* 4 Live Performance Telemetry Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-center">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                {dict.metrics.heatRejection}
              </p>
              <p
                dir="ltr"
                className="mt-1 font-display text-xl font-extrabold text-[var(--brand-accent-label)]"
              >
                {activeShade.id === "untinted" ? "0%" : heatRejection}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-center">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                {dict.metrics.vlt}
              </p>
              <p
                dir="ltr"
                className="mt-1 font-display text-xl font-extrabold text-[var(--text-primary)]"
              >
                {activeShade.vlt}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-center">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                {dict.metrics.uvRejection}
              </p>
              <p
                dir="ltr"
                className="mt-1 font-display text-xl font-extrabold text-[var(--text-primary)]"
              >
                {activeShade.id === "untinted" ? "15%" : "99%"}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-center">
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">
                {dict.metrics.warranty}
              </p>
              <p className="mt-1 font-display text-lg font-extrabold text-[var(--brand-accent-label)]">
                {dict.metrics.tenYears}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Shade & Tier Controls */}
        <div className="space-y-5 lg:col-span-5">
          {/* 1. Tier Toggle */}
          <div className="space-y-2.5">
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              {dict.tierLabel}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedTier("ultraCore")}
                className={cn(
                  "cursor-pointer rounded-2xl border p-3.5 text-start transition-all",
                  selectedTier === "ultraCore"
                    ? "border-2 border-[#FBE90A] bg-[var(--bg-surface)] shadow-sm"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 hover:border-[#FBE90A]/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span dir="ltr" className="font-display text-sm font-extrabold text-[var(--text-primary)]">
                    Ultra Core
                  </span>
                  <span dir="ltr" className="font-mono text-sm font-extrabold text-[var(--brand-accent-label)]">
                    85%
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-accent-label)]" />
                  <span>{dict.metrics.tenYears}</span>
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier("corePlus")}
                className={cn(
                  "cursor-pointer rounded-2xl border p-3.5 text-start transition-all",
                  selectedTier === "corePlus"
                    ? "border-2 border-[#FBE90A] bg-[var(--bg-surface)] shadow-sm"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 hover:border-[#FBE90A]/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span dir="ltr" className="font-display text-sm font-extrabold text-[var(--text-primary)]">
                    Core Plus
                  </span>
                  <span dir="ltr" className="font-mono text-sm font-extrabold text-[var(--text-primary)]">
                    65%
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-accent-label)]" />
                  <span>{dict.metrics.tenYears}</span>
                </p>
              </button>
            </div>
          </div>

          {/* 2. Shade Selector Grid */}
          <div className="space-y-2.5">
            <p className="text-xs font-extrabold text-[var(--text-primary)]">
              {dict.shadeLabel}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {dict.shades.map((sh, idx) => {
                const active = selectedShadeIndex === idx;
                return (
                  <button
                    key={sh.id}
                    type="button"
                    onClick={() => setSelectedShadeIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-start transition-all",
                      active
                        ? "border-2 border-[#FBE90A] bg-[var(--bg-surface)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/65 hover:border-[#FBE90A]/50"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="h-6 w-6 shrink-0 rounded-full border border-[var(--border-strong)]"
                        style={{
                          background:
                            sh.id === "untinted"
                              ? "linear-gradient(135deg, #d7e4ef 0%, #8ea4b8 100%)"
                              : `linear-gradient(135deg, rgba(255,255,255,0.22), transparent), ${sh.tintColor.replace(/[\d.]+\)$/, "0.95)")}`,
                          backgroundColor: "#1a222d",
                        }}
                      />
                      <span className="truncate text-xs font-bold text-[var(--text-primary)]">
                        {sh.code}
                      </span>
                    </div>
                    {active && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--brand-accent-label)]" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-xs text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">
                {activeShade.name}:{" "}
              </strong>
              {activeShade.note}
            </p>
          </div>

          {/* 3. Optional Vehicle Input */}
          <div className="space-y-2">
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="اكتب نوع وموديل سيارتك..."
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#FBE90A] focus:outline-none"
            />
          </div>

          {/* 4. WhatsApp CTA */}
          <a
            href={buildWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-extrabold text-[#060608] uppercase shadow-[0_10px_28px_rgba(251,233,10,0.25)] transition-all hover:bg-[#fff033] sm:text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{dict.ctaWhatsapp}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
