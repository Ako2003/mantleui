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
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
          Last action: {selected}
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
        with optional disabled states.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dropdown.Item Props</h2>
      <PropsTable props={dropdownItemProps} />
    </div>
  );
}
