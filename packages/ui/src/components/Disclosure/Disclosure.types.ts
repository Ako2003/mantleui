import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface DisclosureProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled mode. Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Unique value for use within a DisclosureGroup. */
  value?: string;
  children: ReactNode;
}

export type DisclosureTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type DisclosureContentProps = HTMLAttributes<HTMLDivElement>;
