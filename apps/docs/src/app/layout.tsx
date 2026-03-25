import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Sidebar } from "@/components/Sidebar";
import { OnThisPage } from "@/components/OnThisPage";
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
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 px-8 py-10 lg:px-16">
              <div className="mx-auto max-w-3xl">{children}</div>
            </main>
            <aside className="sticky top-0 hidden h-screen w-48 shrink-0 overflow-y-auto py-10 pr-6 xl:block">
              <OnThisPage />
            </aside>
          </div>
        </Providers>
      </body>
    </html>
  );
}
