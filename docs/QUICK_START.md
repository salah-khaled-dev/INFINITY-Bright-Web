# INFINITE BRIGHT — Developer & Client Quick Start Guide

Welcome to the **INFINITE BRIGHT** luxury digital automotive experience. This guide provides quick commands and setup instructions to get the platform running locally, build for production, and preview all features.

---

## 1. System Requirements

- **Node.js**: `v20.x` or `v22.x` LTS recommended
- **Package Manager**: `npm` (v10+), `pnpm`, or `bun`
- **Modern Browser**: Chrome 120+, Safari 17+, Edge, Firefox (WebGL 2.0 capable)

---

## 2. Installation & Setup

1. **Clone or unzip the project**:
   ```bash
   cd "d:/Apps/New folder"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```

4. **Launch development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Essential Scripts

| Script | Command | Purpose |
|---|---|---|
| **Development** | `npm run dev` | Starts Next.js development server with Turbopack |
| **Type Check** | `npx tsc --noEmit` | Verifies TypeScript types across the entire codebase |
| **Lint** | `npm run lint` | Runs ESLint rules |
| **Production Build** | `npm run build` | Compiles an optimized standalone production build |
| **Production Start** | `npm run start` | Boots the compiled production server on port 3000 |

---

## 4. Key Project Routes

| Route | Description |
|---|---|
| `/[locale]` | Cinematic Hero, Trust Strip, Services Gate, Interactive Teasers, Warranties, Branches |
| `/[locale]/services` | Comprehensive services (PPF, Tinting, Ceramic, Polishing, Color Change, VIP Bundles) |
| `/[locale]/color-studio` | Real-time vehicle wrap color customizer with interactive finish studio |
| `/[locale]/gallery` | Before/after interactive dual-slider transformation showcases |
| `/[locale]/about` | Heritage, 15+ years Nawader El-Forsan Est., official 3M and XPEL partnership credentials |
| `/[locale]/contact` | Direct interactive booking form (body type, service selection) & Riyadh showroom maps |
| `/[locale]/terms` & `/privacy` | Official commercial warranty terms & client data privacy commitments |

---

## 5. Architectural Highlights

- **Default Theme**: Light Mode porcelain luxury finish with instantaneous SSR hydration.
- **RTL/LTR Support**: Fully bi-directional with Cairo typography for Arabic and Plus Jakarta Sans for English.
- **Centralized Configuration**: All brand names, phone numbers, WhatsApp links, and branch addresses are managed in a single file: `src/config/site.config.ts`.
- **Zero Heavy Backend Dependencies**: 100% frontend static-ready, zero database setup needed.

