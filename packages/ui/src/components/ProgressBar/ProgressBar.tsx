import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { ProgressBarProps } from "./ProgressBar.types";
import "./ProgressBar.css";

/**
 * Horizontal progress indicator.
 *
 * @example
 * ```tsx
 * <ProgressBar value={60} />
 * <ProgressBar value={80} color="green" showValue />
 * <ProgressBar indeterminate />
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      value = 0,
      max = 100,
      size = "md",
      color = "blue",
      label,
      showValue = false,
      indeterminate = false,
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const percentage = Math.round(
      Math.min(Math.max((value / max) * 100, 0), 100),
    );

    const bar = (
      <div
        ref={ref}
        data-color={dataColor}
        style={colorStyle}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={[
          "mantle-progress-bar",
          `mantle-progress-bar-${size}`,
          indeterminate && "mantle-progress-bar-indeterminate",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <div
          className="mantle-progress-bar-fill"
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    );

    if (showValue || label) {
      return (
        <div className="mantle-progress-bar-wrapper" data-color={dataColor} style={colorStyle}>
          {(showValue || label) && (
            <div className="mantle-progress-bar-header">
              {label && <span>{label}</span>}
              {showValue && !indeterminate && (
                <span className="mantle-progress-bar-value">{percentage}%</span>
              )}
            </div>
          )}
          {bar}
        </div>
      );
    }

    return bar;
  },
);

ProgressBar.displayName = "ProgressBar";
