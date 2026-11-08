# INFINITE BRIGHT — Luxury Automotive Digital Experience

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-049EF4?style=flat&logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-yellow.svg)](./docs/CLIENT_OWNERSHIP.md)

**INFINITE BRIGHT** (Affiliated with **Nawader El-Forsan Trading Est.** — CR `1010421626`) is a high-performance, bilingual (Arabic RTL & English LTR) digital experience designed for luxury automotive protection, paint protection films (PPF), advanced thermal insulation, and bespoke detailing in the Kingdom of Saudi Arabia.

Built with an enterprise-grade modular architecture, this project also serves as a battle-tested foundation that can be adapted and rebranded for new client projects across any industry in minutes.

---

## Key Features

- **Light Mode Default with Instant Hydration**: Elegant porcelain luxury finish on initial visit, with smooth transition to dark obsidian mode.
- **Cinematic 3D & 2D Hybrid Hero**: Interactive Three.js WebGL showroom with graceful zero-delay fallback and optimized mobile composition.
- **Mobile-First Luxury Experience**: Native iOS and Android optimizations, safe-area inset support, smooth touch handling, and automatic font-size zoom prevention on mobile inputs.
- **Bilingual RTL / LTR Architecture**: Native Cairo typography tailored for Arabic readers, paired with Plus Jakarta Sans and Montserrat for English.
- **Centralized Master Configuration (`src/config/site.config.ts`)**: Strongly typed control center for all brand parameters, business hours, contact numbers, branch networks, and feature toggles.
- **Bespoke Luxury Medallions (`LuxuryGuaranteeIcon.tsx`)**: Custom gold vector automotive emblems for the 4 official client guarantees (Lifetime PPF, 10-Yr 85% Thermal, 100% Paint Safety, 50% Accident Coverage).
- **Interactive Tools**:
  - **Color Studio**: Real-time vehicle wrap color customizer.
  - **Before & After Gallery**: High-resolution dual-slider comparison showcase.
  - **Direct WhatsApp Concierge**: Instant booking with deduplicated service options and vehicle body type selection (Jeep, Saloon, Sedan).
- **Zero Backend Overhead**: 100% frontend static-ready, zero database maintenance required.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start local development server
npm run dev

# 4. Verify TypeScript types
npx tsc --noEmit

# 5. Build for production
npm run build
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Documentation Package

Comprehensive operational and client handover guides are available in the [`docs/`](./docs/) directory:

| Guide | Description |
|---|---|
| [**Quick Start Guide**](./docs/QUICK_START.md) | Commands, setup, and route reference |
| [**Client Branding Guide**](./docs/CLIENT_BRANDING_GUIDE.md) | How to rebrand this project for new clients in minutes |
| [**Content Management**](./docs/CONTENT_MANAGEMENT.md) | Editing services, pricing tiers, and bilingual dictionaries |
| [**Deployment Guide**](./docs/DEPLOYMENT.md) | Step-by-step instructions for Vercel, Netlify, Docker, and VPS |
| [**Asset Licenses**](./docs/ASSET_LICENSES.md) | Commercial rights inventory for logos, fonts, 3D models, and photography |
| [**Client Ownership**](./docs/CLIENT_OWNERSHIP.md) | IP ownership transfer and administrative credentials handover checklist |
| [**Maintenance Guide**](./docs/MAINTENANCE.md) | Routine updates, security audits, and disaster recovery |
| [**Final Delivery Report**](./docs/FINAL_DELIVERY_REPORT.md) | 14-point production verification audit |

---

## Project Structure

```text
├── docs/                      # Comprehensive client handover package
├── public/
│   ├── images/
│   │   ├── brand/             # Logos, marks, and partner badges
│   │   ├── hero/              # Optimized WebP studio backdrops
│   │   ├── services/          # High-resolution service photography
│   │   └── gallery/           # Before & after portfolio assets
│   ├── models/                # 3D automotive models for Three.js
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── app/                   # Next.js App Router (bilingual [locale] routes)
│   ├── components/
│   │   ├── hero/              # Cinematic hero (3D scene, fallbacks, mobile composition)
│   │   ├── home/              # Trust strip, services gate, interactive teasers, warranties
│   │   ├── layout/            # Luxury responsive Footer & navigation
│   │   ├── navigation/        # Floating & sticky responsive Navbar
│   │   ├── providers/         # ThemeProvider (Light mode default)
│   │   ├── sections/          # Feature sections & interactive contact booking form
│   │   └── ui/                # LuxuryIconBadge, LuxuryGuaranteeIcon, SocialIcons, Reveal
│   ├── config/
│   │   ├── site.config.ts     # MASTER centralized typed configuration
│   │   └── business.ts        # Backwards-compatible configuration adapter
│   ├── data/                  # Color studio and gallery cases data
│   ├── hooks/                 # Performance, device detection, and motion preference hooks
│   ├── lib/                   # i18n dictionaries, utils, and SEO metadata generators
│   └── messages/              # ar.json & en.json bilingual translation dictionaries
├── .env.example               # Environment variables template
├── next.config.ts             # Next.js production configuration
└── package.json               # Dependencies and build scripts
```

---

## Corporate Affiliation & Verified Credentials

- **Brand**: INFINITE BRIGHT (إنفينيتي برايت)
- **Parent Establishment**: Nawader El-Forsan Trading Est. (مؤسسة نوادر الفرسان للتجارة)
- **Commercial Registration (CR)**: `1010421626` (Displayed in Footer)
- **Official Contact**: `+966 53 442 2257` | [WhatsApp Concierge](https://wa.me/966534422257)
- **Flagship Showroom**: Riyadh — Al Murooj District, Imam Saud Road
- **Authorized Partnerships**: 3M Authorized Dealer & XPEL Partner

