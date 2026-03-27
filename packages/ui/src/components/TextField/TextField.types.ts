import type { InputHTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type TextFieldSize = "sm" | "md" | "lg";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "color" | "size"
> {
  /** Label text displayed above the input. */
  label?: string;
  /** Description text displayed below the input. */
  description?: string;
  /** Error message. When set, replaces the description and shows an error state. */
  error?: string;
  /** Whether the field is required. Shows an asterisk next to the label. */
  required?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. Defaults to `"md"`. */
  size?: TextFieldSize;
  /** Optional icon rendered before the input. */
  startIcon?: ReactNode;
  /** Optional icon rendered after the input. */
  endIcon?: ReactNode;
}
