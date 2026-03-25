import { forwardRef } from "react";
import type { ColorSwatchProps } from "./ColorSwatch.types";
import "./ColorSwatch.css";

/**
 * Displays a color preview circle or rounded square.
 *
 * @example
 * ```tsx
 * <ColorSwatch color="#ff0000" />
 * <ColorSwatch color="rgb(0,128,255)" size="lg" rounded={false} />
 * ```
 */
export const ColorSwatch = forwardRef<HTMLSpanElement, ColorSwatchProps>(
  function ColorSwatch(
    { color, size = "md", rounded = true, className, ...rest },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role="img"
        aria-label={color}
        className={[
          "mantle-colorswatch",
          `mantle-colorswatch-${size}`,
          rounded ? "mantle-colorswatch-rounded" : "mantle-colorswatch-square",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span
          className="mantle-colorswatch-inner"
          style={{ backgroundColor: color }}
        />
      </span>
    );
  },
);

ColorSwatch.displayName = "ColorSwatch";
