"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const verticalExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <DataField label="Name" value="John Doe" />
  <DataField label="Email" value="john@example.com" />
  <DataField label="Role" value="Administrator" />
</div>`;

const horizontalExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <DataField label="Status" value="Active" orientation="horizontal" />
  <DataField label="Created" value="March 15, 2025" orientation="horizontal" />
  <DataField label="Updated" value="March 20, 2025" orientation="horizontal" />
</div>`;

const userProfileExample = `<Card style={{ maxWidth: "420px" }}>
  <Card.Header>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar name="Sarah Chen" size="md" />
      <div>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "15px", color: "var(--mantle-color-text)" }}>Sarah Chen</h3>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>Product Designer</p>
      </div>
    </div>
  </Card.Header>
  <Card.Body>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <DataField label="Email" value="sarah@acme.com" />
      <DataField label="Phone" value="+1 (555) 234-5678" />
      <DataField label="Location" value="San Francisco, CA" />
      <DataField label="Department" value="Design" />
      <DataField label="Start Date" value="Jan 15, 2024" />
      <DataField label="Manager" value="Alex Rivera" />
    </div>
  </Card.Body>
</Card>`;

const orderDetailsExample = `<Card style={{ maxWidth: "420px" }}>
  <Card.Header>
    <h3 style={{ margin: 0, fontWeight: 600, fontSize: "15px", color: "var(--mantle-color-text)" }}>Order #ORD-2024-1847</h3>
  </Card.Header>
  <Card.Body>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <DataField label="Status" value={<Badge color="green">Shipped</Badge>} orientation="horizontal" />
      <Separator />
      <DataField label="Customer" value="Emily Johnson" orientation="horizontal" />
      <DataField label="Items" value="3 items" orientation="horizontal" />
      <DataField label="Total" value="$249.99" orientation="horizontal" />
      <Separator />
      <DataField label="Shipping" value="Express (2-day)" orientation="horizontal" />
      <DataField label="Tracking" value={<Link href="#" style={{ fontSize: "14px" }}>1Z999AA10123456784</Link>} orientation="horizontal" />
      <DataField label="Estimated Delivery" value="Apr 4, 2026" orientation="horizontal" />
    </div>
  </Card.Body>
</Card>`;

const serverInfoExample = `<Card style={{ maxWidth: "480px" }}>
  <Card.Header>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3 style={{ margin: 0, fontWeight: 600, fontSize: "15px", color: "var(--mantle-color-text)" }}>Server Info</h3>
      <Badge color="green" variant="solid">Healthy</Badge>
    </div>
  </Card.Header>
  <Card.Body>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <DataField label="Host" value="prod-api-01.acme.io" />
      <DataField label="Region" value="us-east-1" />
      <DataField label="CPU Usage" value={<ProgressBar value={42} showValue color="blue" style={{ marginTop: "4px" }} />} />
      <DataField label="Memory" value={<ProgressBar value={68} showValue color="yellow" style={{ marginTop: "4px" }} />} />
      <DataField label="Uptime" value="47 days, 12 hours" />
      <DataField label="Last Deploy" value="Mar 31, 2026 at 14:22" />
    </div>
  </Card.Body>
</Card>`;

const paymentExample = `<Card style={{ maxWidth: "400px" }}>
  <Card.Header>
    <h3 style={{ margin: 0, fontWeight: 600, fontSize: "15px", color: "var(--mantle-color-text)" }}>Payment Details</h3>
  </Card.Header>
  <Card.Body>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <DataField label="Payment Method" value={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CreditCard size={16} style={{ color: "var(--mantle-accent)" }} />
          <span>Visa ending in 4242</span>
        </div>
      } orientation="horizontal" />
      <Separator />
      <DataField label="Subtotal" value="$229.99" orientation="horizontal" />
      <DataField label="Shipping" value="$12.00" orientation="horizontal" />
      <DataField label="Tax" value="$8.00" orientation="horizontal" />
      <Separator />
      <DataField label="Total" value={
        <span style={{ fontWeight: 700, fontSize: "16px" }}>$249.99</span>
      } orientation="horizontal" />
      <Separator />
      <DataField label="Billing Address" value="123 Main Street, Apt 4B, New York, NY 10001" />
      <DataField label="Shipping Address" value="456 Oak Avenue, Suite 12, Brooklyn, NY 11201" />
    </div>
  </Card.Body>
</Card>`;

const dataFieldProps = [
  {
    name: "label",
    type: "string",
    description: "The field label text.",
  },
  {
    name: "value",
    type: "ReactNode",
    description: "The field value to display.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Layout direction of the label and value.",
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
];

export default function DataFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DataField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A read-only field for displaying a label-value pair. Supports vertical
        and horizontal layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">User Profile</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A profile card with DataField grid layout inside a Card.
      </p>
      <div className="mt-4">
        <LivePlayground code={userProfileExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Order Details</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Horizontal DataFields with rich values like Badge and Link components.
      </p>
      <div className="mt-4">
        <LivePlayground code={orderDetailsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Server Dashboard</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        DataFields with ProgressBar values for system monitoring.
      </p>
      <div className="mt-4">
        <LivePlayground code={serverInfoExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Payment Info</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        DataFields with custom ReactNode values including icons and
        multi-line content.
      </p>
      <div className="mt-4">
        <LivePlayground code={paymentExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dataFieldProps} />
    </div>
  );
}
