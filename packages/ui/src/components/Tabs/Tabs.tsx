import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useControllable, useId } from "../../hooks";
import { TabsContext, useTabsContext } from "./Tabs.context";
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "./Tabs.types";
import "./Tabs.css";

/* ─── Root ─── */

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function TabsRoot(
  {
    value,
    defaultValue = "",
    onValueChange,
    color = "blue",
    variant = "underline",
    orientation = "horizontal",
    className,
    children,
    ...rest
  },
  ref,
) {
  const [activeTab, setActiveTab] = useControllable({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const baseId = useId("tabs");

  const contextValue = useMemo(
    () => ({ activeTab, setActiveTab, baseId, variant, orientation }),
    [activeTab, setActiveTab, baseId, variant, orientation],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-color={color}
        className={[
          "mantle-tabs",
          orientation === "vertical" && "mantle-tabsVertical",
          className,
        ].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

/* ─── List ─── */

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, onKeyDown, ...rest },
  ref,
) {
  const listRef = useRef<HTMLDivElement>(null);
  const { activeTab, variant, orientation } = useTabsContext();
  const isPill = variant === "pill";
  const isVertical = orientation === "vertical";
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    width: 0,
    left: 0,
    opacity: 0,
  });

  // Update indicator position when active tab changes
  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector(
      '[role="tab"][aria-selected="true"]',
    ) as HTMLElement | null;
    if (activeEl) {
      if (isVertical) {
        setIndicatorStyle({
          height: activeEl.offsetHeight,
          top: activeEl.offsetTop,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          width: activeEl.offsetWidth,
          left: activeEl.offsetLeft,
          opacity: 1,
        });
      }
    }
  }, [isVertical]);

  useEffect(() => {
    updateIndicator();
  }, [activeTab, updateIndicator]);

  // Also update on resize
  useEffect(() => {
    const observer = new ResizeObserver(updateIndicator);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [updateIndicator]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    const list = listRef.current;
    if (!list) return;

    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>(
        'button[role="tab"]:not(:disabled)',
      ),
    );
    const currentIndex = triggers.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (currentIndex === -1) return;

    let nextIndex: number | undefined;

    const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
    const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

    switch (e.key) {
      case nextKey:
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case prevKey:
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    triggers[nextIndex]?.focus();
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus -- tablist delegates focus to its tab children via roving tabindex
    <div
      ref={(node) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      role="tablist"
      aria-orientation={orientation}
      className={[
        "mantle-tabsList",
        isPill && "mantle-tabsListPill",
        isVertical && "mantle-tabsListVertical",
        className,
      ].filter(Boolean).join(" ")}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
      <span className={isPill ? "mantle-tabsIndicatorPill" : "mantle-tabsIndicator"} style={indicatorStyle} />
    </div>
  );
});

/* ─── Trigger ─── */

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    { value, disabled, className, children, onClick, ...rest },
    ref,
  ) {
    const { activeTab, setActiveTab, baseId } = useTabsContext();
    const isActive = activeTab === value;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          setActiveTab(value);
        }
      },
      [onClick, setActiveTab, value],
    );

    return (
      <button
        ref={ref}
        id={`${baseId}-trigger-${value}`}
        role="tab"
        type="button"
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive}
        aria-controls={`${baseId}-content-${value}`}
        disabled={disabled}
        onClick={handleClick}
        className={[
          "mantle-tabsTrigger",
          isActive && "mantle-tabsTriggerActive",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

/* ─── Content ─── */

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, className, children, ...rest }, ref) {
    const { activeTab, baseId } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        id={`${baseId}-content-${value}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-trigger-${value}`}
        className={["mantle-tabsContent", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ─── Separator ─── */

function TabsSeparator() {
  return <span className="mantle-tabsSeparator" aria-hidden="true" />;
}

/* ─── Compound Export ─── */

/**
 * A tabs component using compound components with roving tabindex.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab-1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab-1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab-2">Content 2</Tabs.Content>
 * </Tabs>
 * ```
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Separator: TabsSeparator,
});
