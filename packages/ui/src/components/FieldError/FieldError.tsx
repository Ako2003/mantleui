import { forwardRef } from "react";
import type { FieldErrorProps } from "./FieldError.types";
import "./FieldError.css";

/**
 * Error display that only renders when `error` prop is truthy.
 *
 * @example
 * ```tsx
 * <FieldError error={errors.email} />
 * <FieldError error={undefined} /> // renders nothing
 * ```
 */
export const FieldError = forwardRef<HTMLSpanElement, FieldErrorProps>(
  function FieldError({ error, className, ...rest }, ref) {
    if (!error) {
      return null;
    }

    return (
      <span
        ref={ref}
        role="alert"
        className={["mantle-field-error", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {error}
      </span>
    );
  },
);

FieldError.displayName = "FieldError";
