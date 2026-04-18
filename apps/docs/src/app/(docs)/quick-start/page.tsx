"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const installCommands: Record<PackageManager, string> = {
  npm: "npm install @mantleui/react",
  pnpm: "pnpm add @mantleui/react",
  yarn: "yarn add @mantleui/react",
  bun: "bun add @mantleui/react",
};

const threeInstallCommands: Record<PackageManager, string> = {
  npm: "npm install three @react-three/fiber @react-three/drei",
  pnpm: "pnpm add three @react-three/fiber @react-three/drei",
  yarn: "yarn add three @react-three/fiber @react-three/drei",
  bun: "bun add three @react-three/fiber @react-three/drei",
};

const motionInstallCommands: Record<PackageManager, string> = {
  npm: "npm install framer-motion",
  pnpm: "pnpm add framer-motion",
  yarn: "yarn add framer-motion",
  bun: "bun add framer-motion",
};

const managers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

function PackageManagerTabs({
  commands,
  selected,
  onSelect,
}: {
  commands: Record<PackageManager, string>;
  selected: PackageManager;
  onSelect: (pm: PackageManager) => void;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-800">
      <div className="flex border-b border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900">
        {managers.map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => onSelect(pm)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selected === pm
                ? "border-b-2 border-slate-900 text-slate-900 dark:border-zinc-100 dark:text-zinc-100"
                : "text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="bg-slate-50 p-4 dark:bg-zinc-900">
        <code className="font-mono text-sm text-slate-800 dark:text-zinc-200">
          {commands[selected]}
        </code>
      </div>
    </div>
  );
}

const importStylesExample = `import "@mantleui/react/styles.css";`;

const basicUsageExample = `import { Button, ThemeProvider } from "@mantleui/react";
import "@mantleui/react/styles.css";

function App() {
  return (
    <ThemeProvider>
      <Button color="blue" variant="solid">
        Get Started
      </Button>
    </ThemeProvider>
  );
}`;

const darkModeExample = `import { ThemeProvider, useTheme, Switch } from "@mantleui/react";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitch />
      {/* All components respond to theme changes instantly */}
    </ThemeProvider>
  );
}`;

const threeUsageExample = `import { Globe, ParticleField } from "@mantleui/react/three";
import "@mantleui/react/three-styles.css";

function Scene() {
  return (
    <>
      <Globe
        showCountries
        markers={[{ lat: 40.7, lng: -74, label: "NYC" }]}
      />
      <ParticleField count={200} color="#8b5cf6" connections />
    </>
  );
}`;

const motionUsageExample = `import {
  AnimatedCounter,
  Carousel,
  FloatingDock,
} from "@mantleui/react/motion";
import "@mantleui/react/motion-styles.css";

function Dashboard() {
  return (
    <>
      <AnimatedCounter value={12847} prefix="$" duration={1.5} />
      <Carousel slides={slides} autoplay interval={3000} />
      <FloatingDock items={dockItems} />
    </>
  );
}`;

export default function QuickStartPage() {
  const [pm, setPm] = useState<PackageManager>("npm");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Quick Start
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-zinc-400">
        Get up and running with MantleUI in under 5 minutes.
      </p>

      <h2 id="requirements" className="mt-12 text-xl font-semibold">
        Requirements
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-1 text-slate-600 dark:text-zinc-400">
        <li>
          <span className="font-medium text-slate-900 dark:text-zinc-100">
            React 18+
          </span>{" "}
          (React 19 supported)
        </li>
        <li>
          <span className="font-medium text-slate-900 dark:text-zinc-100">
            TypeScript 5+
          </span>{" "}
          (recommended, not required)
        </li>
      </ul>

      <h2 id="installation" className="mt-12 text-xl font-semibold">
        Installation
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        Install the core package with your preferred package manager.
      </p>
      <PackageManagerTabs
        commands={installCommands}
        selected={pm}
        onSelect={setPm}
      />

      <h2 id="import-styles" className="mt-12 text-xl font-semibold">
        Import Styles
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        Import the CSS file in your app&apos;s entry point (e.g.,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          main.tsx
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          globals.css
        </code>
        , or{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          layout.tsx
        </code>
        ).
      </p>
      <CodeBlock code={importStylesExample} />

      <h2 id="basic-usage" className="mt-12 text-xl font-semibold">
        Basic Usage
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        Wrap your app with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          ThemeProvider
        </code>{" "}
        to enable dark mode and theming. Then import and use any component.
      </p>
      <CodeBlock code={basicUsageExample} />
      <p className="mt-3 text-sm text-slate-500 dark:text-zinc-500">
        <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
          ThemeProvider
        </code>{" "}
        auto-detects system preference, persists to localStorage, and is
        SSR-safe.
      </p>

      <h2 id="dark-mode" className="mt-12 text-xl font-semibold">
        Dark Mode
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        Dark mode is built into every component. Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
          useTheme
        </code>{" "}
        to toggle between light and dark modes programmatically.
      </p>
      <CodeBlock code={darkModeExample} />

      <h2 id="3d-components" className="mt-12 text-xl font-semibold">
        3D Components (Optional)
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        MantleUI includes 11 Three.js-powered 3D components via a separate entry
        point. Install the peer dependencies to use them.
      </p>
      <PackageManagerTabs
        commands={threeInstallCommands}
        selected={pm}
        onSelect={setPm}
      />
      <CodeBlock code={threeUsageExample} />

      <h2 id="motion-components" className="mt-12 text-xl font-semibold">
        Motion Components (Optional)
      </h2>
      <p className="mt-3 text-slate-600 dark:text-zinc-400">
        25 framer-motion-powered components including animations, 7 carousel
        variants, and advanced motion effects. Install framer-motion to use
        them.
      </p>
      <PackageManagerTabs
        commands={motionInstallCommands}
        selected={pm}
        onSelect={setPm}
      />
      <CodeBlock code={motionUsageExample} />

      <h2 id="whats-next" className="mt-12 text-xl font-semibold">
        What&apos;s Next?
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href="/components/button"
          className="rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <h3 className="font-medium">Browse Components</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
            Explore all 109 components with live examples.
          </p>
        </Link>
        <Link
          href="/getting-started"
          className="rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <h3 className="font-medium">Design Patterns</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
            Learn about compound components, headless hooks, and more.
          </p>
        </Link>
      </div>
    </div>
  );
}
