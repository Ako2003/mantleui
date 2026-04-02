import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface ColumnDef<T> {
  /** Unique key for this column, used for sorting. */
  key: string;
  /** Column header label. */
  header: string;
  /** Whether this column is sortable. Defaults to `false`. */
  sortable?: boolean;
  /** Custom cell renderer. Receives the row data. */
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> extends HTMLAttributes<HTMLDivElement> {
  /** Array of data rows. */
  data: T[];
  /** Column definitions. */
  columns: ColumnDef<T>[];
  /** Number of rows per page. Set to `0` for no pagination. Defaults to `0`. */
  pageSize?: number;
  /** Render prop for empty state. */
  emptyState?: () => ReactNode;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Visual variant. Defaults to `"default"`. */
  variant?: "default" | "striped" | "minimal" | "bordered";
  /** Row density. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
}

export interface UseDataTableOptions<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
}

export interface UseDataTableReturn<T> {
  /** The current page of rows (sorted and paginated). */
  rows: T[];
  /** All columns. */
  columns: ColumnDef<T>[];
  /** Current sort state. */
  sort: SortState;
  /** Toggle sort on a column. */
  toggleSort: (columnKey: string) => void;
  /** Current page index (0-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Go to the next page. */
  nextPage: () => void;
  /** Go to the previous page. */
  prevPage: () => void;
  /** Go to a specific page. */
  goToPage: (page: number) => void;
  /** Get the display value for a cell. */
  getCellValue: (row: T, column: ColumnDef<T>) => ReactNode;
}
