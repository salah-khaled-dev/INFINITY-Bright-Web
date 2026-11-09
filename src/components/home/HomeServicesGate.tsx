"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Percent,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wrench,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface HomeServicesGateProps {
  locale: Locale;
  dict: {
    eyebrow: string;
    headline: string;
    description: string;
    viewAllServices: string;
    cards: {
      ppf: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      tinting: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      ceramic: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      detailing: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
      bundles: {
        title: string;
        tag: string;
        badge: string;
        description: string;
        cta: string;
      };
    };
  };
}

type ServiceKey = "ppf" | "tinting" | "ceramic" | "detailing" | "bundles";

export function HomeServicesGate({ locale, dict }: HomeServicesGateProps) {
  const isAr = locale === "ar";
  const prefersReduced = useReducedMotion();
  const [activeKey, setActiveKey] = useState<ServiceKey>("ppf");
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin: "0px", threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const services: Array<{
    key: ServiceKey;
    index: string;
    data: (typeof dict.cards)[ServiceKey];
    image: string;
    video?: string;
    videoPoster?: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    highlights: string[];
    waMessage: string;
  }> = [
    {
      key: "ppf",
      index: "01",
      data: dict.cards.ppf,
      image: "/images/services/ppf-installation.jpg",
      video: "/videos/Installer_applying_film_to_car_1099074e_1080p.mp4",
      videoPoster: "/images/services/ppf-installation.jpg",
      href: `${localizedHref(locale, "services")}#ppf`,
      icon: ShieldCheck,
      highlights: isAr
        ? [
            "أفلام أصلية ذاتية المعالجة ضد الخدوش والترميل",
            "ضمان مفتوح مدى الحياة مع سلامة بوية الوكالة 100%",
            "ميزة حصرية: ضمان الحوادث بتكلفة 50% فقط للعميل",
          ]
        : [
            "Genuine self-healing films against rock chips & sandstorms",
            "Open Lifetime Warranty with 100% factory paint safety",
            "Exclusive advantage: 50% accident panel replacement",
          ],
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز باقة حماية الطلاء PPF (ضمان مفتوح مدى الحياة)."
        : "Hello INFINITY BRIGHT, I would like to inquire about Paint Protection Film (PPF) packages.",
    },
    {
      key: "tinting",
      index: "02",
      data: dict.cards.tinting,
      image: "/images/services/window-tinting.jpg",
      video: "/videos/Technician_installing_window_film_ae402102_1080p.mp4",
      videoPoster: "/images/services/window-tinting.jpg",
      href: `${localizedHref(locale, "services")}#heat-insulation`,
      icon: SunMedium,
      highlights: isAr
        ? [
            "فئة Ultra Core: عزل حراري فائق 85% لجميع درجات التظليل",
            "فئة Core Plus: عزل حراري متوازن 65% ووضوح بصري نقي",
            "ضمان معتمد لمدة 10 سنوات بدون أي تشويش للإشارات",
          ]
        : [
            "Ultra Core Series: 85% heat insulation across all tint shades",
            "Core Plus Series: 65% heat insulation with crystal clarity",
            "10-Year Certified Warranty with zero signal interference",
          ],
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار عن عزل وتظليل Ultra Core (عزل 85% لجميع الدرجات — ضمان 10 سنوات)."
        : "Hello INFINITY BRIGHT, I would like to inquire about Ultra Core 85% Thermal Insulation.",
    },
    {
      key: "ceramic",
      index: "03",
      data: dict.cards.ceramic,
      image: "/images/services/ceramic-coating.jpg",
      video: "/videos/Technician_applying_ceramic_coating_401d402c_1080p.mp4",
      videoPoster: "/images/services/ceramic-coating.jpg",
      href: `${localizedHref(locale, "services")}#ceramic-coating`,
      icon: Sparkles,
      highlights: isAr
        ? [
            "ترابط نانوي زجاجي يمنح لمعاناً مرآوياً فائق النعومة",
            "طرد جزيئي فائق للمياه والزيوت والغبار لسهولة الغسيل",
            "حماية متكاملة للطلاء والجنوط والمقصورة الجلدية",
          ]
        : [
            "Covalent nano-glass bonding for ultra-deep mirror gloss",
            "Extreme hydrophobic water and grime beading for easy washing",
            "Complete exterior paint, wheel, and interior leather protection",
          ],
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز خدمة النانو سيراميك الداخلي والخارجي."
        : "Hello INFINITY BRIGHT, I would like to inquire about Nano Ceramic packages.",
    },
    {
      key: "detailing",
      index: "04",
      data: dict.cards.detailing,
      image: "/images/services/car-detailing.jpg",
      video: "/videos/Detailer_polishing_car_hood_4c33bcd6_1080p.mp4",
      videoPoster: "/videos/hero-mobile-detailer-poster.webp",
      href: `${localizedHref(locale, "services")}#car-detailing`,
      icon: Wrench,
      highlights: isAr
        ? [
            "تلميع آلي احترافي متعدد المراحل لإزالة الدوائر والبهتان بالكامل",
            "استعادة بريق الوكالة المرآوي والعمق اللوني للطلاء",
            "عناية فائقة وتطهير وتعقيم عميق للفرش الداخلي والجلود",
          ]
        : [
            "Multi-stage precision machine polishing removing swirl marks",
            "Showroom mirror clarity and depth restoration",
            "Deep interior conditioning, leather care, and sanitization",
          ],
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار وحجز خدمة التلميع والتفصيل الفاخر (Car Detailing)."
        : "Hello INFINITY BRIGHT, I would like to inquire about Automotive Polishing & Detailing.",
    },
    {
      key: "bundles",
      index: "05",
      data: dict.cards.bundles,
      image: "/images/services/paint-protection.jpg",
      href: `${localizedHref(locale, "services")}#bundles`,
      icon: Percent,
      highlights: isAr
        ? [
            "باقة شاملة: حماية PPF كاملة + عزل حراري + نانو سيراميك",
            "خصم خاص 35% على السعر الإجمالي للباقة الكاملة",
            "هدية فاخرة: حماية داخلية وتغليف شاشات مجاناً",
          ]
        : [
            "All-Inclusive Bundle: Full PPF + Thermal Film + Ceramic Coating",
            "Exclusive 35% savings on total package value",
            "Luxury Complimentary Gift: interior protection & screen shields",
          ],
      waMessage: isAr
        ? "مرحباً إنفينيتي برايت، أود الاستفسار عن باقات VIP الحصرية (خصم 35% + هدية خاصة)."
        : "Hello INFINITY BRIGHT, I would like to inquire about the Exclusive VIP 35% Bundles.",
    },
  ];

  const current = services.find((s) => s.key === activeKey) ?? services[0];
  const CurrentIcon = current.icon;

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Editorial Section Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end sm:mb-10">
          <Reveal className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                {dict.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.headline}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {dict.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href={localizedHref(locale, "services")}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-bold tracking-wider text-[var(--text-primary)] uppercase transition-all duration-300 hover:border-[var(--brand-yellow)] hover:bg-[var(--bg-elevated)]"
            >
              <span>{dict.viewAllServices}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
            </Link>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* Luxury Automotive Interactive Control Tabs (Mobile Horizontal Swipe & Desktop) */}
        {/* ========================================================================= */}
        <Reveal delay={0.05} className="mb-6 sm:mb-8">
          <div
            role="tablist"
            aria-label={dict.headline}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar sm:grid sm:grid-cols-5 sm:gap-2.5 lg:gap-3"
          >
            {services.map((item) => {
              const isActive = item.key === activeKey;
              const TabIcon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(item.key)}
                  className={cn(
                    "group relative flex min-h-[54px] shrink-0 items-center gap-2 rounded-2xl border px-3 py-2.5 text-start transition-all duration-300 sm:w-full sm:min-h-[60px] sm:gap-2 sm:px-2.5 sm:py-3 lg:gap-2.5 lg:px-3 lg:py-3.5 xl:gap-3 xl:px-4",
                    isActive
                      ? "border-[var(--brand-yellow)] bg-[var(--bg-surface)] shadow-[var(--shadow-subtle)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-7.5 sm:w-7.5 lg:h-8.5 lg:w-8.5 xl:h-9 xl:w-9",
                      isActive
                        ? "bg-[var(--brand-yellow)] text-[#242522] shadow-xs"
                        : "border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                    )}
                  >
                    <TabIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 xl:h-4.5 xl:w-4.5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-mono text-[9px] font-bold tracking-wider uppercase xl:text-[10px]",
                        isActive
                          ? "text-[var(--brand-accent-label)]"
                          : "text-[var(--text-muted)]"
                      )}
                    >
                      {item.index} // {item.data.badge}
                    </span>
                    <span
                      className={cn(
                        "block text-xs font-extrabold leading-snug transition-colors sm:text-[11px] lg:text-[12px] xl:text-[13px]",
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.data.title}
                    </span>
                  </div>

                  {isActive && (
                    <span className="absolute bottom-0 start-6 end-6 h-[2px] rounded-full bg-[var(--brand-yellow)]" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* The Central Interactive Stage — Cinematic Visual + High-Converting Story  */}
        {/* ========================================================================= */}
        <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-[var(--shadow-elevated)] transition-all duration-500">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* 1. Large High-Resolution Automotive Showcase Visual (7 Cols) */}
            <div className="relative min-h-[320px] overflow-hidden bg-[#151614] sm:min-h-[420px] lg:col-span-7 lg:min-h-[540px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 1.04 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {isInView && current.video && !prefersReduced ? (
                    <video
                      key={current.video}
                      ref={(el) => {
                        if (el) {
                          el.defaultMuted = true;
                          el.muted = true;
                          el.play().catch(() => {});
                        }
                      }}
                      src={current.video}
                      poster={current.videoPoster || current.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={current.image}
                      alt={current.data.title}
                      fill
                      priority={false}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  )}
                  {/* Subtle Multi-Stop Vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Badges inside the Media */}
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  <span>{current.data.tag}</span>
                </span>

                <div className="flex items-center gap-2">
                  {current.video && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{isAr ? "فيديو عملي مباشر" : "Live Video"}</span>
                    </span>
                  )}
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/65 text-[var(--brand-yellow)] shadow-sm backdrop-blur-md">
                    <CurrentIcon className="h-4.5 w-4.5" />
                  </span>
                </div>
              </div>

              <div className="absolute bottom-5 start-5 z-10">
                <span className="inline-flex items-center rounded-md bg-[var(--brand-yellow)] px-3 py-1 font-mono text-[11px] font-black tracking-wider text-[#242522] uppercase shadow-md">
                  {current.data.badge}
                </span>
              </div>
            </div>

            {/* 2. Direct-Response Editorial Panel & Instant Conversion CTAs (5 Cols) */}
            <div className="flex flex-col justify-between space-y-6 p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
                      DISCIPLINE // {current.index}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                      {current.data.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {current.data.description}
                    </p>
                  </div>

                  {/* Bullet Benefits Spec (Why choose this service now) */}
                  <div className="space-y-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-5">
                    {current.highlights.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs font-medium text-[var(--text-primary)] sm:text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Conversion Buttons — Instant Consultation & Full Details */}
              <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href={buildWhatsAppUrl(current.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-5 py-3.5 text-xs font-black text-[#042813] uppercase shadow-xs transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-md sm:text-sm"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 text-[#042813]" />
                  <span className="font-black text-[#042813]">
                    {isAr ? "احجز موعد عبر واتساب" : "Book Appointment via WhatsApp"}
                  </span>
                </a>

                <Link
                  href={current.href}
                  className="group/cta flex min-h-[44px] w-full items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs font-bold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--brand-yellow)] hover:bg-[var(--bg-surface)] sm:text-sm"
                >
                  <span>{current.data.cta}</span>
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 text-[var(--text-secondary)] group-hover/cta:text-[var(--text-primary)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
