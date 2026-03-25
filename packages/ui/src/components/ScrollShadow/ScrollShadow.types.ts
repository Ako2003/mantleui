import type { HTMLAttributes, ReactNode } from "react";

export type ScrollShadowOrientation = "horizontal" | "vertical";

export interface ScrollShadowProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll direction. Defaults to `"vertical"`. */
  orientation?: ScrollShadowOrientation;
  /** Maximum height of the scrollable container. */
  maxHeight?: string | number;
  /** Maximum width of the scrollable container. */
  maxWidth?: string | number;
  /** Scrollable content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}
