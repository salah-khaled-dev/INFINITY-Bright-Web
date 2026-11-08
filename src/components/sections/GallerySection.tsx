import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";

interface GallerySectionProps {
  locale: Locale;
  dict: Dictionary["gallery"];
}

export function GallerySection({ locale, dict }: GallerySectionProps) {
  return (
    <section
      id="gallery"
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl space-y-4">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              {dict.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl rtl:leading-[1.26]">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href={localizedHref(locale, "gallery")}
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[var(--text-primary)] uppercase transition-colors hover:text-[var(--brand-accent-label)] rtl:text-sm rtl:tracking-normal"
            >
              <span className="border-b border-[#FBE90A] pb-1">
                {dict.viewFullArchive}
              </span>
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        <GalleryGrid locale={locale} dict={dict} limit={8} />
      </div>
    </section>
  );
}

