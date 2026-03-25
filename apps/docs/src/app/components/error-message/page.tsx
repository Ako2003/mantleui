"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ErrorMessage>This field is required.</ErrorMessage>`;

const withFieldExample = `<div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "320px" }}>
  <Label htmlFor="email" required>Email</Label>
  <Input id="email" placeholder="you@example.com" />
  <ErrorMessage>Please enter a valid email address.</ErrorMessage>
</div>`;

const errorMessageProps = [
  {
    name: "children",
    type: "ReactNode",
    description:
      'The error message content to display. Rendered with role="alert" for screen reader announcements.',
  },
];

export default function ErrorMessagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ErrorMessage</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A form error message component rendered with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          role=&quot;alert&quot;
        </code>{" "}
        for accessible error announcements.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Form Field</h2>
      <div className="mt-4">
        <LivePlayground code={withFieldExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={errorMessageProps} />
    </div>
  );
}
