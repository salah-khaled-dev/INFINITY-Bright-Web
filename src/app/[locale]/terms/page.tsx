import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { WarrantyShieldSection } from "@/components/sections/WarrantyShieldSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { SubpageHero } from "@/components/layout/SubpageHero";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "terms", "terms");
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <>
      {/* Editorial Legal Header with Luxury Studio Scrim */}
      <SubpageHero
        eyebrow={dict.termsPage.eyebrow}
        headline={dict.termsPage.headline}
        description={dict.termsPage.intro}
        imageSrc="/images/hero/brand-story-studio.jpg"
        imageAlt="Infinity Bright Warranty & Studio"
        badge={locale === "ar" ? "الشروط والضمانات الرسمية" : "Official Warranties & Terms"}
      />

      {/* Structured Legal & Warranty Articles */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl space-y-6 px-5 sm:px-8 lg:px-10">
          {dict.termsPage.sections.map((sec, idx) => (
            <Reveal key={idx} delay={0.04 * idx}>
              <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBE90A] text-xs font-extrabold text-[#060608]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-lg font-extrabold text-[var(--text-primary)] sm:text-xl">
                    {sec.title}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {sec.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlighted Warranty Summary */}
      <WarrantyShieldSection locale={locale} dict={dict.warrantySection} />

      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </>
  );
}

