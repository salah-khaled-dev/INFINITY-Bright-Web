import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { BranchesNetworkSection } from "@/components/sections/BranchesNetworkSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { SubpageHero } from "@/components/layout/SubpageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "contact", "contact");
}

export default async function ContactPage({
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
        eyebrow={dict.contactPage.eyebrow}
        headline={dict.contactPage.headline}
        description={dict.contactPage.intro}
        imageSrc="/images/contact/contact-hero.webp"
        imageAlt={locale === "ar" ? "بورشه داخل صالة تسليم إنفينيتي برايت الفاخرة" : "Porsche inside Infinite Bright luxury delivery lounge"}
        badge={locale === "ar" ? "صالة الرياض · حجز مواعيد وتسليم" : "Riyadh Studio · Appointments & Handover"}
      />

      <BranchesNetworkSection locale={locale} dict={dict.branchesSection} />

      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </>
  );
}
