import { forwardRef, useCallback, useEffect, useRef } from "react";
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

  if (!open) return null;

  // Close on overlay click
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="mantle-drawer-overlay" onClick={handleOverlayClick} />
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
        className={[`mantle-drawer mantle-drawer--${side}`, className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});
