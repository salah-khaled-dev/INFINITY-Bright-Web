"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface ServicesShowcaseSectionProps {
  locale: Locale;
  dict: Dictionary["servicesSection"];
}

const GROUP_MEDIA = [
  {
    key: "ppf" as const,
    anchor: "ppf",
    image: "/images/services/ppf-installation.jpg",
  },
  {
    key: "tinting" as const,
    anchor: "window-tinting",
    image: "/images/services/window-tinting.jpg",
  },
  {
    key: "colorChange" as const,
    anchor: "color-change",
    image: "/images/services/color-change-studio.jpg",
  },
  {
    key: "ceramic" as const,
    anchor: "ceramic-coating",
    image: "/images/services/ceramic-coating.jpg",
  },
  {
    key: "detailing" as const,
    anchor: "car-detailing",
    image: "/images/services/car-detailing.jpg",
  },
];

export function ServicesShowcaseSection({
  locale,
  dict,
}: ServicesShowcaseSectionProps) {
  const [activeKey, setActiveKey] = useState<(typeof GROUP_MEDIA)[number]["key"]>("ppf");
  const prefersReduced = useReducedMotion();

  const activeMedia =
    GROUP_MEDIA.find((g) => g.key === activeKey) ?? GROUP_MEDIA[0];
  const activeCopy = dict.featuredGroups[activeMedia.key];

  return (
    <section
      id="services"
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl space-y-4">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              {dict.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.28]">
              {dict.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-md space-y-4">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {dict.subheadline}
            </p>
            <Link
              href={localizedHref(locale, "services")}
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[var(--text-primary)] uppercase transition-colors hover:text-[var(--brand-accent-label)] rtl:text-sm rtl:tracking-normal"
            >
              <span className="border-b border-[#FBE90A] pb-1">
                {dict.viewAllCta}
              </span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        {/* Interactive Split Editorial Stage */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sticky Showroom Visual Stage (Desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#08080b] shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMedia.key}
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeMedia.image}
                      alt={activeCopy.title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-6 bottom-5 z-10 flex items-end justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-[#FBE90A] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.16em] text-[#060608] uppercase rtl:font-sans rtl:tracking-normal">
                      {activeCopy.tag}
                    </span>
                    <p className="mt-2 text-xl font-bold text-white">
                      {activeCopy.title}
                    </p>
                  </div>
                  <span className="font-mono text-3xl font-light text-white/45">
                    {activeCopy.index}
                  </span>
                </div>
              </div>

              {/* Active Discipline Highlights Footer */}
              <div className="space-y-4 bg-[var(--bg-elevated)] p-6">
                <ul className="space-y-2.5">
                  {activeCopy.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                  <Link
                    href={`${localizedHref(locale, "services")}#${activeMedia.anchor}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-[var(--text-primary)] uppercase hover:text-[var(--brand-accent-label)] rtl:tracking-normal"
                  >
                    <span>{dict.viewAllCta}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </Link>
                  <a
                    href={buildWhatsAppUrl(
                      locale === "ar"
                        ? `مرحباً إنفينيتي برايت، أود الاستفسار عن خدمة: ${activeCopy.title}`
                        : `Hello INFINITE BRIGHT, I would like to inquire about: ${activeCopy.title}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FBE90A] px-4 py-2 text-xs font-bold text-[#060608] transition-colors hover:bg-[#fff033]"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span>{dict.inquireService}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Discipline Index Rows (Plus embedded photography on Mobile/Tablet) */}
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] lg:col-span-6">
            {GROUP_MEDIA.map((group) => {
              const copy = dict.featuredGroups[group.key];
              const isSelected = activeKey === group.key;

              return (
                <div
                  key={group.key}
                  onMouseEnter={() => setActiveKey(group.key)}
                  onFocus={() => setActiveKey(group.key)}
                  className={cn(
                    "group relative transition-colors duration-300",
                    isSelected
                      ? "bg-[var(--bg-elevated)]/70"
                      : "hover:bg-[var(--bg-elevated)]/40"
                  )}
                >
                  {/* Active Start Indicator */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 start-0 w-1 bg-[#FBE90A] transition-opacity duration-300",
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    )}
                  />

                  <div className="p-6 sm:p-8">
                    <button
                      type="button"
                      onClick={() => setActiveKey(group.key)}
                      className="flex w-full cursor-pointer items-start justify-between gap-4 text-start"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[var(--brand-accent-label)]">
                            {copy.index}
                          </span>
                          <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--text-muted)] uppercase rtl:tracking-normal">
                            {copy.tag}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                          {copy.title}
                        </h3>
                        <p className="max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                          {copy.subtitle}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isSelected
                            ? "border-[#FBE90A] bg-[#FBE90A] text-[#060608]"
                            : "border-[var(--border-strong)] text-[var(--text-primary)] group-hover:border-[#FBE90A]"
                        )}
                      >
                        <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                      </span>
                    </button>

                    {/* Mobile / Tablet Inline Visual & Highlights */}
                    <div className="mt-5 space-y-4 lg:hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)]">
                        <Image
                          src={group.image}
                          alt={copy.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <ul className="space-y-2">
                        {copy.highlights.map((hl, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                          >
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-accent-label)]" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={buildWhatsAppUrl(
                            locale === "ar"
                              ? `مرحباً إنفينيتي برايت، أود الاستفسار عن خدمة: ${copy.title}`
                              : `Hello INFINITE BRIGHT, I would like to inquire about: ${copy.title}`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#FBE90A] px-4 py-2 text-xs font-bold text-[#060608]"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" />
                          <span>{dict.inquireService}</span>
                        </a>
                        <Link
                          href={`${localizedHref(locale, "services")}#${group.anchor}`}
                          className="text-xs font-semibold text-[var(--text-primary)] underline underline-offset-4"
                        >
                          {dict.viewAllCta}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

