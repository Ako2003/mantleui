import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { ImageCompareProps } from "./ImageCompare.types";
import "./ImageCompare.css";

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/**
 * A draggable before/after image comparison slider.
 *
 * @example
 * ```tsx
 * <ImageCompare
 *   beforeImage="/before.jpg"
 *   afterImage="/after.jpg"
 *   defaultPosition={50}
 * />
 * ```
 */
export const ImageCompare = forwardRef<HTMLDivElement, ImageCompareProps>(
  function ImageCompare(
    {
      beforeImage,
      afterImage,
      beforeAlt = "Before",
      afterAlt = "After",
      defaultPosition = 50,
      height = 400,
      handleColor = "#fff",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const initialPosition = clamp(defaultPosition, 0, 100);
    const position = useMotionValue(initialPosition);
    const clipPath = useTransform(
      position,
      (p) => `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`,
    );
    const handleLeft = useTransform(position, (p) => `${p}%`);
    const [displayPosition, setDisplayPosition] = useState(
      Math.round(initialPosition),
    );
    useMotionValueEvent(position, "change", (latest) => {
      setDisplayPosition(Math.round(latest));
    });

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const updateFromClientX = useCallback(
      (clientX: number) => {
        const node = containerRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.width === 0) return;
        const ratio = ((clientX - rect.left) / rect.width) * 100;
        position.set(clamp(ratio, 0, 100));
      },
      [position],
    );

    const draggingRef = useRef(false);

    const handlePointerDown = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        draggingRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromClientX(event.clientX);
      },
      [updateFromClientX],
    );

    const handlePointerMove = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;
        updateFromClientX(event.clientX);
      },
      [updateFromClientX],
    );

    const handlePointerUp = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        draggingRef.current = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      },
      [],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        const current = position.get();
        const step = event.shiftKey ? 10 : 5;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          position.set(clamp(current - step, 0, 100));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          position.set(clamp(current + step, 0, 100));
        } else if (event.key === "Home") {
          event.preventDefault();
          position.set(0);
        } else if (event.key === "End") {
          event.preventDefault();
          position.set(100);
        }
      },
      [position],
    );

    // Reset to default if defaultPosition prop changes after mount.
    const mountedRef = useRef(false);
    useEffect(() => {
      if (mountedRef.current) {
        position.set(clamp(defaultPosition, 0, 100));
      } else {
        mountedRef.current = true;
      }
    }, [defaultPosition, position]);

    const containerStyle = {
      height: typeof height === "number" ? `${height}px` : height,
      color: handleColor,
      ...style,
    };

    return (
      <div
        ref={setRef}
        className={["mantle-imagecompare", className].filter(Boolean).join(" ")}
        style={containerStyle}
        {...rest}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="mantle-imagecompare-image"
          draggable={false}
        />
        <motion.div
          className="mantle-imagecompare-after-wrapper"
          style={{ clipPath }}
          aria-hidden="true"
        >
          <img
            src={afterImage}
            alt={afterAlt}
            className="mantle-imagecompare-image"
            draggable={false}
          />
        </motion.div>
        <span className="mantle-imagecompare-label" data-side="before">
          Before
        </span>
        <span className="mantle-imagecompare-label" data-side="after">
          After
        </span>
        <motion.div
          className="mantle-imagecompare-handle"
          style={{ left: handleLeft }}
          role="slider"
          tabIndex={0}
          aria-label="Image comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayPosition}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <span
            className="mantle-imagecompare-handle-line"
            aria-hidden="true"
          />
          <span className="mantle-imagecompare-handle-knob" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 3 12 9 6" />
              <polyline points="15 6 21 12 15 18" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </span>
        </motion.div>
      </div>
    );
  },
);

ImageCompare.displayName = "ImageCompare";
