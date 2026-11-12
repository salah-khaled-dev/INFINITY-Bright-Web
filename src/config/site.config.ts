/**
 * ============================================================================
 * INFINITY BRIGHT — MASTER SITE CONFIGURATION
 * ============================================================================
 * Centralized, strongly typed configuration architecture designed for:
 * 1. Infinity Bright production commercial deployment.
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
  brand: "infinity-bright" | "3m" | "partner";
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
      en: "INFINITY BRIGHT",
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
    domain: process.env.NEXT_PUBLIC_SITE_URL || "https://infinity-bright2.vercel.app",
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
      logoTextEn: "INFINITY BRIGHT",
      logoTextAr: "إنفينيتي برايت",
      nawaderLogo: "/images/brand/nawader-logo.png",
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
    email: "concierge@infinity-bright.com",
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
      brand: "infinity-bright",
      name: {
        en: "INFINITY BRIGHT Flagship Showroom",
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
          en: "Al Narjis District (King Salman Rd), Riyadh",
          ar: "حي النرجس (طريق الملك سلمان الفرعي)، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/Dc79W7M6RvVegiuSA?g_st=awb",
      },
      {
        id: "shifa-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Al Shifa Branch",
          ar: "مركز 3M المعتمد — فرع الشفاء",
        },
        district: {
          en: "Al Shifa District (Al Marwah, Al Ajiri St), Riyadh",
          ar: "حي الشفاء (المروة — شارع الآجري)، الرياض",
        },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=3M+%D9%86%D9%88%D8%A7%D8%AF%D8%B1+%D8%A7%D9%84%D9%81%D8%B1%D8%B3%D8%A7%D9%86+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%A2%D8%AC%D8%B1%D9%8A+%D8%AD%D9%8A+%D8%A7%D9%84%D9%85%D8%B1%D9%88%D8%A9+%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D8%A1+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6",
      },
      {
        id: "laban-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Laban Branch",
          ar: "مركز 3M المعتمد — فرع لبن",
        },
        district: {
          en: "Dhahrat Laban District (Al Hayatham St), Riyadh",
          ar: "حي ظهرة لبن (شارع الهياثم)، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/NfCMgkc5aVubVzmEA?g_st=awb",
      },
      {
        id: "khurais-3m",
        brand: "3m",
        name: {
          en: "3M Auto Care — Khurais Branch",
          ar: "مركز 3M المعتمد — فرع خريص",
        },
        district: {
          en: "Khurais Road Center (Jabal Al Jolood St), Riyadh",
          ar: "طريق خريص (شارع جبل الجلود)، الرياض",
        },
        mapUrl: "https://maps.app.goo.gl/M1PtDCTboRfgAWzW7?g_st=awb",
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
    enableReviews: true, // Enabled with verified Google Business reviews
  },

  seo: {
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL || "https://infinity-bright2.vercel.app",
    twitterHandle: "@infinity_bright_sa",
  },
};

/** Helper to generate pre-filled concierge WhatsApp URL */
export function buildWhatsAppUrl(message?: string): string {
  const base = SITE_CONFIG.business.whatsappBaseUrl;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

