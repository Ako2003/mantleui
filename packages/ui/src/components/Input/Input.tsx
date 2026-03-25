import { forwardRef } from "react";
import { useId } from "../../hooks";
import type { InputProps } from "./Input.types";
import "./Input.css";

const sizeMap: Record<string, string> = {
  sm: "mantle-inputSm",
  md: "mantle-inputMd",
  lg: "mantle-inputLg",
};

/**
 * A text input with optional label, helper text, error state, and icons.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Password" error="Required" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = "md",
    color = "blue",
    label,
    helperText,
    error,
    startIcon,
    endIcon,
    className,
    id: idProp,
    ...rest
  },
  ref,
) {
  const generatedId = useId("input");
  const id = idProp ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className="mantle-inputWrapper" data-color={color}>
      {label && (
        <label
          htmlFor={id}
          className={["mantle-inputLabel", error && "mantle-inputLabelError"]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>
      )}
      <div
        className={[
          "mantle-inputContainer",
          error && "mantle-inputContainerError",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {startIcon && (
          <span className="mantle-inputIcon mantle-inputIconStart">
            {startIcon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={["mantle-input", sizeMap[size]].join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...rest}
        />
        {endIcon && (
          <span className="mantle-inputIcon mantle-inputIconEnd">
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} className="mantle-inputError" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} className="mantle-inputHelper">
          {helperText}
        </span>
      )}
    </div>
  );
});
