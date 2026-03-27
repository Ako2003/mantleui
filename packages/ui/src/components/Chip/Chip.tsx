import { forwardRef } from "react";
import type { ChipProps } from "./Chip.types";
import "./Chip.css";

/**
 * A small interactive tag/chip that can be dismissed or selected.
 *
 * @example
 * ```tsx
 * <Chip variant="solid" color="green">Active</Chip>
 * <Chip onDismiss={() => remove()} selected>Tag</Chip>
 * ```
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    variant = "solid",
    color = "blue",
    size = "md",
    onDismiss,
    selected = false,
    onSelectedChange,
    disabled = false,
    startIcon,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && onSelectedChange && !disabled) {
      onSelectedChange(!selected);
    }
  };

  return (
    <span
      ref={ref}
      data-color={color}
      role={onSelectedChange ? "option" : undefined}
      aria-selected={onSelectedChange ? selected : undefined}
      aria-disabled={disabled || undefined}
      className={[
        "mantle-chip",
        `mantle-chip-${variant}`,
        `mantle-chip-${size}`,
        selected && "mantle-chip-selected",
        disabled && "mantle-chip-disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      tabIndex={onSelectedChange && !disabled ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (
          (e.key === "Enter" || e.key === " ") &&
          onSelectedChange &&
          !disabled
        ) {
          e.preventDefault();
          onSelectedChange(!selected);
        }
      }}
      {...rest}
    >
      {startIcon}
      {children}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          className="mantle-chip-dismiss"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 2l6 6M8 2l-6 6" />
          </svg>
        </button>
      )}
    </span>
  );
});

Chip.displayName = "Chip";
