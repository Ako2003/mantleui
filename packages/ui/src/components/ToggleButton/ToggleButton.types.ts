import type { ButtonHTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type ToggleButtonVariant = "solid" | "outline";
export type ToggleButtonSize = "sm" | "md" | "lg";

export interface ToggleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  /** Whether the button is pressed (controlled). */
  pressed?: boolean;
  /** The initial pressed state (uncontrolled). Defaults to `false`. */
  defaultPressed?: boolean;
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Visual variant. Defaults to `"outline"`. */
  variant?: ToggleButtonVariant;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. Defaults to `"md"`. */
  size?: ToggleButtonSize;
}
