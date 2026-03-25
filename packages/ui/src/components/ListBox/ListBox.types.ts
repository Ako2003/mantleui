import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface ListBoxItem {
  /** Unique value for this item. */
  value: string;
  /** Display label. Defaults to `value` if not provided. */
  label?: string;
  /** Whether this item is disabled. */
  disabled?: boolean;
}

export interface ListBoxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "color" | "defaultValue"
> {
  /** Available items to display. */
  items: ListBoxItem[];
  /** The selected value(s) (controlled). */
  value?: string | string[];
  /** The initial selected value(s) (uncontrolled). */
  defaultValue?: string | string[];
  /** Called when the selection changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Whether multiple items can be selected. Defaults to `false`. */
  multiple?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}
