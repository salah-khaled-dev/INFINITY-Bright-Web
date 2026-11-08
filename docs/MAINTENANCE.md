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

