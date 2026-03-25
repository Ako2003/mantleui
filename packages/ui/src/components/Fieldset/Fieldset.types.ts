import type { FieldsetHTMLAttributes, ReactNode } from "react";

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Optional legend text displayed at the top of the fieldset. */
  legend?: string;
  /** Whether the fieldset and its contents are disabled. */
  disabled?: boolean;
  /** The fieldset content. */
  children?: ReactNode;
}
