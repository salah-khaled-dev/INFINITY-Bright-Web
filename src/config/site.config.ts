/**
 * ============================================================================
 * INFINITE BRIGHT — MASTER SITE CONFIGURATION
 * ============================================================================
 * Centralized, strongly typed configuration architecture designed for:
 * 1. Infinite Bright production commercial deployment.
 * 2. Rapid reusability for future client projects and different industries.
 *
 * To rebrand this project for a new client:
 * - Update `brand`, `business`, and `seo` objects below.
 * - Toggle `features` flags as required.
 * - Place new brand assets in `/public/images/`.
 * ============================================================================
 */

export interface BranchLocation {
  id: string;
  brand: "infinite-bright" | "3m" | "partner";
  name: {
    en: string;
    ar: string;
  };
  district: {
    en: string;
    ar: string;
  };
  mapUrl: string;
  image?: string;
}

export interface SiteConfig {
  /** 1. Brand Identity & Visual Assets */
  brand: {
    name: {
      en: string;
      ar: string;
    };
    tagline: {
      en: string;
      ar: string;
    };
    parentOrganization: {
      en: string;
      ar: string;
    };
    commercialRegistration: string;
    domain: string;
    defaultLocale: "ar" | "en";
    defaultTheme: "light" | "dark";
    colors: {
      primaryYellow: string;
      primaryYellowHover: string;
      accentLabelLight: string;
      accentLabelDark: string;
      bgCanvasLight: string;
      bgCanvasDark: string;
      bgSurfaceLight: string;
      bgSurfaceDark: string;
    };
    assets: {
      logoTextEn: string;
      logoTextAr: string;
      nawaderLogo: string;
      threeMLogoOnly: string;
      heroDesktopDark: string;
      heroDesktopLight: string;
      ogImage: string;
    };
  };

  /** 2. Business Contact & Official Channels */
  business: {
    phoneRaw: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    whatsappBaseUrl: string;
    email: string;
    workingHours: {
      en: string;
      ar: string;
    };
    social: {
      whatsapp: string;
      instagram: string;
      tiktok: string;
    };
    flagshipBranch: BranchLocation;
    threeMBranches: BranchLocation[];
    heritage: {
      yearsInKsa: string;
      country: {
        en: string;
        ar: string;
      };
      authorizedPartners: Array<{
        name: string;
        role: {
          en: string;
          ar: string;
        };
      }>;
    };
    warranties: {
      thermalYears: number;
      ppfOpenLifetime: boolean;
      safeRemovalAndPaintGuarantee: boolean;
      accidentReplacementClientCostPercent: number;
    };
    thermalTiers: Array<{
      id: string;
      name: string;
      heatRejection: string;
      shades: string[];
      allShadesAvailable: boolean;
    }>;
  };

  /** 3. Feature Flags & Component Switches */
  features: {
    /** Enable interactive 3D WebGL hero stage on compatible desktop devices */
    enable3DHero: boolean;
    /** Enable 3D Car Color Customizer Studio */
    enableColorStudio: boolean;
    /** Enable Live Window Tint Shade Simulator */
    enableTintSimulator: boolean;
    /** Enable Interactive Before/After Split Transformation Slider */
    enableBeforeAfterShowcase: boolean;
    /** Enable Exclusive VIP Bundles Section */
    enableBundlesSection: boolean;
    /** Enable Arabic/English Language Switcher */
    enableLanguageSwitcher: boolean;
    /** Enable Light/Dark Mode Switcher */
    enableThemeSwitcher: boolean;
    /** Enable Floating WhatsApp Concierge Button */
    enableFloatingWhatsApp: boolean;
    /** Enable Architectural Heritage & Trust Strip */
    enableTrustStrip: boolean;
    /** Enable Customer Reviews (keep false until verified client reviews exist) */
    enableReviews: boolean;
  };

