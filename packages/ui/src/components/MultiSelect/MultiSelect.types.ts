import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface MultiSelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "color"
> {
  /** Available options. */
  options: MultiSelectOption[];
  /** Selected values (controlled). */
  value?: string[];
  /** Initially selected values (uncontrolled). */
  defaultValue?: string[];
  /** Called when selection changes. */
  onValueChange?: (value: string[]) => void;
  /** Placeholder when nothing is selected. */
  placeholder?: string;
  /** Label text above the select. */
  label?: string;
  /** Description text below the select. */
  description?: string;
  /** Error message. */
  error?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Accent color. */
  color?: MantleColor;
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** Icon at the start of the trigger. */
  startIcon?: ReactNode;
  /** Maximum number of items that can be selected. */
  maxItems?: number;
}
