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

export interface SplitFlapProps extends DivAttributes {
  /** The value to display. Coerced to string. */
  value: string | number;
  /** Pad the value to this length using leading spaces. */
  length?: number;
}
