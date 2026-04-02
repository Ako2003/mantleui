import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  { value: "73", label: "Components" },
  { value: "676+", label: "Tests" },
  { value: "6", label: "Accent Colors" },
  { value: "0kb", label: "CSS-in-JS Runtime" },
];

const patterns = [
  {
    title: "Compound Components",
    description:
      "Flexible multi-part components like Tabs, Accordion, and Card that share implicit state.",
    example: "<Tabs> + <Tabs.List> + <Tabs.Trigger> + <Tabs.Content>",
    icon: "layers",
  },
  {
    title: "Headless Hooks",
    description:
      "Logic-only hooks like usePopover() and useControllable() for full rendering control.",
    example: "const { isOpen, triggerProps, contentProps } = usePopover()",
    icon: "code",
  },
  {
    title: "Polymorphic Components",
    description:
      'Type-safe "as" prop lets any component render as a different HTML element.',
    example: '<Button as="a" href="/about">Link Button</Button>',
    icon: "shuffle",
  },
  {
    title: "Controlled & Uncontrolled",
    description:
      "Every stateful component works as both controlled and uncontrolled out of the box.",
    example: "<Toggle> or <Toggle pressed={value} onPressedChange={set}>",
    icon: "sliders",
  },
];

const features = [
  {
    icon: "accessibility",
    title: "Accessible",
    description:
      "WAI-ARIA, keyboard navigation, focus management, screen reader support",
  },
  {
    icon: "shield",
    title: "Type Safe",
    description: "Strict TypeScript, no 'any' escapes, full prop inference",
  },
  {
    icon: "palette",
    title: "Themeable",
    description:
      "CSS custom properties, 6 accent colors + custom hex, dark mode",
  },
  {
    icon: "zap",
    title: "Zero Runtime",
    description: "Plain CSS with mantle- prefix, no CSS-in-JS overhead",
  },
  {
    icon: "moon",
    title: "Dark Mode",
    description:
      "System preference detection, localStorage persistence, SSR-safe",
  },
  {
    icon: "smartphone",
    title: "Responsive",
    description: "Mobile-first design, responsive props tables, touch-friendly",
  },
];

const categories = [
  {
    name: "Form",
    components: [
      "Input",
      "InputGroup",
      "InputOTP",
      "Autocomplete",
      "ComboBox",
      "Checkbox",
      "CheckboxGroup",
      "RadioGroup",
      "Switch",
      "Select",
      "MultiSelect",
      "TextField",
      "TextArea",
      "NumberField",
      "SearchField",
      "Slider",
      "DatePicker",
      "DateRangePicker",
      "TimeField",
      "Form",
      "Fieldset",
    ],
  },
  {
    name: "Interactive",
    components: [
      "Button",
      "ButtonGroup",
      "Toggle",
      "ToggleButton",
      "ToggleButtonGroup",
      "Accordion",
      "Tabs",
      "Popover",
      "Tooltip",
      "Dropdown",
      "Modal",
      "Drawer",
      "Disclosure",
      "DisclosureGroup",
      "Toolbar",
    ],
  },
  {
    name: "Feedback",
    components: [
      "Badge",
      "Alert",
      "AlertDialog",
      "Toast",
      "Spinner",
      "ProgressBar",
      "ProgressCircle",
      "Meter",
      "Skeleton",
    ],
  },
  {
    name: "Data Display",
    components: [
      "DataTable",
      "DataField",
      "ListBox",
      "TagGroup",
      "Chip",
      "Kbd",
      "Calendar",
      "RadioCalendar",
    ],
  },
  {
    name: "Navigation",
    components: ["Breadcrumb", "Pagination", "Link"],
  },
  {
    name: "Layout",
    components: ["Card", "Surface", "Avatar", "Separator", "ScrollShadow"],
  },
  {
    name: "Color",
    components: [
      "ColorPicker",
      "ColorArea",
      "ColorSlider",
      "ColorField",
      "ColorSwatch",
      "ColorSwatchPicker",
    ],
  },
  {
    name: "Utility",
    components: [
      "Label",
      "Description",
      "ErrorMessage",
      "FieldError",
      "CloseButton",
    ],
  },
];

function getComponentHref(name: string): string {
  return `/components/${name
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "")}`;
}

function IconFor({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    layers: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    code: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    shuffle: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    sliders: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    accessibility: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="4" r="1" />
        <path d="m18 19 1-7-6 1" />
        <path d="m5 8 3-3 5.5 3-2.36 3.5" />
        <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
        <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
      </svg>
    ),
    shield: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    palette: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    zap: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    moon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    smartphone: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  };
  return <>{iconMap[name] ?? null}</>;
}

export default function HomePage() {
  return (
    <div className="-mx-4 sm:-mx-8 lg:-mx-16">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
            73 components &middot; 676+ tests &middot; Production ready
          </div>

          <h1 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl dark:from-white dark:via-zinc-300 dark:to-white">
            MantleUI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
            A modern React component library showcasing frontend architecture,
            design patterns, and technical craftsmanship. Built with TypeScript,
            CSS custom properties, and zero runtime overhead.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/components/button"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-500/15"
            >
              Browse Components
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href="https://github.com/Ako2003/mantleui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200/60 bg-white/50 p-4 text-center backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/50"
              >
                <div className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Color showcase */}
      <ScrollReveal delay={150}>
        <section className="px-4 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
              6 Built-in Accent Colors + Custom Hex Support
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { name: "Blue", color: "#3b82f6" },
                { name: "Red", color: "#ef4444" },
                { name: "Green", color: "#22c55e" },
                { name: "Yellow", color: "#eab308" },
                { name: "Purple", color: "#8b5cf6" },
                { name: "Neutral", color: "#a3a3a3" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Design Patterns */}
      <ScrollReveal delay={100}>
        <section className="px-4 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Design Patterns
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 dark:text-zinc-400">
              Built to demonstrate production-grade React patterns used in real
              component libraries.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {patterns.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <IconFor name={p.icon} />
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {p.description}
                  </p>
                  <code className="mt-3 block rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {p.example}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features */}
      <ScrollReveal delay={100}>
        <section className="px-4 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Built Right
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 dark:text-zinc-400">
              Every component follows strict engineering standards.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                    <IconFor name={f.icon} />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* All Components */}
      <ScrollReveal delay={100}>
        <section className="px-4 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              All Components
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 dark:text-zinc-400">
              73 components organized across 8 categories.
            </p>

            <div className="mt-10 space-y-8">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
                    {cat.name}{" "}
                    <span className="text-slate-400 dark:text-zinc-600">
                      ({cat.components.length})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.components.map((comp) => (
                      <Link
                        key={comp}
                        href={getComponentHref(comp)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-800 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                      >
                        {comp}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Tech Stack */}
      <ScrollReveal delay={100}>
        <section className="px-4 py-16 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Tech Stack
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "React 19",
                "TypeScript",
                "CSS Custom Properties",
                "Turborepo",
                "tsup",
                "Vitest",
                "Next.js 15",
                "Tailwind CSS v4",
                "pnpm Workspaces",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
