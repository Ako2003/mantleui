import { forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
import type { SearchFieldProps } from "./SearchField.types";
import "./SearchField.css";

const sizeMap: Record<string, string> = {
  sm: "mantle-searchFieldSm",
  md: "mantle-searchFieldMd",
  lg: "mantle-searchFieldLg",
};

/**
 * A search input with a magnifying glass icon and clear button.
 *
 * @example
 * ```tsx
 * <SearchField placeholder="Search users..." onValueChange={setQuery} />
 * <SearchField value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
 * ```
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      onClear,
      placeholder = "Search...",
      color = "blue",
      size = "md",
      disabled,
      className,
      startIcon,
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const [value, setValue] = useControllable({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
      [setValue],
    );

    const handleClear = useCallback(() => {
      setValue("");
      onClear?.();
    }, [setValue, onClear]);

    return (
      <div
        className={["mantle-searchFieldContainer", sizeMap[size], className]
          .filter(Boolean)
          .join(" ")}
        data-color={dataColor}
        style={colorStyle}
      >
        <span className="mantle-searchFieldIcon" aria-hidden="true">
          {startIcon ?? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </span>
        <input
          ref={ref}
          type="text"
          role="searchbox"
          className="mantle-searchFieldInput"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        {value && !disabled && (
          <button
            type="button"
            className="mantle-searchFieldClear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
