# INFINITE BRIGHT — Routine Maintenance & Stability Guide

This guide provides best practices for maintaining the health, performance, security, and uptime of the **INFINITE BRIGHT** web platform over time.

---

## 1. Routine Maintenance Schedule

| Frequency | Action | Details |
|---|---|---|
| **Monthly** | Dependency security audit | Run `npm audit` and apply non-breaking patches |
| **Quarterly** | Next.js & React minor updates | Test locally with `npm outdated` before deploying |
| **Quarterly** | Broken link & Google Search Console check | Verify 404 logs and sitemap indexing |
| **Bi-annually** | Visual asset review & photo compression | Ensure new portfolio cars use `.webp` format |
| **Annually** | Domain & SSL certificate renewal | Verify auto-renew on registrar and hosting accounts |

---

## 2. Safe Dependency Updating Protocol

To update packages safely without regressions:

1. **Check outdated packages**:
   ```bash
   npm outdated
   ```
2. **Update minor & patch versions only**:
   ```bash
   npm update
   ```
3. **Run TypeScript check**:
   ```bash
   npx tsc --noEmit
   ```
   *Exit code must be 0 before committing.*
4. **Test local development build**:
   ```bash
   npm run build
   ```
5. **Verify key routes**:
   Visit `http://localhost:3000/ar` and `http://localhost:3000/en` to confirm Three.js, GSAP, and forms render smoothly.

---

## 3. Performance Optimization Rules

- **Images**: Always use Next.js `<Image />` with `sizes` and `priority` only on the above-the-fold hero image.
- **Image Formats**: Store all portfolio, showroom, and service images as `.webp` or `.avif` with maximum 1920px width for desktops and 800px width for mobile.
- **Dynamic Imports**: Keep heavy 3D canvases dynamically imported with `ssr: false` so initial HTML delivery remains sub-second.

---

## 4. Disaster Recovery & Backups

- **Git Version Control**: Keep all changes committed to the main Git repository.
- **Hosting Snapshots**: Platforms like Vercel and Netlify maintain instantaneous rollback capabilities — any previous successful deployment can be restored with 1 click in case of emergency.
- **Configuration Backup**: Keep a secured copy of `.env.local` in an encrypted password vault (e.g. 1Password or Bitwarden).

---

## 5. Security Hardening & Dependency Baseline

- **Zero Vulnerability Baseline**: Maintained with `npm audit` yielding 0 findings.
- **Transitive Scoped Overrides**: The `@typescript-eslint/typescript-estree` `minimatch` dependency is strictly pinned to `^11.0.5` via the `overrides` section of `package.json` to resolve GHSA-g3hv-75wg-m249 while keeping ESLint 9 compatible.
- **Security Headers**: Standard headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are enforced in `next.config.ts`.

---

## 6. Official Branch Network Configuration

All showroom and branch entries are centrally managed in `src/config/site.config.ts`:
1. **Flagship Showroom (Infinite Bright)**: Al Murooj District, Imam Saud Rd, Riyadh (`https://maps.app.goo.gl/z4WR6VcKYwyj1ggx6?g_st=awb`)
2. **3M Auto Care — Al Narjis**: Al Narjis District, King Salman Rd, Riyadh (`https://maps.app.goo.gl/Dc79W7M6RvVegiuSA?g_st=awb`)
3. **3M Auto Care — Al Shifa**: Al Shifa District (Al Marwah, Al Ajiri St), Riyadh (`https://www.google.com/maps/search/?api=1&query=3M+%D9%86%D9%88%D8%A7%D8%AF%D8%B1+%D8%A7%D9%84%D9%81%D8%B1%D8%B3%D8%A7%D9%86+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%A2%D8%AC%D8%B1%D9%8A+%D8%AD%D9%8A+%D8%A7%D9%84%D9%85%D8%B1%D9%88%D8%A9+%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D8%A1+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6`)
4. **3M Auto Care — Laban**: Dhahrat Laban District, Al Hayatham St, Riyadh (`https://maps.app.goo.gl/NfCMgkc5aVubVzmEA?g_st=awb`)
5. **3M Auto Care — Khurais**: Khurais Road Center, Jabal Al Jolood St, Riyadh (`https://maps.app.goo.gl/M1PtDCTboRfgAWzW7?g_st=awb`)

