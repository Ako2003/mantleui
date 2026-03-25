import type { HTMLAttributes } from "react";

export interface ColorSwatchProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** The CSS color value to display (e.g. "#ff0000", "rgb(0,0,0)"). */
  color: string;
  /** Size preset. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
  /** Whether to render as a full circle. Defaults to `true`. */
  rounded?: boolean;
}
