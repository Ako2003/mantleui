import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useControllable } from "../../hooks";
import { ColorArea } from "../ColorArea";
import { ColorSlider } from "../ColorSlider";
import { ColorField } from "../ColorField";
import type { ColorPickerProps } from "./ColorPicker.types";
import "./ColorPicker.css";

function hexToHsb(hex: string): { h: number; s: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, b: 0 };

  const r = parseInt(result.at(1) as string, 16) / 255;
  const g = parseInt(result.at(2) as string, 16) / 255;
  const b = parseInt(result.at(3) as string, 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const brightness = Math.round(max * 100);

  return { h, s, b: brightness };
}

function hsbToHex(h: number, s: number, b: number): string {
  const sv = s / 100;
  const bv = b / 100;

  const c = bv * sv;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bv - c;

  let r = 0;
  let g = 0;
  let bl = 0;

  if (h < 60) {
    r = c;
    g = x;
    bl = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    bl = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    bl = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    bl = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    bl = c;
  } else {
    r = c;
    g = 0;
    bl = x;
  }

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

/**
 * A full color picker combining ColorArea, ColorSlider, and ColorField.
 *
 * @example
 * ```tsx
 * <ColorPicker value="#3b82f6" onValueChange={(hex) => setColor(hex)} />
 * ```
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(
    {
      value: valueProp,
      defaultValue = "#ff0000",
      onValueChange,
      showField = true,
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

    // Internal HSB state for smooth dragging
    const [hsb, setHsb] = useState(() => hexToHsb(value));
    const isInternalUpdate = useRef(false);

    // Sync HSB when external value changes
    useEffect(() => {
      if (!isInternalUpdate.current) {
        setHsb(hexToHsb(value));
      }
      isInternalUpdate.current = false;
    }, [value]);

    const updateFromHsb = useCallback(
      (h: number, s: number, b: number) => {
        setHsb({ h, s, b });
        isInternalUpdate.current = true;
        setValue(hsbToHex(h, s, b));
      },
      [setValue],
    );

    const handleHueChange = useCallback(
      (hue: number) => {
        updateFromHsb(hue, hsb.s, hsb.b);
      },
      [hsb.s, hsb.b, updateFromHsb],
    );

    const handleSaturationChange = useCallback(
      (saturation: number) => {
        updateFromHsb(hsb.h, saturation, hsb.b);
      },
      [hsb.h, hsb.b, updateFromHsb],
    );

    const handleBrightnessChange = useCallback(
      (brightness: number) => {
        updateFromHsb(hsb.h, hsb.s, brightness);
      },
      [hsb.h, hsb.s, updateFromHsb],
    );

    const handleFieldChange = useCallback(
      (hex: string) => {
        setValue(hex);
      },
      [setValue],
    );

    return (
      <div
        ref={ref}
        className={["mantle-colorPicker", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <ColorArea
          hue={hsb.h}
          saturation={hsb.s}
          brightness={hsb.b}
          onSaturationChange={handleSaturationChange}
          onBrightnessChange={handleBrightnessChange}
        />
        <ColorSlider
          channel="hue"
          value={hsb.h}
          onValueChange={handleHueChange}
        />
        {showField && (
          <ColorField
            value={value}
            onValueChange={handleFieldChange}
            label="Hex"
          />
        )}
      </div>
    );
  },
);
