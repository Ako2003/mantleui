import type { HTMLAttributes, ReactNode } from "react";

export interface BlurRevealProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> {
  /** Content to reveal. */
  children: ReactNode;
  /** Initial blur amount in pixels. Defaults to 20. */
  blur?: number;
  /** Reveal duration in seconds. Defaults to 0.8. */
  duration?: number;
  /** Reveal delay in seconds. Defaults to 0. */
  delay?: number;
}
