import { createContext, forwardRef, useCallback, useContext } from "react";
import { useControllable } from "../../hooks";
import type {
  RadioGroupContextValue,
  RadioGroupItemProps,
  RadioGroupProps,
} from "./RadioGroup.types";
import "./RadioGroup.css";

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined,
);

/**
 * Radio button group with managed state.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Size" defaultValue="md">
 *   <RadioGroup.Item value="sm" label="Small" />
 *   <RadioGroup.Item value="md" label="Medium" />
 *   <RadioGroup.Item value="lg" label="Large" />
 * </RadioGroup>
 * ```
 */
const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      label,
      orientation = "vertical",
      color = "blue",
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<string>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const select = useCallback(
      (itemValue: string) => {
        setValue(itemValue);
      },
      [setValue],
    );

    return (
      <RadioGroupContext.Provider value={{ value, select, color, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-label={label}
          data-color={color}
          className={[
            "mantle-radiogroup",
            `mantle-radiogroup-${orientation}`,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {label && <div className="mantle-radiogroup-legend">{label}</div>}
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroupRoot.displayName = "RadioGroup";

const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  function RadioGroupItem(
    { value, label, disabled: disabledProp, className, ...rest },
    ref,
  ) {
    const ctx = useContext(RadioGroupContext);
    if (!ctx) {
      throw new Error("RadioGroup.Item must be used within a RadioGroup");
    }

    const isDisabled = disabledProp || ctx.disabled;
    const isChecked = ctx.value === value;

    const handleChange = () => {
      if (!isDisabled) {
        ctx.select(value);
      }
    };

    return (
      <label
        ref={ref}
        className={[
          "mantle-radiogroup-item",
          isDisabled && "mantle-radiogroup-item-disabled",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <input
          type="radio"
          className="mantle-radiogroup-input"
          checked={isChecked}
          disabled={isDisabled}
          aria-checked={isChecked}
          onChange={handleChange}
        />
        <span
          className={[
            "mantle-radiogroup-indicator",
            isChecked && "mantle-radiogroup-indicator-checked",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="mantle-radiogroup-indicator-dot" />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  },
);

RadioGroupItem.displayName = "RadioGroup.Item";

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});

export { RadioGroupContext };
