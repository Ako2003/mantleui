import type { HTMLAttributes } from "react";

export type SkeletonRounded = "none" | "sm" | "md" | "lg" | "full";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton. */
  width?: string | number;
  /** Height of the skeleton. */
  height?: string | number;
  /** Border radius preset. Defaults to `"md"`. */
  rounded?: SkeletonRounded;
  /** Whether the shimmer animation is active. Defaults to `true`. */
  animate?: boolean;
}
