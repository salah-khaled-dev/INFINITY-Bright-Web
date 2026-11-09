"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type GuaranteeIconType =
  | "lifetime"
  | "thermal-10yr"
  | "paint-safety"
  | "accident-50";

interface LuxuryGuaranteeIconProps {
  type: GuaranteeIconType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Bespoke Ultra-Luxury Automotive Medallions for INFINITY BRIGHT Warranties.
 * Crafted with precision vector optics, multi-layer metallic gold gradients,
 * specular highlight rings, and Maybach/Aston Martin-level automotive aesthetics.
 */
export function LuxuryGuaranteeIcon({
  type,
  className,
  size = "md",
}: LuxuryGuaranteeIconProps) {
  const sizeMap = {
    sm: "h-12 w-12",
    md: "h-14 w-14",
    lg: "h-16 w-16",
  };

  return (
    <div
      className={cn(
        "group relative flex shrink-0 items-center justify-center transition-all duration-300",
        sizeMap[size],
        className
      )}
    >
      {/* Golden Atmospheric Radiance on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[var(--brand-yellow)]/20 via-[var(--brand-yellow-muted)]/10 to-transparent opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-90"
      />

      {/* 3D Medallion Chassis (Porcelain / Charcoal with Specular Gold Rim) */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-[#DAD7CE] bg-gradient-to-b from-[#FFFFFF] via-[#F8F7F3] to-[#E9E6DE] shadow-[0_4px_14px_rgba(36,37,34,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[var(--brand-yellow)] group-hover:shadow-[0_8px_20px_rgba(232,201,0,0.18)] dark:border-[#393A34] dark:bg-gradient-to-b dark:from-[#2B2C27] dark:via-[#242521] dark:to-[#1E1F1C] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Specular Highlight Sheen at Top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-1 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/40"
        />

        {/* Ambient Gold Core */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial from-[var(--brand-yellow)]/10 via-transparent to-transparent opacity-70"
        />

        {/* Custom Bespoke Vector Badges */}
        {type === "lifetime" && (
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="gold-grad-1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8C900" />
                <stop offset="50%" stopColor="#BDA900" />
                <stop offset="100%" stopColor="#705E00" />
              </linearGradient>
            </defs>
            {/* Outer Heraldic Shield */}
            <path
              d="M24 4L38 9.5V21C38 31.5 32 39.5 24 44C16 39.5 10 31.5 10 21V9.5L24 4Z"
              stroke="url(#gold-grad-1)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="drop-shadow-[0_2px_4px_rgba(189,169,0,0.3)]"
            />
            {/* Inner Lifetime Infinity Emblem */}
            <path
              d="M18 24C18 21.79 19.79 20 22 20C23.2 20 24.2 20.6 24.8 21.5L24 24L23.2 26.5C22.6 27.4 21.6 28 20.4 28C18.2 28 16.4 26.2 16.4 24C16.4 21.8 18.2 20 20.4 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-[#705E00] dark:text-[#E8C900]"
            />
            <path
              d="M24 24C24.8 22.8 26.2 22 27.8 22C30.2 22 32.2 23.9 32.2 26.3C32.2 28.7 30.2 30.6 27.8 30.6C26.2 30.6 24.8 29.8 24 28.6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-[#705E00] dark:text-[#E8C900]"
            />
            <circle cx="24" cy="24" r="1.5" fill="#E8C900" />
          </svg>
        )}

        {type === "thermal-10yr" && (
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="gold-grad-2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8C900" />
                <stop offset="50%" stopColor="#BDA900" />
                <stop offset="100%" stopColor="#705E00" />
              </linearGradient>
            </defs>
            {/* Radiant Sun/Thermal Deflection Array */}
            <circle
              cx="24"
              cy="24"
              r="14"
              stroke="url(#gold-grad-2)"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="drop-shadow-[0_2px_6px_rgba(229,160,13,0.35)]"
            />
            <circle
              cx="24"
              cy="24"
              r="8"
              fill="url(#gold-grad-2)"
              className="opacity-20"
            />
            {/* 10 Year Core Emblem */}
            <text
              x="24"
              y="28"
              textAnchor="middle"
              className="font-mono text-[11px] font-black fill-[#705E00] dark:fill-[#E8C900]"
            >
              10Y
            </text>
            {/* Solar Deflector Flairs */}
            <path
              d="M24 4V7M24 41V44M4 24H7M41 24H44"
              stroke="#E8C900"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}

        {type === "paint-safety" && (
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="gold-grad-3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8C900" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            {/* Safety Seal Ring */}
            <circle
              cx="24"
              cy="24"
              r="16"
              stroke="url(#gold-grad-3)"
              strokeWidth="2.5"
              className="drop-shadow-[0_2px_6px_rgba(34,197,94,0.35)]"
            />
            {/* Paint Droplet with 100% Protection */}
            <path
              d="M24 12C24 12 16 21 16 26.5C16 30.9 19.6 34.5 24 34.5C28.4 34.5 32 30.9 32 26.5C32 21 24 12 24 12Z"
              fill="url(#gold-grad-3)"
              className="opacity-20"
            />
            {/* Checkmark of Integrity */}
            <path
              d="M18.5 25.5L22 29L29.5 20.5"
              stroke="#15803d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-[#22c55e]"
            />
          </svg>
        )}

        {type === "accident-50" && (
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="gold-grad-4" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8C900" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            {/* Armor Diamond Badge */}
            <polygon
              points="24,6 40,24 24,42 8,24"
              stroke="url(#gold-grad-4)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]"
            />
            {/* 50% Rebate Core */}
            <text
              x="24"
              y="28"
              textAnchor="middle"
              className="font-mono text-[11px] font-black fill-[#705E00] dark:fill-[#E8C900]"
            >
              50%
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

