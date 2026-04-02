"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const singleExample = `<DisclosureGroup>
  <Disclosure>
    <Disclosure.Trigger>Section 1</Disclosure.Trigger>
    <Disclosure.Content>Content for section 1.</Disclosure.Content>
  </Disclosure>
  <Disclosure>
    <Disclosure.Trigger>Section 2</Disclosure.Trigger>
    <Disclosure.Content>Content for section 2.</Disclosure.Content>
  </Disclosure>
  <Disclosure>
    <Disclosure.Trigger>Section 3</Disclosure.Trigger>
    <Disclosure.Content>Content for section 3.</Disclosure.Content>
  </Disclosure>
</DisclosureGroup>`;

const multipleExample = `<DisclosureGroup allowMultiple>
  <Disclosure>
    <Disclosure.Trigger>Section A</Disclosure.Trigger>
    <Disclosure.Content>Content for section A. Multiple sections can be open at the same time.</Disclosure.Content>
  </Disclosure>
  <Disclosure>
    <Disclosure.Trigger>Section B</Disclosure.Trigger>
    <Disclosure.Content>Content for section B. Try opening this alongside section A.</Disclosure.Content>
  </Disclosure>
  <Disclosure>
    <Disclosure.Trigger>Section C</Disclosure.Trigger>
    <Disclosure.Content>Content for section C.</Disclosure.Content>
  </Disclosure>
</DisclosureGroup>`;

const disclosureGroupProps = [
  {
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description:
      "Whether multiple disclosures can be open simultaneously. When false, opening one closes others.",
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
];

export default function DisclosureGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DisclosureGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Groups multiple{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Disclosure
        </code>{" "}
        components together, optionally restricting to a single open item at a
        time.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Single Mode</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        By default, only one disclosure can be open at a time.
      </p>
      <div className="mt-4">
        <LivePlayground code={singleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Mode</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Set{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          allowMultiple
        </code>{" "}
        to let multiple disclosures stay open simultaneously.
      </p>
      <div className="mt-4">
        <LivePlayground code={multipleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={disclosureGroupProps} />
    </div>
  );
}
