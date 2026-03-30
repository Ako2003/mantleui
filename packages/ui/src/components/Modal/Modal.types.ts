import type { HTMLAttributes, ReactNode } from "react";

export type ModalBackdrop = "opaque" | "blur" | "transparent";

export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the modal should open or close. */
  onOpenChange: (open: boolean) => void;
  /** Backdrop style. Defaults to `"opaque"`. */
  backdrop?: ModalBackdrop;
  children: ReactNode;
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export type ModalHeaderProps = HTMLAttributes<HTMLDivElement>;

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;
