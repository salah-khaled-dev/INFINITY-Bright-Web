# INFINITE BRIGHT — Client Rebranding & Customization Guide

This project is built on an enterprise-grade modular architecture. You can easily rebrand this website for other automotive workshops, luxury detailing centers, yacht brokers, or completely different service industries in less than 30 minutes.

---

## 1. Master Configuration: `src/config/site.config.ts`

Every key parameter is strongly typed in `SITE_CONFIG`. To rebrand:

```typescript
// Open src/config/site.config.ts and update:

export const SITE_CONFIG: SiteConfig = {
  brand: {
    name: {
      en: "YOUR BRAND NAME",
      ar: "اسم علامتك التجارية",
    },
    parentOrganization: {
      en: "Your Parent Company",
      ar: "اسم الشركة الأم",
    },
    commercialRegistration: "1234567890",
    domain: "https://yourdomain.com",
    defaultTheme: "light", // or "dark"
    colors: {
      primaryYellow: "#FBE90A", // Update to brand primary
      // ...
    }
  },
  business: {
    phoneRaw: "+966500000000",
    phoneDisplay: "+966 50 000 0000",
    whatsappNumber: "966500000000",
    whatsappBaseUrl: "https://wa.me/966500000000",
    // ...
  }
};
```

---

## 2. Brand Visual Assets & Logos

All brand logos are located in `public/images/brand/`:

| File | Resolution / Type | Description |
|---|---|---|
| `logo-light.png` | Transparent PNG | Used on dark surfaces & dark mode |
| `logo-dark.png` | Transparent PNG | Used on light porcelain surfaces & light mode |
| `logo-mark.png` | Square icon | Used in mobile favicon, app icons, and badges |
| `nawader-logo.png` | Transparent PNG | Parent organization heritage seal |
| `3m-logo-only.svg` | Scalable Vector | Authorized partner badge |

Simply replace these files with your new brand's vector or transparent PNG assets with identical names.

---

## 3. Theme Colors & CSS Variables: `src/app/globals.css`

The design system uses CSS custom properties defined in `:root` and `.dark`:

```css
:root {
  --brand-yellow: #fbe90a;          /* Primary brand accent */
  --brand-yellow-hover: #f2df00;    /* Interactive hover state */
  --brand-accent-label: #6e6200;    /* High-contrast accessible text in light mode */
  --bg-canvas: #f8f8f5;             /* Light mode luxury porcelain backdrop */
  --bg-surface: #ffffff;            /* Card & container background */
  --border-subtle: rgba(9, 9, 11, 0.09);
}

.dark {
  --brand-yellow: #fbe90a;
  --bg-canvas: #060608;             /* Dark mode deep obsidian */
  --bg-surface: #0d0d11;
}
```

Change `--brand-yellow` to any accent color (e.g. electric cyan `#00F0FF`, emerald `#10B981`, or racing red `#EF4444`) to transform the visual personality instantly.

---

## 4. Feature Switches: `SITE_CONFIG.features`

You can toggle modules on or off without writing any frontend code:

```typescript
features: {
  enable3DHero: true,              // Interactive 3D Three.js showroom
  enableColorStudio: true,         // Vehicle color customizer
  enableTintSimulator: true,       // Interactive window tint slider
  enableBeforeAfterShowcase: true, // Dual before/after comparison
  enableBundlesSection: true,      // VIP discount packages
  enableLanguageSwitcher: true,    // Arabic/English bilingual toggle
  enableThemeSwitcher: true,       // Light/Dark mode switcher
  enableFloatingWhatsApp: true,    // Floating jewel WhatsApp concierge
  enableTrustStrip: true,          // Corporate trust strip
  enableReviews: false,            // Customer reviews section (disabled by default)
}
```

