import { forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import type {
  ColorSwatchPickerProps,
  ColorSwatchPickerSize,
} from "./ColorSwatchPicker.types";
import "./ColorSwatchPicker.css";

const SIZE_CLASS: Record<ColorSwatchPickerSize, string> = {
  sm: "mantle-colorSwatchPickerItemSm",
  md: "mantle-colorSwatchPickerItemMd",
  lg: "mantle-colorSwatchPickerItemLg",
};

/**
 * A grid of color swatches for picking a color.
 *
 * @example
 * ```tsx
 * <ColorSwatchPicker
 *   colors={["#ff0000", "#00ff00", "#0000ff"]}
 *   onValueChange={(color) => setColor(color)}
 * />
 * ```
 */
export const ColorSwatchPicker = forwardRef<
  HTMLDivElement,
  ColorSwatchPickerProps
>(function ColorSwatchPicker(
  {
    colors,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    swatchSize = "md",
    className,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useControllable<string>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const handleSelect = useCallback(
    (color: string) => {
      setValue(color);
    },
    [setValue],
  );

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={["mantle-colorSwatchPicker", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {colors.map((color) => {
        const isSelected = value === color;

        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={color}
            onClick={() => handleSelect(color)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSelect(color);
              }
            }}
            className={[
              "mantle-colorSwatchPickerItem",
              SIZE_CLASS[swatchSize],
              isSelected && "mantle-colorSwatchPickerItemSelected",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className="mantle-colorSwatchPickerItemInner"
              style={{ backgroundColor: color }}
            />
          </button>
        );
      })}
    </div>
  );
});
