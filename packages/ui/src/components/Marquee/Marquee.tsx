import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import type { MarqueeProps } from "./Marquee.types";
import "./Marquee.css";

/**
 * Infinite horizontal scroll of children, looped seamlessly.
 *
 * @example
 * ```tsx
 * <Marquee speed={80} pauseOnHover>
 *   <Logo /> <Logo /> <Logo />
 * </Marquee>
 * ```
 */
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      children,
      speed = 50,
      direction = "left",
      pauseOnHover = true,
      className,
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) {
    const groupRef = useRef<HTMLDivElement | null>(null);
    const controls = useAnimationControls();
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const node = groupRef.current;
      if (!node) return;
      const update = () => setWidth(node.scrollWidth);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(node);
      return () => observer.disconnect();
    }, [children]);

    useEffect(() => {
      if (width === 0) return;
      const distance = direction === "left" ? -width : width;
      const duration = width / speed;
      controls.start({
        x: [
          direction === "left" ? 0 : -width,
          distance === -width ? -width : 0,
        ],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }, [width, speed, direction, controls]);

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (pauseOnHover) controls.stop();
        onMouseEnter?.(event);
      },
      [pauseOnHover, controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (pauseOnHover && width > 0) {
          const distance = direction === "left" ? -width : width;
          const duration = width / speed;
          controls.start({
            x: [
              direction === "left" ? 0 : -width,
              distance === -width ? -width : 0,
            ],
            transition: {
              duration,
              ease: "linear",
              repeat: Infinity,
            },
          });
        }
        onMouseLeave?.(event);
      },
      [pauseOnHover, controls, width, direction, speed, onMouseLeave],
    );

    return (
      <div
        ref={ref}
        className={["mantle-marquee", className].filter(Boolean).join(" ")}
        style={style}
        data-pause-on-hover={pauseOnHover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <motion.div className="mantle-marquee-track" animate={controls}>
          <div ref={groupRef} className="mantle-marquee-group">
            {children}
          </div>
          <div className="mantle-marquee-group" aria-hidden="true">
            {children}
          </div>
        </motion.div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
