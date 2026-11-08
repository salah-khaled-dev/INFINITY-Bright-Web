import React from "react";
import Image from "next/image";
import { ArrowUpRight, Layers, Shield, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";
import { PpfPackagesShowcase } from "@/components/services/PpfPackagesShowcase";

interface PpfExperienceSectionProps {
  locale: Locale;
  dict: Dictionary["ppfExperience"];
  packagesDict: Dictionary["ppfPackages"];
}

export function PpfExperienceSection({
  locale,
  dict,
  packagesDict,
}: PpfExperienceSectionProps) {
  const waHref = buildWhatsAppUrl(
    locale === "ar"
      ? "مرحباً إنفينيتي برايت، أود الاستفسار عن باقات أفلام حماية الطلاء (PPF)."
      : "Hello INFINITE BRIGHT, I would like a consultation regarding Paint Protection Film (PPF)."
  );

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left / Start Copy & 3-Layer Polymer Breakdown */}
          <div className="space-y-8 lg:col-span-5">
            <Reveal className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                <Shield className="h-4 w-4" />
                <span>{dict.eyebrow}</span>
              </div>
              <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.26]">
                {dict.headline}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {dict.description}
              </p>
            </Reveal>

            {/* Architectural 3-Layer Film Stack */}
            <div className="space-y-4">
              {dict.specs.map((spec, idx) => {
                const layerIcons = [Sparkles, Shield, Layers];
                const Icon = layerIcons[idx % layerIcons.length];
                return (
                  <Reveal key={spec.code} delay={0.08 * (idx + 1)}>
                    <div className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-all duration-300 hover:border-[#FBE90A]/70">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <LuxuryIconBadge icon={Icon} size="sm" />
                          <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                            {spec.code}
                          </span>
                        </div>
                        <span className="h-[2px] w-8 bg-[#FBE90A]/45 transition-all duration-300 group-hover:w-14 group-hover:bg-[#FBE90A]" />
                      </div>
                      <h3 className="mt-3 text-base font-bold text-[var(--text-primary)]">
                        {spec.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {spec.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#FBE90A] px-7 py-3.5 text-xs font-bold tracking-[0.15em] text-[#060608] uppercase shadow-[0_10px_30px_rgba(251,233,10,0.22)] transition-all duration-300 hover:bg-[#fff033] rtl:text-sm rtl:tracking-normal"
              >
                <span>{dict.cta}</span>
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </a>
            </Reveal>
          </div>

          {/* Right / End Layered Showroom Photography Composition */}
          <div className="relative lg:col-span-7">
            <ImageReveal className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#08080a] shadow-[var(--shadow-elevated)]">
              <Image
                src="/images/services/ppf-installation.jpg"
                alt="Master technician installing Paint Protection Film inside INFINITE BRIGHT bay"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </ImageReveal>

            {/* Secondary Offset Inspection-Arch Detail Card */}
            <ImageReveal
              delay={0.18}
              className="mt-6 ms-auto w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#070709] shadow-[var(--shadow-elevated)] sm:-mt-16 sm:w-3/5 sm:me-6"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/services/paint-protection.jpg"
                  alt="Swirl-free clearcoat inspection inside INFINITE BRIGHT showroom"
                  fill
                  sizes="(max-width: 640px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Interactive Half-Front, Front-End 40cm & Full-Body PPF Coverage Packages */}
        <PpfPackagesShowcase locale={locale} dict={packagesDict} compactTop />
      </div>
    </section>
  );
}

