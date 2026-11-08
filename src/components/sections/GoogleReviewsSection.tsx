"use client";

import React from "react";
import Image from "next/image";
import { Star, ExternalLink, PenLine, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GOOGLE_BUSINESS_DATA } from "@/data/googleReviews";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface GoogleReviewsSectionProps {
  locale: Locale;
}

export function GoogleReviewsSection({ locale }: GoogleReviewsSectionProps) {
  const isAr = locale === "ar";
  const { overallRating, totalReviewCount, reviews, writeReviewUrl, mapsUrl } =
    GOOGLE_BUSINESS_DATA;

  // Filter strategy: Strict 4-star and 5-star positive reviews only
  const featuredReviews = reviews.filter((r) => r.rating >= 4);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-28">
      {/* Background Decorative Ambient Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,233,10,0.04),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-bold text-[var(--text-primary)] shadow-xs">
              {/* Google Official G Icon */}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isAr ? "تقييمات Google المعتمدة" : "Verified Google Reviews"}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="font-mono text-[#FBE90A]">{overallRating} ★</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
              {isAr ? "تجارب عملائنا تتحدث عنا" : "Real Experiences. Genuine Trust."}
            </h3>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {isAr
                ? "نفخر بثقة عملائنا ونسعى دائمًا لتقديم تجربة تليق بسياراتهم."
                : "Proud of our clients' trust, committed to delivering an experience worthy of their vehicles."}
            </p>
          </Reveal>

          {/* Overall Rating Card & Action Buttons */}
          <Reveal delay={0.1} className="w-full sm:w-auto">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Write Review Button */}
              <a
                href={writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FBE90A] px-5 py-3 text-xs font-bold text-[#060608] shadow-[0_6px_20px_rgba(251,233,10,0.24)] transition-all hover:bg-[#fff033] hover:shadow-[0_8px_28px_rgba(251,233,10,0.38)] active:scale-95"
              >
                <PenLine className="h-3.5 w-3.5" />
                <span>{isAr ? "أضف تقييمك على Google" : "Write a Google Review"}</span>
              </a>

              {/* View All Reviews on Maps */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-xs font-bold text-[var(--text-primary)] shadow-xs transition-all hover:border-[#FBE90A] hover:text-[var(--brand-accent-label)] active:scale-95"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{isAr ? "شاهد جميع تقييماتنا على Google" : "View All Google Reviews"}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Overall Rating Banner */}
        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1 font-mono text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
                <span>{overallRating}</span>
                <span className="text-xs text-[var(--text-muted)]">/ 5.0</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#FBE90A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 fill-current",
                        i >= Math.floor(overallRating) && "opacity-40"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {isAr
                    ? `بناءً على ${totalReviewCount} تقييماً معتمداً على Google Maps`
                    : `Based on ${totalReviewCount} authentic reviews on Google Maps`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>
                {isAr
                  ? "ملف تجاري رسمي وموثّق لإنفينيتي برايت بالرياض"
                  : "Verified official Google Business Profile (Riyadh)"}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Featured Reviews Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((rev, idx) => (
            <Reveal key={rev.id} delay={0.1 + idx * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] transition-all hover:border-[#FBE90A]/50">
                <div className="space-y-4">
                  {/* Card Top: Stars & Google Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#FBE90A]">
                      {[...Array(rev.rating)].map((_, sIdx) => (
                        <Star key={sIdx} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                      <svg className="h-3 w-3" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span>Google</span>
                    </div>
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs leading-relaxed text-[var(--text-primary)] sm:text-sm">
                    &ldquo;{isAr ? rev.text.ar : rev.text.en}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[var(--border-strong)]">
                        <Image
                          src={rev.avatarUrl}
                          alt={rev.authorName}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)]/20 font-bold text-[var(--brand-accent-label)] text-xs">
                        {rev.authorName.slice(0, 2)}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-[var(--text-primary)]">
                          {rev.authorName}
                        </h4>
                        {rev.isLocalGuide && (
                          <span
                            title={isAr ? "مرشد محلي معتمد" : "Local Guide"}
                            className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400"
                          >
                            {isAr ? "مرشد محلي" : "Local Guide"}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {isAr ? rev.relativeTime.ar : rev.relativeTime.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Transparency Disclaimer Footer */}
        <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 text-[11px] text-[var(--text-muted)]">
          <p>
            {isAr
              ? "ملاحظة: تُعرض أعلاه التجارب الإيجابية المعتمدة (4 و 5 نجوم). التقييم الإجمالي (4.6 من 40 مراجعة) يعكس كامل تقييمات ملف إنفينيتي برايت على خرائط Google دون أي تصفية."
              : "Note: Featured cards display verified 4-star and 5-star customer experiences. The overall rating (4.6 / 5.0 across 40 reviews) reflects the entire unfiltered Google Maps profile."}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-bold text-[var(--brand-accent-label)] hover:underline"
          >
            {isAr ? "فتح Google Maps ←" : "Open Google Maps →"}
          </a>
        </div>
      </div>
    </section>
  );
}

