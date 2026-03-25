"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [selected, setSelected] = React.useState("");
  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => setSelected("edit")}>Edit</Dropdown.Item>
          <Dropdown.Item onSelect={() => setSelected("duplicate")}>Duplicate</Dropdown.Item>
          <Dropdown.Item onSelect={() => setSelected("archive")}>Archive</Dropdown.Item>
          <Dropdown.Item onSelect={() => setSelected("delete")} disabled>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {selected && (
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
          Last action: {selected}
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const withIconsExample = `function Demo() {
  return (
    <Dropdown>
      <Dropdown.Trigger>File Actions</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>📄</span> New File
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>📁</span> New Folder
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>📋</span> Paste
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}} disabled>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🗑️</span> Delete
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

render(<Demo />);`;

const multipleExample = `function Demo() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Dropdown>
        <Dropdown.Trigger>Account</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => {}}>Profile</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Settings</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Billing</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Trigger>Sort By</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => {}}>Name</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Date Created</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Date Modified</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Size</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Trigger>Export</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => {}}>CSV</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>JSON</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>PDF</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}} disabled>XML</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

render(<Demo />);`;

const dangerExample = `function Demo() {
  const [confirming, setConfirming] = React.useState(false);
  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>Manage Project</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => {}}>Rename</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Duplicate</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Move to...</Dropdown.Item>
          <Dropdown.Item onSelect={() => setConfirming(true)}>
            <span style={{ color: "var(--mantle-color-danger)" }}>Delete Project</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {confirming && (
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-danger)" }}>
          ⚠ Are you sure? This cannot be undone.
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const dropdownItemProps = [
  {
    name: "onSelect",
    type: "() => void",
    description: "Called when the item is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the menu item.",
  },
];

export default function DropdownPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dropdown</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A dropdown menu triggered by a button. Contains selectable menu items
        with optional disabled states. Supports keyboard navigation (Arrow keys,
        Enter) and closes on Escape or click outside.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A simple dropdown with selectable items and a disabled option.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Menu items can contain any content, including icons.
      </p>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Dropdowns</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Multiple dropdowns can be placed side by side. Only one menu opens at a
        time.
      </p>
      <div className="mt-4">
        <LivePlayground code={multipleExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Danger Action</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Style destructive items with a danger color to warn users.
      </p>
      <div className="mt-4">
        <LivePlayground code={dangerExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dropdown.Item Props</h2>
      <PropsTable props={dropdownItemProps} />
    </div>
  );
}
