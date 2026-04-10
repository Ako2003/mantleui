import type { HTMLAttributes } from "react";

export interface PulseDotProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Dot color. Defaults to "#ef4444". */
  color?: string;
  /** Dot size in pixels. Defaults to 12. */
  size?: number;
}
