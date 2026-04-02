"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <ListBox
    items={[
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "grape", label: "Grape" },
    ]}
    defaultValue="apple"
  />
</div>`;

const multipleExample = `<div style={{ maxWidth: "320px" }}>
  <ListBox
    items={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ]}
    multiple
    defaultValue={["react", "svelte"]}
  />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("banana");
  return (
    <div style={{ maxWidth: "320px" }}>
      <ListBox
        items={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <ListBox
    color="blue"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
  <ListBox
    color="green"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
  <ListBox
    color="purple"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
</div>`;

const userListExample = `function Demo() {
  const users = [
    { value: "bob", label: "Bob", email: "bob@mantleui.com" },
    { value: "fred", label: "Fred", email: "fred@mantleui.com" },
    { value: "martha", label: "Martha", email: "martha@mantleui.com" },
    { value: "alice", label: "Alice", email: "alice@mantleui.com" },
  ];

  return (
    <div style={{ maxWidth: "360px" }}>
      <ListBox
        items={users}
        multiple
        defaultValue={["bob", "fred", "martha"]}
        renderItem={(item, selected) => (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
            <Avatar name={item.label} size="md" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>
                {item.email}
              </div>
            </div>
            {selected && (
              <Check size={18} style={{ color: "var(--mantle-accent, #3b82f6)", flexShrink: 0 }} />
            )}
          </div>
        )}
      />
    </div>
  );
}

render(<Demo />);`;

const teamMembersExample = `function Demo() {
  const [selected, setSelected] = React.useState(["admin"]);
  const roles = [
    { value: "admin", label: "Admin", desc: "Full access to all resources" },
    { value: "editor", label: "Editor", desc: "Can edit and publish content" },
    { value: "viewer", label: "Viewer", desc: "Read-only access" },
    { value: "guest", label: "Guest", desc: "Limited access", disabled: true },
  ];

  return (
    <div style={{ maxWidth: "360px" }}>
      <ListBox
        items={roles}
        value={selected}
        onValueChange={setSelected}
        color="purple"
        renderItem={(item, sel) => (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              background: sel ? "var(--mantle-accent, #8b5cf6)" : "var(--mantle-color-bg-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: sel ? "#fff" : "var(--mantle-color-text-muted)",
              flexShrink: 0, transition: "all 150ms ease",
            }}>
              <Shield size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>
                {item.desc}
              </div>
            </div>
            {sel && <Check size={18} style={{ color: "var(--mantle-accent, #8b5cf6)", flexShrink: 0 }} />}
          </div>
        )}
      />
    </div>
  );
}

render(<Demo />);`;

const listBoxProps = [
  {
    name: "items",
    type: "{ value: string; label: string }[]",
    description: "Array of selectable items.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "The selected value(s) (controlled).",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "The initial selected value(s) (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Called when the selection changes.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Allows multiple items to be selected.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for selected items.",
  },
  {
    name: "renderItem",
    type: "(item: ListBoxItem, selected: boolean) => ReactNode",
    description:
      "Custom render function for each item. Receives the item data and selection state.",
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
  {
    name: "--mantle-option-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the option hover background via style. e.g. style={{ "--mantle-option-hover": "#3b82f6" }}',
  },
];

export default function ListBoxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ListBox</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A list selection component supporting single and multiple selection
        modes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Selection</h2>
      <div className="mt-4">
        <LivePlayground code={multipleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">User List</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Custom rendered items with avatars, names, emails, and check icons.
      </p>
      <div className="mt-4">
        <LivePlayground code={userListExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Role Selection</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Selectable roles with icon badges, descriptions, and a disabled option.
      </p>
      <div className="mt-4">
        <LivePlayground code={teamMembersExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={listBoxProps} />
    </div>
  );
}
