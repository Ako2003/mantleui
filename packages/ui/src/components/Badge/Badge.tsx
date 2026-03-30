import { forwardRef } from "react";
import { resolveColor } from "../../utils";
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
    startIcon,
    className,
    children,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  return (
    <span
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
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
      {startIcon}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
