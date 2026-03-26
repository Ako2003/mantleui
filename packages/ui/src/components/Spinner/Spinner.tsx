import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

const COLOR_MAP: Record<string, string> = {
  blue: "#3b82f6",
  red: "#ef4444",
  green: "#22c55e",
  yellow: "#eab308",
  purple: "#8b5cf6",
  neutral: "#a3a3a3",
};

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
  const strokeColor = COLOR_MAP[color] ?? COLOR_MAP.blue;

  return (
    <svg
      ref={ref}
      role="status"
      aria-label={label}
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      className={["mantle-spinner", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <circle
        cx={px / 2}
        cy={px / 2}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        strokeLinecap="round"
      />
    </svg>
  );
});

Spinner.displayName = "Spinner";
