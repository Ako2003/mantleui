import { useCallback, useEffect, useRef, useState } from "react";

type SetStateAction<T> = T | ((prev: T) => T);

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
 * Supports functional updates: `setValue(prev => ...)`.
 * In both modes, `onChange` is called with the resolved next value.
 */
export function useControllable<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableParams<T>): [T, (next: SetStateAction<T>) => void] {
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);
  const valueRef = useRef(controlledValue ?? defaultValue);

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

  useEffect(() => {
    valueRef.current = value;
  });

  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(valueRef.current)
          : next;

      if (!isControlledRef.current) {
        setInternalValue(resolved);
      }
      onChange?.(resolved);
    },
    [onChange],
  );

  return [value, setValue];
}
