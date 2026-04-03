import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useControllable, useId, useComposedRefs } from "../../hooks";
import { resolveColor } from "../../utils";
import type { AutocompleteProps } from "./Autocomplete.types";
import "./Autocomplete.css";

/**
 * A searchable input with dropdown suggestions.
 *
 * @example
 * ```tsx
 * <Autocomplete
 *   label="Fruit"
 *   placeholder="Search fruits..."
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *   ]}
 * />
 * ```
 */
export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  function Autocomplete(
    {
      options,
      value: valueProp,
      defaultValue = "",
      onValueChange,
      placeholder = "Search...",
      disabled = false,
      color = "blue",
      label,
      description,
      error,
      emptyMessage = "No results found",
      className,
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

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState(() => {
      const opt = options.find((o) => o.value === (valueProp ?? defaultValue));
      return opt?.label ?? opt?.value ?? "";
    });
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const justSelectedRef = useRef(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref);
    const generatedId = useId("autocomplete");
    const listboxId = `${generatedId}-listbox`;
    const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});

    const filteredOptions = useMemo(() => {
      if (!query) return options;
      const lowerQuery = query.toLowerCase();
      return options.filter((o) => {
        const text = o.label ?? o.value;
        return text.toLowerCase().includes(lowerQuery);
      });
    }, [options, query]);

    const selectOption = useCallback(
      (optionValue: string) => {
        setValue(optionValue);
        const opt = options.find((o) => o.value === optionValue);
        setQuery(opt?.label ?? opt?.value ?? optionValue);
        setIsOpen(false);
        setHighlightedIndex(-1);
        justSelectedRef.current = true;
        inputRef.current?.focus();
      },
      [setValue, options],
    );

    // Derive display text from controlled value
    const controlledLabel =
      valueProp !== undefined
        ? (options.find((o) => o.value === valueProp)?.label ?? valueProp)
        : undefined;

    // Position dropdown below input
    useLayoutEffect(() => {
      if (!isOpen || !inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      setPortalStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        minWidth: rect.width,
      });
    }, [isOpen]);

    // Update position on scroll/resize
    useEffect(() => {
      if (!isOpen || !inputRef.current) return;
      const update = () => {
        const rect = inputRef.current?.getBoundingClientRect();
        if (rect) {
          setPortalStyle({
            position: "fixed",
            top: rect.bottom + 4,
            left: rect.left,
            minWidth: rect.width,
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

    // Close on scroll
    useEffect(() => {
      if (!isOpen) return;
      const handler = () => {
        setIsOpen(false);
        setHighlightedIndex(-1);
      };
      window.addEventListener("scroll", handler, true);
      return () => window.removeEventListener("scroll", handler, true);
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          inputRef.current?.contains(target) ||
          dropdownRef.current?.contains(target)
        ) {
          return;
        }
        setIsOpen(false);
        setHighlightedIndex(-1);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      setIsOpen(true);
      setHighlightedIndex(-1);
    };

    const handleFocus = () => {
      if (!disabled) {
        if (justSelectedRef.current) {
          justSelectedRef.current = false;
          return;
        }
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            return;
          }
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next < filteredOptions.length ? next : prev;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const opt = filteredOptions.at(highlightedIndex);
            if (opt) {
              selectOption(opt.value);
            }
          }
          break;
        }
        case "Escape": {
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        }
      }
    };

    return (
      <div
        ref={composedRef}
        className={["mantle-autocomplete", className].filter(Boolean).join(" ")}
        data-color={dataColor}
        style={colorStyle}
        {...rest}
      >
        {label && (
          <label
            className={[
              "mantle-autocompleteLabel",
              error && "mantle-autocompleteLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
            id={`${generatedId}-label`}
          >
            {label}
          </label>
        )}
        <div className="mantle-autocompleteInputWrapper">
          <input
            ref={inputRef}
            role="combobox"
            type="text"
            value={
              !isOpen && controlledLabel !== undefined ? controlledLabel : query
            }
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-labelledby={label ? `${generatedId}-label` : undefined}
            aria-activedescendant={
              isOpen && highlightedIndex >= 0
                ? `${generatedId}-option-${highlightedIndex}`
                : undefined
            }
            className={[
              "mantle-autocompleteInput",
              error && "mantle-autocompleteInputError",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <svg
            className={[
              "mantle-autocompleteChevron",
              isOpen && "mantle-autocompleteChevronOpen",
            ]
              .filter(Boolean)
              .join(" ")}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              id={listboxId}
              role="listbox"
              aria-labelledby={label ? `${generatedId}-label` : undefined}
              className="mantle-autocompleteDropdown"
              style={portalStyle}
            >
              {filteredOptions.length === 0 ? (
                <div className="mantle-autocompleteEmpty">{emptyMessage}</div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${generatedId}-option-${index}`}
                    role="option"
                    aria-selected={option.value === value}
                    tabIndex={-1}
                    onClick={() => selectOption(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") selectOption(option.value);
                    }}
                    className={[
                      "mantle-autocompleteOption",
                      option.value === value &&
                        "mantle-autocompleteOptionActive",
                      index === highlightedIndex &&
                        "mantle-autocompleteOptionHighlighted",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {option.label ?? option.value}
                  </div>
                ))
              )}
            </div>,
            document.body,
          )}

        {description && !error && (
          <p className="mantle-autocompleteDescription">{description}</p>
        )}
        {error && (
          <span className="mantle-autocompleteError" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
