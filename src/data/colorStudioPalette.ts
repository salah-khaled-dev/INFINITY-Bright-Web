export type PaintCategoryId =
  | "all"
  | "black"
  | "white"
  | "gray"
  | "silver"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "brown"
  | "special";

export type PaintFinishId = "glossy" | "matte" | "satin" | "metallic";

export interface PaintColorSwatch {
  id: string;
  category: Exclude<PaintCategoryId, "all">;
  hex: string;
  code: string;
  name: {
    en: string;
    ar: string;
  };
  isOriginal?: boolean;
}

export const PAINT_CATEGORIES: Exclude<PaintCategoryId, "all">[] = [
  "black",
  "white",
  "gray",
  "silver",
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "brown",
  "special",
];

export const PAINT_FINISHES: PaintFinishId[] = [
  "glossy",
  "matte",
  "satin",
  "metallic",
];

export const COLOR_STUDIO_SWATCHES: PaintColorSwatch[] = [
  // 1. BLACK
  {
    id: "obsidian-black",
    category: "black",
    hex: "#0D0F14",
    code: "IB-BLK-01",
    name: { en: "Obsidian Factory Black", ar: "أسود أوبسيديان الوكالة" },
    isOriginal: true,
  },
  {
    id: "phantom-carbon",
    category: "black",
    hex: "#181B22",
    code: "IB-BLK-02",
    name: { en: "Phantom Carbon Black", ar: "أسود فانتوم كاربون" },
  },
  {
    id: "onyx-sapphire",
    category: "black",
    hex: "#131926",
    code: "IB-BLK-03",
    name: { en: "Onyx Sapphire Black", ar: "أسود أونيكس ياقوتي" },
  },
  {
    id: "stealth-pitch",
    category: "black",
    hex: "#23262E",
    code: "IB-BLK-04",
    name: { en: "Stealth Graphite Black", ar: "أسود جرافيت ستيلث" },
  },

  // 2. WHITE
  {
    id: "glacier-white",
    category: "white",
    hex: "#EAEFF5",
    code: "IB-WHT-01",
    name: { en: "Glacier Pure White", ar: "أبيض جليدي نقي" },
  },
  {
    id: "alpine-pearl",
    category: "white",
    hex: "#F2EFE6",
    code: "IB-WHT-02",
    name: { en: "Alpine Pearl White", ar: "أبيض لؤلؤي ملكي" },
  },
  {
    id: "carrara-chalk",
    category: "white",
    hex: "#DCDAD2",
    code: "IB-WHT-03",
    name: { en: "Carrara Porcelain White", ar: "أبيض كارارا رخامي" },
  },
  {
    id: "arctic-frost",
    category: "white",
    hex: "#DFE6EE",
    code: "IB-WHT-04",
    name: { en: "Arctic Frost White", ar: "أبيض قطبي ثلجي" },
  },

  // 3. GRAY
  {
    id: "nardo-grey",
    category: "gray",
    hex: "#6E757C",
    code: "IB-GRY-01",
    name: { en: "Nardo Stealth Grey", ar: "رمادي ناردو الرياضي" },
  },
  {
    id: "crayon-chalk",
    category: "gray",
    hex: "#9B9D99",
    code: "IB-GRY-02",
    name: { en: "Chalk Crayon Grey", ar: "رمادي كرايون طباشيري" },
  },
  {
    id: "daytona-gunmetal",
    category: "gray",
    hex: "#454B54",
    code: "IB-GRY-03",
    name: { en: "Daytona Gunmetal", ar: "رمادي دايتونا غامق" },
  },
  {
    id: "brooklyn-slate",
    category: "gray",
    hex: "#5B646D",
    code: "IB-GRY-04",
    name: { en: "Brooklyn Slate Grey", ar: "رمادي بروكلين صخري" },
  },

  // 4. SILVER
  {
    id: "gt-liquid-silver",
    category: "silver",
    hex: "#B8C0C9",
    code: "IB-SLV-01",
    name: { en: "GT Liquid Silver", ar: "فضي جي تي السائل" },
  },
  {
    id: "iridium-silver",
    category: "silver",
    hex: "#9DA5AF",
    code: "IB-SLV-02",
    name: { en: "Iridium Titanium Silver", ar: "فضي إيريديوم تيتانيوم" },
  },
  {
    id: "dolomite-silver",
    category: "silver",
    hex: "#C9D0D8",
    code: "IB-SLV-03",
    name: { en: "Dolomite Ice Silver", ar: "فضي دولوميت بلوري" },
  },
  {
    id: "mercury-platinum",
    category: "silver",
    hex: "#848C96",
    code: "IB-SLV-04",
    name: { en: "Platinum Mercury", ar: "فضي بلاتينيوم زئبقي" },
  },

  // 5. RED
  {
    id: "guards-red",
    category: "red",
    hex: "#C81422",
    code: "IB-RED-01",
    name: { en: "Guards Racing Red", ar: "أحمر غاردز الرياضي" },
  },
  {
    id: "rosso-corsa",
    category: "red",
    hex: "#D9141E",
    code: "IB-RED-02",
    name: { en: "Rosso Corsa Scarlet", ar: "أحمر روسو كورسا" },
  },
  {
    id: "carmine-ruby",
    category: "red",
    hex: "#8C0E20",
    code: "IB-RED-03",
    name: { en: "Carmine Ruby Red", ar: "أحمر كارماين ياقوتي" },
  },
  {
    id: "cherry-bordeaux",
    category: "red",
    hex: "#5B0C1A",
    code: "IB-RED-04",
    name: { en: "Royal Bordeaux Cherry", ar: "عنابي بوردو ملكي" },
  },

  // 6. BLUE
  {
    id: "miami-blue",
    category: "blue",
    hex: "#0088C6",
    code: "IB-BLU-01",
    name: { en: "Miami Riviera Blue", ar: "أزرق ميامي ريفييرا" },
  },
  {
    id: "gentian-blue",
    category: "blue",
    hex: "#12347A",
    code: "IB-BLU-02",
    name: { en: "Gentian Sapphire Blue", ar: "أزرق جينشيان الملكي" },
  },
  {
    id: "marina-blue",
    category: "blue",
    hex: "#21599C",
    code: "IB-BLU-03",
    name: { en: "Marina Bay Blue", ar: "أزرق مارينا باي" },
  },
  {
    id: "midnight-navy",
    category: "blue",
    hex: "#0F2142",
    code: "IB-BLU-04",
    name: { en: "Midnight Deep Navy", ar: "كحلي منتصف الليل" },
  },

  // 7. GREEN
  {
    id: "british-racing-green",
    category: "green",
    hex: "#0D4B32",
    code: "IB-GRN-01",
    name: { en: "British Racing Green", ar: "أخضر بريطاني ملكي" },
  },
  {
    id: "isle-of-man-green",
    category: "green",
    hex: "#0E6D47",
    code: "IB-GRN-02",
    name: { en: "Emerald Isle Green", ar: "أخضر زمردي فاخر" },
  },
  {
    id: "tactical-olive",
    category: "green",
    hex: "#425036",
    code: "IB-GRN-03",
    name: { en: "Urban Olive Green", ar: "أخضر زيتي عسكري" },
  },
  {
    id: "jade-forest",
    category: "green",
    hex: "#155E54",
    code: "IB-GRN-04",
    name: { en: "Deep Jade Forest", ar: "أخضر يشمي عميق" },
  },

  // 8. YELLOW
  {
    id: "infinite-yellow",
    category: "yellow",
    hex: "#FBE90A",
    code: "IB-YLW-01",
    name: { en: "Infinite Racing Yellow", ar: "أصفر إنفينيتي برايت" },
  },
  {
    id: "signal-yellow",
    category: "yellow",
    hex: "#F2B705",
    code: "IB-YLW-02",
    name: { en: "Speed Signal Yellow", ar: "أصفر سيغنال الرياضي" },
  },
  {
    id: "bahama-gold",
    category: "yellow",
    hex: "#D89A16",
    code: "IB-YLW-03",
    name: { en: "Solar Gold Yellow", ar: "ذهبي شمسي فاخر" },
  },
  {
    id: "champagne-yellow",
    category: "yellow",
    hex: "#E5D376",
    code: "IB-YLW-04",
    name: { en: "Champagne Sunburst", ar: "أصفر شامبين ناعم" },
  },

  // 9. ORANGE
  {
    id: "lava-orange",
    category: "orange",
    hex: "#E85312",
    code: "IB-ORG-01",
    name: { en: "Lava Papaya Orange", ar: "برتقالي لافا ناري" },
  },
  {
    id: "volcano-orange",
    category: "orange",
    hex: "#D4380D",
    code: "IB-ORG-02",
    name: { en: "Volcano Magma Orange", ar: "برتقالي بركاني عميق" },
  },
  {
    id: "sunset-copper",
    category: "orange",
    hex: "#C45B24",
    code: "IB-ORG-03",
    name: { en: "Sunset Burnt Copper", ar: "نحاسي الغروب" },
  },
  {
    id: "solar-amber",
    category: "orange",
    hex: "#EE7B18",
    code: "IB-ORG-04",
    name: { en: "Solar Mandarin Amber", ar: "كهرماني شمسي ساطع" },
  },

  // 10. PURPLE
  {
    id: "viola-parsifae",
    category: "purple",
    hex: "#581C87",
    code: "IB-PRP-01",
    name: { en: "Viola Royal Amethyst", ar: "بنفسجي أميثيست ملكي" },
  },
  {
    id: "ultraviolet-rs",
    category: "purple",
    hex: "#3E1975",
    code: "IB-PRP-02",
    name: { en: "Ultraviolet GT", ar: "بنفسجي ألترا فايوليت" },
  },
  {
    id: "midnight-plum",
    category: "purple",
    hex: "#35124A",
    code: "IB-PRP-03",
    name: { en: "Midnight Imperial Plum", ar: "أرجواني ليلي داكن" },
  },
  {
    id: "velvet-magenta",
    category: "purple",
    hex: "#781A5C",
    code: "IB-PRP-04",
    name: { en: "Velvet Berry Magenta", ar: "أرجواني مخملي فاخر" },
  },

  // 11. BROWN
  {
    id: "sahara-bronze",
    category: "brown",
    hex: "#8E5E3B",
    code: "IB-BRN-01",
    name: { en: "Sahara Satin Bronze", ar: "برونزي صحراوي فاخر" },
  },
  {
    id: "espresso-brown",
    category: "brown",
    hex: "#3D281E",
    code: "IB-BRN-02",
    name: { en: "Espresso Macchiato", ar: "بني إسبريسو موكا" },
  },
  {
    id: "cognac-copper",
    category: "brown",
    hex: "#7C4427",
    code: "IB-BRN-03",
    name: { en: "Cognac Saddle Brown", ar: "بني كونياك نحاسي" },
  },
  {
    id: "desert-dune",
    category: "brown",
    hex: "#AD9272",
    code: "IB-BRN-04",
    name: { en: "Riyadh Desert Sand", ar: "رملي صحراوي بيج" },
  },

  // 12. SPECIAL COLORS
  {
    id: "tiffany-riviera",
    category: "special",
    hex: "#1AB2A3",
    code: "IB-SPC-01",
    name: { en: "Tiffany Riviera Mint", ar: "تيفاني فيروزي خاص" },
  },
  {
    id: "rose-gold-couture",
    category: "special",
    hex: "#B97D74",
    code: "IB-SPC-02",
    name: { en: "Rose Gold Couture", ar: "روز جولد كوتور" },
  },
  {
    id: "midnight-aurora-teal",
    category: "special",
    hex: "#0F5466",
    code: "IB-SPC-03",
    name: { en: "Aurora Deep Petrol", ar: "بترولي أورورا خاص" },
  },
  {
    id: "frozen-berry",
    category: "special",
    hex: "#854865",
    code: "IB-SPC-04",
    name: { en: "Frozen Berry Pearl", ar: "فروزن بيري لؤلؤي" },
  },
];

