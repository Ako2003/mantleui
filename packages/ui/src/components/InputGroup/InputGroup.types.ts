import type { HTMLAttributes, ReactNode } from "react";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** The input and addon children. */
  children: ReactNode;
}

export interface InputGroupAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /** The addon content (e.g. "$", ".com"). */
  children: ReactNode;
}
