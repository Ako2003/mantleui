import { forwardRef, useCallback, useId } from "react";
import { useControllable } from "../../hooks";
import type { ColorFieldProps } from "./ColorField.types";
import "./ColorField.css";

const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * A hex color text input with a color preview swatch.
 *
 * @example
 * ```tsx
 * <ColorField
 *   value="#ff0000"
 *   onValueChange={(hex) => setColor(hex)}
 *   label="Color"
 * />
 * ```
 */
export const ColorField = forwardRef<HTMLInputElement, ColorFieldProps>(
  function ColorField(
    {
      value: valueProp,
      defaultValue = "#000000",
      onValueChange,
      label,
      error,
      disabled,
      className,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<string>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const id = useId();

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      [setValue],
    );

    const handleBlur = useCallback(() => {
      if (!HEX_REGEX.test(value)) {
        // Revert to a valid hex if invalid
        setValue(defaultValue);
      }
    }, [value, defaultValue, setValue]);

    return (
      <div
        className={["mantle-colorField", className].filter(Boolean).join(" ")}
      >
        {label && (
          <label htmlFor={id} className="mantle-colorFieldLabel">
            {label}
          </label>
        )}
        <div className="mantle-colorFieldInputWrapper">
          <div
            className="mantle-colorFieldSwatch"
            data-testid="color-field-swatch"
            style={{
              backgroundColor: HEX_REGEX.test(value) ? value : defaultValue,
            }}
          />
          <input
            ref={ref}
            id={id}
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={[
              "mantle-colorFieldInput",
              error && "mantle-colorFieldInputError",
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          />
        </div>
        {error && <span className="mantle-colorFieldError">{error}</span>}
      </div>
    );
  },
);
