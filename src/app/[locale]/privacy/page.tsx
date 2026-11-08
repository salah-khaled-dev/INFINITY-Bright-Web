import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "privacy", "privacy");
}

export default async function PrivacyPage({
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
      {/* Editorial Privacy Header */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <Reveal className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FBE90A]/45 bg-[#FBE90A]/12 px-4 py-1.5 text-xs font-bold text-[var(--brand-accent-label)]">
              <Lock className="h-4 w-4" />
              <span>{dict.privacyPage.eyebrow}</span>
            </div>
            <h1 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
              {dict.privacyPage.headline}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.privacyPage.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Structured Privacy Articles */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl space-y-6 px-5 sm:px-8 lg:px-10">
          {dict.privacyPage.sections.map((sec, idx) => (
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

      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </>
  );
}

