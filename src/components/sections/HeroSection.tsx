"use client";

import React from "react";
import { CinematicHero } from "@/components/hero/CinematicHero";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary["hero"];
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return <CinematicHero locale={locale} dict={dict} />;
}
