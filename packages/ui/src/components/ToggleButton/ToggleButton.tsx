import { forwardRef } from "react";
import { useControllable } from "../../hooks";
import { composeEventHandlers } from "../../utils";
import type { ToggleButtonProps } from "./ToggleButton.types";
import "./ToggleButton.css";

/**
 * A toggle button with accent color when pressed.
 * Supports solid and outline variants with controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <ToggleButton variant="solid" onPressedChange={console.log}>Bold</ToggleButton>
 *
 * // Controlled
 * <ToggleButton pressed={isBold} onPressedChange={setIsBold} variant="outline">
 *   Bold
 * </ToggleButton>
 * ```
 */
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(
    {
      pressed,
      defaultPressed = false,
      onPressedChange,
      variant = "outline",
      color = "blue",
      size = "md",
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
        data-color={color}
        aria-pressed={isPressed}
        disabled={disabled}
        onClick={handleClick}
        className={[
          "mantle-togglebutton",
          `mantle-togglebutton-${variant}`,
          `mantle-togglebutton-${size}`,
          isPressed && "mantle-togglebutton-pressed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
