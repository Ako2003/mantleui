import type { ReactNode } from "react";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title?: string;
  description?: ReactNode;
  duration?: number;
}

export interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

export interface ToasterProps {
  /** Where toasts appear on screen. Defaults to `"bottom-right"`. */
  position?: ToastPosition;
}
