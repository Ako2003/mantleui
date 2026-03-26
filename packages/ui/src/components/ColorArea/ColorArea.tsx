import { forwardRef, useCallback, useRef } from "react";
import type { ColorAreaProps } from "./ColorArea.types";
import "./ColorArea.css";

function hslToHex(h: number): string {
  const s = 1;
  const l = 0.5;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * A 2D color picking area for selecting saturation and brightness.
 *
 * @example
 * ```tsx
 * <ColorArea
 *   hue={210}
 *   saturation={80}
 *   brightness={90}
 *   onSaturationChange={(s) => setSaturation(s)}
 *   onBrightnessChange={(b) => setBrightness(b)}
 * />
 * ```
 */
export const ColorArea = forwardRef<HTMLDivElement, ColorAreaProps>(
  function ColorArea(
    {
      hue,
      saturation,
      brightness,
      onSaturationChange,
      onBrightnessChange,
      onColorChange,
      size = 200,
      className,
      ...rest
    },
    ref,
  ) {
    const areaRef = useRef<HTMLDivElement | null>(null);

    const updateValues = useCallback(
      (clientX: number, clientY: number) => {
        const el = areaRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        const newSat = Math.round(x * 100);
        const newBri = Math.round((1 - y) * 100);
        onColorChange?.(newSat, newBri);
        onSaturationChange?.(newSat);
        onBrightnessChange?.(newBri);
      },
      [onSaturationChange, onBrightnessChange, onColorChange],
    );

    const handlePointerDown = useCallback(
      (event: React.PointerEvent) => {
        event.preventDefault();
        const el = areaRef.current;
        if (!el) return;
        el.setPointerCapture(event.pointerId);
        updateValues(event.clientX, event.clientY);
      },
      [updateValues],
    );

    const handlePointerMove = useCallback(
      (event: React.PointerEvent) => {
        const el = areaRef.current;
        if (!el || !el.hasPointerCapture(event.pointerId)) return;
        updateValues(event.clientX, event.clientY);
      },
      [updateValues],
    );

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        areaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const thumbLeft = `${saturation}%`;
    const thumbTop = `${100 - brightness}%`;
    const hueColor = hslToHex(hue);

    return (
      <div
        ref={setRefs}
        className={["mantle-colorArea", className].filter(Boolean).join(" ")}
        style={{
          width: size,
          height: size,
          backgroundColor: hueColor,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        {...rest}
      >
        <div className="mantle-colorAreaGradient mantle-colorAreaGradientWhite" />
        <div className="mantle-colorAreaGradient mantle-colorAreaGradientBlack" />
        <div
          className="mantle-colorAreaThumb"
          data-testid="color-area-thumb"
          style={{ left: thumbLeft, top: thumbTop }}
        />
      </div>
    );
  },
);
