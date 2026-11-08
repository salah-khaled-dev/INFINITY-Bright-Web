import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/services";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { ServiceDetailChapter } from "@/components/services/ServiceDetailChapter";
import { PpfPackagesShowcase } from "@/components/services/PpfPackagesShowcase";
import { ExclusiveBundlesSection } from "@/components/sections/ExclusiveBundlesSection";
import { CarColorStudio } from "@/components/sections/CarColorStudio";
import { HeatInsulationSection } from "@/components/sections/HeatInsulationSection";
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
  return buildPageMetadata(locale, "services", "services");
}

export default async function ServicesPage({
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
        eyebrow={dict.servicesPage.eyebrow}
        headline={dict.servicesPage.headline}
        description={dict.servicesPage.intro}
        imageSrc="/images/services/services-hero.webp"
        imageAlt={locale === "ar" ? "لاند كروزر داخل صالة إنفينيتي برايت الفاخرة" : "Land Cruiser inside Infinite Bright luxury studio"}
        badge={locale === "ar" ? "صالة الرياض · لاند كروزر" : "Riyadh Studio · Land Cruiser"}
      >
        {/* Quick Jump Anchors */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {SERVICES_DATA.map((svc) => (
            <a
              key={svc.id}
              href={`#${svc.id}`}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/90 px-4 py-2 text-xs font-bold text-[var(--text-secondary)] shadow-sm backdrop-blur-sm transition-all hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
            >
              <span className="me-1.5 font-mono text-[11px] text-[var(--brand-accent-label)]">
                {svc.index}
              </span>
              {dict.servicesCatalog[svc.id].title}
            </a>
          ))}
        </div>
      </SubpageHero>

      <section className="bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {SERVICES_DATA.map((svc, idx) => (
            <ServiceDetailChapter
              key={svc.id}
              locale={locale}
              service={svc}
              copy={dict.servicesCatalog[svc.id]}
              labels={dict.servicesPage}
              reversed={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* 35% OFF Exclusive All-Inclusive VIP Bundles + Free Gift */}
      <ExclusiveBundlesSection locale={locale} dict={dict.exclusiveBundles} />

      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <PpfPackagesShowcase locale={locale} dict={dict.ppfPackages} />
        </div>
      </section>

      {/* Interactive Car Paint Color Studio */}
      <CarColorStudio locale={locale} dict={dict.colorConfigurator} />

      {/* Dedicated Ultra Core (85% All Shades) & Core Plus (65%) + Live Tint Simulator */}
      <HeatInsulationSection
        locale={locale}
        dict={dict.heatExperience}
        tintSimulatorDict={dict.tintSimulator}
      />

      {/* Official Warranties: 10-Yr Thermal, Lifetime PPF, Safe Paint Removal, 50% Accident Benefit */}
      <WarrantyShieldSection locale={locale} dict={dict.warrantySection} />

      <ContactCtaSection
        locale={locale}
        dict={dict.contactSection}
        servicesCatalog={dict.servicesCatalog}
      />
    </>
  );
}
