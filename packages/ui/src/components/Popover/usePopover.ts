import { useCallback, useEffect, useRef } from "react";
import { useControllable } from "../../hooks";
import type { UsePopoverOptions, UsePopoverReturn } from "./Popover.types";

/**
 * Headless hook for popover behavior. Use this when you need full control
 * over rendering, or use the `<Popover>` compound component for convenience.
 *
 * @example
 * ```tsx
 * const { isOpen, triggerProps, contentProps } = usePopover();
 *
 * return (
 *   <>
 *     <button {...triggerProps}>Open</button>
 *     {isOpen && <div {...contentProps}>Content</div>}
 *   </>
 * );
 * ```
 */
export function usePopover({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
}: UsePopoverOptions = {}): UsePopoverReturn {
  const [isOpen, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const openPopover = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closePopover = useCallback(() => setIsOpen(false), [setIsOpen]);
  const togglePopover = useCallback(
    () => setIsOpen((prev: boolean) => !prev),
    [setIsOpen],
  );

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopover();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePopover]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return;
      }
      closePopover();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closePopover]);

  const placementStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)" },
  };

  return {
    isOpen,
    open: openPopover,
    close: closePopover,
    toggle: togglePopover,
    triggerProps: {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
      },
      "aria-expanded": isOpen,
      "aria-haspopup": "dialog" as const,
      onClick: togglePopover,
    },
    contentProps: {
      ref: (node: HTMLElement | null) => {
        contentRef.current = node;
      },
      role: "dialog" as const,
      style: {
        position: "absolute",
        ...placementStyles[placement],
      },
    },
  };
}
