"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.75,
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.035 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}

