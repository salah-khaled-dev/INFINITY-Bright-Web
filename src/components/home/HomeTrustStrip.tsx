"use client";

import React from "react";
import { Award, Building2, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

interface HomeTrustStripProps {
  locale: Locale;
}

/**
 * Minimal, Refined Trust & Accreditation Strip:
 * - Subtle height, generous horizontal whitespace.
 * - Elegant typography avoiding oversized bold text.
 * - Hairline vertical dividers on desktop.
 * - Preserves verified business heritage & official warranties.
 */
export function HomeTrustStrip({ locale }: HomeTrustStripProps) {
  const isAr = locale === "ar";

  const trustItems = [
    {
      icon: Building2,
      eyebrow: isAr ? "الجهة المشغلة" : "Operating Heritage",
      title: isAr ? "مؤسسة نوادر الفرسان (+15 عاماً)" : "Nawader El-Forsan (+15 Yrs)",
    },
    {
      icon: Clock,
      eyebrow: isAr ? "أوقات العمل الرسمية" : "Studio Working Hours",
      title: isAr ? "يومياً: 12 م – 10 م" : "Daily: 12 PM – 10 PM",
    },
    {
      icon: Award,
      eyebrow: isAr ? "الاعتماد والوكالة" : "Accreditation",
      title: isAr ? "وكيل 3M معتمد · شريك XPEL" : "Authorized 3M & XPEL",
    },
    {
      icon: ShieldCheck,
      eyebrow: isAr ? "الضمان المعتمد" : "Official Guarantees",
      title: isAr ? "ضمان مدى الحياة + 10 سنوات" : "Lifetime PPF + 10-Yr Heat",
    },
  ];

  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3 sm:py-3.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-[var(--border-subtle)] rtl:lg:divide-x-reverse">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/50 p-2.5 sm:border-0 sm:bg-transparent sm:p-0 transition-colors",
                  idx > 0 && "lg:ps-6",
                  idx < trustItems.length - 1 && "lg:pe-6"
                )}
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-gradient-to-b from-white to-[#f5f4ed] text-[#bda400] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:scale-105 hover:border-[#FBE90A] dark:border-white/10 dark:bg-gradient-to-b dark:from-[#1c1d26] dark:to-[#0f1016] dark:text-[#FBE90A] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
                  />
                  <Icon className="relative z-10 h-4 w-4 drop-shadow-[0_1px_4px_rgba(251,233,10,0.3)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium tracking-wider text-[var(--text-muted)] uppercase">
                    {item.eyebrow}
                  </p>
                  <p className="text-xs font-bold leading-snug text-[var(--text-primary)] sm:text-[13px]">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
