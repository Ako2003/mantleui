import { forwardRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SplitFlapProps } from "./SplitFlap.types";
import "./SplitFlap.css";

const FLIP_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Airport-board-style split flap display that flips characters on change.
 *
 * @example
 * ```tsx
 * <SplitFlap value="HELLO" length={6} />
 * ```
 */
export const SplitFlap = forwardRef<HTMLDivElement, SplitFlapProps>(
  function SplitFlap({ value, length, className, ...rest }, ref) {
    const chars = useMemo(() => {
      const raw = String(value);
      const padded =
        typeof length === "number" && length > raw.length
          ? raw.padStart(length, " ")
          : raw;
      return padded.split("");
    }, [value, length]);

    return (
      <div
        ref={ref}
        className={["mantle-splitflap", className].filter(Boolean).join(" ")}
        aria-label={String(value)}
        {...rest}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            className="mantle-splitflap-cell"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={char}
                className="mantle-splitflap-char"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={FLIP_TRANSITION}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </div>
    );
  },
);

SplitFlap.displayName = "SplitFlap";
