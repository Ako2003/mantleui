import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "color"
> {
  /** Controlled value. */
  value?: number;
  /** Default value (uncontrolled). Defaults to `0`. */
  defaultValue?: number;
  /** Called when the value changes. */
  onValueChange?: (value: number) => void;
  /** Minimum value. Defaults to `0`. */
  min?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Step increment. Defaults to `1`. */
  step?: number;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Accessible label. */
  label?: string;
  /** Whether to display the current value. */
  showValue?: boolean;
}
