"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";

const Card3D = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.Card3D),
  { ssr: false },
);

const FlipCard = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.FlipCard),
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
          <div style={{ width: 280, padding: 16 }}>
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
          <div style={{ width: 280, padding: 16 }}>
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
          <div style={{ width: 280, padding: 16 }}>
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

      <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-slate-50 p-4 text-xs dark:bg-zinc-900 sm:text-sm">
        <code>{`import { Card3D } from "@mantleui/react/three";

<Card3D maxTilt={15} glare>
  <div style={{ width: 280, padding: 16 }}>
    <h3>Component Library</h3>
    <p>73 production-grade components.</p>
  </div>
</Card3D>

// Custom colors
<Card3D
  borderColor="#8b5cf640"
  background="rgba(139, 92, 246, 0.05)"
>
  <div>Purple tinted card</div>
</Card3D>

// Stronger tilt
<Card3D maxTilt={25}>
  <div>More dramatic tilt effect</div>
</Card3D>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">No Glare</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Subtle tilt without the glare overlay — great for minimal designs.
      </p>
      <div className="mt-4 flex flex-wrap gap-6">
        <Card3D glare={false} maxTilt={8} borderColor="#3b82f640" background="rgba(59, 130, 246, 0.04)">
          <div style={{ width: 260, padding: 16 }}>
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
          <div style={{ width: 260, padding: 16 }}>
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

      <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-slate-50 p-4 text-xs dark:bg-zinc-900 sm:text-sm">
        <code>{`// No glare, subtle tilt
<Card3D
  glare={false}
  maxTilt={8}
  borderColor="#3b82f640"
  background="rgba(59, 130, 246, 0.04)"
>
  <div>
    <h3>Pro Plan</h3>
    <p>$19/month</p>
    <ul>
      <li>Unlimited projects</li>
      <li>Priority support</li>
    </ul>
  </div>
</Card3D>`}</code>
      </pre>

      <h2 className="mt-14 text-2xl font-bold">FlipCard</h2>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A card that flips on click to reveal a back side. Supports horizontal
        and vertical flip directions.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Click to Flip</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click on any card to see the flip animation.
      </p>
      <div className="mt-4 flex flex-wrap gap-6">
        {/* Card 1: Profile card */}
        <FlipCard
          width={300}
          height={220}
          frontBackground="linear-gradient(145deg, #1e1b4b, #312e81)"
          backBackground="linear-gradient(145deg, #312e81, #1e1b4b)"
          borderColor="#4338ca40"
          front={
            <div style={{ padding: 28, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #818cf8, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#e0e7ff", letterSpacing: "-0.01em" }}>Alex Rivera</h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#818cf8" }}>Senior Engineer</p>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#6366f180" }}>Click to see details</p>
            </div>
          }
          back={
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Location", value: "San Francisco, CA" },
                  { label: "Experience", value: "8 years" },
                  { label: "Stack", value: "React, TypeScript, Go" },
                  { label: "Status", value: "Available" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#818cf8" }}>{item.label}</span>
                    <span style={{ color: "#e0e7ff", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 11, color: "#6366f180", textAlign: "center" }}>Click to flip back</p>
            </div>
          }
        />

        {/* Card 2: Gradient stats */}
        <FlipCard
          width={300}
          height={220}
          frontBackground="linear-gradient(135deg, #0ea5e9, #2563eb, #7c3aed)"
          backBackground="linear-gradient(135deg, #7c3aed, #db2777, #f43f5e)"
          borderColor="transparent"
          front={
            <div style={{ padding: 28, textAlign: "center", width: "100%", color: "white" }}>
              <h3 style={{ margin: 0, fontSize: 42, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>73+</h3>
              <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 600, opacity: 0.9 }}>Components</p>
              <div style={{ margin: "16px auto 0", width: 40, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.3)" }} />
              <p style={{ margin: "12px 0 0", fontSize: 12, opacity: 0.5 }}>Click to reveal more</p>
            </div>
          }
          back={
            <div style={{ padding: 28, textAlign: "center", width: "100%", color: "white" }}>
              <h3 style={{ margin: 0, fontSize: 42, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>676+</h3>
              <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 600, opacity: 0.9 }}>Tests Passing</p>
              <div style={{ margin: "16px auto 0", width: 40, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.3)" }} />
              <p style={{ margin: "12px 0 0", fontSize: 12, opacity: 0.5 }}>Click to flip back</p>
            </div>
          }
        />

        {/* Card 3: Dark feature card with vertical flip */}
        <FlipCard
          width={300}
          height={220}
          direction="vertical"
          frontBackground="#09090b"
          backBackground="#09090b"
          borderColor="#22c55e30"
          front={
            <div style={{ padding: 28, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>Fully Tested</h3>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "#a1a1aa", lineHeight: 1.5, textAlign: "center" }}>Every component has unit and integration tests</p>
              <p style={{ margin: "10px 0 0", fontSize: 11, color: "#22c55e50" }}>Click for vertical flip</p>
            </div>
          }
          back={
            <div style={{ padding: 28, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                {[
                  { n: "74", label: "Test Files" },
                  { n: "676", label: "Tests" },
                  { n: "100%", label: "Pass Rate" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#22c55e" }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#a1a1aa", textAlign: "center", lineHeight: 1.5 }}>
                Vitest + React Testing Library + jsdom
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#22c55e50" }}>Click to flip back</p>
            </div>
          }
        />
      </div>

      <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-slate-50 p-4 text-xs dark:bg-zinc-900 sm:text-sm">
        <code>{`import { FlipCard } from "@mantleui/react/three";

// Basic horizontal flip
<FlipCard
  width={300}
  height={220}
  frontBackground="#18181b"
  backBackground="#18181b"
  borderColor="#27272a"
  front={
    <div style={{ padding: 24, textAlign: "center" }}>
      <h3>Front Side</h3>
      <p>Click to flip</p>
    </div>
  }
  back={
    <div style={{ padding: 24, textAlign: "center" }}>
      <p>Back side content here</p>
    </div>
  }
/>

// Gradient backgrounds
<FlipCard
  width={300}
  height={220}
  frontBackground="linear-gradient(135deg, #0ea5e9, #7c3aed)"
  backBackground="linear-gradient(135deg, #7c3aed, #f43f5e)"
  borderColor="transparent"
  front={<div>Front</div>}
  back={<div>Back</div>}
/>

// Vertical flip
<FlipCard
  direction="vertical"
  front={<div>Flips top to bottom</div>}
  back={<div>Back content</div>}
/>

// Controlled
const [flipped, setFlipped] = useState(false);
<FlipCard
  flipped={flipped}
  onFlippedChange={setFlipped}
  front={<div>Controlled front</div>}
  back={<div>Controlled back</div>}
/>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={card3DProps} />
    </div>
  );
}
