import type { HTMLAttributes, ReactNode } from "react";

export type AnimatedListDirection = "up" | "down" | "left" | "right";

export interface AnimatedListProps extends Omit<
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
  /** Items to render with staggered entry animation. */
  children: ReactNode;
  /** Delay in seconds between each child's animation. Defaults to 0.1. */
  stagger?: number;
  /** Direction each item slides from. Defaults to "up". */
  direction?: AnimatedListDirection;
  /** Distance in pixels each item travels on entry. Defaults to 20. */
  distance?: number;
}
