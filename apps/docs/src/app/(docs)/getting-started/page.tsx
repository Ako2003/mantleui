"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

const compoundExample = `<Accordion>
  <Accordion.Item value="faq-1">
    <Accordion.Trigger>What is MantleUI?</Accordion.Trigger>
    <Accordion.Content>
      A production-grade React component library.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const controlledExample = `// Uncontrolled — just works
<Select defaultValue="react" options={options} />

// Controlled — full control
<Select value={value} onValueChange={setValue} options={options} />`;

const polymorphicExample = `// Renders as an <a> tag with full Button styling
<Button as="a" href="/about">I'm a link</Button>

// Renders as a <span>
<Button as="span">I'm a span</Button>`;

const themeExample = `// Every component accepts a color prop
<Button color="blue">Blue</Button>
<Button color="#e94560">Custom Hex</Button>

// Full CSS variable override
<Button
  style={{
    "--mantle-bg": "#1a1a2e",
    "--mantle-border": "#e94560",
    "--mantle-text": "#ffffff",
  }}
>
  Fully Custom
</Button>`;

const features = [
  {
    title: "109 Components",
    description:
      "Form controls, feedback, navigation, data display, 3D, motion, carousels, and more.",
  },
  {
    title: "Dark Mode Built-in",
    description:
      "ThemeProvider with system detection, localStorage persistence, and instant switching.",
  },
  {
    title: "Fully Accessible",
    description:
      "Keyboard navigation, ARIA attributes, focus management, and screen reader support.",
  },
  {
    title: "Zero Runtime CSS",
    description:
      "Plain CSS with mantle- prefixed classes. No CSS-in-JS, no runtime overhead.",
  },
  {
    title: "Tree-shakeable",
    description:
      "Three separate entry points — core, three, and motion — so optional deps stay optional.",
  },
  {
    title: "6 Colors + Custom Hex",
    description:
      "Built-in blue, red, green, yellow, purple, neutral presets, plus any hex color.",
  },
  {
    title: "Strict TypeScript",
    description:
      "Full type safety with no any escapes. Polymorphic types, prop inference, and strict mode.",
  },
  {
    title: "676+ Tests",
    description:
      "Vitest + React Testing Library. Behavioral tests for rendering, interactions, and accessibility.",
  },
];

const entryPoints = [
  {
    name: "@mantleui/react",
    description:
      "72 core UI components — forms, feedback, navigation, layout, data display, color pickers, and utilities.",
    css: "@mantleui/react/styles.css",
    deps: "None (just React)",
  },
  {
    name: "@mantleui/react/three",
    description:
      "11 Three.js-powered 3D components — Globe, ParticleField, Vortex, Aurora, and more.",
    css: "@mantleui/react/three-styles.css",
    deps: "three, @react-three/fiber, @react-three/drei",
  },
  {
    name: "@mantleui/react/motion",
    description:
      "25 framer-motion components — animations, 7 carousels, and advanced motion effects.",
    css: "@mantleui/react/motion-styles.css",
    deps: "framer-motion",
  },
];

const patterns = [
  {
    name: "Compound Components",
    components: "Accordion, Tabs, Modal, Dropdown, Card, Breadcrumb, BentoGrid",
  },
  {
    name: "Controlled / Uncontrolled",
    components: "All form components via useControllable hook",
  },
  {
    name: "Polymorphic as Prop",
    components: "Button (renders as <a>, <span>, etc.)",
  },
  {
    name: "Render Props",
    components: "DataTable cells, ListBox renderItem",
  },
  {
    name: "Headless Hooks",
    components: "usePopover, useDataTable, useToast",
  },
  {
    name: "Context-based Theming",
    components: "ThemeProvider with useSyncExternalStore",
  },
  {
    name: "Portal Rendering",
    components: "Modal, Drawer, Toast, Popover, ScrollProgress",
  },
];

