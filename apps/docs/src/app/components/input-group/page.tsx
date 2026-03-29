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
    <div style={{
      maxWidth: "540px",
      borderRadius: "16px",
      border: "1px solid var(--mantle-color-border)",
      background: "var(--mantle-color-bg-subtle)",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
      {/* Context chip row */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid var(--mantle-color-border)",
            background: "var(--mantle-color-bg)",
            color: "var(--mantle-color-text)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <AtSign size={14} />
          Add Context
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Assign tasks or ask anything..."
        rows={3}
        style={{
          width: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--mantle-color-text)",
          fontSize: "14px",
          lineHeight: "1.5",
          fontFamily: "inherit",
          padding: "0",
        }}
      />

      {/* Bottom toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <button type="button" style={{
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "none",
            background: "var(--mantle-color-bg-muted)",
            color: "var(--mantle-color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}>
            <Plus size={18} />
          </button>
          <button type="button" style={{
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "none",
            background: "var(--mantle-color-bg-muted)",
            color: "var(--mantle-color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}>
            <Settings size={16} />
          </button>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button type="button" style={{
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "none",
            background: "transparent",
            color: "var(--mantle-color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}>
            <Mic size={18} />
          </button>
          <button type="button" style={{
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "none",
            background: text.trim() ? "var(--mantle-accent, #2563eb)" : "var(--mantle-color-bg-muted)",
            color: text.trim() ? "#fff" : "var(--mantle-color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: text.trim() ? "pointer" : "default",
            transition: "background 150ms ease, color 150ms ease",
          }}>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
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
        A rich prompt-style input with context chips, a textarea, and a toolbar
        — built by composing basic elements.
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
