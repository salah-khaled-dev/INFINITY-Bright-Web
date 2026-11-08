"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const isAr = locale === "ar";
  const year = new Date().getFullYear();

  // Mobile Accordion state
  const [openSection, setOpenSection] = useState<"nav" | "services" | "branches" | null>(null);

  const toggleAccordion = (section: "nav" | "services" | "branches") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const flagship = BUSINESS_CONFIG.flagshipBranch;
  const threeMBranches = BUSINESS_CONFIG.threeMBranches;

  // 1. Quick Navigation Links
  const quickNavLinks = [
    { href: localizedHref(locale, ""), label: isAr ? "الرئيسية" : "Home" },
    { href: localizedHref(locale, "about"), label: isAr ? "من نحن" : "About Us" },
    { href: localizedHref(locale, "services"), label: isAr ? "خدماتنا" : "Services" },
    { href: localizedHref(locale, "gallery"), label: isAr ? "المعرض" : "Gallery" },
    { href: localizedHref(locale, "contact"), label: isAr ? "تواصل معنا" : "Contact" },
    { href: localizedHref(locale, "terms"), label: dict.footer.termsLink },
    { href: localizedHref(locale, "privacy"), label: dict.footer.privacyLink },
  ];

  // 2. Core Automotive Services
  const coreServices = [
    {
      label: isAr ? "أفلام حماية الطلاء (PPF)" : "Paint Protection Film (PPF)",
      href: `${localizedHref(locale, "services")}#ppf`,
    },
    {
      label: isAr ? "تظليل نوافذ السيارات" : "Window Tinting",
      href: `${localizedHref(locale, "services")}#window-tinting`,
    },
    {
      label: isAr ? "العزل الحراري المتقدم" : "Thermal Insulation",
      href: `${localizedHref(locale, "services")}#heat-insulation`,
    },
    {
      label: isAr ? "طلاء النانو سيراميك" : "Nano Ceramic Coating",
      href: `${localizedHref(locale, "services")}#ceramic-coating`,
    },
    {
      label: isAr ? "حماية طلاء السيارات" : "Paint Protection Systems",
      href: `${localizedHref(locale, "services")}#paint-protection`,
    },
    {
      label: isAr ? "التلميع والتفصيل الفاخر" : "Polishing & Detailing",
      href: `${localizedHref(locale, "services")}#detailing`,
    },
    {
      label: isAr ? "تغيير ألوان السيارة" : "Color Change Studio",
      href: localizedHref(locale, "color-studio"),
    },
  ];

  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors">
      {/* Top Subtle Yellow Accent Line */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="h-[2px] w-20 bg-[#FBE90A]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        {/* ========================================================================= */}
        {/* DESKTOP & TABLET LAYOUT (Four Clearly Organized Columns)                  */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* SECTION 1 — BRAND IDENTITY */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <Link href={localizedHref(locale, "")} className="inline-block">
                <BrandLogo className="h-8 sm:h-9" />
              </Link>
              <span className="h-7 w-px bg-[var(--border-strong)] opacity-60" />
              <Link
                href={localizedHref(locale, "about")}
                title={BUSINESS_CONFIG.parentOrganization[locale]}
                className="inline-flex items-center opacity-85 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={BUSINESS_CONFIG.assets.nawaderLogo}
                  alt={BUSINESS_CONFIG.parentOrganization[locale]}
                  width={100}
                  height={56}
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-[var(--text-secondary)] sm:text-[13px]">
              {isAr
                ? "إحدى علامات مؤسسة نوادر الفرسان للتجارة — ريادة تفوق 15 عاماً في حماية الطلاء (PPF)، العزل الحراري المتقدم، النانو سيراميك، والتلميع الفاخر بالمملكة العربية السعودية."
                : "A premier brand by Nawader Al-Forsan Trading Est. Over 15 years of excellence in paint protection (PPF), advanced thermal insulation, and nano ceramic detailing in Saudi Arabia."}
            </p>

            {/* Subtle Commercial Registration */}
            <div className="flex items-center gap-2 pt-1 text-xs text-[var(--text-muted)] font-medium">
              <span>{isAr ? "سجل تجاري:" : "Commercial Reg:"}</span>
              <span className="font-mono font-bold text-[var(--text-primary)]" dir="ltr">
                {BUSINESS_CONFIG.commercialRegistration}
              </span>
            </div>
          </div>

          {/* SECTION 2 — QUICK NAVIGATION */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold tracking-[0.16em] text-[var(--text-muted)] uppercase">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2.5">
              {quickNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-xs font-medium text-[var(--text-secondary)] transition-all hover:text-[#d4be00] dark:hover:text-[#FBE90A] hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 3 — OUR SERVICES */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold tracking-[0.16em] text-[var(--text-muted)] uppercase">
              {isAr ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-2.5">
              {coreServices.map((svc, idx) => (
                <li key={idx}>
                  <Link
                    href={svc.href}
                    className="inline-block text-xs font-medium text-[var(--text-secondary)] transition-all hover:text-[#d4be00] dark:hover:text-[#FBE90A] hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4 — CONTACT & LOCATIONS */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.16em] text-[var(--text-muted)] uppercase">
              {isAr ? "تواصل معنا" : "Contact & Locations"}
            </h3>

            {/* Direct Phone & WhatsApp */}
            <div className="space-y-2">
              <div>
                <a
                  href={BUSINESS_CONFIG.contact.phoneHref}
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] hover:text-[#d4be00] dark:hover:text-[#FBE90A] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#d4be00] dark:text-[#FBE90A]" />
                  <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <a
                  href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:text-[#20ba5a] transition-colors"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>{isAr ? "محادثة فورية عبر واتساب" : "Direct WhatsApp"}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Clock className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>{isAr ? "يومياً: 12:00 م – 10:00 م" : "Daily: 12:00 PM – 10:00 PM"}</span>
              </div>
            </div>

            {/* Subtle Social Media Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </a>

              {BUSINESS_CONFIG.social.instagram && (
                <a
                  href={BUSINESS_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10 text-[#E1306C] transition-all hover:bg-[#E1306C] hover:text-white"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                </a>
              )}

              {BUSINESS_CONFIG.social.tiktok && (
                <a
                  href={BUSINESS_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 transition-all hover:bg-black hover:text-white"
                >
                  <TikTokIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {/* Branch Locations — Clean and Subtle */}
            <div className="space-y-2 border-t border-[var(--border-subtle)] pt-3 text-xs">
              <div>
                <span className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  {isAr ? "الصالة الرئيسية:" : "Flagship Showroom:"}
                </span>
                <a
                  href={flagship.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#d4be00] dark:hover:text-[#FBE90A] transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#d4be00] dark:text-[#FBE90A]" />
                  <span>{flagship.name[locale]} ({flagship.district[locale]})</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 rtl:-scale-x-100" />
                </a>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  {isAr ? "مراكز 3M المعتمدة بالرياض:" : "3M Authorized Centers:"}
                </span>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[var(--text-secondary)]">
                  {threeMBranches.map((branch, idx) => (
                    <React.Fragment key={branch.id}>
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors underline-offset-2 hover:underline"
                      >
                        {branch.district[locale]}
                      </a>
                      {idx < threeMBranches.length - 1 && (
                        <span className="text-[var(--border-strong)]">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE-FIRST FOOTER LAYOUT (< 768px)                                      */}
        {/* Order: 1. Brand, 2. Contact, 3. Nav, 4. Services, 5. Branches, 6. Legal   */}
        {/* ========================================================================= */}
        <div className="space-y-6 md:hidden">
          {/* 1. Mobile Brand Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Link href={localizedHref(locale, "")}>
                <BrandLogo className="h-8" />
              </Link>
              <span className="h-6 w-px bg-[var(--border-strong)] opacity-60" />
              <Link href={localizedHref(locale, "about")}>
                <Image
                  src={BUSINESS_CONFIG.assets.nawaderLogo}
                  alt={BUSINESS_CONFIG.parentOrganization[locale]}
                  width={90}
                  height={50}
                  className="h-7 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              {isAr
                ? "إحدى علامات مؤسسة نوادر الفرسان للتجارة (+15 عاماً)، وكيل معتمد لـ 3M ومتعاقد مع XPEL لحماية وتظليل السيارات الفاخرة."
                : "A premier brand by Nawader Al-Forsan Trading Est. (+15 Yrs), authorized 3M dealer and XPEL partner."}
            </p>
          </div>

          {/* 2. Mobile Quick Contact Actions */}
          <div className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={BUSINESS_CONFIG.contact.phoneHref}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-xs font-bold text-[var(--text-primary)] transition-colors active:scale-95"
              >
                <Phone className="h-3.5 w-3.5 text-[#d4be00] dark:text-[#FBE90A]" />
                <span>{isAr ? "اتصال هاتفي" : "Call"}</span>
              </a>

              <a
                href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white shadow-xs transition-colors active:scale-95"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-white" />
                <span>{isAr ? "واتساب" : "WhatsApp"}</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[var(--text-muted)] text-[11px]">
                {isAr ? "أوقات العمل: يومياً 12م – 10م" : "Hours: Daily 12PM – 10PM"}
              </span>

              {/* Mobile Social Links */}
              <div className="flex items-center gap-2">
                {BUSINESS_CONFIG.social.instagram && (
                  <a
                    href={BUSINESS_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/10 text-[#E1306C]"
                  >
                    <InstagramIcon className="h-3 w-3" />
                  </a>
                )}
                {BUSINESS_CONFIG.social.tiktok && (
                  <a
                    href={BUSINESS_CONFIG.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300"
                  >
                    <TikTokIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 3, 4, 5. Mobile Collapsible Accordions for Clean Compactness */}
          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {/* Accordion 1: Quick Navigation */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion("nav")}
                aria-expanded={openSection === "nav"}
                className="flex min-h-[48px] w-full items-center justify-between py-3 text-xs font-bold text-[var(--text-primary)]"
              >
                <span>{isAr ? "روابط سريعة" : "Quick Links"}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--text-muted)] transition-transform duration-200",
                    openSection === "nav" && "rotate-180 text-[var(--brand-accent-label)]"
                  )}
                />
              </button>
              {openSection === "nav" && (
                <ul className="space-y-2 pb-4 pt-1 ps-2">
                  {quickNavLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accordion 2: Our Services */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion("services")}
                aria-expanded={openSection === "services"}
                className="flex min-h-[48px] w-full items-center justify-between py-3 text-xs font-bold text-[var(--text-primary)]"
              >
                <span>{isAr ? "خدماتنا" : "Our Services"}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--text-muted)] transition-transform duration-200",
                    openSection === "services" && "rotate-180 text-[var(--brand-accent-label)]"
                  )}
                />
              </button>
              {openSection === "services" && (
                <ul className="space-y-2 pb-4 pt-1 ps-2">
                  {coreServices.map((svc, idx) => (
                    <li key={idx}>
                      <Link
                        href={svc.href}
                        className="block py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        {svc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accordion 3: Branch Locations */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion("branches")}
                aria-expanded={openSection === "branches"}
                className="flex min-h-[48px] w-full items-center justify-between py-3 text-xs font-bold text-[var(--text-primary)]"
              >
                <span>{isAr ? "فروعنا وصالات العرض" : "Branches & Locations"}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--text-muted)] transition-transform duration-200",
                    openSection === "branches" && "rotate-180 text-[var(--brand-accent-label)]"
                  )}
                />
              </button>
              {openSection === "branches" && (
                <div className="space-y-3 pb-4 pt-1 ps-2 text-xs">
                  <div>
                    <span className="block text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                      {isAr ? "الصالة الرئيسية:" : "Flagship Showroom:"}
                    </span>
                    <a
                      href={flagship.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[var(--text-primary)]"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#d4be00] dark:text-[#FBE90A]" />
                      <span>{flagship.name[locale]} ({flagship.district[locale]})</span>
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </a>
                  </div>

                  <div>
                    <span className="block text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                      {isAr ? "مراكز 3M المعتمدة بالرياض:" : "3M Authorized Centers:"}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
                      {threeMBranches.map((b) => (
                        <a
                          key={b.id}
                          href={b.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1"
                        >
                          {b.district[locale]} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FOOTER BOTTOM BAR (Slim, Minimal, Elegant)                                */}
        {/* ========================================================================= */}
        <div className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)]">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
            {/* Copyright Statement */}
            <p>
              © {year} {BUSINESS_CONFIG.parentOrganization[locale]} — {BUSINESS_CONFIG.brandName[locale]}. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>

            {/* Subtle Commercial Registration & Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="font-medium text-[var(--text-secondary)]">
                {isAr ? "س.ت:" : "C.R.:"}{" "}
                <strong className="font-mono text-[var(--text-primary)]" dir="ltr">
                  {BUSINESS_CONFIG.commercialRegistration}
                </strong>
              </span>

              <span aria-hidden="true" className="opacity-40">·</span>

              <Link
                href={localizedHref(locale, "terms")}
                className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline transition-colors"
              >
                {dict.footer.termsLink}
              </Link>

              <span aria-hidden="true" className="opacity-40">·</span>

              <Link
                href={localizedHref(locale, "privacy")}
                className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline transition-colors"
              >
                {dict.footer.privacyLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
