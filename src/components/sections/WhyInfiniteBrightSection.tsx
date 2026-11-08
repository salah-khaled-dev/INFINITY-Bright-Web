import React from "react";
import { Award, MapPin, Shield, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface WhyInfiniteBrightSectionProps {
  dict: Dictionary["whyUs"];
}

export function WhyInfiniteBrightSection({
  dict,
}: WhyInfiniteBrightSectionProps) {
  const valueIcons = [Award, ShieldCheck, Shield, MapPin];
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32">
      <div className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-35" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-16 max-w-2xl space-y-4">
          <Reveal>
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              {dict.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.26]">
              {dict.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dict.values.map((val, idx) => (
            <Reveal key={val.number} delay={0.07 * idx}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-8 transition-all duration-300 hover:border-[#FBE90A]/70 sm:p-10">
                {/* Top Corner Yellow Tick */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 start-0 h-1 w-14 bg-[#FBE90A] transition-all duration-300 group-hover:w-24"
                />

                <div className="flex items-center justify-between gap-4">
                  <LuxuryIconBadge icon={valueIcons[idx] ?? ShieldCheck} size="md" />
                  <span className="font-mono text-3xl font-bold text-[var(--brand-accent-label)]/85 sm:text-4xl">
                    {val.number}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                  {val.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {val.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

