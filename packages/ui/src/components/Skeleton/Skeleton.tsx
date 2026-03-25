import { forwardRef } from "react";
import type { SkeletonProps } from "./Skeleton.types";
import "./Skeleton.css";

/**
 * Loading placeholder with shimmer animation.
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton width="100%" height={16} rounded="full" />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      width,
      height,
      rounded = "md",
      animate = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={[
          "mantle-skeleton",
          animate && "mantle-skeleton-animate",
          `mantle-skeleton-rounded-${rounded}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
