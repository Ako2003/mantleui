import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useId } from "../../hooks";
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "./Tooltip.types";
import "./Tooltip.css";

interface TooltipContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  contentId: string;
  delayMs: number;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error(
      "Tooltip compound components must be used within <Tooltip>",
    );
  }
  return ctx;
}

/* ─── Root ─── */

function TooltipRoot({ delayMs = 300, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId("tooltip");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const open = useCallback(() => {
    timerRef.current = setTimeout(() => setIsOpen(true), delayMs);
  }, [delayMs]);

  const close = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isOpen, open, close, contentId, delayMs }),
    [isOpen, open, close, contentId, delayMs],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div
        className="mantle-tooltip-anchor"
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

/* ─── Trigger ─── */

const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  function TooltipTrigger({ asChild, children, ...rest }, ref) {
    const { contentId, isOpen, open, close } = useTooltipContext();

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (isOpen) {
            close();
          } else {
            open();
          }
        }
      },
      [isOpen, open, close],
    );

    const triggerProps = {
      tabIndex: 0,
      role: "button" as const,
      "aria-describedby": isOpen ? contentId : undefined,
      onKeyDown: handleKeyDown,
      ...rest,
    };

    if (asChild && isValidElement<Record<string, unknown>>(children)) {
      return cloneElement(children, { ...triggerProps, ref });
    }

    return (
      <div ref={ref} {...triggerProps}>
        {children}
      </div>
    );
  },
);

/* ─── Content ─── */

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ side = "top", className, children, ...rest }, ref) {
    const { isOpen, contentId } = useTooltipContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        id={contentId}
        role="tooltip"
        className={[`mantle-tooltip mantle-tooltip--${side}`, className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ─── Compound Export ─── */

/**
 * A hover/focus tooltip component.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>
 *     <button>Hover me</button>
 *   </Tooltip.Trigger>
 *   <Tooltip.Content side="top">Tooltip text</Tooltip.Content>
 * </Tooltip>
 * ```
 */
export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});
