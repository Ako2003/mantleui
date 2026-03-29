import { forwardRef, useCallback, useMemo, useRef } from "react";
import { useControllable } from "../../hooks";
import type {
  SliderProps,
  SliderRangeProps,
  SliderSingleProps,
} from "./Slider.types";
import "./Slider.css";

function isRangeProps(props: SliderProps): props is SliderRangeProps {
  return Array.isArray(props.value) || Array.isArray(props.defaultValue);
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function snap(val: number, step: number, min: number) {
  return Math.round((val - min) / step) * step + min;
}

function pct(val: number, min: number, max: number) {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

function useStepMarks(min: number, max: number, step: number, show: boolean) {
  return useMemo(() => {
    if (!show || step <= 0) return [];
    const marks: number[] = [];
    for (let v = min; v <= max; v += step) {
      marks.push(pct(v, min, max));
    }
    return marks;
  }, [min, max, step, show]);
}

function StepMarks({
  marks,
  isVertical,
}: {
  marks: number[];
  isVertical: boolean;
}) {
  if (marks.length === 0) return null;
  return (
    <>
      {marks.map((p) => (
        <span
          key={p}
          className="mantle-slider-mark"
          style={isVertical ? { bottom: `${p}%` } : { left: `${p}%` }}
        />
      ))}
    </>
  );
}

/**
 * A custom slider with support for single value, range (two thumbs),
 * vertical orientation, and multiple sizes.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" defaultValue={50} showValue />
 * <Slider defaultValue={[20, 80]} label="Price Range" showValue />
 * <Slider orientation="vertical" defaultValue={60} />
 * ```
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  props,
  ref,
) {
  const {
    min = 0,
    max = 100,
    step = 1,
    color = "blue",
    disabled,
    label,
    showValue,
    orientation = "horizontal",
    size = "md",
    className,
    ...rest
  } = props;

  const showSteps = props.showSteps ?? false;
  const isRange = isRangeProps(props);

  return isRange ? (
    <RangeSlider
      ref={ref}
      {...(rest as Omit<SliderRangeProps, keyof typeof props>)}
      value={(props as SliderRangeProps).value}
      defaultValue={(props as SliderRangeProps).defaultValue}
      onValueChange={(props as SliderRangeProps).onValueChange}
      min={min}
      max={max}
      step={step}
      color={color}
      disabled={disabled}
      label={label}
      showValue={showValue}
      showSteps={showSteps}
      orientation={orientation}
      size={size}
      className={className}
    />
  ) : (
    <SingleSlider
      ref={ref}
      {...(rest as Omit<SliderSingleProps, keyof typeof props>)}
      value={(props as SliderSingleProps).value}
      defaultValue={(props as SliderSingleProps).defaultValue}
      onValueChange={(props as SliderSingleProps).onValueChange}
      min={min}
      max={max}
      step={step}
      color={color}
      disabled={disabled}
      label={label}
      showValue={showValue}
      showSteps={showSteps}
      orientation={orientation}
      size={size}
      className={className}
    />
  );
});

Slider.displayName = "Slider";

/* ─── Single Slider ─── */

const SingleSlider = forwardRef<HTMLDivElement, SliderSingleProps>(
  function SingleSlider(
    {
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      color = "blue",
      disabled,
      label,
      showValue,
      showSteps = false,
      orientation = "horizontal",
      size = "md",
      className,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<number>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const trackRef = useRef<HTMLDivElement>(null);
    const isVertical = orientation === "vertical";
    const percentage = pct(value, min, max);
    const marks = useStepMarks(min, max, step, showSteps);

    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        const track = trackRef.current;
        if (!track) return value;
        const rect = track.getBoundingClientRect();
        let ratio: number;
        if (isVertical) {
          ratio = 1 - (clientY - rect.top) / rect.height;
        } else {
          ratio = (clientX - rect.left) / rect.width;
        }
        ratio = clamp(ratio, 0, 1);
        const raw = min + ratio * (max - min);
        return clamp(snap(raw, step, min), min, max);
      },
      [isVertical, min, max, step, value],
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        target.setPointerCapture(e.pointerId);

        const newVal = getValueFromPosition(e.clientX, e.clientY);
        setValue(newVal);

        const onMove = (ev: PointerEvent) => {
          const v = getValueFromPosition(ev.clientX, ev.clientY);
          setValue(v);
        };
        const onUp = () => {
          target.removeEventListener("pointermove", onMove);
          target.removeEventListener("pointerup", onUp);
        };
        target.addEventListener("pointermove", onMove);
        target.addEventListener("pointerup", onUp);
      },
      [disabled, getValueFromPosition, setValue],
    );

    const sizeClass =
      size === "sm"
        ? "mantle-sliderSm"
        : size === "lg"
          ? "mantle-sliderLg"
          : "mantle-sliderMd";

    return (
      <div
        ref={ref}
        data-color={color}
        className={[
          "mantle-slider",
          sizeClass,
          isVertical && "mantle-sliderVertical",
          disabled && "mantle-sliderDisabled",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {(label || showValue) && (
          <div className="mantle-slider-header">
            {label && <span>{label}</span>}
            {showValue && (
              <span data-testid="mantle-slider-value">{value}</span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className="mantle-slider-track"
          onPointerDown={handlePointerDown}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          aria-orientation={orientation}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            let newVal = value;
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              newVal = clamp(value + step, min, max);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              newVal = clamp(value - step, min, max);
            } else if (e.key === "Home") {
              e.preventDefault();
              newVal = min;
            } else if (e.key === "End") {
              e.preventDefault();
              newVal = max;
            }
            if (newVal !== value) setValue(newVal);
          }}
        >
          <StepMarks marks={marks} isVertical={isVertical} />
          <div
            className="mantle-slider-fill"
            style={
              isVertical
                ? { height: `${percentage}%` }
                : { width: `${percentage}%` }
            }
          />
          <div
            className="mantle-slider-thumb"
            style={
              isVertical
                ? { bottom: `${percentage}%` }
                : { left: `${percentage}%` }
            }
          />
        </div>
      </div>
    );
  },
);

/* ─── Range Slider ─── */

const RangeSlider = forwardRef<HTMLDivElement, SliderRangeProps>(
  function RangeSlider(
    {
      value: valueProp,
      defaultValue = [25, 75],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      color = "blue",
      disabled,
      label,
      showValue,
      showSteps = false,
      orientation = "horizontal",
      size = "md",
      className,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<[number, number]>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const trackRef = useRef<HTMLDivElement>(null);
    const activeThumb = useRef<0 | 1 | null>(null);
    const isVertical = orientation === "vertical";
    const marks = useStepMarks(min, max, step, showSteps);

    const pctLow = pct(value[0], min, max);
    const pctHigh = pct(value[1], min, max);

    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        const track = trackRef.current;
        if (!track) return 0;
        const rect = track.getBoundingClientRect();
        let ratio: number;
        if (isVertical) {
          ratio = 1 - (clientY - rect.top) / rect.height;
        } else {
          ratio = (clientX - rect.left) / rect.width;
        }
        ratio = clamp(ratio, 0, 1);
        const raw = min + ratio * (max - min);
        return clamp(snap(raw, step, min), min, max);
      },
      [isVertical, min, max, step],
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        target.setPointerCapture(e.pointerId);

        const newVal = getValueFromPosition(e.clientX, e.clientY);
        // Determine which thumb is closest
        const distLow = Math.abs(newVal - value[0]);
        const distHigh = Math.abs(newVal - value[1]);
        const thumb = distLow <= distHigh ? 0 : 1;
        activeThumb.current = thumb;

        const updated: [number, number] = [...value];
        updated[thumb] = newVal;
        // Keep order
        if (updated[0] > updated[1]) {
          activeThumb.current = thumb === 0 ? 1 : 0;
          updated.sort((a, b) => a - b);
        }
        setValue(updated as [number, number]);

        const onMove = (ev: PointerEvent) => {
          const v = getValueFromPosition(ev.clientX, ev.clientY);
          const next: [number, number] = [...value];
          const t = activeThumb.current ?? thumb;
          next[t] = v;
          if (next[0] > next[1]) {
            activeThumb.current = t === 0 ? 1 : 0;
            next.sort((a, b) => a - b);
          }
          setValue(next as [number, number]);
        };
        const onUp = () => {
          activeThumb.current = null;
          target.removeEventListener("pointermove", onMove);
          target.removeEventListener("pointerup", onUp);
        };
        target.addEventListener("pointermove", onMove);
        target.addEventListener("pointerup", onUp);
      },
      [disabled, getValueFromPosition, setValue, value],
    );

    const sizeClass =
      size === "sm"
        ? "mantle-sliderSm"
        : size === "lg"
          ? "mantle-sliderLg"
          : "mantle-sliderMd";

    const formatValue = `${value[0]} – ${value[1]}`;

    return (
      <div
        ref={ref}
        data-color={color}
        className={[
          "mantle-slider",
          sizeClass,
          isVertical && "mantle-sliderVertical",
          disabled && "mantle-sliderDisabled",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {(label || showValue) && (
          <div className="mantle-slider-header">
            {label && <span>{label}</span>}
            {showValue && (
              <span data-testid="mantle-slider-value">{formatValue}</span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className="mantle-slider-track"
          onPointerDown={handlePointerDown}
          role="slider"
          aria-valuenow={value[0]}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          aria-orientation={orientation}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
        >
          <StepMarks marks={marks} isVertical={isVertical} />
          <div
            className="mantle-slider-fill"
            style={
              isVertical
                ? { bottom: `${pctLow}%`, height: `${pctHigh - pctLow}%` }
                : { left: `${pctLow}%`, width: `${pctHigh - pctLow}%` }
            }
          />
          <div
            className="mantle-slider-thumb"
            style={
              isVertical
                ? { bottom: `${pctLow}%` }
                : { left: `${pctLow}%` }
            }
          />
          <div
            className="mantle-slider-thumb"
            style={
              isVertical
                ? { bottom: `${pctHigh}%` }
                : { left: `${pctHigh}%` }
            }
          />
        </div>
      </div>
    );
  },
);
