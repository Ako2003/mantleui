"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={50} label="Volume" />
</div>`;

const showValueExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={75} label="Brightness" showValue />
</div>`;

const volumeExample = `function Demo() {
  const [volume, setVolume] = React.useState(33);
  return (
    <div style={{ maxWidth: "400px" }}>
      <Slider
        value={volume}
        onValueChange={setVolume}
        label="Volume"
        showValue
        size="lg"
      />
    </div>
  );
}

render(<Demo />);`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "320px" }}>
  <Slider defaultValue={40} label="Small" size="sm" />
  <Slider defaultValue={60} label="Medium" size="md" />
  <Slider defaultValue={80} label="Large" size="lg" />
</div>`;

const rangeExample = `function Demo() {
  const [range, setRange] = React.useState([20, 80]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <Slider
        value={range}
        onValueChange={setRange}
        label="Price Range"
        showValue
      />
    </div>
  );
}

render(<Demo />);`;

const rangeMinMaxExample = `function Demo() {
  const [range, setRange] = React.useState([200, 800]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <Slider
        value={range}
        onValueChange={setRange}
        min={0}
        max={1000}
        step={50}
        label="Budget ($)"
        showValue
        color="green"
      />
    </div>
  );
}

render(<Demo />);`;

const stepsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "360px" }}>
  <Slider
    defaultValue={40}
    step={20}
    showSteps
    label="Coarse (step 20)"
    showValue
  />
  <Slider
    defaultValue={50}
    step={10}
    showSteps
    label="Fine (step 10)"
    showValue
    color="purple"
  />
  <Slider
    defaultValue={[200, 600]}
    min={0}
    max={1000}
    step={100}
    showSteps
    label="Budget Range"
    showValue
    color="green"
  />
</div>`;

const verticalExample = `<div style={{ display: "flex", gap: "40px", height: "200px" }}>
  <Slider orientation="vertical" defaultValue={70} color="blue" />
  <Slider orientation="vertical" defaultValue={45} color="green" />
  <Slider orientation="vertical" defaultValue={90} color="purple" />
  <Slider orientation="vertical" defaultValue={30} color="red" />
</div>`;

const verticalSizesExample = `<div style={{ display: "flex", gap: "40px", height: "180px" }}>
  <Slider orientation="vertical" defaultValue={60} size="sm" />
  <Slider orientation="vertical" defaultValue={60} size="md" />
  <Slider orientation="vertical" defaultValue={60} size="lg" />
</div>`;

const minMaxExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={500} min={100} max={1000} step={50} label="Price" showValue />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState(30);
  return (
    <div style={{ maxWidth: "320px" }}>
      <Slider value={value} onValueChange={setValue} label="Opacity" showValue />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Value: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Slider defaultValue={60} color="blue" label="Blue" />
  <Slider defaultValue={60} color="green" label="Green" />
  <Slider defaultValue={60} color="purple" label="Purple" />
  <Slider defaultValue={60} color="red" label="Red" />
  <Slider defaultValue={60} color="yellow" label="Yellow" />
  <Slider defaultValue={60} color="neutral" label="Neutral" />
</div>`;

const disabledExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={40} label="Disabled" disabled />
</div>`;

const equalizerExample = `function Demo() {
  const [bands, setBands] = React.useState([60, 75, 45, 80, 55, 70, 65]);
  const labels = ["60Hz", "250Hz", "1kHz", "4kHz", "8kHz", "12kHz", "16kHz"];
  return (
    <div>
      <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--mantle-color-text)", marginBottom: "24px" }}>
        Equalizer
      </p>
      <div style={{ display: "flex", gap: "24px", height: "160px" }}>
        {bands.map((val, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <Slider
                orientation="vertical"
                value={val}
                onValueChange={(v) => {
                  const next = [...bands];
                  next[i] = v;
                  setBands(next);
                }}
                color="purple"
                size="sm"
              />
            </div>
            <span style={{ fontSize: "10px", color: "var(--mantle-color-text-muted)", flexShrink: 0 }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

render(<Demo />);`;

const sliderProps = [
  {
    name: "value",
    type: "number | [number, number]",
    description: "Controlled value. Pass a tuple for range mode.",
  },
  {
    name: "defaultValue",
    type: "number | [number, number]",
    default: "0",
    description: "Default value (uncontrolled). Pass a tuple for range mode.",
  },
  {
    name: "onValueChange",
    type: "(value: number | [number, number]) => void",
    description: "Called when the value changes.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "Minimum value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "Step increment.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the slider track and thumb.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Track and thumb size.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Slider orientation.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the slider.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the slider.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Displays the current value next to the label.",
  },
  {
    name: "showSteps",
    type: "boolean",
    default: "false",
    description:
      "Displays visible tick marks at each step interval on the track.",
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

export default function SliderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Slider</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A custom range slider with support for single value, range (two thumbs),
        vertical orientation, and multiple sizes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Show Value</h2>
      <div className="mt-4">
        <LivePlayground code={showValueExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Volume Control</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A large slider matching common media player designs.
      </p>
      <div className="mt-4">
        <LivePlayground code={volumeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Range</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Pass a{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          [min, max]
        </code>{" "}
        tuple to enable two-thumb range selection.
      </p>
      <div className="mt-4">
        <LivePlayground code={rangeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Range with Step</h2>
      <div className="mt-4">
        <LivePlayground code={rangeMinMaxExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Step Marks</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Enable{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          showSteps
        </code>{" "}
        to display visible tick marks at each step interval.
      </p>
      <div className="mt-4">
        <LivePlayground code={stepsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={verticalSizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Equalizer</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Vertical sliders composed into a frequency equalizer.
      </p>
      <div className="mt-4">
        <LivePlayground code={equalizerExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Min / Max / Step</h2>
      <div className="mt-4">
        <LivePlayground code={minMaxExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={sliderProps} />
    </div>
  );
}
