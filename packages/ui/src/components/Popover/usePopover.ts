import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
 *   <div style={{ position: "relative" }}>
 *     <button {...triggerProps}>Open</button>
 *     {isOpen && <div {...contentProps}>Content</div>}
 *   </div>
 * );
 * ```
 */
export function usePopover({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  portal = false,
}: UsePopoverOptions = {}): UsePopoverReturn {
  const [isOpen, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});

  const openPopover = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closePopover = useCallback(() => setIsOpen(false), [setIsOpen]);
  const togglePopover = useCallback(
    () => setIsOpen((prev: boolean) => !prev),
    [setIsOpen],
  );

  // Calculate fixed position when using portal mode (useLayoutEffect to avoid jump)
  useLayoutEffect(() => {
    if (!portal || !isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const gap = 8;
      const style: React.CSSProperties = { position: "fixed" };

      if (placement.startsWith("bottom")) {
        style.top = rect.bottom + gap;
      } else if (placement.startsWith("top")) {
        style.bottom = window.innerHeight - rect.top + gap;
      } else if (placement.startsWith("left")) {
        style.right = window.innerWidth - rect.left + gap;
      } else if (placement.startsWith("right")) {
        style.left = rect.right + gap;
      }

      if (placement === "bottom" || placement === "top") {
        style.left = rect.left + rect.width / 2;
        style.transform = "translateX(-50%)";
      } else if (placement === "bottom-start" || placement === "top-start") {
        style.left = rect.left;
      } else if (placement === "bottom-end" || placement === "top-end") {
        style.right = window.innerWidth - rect.right;
      }

      if (placement === "left" || placement === "right") {
        style.top = rect.top + rect.height / 2;
        style.transform = "translateY(-50%)";
      } else if (placement === "left-start" || placement === "right-start") {
        style.top = rect.top;
      } else if (placement === "left-end" || placement === "right-end") {
        style.bottom = window.innerHeight - rect.bottom;
      }

      setPortalStyle(style);
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [portal, isOpen, placement]);

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

  // Relative placement styles (non-portal)
  const relativePlacement: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)" },
    "top-start": { bottom: "100%", left: "0" },
    "top-end": { bottom: "100%", right: "0" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)" },
    "bottom-start": { top: "100%", left: "0" },
    "bottom-end": { top: "100%", right: "0" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)" },
    "left-start": { right: "100%", top: "0" },
    "left-end": { right: "100%", bottom: "0" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)" },
    "right-start": { left: "100%", top: "0" },
    "right-end": { left: "100%", bottom: "0" },
  };

  const contentStyle: React.CSSProperties = portal
    ? portalStyle
    : { position: "absolute", ...relativePlacement[placement] };

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
      style: contentStyle,
    },
  };
}
