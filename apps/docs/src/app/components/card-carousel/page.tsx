"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const CardCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.CardCarousel),
  { ssr: false },
);

const cardCarouselProps = [
  {
    name: "slides",
    type: "ReactNode[]",
    description: "The slides/cards to render.",
  },
  {
    name: "value",
    type: "number",
    description: "Controlled current slide index.",
  },
  {
    name: "defaultValue",
    type: "number",
    default: "0",
    description: "Default current slide index (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(index: number) => void",
    description: "Called when the current slide changes.",
  },
  {
    name: "autoplay",
    type: "boolean",
    default: "false",
    description: "Whether the carousel auto-advances.",
  },
  {
    name: "interval",
    type: "number",
    default: "3000",
    description: "Autoplay interval in ms.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "true",
    description: "Whether to wrap around at edges.",
  },
  {
    name: "peekScale",
    type: "number",
    default: "0.85",
    description: "Scale factor applied to the previous/next peek cards.",
  },
  {
    name: "peekOpacity",
    type: "number",
    default: "0.6",
    description: "Opacity applied to the previous/next peek cards.",
  },
  {
    name: "peekDistance",
    type: "number",
    default: "60",
    description:
      "Horizontal distance (as percent of slide width) from center where the peek cards are positioned. Higher values push side cards further out.",
  },
];

const testimonials = [
  {
    quote:
      "This component library saved us weeks of work. The polish is unreal.",
    name: "Ava Chen",
    role: "Staff Engineer, Lumen",
  },
  {
    quote:
      "The API is intuitive and the animations feel buttery smooth on every device.",
    name: "Marcus Okafor",
    role: "Design Lead, Northwind",
  },
  {
    quote:
      "Accessibility was clearly a first-class concern. Our audit passed on the first try.",
    name: "Priya Shah",
    role: "Frontend Architect, Helios",
  },
  {
    quote: "A joy to integrate. Every detail is considered and documented.",
    name: "Lucas Martin",
    role: "Senior Developer, Arcadia",
  },
  {
    quote:
      "Ship high-quality interfaces faster than ever. It's genuinely delightful.",
    name: "Noa Weiss",
    role: "Product Engineer, Beacon",
  },
];

const testimonialSlides = testimonials.map((t) => (
  <div
    key={t.name}
    className="flex h-64 w-full flex-col justify-between rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6"
  >
    <p className="text-lg text-zinc-100">“{t.quote}”</p>
    <div>
      <p className="text-sm font-semibold text-white">{t.name}</p>
      <p className="text-xs text-zinc-500">{t.role}</p>
    </div>
  </div>
));

export default function CardCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">CardCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A carousel that centers the active card and scales down the neighboring
        peek cards for a focused, stack-like presentation. Perfect for
        testimonials, product highlights, and feature showcases.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Navigate with the arrows or drag to swipe between cards.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <CardCarousel slides={testimonialSlides} defaultValue={0} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Wider peek</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Push the side cards further out with <code>peekDistance</code>. Try{" "}
        <code>90</code> for a more airy layout where the neighbors are almost
        fully visible.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <CardCarousel
            slides={testimonialSlides}
            defaultValue={0}
            loop
            peekDistance={90}
            peekOpacity={0.75}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Tight stack</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Smaller <code>peekDistance</code> values (e.g. <code>35</code>) stack
        the cards closer together for a more layered, peeking-behind look.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <CardCarousel
            slides={testimonialSlides}
            defaultValue={0}
            loop
            peekDistance={35}
            peekScale={0.8}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { CardCarousel } from "@mantleui/react/motion";

const slides = testimonials.map((t) => (
  <div key={t.name}>{t.quote}</div>
));

// Default
<CardCarousel slides={slides} defaultValue={0} loop />

// Wider side cards
<CardCarousel slides={slides} peekDistance={90} peekOpacity={0.75} />

// Tight stacked look
<CardCarousel slides={slides} peekDistance={35} peekScale={0.8} />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={cardCarouselProps} />
    </div>
  );
}
