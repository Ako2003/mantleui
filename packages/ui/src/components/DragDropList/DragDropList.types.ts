import type { HTMLAttributes, ReactNode } from "react";

type DivAttributes = Omit<
  HTMLAttributes<HTMLUListElement>,
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

export interface DragDropListProps<T> extends DivAttributes {
  /** The current list of items. */
  items: T[];
  /** Called with the new list order after a drag ends. */
  onReorder: (items: T[]) => void;
  /** Render function for each item. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Returns a stable key for each item. Defaults to the item itself. */
  keyAccessor?: (item: T) => string | number;
}
