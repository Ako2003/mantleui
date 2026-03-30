import { forwardRef, useCallback, useState } from "react";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
import type { ListBoxProps } from "./ListBox.types";
import "./ListBox.css";

function normalizeValue(
  val: string | string[] | undefined,
  fallback: string | string[],
): string[] {
  const v = val ?? fallback;
  return Array.isArray(v) ? v : [v];
}

/**
 * A selectable list of options supporting single and multiple selection.
 *
 * @example
 * ```tsx
 * <ListBox
 *   items={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *   ]}
 *   onValueChange={console.log}
 * />
 * ```
 */
export const ListBox = forwardRef<HTMLDivElement, ListBoxProps>(
  function ListBox(
    {
      items,
      value: valueProp,
      defaultValue = [],
      onValueChange,
      multiple = false,
      color = "blue",
      renderItem,
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const normalizedControlled =
      valueProp !== undefined ? normalizeValue(valueProp, []) : undefined;
    const normalizedDefault = normalizeValue(defaultValue, []);

    const [selected, setSelected] = useControllable<string[]>({
      value: normalizedControlled,
      defaultValue: normalizedDefault,
      onChange: onValueChange as ((value: string[]) => void) | undefined,
    });

    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleSelect = useCallback(
      (itemValue: string) => {
        if (multiple) {
          const next = selected.includes(itemValue)
            ? selected.filter((v) => v !== itemValue)
            : [...selected, itemValue];
          setSelected(next);
        } else {
          setSelected([itemValue]);
        }
      },
      [multiple, selected, setSelected],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next < items.length ? next : prev;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (focusedIndex >= 0) {
            const item = items.at(focusedIndex);
            if (item && !item.disabled) {
              handleSelect(item.value);
            }
          }
          break;
        }
      }
    };

    return (
      <div
        ref={ref}
        role="listbox"
        aria-multiselectable={multiple || undefined}
        data-color={dataColor}
        style={colorStyle}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={["mantle-listbox", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {items.map((item, index) => {
          const isSelected = selected.includes(item.value);
          const isFocused = index === focusedIndex;

          return (
            <div
              key={item.value}
              role="option"
              tabIndex={item.disabled ? -1 : 0}
              aria-selected={isSelected}
              aria-disabled={item.disabled || undefined}
              onClick={() => {
                if (!item.disabled) {
                  handleSelect(item.value);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                  e.preventDefault();
                  handleSelect(item.value);
                }
              }}
              className={[
                "mantle-listbox-option",
                isSelected && "mantle-listbox-option-selected",
                isFocused && "mantle-listbox-option-focused",
                item.disabled && "mantle-listbox-option-disabled",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {renderItem ? renderItem(item, isSelected) : (item.label ?? item.value)}
            </div>
          );
        })}
      </div>
    );
  },
);
