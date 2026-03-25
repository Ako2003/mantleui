"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link href="#">Electronics</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link active>Headphones</Breadcrumb.Link>
</Breadcrumb>`;

const customSeparatorExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Electronics</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link active>Headphones</Breadcrumb.Link>
</Breadcrumb>`;

const breadcrumbProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Breadcrumb links and separators.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
];

const linkProps = [
  {
    name: "href",
    type: "string",
    description: "The URL the link points to.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description:
      "Marks the link as the current page. Active links are visually distinct and not clickable.",
  },
];

const separatorProps = [
  {
    name: "children",
    type: "ReactNode",
    default: '"/"',
    description: "Custom separator character or element.",
  },
];

export default function BreadcrumbPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Breadcrumb</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A navigation component that shows the user their current location within
        a hierarchy. Built with compound components:{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Breadcrumb.Link
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Breadcrumb.Separator
        </code>
        .
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Separator</h2>
      <div className="mt-4">
        <LivePlayground code={customSeparatorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Breadcrumb Props</h2>
      <PropsTable props={breadcrumbProps} />

      <h2 className="mt-10 text-xl font-semibold">Breadcrumb.Link Props</h2>
      <PropsTable props={linkProps} />

      <h2 className="mt-10 text-xl font-semibold">
        Breadcrumb.Separator Props
      </h2>
      <PropsTable props={separatorProps} />
    </div>
  );
}
