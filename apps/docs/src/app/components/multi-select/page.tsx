"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    placeholder="Select frameworks..."
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "solid", label: "SolidJS" },
    ]}
  />
</div>`;

const withLabelExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Frameworks"
    placeholder="Select frameworks..."
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
</div>`;

const withDescriptionExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Skills"
    placeholder="Select your skills..."
    description="Choose the technologies you are proficient in."
    options={[
      { value: "react", label: "React" },
      { value: "typescript", label: "TypeScript" },
      { value: "node", label: "Node.js" },
      { value: "graphql", label: "GraphQL" },
      { value: "docker", label: "Docker" },
    ]}
  />
</div>`;

const withErrorExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Languages"
    placeholder="Select languages..."
    error="Please select at least one language."
    options={[
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
    ]}
  />
</div>`;

const maxItemsExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Top 3 Picks"
    placeholder="Select up to 3..."
    maxItems={3}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "solid", label: "SolidJS" },
      { value: "next", label: "Next.js" },
    ]}
  />
</div>`;

const controlledExample = `function Demo() {
  const [selected, setSelected] = React.useState(["react", "typescript"]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <MultiSelect
        label="Tech Stack"
        placeholder="Select technologies..."
        value={selected}
        onValueChange={setSelected}
        options={[
          { value: "react", label: "React" },
          { value: "typescript", label: "TypeScript" },
          { value: "node", label: "Node.js" },
          { value: "graphql", label: "GraphQL" },
          { value: "postgres", label: "PostgreSQL" },
          { value: "redis", label: "Redis" },
        ]}
      />
      <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>
        Selected: {selected.join(", ") || "none"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const withIconExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    startIcon={<Globe size={16} />}
    label="Countries"
    placeholder="Select countries..."
    options={[
      { value: "us", label: "🇺🇸 United States" },
      { value: "ca", label: "🇨🇦 Canada" },
      { value: "uk", label: "🇬🇧 United Kingdom" },
      { value: "fr", label: "🇫🇷 France" },
      { value: "de", label: "🇩🇪 Germany" },
      { value: "jp", label: "🇯🇵 Japan" },
      { value: "au", label: "🇦🇺 Australia" },
    ]}
  />
</div>`;

const disabledExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Regions"
    placeholder="Select regions..."
    disabled
    options={[
      { value: "na", label: "North America" },
      { value: "eu", label: "Europe" },
      { value: "asia", label: "Asia" },
    ]}
  />
</div>`;

const disabledOptionsExample = `<div style={{ maxWidth: "360px" }}>
  <MultiSelect
    label="Plan Features"
    placeholder="Select features..."
    options={[
      { value: "analytics", label: "Analytics" },
      { value: "api", label: "API Access" },
      { value: "sso", label: "SSO (Enterprise only)", disabled: true },
      { value: "support", label: "Priority Support", disabled: true },
      { value: "export", label: "Data Export" },
    ]}
  />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "360px" }}>
  <MultiSelect
    color="blue"
    label="Blue"
    placeholder="Select..."
    defaultValue={["a"]}
    options={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
  />
  <MultiSelect
    color="green"
    label="Green"
    placeholder="Select..."
    defaultValue={["a"]}
    options={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
  />
  <MultiSelect
    color="purple"
    label="Purple"
    placeholder="Select..."
    defaultValue={["a"]}
    options={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
  />
</div>`;

const tagSelectorExample = `function Demo() {
  const [tags, setTags] = React.useState([]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <MultiSelect
        startIcon={<Tag size={16} />}
        label="Tags"
        placeholder="Add tags..."
        description="Categorize your post with relevant tags."
        color="purple"
        value={tags}
        onValueChange={setTags}
        maxItems={5}
        options={[
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend" },
          { value: "devops", label: "DevOps" },
          { value: "design", label: "Design" },
          { value: "mobile", label: "Mobile" },
          { value: "ai", label: "AI / ML" },
          { value: "security", label: "Security" },
          { value: "testing", label: "Testing" },
        ]}
      />
      {tags.length > 0 && (
        <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>
          {tags.length}/5 tags selected
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const teamMembersExample = `function Demo() {
  const [members, setMembers] = React.useState(["alice", "bob"]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <MultiSelect
        startIcon={<Users size={16} />}
        label="Team Members"
        placeholder="Add members..."
        color="green"
        value={members}
        onValueChange={setMembers}
        options={[
          { value: "alice", label: "👩 Alice Johnson" },
          { value: "bob", label: "👨 Bob Smith" },
          { value: "carol", label: "👩 Carol Williams" },
          { value: "david", label: "👨 David Brown" },
          { value: "eve", label: "👩 Eve Davis" },
          { value: "frank", label: "👨 Frank Miller" },
        ]}
      />
    </div>
  );
}

render(<Demo />);`;

const multiSelectProps = [
  {
    name: "options",
    type: "{ value: string; label?: string; disabled?: boolean }[]",
    description: "Array of options to display in the dropdown.",
  },
  {
    name: "value",
    type: "string[]",
    description: "The currently selected values (controlled).",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "The initially selected values (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when the selected values change.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select..."',
    description: "Placeholder text shown when nothing is selected.",
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
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the entire select.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for chips and focus ring.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    description: "Icon rendered at the start of the trigger.",
  },
  {
    name: "maxItems",
    type: "number",
    description:
      "Maximum number of items that can be selected. Remaining options become disabled when the limit is reached.",
  },
];

export default function MultiSelectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">MultiSelect</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A multi-select dropdown with chip display for selected items. Supports
        labels, descriptions, error states, max selection limits, and accent
        colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add helper text below the select for additional context.
      </p>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Error</h2>
      <div className="mt-4">
        <LivePlayground code={withErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Max Items</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Limit the number of selections. Remaining options become disabled once
        the limit is reached.
      </p>
      <div className="mt-4">
        <LivePlayground code={maxItemsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icon</h2>
      <div className="mt-4">
        <LivePlayground code={withIconExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled Options</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Individual options can be disabled while others remain selectable.
      </p>
      <div className="mt-4">
        <LivePlayground code={disabledOptionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Tag Selector</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A tag picker with a max limit, icon, and counter.
      </p>
      <div className="mt-4">
        <LivePlayground code={tagSelectorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Team Members</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Select team members with pre-selected defaults.
      </p>
      <div className="mt-4">
        <LivePlayground code={teamMembersExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={multiSelectProps} />
    </div>
  );
}