export const SAUDI_POPULAR_MODELS = {
  ar: [
    "تويوتا كامري 2026",
    "تويوتا لاندكروزر 2026",
    "لكزس سيدان ES / LS 2026",
    "لكزس جيب LX600 2026",
    "فورد تورس 2026",
    "نيسان باترول 2026",
    "بي إم دبليو (الفئة 7 / 5 / X7)",
    "فولكس واجن باسات 2026",
    "فولكس واجن تيرامونت 2026",
    "مرسيدس (S-Class / G63)",
    "بي واي دي BYD 2026",
  ],
  en: [
    "Toyota Camry 2026",
    "Toyota Land Cruiser 2026",
    "Lexus ES / LS Sedan 2026",
    "Lexus LX600 SUV 2026",
    "Ford Taurus 2026",
    "Nissan Patrol 2026",
    "BMW 7 / 5 Series & X7",
    "VW Passat 2026",
    "VW Teramont 2026",
    "Mercedes S-Class / G63",
    "BYD Seal / Han 2026",
  ],
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace(/^#/, "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return {
      r: Number.isNaN(r) ? 16 : r,
      g: Number.isNaN(g) ? 18 : g,
      b: Number.isNaN(b) ? 22 : b,
    };
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return {
    r: Number.isNaN(r) ? 16 : r,
    g: Number.isNaN(g) ? 18 : g,
    b: Number.isNaN(b) ? 22 : b,
  };
}

export function isValidHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value.trim());
}
