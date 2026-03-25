import type { HTMLAttributes, ReactNode } from "react";

export type SurfaceElevation = "none" | "sm" | "md" | "lg";
export type SurfaceRounded = "none" | "sm" | "md" | "lg";

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Shadow elevation. Defaults to `"none"`. */
  elevation?: SurfaceElevation;
  /** Border-radius. Defaults to `"md"`. */
  rounded?: SurfaceRounded;
  /** Whether to show a border. Defaults to `false`. */
  bordered?: boolean;
  /** Surface content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}
