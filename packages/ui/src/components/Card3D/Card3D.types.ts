import type { HTMLAttributes, ReactNode } from "react";

export interface Card3DProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Card content. */
  children: ReactNode;
  /** Max tilt angle in degrees. Defaults to 15. */
  maxTilt?: number;
  /** Perspective distance in pixels. Defaults to 1000. */
  perspective?: number;
  /** Transition speed in ms when mouse leaves. Defaults to 400. */
  resetSpeed?: number;
  /** Scale on hover. Defaults to 1.02. */
  hoverScale?: number;
  /** Enable/disable the glare overlay effect. Defaults to true. */
  glare?: boolean;
  /** Max glare opacity (0-1). Defaults to 0.15. */
  maxGlare?: number;
  /** Border color. Defaults to "var(--mantle-color-border)". */
  borderColor?: string;
  /** Background color. Defaults to "var(--mantle-color-bg-subtle)". */
  background?: string;
  /** Border radius. Defaults to "12px". */
  borderRadius?: string | number;
}
