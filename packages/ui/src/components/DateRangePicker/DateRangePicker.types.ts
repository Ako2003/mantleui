import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateRangePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** The selected start date. */
  startDate?: Date;
  /** The selected end date. */
  endDate?: Date;
  /** Called when a complete range is selected. */
  onRangeChange?: (range: DateRange) => void;
  /** Placeholder text when no range is selected. */
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
