import { forwardRef, useCallback, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { SpotlightCardProps } from "./SpotlightCard.types";
import "./SpotlightCard.css";

/**
 * Card with a mouse-tracking radial gradient highlight.
 *
 * @example
 * ```tsx
 * <SpotlightCard spotlightColor="rgba(99,102,241,0.25)">
 *   Hover me
 * </SpotlightCard>
 * ```
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard(
    {
      children,
      spotlightColor = "rgba(255,255,255,0.1)",
      size = 400,
      className,
      style,
      onMouseMove,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

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

    const handleMouseMove = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        const node = innerRef.current;
        if (node) {
          const rect = node.getBoundingClientRect();
          mouseX.set(event.clientX - rect.left);
          mouseY.set(event.clientY - rect.top);
        }
        onMouseMove?.(event);
      },
      [mouseX, mouseY, onMouseMove],
    );

    return (
      <div
        ref={setRef}
        className={["mantle-spotlightcard", className]
          .filter(Boolean)
          .join(" ")}
        style={style}
        onMouseMove={handleMouseMove}
        {...rest}
      >
        <motion.div
          className="mantle-spotlightcard-overlay"
          style={{ background }}
          aria-hidden="true"
        />
        <div className="mantle-spotlightcard-content">{children}</div>
      </div>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";
