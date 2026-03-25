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

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={alertProps} />
    </div>
  );
}
