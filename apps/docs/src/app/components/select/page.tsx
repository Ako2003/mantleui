"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Select
  placeholder="Choose a framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte", disabled: true },
  ]}
/>`;

const withLabelExample = `<div style={{ maxWidth: "320px" }}>
  <Select
    label="Framework"
    placeholder="Choose a framework"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte", disabled: true },
    ]}
  />
</div>`;

const withErrorExample = `<div style={{ maxWidth: "320px" }}>
  <Select
    label="Framework"
    placeholder="Choose a framework"
    error="Please select a framework."
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte", disabled: true },
    ]}
  />
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <Select
    size="sm"
    placeholder="Small"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ]}
  />
  <Select
    size="md"
    placeholder="Medium"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ]}
  />
  <Select
    size="lg"
    placeholder="Large"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ]}
  />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
      <Select
        label="Framework"
        placeholder="Choose a framework"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "angular", label: "Angular" },
          { value: "svelte", label: "Svelte", disabled: true },
        ]}
      />
      <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value || "none"}
      </span>
    </div>
  );
}

render(<Demo />);`;

const withIconExample = `<div style={{ maxWidth: "320px" }}>
  <Select
    startIcon={<Globe size={16} />}
    label="Country"
    placeholder="Select country"
    options={[
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "jp", label: "Japan" },
    ]}
  />
</div>`;

const withDescriptionExample = `<div style={{ maxWidth: "320px" }}>
  <Select
    label="State"
    placeholder="Select one"
    description="Select your state of residence"
    startIcon={<MapPin size={16} />}
    options={[
      { value: "ca", label: "California" },
      { value: "ny", label: "New York" },
      { value: "tx", label: "Texas" },
      { value: "fl", label: "Florida" },
      { value: "wa", label: "Washington" },
    ]}
  />
</div>`;

const countryExample = `function Demo() {
  const [country, setCountry] = React.useState("");
  return (
    <div style={{ maxWidth: "320px" }}>
      <Select
        startIcon={<Globe size={16} />}
        label="Country"
        placeholder="Select country"
        description="Choose your country for shipping"
        value={country}
        onValueChange={setCountry}
        options={[
          { value: "us", label: "🇺🇸 United States" },
          { value: "ca", label: "🇨🇦 Canada" },
          { value: "mx", label: "🇲🇽 Mexico" },
          { value: "uk", label: "🇬🇧 United Kingdom" },
          { value: "fr", label: "🇫🇷 France" },
          { value: "de", label: "🇩🇪 Germany" },
          { value: "es", label: "🇪🇸 Spain" },
          { value: "it", label: "🇮🇹 Italy" },
          { value: "jp", label: "🇯🇵 Japan" },
          { value: "au", label: "🇦🇺 Australia" },
        ]}
      />
      {country && (
        <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>
          Shipping to: {country.toUpperCase()}
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const roleExample = `function Demo() {
  const [role, setRole] = React.useState("");
  return (
    <div style={{ maxWidth: "320px" }}>
      <Select
        startIcon={<Users size={16} />}
        label="Role"
        placeholder="Assign a role"
        value={role}
        onValueChange={setRole}
        color="purple"
        options={[
          { value: "owner", label: "👑 Owner" },
          { value: "admin", label: "🛡️ Admin" },
          { value: "editor", label: "✏️ Editor" },
          { value: "viewer", label: "👁️ Viewer" },
          { value: "guest", label: "🚪 Guest", disabled: true },
        ]}
      />
    </div>
  );
}

render(<Demo />);`;

const disabledExample = `<div style={{ maxWidth: "320px" }}>
  <Select
    label="Plan"
    placeholder="Select a plan"
    disabled
    options={[
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
    ]}
  />
</div>`;

const selectProps = [
  {
    name: "options",
    type: "{ value: string; label: string; disabled?: boolean }[]",
    description: "Array of options to display in the dropdown.",
  },
  {
    name: "value",
    type: "string",
    description: "The currently selected value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initially selected value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected value changes.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when no value is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the select.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for focus ring.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed above the select.",
  },
  {
    name: "description",
    type: "string",
    description: "Helper text displayed below the select.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message displayed below the select.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    description: "Icon rendered at the start of the trigger button.",
  },
];

export default function SelectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Select</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A dropdown select component for choosing a single value from a list of
        options. Supports labels, error states, and disabled options.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Error</h2>
      <div className="mt-4">
        <LivePlayground code={withErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icon</h2>
      <div className="mt-4">
        <LivePlayground code={withIconExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Helper text below the select for additional context.
      </p>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Country Selector</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rich select with flag emojis and a Globe icon.
      </p>
      <div className="mt-4">
        <LivePlayground code={countryExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Role Assignment</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Assign user roles with emoji indicators and a disabled guest option.
      </p>
      <div className="mt-4">
        <LivePlayground code={roleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={selectProps} />
    </div>
  );
}
