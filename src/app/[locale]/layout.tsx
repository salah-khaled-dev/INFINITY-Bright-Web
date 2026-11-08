import React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  getDictionary,
  getDirection,
  isValidLocale,
  LOCALES,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import {
  THEME_INIT_SCRIPT,
  ThemeProvider,
} from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const montserrat = localFont({
  src: "../../../public/fonts/montserrat-latin.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "400 900",
});

const plusJakartaSans = localFont({
  src: "../../../public/fonts/plus-jakarta-sans.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "400 700",
});

const cairo = localFont({
  src: [
    {
      path: "../../../public/fonts/cairo-arabic.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/cairo-latin.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#060608" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return {};
  }
  return buildPageMetadata(locale, "home", "");
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale);
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: BUSINESS_CONFIG.brandName[locale],
    parentOrganization: {
      "@type": "Organization",
      name: BUSINESS_CONFIG.parentOrganization[locale],
    },
    url: `${BUSINESS_CONFIG.domain}/${locale}`,
    telephone: BUSINESS_CONFIG.contact.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Imam Saud Rd, Al Murooj District",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
    hasMap: BUSINESS_CONFIG.contact.mapUrl,
    image: `${BUSINESS_CONFIG.domain}/images/hero/hero-main.jpg`,
    description: dict.meta.home.description,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${plusJakartaSans.variable} ${cairo.variable}`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-light-craftsmen.jpg"
          type="image/jpeg"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-desktop-dark.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[#FBE90A] selection:text-[#060608] overflow-x-hidden max-w-[100vw] w-full">
        <ThemeProvider locale={locale} dir={dir}>
          <div className="flex min-h-screen flex-col overflow-x-hidden max-w-[100vw] w-full">
            <Navbar locale={locale} dict={dict.nav} />
            <main className="flex-1 overflow-x-hidden max-w-[100vw] w-full">{children}</main>
            <Footer locale={locale} dict={dict} />
          </div>
          <FloatingWhatsApp tooltip={dict.footer.floatingWhatsappTooltip} />
        </ThemeProvider>
      </body>
    </html>
  );
}
