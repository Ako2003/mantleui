import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";
import { useDataTable } from "./useDataTable";
import type { ColumnDef } from "./DataTable.types";

interface User {
  name: string;
  email: string;
  age: number;
}

const testData: User[] = [
  { name: "Alice", email: "alice@example.com", age: 30 },
  { name: "Bob", email: "bob@example.com", age: 25 },
  { name: "Charlie", email: "charlie@example.com", age: 35 },
  { name: "Diana", email: "diana@example.com", age: 28 },
  { name: "Eve", email: "eve@example.com", age: 32 },
];

const columns: ColumnDef<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (row) => <strong>{row.age}</strong>,
  },
];

describe("DataTable (component)", () => {
  describe("Rendering", () => {
    it("renders all column headers", () => {
      render(<DataTable data={testData} columns={columns} />);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
    });

    it("renders all rows", () => {
      render(<DataTable data={testData} columns={columns} />);
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Eve")).toBeInTheDocument();
    });

    it("renders custom cell via render prop", () => {
      render(<DataTable data={testData} columns={columns} />);
      const strongElements = screen.getAllByText("30");
      expect(strongElements.at(0)?.tagName).toBe("STRONG");
    });

    it("renders empty state when data is empty", () => {
      render(<DataTable data={[]} columns={columns} />);
      expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("renders custom empty state", () => {
      render(
        <DataTable
          data={[]}
          columns={columns}
          emptyState={() => "Nothing here"}
        />,
      );
      expect(screen.getByText("Nothing here")).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    it("sorts ascending on first click", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      await user.click(screen.getByText("Name"));
      const rows = screen.getAllByRole("row");
      // Header + 5 data rows; first data row should be Alice (ascending)
      expect(
        within(rows.at(1) as HTMLElement).getByText("Alice"),
      ).toBeInTheDocument();
    });

    it("sorts descending on second click", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      await user.click(screen.getByText("Name"));
      await user.click(screen.getByText("Name"));

      const rows = screen.getAllByRole("row");
      expect(
        within(rows.at(1) as HTMLElement).getByText("Eve"),
      ).toBeInTheDocument();
    });

    it("removes sort on third click", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      await user.click(screen.getByText("Name"));
      await user.click(screen.getByText("Name"));
      await user.click(screen.getByText("Name"));

      // Back to original order
      const rows = screen.getAllByRole("row");
      expect(
        within(rows.at(1) as HTMLElement).getByText("Alice"),
      ).toBeInTheDocument();
    });

    it("does not sort on non-sortable column click", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      await user.click(screen.getByText("Email"));
      // Original order preserved
      const rows = screen.getAllByRole("row");
      expect(
        within(rows.at(1) as HTMLElement).getByText("Alice"),
      ).toBeInTheDocument();
    });

    it("sets aria-sort on active column", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      await user.click(screen.getByText("Name"));
      expect(screen.getByText("Name").closest("th")).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
    });
  });

  describe("Pagination", () => {
    it("shows pagination when pageSize > 0", () => {
      render(<DataTable data={testData} columns={columns} pageSize={2} />);
      expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    });

    it("does not show pagination when all data fits", () => {
      render(<DataTable data={testData} columns={columns} pageSize={10} />);
      expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
    });

    it("navigates to next page", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} pageSize={2} />);

      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });

    it("navigates to previous page", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} pageSize={2} />);

      await user.click(screen.getByRole("button", { name: "Next page" }));
      await user.click(screen.getByRole("button", { name: "Previous page" }));
      expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    });

    it("disables Previous on first page", () => {
      render(<DataTable data={testData} columns={columns} pageSize={2} />);
      expect(
        screen.getByRole("button", { name: "Previous page" }),
      ).toBeDisabled();
    });

    it("disables Next on last page", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} pageSize={2} />);

      await user.click(screen.getByRole("button", { name: "Next page" }));
      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });
  });

  describe("Keyboard", () => {
    it("sorts on Enter key on sortable header", async () => {
      const user = userEvent.setup();
      render(<DataTable data={testData} columns={columns} />);

      const nameHeader = screen.getByText("Name");
      nameHeader.focus();
      await user.keyboard("{Enter}");

      expect(nameHeader.closest("th")).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
    });
  });
});

describe("useDataTable (headless)", () => {
  it("returns all rows when no pagination", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns }),
    );
    expect(result.current.rows).toHaveLength(5);
  });

  it("paginates correctly", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns, pageSize: 2 }),
    );
    expect(result.current.rows).toHaveLength(2);
    expect(result.current.pageCount).toBe(3);
  });

  it("toggleSort cycles asc -> desc -> null", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns }),
    );

    act(() => result.current.toggleSort("name"));
    expect(result.current.sort).toEqual({
      column: "name",
      direction: "asc",
    });

    act(() => result.current.toggleSort("name"));
    expect(result.current.sort).toEqual({
      column: "name",
      direction: "desc",
    });

    act(() => result.current.toggleSort("name"));
    expect(result.current.sort).toEqual({ column: null, direction: null });
  });

  it("goToPage navigates correctly", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns, pageSize: 2 }),
    );

    act(() => result.current.goToPage(2));
    expect(result.current.page).toBe(2);
    expect(result.current.rows).toHaveLength(1); // last page has 1 item
  });

  it("getCellValue uses render prop when available", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns }),
    );

    const ageCol = columns.find((c) => c.key === "age") as ColumnDef<User>;
    const value = result.current.getCellValue(testData[0] as User, ageCol);
    // render prop returns a ReactElement, not a string
    expect(value).not.toBe("30");
  });

  it("getCellValue falls back to string for non-render columns", () => {
    const { result } = renderHook(() =>
      useDataTable({ data: testData, columns }),
    );

    const emailCol = columns.find((c) => c.key === "email") as ColumnDef<User>;
    const value = result.current.getCellValue(testData[0] as User, emailCol);
    expect(value).toBe("alice@example.com");
  });
});
