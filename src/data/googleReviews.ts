/**
 * INFINITY BRIGHT — AUTHENTIC GOOGLE BUSINESS REVIEWS
 * ====================================================
 * Profile: INFINITY BRIGHT | إنفينيتي برايت
 * Official Verified Place ID: ChIJEZgvWSjjLj4R62lmIDiQvvY
 * Shortlink: https://maps.app.goo.gl/H27az9AoXSk6GV3w6?g_st=awb
 *
 * Filter Policy:
 * - Only verified 4-star and 5-star Google customer reviews are featured.
 * - 1-star, 2-star, and 3-star reviews are excluded from the featured testimonials display.
 * - The overall rating (4.6 / 5.0) and total review count (40) reflect the entire unfiltered Google Business Profile.
 */

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  rating: number; // 4 or 5
  relativeTime: {
    ar: string;
    en: string;
  };
  dateIso?: string;
  text: {
    ar: string;
    en: string;
  };
  avatarUrl?: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
}

export interface GoogleBusinessProfileData {
  businessName: {
    ar: string;
    en: string;
  };
  placeId: string;
  overallRating: number;
  totalReviewCount: number;
  mapsUrl: string;
  writeReviewUrl: string;
  viewAllReviewsUrl: string;
  reviews: GoogleReviewItem[];
}

export const GOOGLE_BUSINESS_DATA: GoogleBusinessProfileData = {
  businessName: {
    ar: "إنفينيتي برايت | INFINITY BRIGHT",
    en: "INFINITY BRIGHT",
  },
  placeId: "ChIJEZgvWSjjLj4R62lmIDiQvvY",
  overallRating: 4.6,
  totalReviewCount: 40,
  mapsUrl: "https://maps.app.goo.gl/H27az9AoXSk6GV3w6?g_st=awb",
  writeReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJEZgvWSjjLj4R62lmIDiQvvY",
  viewAllReviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJEZgvWSjjLj4R62lmIDiQvvY",
  reviews: [
    {
      id: "g-rev-01",
      authorName: "نواف العتيبي",
      rating: 5,
      relativeTime: {
        ar: "قبل 3 أشهر",
        en: "3 months ago",
      },
      dateIso: "2026-08-05",
      text: {
        ar: "يعطيكم العافيه على الاحترافيه والشغل الممتاز، شكراً للأخ صلاح.",
        en: "Thank you for the high professionalism and excellent workmanship. Special thanks to Mr. Salah.",
      },
      avatarUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocJlcdVNDoo5EKsZP9WeYZdi5CEQlfn2pklwgFw4QwU4FlVCEQ=s120-c-rp-mo-br100",
      isLocalGuide: true,
      reviewsCount: 11,
    },
    {
      id: "g-rev-02",
      authorName: "Abdullah",
      rating: 5,
      relativeTime: {
        ar: "قبل 6 أشهر",
        en: "6 months ago",
      },
      dateIso: "2026-05-05",
      text: {
        ar: "تعامل راقي جداً من الأخ صلاح يشكر عليه 🙏 شخص نصوح وصادق ما قصر الله يعطيه العافية.",
        en: "Exemplary and classy treatment from Mr. Salah, highly appreciated 🙏 An honest, sincere advisor who went above and beyond.",
      },
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjUxMJSdUdxWyWyEiEnISzdjteh9ucwdxNa-n_lgndnJxyXOVbaq=s120-c-rp-mo-ba12-br100",
      isLocalGuide: true,
      reviewsCount: 12,
    },
    {
      id: "g-rev-03",
      authorName: "Ahmad Ayash",
      rating: 5,
      relativeTime: {
        ar: "قبل 8 أشهر",
        en: "8 months ago",
      },
      dateIso: "2026-03-01",
      text: {
        ar: "شغل نظيف وتعامل محترم خصوصاً الأستاذ صلاح.",
        en: "Clean work and very respectful service, especially from Mr. Salah.",
      },
      avatarUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocIP3qc5IgrEYuQ7Q4T2mengGZ4HSH-wfBq3f5VILovLGaT1Mw=s120-c-rp-mo-br100",
      isLocalGuide: false,
      reviewsCount: 8,
    },
  ],
};

