import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface CheckboxGroupContextValue {
  /** Currently selected values. */
  value: string[];
  /** Toggle a value in or out of the selection. */
  toggle: (itemValue: string) => void;
  /** Accent color passed from the group. */
  color: MantleColor;
}

export interface CheckboxGroupProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  "defaultValue" | "color"
> {
  /** Group label rendered as a `<legend>`. */
  label: string;
  /** Controlled selected values. */
  value?: string[];
  /** Default selected values (uncontrolled). */
  defaultValue?: string[];
  /** Called when the set of selected values changes. */
  onValueChange?: (value: string[]) => void;
  /** Layout direction. Defaults to `"vertical"`. */
  orientation?: "horizontal" | "vertical";
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Child checkboxes. */
  children?: ReactNode;
}
