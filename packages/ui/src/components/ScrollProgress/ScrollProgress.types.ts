import type { HTMLAttributes } from "react";

type DivAttributes = Omit<
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
>;

export interface ScrollProgressProps extends DivAttributes {
  /** CSS color of the progress bar. Defaults to `"#3b82f6"`. */
  color?: string;
  /** Height of the bar in pixels. Defaults to `3`. */
  height?: number;
  /** Edge to pin the bar to. Defaults to `"top"`. */
  position?: "top" | "bottom";
  /** CSS z-index. Defaults to `9999`. */
  zIndex?: number;
}
