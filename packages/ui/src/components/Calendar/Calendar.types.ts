import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "color" | "defaultValue"
> {
  /** The selected date (controlled). */
  value?: Date;
  /** The initial selected date (uncontrolled). */
  defaultValue?: Date;
  /** Called when a date is selected. */
  onValueChange?: (date: Date) => void;
  /** Controlled displayed month (0-11). */
  month?: number;
  /** Controlled displayed year. */
  year?: number;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Additional class name. */
  className?: string;
}
