import type { HTMLAttributes } from "react";

export interface DNAHelixProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** First strand color. Defaults to "#3b82f6". */
  color1?: string;
  /** Second strand color. Defaults to "#ef4444". */
  color2?: string;
  /** Connecting rung color. Defaults to "rgba(255,255,255,0.3)". */
  rungColor?: string;
  /** Rotation speed multiplier. Defaults to 1. */
  speed?: number;
  /** Helix radius. Defaults to 0.5. */
  radius?: number;
  /** Container height. Defaults to 400. */
  height?: string | number;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
  /** Number of helix turns. Defaults to 3. */
  turns?: number;
}
