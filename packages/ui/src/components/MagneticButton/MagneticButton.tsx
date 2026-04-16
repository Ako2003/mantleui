import { forwardRef, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MagneticButtonProps } from "./MagneticButton.types";
import "./MagneticButton.css";

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * A button that subtly pulls toward the cursor on hover.
 *
 * @example
 * ```tsx
 * <MagneticButton strength={0.4}>Click me</MagneticButton>
 * ```
 */
export const MagneticButton = forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(function MagneticButton(
  { children, strength = 0.3, className, onMouseMove, onMouseLeave, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const node = innerRef.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * strength);
        y.set((event.clientY - centerY) * strength);
      }
      onMouseMove?.(event);
    },
    [x, y, strength, onMouseMove],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      x.set(0);
      y.set(0);
      onMouseLeave?.(event);
    },
    [x, y, onMouseLeave],
  );

  return (
    <motion.button
      ref={setRef}
      className={["mantle-magneticbutton", className].filter(Boolean).join(" ")}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

MagneticButton.displayName = "MagneticButton";
