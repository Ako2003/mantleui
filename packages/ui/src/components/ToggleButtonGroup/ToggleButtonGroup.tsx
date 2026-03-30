import { createContext, forwardRef, useContext } from "react";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
import type {
  ToggleButtonGroupContextValue,
  ToggleButtonGroupItemProps,
  ToggleButtonGroupProps,
} from "./ToggleButtonGroup.types";
import "./ToggleButtonGroup.css";

const ToggleButtonGroupContext = createContext<
  ToggleButtonGroupContextValue | undefined
>(undefined);

function useToggleButtonGroup(): ToggleButtonGroupContextValue {
  const ctx = useContext(ToggleButtonGroupContext);
  if (!ctx) {
    throw new Error(
      "ToggleButtonGroup.Item must be used within a ToggleButtonGroup",
    );
  }
  return ctx;
}

/**
 * A group of toggle buttons where one or multiple can be selected.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup value="a" onValueChange={setValue}>
 *   <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
 *   <ToggleButtonGroup.Item value="b">B</ToggleButtonGroup.Item>
 * </ToggleButtonGroup>
 * ```
 */
const ToggleButtonGroupRoot = forwardRef<
  HTMLDivElement,
  ToggleButtonGroupProps
>(function ToggleButtonGroup(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    multiple = false,
    orientation = "horizontal",
    color = "blue",
    size = "md",
    children,
    className,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  const normalizeValue = (v: string | string[] | undefined): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [selected, setSelected] = useControllable<string[]>({
    value: valueProp !== undefined ? normalizeValue(valueProp) : undefined,
    defaultValue: normalizeValue(defaultValue),
    onChange: (next) => {
      if (onValueChange) {
        onValueChange(multiple ? next : ((next.at(0) as string) ?? ""));
      }
    },
  });

  const toggle = (itemValue: string) => {
    setSelected((prev) => {
      if (multiple) {
        return prev.includes(itemValue)
          ? prev.filter((v) => v !== itemValue)
          : [...prev, itemValue];
      }
      return prev.includes(itemValue) ? [] : [itemValue];
    });
  };

  const orientationClass =
    orientation === "vertical"
      ? "mantle-togglebuttongroupVertical"
      : "mantle-togglebuttongroupHorizontal";

  return (
    <ToggleButtonGroupContext.Provider
      value={{ value: selected, toggle, color, size }}
    >
      <div
        ref={ref}
        role="group"
        aria-label={rest["aria-label"]}
        data-color={dataColor}
        style={colorStyle}
        data-orientation={orientation}
        className={["mantle-togglebuttongroup", orientationClass, className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    </ToggleButtonGroupContext.Provider>
  );
});

const ToggleButtonGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleButtonGroupItemProps
>(function ToggleButtonGroupItem(
  { value, disabled = false, children, className, ...rest },
  ref,
) {
  const { value: selected, toggle, size } = useToggleButtonGroup();
  const isPressed = selected.includes(value);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      disabled={disabled}
      className={[
        "mantle-togglebuttongroupItem",
        `mantle-togglebuttongroupItem-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => toggle(value)}
      {...rest}
    >
      {children}
    </button>
  );
});

export const ToggleButtonGroup = Object.assign(ToggleButtonGroupRoot, {
  Item: ToggleButtonGroupItem,
});
