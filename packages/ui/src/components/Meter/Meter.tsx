import { forwardRef } from "react";
import { getAccentColor, resolveColor } from "../../utils";
import type { MeterProps } from "./Meter.types";
import "./Meter.css";

/**
 * Determines the meter segment based on value vs low/high/optimum thresholds.
 * Returns "optimal", "suboptimal", or "critical".
 */
function getMeterSegment(
  value: number,
  min: number,
  max: number,
  low?: number,
  high?: number,
  optimum?: number,
): "optimal" | "suboptimal" | "critical" {
  const resolvedLow = low ?? min;
  const resolvedHigh = high ?? max;
  const resolvedOptimum = optimum ?? (resolvedLow + resolvedHigh) / 2;

  // Optimum is in the low range
  if (resolvedOptimum <= resolvedLow) {
    if (value <= resolvedLow) return "optimal";
    if (value <= resolvedHigh) return "suboptimal";
    return "critical";
  }

  // Optimum is in the high range
  if (resolvedOptimum >= resolvedHigh) {
    if (value >= resolvedHigh) return "optimal";
    if (value >= resolvedLow) return "suboptimal";
    return "critical";
  }

  // Optimum is in the middle range
  if (value >= resolvedLow && value <= resolvedHigh) return "optimal";
  if (value < resolvedLow) return "suboptimal";
  return "critical";
}

/**
 * Meter/gauge display for showing a value within a known range (e.g. disk usage).
 *
 * @example
 * ```tsx
 * <Meter value={75} low={25} high={75} optimum={50} label="Disk usage" showValue />
 * ```
 */
export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  {
    value,
    min = 0,
    max = 100,
    low,
    high,
    optimum,
    color = "blue",
    label,
    showValue,
    className,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = ((clampedValue - min) / (max - min)) * 100;
  const hasThresholds =
    low !== undefined || high !== undefined || optimum !== undefined;
  const segment = hasThresholds
    ? getMeterSegment(clampedValue, min, max, low, high, optimum)
    : null;

  return (
    <div
      ref={ref}
      role="meter"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label}
      data-color={dataColor}
      style={colorStyle}
      className={["mantle-meter", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {(label || showValue) && (
        <div className="mantle-meter-header">
          {label && <span>{label}</span>}
          {showValue && (
            <span data-testid="mantle-meter-value">{clampedValue}</span>
          )}
        </div>
      )}
      <div className="mantle-meter-track">
        <div
          className={[
            "mantle-meter-fill",
            segment && `mantle-meter-fill-${segment}`,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            width: `${percentage}%`,
            ...(!segment
              ? { backgroundColor: getAccentColor(color) }
              : undefined),
          }}
        />
      </div>
    </div>
  );
});

Meter.displayName = "Meter";
