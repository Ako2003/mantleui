import { forwardRef } from "react";
import type { LabelProps } from "./Label.types";
import "./Label.css";

/**
 * Form label element.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="name" required>Name</Label>
 * <Label htmlFor="notes" disabled>Notes</Label>
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, htmlFor, required, disabled, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={[
        "mantle-label",
        disabled && "mantle-label--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      {required && (
        <span className="mantle-label-required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});

Label.displayName = "Label";
