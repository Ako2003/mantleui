"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Description>This is a helpful description for the field above.</Description>`;

const withFieldExample = `<div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "320px" }}>
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
  <Description>We will never share your email with anyone.</Description>
</div>`;

const descriptionProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The helper text content to display.",
  },
];

export default function DescriptionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Description</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A helper text component used to provide additional context or guidance
        for form fields.
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
      <PropsTable props={descriptionProps} />
    </div>
  );
}
