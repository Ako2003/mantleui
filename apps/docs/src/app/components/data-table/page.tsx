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

const usersExample = `function Demo() {
  const users = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "2024-01-15" },
    { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", joined: "2024-02-20" },
    { name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Inactive", joined: "2023-11-05" },
    { name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", joined: "2024-03-10" },
    { name: "Eve Wilson", email: "eve@example.com", role: "Editor", status: "Pending", joined: "2024-04-01" },
    { name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "Active", joined: "2023-09-18" },
    { name: "Grace Lee", email: "grace@example.com", role: "Editor", status: "Active", joined: "2024-01-22" },
    { name: "Hank Davis", email: "hank@example.com", role: "Viewer", status: "Inactive", joined: "2023-07-30" },
  ];

  const statusColors = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Inactive: { bg: "#fee2e2", color: "#dc2626" },
    Pending: { bg: "#fef9c3", color: "#ca8a04" },
  };

  const columns = [
    {
      key: "name",
      header: "User",
      sortable: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar name={row.name} size="sm" />
          <div>
            <div style={{ fontWeight: 500, color: "var(--mantle-color-text)" }}>{row.name}</div>
            <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => (
        <Badge variant="outline" size="sm">{row.role}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => {
        const s = statusColors[row.status] || statusColors.Active;
        return (
          <span style={{
            padding: "2px 10px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 500,
            background: s.bg,
            color: s.color,
          }}>
            {row.status}
          </span>
        );
      },
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
    },
  ];

  return <DataTable data={users} columns={columns} pageSize={5} />;
}

render(<Demo />);`;

const productsExample = `function Demo() {
  const products = [
    { name: "MacBook Pro", category: "Laptop", price: 2499, stock: 12, rating: 4.8 },
    { name: "iPhone 15 Pro", category: "Phone", price: 1199, stock: 45, rating: 4.7 },
    { name: "AirPods Max", category: "Audio", price: 549, stock: 8, rating: 4.5 },
    { name: "iPad Air", category: "Tablet", price: 799, stock: 23, rating: 4.6 },
    { name: "Apple Watch", category: "Watch", price: 399, stock: 67, rating: 4.4 },
    { name: "Mac Mini", category: "Desktop", price: 599, stock: 31, rating: 4.3 },
    { name: "Studio Display", category: "Monitor", price: 1599, stock: 5, rating: 4.2 },
    { name: "Magic Keyboard", category: "Accessory", price: 299, stock: 89, rating: 4.1 },
  ];

  const columns = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      render: (row) => (
        <span style={{ fontWeight: 500, color: "var(--mantle-color-text)" }}>{row.name}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => (
        <Chip variant="outline" size="sm">{row.category}</Chip>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (row) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {"$"}{row.price.toLocaleString()}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (row) => (
        <span style={{
          color: row.stock < 10 ? "#ef4444" : row.stock < 30 ? "#eab308" : "#22c55e",
          fontWeight: 500,
        }}>
          {row.stock} units
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Star size={14} style={{ color: "#eab308" }} fill="#eab308" />
          <span style={{ fontWeight: 500 }}>{row.rating}</span>
        </div>
      ),
    },
  ];

  return <DataTable data={products} columns={columns} pageSize={5} color="purple" />;
}

render(<Demo />);`;

const emptyStateExample = `function Demo() {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <DataTable
      data={[]}
      columns={columns}
      emptyState={() => (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Search size={32} style={{ color: "var(--mantle-color-text-muted)", margin: "0 auto 12px" }} />
          <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--mantle-color-text)" }}>
            No results found
          </p>
          <p style={{ fontSize: "14px", color: "var(--mantle-color-text-muted)", marginTop: "4px" }}>
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    />
  );
}

render(<Demo />);`;

const transactionsExample = `function Demo() {
  const transactions = [
    { id: "TXN-001", desc: "Subscription Payment", amount: -49.99, date: "2024-03-15", method: "Credit Card" },
    { id: "TXN-002", desc: "Refund", amount: 29.99, date: "2024-03-14", method: "PayPal" },
    { id: "TXN-003", desc: "API Usage", amount: -12.50, date: "2024-03-13", method: "Credit Card" },
    { id: "TXN-004", desc: "Team Upgrade", amount: -99.00, date: "2024-03-12", method: "Bank Transfer" },
    { id: "TXN-005", desc: "Bonus Credit", amount: 50.00, date: "2024-03-11", method: "System" },
    { id: "TXN-006", desc: "Storage Add-on", amount: -5.99, date: "2024-03-10", method: "Credit Card" },
  ];

  const columns = [
    {
      key: "id",
      header: "ID",
      render: (row) => (
        <span style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>
          {row.id}
        </span>
      ),
    },
    {
      key: "desc",
      header: "Description",
      sortable: true,
      render: (row) => (
        <span style={{ fontWeight: 500, color: "var(--mantle-color-text)" }}>{row.desc}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (row) => (
        <span style={{
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          color: row.amount >= 0 ? "#22c55e" : "#ef4444",
        }}>
          {row.amount >= 0 ? "+" : ""}{"$"}{Math.abs(row.amount).toFixed(2)}
        </span>
      ),
    },
    { key: "date", header: "Date", sortable: true },
    {
      key: "method",
      header: "Method",
      render: (row) => (
        <Badge variant="outline" size="sm">{row.method}</Badge>
      ),
    },
  ];

  return <DataTable data={transactions} columns={columns} pageSize={4} color="green" />;
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
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for sort indicators and focus rings.",
  },
];

export default function DataTablePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DataTable</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        The most advanced component — combines render props for custom cell
        rendering, a headless{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useDataTable()
        </code>{" "}
        hook for sorting/pagination state, and compound pagination controls.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Full Example</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click column headers to sort. The Age column uses a custom render prop
        for styled badges.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">User Management</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Avatars, role badges, colored status pills, and pagination.
      </p>
      <div className="mt-4">
        <LivePlayground code={usersExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Product Catalog</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Category chips, formatted prices, stock levels with color coding, and
        star ratings.
      </p>
      <div className="mt-4">
        <LivePlayground code={productsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Transactions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Financial table with monospace IDs, colored amounts (green for credits,
        red for debits), and payment method badges.
      </p>
      <div className="mt-4">
        <LivePlayground code={transactionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Empty State</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Custom empty state with icon and message when no data is available.
      </p>
      <div className="mt-4">
        <LivePlayground code={emptyStateExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dataTableProps} />
    </div>
  );
}
