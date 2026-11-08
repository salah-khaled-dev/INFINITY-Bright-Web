# INFINITE BRIGHT — Content Management & Localization Guide

This guide explains how to update editorial copy, service listings, warranty terms, pricing tiers, and translations across the bilingual platform.

---

## 1. Localization Architecture

All text is structured inside bilingual JSON dictionaries:
- **Arabic**: `src/messages/ar.json` (Source of Truth for KSA market)
- **English**: `src/messages/en.json` (International client edition)

The keys are strictly mirrored between both files. When adding a key in `ar.json`, add the equivalent key in `en.json`.

---

## 2. Managing Services & Pricing Tiers

Services are defined in both the dictionary and `src/config/site.config.ts`:

### Updating Core Services in `src/messages/ar.json`:
Locate the `"services"` block:
```json
"services": {
  "ppf": {
    "title": "أفلام حماية الطلاء PPF",
    "tag": "ضمان مفتوح مدى الحياة",
    "description": "أفلام أصلية ذاتية المعالجة ضد الخدوش والترميل..."
  }
}
```

### Updating Thermal Insulation Tiers (`Ultra Core` & `Core Plus`):
In `src/config/site.config.ts`:
```typescript
thermalTiers: [
  {
    id: "ultra-core",
    name: "Ultra Core",
    heatRejection: "85%",
    shades: ["05%", "15%", "20%", "35%", "50%", "70%"],
    allShadesAvailable: true
  },
  {
    id: "core-plus",
    name: "Core Plus",
    heatRejection: "65%",
    shades: ["15%", "20%", "35%", "50%", "70%"],
    allShadesAvailable: false
  }
]
```

---

## 3. Managing Warranties

The 4 official guarantees are displayed on the home page and `/about`:
1. **Lifetime PPF Warranty** (`ضمان مفتوح مدى الحياة`)
2. **10-Year Heat Insulation** (`ضمان 10 سنوات على العزل بنسبة 85%`)
3. **100% Factory Paint Integrity** (`ضمان سلامة البوية 100%`)
4. **50% Accident Replacement Coverage** (`ميزة ضمان الحوادث 50%`)

To modify the descriptions, update the `"warranties"` array in `src/messages/ar.json` and `src/messages/en.json`.

---

## 4. Before/After Transformation Gallery

The interactive dual-slider gallery lives in `src/data/gallery-data.ts` and displays high-resolution side-by-side comparisons.

To add new showcase cases:
1. Place the "before" and "after" images in `public/images/gallery/`.
2. Add an entry to `GALLERY_CASES` in `src/data/gallery-data.ts`:
```typescript
{
  id: "case-05",
  title: { ar: "حماية رانج روفر كاملة", en: "Full Range Rover PPF" },
  vehicle: "Range Rover Autobiography 2025",
  service: "Full Body PPF & Ultra Core Tint",
  beforeImage: "/images/gallery/case-5-before.jpg",
  afterImage: "/images/gallery/case-5-after.jpg",
  badge: "PPF + 85% Tint"
}
```

---

## 5. Contact Form Customization

The interactive quote request form in `src/components/sections/ContactForm.tsx` supports:
- **Vehicle Body Types**: Jeep / SUV (`جيب / دفع رباعي`), Saloon (`صالون`), Sedan (`سيدان`).
- **Services Selection**:
  1. PPF Paint Protection Film (`حماية أفلام الطلاء PPF`)
  2. Window Tinting & Thermal Insulation (`تظليل وعزل حراري Ultra Core`)
  3. Nano Ceramic Coating (`نانو سيراميك`)
  4. Luxury Polishing & Detailing (`تلميع وتفصيل فاخر`)
  5. Color Change & Wrapping (`تغيير لون وتجليد كامل`)

Submitting the form formats a clean, branded WhatsApp message directly directed to the concierge team with zero backend friction.

