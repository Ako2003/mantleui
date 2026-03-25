import type { HTMLAttributes, ReactNode } from "react";

export interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  /** The error message content. */
  children?: ReactNode;
}
