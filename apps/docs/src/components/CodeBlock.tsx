"use client";

import { useCallback, useState } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { useTheme } from "@mantleui/react";

const darkTheme: PrismTheme = {
  plain: { color: "#e4e4e7", backgroundColor: "#18181b" },
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

const lightTheme: PrismTheme = {
  plain: { color: "#1e293b", backgroundColor: "#f8fafc" },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#94a3b8" },
    },
    { types: ["punctuation"], style: { color: "#64748b" } },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#0369a1" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: { color: "#15803d" },
    },
    { types: ["operator", "entity", "url"], style: { color: "#64748b" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#7c3aed" } },
    { types: ["function", "class-name"], style: { color: "#b45309" } },
    { types: ["regex", "important", "variable"], style: { color: "#dc2626" } },
  ],
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-zinc-500 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-300"
      style={copied ? { color: "#22c55e" } : undefined}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      )}
    </button>
  );
}

export function CodeBlock({ code }: { code: string }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <div className="relative mt-4 grid grid-cols-[minmax(0,1fr)] rounded-lg border border-slate-200 dark:border-zinc-800">
      <CopyButton code={code} />
      <Highlight code={code.trim()} language="tsx" theme={theme}>
        {({ style: highlightStyle, tokens, getLineProps, getTokenProps }) => {
          const safeStyle = { ...highlightStyle };
          delete safeStyle.background;
          delete safeStyle.backgroundColor;
          return (
            <pre
              className="m-0 max-h-80 overflow-auto bg-slate-50 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900 sm:text-sm"
              style={safeStyle}
            >
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, j) => (
                      <span key={j} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          );
        }}
      </Highlight>
    </div>
  );
}
