import { forwardRef } from "react";
import type { DescriptionProps } from "./Description.types";
import "./Description.css";

/**
 * Helper description text for form fields.
 *
 * @example
 * ```tsx
 * <Description>Enter your preferred display name.</Description>
 * ```
 */
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  function Description({ className, children, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={["mantle-description", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

Description.displayName = "Description";
