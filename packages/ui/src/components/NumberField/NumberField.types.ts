import type { MantleColor } from "../../theme/colors";

export type NumberFieldSize = "sm" | "md" | "lg";

export interface NumberFieldProps {
  /** Controlled value. */
  value?: number;
  /** Default value for uncontrolled mode. */
  defaultValue?: number;
  /** Called when the value changes. */
  onValueChange?: (value: number) => void;
  /** Minimum allowed value. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Step increment. Defaults to `1`. */
  step?: number;
  /** Label text displayed above the input. */
  label?: string;
  /** Error message. When set, shows an error state. */
  error?: string;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. Defaults to `"md"`. */
  size?: NumberFieldSize;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Additional CSS class name. */
  className?: string;
}
