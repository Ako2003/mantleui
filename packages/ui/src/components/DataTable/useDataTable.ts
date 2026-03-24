import { useCallback, useMemo, useState } from "react";
import type {
  ColumnDef,
  SortState,
  UseDataTableOptions,
  UseDataTableReturn,
} from "./DataTable.types";

/**
 * Headless hook for data table state: sorting and pagination.
 *
 * @example
 * ```tsx
 * const { rows, columns, sort, toggleSort, page, pageCount, nextPage, prevPage } =
 *   useDataTable({ data: users, columns: columnDefs, pageSize: 10 });
 * ```
 */
export function useDataTable<T>({
  data,
  columns,
  pageSize = 0,
}: UseDataTableOptions<T>): UseDataTableReturn<T> {
  const [sort, setSort] = useState<SortState>({
    column: null,
    direction: null,
  });
  const [page, setPage] = useState(0);

  const toggleSort = useCallback(
    (columnKey: string) => {
      const col = columns.find((c) => c.key === columnKey);
      if (!col?.sortable) return;

      setSort((prev) => {
        if (prev.column !== columnKey) {
          return { column: columnKey, direction: "asc" };
        }
        if (prev.direction === "asc") {
          return { column: columnKey, direction: "desc" };
        }
        return { column: null, direction: null };
      });
      setPage(0);
    },
    [columns],
  );

  const sortedData = useMemo(() => {
    if (!sort.column || !sort.direction) return data;

    const key = sort.column;
    const dir = sort.direction === "asc" ? 1 : -1;

    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[key];
      const bVal = (b as Record<string, unknown>)[key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * dir;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * dir;
      }
      return String(aVal).localeCompare(String(bVal)) * dir;
    });
  }, [data, sort]);

  const pageCount =
    pageSize > 0 ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;

  const rows = useMemo(() => {
    if (pageSize <= 0) return sortedData;
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, pageCount - 1));
  }, [pageCount]);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 0));
  }, []);

  const goToPage = useCallback(
    (target: number) => {
      setPage(Math.max(0, Math.min(target, pageCount - 1)));
    },
    [pageCount],
  );

  const getCellValue = useCallback((row: T, column: ColumnDef<T>) => {
    if (column.render) return column.render(row);
    return String((row as Record<string, unknown>)[column.key] ?? "");
  }, []);

  return {
    rows,
    columns,
    sort,
    toggleSort,
    page,
    pageCount,
    nextPage,
    prevPage,
    goToPage,
    getCellValue,
  };
}
