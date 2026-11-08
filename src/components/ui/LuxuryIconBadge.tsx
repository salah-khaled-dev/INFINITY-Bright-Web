import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LuxuryIconBadgeProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

/**
 * Luxury 3D Architectural Icon Medallion (Universal Component — Server & Client Safe)
 * Inspired by luxury automotive crests (Porsche, Maybach, Aston Martin).
 * Multi-layer specular glass, golden ambient light core, and micro-hover physics.
 */
export function LuxuryIconBadge({
  icon: Icon,
  children,
  size = "md",
  className,
  glow = true,
}: LuxuryIconBadgeProps) {
  const sizeClasses = {
    sm: "h-11 w-11 rounded-xl",
    md: "h-14 w-14 rounded-2xl",
    lg: "h-16 w-16 rounded-2xl",
    xl: "h-20 w-20 rounded-3xl",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  };

  return (
    <div
      className={cn(
        "group-hover:scale-105 relative inline-flex shrink-0 items-center justify-center transition-all duration-300 ease-out",
        sizeClasses[size],
        // Light Mode: Frosted Porcelain Ivory with Champagne Gold Rim
        "border border-black/10 bg-gradient-to-br from-white via-[#fcfbf7] to-[#edebe1] text-[#09090b] shadow-[0_8px_22px_rgba(0,0,0,0.08)]",
        // Dark Mode: Deep Obsidian Glass with Titanium / Gold Rim
        "dark:border-white/15 dark:bg-gradient-to-br dark:from-[#1d1e27] dark:via-[#121319] dark:to-[#08090d] dark:text-[#FBE90A] dark:shadow-[0_10px_30px_rgba(0,0,0,0.65)]",
        // Interactive Ambient Glow
        glow &&
          "hover:border-[#FBE90A] hover:shadow-[0_12px_32px_rgba(251,233,10,0.32)] dark:hover:border-[#FBE90A] dark:hover:shadow-[0_14px_38px_rgba(251,233,10,0.45)]",
        className
      )}
    >
      {/* 1. Precision 3D Specular Highlight Line at the Top */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2.5 top-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/40"
      />

      {/* 2. Soft Golden Atmospheric Core Glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#FBE90A]/20 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* 3. Outer Subtle Accent Ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-0.5 rounded-[inherit] border border-[#FBE90A]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* 4. Luxury Icon with Rich Depth and Drop Shadow */}
      {Icon && (
        <Icon
          className={cn(
            iconSizes[size],
            "relative z-10 transition-transform duration-300 group-hover:scale-110",
            "text-[#d4be00] drop-shadow-[0_2px_8px_rgba(212,190,0,0.35)]",
            "dark:text-[#FBE90A] dark:drop-shadow-[0_2px_12px_rgba(251,233,10,0.65)]"
          )}
        />
      )}
      {children}
    </div>
  );
}
