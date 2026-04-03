import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

/**
 * Creates a subscribe/getSnapshot pair for reading a localStorage key
 * via useSyncExternalStore, avoiding setState-in-effect lint errors.
 */
function createStorageStore(key: string | false, fallback: ThemeMode) {
  const subscribers = new Set<() => void>();
  const isBrowser = typeof window !== "undefined";

  function subscribe(callback: () => void) {
    subscribers.add(callback);
    // Listen for storage events from other tabs
    if (!isBrowser) {
      return () => {
        subscribers.delete(callback);
      };
    }
    const handler = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener("storage", handler);
    return () => {
      subscribers.delete(callback);
      window.removeEventListener("storage", handler);
    };
  }

  function getSnapshot(): ThemeMode {
    if (key === false || !isBrowser) return fallback;
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return fallback;
  }

  function getServerSnapshot(): ThemeMode {
    return fallback;
  }

  function set(value: ThemeMode) {
    if (key !== false && isBrowser) {
      localStorage.setItem(key, value);
    }
    for (const cb of subscribers) cb();
  }

  return { subscribe, getSnapshot, getServerSnapshot, set };
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
  const store = useMemo(
    () => createStorageStore(storageKey, defaultMode),
    [storageKey, defaultMode],
  );

  const mode = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );

  const resolvedTheme = mode === "system" ? systemTheme : mode;

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      store.set(newMode);
    },
    [store],
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
