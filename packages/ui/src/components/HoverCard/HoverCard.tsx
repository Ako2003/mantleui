import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { HoverCardProps } from "./HoverCard.types";
import "./HoverCard.css";

/**
 * A card that lifts with shadow on hover using spring physics.
 *
 * @example
 * ```tsx
 * <HoverCard lift={10} scale={1.03}>
 *   <h3>Hover me</h3>
 * </HoverCard>
 * ```
 */
export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  function HoverCard(
    {
      children,
      lift = 8,
      scale = 1.02,
      shadowColor = "rgba(0,0,0,0.15)",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <motion.div
        ref={ref}
        className={["mantle-hovercard", className].filter(Boolean).join(" ")}
        style={style}
        whileHover={{
          y: -lift,
          scale,
          boxShadow: `0 ${lift * 2}px ${lift * 4}px ${shadowColor}`,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

HoverCard.displayName = "HoverCard";
