import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

/**
 * Loading spinner indicator.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" color="green" />
 * ```
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { size = "md", color = "blue", label = "Loading", className, ...rest },
  ref,
) {
  const px = SIZE_MAP[size];
  const strokeWidth = size === "sm" ? 2 : 3;
  const radius = (px - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      ref={ref}
      data-color={color}
      role="status"
      aria-label={label}
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      className={["mantle-spinner", `mantle-spinner-${size}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <circle
        className="mantle-spinner-arc"
        cx={px / 2}
        cy={px / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
      />
    </svg>
  );
});

Spinner.displayName = "Spinner";
