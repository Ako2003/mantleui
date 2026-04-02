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
            <FileText size={15} /> New File
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Plus size={15} /> New Folder
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ClipboardEdit size={15} /> Paste
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}} disabled>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Trash2 size={15} /> Delete
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

const sectionsExample = `function Demo() {
  return (
    <Dropdown>
      <Dropdown.Trigger>My Account</Dropdown.Trigger>
      <Dropdown.Menu>
        <div style={{ padding: "8px 12px", fontSize: "12px", fontWeight: 600, color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Signed in as
        </div>
        <div style={{ padding: "4px 12px 8px", fontSize: "14px", fontWeight: 500, color: "var(--mantle-color-text)" }}>
          john@example.com
        </div>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={15} /> Profile
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Settings size={15} /> Settings
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CreditCard size={15} /> Billing
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Shield size={15} /> Security
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={15} /> Notifications
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--mantle-color-danger)" }}>
            <Lock size={15} /> Sign Out
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

render(<Demo />);`;

const commandPaletteExample = `function Demo() {
  return (
    <Dropdown>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Menu>
        <div style={{ padding: "6px 12px", fontSize: "11px", fontWeight: 600, color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Navigation
        </div>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Search size={14} /> Search</span>
            <span style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>⌘K</span>
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Compass size={14} /> Go to Dashboard</span>
            <span style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>⌘D</span>
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <div style={{ padding: "6px 12px", fontSize: "11px", fontWeight: 600, color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Edit
        </div>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><ClipboardEdit size={14} /> Paste</span>
            <span style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>⌘V</span>
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><RefreshCw size={14} /> Undo</span>
            <span style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>⌘Z</span>
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <div style={{ padding: "6px 12px", fontSize: "11px", fontWeight: 600, color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Danger Zone
        </div>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--mantle-color-danger)" }}>
            <Trash2 size={14} /> Delete Project
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

render(<Demo />);`;

const userMenuExample = `function Demo() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar name="John Doe" size="sm" />
          John Doe
          <ChevronDown size={14} />
        </span>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar name="John Doe" size="md" />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--mantle-color-text)" }}>John Doe</div>
            <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>john@example.com</div>
          </div>
        </div>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={15} /> Your Profile
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Star size={15} /> Your Stars
          </span>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Settings size={15} /> Settings
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Moon size={15} /> Dark Mode
          </span>
        </Dropdown.Item>
        <div style={{ height: "1px", background: "var(--mantle-color-border)", margin: "4px 0" }} />
        <Dropdown.Item onSelect={() => {}}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--mantle-color-danger)" }}>
            <Lock size={15} /> Sign Out
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

render(<Demo />);`;

const dropdownProps = [
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for item hover and focus effects.",
  },
  {
    name: "--mantle-option-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the item hover background via style. e.g. style={{ "--mantle-option-hover": "#3b82f6" }}',
  },
  {
    name: "--mantle-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the hover background via style. Set to "none" to disable. e.g. style={{ "--mantle-hover": "none" }}',
  },
];

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

      <h2 className="mt-10 text-xl font-semibold">With Sections</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Group items into sections with labels and separators.
      </p>
      <div className="mt-4">
        <LivePlayground code={sectionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Command Palette</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Items with icons, section headers, and keyboard shortcut hints.
      </p>
      <div className="mt-4">
        <LivePlayground code={commandPaletteExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">User Menu</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rich user menu with avatar header, grouped actions, and sign out.
      </p>
      <div className="mt-4">
        <LivePlayground code={userMenuExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dropdown Props</h2>
      <PropsTable props={dropdownProps} />

      <h2 className="mt-10 text-xl font-semibold">Dropdown.Item Props</h2>
      <PropsTable props={dropdownItemProps} />
    </div>
  );
}
