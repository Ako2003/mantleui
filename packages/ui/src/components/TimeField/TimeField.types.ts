import type { InputHTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface TimeFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "color" | "defaultValue" | "value" | "onChange"
> {
  /** The time value as "HH:mm" (controlled). */
  value?: string;
  /** The initial time value (uncontrolled). */
  defaultValue?: string;
  /** Called when the time value changes. */
  onValueChange?: (value: string) => void;
  /** Label displayed above the input. */
  label?: string;
  /** Error message displayed below the input. */
  error?: string;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Additional class name on the wrapper. */
  className?: string;
  /** Step in minutes. Defaults to `1`. */
  step?: number;
}
