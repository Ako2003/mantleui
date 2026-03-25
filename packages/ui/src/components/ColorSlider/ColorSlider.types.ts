import type { HTMLAttributes } from "react";

export type ColorSliderChannel = "hue" | "saturation" | "lightness";

export interface ColorSliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** The color channel this slider controls. */
  channel: ColorSliderChannel;
  /** Current value (controlled). */
  value?: number;
  /** Default value (uncontrolled). */
  defaultValue?: number;
  /** Called when the value changes. */
  onValueChange?: (value: number) => void;
  /** Additional class name. */
  className?: string;
}
