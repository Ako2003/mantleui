import type { HTMLAttributes } from "react";

export interface StarFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Number of stars. Defaults to 1000. */
  count?: number;
  /** Star color. Defaults to "#ffffff". */
  color?: string;
  /** Warp speed multiplier. Defaults to 1. */
  speed?: number;
  /** Depth of the star tunnel. Defaults to 10. */
  depth?: number;
  /** Size of each star point. Defaults to 0.01. */
  starSize?: number;
  /** Height of the container. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
