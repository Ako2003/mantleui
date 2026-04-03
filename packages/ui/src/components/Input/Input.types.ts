import type { InputHTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> {
  /** Size preset. */
  size?: InputSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the input. */
  helperText?: string;
  /** Error message. When set, the input shows an error state. */
  error?: string;
  /** Element placed at the start of the input. */
  startIcon?: ReactNode;
  /** Element placed at the end of the input. */
  endIcon?: ReactNode;
  /** Additional class name for the outer wrapper div. */
  wrapperClassName?: string;
}
