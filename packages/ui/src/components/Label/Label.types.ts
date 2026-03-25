import type { LabelHTMLAttributes, ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** The id of the form element the label is associated with. */
  htmlFor?: string;
  /** Whether the associated field is required. Shows a red asterisk indicator. */
  required?: boolean;
  /** Whether the label appears disabled. */
  disabled?: boolean;
  /** The label content. */
  children?: ReactNode;
}
