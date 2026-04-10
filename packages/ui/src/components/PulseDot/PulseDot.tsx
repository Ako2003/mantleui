import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { PulseDotProps } from "./PulseDot.types";
import "./PulseDot.css";

/**
 * An animated pulsing notification dot with an expanding ping ring.
 *
 * @example
 * ```tsx
 * <PulseDot color="#22c55e" size={14} />
 * ```
 */
export const PulseDot = forwardRef<HTMLDivElement, PulseDotProps>(
  function PulseDot(
    { color = "#ef4444", size = 12, className, style, ...rest },
    ref,
  ) {
    const dimension: React.CSSProperties = {
      width: size,
      height: size,
      backgroundColor: color,
    };

    return (
      <div
        ref={ref}
        className={["mantle-pulsedot", className].filter(Boolean).join(" ")}
        style={{ width: size, height: size, ...style }}
        role="status"
        aria-label="pulse indicator"
        {...rest}
      >
        <motion.span
          className="mantle-pulsedot-ring"
          style={dimension}
          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
            repeat: Infinity,
          }}
          aria-hidden="true"
        />
        <motion.span
          className="mantle-pulsedot-core"
          style={dimension}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          aria-hidden="true"
        />
      </div>
    );
  },
);

PulseDot.displayName = "PulseDot";
