import { forwardRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ScrollProgressProps } from "./ScrollProgress.types";
import "./ScrollProgress.css";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };

/**
 * A smooth progress bar fixed to the top or bottom of the viewport that
 * reflects how far the user has scrolled through the page. Renders via
 * a portal to `document.body` so ancestor transforms don't break the
 * fixed positioning.
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

    const mounted = useIsMounted();

    if (!mounted || typeof document === "undefined") return null;

    return createPortal(
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
      />,
      document.body,
    );
  },
);

ScrollProgress.displayName = "ScrollProgress";
