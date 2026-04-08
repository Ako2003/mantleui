import { forwardRef, useCallback, useState } from "react";
import type { FlipCardProps } from "./FlipCard.types";
import "./FlipCard.css";

/**
 * A card that flips on click to reveal content on the back side.
 * Pure CSS/JS — does not require Three.js.
 *
 * @example
 * ```tsx
 * <FlipCard
 *   front={<div>Front content</div>}
 *   back={<div>Back content</div>}
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
      duration,
      flipped: flippedProp,
      onFlippedChange,
      borderRadius = 12,
      frontBackground = "var(--mantle-color-bg-muted, #18181b)",
      backBackground = "var(--mantle-color-bg-muted, #18181b)",
      borderColor = "var(--mantle-color-border, #27272a)",
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

    const radius =
      typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
    const w = typeof width === "number" ? `${width}px` : width;
    const h = typeof height === "number" ? `${height}px` : height;

    const flipClass =
      flipped
        ? direction === "vertical"
          ? "mantle-flipcard-flipped-vertical"
          : "mantle-flipcard-flipped"
        : "";

    return (
      <div
        ref={ref}
        className={["mantle-flipcard", flipClass, className]
          .filter(Boolean)
          .join(" ")}
        style={{
          width: w,
          height: h,
          ...style,
        }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={
          flipped ? "Click to flip to front" : "Click to flip to back"
        }
        {...rest}
      >
        <div className="mantle-flipcard-inner">
          {/* Front */}
          <div
            className="mantle-flipcard-face"
            style={{
              background: frontBackground,
              borderRadius: radius,
              border: `1px solid ${borderColor}`,
            }}
          >
            {front}
          </div>

          {/* Back */}
          <div
            className={`mantle-flipcard-face mantle-flipcard-back-${direction}`}
            style={{
              background: backBackground,
              borderRadius: radius,
              border: `1px solid ${borderColor}`,
            }}
          >
            {back}
          </div>
        </div>
      </div>
    );
  },
);

FlipCard.displayName = "FlipCard";
