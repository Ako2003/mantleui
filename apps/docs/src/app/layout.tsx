import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Sidebar } from "@/components/Sidebar";
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
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-8 py-10 lg:px-16">
              <div className="mx-auto max-w-3xl">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
