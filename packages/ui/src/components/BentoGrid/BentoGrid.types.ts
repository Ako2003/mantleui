import type { HTMLAttributes, ReactNode } from "react";

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

export interface BentoGridProps extends DivAttributes {
  /** Grid cells. Typically a list of `BentoGrid.Item`s. */
  children: ReactNode;
  /** Number of columns in the grid. Defaults to 4. */
  columns?: number;
  /** Gap between cells in pixels. Defaults to 16. */
  gap?: number;
}

export interface BentoGridItemProps extends DivAttributes {
  /** Cell content. */
  children: ReactNode;
  /** Number of columns the cell should span. Defaults to 1. */
  colSpan?: number;
  /** Number of rows the cell should span. Defaults to 1. */
  rowSpan?: number;
}
