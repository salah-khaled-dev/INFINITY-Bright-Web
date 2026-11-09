"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useServerInsertedHTML } from "next/navigation";
import type { Locale, ThemeMode } from "@/types";

// Suppress React 19 false-positive warning for inline scripts in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

interface ThemeContextValue {
  theme: ThemeMode;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "ib-theme";

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  mounted: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  locale,
  dir,
}: {
  children: React.ReactNode;
  locale: Locale;
  dir: "ltr" | "rtl";
}) {
  // Default is LIGHT MODE as requested
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  // Sync theme on mount from pre-hydrated root class / localStorage / default light
  useEffect(() => {
    const root = document.documentElement;
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    let initial: ThemeMode;

    if (saved === "light" || saved === "dark") {
      initial = saved;
    } else {
      initial = "light";
    }

    root.classList.toggle("dark", initial === "dark");
    root.style.colorScheme = initial;
    setThemeState(initial);
    setMounted(true);
  }, []);

  // Dynamically update document language and direction when switching between /en and /ar
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setTheme = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script injected into <head> to prevent any flash of unstyled theme (FOUC).
 * Default is LIGHT MODE.
 */
export const THEME_INIT_SCRIPT = `
(function() {
  try {
    var s = localStorage.getItem('${STORAGE_KEY}');
    var t = (s === 'light' || s === 'dark') ? s : 'light';
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = t;
  } catch (e) {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
})();
`;

/**
 * Server-inserted theme initialization script component.
 * Uses Next.js useServerInsertedHTML to stream the script safely into the initial HTML document
 * without rendering a <script> element inside React's Virtual DOM tree, eliminating React 19 script warnings.
 */
export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  ));
  return null;
}

/**
 * Server-inserted JSON-LD structured data script component.
 * Streams schema markup into the HTML head without client React tree reconciliation warnings.
 */
export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  useServerInsertedHTML(() => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  ));
  return null;
}
