import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Award, Building2, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { WarrantyShieldSection } from "@/components/sections/WarrantyShieldSection";
import { WhyInfiniteBrightSection } from "@/components/sections/WhyInfiniteBrightSection";
import { BranchesNetworkSection } from "@/components/sections/BranchesNetworkSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { SubpageHero } from "@/components/layout/SubpageHero";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "about", "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const icons = [Building2, ShieldCheck, Award];

  return (
    <>
      {/* Editorial Subpage Header with Showroom Maybach Backdrop */}
      <SubpageHero
        eyebrow={dict.aboutPage.eyebrow}
        headline={dict.aboutPage.headline}
        description={dict.aboutPage.intro}
        imageSrc="/images/about/about-hero.webp"
        imageAlt={locale === "ar" ? "مرسيدس مايباخ داخل صالة إنفينيتي برايت الفاخرة" : "Mercedes-Maybach inside Infinite Bright luxury showroom"}
        badge={locale === "ar" ? "صالة الرياض · مايباخ S-Class" : "Riyadh Studio · Maybach S-Class"}
      />

      {/* Corporate Heritage: Nawader El-Forsan Trading Est., 15+ Years in KSA, Authorized 3M & XPEL */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Reveal className="max-w-3xl space-y-3">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase">
                {dict.aboutPage.corporate.eyebrow}
              </p>
              <h2 className="font-display text-2xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
                {dict.aboutPage.corporate.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 shadow-sm">
                <Image
                  src={BUSINESS_CONFIG.assets.nawaderLogo}
                  alt={BUSINESS_CONFIG.parentOrganization[locale]}
                  width={155}
                  height={98}
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {dict.aboutPage.corporate.cards.map((card, idx) => {
              const Icon = icons[idx] ?? ShieldCheck;
              return (
                <Reveal key={idx} delay={0.07 * idx}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-elevated)] transition-colors hover:border-[#FBE90A]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBE90A] text-[#060608]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/12 px-3 py-1 text-[11px] font-extrabold text-[var(--brand-accent-label)]">
                          {card.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-[var(--text-primary)]">
                        {card.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                        {card.detail}
                      </p>
                    </div>
                    <div className="mt-6 h-[2px] w-12 bg-[#FBE90A]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studio Ethos & Showroom Architecture */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <ImageReveal className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#08080a] shadow-[var(--shadow-elevated)]">
                <Image
                  src="/images/hero/brand-story-studio.jpg"
                  alt="INFINITE BRIGHT architectural showroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>

            <div className="space-y-6 lg:col-span-6">
              <Reveal className="space-y-4">
                <span className="inline-block h-1 w-12 bg-[#FBE90A]" />
                <h2 className="font-display text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
                  {dict.aboutPage.storyTitle}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {dict.aboutPage.storyP1}
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {dict.aboutPage.storyP2}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <blockquote className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 text-sm font-bold text-[var(--text-primary)] sm:text-base">
                  <span className="mb-2 block h-0.5 w-8 bg-[#FBE90A]" />
                  {dict.brandStory.quote}
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Official Warranties Section */}
      <WarrantyShieldSection locale={locale} dict={dict.warrantySection} />

      <WhyInfiniteBrightSection dict={dict.whyUs} />
      <BranchesNetworkSection locale={locale} dict={dict.branchesSection} />
      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </>
  );
}
