import { Children, forwardRef, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import type { AnimatedListProps } from "./AnimatedList.types";
import "./AnimatedList.css";

/**
 * Renders children with a staggered fade + slide-in entry animation.
 *
 * @example
 * ```tsx
 * <AnimatedList stagger={0.12} direction="up">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </AnimatedList>
 * ```
 */
export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  function AnimatedList(
    {
      children,
      stagger = 0.1,
      direction = "up",
      distance = 20,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const offset = useMemo(() => {
      switch (direction) {
        case "down":
          return { x: 0, y: -distance };
        case "left":
          return { x: distance, y: 0 };
        case "right":
          return { x: -distance, y: 0 };
        case "up":
        default:
          return { x: 0, y: distance };
      }
    }, [direction, distance]);

    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, x: offset.x, y: offset.y },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    };

    const items = Children.toArray(children);

    return (
      <motion.div
        ref={ref}
        className={["mantle-animatedlist", className].filter(Boolean).join(" ")}
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...rest}
      >
        {items.map((child, index) => (
          <motion.div
            key={index}
            className="mantle-animatedlist-item"
            variants={itemVariants}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
