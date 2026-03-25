import type { InputHTMLAttributes } from "react";

export interface ColorFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange"
> {
  /** Hex color value (controlled). */
  value?: string;
  /** Default hex color value (uncontrolled). */
  defaultValue?: string;
  /** Called when value changes. */
  onValueChange?: (value: string) => void;
  /** Label text. */
  label?: string;
  /** Error message. */
  error?: string;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Additional class name. */
  className?: string;
}
