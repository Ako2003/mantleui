import type { HTMLAttributes } from "react";

export interface AuroraProps extends HTMLAttributes<HTMLDivElement> {
  /** Aurora ribbon colors. Defaults to ["#3b82f6", "#8b5cf6", "#22c55e"]. */
  colors?: string[];
  /** Animation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Number of ribbon layers. Defaults to 3. */
  layers?: number;
  /** Ribbon opacity. Defaults to 0.5. */
  opacity?: number;
  /** Height of the container. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
