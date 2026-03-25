import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useControllable } from "../../hooks";
import { Calendar } from "../Calendar";
import type { DatePickerProps } from "./DatePicker.types";
import "./DatePicker.css";

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

/**
 * A date input with a calendar popup.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   defaultValue={new Date()}
 *   onValueChange={(date) => console.log(date)}
 * />
 * ```
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      placeholder = "Select date",
      label,
      error,
      color = "blue",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) {
    const [selectedDate, setSelectedDate] = useControllable<Date | undefined>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange as
        | ((value: Date | undefined) => void)
        | undefined,
    });

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTriggerClick = useCallback(() => {
      if (!disabled) {
        setOpen((prev) => !prev);
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
        setSelectedDate(date);
        setOpen(false);
      },
      [setSelectedDate],
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
        className={["mantle-datePicker", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {label && <span className="mantle-datePickerLabel">{label}</span>}
        <button
          type="button"
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={[
            "mantle-datePickerTrigger",
            error && "mantle-datePickerTriggerError",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {selectedDate ? (
            formatDate(selectedDate)
          ) : (
            <span className="mantle-datePickerPlaceholder">{placeholder}</span>
          )}
        </button>
        {open && (
          <div className="mantle-datePickerPopup" role="dialog">
            <Calendar
              value={selectedDate}
              onValueChange={handleSelect}
              color={color}
            />
          </div>
        )}
        {error && <span className="mantle-datePickerError">{error}</span>}
      </div>
    );
  },
);
