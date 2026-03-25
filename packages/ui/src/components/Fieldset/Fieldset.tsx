import { forwardRef } from "react";
import type { FieldsetProps } from "./Fieldset.types";
import "./Fieldset.css";

/**
 * Styled fieldset with optional legend.
 *
 * @example
 * ```tsx
 * <Fieldset legend="Personal Info">
 *   <Input name="first" />
 *   <Input name="last" />
 * </Fieldset>
 * ```
 */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset({ className, children, legend, disabled, ...rest }, ref) {
    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        className={["mantle-fieldset", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {legend && <legend className="mantle-fieldset-legend">{legend}</legend>}
        {children}
      </fieldset>
    );
  },
);

Fieldset.displayName = "Fieldset";
