import type { ButtonHTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "color"
> {
  /** Whether the toggle is pressed (controlled). */
  pressed?: boolean;
  /** The initial pressed state (uncontrolled). Defaults to `false`. */
  defaultPressed?: boolean;
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}
