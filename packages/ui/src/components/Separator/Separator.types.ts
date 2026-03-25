import type { HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation of the separator. */
  orientation?: SeparatorOrientation;
}
