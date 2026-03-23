import { useCallback, useEffect, useRef, useState } from "react";

interface UseControllableParams<T> {
  /** The controlled value (from props). Pass `undefined` for uncontrolled mode. */
  value: T | undefined;
  /** The default value for uncontrolled mode. */
  defaultValue: T;
  /** Called when the value changes, in both controlled and uncontrolled mode. */
  onChange?: (value: T) => void;
}

/**
 * Manages state that can be either controlled or uncontrolled.
 *
 * - **Controlled**: when `value` is defined, the component reflects it directly.
 * - **Uncontrolled**: when `value` is undefined, internal state is used.
 *
 * In both modes, `onChange` is called when the value changes.
 */
export function useControllable<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableParams<T>): [T, (next: T) => void] {
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (isControlledRef.current !== isControlled) {
        console.warn(
          "A component switched between controlled and uncontrolled mode. " +
            "This is likely a bug. Decide between using a controlled or " +
            "uncontrolled value for the lifetime of the component.",
        );
      }
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlledRef.current) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [onChange],
  );

  return [value, setValue];
}
