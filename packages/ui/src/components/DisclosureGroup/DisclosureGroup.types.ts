import type { HTMLAttributes, ReactNode } from "react";

export interface DisclosureGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether multiple disclosures can be open at once. Defaults to `false`. */
  allowMultiple?: boolean;
  children: ReactNode;
}
