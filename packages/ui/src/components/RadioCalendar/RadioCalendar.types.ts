import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface RadioCalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "defaultValue"
> {
  /** The selected date (controlled). */
  value?: Date;
  /** The initial selected date (uncontrolled). */
  defaultValue?: Date;
  /** Called when a date is selected. */
  onValueChange?: (date: Date) => void;
  /** The available dates to choose from. */
  dates: Date[];
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Additional class name. */
  className?: string;
}
