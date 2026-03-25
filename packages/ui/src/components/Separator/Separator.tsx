import { forwardRef } from "react";
import type { SeparatorProps } from "./Separator.types";
import "./Separator.css";

/**
 * A horizontal or vertical divider.
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator({ orientation = "horizontal", className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={[
          "mantle-separator",
          `mantle-separator-${orientation}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
    );
  },
);

Separator.displayName = "Separator";
