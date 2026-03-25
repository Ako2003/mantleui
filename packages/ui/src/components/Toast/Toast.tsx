import type { ToastProps, ToasterProps } from "./Toast.types";
import { useToast } from "./useToast";
import "./Toast.css";

const variantClassMap: Record<string, string> = {
  info: "mantle-toastInfo",
  success: "mantle-toastSuccess",
  warning: "mantle-toastWarning",
  error: "mantle-toastError",
};

const positionClassMap: Record<string, string> = {
  "top-right": "mantle-toasterTopRight",
  "top-left": "mantle-toasterTopLeft",
  "bottom-right": "mantle-toasterBottomRight",
  "bottom-left": "mantle-toasterBottomLeft",
};

function ToastIcon({ variant }: { variant: string }) {
  const svgProps = {
    className: "mantle-toastIcon",
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (variant === "error") {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );
  }

  const paths: Record<string, string> = {
    info: "M12 16v-4m0-4h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z",
    success: "M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z",
    warning: "M12 9v2m0 4h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z",
  };

  return (
    <svg {...svgProps}>
      <path d={paths[variant] ?? paths.info} />
    </svg>
  );
}

function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div
      className={["mantle-toast", variantClassMap[toast.variant]]
        .filter(Boolean)
        .join(" ")}
      role="alert"
    >
      <ToastIcon variant={toast.variant} />
      <div className="mantle-toastContent">
        {toast.title && <div className="mantle-toastTitle">{toast.title}</div>}
        {toast.description && (
          <div className="mantle-toastDescription">{toast.description}</div>
        )}
      </div>
      <button
        type="button"
        className="mantle-toastDismiss"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Renders all active toasts. Place this once in your app layout.
 *
 * @example
 * ```tsx
 * <Toaster position="bottom-right" />
 * ```
 */
export function Toaster({ position = "bottom-right" }: ToasterProps) {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className={["mantle-toaster", positionClassMap[position]]
        .filter(Boolean)
        .join(" ")}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}
