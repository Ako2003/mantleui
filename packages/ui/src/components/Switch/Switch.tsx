import { forwardRef } from "react";
import { useControllable } from "../../hooks";
import { composeEventHandlers } from "../../utils";
import type { SwitchProps } from "./Switch.types";
import "./Switch.css";

/**
 * A toggle switch component for on/off states.
 *
 * @example
 * ```tsx
 * <Switch label="Dark mode" />
 * <Switch checked={isDark} onCheckedChange={setIsDark} color="green" />
 * ```
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      color = "blue",
      size = "md",
      label,
      description,
      thumbIcon,
      disabled,
      onClick,
      className,
      ...rest
    },
    ref,
  ) {
    const [checked, setChecked] = useControllable({
      value: checkedProp,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

    const handleClick = composeEventHandlers(onClick, () => {
      if (!disabled) {
        setChecked(!checked);
      }
    });

    const sizeClass = size === "sm" ? "mantle-switchSm" : "mantle-switchMd";

    const switchEl = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-color={color}
        onClick={handleClick}
        className={[
          "mantle-switch",
          sizeClass,
          checked && "mantle-switchChecked",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className="mantle-switchThumb">
          {thumbIcon && (
            <span className="mantle-switchThumbIcon">{thumbIcon}</span>
          )}
        </span>
      </button>
    );

    if (!label) return switchEl;

    return (
      <label className="mantle-switchWrapper">
        {switchEl}
        <div className="mantle-switchLabelGroup">
          <span>{label}</span>
          {description && (
            <span className="mantle-switchDescription">{description}</span>
          )}
        </div>
      </label>
    );
  },
);
