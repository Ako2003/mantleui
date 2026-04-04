import type { HTMLAttributes } from "react";

export interface VortexProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Number of particles. Defaults to 500. */
  count?: number;
  /** Particle color. Defaults to "#8b5cf6". */
  color?: string;
  /** Animation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Spiral radius. Defaults to 2. */
  radius?: number;
  /** Spiral length along the Y axis. Defaults to 6. */
  length?: number;
  /** Individual particle size. Defaults to 0.02. */
  particleSize?: number;
  /** Container height. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
}
