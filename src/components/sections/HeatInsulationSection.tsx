"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Volume2,
  VolumeX,
} from "lucide-react";
import { BUSINESS_CONFIG, buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface HeatInsulationSectionProps {
  locale: Locale;
  dict: Dictionary["heatExperience"];
}

export function HeatInsulationSection({
  locale,
  dict,
}: HeatInsulationSectionProps) {
  const isAr = locale === "ar";
  const prefersReduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Playback control
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Performance-optimized viewport observer (autoplay muted when in view, pause when out)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25, rootMargin: "60px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReduced]);
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

        {/* ========================================================================= */}
        {/* Dedicated Thermal Insulation Installation Video (Land Cruiser 300 - 2026) */}
        {/* ========================================================================= */}
        <Reveal className="mb-20 space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
                <span className="h-2 w-2 rounded-full bg-[#FBE90A] animate-pulse" />
                <span>{dict.videoBadge}</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                {dict.videoHeading}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {dict.videoDescription}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 text-[#FBE90A]" />
              <span>{dict.videoTag}</span>
            </span>
          </div>

          <div
            ref={containerRef}
            className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[#07080b] shadow-[var(--shadow-elevated)]"
          >
            <video
              ref={videoRef}
              src="/videos/Technician_installing_window_film_ae402102_1080p.mp4"
              poster="/images/services/window-tinting.jpg"
              playsInline
              muted={isMuted}
              loop
              preload="none"
              className="h-full w-full object-cover cursor-pointer"
              onClick={togglePlay}
            />

            {/* Subtle Gradient Overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

            {/* Top Corner Live Badges */}
            <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isAr ? "تويوتا لاند كروزر 300 (2026)" : "Toyota Land Cruiser 300 (2026)"}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
                <span>{isAr ? "تركيب داخلي محمي 100%" : "Protected Interior Installation"}</span>
              </span>
            </div>

            {/* Center Play Button Overlay (when paused) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isAr ? "تشغيل الفيديو" : "Play video"}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBE90A] text-[#060608] shadow-[0_8px_32px_rgba(251,233,10,0.45)] transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
                  <Play className="ms-1 h-8 w-8 fill-current sm:h-9 sm:w-9" />
                </span>
              </button>
            )}

            {/* Bottom Controls Strip */}
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? (isAr ? "إيقاف مؤقت" : "Pause") : (isAr ? "تشغيل الفيديو" : "Play video")}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>{isAr ? "إيقاف مؤقت" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>{isAr ? "تشغيل الفيديو" : "Play Video"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? (isAr ? "تشغيل الصوت" : "Unmute") : (isAr ? "كتم الصوت" : "Mute")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-all hover:border-[#FBE90A] hover:text-[#FBE90A]"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </Reveal>

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
