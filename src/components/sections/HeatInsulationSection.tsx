import React from "react";
import Image from "next/image";
import { ArrowUpRight, Award, CheckCircle2, ShieldCheck, Sparkles, SunMedium } from "lucide-react";
import { BUSINESS_CONFIG, buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";
import { TintShadeSimulator } from "@/components/sections/TintShadeSimulator";

interface HeatInsulationSectionProps {
  locale: Locale;
  dict: Dictionary["heatExperience"];
  tintSimulatorDict: Dictionary["tintSimulator"];
}

export function HeatInsulationSection({
  locale,
  dict,
  tintSimulatorDict,
}: HeatInsulationSectionProps) {
  const waGeneralHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن أنظمة العزل الحراري وتظليل النوافذ (Ultra Core 85% / Core Plus 65%)."
      : "Hello INFINITE BRIGHT, I would like to inquire about Window Tinting & Heat Insulation (Ultra Core 85% / Core Plus 65%)."
  );

  const waUltraCoreHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز عزل حراري وتظليل فئة Ultra Core (عزل 85% — متاح بجميع درجاته)."
      : "Hello INFINITE BRIGHT, I would like to inquire about Ultra Core Thermal Insulation (85% heat rejection — all shades)."
  );

  const waCorePlusHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز عزل حراري وتظليل فئة Core Plus (عزل 65%)."
      : "Hello INFINITE BRIGHT, I would like to inquire about Core Plus Thermal Insulation (65% heat rejection)."
  );

  const ultraShades = BUSINESS_CONFIG.thermalTiers[0].shades;

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top Editorial Intro */}
        <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <Reveal className="space-y-4 lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              <SunMedium className="h-4 w-4" />
              <span>{dict.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.26]">
              {dict.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 lg:col-span-5">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
            <a
              href={waGeneralHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.15em] text-[var(--text-primary)] uppercase transition-colors hover:text-[var(--brand-accent-label)] rtl:text-sm rtl:tracking-normal"
            >
              <span className="border-b border-[#FBE90A] pb-1">{dict.cta}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
          </Reveal>
        </div>

        {/* Official Thermal Insulation Tiers Comparison: Ultra Core (85%) vs Core Plus (65%) */}
        <div className="mb-14 space-y-6">
          <Reveal className="space-y-1.5">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
              {dict.tiersHeading}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] sm:text-sm">
              {dict.tiersSubheading}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tier 1: Ultra Core — 85% Heat Insulation (All Shades Available) */}
            <Reveal delay={0.06}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#FBE90A] bg-[var(--bg-canvas)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <LuxuryIconBadge icon={ShieldCheck} size="sm" />
                      <span className="inline-flex items-center rounded-full bg-[#FBE90A] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#060608] uppercase rtl:tracking-normal">
                        <span>{dict.tiers.ultraCore.badge}</span>
                      </span>
                    </div>
                    <span
                      dir="ltr"
                      className="font-display text-4xl font-extrabold text-[var(--brand-accent-label)] sm:text-5xl"
                    >
                      {dict.tiers.ultraCore.rejectionValue}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        dir="ltr"
                        className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
                      >
                        {dict.tiers.ultraCore.name}
                      </h4>
                      <span className="text-xs font-semibold text-[var(--text-muted)]">
                        {dict.tiers.ultraCore.rejectionLabel}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {dict.tiers.ultraCore.desc}
                    </p>
                  </div>

                  {/* All Tint Shades Selector Visual */}
                  <div className="space-y-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                      <span>{dict.tiers.ultraCore.shadesNote}</span>
                    </p>
                    <div dir="ltr" className="flex flex-wrap gap-2 pt-1">
                      {ultraShades.map((shade) => (
                        <span
                          key={shade}
                          className="rounded-lg border border-[#FBE90A]/45 bg-[var(--bg-canvas)] px-3 py-1 font-mono text-xs font-bold text-[var(--text-primary)]"
                        >
                          {shade}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-2">
                  <a
                    href={waUltraCoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-[#060608] uppercase shadow-[0_8px_24px_rgba(251,233,10,0.24)] transition-all duration-300 hover:bg-[#fff033] rtl:text-sm rtl:tracking-normal"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>{dict.tiers.ultraCore.cta}</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Tier 2: Core Plus — 65% Heat Insulation */}
            <Reveal delay={0.12}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <LuxuryIconBadge icon={SunMedium} size="sm" />
                      <span className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase rtl:tracking-normal">
                        <span>{dict.tiers.corePlus.badge}</span>
                      </span>
                    </div>
                    <span
                      dir="ltr"
                      className="font-display text-4xl font-extrabold text-[var(--text-primary)] sm:text-5xl"
                    >
                      {dict.tiers.corePlus.rejectionValue}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        dir="ltr"
                        className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
                      >
                        {dict.tiers.corePlus.name}
                      </h4>
                      <span className="text-xs font-semibold text-[var(--text-muted)]">
                        {dict.tiers.corePlus.rejectionLabel}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {dict.tiers.corePlus.desc}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                      <span>{dict.tiers.corePlus.shadesNote}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-7 pt-2">
                  <a
                    href={waCorePlusHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-[var(--text-primary)] uppercase transition-all duration-300 hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608] rtl:text-sm rtl:tracking-normal"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>{dict.tiers.corePlus.cta}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Interactive Live Window Tint Shade Simulator */}
        <TintShadeSimulator locale={locale} dict={tintSimulatorDict} />

        {/* Wide Cabin Thermal Sanctuary Showcase */}
        <ImageReveal className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#070709] shadow-[var(--shadow-elevated)]">
          <Image
            src="/images/services/heat-insulation.jpg"
            alt="Thermally insulated luxury coupe cabin inside INFINITE BRIGHT showroom"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute bottom-5 start-5 end-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-white/15 bg-black/65 px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] text-[#FBE90A] uppercase backdrop-blur-md">
              ULTRA CORE 85% · CORE PLUS 65%
            </span>
          </div>
        </ImageReveal>

        {/* 4 Architectural Thermal Pillars */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.benefits.map((benefit, idx) => {
            const thermalIcons = [SunMedium, ShieldCheck, Sparkles, Award];
            const Icon = thermalIcons[idx % thermalIcons.length];
            return (
              <Reveal key={idx} delay={0.06 * (idx + 1)}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 transition-all duration-300 hover:border-[#FBE90A]/60">
                  <div>
                    <div className="flex items-center justify-between">
                      <LuxuryIconBadge icon={Icon} size="sm" />
                      <span className="font-mono text-xs font-bold text-[var(--brand-accent-label)]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[var(--text-primary)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {benefit.detail}
                    </p>
                  </div>
                  <div className="mt-6 h-[2px] w-8 bg-[#FBE90A] transition-all duration-300 group-hover:w-16" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
