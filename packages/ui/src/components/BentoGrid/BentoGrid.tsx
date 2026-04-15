import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { BentoGridItemProps, BentoGridProps } from "./BentoGrid.types";
import "./BentoGrid.css";

const ITEM_SPRING = { type: "spring" as const, stiffness: 260, damping: 20 };

/**
 * A responsive bento-style grid with animated hover on each cell.
 *
 * @example
 * ```tsx
 * <BentoGrid columns={4} gap={16}>
 *   <BentoGrid.Item colSpan={2}>Featured</BentoGrid.Item>
 *   <BentoGrid.Item>Cell</BentoGrid.Item>
 * </BentoGrid>
 * ```
 */
const BentoGridRoot = forwardRef<HTMLDivElement, BentoGridProps>(
  function BentoGridRoot(
    { children, columns = 4, gap = 16, className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={["mantle-bentogrid", className].filter(Boolean).join(" ")}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

BentoGridRoot.displayName = "BentoGrid";

const BentoGridItem = forwardRef<HTMLDivElement, BentoGridItemProps>(
  function BentoGridItem(
    { children, colSpan = 1, rowSpan = 1, className, style, ...rest },
    ref,
  ) {
    return (
      <motion.div
        ref={ref}
        className={["mantle-bentogrid-item", className]
          .filter(Boolean)
          .join(" ")}
        style={{
          gridColumn: `span ${colSpan} / span ${colSpan}`,
          gridRow: `span ${rowSpan} / span ${rowSpan}`,
          ...style,
        }}
        whileHover={{ y: -4, scale: 1.02 }}
        transition={ITEM_SPRING}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

BentoGridItem.displayName = "BentoGrid.Item";

export const BentoGrid = Object.assign(BentoGridRoot, {
  Item: BentoGridItem,
});
