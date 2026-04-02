const PRESET_COLORS: Record<
  string,
  { accent: string; hover: string; active: string; subtle: string }
> = {
  blue: {
    accent: "#3b82f6",
    hover: "#60a5fa",
    active: "#93bbfd",
    subtle: "#1e3a8a",
  },
  red: {
    accent: "#ef4444",
    hover: "#f87171",
    active: "#fca5a5",
    subtle: "#5c1a1a",
  },
  green: {
    accent: "#22c55e",
    hover: "#4ade80",
    active: "#86efac",
    subtle: "#14532d",
  },
  yellow: {
    accent: "#eab308",
    hover: "#facc15",
    active: "#fde047",
    subtle: "#422006",
  },
  purple: {
    accent: "#8b5cf6",
    hover: "#a78bfa",
    active: "#c4b5fd",
    subtle: "#4c1d95",
  },
  neutral: {
    accent: "#a3a3a3",
    hover: "#d4d4d4",
    active: "#e5e5e5",
    subtle: "#262626",
  },
};

/**
 * Resolves a color prop into a `data-color` attribute for presets,
 * or inline CSS variable overrides for custom values.
 *
 * @example
 * ```tsx
 * const { dataColor, colorStyle } = resolveColor(color);
 * <div data-color={dataColor} style={colorStyle}>...</div>
 * ```
 */
export function resolveColor(color: string | undefined): {
  dataColor: string | undefined;
  colorStyle: React.CSSProperties | undefined;
} {
  if (!color) return { dataColor: undefined, colorStyle: undefined };

  if (color in PRESET_COLORS) {
    return { dataColor: color, colorStyle: undefined };
  }

  // Custom color — set CSS variables inline
  return {
    dataColor: undefined,
    colorStyle: {
      "--mantle-accent": color,
      "--mantle-accent-hover": color,
      "--mantle-accent-active": color,
      "--mantle-accent-subtle": `${color}20`,
      "--mantle-accent-text": "#ffffff",
    } as React.CSSProperties,
  };
}

/**
 * Returns the resolved accent hex color for a given color prop.
 * Useful for components that need the actual color value (e.g. for inline styles).
 */
export function getAccentColor(color: string | undefined): string {
  if (!color) return PRESET_COLORS.blue.accent;
  const preset = PRESET_COLORS[color];
  if (preset) return preset.accent;
  return color;
}
