import { forwardRef } from "react";
import type { ErrorMessageProps } from "./ErrorMessage.types";
import "./ErrorMessage.css";

/**
 * Error text for form fields.
 *
 * @example
 * ```tsx
 * <ErrorMessage>This field is required.</ErrorMessage>
 * ```
 */
export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  function ErrorMessage({ className, children, ...rest }, ref) {
    return (
      <p
        ref={ref}
        role="alert"
        className={["mantle-error-message", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

ErrorMessage.displayName = "ErrorMessage";
