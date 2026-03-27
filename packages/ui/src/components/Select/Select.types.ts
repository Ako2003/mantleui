import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface SelectOption {
  /** Unique value for this option. */
  value: string;
  /** Display label. Defaults to `value` if not provided. */
  label?: string;
  /** Whether this option is disabled. */
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "color"
> {
  /** Available options. */
  options: SelectOption[];
  /** The selected value (controlled). */
  value?: string;
  /** The initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder text when no value is selected. */
  placeholder?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** Label text displayed above the select. */
  label?: string;
  /** Helper text displayed below the select. */
  description?: string;
  /** Error message. */
  error?: string;
  /** Optional icon rendered at the start of the trigger button. */
  startIcon?: ReactNode;
}
