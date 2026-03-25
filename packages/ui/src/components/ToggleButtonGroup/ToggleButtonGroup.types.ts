import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type ToggleButtonGroupSize = "sm" | "md" | "lg";
export type ToggleButtonGroupOrientation = "horizontal" | "vertical";

export interface ToggleButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "defaultValue"
> {
  /** The controlled selected value(s). */
  value?: string | string[];
  /** The default selected value(s) for uncontrolled mode. */
  defaultValue?: string | string[];
  /** Called when the selection changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Whether multiple items can be selected. Defaults to `false`. */
  multiple?: boolean;
  /** Layout direction. Defaults to `"horizontal"`. */
  orientation?: ToggleButtonGroupOrientation;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size of the toggle buttons. Defaults to `"md"`. */
  size?: ToggleButtonGroupSize;
  /** Toggle button elements. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
  /** Accessible label for the group. */
  "aria-label"?: string;
}

export interface ToggleButtonGroupContextValue {
  value: string[];
  toggle: (itemValue: string) => void;
  color: MantleColor;
  size: ToggleButtonGroupSize;
}

export interface ToggleButtonGroupItemProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "color" | "value"
> {
  /** The value this item represents. */
  value: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Button content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}
