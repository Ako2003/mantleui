"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const Globe = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: 400,
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mantle-color-text-muted)",
        }}
      >
        Loading globe...
      </div>
    ),
  },
);

const markers = [
  { lat: 40.7, lng: -74, label: "New York" },
  { lat: 51.5, lng: -0.1, label: "London" },
  { lat: 35.7, lng: 139.7, label: "Tokyo" },
  { lat: -33.9, lng: 151.2, label: "Sydney" },
  { lat: 48.9, lng: 2.35, label: "Paris" },
  { lat: 55.75, lng: 37.6, label: "Moscow" },
  { lat: -23.5, lng: -46.6, label: "São Paulo" },
  { lat: 1.35, lng: 103.8, label: "Singapore" },
];

const arcs = [
  { startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 },
  { startLat: 51.5, startLng: -0.1, endLat: 35.7, endLng: 139.7 },
  { startLat: 35.7, startLng: 139.7, endLat: -33.9, endLng: 151.2 },
  { startLat: 40.7, startLng: -74, endLat: -23.5, endLng: -46.6 },
  { startLat: 48.9, startLng: 2.35, endLat: 1.35, endLng: 103.8 },
];

const globeProps = [
  {
    name: "size",
    type: "number",
    default: "400",
    description: "Globe size in pixels.",
  },
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Accent color for markers, arcs, and glow.",
  },
  {
    name: "dotColor",
    type: "string",
    default: '"rgba(255,255,255,0.3)"',
    description: "Color of the dot grid on the globe surface.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    description: "Background color of the container.",
  },
  {
    name: "autoRotateSpeed",
    type: "number",
    default: "0.5",
    description: "Auto-rotation speed. Set to 0 to disable.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "true",
    description: "Allow drag-to-rotate interaction.",
  },
  {
    name: "markers",
    type: "GlobeMarker[]",
    description: "Array of markers with lat, lng, label, color, and size.",
  },
  {
    name: "arcs",
    type: "GlobeArc[]",
    description: "Array of arcs connecting two lat/lng points.",
  },
];

export default function GlobePage() {
  const [color, setColor] = useState("#3b82f6");
  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">Globe</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An interactive 3D globe with dot grid, markers, and arcs. Built with
        Three.js, @react-three/fiber, and @react-three/drei.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Drag to rotate. Markers show major cities, arcs show connections.
      </p>
      <div className="mt-4 flex flex-wrap items-start gap-6">
        <div className="rounded-xl border border-slate-200 bg-black p-4 dark:border-zinc-800">
          <Globe
            size={550}
            color={color}
            markers={markers}
            arcs={arcs}
            autoRotateSpeed={0.3}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Accent Color
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: c,
                  border:
                    color === c ? "2px solid white" : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">World Map Globe</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">showCountries</code> to
        render real country outlines instead of the dot grid.
      </p>
      <div className="mt-4 flex flex-wrap items-start gap-6">
        <div className="rounded-xl border border-slate-200 bg-black p-4 dark:border-zinc-800">
          <Globe
            size={550}
            color="#22c55e"
            showCountries
            countryColor="rgba(255,255,255,0.7)"
            markers={markers}
            arcs={arcs}
            autoRotateSpeed={0.2}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Clean World Map</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A minimal globe showing only country outlines — no markers or arcs.
      </p>
      <div className="mt-4 flex flex-wrap items-start gap-6">
        <div className="rounded-xl border border-slate-200 bg-black p-4 dark:border-zinc-800">
          <Globe
            size={550}
            color="#3b82f6"
            showCountries
            countryColor="rgba(100,180,255,0.5)"
            autoRotateSpeed={0.4}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock code={`import { Globe } from "@mantleui/react/three";

<Globe
  size={400}
  color="#3b82f6"
  markers={[
    { lat: 40.7, lng: -74, label: "New York" },
    { lat: 51.5, lng: -0.1, label: "London" },
  ]}
  arcs={[
    { startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 },
  ]}
/>`} />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={globeProps} />
    </div>
  );
}
