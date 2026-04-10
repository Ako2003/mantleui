import { forwardRef, useEffect, useState } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";
import type { AnimatedCounterProps } from "./AnimatedCounter.types";
import "./AnimatedCounter.css";

/**
 * Animates a number between values with spring-like physics.
 *
 * @example
 * ```tsx
 * <AnimatedCounter value={5000} prefix="$" suffix="+" />
 * ```
 */
export const AnimatedCounter = forwardRef<HTMLDivElement, AnimatedCounterProps>(
  function AnimatedCounter(
    {
      value,
      duration = 1.5,
      decimals = 0,
      prefix = "",
      suffix = "",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) =>
      latest.toFixed(decimals),
    );
    const [display, setDisplay] = useState<string>((0).toFixed(decimals));

    useEffect(() => {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controls.stop();
    }, [value, duration, motionValue]);

    useEffect(() => {
      const unsubscribe = rounded.on("change", (latest) => {
        setDisplay(latest);
      });
      return () => unsubscribe();
    }, [rounded]);

    return (
      <div
        ref={ref}
        className={["mantle-animatedcounter", className]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        {prefix}
        {display}
        {suffix}
      </div>
    );
  },
);

AnimatedCounter.displayName = "AnimatedCounter";
