"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { LuxuryGuaranteeIcon, type GuaranteeIconType } from "@/components/ui/LuxuryGuaranteeIcon";
import { BUSINESS_CONFIG } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

interface HomeWarrantiesQuickProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    description: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
    aboutCta: string;
    termsCta: string;
  };
}

export function HomeWarrantiesQuick({
  locale,
  dict,
}: HomeWarrantiesQuickProps) {
  const isAr = locale === "ar";

  const guaranteeTypes: GuaranteeIconType[] = [
    "lifetime",
    "thermal-10yr",
    "paint-safety",
    "accident-50",
  ];

  return (
    <section className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl space-y-3">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              {dict.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.14] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap items-center gap-3">
            <Link
              href={localizedHref(locale, "about")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
            >
              <span>{dict.aboutCta}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>

            <Link
              href={localizedHref(locale, "terms")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <FileText className="h-3.5 w-3.5 text-[var(--brand-accent-label)]" />
              <span>{dict.termsCta}</span>
            </Link>
          </Reveal>
        </div>

        {/* 4 Warranty Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, index) => {
            const iconType = guaranteeTypes[index % guaranteeTypes.length];
            return (
              <Reveal key={index} delay={index * 0.08}>
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#FBE90A]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <LuxuryGuaranteeIcon type={iconType} size="md" />
                      <span className="font-mono text-xs font-bold text-[var(--brand-accent-label)] tracking-wider">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)]">
                      OFFICIAL GUARANTEE 0{index + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FBE90A]" />
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
