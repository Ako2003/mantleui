import type { ButtonHTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface CloseButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  /** Size preset. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}
