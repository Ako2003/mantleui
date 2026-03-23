export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  /** The current resolved theme ("light" or "dark") */
  resolvedTheme: "light" | "dark";
  /** The user-selected theme mode */
  mode: ThemeMode;
  /** Update the theme mode */
  setMode: (mode: ThemeMode) => void;
}
