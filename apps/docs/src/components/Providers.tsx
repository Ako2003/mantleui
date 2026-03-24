"use client";

import { ThemeProvider } from "@mantleui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
