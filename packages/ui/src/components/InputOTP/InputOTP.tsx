import { forwardRef, useCallback, useRef } from "react";
import { useControllable } from "../../hooks";
import type { InputOTPProps } from "./InputOTP.types";
import "./InputOTP.css";

/**
 * One-time password input with individual digit boxes.
 *
 * @example
 * ```tsx
 * <InputOTP length={6} onValueChange={setCode} />
 * <InputOTP value={code} onValueChange={setCode} />
 * ```
 */
export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  function InputOTP(
    {
      length = 6,
      value: valueProp,
      defaultValue = "",
      onValueChange,
      disabled,
      color = "blue",
      className,
      ...rest
    },
    ref,
  ) {
    const [value, setValue] = useControllable<string>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    });

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = useCallback((index: number) => {
      const input = inputsRef.current.at(index);
      if (input) {
        input.focus();
      }
    }, []);

    const handleChange = useCallback(
      (index: number, char: string) => {
        const chars = value.padEnd(length, " ").split("");
        chars[index] = char;
        const next = chars.join("").trimEnd();
        setValue(next);

        if (char && index < length - 1) {
          focusInput(index + 1);
        }
      },
      [value, length, setValue, focusInput],
    );

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          e.preventDefault();
          const chars = value.padEnd(length, " ").split("");
          if (chars.at(index)?.trim()) {
            chars[index] = " ";
            setValue(chars.join("").trimEnd());
          } else if (index > 0) {
            chars[index - 1] = " ";
            setValue(chars.join("").trimEnd());
            focusInput(index - 1);
          }
        }
      },
      [value, length, setValue, focusInput],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, length);
        setValue(pasted);
        const nextFocus = Math.min(pasted.length, length - 1);
        focusInput(nextFocus);
      },
      [length, setValue, focusInput],
    );

    return (
      <div
        ref={ref}
        data-color={color}
        className={["mantle-inputotp", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={value.charAt(i) || ""}
            aria-label={`Digit ${i + 1}`}
            className="mantle-inputotp-box"
            onChange={(e) => {
              const char = e.target.value.slice(-1);
              handleChange(i, char);
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    );
  },
);

InputOTP.displayName = "InputOTP";
