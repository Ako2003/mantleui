"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Card>
  <Card.Body>
    <p style={{ color: "var(--mantle-color-text)" }}>
      A simple card with some content inside.
    </p>
  </Card.Body>
</Card>`;

const fullExample = `<Card>
  <Card.Header>
    <h3 style={{ margin: 0, fontWeight: 600, color: "var(--mantle-color-text)" }}>Card Title</h3>
    <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>Card description goes here.</p>
  </Card.Header>
  <Card.Body>
    <p style={{ color: "var(--mantle-color-text)" }}>
      This is the main content area of the card. You can put any content here
      including text, images, forms, or other components.
    </p>
  </Card.Body>
  <Card.Footer>
    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </div>
  </Card.Footer>
</Card>`;

const profileExample = `<Card style={{ maxWidth: "320px" }}>
  <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px" }}>
    <Avatar name="Jane Doe" size="lg" />
    <h3 style={{ margin: "12px 0 0", fontWeight: 600, fontSize: "16px", color: "var(--mantle-color-text)" }}>Jane Doe</h3>
    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>Senior Frontend Engineer</p>
    <p style={{ margin: "12px 0 0", fontSize: "13px", lineHeight: 1.6, color: "var(--mantle-color-text-muted)" }}>Passionate about building accessible, performant UIs with modern design patterns.</p>
    <Separator style={{ margin: "16px 0" }} />
    <div style={{ display: "flex", gap: "32px" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: "18px", color: "var(--mantle-color-text)" }}>56</div><div style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>Components</div></div>
      <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: "18px", color: "var(--mantle-color-text)" }}>651</div><div style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>Tests</div></div>
      <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: "18px", color: "var(--mantle-color-text)" }}>6</div><div style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>Colors</div></div>
    </div>
  </Card.Body>
</Card>`;

const statsExample = `<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
  {[
    { label: "Total Users", value: "12,847", change: "+12.5%", up: true },
    { label: "Revenue", value: "$48.2K", change: "+8.1%", up: true },
    { label: "Bounce Rate", value: "24.3%", change: "-2.4%", up: false },
  ].map((stat) => (
    <Card key={stat.label}>
      <Card.Body>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{stat.label}</p>
        <p style={{ margin: "8px 0 0", fontSize: "24px", fontWeight: 700, color: "var(--mantle-color-text)" }}>{stat.value}</p>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: stat.up ? "#22c55e" : "#ef4444", fontWeight: 500 }}>{stat.change} from last month</p>
      </Card.Body>
    </Card>
  ))}
</div>`;

const notificationExample = `<Card>
  <Card.Header>
    <h3 style={{ margin: 0, fontWeight: 600, fontSize: "15px", color: "var(--mantle-color-text)" }}>Notifications</h3>
    <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>You have 3 unread messages</p>
  </Card.Header>
  <Card.Body>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {[
        { icon: "+", title: "New feature released", desc: "ColorPicker component is now available", time: "2m ago", color: "#22c55e" },
        { icon: "!", title: "Bug fix deployed", desc: "Fixed Spinner white ring issue", time: "1h ago", color: "#3b82f6" },
        { icon: "v", title: "Version 1.0 published", desc: "MantleUI is now on npm", time: "3h ago", color: "#8b5cf6" },
      ].map((item) => (
        <div key={item.title} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "var(--mantle-color-text)" }}>{item.title}</p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>{item.desc}</p>
          </div>
          <span style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)", flexShrink: 0 }}>{item.time}</span>
        </div>
      ))}
    </div>
  </Card.Body>
</Card>`;

const cardProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the card container.",
  },
  {
    name: "children",
    type: "ReactNode",
    description:
      "The card content. Typically Card.Header, Card.Body, and Card.Footer.",
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

const cardHeaderProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the header section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Header content.",
  },
];

const cardBodyProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the body section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Body content.",
  },
];

const cardFooterProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the footer section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Footer content.",
  },
];

export default function CardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Card</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compound container component with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Header
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Body
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Footer
        </code>{" "}
        sub-components for structured content layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Full Card</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A card with header, body, and footer sections.
      </p>
      <div className="mt-4">
        <LivePlayground code={fullExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Profile Card</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A user profile card with avatar, bio, and stats.
      </p>
      <div className="mt-4">
        <LivePlayground code={profileExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Stats Dashboard</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Metric cards with values and change indicators.
      </p>
      <div className="mt-4">
        <LivePlayground code={statsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Notification Feed</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A card with a list of notification items.
      </p>
      <div className="mt-4">
        <LivePlayground code={notificationExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Card Props</h2>
      <PropsTable props={cardProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Header Props</h2>
      <PropsTable props={cardHeaderProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Body Props</h2>
      <PropsTable props={cardBodyProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Footer Props</h2>
      <PropsTable props={cardFooterProps} />
    </div>
  );
}
