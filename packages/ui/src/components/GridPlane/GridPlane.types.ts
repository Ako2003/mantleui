import type { HTMLAttributes } from "react";

export interface GridPlaneProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Grid line color. Defaults to "#3b82f6". */
  color?: string;
  /** Scroll speed multiplier. Defaults to 1. */
  speed?: number;
  /** Grid size. Defaults to 20. */
  gridSize?: number;
  /** Number of grid divisions. Defaults to 20. */
  divisions?: number;
  /** Distance at which the grid fades. Defaults to 15. */
  fadeDistance?: number;
  /** Height of the container. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
