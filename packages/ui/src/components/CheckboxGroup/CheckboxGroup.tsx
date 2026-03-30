import { createContext, forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
import type {
  CheckboxGroupContextValue,
  CheckboxGroupProps,
} from "./CheckboxGroup.types";
import "./CheckboxGroup.css";

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

/**
 * Groups multiple checkboxes with a shared label and manages their state.
 *
 * @example
 * ```tsx
 * <CheckboxGroup label="Fruits" defaultValue={["apple"]}>
 *   <Checkbox value="apple" label="Apple" />
 *   <Checkbox value="banana" label="Banana" />
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxGroupProps
>(function CheckboxGroup(
  {
    label,
    value: valueProp,
    defaultValue = [],
    onValueChange,
    orientation = "vertical",
    color = "blue",
    className,
    children,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  const [value, setValue] = useControllable<string[]>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const toggle = useCallback(
    (itemValue: string) => {
      setValue((prev) =>
        prev.includes(itemValue)
          ? prev.filter((v) => v !== itemValue)
          : [...prev, itemValue],
      );
    },
    [setValue],
  );

  return (
    <CheckboxGroupContext.Provider value={{ value, toggle, color }}>
      <fieldset
        ref={ref}
        data-color={dataColor}
        style={colorStyle}
        className={[
          "mantle-checkboxgroup",
          `mantle-checkboxgroup-${orientation}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <legend className="mantle-checkboxgroup-legend">{label}</legend>
        {children}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
});

CheckboxGroup.displayName = "CheckboxGroup";
