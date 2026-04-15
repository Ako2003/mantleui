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

export interface FloatingDockItem {
  /** Icon content (e.g. SVG). */
  icon: ReactNode;
  /** Accessible label shown in the tooltip. */
  label: string;
  /** Optional click handler. */
  onClick?: () => void;
  /** Optional anchor href. When set, the item renders as an `<a>`. */
  href?: string;
}

export interface FloatingDockProps extends DivAttributes {
  /** Dock items. */
  items: FloatingDockItem[];
}
