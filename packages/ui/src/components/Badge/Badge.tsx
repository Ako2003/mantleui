import { forwardRef } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";

/**
 * A small label/tag component.
 *
 * @example
 * ```tsx
 * <Badge variant="solid" color="green">Active</Badge>
 * <Badge variant="outline" size="md">Draft</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "subtle",
    size = "sm",
    color = "blue",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      data-color={color}
      className={[
        "mantle-badge",
        `mantle-badge-${variant}`,
        `mantle-badge-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
