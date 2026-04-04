import type { HTMLAttributes } from "react";

export interface ParticleFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Number of particles. Defaults to 200. */
  count?: number;
  /** Particle color. Defaults to "#3b82f6". */
  color?: string;
  /** Particle size. Defaults to 0.015. */
  particleSize?: number;
  /** Spread radius of particle field. Defaults to 5. */
  spread?: number;
  /** Animation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Show connection lines between nearby particles. Defaults to true. */
  connections?: boolean;
  /** Max distance for connections. Defaults to 1.5. */
  connectionDistance?: number;
  /** Connection line opacity. Defaults to 0.15. */
  connectionOpacity?: number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
  /** Height of the container. Defaults to "400px". */
  height?: string | number;
}
