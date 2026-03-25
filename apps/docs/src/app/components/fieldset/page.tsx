"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Fieldset legend="Personal Information">
  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
    <Input label="First name" placeholder="John" />
    <Input label="Last name" placeholder="Doe" />
  </div>
</Fieldset>`;

const disabledExample = `<Fieldset legend="Account Settings" disabled>
  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
    <Input label="Email" placeholder="you@example.com" />
    <Input label="Password" placeholder="Enter password" type="password" />
  </div>
</Fieldset>`;

const nestedExample = `<Fieldset legend="Registration Form">
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
    <Input label="Username" placeholder="johndoe" required />
    <Input label="Email" placeholder="you@example.com" required />
    <Fieldset legend="Address">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Input label="Street" placeholder="123 Main St" />
        <Input label="City" placeholder="Springfield" />
      </div>
    </Fieldset>
  </div>
</Fieldset>`;

const fieldsetProps = [
  {
    name: "legend",
    type: "string",
    description: "The legend text displayed at the top of the fieldset.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all form controls within the fieldset.",
  },
];

export default function FieldsetPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Fieldset</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A semantic grouping component for form fields, with a legend and the
        ability to disable all nested controls at once.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Setting{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          disabled
        </code>{" "}
        on the fieldset disables all form elements inside it.
      </p>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Nested Fieldsets</h2>
      <div className="mt-4">
        <LivePlayground code={nestedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={fieldsetProps} />
    </div>
  );
}
