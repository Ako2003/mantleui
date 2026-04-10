import { forwardRef, useCallback, useMemo, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import type { TextRevealProps } from "./TextReveal.types";
import "./TextReveal.css";

/**
 * Animates text word-by-word when it scrolls into view.
 *
 * @example
 * ```tsx
 * <TextReveal>Welcome to the future of design.</TextReveal>
 * ```
 */
export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(
  function TextReveal(
    { children, stagger = 0.05, delay = 0, className, style, ...rest },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(innerRef, { once: true, amount: 0.3 });

    const words = useMemo(() => children.split(/(\s+)/), [children]);

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

    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };

    const word: Variants = {
      hidden: { opacity: 0, y: "0.4em" },
      visible: {
        opacity: 1,
        y: "0em",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    };

    return (
      <motion.div
        ref={setRef}
        className={["mantle-textreveal", className].filter(Boolean).join(" ")}
        style={style}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        aria-label={children}
        {...rest}
      >
        {words.map((token, i) => (
          <motion.span
            key={i}
            className="mantle-textreveal-word"
            variants={word}
            aria-hidden="true"
          >
            {token}
          </motion.span>
        ))}
      </motion.div>
    );
  },
);

TextReveal.displayName = "TextReveal";
