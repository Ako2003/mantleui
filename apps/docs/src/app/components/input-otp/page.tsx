"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<InputOTP length={6} />`;

const fourDigitExample = `<InputOTP length={4} />`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <InputOTP length={6} value={value} onValueChange={setValue} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Value: {value || "empty"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const disabledExample = `<InputOTP length={6} defaultValue="123456" disabled />`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <InputOTP length={4} color="blue" />
  <InputOTP length={4} color="green" />
  <InputOTP length={4} color="purple" />
</div>`;

const inputOTPProps = [
  {
    name: "length",
    type: "number",
    default: "6",
    description: "Number of OTP input slots.",
  },
  {
    name: "value",
    type: "string",
    description: "The current OTP value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial OTP value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the OTP value changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all input slots.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for the focus ring.",
  },
];

export default function InputOTPPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">InputOTP</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A one-time password input with individual character slots. Supports
        configurable length, controlled mode, and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Four Digits</h2>
      <div className="mt-4">
        <LivePlayground code={fourDigitExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={inputOTPProps} />
    </div>
  );
}
