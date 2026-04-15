import { forwardRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ScrollProgressProps } from "./ScrollProgress.types";
import "./ScrollProgress.css";

const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };

/**
 * A smooth progress bar fixed to the top or bottom of the viewport that
 * reflects how far the user has scrolled through the page.
 *
 * @example
 * ```tsx
 * <ScrollProgress color="#8b5cf6" height={4} />
 * ```
 */
export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  function ScrollProgress(
    {
      color = "#3b82f6",
      height = 3,
      position = "top",
      zIndex = 9999,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, SPRING_CONFIG);

    return (
      <motion.div
        ref={ref}
        className={["mantle-scrollprogress", className]
          .filter(Boolean)
          .join(" ")}
        data-position={position}
        style={{
          height: `${height}px`,
          background: color,
          zIndex,
          scaleX,
          ...style,
        }}
        aria-hidden="true"
        {...rest}
      />
    );
  },
);

ScrollProgress.displayName = "ScrollProgress";
