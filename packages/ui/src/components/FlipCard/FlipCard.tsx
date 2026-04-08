import { forwardRef, useCallback, useState } from "react";
import type { FlipCardProps } from "./FlipCard.types";
import "./FlipCard.css";

/**
 * A card that flips on click to reveal content on the back side.
 *
 * @example
 * ```tsx
 * <FlipCard
 *   front={<div>Front</div>}
 *   back={<div>Back</div>}
 * />
 * ```
 */
export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  function FlipCard(
    {
      front,
      back,
      width = 300,
      height = 200,
      direction = "horizontal",
      flipped: flippedProp,
      onFlippedChange,
      borderRadius = 12,
      frontBackground,
      backBackground,
      borderColor,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const [internalFlipped, setInternalFlipped] = useState(false);
    const isControlled = flippedProp !== undefined;
    const flipped = isControlled ? flippedProp : internalFlipped;

    const handleClick = useCallback(() => {
      if (isControlled) {
        onFlippedChange?.(!flipped);
      } else {
        setInternalFlipped((prev) => {
          onFlippedChange?.(!prev);
          return !prev;
        });
      }
    }, [isControlled, flipped, onFlippedChange]);

    const w = typeof width === "number" ? `${width}px` : width;
    const h = typeof height === "number" ? `${height}px` : height;
    const r = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

    const flipClass = flipped
      ? direction === "vertical"
        ? "is-flipped-vertical"
        : "is-flipped"
      : "";

    const frontStyle: React.CSSProperties = { borderRadius: r };
    if (frontBackground) frontStyle.background = frontBackground;
    if (borderColor) frontStyle.border = `1px solid ${borderColor}`;

    const backStyle: React.CSSProperties = { borderRadius: r };
    if (backBackground) backStyle.background = backBackground;
    if (borderColor) backStyle.border = `1px solid ${borderColor}`;

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        className={[
          "mantle-flipcard-container",
          flipClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ width: w, height: h, ...style }}
        {...rest}
      >
        <div className="mantle-flipcard-rotator">
          {/* Front */}
          <div className="mantle-flipcard-front" style={frontStyle}>
            {front}
          </div>

          {/* Back */}
          <div
            className={
              direction === "vertical"
                ? "mantle-flipcard-back mantle-flipcard-back-vertical"
                : "mantle-flipcard-back"
            }
            style={backStyle}
          >
            {back}
          </div>
        </div>
      </div>
    );
  },
);

FlipCard.displayName = "FlipCard";
