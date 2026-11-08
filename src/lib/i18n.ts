import type { Locale } from "@/types";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

export const LOCALES: readonly Locale[] = ["en", "ar"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = typeof enMessages;

const dictionaries: Record<Locale, Dictionary> = {
  en: enMessages,
  ar: arMessages,
};

export function isValidLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function localizedHref(locale: Locale, subpath = ""): string {
  const clean = subpath.startsWith("/") ? subpath : subpath ? `/${subpath}` : "";
  return `/${locale}${clean}`;
}

