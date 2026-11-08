"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Percent, ShieldCheck, Sparkles, SunMedium } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

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

  const services = [
    {
      key: "ppf" as const,
      data: dict.cards.ppf,
      image: "/images/services/ppf-installation.jpg",
      href: `${localizedHref(locale, "services")}#ppf`,
      icon: ShieldCheck,
      badgeColor: "border-[#FBE90A]/50 bg-[#FBE90A]/15 text-[var(--brand-accent-label)]",
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز باقة حماية الطلاء PPF (ضمان مفتوح مدى الحياة)."
        : "Hello INFINITE BRIGHT, I would like to inquire about Paint Protection Film (PPF) packages.",
    },
    {
      key: "tinting" as const,
      data: dict.cards.tinting,
      image: "/images/services/window-tinting.jpg",
      href: `${localizedHref(locale, "services")}#window-tinting`,
      icon: SunMedium,
      badgeColor: "border-sky-500/40 bg-sky-500/15 text-sky-400",
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار عن عزل وتظليل Ultra Core (عزل 85% لجميع الدرجات — ضمان 10 سنوات)."
        : "Hello INFINITE BRIGHT, I would like to inquire about Ultra Core 85% Thermal Insulation.",
    },
    {
      key: "ceramic" as const,
      data: dict.cards.ceramic,
      image: "/images/services/ceramic-coating.jpg",
      href: `${localizedHref(locale, "services")}#ceramic-coating`,
      icon: Sparkles,
      badgeColor: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز خدمة النانو سيراميك الداخلي والخارجي."
        : "Hello INFINITE BRIGHT, I would like to inquire about Nano Ceramic packages.",
    },
    {
      key: "bundles" as const,
      data: dict.cards.bundles,
      image: "/images/services/paint-protection.jpg",
      href: `${localizedHref(locale, "services")}#bundles`,
      icon: Percent,
      badgeColor: "border-amber-500/50 bg-amber-500/15 text-amber-400",
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار عن باقات VIP الحصرية (خصم 35% + هدية خاصة)."
        : "Hello INFINITE BRIGHT, I would like to inquire about the Exclusive VIP 35% Bundles.",
    },
  ];

  return (
    <section
      id="services-overview"
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl space-y-3">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              {dict.eyebrow}
            </p>
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

        {/* 4 Fast High-Impact Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key} delay={idx * 0.08}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[#FBE90A]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.15)] sm:p-7">
                  {/* Top Bar with Luxury Medallion Badge & Quick WhatsApp Icon */}
                  <div>
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <LuxuryIconBadge icon={Icon} size="sm" />
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${item.badgeColor}`}
                        >
                          <span>{item.data.tag}</span>
                        </span>
                      </div>

                      <a
                        href={buildWhatsAppUrl(item.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-500/10 text-[#25D366] transition-all hover:scale-105 hover:bg-[#25D366] hover:text-white"
                        title={isAr ? "طلب تسعير فوري عبر واتساب" : "Instant WhatsApp Quote"}
                      >
                        <WhatsAppIcon className="h-4.5 w-4.5" />
                      </a>
                    </div>

                    {/* Image Preview */}
                    <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black/20">
                      <Image
                        src={item.image}
                        alt={item.data.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 start-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                        {item.data.badge}
                      </span>
                    </div>

                    <h3 className="font-display mb-2.5 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                      {item.data.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.data.description}
                    </p>
                  </div>

                  {/* Direct Action Button ("كل تفصيلة ليها زر تودي عليه") */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
                    <Link
                      href={item.href}
                      className="group/btn inline-flex flex-1 items-center justify-between rounded-xl bg-[#FBE90A] px-5 py-3 text-xs font-extrabold text-[#060608] uppercase shadow-[0_4px_16px_rgba(251,233,10,0.2)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_8px_24px_rgba(251,233,10,0.35)]"
                    >
                      <span>{item.data.cta}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                    </Link>

                    <a
                      href={buildWhatsAppUrl(item.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5 text-[var(--brand-accent-label)]" />
                      <span>{isAr ? "تسعير سريع" : "Quick Quote"}</span>
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
