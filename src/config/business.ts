/**
 * INFINITE BRIGHT — BUSINESS CONFIGURATION ADAPTER
 * ===================================================
 * Harmonized with `src/config/site.config.ts`.
 * Serves as the stable backwards-compatible adapter for existing components,
 * while centralizing all runtime parameters inside `SITE_CONFIG`.
 */

import { SITE_CONFIG, type BranchLocation, buildWhatsAppUrl as siteBuildWhatsAppUrl } from "./site.config";

export type { BranchLocation };
export { SITE_CONFIG };

export const BUSINESS_CONFIG = {
  brandName: SITE_CONFIG.brand.name,
  parentOrganization: SITE_CONFIG.brand.parentOrganization,
  commercialRegistration: SITE_CONFIG.brand.commercialRegistration,
  heritage: SITE_CONFIG.business.heritage,
  warranties: SITE_CONFIG.business.warranties,
  thermalTiers: SITE_CONFIG.business.thermalTiers,
  flagshipBranch: SITE_CONFIG.business.flagshipBranch,
  threeMBranches: SITE_CONFIG.business.threeMBranches,
  domain: SITE_CONFIG.brand.domain,

  contact: {
    phoneRaw: SITE_CONFIG.business.phoneRaw,
    phoneDisplay: SITE_CONFIG.business.phoneDisplay,
    phoneHref: SITE_CONFIG.business.phoneHref,
    whatsappBaseUrl: SITE_CONFIG.business.whatsappBaseUrl,
    email: SITE_CONFIG.business.email || null,
    address: SITE_CONFIG.business.flagshipBranch.district,
    mapUrl: SITE_CONFIG.business.flagshipBranch.mapUrl,
    workingHours: SITE_CONFIG.business.workingHours,
  },

  placeholders: {
    email: {
      en: "[Official Email — Configurable in site.config.ts]",
      ar: "[البريد الرسمي — قابل للتعديل في ملف الإعدادات]",
    },
    address: SITE_CONFIG.business.flagshipBranch.district,
    workingHours: SITE_CONFIG.business.workingHours,
  },

  social: SITE_CONFIG.business.social,

  assets: {
    logoDark: "/images/brand/logo-dark.png",
    logoLight: "/images/brand/logo-light.png",
    logoMark: "/images/brand/logo-mark.png",
    nawaderLogo: SITE_CONFIG.brand.assets.nawaderLogo,
    threeMLogoOnly: SITE_CONFIG.brand.assets.threeMLogoOnly,
    logoWidth: 872,
    logoHeight: 320,
  },

  brandColors: {
    yellow: SITE_CONFIG.brand.colors.primaryYellow,
    obsidian: "#060607",
    charcoal: "#101014",
    alabaster: SITE_CONFIG.brand.colors.bgCanvasLight,
  },
} as const;

export const buildWhatsAppUrl = siteBuildWhatsAppUrl;
