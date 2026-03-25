import { forwardRef } from "react";
import type { InputGroupAddonProps, InputGroupProps } from "./InputGroup.types";
import "./InputGroup.css";

/* --- Root --- */

const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroupRoot({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={["mantle-inputGroup", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* --- Addon --- */

const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  function InputGroupAddon({ className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={["mantle-inputGroupAddon", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

/**
 * Groups an input with prefix/suffix addons.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroup.Addon>$</InputGroup.Addon>
 *   <Input placeholder="0.00" />
 *   <InputGroup.Addon>.00</InputGroup.Addon>
 * </InputGroup>
 * ```
 */
export const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
});
