import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { SubpageHero } from "@/components/layout/SubpageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "gallery", "gallery");
}

export default async function GalleryPage({
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
      <SubpageHero
        eyebrow={dict.galleryPage.eyebrow}
        headline={dict.galleryPage.headline}
        description={dict.galleryPage.intro}
        imageSrc="/images/gallery/gallery-hero.webp"
        imageAlt={locale === "ar" ? "رانج روفر داخل صالة إنفينيتي برايت الفاخرة" : "Range Rover inside Infinity Bright luxury studio"}
        badge={locale === "ar" ? "صالة الرياض · رانج روفر" : "Riyadh Studio · Range Rover"}
      />

      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <GalleryGrid locale={locale} dict={dict.gallery} />
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

