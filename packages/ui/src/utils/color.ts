const PRESET_COLORS = new Set([
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "neutral",
]);

/**
 * Resolves a color prop into either a `data-color` attribute (for presets)
 * or inline CSS variable overrides (for custom hex/rgb values).
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

  if (PRESET_COLORS.has(color)) {
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
