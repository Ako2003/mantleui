import { cloneElement, forwardRef, isValidElement } from "react";
import { createPortal } from "react-dom";
import { useComposedRefs } from "../../hooks";
import { resolveColor } from "../../utils";
import { PopoverContext, usePopoverContext } from "./Popover.context";
import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./Popover.types";
import { usePopover } from "./usePopover";
import "./Popover.css";

/* ─── Root ─── */

function PopoverRoot({
  children,
  open,
  defaultOpen,
  onOpenChange,
  placement,
  color = "blue",
}: PopoverProps) {
  const { dataColor, colorStyle } = resolveColor(color);
  const popover = usePopover({
    open,
    defaultOpen,
    onOpenChange,
    placement,
    portal: true,
  });

  return (
    <PopoverContext.Provider value={popover}>
      <div className="mantle-anchor" data-color={dataColor} style={colorStyle}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

/* ─── Trigger ─── */

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger({ children, onClick, asChild, ...rest }, ref) {
    const { triggerProps } = usePopoverContext();

    const composedRef = useComposedRefs(ref, triggerProps.ref);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        triggerProps.onClick();
      }
    };

    const sharedProps = {
      ref: composedRef,
      "aria-expanded": triggerProps["aria-expanded"],
      "aria-haspopup": triggerProps["aria-haspopup"],
      onClick: handleClick,
      ...rest,
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(
        children as React.ReactElement<Record<string, unknown>>,
        sharedProps,
      );
    }

    return (
      <button
        type="button"
        className="mantle-popoverTrigger"
        {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

/* ─── Content ─── */

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ children, className, ...rest }, ref) {
    const { isOpen, contentProps } = usePopoverContext();

    const composedRef = useComposedRefs(ref, contentProps.ref);

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={composedRef}
        role={contentProps.role}
        style={contentProps.style}
        className={["mantle-content", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

/* ─── Compound Export ─── */

/**
 * A popover component with both a styled compound API and a headless hook.
 *
 * @example Compound usage
 * ```tsx
 * <Popover>
 *   <Popover.Trigger>Open</Popover.Trigger>
 *   <Popover.Content>Popover content here</Popover.Content>
 * </Popover>
 * ```
 *
 * @example Headless usage
 * ```tsx
 * const { isOpen, triggerProps, contentProps } = usePopover();
 * ```
 */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
