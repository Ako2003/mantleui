import { forwardRef, useMemo } from "react";
import { resolveColor } from "../../utils";
import type { PaginationProps } from "./Pagination.types";
import "./Pagination.css";

function buildPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis-start" | "ellipsis-end")[] {
  const totalSlots = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 2);
  const rightSibling = Math.min(page + siblingCount, totalPages - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | "ellipsis-start" | "ellipsis-end")[] = [1];

  if (showLeftEllipsis) {
    items.push("ellipsis-start");
  } else {
    for (let i = 2; i < leftSibling; i++) {
      items.push(i);
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    items.push(i);
  }

  if (showRightEllipsis) {
    items.push("ellipsis-end");
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      items.push(i);
    }
  }

  items.push(totalPages);

  return items;
}

/**
 * Page navigation controls with first, previous, page numbers, next, and last buttons.
 *
 * @example
 * ```tsx
 * <Pagination page={3} totalPages={10} onPageChange={setPage} />
 * ```
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      totalPages,
      onPageChange,
      siblingCount = 1,
      color = "blue",
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const items = useMemo(
      () => buildPageRange(page, totalPages, siblingCount),
      [page, totalPages, siblingCount],
    );

    const isFirst = page <= 1;
    const isLast = page >= totalPages;

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        data-color={dataColor}
        style={colorStyle}
        className={["mantle-pagination", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <button
          type="button"
          className="mantle-paginationButton"
          disabled={isFirst}
          aria-label="First page"
          onClick={() => onPageChange(1)}
        >
          &laquo;
        </button>
        <button
          type="button"
          className="mantle-paginationButton"
          disabled={isFirst}
          aria-label="Previous page"
          onClick={() => onPageChange(page - 1)}
        >
          &lsaquo;
        </button>

        {items.map((item) => {
          if (typeof item === "string") {
            return (
              <span key={item} className="mantle-paginationEllipsis">
                &hellip;
              </span>
            );
          }

          const isActive = item === page;
          return (
            <button
              key={item}
              type="button"
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${item}`}
              className={[
                "mantle-paginationButton",
                isActive ? "mantle-paginationButton-active" : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          className="mantle-paginationButton"
          disabled={isLast}
          aria-label="Next page"
          onClick={() => onPageChange(page + 1)}
        >
          &rsaquo;
        </button>
        <button
          type="button"
          className="mantle-paginationButton"
          disabled={isLast}
          aria-label="Last page"
          onClick={() => onPageChange(totalPages)}
        >
          &raquo;
        </button>
      </nav>
    );
  },
);
