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
    { name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/40?img=1", role: "Admin", status: "Active", joined: "2024-01-15" },
    { name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/40?img=3", role: "Editor", status: "Active", joined: "2024-02-20" },
    { name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/40?img=8", role: "Viewer", status: "Inactive", joined: "2023-11-05" },
    { name: "Diana Prince", email: "diana@example.com", avatar: "https://i.pravatar.cc/40?img=5", role: "Admin", status: "Active", joined: "2024-03-10" },
    { name: "Eve Wilson", email: "eve@example.com", avatar: "https://i.pravatar.cc/40?img=9", role: "Editor", status: "Pending", joined: "2024-04-01" },
    { name: "Frank Miller", email: "frank@example.com", avatar: "https://i.pravatar.cc/40?img=11", role: "Viewer", status: "Active", joined: "2023-09-18" },
    { name: "Grace Lee", email: "grace@example.com", avatar: "https://i.pravatar.cc/40?img=20", role: "Editor", status: "Active", joined: "2024-01-22" },
    { name: "Hank Davis", email: "hank@example.com", avatar: "https://i.pravatar.cc/40?img=14", role: "Viewer", status: "Inactive", joined: "2023-07-30" },
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
          <Avatar name={row.name} src={row.avatar} size="sm" />
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

const taskTrackerExample = `function Demo() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Design landing page", assignee: "Alice", avatar: "https://i.pravatar.cc/40?img=1", priority: "High", status: "In Progress", due: "Apr 5" },
    { id: 2, title: "Fix login bug", assignee: "Bob", avatar: "https://i.pravatar.cc/40?img=3", priority: "Critical", status: "Open", due: "Apr 3" },
    { id: 3, title: "Write API docs", assignee: "Charlie", avatar: "https://i.pravatar.cc/40?img=8", priority: "Medium", status: "Done", due: "Apr 1" },
    { id: 4, title: "Deploy to staging", assignee: "Diana", avatar: "https://i.pravatar.cc/40?img=5", priority: "High", status: "In Review", due: "Apr 4" },
    { id: 5, title: "Update dependencies", assignee: "Eve", avatar: "https://i.pravatar.cc/40?img=9", priority: "Low", status: "Open", due: "Apr 10" },
    { id: 6, title: "Add dark mode", assignee: "Frank", avatar: "https://i.pravatar.cc/40?img=11", priority: "Medium", status: "In Progress", due: "Apr 8" },
    { id: 7, title: "Write unit tests", assignee: "Alice", avatar: "https://i.pravatar.cc/40?img=1", priority: "High", status: "Open", due: "Apr 6" },
    { id: 8, title: "Optimize images", assignee: "Bob", avatar: "https://i.pravatar.cc/40?img=3", priority: "Low", status: "Done", due: "Mar 28" },
  ]);

  const priorityColors = { Critical: "red", High: "yellow", Medium: "blue", Low: "neutral" };
  const statusIcons = { Open: "circle", "In Progress": "loader", "In Review": "eye", Done: "check" };

  const columns = [
    {
      key: "title",
      header: "Task",
      sortable: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox defaultChecked={row.status === "Done"} />
          <span style={{ fontWeight: 500, color: "var(--mantle-color-text)", textDecoration: row.status === "Done" ? "line-through" : "none", opacity: row.status === "Done" ? 0.6 : 1 }}>{row.title}</span>
        </div>
      ),
    },
    {
      key: "assignee",
      header: "Assignee",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Avatar name={row.assignee} src={row.avatar} size="sm" />
          <span style={{ fontSize: "13px" }}>{row.assignee}</span>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      sortable: true,
      render: (row) => <Badge color={priorityColors[row.priority]} variant="solid" size="sm">{row.priority}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => <Chip variant="outline" size="sm">{row.status}</Chip>,
    },
    { key: "due", header: "Due", sortable: true },
  ];

  return <DataTable data={tasks} columns={columns} pageSize={5} color="blue" />;
}

render(<Demo />);`;

const analyticsExample = `function Demo() {
  const pages = [
    { page: "/", views: 12847, visitors: 8421, bounce: 24.3, duration: "3m 12s" },
    { page: "/pricing", views: 8392, visitors: 6103, bounce: 31.2, duration: "2m 45s" },
    { page: "/docs", views: 6721, visitors: 4892, bounce: 18.7, duration: "5m 33s" },
    { page: "/blog", views: 5103, visitors: 3891, bounce: 42.1, duration: "1m 58s" },
    { page: "/about", views: 3247, visitors: 2841, bounce: 38.5, duration: "1m 22s" },
    { page: "/contact", views: 1892, visitors: 1567, bounce: 52.3, duration: "0m 48s" },
  ];

  const columns = [
    {
      key: "page",
      header: "Page",
      sortable: true,
      render: (row) => (
        <span style={{ fontFamily: "monospace", fontSize: "13px", color: "var(--mantle-accent)" }}>{row.page}</span>
      ),
    },
    {
      key: "views",
      header: "Views",
      sortable: true,
      render: (row) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {row.views.toLocaleString()}
        </span>
      ),
    },
    {
      key: "visitors",
      header: "Visitors",
      sortable: true,
      render: (row) => row.visitors.toLocaleString(),
    },
    {
      key: "bounce",
      header: "Bounce Rate",
      sortable: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ProgressBar value={row.bounce} style={{ width: "60px", height: "6px" }} color={row.bounce < 30 ? "green" : row.bounce < 40 ? "yellow" : "red"} />
          <span style={{ fontSize: "12px", fontVariantNumeric: "tabular-nums", color: row.bounce < 30 ? "#22c55e" : row.bounce < 40 ? "#eab308" : "#ef4444" }}>{row.bounce}%</span>
        </div>
      ),
    },
    { key: "duration", header: "Avg Duration", sortable: true },
  ];

  return <DataTable data={pages} columns={columns} color="purple" />;
}

render(<Demo />);`;

const actionsExample = `function Demo() {
  const [users, setUsers] = React.useState([
    { id: 1, name: "Sarah Chen", email: "sarah@acme.com", avatar: "https://i.pravatar.cc/40?img=16", plan: "Pro", active: true },
    { id: 2, name: "James Wilson", email: "james@acme.com", avatar: "https://i.pravatar.cc/40?img=12", plan: "Free", active: true },
    { id: 3, name: "Maria Garcia", email: "maria@acme.com", avatar: "https://i.pravatar.cc/40?img=23", plan: "Enterprise", active: false },
    { id: 4, name: "Alex Kim", email: "alex@acme.com", avatar: "https://i.pravatar.cc/40?img=33", plan: "Pro", active: true },
    { id: 5, name: "Priya Patel", email: "priya@acme.com", avatar: "https://i.pravatar.cc/40?img=25", plan: "Free", active: true },
  ]);

  const planColors = { Free: "neutral", Pro: "blue", Enterprise: "purple" };

  const columns = [
    {
      key: "name",
      header: "Member",
      sortable: true,
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar name={row.name} src={row.avatar} size="sm" />
          <div>
            <div style={{ fontWeight: 500, color: "var(--mantle-color-text)" }}>{row.name}</div>
            <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      render: (row) => <Badge color={planColors[row.plan]} variant="solid" size="sm">{row.plan}</Badge>,
    },
    {
      key: "active",
      header: "Status",
      render: (row) => (
        <Switch defaultChecked={row.active} size="sm" color={row.active ? "green" : "neutral"} />
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
          <Button variant="ghost" size="sm" color="neutral" startIcon={<Settings size={14} />} />
          <Button variant="ghost" size="sm" color="red" startIcon={<Trash2 size={14} />} />
        </div>
      ),
    },
  ];

  return <DataTable data={users} columns={columns} />;
}

render(<Demo />);`;

const stripedExample = `function Demo() {
  const data = [
    { name: "Alice", role: "Engineer", dept: "Frontend" },
    { name: "Bob", role: "Designer", dept: "Product" },
    { name: "Charlie", role: "Manager", dept: "Engineering" },
    { name: "Diana", role: "Engineer", dept: "Backend" },
    { name: "Eve", role: "Designer", dept: "Marketing" },
  ];
  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role" },
    { key: "dept", header: "Department" },
  ];
  return <DataTable data={data} columns={columns} variant="striped" />;
}

render(<Demo />);`;

const minimalExample = `function Demo() {
  const data = [
    { name: "Alice", role: "Engineer", dept: "Frontend" },
    { name: "Bob", role: "Designer", dept: "Product" },
    { name: "Charlie", role: "Manager", dept: "Engineering" },
    { name: "Diana", role: "Engineer", dept: "Backend" },
    { name: "Eve", role: "Designer", dept: "Marketing" },
  ];
  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role" },
    { key: "dept", header: "Department" },
  ];
  return <DataTable data={data} columns={columns} variant="minimal" />;
}

render(<Demo />);`;

const borderedExample = `function Demo() {
  const data = [
    { name: "Alice", role: "Engineer", dept: "Frontend" },
    { name: "Bob", role: "Designer", dept: "Product" },
    { name: "Charlie", role: "Manager", dept: "Engineering" },
    { name: "Diana", role: "Engineer", dept: "Backend" },
    { name: "Eve", role: "Designer", dept: "Marketing" },
  ];
  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role" },
    { key: "dept", header: "Department" },
  ];
  return <DataTable data={data} columns={columns} variant="bordered" />;
}

render(<Demo />);`;

const sizesExample = `function Demo() {
  const data = [
    { name: "Alice", role: "Engineer", dept: "Frontend" },
    { name: "Bob", role: "Designer", dept: "Product" },
    { name: "Charlie", role: "Manager", dept: "Engineering" },
  ];
  const columns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "dept", header: "Department" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>Small</p>
        <DataTable data={data} columns={columns} size="sm" />
      </div>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>Medium (default)</p>
        <DataTable data={data} columns={columns} size="md" />
      </div>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>Large</p>
        <DataTable data={data} columns={columns} size="lg" />
      </div>
    </div>
  );
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
  {
    name: "variant",
    type: '"default" | "striped" | "minimal" | "bordered"',
    default: '"default"',
    description: "Visual style variant for the table.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Row density — compact, default, or spacious.",
  },
  {
    name: "--mantle-bg",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the background color via style. e.g. style={{ "--mantle-bg": "#1a1a2e" }}',
  },
  {
    name: "--mantle-border",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the border color via style. Set to "transparent" to remove. e.g. style={{ "--mantle-border": "#e94560" }}',
  },
  {
    name: "--mantle-text",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the text color via style. e.g. style={{ "--mantle-text": "#ffffff" }}',
  },
  {
    name: "--mantle-ring",
    type: "CSS variable",
    default: "accent",
    description:
      'Override the focus ring color via style. e.g. style={{ "--mantle-ring": "#e94560" }}',
  },
  {
    name: "--mantle-option-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the row hover background via style. e.g. style={{ "--mantle-option-hover": "#3b82f6" }}',
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

      <h2 className="mt-10 text-xl font-semibold">Task Tracker</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A project management table with checkboxes, priority badges, status
        chips, and avatar assignees.
      </p>
      <div className="mt-4">
        <LivePlayground code={taskTrackerExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Analytics Dashboard</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Page analytics with inline progress bars for bounce rates and monospace
        page paths.
      </p>
      <div className="mt-4">
        <LivePlayground code={analyticsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Actions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Team members table with inline switches for status and action buttons
        for settings and delete.
      </p>
      <div className="mt-4">
        <LivePlayground code={actionsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Striped</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Alternating row backgrounds for better readability.
      </p>
      <div className="mt-4">
        <LivePlayground code={stripedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Minimal</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        No outer border, transparent header — clean and lightweight.
      </p>
      <div className="mt-4">
        <LivePlayground code={minimalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Bordered</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Every cell has visible borders for a structured spreadsheet look.
      </p>
      <div className="mt-4">
        <LivePlayground code={borderedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Three density levels — compact, default, and spacious.
      </p>
      <div className="mt-4">
        <LivePlayground code={sizesExample} noEditor />
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
