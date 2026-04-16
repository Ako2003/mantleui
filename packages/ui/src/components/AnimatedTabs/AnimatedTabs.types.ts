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

export interface AnimatedTabItem {
  /** Stable unique id for the tab. */
  id: string;
  /** Content rendered inside the tab button. */
  label: ReactNode;
}

export interface AnimatedTabsProps extends DivAttributes {
  /** Tab definitions. */
  tabs: AnimatedTabItem[];
  /** Controlled selected tab id. */
  value?: string;
  /** Default selected tab id in uncontrolled mode. */
  defaultValue?: string;
  /** Called whenever the selected tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual style of the active indicator. Defaults to `"underline"`. */
  variant?: "underline" | "pill";
}
