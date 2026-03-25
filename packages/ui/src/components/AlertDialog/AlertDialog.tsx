import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogProps,
} from "./AlertDialog.types";
import "./AlertDialog.css";

const AlertDialogContext = createContext<{
  onClose: () => void;
} | null>(null);

function useAlertDialogContext() {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error(
      "AlertDialog compound components must be used within <AlertDialog>",
    );
  }
  return ctx;
}

/* ─── Root ─── */

function AlertDialogRoot({ open, onOpenChange, children }: AlertDialogProps) {
  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <AlertDialogContext.Provider value={{ onClose }}>
      {children}
    </AlertDialogContext.Provider>,
    document.body,
  );
}

/* ─── Content ─── */

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  function AlertDialogContent(
    { title, description, children, className, ...rest },
    ref,
  ) {
    const { onClose } = useAlertDialogContext();
    const contentRef = useRef<HTMLDivElement>(null);

    // Focus trap — focus the dialog on mount
    useEffect(() => {
      contentRef.current?.focus();
    }, []);

    // Close on overlay click
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    };

    return (
      <>
        <div className="mantle-alertdialog-overlay" />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="mantle-alertdialog-positioner"
          onClick={handleOverlayClick}
        >
          <div
            ref={(node) => {
              (
                contentRef as React.MutableRefObject<HTMLDivElement | null>
              ).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref)
                (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                  node;
            }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="mantle-alertdialog-title"
            aria-describedby={
              description ? "mantle-alertdialog-desc" : undefined
            }
            tabIndex={-1}
            className={["mantle-alertdialog", className]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          >
            <h2
              id="mantle-alertdialog-title"
              className="mantle-alertdialog-title"
            >
              {title}
            </h2>
            {description && (
              <p
                id="mantle-alertdialog-desc"
                className="mantle-alertdialog-description"
              >
                {description}
              </p>
            )}
            <div className="mantle-alertdialog-actions">{children}</div>
          </div>
        </div>
      </>
    );
  },
);

/* ─── Action ─── */

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  function AlertDialogAction(
    { color = "red", className, children, onClick, ...rest },
    ref,
  ) {
    const { onClose } = useAlertDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) onClose();
    };

    return (
      <button
        ref={ref}
        type="button"
        data-color={color}
        className={["mantle-alertdialog-action", className]
          .filter(Boolean)
          .join(" ")}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

/* ─── Cancel ─── */

const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  function AlertDialogCancel({ className, children, onClick, ...rest }, ref) {
    const { onClose } = useAlertDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) onClose();
    };

    return (
      <button
        ref={ref}
        type="button"
        className={["mantle-alertdialog-cancel", className]
          .filter(Boolean)
          .join(" ")}
        onClick={handleClick}
        {...rest}
      >
        {children ?? "Cancel"}
      </button>
    );
  },
);

/**
 * A modal dialog for destructive confirmations. Requires explicit user action.
 *
 * @example
 * ```tsx
 * <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
 *   <AlertDialog.Content title="Delete item?" description="This cannot be undone.">
 *     <AlertDialog.Cancel />
 *     <AlertDialog.Action onClick={handleDelete}>Delete</AlertDialog.Action>
 *   </AlertDialog.Content>
 * </AlertDialog>
 * ```
 */
export const AlertDialog = Object.assign(AlertDialogRoot, {
  Content: AlertDialogContent,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
