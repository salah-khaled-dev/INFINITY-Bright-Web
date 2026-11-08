import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { CarColorStudio } from "@/components/sections/CarColorStudio";
import { WarrantyShieldSection } from "@/components/sections/WarrantyShieldSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "colorStudio", "color-studio");
}

export default async function ColorStudioPage({
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
    <div className="pt-20 sm:pt-24">
      <CarColorStudio
        locale={locale}
        dict={dict.colorConfigurator}
        isStandalonePage
      />
      <WarrantyShieldSection locale={locale} dict={dict.warrantySection} />
      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </div>
  );
}
