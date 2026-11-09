"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { buildWhatsAppUrl } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale, ServiceItem } from "@/types";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

function ChapterVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.defaultMuted = true;
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15, rootMargin: "150px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

interface ServiceDetailChapterProps {
  locale: Locale;
  service: ServiceItem;
  copy: Dictionary["servicesCatalog"][ServiceItem["id"]];
  labels: Pick<
    Dictionary["servicesPage"],
    "processHeading" | "idealForHeading" | "bookThisService"
  >;
  reversed?: boolean;
}

export function ServiceDetailChapter({
  locale,
  service,
  copy,
  labels,
  reversed = false,
}: ServiceDetailChapterProps) {
  const waHref = buildWhatsAppUrl(
    locale === "ar"
      ? `مرحباً إنفينيتي برايت، أود حجز موعد لخدمة: ${copy.title}`
      : `Hello INFINITY BRIGHT, I would like to book an appointment for: ${copy.title}`
  );

  return (
    <article
      id={service.id}
      className="scroll-mt-28 border-b border-[var(--border-subtle)] py-16 last:border-b-0 sm:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Showroom Media (Cinematic Video or Photograph) */}
        <div
          className={cn(
            "lg:col-span-6",
            reversed ? "lg:order-2" : "lg:order-1"
          )}
        >
          <ImageReveal className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#08080a] shadow-[var(--shadow-elevated)]">
            {service.video ? (
              <ChapterVideo
                src={service.video}
                poster={service.videoPoster || service.image}
              />
            ) : (
              <Image
                src={service.image}
                alt={copy.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute top-4 start-4 z-10 rounded-full bg-[#FBE90A] px-3.5 py-1 font-mono text-xs font-bold text-[#060608] shadow-md">
              {service.index}
            </div>
            {service.video && (
              <div className="absolute bottom-4 end-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {locale === "ar"
                    ? service.id === "ppf"
                      ? "فيديو تركيب عملي مباشر"
                      : service.id === "ceramic-coating"
                      ? "تطبيق سيراميك (نيسان باترول 2026)"
                      : service.id === "heat-insulation"
                      ? "تركيب عازل حراري (لاند كروزر 2026)"
                      : "فيديو تلميع مباشر"
                    : service.id === "ppf"
                    ? "Live PPF Installation"
                    : service.id === "ceramic-coating"
                    ? "Nissan Patrol 2026 Ceramic"
                    : service.id === "heat-insulation"
                    ? "Land Cruiser 2026 Thermal Glazing"
                    : "Live Craftsmanship"}
                </span>
              </div>
            )}
          </ImageReveal>
        </div>

        {/* Service Editorial Specification */}
        <div
          className={cn(
            "space-y-6 lg:col-span-6",
            reversed ? "lg:order-1" : "lg:order-2"
          )}
        >
          <Reveal className="space-y-3">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--brand-accent-label)] uppercase rtl:font-sans rtl:tracking-normal">
              DISCIPLINE // {service.index}
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {copy.fullDesc}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="space-y-3">
            <h3 className="text-xs font-bold tracking-[0.16em] text-[var(--text-muted)] uppercase rtl:tracking-normal">
              {labels.processHeading}
            </h3>
            <ul className="space-y-2.5">
              {copy.process.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent-label)]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-xs leading-relaxed text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">
                {labels.idealForHeading}:{" "}
              </strong>
              {copy.idealFor}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FBE90A] px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-[#060608] uppercase shadow-[0_8px_26px_rgba(251,233,10,0.22)] transition-all duration-300 hover:bg-[#fff033] rtl:text-sm rtl:tracking-normal"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{labels.bookThisService}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

