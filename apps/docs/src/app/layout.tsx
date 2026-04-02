import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MantleUI — React Component Library",
  description:
    "A modern React component library showcasing design patterns, accessibility, and clean architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
