"use client";

import { useEffect, useState } from "react";

/**
 * Reactive hook tracking OS/browser `prefers-reduced-motion: reduce`.
 * Safe for SSR (defaults to false on server, syncs immediately on client mount).
 */
export function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

