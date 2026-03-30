import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { LinkProps } from "./Link.types";
import "./Link.css";

/**
 * Styled anchor with color and external link support.
 *
 * @example
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="https://example.com" external>Example</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    color = "blue",
    external = false,
    underline = "hover",
    className,
    children,
    ...rest
  },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  return (
    <a
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
      className={[
        "mantle-link",
        `mantle-link-underline-${underline}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...rest}
    >
      {children}
      {external && (
        <svg
          className="mantle-link-external-icon"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M6.5 3.5h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" />
          <path d="M9.5 2.5h4v4" />
          <path d="M13.5 2.5 8 8" />
        </svg>
      )}
    </a>
  );
});

Link.displayName = "Link";
