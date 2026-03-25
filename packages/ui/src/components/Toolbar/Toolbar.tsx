import { forwardRef } from "react";
import type { ToolbarProps } from "./Toolbar.types";
import "./Toolbar.css";

/**
 * Horizontal or vertical toolbar container.
 *
 * @example
 * ```tsx
 * <Toolbar aria-label="Formatting">
 *   <button>Bold</button>
 *   <button>Italic</button>
 * </Toolbar>
 * ```
 */
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  function Toolbar(
    { orientation = "horizontal", children, className, ...rest },
    ref,
  ) {
    const orientationClass =
      orientation === "vertical"
        ? "mantle-toolbarVertical"
        : "mantle-toolbarHorizontal";

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation={orientation}
        data-orientation={orientation}
        className={["mantle-toolbar", orientationClass, className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
