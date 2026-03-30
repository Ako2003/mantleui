import { forwardRef, useCallback, type KeyboardEvent } from "react";
import { useControllable, useId } from "../../hooks";
import { resolveColor } from "../../utils";
import type { NumberFieldProps } from "./NumberField.types";
import "./NumberField.css";

const sizeMap: Record<string, string> = {
  sm: "mantle-numberFieldSm",
  md: "mantle-numberFieldMd",
  lg: "mantle-numberFieldLg",
};

/**
 * A number input with increment and decrement buttons.
 *
 * @example
 * ```tsx
 * <NumberField label="Quantity" min={0} max={10} defaultValue={1} />
 * <NumberField value={count} onValueChange={setCount} step={5} />
 * ```
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  function NumberField(
    {
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      min,
      max,
      step = 1,
      label,
      error,
      color = "blue",
      size = "md",
      disabled,
      className,
      prefix,
      suffix,
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const [value, setValue] = useControllable({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const generatedId = useId("numberfield");
    const errorId = `${generatedId}-error`;

    const clamp = useCallback(
      (v: number) => {
        let clamped = v;
        if (min !== undefined && clamped < min) clamped = min;
        if (max !== undefined && clamped > max) clamped = max;
        return clamped;
      },
      [min, max],
    );

    const increment = useCallback(() => {
      setValue((prev) => clamp(prev + step));
    }, [setValue, clamp, step]);

    const decrement = useCallback(() => {
      setValue((prev) => clamp(prev - step));
    }, [setValue, clamp, step]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          increment();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          decrement();
        }
      },
      [increment, decrement],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) {
          setValue(clamp(parsed));
        }
      },
      [setValue, clamp],
    );

    const isAtMin = min !== undefined && value <= min;
    const isAtMax = max !== undefined && value >= max;

    return (
      <div className="mantle-numberFieldWrapper" data-color={dataColor} style={colorStyle}>
        {label && (
          <label
            htmlFor={generatedId}
            className={[
              "mantle-numberFieldLabel",
              error && "mantle-numberFieldLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        )}
        <div
          className={[
            "mantle-numberFieldContainer",
            sizeMap[size],
            error && "mantle-numberFieldContainerError",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            className="mantle-numberFieldButton"
            onClick={decrement}
            disabled={disabled || isAtMin}
            aria-label="Decrement"
            tabIndex={-1}
          >
            -
          </button>
          <div className="mantle-numberFieldInputArea">
            {prefix && (
              <span className="mantle-numberFieldAffix">{prefix}</span>
            )}
            <input
              ref={ref}
              id={generatedId}
              type="text"
              inputMode="numeric"
              className={[
                "mantle-numberFieldInput",
                error && "mantle-numberFieldInputError",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ width: `${Math.max(String(value).length, 1) + 1}ch` }}
              role="spinbutton"
              aria-valuenow={value}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
            />
            {suffix && (
              <span className="mantle-numberFieldAffix">{suffix}</span>
            )}
          </div>
          <button
            type="button"
            className="mantle-numberFieldButton"
            onClick={increment}
            disabled={disabled || isAtMax}
            aria-label="Increment"
            tabIndex={-1}
          >
            +
          </button>
        </div>
        {error && (
          <span id={errorId} className="mantle-numberFieldError" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
