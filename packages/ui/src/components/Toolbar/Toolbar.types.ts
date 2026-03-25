import type { HTMLAttributes, ReactNode } from "react";

export type ToolbarOrientation = "horizontal" | "vertical";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout direction. Defaults to `"horizontal"`. */
  orientation?: ToolbarOrientation;
  /** Toolbar items. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}
