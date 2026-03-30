import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { DrawerProps } from "./Drawer.types";
import "./Drawer.css";

/**
 * A slide-in panel from the edge of the screen.
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onOpenChange={setIsOpen} side="right">
 *   <p>Drawer content</p>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open, onOpenChange, side = "right", className, children, ...rest },
  ref,
) {
  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  // Handle open/close transitions
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      // Start closing animation
      setClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 250); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus on mount
  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  return createPortal(
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={[
          "mantle-drawer-overlay",
          closing && "mantle-drawer-overlay-closing",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleOverlayClick}
      />
      <div
        ref={(node) => {
          (panelRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={[
          `mantle-drawer mantle-drawer--${side}`,
          closing && `mantle-drawer--${side}-closing`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    </>,
    document.body,
  );
});
