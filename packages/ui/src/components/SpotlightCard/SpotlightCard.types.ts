import type { HTMLAttributes, ReactNode } from "react";

export interface SpotlightCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Card content. */
  children: ReactNode;
  /** Spotlight color. Defaults to "rgba(255,255,255,0.1)". */
  spotlightColor?: string;
  /** Spotlight radius in pixels. Defaults to 400. */
  size?: number;
}
