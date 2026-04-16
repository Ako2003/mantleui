# MantleUI

I built MantleUI to deepen my understanding of frontend architecture and design patterns after receiving feedback that my portfolio needed more structural depth. Every component is built from scratch — no copy-paste, no wrappers around existing libraries — with a focus on clean abstraction, composability, and production-grade robustness. This is the proof that I can design, build, test, and ship a real component system.

[![CI](https://github.com/Ako2003/mantleui/actions/workflows/ci.yml/badge.svg)](https://github.com/Ako2003/mantleui/actions)
[![npm](https://img.shields.io/npm/v/@mantleui/react)](https://www.npmjs.com/package/@mantleui/react)

## Live Demo

> **[mantleui.vercel.app](https://mantleui.vercel.app)**

## Highlights

- **109 components** across 13 categories including 3D, motion, and advanced animations
- **676+ tests** with Vitest + React Testing Library
- **Dark mode** built-in via CSS custom properties + ThemeProvider
- **6 accent colors** (blue, red, green, yellow, purple, neutral) + any custom hex
- **Accessible** — keyboard navigation, ARIA attributes, screen reader support
- **Zero runtime CSS** — plain CSS with `mantle-` prefixed classes, no CSS-in-JS
- **Tree-shakeable** — three separate entry points (`@mantleui/react`, `/three`, `/motion`) so optional deps stay optional
- **Live documentation** — 109 interactive pages with syntax highlighting

## Tech Stack

| Layer                 | Technology                             | Why                                                |
| --------------------- | -------------------------------------- | -------------------------------------------------- |
| **Monorepo**          | Turborepo + pnpm workspaces            | Parallel builds, caching, strict deps              |
| **Component library** | React 19, TypeScript 5.9 (strict)      | Modern React with full type safety                 |
| **3D (optional)**     | Three.js + @react-three/fiber + drei   | Advanced 3D components via `@mantleui/react/three` |
| **Motion (optional)** | framer-motion                          | Animation components via `@mantleui/react/motion`  |
| **Build**             | tsup (esbuild) — 3 entry points        | ESM + CJS + DTS output for core, three, motion     |
| **Styling**           | Plain CSS + CSS custom properties      | Zero runtime, framework-agnostic, tree-shakeable   |
| **Testing**           | Vitest + React Testing Library + jsdom | Fast ESM-native testing, behavioral tests          |
| **Documentation**     | Next.js 15 App Router                  | SSR, file-based routing, optimized builds          |
| **Live playgrounds**  | react-live + prism-react-renderer      | Editable code with syntax highlighting             |
| **Docs styling**      | Tailwind CSS v4                        | Utility-first for docs layout (not in the library) |
| **Icons**             | Lucide React                           | Tree-shakeable SVG icons for examples              |
| **CI/CD**             | GitHub Actions + Vercel                | Automated quality gates + production deploys       |
| **Linting**           | ESLint (flat config) + jsx-a11y        | Code quality + accessibility enforcement           |
| **Formatting**        | Prettier                               | Consistent code style                              |

## Architecture

```
mantleui/
├── packages/
│   ├── ui/              # Component library (published as @mantleui/react)
│   │   ├── src/
│   │   │   ├── components/   # 109 component directories
│   │   │   ├── hooks/        # useControllable, useComposedRefs, useId
│   │   │   ├── theme/        # ThemeProvider, CSS tokens, color system
│   │   │   ├── utils/        # polymorphic types, resolveColor, mergeProps
│   │   │   ├── index.ts      # Core entry
│   │   │   ├── three.ts      # 3D entry (@mantleui/react/three)
│   │   │   └── motion.ts     # Motion entry (@mantleui/react/motion)
│   │   ├── tsup.config.ts
│   │   └── vitest.config.ts
│   └── tsconfig/        # Shared TypeScript configs
├── apps/
│   └── docs/            # Next.js documentation site
│       └── src/
│           ├── app/components/   # 109 component doc pages
│           └── components/       # LivePlayground, CodeBlock, PropsTable, Sidebar
├── .github/workflows/ci.yml     # CI + deploy pipeline
├── turbo.json
└── pnpm-workspace.yaml
```

## Components (109)

### Form (22)

| Component     | Description                                          |
| ------------- | ---------------------------------------------------- |
| Input         | Text input with label, error, sizes, icons           |
| InputGroup    | Prefix/suffix addons around inputs                   |
| InputOTP      | One-time password input with individual digit fields |
| Autocomplete  | Input with filtered suggestion dropdown              |
| ComboBox      | Searchable select with keyboard navigation           |
| Checkbox      | Checkbox with label and indeterminate state          |
| CheckboxGroup | Group of checkboxes with shared state                |
| RadioGroup    | Radio button group with accent colors                |
| Switch        | Toggle switch with description and thumb icon        |
| Select        | Custom dropdown select with keyboard nav             |
| MultiSelect   | Multi-select with chips, clear all, maxItems         |
| Toggle        | Simple on/off toggle button                          |
| Slider        | Range slider with vertical, range, sizes, step marks |
| NumberField   | Numeric input with +/- buttons, prefix/suffix        |
| TextField     | Labeled text input with description/error            |
| TextArea      | Multi-line text input with resize control            |
| SearchField   | Search input with clear button and custom icon       |
| TimeField     | Custom time picker with hour/minute scroll columns   |
| Form          | Form wrapper with submit handling                    |
| Label         | Accessible form label                                |
| Description   | Helper text for form fields                          |
| ErrorMessage  | Error text with alert role                           |

### Interactive (11)

| Component         | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Button            | Polymorphic button with `as` prop, 3 variants, loading state |
| ButtonGroup       | Connected buttons with pill shape and dividers               |
| ToggleButton      | Toggle with solid/outline pressed states                     |
| ToggleButtonGroup | Single/multiple selection toggle group                       |
| Accordion         | Compound expand/collapse with grid animation                 |
| Tabs              | Underline + pill variants, vertical, separator               |
| Popover           | Positioned popup with portal, 12 placements                  |
| Dropdown          | Menu with sections, icons, keyboard nav                      |
| Disclosure        | Expand/collapse with smooth animation                        |
| DisclosureGroup   | Coordinated disclosure panels                                |
| Toolbar           | Horizontal/vertical action container                         |

### Feedback (6)

| Component   | Description                                          |
| ----------- | ---------------------------------------------------- |
| Alert       | Info/success/warning/error with icon                 |
| AlertDialog | Confirmation dialog with variants                    |
| Modal       | Dialog with opaque/blur/transparent backdrop         |
| Drawer      | Slide-in panel from any edge with exit animation     |
| Toast       | Notification system with 4 positions, exit animation |
| Tooltip     | Hover tooltip with 4 sides and delay                 |

### Date & Time (4)

| Component       | Description                              |
| --------------- | ---------------------------------------- |
| Calendar        | Month grid with navigation and selection |
| DatePicker      | Date input with calendar popup           |
| DateRangePicker | Start/end date range with calendar       |
| RadioCalendar   | Date selection as radio-style options    |

### Color (6)

| Component         | Description                                       |
| ----------------- | ------------------------------------------------- |
| ColorArea         | 2D saturation/brightness picker                   |
| ColorField        | Hex color text input                              |
| ColorSlider       | Hue/saturation/brightness channel slider          |
| ColorSwatch       | Color preview square                              |
| ColorSwatchPicker | Grid of selectable color swatches                 |
| ColorPicker       | Full color picker combining area + slider + field |

### Navigation (3)

| Component  | Description                           |
| ---------- | ------------------------------------- |
| Breadcrumb | Path breadcrumbs with separators      |
| Link       | Styled anchor with underline variants |
| Pagination | Page navigation with ellipsis         |

### Layout (4)

| Component    | Description                         |
| ------------ | ----------------------------------- |
| Card         | Container with header, body, footer |
| Separator    | Horizontal/vertical divider         |
| Surface      | Elevated surface with shadow levels |
| ScrollShadow | Scroll container with edge shadows  |

### Data Display (5)

| Component | Description                                          |
| --------- | ---------------------------------------------------- |
| Avatar    | User avatar with initials fallback                   |
| Badge     | Small label with solid/outline/subtle variants       |
| Chip      | Selectable/removable tag                             |
| DataField | Label-value pair display                             |
| DataTable | Sortable, paginated table with custom cell rendering |

### Utility (5)

| Component   | Description                      |
| ----------- | -------------------------------- |
| Spinner     | CSS-based loading spinner        |
| Skeleton    | Loading placeholder with shimmer |
| Kbd         | Keyboard shortcut display        |
| CloseButton | Icon-only close button           |
| FieldError  | Form field error wrapper         |

### Feedback Indicators (4)

| Component      | Description                        |
| -------------- | ---------------------------------- |
| ProgressBar    | Horizontal progress with track     |
| ProgressCircle | Circular progress indicator        |
| Meter          | Value gauge with threshold colors  |
| TagGroup       | Group of selectable/removable tags |

### Advanced (2)

| Component | Description                                |
| --------- | ------------------------------------------ |
| Fieldset  | Form fieldset with legend                  |
| ListBox   | Selectable list with custom item rendering |

### 3D / Three.js (11)

Optional — requires `three`, `@react-three/fiber`, and `@react-three/drei` as peer deps. Imported from `@mantleui/react/three`.

| Component      | Description                                               |
| -------------- | --------------------------------------------------------- |
| Globe          | Interactive 3D globe with markers, arcs, country outlines |
| ParticleField  | Animated floating particles with connection lines         |
| WaveField      | Sine wave mesh that ripples like water                    |
| Vortex         | Spiraling particle tornado / tunnel effect                |
| DNAHelix       | Rotating double helix with connecting rungs               |
| MorphingSphere | Sphere that deforms with noise / organic movement         |
| StarField      | Warp-speed star tunnel / hyperspace effect                |
| Aurora         | Flowing northern lights gradient ribbons                  |
| GridPlane      | Tron-style infinite perspective grid                      |
| Card3D         | Mouse-tracking 3D tilt card (pure CSS, no Three.js)       |
| FlipCard       | Click-to-flip card with front/back sides                  |

### Motion / Animation (10)

Optional — requires `framer-motion` as peer dep. Imported from `@mantleui/react/motion`.

| Component       | Description                                      |
| --------------- | ------------------------------------------------ |
| AnimatedCounter | Spring-animated number with prefix/suffix        |
| AnimatedList    | Staggered fade + slide list entry animation      |
| SpotlightCard   | Mouse-tracking radial gradient highlight         |
| MagneticButton  | Cursor-following pull effect with spring physics |
| Marquee         | Infinite horizontal scroll with pause-on-hover   |
| TypeWriter      | Text typing / deleting state machine with cursor |
| BlurReveal      | Scroll-triggered blur-to-clear content fade      |
| TextReveal      | Word-by-word scroll-triggered text reveal        |
| HoverCard       | Lift + shadow on hover with spring physics       |
| PulseDot        | Animated pulsing notification ring + core        |

### Carousels (7)

Imported from `@mantleui/react/motion`.

| Component         | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| Carousel          | Classic slider with drag, arrows, dots, autoplay, custom icons |
| CardCarousel      | Peek effect with scaled side cards                             |
| VerticalCarousel  | Vertical slider variant                                        |
| CoverflowCarousel | Apple-style 3D coverflow with rotateY                          |
| ParallaxCarousel  | Slides with parallax background images                         |
| ThumbnailCarousel | Main image + thumbnail strip navigation                        |
| FadeCarousel      | Pure cross-fade transitions                                    |

### Advanced Motion (8)

Imported from `@mantleui/react/motion`.

| Component      | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| BentoGrid      | Modern bento-box layout with hover tilt (compound API)          |
| ImageCompare   | Draggable before/after image slider                             |
| GradientText   | Animated flowing gradient through text (polymorphic)            |
| SplitFlap      | Airport-board-style flipping character cells                    |
| ScrollProgress | Smooth scroll progress bar (portaled, uses useScroll/useSpring) |
| AnimatedTabs   | Magic underline / pill indicator with shared layoutId           |
| FloatingDock   | macOS-style dock with cursor-proximity magnification            |
| DragDropList   | Generic reorderable list via Reorder.Group/Item                 |

## Design Patterns Demonstrated

| Pattern                     | Components                                                              |
| --------------------------- | ----------------------------------------------------------------------- |
| **Compound components**     | Accordion, Tabs, Modal, Dropdown, Card, Breadcrumb, Popover, Disclosure |
| **Controlled/uncontrolled** | All form components via `useControllable` hook                          |
| **Polymorphic `as` prop**   | Button (renders as `<a>`, `<span>`, etc.)                               |
| **Render props**            | DataTable cells, ListBox `renderItem`                                   |
| **Headless hooks**          | `usePopover()`, `useDataTable()`, `useToast()`                          |
| **Context-based theming**   | ThemeProvider with `useSyncExternalStore`                               |
| **Portal rendering**        | Modal, Drawer, AlertDialog, Toast, Popover                              |
| **CSS grid animation**      | Accordion, Disclosure (grid-template-rows 0fr → 1fr)                    |
| **Custom color system**     | 6 presets + any hex via `resolveColor()` utility                        |

## Custom Hooks

| Hook              | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `useControllable` | Controlled/uncontrolled state with functional updates |
| `useComposedRefs` | Merge multiple refs into one                          |
| `useId`           | SSR-safe unique ID generation                         |
| `usePopover`      | Headless popover positioning and state                |
| `useDataTable`    | Sort, paginate, and manage table state                |
| `useToast`        | Toast notification dispatch and state                 |
| `useTheme`        | Access current theme mode and toggle                  |

## Color System

Every component accepts a `color` prop:

```tsx
// Preset colors
<Button color="blue">Blue</Button>
<Button color="red">Red</Button>
<Button color="green">Green</Button>
<Button color="yellow">Yellow</Button>
<Button color="purple">Purple</Button>
<Button color="neutral">Neutral</Button>

// Custom hex colors
<Button color="#345792">Custom</Button>
<Slider color="#ff6b35" defaultValue={50} />
```

Preset colors use `data-color` attribute + CSS custom properties. Custom hex colors set `--mantle-accent` variables inline via `resolveColor()`.

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Setup

```bash
# Clone
git clone https://github.com/Ako2003/mantleui.git
cd mantleui

# Install
pnpm install

# Development (all packages)
pnpm dev

# Run tests
pnpm test

# Lint + format
pnpm lint
pnpm format:check

# Build
pnpm build
```

### Using the Library

```bash
pnpm add @mantleui/react
```

```tsx
import { Button, ThemeProvider } from "@mantleui/react";
import "@mantleui/react/styles.css";

function App() {
  return (
    <ThemeProvider>
      <Button color="blue" variant="solid">
        Click me
      </Button>
    </ThemeProvider>
  );
}
```

### Optional 3D components

```bash
pnpm add three @react-three/fiber @react-three/drei
```

```tsx
import { Globe, Card3D } from "@mantleui/react/three";
import "@mantleui/react/three-styles.css";
```

### Optional motion components

```bash
pnpm add framer-motion
```

```tsx
import { BentoGrid, Carousel, FloatingDock } from "@mantleui/react/motion";
import "@mantleui/react/motion-styles.css";
```

## Project Scripts

| Script              | Description                    |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Start all packages in dev mode |
| `pnpm build`        | Build all packages             |
| `pnpm test`         | Run all tests                  |
| `pnpm lint`         | ESLint all packages            |
| `pnpm typecheck`    | TypeScript type checking       |
| `pnpm format:check` | Check Prettier formatting      |
| `pnpm format`       | Fix Prettier formatting        |

## CI/CD Pipeline

Every push to `main` runs:

1. **Format check** — Prettier
2. **Lint** — ESLint with jsx-a11y
3. **Type check** — TypeScript strict mode
4. **Test** — 676+ Vitest tests
5. **Build** — tsup (ESM + CJS + DTS)
6. **Deploy** — Vercel production (only if all above pass)

## License

MIT
