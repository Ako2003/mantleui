import { forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import type { RadioCalendarProps } from "./RadioCalendar.types";
import "./RadioCalendar.css";

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

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatShort(date: Date): string {
  const month = MONTH_SHORT.at(date.getMonth()) as string;
  return `${month} ${date.getDate()}`;
}

/**
 * A calendar-style date selector where dates are presented as radio options in a grid.
 *
 * @example
 * ```tsx
 * <RadioCalendar
 *   dates={[new Date(2025, 0, 1), new Date(2025, 0, 2), new Date(2025, 0, 3)]}
 *   onValueChange={(date) => console.log(date)}
 * />
 * ```
 */
export const RadioCalendar = forwardRef<HTMLDivElement, RadioCalendarProps>(
  function RadioCalendar(
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      dates,
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

    const handleSelect = useCallback(
      (date: Date) => {
        setSelectedDate(date);
      },
      [setSelectedDate],
    );

    return (
      <div
        ref={ref}
        role="radiogroup"
        data-color={color}
        className={["mantle-radioCalendar", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {dates.map((date, index) => {
          const isSelected = selectedDate
            ? isSameDay(date, selectedDate)
            : false;

          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(date)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSelect(date);
                }
              }}
              className={[
                "mantle-radioCalendarItem",
                isSelected && "mantle-radioCalendarItemSelected",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {formatShort(date)}
            </button>
          );
        })}
      </div>
    );
  },
);
