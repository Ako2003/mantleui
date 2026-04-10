import { forwardRef, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlurRevealProps } from "./BlurReveal.types";

/**
 * Content that fades from blur to clear when scrolled into view.
 *
 * @example
 * ```tsx
 * <BlurReveal blur={16} delay={0.2}>
 *   <h2>Hello</h2>
 * </BlurReveal>
 * ```
 */
export const BlurReveal = forwardRef<HTMLDivElement, BlurRevealProps>(
  function BlurReveal(
    {
      children,
      blur = 20,
      duration = 0.8,
      delay = 0,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(innerRef, { once: true, amount: 0.25 });

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <motion.div
        ref={setRef}
        className={["mantle-blurreveal", className].filter(Boolean).join(" ")}
        style={style}
        initial={{ filter: `blur(${blur}px)`, opacity: 0 }}
        animate={inView ? { filter: "blur(0px)", opacity: 1 } : undefined}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

BlurReveal.displayName = "BlurReveal";
