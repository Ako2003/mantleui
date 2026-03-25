import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Calendar } from "../Calendar";
import type { DateRangePickerProps } from "./DateRangePicker.types";
import "./DateRangePicker.css";

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date): string {
  const month = MONTH_SHORT.at(date.getMonth()) as string;
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

type PickingPhase = "start" | "end";

/**
 * A date range input with a calendar popup.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   onRangeChange={({ start, end }) => console.log(start, end)}
 * />
 * ```
 */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      startDate,
      endDate,
      onRangeChange,
      placeholder = "Select range",
      label,
      error,
      color = "blue",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const [phase, setPhase] = useState<PickingPhase>("start");
    const [pendingStart, setPendingStart] = useState<Date | undefined>(
      startDate,
    );
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTriggerClick = useCallback(() => {
      if (!disabled) {
        setOpen((prev) => !prev);
        setPhase("start");
        setPendingStart(undefined);
      }
    }, [disabled]);

    const handleTriggerKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleTriggerClick();
        }
      },
      [handleTriggerClick],
    );

    const handleSelect = useCallback(
      (date: Date) => {
        if (phase === "start") {
          setPendingStart(date);
          setPhase("end");
        } else {
          const start = pendingStart as Date;
          const end = date;
          const range =
            start <= end ? { start, end } : { start: end, end: start };
          onRangeChange?.(range);
          setOpen(false);
          setPhase("start");
          setPendingStart(undefined);
        }
      },
      [phase, pendingStart, onRangeChange],
    );

    useEffect(() => {
      if (!open) return;

      function handleClickOutside(event: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);

    const hasRange = startDate !== undefined && endDate !== undefined;

    return (
      <div
        ref={(node) => {
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        data-color={color}
        className={["mantle-dateRangePicker", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {label && (
          <span
            className={[
              "mantle-dateRangePickerLabel",
              error && "mantle-dateRangePickerLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </span>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={[
            "mantle-dateRangePickerTrigger",
            error && "mantle-dateRangePickerTriggerError",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {hasRange ? (
            <>
              <span>{formatDate(startDate)}</span>
              <span className="mantle-dateRangePickerSeparator">&ndash;</span>
              <span>{formatDate(endDate)}</span>
            </>
          ) : (
            <span
              className={[
                "mantle-dateRangePickerPlaceholder",
                error && "mantle-dateRangePickerPlaceholderError",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {placeholder}
            </span>
          )}
        </button>
        {open && (
          <div className="mantle-dateRangePickerPopup" role="dialog">
            <Calendar onValueChange={handleSelect} color={color} />
          </div>
        )}
        {error && <span className="mantle-dateRangePickerError">{error}</span>}
      </div>
    );
  },
);
