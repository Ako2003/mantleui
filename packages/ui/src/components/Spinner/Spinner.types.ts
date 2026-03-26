import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Size preset. Defaults to `"md"`. */
  size?: SpinnerSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Accessible label. Defaults to `"Loading"`. */
  label?: string;
}
