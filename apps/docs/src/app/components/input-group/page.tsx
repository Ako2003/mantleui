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

      <h2 className="mt-10 text-xl font-semibold">InputGroup Props</h2>
      <PropsTable props={inputGroupProps} />

      <h2 className="mt-10 text-xl font-semibold">InputGroup.Addon Props</h2>
      <PropsTable props={addonProps} />
    </div>
  );
}
