import React from "react";
import Image from "next/image";
import { ArrowUpRight, Droplets, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface NanoCeramicSectionProps {
  locale: Locale;
  dict: Dictionary["ceramicExperience"];
}

export function NanoCeramicSection({ locale, dict }: NanoCeramicSectionProps) {
  const waHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن طلاء النانو سيراميك."
      : "Hello INFINITY BRIGHT, I would like to inquire about Nano Ceramic Coating."
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Staggered Editorial Diptych */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <ImageReveal className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#060608] shadow-[var(--shadow-elevated)]">
              <Image
                src="/images/services/water-beading.jpg"
                alt="Hydrophobic spherical water droplets beading on ceramic-coated black paint"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Reveal className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                <Droplets className="h-4 w-4" />
                <span>{dict.eyebrow}</span>
              </div>
              <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl rtl:leading-[1.26]">
                {dict.headline}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {dict.description}
              </p>
            </Reveal>

            <ImageReveal
              delay={0.14}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#08080a] shadow-[var(--shadow-elevated)]"
            >
              <Image
                src="/images/services/ceramic-coating.jpg"
                alt="Specialist applying nano ceramic coating inside INFINITY BRIGHT showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>

        {/* Bottom 3 Ceramic Physics Columns + CTA */}
        <div className="mt-14 grid grid-cols-1 items-end gap-8 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-9">
            {dict.features.map((feat, idx) => {
              const ceramicIcons = [Droplets, Sparkles, ShieldCheck];
              const Icon = ceramicIcons[idx % ceramicIcons.length];
              return (
                <Reveal key={idx} delay={0.07 * (idx + 1)} className="group space-y-3">
                  <LuxuryIconBadge icon={Icon} size="sm" />
                  <div>
                    <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                      {feat.label}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {feat.detail}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.25} className="lg:col-span-3 lg:text-end">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-[#060608] uppercase transition-all duration-300 hover:bg-[#fff033] rtl:text-sm rtl:tracking-normal"
            >
              <span>{dict.cta}</span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

