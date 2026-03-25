import type { HTMLAttributes, ReactNode } from "react";

export interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** The description content. */
  children?: ReactNode;
}
