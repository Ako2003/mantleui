"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <InputGroup>
    <InputGroup.Addon>$</InputGroup.Addon>
    <Input placeholder="Amount" />
  </InputGroup>
</div>`;

const suffixExample = `<div style={{ maxWidth: "320px" }}>
  <InputGroup>
    <Input placeholder="yourdomain" />
    <InputGroup.Addon>.com</InputGroup.Addon>
  </InputGroup>
</div>`;

const bothExample = `<div style={{ maxWidth: "320px" }}>
  <InputGroup>
    <InputGroup.Addon>https://</InputGroup.Addon>
    <Input placeholder="example" />
    <InputGroup.Addon>.com</InputGroup.Addon>
  </InputGroup>
</div>`;

const chatInputExample = `function Demo() {
  const [text, setText] = React.useState("");
  return (
    <Surface
      elevation="sm"
      rounded="lg"
      bordered
      style={{
        maxWidth: "540px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRadius: "var(--mantle-radius-lg)",
      }}
    >
      {/* Context chip */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Chip variant="outline" startIcon={<AtSign size={14} />}>Add Context</Chip>
      </div>

      {/* Textarea */}
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Assign tasks or ask anything..."
        rows={3}
        style={{ border: "none", background: "transparent", resize: "none", padding: 0, outline: "none", boxShadow: "none" }}
      />

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <Button variant="ghost" color="neutral" size="sm" style={{ borderRadius: "9999px", width: "36px", height: "36px", padding: 0 }} startIcon={<Plus size={18} />} />
          <Button variant="ghost" color="neutral" size="sm" style={{ borderRadius: "9999px", width: "36px", height: "36px", padding: 0 }} startIcon={<Settings size={16} />} />
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Button variant="ghost" color="neutral" size="sm" style={{ borderRadius: "9999px", width: "36px", height: "36px", padding: 0 }} startIcon={<Mic size={18} />} />
          <Button
            size="sm"
            disabled={!text.trim()}
            style={{ borderRadius: "9999px", width: "36px", height: "36px", padding: 0 }}
            startIcon={<ArrowUp size={18} />}
          />
        </div>
      </div>
    </Surface>
  );
}

render(<Demo />);`;

const inputGroupProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The input and addon elements to render inside the group.",
  },
];

const addonProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Content displayed inside the addon (text, icon, etc.).",
  },
];

export default function InputGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">InputGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A wrapper that combines an input with prefix or suffix addons for
        contextual labeling.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Prefix Addon</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Suffix Addon</h2>
      <div className="mt-4">
        <LivePlayground code={suffixExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Both Addons</h2>
      <div className="mt-4">
        <LivePlayground code={bothExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Chat Input</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rich prompt-style input composed from{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Surface
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          TextArea
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Chip
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Button
        </code>{" "}
        components.
      </p>
      <div className="mt-4">
        <LivePlayground code={chatInputExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">InputGroup Props</h2>
      <PropsTable props={inputGroupProps} />

      <h2 className="mt-10 text-xl font-semibold">InputGroup.Addon Props</h2>
      <PropsTable props={addonProps} />
    </div>
  );
}
