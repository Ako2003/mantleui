import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useControllable } from "../../hooks";
import { resolveColor } from "../../utils";
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
    const { dataColor, colorStyle } = resolveColor(color);

    const [selectedDate, setSelectedDate] = useControllable<Date | undefined>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange as
        | ((value: Date | undefined) => void)
        | undefined,
    });

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

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

    const popupRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (!open || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }, [open]);

    useEffect(() => {
      if (!open) return;

      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          popupRef.current &&
          !popupRef.current.contains(target)
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
        data-color={dataColor}
        style={colorStyle}
        className={["mantle-datePicker", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {label && (
          <span
            className={[
              "mantle-datePickerLabel",
              error && "mantle-datePickerLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </span>
        )}
        <button
          ref={triggerRef}
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
          <span style={{ flex: 1, textAlign: "left" }}>
            {selectedDate ? (
              formatDate(selectedDate)
            ) : (
              <span
                className={[
                  "mantle-datePickerPlaceholder",
                  error && "mantle-datePickerPlaceholderError",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {placeholder}
              </span>
            )}
          </span>
          <CalendarIcon />
        </button>
        {open &&
          createPortal(
            <div
              ref={popupRef}
              className="mantle-datePickerPopup"
              role="dialog"
              data-color={dataColor}
              style={{
                ...colorStyle,
                position: "fixed",
                top: popupPos.top - window.scrollY,
                left: popupPos.left,
              }}
            >
              <Calendar
                value={selectedDate}
                onValueChange={handleSelect}
                color={color}
              />
            </div>,
            document.body,
          )}
        {error && <span className="mantle-datePickerError">{error}</span>}
      </div>
    );
  },
);

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mantle-datePickerIcon"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
