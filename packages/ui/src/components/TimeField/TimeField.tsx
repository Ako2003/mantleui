import { forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import type { TimeFieldProps } from "./TimeField.types";
import "./TimeField.css";

/**
 * A time input with hours and minutes.
 *
 * @example
 * ```tsx
 * <TimeField
 *   defaultValue="14:30"
 *   onValueChange={(time) => console.log(time)}
 * />
 * ```
 */
export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
  function TimeField(
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      label,
      error,
      color = "blue",
      disabled = false,
      className,
      step = 1,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<string>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );

    return (
      <div
        data-color={color}
        className={["mantle-timeField", className].filter(Boolean).join(" ")}
      >
        {label && <label className="mantle-timeFieldLabel">{label}</label>}
        <input
          ref={ref}
          type="time"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          step={step * 60}
          className={[
            "mantle-timeFieldInput",
            error && "mantle-timeFieldInputError",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {error && <span className="mantle-timeFieldError">{error}</span>}
      </div>
    );
  },
);
