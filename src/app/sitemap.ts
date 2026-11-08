import type { MetadataRoute } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { LOCALES } from "@/lib/i18n";

const ROUTES = [
  "",
  "/about",
  "/services",
  "/color-studio",
  "/gallery",
  "/contact",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS_CONFIG.domain;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority:
          route === ""
            ? 1
            : route === "/terms" || route === "/privacy"
              ? 0.65
              : 0.85,
        alternates: {
          languages: {
            en: `${base}/en${route}`,
            ar: `${base}/ar${route}`,
          },
        },
      });
    }
  }

  return entries;
}
