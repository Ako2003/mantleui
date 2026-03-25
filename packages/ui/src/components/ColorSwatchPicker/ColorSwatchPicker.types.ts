import type { HTMLAttributes } from "react";

export type ColorSwatchPickerSize = "sm" | "md" | "lg";

export interface ColorSwatchPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Array of hex color strings to display. */
  colors: string[];
  /** Selected color (controlled). */
  value?: string;
  /** Default selected color (uncontrolled). */
  defaultValue?: string;
  /** Called when a color is selected. */
  onValueChange?: (value: string) => void;
  /** Size of each swatch. Defaults to `"md"`. */
  swatchSize?: ColorSwatchPickerSize;
  /** Additional class name. */
  className?: string;
}
