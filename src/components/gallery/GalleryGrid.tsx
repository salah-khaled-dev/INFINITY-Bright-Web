"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/gallery";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { GalleryCategory, Locale } from "@/types";
import {
  BeforeAfterShowcase,
  type BeforeAfterCase,
} from "@/components/gallery/BeforeAfterShowcase";

interface GalleryGridProps {
  locale: Locale;
  dict: Dictionary["gallery"];
  limit?: number;
}

const CATEGORIES: GalleryCategory[] = [
  "all",
  "before-after",
  "ppf",
  "thermal",
  "ceramic",
  "detailing",
];

export function GalleryGrid({ locale, dict, limit }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const filteredItems = useMemo(() => {
    const base =
      activeCategory === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [activeCategory, limit]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  // Keyboard navigation & body scroll lock in Lightbox
  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (locale === "ar") showPrev();
        else showNext();
      }
      if (e.key === "ArrowLeft") {
        if (locale === "ar") showNext();
        else showPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev, locale]);

  const activeItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  const getItemCopy = (translationKey: string) => {
    const itemsMap = dict.items as Record<
      string,
      { title: string; category: string; caption: string }
    >;
    return (
      itemsMap[translationKey] ?? {
        title: "INFINITY BRIGHT",
        category: "Studio",
        caption: "",
      }
    );
  };

  return (
    <div>
      {/* Interactive Draggable Before & After Slider (Polishing, Tinting, Protection) */}
      <BeforeAfterShowcase
        locale={locale}
        heading={dict.beforeAfterShowcase.heading}
        subheading={dict.beforeAfterShowcase.subheading}
        dragHint={dict.beforeAfterShowcase.dragHint}
        cases={dict.beforeAfterShowcase.cases as BeforeAfterCase[]}
      />

      {/* Discipline Filter Bar */}
      <div
        role="tablist"
        aria-label="Gallery filters"
        className="mb-10 flex flex-wrap items-center gap-2.5"
      >
        {CATEGORIES.map((cat) => {
          const selected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300 rtl:text-xs rtl:tracking-normal",
                selected
                  ? "border-[var(--brand-yellow)] bg-[var(--brand-yellow)] text-[#242522] shadow-xs"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              )}
            >
              {dict.filters[cat]}
            </button>
          );
        })}
      </div>

      {/* Editorial Asymmetrical Responsive Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const copy = getItemCopy(item.translationKey);
            const patternMod = idx % 4;
            const spanClass =
              patternMod === 0 || patternMod === 3
                ? "lg:col-span-7"
                : "lg:col-span-5";

            return (
              <motion.figure
                key={item.id}
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#151614] shadow-[var(--shadow-elevated)]",
                  spanClass
                )}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`${dict.openLightbox}: ${copy.title}`}
                  className="relative block h-full w-full cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-yellow)]"
                >
                  <Image
                    src={item.src}
                    alt={`${copy.title} — ${copy.caption}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Expand Pill Top-End */}
                  <span
                    aria-hidden="true"
                    className="absolute top-4 end-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:border-[var(--brand-yellow)] group-hover:text-[var(--brand-yellow)]"
                  >
                    <Expand className="h-4 w-4" />
                  </span>

                  {/* Caption Overlay */}
                  <figcaption className="absolute inset-x-5 bottom-5 space-y-1">
                    <span className="inline-block font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--brand-yellow)] uppercase rtl:font-sans rtl:tracking-normal">
                      {copy.category}
                    </span>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {copy.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-white/75">
                      {copy.caption}
                    </p>
                  </figcaption>
                </button>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={getItemCopy(activeItem.translationKey).title}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-black/95 p-4 backdrop-blur-xl sm:p-8"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-6xl items-center justify-between text-white"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-white/70">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredItems.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label={dict.closeLightbox}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-[var(--brand-yellow)] hover:text-[var(--brand-yellow)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Center Photograph & Prev/Next Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-4 flex w-full max-w-6xl flex-1 items-center justify-center"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label={dict.prevImage}
                className="absolute start-0 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:border-[var(--brand-yellow)] hover:text-[var(--brand-yellow)] sm:start-2"
              >
                <ChevronLeft className="h-6 w-6 rtl:-scale-x-100" />
              </button>

              <div className="relative h-[62vh] w-full max-w-5xl sm:h-[70vh]">
                <Image
                  src={activeItem.src}
                  alt={getItemCopy(activeItem.translationKey).title}
                  fill
                  sizes="95vw"
                  priority
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                aria-label={dict.nextImage}
                className="absolute end-0 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:border-[var(--brand-yellow)] hover:text-[var(--brand-yellow)] sm:end-2"
              >
                <ChevronRight className="h-6 w-6 rtl:-scale-x-100" />
              </button>
            </div>

            {/* Bottom Caption Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-full max-w-4xl text-center"
            >
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[var(--brand-yellow)] uppercase rtl:font-sans rtl:tracking-normal">
                {getItemCopy(activeItem.translationKey).category}
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                {getItemCopy(activeItem.translationKey).title}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {getItemCopy(activeItem.translationKey).caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
