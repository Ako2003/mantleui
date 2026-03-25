import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** The type of alert. */
  variant?: AlertVariant;
  /** Alert title text. */
  title?: string;
  /** Alert description content. */
  children?: ReactNode;
  /** Callback when the dismiss button is clicked. Shows a close button when set. */
  onDismiss?: () => void;
}
