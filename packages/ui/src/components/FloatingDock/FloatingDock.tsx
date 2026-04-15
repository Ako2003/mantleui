import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { FloatingDockItem, FloatingDockProps } from "./FloatingDock.types";
import "./FloatingDock.css";

const BASE_SIZE = 40;
const MAX_SIZE = 64;
const INFLUENCE = 120;

const SIZE_SPRING = { mass: 0.1, stiffness: 200, damping: 15 };
const TOOLTIP_TRANSITION = { duration: 0.15 };

interface DockItemProps {
  item: FloatingDockItem;
  mouseX: MotionValue<number>;
}

function DockItem({ item, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const node = ref.current;
    if (!node) return Number.POSITIVE_INFINITY;
    const rect = node.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(x - center);
  });

  const targetSize = useTransform(
    distance,
    [0, INFLUENCE],
    [MAX_SIZE, BASE_SIZE],
    { clamp: true },
  );
  const size = useSpring(targetSize, SIZE_SPRING);

  const show = useCallback(() => setTooltipVisible(true), []);
  const hide = useCallback(() => setTooltipVisible(false), []);

  const handleClick = useCallback(() => {
    item.onClick?.();
  }, [item]);

  return (
    <motion.div
      ref={ref}
      className="mantle-floatingdock-item"
      style={{ width: size, height: size }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {item.href ? (
        <motion.a
          href={item.href}
          className="mantle-floatingdock-icon"
          aria-label={item.label}
          onClick={handleClick}
          onFocus={show}
          onBlur={hide}
        >
          {item.icon}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          className="mantle-floatingdock-icon"
          aria-label={item.label}
          onClick={handleClick}
          onFocus={show}
          onBlur={hide}
        >
          {item.icon}
        </motion.button>
      )}
      <AnimatePresence>
        {tooltipVisible && (
          <motion.span
            className="mantle-floatingdock-tooltip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={TOOLTIP_TRANSITION}
            role="tooltip"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * macOS-style magnifying dock. Items grow when the cursor approaches them.
 *
 * @example
 * ```tsx
 * <FloatingDock
 *   items={[
 *     { icon: <HomeIcon />, label: "Home" },
 *     { icon: <SearchIcon />, label: "Search", onClick: openSearch },
 *   ]}
 * />
 * ```
 */
export const FloatingDock = forwardRef<HTMLDivElement, FloatingDockProps>(
  function FloatingDock({ items, className, ...rest }, ref) {
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

    const handleMouseMove = useCallback(
      (event: ReactMouseEvent<HTMLDivElement>) => {
        mouseX.set(event.clientX);
      },
      [mouseX],
    );

    const handleMouseLeave = useCallback(() => {
      mouseX.set(Number.POSITIVE_INFINITY);
    }, [mouseX]);

    return (
      <div
        ref={ref}
        className={["mantle-floatingdock", className].filter(Boolean).join(" ")}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {items.map((item, index) => (
          <DockItem
            key={`${item.label}-${index}`}
            item={item}
            mouseX={mouseX}
          />
        ))}
      </div>
    );
  },
);

FloatingDock.displayName = "FloatingDock";
