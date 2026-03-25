import { forwardRef } from "react";
import { useControllable } from "../../hooks";
import type { SliderProps } from "./Slider.types";
import "./Slider.css";

/**
 * Range slider input.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" defaultValue={50} />
 * <Slider value={volume} onValueChange={setVolume} min={0} max={100} />
 * ```
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
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

  return (
    <div
      ref={ref}
      data-color={color}
      className={["mantle-slider", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {(label || showValue) && (
        <div className="mantle-slider-header">
          {label && <span>{label}</span>}
          {showValue && <span data-testid="mantle-slider-value">{value}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        className="mantle-slider-input"
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
    </div>
  );
});

Slider.displayName = "Slider";
