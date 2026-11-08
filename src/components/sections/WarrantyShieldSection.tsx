import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryGuaranteeIcon, type GuaranteeIconType } from "@/components/ui/LuxuryGuaranteeIcon";

interface WarrantyShieldSectionProps {
  locale: Locale;
  dict: Dictionary["warrantySection"];
}

export function WarrantyShieldSection({
  locale,
  dict,
}: WarrantyShieldSectionProps) {
  const guaranteeTypes: GuaranteeIconType[] = [
    "lifetime",
    "thermal-10yr",
    "paint-safety",
    "accident-50",
  ];

  const waHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن باقات الحماية والعزل الحراري وتفاصيل الضمان الذهبي وضمان الحوادث."
      : "Hello INFINITE BRIGHT, I would like to inquire about your protection & thermal packages and your Lifetime / 10-Year & Accident Warranties."
  );

  return (
    <section
      id="warranty"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-24 sm:py-32"
    >
      {/* Subtle Brand Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 h-80 w-[680px] -translate-x-1/2 rounded-full bg-[#FBE90A]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top Editorial Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/12 px-4 py-1.5 text-xs font-bold text-[var(--brand-accent-label)]">
              <ShieldCheck className="h-4 w-4" />
              <span>{dict.eyebrow}</span>
            </p>
            <h2 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-extrabold text-[#060608] shadow-[0_10px_28px_rgba(251,233,10,0.25)] transition-all duration-300 hover:bg-[#fff033] sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{dict.ctaWhatsapp}</span>
            </a>
            <Link
              href={localizedHref(locale, "terms")}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3.5 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-[#FBE90A] sm:text-sm"
            >
              <span>{dict.ctaTerms}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        {/* 4 Official Guarantee Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map((item, idx) => {
            const iconType = guaranteeTypes[idx % guaranteeTypes.length];
            const isHighlighted = idx === 1 || idx === 3;
            return (
              <Reveal key={idx} delay={0.06 * idx}>
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl border p-7 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1 ${
                    isHighlighted
                      ? "border-[#FBE90A]/75 bg-[var(--bg-surface)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[#FBE90A]/60"
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <LuxuryGuaranteeIcon type={iconType} size="md" />
                      <span className="rounded-full border border-[#FBE90A]/50 bg-[#FBE90A]/15 px-3.5 py-1 text-xs font-extrabold text-[var(--brand-accent-label)]">
                        {item.metric}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="font-display text-lg leading-snug font-extrabold text-[var(--text-primary)] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                    <span className="text-[11px] font-bold text-[var(--brand-accent-label)]">
                      {item.tag}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#FBE90A]" />
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

