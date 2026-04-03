import type { HTMLAttributes, ReactNode } from "react";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Delay in milliseconds before the tooltip appears. Defaults to `300`. */
  delayMs?: number;
  children: ReactNode;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** When true, merges trigger props onto the child element instead of wrapping in a div. */
  asChild?: boolean;
  children: ReactNode;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Which side of the trigger to show the tooltip. Defaults to `"top"`. */
  side?: TooltipSide;
  children: ReactNode;
}
