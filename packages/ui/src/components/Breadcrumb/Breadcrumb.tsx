import { forwardRef } from "react";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbSeparatorProps,
} from "./Breadcrumb.types";
import "./Breadcrumb.css";

/* ─── Root ─── */

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  function BreadcrumbRoot({ className, children, ...rest }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={["mantle-breadcrumb", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </nav>
    );
  },
);

/* ─── List ─── */

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, ...rest }, ref) {
    return (
      <ol
        ref={ref}
        className={["mantle-breadcrumbList", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </ol>
    );
  },
);

/* ─── Item ─── */

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, children, ...rest }, ref) {
    return (
      <li
        ref={ref}
        className={["mantle-breadcrumbItem", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </li>
    );
  },
);

/* ─── Link ─── */

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ href, active, className, children, ...rest }, ref) {
    if (active) {
      return (
        <span
          aria-current="page"
          className={["mantle-breadcrumbActive", className]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={["mantle-breadcrumbLink", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

/* ─── Separator ─── */

const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator({ children = "/", className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={["mantle-breadcrumbSeparator", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
});

/* ─── Compound Export ─── */

/**
 * A breadcrumb navigation component using compound components.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <Breadcrumb.List>
 *     <Breadcrumb.Item>
 *       <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
 *     </Breadcrumb.Item>
 *     <Breadcrumb.Item>
 *       <Breadcrumb.Separator />
 *       <Breadcrumb.Link active>Current</Breadcrumb.Link>
 *     </Breadcrumb.Item>
 *   </Breadcrumb.List>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
});
