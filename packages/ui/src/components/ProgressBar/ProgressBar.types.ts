import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100). */
  value?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Size preset. Defaults to `"md"`. */
  size?: ProgressBarSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Accessible label for the progress bar. */
  label?: string;
  /** Whether to display the percentage text. */
  showValue?: boolean;
  /** Whether to show an indeterminate animation. */
  indeterminate?: boolean;
}
