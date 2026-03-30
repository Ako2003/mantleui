import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useControllable, useId } from "../../hooks";
import { resolveColor } from "../../utils";
import type { MultiSelectProps } from "./MultiSelect.types";
import "./MultiSelect.css";

/**
 * A multi-select dropdown with chip display for selected items.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Countries"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 * ```
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      options,
      value: valueProp,
      defaultValue = [],
      onValueChange,
      placeholder = "Select...",
      label,
      description,
      error,
      disabled = false,
      color = "blue",
      startIcon,
      maxItems,
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const [selected, setSelected] = useControllable<string[]>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId("multiselect");

    const toggleOption = useCallback(
      (optionValue: string) => {
        setSelected((prev: string[]) => {
          if (prev.includes(optionValue)) {
            return prev.filter((v) => v !== optionValue);
          }
          if (maxItems && prev.length >= maxItems) return prev;
          return [...prev, optionValue];
        });
      },
      [setSelected, maxItems],
    );

    const removeOption = useCallback(
      (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelected((prev: string[]) => prev.filter((v) => v !== optionValue));
      },
      [setSelected],
    );

    const clearAll = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelected([]);
      },
      [setSelected],
    );

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);

    const getLabel = (value: string) => {
      const opt = options.find((o) => o.value === value);
      return opt?.label ?? opt?.value ?? value;
    };

    return (
      <div
        ref={(node) => {
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        data-color={dataColor}
        style={colorStyle}
        className={["mantle-multiselect", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {label && (
          <label
            className={[
              "mantle-multiselectLabel",
              error && "mantle-multiselectLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
            id={`${generatedId}-label`}
          >
            {label}
          </label>
        )}

        {/* Trigger */}
        <div
          className={[
            "mantle-multiselectTrigger",
            error && "mantle-multiselectTriggerError",
            disabled && "mantle-multiselectTriggerDisabled",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${generatedId}-listbox` : undefined}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${generatedId}-label` : undefined}
          tabIndex={disabled ? -1 : 0}
        >
          {startIcon && <span>{startIcon}</span>}

          {selected.length === 0 && (
            <span className="mantle-multiselectPlaceholder">{placeholder}</span>
          )}

          {selected.map((val) => (
            <span key={val} className="mantle-multiselectChip">
              {getLabel(val)}
              <button
                type="button"
                className="mantle-multiselectChipRemove"
                onClick={(e) => removeOption(val, e)}
                aria-label={`Remove ${getLabel(val)}`}
                tabIndex={-1}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}

          <span className="mantle-multiselectActions">
            {selected.length > 0 && (
              <button
                type="button"
                className="mantle-multiselectClear"
                onClick={clearAll}
                aria-label="Clear all"
                tabIndex={-1}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg
              className={[
                "mantle-multiselectChevron",
                isOpen && "mantle-multiselectChevronOpen",
              ]
                .filter(Boolean)
                .join(" ")}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="mantle-multiselectDropdown"
            id={`${generatedId}-listbox`}
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby={label ? `${generatedId}-label` : undefined}
          >
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              const isDisabledOption =
                option.disabled ||
                (!isSelected &&
                  maxItems !== undefined &&
                  selected.length >= maxItems);

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabledOption || undefined}
                  tabIndex={isDisabledOption ? -1 : 0}
                  onClick={() =>
                    !isDisabledOption && toggleOption(option.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      (e.key === "Enter" || e.key === " ") &&
                      !isDisabledOption
                    ) {
                      e.preventDefault();
                      toggleOption(option.value);
                    }
                  }}
                  className={[
                    "mantle-multiselectOption",
                    isSelected && "mantle-multiselectOptionSelected",
                    isDisabledOption && "mantle-multiselectOptionDisabled",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span>{option.label ?? option.value}</span>
                  {isSelected && (
                    <svg
                      className="mantle-multiselectOptionCheck"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <span className="mantle-multiselectError" role="alert">
            {error}
          </span>
        )}
        {!error && description && (
          <span className="mantle-multiselectDescription">{description}</span>
        )}
      </div>
    );
  },
);
