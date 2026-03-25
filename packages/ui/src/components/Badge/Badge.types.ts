import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type BadgeVariant = "solid" | "outline" | "subtle";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. */
  variant?: BadgeVariant;
  /** Size preset. */
  size?: BadgeSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Badge content. */
  children?: ReactNode;
}
