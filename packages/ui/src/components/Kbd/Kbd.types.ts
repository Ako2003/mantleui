import type { HTMLAttributes, ReactNode } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** The key text to display. */
  children?: ReactNode;
}
