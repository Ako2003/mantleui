"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const variantsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Alert variant="info" title="Info">
    This is an informational alert.
  </Alert>
  <Alert variant="success" title="Success">
    Your changes have been saved.
  </Alert>
  <Alert variant="warning" title="Warning">
    Your session is about to expire.
  </Alert>
  <Alert variant="error" title="Error">
    Something went wrong. Please try again.
  </Alert>
</div>`;

const withDescriptionExample = `<Alert variant="info" title="Update Available">
  A new version of the application is available. Please refresh the page to get the latest features and bug fixes.
</Alert>`;

const dismissibleExample = `function Demo() {
  const [visible, setVisible] = React.useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {visible ? (
        <Alert variant="success" title="File uploaded" onDismiss={() => setVisible(false)}>
          Your file has been uploaded successfully.
        </Alert>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setVisible(true)}>
          Show Alert
        </Button>
      )}
    </div>
  );
}

render(<Demo />);`;

const usageExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <Alert variant="info" title="New features available">
    Check out our latest updates including dark mode support and improved accessibility features.
  </Alert>

  <Alert variant="info" title="Update available">
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
      <span>A new version of the application is available. Please refresh to get the latest features and bug fixes.</span>
      <Button size="sm" color="blue">Refresh</Button>
    </div>
  </Alert>

  <Alert variant="error" title="Unable to connect to server">
    <div>
      <p style={{ margin: "0 0 8px" }}>We're experiencing connection issues. Please try the following:</p>
      <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <li>Check your internet connection</li>
        <li>Refresh the page</li>
        <li>Clear your browser cache</li>
      </ul>
      <div style={{ marginTop: "12px" }}>
        <Button size="sm" color="red" variant="outline">Retry</Button>
      </div>
    </div>
  </Alert>

  <Alert variant="success" title="Profile updated successfully" onDismiss={() => {}} />

  <Alert variant="warning" title="Scheduled maintenance">
    Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for scheduled maintenance.
  </Alert>
</div>`;

const withActionsExample = `function Demo() {
  const [dismissed, setDismissed] = React.useState([]);

  const alerts = [
    { id: "update", variant: "info", title: "System update", desc: "A critical security update is available. Update now to stay protected.", action: "Update Now" },
    { id: "storage", variant: "warning", title: "Storage almost full", desc: "You've used 90% of your storage. Consider upgrading your plan or removing unused files.", action: "Manage Storage" },
    { id: "payment", variant: "error", title: "Payment failed", desc: "Your last payment was declined. Please update your payment method to avoid service interruption.", action: "Update Payment" },
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {alerts.filter(a => !dismissed.includes(a.id)).map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.variant}
          title={alert.title}
          onDismiss={() => setDismissed([...dismissed, alert.id])}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
            <span>{alert.desc}</span>
            <Button size="sm" color={alert.variant === "error" ? "red" : alert.variant === "warning" ? "yellow" : "blue"} variant="outline">
              {alert.action}
            </Button>
          </div>
        </Alert>
      ))}
      {dismissed.length > 0 && (
        <Button size="sm" variant="ghost" onClick={() => setDismissed([])}>Reset all alerts</Button>
      )}
    </div>
  );
}

render(<Demo />);`;

const alertProps = [
  {
    name: "variant",
    type: '"info" | "success" | "warning" | "error"',
    default: '"info"',
    description: "The alert type which determines the color and icon.",
  },
  {
    name: "title",
    type: "string",
    description: "The alert title text.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "The alert description content.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    description:
      "Callback when the dismiss button is clicked. When provided, a close button is rendered.",
  },
];

export default function AlertPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Alert</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A feedback component for displaying contextual messages in four semantic
        variants: info, success, warning, and error.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={variantsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dismissible</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Pass the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          onDismiss
        </code>{" "}
        prop to render a close button.
      </p>
      <div className="mt-4">
        <LivePlayground code={dismissibleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Alerts with descriptions, action buttons, bullet lists, and dismissible
        variants.
      </p>
      <div className="mt-4">
        <LivePlayground code={usageExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Interactive Actions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Dismissible alerts with action buttons. Try dismissing and resetting.
      </p>
      <div className="mt-4">
        <LivePlayground code={withActionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={alertProps} />
    </div>
  );
}
