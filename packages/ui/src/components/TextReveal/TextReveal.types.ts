import type { HTMLAttributes } from "react";

export interface TextRevealProps extends Omit<
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
  /** The text to animate. */
  children: string;
  /** Delay in seconds between each word. Defaults to 0.05. */
  stagger?: number;
  /** Delay in seconds before the animation starts. Defaults to 0. */
  delay?: number;
}
