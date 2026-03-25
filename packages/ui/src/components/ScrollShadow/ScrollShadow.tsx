import { forwardRef } from "react";
import type { ScrollShadowProps } from "./ScrollShadow.types";
import "./ScrollShadow.css";

function toCssValue(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * A scrollable container that shows gradient shadows at scroll edges
 * to indicate more content.
 *
 * @example
 * ```tsx
 * <ScrollShadow maxHeight={200}>
 *   <p>Long content...</p>
 * </ScrollShadow>
 * ```
 */
export const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
  function ScrollShadow(
    {
      orientation = "vertical",
      maxHeight,
      maxWidth,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const orientationClass =
      orientation === "horizontal"
        ? "mantle-scrollshadowHorizontal"
        : "mantle-scrollshadowVertical";

    return (
      <div
        ref={ref}
        data-orientation={orientation}
        className={["mantle-scrollshadow", orientationClass, className]
          .filter(Boolean)
          .join(" ")}
        style={{
          maxHeight: toCssValue(maxHeight),
          maxWidth: toCssValue(maxWidth),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
