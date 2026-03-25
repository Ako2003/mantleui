import type { HTMLAttributes } from "react";

export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Hex color value (controlled). */
  value?: string;
  /** Default hex color value (uncontrolled). */
  defaultValue?: string;
  /** Called when value changes. */
  onValueChange?: (value: string) => void;
  /** Whether to show the hex input field. Defaults to `true`. */
  showField?: boolean;
  /** Additional class name. */
  className?: string;
}
