import type { HTMLAttributes, ReactNode } from "react";

export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the modal should open or close. */
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export type ModalHeaderProps = HTMLAttributes<HTMLDivElement>;

export type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;
