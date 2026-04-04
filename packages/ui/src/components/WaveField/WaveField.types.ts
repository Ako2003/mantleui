import type { HTMLAttributes } from "react";

export interface WaveFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Wave color. Defaults to "#3b82f6". */
  color?: string;
  /** Render as wireframe. Defaults to true. */
  wireframe?: boolean;
  /** Animation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Wave amplitude. Defaults to 0.3. */
  amplitude?: number;
  /** Wave frequency. Defaults to 0.5. */
  frequency?: number;
  /** Number of plane segments. Defaults to 50. */
  segments?: number;
  /** Container height. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
