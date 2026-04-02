import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useControllable, useId } from "../../hooks";
import { resolveColor } from "../../utils";
import type { TimeFieldProps } from "./TimeField.types";
import "./TimeField.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime(str: string): { h: number; m: number } | null {
  const match = str.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { h, m };
}

/**
 * A custom time picker with hour and minute segment inputs and a dropdown
 * scroll picker.
 *
 * @example
 * ```tsx
 * <TimeField label="Meeting time" defaultValue="14:30" />
 * <TimeField value={time} onValueChange={setTime} />
 * ```
 */
export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  function TimeField(
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      label,
      description,
      error,
      color = "blue",
      disabled = false,
      step = 1,
      className,
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const [value, setValue] = useControllable<string>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId("timefield");

    const parsed = parseTime(value);
    const hours = parsed?.h ?? null;
    const minutes = parsed?.m ?? null;

    const setTime = useCallback(
      (h: number, m: number) => {
        setValue(`${pad(h)}:${pad(m)}`);
      },
      [setValue],
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

    const handleHourInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (raw === "") return;
        const h = Math.min(parseInt(raw, 10), 23);
        setTime(h, minutes ?? 0);
      },
      [setTime, minutes],
    );

    const handleMinuteInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (raw === "") return;
        const parsed = Math.min(parseInt(raw, 10), 59);
        const m = Math.round(parsed / step) * step;
        setTime(hours ?? 0, Math.min(m, 59));
      },
      [setTime, hours, step],
    );

    const handleSegmentKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, type: "hour" | "minute") => {
        const current = type === "hour" ? (hours ?? 0) : (minutes ?? 0);
        const increment = type === "minute" ? step : 1;
        const maxVal = type === "hour" ? 23 : 59;

        if (e.key === "ArrowUp") {
          e.preventDefault();
          let next = current + increment;
          if (next > maxVal) next = 0;
          if (type === "hour") setTime(next, minutes ?? 0);
          else setTime(hours ?? 0, next);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          let next = current - increment;
          if (next < 0) next = type === "hour" ? 23 : 60 - increment;
          if (type === "hour") setTime(next, minutes ?? 0);
          else setTime(hours ?? 0, next);
        }
      },
      [hours, minutes, setTime, step],
    );

    // Generate minute options with step
    const minuteOptions: number[] = [];
    for (let m = 0; m < 60; m += step) {
      minuteOptions.push(m);
    }

    const hourOptions: number[] = [];
    for (let h = 0; h < 24; h++) {
      hourOptions.push(h);
    }

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
        className={["mantle-timeField", className].filter(Boolean).join(" ")}
      >
        {label && (
          <label
            className={[
              "mantle-timeFieldLabel",
              error && "mantle-timeFieldLabelError",
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
            "mantle-timeFieldTrigger",
            error && "mantle-timeFieldTriggerError",
            disabled && "mantle-timeFieldTriggerDisabled",
          ]
            .filter(Boolean)
            .join(" ")}
          role="group"
          aria-labelledby={label ? `${generatedId}-label` : undefined}
        >
          <div className="mantle-timeFieldSegments">
            <input
              type="text"
              inputMode="numeric"
              className="mantle-timeFieldSegment"
              value={hours !== null ? pad(hours) : "--"}
              onChange={handleHourInput}
              onKeyDown={(e) => handleSegmentKeyDown(e, "hour")}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              maxLength={2}
              aria-label="Hours"
            />
            <span className="mantle-timeFieldSeparator">:</span>
            <input
              type="text"
              inputMode="numeric"
              className="mantle-timeFieldSegment"
              value={minutes !== null ? pad(minutes) : "--"}
              onChange={handleMinuteInput}
              onKeyDown={(e) => handleSegmentKeyDown(e, "minute")}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              maxLength={2}
              aria-label="Minutes"
            />
          </div>
          <button
            type="button"
            className="mantle-timeFieldClockBtn"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsOpen(!isOpen);
            }}
            disabled={disabled}
            aria-label="Open time picker"
            tabIndex={-1}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="mantle-timeFieldDropdown">
            <ScrollColumn
              options={hourOptions}
              selected={hours}
              onSelect={(h) => setTime(h, minutes ?? 0)}
              label="Hours"
            />
            <div className="mantle-timeFieldDropdownDivider" />
            <ScrollColumn
              options={minuteOptions}
              selected={minutes}
              onSelect={(m) => setTime(hours ?? 0, m)}
              label="Minutes"
            />
          </div>
        )}

        {error && (
          <span className="mantle-timeFieldError" role="alert">
            {error}
          </span>
        )}
        {!error && description && (
          <span className="mantle-timeFieldDescription">{description}</span>
        )}
      </div>
    );
  },
);

/* ─── Scroll Column ─── */

function ScrollColumn({
  options,
  selected,
  onSelect,
  label,
}: {
  options: number[];
  selected: number | null;
  onSelect: (val: number) => void;
  label: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view on mount
  useEffect(() => {
    if (selected === null || !listRef.current) return;
    const idx = options.indexOf(selected);
    if (idx < 0) return;
    const el = listRef.current.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: "center", behavior: "instant" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={listRef}
      className="mantle-timeFieldColumn"
      role="listbox"
      aria-label={label}
    >
      {options.map((val) => (
        <button
          key={val}
          type="button"
          role="option"
          aria-selected={val === selected}
          className={[
            "mantle-timeFieldOption",
            val === selected && "mantle-timeFieldOptionSelected",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onSelect(val)}
        >
          {pad(val)}
        </button>
      ))}
    </div>
  );
}
