"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Palette } from "lucide-react";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface HomeInteractiveTeasersProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    colorStudio: {
      tag: string;
      title: string;
      description: string;
      cta: string;
    };
    gallery: {
      tag: string;
      title: string;
      description: string;
      cta: string;
    };
  };
}

export function HomeInteractiveTeasers({
  locale,
  dict,
}: HomeInteractiveTeasersProps) {
  return (
    <section className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mb-12 max-w-2xl space-y-3">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
            {dict.eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-[1.14] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {dict.headline}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Teaser 1: Interactive Car Color Studio */}
          <Reveal delay={0.05}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 transition-all duration-300 hover:border-[#FBE90A]/60 sm:p-9">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LuxuryIconBadge icon={Palette} size="sm" />
                    <span className="inline-flex items-center rounded-full border border-[#FBE90A]/50 bg-[#FBE90A]/10 px-3.5 py-1 text-xs font-bold text-[var(--brand-accent-label)]">
                      <span>{dict.colorStudio.tag}</span>
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                    3D STUDIO
                  </span>
                </div>

                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black/40">
                  <Image
                    src="/images/services/color-change-studio.webp"
                    alt={dict.colorStudio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 start-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FBE90A] animate-pulse" />
                    <span className="text-xs font-bold text-white drop-shadow">
                      {locale === "ar" ? "12 لوناً فخماً + لمعان مرآوي ومطفي" : "12 Luxury Colors + Gloss & Matte"}
                    </span>
                  </div>
                </div>

                <h3 className="font-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                  {dict.colorStudio.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dict.colorStudio.description}
                </p>
              </div>

              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                <Link
                  href={localizedHref(locale, "color-studio")}
                  className="group/btn inline-flex w-full items-center justify-between rounded-xl bg-[#FBE90A] px-6 py-3.5 text-xs font-extrabold text-[#060608] uppercase shadow-[0_6px_20px_rgba(251,233,10,0.25)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_10px_28px_rgba(251,233,10,0.4)] sm:text-sm"
                >
                  <span>{dict.colorStudio.cta}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Teaser 2: Showcase Gallery Before & After */}
          <Reveal delay={0.12}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 transition-all duration-300 hover:border-[#FBE90A]/60 sm:p-9">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LuxuryIconBadge icon={Camera} size="sm" />
                    <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-400">
                      <span>{dict.gallery.tag}</span>
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                    BEFORE / AFTER
                  </span>
                </div>

                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black/40">
                  <Image
                    src="/images/gallery/ba-split-protection.jpg"
                    alt={dict.gallery.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 start-4 flex items-center gap-2">
                    <span className="rounded bg-[#E51937] px-2 py-0.5 text-[10px] font-black text-white">
                      HD RESULTS
                    </span>
                    <span className="text-xs font-bold text-white drop-shadow">
                      {locale === "ar" ? "توثيق بالصور عالي الدقة" : "High-Resolution Transformation"}
                    </span>
                  </div>
                </div>

                <h3 className="font-display mb-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                  {dict.gallery.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dict.gallery.description}
                </p>
              </div>

              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                <Link
                  href={localizedHref(locale, "gallery")}
                  className="group/btn inline-flex w-full items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3.5 text-xs font-extrabold text-[var(--text-primary)] uppercase transition-all duration-300 hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608] sm:text-sm"
                >
                  <span>{dict.gallery.cta}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
