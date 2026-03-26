import type { HTMLAttributes } from "react";

export interface ColorAreaProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Hue value (0-360). */
  hue: number;
  /** Saturation value (0-100, controlled). */
  saturation: number;
  /** Brightness value (0-100, controlled). */
  brightness: number;
  /** Called when saturation changes. */
  onSaturationChange?: (saturation: number) => void;
  /** Called when brightness changes. */
  onBrightnessChange?: (brightness: number) => void;
  /** Called when either saturation or brightness changes. Receives both values. */
  onColorChange?: (saturation: number, brightness: number) => void;
  /** Size of the area in pixels. Defaults to `200`. */
  size?: number;
  /** Additional class name. */
  className?: string;
}
