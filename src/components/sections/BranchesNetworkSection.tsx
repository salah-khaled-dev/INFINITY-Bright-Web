import React from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Navigation, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface BranchesNetworkSectionProps {
  locale: Locale;
  dict: Dictionary["branchesSection"];
}

export function BranchesNetworkSection({
  locale,
  dict,
}: BranchesNetworkSectionProps) {
  const flagship = BUSINESS_CONFIG.flagshipBranch;
  const threeMBranches = BUSINESS_CONFIG.threeMBranches;

  return (
    <section
      id="branches"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Editorial Heading */}
        <Reveal className="mb-14 max-w-3xl space-y-4">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:tracking-normal">
            {dict.eyebrow}
          </p>
          <h2 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {dict.headline}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {dict.description}
          </p>
        </Reveal>

        {/* 1. INFINITE BRIGHT Flagship Showroom — Al Murooj, Imam Saud Rd */}
        <Reveal className="mb-14">
          <div className="overflow-hidden rounded-3xl border border-[#FBE90A]/50 bg-[var(--bg-canvas)] shadow-[var(--shadow-elevated)]">
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <ImageReveal className="relative min-h-[280px] bg-[#08080a] sm:min-h-[360px] lg:col-span-6">
                <Image
                  src={flagship.image || "/images/hero/brand-story-studio.jpg"}
                  alt={dict.flagshipTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-5 start-5 inline-flex items-center gap-2 rounded-full bg-[#FBE90A] px-4 py-1.5 text-[11px] font-extrabold text-[#060608] uppercase shadow-lg">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{dict.flagshipBadge}</span>
                </div>
              </ImageReveal>

              <div className="flex flex-col justify-between space-y-6 p-6 sm:p-9 lg:col-span-6 lg:p-11">
                <div className="space-y-4">
                  <BrandLogo className="h-10" />
                  <h3 className="font-display text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                    {dict.flagshipTitle}
                  </h3>
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-bold text-[var(--text-primary)] shadow-sm">
                    <LuxuryIconBadge icon={MapPin} size="sm" />
                    <span>{dict.flagshipAddress}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {dict.flagshipDesc}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={flagship.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-extrabold text-[#060608] uppercase shadow-[0_8px_24px_rgba(251,233,10,0.25)] transition-all duration-300 hover:bg-[#fff033] sm:text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{dict.openMapCta}</span>
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </a>

                  <a
                    href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-5 py-3.5 text-xs font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span dir="ltr">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.contact.phoneHref}
                    aria-label={BUSINESS_CONFIG.contact.phoneDisplay}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[#FBE90A]"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. Pure 3M Logo Branch Cards — Click Any Branch Card to Open Google Maps Directly (NO Car Image) */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-[#E51937]/35 bg-[var(--bg-canvas)] p-6 shadow-[var(--shadow-elevated)] sm:p-9 lg:p-11">
            <div className="mb-8 max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center rounded-md bg-[#E51937] px-2.5 py-1 font-sans text-xs font-black tracking-tight text-white">
                  3M
                </span>
                <span className="text-xs font-extrabold text-[#E51937] uppercase">
                  {dict.threeMGroupBadge}
                </span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                {dict.threeMHeading}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                {dict.threeMNote}
              </p>
            </div>

            {/* 4 Pure 3M Logo Branch Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {threeMBranches.map((branch) => (
                <a
                  key={branch.id}
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E51937] hover:shadow-[0_18px_40px_rgba(229,25,55,0.16)]"
                >
                  {/* Pure Bold 3M Logo Display Area (No Car) */}
                  <div className="flex h-32 w-full items-center justify-center rounded-xl border border-[#E51937]/20 bg-gradient-to-b from-[#E51937]/[0.06] to-transparent px-4 transition-colors duration-300 group-hover:border-[#E51937]/50 group-hover:from-[#E51937]/[0.12]">
                    <Image
                      src={BUSINESS_CONFIG.assets.threeMLogoOnly}
                      alt={`3M — ${branch.name[locale]}`}
                      width={190}
                      height={90}
                      unoptimized
                      className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Branch Title & District */}
                  <div className="mt-5 w-full space-y-1.5">
                    <h4 className="font-display text-xl font-extrabold text-[var(--text-primary)]">
                      {branch.name[locale]}
                    </h4>
                    <p className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[var(--text-secondary)]">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E51937]" />
                      <span>{branch.district[locale]}</span>
                    </p>
                  </div>

                  {/* Click-to-Open Maps Pill */}
                  <div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E51937]/40 bg-[#E51937]/10 px-4 py-2.5 text-xs font-extrabold text-[#E51937] transition-all duration-300 group-hover:bg-[#E51937] group-hover:text-white">
                    <Navigation className="h-3.5 w-3.5" />
                    <span>{dict.directionsLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
