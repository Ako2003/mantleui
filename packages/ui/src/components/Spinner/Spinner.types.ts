import type { SVGAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  /** Size preset. Defaults to `"md"`. */
  size?: SpinnerSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Accessible label. Defaults to `"Loading"`. */
  label?: string;
}
