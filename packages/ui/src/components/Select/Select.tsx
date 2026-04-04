import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useControllable, useId, useComposedRefs } from "../../hooks";
import { composeEventHandlers, resolveColor } from "../../utils";
import type { SelectProps } from "./Select.types";
import "./Select.css";

const sizeMap: Record<string, string> = {
  sm: "mantle-selectSm",
  md: "mantle-selectMd",
  lg: "mantle-selectLg",
};

/**
 * A custom select dropdown with keyboard navigation.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 * ```
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    options,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    placeholder = "Select...",
    disabled = false,
    color = "blue",
    size = "md",
    label,
    description,
    error,
    startIcon,
    className,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: undefined,
    defaultValue: false,
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(ref);
  const generatedId = useId("select");
  const listboxId = `${generatedId}-listbox`;
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({
    position: "fixed",
    top: -9999,
    left: -9999,
    opacity: 0,
  });

  const selectedOption = options.find((o) => o.value === value);
  const selectedLabel = selectedOption?.label ?? selectedOption?.value;

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [setIsOpen]);

  const selectOption = useCallback(
    (optionValue: string) => {
      setValue(optionValue);
      close();
    },
    [setValue, close],
  );

  // Position dropdown below trigger
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPortalStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      minWidth: rect.width,
      opacity: 1,
    });
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const update = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setPortalStyle({
          position: "fixed",
          top: rect.bottom + 4,
          left: rect.left,
          minWidth: rect.width,
          opacity: 1,
        });
      }
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, setIsOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const handleTriggerKeyDown = composeEventHandlers(
    onKeyDown as React.KeyboardEventHandler<HTMLDivElement> | undefined,
    (e: React.KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    },
  );

  const handleOptionKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    const enabledOptions = options.filter((o) => !o.disabled);
    const currentIdx = enabledOptions.findIndex((o) => o.value === optionValue);

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        selectOption(optionValue);
        break;
      case "ArrowDown": {
        e.preventDefault();
        const nextIdx = currentIdx + 1;
        if (nextIdx < enabledOptions.length) {
          const nextValue = enabledOptions.at(nextIdx)?.value;
          if (nextValue) {
            const el = dropdownRef.current?.querySelector(
              `[data-value="${nextValue}"]`,
            ) as HTMLElement | null;
            el?.focus();
          }
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const currentEnabledIdx = enabledOptions.findIndex(
          (o) => o.value === optionValue,
        );
        if (currentEnabledIdx > 0) {
          const prevValue = enabledOptions.at(currentEnabledIdx - 1)?.value;
          if (prevValue) {
            const el = dropdownRef.current?.querySelector(
              `[data-value="${prevValue}"]`,
            ) as HTMLElement | null;
            el?.focus();
          }
        }
        break;
      }
      case "Escape":
        close();
        break;
    }
  };

  return (
    <div
      ref={composedRef}
      className={["mantle-selectWrapper", className].filter(Boolean).join(" ")}
      data-color={dataColor}
      style={colorStyle}
      {...rest}
    >
      {label && (
        <label
          className={["mantle-selectLabel", error && "mantle-selectLabelError"]
            .filter(Boolean)
            .join(" ")}
          id={`${generatedId}-label`}
        >
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={label ? `${generatedId}-label` : undefined}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={
          handleTriggerKeyDown as unknown as React.KeyboardEventHandler<HTMLButtonElement>
        }
        className={[
          "mantle-selectTrigger",
          sizeMap[size],
          error && "mantle-selectTriggerError",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {startIcon}
        {selectedLabel ? (
          <span>{selectedLabel}</span>
        ) : (
          <span
            className={[
              "mantle-selectPlaceholder",
              error && "mantle-selectPlaceholderError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {placeholder}
          </span>
        )}
        <svg
          className={[
            "mantle-selectChevron",
            isOpen && "mantle-selectChevronOpen",
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
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? `${generatedId}-label` : undefined}
            className="mantle-selectDropdown"
            style={portalStyle}
          >
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                data-value={option.value}
                aria-selected={option.value === value}
                aria-disabled={option.disabled || undefined}
                tabIndex={option.disabled ? -1 : 0}
                onClick={() => !option.disabled && selectOption(option.value)}
                onKeyDown={(e) =>
                  !option.disabled && handleOptionKeyDown(e, option.value)
                }
                className={[
                  "mantle-selectOption",
                  option.value === value && "mantle-selectOptionActive",
                  option.disabled && "mantle-selectOptionDisabled",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {option.label ?? option.value}
              </div>
            ))}
          </div>,
          document.body,
        )}

      {error && (
        <span className="mantle-selectError" role="alert">
          {error}
        </span>
      )}
      {!error && description && (
        <span className="mantle-selectDescription">{description}</span>
      )}
    </div>
  );
});
