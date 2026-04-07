"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";

const Card3D = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.Card3D),
  { ssr: false },
);

const card3DProps = [
  { name: "children", type: "ReactNode", description: "Card content." },
  {
    name: "maxTilt",
    type: "number",
    default: "15",
    description: "Max tilt angle in degrees.",
  },
  {
    name: "perspective",
    type: "number",
    default: "1000",
    description: "CSS perspective distance in pixels.",
  },
  {
    name: "resetSpeed",
    type: "number",
    default: "400",
    description: "Transition speed (ms) when mouse leaves.",
  },
  {
    name: "hoverScale",
    type: "number",
    default: "1.02",
    description: "Scale factor on hover.",
  },
  {
    name: "glare",
    type: "boolean",
    default: "true",
    description: "Enable glare overlay effect.",
  },
  {
    name: "maxGlare",
    type: "number",
    default: "0.15",
    description: "Maximum glare opacity (0-1).",
  },
  {
    name: "borderColor",
    type: "string",
    default: '"var(--mantle-color-border)"',
    description: "Border color.",
  },
  {
    name: "background",
    type: "string",
    default: '"var(--mantle-color-bg-subtle)"',
    description: "Background color.",
  },
  {
    name: "borderRadius",
    type: "string | number",
    default: "12",
    description: "Border radius in pixels or CSS value.",
  },
];

export default function Card3DPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Card3D</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A card with 3D perspective tilt that follows the mouse cursor. Pure
        CSS/JS — does not require Three.js. Includes an optional glare overlay
        effect.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover over the cards to see the 3D tilt and glare effect.
      </p>
      <div className="mt-4 flex flex-wrap gap-6">
        <Card3D>
          <div style={{ width: 280, padding: 8 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "var(--mantle-color-text)",
              }}
            >
              Component Library
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                color: "var(--mantle-color-text-muted)",
                lineHeight: 1.5,
              }}
            >
              73 production-grade components with full TypeScript support and
              accessibility.
            </p>
          </div>
        </Card3D>

        <Card3D
          color="#8b5cf6"
          borderColor="#8b5cf640"
          background="rgba(139, 92, 246, 0.05)"
        >
          <div style={{ width: 280, padding: 8 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "var(--mantle-color-text)",
              }}
            >
              Type Safe
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                color: "var(--mantle-color-text-muted)",
                lineHeight: 1.5,
              }}
            >
              Strict TypeScript with no <code>any</code> escapes and full prop
              inference.
            </p>
          </div>
        </Card3D>

        <Card3D
          maxTilt={25}
          borderColor="#22c55e40"
          background="rgba(34, 197, 94, 0.05)"
        >
          <div style={{ width: 280, padding: 8 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #22c55e, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "var(--mantle-color-text)",
              }}
            >
              676+ Tests
            </h3>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                color: "var(--mantle-color-text-muted)",
                lineHeight: 1.5,
              }}
            >
              Comprehensive test coverage with Vitest and React Testing Library.
            </p>
          </div>
        </Card3D>
      </div>

      <h2 className="mt-10 text-xl font-semibold">No Glare</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Subtle tilt without the glare overlay — great for minimal designs.
      </p>
      <div className="mt-4 flex flex-wrap gap-6">
        <Card3D glare={false} maxTilt={8} borderColor="#3b82f640" background="rgba(59, 130, 246, 0.04)">
          <div style={{ width: 260, padding: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--mantle-color-text)" }}>Pro Plan</h3>
                <p style={{ margin: 0, fontSize: 12, color: "var(--mantle-color-text-muted)" }}>$19/month</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Unlimited projects", "Priority support", "Custom domains"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--mantle-color-text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </Card3D>

        <Card3D glare={false} maxTilt={8} borderColor="#8b5cf640" background="rgba(139, 92, 246, 0.04)">
          <div style={{ width: 260, padding: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--mantle-color-text)" }}>Enterprise</h3>
                <p style={{ margin: 0, fontSize: 12, color: "var(--mantle-color-text-muted)" }}>$49/month</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Everything in Pro", "SSO & SAML", "Dedicated support"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--mantle-color-text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </Card3D>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm dark:bg-zinc-900">
        <code>{`import { Card3D } from "@mantleui/react/three";

<Card3D maxTilt={15} glare>
  <h3>Hover me</h3>
  <p>I tilt in 3D with a glare effect!</p>
</Card3D>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={card3DProps} />
    </div>
  );
}
