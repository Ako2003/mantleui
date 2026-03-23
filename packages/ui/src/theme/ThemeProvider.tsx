import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ThemeContextValue, ThemeMode } from "./theme.types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "mantle-theme";

function getSystemThemeSnapshot(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSystemThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

function subscribeToSystemTheme(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme mode. Defaults to "system". */
  defaultMode?: ThemeMode;
  /** Storage key for persisting theme preference. Set to `false` to disable persistence. */
  storageKey?: string | false;
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined" || storageKey === false) {
      return defaultMode;
    }
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return defaultMode;
  });

  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );

  const resolvedTheme = mode === "system" ? systemTheme : mode;

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      if (storageKey !== false) {
        localStorage.setItem(storageKey, newMode);
      }
    },
    [storageKey],
  );

  // Apply data-theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ resolvedTheme, mode, setMode }),
    [resolvedTheme, mode, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
