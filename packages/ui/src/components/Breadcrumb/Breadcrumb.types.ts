import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Additional class name. */
  className?: string;
}

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  /** Additional class name. */
  className?: string;
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Additional class name. */
  className?: string;
}

export interface BreadcrumbLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  /** The URL the link points to. */
  href?: string;
  /** Whether this is the current/active page. */
  active?: boolean;
  /** Additional class name. */
  className?: string;
  /** Link content. */
  children?: ReactNode;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  /** Custom separator content. Defaults to "/". */
  children?: ReactNode;
}
