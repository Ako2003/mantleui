import { forwardRef } from "react";
import { useControllable } from "../../hooks";
import { composeEventHandlers } from "../../utils";
import type { ToggleProps } from "./Toggle.types";
import "./Toggle.css";

/**
 * A two-state toggle button that supports both controlled and uncontrolled usage.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Toggle defaultPressed={false} onPressedChange={console.log}>Bold</Toggle>
 *
 * // Controlled
 * <Toggle pressed={isBold} onPressedChange={setIsBold}>Bold</Toggle>
 * ```
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      pressed,
      defaultPressed = false,
      onPressedChange,
      disabled,
      onClick,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [isPressed, setIsPressed] = useControllable({
      value: pressed,
      defaultValue: defaultPressed,
      onChange: onPressedChange,
    });

    const handleClick = composeEventHandlers(onClick, () => {
      if (!disabled) {
        setIsPressed(!isPressed);
      }
    });

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={disabled}
        onClick={handleClick}
        className={["mantle-toggle", isPressed && "mantle-pressed", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
