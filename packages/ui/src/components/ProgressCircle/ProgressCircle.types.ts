import type { SVGAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type ProgressCircleSize = "sm" | "md" | "lg";

export interface ProgressCircleProps extends SVGAttributes<SVGSVGElement> {
  /** Current progress value (0-100). */
  value?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Size preset. Defaults to `"md"`. */
  size?: ProgressCircleSize;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Stroke width in pixels. Defaults to `4`. */
  strokeWidth?: number;
  /** Whether to display the percentage text in the center. */
  showValue?: boolean;
}