export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Introduction
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-zinc-400">
        MantleUI is a production-grade React component library with 109
        components, built-in dark mode, full TypeScript support, and zero
        CSS-in-JS runtime.
      </p>

      <h2 id="what-is-mantleui" className="mt-12 text-xl font-semibold">
        What is MantleUI?
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
        MantleUI is a comprehensive React component library designed for
        building modern web applications. It provides 109 components across 13
        categories, from everyday form controls and feedback elements to
        advanced 3D visualizations and motion animations. Every component is
        built from scratch with clean abstractions, composability, and
        accessibility as first-class priorities.
      </p>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
        The library ships as three tree-shakeable entry points. The core package
        has zero peer dependencies beyond React. 3D and motion components are
        separate imports with optional peer dependencies, so they never bloat
        your bundle if you don&apos;t use them.
      </p>

      <h2 id="features" className="mt-12 text-xl font-semibold">
        Features
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800"
          >
            <h3 className="font-medium">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <h2 id="entry-points" className="mt-12 text-xl font-semibold">
        Three Entry Points
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
        MantleUI is organized into three separate entry points, each with its
        own JavaScript bundle and CSS file. This keeps your bundle lean — you
        only pay for what you import.
      </p>
      <div className="mt-6 space-y-4">
        {entryPoints.map((ep) => (
          <div
            key={ep.name}
            className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800"
          >
            <h3 className="font-mono text-sm font-semibold">{ep.name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              {ep.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-zinc-500">
              <span>
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                  CSS:
                </span>{" "}
                {ep.css}
              </span>
              <span>
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                  Peer deps:
                </span>{" "}
                {ep.deps}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 id="design-patterns" className="mt-12 text-xl font-semibold">
        Design Patterns
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
        MantleUI demonstrates a range of React design patterns used in
        production component libraries.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900">
              <th className="px-4 py-2.5 font-medium">Pattern</th>
              <th className="px-4 py-2.5 font-medium">Used By</th>
            </tr>
          </thead>
          <tbody>
            {patterns.map((p) => (
              <tr
                key={p.name}
                className="border-b border-slate-100 last:border-0 dark:border-zinc-800/50"
              >
                <td className="px-4 py-2.5 font-medium">{p.name}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                  {p.components}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="compound-components" className="mt-8 text-lg font-medium">
        Compound Components
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Components like Accordion, Tabs, and BentoGrid use the compound
        component pattern — a parent component shares state with its children
        via context.
      </p>
      <CodeBlock code={compoundExample} />

      <h3 id="controlled-uncontrolled" className="mt-8 text-lg font-medium">
        Controlled &amp; Uncontrolled
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Every stateful component works both ways. Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          defaultValue
        </code>{" "}
        for uncontrolled, or{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          value
        </code>{" "}
        +{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          onChange
        </code>{" "}
        for controlled.
      </p>
      <CodeBlock code={controlledExample} />

      <h3 id="polymorphic-components" className="mt-8 text-lg font-medium">
        Polymorphic Components
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        The{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          as
        </code>{" "}
        prop lets you change the rendered element while keeping all component
        styling and behavior.
      </p>
      <CodeBlock code={polymorphicExample} />

      <h3 id="theming-colors" className="mt-8 text-lg font-medium">
        Theming &amp; Colors
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Every component accepts a{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          color
        </code>{" "}
        prop for preset or custom hex colors. For deeper customization, override
        CSS variables directly.
      </p>
      <CodeBlock code={themeExample} />

      <h2 id="tech-stack" className="mt-12 text-xl font-semibold">
        Tech Stack
      </h2>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900">
              <th className="px-4 py-2.5 font-medium">Layer</th>
              <th className="px-4 py-2.5 font-medium">Technology</th>
            </tr>
          </thead>
          <tbody className="[&_tr]:border-b [&_tr]:border-slate-100 [&_tr:last-child]:border-0 dark:[&_tr]:border-zinc-800/50">
            <tr>
              <td className="px-4 py-2.5 font-medium">Components</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                React 19, TypeScript 5.9 (strict)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Build</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                tsup (esbuild) — ESM + CJS + DTS
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Styling</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                Plain CSS + CSS custom properties
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Testing</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                Vitest + React Testing Library
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">3D (optional)</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                Three.js + @react-three/fiber + drei
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Motion (optional)</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                framer-motion
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Monorepo</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                Turborepo + pnpm workspaces
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">CI/CD</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-zinc-400">
                GitHub Actions + Vercel
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="next-steps" className="mt-12 text-xl font-semibold">
        Next Steps
      </h2>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
        Ready to start building?
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          href="/quick-start"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Quick Start
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/components/button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Browse Components
        </Link>
      </div>
    </div>
  );
}
