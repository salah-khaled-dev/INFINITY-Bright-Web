"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, FileText, MapPin, Navigation, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface HomeBranchesQuickProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    description: string;
    flagshipTitle: string;
    flagshipDistrict: string;
    hoursTitle: string;
    hoursValue: string;
    crTitle: string;
    crValue: string;
    openMap: string;
    threeMTitle: string;
    threeMList: string;
    allBranchesLink: string;
  };
}

export function HomeBranchesQuick({
  locale,
  dict,
}: HomeBranchesQuickProps) {
  const isAr = locale === "ar";
  const flagship = BUSINESS_CONFIG.flagshipBranch;
  const threeMBranches = BUSINESS_CONFIG.threeMBranches;

  return (
    <section className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-28">
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

          <Reveal delay={0.1}>
            <Link
              href={localizedHref(locale, "contact")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
            >
              <span>{dict.allBranchesLink}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Flagship Showroom Card */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl border border-[#FBE90A]/50 bg-[var(--bg-canvas)] p-7 sm:p-9">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <BrandLogo className="h-9" />
                    <span className="rounded-md bg-[#FBE90A] px-2.5 py-0.5 text-[11px] font-black text-[#060608] uppercase">
                      {isAr ? "الفرع الرئيسي" : "Flagship Showroom"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs shadow-sm">
                    <LuxuryIconBadge icon={Clock} size="sm" className="h-8 w-8 rounded-lg" />
                    <span className="font-bold text-[var(--text-primary)]">
                      {dict.hoursValue}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {dict.flagshipTitle}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {dict.flagshipDistrict}
                </p>

                {/* Corporate Heritage Details */}
                <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--text-secondary)]">
                      {isAr ? "مؤسسة نوادر الفرسان للتجارة (+15 عاماً بالمملكة)" : "Nawader El-Forsan Trading Est. (15+ Years in KSA)"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons ("كل تفصيلة ليها زر تودي عليه") */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={flagship.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FBE90A] px-5 py-3 text-xs font-extrabold text-[#060608] uppercase shadow-[0_4px_16px_rgba(251,233,10,0.2)] transition-all hover:bg-[#fff033]"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{dict.openMap}</span>
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </a>

                  <a
                    href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-3 text-xs font-bold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>{isAr ? "واتساب الصالة" : "Showroom WhatsApp"}</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.contact.phoneHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
                  >
                    <Phone className="h-4 w-4" />
                    <span dir="ltr">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 3M Certified Network Card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[#E51937]/35 bg-[var(--bg-canvas)] p-7 sm:p-9">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2.5">
                    <span className="rounded bg-[#E51937] px-2.5 py-0.5 font-sans text-xs font-black text-white">
                      3M
                    </span>
                    <span className="text-xs font-bold text-[#E51937] uppercase">
                      {isAr ? "شبكة مراكز 3M المعتمدة" : "Authorized 3M Centers"}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                    {dict.threeMTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {dict.threeMList}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
                    {threeMBranches.map((branch) => (
                      <a
                        key={branch.id}
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[#E51937]"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-[#E51937]" />
                          <span>{branch.name[locale]}</span>
                          <span className="text-[11px] text-[var(--text-muted)]">
                            ({branch.district[locale]})
                          </span>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {isAr
                      ? "جميع الفروع تعمل وفق أعلى معايير الجودة المعتمدة من 3M العالمية."
                      : "All branches operate under official 3M global quality benchmarks."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
