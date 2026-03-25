import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "color" | "onChange"
> {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when a page is selected. */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show around the current page. Defaults to `1`. */
  siblingCount?: number;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Additional class name. */
  className?: string;
}
