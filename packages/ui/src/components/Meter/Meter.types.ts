import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface MeterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Current value. */
  value: number;
  /** Minimum value. Defaults to `0`. */
  min?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Values at or below this are considered low. */
  low?: number;
  /** Values at or above this are considered high. */
  high?: number;
  /** The optimum value. Determines color thresholds. */
  optimum?: number;
  /** Accent color override. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Accessible label. */
  label?: string;
  /** Whether to display the current value. */
  showValue?: boolean;
}
