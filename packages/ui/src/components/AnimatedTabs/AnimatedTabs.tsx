import { forwardRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useControllable, useId } from "../../hooks";
import type { AnimatedTabsProps } from "./AnimatedTabs.types";
import "./AnimatedTabs.css";

const INDICATOR_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
};

/**
 * Tabs with a shared-layout indicator that slides between the active item.
 *
 * @example
 * ```tsx
 * <AnimatedTabs
 *   tabs={[
 *     { id: "one", label: "One" },
 *     { id: "two", label: "Two" },
 *   ]}
 *   variant="pill"
 * />
 * ```
 */
export const AnimatedTabs = forwardRef<HTMLDivElement, AnimatedTabsProps>(
  function AnimatedTabs(
    {
      tabs,
      value,
      defaultValue,
      onValueChange,
      variant = "underline",
      className,
      ...rest
    },
    ref,
  ) {
    const fallback = tabs[0]?.id ?? "";
    const [active, setActive] = useControllable<string>({
      value,
      defaultValue: defaultValue ?? fallback,
      onChange: onValueChange,
    });

    const layoutPrefix = useId();
    const indicatorId = `${layoutPrefix}-animatedtabs-indicator`;

    const handleSelect = useCallback(
      (id: string) => {
        setActive(id);
      },
      [setActive],
    );

    return (
      <div
        ref={ref}
        role="tablist"
        data-variant={variant}
        className={["mantle-animatedtabs", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive ? "true" : "false"}
              data-active={isActive}
              className="mantle-animatedtabs-trigger"
              onClick={() => handleSelect(tab.id)}
            >
              {isActive && variant === "pill" && (
                <motion.span
                  layoutId={indicatorId}
                  className="mantle-animatedtabs-indicator-pill"
                  transition={INDICATOR_SPRING}
                  aria-hidden="true"
                />
              )}
              {tab.label}
              {isActive && variant === "underline" && (
                <motion.span
                  layoutId={indicatorId}
                  className="mantle-animatedtabs-indicator-underline"
                  transition={INDICATOR_SPRING}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

AnimatedTabs.displayName = "AnimatedTabs";
