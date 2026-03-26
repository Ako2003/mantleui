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
      className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md transition-colors hover:bg-zinc-700/50"
      style={{ color: copied ? "#22c55e" : "#71717a" }}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
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
            <LiveEditor className="!font-mono !text-sm" />
          </div>
        )}
        {noEditor && (
          <div className="relative border-t border-slate-200 dark:border-zinc-800">
            <CopyButton code={code} />
            <pre
              className="overflow-x-auto p-4 font-mono text-sm"
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
