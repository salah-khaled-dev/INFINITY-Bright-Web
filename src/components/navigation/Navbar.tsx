"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Globe,
  Home,
  Info,
  Menu,
  Moon,
  Palette,
  Phone,
  PhoneCall,
  Shield,
  Sun,
  X,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { LuxuryIconBadge } from "@/components/ui/LuxuryIconBadge";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary["nav"];
}

export function Navbar({ locale, dict }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const { theme, mounted, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const overDarkHero =
    isHome && mounted && theme === "dark" && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const switchedLocalePath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${otherLocale}`);

  const navLinks = [
    { href: localizedHref(locale, ""), label: dict.home, icon: Home },
    { href: localizedHref(locale, "services"), label: dict.services, icon: Shield },
    { href: localizedHref(locale, "color-studio"), label: dict.colorStudio, icon: Palette },
    { href: localizedHref(locale, "gallery"), label: dict.gallery, icon: Camera },
    { href: localizedHref(locale, "about"), label: dict.about, icon: Info },
    { href: localizedHref(locale, "contact"), label: dict.contact, icon: PhoneCall },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 0px)" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          overDarkHero
            ? "border-b border-white/10 bg-gradient-to-b from-black/75 via-black/35 to-transparent py-4 sm:py-5"
            : "border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] py-3 sm:py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 sm:gap-3 sm:px-8 lg:px-10">
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Mobile Back Button (Visible when visiting subpages on mobile) */}
            {!isHome && (
              <button
                type="button"
                onClick={() => {
                  if (window.history.length > 1) {
                    router.back();
                  } else {
                    router.push(localizedHref(locale, ""));
                  }
                }}
                aria-label={locale === "ar" ? "الرجوع" : "Back"}
                title={locale === "ar" ? "الرجوع" : "Back"}
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all sm:w-auto sm:px-3 sm:gap-1.5 lg:hidden",
                  overDarkHero
                    ? "border-white/20 bg-white/10 text-white hover:border-[#FBE90A]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[#FBE90A]"
                )}
              >
                {locale === "ar" ? (
                  <ArrowRight className="h-4 w-4" />
                ) : (
                  <ArrowLeft className="h-4 w-4" />
                )}
                <span className="hidden sm:inline text-xs font-bold">
                  {locale === "ar" ? "رجوع" : "Back"}
                </span>
              </button>
            )}

            {/* Official Brand Logo */}
            <Link
              href={localizedHref(locale, "")}
              className="group relative flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE90A]"
              aria-label="INFINITE BRIGHT"
            >
              <BrandLogo
                forceDarkSurface={overDarkHero}
                priority
                className="h-7 transition-transform duration-300 group-hover:scale-[1.02] sm:h-9 lg:h-11"
              />
            </Link>
          </div>

          {/* Desktop Center Navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-300 xl:px-4 rtl:text-sm rtl:font-medium rtl:tracking-normal",
                    overDarkHero
                      ? active
                        ? "text-[#FBE90A]"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-[#FBE90A] xl:inset-x-4"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* WhatsApp Quick Button (Desktop & Tablet only — mobile uses floating quick chat) */}
            <a
              href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${dict.whatsapp} (${BUSINESS_CONFIG.contact.phoneDisplay})`}
              className="hidden sm:inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-500/10 text-[#25D366] transition-all duration-300 hover:scale-105 hover:bg-[#25D366] hover:text-white sm:h-10 sm:w-10"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>

            {/* Instagram Quick Link */}
            {BUSINESS_CONFIG.social.instagram && (
              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @infinity_bright1"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-pink-500/35 bg-pink-500/10 text-[#E1306C] transition-all duration-300 hover:scale-105 hover:bg-[#E1306C] hover:text-white md:inline-flex md:h-10 md:w-10"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}

            {/* TikTok Quick Link */}
            {BUSINESS_CONFIG.social.tiktok && (
              <a
                href={BUSINESS_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @infinity..bright"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-cyan-500/35 bg-cyan-500/10 text-cyan-500 dark:text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white md:inline-flex md:h-10 md:w-10"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            )}

            {/* Language Switcher */}
            <Link
              href={switchedLocalePath}
              aria-label={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1 rounded-full border px-2.5 text-xs font-semibold transition-all duration-300 sm:h-10 sm:px-3.5 sm:gap-1.5",
                overDarkHero
                  ? "border-white/20 bg-white/5 text-white hover:border-[#FBE90A] hover:text-[#FBE90A]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              )}
            >
              <Globe className="h-3.5 w-3.5 opacity-80" />
              <span>{locale === "en" ? "AR" : "EN"}</span>
            </Link>

            {/* Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                mounted && theme === "dark" ? dict.lightMode : dict.darkMode
              }
              className={cn(
                "inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10",
                overDarkHero
                  ? "border-white/20 bg-white/5 text-white hover:border-[#FBE90A] hover:text-[#FBE90A]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              )}
            >
              {mounted && theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            {/* Desktop Contact CTA */}
            <Link
              href={localizedHref(locale, "contact")}
              className="hidden items-center gap-2 rounded-full bg-[#FBE90A] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#060608] uppercase shadow-[0_6px_24px_rgba(251,233,10,0.22)] transition-all duration-300 hover:bg-[#fff033] hover:shadow-[0_10px_30px_rgba(251,233,10,0.38)] md:inline-flex rtl:text-xs rtl:tracking-normal"
            >
              <span>{dict.contactCta}</span>
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </Link>

            {/* Mobile Menu Button - ALWAYS FULLY VISIBLE & SHRINK-0 */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? dict.closeMenu : dict.openMenu}
              className={cn(
                "inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10 lg:hidden",
                overDarkHero
                  ? "border-white/20 bg-white/5 text-white hover:border-[#FBE90A]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              )}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[var(--bg-canvas)] px-5 pt-4 pb-8 lg:hidden"
          >
            <div>
              {/* Drawer Top Header with Back / Close Button */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <Link
                  href={localizedHref(locale, "")}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <BrandLogo className="h-8" />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] transition-all hover:border-[#FBE90A] hover:bg-[#FBE90A] hover:text-[#060608]"
                >
                  {locale === "ar" ? (
                    <ArrowRight className="h-4 w-4" />
                  ) : (
                    <ArrowLeft className="h-4 w-4" />
                  )}
                  <span>{locale === "ar" ? "رجوع / إغلاق" : "Back / Close"}</span>
                </button>
              </div>

              {/* Subpage Back Cue in Drawer if not on Home */}
              {!isHome && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-xs">
                  <span className="text-[var(--text-muted)]">
                    {locale === "ar" ? "تتصفح حالياً صفحة فرعية" : "Viewing inner page"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      router.back();
                    }}
                    className="inline-flex items-center gap-1 font-bold text-[var(--brand-accent-label)] hover:underline"
                  >
                    <span>{locale === "ar" ? "الرجوع للسابق ←" : "← Go Back"}</span>
                  </button>
                </div>
              )}

              {/* Navigation Items in Luxury Card List */}
              <nav aria-label="Mobile" className="mt-4 space-y-2">
                {navLinks.map((item, idx) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={prefersReduced ? false : { opacity: 0, x: locale === "ar" ? 14 : -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setMobileOpen(false);
                          if (pathname === item.href) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border p-4 text-base font-bold transition-all",
                          active
                            ? "border-[#FBE90A]/70 bg-[#FBE90A]/10 text-[var(--brand-accent-label)] shadow-sm"
                            : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                        )}
                      >
                        <span className="flex items-center gap-3.5">
                          <LuxuryIconBadge icon={Icon} size="sm" />
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 rtl:-scale-x-100",
                            active ? "text-[#FBE90A]" : "opacity-40"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Controls: Language, Theme, Contact */}
            <div className="mt-6 space-y-4 border-t border-[var(--border-subtle)] pt-5">
              {/* Quick Language & Theme Toggles */}
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href={switchedLocalePath}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3 text-xs font-bold text-[var(--text-primary)]"
                >
                  <Globe className="h-4 w-4 opacity-75" />
                  <span>{locale === "en" ? "العربية (AR)" : "English (EN)"}</span>
                </Link>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3 text-xs font-bold text-[var(--text-primary)]"
                >
                  {mounted && theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>{locale === "ar" ? "الوضع الليلي" : "Dark Mode"}</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>{locale === "ar" ? "الوضع النهاري" : "Light Mode"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels in Drawer: Instagram & TikTok */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={BUSINESS_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/10 py-3 text-xs font-bold text-[#E1306C]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-3 text-xs font-bold text-cyan-500 dark:text-cyan-300"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span>TikTok</span>
                </a>
              </div>

              {/* Direct Booking & Calling Bar */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-xs font-extrabold text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:bg-[#20ba5a]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-white" />
                  <span>{dict.whatsapp}</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.contact.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] py-3.5 text-xs font-bold text-[var(--text-primary)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>{dict.callUs}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
