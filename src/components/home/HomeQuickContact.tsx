"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, FileText, Phone, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG, buildWhatsAppUrl } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface HomeQuickContactProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    description: string;
    whatsappButton: string;
    callButton: string;
    detailedFormPrompt: string;
    detailedFormLink: string;
  };
}

export function HomeQuickContact({
  locale,
  dict,
}: HomeQuickContactProps) {
  const isAr = locale === "ar";
  const defaultWaUrl = buildWhatsAppUrl(
    isAr
      ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز موعد لسيارتي في صالة الرياض."
      : "Hello INFINITY BRIGHT, I would like to book a consultation for my vehicle."
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-28">
      {/* Subtle luxury golden ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-yellow)]/[0.04] blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal className="space-y-4">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
            {dict.eyebrow}
          </p>

          <h2 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {dict.headline}
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {dict.description}
          </p>
        </Reveal>

        {/* Working Hours Badge with Luxury Medallion */}
        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="group inline-flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs shadow-xs transition-all hover:border-[var(--brand-yellow)]/50">
            <LuxuryIconBadge icon={Clock} size="sm" />
            <div className="text-start">
              <span className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase">
                {isAr ? "أوقات العمل الرسمية" : "Working Hours"}
              </span>
              <span className="font-bold text-[var(--text-primary)] sm:text-sm">
                {isAr ? "يومياً من 12:00 ظهراً إلى 10:00 مساءً" : "Daily: 12:00 PM – 10:00 PM"}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Two Giant Direct Action Buttons ("كل تفصيلة ليها زر تودي عليه") */}
        <Reveal delay={0.14} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-[var(--brand-yellow)] px-8 py-4 text-sm font-extrabold text-[#242522] uppercase shadow-xs transition-all duration-300 hover:bg-[var(--brand-yellow-hover)] sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>{dict.whatsappButton}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneHref}
            className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-8 py-4 text-sm font-extrabold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--brand-yellow)] hover:bg-[var(--bg-elevated)] sm:w-auto"
          >
            <Phone className="h-4 w-4 text-[var(--brand-accent-label)]" />
            <span>{dict.callButton}</span>
            <span dir="ltr" className="font-mono text-xs opacity-75">
              ({BUSINESS_CONFIG.contact.phoneDisplay})
            </span>
          </a>
        </Reveal>

        {/* Subtle link to detailed consultation form for users who want to submit custom specs */}
        <Reveal delay={0.2} className="mt-8 text-xs text-[var(--text-muted)]">
          <span>{dict.detailedFormPrompt} </span>
          <Link
            href={localizedHref(locale, "contact")}
            className="font-bold text-[var(--brand-accent-label)] underline decoration-[var(--brand-yellow)] underline-offset-4 hover:text-[var(--text-primary)]"
          >
            {dict.detailedFormLink} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
