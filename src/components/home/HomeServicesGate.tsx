"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Percent, ShieldCheck, Sparkles, SunMedium } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface HomeServicesGateProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    description: string;
    viewAllServices: string;
    cards: {
      ppf: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      tinting: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      ceramic: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      bundles: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
    };
  };
}

export function HomeServicesGate({ locale, dict }: HomeServicesGateProps) {
  const isAr = locale === "ar";

  const ppf = {
    data: dict.cards.ppf,
    image: "/images/services/ppf-installation.jpg",
    href: `${localizedHref(locale, "services")}#ppf`,
    icon: ShieldCheck,
    waMessage: isAr
      ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز باقة حماية الطلاء PPF (ضمان مفتوح مدى الحياة)."
      : "Hello INFINITE BRIGHT, I would like to inquire about Paint Protection Film (PPF) packages.",
  };

  const tinting = {
    data: dict.cards.tinting,
    image: "/images/services/window-tinting.jpg",
    href: `${localizedHref(locale, "services")}#window-tinting`,
    icon: SunMedium,
    waMessage: isAr
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن عزل وتظليل Ultra Core (عزل 85% لجميع الدرجات — ضمان 10 سنوات)."
      : "Hello INFINITE BRIGHT, I would like to inquire about Ultra Core 85% Thermal Insulation.",
  };

  const ceramic = {
    data: dict.cards.ceramic,
    image: "/images/services/ceramic-coating.jpg",
    href: `${localizedHref(locale, "services")}#ceramic-coating`,
    icon: Sparkles,
    waMessage: isAr
      ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز خدمة النانو سيراميك الداخلي والخارجي."
      : "Hello INFINITE BRIGHT, I would like to inquire about Nano Ceramic packages.",
  };

  const bundles = {
    data: dict.cards.bundles,
    image: "/images/services/paint-protection.jpg",
    href: `${localizedHref(locale, "services")}#bundles`,
    icon: Percent,
    waMessage: isAr
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن باقات VIP الحصرية (خصم 35% + هدية خاصة)."
      : "Hello INFINITE BRIGHT, I would like to inquire about the Exclusive VIP 35% Bundles.",
  };

  return (
    <section
      id="services-overview"
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Editorial Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                {dict.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href={localizedHref(locale, "services")}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-xs font-extrabold tracking-wider text-[var(--text-primary)] uppercase transition-all duration-300 hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
            >
              <span>{dict.viewAllServices}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetrical Luxury Automotive Editorial Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ========================================================================= */}
          {/* 1. Primary Flagship Feature — PPF Armor (Spans 7 Columns)                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <Reveal className="h-full">
              <article className="group relative flex h-full min-h-[500px] flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[#07080b] p-6 sm:p-8 lg:p-10 shadow-[var(--shadow-elevated)] transition-all duration-500 hover:border-[#FBE90A]/70">
                {/* Full-Bleed Cinematic Background Image with Smooth Hover Physics */}
                <Image
                  src={ppf.image}
                  alt={ppf.data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                {/* Deep Multi-Stop Luxury Gradient Veil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />

                {/* Top Editorial Badges */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#FBE90A] animate-pulse" />
                    <span>{ppf.data.tag}</span>
                  </div>

                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-[#FBE90A] shadow-sm backdrop-blur-md">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>

                {/* Bottom Storytelling Content */}
                <div className="relative z-10 mt-28 space-y-4 sm:mt-36">
                  <div className="space-y-2">
                    <span className="inline-block rounded-md bg-[#FBE90A] px-2.5 py-1 font-mono text-[10px] font-black tracking-wider text-[#060608] uppercase">
                      {ppf.data.badge}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {ppf.data.title}
                    </h3>
                    <p className="max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm">
                      {ppf.data.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={ppf.href}
                      className="group/btn inline-flex items-center gap-2.5 rounded-xl bg-[#FBE90A] px-5 py-3.5 text-xs font-extrabold text-[#060608] uppercase shadow-[0_6px_20px_rgba(251,233,10,0.25)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_10px_28px_rgba(251,233,10,0.35)]"
                    >
                      <span>{ppf.data.cta}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                    </Link>

                    <a
                      href={buildWhatsAppUrl(ppf.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-[#25D366] shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                      title={isAr ? "استفسر عبر واتساب" : "Inquire via WhatsApp"}
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>

          {/* ========================================================================= */}
          {/* 2 & 3. Secondary Services Stack (Spans 5 Columns)                         */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Card 2: Window Tinting & Heat Insulation */}
            <Reveal delay={0.08} className="flex-1">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FBE90A]/60 hover:shadow-[var(--shadow-elevated)] sm:p-7">
                <div>
                  <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black/30">
                    <Image
                      src={tinting.image}
                      alt={tinting.data.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
                        <span>{tinting.data.tag}</span>
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-[#FBE90A] shadow-sm backdrop-blur-md">
                        <SunMedium className="h-4 w-4" />
                      </span>
                    </div>
                    <span className="absolute bottom-3 start-3.5 rounded-md bg-[#FBE90A] px-2.5 py-0.5 font-mono text-[10px] font-black text-[#060608] uppercase">
                      {tinting.data.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-accent-label)] sm:text-2xl">
                    {tinting.data.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm line-clamp-2">
                    {tinting.data.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                  <Link
                    href={tinting.href}
                    className="group/btn inline-flex flex-1 items-center justify-between rounded-xl bg-[#FBE90A] px-4 py-2.5 text-xs font-extrabold text-[#060608] uppercase shadow-sm transition-all duration-300 hover:bg-[#fff033]"
                  >
                    <span className="truncate">{tinting.data.cta}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                  </Link>

                  <a
                    href={buildWhatsAppUrl(tinting.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[#25D366] transition-all hover:scale-105 hover:border-[#25D366] hover:bg-emerald-500/10"
                    title={isAr ? "تواصل واتساب" : "WhatsApp"}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>

            {/* Card 3: Nano Ceramic Coating */}
            <Reveal delay={0.12} className="flex-1">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FBE90A]/60 hover:shadow-[var(--shadow-elevated)] sm:p-7">
                <div>
                  <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black/30">
                    <Image
                      src={ceramic.image}
                      alt={ceramic.data.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
                        <span>{ceramic.data.tag}</span>
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-[#FBE90A] shadow-sm backdrop-blur-md">
                        <Sparkles className="h-4 w-4" />
                      </span>
                    </div>
                    <span className="absolute bottom-3 start-3.5 rounded-md bg-[#FBE90A] px-2.5 py-0.5 font-mono text-[10px] font-black text-[#060608] uppercase">
                      {ceramic.data.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-accent-label)] sm:text-2xl">
                    {ceramic.data.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm line-clamp-2">
                    {ceramic.data.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                  <Link
                    href={ceramic.href}
                    className="group/btn inline-flex flex-1 items-center justify-between rounded-xl bg-[#FBE90A] px-4 py-2.5 text-xs font-extrabold text-[#060608] uppercase shadow-sm transition-all duration-300 hover:bg-[#fff033]"
                  >
                    <span className="truncate">{ceramic.data.cta}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                  </Link>

                  <a
                    href={buildWhatsAppUrl(ceramic.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[#25D366] transition-all hover:scale-105 hover:border-[#25D366] hover:bg-emerald-500/10"
                    title={isAr ? "تواصل واتساب" : "WhatsApp"}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          </div>

          {/* ========================================================================= */}
          {/* 4. Full-Width Panoramic VIP Bundles Banner (Spans 12 Columns)              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-12">
            <Reveal delay={0.16}>
              <article className="group relative overflow-hidden rounded-3xl border border-[#FBE90A]/40 bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-elevated)] transition-all duration-500 hover:border-[#FBE90A] sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Left / Visual Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black/40 lg:col-span-5 lg:aspect-[16/10]">
                    <Image
                      src={bundles.image}
                      alt={bundles.data.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute top-4 start-4 inline-flex items-center gap-2 rounded-full bg-[#FBE90A] px-3.5 py-1 text-xs font-black text-[#060608] uppercase shadow-lg">
                      <Percent className="h-3.5 w-3.5" />
                      <span>{bundles.data.badge}</span>
                    </div>
                  </div>

                  {/* Right / Editorial Storytelling & Instant Action */}
                  <div className="flex flex-col justify-between space-y-5 lg:col-span-7">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
                        <span>{bundles.data.tag}</span>
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                        {bundles.data.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {bundles.data.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Link
                        href={bundles.href}
                        className="group/btn inline-flex items-center gap-2.5 rounded-xl bg-[#FBE90A] px-6 py-3.5 text-xs font-extrabold text-[#060608] uppercase shadow-[0_4px_18px_rgba(251,233,10,0.22)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_8px_26px_rgba(251,233,10,0.35)] sm:text-sm"
                      >
                        <span>{bundles.data.cta}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                      </Link>

                      <a
                        href={buildWhatsAppUrl(bundles.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-5 py-3.5 text-xs font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white sm:text-sm"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>{isAr ? "احجز عبر واتساب" : "Book via WhatsApp"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
