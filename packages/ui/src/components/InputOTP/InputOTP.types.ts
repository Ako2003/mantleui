import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface InputOTPProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "color"
> {
  /** Number of digit boxes. Defaults to `6`. */
  length?: number;
  /** Controlled value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Called when the combined value changes. */
  onValueChange?: (value: string) => void;
  /** Whether all inputs are disabled. */
  disabled?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}
