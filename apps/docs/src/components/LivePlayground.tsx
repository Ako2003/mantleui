"use client";

import React, { useCallback, useState } from "react";
import { LiveProvider, LivePreview, LiveEditor, LiveError } from "react-live";
import type { PrismTheme } from "prism-react-renderer";
import * as MantleUI from "@mantleui/react";

const scope = { React, ...MantleUI };

const darkTheme: PrismTheme = {
  plain: {
    color: "#e4e4e7",
    backgroundColor: "#18181b",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#71717a" },
    },
    { types: ["punctuation"], style: { color: "#a1a1aa" } },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#7dd3fc" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: { color: "#86efac" },
    },
    { types: ["operator", "entity", "url"], style: { color: "#a1a1aa" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#c4b5fd" } },
    { types: ["function", "class-name"], style: { color: "#fde68a" } },
    { types: ["regex", "important", "variable"], style: { color: "#fca5a5" } },
  ],
};

interface LivePlaygroundProps {
  code: string;
  noEditor?: boolean;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 rounded-md px-2.5 py-1 text-xs font-medium transition-all backdrop-blur-sm"
      style={{
        background: copied ? "rgba(34, 197, 94, 0.15)" : "#27272a",
        color: copied ? "#22c55e" : "#a1a1aa",
        border: `1px solid ${copied ? "rgba(34, 197, 94, 0.3)" : "#3f3f46"}`,
      }}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </span>
      ) : (
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </span>
      )}
    </button>
  );
}

export function LivePlayground({
  code,
  noEditor = false,
}: LivePlaygroundProps) {
  const hasRender = code.includes("render(");

  return (
    <LiveProvider
      code={code}
      scope={scope}
      noInline={hasRender}
      theme={darkTheme}
    >
      <div className="rounded-lg border border-slate-200 dark:border-zinc-800">
        <div className="rounded-t-lg bg-white p-6 dark:bg-zinc-950">
          <LivePreview />
        </div>
        <LiveError className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400" />
        {!noEditor && (
          <div className="relative border-t border-slate-200 dark:border-zinc-800">
            <CopyButton code={code} />
            <LiveEditor className="!font-mono !text-sm !pr-20" />
          </div>
        )}
        {noEditor && (
          <div className="relative border-t border-slate-200 dark:border-zinc-800">
            <CopyButton code={code} />
            <pre
              className="overflow-x-auto p-4 pr-20 font-mono text-sm"
              style={{
                backgroundColor: "#18181b",
                color: "#e4e4e7",
                margin: 0,
              }}
            >
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </LiveProvider>
  );
}
