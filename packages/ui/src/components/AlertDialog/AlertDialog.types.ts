import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface AlertDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog should close. */
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Title displayed at the top. */
  title: string;
  /** Description text below the title. */
  description?: string;
}

export interface AlertDialogActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Accent color for the action button. Defaults to `"red"`. */
  color?: MantleColor;
}

export type AlertDialogCancelProps = HTMLAttributes<HTMLButtonElement>;
