# INFINITE BRIGHT — Production Deployment Guide

This guide covers production deployment for **INFINITE BRIGHT** across Vercel, Netlify, Docker, and standard Linux VPS servers.

---

## 1. Zero-Config Deployment on Vercel (Recommended)

Next.js is developed by Vercel; deploying on Vercel delivers maximum performance with automatic global edge caching, image optimization, and instant SSL.

1. **Connect GitHub/GitLab repository** to Vercel.
2. **Framework Preset**: Select `Next.js`.
3. **Environment Variables**:
   Add the following in Project Settings -> Environment Variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://infinitebright.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=966534422257
   ```
4. **Deploy**: Click **Deploy**. Vercel will automatically build and distribute the app across its global CDN.

---

## 2. Deployment on Linux VPS (Ubuntu / Debian + Nginx + PM2)

If hosting on a dedicated VPS or cloud instance:

### Step 1: Install Node.js 20 & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

### Step 2: Clone and Build
```bash
git clone <repo-url> /var/www/infinite-bright
cd /var/www/infinite-bright
npm install
npm run build
```

### Step 3: Run with PM2
```bash
pm2 start npm --name "infinite-bright" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/infinite-bright`:
```nginx
server {
    listen 80;
    server_name infinitebright.com www.infinitebright.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site and obtain a free Let's Encrypt SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/infinite-bright /etc/nginx/sites-enabled/
sudo certbot --nginx -d infinitebright.com -d www.infinitebright.com
sudo systemctl restart nginx
```

---

## 3. Docker Deployment

A minimal Dockerfile for containerized deployment:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 4. Post-Deployment Verification Checklist

- [ ] SSL certificate active (HTTPS padlock visible).
- [ ] Root redirect tests: Visiting `/` redirects cleanly to `/ar` (default Saudi locale).
- [ ] Both `/ar` and `/en` resolve with correct `lang` and `dir="rtl"` / `dir="ltr"` attributes.
- [ ] Dark/Light mode toggle functions smoothly without flash of unstyled content (FOUC).
- [ ] Floating WhatsApp button launches directly to `https://wa.me/966534422257`.
- [ ] All 4 branch Google Maps links open accurately.
- [ ] Lighthouse Performance score > 90 on mobile & desktop.

