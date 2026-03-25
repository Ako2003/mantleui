import { forwardRef, useCallback, useMemo, useState } from "react";
import { useControllable } from "../../hooks";
import type { CalendarProps } from "./Calendar.types";
import "./Calendar.css";

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * A date picker calendar grid.
 *
 * @example
 * ```tsx
 * <Calendar
 *   defaultValue={new Date()}
 *   onValueChange={(date) => console.log(date)}
 * />
 * ```
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      month: monthProp,
      year: yearProp,
      color = "blue",
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

    const today = useMemo(() => new Date(), []);

    const [internalMonth, setInternalMonth] = useState(() =>
      (valueProp ?? defaultValue ?? today).getMonth(),
    );
    const [internalYear, setInternalYear] = useState(() =>
      (valueProp ?? defaultValue ?? today).getFullYear(),
    );

    const displayMonth = monthProp ?? internalMonth;
    const displayYear = yearProp ?? internalYear;

    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth);

    const goToPrevMonth = useCallback(() => {
      if (monthProp !== undefined) return;
      setInternalMonth((prev) => {
        if (prev === 0) {
          setInternalYear((y) => y - 1);
          return 11;
        }
        return prev - 1;
      });
    }, [monthProp]);

    const goToNextMonth = useCallback(() => {
      if (monthProp !== undefined) return;
      setInternalMonth((prev) => {
        if (prev === 11) {
          setInternalYear((y) => y + 1);
          return 0;
        }
        return prev + 1;
      });
    }, [monthProp]);

    const handleDayClick = useCallback(
      (day: number) => {
        const date = new Date(displayYear, displayMonth, day);
        setSelectedDate(date);
      },
      [displayYear, displayMonth, setSelectedDate],
    );

    const monthName = MONTH_NAMES.at(displayMonth) ?? "";

    return (
      <div
        ref={ref}
        data-color={color}
        className={["mantle-calendar", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <div className="mantle-calendarHeader">
          <button
            type="button"
            aria-label="Previous month"
            className="mantle-calendarNav"
            onClick={goToPrevMonth}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="mantle-calendarTitle">
            {monthName} {displayYear}
          </span>
          <button
            type="button"
            aria-label="Next month"
            className="mantle-calendarNav"
            onClick={goToNextMonth}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mantle-calendarGrid">
          {DAY_HEADERS.map((day) => (
            <div key={day} className="mantle-calendarDayHeader">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="mantle-calendarDayEmpty" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(displayYear, displayMonth, day);
            const isSelected = selectedDate
              ? isSameDay(date, selectedDate)
              : false;
            const isToday = isSameDay(date, today);

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                aria-pressed={isSelected || undefined}
                aria-label={`${monthName} ${day}, ${displayYear}`}
                className={[
                  "mantle-calendarDay",
                  isSelected && "mantle-calendarDaySelected",
                  isToday && !isSelected && "mantle-calendarDayToday",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
