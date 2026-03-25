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
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "./Modal.types";
import "./Modal.css";

const ModalContext = createContext<{
  onClose: () => void;
} | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal compound components must be used within <Modal>");
  }
  return ctx;
}

/* ─── Root ─── */

function ModalRoot({ open, onOpenChange, children }: ModalProps) {
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

  // Lock body scroll when open
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
    <ModalContext.Provider value={{ onClose }}>
      {children}
    </ModalContext.Provider>,
    document.body,
  );
}

/* ─── Content ─── */

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ children, className, ...rest }, ref) {
    const { onClose } = useModalContext();
    const contentRef = useRef<HTMLDivElement>(null);

    // Focus the dialog on mount
    useEffect(() => {
      contentRef.current?.focus();
    }, []);

    // Close on overlay click
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    };

    return (
      <>
        <div className="mantle-modal-overlay" />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="mantle-modal-positioner" onClick={handleOverlayClick}>
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
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={["mantle-modal", className].filter(Boolean).join(" ")}
            {...rest}
          >
            {children}
          </div>
        </div>
      </>
    );
  },
);

/* ─── Header ─── */

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={["mantle-modal-header", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ─── Body ─── */

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={["mantle-modal-body", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});

/* ─── Footer ─── */

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={["mantle-modal-footer", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ─── Compound Export ─── */

/**
 * A general-purpose modal dialog component.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Content>
 *     <Modal.Header>Title</Modal.Header>
 *     <Modal.Body>Content goes here</Modal.Body>
 *     <Modal.Footer>
 *       <button onClick={() => setIsOpen(false)}>Close</button>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal>
 * ```
 */
export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
