import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface DatePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "defaultValue"
> {
  /** The selected date (controlled). */
  value?: Date;
  /** The initial selected date (uncontrolled). */
  defaultValue?: Date;
  /** Called when a date is selected. */
  onValueChange?: (date: Date) => void;
  /** Placeholder text when no date is selected. */
  placeholder?: string;
  /** Label displayed above the trigger. */
  label?: string;
  /** Error message displayed below the trigger. */
  error?: string;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Whether the picker is disabled. */
  disabled?: boolean;
  /** Additional class name. */
  className?: string;
}
