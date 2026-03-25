import { forwardRef } from "react";
import type { SurfaceProps } from "./Surface.types";
import "./Surface.css";

/**
 * A generic container with configurable elevation, border-radius, and border.
 *
 * @example
 * ```tsx
 * <Surface elevation="md" rounded="lg" bordered>
 *   Card content
 * </Surface>
 * ```
 */
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(
    {
      elevation = "none",
      rounded = "md",
      bordered = false,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={[
          "mantle-surface",
          `mantle-surface-elevation-${elevation}`,
          `mantle-surface-rounded-${rounded}`,
          bordered ? "mantle-surface-bordered" : undefined,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
