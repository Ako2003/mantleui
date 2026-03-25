import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface RadioGroupContextValue {
  /** Currently selected value. */
  value: string;
  /** Select a value. */
  select: (itemValue: string) => void;
  /** Accent color passed from the group. */
  color: MantleColor;
  /** Whether the entire group is disabled. */
  disabled: boolean;
}

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "color"
> {
  /** Controlled selected value. */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** Group label. */
  label?: string;
  /** Layout direction. Defaults to `"vertical"`. */
  orientation?: "horizontal" | "vertical";
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Whether all items are disabled. */
  disabled?: boolean;
  /** Child radio items. */
  children?: ReactNode;
}

export interface RadioGroupItemProps extends Omit<
  HTMLAttributes<HTMLLabelElement>,
  "color"
> {
  /** The value of this radio item. */
  value: string;
  /** Label content. */
  label?: ReactNode;
  /** Whether this item is disabled. */
  disabled?: boolean;
}
