import type { HTMLAttributes } from "react";

export interface FieldErrorProps extends HTMLAttributes<HTMLSpanElement> {
  /** The error message to display. When falsy, nothing is rendered. */
  error?: string;
}
