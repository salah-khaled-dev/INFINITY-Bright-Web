import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeTrustStrip } from "@/components/home/HomeTrustStrip";
import { HomeServicesGate } from "@/components/home/HomeServicesGate";
import { GoogleReviewsSection } from "@/components/sections/GoogleReviewsSection";
import { HomeBranchesQuick } from "@/components/home/HomeBranchesQuick";
import { HomeQuickContact } from "@/components/home/HomeQuickContact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildPageMetadata(locale, "home", "");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      {/* 1. Cinematic Hero with Instant Booking CTAs */}
      <HeroSection locale={typedLocale} dict={dict.hero} />

      {/* 2. Official Accreditation & Trust Strip (Heritage, Hours: 12PM-10PM, 3M/XPEL, Warranties) */}
      <HomeTrustStrip locale={typedLocale} />

      {/* 3. Fast Core Services Grid ("كل تفصيلة ليها زر تودي عليه") */}
      <HomeServicesGate locale={typedLocale} dict={dict.homeLight.servicesGate} />

      {/* 4. Authentic Verified Google Customer Reviews (4.6 ★ Across 40 Reviews, 4-5 Stars Filtered Testimonials) */}
      <GoogleReviewsSection locale={typedLocale} />

      {/* 7. Riyadh Flagship Showroom & 3M Branches with Google Maps & Working Hours */}
      <HomeBranchesQuick locale={typedLocale} dict={dict.homeLight.branches} />

      {/* 8. Fast Direct WhatsApp & Phone Concierge for Saudi Clientele */}
      <HomeQuickContact locale={typedLocale} dict={dict.homeLight.quickContact} />
    </>
  );
}
