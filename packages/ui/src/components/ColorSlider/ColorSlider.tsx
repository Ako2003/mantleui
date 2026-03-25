import { forwardRef, useCallback } from "react";
import { useControllable } from "../../hooks";
import type { ColorSliderChannel, ColorSliderProps } from "./ColorSlider.types";
import "./ColorSlider.css";

const CHANNEL_CONFIG: Record<
  ColorSliderChannel,
  { min: number; max: number; className: string }
> = {
  hue: { min: 0, max: 360, className: "mantle-colorSliderHue" },
  saturation: { min: 0, max: 100, className: "mantle-colorSliderSaturation" },
  lightness: { min: 0, max: 100, className: "mantle-colorSliderLightness" },
};

/**
 * A slider for picking a single color channel (hue, saturation, or lightness).
 *
 * @example
 * ```tsx
 * <ColorSlider channel="hue" value={210} onValueChange={(h) => setHue(h)} />
 * ```
 */
export const ColorSlider = forwardRef<HTMLDivElement, ColorSliderProps>(
  function ColorSlider(
    {
      channel,
      value: valueProp,
      defaultValue,
      onValueChange,
      className,
      ...rest
    },
    ref,
  ) {
    const config = CHANNEL_CONFIG[channel];

    const [value, setValue] = useControllable<number>({
      value: valueProp,
      defaultValue: defaultValue ?? config.min,
      onChange: onValueChange,
    });

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
      },
      [setValue],
    );

    return (
      <div
        ref={ref}
        className={["mantle-colorSlider", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <input
          type="range"
          min={config.min}
          max={config.max}
          value={value}
          onChange={handleChange}
          className={["mantle-colorSliderInput", config.className]
            .filter(Boolean)
            .join(" ")}
          aria-label={channel}
        />
      </div>
    );
  },
);
