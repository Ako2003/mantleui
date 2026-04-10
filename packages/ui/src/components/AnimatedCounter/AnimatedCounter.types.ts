import type { HTMLAttributes } from "react";

export interface AnimatedCounterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** The target number to animate to. */
  value: number;
  /** Animation duration in seconds. Defaults to 1.5. */
  duration?: number;
  /** Number of decimal places to display. Defaults to 0. */
  decimals?: number;
  /** Optional prefix rendered before the number (e.g. "$"). */
  prefix?: string;
  /** Optional suffix rendered after the number (e.g. "+"). */
  suffix?: string;
}
