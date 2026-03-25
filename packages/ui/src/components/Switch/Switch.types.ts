import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "color"
> {
  /** Whether the switch is on (controlled). */
  checked?: boolean;
  /** The initial on state (uncontrolled). Defaults to `false`. */
  defaultChecked?: boolean;
  /** Called when the on state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. */
  size?: "sm" | "md";
  /** Label content displayed next to the switch. */
  label?: ReactNode;
}
