import { forwardRef, useEffect, useRef } from "react";
import { useComposedRefs, useId } from "../../hooks";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
import type { CheckboxProps } from "./Checkbox.types";
import "./Checkbox.css";

/**
 * A checkbox with optional label, indeterminate state, and accent color.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox checked indeterminate label="Select all" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      indeterminate = false,
      color = "blue",
      label,
      className,
      id: idProp,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const [checked, setChecked] = useControllable({
      value: checkedProp,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

    const internalRef = useRef<HTMLInputElement>(null);
    const composedRef = useComposedRefs(ref, internalRef);
    const generatedId = useId("checkbox");
    const id = idProp ?? generatedId;

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (!e.defaultPrevented) {
        setChecked(e.target.checked);
      }
    };

    return (
      <label
        className={["mantle-checkboxWrapper", className]
          .filter(Boolean)
          .join(" ")}
        data-color={dataColor}
        style={colorStyle}
      >
        <input
          ref={composedRef}
          id={id}
          type="checkbox"
          className="mantle-checkboxInput"
          checked={checked}
          disabled={disabled}
          data-indeterminate={indeterminate || undefined}
          onChange={handleChange}
          {...rest}
        />
        <span className="mantle-checkboxControl" aria-hidden="true">
          {checked && !indeterminate && <CheckIcon />}
          {indeterminate && <MinusIcon />}
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  },
);

function CheckIcon() {
  return (
    <svg
      className="mantle-checkboxIcon"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6l2.5 2.5 4.5-5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="mantle-checkboxIcon"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M2.5 6h7" />
    </svg>
  );
}
