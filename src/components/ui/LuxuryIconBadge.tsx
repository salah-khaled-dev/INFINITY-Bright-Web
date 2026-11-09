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
        // Light Mode: Frosted Porcelain Ivory with Warm Champagne Gold Rim
        "border border-[#DAD7CE] bg-gradient-to-br from-[#FFFFFF] via-[#F8F7F3] to-[#E9E6DE] text-[#242522] shadow-[0_4px_14px_rgba(36,37,34,0.06)]",
        // Dark Mode: Layered Charcoal and Graphite with Warm Gold Rim
        "dark:border-[#393A34] dark:bg-gradient-to-br dark:from-[#2B2C27] dark:via-[#242521] dark:to-[#1E1F1C] dark:text-[#E8C900] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]",
        // Interactive Ambient Glow
        glow &&
          "hover:border-[var(--brand-yellow)]/60 hover:shadow-[0_4px_16px_rgba(232,201,0,0.18)] dark:hover:border-[var(--brand-yellow)]/60 dark:hover:shadow-[0_6px_20px_rgba(232,201,0,0.22)]",
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
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[var(--brand-yellow)]/12 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
      />

      {/* 3. Outer Subtle Accent Ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-0.5 rounded-[inherit] border border-[var(--brand-yellow)]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* 4. Luxury Icon with Rich Depth */}
      {Icon && (
        <Icon
          className={cn(
            iconSizes[size],
            "relative z-10 transition-transform duration-300 group-hover:scale-105",
            "text-[#857300] dark:text-[#E8C900]"
          )}
        />
      )}
      {children}
    </div>
  );
}
