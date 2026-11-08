"use client";

import React, { useState } from "react";
import { CheckCircle2, Gift, Percent, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import { SAUDI_POPULAR_MODELS } from "@/data/colorStudioPalette";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface ExclusiveBundlesSectionProps {
  locale: Locale;
  dict: Dictionary["exclusiveBundles"];
}

export function ExclusiveBundlesSection({
  locale,
  dict,
}: ExclusiveBundlesSectionProps) {
  const [vehicleModel, setVehicleModel] = useState<string>("");
  const popularModels = SAUDI_POPULAR_MODELS[locale].slice(0, 8);

  return (
    <section
      id="bundles"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-24 sm:py-32"
    >
      {/* Subtle Studio Radial Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#FBE90A]/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Editorial Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/50 bg-[#FBE90A]/15 px-4 py-1.5 text-xs font-extrabold text-[var(--brand-accent-label)]">
              <Percent className="h-3.5 w-3.5" />
              <span>{dict.eyebrow}</span>
            </div>

            <h2 className="font-display text-3xl leading-[1.14] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.headline}
            </h2>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="inline-flex items-center gap-2.5 rounded-2xl border border-[#FBE90A]/45 bg-[var(--bg-surface)] px-5 py-3 shadow-sm">
              <Gift className="h-5 w-5 text-[var(--brand-accent-label)]" />
              <span className="text-xs font-extrabold text-[var(--text-primary)] sm:text-sm">
                {dict.giftHighlightLabel}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Optional Quick Vehicle Model Tagging Bar for Instant Bundle Quote */}
        <Reveal delay={0.1} className="mb-10">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5">
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="اكتب نوع وموديل سيارتك لحجز العرض (مثال: تورس / باترول / لكزس)..."
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#FBE90A] focus:outline-none sm:text-sm"
            />
          </div>
        </Reveal>

        {/* Three 35% OFF + Free Gift Bundled Packages Grid */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {dict.bundles.map((bundle, idx) => {
            const isRoyal = bundle.featured;

            const waMsg =
              locale === "ar"
                ? `مرحباً إنفينيتي برايت، أود الاستفادة من عرض الـ 35% وحجز:\n• الباقة: ${bundle.title} (${bundle.discount} + هدية مجانية)${
                    vehicleModel.trim() ? `\n• السيارة: ${vehicleModel.trim()}` : ""
                  }`
                : `Hello INFINITE BRIGHT, I would like to claim the 35% OFF offer for:\n• Bundle: ${bundle.title} (${bundle.discount} + Complimentary Gift)${
                    vehicleModel.trim() ? `\n• Vehicle: ${vehicleModel.trim()}` : ""
                  }`;

            return (
              <Reveal key={bundle.id} delay={0.07 * (idx + 1)}>
                <div
                  className={cn(
                    "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-300 sm:p-8",
                    isRoyal
                      ? "border-2 border-[#FBE90A] bg-[var(--bg-surface)] shadow-[0_22px_60px_rgba(251,233,10,0.14)]"
                      : "border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[var(--shadow-elevated)] hover:border-[#FBE90A]/75"
                  )}
                >
                  {/* Top Discount & Tier Header */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-extrabold",
                          isRoyal
                            ? "bg-[#FBE90A] text-[#060608]"
                            : "border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                        )}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{bundle.tierTag}</span>
                      </span>

                      {/* Bold 35% OFF Ribbon Pill */}
                      <span className="inline-flex items-center rounded-xl bg-[#FBE90A] px-3.5 py-1.5 font-display text-sm font-black text-[#060608] shadow-[0_6px_18px_rgba(251,233,10,0.3)]">
                        {bundle.discount}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl leading-snug font-extrabold text-[var(--text-primary)] sm:text-2xl">
                        {bundle.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {bundle.subtitle}
                      </p>
                    </div>

                    {/* Free Gift Highlight Banner */}
                    <div className="flex items-center gap-2.5 rounded-2xl border border-[#FBE90A]/45 bg-[#FBE90A]/10 px-4 py-3">
                      <Gift className="h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                      <span className="text-xs font-extrabold text-[var(--text-primary)]">
                        {bundle.giftText}
                      </span>
                    </div>

                    {/* Detailed Inclusions Checklist */}
                    <div className="border-t border-[var(--border-subtle)] pt-4">
                      <p className="mb-3 text-xs font-extrabold text-[var(--text-primary)]">
                        {dict.includesLabel}
                      </p>
                      <ul className="space-y-2.5">
                        {bundle.items.map((item, iIdx) => (
                          <li
                            key={iIdx}
                            className="flex items-start gap-2.5 text-xs leading-relaxed font-medium text-[var(--text-primary)]/90 sm:text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Warranty Strip & WhatsApp Booking CTA */}
                  <div className="mt-8 space-y-4 border-t border-[var(--border-subtle)] pt-5">
                    <p className="flex items-start gap-2 text-[11px] font-semibold text-[var(--text-secondary)]">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                      <span>{dict.warrantyNote}</span>
                    </p>

                    <a
                      href={buildWhatsAppUrl(waMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-xs font-extrabold uppercase transition-all duration-300 sm:text-sm",
                        isRoyal
                          ? "bg-[#FBE90A] text-[#060608] shadow-[0_10px_28px_rgba(251,233,10,0.28)] hover:bg-[#fff033]"
                          : "border-2 border-[#FBE90A] bg-[#FBE90A]/12 text-[var(--text-primary)] hover:bg-[#FBE90A] hover:text-[#060608]"
                      )}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span>{bundle.cta}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
