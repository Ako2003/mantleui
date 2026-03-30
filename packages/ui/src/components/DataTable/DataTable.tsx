import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { DataTableProps } from "./DataTable.types";
import { useDataTable } from "./useDataTable";
import "./DataTable.css";

function SortIcon({
  direction,
  active,
}: {
  direction: "asc" | "desc" | null;
  active: boolean;
}) {
  return (
    <span
      className={["mantle-sortIndicator", active && "mantle-sortActive"]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {direction === "asc"
        ? "\u2191"
        : direction === "desc"
          ? "\u2193"
          : "\u2195"}
    </span>
  );
}

/**
 * A data table component combining headless hook, render props, and compound structure.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: "name", header: "Name", sortable: true },
 *     { key: "email", header: "Email" },
 *     { key: "role", header: "Role", render: (row) => <Badge>{row.role}</Badge> },
 *   ]}
 *   pageSize={10}
 * />
 * ```
 */
function DataTableInner<T>(
  {
    data,
    columns,
    pageSize = 0,
    emptyState,
    color = "blue",
    className,
    ...rest
  }: DataTableProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { dataColor, colorStyle } = resolveColor(color);
  const table = useDataTable({ data, columns, pageSize });

  return (
    <div
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
      className={["mantle-wrapper", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <table className="mantle-table" role="grid">
        <thead>
          <tr>
            {table.columns.map((col) => (
              <th
                key={col.key}
                className={[
                  "mantle-headerCell",
                  col.sortable && "mantle-sortable",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-sort={
                  table.sort.column === col.key && table.sort.direction
                    ? table.sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                onClick={
                  col.sortable ? () => table.toggleSort(col.key) : undefined
                }
                onKeyDown={
                  col.sortable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          table.toggleSort(col.key);
                        }
                      }
                    : undefined
                }
                tabIndex={col.sortable ? 0 : undefined}
                role={col.sortable ? "columnheader button" : "columnheader"}
              >
                {col.header}
                {col.sortable && (
                  <SortIcon
                    direction={
                      table.sort.column === col.key
                        ? table.sort.direction
                        : null
                    }
                    active={table.sort.column === col.key}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="mantle-emptyRow">
                {emptyState ? emptyState() : "No data"}
              </td>
            </tr>
          ) : (
            table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="mantle-row">
                {table.columns.map((col) => (
                  <td key={col.key} className="mantle-cell">
                    {table.getCellValue(row, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pageSize > 0 && table.pageCount > 1 && (
        <div className="mantle-pagination" aria-label="Table pagination">
          <span>
            Page {table.page + 1} of {table.pageCount}
          </span>
          <div className="mantle-pageButtons">
            <button
              type="button"
              className="mantle-pageButton"
              onClick={table.prevPage}
              disabled={table.page === 0}
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              type="button"
              className="mantle-pageButton"
              onClick={table.nextPage}
              disabled={table.page === table.pageCount - 1}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const DataTable = forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

(DataTable as { displayName?: string }).displayName = "DataTable";
