import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Building2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface BrandStorySectionProps {
  locale: Locale;
  dict: Dictionary["brandStory"];
}

export function BrandStorySection({ locale, dict }: BrandStorySectionProps) {
  const pillars = [
    dict.pillars.optical,
    dict.pillars.climate,
    dict.pillars.bespoke,
  ];

  return (
    <section
      id="brand-story"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Asymmetrical Studio Showroom Portrait */}
          <div className="lg:col-span-5">
            <ImageReveal className="group relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0a0a0d] shadow-[var(--shadow-elevated)]">
              <Image
                src="/images/hero/brand-story-studio.jpg"
                alt="INFINITY BRIGHT architectural studio sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              {/* Corner Geometric Accent */}
              <div
                aria-hidden="true"
                className="absolute bottom-5 start-5 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/65 px-3.5 py-1.5 backdrop-blur-md"
              >
                <span className="h-2 w-2 rounded-full bg-[#FBE90A]" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/95 uppercase">
                  15+ YEARS KSA · 3M & XPEL
                </span>
              </div>
            </ImageReveal>
          </div>

          {/* Editorial Manifesto & Corporate Heritage */}
          <div className="space-y-7 lg:col-span-7">
            <Reveal className="space-y-4">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                {dict.eyebrow}
              </p>

              {/* Official Corporate Affiliation & Authorized Partner Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-2xl border border-[#FBE90A]/45 bg-[#FBE90A]/12 px-4 py-2 text-xs font-bold text-[var(--text-primary)] shadow-sm">
                  <LuxuryIconBadge icon={Building2} size="sm" />
                  <span>{dict.heritageBadge}</span>
                </span>
                <span className="inline-flex items-center gap-2.5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] shadow-sm">
                  <LuxuryIconBadge icon={Award} size="sm" />
                  <span>{dict.partnersBadge}</span>
                </span>
              </div>

              <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.28]">
                {dict.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="space-y-5">
              <p className="text-base leading-relaxed font-medium text-[var(--text-primary)]/90 sm:text-lg">
                {dict.lead}
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {dict.body}
              </p>
            </Reveal>

            {/* Architectural Pull-Quote */}
            <Reveal delay={0.16}>
              <blockquote className="border-s-2 border-[#FBE90A] py-1 ps-5 text-base italic font-medium text-[var(--text-primary)] sm:text-lg rtl:not-italic">
                “{dict.quote}”
              </blockquote>
            </Reveal>

            {/* Three Hairline Principles */}
            <Reveal delay={0.22}>
              <div className="grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-8 sm:grid-cols-3">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-4 bg-[#FBE90A]" />
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <Link
                href={localizedHref(locale, "about")}
                className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[var(--text-primary)] uppercase transition-colors hover:text-[var(--brand-accent-label)] rtl:text-sm rtl:tracking-normal"
              >
                <span className="border-b border-[#FBE90A] pb-1">{dict.cta}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
