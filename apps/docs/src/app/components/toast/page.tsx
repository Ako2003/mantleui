"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const { toast } = useToast();
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          variant="outline"
          onClick={() => toast.info({ title: "Info", description: "This is an informational toast." })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          color="green"
          onClick={() => toast.success({ title: "Success", description: "Your changes have been saved!" })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          color="yellow"
          onClick={() => toast.warning({ title: "Warning", description: "Your session is about to expire." })}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => toast.error({ title: "Error", description: "Something went wrong." })}
        >
          Error
        </Button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

render(<Demo />);`;

const toasterProps = [
  {
    name: "position",
    type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"',
    default: '"bottom-right"',
    description: "The position where toasts appear on screen.",
  },
];

export default function ToastPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Toast</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A notification system for brief, non-blocking feedback. Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useToast
        </code>{" "}
        hook to trigger toasts and render the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Toaster
        </code>{" "}
        component to display them.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the buttons below to trigger toasts of each variant.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">useToast API</h2>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        The{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useToast()
        </code>{" "}
        hook returns an object with the following methods:
      </p>
      <ul className="mt-2 list-inside list-disc text-sm text-slate-600 dark:text-zinc-400">
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.info({ title, description, duration })"}
          </code>{" "}
          &mdash; Show an info toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.success({ title, description, duration })"}
          </code>{" "}
          &mdash; Show a success toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.warning({ title, description, duration })"}
          </code>{" "}
          &mdash; Show a warning toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.error({ title, description, duration })"}
          </code>{" "}
          &mdash; Show an error toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            dismiss(id)
          </code>{" "}
          &mdash; Dismiss a toast by its ID
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Toaster Props</h2>
      <PropsTable props={toasterProps} />
    </div>
  );
}
