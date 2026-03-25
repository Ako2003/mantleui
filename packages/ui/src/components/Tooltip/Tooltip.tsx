import {
  createContext,
  forwardRef,
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

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const contextValue = useMemo(
    () => ({ isOpen, open, close, contentId, delayMs }),
    [isOpen, open, close, contentId, delayMs],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}

/* ─── Trigger ─── */

const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  function TooltipTrigger(
    { children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest },
    ref,
  ) {
    const { open, close, contentId, isOpen, delayMs } = useTooltipContext();
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined,
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      timerRef.current = setTimeout(open, delayMs);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      clearTimeout(timerRef.current);
      close();
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(e);
      timerRef.current = setTimeout(open, delayMs);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(e);
      clearTimeout(timerRef.current);
      close();
    };

    return (
      <div
        ref={ref}
        className="mantle-tooltip-trigger"
        aria-describedby={isOpen ? contentId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
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
