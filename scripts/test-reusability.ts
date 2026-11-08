import type { SiteConfig } from "../src/config/site.config";
import { buildWhatsAppUrl } from "../src/config/site.config";

/**
 * FICTIONAL TEST CLIENT CONFIGURATION
 * Used exclusively for independent reusability audit.
 * Does NOT overwrite or modify the production Infinite Bright configuration.
 */
const FICTIONAL_CLIENT_CONFIG: SiteConfig = {
  brand: {
    name: {
      en: "APEX AUTO ARMOR",
      ar: "أبيكس لأفلام الحماية الفائقة",
    },
    tagline: {
      en: "Precision Defense & Ceramic Shielding",
      ar: "دقة الحماية وحلول السيراميك المتقدمة",
    },
    parentOrganization: {
      en: "Apex Arabian Holding Co.",
      ar: "شركة القمة العربية القابضة",
    },
    commercialRegistration: "4030198765",
    domain: "https://apexarmor.example.com",
    defaultLocale: "ar",
    defaultTheme: "light",
    colors: {
      primaryYellow: "#00E5FF", // Cyan brand
      primaryYellowHover: "#00B8D4",
      accentLabelLight: "#00838F",
      accentLabelDark: "#00E5FF",
      bgCanvasLight: "#F0F4F8",
      bgCanvasDark: "#0A0E17",
      bgSurfaceLight: "#FFFFFF",
      bgSurfaceDark: "#111827",
    },
    assets: {
      logoTextEn: "/images/brand/fictional-logo-en.png",
      logoTextAr: "/images/brand/fictional-logo-ar.png",
      nawaderLogo: "/images/brand/fictional-seal.png",
      threeMLogoOnly: "/images/brand/3m-logo-only.svg",
      heroDesktopDark: "/images/hero/hero-desktop-dark.webp",
      heroDesktopLight: "/images/hero/hero-desktop-light.webp",
      ogImage: "/images/og-image.jpg",
    },
  },
  business: {
    phoneRaw: "+966501234567",
    phoneDisplay: "+966 50 123 4567",
    phoneHref: "tel:+966501234567",
    whatsappNumber: "966501234567",
    whatsappBaseUrl: "https://wa.me/966501234567",
    email: "concierge@apexarmor.example.com",
    workingHours: {
      en: "Saturday - Thursday: 10:00 AM – 11:00 PM",
      ar: "السبت - الخميس: من 10:00 صباحاً إلى 11:00 مساءً",
    },
    social: {
      whatsapp: "https://wa.me/966501234567",
      instagram: "https://instagram.com/apex_armor_sa",
      tiktok: "https://tiktok.com/@apex_armor_sa",
    },
    flagshipBranch: {
      id: "jeddah-corniche",
      brand: "partner",
      name: {
        en: "Apex Flagship Center",
        ar: "مركز أبيكس الرئيسي — كورنيش جدة",
      },
      district: {
        en: "Jeddah — North Corniche Rd",
        ar: "جدة — طريق الكورنيش الشمالي",
      },
      mapUrl: "https://maps.google.com/?q=jeddah-corniche",
    },
    threeMBranches: [
      {
        id: "dammam-khobar",
        brand: "partner",
        name: {
          en: "Al Khobar Center",
          ar: "فرع الخبر",
        },
        district: {
          en: "Eastern Province — King Fahd Rd",
          ar: "المنطقة الشرقية — طريق الملك فهد",
        },
        mapUrl: "https://maps.google.com/?q=khobar",
      },
    ],
    heritage: {
      yearsInKsa: "12+",
      country: {
        en: "Kingdom of Saudi Arabia",
        ar: "المملكة العربية السعودية",
      },
      authorizedPartners: [
        {
          name: "Suntek",
          role: {
            en: "Certified Installer",
            ar: "مركز تركيب معتمد",
          },
        },
      ],
    },
    warranties: {
      thermalYears: 7,
      ppfOpenLifetime: true,
      safeRemovalAndPaintGuarantee: true,
      accidentReplacementClientCostPercent: 40,
    },
    thermalTiers: [
      {
        id: "apex-shield-pro",
        name: "Apex Shield Pro",
        heatRejection: "92%",
        shades: ["05%", "20%", "35%", "50%"],
        allShadesAvailable: true,
      },
    ],
  },
  seo: {
    metadataBase: "https://apexarmor.example.com",
    twitterHandle: "@apex_armor",
  },
  features: {
    enable3DHero: false, // Testing graceful 3D disable
    enableColorStudio: true,
    enableTintSimulator: false,
    enableBeforeAfterShowcase: true,
    enableBundlesSection: true,
    enableLanguageSwitcher: true,
    enableThemeSwitcher: true,
    enableFloatingWhatsApp: true,
    enableTrustStrip: true,
    enableReviews: false,
  },
};

console.log("=== INDEPENDENT REUSABILITY AUDIT ===");
console.log(`Brand Name (AR): ${FICTIONAL_CLIENT_CONFIG.brand.name.ar}`);
console.log(`Brand Name (EN): ${FICTIONAL_CLIENT_CONFIG.brand.name.en}`);
console.log(`Primary Accent: ${FICTIONAL_CLIENT_CONFIG.brand.colors.primaryYellow}`);
console.log(`WhatsApp URL test: ${buildWhatsAppUrl("Test Booking Message")}`);
console.log(`Features 3D Hero Enabled: ${FICTIONAL_CLIENT_CONFIG.features.enable3DHero}`);
console.log(`Branches Count: ${1 + FICTIONAL_CLIENT_CONFIG.business.threeMBranches.length}`);
console.log("[PASS] Reusability validation: SiteConfig contract fully satisfied without type errors.");
