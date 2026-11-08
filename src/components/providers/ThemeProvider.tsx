"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Locale, ThemeMode } from "@/types";

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
