import type { HTMLAttributes } from "react";

export interface MorphingSphereProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Sphere color. Defaults to "#3b82f6". */
  color?: string;
  /** Animation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Vertex displacement intensity. Defaults to 0.3. */
  distortion?: number;
  /** Sphere geometry detail (segments). Defaults to 64. */
  detail?: number;
  /** Render as wireframe. Defaults to false. */
  wireframe?: boolean;
  /** Height of the container. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
