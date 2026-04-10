import type { HTMLAttributes, ReactNode } from "react";

export type MarqueeDirection = "left" | "right";

export interface MarqueeProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Content to scroll horizontally. */
  children: ReactNode;
  /** Scroll speed in pixels per second. Defaults to 50. */
  speed?: number;
  /** Scroll direction. Defaults to "left". */
  direction?: MarqueeDirection;
  /** Whether to pause the animation on hover. Defaults to true. */
  pauseOnHover?: boolean;
}
