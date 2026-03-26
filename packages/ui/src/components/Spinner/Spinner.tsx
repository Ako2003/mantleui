import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

const SIZE_MAP: Record<string, string> = {
  sm: "16px",
  md: "24px",
  lg: "32px",
};

const BORDER_MAP: Record<string, string> = {
  sm: "2px",
  md: "3px",
  lg: "3px",
};

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
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(
    { size = "md", color = "blue", label = "Loading", className, ...rest },
    ref,
  ) {
    const strokeColor = COLOR_MAP[color] ?? COLOR_MAP.blue;

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="status"
        aria-label={label}
        className={["mantle-spinner", className].filter(Boolean).join(" ")}
        style={{
          width: SIZE_MAP[size],
          height: SIZE_MAP[size],
          borderWidth: BORDER_MAP[size],
          borderColor: "transparent",
          borderTopColor: strokeColor,
          borderRightColor: strokeColor,
        }}
        {...rest}
      />
    );
  },
);

Spinner.displayName = "Spinner";
