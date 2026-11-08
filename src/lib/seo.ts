import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"];

export function buildPageMetadata(
  locale: Locale,
  pageKey: PageKey,
  subpath = ""
): Metadata {
  const dict = getDictionary(locale);
  const pageMeta = dict.meta[pageKey];
  const cleanSubpath = subpath ? `/${subpath.replace(/^\//, "")}` : "";
  const baseUrl = BUSINESS_CONFIG.domain;

  const enUrl = `${baseUrl}/en${cleanSubpath}`;
  const arUrl = `${baseUrl}/ar${cleanSubpath}`;
  const canonical = locale === "ar" ? arUrl : enUrl;

  return {
    metadataBase: new URL(baseUrl),
    title: pageMeta.title,
    description: pageMeta.description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      url: canonical,
      siteName: BUSINESS_CONFIG.brandName[locale],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/hero/hero-main.jpg`,
          secureUrl: `${baseUrl}/images/hero/hero-main.jpg`,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: BUSINESS_CONFIG.brandName[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      images: [`${baseUrl}/images/hero/hero-main.jpg`],
    },
  };
}

