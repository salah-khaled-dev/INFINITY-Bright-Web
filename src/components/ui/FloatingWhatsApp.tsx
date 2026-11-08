"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BUSINESS_CONFIG } from "@/config/business";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface FloatingWhatsAppProps {
  tooltip: string;
}

/**
 * Premium Compact Floating WhatsApp Concierge Button:
 * - Subtle, jewel-like circular floating control.
 * - Never competes with or covers footer content.
 * - Respects iOS & Android safe-area insets.
 * - Elegant desktop hover tooltip.
 */
export function FloatingWhatsApp({ tooltip }: FloatingWhatsAppProps) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-5 end-5 z-40 pb-[env(safe-area-inset-bottom)] sm:bottom-7 sm:end-7">
      <div className="relative flex items-center justify-end">
        {/* Subtle Floating Tooltip on Desktop Hover */}
        <span
          aria-hidden={!hovered}
          className={`pointer-events-none absolute end-14 hidden whitespace-nowrap rounded-full border border-black/10 bg-[#060608]/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 md:block ${
            hovered
              ? "translate-x-0 opacity-100 rtl:-translate-x-0"
              : "translate-x-2 opacity-0 rtl:-translate-x-2"
          }`}
        >
          {tooltip}
        </span>

        {/* Compact, Luxury Circular Action Button */}
        <motion.a
          href={BUSINESS_CONFIG.contact.whatsappBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${tooltip} (${BUSINESS_CONFIG.contact.phoneDisplay})`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-13 sm:w-13"
        >
          {/* Top 3D Specular Highlight Line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-2.5 top-1 h-[1.5px] rounded-full bg-white/40"
          />
          <WhatsAppIcon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
        </motion.a>
      </div>
    </div>
  );
}
