"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale, ThemeMode } from "@/types";

interface HeroVideoBackgroundProps {
  theme: ThemeMode;
  locale: Locale;
  reducedMotion: boolean;
}

/**
 * Cinema-Grade Dual-Source Automotive Hero Video Engine:
 * - Desktop (≥768px): Commercial-grade Range Rover Showroom 1080p (16:9 Landscape, 6.7 MB).
 * - Mobile (<768px): Dedicated Master Detailer Polishing Hood 1080p (9:16 Portrait, 4.5 MB).
 * - Zero Parallel Downloads: Only the active viewport stream is requested.
 * - Instant Preloaded WebP Posters (98 KB desktop, 47 KB mobile).
 * - Smooth 1000ms crossfade upon video playback to eliminate jarring flashes.
 * - Data Saver & Reduced Motion compliant.
 * - Art-directed contrast masks for Arabic (RTL) & English (LTR) in Dark & Light modes.
 */
export function HeroVideoBackground({
  theme,
  locale,
  reducedMotion,
}: HeroVideoBackgroundProps) {
  const isLight = theme === "light";
  const isAr = locale === "ar";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Responsive device classification (SSR-safe initial default matching desktop, client refines on mount)
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setIsVideoPlaying(false);
    };

    mql.addEventListener("change", handleMediaChange);

    // Detect browser Data Saver
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) {
      setSaveData(true);
    }

    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const shouldSkipVideo = reducedMotion || saveData;

  // Active asset configuration based strictly on device orientation & resolution
  const activeVideoSrc = isMobile
    ? "/videos/Detailer_polishing_car_hood_4c33bcd6_1080p.mp4"
    : "/videos/Range_Rover_commercial_in_showroom_e0e83c1a_1080p.mp4";

  const activePosterSrc = isMobile
    ? "/videos/hero-mobile-detailer-poster.webp"
    : "/videos/hero-video-poster.webp";

  // Attempt seamless autoplay with full browser policy protection
  useEffect(() => {
    if (!mounted || shouldSkipVideo) return;

    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const handlePlaying = () => {
      if (isMounted) setIsVideoPlaying(true);
    };

    const handleError = () => {
      if (isMounted) {
        setHasVideoError(true);
        setIsVideoPlaying(false);
      }
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          if (isMounted) setIsVideoPlaying(true);
        }
      } catch {
        // Autoplay restricted by user policy / battery saver: retain pristine poster
        if (isMounted) setIsVideoPlaying(false);
      }
    };

    attemptPlay();

    return () => {
      isMounted = false;
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
    };
  }, [mounted, activeVideoSrc, shouldSkipVideo]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {/* 1. Base Canvas Floor */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          isLight ? "bg-[#f2f2ed]" : "bg-[#050608]"
        )}
      />

      {/* 2. Instant Preloaded High-Resolution Poster Image (Zero Layout Shift) */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 ease-out",
          isVideoPlaying && !hasVideoError ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src={activePosterSrc}
          alt={
            isAr
              ? "استوديو العناية الفائقة وحماية السيارات في إنفينيتي برايت"
              : "INFINITE BRIGHT luxury automotive detailing & paint protection studio"
          }
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover transition-[object-position] duration-500",
            // Mobile: perfectly frames the detailer & hood reflections in the upper 46svh window
            // Desktop: full-bleed 16:9 showroom composition
            isMobile
              ? "object-[50%_36%]"
              : isAr
              ? "object-[48%_48%] lg:object-[50%_48%]"
              : "object-[52%_48%] lg:object-[50%_48%]"
          )}
        />
      </div>

      {/* 3. Cinematic HTML5 Hero Video (Native, Hardware Accelerated, Zero 3D Overhead) */}
      {mounted && !shouldSkipVideo && !hasVideoError && (
        <video
          key={activeVideoSrc}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={activePosterSrc}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out",
            isMobile
              ? "object-[50%_36%]"
              : isAr
              ? "object-[48%_48%] lg:object-[50%_48%]"
              : "object-[52%_48%] lg:object-[50%_48%]",
            isVideoPlaying ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      )}

      {/* 4. Art-Directed Contrast & Readability Layer */}
      {/* DARK MODE: Subtle ambient dimming + directional text vignette */}
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className={cn(
              "hidden md:block absolute inset-y-0 w-3/5 transition-opacity duration-500 pointer-events-none",
              isAr
                ? "right-0 bg-gradient-to-l from-[#050608]/85 via-[#050608]/40 to-transparent"
                : "left-0 bg-gradient-to-r from-[#050608]/85 via-[#050608]/40 to-transparent"
            )}
          />
        </>
      )}

      {/* LIGHT MODE: Controlled alabaster ambient veil guaranteeing WCAG contrast for dark text */}
      {isLight && (
        <>
          <div className="absolute inset-0 bg-[#f2f2ed]/15" />
          <div
            className={cn(
              "hidden md:block absolute inset-y-0 w-3/5 transition-opacity duration-500 pointer-events-none",
              isAr
                ? "right-0 bg-gradient-to-l from-[#f2f2ed]/90 via-[#f2f2ed]/45 to-transparent"
                : "left-0 bg-gradient-to-r from-[#f2f2ed]/90 via-[#f2f2ed]/45 to-transparent"
            )}
          />
        </>
      )}
    </div>
  );
}
