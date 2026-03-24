"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const data = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Engineer", age: 30 },
    { name: "Bob Smith", email: "bob@example.com", role: "Designer", age: 25 },
    { name: "Charlie Brown", email: "charlie@example.com", role: "Manager", age: 35 },
    { name: "Diana Prince", email: "diana@example.com", role: "Engineer", age: 28 },
    { name: "Eve Wilson", email: "eve@example.com", role: "Designer", age: 32 },
    { name: "Frank Miller", email: "frank@example.com", role: "Manager", age: 40 },
  ];

  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", sortable: true },
    {
      key: "age",
      header: "Age",
      sortable: true,
      render: (row) => (
        <span style={{
          padding: "2px 8px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 500,
          background: row.age >= 30 ? "#dbeafe" : "#dcfce7",
          color: row.age >= 30 ? "#1d4ed8" : "#16a34a",
        }}>
          {row.age}
        </span>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} pageSize={4} />;
}

render(<Demo />);`;

const dataTableProps = [
  { name: "data", type: "T[]", description: "Array of data rows." },
  {
    name: "columns",
    type: "ColumnDef<T>[]",
    description: "Column definitions.",
  },
  {
    name: "pageSize",
    type: "number",
    default: "0",
    description: "Rows per page. Set to 0 for no pagination.",
  },
  {
    name: "emptyState",
    type: "() => ReactNode",
    description: "Render prop for empty state.",
  },
];

export default function DataTablePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DataTable</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        The most advanced component — combines render props for custom cell
        rendering, a headless{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          useDataTable()
        </code>{" "}
        hook for sorting/pagination state, and compound pagination controls.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Full Example</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Click column headers to sort. The Age column uses a custom render prop
        for styled badges.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dataTableProps} />
    </div>
  );
}
