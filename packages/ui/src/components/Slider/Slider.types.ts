import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

interface SliderBaseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "color" | "onChange"> {
  /** Minimum value. Defaults to `0`. */
  min?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Step increment. Defaults to `1`. */
  step?: number;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Accessible label displayed above the slider. */
  label?: string;
  /** Whether to display the current value. */
  showValue?: boolean;
  /** Orientation. Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** Size of the track. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
  /** Show step marks on the track. */
  showSteps?: boolean;
}

export interface SliderSingleProps extends SliderBaseProps {
  /** Controlled value. */
  value?: number;
  /** Default value (uncontrolled). Defaults to `0`. */
  defaultValue?: number;
  /** Called when the value changes. */
  onValueChange?: (value: number) => void;
}

export interface SliderRangeProps extends SliderBaseProps {
  /** Controlled range value as `[min, max]`. */
  value?: [number, number];
  /** Default range value (uncontrolled). */
  defaultValue?: [number, number];
  /** Called when the range changes. */
  onValueChange?: (value: [number, number]) => void;
}

export type SliderProps = SliderSingleProps | SliderRangeProps;
