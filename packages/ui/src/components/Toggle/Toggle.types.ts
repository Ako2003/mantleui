import type { ButtonHTMLAttributes } from "react";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  /** Whether the toggle is pressed (controlled). */
  pressed?: boolean;
  /** The initial pressed state (uncontrolled). Defaults to `false`. */
  defaultPressed?: boolean;
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
}