  /** 4. SEO & Verification */
  seo: {
    metadataBase: string;
    twitterHandle?: string;
    googleSiteVerification?: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  brand: {
    name: {
      en: "INFINITE BRIGHT",
      ar: "إنفينيتي برايت",
    },
    tagline: {
      en: "Automotive Perfection & Certified Protection Sanctuary",
      ar: "حماية متقدمة للسيارات وعزل حراري فائق بأعلى المعايير العالمية",
    },
    parentOrganization: {
      en: "Nawader El-Forsan Trading Est.",
      ar: "مؤسسة نوادر الفرسان للتجارة",
    },
    commercialRegistration: "1010421626",
    domain: "https://infinite-bright.com",
    defaultLocale: "ar",
    defaultTheme: "light",
    colors: {
      primaryYellow: "#FBE90A",
      primaryYellowHover: "#fff033",
      accentLabelLight: "#8a7a00",
      accentLabelDark: "#FBE90A",
      bgCanvasLight: "#f8f8f5",
      bgCanvasDark: "#060608",
      bgSurfaceLight: "#ffffff",
      bgSurfaceDark: "#0d0d11",
    },
    assets: {
      logoTextEn: "INFINITE BRIGHT",
      logoTextAr: "إنفينيتي برايت",
      nawaderLogo: "/images/brand/nawader-logo-new.png",
      threeMLogoOnly: "/images/brand/3m-pure-logo.png",
      heroDesktopDark: "/images/hero/hero-desktop-dark.webp",
      heroDesktopLight: "/images/hero/hero-desktop-light.webp",
      ogImage: "/images/hero/hero-main.jpg",
    },
  },

  business: {
    phoneRaw: "+966534422257",
    phoneDisplay: "+966 53 442 2257",
    phoneHref: "tel:+966534422257",
    whatsappNumber: "+966534422257",
    whatsappBaseUrl: "https://wa.me/966534422257",
    email: "concierge@infinite-bright.com",
    workingHours: {
      en: "Daily: 12:00 PM – 10:00 PM",
      ar: "يومياً: 12:00 ظهراً – 10:00 مساءً",
    },
    social: {
      whatsapp: "https://wa.me/966534422257",
      instagram: "https://www.instagram.com/infinity_bright1",
      tiktok: "https://www.tiktok.com/@infinity..bright",
    },
    flagshipBranch: {
      id: "al-murooj-flagship",
      brand: "infinite-bright",
      name: {
        en: "INFINITE BRIGHT Flagship Showroom",
        ar: "الفرع الرئيسي — صالة إنفينيتي برايت",
      },
      district: {
        en: "Riyadh — Al Murooj District, Imam Saud Rd",
        ar: "الرياض — حي المروج، طريق الإمام سعود",
      },
      mapUrl: "https://maps.app.goo.gl/z4WR6VcKYwyj1ggx6?g_st=awb",
      image: "/images/hero/brand-story-studio.jpg",
    },
    threeMBranches: [
      {
        id: "narjis-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Al Narjis Branch",
          ar: "مركز 3M المعتمد — فرع النرجس",
        },
        district: {
          en: "Al Narjis District, Riyadh",
          ar: "حي النرجس، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/25B4YhV9s8pP6W5d8",
      },
      {
        id: "shifa-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Al Shifa Branch",
          ar: "مركز 3M المعتمد — فرع الشفاء",
        },
        district: {
          en: "Al Shifa District, Riyadh",
          ar: "حي الشفاء، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/z4WR6VcKYwyj1ggx6?g_st=awb",
      },
      {
        id: "laban-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Laban Branch",
          ar: "مركز 3M المعتمد — فرع لبن",
        },
        district: {
          en: "Dhahrat Laban District, Riyadh",
          ar: "حي لبن، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/25B4YhV9s8pP6W5d8",
      },
      {
        id: "khurais-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Khurais Branch",
          ar: "مركز 3M المعتمد — فرع خريص",
        },
        district: {
          en: "Khurais Road Center, Riyadh",
          ar: "طريق خريص، تقاطع النهضة",
        },
        mapUrl: "https://maps.app.goo.gl/z4WR6VcKYwyj1ggx6?g_st=awb",
      },
    ],
    heritage: {
      yearsInKsa: "15+",
      country: {
        en: "Kingdom of Saudi Arabia",
        ar: "المملكة العربية السعودية",
      },
      authorizedPartners: [
        {
          name: "3M",
          role: {
            en: "Authorized Dealer & Certified Centers",
            ar: "وكيل معتمد ومراكز معتمدة",
          },
        },
        {
          name: "XPEL",
          role: {
            en: "Contracted Authorized Partner",
            ar: "متعاقد ومعتمد رسمياً",
          },
        },
      ],
    },
    warranties: {
      thermalYears: 10,
      ppfOpenLifetime: true,
      safeRemovalAndPaintGuarantee: true,
      accidentReplacementClientCostPercent: 50,
    },
    thermalTiers: [
      {
        id: "ultra-core",
        name: "Ultra Core",
        heatRejection: "85%",
        shades: ["05%", "15%", "20%", "35%", "50%", "70%"],
        allShadesAvailable: true,
      },
      {
        id: "core-plus",
        name: "Core Plus",
        heatRejection: "65%",
        shades: ["15%", "20%", "35%", "50%", "70%"],
        allShadesAvailable: false,
      },
    ],
  },

  features: {
    enable3DHero: true,
    enableColorStudio: true,
    enableTintSimulator: true,
    enableBeforeAfterShowcase: true,
    enableBundlesSection: true,
    enableLanguageSwitcher: true,
    enableThemeSwitcher: true,
    enableFloatingWhatsApp: true,
    enableTrustStrip: true,
    enableReviews: false, // Disabled until verified third-party reviews exist
  },

  seo: {
    metadataBase: "https://infinite-bright.com",
    twitterHandle: "@infinite_bright_sa",
  },
};

/** Helper to generate pre-filled concierge WhatsApp URL */
export function buildWhatsAppUrl(message?: string): string {
  const base = SITE_CONFIG.business.whatsappBaseUrl;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

