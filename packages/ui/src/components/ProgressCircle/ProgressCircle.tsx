import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { ProgressCircleProps } from "./ProgressCircle.types";
import "./ProgressCircle.css";

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
} as const;

/**
 * Circular progress indicator (ring).
 *
 * @example
 * ```tsx
 * <ProgressCircle value={75} />
 * <ProgressCircle value={90} color="green" showValue />
 * ```
 */
export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  function ProgressCircle(
    {
      value = 0,
      max = 100,
      size = "md",
      color = "blue",
      strokeWidth = 4,
      showValue = false,
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);
    const px = SIZE_MAP[size];
    const radius = (px - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.round(
      Math.min(Math.max((value / max) * 100, 0), 100),
    );
    const offset = circumference - (percentage / 100) * circumference;

    const svg = (
      <svg
        ref={ref}
        data-color={dataColor}
        style={colorStyle}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className={[
          "mantle-progress-circle",
          `mantle-progress-circle-${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <circle
          className="mantle-progress-circle-track"
          cx={px / 2}
          cy={px / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="mantle-progress-circle-arc"
          cx={px / 2}
          cy={px / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    );

    if (showValue) {
      return (
        <div className="mantle-progress-circle-wrapper">
          {svg}
          <span
            className={[
              "mantle-progress-circle-value",
              `mantle-progress-circle-value-${size}`,
            ].join(" ")}
          >
            {percentage}%
          </span>
        </div>
      );
    }

    return svg;
  },
);

ProgressCircle.displayName = "ProgressCircle";
