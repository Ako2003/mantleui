import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Button elements. */
  children?: ReactNode;
  /** Layout direction. Defaults to `"horizontal"`. */
  orientation?: ButtonGroupOrientation;
  /** Size applied to child buttons. */
  size?: "sm" | "md" | "lg";
  /** Variant applied to child buttons. */
  variant?: "solid" | "outline" | "ghost";
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Additional class name. */
  className?: string;
}
