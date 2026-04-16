import type { HTMLAttributes, ReactNode } from "react";

export interface HoverCardProps extends Omit<
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
  /** Card content. */
  children: ReactNode;
  /** Lift distance in pixels on hover. Defaults to 8. */
  lift?: number;
  /** Scale factor on hover. Defaults to 1.02. */
  scale?: number;
  /** Shadow color on hover. Defaults to "rgba(0,0,0,0.15)". */
  shadowColor?: string;
}
