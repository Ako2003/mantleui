"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";

const WorldMap = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.WorldMap),
  { ssr: false },
);

const sampleData = [
  { code: "US", value: 1200 },
  { code: "GB", value: 800 },
  { code: "DE", value: 450 },
  { code: "FR", value: 380 },
  { code: "CA", value: 320 },
  { code: "AU", value: 280 },
  { code: "JP", value: 250 },
  { code: "BR", value: 220 },
  { code: "IN", value: 190 },
  { code: "KR", value: 170 },
  { code: "NL", value: 150 },
  { code: "SE", value: 130 },
  { code: "IT", value: 120 },
  { code: "ES", value: 110 },
  { code: "MX", value: 95 },
  { code: "RU", value: 85 },
  { code: "PL", value: 75 },
  { code: "TR", value: 65 },
  { code: "AR", value: 55 },
  { code: "NG", value: 45 },
  { code: "UA", value: 40 },
  { code: "VN", value: 35 },
  { code: "PH", value: 30 },
  { code: "TH", value: 28 },
  { code: "SG", value: 25 },
];

const worldMapProps = [
  {
    name: "data",
    type: "WorldMapData[]",
    description:
      'Array of { code, value, label? }. Code is ISO alpha-2 (e.g. "US") or UN M49 numeric.',
  },
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Base color for the choropleth gradient.",
  },
  {
    name: "emptyColor",
    type: "string",
    default: '"#e2e8f0"',
    description: "Fill color for countries with no data.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    description: "Background color of the container.",
  },
  {
    name: "strokeColor",
    type: "string",
    default: '"white"',
    description: "Border color between countries.",
  },
  {
    name: "showTooltip",
    type: "boolean",
    default: "true",
    description: "Show tooltip on hover with country name and value.",
  },
  {
    name: "renderTooltip",
    type: "(data, name) => ReactNode",
    description: "Custom tooltip renderer.",
  },
  {
    name: "onCountryClick",
    type: "(code, name, data?) => void",
    description: "Called when a country is clicked.",
  },
  {
    name: "height",
    type: "number | string",
    default: "400",
    description: "Height of the map container.",
  },
  {
    name: "legend",
    type: '"bottom-left" | "bottom-right" | "top-left" | "top-right" | "none"',
    default: '"bottom-left"',
    description: "Legend position. Set to none to hide.",
  },
  {
    name: "title",
    type: "string",
    description: "Title text displayed above the map.",
  },
  {
    name: "subtitle",
    type: "string",
    description: "Subtitle text displayed below the title.",
  },
];

export default function WorldMapPage() {
  const [color, setColor] = useState("#3b82f6");
  const [clicked, setClicked] = useState("");
  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">WorldMap</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An interactive SVG world map with choropleth coloring, tooltips, click
        events, and legends. Zero runtime dependencies — all country paths are
        embedded.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover for tooltips, click for events. Data shows visitor counts by
        country.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <WorldMap
          data={sampleData}
          color={color}
          title="Visitors by Country"
          subtitle={`${sampleData.length} countries`}
          height={420}
          emptyColor="#f1f5f9"
          strokeColor="#ffffff"
          onCountryClick={(code, name, data) =>
            setClicked(`${name} (${code}): ${data?.value ?? "no data"}`)
          }
        />
      </div>
      {clicked && (
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
          Clicked: {clicked}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Color
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: c,
                  border:
                    color === c
                      ? "2px solid var(--mantle-color-text)"
                      : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dark Theme</h2>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950">
        <WorldMap
          data={sampleData}
          color="#8b5cf6"
          emptyColor="#27272a"
          strokeColor="#3f3f46"
          backgroundColor="#09090b"
          title="Global Traffic"
          subtitle="Last 30 days"
          height={380}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm dark:bg-zinc-900">
        <code>{`import { WorldMap } from "@mantleui/react/three";

<WorldMap
  data={[
    { code: "US", value: 1200 },
    { code: "GB", value: 800 },
    { code: "DE", value: 450 },
  ]}
  color="#3b82f6"
  title="Visitors by Country"
  onCountryClick={(code, name) => console.log(code, name)}
/>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={worldMapProps} />
    </div>
  );
}
